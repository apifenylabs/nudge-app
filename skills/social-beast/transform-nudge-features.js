/**
 * transform-nudge-features.js
 * Convert Nudge DataSource items into "lifehack" style social posts.
 * 3 variants: productivity tip, feature highlight, user story.
 */

const lib = require('./lib');

/**
 * @param {object} source - DataSource item (type: feature/tip/insight)
 * @param {object} opts
 * @param {string} opts.dateStr - Date string for content hash
 * @param {string} [opts.variant] - 'tip', 'highlight', or 'story'. Default: auto-pick based on source.type
 * @returns {object} ContentItem
 */
function transform(source, opts = {}) {
  if (!source || !source.title) {
    throw new Error('[transform-nudge-features] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const variant = opts.variant || pickVariant(source.type);
  const { title, description, url, tags } = source;

  let content;
  let platforms;

  switch (variant) {
    case 'tip':
      content = buildTipPost(title, description, tags);
      platforms = ['twitter', 'telegram'];
      break;

    case 'highlight':
      content = buildFeatureHighlight(title, description, tags, url);
      platforms = ['twitter', 'telegram', 'linkedin'];
      break;

    case 'story':
      content = buildUserStory(title, description, tags);
      platforms = ['telegram', 'linkedin'];
      break;

    default:
      content = buildTipPost(title, description, tags);
      platforms = ['twitter', 'telegram'];
  }

  const id = `nf-${lib.contentHash(source.id, 'nudge-features', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'nudge-features',
    variant,
    platforms,
    content,
    thread: null,
    images: source.images || [],
    contentHash: lib.contentHash(source.id, 'nudge-features', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

/**
 * Variant 1: Productivity Tip (short, tweetable advice)
 */
function buildTipPost(title, description, tags) {
  const lines = [];

  // Hook
  lines.push(`💡 Parent Life Hack: ${title}`);
  lines.push('');
  lines.push(description);
  lines.push('');

  // Takeaway
  lines.push('→ Stop repeating yourself. Let automation do the nagging.');
  lines.push('');

  // Hashtags
  const relevantTags = tags.slice(0, 3).map(t => `#${t.replace(/[\s-]+/g, '').toLowerCase()}`);
  lines.push(relevantTags.join(' '));

  return lines.join('\n');
}

/**
 * Variant 2: Feature Highlight (focused on Nudge capability)
 */
function buildFeatureHighlight(title, description, tags, url) {
  const lines = [];

  // Headline
  lines.push(`🚀 ${title}`);
  lines.push('');
  lines.push(description);
  lines.push('');

  // Value proposition
  lines.push('Why it matters:');
  lines.push('• Natural language → zero learning curve');
  lines.push('• Multi-platform (Telegram, Voice, Web) → works everywhere');
  lines.push('• Smart enforcement → tasks actually get done');
  lines.push('');

  const relevantTags = tags.slice(0, 3).map(t => `#${t.replace(/[\s-]+/g, '').toLowerCase()}`);
  lines.push(relevantTags.join(' '));

  return lines.join('\n');
}

/**
 * Variant 3: User Story (relatable "day in the life" narrative)
 */
function buildUserStory(title, description, tags) {
  const lines = [];

  // Scene setter
  lines.push('📋 Saturday morning in the [Your Name] household:');
  lines.push('');
  lines.push('Me: "Jake, take out the trash. Sarah, soccer practice at 9. Kids, clean your rooms."');
  lines.push('');
  lines.push('30 minutes later: nothing has happened. Sound familiar?');
  lines.push('');
  lines.push('The fix? I told Nudge once:');
  lines.push('');
  const tipLine = `"${title.toLowerCase().includes('remind')
    ? 'Nudge, remind the kids about chores at 10am'
    : `Set up: ${title.replace(/^Stop |^The |^Why /, '').toLowerCase()}`}"`;
  lines.push(tipLine);
  lines.push('');
  lines.push('Nudge parsed it, assigned it, and sent reminders.');
  lines.push('By lunch, everything was done. No nagging. No stress.');
  lines.push('');
  lines.push(`The lesson? ${truncateTo(description, 200)}`);
  lines.push('');

  const relevantTags = tags.slice(0, 3).map(t => `#${t.replace(/[\s-]+/g, '').toLowerCase()}`);
  lines.push(relevantTags.join(' '));

  return lines.join('\n');
}

/**
 * Pick the best variant based on source type
 */
function pickVariant(type) {
  switch (type) {
    case 'tip':
      return 'tip';
    case 'feature':
      return 'highlight';
    case 'insight':
      return 'story';
    default:
      return 'tip';
  }
}

function truncateTo(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.substring(0, max - 3) + '...';
}

module.exports = { transform };
