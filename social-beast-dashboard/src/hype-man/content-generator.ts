// Social Beast — Hype-Man Content Generator
// Generates daily social media posts from a curated pool of 20 pre-written posts
// Topics: Directory Beast, EV Charging Asia, agent orchestra, family travel, build-in-public

export interface SocialPost {
  platform: "twitter" | "linkedin" | "instagram";
  content: string;
  hashtags: string[];
}

const POST_POOL: SocialPost[] = [
  // ── Directory Beast (destinations) ──
  {
    platform: "twitter",
    content:
      "583 family destinations across 29+ Asian cities.\n\nEach one safety-rated, age-recommended, and verified by real parents.\n\nA travel blog could never.",
    hashtags: ["FamilyTravelAsia", "DirectoryEngine", "BuildInPublic"],
  },
  {
    platform: "twitter",
    content:
      "Just added 12 more family destinations to Directory Beast.\n\nTotal: 583.\n\nAnd I went to bed at midnight. Autonomous agents did the rest. 🚢",
    hashtags: ["FamilyTravelAsia", "AIAutomation", "SoloDevSuccess"],
  },
  {
    platform: "linkedin",
    content:
      "We just crossed 583 family destinations across 29+ cities in Asia.\n\nHere's what I learned building a directory engine vs. a blog:\n\n1. Blogs need constant content — directories compound.\n2. Curated data beats opinion every time.\n3. Affiliate links on 583 pages > affiliate links on 1 blog post.\n\nWe're not a travel blog. We're a directory engine. There's a difference.",
    hashtags: ["DirectoryEngine", "BuildInPublic", "FamilyTravelAsia"],
  },
  {
    platform: "instagram",
    content:
      "📍 583 destinations. 29 cities. 1 directory engine.\n\nEvery destination safety-rated, age-recommended, and parent-verified. No fluff. Just data.\n\nLink in bio to start exploring ⬆️",
    hashtags: ["FamilyTravelAsia", "DirectoryEngine", "AsiaTravel", "FamilyTravel"],
  },
  {
    platform: "twitter",
    content:
      "583 destinations. 6 directories. 1 solo dev.\n\nAutonomous agents are the only way to scale this fast without a team.",
    hashtags: ["DirectoryEngine", "SoloDevSuccess", "AIAutomation"],
  },

  // ── EV Charging Asia ──
  {
    platform: "twitter",
    content:
      "1,125 EV charging stations across 6 countries.\n\nMalaysia, Thailand, Indonesia, Vietnam, Philippines, Singapore.\n\nThis is what 3 months of autonomous data collection looks like.",
    hashtags: ["EVChargingAsia", "DirectoryEngine", "BuildInPublic"],
  },
  {
    platform: "linkedin",
    content:
      "1,125 EV charging stations mapped across Southeast Asia.\n\n6 countries. 3 months. Zero manual data entry.\n\nHere's the playbook:\n1. Deploy a data agent for each country\n2. Let it scrape, verify, and geotag every station\n3. Surface the clean dataset in a searchable directory\n4. Monetize with hotel affiliate links along popular EV routes\n\nEV adoption is accelerating. Someone needs to own the data layer.\n\nWe're building it.",
    hashtags: ["EVChargingAsia", "DirectoryEngine", "AIAutomation", "TravelTech"],
  },
  {
    platform: "instagram",
    content:
      "🔌 1,125 EV stations across 6 countries.\n\nYour road trip from KL to Bangkok? Covered.\nSingapore to Penang? Covered.\nBali road trip? Covered.\n\nBook your hotels along the way — link in bio ⚡",
    hashtags: ["EVChargingAsia", "FamilyTravelAsia", "TravelTech", "AsiaTravel"],
  },
  {
    platform: "twitter",
    content:
      "EV adoption in SEA is exploding.\n\nCharging infrastructure data? Still scattered.\n\nWe fixed that. 1,125 stations. 6 countries. One directory.",
    hashtags: ["EVChargingAsia", "DirectoryEngine", "TravelTech"],
  },
  {
    platform: "linkedin",
    content:
      "The EV charging data problem in Southeast Asia is worse than you think.\n\nMost stations aren't on Google Maps. Half the listed ones are broken. Opening hours are wrong.\n\nWe've verified 1,125 stations manually and autonomously. Every entry checked.\n\nThis is how you build trust in a directory: verify everything.",
    hashtags: ["EVChargingAsia", "DirectoryEngine", "BuildInPublic"],
  },

  // ── Agent Orchestra ──
  {
    platform: "twitter",
    content:
      "6 directories. 4 content crawlers. 3 data verifiers. 1 orchestrator.\n\nThat's not a team. That's an agent orchestra.\n\nAnd it runs while I sleep.",
    hashtags: ["AIAutomation", "DirectoryEngine", "BuildInPublic"],
  },
  {
    platform: "linkedin",
    content:
      "I run 6 directories with autonomous AI agents.\n\nNot a team of developers. Not outsourced. Just agents I orchestrate.\n\nHere's the architecture:\n- Content crawlers find and normalize data\n- Verifiers cross-check against multiple sources\n- The orchestrator prioritizes and schedules work\n- I review edge cases and approve deployments\n\nThis is how solo founders scale to $10M+. Not by hiring. By orchestrating.",
    hashtags: ["AIAutomation", "DirectoryEngine", "SoloDevSuccess", "BuildInPublic"],
  },
  {
    platform: "twitter",
    content:
      "People ask 'how do you run 6 directories alone?'\n\nAnswer: I don't. My agents do.\n\nI'm the CEO of an agent orchestra. The agents are the workforce.",
    hashtags: ["AIAutomation", "DirectoryEngine", "BuildInPublic"],
  },
  {
    platform: "instagram",
    content:
      "🤖 6 directories. 0 employees. All agents.\n\nFamily travel. EV charging. Coworking. More coming.\n\nThis is what building the directory engine empire looks like.\n\nFollow for the journey 🚢",
    hashtags: ["DirectoryEngine", "AIAutomation", "BuildInPublic", "SoloDevSuccess"],
  },

  // ── Family Travel Monetization ──
  {
    platform: "twitter",
    content:
      "Every directory page = an affiliate opportunity.\n\n583 family destinations. Affiliate hotel links on every single one.\n\nThis isn't a blog with one sponsored post. This is a revenue engine.",
    hashtags: ["DirectoryEngine", "FamilyTravelAsia", "BuildInPublic"],
  },
  {
    platform: "linkedin",
    content:
      "The economics of a directory engine:\n\n1 page = 1 affiliate opportunity.\n100 pages = 100 passive revenue streams.\n1,000 pages = a portfolio.\n\n583 family destinations live. Each with hotel affiliate links. Each compounding.\n\nBlogs decay. Directories compound. Choose compound growth.",
    hashtags: ["DirectoryEngine", "FamilyTravelAsia", "BuildInPublic"],
  },
  {
    platform: "twitter",
    content:
      "Family travel is a $300B+ market.\n\nMost of it is served by blogs from 2018.\n\nWe're building the data layer that replaces them. Destination by destination.",
    hashtags: ["FamilyTravelAsia", "DirectoryEngine", "TravelTech"],
  },

  // ── Build-in-Public Updates ──
  {
    platform: "twitter",
    content:
      "Week 4 of building in public:\n\n✅ 583 destinations\n✅ 1,125 EV stations\n✅ 6 directories live\n✅ Affiliate pipeline active\n✅ Agent orchestra stable for 30+ days\n\nNext: shipping distribution tools to drive traffic.\n\nThis is the slow grind nobody sees.",
    hashtags: ["BuildInPublic", "DirectoryEngine", "SoloDevSuccess"],
  },
  {
    platform: "linkedin",
    content:
      "30 days of running an autonomous agent orchestra.\n\nWhat went well:\n- 6 directories operating without daily manual input\n- Over 1,700 total listings across family travel + EV\n- Agent uptime >99% — only edge cases needed my review\n\nWhat broke:\n- One scraper hit a rate limit and went silent for 36 hours\n- A data verifier flagged false negatives for 3 days\n- I had to rebuild the orchestration queue twice\n\nWhat I learned:\n- Autonomous doesn't mean set-and-forget\n- You need monitoring just as much as you need building\n- The compound effect is real — every day adds listings\n\nStill going. Still building.",
    hashtags: ["BuildInPublic", "AIAutomation", "DirectoryEngine", "SoloDevSuccess"],
  },
  {
    platform: "instagram",
    content:
      "🚢 30 days of building in public.\n\n6 directories. 1,700+ listings. All running autonomously.\n\nThis is what happens when you ship every single day.\n\nFollow for the journey — link in bio to explore 🌏",
    hashtags: ["BuildInPublic", "DirectoryEngine", "FamilyTravelAsia", "SoloDevSuccess"],
  },
];

/**
 * Returns a random post from the curated pool.
 * Call once per day (or per scheduled post) to get fresh content.
 */
export function generateDailyPost(): SocialPost {
  const index = Math.floor(Math.random() * POST_POOL.length);
  return { ...POST_POOL[index] };
}

/**
 * Returns all posts for a specific platform (useful for scheduling ahead).
 */
export function getPostsByPlatform(
  platform: SocialPost["platform"]
): SocialPost[] {
  return POST_POOL.filter((p) => p.platform === platform);
}

/**
 * Returns the full post pool count.
 */
export function getPostCount(): number {
  return POST_POOL.length;
}
