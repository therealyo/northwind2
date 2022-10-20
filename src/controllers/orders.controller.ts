// import { Router, Request, Response, NextFunction } from 'express'

// import { OrderService } from '../services'
// import { singleItemValidation, pageValidation } from '../validation/query.validation'
// import { Controller } from './../interfaces/IController'

// export class OrderController implements Controller {
//     public router = Router()
//     private readonly service: OrderService

//     constructor(db: DB) {
//         this.service = new OrderService(db)
//         this.initRoutes()
//     }

//     private readonly initRoutes = () => {
//         this.router.get('/order',singleItemValidation, this.getOrderInfo)
//         this.router.get('/orders',pageValidation, this.getOrdersPage)
//     }

//     private readonly getOrdersPage = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { page } = req.query

//             const data = await this.service.getOrdersPage(Number(page))

//             res.status(200).json(data)
//         } catch (err) {
//             next(err)
//         }
//     }

//     private readonly getOrderInfo = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { id } = req.query

//             const data = await this.service.getOrderInfo(Number(id))

//             res.status(200).json(data)
//         } catch (err) {
//             next(err)
//         }
//     }
// }
