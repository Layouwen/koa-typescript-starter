import Router from 'koa-router';
import { apiRouter } from './api';

const routers = new Router();

routers.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

export default routers;
