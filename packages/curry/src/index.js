/**
 * Exports the curry function.
 * @since 10/13/18
 * @file
 */

/* eslint-disable no-array-constructor, prefer-rest-params, no-underscore-dangle, require-jsdoc */

import getSymbol from '@foldr/internal-symbol';

/**
 * The default placeholder value.
 * @type {SafeSymbol}
 */
export const _ = getSymbol('placeholder');

/**
 * Used to map curried functions back to their original source function.
 * @type {Sym}
 */
const SOURCE = getSymbol('source');

/**
 * Used to map curried functions back to their original source function.
 * @type {Sym}
 */
const ARITY = getSymbol('arity');

/**
 * Determines is the given function has been curried.
 * @param {function} fn The function to inspect.
 * @returns {Boolean} True if `fn` is a curried function, false otherwise.
 */
export function isCurried(fn) {
  return !!(fn && fn[SOURCE]);
}

/**
 * Gets the arity of a function.
 * @param {function} fn The function to get the arity of.
 * @returns {number} The function's arity.
 * @export
 */
export function getArityOf(fn) {
  return typeof fn === 'function' ? (fn[ARITY] || fn.length) : 0;
}

/**
 * Returns a curried function's source (original, uncurried) function.
 * @param {function} fn The function to get the source function of.
 * @returns {function|undefined} The function's source function.
 */
export function getSourceFunction(fn) {
  return fn ? fn[SOURCE] : undefined;
}

// Alias for getSourceFunction
export const uncurry = getSourceFunction;

/**
 * The `toString` implementation for curried functions.
 * This will print thehe original function's source string
 * prepended with a friendly message that the function is curried.
 * @returns {string} The source function's code with a comment
 * informing the user that the function is curried.
 */
function toStringForCurried() {
  return '/* Wrapped with curry */\r\n'.concat(this[SOURCE].toString());
}

/**
 * Gets the next argument set in the curry sequence. This will
 * combine the previous and current argument set, while replacing
 * placeholders in the previous set with the current. While similar
 * to `getArgumentsCapped`, they've been seperated for performance reasons.
 * @param {Array|Arguments} prev The previous function invocation's arguments.
 * @param {Arguments} curr The current function invocation's arguments.
 * @returns {Array} The "concatenated" arguments.
 */
function getArgumentsUncapped(prev, curr) {
  const args = new Array();

  let i = 0;
  let index = 0;

  for (; i < prev.length; i++) {
    args[i] = prev[i] === _ && index < curr.length ? curr[index++] : prev[i];
  }

  while (index < curr.length) {
    args[i++] = curr[index++];
  }

  return args;
}

/**
 * Gets the next argument set in the curry sequence. This will
 * combine the previous and current argument set, while replacing
 * placeholders in the previous set with the current. This is the
 * capped version, which limits arguments to the function arity,
 * therefore "properly" disallowing rest and default params.
 * While similar to `getArgumentsUncapped`, they've been seperated
 * for performance reasons.
 * @param {Array|Arguments} prev The previous invocation's arguments.
 * @param {Arguments} curr The current invocation's arguments.
 * @param {number} arity The arity of the source function (`fn`).
 * @returns {Array} The "concatenated" arguments.
 */
function getArgumentsCapped(prev, curr, arity) {
  const args = new Array();

  let i = 0;
  let index = 0;

  for (; i < arity && i < prev.length; i++) {
    args[i] = prev[i] === _ && index < curr.length ? curr[index++] : prev[i];
  }

  while (i < arity && index < curr.length) {
    args[i++] = curr[index++];
  }

  return args;
}

/**
 * Creates a new array from the given arguments set
 * with the number of items limited to `arity`.
 * @param {Arguments} args The argument set to cap.
 * @param {number} arity The arity of the source function.
 * @returns {Array} The capped arguments set.
 */
function cap(args, arity) {
  const capped = new Array();
  for (let i = 0; i < arity; i++) capped[i] = args[i];
  return capped;
}

/**
 * Determines if an argument set has any placeholders (up to arity), which
 * indicates that it's not safe to invoke the curried function's source function.
 * @param {Array|Arguments} args The argument set to inspect.
 * @param {number} arity The arity of the source function.
 * @returns {boolean} True if it's safe to call the source functon, false otherwise.
 */
function hasPlaceholders(args, arity) {
  for (let i = 0; i < arity; i++) if (args[i] === _) return true;
  return false;
}

/**
 * Creates a curried version of `fn`.
 * @param {function} fn The source (original) function that's being curried.
 * @param {number} arity The arity of the source function to curry to. Once
 * arity has been achived by passing enough arguments, `fn` will be invoked.
 * @param {boolean} capped True if the number of arguments applied to `fn`
 * can exceed the arity. If false, rest params and default params won't work
 * without specifying a custom arity in the `curry` method below.
 * @returns {function} The curried function.
 */
function create(fn, arity, capped) {
  const getArguments = capped ? getArgumentsCapped : getArgumentsUncapped;

  // Called after the first invocation.
  // Previous arguments must be shallow copied
  // and combined with the current argument set.
  function recurry(previousArgs, currentArity) {
    function recurried() {
      if (!arguments.length) return recurried;
      const args = getArguments(previousArgs, arguments, arity);

      return args.length < arity || hasPlaceholders(args, arity)
        ? recurry(args, currentArity - 1)
        : fn.apply(this, args);
    }

    recurried[ARITY] = currentArity;
    recurried[SOURCE] = fn;
    recurried.toString = toStringForCurried;
    return recurried;
  }

  // Optimized first invocation.
  // Don't have to combine any arguments, since no prior calls have been made.
  function curried() {
    const size = arguments.length;
    if (!size) return curried;

    return size < arity || hasPlaceholders(arguments, arity)
      ? recurry(arguments, arity - 1)
      : fn.apply(this, capped && size > arity ? cap(arguments, arity) : arguments);
  }

  curried[ARITY] = arity;
  curried[SOURCE] = fn;
  curried.toString = toStringForCurried;
  return curried;
}

/**
 * Curries a function.
 * @param {function} fn The function to curry.
 * @param {Object=} options Currying behavioral options.
 * @param {number} [options.arity=fn.length] The arity of `fn` or
 * a specific arity override to curry `fn` to.
 * @param {number} [options.capped=true] True to limit the number
 * of arguments to the source function to arity. If false, calling
 * `fn` with arguments > arity will pass them through.
 * @returns {function} The curried version of `fn`.
 * @export
 * @example
 * const curried = curry((x, y, z) => x + y + z);
 * curried()        // => curried
 * curried(1)       // => [object Function]
 * curried(1)(2)    // => [object Function]
 * curried(1)(2)(3) // => 6
 * curried(1, 2)(3) // => 6
 * curried(1)(2, 3) // => 6
 * curried(1, 2, 3) // => 6
 *
 * // You can also use partial application (placeholders)...
 * const triples = curry((a, b, c) => [a, b, c]);
 * triples(_, 2, 3)(1)    // => [1, 2, 3]
 * triples(_, _, 3)(1)(2) // => [1, 2, 3]
 * triples(1)(_)(2)(_)(3) // => [1, 2, 3]
 * triples(1)(_, 3)(2)    // => [1, 2, 3]
 * triples(_, 2)(1)(3)    // => [1, 2, 3]
 */
export default function curry(fn, { arity = fn.length, capped = true } = {}) {
  if (typeof fn !== 'function') {
    throw new Error('Expected a function for parameter `fn`');
  }

  return fn[SOURCE] || arity <= 0 ? fn : create(fn, arity, capped);
}

// Exposing the placeholder value
curry._ = _;
