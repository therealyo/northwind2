import { ProductsTable, ShippersTable } from './../data/schema';
import { DB, eq, ExtractModel, JoinBuilderResponses } from 'drizzle-orm';

import { Order, OrderDetailsTable, OrdersTable } from '../data/schema';
import { PageResponse } from '../types/PageResponse';
import { QueryLogger } from '../utils/QueryLogger';

export class OrderService {
    public pageSize: number = 20;
    public logger: QueryLogger;
    private ordersTable?: OrdersTable;
    private detailsTable?: OrderDetailsTable;
    private shippersTable?: ShippersTable;
    private productsTable?: ProductsTable;
    private db: DB;

    constructor(db: DB) {
        this.logger = new QueryLogger();
        this.db = db;

        this.initTables(db);
    }

    private initTables = (db: DB) => {
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

        return { ...this.mapOrderInfo(orderInfo), Products: this.mapProductsInfo(productsInfo) };
    };

    getOrdersPage = async (page: number): Promise<PageResponse<Order>> => {
        const { rows } = await this.db.session().execute('SELECT COUNT(*) FROM Orders');
        const count = rows[0].count;

        const pageData = await this.db
            .session()
            .execute(
                'SELECT  \
        SUM(OrderDetails."UnitPrice" * OrderDetails."Quantity") AS TotalPrice, SUM(OrderDetails."Quantity") AS TotalQuantity, COUNT(OrderDetails."OrderID") AS TotalProducts \
        , Orders."OrderID", Orders."CustomerID", Orders."OrderDate", Orders."RequiredDate", Orders."ShippedDate", Orders."ShipVia", Orders."Freight",Orders."ShipName",Orders."ShipAddress",Orders."ShipCity" FROM Orders \
         LEFT JOIN OrderDetails ON Orders."OrderID" = OrderDetails."OrderID" GROUP BY Orders."OrderID" ORDER BY Orders."OrderID" LIMIT 20 OFFSET 0'
            );

        return { count, page: pageData.rows };
    };
}
