/**
 * Tests for the `map` function
 * @since 10/13/18
 * @file
 */

import map from '.';

describe('map', () => {
  it('Should be a function', () => {
    expect(typeof map).toBe('function');
  });

  it('Should map over array values', () => {
    expect(map(x => x * 2)([1, 2, 3])).toEqual([2, 4, 6]);
    expect(map(x => x * 2, [1, 2, 3])).toEqual([2, 4, 6]);
  });

  it('Should work for array-like objects', () => {
    const args = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
    };

    expect(map(x => x * 2)(args)).toEqual([2, 4, 6]);
  });

  it('Should should soft fail on `undefined`', () => {
    expect(map(x => x * 2)(undefined)).toEqual([]);
  });

  it('Should should soft fail on `null`', () => {
    expect(map(x => x * 2)(null)).toEqual([]);
  });

  it('Should should soft fail on functions', () => {
    expect(map(x => x * 2)(() => {})).toEqual([]);
  });

  it('Should should work on strings', () => {
    expect(map(x => x * 2)('123')).toEqual([2, 4, 6]);
  });

  it('Should should work on Map instances', () => {
    const instance = new Map([['a', 1], ['b', 2], ['c', 3]]);
    const keys = ['a', 'b', 'c'];

    const iteratee = (val, k, m) => {
      expect(m).toBe(instance);
      expect(k).toBe(keys.shift());
      expect(typeof val).toBe('number');
      return val * 2;
    };

    expect(map(iteratee)(instance)).toEqual([2, 4, 6]);
  });

  it('Should should work on Set instances', () => {
    const instance = new Set([1, 2, 3]);
    const keys = [0, 1, 2];

    const iteratee = (val, k, s) => {
      expect(s).toBe(instance);
      expect(k).toBe(keys.shift());
      expect(typeof val).toBe('number');
      return val * 2;
    };

    expect(map(iteratee)(instance)).toEqual([2, 4, 6]);
  });

  it('Should should work on plain objects', () => {
    const instance = { a: 1, b: 2, c: 3 };
    const keys = ['a', 'b', 'c'];

    const iteratee = (val, k, o) => {
      expect(o).toBe(instance);
      expect(k).toBe(keys.shift());
      expect(typeof val).toBe('number');
      return val * 2;
    };

    expect(map(iteratee)(instance)).toEqual([2, 4, 6]);
  });
});
