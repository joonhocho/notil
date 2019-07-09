"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base64FromUrlSafe_1 = require("ts-jutil/dist/node/string/base64FromUrlSafe");
var base64ToUrlSafe_1 = require("ts-jutil/dist/node/string/base64ToUrlSafe");
exports.encodeBase64 = function (str, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    return Buffer.from(str, encoding).toString('base64');
};
exports.decodeBase64 = function (encoded, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    return Buffer.from(encoded, 'base64').toString(encoding);
};
exports.encodeBase64UrlSafe = function (str, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    return base64ToUrlSafe_1.base64ToUrlSafe(exports.encodeBase64(str, encoding));
};
exports.decodeBase64UrlSafe = function (encoded, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    return exports.decodeBase64(base64FromUrlSafe_1.base64FromUrlSafe(encoded), encoding);
};
//# sourceMappingURL=encode.js.map