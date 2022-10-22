import * as dotenv from 'dotenv'
import knex from 'knex'

dotenv.config()

// export const connection = drizzle.connect({
//     host: process.env.POSTGRES_HOST,
//     password: process.env.POSTGRES_PASSWORD,
//     user: process.env.POSTGRES_USER,
//     port: 5432,
//     database: process.env.POSTGRES_DB,
//     ssl: {
//         rejectUnauthorized: false
//     }
// })
export const db = knex({
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        user: process.env.POSTGRES_USER,
        port: 5432,
        database: process.env.POSTGRES_DB,
        ssl: {
            rejectUnauthorized: false
        }
    },
    useNullAsDefault: true
})