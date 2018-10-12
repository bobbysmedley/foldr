/**
 * Tests for the `curry` function.
 * @since 10/11/18
 * @file
 */

import { expect } from 'chai';
import curry from '.';

describe('curry', () => {
  it('Should be a function', () => {
    expect(curry).to.be.a('function');
  });
});
