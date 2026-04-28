/**
 * transform-story-thread.js
 * Convert a DataSource item into a 3-5 tweet thread.
 */

const lib = require('./lib');

const MAX_TWEET_LENGTH = 280;

/**
 * @param {object} source - DataSource item
 * @param {object} opts
 * @param {string} opts.dateStr - Date string for content hash
 * @returns {object} ContentItem
 */
function transform(source, opts = {}) {
  if (!source || !source.title) {
    throw new Error('[transform-story-thread] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, url, tags, metadata } = source;
  const tips = metadata?.tipsAndTricks || [];
  const parentStory = metadata?.parentStory || null;

  const thread = [];

  // Tweet 1: Hook
  const hook = `1/${getThreadCount(source)} ${title} — ${truncateTo(description, 150)}`;
  thread.push(hook.substring(0, MAX_TWEET_LENGTH));

  // Tweet 2: Details / what makes it special
  let details = `2/${getThreadCount(source)} `;
  if (metadata?.ageRange) details += `Great for ages ${metadata.ageRange}. `;
  if (metadata?.bestTime) details += `Best time: ${metadata.bestTime}. `;
  if (metadata?.priceRange) details += `Price: ${metadata.priceRange}. `;
  if (tips.length > 0) details += `Pro tip: ${tips[0]}`;
  thread.push(details.substring(0, MAX_TWEET_LENGTH));

  // Tweet 3: Practical tips
  let tipsTweet = `3/${getThreadCount(source)} ${tips.length > 0 ? tips.slice(0, 2).join(' ') : 'Perfect for a family day out.'}`;
  thread.push(tipsTweet.substring(0, MAX_TWEET_LENGTH));

  // Tweet 4: Parent story (optional)
  if (parentStory) {
    let storyTweet = `4/${getThreadCount(source)} "${truncateTo(parentStory.excerpt, 150)}" — ${parentStory.author}`;
    thread.push(storyTweet.substring(0, MAX_TWEET_LENGTH));
  }

  // Last tweet: CTA + URL
  const count = thread.length + 1;
  let cta = `${count}/${count} `;
  if (url) {
    cta += `Check it out → ${url}`;
  } else {
    cta += `Save this for your next trip! 🌍`;
  }
  if (tags.length > 0) cta += ` #${tags[0].replace(/\s+/g, '')}`;
  thread.push(cta.substring(0, MAX_TWEET_LENGTH));

  // Re-number all tweets
  const finalThread = thread.map((t, i) => {
    const n = i + 1;
    const total = thread.length;
    return t.replace(/^\d+\/\d+/, `${n}/${total}`);
  });

  const id = `st-${lib.contentHash(source.id, 'story-thread', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'story-thread',
    platforms: ['twitter'],
    content: finalThread.join('\n\n'),
    thread: finalThread,
    images: source.images.slice(0, 1),
    contentHash: lib.contentHash(source.id, 'story-thread', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

function getThreadCount(source) {
  const tips = source.metadata?.tipsAndTricks || [];
  const hasStory = !!source.metadata?.parentStory;
  return hasStory ? 5 : Math.min(tips.length + 2, 5);
}

function truncateTo(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.substring(0, max - 3) + '...';
}

module.exports = { transform };
