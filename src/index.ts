import { EmployeesTable, OrdersTable, OrderDetailsTable, ShippersTable, ProductsTable } from './data/schema';
import { drizzle, eq, or } from 'drizzle-orm';

import * as dotenv from 'dotenv';

dotenv.config();

const main = async () => {
    const db = await drizzle.connect({
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        user: 'root',
        port: 5432,
        database: process.env.POSTGRES_DB
    });

    const orders = new OrdersTable(db);
    const details = new OrderDetailsTable(db);
    const shippers = new ShippersTable(db);
    const products = new ProductsTable(db);

    const orderInfo = await orders
        .select()
        .leftJoin(details, (orders, details) => eq(orders.OrderID, details.OrderID))
        .leftJoin(shippers, (orders, details, shippers) => eq(orders.ShipVia, shippers.ShipperID))
        .where((orders, details) => eq(orders.OrderID, 10248))
        .execute();

    const productsInfo = await details
        .select()
        .leftJoin(products, (details, products) => eq(details.ProductID, products.ProductID))
        .where((details, products) => eq(details.OrderID, 10248))
        .execute();

    console.log(
        orderInfo
            .map((order, detail, shipper) => {
                return { ...order, TotalPrice: detail.UnitPrice! * detail.Quantity!, ShipVia: shipper.CompanyName };
            })
            .reduce((a, b) => ({ ...a, TotalPrice: a.TotalPrice + b.TotalPrice }))
    );
    console.log(
        productsInfo.map((detail, order) => {
            return {
                ...order,
                OrderID: detail.OrderID,
                Quantity: detail.Quantity,
                OrderPrice: detail.UnitPrice,
                TotalPrice: detail.Quantity! * detail.UnitPrice!,
                Discount: detail.Discount
            };
        })
    );
};

main();
