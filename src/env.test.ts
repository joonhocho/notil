import { env } from './env';

test('env', () => {
  expect(() => env('UNKNOWN')).toThrowError('undefined');

  process.env.UNKNOWN = '';

  expect(env('UNKNOWN')).toBe('');

  process.env.UNKNOWN = 'a';

  expect(env('UNKNOWN')).toBe('a');
});
