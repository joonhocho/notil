import { base64FromUrlSafe, base64ToUrlSafe } from 'ts-jutil';

export const encodeBase64 = (
  str: string,
  encoding: BufferEncoding = 'utf8'
): string => Buffer.from(str, encoding).toString('base64');

export const decodeBase64 = (
  encoded: string,
  encoding: BufferEncoding = 'utf8'
): string => Buffer.from(encoded, 'base64').toString(encoding);

export const encodeBase64UrlSafe = (
  str: string,
  encoding: BufferEncoding = 'utf8'
): string => base64ToUrlSafe(encodeBase64(str, encoding));

export const decodeBase64UrlSafe = (
  encoded: string,
  encoding: BufferEncoding = 'utf8'
): string => decodeBase64(base64FromUrlSafe(encoded), encoding);
