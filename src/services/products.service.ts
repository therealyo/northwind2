import { DataSource } from 'typeorm'

import { BaseService } from './../types/BaseService'
import { Products } from './../entities/Products'
import { Suppliers } from '../entities/Suppliers'

export class ProductService extends BaseService {
    constructor(db: DataSource) {
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
        const queryBuilder = this.db
            .createQueryBuilder(Products, 'products')
            .leftJoinAndSelect('products.supplier', 'suppliers')
            .where('products.ProductID = :id', { id: id })

        const productInfo = await queryBuilder.getOne()
        // console.log(productInfo);
        this.logger.addQuery(queryBuilder.getQuery())

        return {
            queries: this.logger.retrieveQueries(),
            data: { ...productInfo, supplier: productInfo?.supplier.CompanyName }
        }
    }

    getProductsPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM Products')
        // const count = rows[0].count

        // this.logger.addQuery('SELECT COUNT(*) FROM suppliers')

        // const pageData: Product[] = await this.productsTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()

        const queryBuilder = this.db.createQueryBuilder(Products, 'customers')
        const pageQueryBuilder = queryBuilder.limit(this.pageSize).offset((page - 1) * this.pageSize)

        const count = await queryBuilder.getCount()

        const pageData = await pageQueryBuilder.getMany()

        this.logger.addQuery('SELECT COUNT(*) FROM customers')
        this.logger.addQuery(pageQueryBuilder.getQuery())

        return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
