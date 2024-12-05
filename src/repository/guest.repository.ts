import { db } from "@/db";
import {
  occupation,
  people,
  peopleToOccupations,
  peopleToTeams,
  team,
} from "@/db/schemas";
import { eq, sql } from "drizzle-orm";

class GuestRepository {
  async getTopByTeam() {
    const topTeams = await db
      .select({
        total: sql`COUNT(*) as total`,
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
        total: sql`COUNT(*) as total`,
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
}

export const guestRepository = new GuestRepository();
