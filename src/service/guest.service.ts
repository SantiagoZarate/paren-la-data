import { db } from "@/db";
import { people } from "@/db/schemas";
import { GuestPerMonth } from "@/lib/zod/guestsCountPerMonth";
import { guestRepository } from "@/repository/guest.repository";
import { occupationRepository } from "@/repository/occupation.repository";
import { teamRepository } from "@/repository/team.repository";
import { peopleTeamsOccupationsSchemaDTO } from "@/shared/dto/people.dto";
import { eq } from "drizzle-orm";

export const guestService = {
  async getAllGuestsDividedByYears() {
    const guests = await db.query.people.findMany({
      where: eq(people.type, "invitado"),
      with: {
        appearances: true,
      },
    });

    const guestPerYearMap: { [key: string]: string[] } = {};

    // Iterate through guests
    for (const guest of guests) {
      for (const app of guest.appearances) {
        const currentYear = app.date.slice(0, 4);

        if (!guestPerYearMap[currentYear]) {
          guestPerYearMap[currentYear] = []; // Initialize with an empty array if not already initialized
        }
        guestPerYearMap[currentYear] = [
          ...guestPerYearMap[currentYear],
          guest.name,
        ];
      }
    }

    return Object.entries(guestPerYearMap).map(([year, guests]) => ({
      year,
      guests,
    }));
  },
  async getGuestCountDividedByGender() {
    const guests = await db.query.people.findMany({
      where: eq(people.type, "invitado"),
    });

    const genreMap: { [key: string]: number } = {};

    for (const guest of guests) {
      if (!genreMap[guest.genre]) {
        genreMap[guest.genre] = 0;
      }
      genreMap[guest.genre] += 1;
    }

    return Object.entries(genreMap).map(([genre]) => ({
      genre,
      guestsCount: genreMap[genre],
    }));
  },
  async getGuestsDividedByOccupation() {
    const topOccupations = await guestRepository.getTopByOccupation();

    return topOccupations;
  },
  async getGuestsDividedByTeams() {
    const topTeams = await guestRepository.getTopByTeam();

    return topTeams;
  },

  async getLatestGuests() {
    const guests = await guestRepository.getGuests({ take: 5 });

    const guestsWithMoreInfo = await Promise.all(
      guests.map(async (g) => ({
        ...g.people,
        teams: (
          await teamRepository.getTeamsByUser(g.people.id)
        ).map((t) => t.team.name),
        occupations: (
          await occupationRepository.getOccupationsByUser(g.people.id)
        ).map((o) => o.occupationName),
      }))
    );

    return guestsWithMoreInfo.map((g) =>
      peopleTeamsOccupationsSchemaDTO.parse(g)
    );
  },
  async getGuestsPerMonth(): Promise<GuestPerMonth[]> {
    const guests = await guestRepository.getGuestsCountPerMonth();
    return [
      {
        guestsCount: 0,
        month: "Enero",
      },
      {
        guestsCount: 0,
        month: "Febrero",
      },
      ...guests,
    ];
  },
};
