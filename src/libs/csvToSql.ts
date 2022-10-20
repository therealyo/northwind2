import fs from 'fs/promises'
import csvtojson from 'csvtojson'
import * as dotenv from 'dotenv'
import { drizzle } from ''

import {
    CategoriesTable,
    EmployeeTerritoriesTable,
    CustomersTable,
    EmployeesTable,
    TerritoriesTable,
    RegionsTable,
    ShippersTable,
    ProductsTable,
    OrderDetailsTable,
    SuppliersTable,
    OrdersTable
} from './../data/schema'

dotenv.config()

interface Mapping {
    [key: string]: any
}

export const convertCSVtoSQL = async (fileName: string): Promise<void> => {
    const tables = await getTables()

    const csvData = await csvtojson().fromFile(`csvs/${fileName}`)
    const table = tables[getTableName(fileName)]

    try {
        await table.insertMany(csvData).execute()
    } catch (err) {
        console.log(err)
    }
}

const getTables = async (): Promise<Mapping> => {
    const db = await drizzle.connect({
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        user: 'root',
        port: 5432,
        database: process.env.POSTGRES_DB
    })

    return {
        Categories: new CategoriesTable(db),
        EmployeeTerritories: new EmployeeTerritoriesTable(db),
        Customers: new CustomersTable(db),
        Employees: new EmployeesTable(db),
        Territories: new TerritoriesTable(db),
        Regions: new RegionsTable(db),
        Shippers: new ShippersTable(db),
        Products: new ProductsTable(db),
        OrderDetails: new OrderDetailsTable(db),
        Suppliers: new SuppliersTable(db),
        Orders: new OrdersTable(db)
    }
}

const getTableName = (fileName: string): string => {
    return fileName.split('.').at(0)!
}

const filterCSV = (fileName: string): boolean => {
    return fileName.split('.').at(-1) === 'csv'
}

export const getCSVS = async (dirname: string): Promise<string[]> => {
    try {
        return (await fs.readdir(dirname)).filter(filterCSV)
    } catch (err) {
        throw err
    }
}
