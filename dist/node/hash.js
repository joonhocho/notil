"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const base64ToUrlSafe_1 = require("ts-jutil/dist/node/string/base64ToUrlSafe");
exports.getSha1Base64 = (s) => crypto_1.createHash('sha1')
    .update(s)
    .digest('base64');
exports.getSha1Base64UrlSafe = (s) => base64ToUrlSafe_1.base64ToUrlSafe(exports.getSha1Base64(s));
//# sourceMappingURL=hash.js.map