import { DataSource } from 'typeorm'

import { Customers } from '../entities'
import { BaseService } from './../types/BaseService'

export class CustomerService extends BaseService {
    constructor(db: DataSource) {
        super(db)
    }

    getCustomerInfo = async (id: string) => {
        const queryBuilder = this.db
            .createQueryBuilder(Customers, 'customers')
            .where('customers.CustomerID = :id', { id: id })

        const customerInfo = await queryBuilder.getOne()

        this.logger.addQuery(queryBuilder.getQuery())

        return {
            queries: this.logger.retrieveQueries(),
            data: customerInfo
        }
    }

    getCustomersPage = async (page: number) => {
        const queryBuilder = this.db.createQueryBuilder(Customers, 'customers')
        const pageQueryBuilder = queryBuilder.limit(this.pageSize).offset((page - 1) * this.pageSize)

        const count = await queryBuilder.getCount()

        const pageData = await pageQueryBuilder.getMany()

        this.logger.addQuery('SELECT COUNT(*) FROM customers')
        this.logger.addQuery(pageQueryBuilder.getQuery())

        return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }

    searchCustomer = async (search: string) => {
        const searchResult = await this.db
            .createQueryBuilder(Customers, 'customers')
            .select()
            .where(`customers."customers_with_rankings" @@ to_tsquery('${search + ':*'}')`)
            .orderBy(`ts_rank("customers_with_rankings", to_tsquery('${search + ':*'}'))`, 'DESC')
            .getMany()

        return {
            data: searchResult
        }
    }
}
