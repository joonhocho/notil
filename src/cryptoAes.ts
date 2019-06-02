import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { readFile, readFileSync, writeFile } from 'fs';
import { promisify } from 'util';

export type AesGcmAlgorithm = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';
export type AesCtrAlgorithm = 'aes-128-ctr' | 'aes-192-ctr' | 'aes-256-ctr';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const fileEncoding = 'utf8';
const dataEncoding = 'base64';

const IV_LENGTH_GCM = 12;
const IV_LENGTH_CTR = 16;

export const encryptAesGcm = ({
  algorithm,
  key,
  iv = randomBytes(IV_LENGTH_GCM),
  data,
}: {
  algorithm: AesGcmAlgorithm;
  key: Buffer;
  iv?: Buffer | undefined;
  data: Buffer;
}): {
  iv: Buffer;
  tag: Buffer;
  data: Buffer;
} => {
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv,
    tag,
    data: encrypted,
  };
};

export const decryptAesGcm = ({
  algorithm,
  key,
  iv,
  tag,
  data,
}: {
  algorithm: AesGcmAlgorithm;
  key: Buffer;
  iv: Buffer;
  tag: Buffer;
  data: Buffer;
}): Buffer => {
  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]);
};

export const encryptAesGcmFile = async ({
  algorithm,
  key,
  iv = randomBytes(IV_LENGTH_GCM),
  src,
  dest,
}: {
  algorithm: AesGcmAlgorithm;
  key: Buffer;
  iv?: Buffer | undefined;
  src: string;
  dest: string;
}): Promise<void> => {
  const data = await readFileAsync(src, fileEncoding);
  const { data: encrypted, tag } = encryptAesGcm({
    algorithm,
    key,
    iv,
    data: Buffer.from(data, fileEncoding),
  });
  await writeFileAsync(
    dest,
    [
      iv.toString(dataEncoding),
      tag.toString(dataEncoding),
      encrypted.toString(dataEncoding),
    ].join(':'),
    fileEncoding
  );
};

export const decryptAesGcmFile = async ({
  algorithm,
  key,
  file,
}: {
  algorithm: AesGcmAlgorithm;
  key: Buffer;
  file: string;
}): Promise<Buffer> => {
  const content = await readFileAsync(file, fileEncoding);
  const [iv, tag, data] = content.split(':');
  return decryptAesGcm({
    algorithm,
    key,
    iv: Buffer.from(iv, dataEncoding),
    tag: Buffer.from(tag, dataEncoding),
    data: Buffer.from(data, dataEncoding),
  });
};

export const decryptAesGcmFileSync = ({
  algorithm,
  key,
  file,
}: {
  algorithm: AesGcmAlgorithm;
  key: Buffer;
  file: string;
}): Buffer => {
  const content = readFileSync(file, fileEncoding);
  const [iv, tag, data] = content.split(':');
  return decryptAesGcm({
    algorithm,
    key,
    iv: Buffer.from(iv, dataEncoding),
    tag: Buffer.from(tag, dataEncoding),
    data: Buffer.from(data, dataEncoding),
  });
};

export const encryptAesCtr = ({
  algorithm,
  key,
  iv = randomBytes(IV_LENGTH_CTR),
  data,
}: {
  algorithm: AesCtrAlgorithm;
  key: Buffer;
  iv?: Buffer | undefined;
  data: Buffer;
}): { data: Buffer; iv: Buffer } => {
  const cipher = createCipheriv(algorithm, key, iv);
  return {
    data: Buffer.concat([cipher.update(data), cipher.final()]),
    iv,
  };
};

export const decryptAesCtr = ({
  algorithm,
  key,
  iv,
  data,
}: {
  algorithm: AesCtrAlgorithm;
  key: Buffer;
  iv: Buffer;
  data: Buffer;
}): Buffer => {
  const decipher = createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(data), decipher.final()]);
};
