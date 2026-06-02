CREATE TABLE "schema_meta" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text DEFAULT 'phase-0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
