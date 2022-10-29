import { sql } from 'drizzle-orm'
import { eq } from 'drizzle-orm/expressions'
import { products, suppliers } from './../data/schema'
import { BaseService } from './../types/BaseService'

export class ProductService extends BaseService {
    getProductInfo = async (id: number) => {
        this.logger.setStart()
        const productQuery = this.db.products
            .select()
            .leftJoin(suppliers, eq(products.SupplierID, suppliers.SupplierID))
            .where(eq(products.ProductID, id))
        
            const productInfo = (await productQuery.execute())[0]

        this.logger.setEnd()
        this.logger.addQuery(productQuery.getQuery().sql)
    


        return {
            queries: this.logger.retrieveQueries(),
            data: {
                ...productInfo.products,
                Supplier: productInfo.suppliers?.CompanyName
            }
        }
    }

    getProductsPage = async (page: number) => {
        this.logger.setStart()
        const pageQuery = this.db.products
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
        const pageData = await pageQuery.execute()
        this.logger.setEnd()
        this.logger.addQuery(pageQuery.getQuery().sql)

        this.logger.setStart()
        const countQuery = this.db.products.select()
        const count = (await countQuery.execute()).length
        this.logger.setEnd()
        this.logger.addQuery(countQuery.getQuery().sql)

        return {
            queries: this.logger.retrieveQueries(),
            count,
            page: pageData
        }
    }

    searchProduct = async (searchValue: string) => {
        this.logger.setStart()
        const searchQuery = this.db.products
            .select()
            .where(
                sql`products."products_ranking" @@ to_tsquery(${searchValue + ":*"})` 
            )
        const searchResult = await searchQuery.execute()
        this.logger.setEnd()
        this.logger.addQuery(searchQuery.getQuery().sql)

        return {
            queries: this.logger.retrieveQueries(),
            data: searchResult
        }
    }
}
