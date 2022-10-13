import { drizzle } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config();

// export const connection = async () =>

export const connection = drizzle.connect({
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    user: 'root',
    port: 5432,
    database: process.env.POSTGRES_DB
});

// export const db = drizzle.connect({
//     host: process.env.POSTGRES_HOST,
//     password: process.env.POSTGRES_PASSWORD,
//     user: 'root',
//     port: 5432,
//     database: process.env.POSTGRES_DB
// });
