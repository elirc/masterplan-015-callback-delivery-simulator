import test from 'node:test';
import assert from 'node:assert/strict';

import { deliveryRun } from '../public/core.js';
function fixture(failA = false) {
  const jobs = []; const log = []; const canceled = [];
  const stop = deliveryRun({ schedule: (fn, delay) => { jobs.push({ fn, delay }); return jobs.length; }, cancel: id => canceled.push(id), emit: line => log.push(line), failA });
  return { jobs, log, canceled, stop };
}
test('synchronous events precede deliveries; completion can reverse scheduling', () => {
  const f = fixture(); assert.deepEqual(f.log, ['start', 'scheduled']);
  f.jobs.sort((a, b) => a.delay - b.delay).forEach(job => job.fn());
  assert.deepEqual(f.log, ['start', 'scheduled', 'delivered B', 'delivered A']);
});
test('a callback failure is recorded without suppressing another delivery', () => {
  const f = fixture(true); f.jobs.forEach(job => job.fn());
  assert.deepEqual(f.log.slice(2), ['error A: simulated failure', 'delivered B']);
});
test('cancellation suppresses even a callback already queued by a scheduler', () => {
  const f = fixture(); f.stop(); f.jobs.forEach(job => job.fn());
  assert.deepEqual(f.log, ['start', 'scheduled']); assert.deepEqual(f.canceled, [1, 2]);
});
