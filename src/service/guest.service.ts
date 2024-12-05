import { db } from "@/db";
import { people } from "@/db/schemas";
import { guestRepository } from "@/repository/guest.repository";
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
};
