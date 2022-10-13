import { Customer } from './../data/schema';
import { DB, eq } from 'drizzle-orm';
import { CustomersTable } from '../data/schema';
import { QueryLogger } from '../utils/QueryLogger';
import { PageResponse } from '../types/PageResponse';

export class CustomerService {
    public pageSize: number = 20;
    public logger: QueryLogger;
    private table?: CustomersTable;
    private db: DB;

    constructor(db: DB) {
        this.logger = new QueryLogger();
        this.db = db;
        this.table = new CustomersTable(db);

        this.table.withLogger(this.logger);
    }

    getCustomerInfo = async (id: string): Promise<Customer[]> => {
        return await this.table!.select().where(eq(this.table!.CustomerID, id)).execute();
    };

    getCustomersPage = async (page: number): Promise<PageResponse<Customer>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM customers');
        const count = rows[0].count;

        const pageData: Customer[] = await this.table!.select()
            .limit(20)
            .offset((page - 1) * this.pageSize)
            .execute();

        return { count, pageData };
    };
}
