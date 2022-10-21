import { Knex } from 'knex';

import { BaseService } from './../types/BaseService'

export class CustomerService extends BaseService {

    constructor(db: Knex) {
        super(db)
    }

    getCustomerInfo = async (id: string) => {
        const infoQuery = this.db.queryBuilder()
        .select()
        .from("customers")
        .where({"CustomerID": id})

        this.logger.addQuery(infoQuery.toQuery())
        const customerInfo = await infoQuery.first()

        return {
            queries: this.logger.retrieveQueries(),
            data: customerInfo
        }
    }

    getCustomersPage = async (page: number) => {
        const countQuery = this.db.queryBuilder().select().from('customers').count()

        this.logger.addQuery(countQuery.toQuery())
        const { count } = await countQuery.first()

        const pageQuery = this.db
            .queryBuilder()
            .select()
            .from('customers')
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))

        this.logger.addQuery(pageQuery.toQuery())
        const pageData = await pageQuery

        return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
