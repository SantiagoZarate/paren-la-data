import { config } from "dotenv";
import { z } from "zod";

const path = `.env.${process.env.NODE_ENV}`;

config({ path });

const envsSchema = z.object({
  db: z.object({
    token: z.string(),
    url: z.string(),
  }),
  mode: z.enum(["testing", "production", "development"]).default("development"),
});

export default envsSchema.parse({
  db: {
    token: process.env.DB_TOKEN,
    url: process.env.DB_URL,
  },
  mode: process.env.NODE_ENV,
});
