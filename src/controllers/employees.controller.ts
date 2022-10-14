import { DB } from 'drizzle-orm'
import { Router, Request, Response, NextFunction } from 'express'

import { EmployeeService } from '../services'
import { singleItemValidation, pageValidation } from '../validation/query.validation'
import { Controller } from './../interfaces/IController'

export class EmployeeController implements Controller {
    public router = Router()
    private readonly service: EmployeeService

    constructor(db: DB) {
        this.service = new EmployeeService(db)
        this.initRoutes()
    }

    private readonly initRoutes = () => {
        this.router.get('/employee',singleItemValidation, this.getEmployeeInfo)
        this.router.get('/employees',pageValidation, this.getEmployeesPage)
    }

    private readonly getEmployeesPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query

            const data = await this.service.getEmployeesPage(Number(page))

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    private readonly getEmployeeInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query

            const data = await this.service.getEmployeeInfo(Number(id))

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}
