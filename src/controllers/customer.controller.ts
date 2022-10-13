import { DB } from 'drizzle-orm';
import { NextFunction, Request, Response, Router } from 'express';

import { ApiError } from './../errors/ApiError';
import { Controller } from './../interfaces/IController';
import { CustomerService } from './../services';

export class CustomerController implements Controller {
    public router = Router();
    private service: CustomerService;

    constructor(db: DB) {
        this.service = new CustomerService(db);
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.get('/customer', this.getSupplierInfo);
        this.router.get('/customers', this.getSuppliersPage);
    };

    private getSuppliersPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query;

            const data = await this.service.getCustomersPage(Number(page));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    private getSupplierInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;

            if (typeof id !== 'string') {
                throw new ApiError(400, 'Wrong query parameters');
            }

            const data = await this.service.getCustomerInfo(id);

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
}
