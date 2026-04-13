CREATE TABLE "seller_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"shop_name" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"has_gst" boolean DEFAULT false,
	"gstin" text,
	"eid" text,
	"pan" text,
	"legal_name" text,
	"business_name" text,
	"bio" text,
	"bank_account_no" text,
	"bank_ifsc" text,
	"razorpay_acct_id" text,
	"status" text DEFAULT 'pending',
	"commission_pct" numeric(5, 2) DEFAULT '10',
	"follower_count" integer DEFAULT 0,
	"total_gmv" numeric(14, 2) DEFAULT '0',
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "seller_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD CONSTRAINT "seller_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;