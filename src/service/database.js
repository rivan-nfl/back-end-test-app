import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

async function connectDatabase() {
    await client.connect();

    const checkTable = await client.query(`SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';`)
    if(checkTable.rowCount < 1) {
        await client.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE IF NOT EXISTS users (
                user_id uuid DEFAULT uuid_generate_v4 (),
                email VARCHAR ( 100 ) UNIQUE NOT NULL,
                password VARCHAR ( 50 ) NOT NULL
            );
        `)

        console.log('Database Tables Created !');
    }

    console.log('Database Connected !');
}

export {
    client,
    connectDatabase,
}