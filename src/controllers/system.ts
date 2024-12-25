import type { Context } from 'koa';
import pkg from '../../package.json';

class SystemController {
  getVersion(ctx: Context) {
    ctx.body = {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: pkg.author,
    };
  }
}

export const systemController = new SystemController();
