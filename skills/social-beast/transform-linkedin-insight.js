/**
 * transform-linkedin-insight.js
 * Convert a DataSource item into a professional 2-3 paragraph LinkedIn post.
 */

const lib = require('./lib');

/**
 * @param {object} source - DataSource item
 * @param {object} opts
 * @param {string} opts.dateStr - Date string for content hash
 * @returns {object} ContentItem
 */
function transform(source, opts = {}) {
  if (!source || !source.title) {
    throw new Error('[transform-linkedin-insight] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, url, tags, metadata } = source;
  const parentStory = metadata?.parentStory || null;
  const tips = metadata?.tipsAndTricks || [];

  const paragraphs = [];

  // Paragraph 1: Insight hook
  paragraphs.push(
    `I recently came across something worth sharing: ${title}. ` +
    `${truncateTo(description, 300)} ` +
    `Here's why it caught my attention.`
  );

  // Paragraph 2: Details / data
  let details = '';
  if (metadata?.ageRange) details += `Designed for ages ${metadata.ageRange}. `;
  if (metadata?.safetyRating) details += `Rated ${metadata.safetyRating}/5 for safety. `;
  if (metadata?.bestTime) details += `Optimal timing: ${metadata.bestTime}. `;
  if (tips.length > 0) details += `Key insight: ${tips[0]}`;
  if (details) {
    paragraphs.push(details);
  } else {
    paragraphs.push(`What makes ${title} stand out is the attention to detail. Whether you're a parent planning a trip or an operator looking for inspiration, there's something to learn here.`);
  }

  // Paragraph 3: Reflection / CTA
  let reflection;
  if (parentStory) {
    reflection = `One parent shared: "${truncateTo(parentStory.excerpt, 150)}". ` +
      `Stories like this remind us that the best experiences are the ones that create lasting memories.`;
  } else {
    reflection = `For anyone planning family time, ${title} is worth a closer look. ` +
      `The combination of practical features and genuine experience makes it a standout.`;
  }
  paragraphs.push(reflection);
  paragraphs.push('');

  // CTA + hashtags
  if (url) {
    paragraphs.push(`🔗 ${url}`);
  }
  const hashtags = tags.slice(0, 4).map(t => `#${t.replace(/\s+/g, '')}`).join(' ');
  paragraphs.push(hashtags);

  const content = paragraphs.join('\n\n');

  const id = `li-${lib.contentHash(source.id, 'linkedin-insight', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'linkedin-insight',
    platforms: ['linkedin'],
    content,
    thread: null,
    images: source.images.slice(0, 1),
    contentHash: lib.contentHash(source.id, 'linkedin-insight', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

function truncateTo(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.substring(0, max - 3) + '...';
}

module.exports = { transform };
