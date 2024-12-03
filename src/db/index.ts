import { dbCredentials } from "@/config/dbCredentials";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  ...dbCredentials,
});

const db = drizzle({ client, logger: true });
export { db };
