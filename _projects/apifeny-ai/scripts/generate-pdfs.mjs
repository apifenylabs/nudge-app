#!/usr/bin/env node
/**
 * Generate All Playbook PDFs — Professional, Branded Documents
 * Uses Playwright for HTML→PDF rendering
 */

import { chromium } from 'playwright';
import { mkdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const DOWNLOADS_DIR = join(REPO_ROOT, 'public', 'downloads');

// ─── Content definitions are now loaded from the separate module
const { PAGE_TITLES, SUBTITLES, getChapters, ALL_SLUGS } = await import('./generate-pdfs-part1.js');

const CHROMIUM_DIR = join(homedir(), '.cache/ms-playwright/chromium-1223/chrome-linux64');

// ═══════════════════════════════════════════════════════════════
// HTML TEMPLATE — Professional Book Layout
// ═══════════════════════════════════════════════════════════════

function buildCoverHTML(title, subtitle) {
  return `
    <div class="cover-page">
      <div class="cover-accent"></div>
      <div class="cover-content">
        <div class="cover-label">APIFENY AI PLAYBOOK</div>
        <div class="cover-line"></div>
        <h1 class="cover-title">${escapeHtml(title)}</h1>
        <p class="cover-subtitle">${escapeHtml(subtitle)}</p>
        <div class="cover-line"></div>
        <div class="cover-meta">
          <p>A Comprehensive Guide</p>
          <p class="cover-tagline">Built with AI, refined for humans.</p>
        </div>
      </div>
      <div class="cover-footer">
        <p>&copy; ${new Date().getFullYear()} Apifeny AI &mdash; All Rights Reserved</p>
      </div>
    </div>
  `;
}

function buildTOCPage(chapters) {
  const tocItems = chapters.map((ch, i) => `
    <div class="toc-item">
      <span class="toc-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="toc-title">${escapeHtml(ch.title)}</span>
    </div>
  `).join('');

  return `
    <div class="page toc-page">
      <h2 class="toc-heading">Table of Contents</h2>
      <div class="toc-items">${tocItems}</div>
      <div class="toc-footer">${chapters.length} chapters &bull; Full playbook inside</div>
    </div>
  `;
}

function buildChapterPage(chapter, chapterNum, totalChapters) {
  const sections = chapter.sections.map(s => `
    <section class="chapter-section">
      <h3 class="section-heading">${escapeHtml(s.heading)}</h3>
      <p class="section-body">${escapeHtml(s.body).replace(/\n/g, '<br><br>')}</p>
    </section>
  `).join('');

  return `
    <div class="page chapter-page">
      <div class="chapter-header">
        <span class="chapter-number">Chapter ${chapterNum} of ${totalChapters}</span>
        <h2 class="chapter-title">${escapeHtml(chapter.title)}</h2>
      </div>
      ${sections}
      <div class="page-footer">
        <span>Apifeny AI</span>
        <span class="page-num"></span>
      </div>
    </div>
  `;
}

function buildHTML(title, subtitle, chapters) {
  const totalChapters = chapters.length;
  const coverHTML = buildCoverHTML(title, subtitle);
  const tocHTML = buildTOCPage(chapters);
  const chapterPages = chapters.map((ch, i) => buildChapterPage(ch, i + 1, totalChapters)).join('<div class="page-break"></div>');

  // Build disclosure page
  const disclosureHTML = `
    <div class="page disclosure-page">
      <h2>Disclaimer & License</h2>
      <p>This playbook is provided for informational and educational purposes only. The strategies, tools, and recommendations contained herein are based on research and real-world testing but results may vary.</p>
      <p>No guarantee of specific outcomes is made. The author and Apifeny AI shall not be held liable for any direct, indirect, or consequential damages arising from the use of this playbook.</p>
      <p>&copy; ${new Date().getFullYear()} Apifeny AI. All rights reserved. This publication may not be reproduced, distributed, or transmitted in whole or in part without the prior written permission of the publisher.</p>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)} - Apifeny AI</title>
<style>
  @page {
    size: A4;
    margin: 0;
  }
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    color: #1a1a2e;
    line-height: 1.6;
  }
  
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 25mm 30mm 20mm 30mm;
    position: relative;
    page-break-after: always;
    background: white;
  }
  
  .page-break {
    page-break-after: always;
  }
  
  /* ─── Cover Page ─── */
  .cover-page {
    width: 210mm;
    min-height: 297mm;
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40mm 30mm;
    position: relative;
    overflow: hidden;
    page-break-after: always;
  }
  
  .cover-page::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 80%;
    height: 150%;
    background: radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  }
  
  .cover-page::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -20%;
    width: 60%;
    height: 100%;
    background: radial-gradient(ellipse, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
  }
  
  .cover-accent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #6366f1, #06b6d4, #6366f1);
  }
  
  .cover-content {
    position: relative;
    z-index: 1;
  }
  
  .cover-label {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    opacity: 0.7;
    margin-bottom: 20px;
    font-weight: 400;
  }
  
  .cover-line {
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, #06b6d4);
    margin: 20px auto;
  }
  
  .cover-title {
    font-size: 32pt;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
    color: white;
  }
  
  .cover-subtitle {
    font-size: 14pt;
    opacity: 0.85;
    line-height: 1.5;
    max-width: 400px;
    margin: 0 auto;
    font-weight: 300;
  }
  
  .cover-meta {
    margin-top: 30px;
    font-size: 10pt;
    opacity: 0.6;
  }
  
  .cover-tagline {
    font-style: italic;
    margin-top: 6px;
    font-size: 9pt;
  }
  
  .cover-footer {
    position: absolute;
    bottom: 20mm;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 8pt;
    opacity: 0.4;
    z-index: 1;
  }
  
  /* ─── TOC ─── */
  .toc-page {
    padding-top: 35mm;
  }
  
  .toc-heading {
    font-size: 20pt;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 30px;
    letter-spacing: -0.3px;
    border-bottom: 2px solid #6366f1;
    padding-bottom: 10px;
  }
  
  .toc-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eef2ff;
    gap: 15px;
  }
  
  .toc-num {
    font-size: 11pt;
    color: #6366f1;
    font-weight: 700;
    min-width: 30px;
  }
  
  .toc-title {
    font-size: 11pt;
    color: #374151;
  }
  
  .toc-footer {
    margin-top: 30px;
    font-size: 9pt;
    color: #9ca3af;
    text-align: center;
  }
  
  /* ─── Chapter Pages ─── */
  .chapter-header {
    margin-bottom: 25px;
    border-bottom: 3px solid #6366f1;
    padding-bottom: 12px;
  }
  
  .chapter-number {
    font-size: 9pt;
    color: #6366f1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: block;
    margin-bottom: 6px;
  }
  
  .chapter-title {
    font-size: 18pt;
    font-weight: 800;
    color: #1a1a2e;
    letter-spacing: -0.3px;
    line-height: 1.3;
  }
  
  .chapter-section {
    margin-bottom: 20px;
  }
  
  .section-heading {
    font-size: 13pt;
    font-weight: 700;
    color: #302b63;
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  .section-body {
    font-size: 10pt;
    color: #4b5563;
    line-height: 1.7;
    text-align: justify;
  }
  
  /* ─── Page Footer ─── */
  .page-footer {
    position: absolute;
    bottom: 15mm;
    left: 30mm;
    right: 30mm;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: #9ca3af;
    border-top: 1px solid #e5e7eb;
    padding-top: 8px;
  }
  
  /* ─── Disclosure Page ─── */
  .disclosure-page {
    padding-top: 30mm;
  }
  
  .disclosure-page h2 {
    font-size: 16pt;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 20px;
    border-bottom: 2px solid #6366f1;
    padding-bottom: 8px;
  }
  
  .disclosure-page p {
    font-size: 9pt;
    color: #6b7280;
    line-height: 1.7;
    margin-bottom: 12px;
  }
</style>
</head>
<body>
${coverHTML}
${disclosureHTML}
${tocHTML}
${chapterPages}
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ═══════════════════════════════════════════════════════════════
// PDF Generation
// ═══════════════════════════════════════════════════════════════

async function generatePDF(slug) {
  const title = PAGE_TITLES[slug];
  const subtitle = SUBTITLES[slug];
  const chapters = getChapters(slug);

  if (!chapters || chapters.length === 0) {
    console.error(`  ✗ No content for ${slug}`);
    return false;
  }

  const html = buildHTML(title, subtitle, chapters);
  const outPath = join(DOWNLOADS_DIR, `${slug}.pdf`);

  console.log(`  Generating: ${title} (${chapters.length} chapters)...`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    env: { ...process.env, LD_LIBRARY_PATH: CHROMIUM_DIR },
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });
    await page.setContent(html, { waitUntil: 'networkidle' });
    
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });

    const stats = statSync(outPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`  ✓ ${slug}.pdf (${sizeKB} KB)`);
    return true;
  } catch (err) {
    console.error(`  ✗ Error generating ${slug}:`, err.message);
    return false;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('\n══════════════════════════════════════════════');
  console.log('  Apifeny AI — Playbook PDF Generator');
  console.log('══════════════════════════════════════════════\n');

  // Ensure output directory
  mkdirSync(DOWNLOADS_DIR, { recursive: true });

  console.log(`Output: ${DOWNLOADS_DIR}\n`);

  const results = [];
  for (const slug of ALL_SLUGS) {
    const ok = await generatePDF(slug);
    results.push({ slug, ok });
  }

  // Summary
  const succeeded = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  
  console.log('\n══════════════════════════════════════════════');
  console.log(`  Summary: ${succeeded} generated ✓  ${failed} failed ✗`);
  console.log('══════════════════════════════════════════════\n');

  if (failed > 0) {
    console.log('Failed:', results.filter(r => !r.ok).map(r => r.slug).join(', '));
  }

  process.exit(failed > 0 ? 1 : 0);
}

main();
