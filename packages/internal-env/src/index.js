/**
 * Exports current environment settings.
 * @since 10/13/18
 * @file
 */

export default {
  global: typeof window === 'undefined' ? global : window,
  isNode: typeof process !== 'undefined' && typeof (process.versions || {}).node === 'string',
};
