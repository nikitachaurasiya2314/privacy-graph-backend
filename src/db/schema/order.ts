import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  pgEnum,
  integer, varchar
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
]);

export const parentOrders = pgTable("parent_orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),

  total_amount: numeric("total_amount").notNull(),

  status: orderStatusEnum("status").default("pending"),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const subOrders = pgTable("sub_orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  parent_order_id: uuid("parent_order_id")
    .notNull()
    .references(() => parentOrders.id),

  seller_id: uuid("seller_id")
    .notNull()
    .references(() => users.id),

  subtotal: numeric("subtotal").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  sub_order_id: uuid("sub_order_id")
    .notNull()
    .references(() => subOrders.id),

  product_id: varchar("product_id", { length: 255 }).notNull(),

  quantity: integer("quantity").notNull(),

  price: numeric("price").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});