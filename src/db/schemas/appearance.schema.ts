import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { people } from "./people.schema";

export const guestAppearance = sqliteTable("guest_appearance", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  date: text("date").notNull(),
  peopleId: text("people_id")
    .notNull()
    .references(() => people.id, { onDelete: "cascade" }),
});

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
