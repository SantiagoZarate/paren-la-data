import { z } from "zod";

export const bancaFijaSchema = z.object({
  name: z.string().trim(),
  birthDate: z.string().trim(),
  age: z.coerce.number(),
  job: z.string().trim(),
  team: z.string().trim(),
  location: z.string().trim(),
});

export type BancaFijaSchema = z.infer<typeof bancaFijaSchema>;
