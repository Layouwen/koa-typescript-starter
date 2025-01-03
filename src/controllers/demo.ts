import type { Context } from 'koa';
import { demoService } from '../services';
import { z } from '../utils';

class DemoController {
  async getHelloWord(ctx: Context) {
    ctx.body = demoService.getHello();
  }

  async getNameByChineseFullName(ctx: Context) {
    const querySchema = z.object({
      fullName: z.string().min(3),
    });

    const queryResult = querySchema.safeParse(ctx.request.query);

    if (!queryResult.success) {
      ctx.body = queryResult.error.errors;
      return;
    }

    ctx.body = queryResult.data.fullName.slice(0, 2);
  }
}

export const demoController = new DemoController();
