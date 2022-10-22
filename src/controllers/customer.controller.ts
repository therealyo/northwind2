import { Kysely } from 'kysely';
import { NextFunction, Request, Response, Router } from 'express'

import { singleItemValidation, pageValidation } from '../validation/query.validation'
import { ApiError } from './../errors/ApiError'
import { Controller } from './../interfaces/IController'
import { CustomerService } from './../services'
import { DB } from 'kysely-codegen';

export class CustomerController implements Controller {
    public router = Router()
    private readonly service: CustomerService

    constructor(db: Kysely<DB>) {
        this.service = new CustomerService(db)
        this.initRoutes()
    }

    private readonly initRoutes = () => {
        this.router.get('/customer', singleItemValidation, this.getSupplierInfo)
        this.router.get('/customers', pageValidation, this.getSuppliersPage)
    }

    private readonly getSuppliersPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query

            const data = await this.service.getCustomersPage(Number(page))

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    private readonly getSupplierInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query

            if (typeof id !== 'string') {
                throw new ApiError(400, 'Wrong query parameters')
            }

            const data = await this.service.getCustomerInfo(id)

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}
