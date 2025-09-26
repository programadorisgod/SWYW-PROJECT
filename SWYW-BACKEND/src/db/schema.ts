import {
    pgTable,
    integer,
    text,
    varchar,
    boolean,
    timestamp,
    pgSchema,
} from 'drizzle-orm/pg-core';

const core = pgSchema('core');

export const eventTypesTable = core.table('events_type', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    sortOrder: integer().notNull(),
});

export const eventsTable = core.table('events', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    description: varchar({ length: 255 }).notNull(),
    date: timestamp(),
    participants: varchar({ length: 255 }),
    remember: boolean().notNull(),
    type: varchar({ length: 50 }).notNull(),
    userId: integer(),
    completed: boolean(),
});

/*
typeEventId: integer()
    .notNull()
    .references(() => eventTypesTable.id),
*/
