CREATE TYPE "public"."msg_privacy" AS ENUM('everyone', 'followers', 'mutual_follows', 'nobody');--> statement-breakpoint
CREATE TYPE "public"."visibility" AS ENUM('everyone', 'followers', 'nobody');--> statement-breakpoint
CREATE TABLE "user_privacy_settings" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"who_can_message" "msg_privacy" DEFAULT 'mutual_follows' NOT NULL,
	"show_follow_list" "visibility" DEFAULT 'followers' NOT NULL,
	"show_activity" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_privacy_settings" ADD CONSTRAINT "user_privacy_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;