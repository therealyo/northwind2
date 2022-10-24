import { eq } from 'drizzle-orm/expressions'
import { BaseService } from './../types/BaseService'
import { customers } from './../data/schema'

export class CustomerService extends BaseService {
    getCustomerInfo = async (id: string) => {
        const customerInfo = await this.db.customers
            .select()
            .where(eq(customers.CustomerID, id))
            .execute()

        return {
            data: customerInfo[0]
        }
    }

    getCustomersPage = async (page: number) => {
        const pageData = await this.db.customers
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
            .execute()

        return {
            page: pageData
        }
    }
}
