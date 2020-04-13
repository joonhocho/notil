import {
  decodeBase64,
  decodeBase64UrlSafe,
  encodeBase64,
  encodeBase64UrlSafe,
} from './encode';

// tslint:disable typedef
test('encodeBase64 / decodeBase64', () => {
  const str = 'text to encode !@#!$!@$UEU';

  const encoded = encodeBase64(str);
  const encodedSafe = encodeBase64UrlSafe(str);

  expect(encoded).toBe('dGV4dCB0byBlbmNvZGUgIUAjISQhQCRVRVU=');
  expect(encodedSafe).toBe('dGV4dCB0byBlbmNvZGUgIUAjISQhQCRVRVU');

  expect(decodeBase64(encoded)).toBe(str);
  expect(decodeBase64UrlSafe(encodedSafe)).toBe(str);
});
