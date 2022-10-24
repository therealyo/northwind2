import { PgConnector } from 'drizzle-orm-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'

import {
    categories,
    customers,
    employees,
    employeeTerritories,
    orderDetails,
    orders,
    products,
    regions,
    shippers,
    suppliers,
    territories
} from './../data/schema'

dotenv.config()

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    port: 5432,
    database: process.env.POSTGRES_DB,
    ssl: {
        rejectUnauthorized: false
    }
})

export const connector = new PgConnector(pool, {
    categories,
    customers,
    employees,
    employeeTerritories,
    orderDetails,
    orders,
    products,
    regions,
    shippers,
    suppliers,
    territories
})
