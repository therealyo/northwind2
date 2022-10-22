import { Kysely } from 'kysely'
import { DB } from 'kysely-codegen'

import { BaseService } from './../types/BaseService'

export class SupplierService extends BaseService {
    constructor(db: Kysely<DB>) {
        super(db)
    }

    getSupplierInfo = async (id: number) => {
        const supplierInfo = await this.db
            .selectFrom('suppliers')
            .selectAll()
            .where('suppliers.SupplierID', '=', id)
            .executeTakeFirst()

        return {
            data: supplierInfo
        }
    }

    getSuppliersPage = async (page: number) => {
        // const countQuery = this.db.queryBuilder().select().from('suppliers').count()
        // this.logger.addQuery(countQuery.toQuery())
        // const { count } = await countQuery.first()
        // const pageQuery = this.db
        //     .queryBuilder()
        //     .select()
        //     .from('suppliers')
        //     .limit(this.pageSize)
        //     .offset(this.pageSize * (page - 1))
        // this.logger.addQuery(pageQuery.toQuery())
        // const pageData = await pageQuery
        // return {
        //     queries: this.logger.retrieveQueries(),
        //     count,
        //     page: pageData }
        const count = await this.db.selectFrom('suppliers').selectAll().execute()
        const pageData = await this.db
            .selectFrom('suppliers')
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
