import { PEOPLE_TYPE } from "@/data/constants";
import { z } from "zod";

export const peopleSchemaDTO = z.object({
  birthDate: z.string(),
  country: z.string(),
  id: z.string(),
  location: z.string(),
  name: z.string(),
  type: z.enum(PEOPLE_TYPE),
});

export type PeopleDTO = z.infer<typeof peopleSchemaDTO>;

export const peopleTeamsOccupationsAppearancesSchemaDTO = peopleSchemaDTO
  .extend({
    teams: z.array(
      z.object({
        teamName: z.string(),
      })
    ),
    occupations: z.array(
      z.object({
        occupationName: z.string(),
      })
    ),
    appearances: z.array(
      z.object({
        date: z.string(),
      })
    ),
  })
  .transform((shape) => ({
    ...shape,
    teams: shape.teams.map((t) => t.teamName),
    occupations: shape.occupations.map((o) => o.occupationName),
    appearances: shape.appearances.map((a) => a.date),
  }));

export type PeopleTeamsOccuparionsDTO = z.infer<
  typeof peopleTeamsOccupationsAppearancesSchemaDTO
>;
