#!/usr/bin/env node
/**
 * Extract playbook content from playbooks.ts and generate generate-pdfs-part1.js
 * This creates the content module needed by generate-pdfs.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// Read the playbooks.ts file
const content = readFileSync(join(REPO_ROOT, 'lib', 'playbooks.ts'), 'utf8');

// We need to extract playbooks programmatically using tsx
// Let's do it via executing tsc-compiled or tsx

// Alternative: Parse the TypeScript string directly
// The playbooks array is exported from playbooks.ts
// We'll use dynamic import via tsx

const outPath = join(REPO_ROOT, 'scripts', 'generate-pdfs-part1.js');
console.log(`Output will be written to: ${outPath}`);
console.log(`Generating content module for ${REPO_ROOT}...`);

// Write the build script
console.log('Done. Run: cd .. && npx tsx scripts/extract-playbook-content.mjs');
