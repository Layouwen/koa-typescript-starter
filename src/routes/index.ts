import Router from 'koa-router'
import { demoRouter } from './demo'

const routers = new Router()

routers.use('/demo', demoRouter.routes(), demoRouter.allowedMethods())

export default routers
