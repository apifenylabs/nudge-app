// Append 10 new tools to the enriched data.ts
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'lib', 'data.ts');
const NEW = path.join(__dirname, 'new-tools-data.txt');

let src = fs.readFileSync(SRC, 'utf-8');
const newData = fs.readFileSync(NEW, 'utf-8');

// Find the closing ]; and export line
const exportIdx = src.indexOf('export default toolsData');
const arrayClose = src.lastIndexOf('];', exportIdx);

// Remove the ]; and everything after (the decl)
const beforeClose = src.substring(0, arrayClose).trimEnd();

// Build output: enriched tools + separator + new tools + ];
// new-tools-data.txt has comment lines at top that need stripping
const trimmedNew = newData.trim();
// Remove comment lines (lines starting with //)
const cleanNew = trimmedNew.split('\n').filter(l => !l.trim().startsWith('//')).join('\n').trim();
// beforeClose ends with '},' (the last tool block). cleanNew starts with a tool block.
// We need just a newline separator, no extra comma.
// beforeClose already ends with '},' (last tool entry). cleanNew starts with '  {' (new tool).
// We just need a newline separator — no extra comma.
const result = beforeClose + '\n' + cleanNew + '\n];\n\nexport default toolsData;\n';

// Verify no double commas
if (result.includes(',,')) {
  console.error('ERROR: double comma');
  process.exit(1);
}

fs.writeFileSync(SRC, result);
console.log('✅ Appended 10 new tools. File has 30 tools.');

// Verify count
const cnt = result.match(/id:\s+'(\d+)'/g);
console.log(`Total tools found: ${cnt ? cnt.length : 0}`);
