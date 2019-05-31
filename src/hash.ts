import { createHash } from 'crypto';
import { base64ToUrlSafe } from 'ts-jutil/lib/base64';

export const getSha1Base64 = (s: string): string =>
  createHash('sha1')
    .update(s)
    .digest('base64');

export const getSha1Base64UrlSafe = (s: string): string =>
  base64ToUrlSafe(getSha1Base64(s));
