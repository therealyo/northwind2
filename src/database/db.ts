import * as dotenv from 'dotenv'
import { Pool } from 'pg'
import Cursor from 'pg-cursor'
import { Kysely, PostgresDialect } from 'kysely'
import { DB } from "kysely-codegen"

dotenv.config()

export const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            host: process.env.POSTGRES_HOST,
            password: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
            port: 5432,
            database: process.env.POSTGRES_DB,
            ssl: {
                rejectUnauthorized: false
            }
        }),
        cursor: Cursor
    })
})