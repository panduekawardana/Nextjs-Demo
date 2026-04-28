import { DATABASE_URL } from './config/env'
import { defineConfig } from 'drizzle-kit';

if (!DATABASE_URL) {
    throw new Error('No Process DATABASE_URL in .env!');
} else {
    console.log('CONNECTION DB', DATABASE_URL)
}

export default defineConfig({
    out: './drizzle/',
    schema: './database/schema/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: DATABASE_URL!
    }
});