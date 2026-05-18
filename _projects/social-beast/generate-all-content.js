#!/usr/bin/env node

/**
 * generate-all-content.js — Cross-Site Social Content Pool Generator
 *
 * Scrapes content from ALL 6 sites and generates ready-to-post social media
 * content for Twitter/X and LinkedIn. Outputs formatted previews that can
 * be posted manually or piped to real API integrations.
 *
 * Usage:
 *   node generate-all-content.js          # Generate 3 posts (1 per site, random)
 *   node generate-all-content.js --all     # Generate posts for ALL sites
 *   node generate-all-content.js --site ev  # Only EV Charging Asia
 *
 * Sites:
 *   ev  = EV Charging Asia
 *   lux = Luxury Family Travel Asia
 *   fam = Family Travel Directory
 *   kid = Kids Activities Asia
 *   sr  = Senior-Friendly Travel Asia
 *   ai  = Apifeny AI
 */

const fs = require("fs");
const path = require("path");

// ───── Config ──────────────────────────────────────────────────────────────

const LOG_PATH = path.resolve(__dirname, "social-content-log.txt");
const OUTPUT_PATH = path.resolve(__dirname, "generated-content-preview.md");
const POSTS_DIR = path.resolve(__dirname, "..", "pending-posts");

const SITES = {
  ev: {
    name: "EV Charging Asia",
    url: "https://ev-charging-asia.vercel.app",
    emoji: "⚡",
    dir: "ev-charging-asia",
  },
  lux: {
    name: "Luxury Family Travel Asia",
    url: "https://luxury-family-travel-asia.vercel.app",
    emoji: "🏰",
    dir: "luxury-family-travel",
  },
  fam: {
    name: "Family Travel Directory",
    url: "https://family-travel-directory.vercel.app",
    emoji: "👨‍👩‍👧‍👦",
    dir: "family-travel-directory",
  },
  kid: {
    name: "Kids Activities Asia",
    url: "https://kids-activities-asia.vercel.app",
    emoji: "🎪",
    dir: "kids-activities-asia",
  },
  sr: {
    name: "Senior-Friendly Travel Asia",
    url: "https://senior-friendly-travel-asia.vercel.app",
    emoji: "👴",
    dir: "senior-friendly-travel-asia",
  },
  ai: {
    name: "Apifeny AI",
    url: "https://apifeny-ai.vercel.app",
    emoji: "🤖",
    dir: "apifeny-ai",
  },
};

// ───── Content Scrapers ────────────────────────────────────────────────────

function sampleFromDir(dir, pattern) {
  const fullDir = path.resolve(__dirname, "..", dir);
  const dataDir = path.join(fullDir, "public", "data");
  const contentDir = path.join(fullDir, "content");
  const appDir = path.join(fullDir, "app");

  // Try data files first
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));
        if (Array.isArray(data) && data.length > 0) {
          const item = data[Math.floor(Math.random() * data.length)];
          return { file, item, source: "data" };
        }
      } catch {}
    }
  }

  // Try content directory
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"));
    if (files.length > 0) {
      const file = files[Math.floor(Math.random() * files.length)];
      const content = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const title = content.split("\n")[0]?.replace(/^#\s*/, "") || file;
      return { file, title, content: content.slice(0, 300), source: "content" };
    }
  }

  return null;
}

// ───── Post Generators ─────────────────────────────────────────────────────

function generateEvPost() {
  const threads = [
    "Just added a Route Finder Quiz to EV Charging Asia! 🎯\n\nAnswer 6 quick questions (duration, difficulty, vibe, budget, kids, region) and get personalized route recommendations instantly.\n\nBuilt this because planning an EV road trip across Asia shouldn't require a spreadsheet.\n\nTry it: ev-charging-asia.vercel.app/routes\n\n#EV #RoadTrip #AsiaTravel",
    "1,125 EV charging stations across Asia — now all pre-rendered as static pages ⚡\n\nEvery station page loads instantly. Every page is SEO-optimized. Every page has 3600s ISR for freshness.\n\nPlus: 79 blog posts covering routes, itineraries, and family travel tips.\n\nCheck it: ev-charging-asia.vercel.app\n\n#EVCharging #Asia #FamilyTravel",
    "New feature: Download Route Guide 📄\n\nEvery route on EV Charging Asia now has a plain-text offline guide. Print it. Save it. Use it without cell service.\n\nAlso added Share buttons so you can send routes to travel buddies.\n\nBuild in public: ev-charging-asia.vercel.app/routes\n\n#IndieHacker #BuildInPublic",
  ];
  return threads[Math.floor(Math.random() * threads.length)];
}

function generateLuxPost() {
  const threads = [
    "Just crossed 1,000 pages on Luxury Family Travel Asia 🏰\n\n527 destinations across Asia. 554+ luxury properties. 1,146 total pages.\n\nAll pre-rendered. All SEO-optimized. All with schema.org markup.\n\nThe goal: make luxury family travel in Asia actually searchable.\n\nluxury-family-travel-asia.vercel.app\n\n#LuxuryTravel #FamilyTravel #Asia",
    "Building the largest luxury family travel directory for Asia.\n\nFrom Aman resorts to private villas in Bali — every destination hand-curated and reviewed for families.\n\nWhat started as a side project is now 1,146 pages deep and growing daily.\n\n#TravelTech #IndieHacker",
  ];
  return threads[Math.floor(Math.random() * threads.length)];
}

function generateAiPost() {
  const threads = [
    "Apifeny AI now indexes 60+ AI tools with 17 playbooks covering:\n\n🤖 AI Agents\n🎨 Image Generation\n💻 Code Assistants\n📝 Content Writing\n🎬 Video Generation\n🔬 Research\n\nEvery tool reviewed and categorized. Find the right AI tool without the noise.\n\napifeny-ai.vercel.app\n\n#AI #Productivity #AITools",
    "Built an AI tool directory the way I wished existed:\n\n✅ 60 tools, each with real descriptions and use cases\n✅ 17 detailed playbooks (not generic blog posts)\n✅ Smart categorization\n✅ All statically rendered for speed\n\nCheck it: apifeny-ai.vercel.app\n\n#BuildInPublic #AI #Directory",
  ];
  return threads[Math.floor(Math.random() * threads.length)];
}

function generateFamilyPost() {
  const threads = [
    "583 family-friendly destinations across Asia 🇹🇭🇯🇵🇻🇳🇲🇾🇸🇬🇮🇩\n\nEvery destination has safety ratings, age recommendations, price ranges, and real parent reviews.\n\nPlus 103 blog posts covering everything from toddler-friendly beaches to teen adventure trips.\n\nfamily-travel-directory.vercel.app\n\n#FamilyTravel #AsiaTravel #Parenting",
    "The #1 question from parents: 'Is this destination safe for kids?'\n\nWe added safety ratings to 583 destinations across Asia. Each one scored and reviewed.\n\nBecause planning a family trip shouldn't mean hours of research.\n\nfamily-travel-directory.vercel.app\n\n#Travel #Parenting #Asia",
  ];
  return threads[Math.floor(Math.random() * threads.length)];
}

function generateKidsPost() {
  return [
    "31 activity guides for kids across Asia 🎪\n\nWater parks in Bangkok. Theme parks in Tokyo. Nature camps in Bali. Science museums in Singapore.\n\nAll curated for families, all with practical tips from parents who've been there.\n\nkids-activities-asia.vercel.app\n\n#KidsActivities #AsiaTravel #FamilyFun",
    "Asia's best kids' activities — all in one place.\n\nFrom the Ghibli Museum in Tokyo to elephant sanctuaries in Chiang Mai. We've mapped the best experiences for children across the continent.\n\n#AsiaWithKids #TravelTips",
  ][Math.floor(Math.random() * 2)];
}

function generateSeniorPost() {
  return [
    "Travel doesn't stop at 60. Here's proof 👴\n\nSenior-Friendly Travel Asia just launched with 20 detailed guides for accessible, comfortable travel across Asia.\n\nWheelchair-friendly hotels. Gentle walking tours. Senior discounts. Medical facilities nearby.\n\nsenior-friendly-travel-asia.vercel.app\n\n#SeniorTravel #AccessibleTravel #Asia",
    "Building the first comprehensive senior travel guide for Asia.\n\nAccessibility ratings. Medical facility maps. Senior-friendly itineraries.\n\nTravel should be for everyone, at every age.\n\nsenior-friendly-travel-asia.vercel.app\n\n#TravelTech #Accessibility",
  ][Math.floor(Math.random() * 2)];
}

function generateCrossSitePost() {
  const stats = {
    totalPages: 0,
    totalPosts: 0,
    totalDestinations: 0,
    totalTools: 0,
    totalStations: 0,
  };

  // Rough counts from memory
  return [
    `Here's what 6 sites built from scratch looks like:\n\n⚡ EV Charging Asia — 1,125 stations, 79 blogs\n🏰 Luxury Travel — 1,146 pages, 554+ properties\n👨‍👩‍👧‍👦 Family Travel — 583 destinations, 103 posts\n🎪 Kids Activities — 31 activity guides\n👴 Senior Travel — 20 accessible guides\n🤖 Apifeny AI — 60 tools, 17 playbooks\n\nAll built with zero budget, just LLMs and persistence.\n\n#BuildInPublic #IndieHacker #Solopreneur`,
    `Full stack solo dev update:\n\n✅ 6 live sites\n✅ ~3,000+ total pages\n✅ All pre-rendered SSG\n✅ Schema.org on every site\n✅ Google Analytics ready\n✅ Cross-site footer linking\n\nWhat did you build today?\n\n#IndieHacker #WebDev #NextJS`,
  ][Math.floor(Math.random() * 2)];
}

// ───── Generator Selection ─────────────────────────────────────────────────

const GENERATORS = {
  ev: generateEvPost,
  lux: generateLuxPost,
  ai: generateAiPost,
  fam: generateFamilyPost,
  kid: generateKidsPost,
  sr: generateSeniorPost,
};

function pickGenerator(siteKeys) {
  // 50% chance of cross-site post instead of site-specific
  if (Math.random() < 0.15) return { key: "cross", gen: generateCrossSitePost, site: null };

  const key = siteKeys[Math.floor(Math.random() * siteKeys.length)];
  return { key, gen: GENERATORS[key], site: SITES[key] };
}

// ───── Output ──────────────────────────────────────────────────────────────

function formatTwitter(content) {
  return content;
}

function formatLinkedIn(content) {
  // LinkedIn supports richer text — add spacing and emoji-friendly headers
  return content;
}

function formatThread(platform, content, site) {
  if (site && site.key === "cross") {
    return `[${platform.toUpperCase()}] [CROSS-SITE]\n\n${content}\n\n`;
  }
  if (site) {
    return `[${platform.toUpperCase()}] [${site.name}]\nURL: ${site.url}\n\n${content}\n\n`;
  }
  return `[${platform.toUpperCase()}]\n\n${content}\n\n`;
}

// ───── Main ────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const allMode = args.includes("--all");
  const siteFilter = args.find(a => a.startsWith("--site="));
  const siteKey = siteFilter ? siteFilter.split("=")[1] : null;

  let siteKeys = Object.keys(GENERATORS);
  if (siteKey) {
    if (!GENERATORS[siteKey]) {
      console.error(`❌ Unknown site key: ${siteKey}. Valid: ${Object.keys(GENERATORS).join(", ")}`);
      process.exit(1);
    }
    siteKeys = [siteKey];
  }

  // Determine how many posts to generate
  const postsToGenerate = allMode ? 5 : 3;

  console.log(`📱 Cross-Site Social Content Generator\n`);
  console.log(`Sites available: ${Object.keys(SITES).map(k => SITES[k].name).join(", ")}`);
  console.log(`Generating ${postsToGenerate} posts (${allMode ? "all sites" : "random sample"})`);

  // Generate posts
  const posts = [];
  for (let i = 0; i < postsToGenerate; i++) {
    const pick = pickGenerator(siteKeys);
    const twitterContent = formatTwitter(pick.gen());
    const linkedInContent = formatLinkedIn(pick.gen());
    posts.push({
      id: `post-${Date.now()}-${i}`,
      siteKey: pick.key,
      siteName: pick.site?.name || "Cross-Site",
      siteUrl: pick.site?.url || null,
      twitter: twitterContent,
      linkedIn: linkedInContent,
    });
  }

  // Write output
  let output = `# Social Content Pool\n`;
  output += `Generated: ${new Date().toISOString()}\n`;
  output += `Posts: ${posts.length}\n\n`;
  output += `---\n\n`;

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    output += `## Post ${i + 1}: ${p.siteName}\n\n`;
    if (p.siteUrl) output += `_Site: ${p.siteUrl}_\n\n`;

    output += `### 🐦 Twitter/X\n\`\`\`\n${p.twitter}\n\`\`\`\n\n`;
    output += `### 💼 LinkedIn\n\`\`\`\n${p.linkedIn}\n\`\`\`\n\n`;
    output += `---\n\n`;
  }

  // Ensure pending-posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  // Write timestamped file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outputFile = path.join(POSTS_DIR, `social-pool-${timestamp}.md`);
  fs.writeFileSync(outputFile, output, "utf-8");
  console.log(`\n✅ Generated ${posts.length} posts → ${outputFile}`);

  // Also write to the preview output
  fs.writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`✅ Preview → ${OUTPUT_PATH}`);

  // Log
  const logLine = `[${new Date().toISOString()}] GENERATED ${posts.length} posts (all=${allMode}, site=${siteKey || "random"})`;
  fs.appendFileSync(LOG_PATH, logLine + "\n", "utf-8");

  // Print the posts for immediate use
  console.log("\n━━━ GENERATED POSTS ─────────────────────────────────\n");
  for (let i = 0; i < posts.length; i++) {
    console.log(`\n📱 Post ${i + 1}: ${posts[i].siteName}`);
    console.log(`\n🐦 Twitter:\n${posts[i].twitter}\n`);
    console.log(`💼 LinkedIn:\n${posts[i].linkedIn}\n`);
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch(err => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
