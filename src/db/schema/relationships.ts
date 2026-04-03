import { pgTable, serial, text, timestamp, varchar, pgEnum, uuid, integer } from "drizzle-orm/pg-core";
import { users } from "./users"; 
export const relationshipStatus = pgEnum("relationship_status", [
  "pending",
  "accepted",
  "blocked",
  "muted",
]);

export const relationships = pgTable("relationships", {
  id: serial("id").primaryKey(),
  requester_id: uuid("requester_id")
    .notNull()
    .references(() => users.id),
  recipient_id: uuid("recipient_id")
    .notNull()
    .references(() => users.id),
  status: relationshipStatus("status").notNull().default("pending"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});