import { randomBytes } from 'crypto';
import { readFileSync, unlinkSync } from 'fs';
import {
  decryptAesCtr,
  decryptAesGcm,
  decryptAesGcmFile,
  decryptAesGcmFileSync,
  encryptAesCtr,
  encryptAesGcm,
  encryptAesGcmFile,
} from './cryptoAes';

// tslint:disable typedef
test('encryptAesGcm / decryptAesGcm', async () => {
  const raw = 'this is file content \n#@!$!@$%@#$$';
  const algorithm = 'aes-256-gcm';
  const key = randomBytes(256 / 8);
  const res = encryptAesGcm({
    algorithm,
    key,
    data: Buffer.from(raw, 'utf8'),
  });

  for (let i = 0; i < 100; i += 1) {
    const decrypted = decryptAesGcm({
      algorithm,
      key,
      ...res,
    });
    expect(decrypted.toString('utf8')).toBe(raw);
  }
});

test('encryptAesCtr / decryptAesCtr', async () => {
  const raw = 'this is file content \n#@!$!@$%@#$$';
  const algorithm = 'aes-256-ctr';
  const key = randomBytes(256 / 8);
  const res = encryptAesCtr({ algorithm, key, data: Buffer.from(raw, 'utf8') });

  for (let i = 0; i < 100; i += 1) {
    const decrypted = decryptAesCtr({ algorithm, key, ...res });
    expect(decrypted.toString('utf8')).toBe(raw);
  }
});

test('encryptAesGcmFile / decryptAesGcmFile / decryptAesGcmFileSync', async () => {
  const src = __filename;
  const dest = `${src}.enc`;
  const algorithm = 'aes-256-gcm';
  const key = randomBytes(256 / 8);
  const raw = readFileSync(src, 'utf8');

  await encryptAesGcmFile({ algorithm, key, src, dest });
  expect(
    (await decryptAesGcmFile({ algorithm, key, file: dest })).toString('utf8')
  ).toBe(raw);
  expect(
    decryptAesGcmFileSync({ algorithm, key, file: dest }).toString('utf8')
  ).toBe(raw);
  unlinkSync(dest);
});
