/**
 * Tests for source-directory-beast.js
 */

const assert = require('assert');
const path = require('path');
const sourceDirBeast = require('../source-directory-beast');

// Test sourcing from real data
const items = sourceDirBeast.source({ maxItems: 3 });
console.log(`[source-directory-beast] Got ${items.length} items`);

assert(Array.isArray(items), 'Should return an array');
assert(items.length <= 3, 'Should respect maxItems');

if (items.length > 0) {
  const item = items[0];
  assert(item.id, 'Item should have id');
  assert(item.title, 'Item should have title');
  assert(item.description, 'Item should have description');
  assert(item.sourceProject === 'directory-beast', 'Item should have sourceProject');
  assert(item.type === 'destination', 'Item should be type destination');
  assert(Array.isArray(item.tags), 'Item should have tags array');
  assert(Array.isArray(item.images), 'Item should have images array');
  assert(item.metadata, 'Item should have metadata');

  console.log(`  Sample item: ${item.title} (${item.metadata.city}, ${item.metadata.country})`);
  console.log(`  Tags: ${item.tags.slice(0, 3).join(', ')}`);
  console.log(`  Images: ${item.images.length}`);
  console.log(`  Tips: ${(item.metadata.tipsAndTricks || []).length}`);
}

console.log('✓ source-directory-beast: valid items\n');
