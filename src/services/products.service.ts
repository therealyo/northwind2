import { Kysely } from 'kysely';
import { DB } from 'kysely-codegen';

import { BaseService } from './../types/BaseService'

export class ProductService extends BaseService {
    constructor(db: Kysely<DB>) {
        super(db)
    }

    getProductInfo = async (id: number) => {
        const customerInfo = await this.db
            .selectFrom('products')
            .leftJoin("suppliers", "products.SupplierID", "suppliers.SupplierID")
            .select([
                'products.ProductName',
                'suppliers.CompanyName',
                'products.QuantityPerUnit',
                'products.UnitPrice',
                'products.UnitsInStock',
                'products.UnitsOnOrder',
                'products.ReorderLevel',
                'products.Discontinued'
            ])
            .where('products.ProductID', '=', id)
            .execute()
            
        return {
            data: customerInfo
        }
    }

    getProductsPage = async (page: number) => {
        const count = await this.db.selectFrom('products').selectAll().execute()
        const pageData = await this.db
            .selectFrom('products')
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
