/**
 * Tests for the `drop` function.
 * @since 10/15/18
 * @file
 */

const drop = require('./');

describe('drop', () => {
  it('should drop the n number of elements from the beginning of an array', () => {
    expect(drop([1, { foo: 'bar' }, 'hello'], 0)).toEqual([1, { foo: 'bar' }, 'hello']);
    expect(drop([1, { foo: 'bar' }, 'hello'], 2)).toEqual(['hello']);
    expect(drop([1, { foo: 'bar' }, 'hello'], 5000)).toEqual([]);
    expect(drop([1, { foo: 'bar' }, 'hello'], null)).toEqual([1, { foo: 'bar' }, 'hello']);
    expect(drop('hello', null)).toEqual(['h','e','l','l','o']);

  });

  it('should return empty array if param is not an array', () => {
    expect(drop(null, 2)).toEqual(new Array());
    expect(drop(77, 3)).toEqual(new Array());
  });
});
