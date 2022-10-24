import { eq } from 'drizzle-orm/expressions'

import { suppliers } from '../data/schema'
import { BaseService } from './../types/BaseService'

export class SupplierService extends BaseService {
    getSupplierInfo = async (id: number) => {
        const supplierInfo = await this.db.suppliers
            .select()
            .where(eq(suppliers.SupplierID, id))
            .execute()

        return {
            data: supplierInfo[0]
        }
    }

    getSuppliersPage = async (page: number) => {
        const pageData = await this.db.suppliers
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
            .execute()

        const count = (await this.db.suppliers.select().execute()).length

        return {
            count,
            page: pageData
        }
    }
}
