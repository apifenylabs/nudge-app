// ─── Types ───────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  views: number;
  comments: number;
  likes: number;
}

// ─── Categories ──────────────────────────────────────────────────────────

export interface BlogCategory {
  id: string;
  name: string;
}

export const CATEGORIES: BlogCategory[] = [
  { id: "all", name: "All Posts" },
  { id: "tutorials", name: "Tutorials" },
  { id: "guides", name: "Guides" },
  { id: "updates", name: "Product Updates" },
  { id: "ai-tips", name: "AI Tips" },
  { id: "community", name: "Community" },
];

export function getCategoryInfo(id: string): BlogCategory {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
}

// ─── Blog Posts ──────────────────────────────────────────────────────────

export const POSTS: BlogPost[] = [
  {
    slug: "getting-started-with-titan",
    title: "Getting Started with Titan: Build Your First AI Agent in 5 Minutes",
    excerpt:
      "New to Titan? Follow this step-by-step guide to create, train, and deploy your first AI agent with zero coding. Your agent swarm starts here.",
    author: "Titan Team",
    date: "May 28, 2026",
    readTime: "5 min read",
    category: "tutorials",
    tags: ["getting started", "agent builder", "beginner"],
    featured: true,
    image: "/blog/getting-started.svg",
    views: 2481,
    comments: 23,
    likes: 187,
  },
  {
    slug: "skill-forge-certification-guide",
    title: "Skill Forge Certification: How to Get Gold, Silver & Bronze Badges",
    excerpt:
      "Your skills deserve recognition. Learn how the automated Skill Certification audit works and what it takes to earn each tier.",
    author: "Titan Team",
    date: "May 25, 2026",
    readTime: "7 min read",
    category: "guides",
    tags: ["skill forge", "certification", "audit"],
    featured: false,
    image: "/blog/skill-certification.svg",
    views: 1563,
    comments: 18,
    likes: 142,
  },
  {
    slug: "agent-progression-system-deep-dive",
    title: "Inside the Progression System: XP, Leveling, and Agent Evolution",
    excerpt:
      "A deep dive into how Titan's gamified progression works — from XP accumulation to evolution thresholds and God-Tier unlocks.",
    author: "Titan Team",
    date: "May 22, 2026",
    readTime: "8 min read",
    category: "guides",
    tags: ["progression", "xp", "leveling", "evolution"],
    featured: false,
    image: "/blog/progression.svg",
    views: 2105,
    comments: 31,
    likes: 234,
  },
  {
    slug: "titan-v1-5-release",
    title: "Titan v1.5 Released: New Mascots, Skill Market & Agent Swarms",
    excerpt:
      "Our biggest update yet. Introducing five new iconic companion archetypes — Sage, Spark, Aegis, Drift, and Pixel — plus the Skill Market trading hub and multi-agent swarm orchestration.",
    author: "Titan Team",
    date: "May 20, 2026",
    readTime: "4 min read",
    category: "updates",
    tags: ["release", "v1.5", "mascots", "swarm"],
    featured: true,
    image: "/blog/v1-5-release.svg",
    views: 3892,
    comments: 47,
    likes: 412,
  },
  {
    slug: "top-10-ai-agent-use-cases",
    title: "10 Powerful AI Agent Use Cases You Can Build on Titan Right Now",
    excerpt:
      "From automated research assistants to social media managers — explore the most popular agent roles the Titan community is building today.",
    author: "Titan Team",
    date: "May 18, 2026",
    readTime: "6 min read",
    category: "ai-tips",
    tags: ["use cases", "ideas", "productivity"],
    featured: false,
    image: "/blog/use-cases.svg",
    views: 1874,
    comments: 29,
    likes: 198,
  },
  {
    slug: "agent-orchestration-best-practices",
    title: "Agent Orchestration: Best Practices for Building Reliable Swarms",
    excerpt:
      "Running multiple agents in parallel? Learn how to design robust orchestration flows with error handling, delegation, and fallback chains.",
    author: "Titan Team",
    date: "May 15, 2026",
    readTime: "9 min read",
    category: "guides",
    tags: ["orchestration", "swarm", "best practices", "architecture"],
    featured: false,
    image: "/blog/orchestration.svg",
    views: 1342,
    comments: 16,
    likes: 156,
  },
  {
    slug: "community-showcase-may-2026",
    title: "Community Showcase: The Most Creative Agents Built This Month",
    excerpt:
      "From a personal CFO agent to an AI-powered D&D dungeon master — check out what the Titan community has been building in May.",
    author: "Titan Team",
    date: "May 12, 2026",
    readTime: "5 min read",
    category: "community",
    tags: ["showcase", "community", "creativity"],
    featured: false,
    image: "/blog/community-showcase.svg",
    views: 2210,
    comments: 38,
    likes: 276,
  },
  {
    slug: "titan-v1-4-agent-memory",
    title: "Titan v1.4: Persistent Agent Memory & Cross-Session Context",
    excerpt:
      "Your agents now remember everything. Learn how persistent memory works and how to customize memory retention per agent.",
    author: "Titan Team",
    date: "May 10, 2026",
    readTime: "4 min read",
    category: "updates",
    tags: ["release", "v1.4", "memory", "context"],
    featured: false,
    image: "/blog/agent-memory.svg",
    views: 1678,
    comments: 21,
    likes: 189,
  },
  {
    slug: "mascot-skin-customization",
    title: "Mascot Skin Customization: Make Your Agent Truly Yours",
    excerpt:
      "A complete guide to Titan's skin system — swapping, collecting, and trading mascot skins. Plus tips from top collectors.",
    author: "Titan Team",
    date: "May 8, 2026",
    readTime: "6 min read",
    category: "tutorials",
    tags: ["mascots", "skins", "customization", "collecting"],
    featured: false,
    image: "/blog/skin-customization.svg",
    views: 1893,
    comments: 25,
    likes: 213,
  },
  {
    slug: "ai-agent-monetization-strategies",
    title: "Monetize Your AI Agents: 5 Proven Strategies from Top Creators",
    excerpt:
      "Turn your agent-building skills into revenue. Explore skill marketplace listings, subscription models, and white-label licensing.",
    author: "Titan Team",
    date: "May 5, 2026",
    readTime: "7 min read",
    category: "ai-tips",
    tags: ["monetization", "revenue", "marketplace", "business"],
    featured: false,
    image: "/blog/monetization.svg",
    views: 3102,
    comments: 42,
    likes: 345,
  },
];
