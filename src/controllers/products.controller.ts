import { DB } from 'drizzle-orm';
import { NextFunction, Request, Response, Router } from 'express';

import { ProductService } from './../services/';
import { Controller } from './../interfaces/IController';

export class ProductController implements Controller {
    public router = Router();
    private service: ProductService;

    constructor(db: DB) {
        this.service = new ProductService(db);
        this.initRoutes();
    }

    private initRoutes = (): void => {
        this.router.get('/product', this.getProductInfo);
        this.router.get('/products', this.getProductsPage);
    };

    private getProductsPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query;

            const data = await this.service.getProductsPage(Number(page));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    private getProductInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;

            const data = await this.service.getProductInfo(Number(id));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
}
