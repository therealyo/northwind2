import dotenv from 'dotenv';

import App from './app';
import { connection } from './database/db';
import { ProductController, CustomerController, SuppliersController } from './controllers';
// import { SuppliersController } from './controllers/suppliers.controller';
// import { ProductController } from './controllers/products.controller';
// import { CustomerController } from './controllers/customer.controller';

dotenv.config();

const start = async () => {
    const db = await connection;
    const app = new App(
        [new SuppliersController(db), new CustomerController(db), new ProductController(db)],
        process.env.PORT
    );
    return app.listen();
};

start()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
