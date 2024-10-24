import Koa from 'koa';
import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import pkg from '../package.json';
import routers from './routes';
import config from './config';
import { logger, mqttInit } from './utils';
import { httpLogger } from './middlewares';

function getServerStartInfo(params: {
  port: string | number;
  version: string;
}): string {
  return `系统信息
------------------------------------
serverName: ${pkg.name}
version: ${params.version}
port: ${params.port}
------------------------------------`;
}

async function main() {
  const app = new Koa();

  await mqttInit();

  app.use(cors());
  app.use(bodyParser());
  app.use(httpLogger);
  app.use(routers.routes());

  app.listen(config.port, () => {
    logger.daily.info(
      getServerStartInfo({ port: config.port, version: pkg.version }),
    );
  });
}

main();
