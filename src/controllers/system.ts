import type { Context } from 'koa';
import pkg from '../../package.json';

class SystemController {
  getApplicationInfo(ctx: Context) {
    ctx.body = {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
    };
  }
}

export const systemController = new SystemController();
