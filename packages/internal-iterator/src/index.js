/**
 * An internally used iterator.
 * This is used to iterate over collections in an agnostic way.
 * @since 10/13/18
 * @file
 */

import noop from '@foldr/noop';
import toStringTag from '@foldr/to-string-tag';

/* eslint-disable prefer-rest-params */

/**
 * Used to iterate over Array|String instances.
 * @param {Array|String|Arguments} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Object.
 * @returns {undefined}
 */
function LengthyIterator(collection, iteratee) {
  const size = collection.length;

  for (let i = 0; i < size; i++) {
    iteratee(collection[i], i, collection);
  }
}

/**
 * Used to iterate over Array|String instances.
 * @param {Array|String|Arguments} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Object.
 * @returns {undefined}
 */
function LengthyBreakableIterator(collection, iteratee) {
  const size = collection.length;

  for (let i = 0; i < size; i++) {
    if (iteratee(collection[i], i, collection)) break;
  }
}

/**
 * Used to iterate over Object instances.
 * If the object has it's own `length` property, it will be iterated on using `LengthyIterator`.
 * @param {Object} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Object.
 * @returns {undefined}
 */
function ObjectIterator(collection, iteratee) {
  if (collection.length || collection.length === 0) {
    return LengthyIterator(collection, iteratee);
  }

  const keys = Object.keys(collection);
  const size = keys.length;

  for (let i = 0; i < size; i++) {
    iteratee(collection[keys[i]], keys[i], collection);
  }
}

/**
 * Used to iterate over Object instances (and can be broken).
 * @param {Object} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Object.
 * @returns {undefined}
 */
function ObjectBreakableIterator(collection, iteratee) {
  const keys = Object.keys(collection);
  const size = keys.length;

  for (let i = 0; i < size; i++) {
    if (iteratee(collection[keys[i]], keys[i], collection)) break;
  }
}

/**
 * Used to iterate over Set instances.
 * Since Set#forEach passes the value for both the key and the value,
 * we're writing and override that will pass a proper key value.
 * @param {Set} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Set.
 * @returns {undefined}
 */
function SetIterator(collection, iteratee) {
  let i = 0;
  collection.forEach(value => iteratee(value, i++, collection));
}

/**
 * Used to iterate over Set instances.
 * Since Set#forEach passes the value for both the key and the value,
 * we're writing and override that will pass a proper key value.
 * @param {Map} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Set.
 * @returns {undefined}
 */
function MapIterator(collection, iteratee) {
  collection.forEach((value, key) => iteratee(value, key, collection));
}

/**
 * Used to iterate over Map instances (and can be broken).
 * @param {Map} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Map.
 * @returns {undefined}
 */
function MapBreakableIterator(collection, iteratee) {
  // IE 11 doesn't have support for Map#entries
  // AFAIK there's no way to "break" in IE.
  if (typeof collection.entries !== 'function') {
    let broken = false;

    collection.forEach((value, key) => {
      if (broken) return;
      if (iteratee(value, key, collection)) broken = true;
    });
  }

  const iterator = collection.entries();
  let current = iterator.next();

  while (!current.done) {
    if (iteratee(current.value[0], current.value[1], collection)) break;
    current = iterator.next();
  }
}

/**
 * Used to iterate over Map instances (and can be broken).
 * @param {Set} collection The collection to iterate over.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Map.
 * @returns {undefined}
 */
function SetBreakableIterator(collection, iteratee) {
  let i = 0;

  // IE 11 doesn't have support for Set#entries
  // AFAIK there's no way to "break" in IE.
  if (typeof collection.entries !== 'function') {
    let broken = false;

    collection.forEach((value) => {
      if (broken) return;
      if (iteratee(value, i++, collection)) broken = true;
    });
  }

  const iterator = collection.entries();
  let current = iterator.next();

  while (!current.done) {
    if (iteratee(current.value[0], i++, collection)) break;
    current = iterator.next();
  }
}

/**
 * A mapping of "iterator" functions to toString tags.
 * @type {Object<function>}
 */
const ITERATOR_MAPPING = {
  '[object Set]': SetIterator,
  '[object Map]': MapIterator,
  '[object Array]': LengthyIterator,
  '[object String]': LengthyIterator,
  '[object Object]': ObjectIterator,
  '[object Arguments]': LengthyIterator,
};

/**
 * A mapping of "iterator" functions to toString tags.
 * @type {Object<function>}
 */
const BREAKABLE_ITERATOR_MAPPING = {
  '[object Set]': SetBreakableIterator,
  '[object Map]': MapBreakableIterator,
  '[object Array]': LengthyBreakableIterator,
  '[object String]': LengthyBreakableIterator,
  '[object Object]': ObjectBreakableIterator,
  '[object Arguments]': LengthyBreakableIterator,
};

/**
 * Iterates over `thing` and invokes `iteratee` for each item in the collection.
 * @param {Array|Arguments|Object|Set|Map} thing The "thing" to iterate over.
 * @param {boolean=} breakable True for a "breakable" iterator.
 * @param {function} iteratee The iteratee function to invoke for each item in the collection.
 * @returns {undefined}
 * @export
 */
export default function iterate(thing, breakable, iteratee) {
  const iterators = breakable ? BREAKABLE_ITERATOR_MAPPING : ITERATOR_MAPPING;
  return ((thing && iterators[toStringTag(thing)]) || noop)(thing, iteratee);
}
