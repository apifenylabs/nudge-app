#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE = path.resolve(__dirname, "..");

const SITE_INFO = {
  "family-travel-directory": {
    linksTo: ["ev-charging-asia", "luxury-family-travel"],
  },
  "ev-charging-asia": {
    linksTo: ["family-travel-directory", "luxury-family-travel"],
  },
  "luxury-family-travel": {
    linksTo: ["family-travel-directory", "ev-charging-asia"],
  },
};

const SITE_NAMES = {
  "family-travel-directory": "Family Travel Asia",
  "ev-charging-asia": "EV Charging Asia",
  "luxury-family-travel": "Luxury Family Travel",
};

const SITE_DOMAINS = {
  "family-travel-directory": "https://familytravelasia.com",
  "ev-charging-asia": "https://ev-charging-asia.vercel.app",
  "luxury-family-travel": "https://luxury-family-travel-asia.vercel.app",
};

// Keyword → [targetSiteDir, linkTextTemplate]
const LINK_TEMPLATES = {
  "road trip": ["ev-charging-asia", (t) => `Explore EV-friendly road trips across Asia with our charging station directory at ${t}.`],
  driving: ["ev-charging-asia", (t) => `For EV drivers, ${t} has detailed charging station maps and route planning.`],
  "car rental": ["ev-charging-asia", (t) => `Renting an EV? ${t} helps you find charging stations along your route.`],
  "self-drive": ["ev-charging-asia", (t) => `Taking a self-drive holiday? Browse ${t} for EV-friendly routes.`],
  "electric car": ["ev-charging-asia", (t) => `${t} maps charging stations across Asia for EV-driving families.`],
  "EV charging": ["ev-charging-asia", (t) => `Find charging stations near you with ${t}'s comprehensive directory.`],
  drive: ["ev-charging-asia", (t) => `Planning a road trip? ${t} helps EV-driving families find charging stations.`],
  luxury: ["luxury-family-travel", (t) => `Explore our curated collection at ${t} — from private villas to five-star resorts.`],
  "5-star": ["luxury-family-travel", (t) => `${t} features hand-picked five-star properties for discerning families.`],
  villa: ["luxury-family-travel", (t) => `Browse premium villas with private pools at ${t}.`],
  splurge: ["luxury-family-travel", (t) => `${t} has the finest accommodations for families who want the best.`],
  premium: ["luxury-family-travel", (t) => `Explore premium family accommodations at ${t}.`],
  resort: ["luxury-family-travel", (t) => `Browse Asia's finest family resorts at ${t}.`],
  budget: ["family-travel-directory", (t) => `${t} has budget breakdowns, money-saving tips, and practical family travel guides.`],
  kids: ["family-travel-directory", (t) => `For kid-approved destinations and travel tips, visit ${t}.`],
  family: ["family-travel-directory", (t) => `Discover family travel inspiration at ${t} — honest reviews by parents for parents.`],
  children: ["family-travel-directory", (t) => `Find child-friendly travel ideas at ${t}, Asia's leading family travel resource.`],
  toddler: ["family-travel-directory", (t) => `Get toddler-specific travel tips and destination guides at ${t}.`],
};

function injectLinks(text, siteDir) {
  let result = text;
  const injected = [];

  for (const [keyword, [targetDir, linkFn]] of Object.entries(LINK_TEMPLATES)) {
    // Skip if target is self
    if (targetDir === siteDir) continue;

    // Check if site should link to this target (skip if not in linksTo)
    const info = SITE_INFO[siteDir];
    if (!info || !info.linksTo.includes(targetDir)) continue;

    const pattern = new RegExp("\\b" + keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    const match = pattern.exec(result);
    if (!match) continue;

    const targetDomain = SITE_DOMAINS[targetDir];
    // Already has a link?
    if (result.includes(targetDomain)) continue;

    const targetName = SITE_NAMES[targetDir];
    const linkText = linkFn(targetName);
    const linkHtml = `\n\n<a href="${targetDomain}" target="_blank" rel="noopener noreferrer" class="cross-site-link">${linkText}</a>\n\n`;

    // End of the paragraph containing this keyword
    const pos = match.index + match[0].length;
    const nextPara = result.indexOf("\n\n", pos);
    const insertAt = nextPara > 0 ? nextPara + 2 : result.length;

    result = result.slice(0, insertAt) + linkHtml + result.slice(insertAt);
    injected.push({ keyword, targetName });
  }

  return { content: result, count: injected.length, details: injected };
}

let totalLinks = 0;
const results = [];

for (const siteDir of Object.keys(SITE_INFO)) {
  const tsPath = path.join(WORKSPACE, siteDir, "lib", "generated-blog-data.ts");
  if (!fs.existsSync(tsPath)) {
    console.log(`SKIP ${siteDir}: no file`);
    continue;
  }

  console.log(`\nProcessing ${SITE_NAMES[siteDir]} (${siteDir})...`);
  const raw = fs.readFileSync(tsPath, "utf8");
  const marker = "const allPosts: BlogPost[] = ";
  const startIdx = raw.indexOf(marker);
  let jsonStr = raw.slice(startIdx + marker.length);
  // Strip trailing export
  jsonStr = jsonStr.replace(/;\n*\nexport default allPosts;?\n*$/, "");
  // Remove extra outer wrapping if nested arrays: [ [{},{}] ]
  jsonStr = jsonStr.replace(/\]\n?\];?\s*$/, "]");
  // Remove trailing ";" if present
  jsonStr = jsonStr.replace(/;\s*$/, "");
  // If the file wraps posts in double arrays, unwrap
  if (jsonStr.startsWith("[[") && jsonStr.endsWith("]]")) {
    jsonStr = jsonStr.slice(1, -1);
  }
  // Remove semicolons embedded in JSON
  jsonStr = jsonStr.replace(/;\s*$/, "");
  try {
    var posts = JSON.parse(jsonStr);
  } catch(e) {
    // Maybe it's wrapped: [ [...], ] 
    // Try unwrapping outer bracket if fails
    const trimmed = jsonStr.replace(/^\[\s*/, "").replace(/\s*\]$/, "");
    posts = JSON.parse("[" + trimmed + "]");
  }

  let siteTotal = 0;
  const details = [];

  for (const post of posts) {
    const result = injectLinks(post.content, siteDir);
    if (result.count > 0) {
      post.content = result.content;
      siteTotal += result.count;
      details.push(...result.details);
      console.log(`  ${post.slug}: ${result.count} links (${result.details.map(d => d.keyword + "→" + d.targetName).join(", ")})`);
    }
  }

  const wasDoubleWrapped = raw.includes("const allPosts: BlogPost[] = [");
  
  if (siteTotal > 0) {
    let newJson = JSON.stringify(posts, null, 2);
    // If it was double-wrapped before, wrap again
    if (wasDoubleWrapped) {
      newJson = "[" + newJson + "]";
    }
    const newTs = [
      "// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY",
      "// Run: npm run generate-blog-data",
      "",
      "export interface BlogPost {",
      "  slug: string;",
      "  title: string;",
      "  excerpt: string;",
      "  date: string;",
      "  author: string;",
      "  tags: string[];",
      "  readingTime: string;",
      "  content: string;",
      "  relatedDestinations: string[];",
      "}",
      "",
      "const allPosts: BlogPost[] = " + newJson + ";",
      "",
      "export default allPosts;",
      "",
    ].join("\n");
    fs.writeFileSync(tsPath, newTs);
  }

  results.push({ site: SITE_NAMES[siteDir], dir: siteDir, count: siteTotal });
  totalLinks += siteTotal;
}

console.log("\n" + "=".repeat(50));
for (const r of results) {
  console.log(`${r.site}: ${r.count} links`);
}
console.log(`Total: ${totalLinks} cross-site links injected`);
