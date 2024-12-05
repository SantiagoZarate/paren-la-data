import { db } from "@/db";
import { peopleToOccupations } from "@/db/schemas";
import { eq } from "drizzle-orm";

class OccupationRepository {
  async getOccupationsByUser(userId: string) {
    const occupations = await db.query.peopleToOccupations.findMany({
      where: eq(peopleToOccupations.peopleId, userId),
    });

    return occupations;
  }
}

export const occupationRepository = new OccupationRepository();
