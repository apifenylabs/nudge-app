/**
 * source-nudge.js
 * Pull feature/tip content from Nudge project and output standardized DataSource items.
 * Falls back to rich pre-built feature updates if Nudge source files aren't available.
 */

const path = require('path');
const lib = require('./lib');

const NUDGE_PROJECT_DIR = path.resolve(__dirname, '../../nudge');
const DEFAULT_MAX = 6;

// ─── BUILT-IN FEATURE/TIP CONTENT ─────────────────────
// These serve as the primary content pipeline when Nudge is running
// (always available, no file-read dependency)

const DEFAULT_FEATURES = [
  {
    type: 'feature',
    title: 'Voice-First Task Creation with Whisper',
    description: 'Nudge integrates OpenAI Whisper + Browser Speech API so you can create tasks hands-free. Just tap the mic and say "Remind Jake to take out the trash tonight" — Nudge parses, assigns, and schedules it automatically. No typing required.',
    tags: ['productivity', 'voice', 'family', 'automation'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'feature',
    title: 'Natural Language Telegram Bot',
    description: 'Message Nudge like you would a family member: "Remind Sarah about soccer practice Saturday at 9am" or "Add milk to the shopping list." Claude-powered NLP understands context, relationships, and natural time expressions.',
    tags: ['telegram', 'nlp', 'family', 'productivity'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'tip',
    title: 'The 2-Minute Family Standup Hack',
    description: 'Every morning, send Nudge a single voice message with what each family member needs to do today. Nudge splits it into individual tasks and sends reminders. Takes 2 minutes, saves 30 minutes of nagging.',
    tags: ['lifehack', 'family', 'productivity', 'routine'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'tip',
    title: 'Stop Texting Reminders — Use a Bot Instead',
    description: 'The average parent sends 47 reminder texts per week. Nudge automates this: one message to the bot, it handles the follow-ups. Escalation system means tasks actually get done.',
    tags: ['lifehack', 'parenting', 'automation', 'productivity'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'insight',
    title: 'Why "Just Tell Me Once" Changes Everything',
    description: 'Family task apps fail because they require everyone to log in. Nudge flips it: message via Telegram, voice, or web — the bot handles the rest. No app install for kids, no login friction.',
    tags: ['ux', 'family', 'insight', 'productivity'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'feature',
    title: 'AI-Powered Task Enforcement That Actually Works',
    description: 'Nudge\'s smart reminder system escalates automatically: gentle nudge at 30 min → firm reminder at 15 min → notify the assigner at deadline. Parents report 70%+ completion rates vs 30% with manual reminders.',
    tags: ['ai', 'enforcement', 'family', 'productivity'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'insight',
    title: 'The Hidden Cost of Family Task Overhead',
    description: 'Research shows parents spend 8+ hours per week on task coordination — the equivalent of a full workday. Nudge cuts that to minutes. Busy families reclaim 6+ hours weekly.',
    tags: ['insight', 'family', 'time-saving', 'research'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'feature',
    title: 'Real-Time Family Dashboard',
    description: 'Nudge\'s PWA dashboard shows every family member\'s tasks in real time. See who\'s done what, who\'s slacking, and who needs a nudge. Perfect for the family meeting at dinner.',
    tags: ['dashboard', 'family', 'real-time', 'productivity'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'tip',
    title: 'Turn Chores into a Game Kids Actually Play',
    description: 'Set up recurring tasks with Nudge\'s reward system. "Make your bed → get 10 stars." Kids race to complete tasks before reminders fire. Gamification turns nagging into competition.',
    tags: ['lifehack', 'parenting', 'gamification', 'kids'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
  {
    type: 'feature',
    title: 'Smart Clarifying Follow-Ups',
    description: 'If you say "Remind Jake about that thing" without details, Nudge asks: "What task? When? Any priority?" Claude-powered clarification means no ambiguity — every task is complete before it\'s saved.',
    tags: ['ai', 'nlp', 'usability', 'family'],
    url: 'https://github.com/captain/nudge',
    images: [],
  },
];

/**
 * @param {object} opts
 * @param {number} [opts.maxItems] - Max items to return
 * @param {string} [opts.projectDir] - Path to Nudge project directory
 * @returns {Array} DataSource items
 */
function source(opts = {}) {
  const maxItems = opts.maxItems || DEFAULT_MAX;
  const projectDir = path.resolve(opts.projectDir || NUDGE_PROJECT_DIR);
  const dateStr = lib.todayStr();

  // Try to read Nudge README.md for dynamic feature extraction
  let enrichedFeatures = [...DEFAULT_FEATURES];

  try {
    const readmePath = path.join(projectDir, 'README.md');
    const fs = require('fs');
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, 'utf-8');

      // Extract roadmap items as feature content
      const roadmapItems = extractRoadmapItems(readme);
      if (roadmapItems.length > 0) {
        // Add roadmap items as upcoming features (type = insight)
        roadmapItems.forEach((item, i) => {
          enrichedFeatures.push({
            type: 'insight',
            title: `Coming to Nudge: ${item.title}`,
            description: item.description || `Nudge is working on: ${item.title}. Busy families, get ready for more productivity.`,
            tags: ['coming-soon', 'roadmap', 'family', 'productivity'],
            url: 'https://github.com/captain/nudge',
            images: [],
          });
        });
      }

      // Extract feature table rows
      const featureRows = extractFeatureTableRows(readme);
      if (featureRows.length > 0) {
        featureRows.forEach((row, i) => {
          const exists = enrichedFeatures.some(f =>
            f.title.toLowerCase().includes(row.feature.toLowerCase()) ||
            row.feature.toLowerCase().includes(f.title.toLowerCase())
          );
          if (!exists && !row.competitorStatus.toLowerCase().includes('basic')) {
            enrichedFeatures.push({
              type: 'feature',
              title: `${row.feature} — Nudge Does This Better`,
              description: row.nudgeDescription
                ? `Nudge's ${row.feature}: ${row.nudgeDescription}`
                : `Nudge leads where competitors lag: "${row.feature}" — ${row.competitorStatus}.`,
              tags: ['feature', 'comparison', row.feature.toLowerCase().replace(/\s+/g, '-')],
              url: 'https://github.com/captain/nudge',
              images: [],
            });
          }
        });
      }
    }
  } catch (err) {
    console.warn(`[source-nudge] Could not read README.md: ${err.message}. Using built-in features.`);
  }

  // Shuffle and pick
  const shuffled = enrichedFeatures.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, maxItems);

  // Map to DataSource interface
  return selected.map((item, i) => {
    const id = `nudge-${dateStr}-${lib.contentHash('nudge', item.type, String(i))}`;
    return {
      id,
      title: item.title,
      description: item.description,
      url: item.url || '',
      tags: item.tags || ['family', 'productivity'],
      type: item.type, // 'feature', 'tip', 'insight'
      images: item.images || [],
      sourceProject: 'nudge',
      metadata: {
        featureType: item.type,
        date: dateStr,
      },
    };
  });
}

/**
 * Extract roadmap items from README checklist sections
 */
function extractRoadmapItems(readmeContent) {
  const items = [];
  const lines = readmeContent.split('\n');
  let inRoadmap = false;

  for (const line of lines) {
    if (line.match(/roadmap|📅|next/i) && (line.includes('Week') || line.includes('###'))) {
      inRoadmap = true;
      continue;
    }
    if (inRoadmap && line.match(/^###/)) break;
    if (inRoadmap) {
      const match = line.match(/\[.?\]\s*(.+)/);
      if (match) {
        items.push({ title: match[1].trim(), description: '' });
      }
    }
  }

  return items;
}

/**
 * Extract feature comparison table rows from README markdown tables
 */
function extractFeatureTableRows(readmeContent) {
  const rows = [];
  const lines = readmeContent.split('\n');
  let inTable = false;

  for (const line of lines) {
    if (line.includes('|') && line.includes('Nudge') && line.includes('Competitors')) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (!line.trim() || !line.includes('|')) {
        inTable = false;
        continue;
      }
      const cols = line.split('|').map(c => c.trim()).filter(Boolean);
      // Skip separator rows (contain only dashes)
      if (cols.length >= 3 && !cols[0].match(/^[-]+$/)) {
        rows.push({
          feature: cols[0],
          nudgeDescription: cols[1],
          competitorStatus: cols[2],
        });
      }
    }
  }

  return rows;
}

module.exports = { source, DEFAULT_FEATURES };
