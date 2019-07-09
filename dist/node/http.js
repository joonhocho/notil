"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
exports.getRequestQuery = (req) => url_1.parse(req.url || '', true).query;
exports.getRequestBody = (req) => new Promise((resolve, reject) => {
    const buffers = [];
    req.on('data', (chunk) => {
        buffers.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(buffers)));
    req.on('error', reject);
});
exports.getRequestBodyJSON = (req) => exports.getRequestBody(req).then((data) => {
    try {
        return JSON.parse(data.toString('utf8'));
    }
    catch (e) {
        return undefined;
    }
});
//# sourceMappingURL=http.js.map