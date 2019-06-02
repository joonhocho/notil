"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify = ((fn) => (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, res) => {
        if (err == null) {
            resolve(res);
        }
        else {
            reject(err);
        }
    });
}));
//# sourceMappingURL=promisify.js.map