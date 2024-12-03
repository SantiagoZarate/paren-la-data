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
  location: text("location"),
  country: text("country"),
  type: text("type"),
});

export const team = sqliteTable("team", {
  name: text("name").notNull().primaryKey(),
});

export const peopleToTeams = sqliteTable(
  "people_to_team",
  {
    peopleId: text("people_id").references(() => people.id, {
      onDelete: "cascade",
    }),
    teamName: text("team_name").references(() => team.name, {
      onDelete: "cascade",
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.peopleId, t.teamName] }),
  })
);

export const peopleToTeamsRelations = relations(peopleToTeams, ({ one }) => ({
  people: one(people, {
    fields: [peopleToTeams.peopleId],
    references: [people.id],
  }),
  team: one(team, {
    fields: [peopleToTeams.teamName],
    references: [team.name],
  }),
}));

export const guestAppearance = sqliteTable("guest_appearance", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  date: text("date").notNull(),
  peopleId: text("people_id")
    .notNull()
    .references(() => people.id),
});

export const peopleRelations = relations(people, ({ many }) => ({
  appearances: many(guestAppearance),
  occupations: many(occupation),
  teams: many(team),
}));

export const occupation = sqliteTable("occupation", {
  name: text("name").primaryKey(),
});

export const peopleToOccupations = sqliteTable(
  "people_to_occupations",
  {
    peopleId: text("people_id")
      .notNull()
      .references(() => people.id, { onDelete: "cascade" }),
    occupationName: text("occupation_name")
      .notNull()
      .references(() => occupation.name, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.occupationName, t.peopleId] }),
  })
);
