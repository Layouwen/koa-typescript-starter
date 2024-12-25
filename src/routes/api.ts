import Router from 'koa-router';
import { systemController } from '../controllers';
import { demoRouter } from './demo';

export const apiRouter = new Router();

apiRouter.use('/demo', demoRouter.routes(), demoRouter.allowedMethods());
apiRouter.get('/version', systemController.getVersion.bind(systemController));
