import { Kysely } from 'kysely'
import { DB } from 'kysely-codegen'
import { BaseService } from './../types/BaseService'

export class CustomerService extends BaseService {
    constructor(db: Kysely<DB>) {
        super(db)
    }

    getCustomerInfo = async (id: string) => {
        const customerInfo = await this.db
            .selectFrom('customers')
            .selectAll()
            .where('customers.CustomerID', '=', id)
            .execute()

        return {
            data: customerInfo
        }
    }

    getCustomersPage = async (page: number) => {
        const count = await this.db.selectFrom('customers').selectAll().execute()
        const pageData = await this.db
            .selectFrom('customers')
            .selectAll()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
            .execute()

        return {
            count: count.length,
            page: pageData
        }
    }
}
