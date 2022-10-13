import { DB, eq } from 'drizzle-orm';

import { CustomersTable } from '../data/schema';
import { PageResponse } from '../types/PageResponse';
import { BaseService } from './../types/BaseService';
import { Customer } from './../data/schema';

export class CustomerService extends BaseService {
    private customersTable?: CustomersTable;

    constructor(db: DB) {
        super(db);
        this.initTables(db);
    }

    private initTables = (db: DB) => {
        this.customersTable = new CustomersTable(db);
        this.customersTable.withLogger(this.logger);
    };

    getCustomerInfo = async (id: string) => {
        return (await this.customersTable!.select().where(eq(this.customersTable!.CustomerID, id)).execute())[0];
    };

    getCustomersPage = async (page: number): Promise<PageResponse<Customer>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM customers');
        const count = rows[0].count;

        const pageData: Customer[] = await this.customersTable!.select()
            .limit(this.pageSize)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, page: pageData };
    };
}
