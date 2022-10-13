import {
    CategoriesTable,
    EmployeeTerritoriesTable,
    CustomersTable,
    EmployeesTable,
    OrderDetailsTable,
    OrdersTable,
    ProductsTable,
    RegionsTable,
    ShippersTable,
    SuppliersTable,
    TerritoriesTable
} from './data/schema';
import { drizzle, eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import BaseLogger from 'drizzle-orm/logger/abstractLogger';

dotenv.config();

class WriteLogger extends BaseLogger {
    queries: string[] = [];
    info(msg: string): void {
        console.log('msg: ', msg);
        console.log('split: ', msg.split('\n').slice(1).join(' '));
        this.queries.push(msg.split('\n').slice(1).join(' '));
    }
    error(msg: string): void {
        console.log(msg);
    }
}

const main = async () => {
    const db = await drizzle.connect({
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        user: 'root',
        port: 5432,
        database: process.env.POSTGRES_DB
    });

    const categoriesTable = new CategoriesTable(db);
    const testLogger = new WriteLogger();
    categoriesTable.withLogger(console);
    const mapping = {
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
    };
    // console.log(mapping['Categories']);
    const categories = mapping['Categories'];

    const testValues = [
        {
            CategoryId: '6',
            CategoryName: 'test',
            Description: 'test'
        },
        {
            CategoryId: '5',
            CategoryName: 'test',
            Description: 'test'
        }
    ];
    console.log(testValues);

    await categories.insertMany(testValues).execute();
    // console.log(testLogger);
};

main();
