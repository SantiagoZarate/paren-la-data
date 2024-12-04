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
  genre: text("genre").notNull(),
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
    relationName: "peopleTeams",
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
    .references(() => people.id, { onDelete: "cascade" }),
  // Hacer la migracion del cambio de cascada
});

export const peopleRelations = relations(people, ({ many }) => ({
  appearances: many(guestAppearance, {
    relationName: "peopleAppearances",
  }),
  occupations: many(peopleToOccupations, {
    relationName: "peopleOccupations",
  }),
  teams: many(peopleToTeams, {
    relationName: "peopleTeams",
  }),
}));

export const guestAppearanceRelations = relations(
  guestAppearance,
  ({ one }) => ({
    guest: one(people, {
      fields: [guestAppearance.peopleId],
      references: [people.id],
      relationName: "peopleAppearances",
    }),
  })
);

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

export const peopleToOccupationsRelations = relations(
  peopleToOccupations,
  ({ one }) => ({
    people: one(people, {
      fields: [peopleToOccupations.peopleId],
      references: [people.id],
      relationName: "peopleTeams",
    }),
    occupation: one(occupation, {
      fields: [peopleToOccupations.peopleId],
      references: [occupation.name],
      relationName: "peopleOccupations",
    }),
  })
);
