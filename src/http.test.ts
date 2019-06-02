import { Readable } from 'stream';
import { getRequestBody, getRequestBodyJSON, getRequestQuery } from './http';

test('getRequestBody', () => {
  expect(
    getRequestQuery({ url: 'http://example.com?a=1&b=&c#hash' } as any)
  ).toEqual({
    a: '1',
    b: '',
    c: '',
  });
});

test('getRequestBody', async () => {
  const stream = new Readable({
    read(): void {
      this.push(Buffer.from('hello '));
      this.push(Buffer.from('world'));
      this.push(null);
    },
  });
  expect((await getRequestBody(stream as any)).toString()).toEqual(
    'hello world'
  );
});

test('getRequestBodyJSON', async () => {
  const stream = new Readable({
    read(): void {
      this.push(Buffer.from(JSON.stringify({ a: 1, b: '2' })));
      this.push(null);
    },
  });
  expect(await getRequestBodyJSON(stream as any)).toEqual({ a: 1, b: '2' });
});
