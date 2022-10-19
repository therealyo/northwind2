import { ItemInfo } from './../types/ItemInfo'
// import { DB, eq } from 'drizzle-orm'

import { PageResponse } from '../types/PageResponse'
import { BaseService } from './../types/BaseService'
import { DataSource } from 'typeorm'
import { Customers } from '../entities'
// import { CustomersTable, Customer } from '../data/schema'

export class CustomerService extends BaseService {
    // private customersTable?: CustomersTable

    constructor(db: DataSource) {
        super(db)
        // this.initTables(db)
    }

    // private readonly initTables = (db: DB): void => {
    //     // this.customersTable = new CustomersTable(db)
    //     // this.customersTable.withLogger(this.logger)
    // }

    getCustomerInfo = async (id: string) => {
        // const customerInfo: Customer = (
        //     await this.customersTable!
        //         .select()
        //         .where(eq(this.customersTable!.CustomerID, id))
        //         .execute()
        // )[0]
        // const customerData = await this.db.createQueryBuilder()
        
        const queryBuilder = this.db
            .createQueryBuilder(Customers, 'customers')
            .where('customers.CustomerID = :id', { id: id })

        this.logger.addQuery(queryBuilder.getQuery())
        // this.db.logger
        const supplierInfo = await queryBuilder.getOne()

        console.log(supplierInfo)
        return {
            queries: this.logger.retrieveQueries(),
            data: supplierInfo
        }
        return {
            queries: this.logger.retrieveQueries()
            // data: customerInfo
        }
    }

    getCustomersPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM customers')
        // const count = rows[0].count

        this.logger.addQuery('SELECT COUNT(*) FROM customers')

        // const pageData: Customer[] = await this.customersTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()

        return { queries: this.logger.retrieveQueries() }
    }
}
