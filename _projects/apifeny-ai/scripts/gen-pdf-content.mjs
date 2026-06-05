#!/usr/bin/env node
/**
 * Generate the generate-pdfs-part1.js content module from playbooks.ts
 * This bridges the gap between playbooks.ts and the PDF generator
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// Dynamic import the TypeScript
const { playbooks } = await import(join(REPO_ROOT, 'lib', 'playbooks.ts'));

function escapeStr(s) {
  if (!s) return '';
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// Build PAGE_TITLES
let lines = [];

lines.push('// ══════════════════════════════════════════════════════════');
lines.push('// APIFENY AI — Playbook PDF Content');
lines.push('// Auto-generated from lib/playbooks.ts');
lines.push('// ══════════════════════════════════════════════════════════\n');

lines.push('export const PAGE_TITLES = {');
playbooks.forEach((p, i) => {
  lines.push(`  '${p.slug}': '${escapeStr(p.title)}',`);
});
lines.push('};\n');

lines.push('export const SUBTITLES = {');
playbooks.forEach((p, i) => {
  lines.push(`  '${p.slug}': '${escapeStr(p.subtitle)}',`);
});
lines.push('};\n');

lines.push('export const ALL_SLUGS = [');
playbooks.forEach(p => {
  lines.push(`  '${p.slug}',`);
});
lines.push('];\n');

// Generate chapters for each playbook
lines.push('export function getChapters(slug) {');
lines.push('  const chapters = {');

playbooks.forEach((p) => {
  const slug = p.slug;
  const steps = p.steps || [];
  const proTips = p.pro_tips || [];
  const mistakes = p.common_mistakes || [];
  
  lines.push(`    '${slug}': [`);

  // Chapter 1: The main steps
  if (steps.length > 0) {
    lines.push('      {');
    lines.push(`        title: '${escapeStr(p.title)} — Step-by-Step Guide',`);
    lines.push('        sections: [');
    steps.forEach((step, si) => {
      const heading = step.title || `Step ${si + 1}`;
      const body = step.description || '';
      let sectionBody = body;
      if (step.tip) {
        sectionBody += `\n\n💡 Pro Tip: ${step.tip}`;
      }
      lines.push('          {');
      lines.push(`            heading: '${escapeStr(heading)}',`);
      lines.push(`            body: '${escapeStr(sectionBody)}',`);
      lines.push('          },');
    });
    lines.push('        ],');
    lines.push('      },');
  }

  // Chapter 2: Pro Tips
  if (proTips.length > 0) {
    lines.push('      {');
    lines.push("        title: 'Pro Tips',");
    lines.push('        sections: [');
    proTips.forEach(tip => {
      lines.push('          {');
      lines.push(`            heading: '💡 Pro Tip',`);
      lines.push(`            body: '${escapeStr(tip)}',`);
      lines.push('          },');
    });
    lines.push('        ],');
    lines.push('      },');
  }

  // Chapter 3: Common Mistakes
  if (mistakes.length > 0) {
    lines.push('      {');
    lines.push("        title: 'Common Mistakes & How to Avoid Them',");
    lines.push('        sections: [');
    mistakes.forEach(m => {
      lines.push('          {');
      lines.push(`            heading: '⚠️ ${escapeStr(m.mistake)}',`);
      lines.push(`            body: '✅ ${escapeStr(m.fix)}',`);
      lines.push('          },');
    });
    lines.push('        ],');
    lines.push('      },');
  }

  // Chapter 4: Revenue Impact & Results
  const results = p.real_results || [];
  if (p.revenue_impact || results.length > 0) {
    lines.push('      {');
    lines.push("        title: 'Real-World Impact',");
    lines.push('        sections: [');
    if (p.revenue_impact) {
      lines.push('          {');
      lines.push("            heading: '💰 Revenue Impact',");
      lines.push(`            body: '${escapeStr(p.revenue_impact)}',`);
      lines.push('          },');
    }
    if (results.length > 0) {
      lines.push('          {');
      lines.push("            heading: '📊 Real Results',");
      let resultsBody = results.map(r => `• ${r.metric}: ${r.value} — ${r.description}`).join('\n');
      lines.push(`            body: '${escapeStr(resultsBody)}',`);
      lines.push('          },');
    }
    lines.push('        ],');
    lines.push('      },');
  }

  // Chapter 5: Starter Prompt
  if (p.free_prompt) {
    lines.push('      {');
    lines.push("        title: 'Starter Prompt',");
    lines.push('        sections: [');
    lines.push('          {');
    lines.push("            heading: '🎯 Copy this prompt to get started:',");
    lines.push(`            body: '${escapeStr(p.free_prompt)}',`);
    lines.push('          },');
    lines.push('        ],');
    lines.push('      },');
  }

  lines.push('    ],');
});

lines.push('  };');
lines.push('  return chapters[slug] || [];');
lines.push('}\n');

// Write the file
const outPath = join(REPO_ROOT, 'scripts', 'generate-pdfs-part1.js');
writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`✅ Generated: ${outPath}`);
console.log(`   ${playbooks.length} playbooks exported`);
