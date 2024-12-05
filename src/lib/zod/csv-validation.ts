import { z } from "zod";
import { reestructureDateToISO } from "../reestructureDateToISO";

export const peopleSchema = z.object({
  name: z.string().trim(),
  birthDate: z
    .string()
    .trim()
    .transform((date) => {
      if (date === "?") return true;
      return reestructureDateToISO(date);
    }),
  appearanceDate: z
    .string()
    .trim()
    .transform((date) => reestructureDateToISO(date)),
  location: z.string().trim(),
  teams: z.array(z.string().trim()),
  country: z.string().trim(),
  occupations: z.array(z.string()),
  genre: z.string().trim(),
});

export type PeopleCSVScheam = z.infer<typeof peopleSchema>;

export const staffSchema = peopleSchema.omit({
  appearanceDate: true,
});

export type StaffSchema = z.infer<typeof staffSchema>;
