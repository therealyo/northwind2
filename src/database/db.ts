import { drizzle } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

export const connection = drizzle.connect({
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    port: 5432,
    database: process.env.POSTGRES_DB,
    ssl: {
        rejectUnauthorized: false
    }
})
