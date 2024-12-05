import { z } from "zod";

const monthNames = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
} as const;

export type Month = keyof typeof monthNames;

export const guestsCountPerMonth = z
  .object({
    month: z.string().transform((month) => monthNames[month as Month]),
    guest_count: z.coerce.number(),
  })
  .transform(({ month, guest_count }) => ({
    month,
    guestsCount: guest_count,
  }));

export type GuestPerMonth = z.infer<typeof guestsCountPerMonth>;
