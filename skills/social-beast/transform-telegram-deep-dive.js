/**
 * transform-telegram-deep-dive.js
 * Convert a DataSource item into rich text deep dive for Telegram channel.
 */

const lib = require('./lib');

const MAX_MSG_LENGTH = 4096;

/**
 * @param {object} source - DataSource item
 * @param {object} opts
 * @param {string} opts.dateStr - Date string for content hash
 * @returns {object} ContentItem
 */
function transform(source, opts = {}) {
  if (!source || !source.title) {
    throw new Error('[transform-telegram-deep-dive] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, url, tags, metadata } = source;
  const tips = metadata?.tipsAndTricks || [];
  const parentStory = metadata?.parentStory || null;

  const lines = [];
  lines.push(`🌍 *${title}*`);
  lines.push('');

  // Description
  lines.push(description);
  lines.push('');

  // Key details
  lines.push('*📋 Quick Facts:*');
  if (metadata?.ageRange) lines.push(`• 👶 Age range: ${metadata.ageRange}`);
  if (metadata?.bestTime) lines.push(`• 🕐 Best time: ${metadata.bestTime}`);
  if (metadata?.priceRange) lines.push(`• 💰 Price: ${metadata.priceRange}`);
  if (metadata?.safetyRating) lines.push(`• ⭐ Safety rating: ${metadata.safetyRating}/5`);
  if (metadata?.category) lines.push(`• 🏷️ Category: ${metadata.category}`);
  lines.push('');

  // Tips
  if (tips.length > 0) {
    lines.push('*💡 Tips & Tricks:*');
    tips.slice(0, 4).forEach(t => lines.push(`• ${t}`));
    lines.push('');
  }

  // Parent story
  if (parentStory) {
    lines.push(`*📖 ${parentStory.title}*`);
    lines.push(`> ${parentStory.excerpt}`);
    lines.push(`— ${parentStory.author}`);
    lines.push('');
  }

  // CTA
  lines.push('— — — — — — — — — —');
  if (url) {
    lines.push(`🔗 [Book / Learn More](${url})`);
  }
  if (tags.length > 0) {
    const hashtags = tags.slice(0, 3).map(t => `#${t.replace(/\s+/g, '')}`).join(' ');
    lines.push(hashtags);
  }

  let content = lines.join('\n');
  if (content.length > MAX_MSG_LENGTH) {
    content = content.substring(0, MAX_MSG_LENGTH - 50) + '\n\n... *(truncated)*';
  }

  const id = `tdd-${lib.contentHash(source.id, 'telegram-deep-dive', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'telegram-deep-dive',
    platforms: ['telegram'],
    content,
    thread: null,
    images: source.images.slice(0, 3),
    contentHash: lib.contentHash(source.id, 'telegram-deep-dive', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

module.exports = { transform };
