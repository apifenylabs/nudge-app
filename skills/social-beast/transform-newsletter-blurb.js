/**
 * transform-newsletter-blurb.js
 * Convert a DataSource item into a 100-word newsletter excerpt.
 */

const lib = require('./lib');

const MAX_WORDS = 120;

/**
 * @param {object} source - DataSource item
 * @param {object} opts
 * @param {string} opts.dateStr - Date string for content hash
 * @returns {object} ContentItem
 */
function transform(source, opts = {}) {
  if (!source || !source.title) {
    throw new Error('[transform-newsletter-blurb] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, url, tags, metadata } = source;

  // Build the blurb
  const intro = `${title} is a must-know for families. `;
  const body = truncateWords(description, 60);
  let cta = `Learn more → ${url || 'Check it out'}`;

  let blurb = `${intro}${body} ${cta}`;

  // If over word limit, trim body
  const words = blurb.split(/\s+/);
  if (words.length > MAX_WORDS) {
    const trimmedBody = truncateWords(description, 40);
    blurb = `${intro}${trimmedBody} ${cta}`;
  }

  // Ensure under word limit
  const finalWords = blurb.split(/\s+/);
  if (finalWords.length > MAX_WORDS) {
    const newBody = finalWords.slice(2, -5).join(' '); // remove intro and cta, add back
    const trimmedIntro = `${title} is `;
    blurb = trimmedIntro + truncateWords(newBody, MAX_WORDS - trimmedIntro.split(/\s+/).length - cta.split(/\s+/).length - 2) + ` ${cta}`;
  }

  // Add hastags at end (don't count toward word limit)
  if (tags.length > 0) {
    const hashtags = tags.slice(0, 2).map(t => `#${t.replace(/\s+/g, '')}`).join(' ');
    blurb += `\n\n${hashtags}`;
  }

  const id = `nb-${lib.contentHash(source.id, 'newsletter-blurb', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'newsletter-blurb',
    platforms: ['email'],
    content: blurb,
    thread: null,
    images: source.images.slice(0, 1),
    contentHash: lib.contentHash(source.id, 'newsletter-blurb', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

function truncateWords(text, maxWords) {
  if (!text) return '';
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

module.exports = { transform };
