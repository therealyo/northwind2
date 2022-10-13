import { db } from './../database/db';
import { SuppliersTable } from './../data/schema';
import { QueryLogger } from '../utils/QueryLogger';
import { DB, eq } from 'drizzle-orm';

export class SuppliersService {
    pageSize: number = 20;
    logger: QueryLogger;
    table?: SuppliersTable;
    db: DB;

    constructor(db: DB) {
        this.logger = new QueryLogger();
        this.db = db;
        this.table = new SuppliersTable(db);

        this.table.withLogger(this.logger);
    }

    async getSupplierInfo(id: number) {
        return await this.table!.select().where(eq(this.table!.SupplierID, id)).execute();
    }

    getSuppliersPage = async (page: number) => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM suppliers');
        const count = rows[0].count;

        const pageData = await this.table!.select({
            company: this.table!.CompanyName,
            contact: this.table!.ContactName,
            title: this.table!.ContactTitle,
            city: this.table!.City,
            country: this.table!.Country
        })
            .limit(20)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, pageData };
    };
}
