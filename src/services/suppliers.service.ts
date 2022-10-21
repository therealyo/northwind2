import { Knex } from 'knex'

import { BaseService } from './../types/BaseService'

export class SupplierService extends BaseService {
    constructor(db: Knex) {
        super(db)
    }

    getSupplierInfo = async (id: number) => {
        const infoQuery = this.db.queryBuilder()
        .select()
        .from("suppliers")
        .where({"SupplierID": id})

        this.logger.addQuery(infoQuery.toQuery())
        const supplierInfo = await infoQuery

        return {
            queries: this.logger.retrieveQueries(),
            data: supplierInfo
        }
    }

    getSuppliersPage = async (page: number) => {
        const countQuery = this.db.queryBuilder().select().from('suppliers').count()

        this.logger.addQuery(countQuery.toQuery())
        const { count } = await countQuery.first()

        const pageQuery = this.db
            .queryBuilder()
            .select()
            .from('suppliers')
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))

        this.logger.addQuery(pageQuery.toQuery())
        const pageData = await pageQuery

        return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
