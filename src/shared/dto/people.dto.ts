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

export const peopleTeamsOccupationsSchemaDTO = peopleSchemaDTO.extend({
  teams: z.array(z.string()),
  occupations: z.array(z.string()),
});

export type PeopleTeamsOccuparionsDTO = z.infer<
  typeof peopleTeamsOccupationsSchemaDTO
>;
