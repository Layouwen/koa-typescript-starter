import Router from 'koa-router';
import { demoController } from '../controllers/demo';

export const demoRouter = new Router();

demoRouter.get('/hello', demoController.getHelloWord.bind(demoController));
demoRouter.post('/hello', demoController.getHelloWord.bind(demoController));
