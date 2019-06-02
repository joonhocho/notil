"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64_1 = require("ts-jutil/lib/base64");
exports.encodeBase64 = (str, encoding = 'utf8') => Buffer.from(str, encoding).toString('base64');
exports.decodeBase64 = (encoded, encoding = 'utf8') => Buffer.from(encoded, 'base64').toString(encoding);
exports.encodeBase64UrlSafe = (str, encoding = 'utf8') => base64_1.base64ToUrlSafe(exports.encodeBase64(str, encoding));
exports.decodeBase64UrlSafe = (encoded, encoding = 'utf8') => exports.decodeBase64(base64_1.base64FromUrlSafe(encoded), encoding);
//# sourceMappingURL=encode.js.map