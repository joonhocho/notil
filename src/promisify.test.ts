import { promisify } from './promisify';

// tslint:disable typedef
test('promisify', async () => {
  const square = promisify(
    (x: number, cb: (e: Error | null, res: number | null) => void): void => {
      if (x > 5) {
        cb(new Error('too big'), null);
      } else {
        cb(null, x * x);
      }
    }
  );
  expect(typeof square).toBe('function');
  expect(await square(2)).toBe(4);
  expect(await square(4)).toBe(16);
  await expect(square(6)).rejects.toThrowError('too big');
});
