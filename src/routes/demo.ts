import Router from 'koa-router';
import { demoController } from '../controllers';

export const demoRouter = new Router();

demoRouter.get('/hello', demoController.getHelloWord.bind(demoController));
demoRouter.get('/name', demoController.getNameByChineseFullName.bind(demoController));
demoRouter.post('/hello', demoController.getHelloWord.bind(demoController));
