// import { DB, eq } from 'drizzle-orm'

// import { ItemInfo } from './../types/ItemInfo'
import { BaseService } from './../types/BaseService'
// import { PageResponse } from '../types/PageResponse'
// import { Product, ProductsTable, SuppliersTable } from '../data/schema'

export class ProductService extends BaseService {
//     private productsTable?: ProductsTable
//     private suppliersTable?: SuppliersTable

//     constructor(db: DB) {
//         super(db)

//         this.initTables(db)
//     }

//     private readonly initTables = (db: DB): void => {
//         this.productsTable = new ProductsTable(db)
//         this.suppliersTable = new SuppliersTable(this.db)

//         this.productsTable.withLogger(this.logger)
//     }

    getProductInfo = async (id: number) => {
        
//         const data = await this.productsTable!.select()
//             .leftJoin(this.suppliersTable!, (products, suppliers) => eq(products.SupplierID, suppliers.SupplierID))
//             .where((products, suppliers) => eq(products.ProductID, id))
//             .execute()

//         const productInfo = data.map((product, supplier) => {
//             return { ...product, Supplier: supplier.CompanyName }
//         })[0]

//         return {
//             queries: this.logger.retrieveQueries(),
//             data: productInfo
//         }
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
