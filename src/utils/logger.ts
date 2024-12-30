import { Logger } from '@avanlan/logger';
import pkg from '../../package.json';

export const logger = new Logger({
  projectName: pkg.name,
  dailyRotateFile: {
    maxFiles: 7,
  },
  transportsFile: {
    maxsize: 100 * 1024 * 1024,
  },
});
