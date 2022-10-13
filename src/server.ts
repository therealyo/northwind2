import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import { connection } from './database/db';
import { QueryLogger } from './utils/QueryLogger';
import {
    ProductController,
    CustomerController,
    SuppliersController,
    EmployeeController,
    OrderController
} from './controllers';

const start = async () => {
    const db = await connection;
    // db.useLogger(new QueryLogger());
    const app = new App(
        [
            new SuppliersController(db),
            new CustomerController(db),
            new ProductController(db),
            new EmployeeController(db),
            new OrderController(db)
        ],
        process.env.PORT
    );

    app.listen();
};

start();
