import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const globalForDb = globalThis as unknown as {
    pool: Pool | undefined;
}

export const pool = globalForDb.pool ?? new Pool({
    connectionString: process.env.DATABASE_URL!,
});

if(process.env.NODE_ENV !== 'production') {
    globalForDb.pool = pool;
}

export const db = drizzle(pool);

export async function checkDBConnection() {
    try{
        await pool.query('SELECT 1');
        return {ok: true}
    } catch(e){
        console.error('DB connection Error',e)
        return {ok: false, e}
    }
}