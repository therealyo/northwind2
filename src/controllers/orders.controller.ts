import { DB } from 'drizzle-orm';
import { Router, Request, Response, NextFunction } from 'express';
import { OrderService } from '../services';
import { Controller } from './../interfaces/IController';

export class OrderController implements Controller {
    public router = Router();
    private service;

    constructor(db: DB) {
        this.service = new OrderService(db);
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.get('/order', this.getOrderInfo);
        this.router.get('/orders', this.getOrdersPage);
    };

    private getOrdersPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query;

            const data = await this.service.getOrdersPage(Number(page));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    private getOrderInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;

            const data = await this.service.getOrderInfo(Number(id));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
}
