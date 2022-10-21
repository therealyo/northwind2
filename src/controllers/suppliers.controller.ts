import { NextFunction, Request, Response, Router } from 'express'

import { SupplierService } from './../services'
import { Controller } from './../interfaces/IController'
import { singleItemValidation, pageValidation } from '../validation/query.validation'
import { Knex } from 'knex'

export class SuppliersController implements Controller {
    public router = Router()
    private readonly service: SupplierService

    constructor(db: Knex) {
        this.service = new SupplierService(db)
        this.initRoutes()
    }

    private readonly initRoutes = () => {
        this.router.get('/supplier', singleItemValidation, this.getSupplierInfo)
        this.router.get('/suppliers', pageValidation, this.getSuppliersPage)
    }

    private readonly getSuppliersPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query

            const data = await this.service.getSuppliersPage(Number(page))

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    private readonly getSupplierInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query

            const data = await this.service.getSupplierInfo(Number(id))

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}
