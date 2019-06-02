"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
exports.getRequestQuery = function (req) {
    return url_1.parse(req.url || '', true).query;
};
exports.getRequestBody = function (req) {
    return new Promise(function (resolve, reject) {
        var buffers = [];
        req.on('data', function (chunk) {
            buffers.push(chunk);
        });
        req.on('end', function () { return resolve(Buffer.concat(buffers)); });
        req.on('error', reject);
    });
};
exports.getRequestBodyJSON = function (req) {
    return exports.getRequestBody(req).then(function (data) {
        try {
            return JSON.parse(data.toString('utf8'));
        }
        catch (e) {
            return undefined;
        }
    });
};
//# sourceMappingURL=http.js.map