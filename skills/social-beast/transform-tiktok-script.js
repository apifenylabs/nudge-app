/**
 * transform-tiktok-script.js
 * Convert a DataSource item into a 30-60 second TikTok script outline.
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
    throw new Error('[transform-tiktok-script] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, url, tags, metadata } = source;
  const tips = metadata?.tipsAndTricks || [];
  const parentStory = metadata?.parentStory || null;

  const lines = [];
  lines.push(`🎬 TIKTOK SCRIPT: ${title}`);
  lines.push(`⏱️ Duration: 45 seconds`);
  lines.push('');

  // Hook (0-3s)
  lines.push('━━━ HOOK (0-3s) ━━━');
  const hookTip = tips[0] || 'This is a game-changer';
  lines.push(`[VISUAL: Title card or establishing shot]`);
  lines.push(`AUDIO: Upbeat background music`);
  lines.push(`TEXT ON SCREEN: "${truncateTo(hookTip, 80)}"`);
  lines.push(`SPOKEN: "Stop! Before you go to ${title}, here's what nobody tells you..."`);
  lines.push('');

  // Setup (3-15s)
  lines.push('━━━ SETUP (3-15s) ━━━');
  lines.push(`[VISUAL: B-roll of ${title}]`);
  lines.push(`SPOKEN: "${truncateTo(description, 200)}"`);
  lines.push(`TEXT ON SCREEN: ${metadata?.city || ''}, ${metadata?.country || ''}`);
  lines.push('');

  // Content (15-45s)
  lines.push('━━━ CONTENT (15-45s) ━━━');
  const tipsToShow = tips.slice(0, 3);
  if (tipsToShow.length > 0) {
    tipsToShow.forEach((tip, i) => {
      lines.push(`[VISUAL: Quick cut to relevant footage #${i + 1}]`);
      lines.push(`SPOKEN: "${tip}"`);
    });
  } else {
    lines.push(`[VISUAL: Slow-motion highlight reel]`);
    lines.push(`SPOKEN: "${parentStory ? truncateTo(parentStory.excerpt, 200) : 'The perfect family destination.'}"`);
  }
  lines.push('');

  // CTA (45-60s)
  lines.push('━━━ CTA (45-60s) ━━━');
  lines.push(`[VISUAL: You talking to camera or destination wide shot]`);
  lines.push(`SPOKEN: "Follow for more family travel tips! Link in bio."`);
  if (tags.length > 0) {
    lines.push(`CAPTION HASHTAGS: ${tags.slice(0, 3).map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`);
  }

  const content = lines.join('\n');

  const id = `tt-${lib.contentHash(source.id, 'tiktok-script', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'tiktok-script',
    platforms: ['tiktok'],
    content,
    thread: null,
    images: source.images.slice(0, 1),
    contentHash: lib.contentHash(source.id, 'tiktok-script', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

function truncateTo(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.substring(0, max - 3) + '...';
}

module.exports = { transform };
