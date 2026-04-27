import { drizzle } from 'drizzle-orm/node-postgres';
import { PgTable, varchar, integer, timestamp, pgTable } from "drizzle-orm/pg-core";


// Helper tiemestams
const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}

export const events = pgTable('events', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
     
})