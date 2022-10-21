import { Knex } from 'knex';

import { BaseService } from './../types/BaseService'

export class CustomerService extends BaseService {

    constructor(db: Knex) {
        super(db)
    }

    getCustomerInfo = async (id: string) => {
        // const customerInfo: Customer = (
        //     await this.customersTable!
        //         .select()
        //         .where(eq(this.customersTable!.CustomerID, id))
        //         .execute()
        // )[0]

        // return {
        //     queries: this.logger.retrieveQueries(),
        //     data: customerInfo
        // }
    }

    getCustomersPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM customers')
        // const count = rows[0].count

        // this.logger.addQuery('SELECT COUNT(*) FROM customers')

        // const pageData: Customer[] = await this.customersTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()

        // return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
