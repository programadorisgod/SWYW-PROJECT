import { DATABASE_URL, TYPE_DATABASE } from '@src/config/app.config';
import { defineConfig } from 'drizzle-kit';
import type { typeDatabase } from './types/dialect';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: TYPE_DATABASE as typeDatabase,
    dbCredentials: {
        url: DATABASE_URL,
    },
});
