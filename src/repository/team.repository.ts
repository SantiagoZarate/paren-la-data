import { db } from "@/db";
import { people, peopleToTeams, team } from "@/db/schemas";
import { eq } from "drizzle-orm";

class TeamRepository {
  async getTeamsByUser(userId: string) {
    const teams = await db
      .select()
      .from(peopleToTeams)
      .innerJoin(people, eq(people.id, peopleToTeams.peopleId))
      .innerJoin(team, eq(team.name, peopleToTeams.teamName))
      .where(eq(people.id, userId));
    return teams;
  }
}

export const teamRepository = new TeamRepository();
