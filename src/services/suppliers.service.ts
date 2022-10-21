import { Knex } from 'knex';

import { BaseService } from './../types/BaseService'

export class SupplierService extends BaseService {

    constructor(db: Knex) {
        super(db)
    }

    
    getSupplierInfo= async (id: number) => {
        // const supplierInfo = (
        //     await this.suppliersTable!
        //         .select()
        //         .where(eq(this.suppliersTable!.SupplierID, id))
        //         .execute()
        // )[0]
        // return {
        //     queries: this.logger.retrieveQueries(),
        //     data: supplierInfo
        // }
    }

    getSuppliersPage = async (page: number) => {
    //     const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM suppliers')
    //     const count = rows[0].count

    //     this.logger.addQuery('SELECT COUNT(*) FROM suppliers')

    //     const pageData: Supplier[] = await this.suppliersTable!.select()
    //         .limit(this.pageSize)
    //         .offset((page - 1) * this.pageSize)
    //         .execute()

    //     return { queries: this.logger.retrieveQueries(), count, page: pageData }
    // }
    }
}
