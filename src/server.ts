import dotenv from 'dotenv'

import App from './app'
// import { connection } from './database/db'
import {
    ProductController,
    CustomerController,
    SuppliersController,
    EmployeeController,
    OrderController
} from './controllers'
import { connection } from './database/db'

dotenv.config()

const start = async () => {
    const db = await connection.initialize();
    // // db.useLogger(new QueryLogger());
    const app = new App(
        [
            new SuppliersController(db),
            new CustomerController(db),
            new ProductController(db),
            new EmployeeController(db),
            new OrderController(db)
        ],
        process.env.PORT
    )

    app.listen()
}

start()
