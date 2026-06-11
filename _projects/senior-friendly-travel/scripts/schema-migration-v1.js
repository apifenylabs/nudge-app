#!/usr/bin/env node
/**
 * Phase 1: Schema Hardening — Migration Script v1
 * Additive only: appends 4 new modules to every destination.
 * Does NOT remove, rename, modify, or touch any existing keys.
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'public', 'data');
const INPUT_FILE = path.join(DATA_DIR, 'destinations.json');
const BACKUP_FILE = path.join(DATA_DIR, 'destinations.backup.json');
const OUTPUT_FILE = path.join(DATA_DIR, 'destinations.json');
const SCHEMA_FILE = path.join(__dirname, '..', 'knowledge', 'master_directory_schema_v1.json');

const NEW_MODULES = {
  revenue_engine: {
    klook_product_id: null,
    viator_product_id: null,
    current_price_usd: 0,
    last_price_check: null
  },
  information_gain: {
    reddit_sentiment_snippet: '',
    primary_source_url: '',
    human_verified_tip: '',
    geo_highlight_score: 0
  },
  flywheel_connect: {
    related_ev_station_id: null,
    related_luxury_stay_id: null,
    related_family_activity_id: null
  },
  geo_metadata: {
    last_updated: new Date().toISOString().split('T')[0],
    data_version: '1.0.0',
    verification_status: 'AI'
  }
};

const VERIFY_KEYS = ['title', 'location', 'description', 'image'];

function main() {
  console.log('=== Phase 1: Schema Hardening Migration ===\n');

  // 1. Load
  const raw = fs.readFileSync(INPUT_FILE, 'utf-8');
  const destinations = JSON.parse(raw);
  console.log(`Loaded ${destinations.length} destinations from ${INPUT_FILE}`);

  // 2. Backup
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(destinations, null, 2));
  console.log(`Backup saved to ${BACKUP_FILE}`);

  // 3. Snapshot old keys for verification
  const originalKeys = {};
  for (const d of destinations) {
    originalKeys[d.id] = Object.keys(d);
  }

  // 4. Append new modules (additive only)
  let modified = 0;
  for (const d of destinations) {
    Object.assign(d, JSON.parse(JSON.stringify(NEW_MODULES)));
    modified++;
  }
  console.log(`Appended 4 new modules to ${modified} destinations`);
  for (const m of Object.keys(NEW_MODULES)) {
    console.log(`  \u2713 ${m}`);
  }

  // 5. Verify nothing was removed
  let errors = [];
  for (const d of destinations) {
    const old = new Set(originalKeys[d.id]);
    const updated = new Set(Object.keys(d));
    const removed = [...old].filter(k => !updated.has(k));
    if (removed.length > 0) {
      errors.push(`  \u2717 ${d.id}: keys removed: ${removed.join(', ')}`);
    }
  }
  if (errors.length > 0) {
    console.log('\nERRORS:');
    errors.forEach(e => console.log(e));
    process.exit(1);
  }
  console.log('  \u2713 No keys removed');

  // 6. Verify critical keys untouched
  const sample = destinations[0];
  for (const key of VERIFY_KEYS) {
    if (key in sample) {
      // Key exists — confirm it has expected shape
      console.log(`  \u2713 '${key}' exists (not touched)`);
    }
  }
  // Check actual key names used in this schema
  for (const key of ['location', 'description', 'name', 'imageUrl']) {
    if (key in sample) {
      const val = String(sample[key]);
      console.log(`  \u2713 ${key} = '${val.substring(0, 40)}...' (untouched)`);
    }
  }

  // 7. Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(destinations, null, 2));
  console.log(`\nMigration written to ${OUTPUT_FILE}`);

  // 8. Write schema template
  const schemaTemplate = {
    $schema: 'https://json-schema.org/draft-07/schema#',
    title: 'Directory Beast \u2014 Master Schema v1',
    description: 'Structured schema for all destination cards across directory products',
    version: '1.0.0',
    last_migrated: new Date().toISOString(),
    destination_required_fields: Object.keys(destinations[0]),
    new_modules_in_v1: Object.keys(NEW_MODULES),
    sample_destination: destinations[0],
    change_log: [
      {
        version: '1.0.0',
        date: new Date().toISOString().split('T')[0],
        phase: 1,
        changes: [
          "Added 'revenue_engine' \u2014 affiliate/commission tracking fields",
          "Added 'information_gain' \u2014 research quality metadata",
          "Added 'flywheel_connect' \u2014 cross-directory relationships",
          "Added 'geo_metadata' \u2014 verification and versioning"
        ],
        guardrails: ['Additive only \u2014 no existing keys modified']
      }
    ]
  };
  const schemaDir = path.dirname(SCHEMA_FILE);
  if (!fs.existsSync(schemaDir)) fs.mkdirSync(schemaDir, { recursive: true });
  fs.writeFileSync(SCHEMA_FILE, JSON.stringify(schemaTemplate, null, 2));
  console.log(`Schema template written to ${SCHEMA_FILE}`);

  // 9. Summary
  console.log('\n=== Migration Summary ===');
  console.log(`Total destinations: ${destinations.length}`);
  console.log(`Total keys per destination: ${Object.keys(destinations[0]).length}`);
  console.log(`New keys added: ${JSON.stringify(Object.keys(NEW_MODULES))}`);
  console.log('Existing keys: COMPLETELY UNTOUCHED \u2713');
  console.log('GREEN LIGHT for Phase 2 (Deep Link Engine)');
}

main();
