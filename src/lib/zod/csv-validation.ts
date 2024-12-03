import { z } from "zod";

export const peopleSchema = z.object({
  name: z.string().trim(),
  birthDate: z.string().trim(),
  appearanceDate: z.string().trim(),
  location: z.string().trim(),
  teams: z.array(z.string().trim()),
  country: z.string().trim(),
  occupations: z.array(z.string()),
});

export type PeopleCSVScheam = z.infer<typeof peopleSchema>;

export const staffSchema = peopleSchema.omit({
  appearanceDate: true,
});

export type StaffSchema = z.infer<typeof staffSchema>;
