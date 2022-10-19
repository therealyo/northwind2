import { DataSource } from 'typeorm'

import { BaseService } from './../types/BaseService'
import { Products } from './../entities/Products'
import { Suppliers } from '../entities/Suppliers'

export class ProductService extends BaseService {
    constructor(db: DataSource) {
        super(db)
    }

    getProductInfo = async (id: number) => {
        const queryBuilder = this.db
            .createQueryBuilder(Products, 'products')
            .leftJoinAndSelect('products.Supplier', 'suppliers')
            .where('products.ProductID = :id', { id: id })

        const productInfo = await queryBuilder.getOne()
        this.logger.addQuery(queryBuilder.getQuery())

        return {
            queries: this.logger.retrieveQueries(),
            data: { ...productInfo, Supplier: productInfo?.Supplier.CompanyName }
        }
    }

    getProductsPage = async (page: number) => {
        const queryBuilder = this.db.createQueryBuilder(Products, 'customers')
        const pageQueryBuilder = queryBuilder.limit(this.pageSize).offset((page - 1) * this.pageSize)

        const count = await queryBuilder.getCount()

        const pageData = await pageQueryBuilder.getMany()

        this.logger.addQuery('SELECT COUNT(*) FROM customers')
        this.logger.addQuery(pageQueryBuilder.getQuery())

        return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
