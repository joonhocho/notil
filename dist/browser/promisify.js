"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify = (function (fn) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        fn.apply(void 0, args.concat([function (err, res) {
                if (err == null) {
                    resolve(res);
                }
                else {
                    reject(err);
                }
            }]));
    });
}; });
//# sourceMappingURL=promisify.js.map