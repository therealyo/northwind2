import { DB, eq } from 'drizzle-orm';

import { Supplier, SuppliersTable } from './../data/schema';
import { BaseService } from './../types/BaseService';
import { QueryLogger } from '../utils/QueryLogger';
import { PageResponse } from '../types/PageResponse';

export class SupplierService extends BaseService {
    private suppliersTable?: SuppliersTable;

    constructor(db: DB) {
        super(db);
        this.initTables(db);
    }

    private initTables = (db: DB) => {
        this.suppliersTable = new SuppliersTable(db);
        this.suppliersTable.withLogger(this.logger);
    };

    async getSupplierInfo(id: number) {
        return (await this.suppliersTable!.select().where(eq(this.suppliersTable!.SupplierID, id)).execute())[0];
    }

    getSuppliersPage = async (page: number): Promise<PageResponse<Supplier>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM suppliers');
        const count = rows[0].count;

        const pageData: Supplier[] = await this.suppliersTable!.select()
            .limit(this.pageSize)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, page: pageData };
    };
}
