/**
 * Exports the `isNull` function.
 * @since 10/14/18
 * @file
 */

/**
 * Determines if the given item is null.
 * @param {any} x The value to assert null-ness.
 * @returns {boolean} True if `x` is null, false otherwise.
 * @export
 */
export default function isNull(x) {
  return x === null;
}
