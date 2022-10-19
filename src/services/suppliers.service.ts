import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { BaseService } from './../types/BaseService'
import { Suppliers } from './../entities/Suppliers'
export class SupplierService extends BaseService {
    // private suppliersTable?: SuppliersTable

    constructor(db: DataSource) {
        super(db)
        // this.initTables(db)
    }

    // private readonly initTables = (db: DB): void => {
    //     this.suppliersTable = new SuppliersTable(db)
    //     this.suppliersTable.withLogger(this.logger)
    // }

    getSupplierInfo = async (id: number) => {
        // const supplierInfo = (
        //     await this.suppliersTable!
        //         .select()
        //         .where(eq(this.suppliersTable!.SupplierID, id))
        //         .execute()
        // )[0]
        // const suppliers = this.db.getRepository(Suppliers)
        // const suppliers = this.db.getRepository(Suppliers)
        const queryBuilder = this.db
            .createQueryBuilder(Suppliers, 'suppliers')
            .where('suppliers.SupplierID = :id', { id: id })

        this.logger.addQuery(queryBuilder.getQuery())
        // this.db.logger
        const supplierInfo = await queryBuilder.getOne()

        console.log(supplierInfo)
        return {
            queries: this.logger.retrieveQueries(),
            data: supplierInfo
        }
    }

    getSuppliersPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM suppliers')
        // const count = rows[0].count

        // const pageData: Supplier[] = await this.suppliersTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()
        const queryBuilder = this.db.createQueryBuilder(Suppliers, 'suppliers')
        const pageQueryBuilder = queryBuilder.limit(this.pageSize).offset((page - 1) * this.pageSize)

        const count = await queryBuilder.getCount()

        const pageData = await pageQueryBuilder.getMany()

        this.logger.addQuery('SELECT COUNT(*) FROM suppliers')
        this.logger.addQuery(pageQueryBuilder.getQuery())
        // console.log(pageData);

        return {
            queries: this.logger.retrieveQueries(),
            count,
            page: pageData
        }
    }
}
