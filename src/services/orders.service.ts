import { Kysely } from 'kysely';
import { DB } from 'kysely-codegen';

import { BaseService } from '../types/BaseService'

export class OrderService extends BaseService {
    constructor(db: Kysely<DB>) {
        super(db)
    }

    getOrderInfo = async (id: number) => {
        // const orderQuery = this.db
        //     .queryBuilder()
        //     .select(
        //         this.db.raw('sum(?? * ??) as ??', ['orderdetails.UnitPrice', 'orderdetails.Quantity', 'TotalPrice']),
        //         'orders.OrderID',
        //         'orders.OrderID',
        //         'orders.OrderDate',
        //         'orders.RequiredDate',
        //         'orders.ShippedDate',
        //         'shippers.CompanyName as ShipVia',
        //         'orders.Freight',
        //         'orders.ShipName',
        //         'orders.ShipAddress',
        //         'orders.ShipCity',
        //         'orders.ShipCountry'
        //     )
        //     .from('orders')
        //     .leftJoin('orderdetails', 'orders.OrderID', 'orderdetails.OrderID')
        //     .leftJoin('shippers', 'orders.ShipVia', 'shippers.ShipperID')
        //     .groupBy('orders.OrderID')
        //     .groupBy('shippers.CompanyName')
        //     .where('orders.OrderID', '=', id)

        // this.logger.addQuery(orderQuery.toQuery())
        // const orderInfo = await orderQuery.first()

        // const productsQuery = this.db
        //     .queryBuilder()
        //     .select()
        //     .from('products')
        //     .leftJoin('orderdetails', 'products.ProductID', 'orderdetails.ProductID')
        //     .groupBy('products.ProductID')
        //     .groupBy('orderdetails.id')
        //     .groupBy('orderdetails.OrderID')
        //     .where('orderdetails.OrderID', '=', id)
        // this.logger.addQuery(productsQuery.toQuery())
        // const products = await productsQuery

        // return {
        //     queries: this.logger.retrieveQueries(),
        //     data: { ...orderInfo, Products: products }
        // }
    }

    getOrdersPage = async (page: number) => {
        // const countQuery = this.db.queryBuilder().select().from('orders').count()

        // this.logger.addQuery(countQuery.toQuery())
        // const { count } = await countQuery.first()

        // const pageQuery = this.db('orders')
        //     .leftJoin('orderdetails', 'orders.OrderID', 'orderdetails.OrderID')
        //     .select(
        //         this.db.raw('sum(?? * ??) as ??', ['orderdetails.UnitPrice', 'orderdetails.Quantity', 'TotalPrice']),
        //         this.db.raw('sum(??) as ??', ['orderdetails.Quantity', 'TotalQuantity']),
        //         this.db.raw('COUNT(??) as ??', ['orderdetails.OrderID', 'TotalProducts']),
        //         'orders.OrderID',
        //         'orders.OrderID',
        //         'orders.OrderDate',
        //         'orders.RequiredDate',
        //         'orders.ShippedDate',
        //         'orders.ShipVia',
        //         'orders.Freight',
        //         'orders.ShipName',
        //         'orders.ShipAddress',
        //         'orders.ShipCity',
        //         'orders.ShipCountry'
        //     )
        //     .groupBy('orders.OrderID')
        //     .limit(this.pageSize)
        //     .offset(this.pageSize * (page - 1))

        // this.logger.addQuery(pageQuery.toQuery())
        // const pageData = await pageQuery

        // return { queries: this.logger.retrieveQueries(), count, page: pageData }
    }
}
