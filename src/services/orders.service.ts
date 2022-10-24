import { sql } from 'drizzle-orm'
import { eq } from 'drizzle-orm/expressions'

import { Order, OrderDetails, orderDetails, orders, Product, products, Shipper, shippers } from './../data/schema'
import { BaseService } from '../types/BaseService'

type OrderInfo = {
    orders: Order | null
    orderDetails: OrderDetails | null
    shippers: Shipper | null
    products: Product | null
} | null
export class OrderService extends BaseService {
    getOrderInfo = async (id: number) => {
        const orderInfo = await this.db.orders
            .select()
            .leftJoin(orderDetails, eq(orders.OrderID, orderDetails.OrderID))
            .leftJoin(shippers, eq(orders.ShipVia, shippers.ShipperID))
            .leftJoin(products, eq(orderDetails.ProductID, products.ProductID))
            .where(eq(orders.OrderID, id))
            .execute()

        return {
            data: this.mapOrderInfo(orderInfo)
        }
    }

    getOrdersPage = async (page: number) => {
        const count = (await this.db.orders.select().execute()).length

        const { rows: pageData } = await this.db.execute(sql`
        SELECT \
            SUM(OrderDetails."UnitPrice" * OrderDetails."Quantity") AS "TotalPrice", \
            SUM(OrderDetails."Quantity") AS "TotalQuantity", COUNT(OrderDetails."OrderID") AS "TotalProducts", \
            Orders."OrderID", Orders."CustomerID", Orders."OrderDate", Orders."RequiredDate", Orders."ShippedDate",\
            Orders."ShipVia", Orders."Freight",Orders."ShipName",Orders."ShipAddress",Orders."ShipCity", Orders."ShipCountry"\
        FROM Orders \
            LEFT JOIN OrderDetails \
                ON Orders."OrderID" = OrderDetails."OrderID" \
                    GROUP BY Orders."OrderID" \
                    ORDER BY Orders."OrderID" \
                    LIMIT ${this.pageSize} OFFSET ${(page - 1) * this.pageSize}`)

        return {
            count,
            page: pageData
        }
    }

    private mapOrderInfo = (order: OrderInfo[]) => {
        const mappedOrderData = order
            .map((item) => {
                // form array of joined order info with separate total price for each order
                return {
                    ...item,
                    TotalPrice: Number(item?.orderDetails?.UnitPrice!) * item?.orderDetails?.Quantity!,
                    ShipVia: item?.shippers?.CompanyName
                }
            })
            .reduce((prev, order) => ({
                // count total price of all orders
                ...prev,
                TotalPrice: prev.TotalPrice + order.TotalPrice
            }))

        return {
            ...mappedOrderData.orders,
            TotalPrice: mappedOrderData.TotalPrice,
            ShipVia: mappedOrderData.ShipVia,
            Products: order.map((item) => {
                return {
                    ProductName: item?.products?.ProductName,
                    UnitPrice: item?.products?.UnitPrice,
                    TotalPrice: item?.orderDetails?.Quantity! * Number(item?.orderDetails?.UnitPrice!),
                    Discount: Number(item?.orderDetails?.Discount),
                    Quantity: item?.orderDetails?.Quantity
                }
            })
        }
    }
}
