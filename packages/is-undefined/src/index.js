/**
 * Exports the `isUndefined` function.
 * @since 10/14/18
 * @file
 */

/**
 * Determines if the given item is undefined.
 * @param {any} x The value to assert undefined-ness.
 * @returns {boolean} True if `x` is undefined, false otherwise.
 * @export
 */
export default function isUndefined(x) {
  return x === undefined;
}
