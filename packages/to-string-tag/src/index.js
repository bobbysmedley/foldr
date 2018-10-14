/**
 * Exports the "toStringTag" function.
 * @since 10/11/18
 * @file
 */

const { toString } = Object.prototype;

/**
 * Calls Object.prototype.toString on `thing`.
 * @param {any} thing The thing to get the to string tag of.
 * @returns {string} The `thing's` toString representation.
 * @export
 */
export default function toStringTag(thing) {
  return toString.apply(thing);
}
