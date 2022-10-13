import { DB, eq } from 'drizzle-orm';

import { Supplier, SuppliersTable } from './../data/schema';
import { QueryLogger } from '../utils/QueryLogger';
import { PageResponse } from '../types/PageResponse';

export class SupplierService {
    public pageSize: number = 20;
    public logger: QueryLogger;
    private table?: SuppliersTable;
    private db: DB;

    constructor(db: DB) {
        this.logger = new QueryLogger();
        this.db = db;
        this.table = new SuppliersTable(db);

        this.table.withLogger(this.logger);
    }

    async getSupplierInfo(id: number) {
        return (await this.table!.select().where(eq(this.table!.SupplierID, id)).execute())[0];
    }

    getSuppliersPage = async (page: number): Promise<PageResponse<Supplier>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM suppliers');
        const count = rows[0].count;

        const pageData: Supplier[] = await this.table!.select()
            .limit(20)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, page: pageData };
    };
}
