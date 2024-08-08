import { Logger } from '@avanlan/logger';
import pkg from '../../package.json';

export const logger = new Logger({
  projectName: pkg.name,
});
