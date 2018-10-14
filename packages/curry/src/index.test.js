/**
 * Tests for the `curry` function.
 * @since 10/11/18
 * @file
 */

import curry from '.';

describe('curry', () => {
  it('Should be a function', () => {
    expect(typeof curry).toBe('function');
  });
});
