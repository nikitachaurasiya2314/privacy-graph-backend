import {
  boolean,
  uuid,
  timestamp,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const userMsgEnum = pgEnum("msg_privacy", [
  "everyone",
  "followers",
  "mutual_follows",
  "nobody",
]);

export const visibilityEnum = pgEnum("visibility", [
  "everyone",
  "followers",
  "nobody",
]);

export const userPrivacySettings = pgTable("user_privacy_settings", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  whoCanMessage: userMsgEnum("who_can_message")
    .default("mutual_follows")
    .notNull(),

  showFollowList: visibilityEnum("show_follow_list")
    .default("followers")
    .notNull(),

  showActivity: boolean("show_activity")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});