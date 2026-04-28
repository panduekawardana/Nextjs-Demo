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
	"deleted_at" timestamp
);
