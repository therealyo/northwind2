import { eq } from 'drizzle-orm/expressions'
import { products, suppliers } from './../data/schema'
import { BaseService } from './../types/BaseService'

export class ProductService extends BaseService {
    getProductInfo = async (id: number) => {
        const productQuery = this.db.products
            .select()
            .leftJoin(suppliers, eq(products.SupplierID, suppliers.SupplierID))
            .where(eq(products.ProductID, id))

        const productInfo = (await productQuery.execute())[0]

        return {
            data: {
                ...productInfo.products,
                Supplier: productInfo.suppliers?.CompanyName
            }
        }
    }

    getProductsPage = async (page: number) => {
        const pageData = await this.db.products
            .select()
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
            .execute()

        const count = (await this.db.products.select().execute()).length

        return {
            count,
            page: pageData
        }
    }
}
