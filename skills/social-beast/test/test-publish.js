/**
 * Tests for all publish skills (mock mode).
 */

const assert = require('assert');

// Create a sample ContentItem
const sampleItem = {
  id: 'test-sh-abc123',
  sourceId: 'tokyo-001',
  sourceProject: 'directory-beast',
  format: 'short-hook',
  platforms: ['twitter', 'telegram', 'linkedin'],
  content: 'Tokyo Disneyland is the ultimate family destination. Perfect for ages 3-12. https://example.com #FamilyTravel',
  thread: ['Tweet 1: Tokyo Disneyland...', 'Tweet 2: Pro tips...', 'Tweet 3: Link and CTA...'],
  images: ['https://example.com/img1.jpg'],
  contentHash: 'abc123def456',
  createdAt: new Date().toISOString(),
  status: 'approved',
};

const itemNoMatch = {
  ...sampleItem,
  platforms: ['email'],
};

async function run() {
  // Test Twitter
  const publishTwitter = require('../publish-twitter');
  const twResult = await publishTwitter.publish(sampleItem, {});
  assert(twResult, 'Twitter should return result');
  assert(twResult.platform === 'twitter', 'Twitter result should have correct platform');
  assert(twResult.status === 'success', 'Twitter result should be success');
  console.log(`  ✓ publish-twitter: ${twResult.url}`);

  // Test Twitter skip (platform not in item)
  const twSkip = await publishTwitter.publish(itemNoMatch, {});
  assert.strictEqual(twSkip, null, 'Twitter should skip when platform not matched');
  console.log('  ✓ publish-twitter: correctly skipped when not in platforms');

  // Test Telegram
  const publishTelegram = require('../publish-telegram');
  const tgResult = await publishTelegram.publish(sampleItem, {});
  assert(tgResult, 'Telegram should return result');
  assert(tgResult.platform === 'telegram', 'Telegram result should have correct platform');
  assert(tgResult.status === 'success', 'Telegram result should be success');
  console.log(`  ✓ publish-telegram: ${tgResult.url}`);

  // Test Telegram skip
  const tgSkip = await publishTelegram.publish(itemNoMatch, {});
  assert.strictEqual(tgSkip, null, 'Telegram should skip when platform not matched');
  console.log('  ✓ publish-telegram: correctly skipped when not in platforms');

  // Test LinkedIn
  const publishLinkedin = require('../publish-linkedin');
  const liResult = await publishLinkedin.publish(sampleItem, {});
  assert(liResult, 'LinkedIn should return result');
  assert(liResult.platform === 'linkedin', 'LinkedIn result should have correct platform');
  assert(liResult.status === 'success', 'LinkedIn result should be success');
  console.log(`  ✓ publish-linkedin: ${liResult.url}`);

  // Test LinkedIn skip
  const liSkip = await publishLinkedin.publish(itemNoMatch, {});
  assert.strictEqual(liSkip, null, 'LinkedIn should skip when platform not matched');
  console.log('  ✓ publish-linkedin: correctly skipped when not in platforms');

  console.log('\n✅ All publish tests passed!');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
