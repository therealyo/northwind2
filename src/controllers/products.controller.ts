import { NextFunction, Request, Response, Router } from 'express'

import { ProductService } from './../services/'
import { Controller } from './../interfaces/IController'
import { singleItemValidation, pageValidation, searchValidation } from '../validation/query.validation'
import { Knex } from 'knex'
import { ApiError } from '../errors/ApiError'

export class ProductController implements Controller {
    public router = Router()
    private readonly service: ProductService

    constructor(db: Knex) {
        this.service = new ProductService(db)
        this.initRoutes()
    }

    private readonly initRoutes = (): void => {
        this.router.get('/product', singleItemValidation, this.getProductInfo)
        this.router.get('/products', pageValidation, this.getProductsPage)
        this.router.get("/searchProduct", searchValidation, this.searchProduct)
    }

    private readonly getProductsPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page } = req.query

            const data = await this.service.getProductsPage(Number(page))

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    private readonly getProductInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query

            const data = await this.service.getProductInfo(Number(id))

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    private readonly searchProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search } = req.query

            if (typeof search !== 'string') {
                throw new ApiError(400, 'Wrong query parameters')
            }

            const data = await this.service.searchProduct(search)

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}
