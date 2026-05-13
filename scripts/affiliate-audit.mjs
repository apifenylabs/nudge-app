#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 * Affiliate Link Auditor — scans all 6 sites for placeholder IDs
 * ═══════════════════════════════════════════════════════════════
 * Usage: node scripts/affiliate-audit.mjs [--verbose]
 *
 * Reports:
 * 1. Placeholder IDs still needing replacement
 * 2. Affiliate config files found per site
 * 3. Pages / components using affiliate links
 * 4. Readiness score for each site (0-100)
 * ═══════════════════════════════════════════════════════════════
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const WORKSPACE = join(__dirname, '..');
const VERBOSE = process.argv.includes('--verbose');

// Patterns that indicate placeholder affiliate IDs
const PLACEHOLDER_PATTERNS = [
  /YOUR_[A-Z_]+/g,
  /aid=119991/g,
  /pid=P00299136/g,
  /partner_id=[A-Z_]/,
  /tag=[A-Z_]/,
];

// Travel partner IDs that look real (non-placeholder)
const REAL_ID_PATTERNS = [
  /aid=\d{6,10}(?!\s*[A-Z_])/,
  /pid=[A-Z0-9]{6,}/,
  /partner_id=[a-z0-9]{6,}/,
  /tag=[a-z0-9_-]{6,}/,
];

const SITES = [
  { name: 'apifeny-ai', path: 'apifeny-ai' },
  { name: 'ev-charging-asia', path: 'ev-charging-asia' },
  { name: 'family-travel-directory', path: 'family-travel-directory' },
  { name: 'luxury-family-travel', path: 'luxury-family-travel' },
  { name: 'kids-activities-asia', path: 'kids-activities-asia' },
  { name: 'social-beast', path: 'social-beast' },
];

function findFiles(dir, pattern) {
  const results = [];
  function walk(d) {
    let entries;
    try {
      entries = readdirSync(d);
    } catch { return; }
    for (const entry of entries) {
      const full = join(d, entry);
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      try {
        if (statSync(full).isDirectory()) {
          walk(full);
        } else if (pattern.test(full)) {
          results.push(full);
        }
      } catch {}
    }
  }
  walk(dir);
  return results;
}

function auditSite(site) {
  const sitePath = join(WORKSPACE, site.path);
  if (!existsSync(sitePath)) {
    return { name: site.name, exists: false, errors: [`Directory not found: ${site.path}`] };
  }

  const result = {
    name: site.name,
    exists: true,
    affiliateConfigFiles: [],
    blogDataFiles: [],
    placeholderCount: 0,
    realIdCount: 0,
    placeholderFiles: [],
    issues: [],
    readinessScore: 0,
  };

  // Find affiliate config files
  const affFiles = findFiles(sitePath, /affiliate/);
  result.affiliateConfigFiles = affFiles.map(f => relative(WORKSPACE, f));
  result.affiliateConfigFiles = result.affiliateConfigFiles.filter(f => !f.includes('node_modules'));

  // Find blog data files
  const blogFiles = findFiles(sitePath, /generated-blog-data/);
  result.blogDataFiles = blogFiles.map(f => relative(WORKSPACE, f));

  // Check all .ts, .tsx, .js files for placeholder IDs
  const sourceFiles = findFiles(sitePath, /\.(ts|tsx|js|jsx)$/);
  for (const file of sourceFiles) {
    if (file.includes('node_modules')) continue;
    try {
      const content = readFileSync(file, 'utf-8');
      const relPath = relative(WORKSPACE, file);

      // Count placeholders
      let hasPlaceholder = false;
      for (const pattern of PLACEHOLDER_PATTERNS) {
        const matches = content.match(pattern);
        if (matches) {
          result.placeholderCount += matches.length;
          if (!hasPlaceholder) {
            result.placeholderFiles.push({ file: relPath, patterns: [] });
            hasPlaceholder = true;
          }
          result.placeholderFiles[result.placeholderFiles.length - 1].patterns.push(pattern.toString());
        }
      }

      // Count real IDs
      for (const pattern of REAL_ID_PATTERNS) {
        const matches = content.match(pattern);
        if (matches) {
          result.realIdCount += matches.length;
        }
      }
    } catch {}
  }

  // Calculate readiness score
  let score = 0;
  if (result.affiliateConfigFiles.length > 0) score += 30;
  if (result.blogDataFiles.length > 0 && result.realIdCount > 0) score += 20;
  if (result.placeholderCount === 0) score += 25;
  if (result.realIdCount > 0) score += 15;
  if (result.placeholderCount === 0 && result.realIdCount > 0) score += 10;

  // Deduct for remaining placeholders
  if (result.placeholderCount > 0) score -= Math.min(result.placeholderCount * 5, 25);

  result.readinessScore = Math.max(0, Math.min(100, score));

  if (result.placeholderCount > 0) {
    result.issues.push(`${result.placeholderCount} placeholder(s) in ${result.placeholderFiles.length} file(s)`);
  }
  if (result.affiliateConfigFiles.length === 0) {
    result.issues.push('No affiliate config file found');
  }

  return result;
}

// ─── Main ──────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════════════');
console.log('  Affiliate Link Audit — All 6 Sites');
console.log('═══════════════════════════════════════════════════\n');

let totalPlaceholders = 0;
let totalReal = 0;
let totalScore = 0;
let sitesReady = 0;

for (const site of SITES) {
  const result = auditSite(site);
  if (!result.exists) {
    console.log(`❌ ${site.name}: NOT FOUND`);
    continue;
  }

  const icon = result.readinessScore >= 70 ? '✅' : result.readinessScore >= 40 ? '⚠️' : '🔴';
  console.log(`${icon} ${result.name}: ${result.readinessScore}/100`);
  console.log(`   Config: ${result.affiliateConfigFiles.length > 0 ? 'Found ✅' : 'Missing ❌'}`);
  console.log(`   Placeholders: ${result.placeholderCount} | Real IDs: ${result.realIdCount}`);
  console.log(`   Blog data files: ${result.blogDataFiles.length}`);

  if (result.issues.length > 0) {
    for (const issue of result.issues) {
      console.log(`   ⚠️  ${issue}`);
    }
  }

  if (VERBOSE && result.placeholderFiles.length > 0) {
    console.log('   Files with placeholders:');
    for (const pf of result.placeholderFiles) {
      console.log(`     - ${pf.file}`);
      for (const p of pf.patterns) {
        console.log(`       ↳ ${p.slice(0, 60)}`);
      }
    }
  }

  totalPlaceholders += result.placeholderCount;
  totalReal += result.realIdCount;
  totalScore += result.readinessScore;
  if (result.readinessScore >= 70) sitesReady++;
  console.log('');
}

// Summary
console.log('═══════════════════════════════════════════════════');
console.log(' Summary');
console.log('═══════════════════════════════════════════════════');
console.log(` Sites found:      ${SITES.length}`);
console.log(` Sites ready+:     ${sitesReady}/${SITES.length} (score ≥ 70)`);
console.log(` Total placeholders: ${totalPlaceholders}`);
console.log(` Total real IDs:     ${totalReal}`);
console.log(` Avg readiness:      ${Math.round(totalScore / SITES.length)}/100`);
console.log('');

if (totalPlaceholders > 0) {
  console.log('🔴 ACTION NEEDED: Fill credentials/affiliate-ids.json,');
  console.log('   then run: bash scripts/affiliate-inject.sh');
} else {
  console.log('✅ All sites have real affiliate IDs.');
}

console.log('\nAudit complete.');
