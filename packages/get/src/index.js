/**
 * Exports the `get` function.
 * @since 9/25/18
 * @file
 */

import curry from '@foldr/curry';
import isString from '@foldr/is-string';
import isNumber from '@foldr/is-number';
import isObject from '@foldr/is-object';

/**
 * Used to split paths.
 * @type {RegExp}
 * \]\.   => foo[1].bar
 *                ^^
 * \]\[   => foo[1][10]
 *                ^^
 * [[\].] => foo.bar[1]
 *              ^   ^ ^
 */
const PATH_SPLITTER = /\]\.|\]\[|[[\].]/g;

/**
 * Traverses an object tree until the `prop` array is empty.
 * @param {Object} object The object to traverse.
 * @param {Array<string>} props The list of properties to traverse down on
 * `object` until finding the last one.
 * @returns {any} The value of `props.join('.')`, as per traversing the tree.
 */
function traverseObject(object, props) {
  const size = props.length;
  let current = object;

  for (let i = 0; i < size; i++) {
    current = current[props[i]];
    if (i !== size - 1 && !isObject(current)) return undefined;
  }

  return current;
}

/**
 * Walks the given object or string and finds the property
 * defined by `path`, which is a "path string" in the format:
 * `foo.bar.baz`, `foo[1].bar`, `foo[bar][baz]`.
 * @param {string} path The path of the property to get.
 * @param {Object|Array|String} thing The thing to "get" from.
 * @param {any=} fallback The fallback value if `undefined`
 * is returned from the lookup.
 * @returns {any} The value from thing at the given path.
 * @export
 * @example
 * const thing = { foo: [{ bar: 1 }, { bar: 2 }, { bar: 3 }]};
 * get(thing, 'foo');             // => [{ bar: 1 }, { bar: 2 }, { bar: 3 }]
 * get(thing, 'foo[0]');          // => { bar: 1 }
 * get(thing, 'foo[0].bar');      // => 1
 * get(thing, 'foo[0].bar.baz');  // => undefined
 *
 * // Using a fallback value if the item at path doesn't exist or is undefined.
 * get(thing, 'foo.xxx', 'fallback'); // => 'fallback'
 */
function get(path, thing, fallback = undefined) {
  if (!path || (!isString(path) && !isNumber(path))) return fallback;

  const isAStringThing = isString(thing);

  // `thing` isn't a string, object, or array.
  if (!(isAStringThing || isObject(thing))) return fallback;

  const props = path.toString().split(PATH_SPLITTER).filter(Boolean);

  // Can't traverse more than one level deep on a string.
  if (isAStringThing && props.length > 1) return fallback;

  const fallsbackMaybe = value => (value === undefined ? fallback : value);

  return props.length !== 1
    ? fallsbackMaybe(traverseObject(thing, props))
    : fallsbackMaybe(thing[props[0]]);
}

export default curry(get);
