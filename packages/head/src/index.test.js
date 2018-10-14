/**
 * Tests for the `head` function.
 * @since 10/11/18
 * @file
 */

const head = require('./');

describe('head', () => {
  it('should return the value at the first index of an array', () => {
    expect(head([5, 6, 7])).toEqual(5);
    expect(head(['a', 'b', 'c'])).toEqual('a');
    expect(head('hello')).toEqual('h');
  });

  it('should return undefined if param is not an array', () => {
    expect(head(null)).toEqual(undefined);
    expect(head()).toEqual(undefined);
    expect(head({})).toEqual(undefined);
  });
});
