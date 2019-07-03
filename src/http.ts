import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { parse } from 'url';

export const getRequestQuery = (req: IncomingMessage): ParsedUrlQuery =>
  parse(req.url || '', true).query;

export const getRequestBody = (req: IncomingMessage): Promise<Buffer> =>
  new Promise((resolve, reject): void => {
    const buffers: Buffer[] = [];
    req.on('data', (chunk) => {
      buffers.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(buffers)));
    req.on('error', reject);
  });

export const getRequestBodyJSON = <T>(
  req: IncomingMessage
): Promise<T | undefined> =>
  getRequestBody(req).then((data) => {
    try {
      return JSON.parse(data.toString('utf8'));
    } catch (e) {
      return undefined;
    }
  });
