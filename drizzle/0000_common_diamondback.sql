CREATE TYPE "public"."agenda" AS ENUM('meeting', 'workshop', 'conference');--> statement-breakpoint
CREATE TYPE "public"."tags" AS ENUM('Claude', 'Microsoft', 'Google', 'Amazon', 'Open AI', 'Claude Console');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"overview" text NOT NULL,
	"image" varchar NOT NULL,
	"venue" varchar NOT NULL,
	"location" varchar NOT NULL,
	"date" date,
	"time" time,
	"mode" varchar,
	"audience" varchar(255) NOT NULL,
	"agenda" "agenda",
	"organizer" varchar(255),
	"tags" "tags",
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "events_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;