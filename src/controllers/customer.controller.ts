import { PGDatabase } from 'drizzle-orm-pg'
import { NextFunction, Request, Response, Router } from 'express'

import { ApiError } from './../errors/ApiError'
import { schema } from './../data/schema'
import { Controller } from './../interfaces/IController'
import { CustomerService } from './../services'
import { singleItemValidation, pageValidation, searchValidation } from '../validation/query.validation'

export class CustomerController implements Controller {
    public router = Router()
    private readonly service: CustomerService

    constructor(db: PGDatabase<typeof schema>) {
        this.service = new CustomerService(db)
        this.initRoutes()
    }

    private readonly initRoutes = () => {
        this.router.get('/customer', singleItemValidation, this.getSupplierInfo)
        this.router.get('/customers', pageValidation, this.getSuppliersPage)
        this.router.get('/searchCustomer', searchValidation, this.searchCustomer)
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

    private readonly searchCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search } = req.query

            if (typeof search !== 'string') {
                throw new ApiError(400, 'Wrong query parameters')
            }

            const data = await this.service.searchCustomer(search)

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}
