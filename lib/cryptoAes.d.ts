/// <reference types="node" />
export declare type AesGcmAlgorithm = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';
export declare type AesCtrAlgorithm = 'aes-128-ctr' | 'aes-192-ctr' | 'aes-256-ctr';
export declare const encryptAesGcm: ({ algorithm, key, iv, data, }: {
    algorithm: AesGcmAlgorithm;
    key: Buffer;
    iv?: Buffer | undefined;
    data: Buffer;
}) => {
    iv: Buffer;
    tag: Buffer;
    data: Buffer;
};
export declare const decryptAesGcm: ({ algorithm, key, iv, tag, data, }: {
    algorithm: AesGcmAlgorithm;
    key: Buffer;
    iv: Buffer;
    tag: Buffer;
    data: Buffer;
}) => Buffer;
export declare const encryptAesGcmFile: ({ algorithm, key, iv, src, dest, }: {
    algorithm: AesGcmAlgorithm;
    key: Buffer;
    iv?: Buffer | undefined;
    src: string;
    dest: string;
}) => Promise<void>;
export declare const decryptAesGcmFile: ({ algorithm, key, file, }: {
    algorithm: AesGcmAlgorithm;
    key: Buffer;
    file: string;
}) => Promise<Buffer>;
export declare const decryptAesGcmFileSync: ({ algorithm, key, file, }: {
    algorithm: AesGcmAlgorithm;
    key: Buffer;
    file: string;
}) => Buffer;
export declare const encryptAesCtr: ({ algorithm, key, iv, data, }: {
    algorithm: AesCtrAlgorithm;
    key: Buffer;
    iv?: Buffer | undefined;
    data: Buffer;
}) => {
    data: Buffer;
    iv: Buffer;
};
export declare const decryptAesCtr: ({ algorithm, key, iv, data, }: {
    algorithm: AesCtrAlgorithm;
    key: Buffer;
    iv: Buffer;
    data: Buffer;
}) => Buffer;
