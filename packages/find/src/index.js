/**
 * Exports the `find` function, which is similar to Array#find, but works
 * for "collections"; that is: Arrays, Arugments, Objects, Sets, and Maps.
 * @since 10/13/18
 * @file
 */

/* eslint-disable prefer-rest-params, require-jsdoc */

import curry from '@foldr/curry';
import iterate from '@foldr/internal-iterator';

/**
 * A curried "find" function that calls `iteratee` for each item in the given collection.
 * This functions like Array.prototype.find.
 * This will work for instances of Array, Arguments, Object, Map and Set.
 * @param {function} iteratee The iteratee function to call for each element of `collection`.
 * If this returns true, the current item will be returned. If it returns false, iteration
 * will continue. If nothing is found, `undefined` will be returned;
 * @param {Array|Arguments|Object|Map|Set} collection The collection to find an item within.
 * @returns {any} The found item, or undefined.
 * @export
 * @example
 * const getJohn = find(user => user.name === 'John');
 * const john = getJohn([{ name: 'Jane' }, { name: 'John' }]); // => { name: 'John' }
 */
function find(iteratee, collection) {
  let item;

  function iterateeWrap(value) {
    if (!iteratee.apply(collection, arguments)) return false;
    item = value;
    return true;
  }

  iterate(iterateeWrap, collection, true);
  return item;
}

export default curry(find);
