/// <reference types="node" />
import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
export declare const getRequestQuery: (req: IncomingMessage) => ParsedUrlQuery;
export declare const getRequestBody: (req: IncomingMessage) => Promise<Buffer>;
export declare const getRequestBodyJSON: <T>(req: IncomingMessage) => Promise<T | undefined>;
//# sourceMappingURL=http.d.ts.map