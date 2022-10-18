// import { connection } from './db';
import { DataSource } from 'typeorm';
// import { drizzle } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

// export const connection = drizzle.connect({
//     host: process.env.POSTGRES_HOST,
//     password: process.env.POSTGRES_PASSWORD,
//     user: 'root',
//     port: 5432,
//     database: process.env.POSTGRES_DB
// })

export const connection = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,    
    username: 'root',
    port: 5432,
    database: process.env.POSTGRES_DB,
    entities: ["../entities/**{.ts,.js}"],
    synchronize: false
})