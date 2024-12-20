import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { guestAppearance } from "./appearance.schema";
import { occupation } from "./occupation.schema";
import { team } from "./team.schema";

export const people = sqliteTable("people", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  birthDate: text("birth_date").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  type: text("type").notNull(),
  genre: text("genre").notNull(),
});

export const peopleToTeams = sqliteTable(
  "people_to_team",
  {
    peopleId: text("people_id")
      .notNull()
      .references(() => people.id, {
        onDelete: "cascade",
      }),
    teamName: text("team_name")
      .notNull()
      .references(() => team.name, {
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
    relationName: "peopleTeams",
  }),
  team: one(team, {
    fields: [peopleToTeams.teamName],
    references: [team.name],
  }),
}));

export const peopleRelations = relations(people, ({ many }) => ({
  appearances: many(guestAppearance, {
    relationName: "peopleAppearances",
  }),
  occupations: many(peopleToOccupations),
  teams: many(peopleToTeams, {
    relationName: "peopleTeams",
  }),
}));

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

export const peopleToOccupationsRelations = relations(
  peopleToOccupations,
  ({ one }) => ({
    people: one(people, {
      fields: [peopleToOccupations.peopleId],
      references: [people.id],
      relationName: "peopleTeams",
    }),
    occupation: one(occupation, {
      fields: [peopleToOccupations.occupationName],
      references: [occupation.name],
      relationName: "peopleOccupations",
    }),
  })
);
