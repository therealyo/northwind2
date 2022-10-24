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
const pool = new Pool({
    connectionString:
        'postgres://jrmznujyfathyv:9594141b8af5c1d0fe666ea00f0c3b2da566474ad3db2f6c0bccdd6d129b6448@ec2-3-213-66-35.compute-1.amazonaws.com:5432/d1h1tis8po31fu'
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
