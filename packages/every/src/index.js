/**
 * Exports the `every` function, which is similar to Array#every, but works
 * for "collections"; that is: Arrays, Arugments, Objects, Sets, and Maps.
 * @since 10/13/18
 * @file
 */

/* eslint-disable prefer-rest-params, require-jsdoc */

import curry from '@foldr/curry';
import iterate from '@foldr/internal-iterator';

/**
 * A curried "every" function that calls `iteratee` for each item in the given collection.
 * This functions like Array.prototype.every.
 * This will work for instances of Array, Arguments, Object, Map and Set.
 * @param {function} iteratee The iteratee function to call for each element of `collection`.
 * @param {Array|Arguments|Object|Map|Set} collection The collection to iterate over.
 * @returns {boolean} True if iteratee returns `true` for every item in the collection,
 * false otherwise.
 * @export
 * @example
 * const hasFoo = some(val => val === 'foo');
 * hasFoo(['bar', 'baz']);        // false
 * hasFoo(['bar', 'baz', 'foo']); // true
 * hasFoo({ x: 'foo' });          // true
 */
function every(iteratee, collection) {
  let unmatched = false;

  function iterateeWrap() {
    if (iteratee.apply(collection, arguments)) return false;
    unmatched = true;
    return true;
  }

  iterate(iterateeWrap, collection, true);
  return unmatched;
}

export default curry(every);
