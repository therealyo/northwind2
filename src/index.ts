import { EmployeesTable } from './data/schema';
import { drizzle } from 'drizzle-orm';

import * as dotenv from 'dotenv';

dotenv.config();

const main = async () => {
    const db = await drizzle.connect({
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        user: 'root',
        port: 5432,
        database: process.env.POSTGRES_DB
    });

    const table = new EmployeesTable(db);

    await table
        .insert({
            EmployeeID: 1,
            LastName: '1',
            FirstName: '1',
            Title: '1',
            TitleOfCourtesy: '1',
            BirthDate: '1',
            HireDate: '1',
            Address: '1',
            City: '1',
            Region: '1',
            PostalCode: '1',
            Country: '1',
            HomePhone: '1',
            Extension: 1,
            Notes: '1',
            ReportsTo: null
        })
        .execute();
};

main();
