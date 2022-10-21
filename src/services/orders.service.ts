import { Knex } from 'knex';

import { BaseService } from '../types/BaseService'

export class OrderService extends BaseService {


    constructor(db: Knex) {
        super(db)
    }

   
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

        // return {
        //     queries: this.logger.retrieveQueries(),
        //     data: {
        //         ...this.mapOrderInfo(orderInfo),
        //         Products: this.mapProductsInfo(productsInfo)
        //     }
        // }
    }

    getOrdersPage = async (page: number) => {
    //    
    }
}
