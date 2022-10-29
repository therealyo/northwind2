import { desc, eq } from 'drizzle-orm/expressions'
import { BaseService } from './../types/BaseService'
import { customers } from './../data/schema'
import { sql } from 'drizzle-orm'

export class CustomerService extends BaseService {
    getCustomerInfo = async (id: string) => {
        this.logger.setStart()
        const query = this.db.customers.select().where(eq(customers.CustomerID, id))
        const customerInfo = await query.execute()

        this.logger.setEnd()
        this.logger.addQuery(query.getQuery().sql)

        return {
            queries: this.logger.retrieveQueries(),
            data: customerInfo[0]
        }
    }

    getCustomersPage = async (page: number) => {
        this.logger.setStart()
        const pageQuery = this.db.customers
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
        const pageData = await pageQuery.execute()

        this.logger.setEnd()
        this.logger.addQuery(pageQuery.getQuery().sql)

        this.logger.setStart()
        const countQuery = this.db.customers.select()
        const count = (await countQuery.execute()).length
        this.logger.setEnd()
        this.logger.addQuery(countQuery.getQuery().sql)
        return {
            queries: this.logger.retrieveQueries(),
            count,
            page: pageData
        }
    }

    searchCustomer = async (searchValue: string) => {
        this.logger.setStart()
        const searchQuery = this.db.customers
            .select()
            .where(
                sql`customers."customers_with_rankings" @@ to_tsquery(${searchValue + ":*"})` 
            )
        const searchResult = await searchQuery.execute()
        this.logger.setEnd()
        this.logger.addQuery(searchQuery.getQuery().sql)

        return {
            queries: this.logger.retrieveQueries(),
            data: searchResult
        }
    }
}
