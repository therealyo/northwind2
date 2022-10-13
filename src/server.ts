import dotenv from 'dotenv';

import App from './app';
import { db } from './database/db';
import { SuppliersController } from './controllers/suppliers.controller';

dotenv.config();

const start = async () => {
    const app = new App([new SuppliersController(await db)], process.env.PORT);
    return app.listen();
};

start()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
