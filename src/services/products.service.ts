import { Knex } from 'knex'

import { BaseService } from './../types/BaseService'

export class ProductService extends BaseService {

    constructor(db: Knex) {
        super(db)

    }

   

    getProductInfo = async (id: number) => {
        
        // const data = await this.productsTable!.select()
        //     .leftJoin(this.suppliersTable!, (products, suppliers) => eq(products.SupplierID, suppliers.SupplierID))
        //     .where((products, suppliers) => eq(products.ProductID, id))
        //     .execute()

        // const productInfo = data.map((product, supplier) => {
        //     return { ...product, Supplier: supplier.CompanyName }
        // })[0]

        // return {
        //     queries: this.logger.retrieveQueries(),
        //     data: productInfo
        // }
    }

    getProductsPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM Products')
        // const count = rows[0].count

        // this.logger.addQuery('SELECT COUNT(*) FROM suppliers')

        // const pageData: Product[] = await this.productsTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()

        // return { 
        //     queries: this.logger.retrieveQueries(), 
        //     count, 
        //     page: pageData 
        // }
    }
}
