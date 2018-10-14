const _ = require('lodash');
const R = require('rambda');
const assert = require('assert');
const Benchmark = require('benchmark');

const map = require('./dist').default;

const { log } = console;

const equals = (fn, x) => assert(_.isEqual(fn(), x));
const toFixed = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

function handleCycleComplete({ target }) {
  const { name, hz, error } = target;
  log(`${name}: ${error ? `[Error: ${error.message}]` : toFixed(hz)}`);
}

new Benchmark.Suite()
  .add('Foldr #1', () => equals(() => map(x => x * 2, [1, 2, 3, 4]), [2, 4, 6, 8]))
  .add('Lodash #1', () => equals(() => _.map([1, 2, 3, 4], x => x * 2), [2, 4, 6, 8]))
  .add('Rambda #1', () => equals(() => R.map(x => x * 2, [1, 2, 3, 4]), [2, 4, 6, 8]))

  .add('Foldr #2', () => equals(() => map(x => x * 2, { a: 1, b: 2, c: 3, d: 4 }), [2, 4, 6, 8]))
  .add('Lodash #2', () => equals(() => _.map({ a: 1, b: 2, c: 3, d: 4 }, x => x * 2), [2, 4, 6, 8]))
  .add('Rambda #2', () => equals(() => R.map(x => x * 2, { a: 1, b: 2, c: 3, d: 4 }), [2, 4, 6, 8]))

  .add('Foldr #3', () => equals(() => map(x => `${x}z`, 'foo'), ['fz', 'oz', 'oz']))
  .add('Lodash #3', () => equals(() => _.map('foo', x => `${x}z`), ['fz', 'oz', 'oz']))
  .add('Rambda #3', () => equals(() => R.map(x => `${x}z`, 'foo'), ['fz', 'oz', 'oz']))

  .on('cycle', handleCycleComplete)
  .run({ async: true });
