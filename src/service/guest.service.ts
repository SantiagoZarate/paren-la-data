import { db } from "@/db";
import { people } from "@/db/schemas";
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
};
