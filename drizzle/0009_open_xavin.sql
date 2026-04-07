ALTER TABLE "users" DROP CONSTRAINT "users_google_id_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "google_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "auth_provider";--> statement-breakpoint
DROP TYPE "public"."auth_provider";