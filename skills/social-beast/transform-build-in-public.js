/**
 * transform-build-in-public.js
 * Convert a milestone DataSource item into a behind-the-scenes narrative.
 */

const lib = require('./lib');

/**
 * @param {object} source - DataSource item (type: milestone)
 * @param {object} opts
 * @param {string} opts.dateStr - Date string for content hash
 * @returns {object} ContentItem
 */
function transform(source, opts = {}) {
  if (!source || !source.title) {
    throw new Error('[transform-build-in-public] Invalid source: title required');
  }
  if (source.type !== 'milestone') {
    console.warn('[transform-build-in-public] Source type is not milestone, transforming anyway');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, metadata } = source;
  const milestoneType = metadata?.milestoneType || 'lesson';

  const paragraphs = [];

  // Opening
  paragraphs.push(`Building in public — ${title}`);
  paragraphs.push('');

  // Story based on type
  switch (milestoneType) {
    case 'revenue':
      paragraphs.push(description);
      paragraphs.push('');
      paragraphs.push(`The numbers don't lie. Every dollar earned is validation that this model works. ` +
        `The key lesson? Ship fast, iterate faster, and don't wait for perfection.`);
      paragraphs.push('');
      paragraphs.push(`What's next: Scaling this approach across more products and doubling down on what works.`);
      break;

    case 'launch':
      paragraphs.push(description);
      paragraphs.push('');
      paragraphs.push(`Launch day is always chaotic. But here's the thing — you don't need a perfect launch. ` +
        `You need to launch, get feedback, and improve. The first version is never the final version.`);
      paragraphs.push('');
      paragraphs.push(`Biggest lesson learned: Talk to users before writing code. It saves weeks of rework.`);
      break;

    case 'lesson':
    default:
      paragraphs.push(description);
      paragraphs.push('');
      paragraphs.push(`The biggest lesson I keep learning? ` +
        `Automation is not about replacing humans — it's about freeing them to do what humans do best. ` +
        `Build systems. Ship value. Repeat.`);
      paragraphs.push('');
      paragraphs.push(`Current stack: OpenClaw skills → Paperclip orchestration → Telegram delivery. ` +
        `Zero external SaaS. Everything runs on my machine.`);
      break;
  }

  paragraphs.push('');
  paragraphs.push('#buildinpublic #indiehacker #automation');

  const content = paragraphs.join('\n');

  const id = `bip-${lib.contentHash(source.id, 'build-in-public', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'build-in-public',
    platforms: ['twitter', 'telegram'],
    content,
    thread: null,
    images: [],
    contentHash: lib.contentHash(source.id, 'build-in-public', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

module.exports = { transform };
