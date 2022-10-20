import { OrderDetails } from './../entities/OrderDetails';
import { query } from 'express-validator'
import { DataSource } from 'typeorm'
import { Orders } from '../entities'
// import { DB, eq, ExtractModel, JoinBuilderResponses } from 'drizzle-orm'

import { BaseService } from '../types/BaseService'
import { PageResponse } from '../types/PageResponse'
// import { Order, OrderDetailsTable, OrdersTable, ProductsTable, ShippersTable } from '../data/schema'

export class OrderService extends BaseService {
    // private ordersTable?: OrdersTable
    // private detailsTable?: OrderDetailsTable
    // private shippersTable?: ShippersTable
    // private productsTable?: ProductsTable

    constructor(db: DataSource) {
        super(db)
        // this.initTables(db)
    }

    // private readonly initTables = (db: DB): void => {
    //     this.ordersTable = new OrdersTable(db)
    //     this.detailsTable = new OrderDetailsTable(db)
    //     this.shippersTable = new ShippersTable(db)
    //     this.productsTable = new ProductsTable(db)

    //     this.ordersTable.withLogger(this.logger)
    //     this.productsTable.withLogger(this.logger)
    // }

    // private readonly mapOrderInfo = (
    //     orderInfo: JoinBuilderResponses<
    //         [ExtractModel<OrdersTable>, ExtractModel<OrderDetailsTable>, ExtractModel<ShippersTable>]
    //     >
    // ) => {
    //     return orderInfo
    //         .map((order, detail, shipper) => {
    //             // form array of joined order info with separate total price for each order
    //             return {
    //                 ...order,
    //                 TotalPrice: detail.UnitPrice! * detail.Quantity!,
    //                 ShipVia: shipper.CompanyName
    //             }
    //         })
    //         .reduce((order, anotherOrder) => ({
    //             // count total price of all orders
    //             ...order,
    //             TotalPrice: order.TotalPrice + anotherOrder.TotalPrice
    //         }))
    // }

    // private readonly mapProductsInfo = (
    //     productsInfo: JoinBuilderResponses<[ExtractModel<ProductsTable>, ExtractModel<OrderDetailsTable>]>
    // ) => {
    //     return productsInfo.map((product, detail) => {
    //         return {
    //             ...product,
    //             OrderID: detail.OrderID,
    //             Quantity: detail.Quantity,
    //             OrderPrice: detail.UnitPrice,
    //             TotalPrice: detail.Quantity! * detail.UnitPrice!,
    //             Discount: detail.Discount
    //         }
    //     })
    // }

    getOrderInfo = async (id: number) => {
        // const orderInfo = await this.ordersTable!.select()
        //     .leftJoin(this.detailsTable!, (orders, details) => eq(orders.OrderID, details.OrderID))
        //     .leftJoin(this.shippersTable!, (orders, details, shippers) => eq(orders.ShipVia, shippers.ShipperID))
        //     .where((orders, details) => eq(orders.OrderID, id))
        //     .execute()

        // const productsInfo = await this.productsTable!.select()
        //     .leftJoin(this.detailsTable!, (products, details) => eq(products.ProductID, details.ProductID))
        //     .where((products, details) => eq(details.OrderID, id))
        //     .execute()

        return {
            queries: this.logger.retrieveQueries()
            // data: {
            //     ...this.mapOrderInfo(orderInfo),
            //     Products: this.mapProductsInfo(productsInfo)
            // }
        }
    }

    getOrdersPage = async (page: number) => {
        // const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM Orders')
        // const count = rows[0].count

        // const pageQuery =
        //     `SELECT \
        //         SUM(OrderDetails."UnitPrice" * OrderDetails."Quantity") AS TotalPrice, \
        //         SUM(OrderDetails."Quantity") AS TotalQuantity, COUNT(OrderDetails."OrderID") AS TotalProducts, \
        //         Orders."OrderID", Orders."CustomerID", Orders."OrderDate", Orders."RequiredDate", Orders."ShippedDate",\
        //         Orders."ShipVia", Orders."Freight",Orders."ShipName",Orders."ShipAddress",Orders."ShipCity", Orders."ShipCountry"\
        //     FROM Orders \
        //         LEFT JOIN OrderDetails \
        //             ON Orders."OrderID" = OrderDetails."OrderID" \
        //                 GROUP BY Orders."OrderID" \
        //                 ORDER BY Orders."OrderID" \
        //                 LIMIT ${this.pageSize} OFFSET ${(page - 1) * this.pageSize}`

        // const pageData = await this.db.session().execute(pageQuery)

        // this.logger.addQuery(pageQuery)
        const queryBuilder = this.db.createQueryBuilder(Orders, 'orders')
        const count = queryBuilder.getCount()

        const pageBuilder = queryBuilder
            .leftJoinAndSelect('orders.Details', 'details')
            .limit(this.pageSize)
            .offset((page - 1) * this.pageSize)
        const pageData = await pageBuilder.getMany()

        this.logger.addQuery('SELECT COUNT(*) FROM Orders')
        this.logger.addQuery(queryBuilder.getQuery())

        return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
