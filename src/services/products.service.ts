import { Knex } from 'knex'

import { BaseService } from './../types/BaseService'

export class ProductService extends BaseService {
    constructor(db: Knex) {
        super(db)
    }

    getProductInfo = async (id: number) => {
        const infoQuery = this.db
            .queryBuilder()
            .select(
                'ProductName',
                'CompanyName',
                'QuantityPerUnit',
                'UnitPrice',
                'UnitsInStock',
                'UnitsOnOrder',
                'ReorderLevel',
                'Discontinued'
            )
            .from('products')
            .leftJoin('suppliers', 'products.SupplierID', 'suppliers.SupplierID')
            .where({ ProductID: id })

        this.logger.addQuery(infoQuery.toQuery())
        const supplierInfo = await infoQuery.first()

        return {
            queries: this.logger.retrieveQueries(),
            data: { ...supplierInfo, Supplier: supplierInfo.CompanyName }
        }
    }

    getProductsPage = async (page: number) => {
        const countQuery = this.db.queryBuilder().select().from('products').count()

        this.logger.addQuery(countQuery.toQuery())
        const { count } = await countQuery.first()

        const pageQuery = this.db
            .queryBuilder()
            .select()
            .from('products')
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))

        this.logger.addQuery(pageQuery.toQuery())
        const pageData = await pageQuery

        return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
