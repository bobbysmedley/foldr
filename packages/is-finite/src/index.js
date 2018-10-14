/**
 * Exports the `isNumber` function.
 * @since 9/25/18
 * @file
 */

import curry from '@foldr/curry';
import isNumber from '@foldr/is-number';
import { global } from '@foldr/internal-env';

const isFinite = Number.isFinite || function isFinite(x) {
  // eslint-disable-next-line no-restricted-properties
  return isNumber(x) && global.isFinite(x);
};

/**
 * Determines if the given item is a finite number. That is both a number and not Infinity.
 * @param {any} x The value to assert finiteness.
 * @returns {boolean} True if `x` is a finite, false otherwise.
 * @export
 */
export default curry(isFinite);
