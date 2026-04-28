/**
 * Tests for lib.js
 */

const assert = require('assert');
const lib = require('../lib');

// Test contentHash
const h1 = lib.contentHash('tokyo-001', 'short-hook', '2026-04-27');
const h2 = lib.contentHash('tokyo-001', 'short-hook', '2026-04-27');
assert.strictEqual(h1, h2, 'contentHash should be deterministic');
assert.strictEqual(h1.length, 12, 'contentHash should be 12 chars');
console.log('✓ contentHash: deterministic, 12 chars');

// Test todayStr
const ts = lib.todayStr();
assert.match(ts, /^\d{4}-\d{2}-\d{2}$/, 'todayStr should be YYYY-MM-DD');
console.log('✓ todayStr: correct format');

// Test truncate
assert.strictEqual(lib.truncate('hello world', 5), 'he...');
assert.strictEqual(lib.truncate('hello', 10), 'hello');
assert.strictEqual(lib.truncate('', 5), '');
assert.strictEqual(lib.truncate(null, 5), '');
console.log('✓ truncate: correct truncation');

// Test uuid
const u1 = lib.uuid();
const u2 = lib.uuid();
assert.notStrictEqual(u1, u2, 'uuid should be unique');
console.log('✓ uuid: unique values');

// Test pickRandom
const arr = [1, 2, 3, 4, 5];
const picked = lib.pickRandom(arr, 3);
assert.strictEqual(picked.length, 3, 'pickRandom should return correct count');
console.log('✓ pickRandom: correct count');

console.log('\n✅ All lib tests passed!');
