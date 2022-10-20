import { PrismaClient } from '@prisma/client';
import { BaseService } from '../types/BaseService';

export class CustomerService extends BaseService {

    constructor(db: PrismaClient) {
        super(db)
    }

    getCustomerInfo = async (id: string) => {
        const customerInfo = await this.db.customers.findFirst({
            where: {
                CustomerID: id
            }
        })

        return {
            data: customerInfo
        }
    }

    getCustomersPage = async (page: number) => {
        const count = await this.db.customers.count()

        const pageData = await this.db.customers.findMany({
            take: this.pageSize,
            skip: (page - 1) * this.pageSize
        })

        return {
            count,
            page: pageData
        }
    }
}
