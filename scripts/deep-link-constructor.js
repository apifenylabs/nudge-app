#!/usr/bin/env node
/**
 * Deep Link Constructor — Phase 2: Deep Link Engine
 * ------------------------------------------------
 * Builds pre-formatted Klook/Viator search URLs with placeholder affiliate IDs.
 * This is the fallback when no specific product_id exists in revenue_engine.
 *
 * Also provides CSV population helpers so that when a product CSV is uploaded,
 * revenue_engine fields get populated automatically.
 *
 * Usage:
 *   node scripts/deep-link-constructor.js                    # Show usage
 *   node scripts/deep-link-constructor.js --populate-csv <path>  # Populate from CSV
 */

const fs = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────
const PLACEHOLDER_AFFILIATE_ID = 'PLACEHOLDER_AFFILIATE_ID'; // Replace with real ID when available
const DATA_FILE = path.join(__dirname, '..', 'public', 'data', 'destinations.json');
const BACKUP_EXT = '.deep-link-backup.json';

// ─── URL Builders ────────────────────────────────────────────────

/**
 * Build a Klook search URL for a given destination.
 * Falls back to search when no specific product_id exists.
 */
function klookSearchUrl(name, city, productId = null) {
  const query = encodeURIComponent(`${name} ${city}`);
  if (productId) {
    return `https://www.klook.com/activity/${productId}/?aid=${PLACEHOLDER_AFFILIATE_ID}`;
  }
  // Search-link fallback
  return `https://www.klook.com/search/?keyword=${query}&aid=${PLACEHOLDER_AFFILIATE_ID}`;
}

/**
 * Build a Viator search URL for a given destination.
 * Falls back to search when no specific product_id exists.
 */
function viatorSearchUrl(name, city, productId = null) {
  const query = encodeURIComponent(`${name} ${city}`);
  if (productId) {
    return `https://www.viator.com/tours/${productId}?pid=${PLACEHOLDER_AFFILIATE_ID}`;
  }
  // Search-link fallback
  return `https://www.viator.com/searchResults/all?text=${query}&pid=${PLACEHOLDER_AFFILIATE_ID}`;
}

/**
 * Build a side-by-side price comparison object for a destination.
 */
function buildDeepLinks(destination) {
  const { name, city, revenue_engine } = destination;

  return {
    klook: {
      productId: revenue_engine?.klook_product_id || null,
      price: revenue_engine?.current_price_usd || null,
      lastCheck: revenue_engine?.last_price_check || null,
      url: klookSearchUrl(name, city, revenue_engine?.klook_product_id),
      label: revenue_engine?.klook_product_id
        ? `Book on Klook — $${revenue_engine?.current_price_usd || '?'}`
        : `Check prices on Klook`,
    },
    viator: {
      productId: revenue_engine?.viator_product_id || null,
      price: revenue_engine?.current_price_usd || null,
      lastCheck: revenue_engine?.last_price_check || null,
      url: viatorSearchUrl(name, city, revenue_engine?.viator_product_id),
      label: revenue_engine?.viator_product_id
        ? `Book on Viator — $${revenue_engine?.current_price_usd || '?'}`
        : `Check prices on Viator`,
    },
    bestPrice: revenue_engine?.current_price_usd
      ? `From $${revenue_engine?.current_price_usd}`
      : 'Check best price',
    hasIds: !!(revenue_engine?.klook_product_id || revenue_engine?.viator_product_id),
  };
}

// ─── CSV Population ──────────────────────────────────────────────

/**
 * CSV format expected:
 *   id,name,city,klook_product_id,viator_product_id,current_price_usd
 *
 * Ran when a user drops a CSV of matched product IDs.
 * Mutates revenue_engine fields in-place, additive only.
 */
function populateFromCsv(csvPath) {
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV not found: ${csvPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Destinations file not found: ${DATA_FILE}`);
    process.exit(1);
  }

  // Backup
  const backupPath = DATA_FILE.replace('.json', BACKUP_EXT);
  fs.copyFileSync(DATA_FILE, backupPath);
  console.log(`Backup saved: ${backupPath}`);

  // Load data
  const destinations = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const destMap = new Map(destinations.map(d => [d.id, d]));

  // Read CSV
  const csv = fs.readFileSync(csvPath, 'utf-8').trim().split('\n');
  const headers = csv[0].split(',').map(h => h.trim());

  // Validate headers
  const requiredHeaders = ['id'];
  const optionalHeaders = ['klook_product_id', 'viator_product_id', 'current_price_usd'];
  for (const rh of requiredHeaders) {
    if (!headers.includes(rh)) {
      console.error(`CSV missing required header: '${rh}'`);
      console.error(`Headers found: ${headers.join(', ')}`);
      process.exit(1);
    }
  }

  const idIdx = headers.indexOf('id');
  const klookIdx = headers.indexOf('klook_product_id');
  const viatorIdx = headers.indexOf('viator_product_id');
  const priceIdx = headers.indexOf('current_price_usd');

  let updated = 0;
  let notFound = 0;
  let skipped = 0;

  for (let i = 1; i < csv.length; i++) {
    const cols = csv[i].split(',').map(c => c.trim());
    const destId = cols[idIdx];
    if (!destId) { skipped++; continue; }

    const dest = destMap.get(destId);
    if (!dest) { notFound++; continue; }

    // Ensure revenue_engine exists
    if (!dest.revenue_engine) {
      dest.revenue_engine = { klook_product_id: null, viator_product_id: null, current_price_usd: 0, last_price_check: null };
    }

    // Populate fields from CSV (additive — never overwrite with empty)
    if (klookIdx >= 0 && cols[klookIdx] && cols[klookIdx].length > 0) {
      dest.revenue_engine.klook_product_id = cols[klookIdx];
    }
    if (viatorIdx >= 0 && cols[viatorIdx] && cols[viatorIdx].length > 0) {
      dest.revenue_engine.viator_product_id = cols[viatorIdx];
    }
    if (priceIdx >= 0 && cols[priceIdx] && cols[priceIdx].length > 0) {
      const price = parseFloat(cols[priceIdx]);
      if (!isNaN(price) && price > 0) {
        dest.revenue_engine.current_price_usd = price;
      }
    }

    // Always update last_price_check when any field changed
    if ((klookIdx >= 0 && cols[klookIdx]) || (viatorIdx >= 0 && cols[viatorIdx]) || (priceIdx >= 0 && cols[priceIdx])) {
      dest.revenue_engine.last_price_check = new Date().toISOString();
    }

    updated++;
  }

  // Write
  fs.writeFileSync(DATA_FILE, JSON.stringify(destinations, null, 2));

  console.log(`\n=== CSV Population Complete ===`);
  console.log(`Total destinations in file: ${destinations.length}`);
  console.log(`Updated from CSV: ${updated}`);
  console.log(`Not found in data: ${notFound}`);
  console.log(`Skipped (empty id): ${skipped}`);
  console.log(`Backup at: ${backupPath}`);
  console.log(`Data file written: ${DATA_FILE}`);
  return { updated, notFound, skipped };
}

/**
 * Update a single destination's revenue_engine with manual values.
 * Additive only — preserves existing fields.
 */
function updateOne(id, updates) {
  const destinations = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const dest = destinations.find(d => d.id === id);
  if (!dest) {
    console.error(`Destination not found: ${id}`);
    return null;
  }

  if (!dest.revenue_engine) {
    dest.revenue_engine = { klook_product_id: null, viator_product_id: null, current_price_usd: 0, last_price_check: null };
  }

  if (updates.klook_product_id) dest.revenue_engine.klook_product_id = updates.klook_product_id;
  if (updates.viator_product_id) dest.revenue_engine.viator_product_id = updates.viator_product_id;
  if (updates.current_price_usd !== undefined && !isNaN(updates.current_price_usd) && updates.current_price_usd > 0) {
    dest.revenue_engine.current_price_usd = updates.current_price_usd;
  }
  if (updates.klook_product_id || updates.viator_product_id || updates.current_price_usd) {
    dest.revenue_engine.last_price_check = new Date().toISOString();
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(destinations, null, 2));
  console.log(`Updated revenue_engine for ${id}`);
  return dest.revenue_engine;
}

/**
 * Show a report of how many destinations have product IDs vs need search fallback.
 */
function report() {
  const destinations = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  let hasKlook = 0, hasViator = 0, hasBoth = 0, hasAny = 0, hasNone = 0;
  let totalWithPrice = 0, totalPriceSum = 0;

  for (const d of destinations) {
    const re = d.revenue_engine || {};
    const k = !!re.klook_product_id;
    const v = !!re.viator_product_id;
    if (k && v) hasBoth++;
    if (k) hasKlook++;
    if (v) hasViator++;
    if (k || v) hasAny++;
    else hasNone++;
    if (re.current_price_usd && re.current_price_usd > 0) {
      totalWithPrice++;
      totalPriceSum += re.current_price_usd;
    }
  }

  console.log(`\n=== Deep Link Engine Report ===`);
  console.log(`Total destinations: ${destinations.length}`);
  console.log(`Has Klook ID: ${hasKlook}`);
  console.log(`Has Viator ID: ${hasViator}`);
  console.log(`Has both: ${hasBoth}`);
  console.log(`Has any product ID: ${hasAny}`);
  console.log(`Fallback to search: ${hasNone}`);
  console.log(`Has price data: ${totalWithPrice}`);
  if (totalWithPrice > 0) {
    console.log(`  Average price: $${(totalPriceSum / totalWithPrice).toFixed(2)}`);
  }
}

// ─── CLI ─────────────────────────────────────────────────────────

function showUsage() {
  console.log(`
Deep Link Constructor — Phase 2: Deep Link Engine

Usage:
  node scripts/deep-link-constructor.js                        # Show this help
  node scripts/deep-link-constructor.js --report               # Show deep link coverage report
  node scripts/deep-link-constructor.js --populate-csv <path>  # Populate from CSV
  node scripts/deep-link-constructor.js --update-one <id>     # Update a single destination
    [--klook-id K12345] [--viator-id V67890] [--price 45.00]

Examples:
  node scripts/deep-link-constructor.js --report
  node scripts/deep-link-constructor.js --populate-csv ./product-matches.csv
  node scripts/deep-link-constructor.js \\
    --update-one tokyo-001 \\
    --klook-id K12345 \\
    --viator-id V67890 \\
    --price 55.00

CSV Format (for --populate-csv):
  id,klook_product_id,viator_product_id,current_price_usd
  tokyo-001,K12345,V67890,55.00
  bangkok-001,,V67891,42.50
  singapore-001,K12347,,61.00

Notes:
  - Use PLACEHOLDER_AFFILIATE_ID as affiliate ID (replace when registered)
  - Klook search URL: https://www.klook.com/search/?keyword={query}&aid={aid}
  - Viator search URL: https://www.viator.com/searchResults/all?text={query}&pid={pid}
  - All population is additive — existing fields are never cleared.
`);
}

// ─── Main ────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showUsage();
} else if (args.includes('--report')) {
  report();
} else if (args.includes('--populate-csv')) {
  const idx = args.indexOf('--populate-csv') + 1;
  if (idx >= args.length) { console.error('Missing CSV path'); showUsage(); process.exit(1); }
  populateFromCsv(args[idx]);
} else if (args.includes('--update-one')) {
  const idx = args.indexOf('--update-one') + 1;
  if (idx >= args.length) { console.error('Missing destination ID'); showUsage(); process.exit(1); }
  const id = args[idx];
  const updates = {};
  const klookIdx = args.indexOf('--klook-id');
  const viatorIdx = args.indexOf('--viator-id');
  const priceIdx = args.indexOf('--price');
  if (klookIdx >= 0 && klookIdx + 1 < args.length) updates.klook_product_id = args[klookIdx + 1];
  if (viatorIdx >= 0 && viatorIdx + 1 < args.length) updates.viator_product_id = args[viatorIdx + 1];
  if (priceIdx >= 0 && priceIdx + 1 < args.length) updates.current_price_usd = parseFloat(args[priceIdx + 1]);
  updateOne(id, updates);
} else {
  console.error('Unknown command');
  showUsage();
}
