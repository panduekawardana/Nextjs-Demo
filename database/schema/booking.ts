import { pgTable, serial, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { events, timestamps } from './events';
export const booking = pgTable('bookings', {
    id: serial('id').primaryKey(),
    eventId: uuid('event_id').references(() => events.id).notNull(),
    name: text('name').notNull(),
    email: varchar('email').notNull(),
    ...timestamps
}); 