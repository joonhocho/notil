import { AnyFunction } from 'tsdef';
import { promisify as promisifyLib } from 'util';

// tslint:disable typedef
export const promisify: typeof promisifyLib = ((fn: AnyFunction) => (
  ...args: any[]
) =>
  new Promise((resolve, reject): void => {
    fn(...args, (err: any, res: any) => {
      if (err == null) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  })) as any;
