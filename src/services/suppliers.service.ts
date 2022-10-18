import { DataSource } from 'typeorm';
// import { DB, eq } from 'drizzle-orm'

import { ItemInfo } from './../types/ItemInfo'
import { BaseService } from './../types/BaseService'
import { PageResponse } from '../types/PageResponse'
// import { Supplier, SuppliersTable } from './../data/schema'

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

    async getSupplierInfo(id: number) {
        // const supplierInfo = (
        //     await this.suppliersTable!
        //         .select()
        //         .where(eq(this.suppliersTable!.SupplierID, id))
        //         .execute()
        // )[0]
        return {
            queries: this.logger.retrieveQueries(),
            // data: supplierInfo
        }
    }

    getSuppliersPage = async (page: number)=> {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM suppliers')
        // const count = rows[0].count

        // this.logger.addQuery('SELECT COUNT(*) FROM suppliers')

        // const pageData: Supplier[] = await this.suppliersTable!.select()
        //     .limit(this.pageSize)
        //     .offset((page - 1) * this.pageSize)
        //     .execute()

        return { queries: this.logger.retrieveQueries(),
            //  count,
            //   page: pageData
             }
    }
}
