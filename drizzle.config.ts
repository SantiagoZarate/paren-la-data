import { dbCredentials } from "@/config/dbCredentials";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  dbCredentials,
  schema: "./src/db/schemas/index.ts",
  out: "./src/db/migrations",
  strict: true,
  verbose: true,
});
