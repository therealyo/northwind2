import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { BaseService } from './../types/BaseService'
import { Suppliers } from './../entities/Suppliers'
export class SupplierService extends BaseService {
    constructor(db: DataSource) {
        super(db)
    }


    getSupplierInfo = async (id: number) => {
        const queryBuilder = this.db
            .createQueryBuilder(Suppliers, 'suppliers')
            .where('suppliers.SupplierID = :id', { id: id })

        this.logger.addQuery(queryBuilder.getQuery())
        const supplierInfo = await queryBuilder.getOne()

        console.log(supplierInfo)
        return {
            queries: this.logger.retrieveQueries(),
            data: supplierInfo
        }
    }

    getSuppliersPage = async (page: number) => {
        const queryBuilder = this.db.createQueryBuilder(Suppliers, 'suppliers')
        const pageQueryBuilder = queryBuilder.limit(this.pageSize).offset((page - 1) * this.pageSize)

        const count = await queryBuilder.getCount()
        const pageData = await pageQueryBuilder.getMany()

        this.logger.addQuery('SELECT COUNT(*) FROM suppliers')
        this.logger.addQuery(pageQueryBuilder.getQuery())

        return {
            queries: this.logger.retrieveQueries(),
            count,
            page: pageData
        }
    }
}
