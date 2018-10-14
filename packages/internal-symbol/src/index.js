/**
 * Exports a function to get Symbol values in a platform agnostic way.
 * @since 10/11/18
 * @file
 */

/**
 * The prefix to apply to *all* symbols.
 * @type {string}
 */
const prefix = '@@foldr/';

const SafeSymbol = typeof Symbol === 'function' ? Symbol : (function PseudoSymbol() {
  let counter = 0;
  const registry = {};

  /**
   * A partial polyfill of Symbol.
   * This will only be used in the event that native Symbols aren't
   * avaiable (like in IE11, for example).
   * @param {string} label The symbol's label.
   * @returns {string} A "string" symbol.
   */
  function Symbol(label) {
    const id = '000000000'.concat((Date.now() + counter++).toString(36)).slice(-9);
    const value = `${prefix}/${id}/${label}`;
    return { toString: () => value };
  }

  /**
   * Like Symbol.for, this will return a "globally registered" symbol.
   * @param {string} label The label to get/create the symbol for.
   * @returns {string} The fake symbol value.
   */
  Symbol.for = function SymbolFor(label) {
    registry[label] = registry[label] || Symbol(label);
    return registry[label];
  };

  return Symbol;
}());

/**
 * Calls Sym.for to create and register a Symbol, or in the event
 * it's IE11, a "PseudoSymbol".
 * @param {string} label The symbol's label
 * @returns {Symbol|string} The symbol or pseudo symbol.
 * @export
 */
export default function getSymbol(label) {
  return SafeSymbol.for(prefix.concat(label));
}
