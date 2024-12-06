import { dbCredentials } from "@/config/dbCredentials";
import envs from "@/config/envs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schemas/index";

const client = createClient(dbCredentials);

const db = drizzle({ client, logger: envs.mode === "development", schema });
export { db };
