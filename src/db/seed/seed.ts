import { parseGuest, parseStaff } from "@/lib/parseCSV";
import { db } from "..";
import {
  occupation,
  people,
  peopleToOccupations,
  peopleToTeams,
  team,
} from "../schemas";

async function seed() {
  await db.delete(people);
  await db.delete(team);
  await db.delete(occupation);
  await db.delete(peopleToOccupations);
  await db.delete(peopleToTeams);

  const invitados2022 = await parseGuest("invitados-2022.csv");
  const invitados2023 = await parseGuest("invitados-2023.csv");
  const invitados2024 = await parseGuest("invitados-2024.csv");

  const staff = await parseStaff("banca-fija.csv");
  const frecuentes = await parseGuest("miembros-frecuentes.csv");

  const allGuests = [...invitados2022, ...invitados2023, ...invitados2024];

  // Collect all teams
  const allTeams = allGuests.flatMap((guest) => guest.teams);
  const uniqueTeams = Array.from(new Set(allTeams)); // Remove duplicates

  console.log({ uniqueTeams });

  // Collect all occupations
  const allOccupations = [...allGuests, ...frecuentes].flatMap(
    (guest) => guest.occupations
  );
  const uniqueOccupations = Array.from(new Set(allOccupations)); // Remove duplicates

  // Insert teams
  await db.insert(team).values(uniqueTeams.map((n) => ({ name: n })));

  // Insert occupation
  await db
    .insert(occupation)
    .values(uniqueOccupations.map((n) => ({ name: n })));

  // Abstraer la insercion de miembros cambiando el tipo de rol ("invitado" | "staff" | "frecuente")
  await Promise.all(
    allGuests.map(async (guest) => {
      const newGuest = await db
        .insert(people)
        .values({
          birthDate: guest.birthDate,
          name: guest.name,
          country: guest.country,
          location: guest.location,
          type: "invitado",
        })
        .returning({ id: people.id });

      const newGuestOccupations = guest.occupations.map((occ) => ({
        occupationName: occ,
        peopleId: newGuest[0].id,
      }));

      await db.insert(peopleToOccupations).values(newGuestOccupations);

      const newGuestTeams = guest.teams.map((team) => ({
        teamName: team,
        peopleId: newGuest[0].id,
      }));

      await db.insert(peopleToTeams).values(newGuestTeams);
    })
  );

  await Promise.all(
    staff.map(async (member) => {
      const newGuest = await db
        .insert(people)
        .values({
          birthDate: member.birthDate,
          name: member.name,
          country: member.country,
          location: member.location,
          type: "staff",
        })
        .returning({ id: people.id });

      const newGuestOccupations = member.occupations.map((occ) => ({
        occupationName: occ,
        peopleId: newGuest[0].id,
      }));

      await db.insert(peopleToOccupations).values(newGuestOccupations);

      const newGuestTeams = member.teams.map((team) => ({
        teamName: team,
        peopleId: newGuest[0].id,
      }));

      await db.insert(peopleToTeams).values(newGuestTeams);
    })
  );

  await Promise.all(
    frecuentes.map(async (member) => {
      const newGuest = await db
        .insert(people)
        .values({
          birthDate: member.birthDate,
          name: member.name,
          country: member.country,
          location: member.location,
          type: "frecuente",
        })
        .returning({ id: people.id });

      const newGuestOccupations = member.occupations.map((occ) => ({
        occupationName: occ,
        peopleId: newGuest[0].id,
      }));

      await db.insert(peopleToOccupations).values(newGuestOccupations);

      const newGuestTeams = member.teams.map((team) => ({
        teamName: team,
        peopleId: newGuest[0].id,
      }));

      await db.insert(peopleToTeams).values(newGuestTeams);
    })
  );
}

seed();
