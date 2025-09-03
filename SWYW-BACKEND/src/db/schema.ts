import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

const eventType = pgEnum('type', ['urgent', 'normal', 'recurring']);

export const eventsTable = pgTable('events', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    description: varchar({ length: 255 }).notNull(),
    date: timestamp().notNull(),
    participants: varchar({ length: 255 }).notNull(),
    remember: boolean().notNull(),
    type: eventType().notNull(),
});
