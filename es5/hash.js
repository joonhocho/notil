"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var base64_1 = require("ts-jutil/lib/base64");
exports.getSha1Base64 = function (s) {
    return crypto_1.createHash('sha1')
        .update(s)
        .digest('base64');
};
exports.getSha1Base64UrlSafe = function (s) {
    return base64_1.base64ToUrlSafe(exports.getSha1Base64(s));
};
//# sourceMappingURL=hash.js.map