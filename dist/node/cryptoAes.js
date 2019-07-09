"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const promisify_1 = require("./promisify");
const readFileAsync = promisify_1.promisify(fs_1.readFile);
const writeFileAsync = promisify_1.promisify(fs_1.writeFile);
const fileEncoding = 'utf8';
const dataEncoding = 'base64';
const IV_LENGTH_GCM = 12;
const IV_LENGTH_CTR = 16;
exports.encryptAesGcm = ({ algorithm, key, iv = crypto_1.randomBytes(IV_LENGTH_GCM), data, }) => {
    const cipher = crypto_1.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const tag = cipher.getAuthTag();
    return {
        iv,
        tag,
        data: encrypted,
    };
};
exports.decryptAesGcm = ({ algorithm, key, iv, tag, data, }) => {
    const decipher = crypto_1.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]);
};
exports.encryptAesGcmFile = async ({ algorithm, key, iv = crypto_1.randomBytes(IV_LENGTH_GCM), src, dest, }) => {
    const data = await readFileAsync(src, fileEncoding);
    const { data: encrypted, tag } = exports.encryptAesGcm({
        algorithm,
        key,
        iv,
        data: Buffer.from(data, fileEncoding),
    });
    await writeFileAsync(dest, [
        iv.toString(dataEncoding),
        tag.toString(dataEncoding),
        encrypted.toString(dataEncoding),
    ].join(':'), fileEncoding);
};
exports.decryptAesGcmFile = async ({ algorithm, key, file, }) => {
    const content = await readFileAsync(file, fileEncoding);
    const [iv, tag, data] = content.split(':');
    return exports.decryptAesGcm({
        algorithm,
        key,
        iv: Buffer.from(iv, dataEncoding),
        tag: Buffer.from(tag, dataEncoding),
        data: Buffer.from(data, dataEncoding),
    });
};
exports.decryptAesGcmFileSync = ({ algorithm, key, file, }) => {
    const content = fs_1.readFileSync(file, fileEncoding);
    const [iv, tag, data] = content.split(':');
    return exports.decryptAesGcm({
        algorithm,
        key,
        iv: Buffer.from(iv, dataEncoding),
        tag: Buffer.from(tag, dataEncoding),
        data: Buffer.from(data, dataEncoding),
    });
};
exports.encryptAesCtr = ({ algorithm, key, iv = crypto_1.randomBytes(IV_LENGTH_CTR), data, }) => {
    const cipher = crypto_1.createCipheriv(algorithm, key, iv);
    return {
        data: Buffer.concat([cipher.update(data), cipher.final()]),
        iv,
    };
};
exports.decryptAesCtr = ({ algorithm, key, iv, data, }) => {
    const decipher = crypto_1.createDecipheriv(algorithm, key, iv);
    return Buffer.concat([decipher.update(data), decipher.final()]);
};
//# sourceMappingURL=cryptoAes.js.map