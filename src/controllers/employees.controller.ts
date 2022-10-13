import { DB } from 'drizzle-orm';
import { Router, Request, Response, NextFunction } from 'express';

import { EmployeeService } from '../services';
import { Controller } from './../interfaces/IController';

export class EmployeeController implements Controller {
    public router = Router();
    private service;

    constructor(db: DB) {
        this.service = new EmployeeService(db);
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.get('/employee', this.getEmployeeInfo);
        this.router.get('/employees', this.getEmployeesPage);
    };

    private getEmployeesPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query;

            const data = await this.service.getEmployeesPage(Number(page));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    private getEmployeeInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;

            const data = await this.service.getEmployeeInfo(Number(id));

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
}
