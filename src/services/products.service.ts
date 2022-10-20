import { PrismaClient } from '@prisma/client'

import { BaseService } from './../types/BaseService'

export class ProductService extends BaseService {
    constructor(db: PrismaClient) {
        super(db)
    }

    getProductInfo = async (id: number) => {
        const productInfo = await this.db.products.findUnique({
            where: {
                ProductID: id
            },
            include: {
                Supplier: true
            }
        })

        return {
            data: {
                ...productInfo,
                Supplier: productInfo!.Supplier!.CompanyName
            }
        }
    }

    getProductsPage = async (page: number) => {
        const count = await this.db.products.count()
        const pageData = await this.db.products.findMany({
            take: this.pageSize,
            skip: this.pageSize * (page - 1)
        })

        return {
            count,
            page: pageData
        }
    }
}
