import { DB } from 'drizzle-orm';
import { NextFunction, Request, Response, Router } from 'express';
import { SuppliersService } from '../services/suppliers.service';
import { Controller } from './../interfaces/IController';

export class SuppliersController implements Controller {
    public router = Router();
    private service;

    constructor(db: DB) {
        this.service = new SuppliersService(db);
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.get('/supplier', this.getSupplierInfo);
        this.router.get('/suppliers', this.getSuppliersPage);
    };

    private getSuppliersPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query;

            const data = await this.service.getSuppliersPage(Number(page));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    private getSupplierInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;

            const data = await this.service.getSupplierInfo(Number(id));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
}
