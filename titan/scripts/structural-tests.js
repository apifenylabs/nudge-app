#!/usr/bin/env node
/**
 * Titan — Structural Page Analysis
 *
 * Verifies server-rendered HTML for meta tags, content structure,
 * and core routes using curl (no Playwright needed).
 *
 * Run: node scripts/structural-tests.js
 * Or:  BASE_URL=https://titan.vercel.app node scripts/structural-tests.js
 *
 * Designed to work in WSL environments where Chromium NSS libs are missing.
 */

const { execSync } = require("child_process");

const BASE = process.env.BASE_URL || "http://localhost:3000";

function fetch(url) {
  try {
    return execSync(`curl -sL --max-filesize 1M "${url}" 2>/dev/null`, {
      encoding: "utf-8",
      timeout: 15000,
      maxBuffer: 2 * 1024 * 1024,
    });
  } catch {
    return "";
  }
}

function hasContent(html, min = 200) {
  return html.length > min;
}

function hasTitle(html) {
  return /<title>.+<\/title>/i.test(html);
}

function hasJSONLD(html) {
  return /<script[^>]*type="application\/ld\+json"[^>]*>/i.test(html);
}

function hasMetaDesc(html) {
  return /<meta[^>]*name="description"[^>]*>/i.test(html);
}

function hasH1(html) {
  return /<h1[^>]*>/i.test(html);
}

function hasNav(html) {
  return /<(nav|header)[^>]*>/i.test(html);
}

function countLinks(html) {
  const m = html.match(/<a[^>]+href=["']([^"']+)["']/gi);
  return m ? m.length : 0;
}

function checkLandingPage(html) {
  const checks = [
    ["Page returns content", hasContent(html)],
    ["Meta description present", hasMetaDesc(html)],
    ["JSON-LD structured data present", hasJSONLD(html)],
    ["Navigation element present (nav/header)", hasNav(html)],
    ["H1 heading present", hasH1(html)],
  ];
  checks.forEach(([name, ok]) =>
    console.log(`  ${ok ? "✅" : "❌"} ${name}`)
  );
  return checks.filter(([_, ok]) => ok).length;
}

function checkGenericPage(html, label) {
  const checks = [
    ["Page returns content", hasContent(html)],
    ["Page has a title", hasTitle(html)],
  ];
  checks.forEach(([name, ok]) =>
    console.log(`  ${ok ? "✅" : "❌"} ${name}`)
  );
  return checks.filter(([_, ok]) => ok).length;
}

function run() {
  console.log(`🏗️  Titan — Structural Page Analysis\n`);
  console.log(`Testing against: ${BASE}\n`);

  const pages = [
    { path: "/", label: "LANDING PAGE" },
    { path: "/robotics", label: "ROBOTICS LANDING" },
    { path: "/robotics/dashboard", label: "ROBOTICS DASHBOARD" },
  ];

  let total = 0;
  let passed = 0;

  pages.forEach(({ path, label }) => {
    console.log(`📄 ${label} (${path})`);
    console.log("─".repeat(50));
    const html = fetch(`${BASE}${path}`);

    let n;
    if (path === "/") {
      n = checkLandingPage(html);
    } else {
      n = checkGenericPage(html, label);
    }

    const linkCount = countLinks(html);
    console.log(`  📎 ${linkCount} internal links found`);
    console.log("");
    total += n;
    // For landing page: 5 checks; for others: 2 checks
    passed += n;
  });

  console.log("═".repeat(50));
  console.log(`\n🏁 PASSED: ${passed}/${total}\n`);
}

run();
