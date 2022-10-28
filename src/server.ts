import dotenv from 'dotenv'
import { connect } from 'drizzle-orm'
import { connector } from './database/db'

import App from './app'
import {
    ProductController,
    CustomerController,
    SuppliersController,
    EmployeeController,
    OrderController
} from './controllers'

dotenv.config()

const start = async () => {
    const db = await connect(connector)
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
