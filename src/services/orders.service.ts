import { DB, eq, ExtractModel, JoinBuilderResponses } from 'drizzle-orm';

import { BaseService } from '../types/BaseService';
import { PageResponse } from '../types/PageResponse';
import { Order, OrderDetailsTable, OrdersTable, ProductsTable, ShippersTable } from '../data/schema';

export class OrderService extends BaseService {
    private ordersTable?: OrdersTable;
    private detailsTable?: OrderDetailsTable;
    private shippersTable?: ShippersTable;
    private productsTable?: ProductsTable;

    constructor(db: DB) {
        super(db);
        this.initTables(db);
    }

    private initTables = (db: DB): void => {
        this.ordersTable = new OrdersTable(db);
        this.detailsTable = new OrderDetailsTable(db);
        this.shippersTable = new ShippersTable(db);
        this.productsTable = new ProductsTable(db);

        this.ordersTable.withLogger(this.logger);
        this.productsTable.withLogger(this.logger);
    };

    private mapOrderInfo = (
        orderInfo: JoinBuilderResponses<
            [ExtractModel<OrdersTable>, ExtractModel<OrderDetailsTable>, ExtractModel<ShippersTable>]
        >
    ) => {
        return orderInfo
            .map((order, detail, shipper) => {
                return { ...order, TotalPrice: detail.UnitPrice! * detail.Quantity!, ShipVia: shipper.CompanyName };
            })
            .reduce((a, b) => ({ ...a, TotalPrice: a.TotalPrice + b.TotalPrice }));
    };

    private mapProductsInfo = (
        productsInfo: JoinBuilderResponses<[ExtractModel<ProductsTable>, ExtractModel<OrderDetailsTable>]>
    ) => {
        return productsInfo.map((product, detail) => {
            return {
                ...product,
                OrderID: detail.OrderID,
                Quantity: detail.Quantity,
                OrderPrice: detail.UnitPrice,
                TotalPrice: detail.Quantity! * detail.UnitPrice!,
                Discount: detail.Discount
            };
        });
    };

    getOrderInfo = async (id: number) => {
        const orderInfo = await this.ordersTable!.select()
            .leftJoin(this.detailsTable!, (orders, details) => eq(orders.OrderID, details.OrderID))
            .leftJoin(this.shippersTable!, (orders, details, shippers) => eq(orders.ShipVia, shippers.ShipperID))
            .where((orders, details) => eq(orders.OrderID, id))
            .execute();

        const productsInfo = await this.productsTable!.select()
            .leftJoin(this.detailsTable!, (products, details) => eq(products.ProductID, details.ProductID))
            .where((products, details) => eq(details.OrderID, id))
            .execute();

        return {
            queries: this.logger.retrieveQueries(),
            data: {
                ...this.mapOrderInfo(orderInfo),
                Products: this.mapProductsInfo(productsInfo)
            }
        };
    };

    getOrdersPage = async (page: number): Promise<PageResponse<Order>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM Orders');
        const count = rows[0].count;

        const pageData = await this.db
            .session()
            .execute(
                'SELECT SUM(OrderDetails."UnitPrice" * OrderDetails."Quantity") AS TotalPrice, SUM(OrderDetails."Quantity") AS TotalQuantity, COUNT(OrderDetails."OrderID") AS TotalProducts \
                , Orders."OrderID", Orders."CustomerID", Orders."OrderDate", Orders."RequiredDate", Orders."ShippedDate", Orders."ShipVia", Orders."Freight",Orders."ShipName",Orders."ShipAddress",Orders."ShipCity" FROM Orders \
                LEFT JOIN OrderDetails ON Orders."OrderID" = OrderDetails."OrderID" GROUP BY Orders."OrderID" ORDER BY Orders."OrderID" LIMIT 20 OFFSET 0'
            );

        this.logger.addQuery(
            'SELECT SUM(OrderDetails."UnitPrice" * OrderDetails."Quantity") AS TotalPrice, SUM(OrderDetails."Quantity") AS TotalQuantity, COUNT(OrderDetails."OrderID") AS TotalProducts \
            , Orders."OrderID", Orders."CustomerID", Orders."OrderDate", Orders."RequiredDate", Orders."ShippedDate", Orders."ShipVia", Orders."Freight",Orders."ShipName",Orders."ShipAddress",Orders."ShipCity" FROM Orders \
            LEFT JOIN OrderDetails ON Orders."OrderID" = OrderDetails."OrderID" GROUP BY Orders."OrderID" ORDER BY Orders."OrderID" LIMIT 20 OFFSET 0'
        );

        return { queries: this.logger.retrieveQueries(), count, page: pageData.rows };
    };
}