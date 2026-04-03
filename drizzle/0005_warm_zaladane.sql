CREATE TYPE "public"."audit_entity_type" AS ENUM('order', 'refund', 'payout');--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"transaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" "audit_entity_type" NOT NULL,
	"entity_id" text NOT NULL,
	"old_state" text,
	"new_state" text,
	"amount" numeric,
	"created_at" timestamp DEFAULT now() NOT NULL
);
