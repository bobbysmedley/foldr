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
 * Used to iterate over Object instances.
 * If the object has it's own `length` property, it will be iterated on using
 * Array.prototype.forEach.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Object.
 * @returns {undefined}
 */
function ObjectIterator(iteratee) {
  if (this.length || this.length === 0) {
    Array.prototype.forEach.call(this, iteratee);
    return;
  }

  const keys = Object.keys(this);
  const size = keys.length;

  for (let i = 0; i < size; i++) {
    iteratee(this[keys[i]], keys[i], this);
  }
}

/**
 * Used to iterate over Set instances.
 * Since Set#forEach passes the value for both the key and the value,
 * we're writing and override that will pass a proper key value.
 * @param {function} iteratee The iteratee to invoke for each property of `this` Set.
 * @returns {undefined}
 */
function SetIterator(iteratee) {
  let i = 0;
  this.forEach(value => iteratee(value, i++, this));
}

/**
 * Used to iterate over Object instances (and can be broken).
 * @param {function} iteratee The iteratee to invoke for each property of `this` Object.
 * @returns {undefined}
 */
function ObjectBreakableIterator(iteratee) {
  const keys = Object.keys(this);
  const size = keys.length;

  for (let i = 0; i < size; i++) {
    if (iteratee(this[keys[i]], keys[i], this)) break;
  }
}

/**
 * Used to iterate over Map instances (and can be broken).
 * @param {function} iteratee The iteratee to invoke for each property of `this` Map.
 * @returns {undefined}
 */
function MapBreakableIterator(iteratee) {
  // IE 11 doesn't have support for Map#entries
  // AFAIK there's no way to "break" in IE.
  if (typeof this.entries !== 'function') {
    let broken = false;

    this.forEach((value, key) => {
      if (broken) return;
      if (iteratee(value, key, this)) broken = true;
    });
  }

  const iterator = this.values();
  let entry = iterator.next();

  while (!entry.done) {
    if (iteratee(entry.value[0], entry.value[1], this)) break;
    entry = iterator.next();
  }
}

/**
 * Used to iterate over Map instances (and can be broken).
 * @param {function} iteratee The iteratee to invoke for each property of `this` Map.
 * @returns {undefined}
 */
function SetBreakableIterator(iteratee) {
  let i = 0;

  // IE 11 doesn't have support for Set#entries
  // AFAIK there's no way to "break" in IE.
  if (typeof this.entries !== 'function') {
    let broken = false;

    this.forEach((value) => {
      if (broken) return;
      if (iteratee(value, i++, this)) broken = true;
    });
  }

  const iterator = this.values();
  let entry = iterator.next();

  while (!entry.done) {
    if (iteratee(entry.value[0], i++, this)) break;
    entry = iterator.next();
  }
}

/**
 * A mapping of "iterator" functions to toString tags.
 * @type {Object<function>}
 */
const ITERATOR_MAPPING = {
  '[object Set]': SetIterator,
  '[object Map]': Map.prototype.forEach,
  '[object Array]': Array.prototype.forEach,
  '[object String]': Array.prototype.forEach,
  '[object Object]': ObjectIterator,
  '[object Arguments]': Array.prototype.forEach,
};

/**
 * A mapping of "iterator" functions to toString tags.
 * @type {Object<function>}
 */
const BREAKABLE_ITERATOR_MAPPING = {
  '[object Set]': SetBreakableIterator,
  '[object Map]': MapBreakableIterator,
  '[object Array]': Array.prototype.some,
  '[object String]': Array.prototype.some,
  '[object Object]': ObjectBreakableIterator,
  '[object Arguments]': Array.prototype.some,
};

/**
 * Iterates over `thing` and invokes `iteratee` for each item in the collection.
 * @param {function} iteratee The iteratee function to invoke for each item in the collection.
 * @param {Array|Arguments|Object|Set|Map} thing The "thing" to iterate over.
 * @param {boolean=} breakable True for a "breakable" iterator.
 * @returns {undefined}
 * @export
 */
export default function iterate(iteratee, thing, breakable = false) {
  const iterators = breakable ? BREAKABLE_ITERATOR_MAPPING : ITERATOR_MAPPING;
  return ((thing && iterators[toStringTag(thing)]) || noop).apply(thing, arguments);
}
