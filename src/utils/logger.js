import { name } from '../../package.json';
import { LOG_LEVEL } from '../config/keys';
import clc from 'cli-color';

let types = ['silly', 'debug', 'info', 'warn', 'error'];
let logLevel = LOG_LEVEL || 'silly';

let allowedTypes = types
  .slice(types.indexOf(logLevel))
  .reduce((acc, type) => Object.assign(acc, { [type]: 1 }), {});

export const Logger = (prefix) => {
  return types.reduce((acc, type) => {
    acc[type] = function log(...args) {
      if (!(type in allowedTypes)) {
        return;
      }

      if (type === 'error') {
        type = clc.red(type);
      }
      if (type === 'warn') {
        type = clc.yellow(type);
      }
      if (type === 'info') {
        type = clc.blue(type);
      }
      if (type === 'debug') {
        type = clc.cyan(type);
      }
      if (type === 'silly') {
        type = clc.magenta(type);
      }

      console.log(`[${type}]`, `${prefix}:`, ...args);
    };
    return acc;
  }, {});
};

export const getLogger = Logger;

export default Logger(name);
