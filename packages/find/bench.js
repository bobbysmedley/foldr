const _ = require('lodash');
const R = require('rambda');
const assert = require('assert');
const Benchmark = require('benchmark');

const find = require('./dist').default;

const { log } = console;

const equals = (fn, x) => assert(fn() === x);
const toFixed = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

function handleCycleComplete({ target }) {
  const { name, hz, error } = target;
  log(`${name}: ${error ? `[Error: ${error.message}]` : toFixed(hz)}`);
}

new Benchmark.Suite()
  .add('Lodash #1', () => equals(() => _.find([2, 3, 1, 4], x => x === 1), 1))
  .add('Rambda #1', () => equals(() => R.find(x => x === 1, [2, 3, 1, 4]), 1))
  .add('Foldr #1', () => equals(() => find(x => x === 1, [2, 3, 1, 4]), 1))
  .add('Lodash #2', () => equals(() => _.find({ a: 1, b: 2, c: 3 }, x => x === 1), 1))
  .add('Rambda #2', () => equals(() => R.find(x => x === 1, { a: 1, b: 2, c: 3 }), 1))
  .add('Foldr #2', () => equals(() => find(x => x === 1, { a: 1, b: 2, c: 3 }), 1))
  .add('Lodash #3', () => equals(() => _.find('foobar', x => x === 'b'), 'b'))
  .add('Rambda #3', () => equals(() => R.find(x => x === 'b', 'foobar'), 'b'))
  .add('Foldr #3', () => equals(() => find(x => x === 'b', 'foobar'), 'b'))
  .on('cycle', handleCycleComplete)
  .run({ async: true });
