/**
 * Exports the prototypeCurry function.
 * @since 10/13/18
 * @file
 */

/* eslint-disable no-array-constructor, prefer-rest-params, require-jsdoc */

import curry from '@foldr/curry';

const identity = x => x;

/**
 * Used to curry prototype methods.
 * This will wrap the given prototype method to use Function.apply,
 * providing the *last* argument provided as the `this` value for the call.
 *
 * See the example below for insight. If called on a regular function,
 * this could produce some interesting (unexpected) results.
 * @param {function} fn The prototype method to curry.
 * @param {number} [options.arity=fn.length] The arity of `fn` or
 * a specific arity override to curry `fn` to.
 * @param {number} [options.capped=true] True to limit the number
 * of arguments to the source function to arity. If false, calling
 * `fn` with arguments > arity will pass them through.
 * @param {undefined|function} options.guard If set and the context is null or undefined,
 * this function will be called as the new context. This is useful to protect calls to
 * Array.prototype.map with `null` as the context, for example.
 * @param {number=} options.thisArgPosition The position of the argument to use
 * as the `this` argument when invoking the prototype method (as an override).
 * @returns {function} The curried method.
 * @example
 * // Convert Array#map to a curried method.
 * const map = curry.proto(Array.prototype.map);
 * map (x => x * 2) ([1, 2, 3]); // => [2, 4, 6]
 *
 * // Convert Array#filter to a curried method.
 * const filter = curry.proto(Array.prototype.filter);
 * const isOdd = filter(x => x % 2)
 * isOdd([1, 2, 3]) => [1, 3]
 *
 * // Convert String#toUpperCase to a curried method.
 * const toUpperCase = curry.proto(String.prototype.toUpperCase);
 * toUpperCase('foobar') // => 'FOOBAR'
 *
 * // Convert String#slice to a curried method
 * const slice = curry.proto(String.prototype.slice);
 * slice(0)(3)('foobar') // => 'foo'
 *
 * // Setting the arity to 2 to omit the end argument.
 * const sliceS = curry.proto(String.prototype.slice, { arity: 2 });
 * sliceS(3)('foobar') // => 'bar'
 * @export
 */
export default function prototypeCurry(fn, {
  arity = fn.length + 1,
  guard = false,
  capped = true,
  convert = identity,
  thisArgPosition = arity - 1,
} = {}) {
  const guarded = typeof guard === 'function';

  function wrapper() {
    const args = new Array();
    const context = arguments[thisArgPosition];

    for (let i = 0, n = 0; i < arguments.length; i++) {
      if (i !== thisArgPosition) args[n++] = arguments[i];
    }

    return guarded
      ? fn.apply(context === undefined || context === null ? guard() : convert(context), args)
      : fn.apply(convert(context), args);
  }

  // Must do this for native functions for the modified
  // toString function to be correct for some reason?
  wrapper.toString = fn.toString.bind(fn);
  return curry(wrapper, { arity, capped });
}
