/**
 * source-directory-beast.js
 * Pull destinations from Directory Beast data files and output standardized DataSource items.
 */

const path = require('path');
const lib = require('./lib');

const DEFAULT_DIR = path.resolve(__dirname, '../../family-travel-directory/public/data');
const DEFAULT_MAX = 10;

/**
 * @param {object} opts
 * @param {string} [opts.directoryPath] - Path to Directory Beast data directory
 * @param {number} [opts.maxItems] - Max items to return
 * @returns {Array} DataSource items
 */
function source(opts = {}) {
  const dirPath = path.resolve(opts.directoryPath || DEFAULT_DIR);
  const maxItems = opts.maxItems || DEFAULT_MAX;

  // Try destinations.json first
  const mainFile = path.join(dirPath, 'destinations.json');
  let items = lib.readJSON(mainFile);

  // Fallback: scan batch-*.json files
  if (!items || !Array.isArray(items) || items.length === 0) {
    items = [];
    try {
      const files = require('fs').readdirSync(dirPath)
        .filter(f => f.startsWith('batch-') && f.endsWith('.json'))
        .sort();
      for (const file of files) {
        const batch = lib.readJSON(path.join(dirPath, file));
        if (Array.isArray(batch)) items.push(...batch);
        if (items.length >= maxItems * 3) break; // read enough
      }
    } catch (err) {
      console.error(`[source-directory-beast] Error scanning batches: ${err.message}`);
    }
  }

  if (!Array.isArray(items) || items.length === 0) {
    console.warn('[source-directory-beast] No data found!');
    return [];
  }

  // Sort by popularity descending, take top maxItems
  items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  const selected = items.slice(0, maxItems);

  // Map to DataSource interface
  return selected.map(item => ({
    id: item.id || lib.uuid(),
    title: item.name || item.title || 'Untitled',
    description: item.description || '',
    url: item.affiliateLinks?.booking?.url || '',
    tags: [
      ...(item.seoKeywords || []),
      item.category || '',
      item.city || '',
      item.country || '',
    ].filter(Boolean),
    type: 'destination',
    images: [
      ...(item.gallery || []).slice(0, 3),
      item.imageUrl || '',
    ].filter(Boolean),
    sourceProject: 'directory-beast',
    metadata: {
      city: item.city,
      country: item.country,
      category: item.category,
      ageRange: item.ageRange,
      safetyRating: item.safetyRating,
      priceRange: item.priceRange,
      popularity: item.popularity,
      bestTime: item.bestTime,
      tipsAndTricks: item.tipsAndTricks || [],
      parentStory: item.parentStory || null,
    },
  }));
}

module.exports = { source };
