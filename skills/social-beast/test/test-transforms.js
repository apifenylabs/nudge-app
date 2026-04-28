/**
 * Tests for all transform skills.
 */

const assert = require('assert');
const transforms = {
  'short-hook': require('../transform-short-hook'),
  'story-thread': require('../transform-story-thread'),
  'telegram-deep-dive': require('../transform-telegram-deep-dive'),
  'linkedin-insight': require('../transform-linkedin-insight'),
  'carousel-card': require('../transform-carousel-card'),
  'tiktok-script': require('../transform-tiktok-script'),
  'build-in-public': require('../transform-build-in-public'),
  'newsletter-blurb': require('../transform-newsletter-blurb'),
};

// Create a sample source
const sampleSource = {
  id: 'tokyo-001',
  title: 'Tokyo Disneyland',
  description: 'The ultimate family destination with classic Disney magic. Two incredible parks with exceptional safety standards, stroller rentals, baby care centers, and numerous family-friendly restaurants.',
  url: 'https://example.com/tokyo-disneyland',
  tags: ['Tokyo Disneyland', 'family', 'travel'],
  type: 'destination',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  sourceProject: 'directory-beast',
  metadata: {
    city: 'Tokyo',
    country: 'Japan',
    category: 'Theme Parks & Attractions',
    ageRange: '3-12',
    safetyRating: 4.9,
    priceRange: '$$$',
    bestTime: 'Weekdays, September-November',
    tipsAndTricks: [
      'Go on a Tuesday or Wednesday — weekend crowds are 3x worse.',
      'Bring your own snacks. The park allows outside food.',
      'Use the Disney Resort app to book Priority Pass slots.',
    ],
    parentStory: {
      title: 'The meltdown that turned into our best memory',
      excerpt: 'Our 4-year-old screamed for 20 minutes. Then a cast member took us backstage.',
      author: 'Sarah, mom of 2 from Melbourne',
    },
  },
};

const dateStr = '2026-04-27';
let totalTests = 0;
let passedTests = 0;

for (const [name, mod] of Object.entries(transforms)) {
  totalTests++;
  try {
    const result = mod.transform(sampleSource, { dateStr });

    // Validate result structure
    assert(result.id, 'Should have id');
    assert(result.sourceId === 'tokyo-001', 'Should have sourceId');
    assert(result.sourceProject === 'directory-beast', 'Should have sourceProject');
    assert(result.format === name, `Should have correct format: ${name}`);
    assert(Array.isArray(result.platforms), 'Should have platforms array');
    assert(result.content, 'Should have content');
    assert(result.contentHash, 'Should have contentHash');
    assert(result.createdAt, 'Should have createdAt');
    assert(result.status === 'pending', 'Should be pending');

    // Format-specific checks
    if (name === 'short-hook') {
      assert(result.content.length <= 280, `Short hook should be ≤280 chars (got ${result.content.length})`);
      assert(result.platforms.includes('twitter'), 'Short hook should target twitter');
    }

    if (name === 'story-thread') {
      assert(Array.isArray(result.thread), 'Story thread should have thread array');
      assert(result.thread.length >= 3, `Story thread should have ≥3 tweets (got ${result.thread.length})`);
      assert(result.thread.length <= 5, `Story thread should have ≤5 tweets (got ${result.thread.length})`);
      assert(result.platforms.includes('twitter'), 'Story thread should target twitter');
    }

    if (name === 'telegram-deep-dive') {
      assert(result.content.length <= 4096, `Telegram deep dive should be ≤4096 chars (got ${result.content.length})`);
      assert(result.platforms.includes('telegram'), 'Telegram deep dive should target telegram');
    }

    if (name === 'linkedin-insight') {
      assert(result.platforms.includes('linkedin'), 'LinkedIn insight should target linkedin');
    }

    if (name === 'carousel-card') {
      assert(result.platforms.includes('instagram'), 'Carousel card should target instagram');
    }

    if (name === 'build-in-public') {
      assert(result.platforms.includes('twitter') || result.platforms.includes('telegram'), 'BIP should target twitter or telegram');
    }

    if (name === 'newsletter-blurb') {
      const wordCount = result.content.split(/\s+/).length;
      // hashtags at end don't count toward limit
      const contentWithoutHashtags = result.content.split('\n\n')[0];
      const wc = contentWithoutHashtags.split(/\s+/).length;
      assert(wc <= 120, `Newsletter blurb should be ≤120 words (got ~${wc})`);
      assert(result.platforms.includes('email'), 'Newsletter should target email');
    }

    passedTests++;
    console.log(`  ✓ ${name}: ${result.content.substring(0, 60)}...`);
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
  }
}

console.log(`\n✅ ${passedTests}/${totalTests} transform tests passed!`);
