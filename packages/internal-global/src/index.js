/**
 * Exports the "global" value, albeit `global` in node and `window` in the browser.
 * @since 10/13/18
 * @file
 */

export default typeof window === 'undefined' ? global : window;
