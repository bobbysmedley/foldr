/**
 * Exports the `isInteger` function.
 * This is based on the polyfill from MDN:
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
 * @since 9/25/18
 * @file
 */

/* eslint-disable no-bitwise */

import curry from '@foldr/curry';
import isFinite from '@foldr/is-finite';

/**
 * Determines if the given item is an integer.
 * @param {any} x The value to assert.
 * @returns {boolean} True if `x` is an integer, false otherwise.
 * @export
 */
const isInteger = Number.isInteger || function isInteger(x) {
  return isFinite(x) && (x | 0) === x;
};

export default curry(isInteger);
