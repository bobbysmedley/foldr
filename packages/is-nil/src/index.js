/**
 * Exports the `isNil` function.
 * @since 10/14/18
 * @file
 */

/* eslint-disable eqeqeq */

/**
 * Determines if the given item is either undefined or null.
 * @param {any} x The value to assert nil-ness.
 * @returns {boolean} True if `x` is nil, false otherwise.
 * @export
 */
export default function isNil(x) {
  return x == undefined;
}
