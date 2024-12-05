import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { peopleToTeams } from "./people.schema";

export const team = sqliteTable("team", {
  name: text("name").primaryKey().notNull(),
});

export const teamRelations = relations(team, ({ many }) => ({
  people: many(peopleToTeams),
}));
