const _ = require('lodash');
const R = require('rambda');
const assert = require('assert');
const Benchmark = require('benchmark');

const filter = require('./dist').default;

const { log } = console;

const equals = (fn, x) => assert(_.isEqual(fn(), x));
const toFixed = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

function handleCycleComplete({ target }) {
  const { name, hz, error } = target;
  log(`${name}: ${error ? `[Error: ${error.message}]` : toFixed(hz)}`);
}

new Benchmark.Suite()
  .add('Lodash #1', () => equals(() => _.filter([2, 3, 1, 4], x => x === 1), [1]))
  .add('Rambda #1', () => equals(() => R.filter(x => x === 1, [2, 3, 1, 4]), [1]))
  .add('Foldr #1', () => equals(() => filter(x => x === 1, [2, 3, 1, 4]), [1]))
  .add('Lodash #2', () => equals(() => _.filter({ a: 2, b: 1, c: 4 }, x => x === 1), [1]))
  .add('Rambda #2', () => equals(() => R.filter(x => x === 1, { a: 2, b: 1, c: 4 }), [1]))
  .add('Foldr #2', () => equals(() => filter(x => x === 1, { a: 2, b: 1, c: 4 }), [1]))
  .on('cycle', handleCycleComplete)
  .run({ async: true });
