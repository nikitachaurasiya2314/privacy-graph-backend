import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const sellerProfiles = pgTable("seller_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),

  shopName: text("shop_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),

  hasGst: boolean("has_gst").default(false),
  gstin: text("gstin"), 
  eid: text("eid"),

  pan: text("pan"), 
  legalName: text("legal_name"),
  businessName: text("business_name"),
  bio: text("bio"),

  bankAccountNo: text("bank_account_no"),
  bankIfsc: text("bank_ifsc"),
  razorpayAccountId: text("razorpay_acct_id"),

  status: text("status").default("pending"), // pending | approved | rejected | suspended
  commissionPct: numeric("commission_pct", { precision: 5, scale: 2 }).default("10"),

  followerCount: integer("follower_count").default(0),
  totalGmv: numeric("total_gmv", { precision: 14, scale: 2 }).default("0"),

  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
});