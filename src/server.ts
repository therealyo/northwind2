import dotenv from 'dotenv'

import App from './app'
import { db } from './database/db'
import {
    ProductController,
    CustomerController,
    SuppliersController,
    EmployeeController,
    OrderController
} from './controllers'

dotenv.config()

const start = async () => {
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
