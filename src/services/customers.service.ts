import { ItemInfo } from './../types/ItemInfo';
import { DB, eq } from 'drizzle-orm';

import { PageResponse } from '../types/PageResponse';
import { BaseService } from './../types/BaseService';
import { CustomersTable, Customer } from '../data/schema';

export class CustomerService extends BaseService {
    private customersTable?: CustomersTable;

    constructor(db: DB) {
        super(db);
        this.initTables(db);
    }

    private initTables = (db: DB): void => {
        this.customersTable = new CustomersTable(db);
        this.customersTable.withLogger(this.logger);
    };

    getCustomerInfo = async (id: string): Promise<ItemInfo<Customer>> => {
        const customerInfo: Customer = (
            await this.customersTable!.select().where(eq(this.customersTable!.CustomerID, id)).execute()
        )[0];

        return {
            queries: this.logger.retrieveQueries(),
            data: customerInfo
        };
    };

    getCustomersPage = async (page: number): Promise<PageResponse<Customer>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM customers');
        const count = rows[0].count;

        this.logger.addQuery('SELECT COUNT(*) FROM customers');

        const pageData: Customer[] = await this.customersTable!.select()
            .limit(this.pageSize)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { queries: this.logger.retrieveQueries(), count, page: pageData };
    };
}
