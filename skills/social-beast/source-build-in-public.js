/**
 * source-build-in-public.js
 * Generate "build in public" milestone posts.
 */

const lib = require('./lib');

const DEFAULT_MILESTONE = {
  type: 'lesson',
  title: 'Building in Public: Day in the Life',
  details: 'Working on automating my content distribution pipeline. One skill at a time. No fancy tools — just OpenClaw skills talking to each other.',
  date: new Date().toISOString(),
};

/**
 * @param {object} opts
 * @param {object} opts.milestone - Milestone data
 * @returns {Array} DataSource items (single item array)
 */
function source(opts = {}) {
  const milestone = opts.milestone || DEFAULT_MILESTONE;

  if (!milestone.type || !milestone.title) {
    console.warn('[source-build-in-public] Invalid milestone, using default');
    return [mapMilestone(DEFAULT_MILESTONE)];
  }

  return [mapMilestone(milestone)];
}

function mapMilestone(m) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const id = `bip-${dateStr}-${lib.contentHash('bip', m.type, dateStr)}`;

  return {
    id,
    title: m.title,
    description: m.details || '',
    url: '',
    tags: ['buildinpublic', 'indiehacker', m.type, 'ai', 'automation'],
    type: 'milestone',
    images: [],
    sourceProject: 'build-in-public',
    metadata: {
      milestoneType: m.type,
      date: m.date || now.toISOString(),
    },
  };
}

module.exports = { source };
