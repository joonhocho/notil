import { env, envMap, envs } from './env';

// tslint:disable typedef
test('env', () => {
  expect(() => env('UNKNOWN')).toThrowError('undefined');

  process.env.UNKNOWN = '';

  expect(env('UNKNOWN')).toBe('');

  process.env.UNKNOWN = 'a';

  expect(env('UNKNOWN')).toBe('a');
  delete process.env.UNKNOWN;
});

test('envs', () => {
  expect(() => envs('K1', 'K2')).toThrowError('K1');

  process.env.K1 = '';

  expect(envs('K1')).toEqual(['']);
  expect(() => envs('K1', 'K2')).toThrowError('K2');

  process.env.K1 = 'a';

  expect(envs('K1')).toEqual(['a']);

  process.env.K2 = 'b';

  expect(envs('K1', 'K2')).toEqual(['a', 'b']);
  delete process.env.K1;
  delete process.env.K2;
});

test('envMap', () => {
  expect(() => envMap({ K1: 'M1', K2: 'M2' })).toThrowError('K1');

  process.env.K1 = '';

  expect(envMap({ K1: 'M1' })).toEqual({ M1: '' });
  expect(() => envMap({ K1: 'M1', K2: 'M2' })).toThrowError('K2');

  process.env.K1 = 'a';

  expect(envMap({ K1: 'M1' })).toEqual({ M1: 'a' });

  process.env.K2 = 'b';

  expect(envMap({ K1: 'M1', K2: 'M2' })).toEqual({ M1: 'a', M2: 'b' });
  delete process.env.K1;
  delete process.env.K2;
});
