import type { Context } from 'koa';
import { demoService } from '../services';

class DemoController {
  async getHelloWord(ctx: Context) {
    ctx.body = demoService.getHello();
  }
}

export const demoController = new DemoController();
