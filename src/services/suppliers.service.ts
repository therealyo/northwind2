import { PrismaClient } from '@prisma/client';
import { BaseService } from './../types/BaseService'

export class SupplierService extends BaseService {
    constructor(db: PrismaClient) {
        super(db)
    }

    getSupplierInfo = async (id: number) => {
        const supplierInfo = await this.db.suppliers.findFirst({
            where: {
                SupplierID: id
            }
        })

        return {
            data: supplierInfo
        }
    }

    getSuppliersPage = async (page: number) => {
        const pageData = await this.db.suppliers.findMany({
            take: this.pageSize,
            skip: (page - 1) * this.pageSize
        })

        const count = await this.db.suppliers.count()

        return { 
            count, 
            page: pageData 
        }
    }
}
