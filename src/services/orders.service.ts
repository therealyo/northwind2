import { Kysely, sql } from 'kysely'
import { DB } from 'kysely-codegen'

import { BaseService } from '../types/BaseService'

export class OrderService extends BaseService {
    constructor(db: Kysely<DB>) {
        super(db)
    }

    getOrderInfo = async (id: number) => {
        const orderInfo = await this.db
            .selectFrom('orders')
            .leftJoin('orderdetails', 'orders.OrderID', 'orderdetails.OrderID')
            .leftJoin('shippers', 'orders.ShipVia', 'shippers.ShipperID')
            .select([
                sql`SUM(orderdetails."UnitPrice" * orderdetails."Quantity")`.as('TotalPrice'),
                sql`SUM(orderdetails."Quantity")`.as('TotalQuantity'),
                sql`COUNT(orderdetails."OrderID")`.as('TotalProducts'),
                sql`SUM(orderdetails."Discount")`.as('TotalDiscount'),
                'orders.OrderID',
                'orders.OrderDate',
                'orders.RequiredDate',
                'orders.ShippedDate',
                'shippers.CompanyName as ShipVia',
                'orders.Freight',
                'orders.ShipName',
                'orders.ShipAddress',
                'orders.ShipCity',
                'orders.ShipCountry',
                'orders.ShipPostalCode',
                'orders.ShipRegion'
            ])
            .groupBy(['orders.OrderID', 'shippers.CompanyName'])
            .where('orders.OrderID', '=', id)
            .executeTakeFirst()

        const productInfo = await this.db
            .selectFrom('products')
            .leftJoin('orderdetails', 'products.ProductID', 'orderdetails.ProductID')
            .select([
                sql`orderdetails."Quantity" * orderdetails."UnitPrice"`.as('TotalPrice'),
                'products.UnitPrice',
                'orderdetails.Quantity',
                'orderdetails.Discount',
                'products.ProductName'
            ])
            .groupBy(['products.ProductID', 'orderdetails.id'])
            .where('orderdetails.OrderID', '=', id)
            .execute()

        return {
            data: {
                ...orderInfo,
                Products: productInfo
            }
        }
    }

    getOrdersPage = async (page: number) => {
        const count = await this.db.selectFrom('orders').selectAll().execute()
        const pageData = await this.db
            .selectFrom('orders')
            .leftJoin('orderdetails', 'orders.OrderID', 'orderdetails.OrderID')
            .select([
                sql`SUM(orderdetails."UnitPrice" * orderdetails."Quantity")`.as('TotalPrice'),
                sql`SUM(orderdetails."Quantity")`.as('TotalQuantity'),
                sql`COUNT(orderdetails."OrderID")`.as('TotalProducts'),
                'orders.OrderID',
                'orders.OrderDate',
                'orders.RequiredDate',
                'orders.ShippedDate',
                'orders.ShipVia',
                'orders.Freight',
                'orders.ShipName',
                'orders.ShipAddress',
                'orders.ShipCity',
                'orders.ShipCountry'
            ])
            .groupBy(['orders.OrderID'])
            .limit(this.pageSize)
            .offset(this.pageSize * (page - 1))
            .execute()

        return {
            count: count.length,
            page: pageData
        }
    }
}
