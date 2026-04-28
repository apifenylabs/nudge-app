/**
 * transform-short-hook.js
 * Convert a DataSource item into a 1-2 sentence tweet with link (Twitter/X Short Hook).
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
    throw new Error('[transform-short-hook] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, url, tags, type } = source;

  // Build hook based on type
  let hook;
  switch (type) {
    case 'milestone':
      hook = `Just shipped: ${title}. ${truncateTo(description, 100)}`;
      break;
    case 'feature':
      hook = `🚀 ${title} — ${truncateTo(description, 100)}`;
      break;
    case 'destination':
    default:
      hook = `${title} is the ultimate ${(tags[1] || 'family destination').toLowerCase()}. ${truncateTo(description, 100)}`;
      break;
  }

  // Build full tweet: hook + url + hashtag
  let tweet = hook;
  if (url && !tweet.includes(url)) {
    // Reserve space for URL (23 chars for t.co shortened)
    const urlSpace = 24;
    const maxHookLen = MAX_TWEET_LENGTH - urlSpace - (tags[0] ? tags[0].length + 2 : 10);
    tweet = truncateTo(hook, maxHookLen);
    tweet += `\n${url}`;
  }

  // Add 1 hashtag if space allows
  const hashtag = tags.length > 0 ? `#${tags[0].replace(/\s+/g, '')}` : '#familytravel';
  if (tweet.length + hashtag.length + 1 <= MAX_TWEET_LENGTH) {
    tweet += ` ${hashtag}`;
  }

  // If still over 280, truncate hook more aggressively
  if (tweet.length > MAX_TWEET_LENGTH) {
    tweet = truncateTo(tweet, MAX_TWEET_LENGTH);
  }

  const id = `sh-${lib.contentHash(source.id, 'short-hook', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'short-hook',
    platforms: ['twitter'],
    content: tweet,
    thread: null,
    images: source.images.slice(0, 1),
    contentHash: lib.contentHash(source.id, 'short-hook', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

function truncateTo(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.substring(0, max - 3) + '...';
}

module.exports = { transform };
