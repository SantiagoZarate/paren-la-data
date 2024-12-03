import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const people = sqliteTable("people", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  birthDate: text("birth_date").notNull(),
  job: text("job"),
  location: text("location"),
  country: text("country"),
  type: text("text"),
});

export const team = sqliteTable("team", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
});

export const peopleToTeam = sqliteTable(
  "people_to_team",
  {
    peopleId: text("people_id").references(() => people.id),
    teamId: text("team_id").references(() => team.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.peopleId, t.teamId] }),
  })
);

export const peopleToTeamsRelatins = relations(peopleToTeam, ({ one }) => ({
  people: one(people, {
    fields: [peopleToTeam.peopleId],
    references: [people.id],
  }),
  team: one(team, {
    fields: [peopleToTeam.teamId],
    references: [team.id],
  }),
}));

export const guestAppearance = sqliteTable("guest_appearance", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  date: text("text").notNull(),
  peopleId: text("people_id")
    .notNull()
    .references(() => people.id),
});

export const peopleRelations = relations(people, ({ many }) => ({
  appearances: many(guestAppearance),
}));
