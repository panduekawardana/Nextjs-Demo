import {
    uuid, timestamp, text, pgEnum, varchar, date, time, pgTable
} from "drizzle-orm/pg-core";

// Helper timestams
export const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}

export const agendaEnum = pgEnum('agenda', ['meeting', 'workshop', 'conference'])
export const tagEnum = pgEnum('tags', ['Claude', 'Microsoft', 'Google', 'Amazon', 'Open AI', 'Claude Console']);

export const events = pgTable('events', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull().unique(),
    overview: text('overview').notNull(),
    description: text('description').notNull(),
    image: varchar('image').notNull(),
    venue: varchar('venue').notNull(),
    location: varchar('location').notNull(),
    date: date('date'),
    time: time('time'),
    mode: varchar('mode'),
    audience: varchar('audience', { length: 255 }).notNull(),
    agenda: agendaEnum('agenda'),
    organizer: varchar('organizer', { length: 255 }),
    tags: tagEnum('tags'),
    ...timestamps,
});