import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import {
    Categories,
    Customers,
    Employees,
    EmployeeTerritories,
    OrderDetails,
    Orders,
    Products,
    Regions,
    Shippers,
    Suppliers,
    Territories
} from '../entities'

dotenv.config()

export const connection = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    port: 5432,
    database: process.env.POSTGRES_DB,
    entities: [
        Categories,
        Customers,
        Employees,
        EmployeeTerritories,
        OrderDetails,
        Orders,
        Products,
        Regions,
        Shippers,
        Suppliers,
        Territories
    ],
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: false
})
