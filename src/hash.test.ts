import { getSha1Base64, getSha1Base64UrlSafe } from './hash';

test('getSha1Base64', () => {
  expect(getSha1Base64('')).toBe('2jmj7l5rSw0yVb/vlWAYkK/YBwk=');
  expect(getSha1Base64('a')).toBe('hvfkN/qlp/zhXR3cuerq6jd2Z7g=');
  expect(getSha1Base64('This is a s&cr3t')).toBe(
    'hc9VEmMyNUjTYRit8VXIwayBcgk='
  );
});

test('getSha1Base64UrlSafe', () => {
  expect(getSha1Base64UrlSafe('')).toBe('2jmj7l5rSw0yVb_vlWAYkK_YBwk');
  expect(getSha1Base64UrlSafe('a')).toBe('hvfkN_qlp_zhXR3cuerq6jd2Z7g');
  expect(getSha1Base64UrlSafe('This is a s&cr3t')).toBe(
    'hc9VEmMyNUjTYRit8VXIwayBcgk'
  );
});
