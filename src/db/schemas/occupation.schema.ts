import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const occupation = sqliteTable("occupation", {
  name: text("name").primaryKey(),
});
