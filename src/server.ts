import { CustomerController } from './controllers/customer.controller';
import dotenv from 'dotenv';

import App from './app';
import { connection } from './database/db';
import { SuppliersController } from './controllers/suppliers.controller';

dotenv.config();

const start = async () => {
    const db = await connection;
    const app = new App([new SuppliersController(db), new CustomerController(db)], process.env.PORT);
    return app.listen();
};

start()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
