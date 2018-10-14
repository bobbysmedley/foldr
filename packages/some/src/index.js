/**
 * Exports the `some` function, which is similar to Array#some, but works
 * for "collections"; that is: Arrays, Arugments, Objects, Sets, and Maps.
 * @since 10/13/18
 * @file
 */

/* eslint-disable prefer-rest-params */

import curry from '@foldr/curry';
import isArray from '@foldr/is-array';
import iterate from '@foldr/internal-iterator';

const ArraySome = Array.prototype.some;

/**
 * A curried "some" function that calls `iteratee` for each item in the given collection.
 * This functions like Array.prototype.some.
 * This will work for instances of Array, Arguments, Object, Map and Set.
 * @param {function} iteratee The iteratee function to call for each element of `collection`.
 * @param {Array|Arguments|Object|Map|Set} collection The collection to iterate over.
 * @returns {boolean} True if iteratee returns `true` for any item in the collection.
 * @export
 * @example
 * const hasFoo = some(val => val === 'foo');
 * hasFoo(['bar', 'baz']);        // false
 * hasFoo(['bar', 'baz', 'foo']); // true
 * hasFoo({ x: 'foo' });          // true
 */
function some(iteratee, collection) {
  if (isArray(collection)) return ArraySome.call(collection, iterate);

  let found = false;

  iterate(collection, true, function iterateeWrap() {
    if (!iteratee.apply(collection, arguments)) return false;
    found = true;
    return true;
  });

  return found;
}

export default curry(some);
