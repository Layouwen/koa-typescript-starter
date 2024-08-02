import Router from 'koa-router';
import { demoRouter } from './demo';

export const apiRouter = new Router();

apiRouter.use('/demo', demoRouter.routes(), demoRouter.allowedMethods());
