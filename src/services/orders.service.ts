import { DataSource } from 'typeorm'
import { Orders } from '../entities'

import { BaseService } from '../types/BaseService'

export class OrderService extends BaseService {
    constructor(db: DataSource) {
        super(db)
    }

    getOrderInfo = async (id: number) => {
        const queryBuilder = this.db
            .createQueryBuilder(Orders, 'orders')
            .leftJoinAndSelect("orders.Details", 'details')
            .leftJoinAndSelect("orders.Shipper", "shipper")
            .leftJoinAndSelect("details.Product", "products")
            .where('orders.OrderID = :id', { id: id })

        const queryResult = await queryBuilder.getOne()
        
        let orderInfo
        if (queryResult) {
            orderInfo = this.mapOrderDetails(queryResult)
        }

        this.logger.addQuery(queryBuilder.getQuery())

        return {
            queries: this.logger.retrieveQueries(),
            data: orderInfo
        }
    }

    getOrdersPage = async (page: number) => {
        const queryBuilder = this.db.createQueryBuilder(Orders, 'orders')
        const count = queryBuilder.getCount()

        const pageBuilder = queryBuilder
            .leftJoinAndSelect('orders.Details', 'details')
            .limit(this.pageSize)
            .offset((page - 1) * this.pageSize)
        const pageData = await pageBuilder.getMany()

        this.logger.addQuery('SELECT COUNT(*) FROM Orders')
        this.logger.addQuery(queryBuilder.getQuery())

        return { queries: this.logger.retrieveQueries(), count, page: pageData.map(this.mapOrderPageDetails) }
    }

    private mapOrderDetails = (orderItem: Orders) => {
        return {
            TotalPrice: orderItem.Details.reduce((sum, curr) => sum + curr.Quantity * curr.UnitPrice, 0),
            TotalQuantity: orderItem.Details.reduce((sum, curr) => sum + curr.Quantity, 0),
            TotalProducts: orderItem.Details.length,
            TotalDiscount: orderItem.Details.reduce((sum, curr) => sum + curr.Discount, 0),
            OrderID: orderItem.OrderID,
            CustomerID: orderItem.CustomerID,
            OrderDate: orderItem.OrderDate,
            RequiredDate: orderItem.RequiredDate,
            ShippedDate: orderItem.ShippedDate,
            ShipVia: orderItem.Shipper.CompanyName,
            Freight: orderItem.Freight,
            ShipName: orderItem.ShipName,
            ShipAddress: orderItem.ShipAddress,
            ShipCity: orderItem.ShipCity,
            Products: orderItem.Details.map((detail) => { 
                return {
                    ProductName: detail.Product.ProductName,
                    Quantity: detail.Quantity,
                    UnitPrice: detail.UnitPrice,
                    TotalPrice: detail.Quantity * detail.UnitPrice,
                    Discount: detail.Discount
                }
            })
        }
    }

    private mapOrderPageDetails = (orderItem: Orders) => {
        return {
            TotalPrice: orderItem.Details.reduce((sum, curr) => sum + curr.Quantity * curr.UnitPrice, 0),
            TotalQuantity: orderItem.Details.reduce((sum, curr) => sum + curr.Quantity, 0),
            TotalProducts: orderItem.Details.length,
            OrderID: orderItem.OrderID,
            CustomerID: orderItem.CustomerID,
            OrderDate: orderItem.OrderDate,
            RequiredDate: orderItem.RequiredDate,
            ShippedDate: orderItem.ShippedDate,
            ShipVia: orderItem.ShipVia,
            Freight: orderItem.Freight,
            ShipName: orderItem.ShipName,
            ShipAddress: orderItem.ShipAddress,
            ShipCity: orderItem.ShipCity
        }
    }
}
