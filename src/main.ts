import Koa from 'koa'
import { bodyParser } from '@koa/bodyparser'
import cors from '@koa/cors'
import routers from './routes'
import { logger } from './utils'

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(routers.routes())

app.listen(3000, () => {
  logger.info('server is running on port 3000')
})
