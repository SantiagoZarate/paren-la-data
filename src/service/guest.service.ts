import { db } from "@/db";
import { people } from "@/db/schemas";
import { GuestPerMonth } from "@/lib/zod/guestsCountPerMonth";
import { guestRepository } from "@/repository/guest.repository";
import { occupationRepository } from "@/repository/occupation.repository";
import { teamRepository } from "@/repository/team.repository";
import { peopleTeamsOccupationsAppearancesSchemaDTO } from "@/shared/dto/people.dto";
import { eq } from "drizzle-orm";

class GuestService {
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
  }

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
  }

  async getGuestsDividedByOccupation() {
    const topOccupations = await guestRepository.getTopByOccupation();

    return topOccupations;
  }

  async getGuestsDividedByTeams() {
    const topTeams = await guestRepository.getTopByTeam();

    return topTeams;
  }

  async getAll() {
    const guests = await guestRepository.getAllGuests();

    return guests.map((g) =>
      peopleTeamsOccupationsAppearancesSchemaDTO.parse(g)
    );
  }

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
        appearances: [g.guest_appearance.date],
      }))
    );

    return guestsWithMoreInfo;
  }

  async getGuestsPerMonth(): Promise<GuestPerMonth[]> {
    const guests = await guestRepository.getGuestsCountPerMonth();

    await this.getGuestsPerAgeRange();

    return [
      // ADD 0 guests for january and febrary
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
  }

  async getGuestsPerAgeRange() {
    const results = await guestRepository.getGuestsPerAge();

    const guestsDividedByAgeRange: { [key: string]: number } = {
      "18": 0,
      "25": 0,
      "30": 0,
      "35": 0,
      "40": 0,
      "50": 0,
      "60": 0,
    };

    results.forEach(({ age, guestsCount }) => {
      // Menores de 25 años
      if (age >= 18 && age < 25) {
        guestsDividedByAgeRange["18"] += guestsCount;
      }
      if (age >= 25 && age < 30) {
        guestsDividedByAgeRange["25"] += guestsCount;
      }
      if (age >= 30 && age < 35) {
        guestsDividedByAgeRange["30"] += guestsCount;
      }
      if (age >= 35 && age < 40) {
        guestsDividedByAgeRange["35"] += guestsCount;
      }
      if (age >= 40 && age < 50) {
        guestsDividedByAgeRange["40"] += guestsCount;
      }
      if (age >= 50 && age < 60) {
        guestsDividedByAgeRange["50"] += guestsCount;
      }
      if (age >= 60) {
        guestsDividedByAgeRange["60"] += guestsCount;
      }
    });

    const aux = Object.entries(guestsDividedByAgeRange).map(
      ([range, guestsCount]) => ({
        range: `> ${range} años`,
        guestsCount,
      })
    );

    aux.unshift({
      guestsCount: 0,
      range: "< 18",
    });

    return aux;
  }

  async getInternationalGuests() {
    const guests = await guestRepository.getGuestsAbroad();
    return guests;
  }
}

export const guestService = new GuestService();
