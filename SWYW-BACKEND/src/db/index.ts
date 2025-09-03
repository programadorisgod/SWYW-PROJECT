import { DATABASE_URL } from '@src/config/app.config';
import { drizzle } from 'drizzle-orm/postgres-js';

export const db = drizzle(DATABASE_URL);
