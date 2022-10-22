import { orderdetails, orders, PrismaClient } from '@prisma/client';

import { BaseService } from '../types/BaseService'

export class OrderService extends BaseService {

    constructor(db: PrismaClient) {
        super(db)
    }

    getOrderInfo = async (id: number) => {
        const orderInfo = await this.db.orders.findUnique({
            where: {
                OrderID: id
            },
            include: {
                Details: {
                    include: {
                        Products: true
                    }
                },
                ShippedBy: true
            }
        })
        
        return {data: this.mapOrderDetails(orderInfo)}
    }

    getOrdersPage = async (page: number) => {
        const count = await this.db.orders.count()
        const pageData = await this.db.orders.findMany({
            take: this.pageSize,
            skip: this.pageSize * (page - 1),
            include: {
                Details: true
            }
        })
        

        return {
            count,
            page: pageData.map(this.mapOrderPageDetails)
        }
    }

    private mapOrderDetails = (orderItem: orders) => {
        return {
            TotalPrice: orderItem.Details.reduce((sum: number, curr: orderdetails) => sum + curr.Quantity! * curr.UnitPrice!, 0),
            TotalQuantity: orderItem.Details.reduce((sum: number, curr: orderdetails) => sum + curr.Quantity!, 0),
            TotalProducts: orderItem.Details.length,
            TotalDiscount: Number(orderItem.Details.reduce((sum: number, curr: orderdetails) => sum + curr.Discount!, 0)),
            OrderID: orderItem.OrderID,
            CustomerID: orderItem.CustomerID,
            OrderDate: orderItem.OrderDate,
            RequiredDate: orderItem.RequiredDate,
            ShippedDate: orderItem.ShippedDate,
            ShipVia: orderItem.ShippedBy.CompanyName,
            Freight: orderItem.Freight,
            ShipName: orderItem.ShipName,
            ShipAddress: orderItem.ShipAddress,
            ShipCity: orderItem.ShipCity,
            Products: orderItem.Details.map((detail: orderdetails) => { 
                console.log(detail.Products);
                return {
                    ProductName: detail.Products.ProductName,
                    Quantity: detail.Quantity,
                    UnitPrice: detail.Products.UnitPrice,
                    TotalPrice: detail.Quantity * detail.UnitPrice,
                    Discount: detail.Discount
                }
            })
        }
    }

    private mapOrderPageDetails = (orderItem: orders) => {
        return {
            TotalPrice: orderItem.Details.reduce((sum: number, curr: orderdetails) => sum + curr.Quantity! * curr.UnitPrice!, 0),
            TotalQuantity: orderItem.Details.reduce((sum: number, curr: orderdetails) => sum + curr.Quantity!, 0),
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
