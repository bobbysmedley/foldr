/**
 * Tests for the `map` function
 * @since 10/13/18
 * @file
 */

import each from '.';

describe('each', () => {
  it('Should be a function', () => {
    expect(typeof each).toBe('function');
  });

  it('Should iterate over array values (1)', () => {
    expect(each(x => x * 2)([1, 2, 3])).toEqual(undefined);
  });

  it('Should iterate over array values (2)', () => {
    const given = [];
    const input = [1, 2, 3];

    expect(each((...args) => given.push(args))(input)).toEqual(undefined);
    expect(given).toEqual([
      [1, 0, input],
      [2, 1, input],
      [3, 2, input],
    ]);
  });

  it('Should should soft fail on `undefined`', () => {
    expect(each(x => x * 2)(undefined)).toEqual(undefined);
  });

  it('Should should soft fail on `null`', () => {
    expect(each(x => x * 2)(null)).toEqual(undefined);
  });

  it('Should should soft fail on functions', () => {
    expect(each(x => x * 2)(() => {})).toEqual(undefined);
  });

  it('Should should work on strings', () => {
    const given = [];
    const input = 'foo';

    expect(each((...args) => given.push(args))(input)).toEqual(undefined);
    expect(given).toEqual([
      ['f', 0, input],
      ['o', 1, input],
      ['o', 2, input],
    ]);
  });
});
