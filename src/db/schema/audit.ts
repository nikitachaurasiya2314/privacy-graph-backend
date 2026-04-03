import {
  pgTable,
  uuid,
  timestamp,
  text,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";

export const auditEntityEnum = pgEnum("audit_entity_type", [
  "order",
  "refund",
  "payout",
]);

export const auditLogs = pgTable("audit_logs", {
  transaction_id: uuid("transaction_id")
    .defaultRandom()
    .primaryKey(),

  entity_type: auditEntityEnum("entity_type").notNull(),

  entity_id: text("entity_id").notNull(),

  old_state: text("old_state"),

  new_state: text("new_state"),

  amount: numeric("amount"),

  created_at: timestamp("created_at").defaultNow().notNull(),
});