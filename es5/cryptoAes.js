"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var fs_1 = require("fs");
var util_1 = require("util");
var readFileAsync = util_1.promisify(fs_1.readFile);
var writeFileAsync = util_1.promisify(fs_1.writeFile);
var fileEncoding = 'utf8';
var dataEncoding = 'base64';
var IV_LENGTH_GCM = 12;
var IV_LENGTH_CTR = 16;
exports.encryptAesGcm = function (_a) {
    var algorithm = _a.algorithm, key = _a.key, _b = _a.iv, iv = _b === void 0 ? crypto_1.randomBytes(IV_LENGTH_GCM) : _b, data = _a.data;
    var cipher = crypto_1.createCipheriv(algorithm, key, iv);
    var encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    var tag = cipher.getAuthTag();
    return {
        iv: iv,
        tag: tag,
        data: encrypted,
    };
};
exports.decryptAesGcm = function (_a) {
    var algorithm = _a.algorithm, key = _a.key, iv = _a.iv, tag = _a.tag, data = _a.data;
    var decipher = crypto_1.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]);
};
exports.encryptAesGcmFile = function (_a) {
    var algorithm = _a.algorithm, key = _a.key, _b = _a.iv, iv = _b === void 0 ? crypto_1.randomBytes(IV_LENGTH_GCM) : _b, src = _a.src, dest = _a.dest;
    return __awaiter(_this, void 0, void 0, function () {
        var data, _c, encrypted, tag;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, readFileAsync(src, fileEncoding)];
                case 1:
                    data = _d.sent();
                    _c = exports.encryptAesGcm({
                        algorithm: algorithm,
                        key: key,
                        iv: iv,
                        data: Buffer.from(data, fileEncoding),
                    }), encrypted = _c.data, tag = _c.tag;
                    return [4, writeFileAsync(dest, [
                            iv.toString(dataEncoding),
                            tag.toString(dataEncoding),
                            encrypted.toString(dataEncoding),
                        ].join(':'), fileEncoding)];
                case 2:
                    _d.sent();
                    return [2];
            }
        });
    });
};
exports.decryptAesGcmFile = function (_a) {
    var algorithm = _a.algorithm, key = _a.key, file = _a.file;
    return __awaiter(_this, void 0, void 0, function () {
        var content, _b, iv, tag, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, readFileAsync(file, fileEncoding)];
                case 1:
                    content = _c.sent();
                    _b = content.split(':'), iv = _b[0], tag = _b[1], data = _b[2];
                    return [2, exports.decryptAesGcm({
                            algorithm: algorithm,
                            key: key,
                            iv: Buffer.from(iv, dataEncoding),
                            tag: Buffer.from(tag, dataEncoding),
                            data: Buffer.from(data, dataEncoding),
                        })];
            }
        });
    });
};
exports.decryptAesGcmFileSync = function (_a) {
    var algorithm = _a.algorithm, key = _a.key, file = _a.file;
    var content = fs_1.readFileSync(file, fileEncoding);
    var _b = content.split(':'), iv = _b[0], tag = _b[1], data = _b[2];
    return exports.decryptAesGcm({
        algorithm: algorithm,
        key: key,
        iv: Buffer.from(iv, dataEncoding),
        tag: Buffer.from(tag, dataEncoding),
        data: Buffer.from(data, dataEncoding),
    });
};
exports.encryptAesCtr = function (_a) {
    var algorithm = _a.algorithm, key = _a.key, _b = _a.iv, iv = _b === void 0 ? crypto_1.randomBytes(IV_LENGTH_CTR) : _b, data = _a.data;
    var cipher = crypto_1.createCipheriv(algorithm, key, iv);
    return {
        data: Buffer.concat([cipher.update(data), cipher.final()]),
        iv: iv,
    };
};
exports.decryptAesCtr = function (_a) {
    var algorithm = _a.algorithm, key = _a.key, iv = _a.iv, data = _a.data;
    var decipher = crypto_1.createDecipheriv(algorithm, key, iv);
    return Buffer.concat([decipher.update(data), decipher.final()]);
};
//# sourceMappingURL=cryptoAes.js.map