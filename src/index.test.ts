import { getSha1Base64 } from './index';

test('getSha1Base64', () => {
  expect(typeof getSha1Base64).toBe('function');
});
