import {
  pgTable,
  uuid,
  timestamp,
  text,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const entityTypeEnum = pgEnum("entity_type", [
  "post",
  "reel",
  "product",
  "live_session",
]);

export const likes = pgTable("likes", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),

   entity_id: varchar("entity_id", { length: 255 }).notNull(),


  entity_type: entityTypeEnum("entity_type").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),

   entity_id: varchar("entity_id", { length: 255 }).notNull(),


  entity_type: entityTypeEnum("entity_type").notNull(),

  content: text("content").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const shares = pgTable("shares", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),

    entity_id: varchar("entity_id", { length: 255 }).notNull(),


  entity_type: entityTypeEnum("entity_type").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});