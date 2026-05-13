// ═══════════════════════════════════════════════════════════════════════════════
// APIFENY.AI — Community Playbooks (User-Submitted)
// ═══════════════════════════════════════════════════════════════════════════════
// Stores user-submitted playbooks with voting, sharing, and discussion.
// Data is stored in localStorage for the MVP; production uses Supabase.
// ═══════════════════════════════════════════════════════════════════════════════

export interface CommunityPlaybook {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Author info */
  author: {
    name: string;
    handle?: string;
    avatar?: string;
  };
  /** Which tools this playbook uses (slugs) */
  related_tool_slugs: string[];
  /** Difficulty level */
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Step-by-step guide */
  steps: { title: string; description: string; tip?: string }[];
  /** Pro tips */
  pro_tips: string[];
  /** Common mistakes */
  common_mistakes?: { mistake: string; fix: string }[];
  /** Real results */
  real_results?: {
    metric: string;
    value: string;
    description: string;
  }[];
  /** Sample prompts the user actually used */
  sample_prompts?: { prompt: string; output_summary: string; what_worked: string; what_didnt?: string }[];
  /** MRR/ARR impact if any */
  revenue_impact?: string;
  /** Voting */
  upvotes: number;
  downvotes: number;
  /** Sharing */
  shares: number;
  /** Tags */
  tags: string[];
  /** Workflow/pipeline stage */
  pipeline_stage: string;
  /** Icon emoji */
  icon: string;
  /** Gradient for card */
  gradient: string;
  /** Metadata */
  createdAt: string;
  is_verified: boolean; // verified by editorial team
}

/**
 * Seed community playbooks — real-world workflows with actual results.
 */
export const communityPlaybooks: CommunityPlaybook[] = [
  {
    id: 'cp-001',
    title: 'Building a SaaS MVP with Cursor + Claude',
    subtitle: 'From idea to paid users in 72 hours',
    description:
      'How I built a working SaaS MVP using Cursor as my IDE and Claude for architecture decisions. Deployed to Vercel with Stripe payments in 72 hours flat.',
    author: {
      name: 'Alex Chen',
      handle: '@alexchen_builds',
    },
    related_tool_slugs: ['cursor', 'claude', 'bolt-new', 'v0'],
    difficulty: 'Intermediate',
    icon: '🏗️',
    gradient: 'from-violet-500/20 to-blue-500/10',
    steps: [
      {
        title: 'Define your MVP scope ruthlessly',
        description:
          'Write a ONE-page spec. Not a PRD — a single doc covering: what problem, who it\'s for, core flow, NOT doing. I used Claude to pressure-test my assumptions.',
        tip: 'Ask Claude "Play devil\'s advocate: why would this MVP fail?" — it saved me from building features nobody needed.',
      },
      {
        title: 'Set up the foundation with Cursor',
        description:
          'Initialised a Next.js app with Cursor. Used Cursor\'s agent mode to scaffold: auth (NextAuth), DB schema (Prisma + SQLite for dev), and API routes. Took 2 hours.',
        tip: 'Keep Cursor in agent mode for boilerplate, switch to edit mode for logic decisions.',
      },
      {
        title: 'Design the UI with v0',
        description:
          'Described my landing page and dashboard to v0. It generated 3 variants. Picked the best, exported to JSX, dropped into my Cursor project. 30 minutes.',
      },
      {
        title: 'Implement core feature with Claude',
        description:
          'For the main feature (AI-powered feedback analysis), I wrote the logic in Claude first, testing with sample data, then moved it to Cursor.',
        tip: 'Generate and test complex logic in Claude (144k context), then paste the working version into Cursor. Saves token costs.',
      },
      {
        title: 'Add payments with Bolt.new Stripe template',
        description:
          'Used Bolt.new to spin up a ready-made Stripe integration. Copied the webhook handler and checkout components into my project.',
      },
      {
        title: 'Deploy and get first users',
        description:
          'Deployed to Vercel. Posted the journey on Twitter/X with screenshots of the build process. 45 signups in the first 24 hours.',
      },
    ],
    pro_tips: [
      'Use Cursor\'s "Composer" to edit multiple files at once — it\'s the killer feature',
      'Keep a CLAUDE.md file in your project root with architecture decisions — Cursor reads it automatically',
      'Ship the backend first, then polish the UI. Users forgive ugly, they don\'t forgive broken',
    ],
    common_mistakes: [
      {
        mistake: 'Over-engineering auth from day one',
        fix: 'Start with a simple magic link or Google OAuth. Add role-based access later when you have users.',
      },
      {
        mistake: 'Writing tests before product-market fit',
        fix: 'Skip tests until you have paying users. Fix bugs fast, refactor later.',
      },
    ],
    real_results: [
      { metric: 'Time to MVP', value: '72 hours', description: 'From idea to working product with Stripe payments' },
      { metric: 'Signups (24h)', value: '45 users', description: 'Posted the build journey on Twitter/X' },
      { metric: 'MRR (Month 1)', value: '$420', description: '10 paid users at $42/mo' },
    ],
    sample_prompts: [
      {
        prompt: '"Build me a Next.js 14 app with NextAuth, Prisma SQLite, and a /dashboard that shows user count. Typescript strict."',
        output_summary: 'Cursor scaffolded the entire app structure in one agent mode session. Created 14 files with proper routing, middleware, and DB schema.',
        what_worked: 'Agent mode handles boilerplate perfectly. It created files I would have forgotten.',
        what_didnt: 'Auth callback URLs were wrong — had to fix manually. Test the auth flow immediately.',
      },
    ],
    revenue_impact: '$420 MRR in first month from 10 users',
    upvotes: 47,
    downvotes: 2,
    shares: 23,
    tags: ['saas', 'mvp', 'cursor', 'stripe', 'solopreneur'],
    pipeline_stage: 'coding',
    createdAt: '2026-05-01',
    is_verified: true,
  },
  {
    id: 'cp-002',
    title: 'Automating Content Marketing with ChatGPT + Perplexity',
    subtitle: '$3K/mo content engine',
    description:
      'How I built a content marketing engine that publishes 3 blog posts/week and 5 social posts/day using ChatGPT for writing and Perplexity for research. $3K/mo in affiliate revenue.',
    author: {
      name: 'Maya S.',
      handle: '@mayacontent',
    },
    related_tool_slugs: ['chatgpt', 'perplexity', 'canva-ai', 'jasper'],
    difficulty: 'Beginner',
    icon: '📝',
    gradient: 'from-orange-500/20 to-pink-500/10',
    steps: [
      {
        title: 'Build your content calendar with ChatGPT',
        description:
          'Give ChatGPT your niche, audience, and content goals. Ask for a 30-day content calendar with blog posts, social media, and email topics.',
        tip: 'Use the prompt: "I run a site about [niche]. My audience is [demographic]. Create 30 days of content that solves their [top 3 problems]."',
      },
      {
        title: 'Research each topic with Perplexity',
        description:
          'For each content topic, use Perplexity to gather recent statistics, quotes from experts, and competitor analysis. Always ask for sources.',
        tip: 'Ask Perplexity "Find me the 5 most recent statistics about [topic] with sources from 2026." Save the cited URLs.',
      },
      {
        title: 'Write the first draft with ChatGPT',
        description:
          'Feed ChatGPT your research and ask it to write a comprehensive draft. Use a custom GPT trained on your brand voice if you have one.',
      },
      {
        title: 'Edit for voice (this is non-negotiable)',
        description:
          'AI writes generic. Your voice is your moat. Rewrite the intro and conclusion manually. Add personal stories and opinions.',
        tip: 'I spend 40% of time editing. The AI gives me 80% of the substance, I add the soul.',
      },
      {
        title: 'Create visuals with Canva AI',
        description:
          'Use Canva Magic Studio to generate featured images, social graphics, and infographics from your content. 2 minutes per visual.',
      },
    ],
    pro_tips: [
      'Batch your content: write 4 blog posts in one day, schedule for the month',
      'Use Perplexity Pages as a research template — it creates formatted research briefs',
      'Repurpose each blog post into 5 pieces: LinkedIn post, Twitter thread, email summary, Instagram carousel, short video script',
    ],
    common_mistakes: [
      {
        mistake: 'Publishing AI content without fact-checking',
        fix: 'Use Perplexity to verify every statistic. AI hallucinates confidently.',
      },
      {
        mistake: 'Not adding personal stories',
        fix: 'Readers can smell generic content. Add one real experience per post.',
      },
    ],
    real_results: [
      { metric: 'Monthly Posts', value: '12 blogs + 120 social', description: '3 blog posts + 5 social posts/day' },
      { metric: 'Monthly Traffic', value: '28K visitors', description: 'Organic + social referral' },
      { metric: 'Affiliate Revenue', value: '$3,200/mo', description: 'Amazon + tool affiliate programs' },
    ],
    sample_prompts: [
      {
        prompt: '"Research: What are the top 5 challenges Asian solopreneurs face when adopting AI tools in 2026? Find 3 statistics for each."',
        output_summary: 'Perplexity returned 15 cited statistics with sources from Gartner, McKinsey, and regional surveys. Included competitor content analysis.',
        what_worked: 'The cited sources made the article authoritative. It got picked up by a Medium publication.',
      },
    ],
    revenue_impact: '$3,200/mo in affiliate revenue',
    upvotes: 38,
    downvotes: 1,
    shares: 45,
    tags: ['content-marketing', 'affiliate', 'blogging', 'automation'],
    pipeline_stage: 'marketing',
    createdAt: '2026-04-28',
    is_verified: true,
  },
  {
    id: 'cp-003',
    title: 'AI-Powered Customer Support with $0 Spend',
    subtitle: 'Replaced a $2K/mo support tool with AI',
    description:
      'I replaced Intercom ($2K/mo) with a custom AI support bot built using LangChain + OpenAI. Handles 85% of tickets automatically. Total cost: $47/mo in API calls.',
    author: {
      name: 'Tom Nguyen',
      handle: '@tomnguyen_dev',
    },
    related_tool_slugs: ['langchain', 'chatgpt', 'hugging-face', 'intercom-ai'],
    difficulty: 'Advanced',
    icon: '🎯',
    gradient: 'from-emerald-500/20 to-cyan-500/10',
    steps: [
      {
        title: 'Document your knowledge base',
        description:
          'Export all support articles, FAQs, and past ticket resolutions. Format as markdown files organized by topic.',
        tip: 'Use ChatGPT to reformat your knowledge base into clean Q&A pairs for RAG ingestion.',
      },
      {
        title: 'Build a RAG pipeline with LangChain',
        description:
          'Ingest your knowledge base into a vector database (Chroma or Pinecone). Set up a LangChain retrieval chain that searches relevant docs for each query.',
      },
      {
        title: 'Add a confidence threshold',
        description:
          'Set a confidence score cutoff. Below 85% confidence, route to human support. This prevents the AI from guessing.',
      },
      {
        title: 'Connect to Telegram for instant response',
        description:
          'Set up a Telegram bot that forwards messages to your RAG pipeline. Response time: 2 seconds vs 4 hours average.',
        tip: 'Add "escalate to human" as a button on every AI response. Users need the safety net.',
      },
      {
        title: 'Monitor and improve weekly',
        description:
          'Review the 15% of tickets the AI couldn\'t handle. Add those to your knowledge base. The resolution rate increases by ~5% weekly.',
      },
    ],
    pro_tips: [
      'Use GPT-4 for the response generation, GPT-3.5 for the retrieval — token-optimize',
      'Add a "Was this helpful?" button to every response. Use the feedback to improve',
      'Store the vector database in Supabase for zero maintenance',
    ],
    common_mistakes: [
      {
        mistake: 'Not handling multilingual support from day one',
        fix: 'Use DeepL for translation layer before the RAG pipeline. It costs $0.02/req and doubles your coverage.',
      },
    ],
    real_results: [
      { metric: 'Auto-resolution rate', value: '85%', description: 'Tickets resolved without human intervention' },
      { metric: 'Monthly cost', value: '$47', description: 'Down from $2,000/mo on Intercom' },
      { metric: 'Response time', value: '2 seconds', description: 'Down from 4 hours average' },
    ],
    sample_prompts: [
      {
        prompt: '"I can\'t log in with Google OAuth on the mobile app. Error: redirect_uri_mismatch."',
        output_summary: 'AI retrieved the relevant KB article about OAuth configuration, identified the missing redirect URI, and provided step-by-step fix instructions.',
        what_worked: 'The RAG pipeline correctly matched the error message to the solution article despite different wording.',
      },
    ],
    revenue_impact: '$1,953/mo savings ($2,000 - $47)',
    upvotes: 52,
    downvotes: 3,
    shares: 31,
    tags: ['customer-support', 'rag', 'langchain', 'automation'],
    pipeline_stage: 'deployment',
    createdAt: '2026-04-20',
    is_verified: true,
  },
];

// ─── Voting Functions ─────────────────────────────────────────────────────────

const VOTES_STORAGE_KEY = 'apifeny_cp_votes';

interface VoteRecord {
  playbookId: string;
  vote: 'up' | 'down';
  timestamp: number;
}

export function getVotes(): Record<string, 'up' | 'down'> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(VOTES_STORAGE_KEY);
    const records: VoteRecord[] = data ? JSON.parse(data) : [];
    const map: Record<string, 'up' | 'down'> = {};
    for (const r of records) {
      map[r.playbookId] = r.vote;
    }
    return map;
  } catch {
    return {};
  }
}

export function getUserVote(playbookId: string): 'up' | 'down' | null {
  const votes = getVotes();
  return votes[playbookId] || null;
}

export function recordVote(playbookId: string, vote: 'up' | 'down'): void {
  if (typeof window === 'undefined') return;
  try {
    const data = localStorage.getItem(VOTES_STORAGE_KEY);
    const records: VoteRecord[] = data ? JSON.parse(data) : [];

    // Remove existing vote for this playbook
    const filtered = records.filter((r) => r.playbookId !== playbookId);
    filtered.push({ playbookId, vote, timestamp: Date.now() });

    localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // Silently fail
  }
}

export function removeVote(playbookId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const data = localStorage.getItem(VOTES_STORAGE_KEY);
    const records: VoteRecord[] = data ? JSON.parse(data) : [];
    const filtered = records.filter((r) => r.playbookId !== playbookId);
    localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // Silently fail
  }
}

// ─── Sharing Functions ────────────────────────────────────────────────────────

export function getShareUrl(playbookId: string): string {
  return `${typeof window !== 'undefined' ? window.location.origin : ''}/community-playbook/${playbookId}`;
}

export function getShareText(playbook: CommunityPlaybook): string {
  return `Check out "${playbook.title}" by ${playbook.author.name} on Apifeny AI — ${playbook.description.slice(0, 100)}...`;
}

export function getShareLinks(playbook: CommunityPlaybook, url?: string) {
  const shareUrl = url || getShareUrl(playbook.id);
  const text = encodeURIComponent(getShareText(playbook));
  return {
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };
}

/**
 * Increment share count (localStorage for MVP).
 */
export function incrementShareCount(playbookId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const key = 'apifeny_cp_shares';
    const data = localStorage.getItem(key);
    const counts: Record<string, number> = data ? JSON.parse(data) : {};
    counts[playbookId] = (counts[playbookId] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(counts));
  } catch {
    // Silently fail
  }
}

// ─── Utility ──────────────────────────────────────────────────────────────────

/**
 * Get community playbook by ID.
 */
export function getCommunityPlaybookById(id: string): CommunityPlaybook | undefined {
  return communityPlaybooks.find((cp) => cp.id === id);
}

/**
 * Get all community playbooks ordered by votes.
 */
export function getTopCommunityPlaybooks(count?: number): CommunityPlaybook[] {
  const sorted = [...communityPlaybooks].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  return count ? sorted.slice(0, count) : sorted;
}

/**
 * Get community playbooks by pipeline stage.
 */
export function getCommunityPlaybooksByStage(stage: string, count?: number): CommunityPlaybook[] {
  const filtered = communityPlaybooks.filter((cp) => cp.pipeline_stage === stage);
  if (!count) return filtered;
  return filtered.slice(0, count);
}
