import { dbCredentials } from "@/config/dbCredentials";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schemas/index";

const client = createClient({
  ...dbCredentials,
});

const db = drizzle({ client, logger: true, schema });
export { db };
