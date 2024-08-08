import { koaHttpLogger } from '@avanlan/logger';
import { logger } from '../utils';

export const httpLogger = koaHttpLogger(logger);
