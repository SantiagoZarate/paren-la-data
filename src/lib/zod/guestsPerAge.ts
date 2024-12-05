import { z } from "zod";

export const guestsPerAge = z
  .object({
    age: z.coerce.number(),
    guests_count: z.coerce.number(),
  })
  .transform(({ age, guests_count }) => ({
    age,
    guestsCount: guests_count,
  }));

export type GuestsPerAge = z.infer<typeof guestsPerAge>;
