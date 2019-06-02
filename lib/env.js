"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = (key) => {
    if (typeof process.env[key] === 'string') {
        return process.env[key];
    }
    throw new Error(`process.env.${key} is undefined`);
};
//# sourceMappingURL=env.js.map