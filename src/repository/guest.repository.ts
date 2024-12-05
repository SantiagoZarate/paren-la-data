import { db } from "@/db";
import {
  guestAppearance,
  occupation,
  people,
  peopleToOccupations,
  peopleToTeams,
  team,
} from "@/db/schemas";
import { guestsCountPerMonth } from "@/lib/zod/guestsCountPerMonth";
import { desc, eq, sql } from "drizzle-orm";

type GetOptions = {
  take?: number;
};

class GuestRepository {
  async getGuests({ take = 300 }: GetOptions) {
    const guests = await db
      .select()
      .from(people)
      .innerJoin(guestAppearance, eq(people.id, guestAppearance.peopleId))
      .orderBy(desc(guestAppearance.date)) // Order by date descending
      .limit(take); // Limit to 5 rows

    return guests;
  }

  async getTopByTeam() {
    const topTeams = await db
      .select({
        total: sql<number>`COUNT(*) as total`,
        name: team.name,
      })
      .from(peopleToTeams)
      .innerJoin(people, eq(people.id, peopleToTeams.peopleId))
      .innerJoin(team, eq(team.name, peopleToTeams.teamName))
      .groupBy(team.name)
      .orderBy(sql`total DESC`)
      .having(sql`${team.name} != '?'`) // Si no se sabe el equipo no se toma en cuenta
      .limit(10);

    return topTeams;
  }

  async getTopByOccupation() {
    const topOccupations = await db
      .select({
        total: sql<number>`COUNT(*) as total`,
        name: occupation.name,
      })
      .from(peopleToOccupations)
      .innerJoin(people, eq(people.id, peopleToOccupations.peopleId))
      .innerJoin(
        occupation,
        eq(occupation.name, peopleToOccupations.occupationName)
      )
      .groupBy(occupation.name)
      .orderBy(sql`total DESC`) // Order by the total count
      .limit(10);

    return topOccupations;
  }

  async getGuestsCountPerMonth() {
    const statement = sql`
    select strftime('%m', date) AS month, COUNT(*) AS guest_count
    from ${guestAppearance}
    GROUP BY  strftime('%m', date)
    ORDER BY month;
    `;

    const { rows } = await db.run(statement);

    return rows.map((r) => guestsCountPerMonth.parse(r));
  }
}

export const guestRepository = new GuestRepository();
