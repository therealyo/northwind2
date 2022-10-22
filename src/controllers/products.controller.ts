import { Kysely } from 'kysely';
import { NextFunction, Request, Response, Router } from 'express'

import { ProductService } from './../services/'
import { Controller } from './../interfaces/IController'
import { singleItemValidation, pageValidation } from '../validation/query.validation'
import { DB } from 'kysely-codegen';

export class ProductController implements Controller {
    public router = Router()
    private readonly service: ProductService

    constructor(db: Kysely<DB>) {
        this.service = new ProductService(db)
        this.initRoutes()
    }

    private readonly initRoutes = (): void => {
        this.router.get('/product', singleItemValidation, this.getProductInfo)
        this.router.get('/products', pageValidation, this.getProductsPage)
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
}
