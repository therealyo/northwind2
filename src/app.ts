import { CategoriesTable, Category } from './data/categories';
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
    categoriesTable.withLogger(testLogger);
    console.log(await categoriesTable.select().where(eq(categoriesTable.categoryId, 1)).execute());

    // console.log(testLogger);
    // console.log(await categoriesTable.select().execute());
};

main();
