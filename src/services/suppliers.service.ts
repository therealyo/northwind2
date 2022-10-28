import { eq } from 'drizzle-orm/expressions'

import { suppliers } from '../data/schema'
import { BaseService } from './../types/BaseService'

export class SupplierService extends BaseService {
    getSupplierInfo = async (id: number) => {
        this.logger.setStart()
        const query = this.db.suppliers
            .select()
            .where(eq(suppliers.SupplierID, id))
        const supplierInfo = await query.execute()
        this.logger.setEnd()
        this.logger.addQuery(query.getQuery().sql)

        return {
            queries: this.logger.retrieveQueries(),
            data: supplierInfo[0]
        }
    }

    getSuppliersPage = async (page: number) => {
        this.logger.setStart()
        const pageQuery = this.db.suppliers
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
        const pageData = await pageQuery.execute()
        this.logger.setEnd()
        this.logger.addQuery(pageQuery.getQuery().sql)

        this.logger.setStart()
        const countQuery = this.db.suppliers.select()
        const count = (await countQuery.execute()).length
        this.logger.setEnd()
        this.logger.addQuery(countQuery.getQuery().sql)

        return {
            queries: this.logger.retrieveQueries(),
            count,
            page: pageData
        }
    }
}
