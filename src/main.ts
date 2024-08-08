import Koa from 'koa';
import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import pkg from '../package.json';
import routers from './routes';
import config from './config';
import { logger } from './utils';

function getServerStartInfo(params: { port: string | number; version: string }): string {
  return `------------------------------------
serverName: ${pkg.name}
version: ${params.version}
port: ${params.port}
------------------------------------`;
}

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(routers.routes());

app.listen(config.port, () => {
  logger.daily.info(getServerStartInfo({ port: config.port, version: pkg.version }));
});
