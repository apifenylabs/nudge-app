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
  /** Creation date (ISO string) */
  createdAt: string;
  /** Verified by editors */
  is_verified: boolean;
}

// ─── Seed Data ─────────────────────────────────────────────────────────────────

export const communityPlaybooks: CommunityPlaybook[] = [
  // ════════════════════════════════════════════════════
  // EXISTING PLAYBOOK 1: Perfect Pitching with ChatGPT
  // ════════════════════════════════════════════════════
  {
    id: 'perfect-pitching-chatgpt',
    title: 'Perfect Pitching with ChatGPT',
    subtitle: 'Land a $5K retainer client in one month using AI-powered sales',
    description:
      'I used ChatGPT to research, write, and personalize 50 outreach emails in a single afternoon. Landed 3 meetings, two proposals, and one $5K/mo retainer client. Total AI cost: $0 (ChatGPT Free).',
    author: {
      name: 'Marcus Rivera',
      handle: '@marcus_rivera',
    },
    related_tool_slugs: ['chatgpt', 'perplexity'],
    difficulty: 'Beginner',
    icon: '🎯',
    gradient: 'from-amber-500/20 to-orange-500/10',
    steps: [
      {
        title: 'Research 10 target prospects with Perplexity',
        description:
          'For each prospect, ask Perplexity to find their recent news, product launches, funding rounds, and public pain points. Create a briefing doc for each.',
        tip: 'Search for "[company name] challenges 2026" and "[company name] recent news" to find current pain points.',
      },
      {
        title: 'Generate personalized outreach with ChatGPT',
        description:
          'Feed each briefing doc into ChatGPT with: "Write a cold email to [CEO name] at [company] offering my AI consulting services. Reference their recent [specific challenge]. Be concise and value-first."',
        tip: 'Ask ChatGPT to generate 3 subject line variants per email. Open rates jumped from 38% to 62%.',
      },
      {
        title: 'Create a follow-up sequence',
        description:
          'Use ChatGPT to write a 4-email follow-up sequence: day 3 (value add article), day 7 (case study), day 14 (breaking news hook), day 21 (breakup email).',
      },
      {
        title: 'A/B test subject lines',
        description:
          'Run 2-3 subject line variants per batch. Track open rates manually (it\'s only 50 emails). Double down on what works.',
        tip: 'Ask ChatGPT: "Write 10 subject lines for a cold email to [industry] CEOs. Use curiosity gaps and specific results."',
      },
      {
        title: 'Close with an AI-crafted proposal',
        description:
          'After the intro call, use ChatGPT to generate a tailored proposal: scope, timeline, pricing. Feed it the call notes for maximum relevance.',
      },
    ],
    pro_tips: [
      'Use Perplexity for research, ChatGPT for writing — they complement each other perfectly',
      'Keep a "Cold Email Playbook" doc with your best-performing templates. Update monthly with AI help',
      'Personalization beyond [name] and [company] increases reply rates by 3x — mention specific recent events',
    ],
    common_mistakes: [
      {
        mistake: 'Using AI to write generic outreach',
        fix: 'Always add specific context: "Reference their Series A announcement last month" or "Mention their new product launch."',
      },
      {
        mistake: 'Skipping the research step',
        fix: '5 minutes of Perplexity research per prospect = 10x better emails. Non-negotiable.',
      },
    ],
    real_results: [
      { metric: 'Emails sent', value: '50', description: 'With personalized AI research for each' },
      { metric: 'Meetings booked', value: '3', description: '6% conversion rate (above 2% industry average)' },
      { metric: 'Retainer signed', value: '$5,000/mo', description: 'One retainer client from the campaign' },
    ],
    sample_prompts: [
      {
        prompt: '"Write a cold email to a SaaS founder who just raised a $2M seed round. Mention their AI product feature as context. I offer AI workflow consulting."',
        output_summary: 'ChatGPT generated a 4-paragraph email: subject line (curiosity gap), compliment on recent funding, specific value prop for post-funding companies, low-friction CTA (15-min call).',
        what_worked: 'The "congratulations on the funding" opener had a 70% open rate.',
        what_didnt: 'One variant that was too direct ("I can save you $10K/mo") got zero replies. Felt like spam.',
      },
    ],
    revenue_impact: '$5,000/mo retainer client (first month)',
    upvotes: 87,
    downvotes: 2,
    shares: 45,
    tags: ['sales', 'outreach', 'email', 'cold-email'],
    pipeline_stage: 'marketing',
    createdAt: '2026-04-15',
    is_verified: true,
  },

  // ════════════════════════════════════════════════════
  // EXISTING PLAYBOOK 2: TikTok Content Factory
  // ════════════════════════════════════════════════════
  {
    id: 'tiktok-content-factory',
    title: 'TikTok Content Factory',
    subtitle: 'From 0 to 150K followers in 60 days using AI-generated scripts',
    description:
      'I built a TikTok content factory using ChatGPT for scripts, Canva AI for visuals, and ElevenLabs for voiceovers. Grew from 0 to 150K followers in 60 days posting 3x/day. Total cost: $47/mo.',
    author: {
      name: 'Priya Sharma',
      handle: '@priya_growth',
    },
    related_tool_slugs: ['chatgpt', 'canva-ai', 'elevenlabs'],
    difficulty: 'Beginner',
    icon: '📱',
    gradient: 'from-pink-500/20 to-rose-500/10',
    steps: [
      {
        title: 'Generate 30-day content calendar with ChatGPT',
        description:
          'Define your niche and target audience. Ask ChatGPT for 90 content ideas (30 days x 3 posts/day) categorized by: educational, entertaining, trending, and promotional.',
        tip: 'Categories matter: 40% educational, 30% entertaining, 20% trending, 10% promotional is the sweet spot.',
      },
      {
        title: 'Create AI script templates',
        description:
          'For each content category, ask ChatGPT to create a script template. Educational: hook → problem → solution → CTA. Entertaining: hook → setup → punchline → CTA.',
      },
      {
        title: 'Generate AI voiceovers with ElevenLabs',
        description:
          'Feed your scripts into ElevenLabs. Choose a voice that matches your brand personality. (I use "Rachel" for educational content and "Mark" for trending content.)',
        tip: 'Use a different voice per content category. It creates subconscious brand recognition.',
      },
      {
        title: 'Create visuals with Canva AI',
        description:
          'Use Canva Magic Studio: generate background images with AI, auto-caption your videos, and create consistent branded templates.',
      },
      {
        title: 'Schedule and post using native tools',
        description:
          'Post 3x/day at optimal times: 7AM, 12PM, 8PM. Use TikTok\'s native scheduler or a free tool like Later.',
      },
    ],
    pro_tips: [
      'Use ChatGPT to analyze your top-performing videos: "Based on these 10 best-performing videos, what patterns do you see?"',
      'Create 20 scripts in one ChatGPT session. Batch recording saves hours.',
      'ElevenLabs voice isolation removes background noise from on-location recordings — game changer.',
    ],
    common_mistakes: [
      {
        mistake: 'Using AI voices without editing pacing',
        fix: 'Add pauses, emphasis, and tone changes in ElevenLabs. Robotic voices kill engagement.',
      },
      {
        mistake: 'Posting without trend analysis',
        fix: 'Ask ChatGPT weekly: "What are the top 5 trending sounds/hashtags in [niche] right now?" Incorporate into next batch.',
      },
    ],
    real_results: [
      { metric: 'Followers', value: '150K', description: 'From 0 in 60 days' },
      { metric: 'Monthly cost', value: '$47', description: 'ChatGPT ($20) + Canva ($13) + ElevenLabs ($14)' },
      { metric: 'Avg views/video', value: '12K', description: 'By day 30, 5x higher than first week' },
    ],
    sample_prompts: [
      {
        prompt: '"Write 5 TikTok scripts about AI tools for small business owners. Each under 60 seconds. Hook: shocking statistic. Format: hook → problem → solution → CTA."',
        output_summary: 'ChatGPT generated 5 scripts with 2 hooks each, 3 key points per script, and specific CTAs (follow, save, comment).',
        what_worked: 'The "shocking statistic" hooks (e.g., "80% of small businesses waste 20 hours/week on admin") got 3x more saves.',
        what_didnt: 'Scripts over 60 seconds had 50%+ drop-off. Kept them at 45-55 seconds after analysis.',
      },
    ],
    revenue_impact: 'Brand deals worth $2K/mo starting month 3',
    upvotes: 73,
    downvotes: 5,
    shares: 38,
    tags: ['tiktok', 'content', 'growth', 'social-media', 'video'],
    pipeline_stage: 'content',
    createdAt: '2026-04-18',
    is_verified: true,
  },

  // ════════════════════════════════════════════════════
  // EXISTING PLAYBOOK 3: AI Support Bot (LangChain + OpenAI)
  // ════════════════════════════════════════════════════
  {
    id: 'ai-support-bot-langchain',
    title: 'AI Support Bot with LangChain',
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

  // ════════════════════════════════════════════════════
  // NEW PLAYBOOK 4: Deep Research with Perplexity + Gemini
  // ════════════════════════════════════════════════════
  {
    id: 'deep-research-perplexity-gemini',
    title: 'Deep Research with Perplexity + Gemini',
    subtitle: 'Competitive analysis in 2 hours using AI-powered multi-source research',
    description:
      'I use Perplexity for real-time source-cited research combined with Gemini\'s 1M context window to analyze entire competitor ecosystems. This workflow helped me generate a 50-page competitive analysis report in 2 hours that my client paid $8K for.',
    author: {
      name: 'Sarah Chen',
      handle: '@sarahchen_research',
    },
    related_tool_slugs: ['perplexity', 'gemini', 'chatgpt'],
    difficulty: 'Intermediate',
    icon: '🔍',
    gradient: 'from-sky-500/20 to-cyan-500/10',
    steps: [
      {
        title: 'Define research scope in ChatGPT',
        description:
          'Start with ChatGPT to structure your research: define competitors, key questions, and metrics. Get a research template.',
        tip: 'Ask ChatGPT: \'Create a competitive analysis framework for [industry]. Include: market share, pricing, features, tech stack, customer sentiment, and growth strategy.\'',
      },
      {
        title: 'Deep competitor search with Perplexity',
        description:
          'For each competitor, run a Perplexity Pro search with custom instruction: \'Act as a market analyst. Find funding rounds, product launches, customer reviews, and strategic moves from the last 6 months. Cite every source.\'',
        tip: 'Create a Perplexity Collection per competitor to track ongoing research. Use \'Pro Search\' for deep dives.',
      },
      {
        title: 'Batch analyze competitor data with Gemini',
        description:
          'Export Perplexity results and paste all competitor data into Gemini. Ask Gemini to: compare pricing, identify feature gaps, analyze customer sentiment, and build a competitive positioning map.',
        tip: 'Gemini handles 1M context — dump all competitors at once and ask for a comparative analysis table.',
      },
      {
        title: 'Validate with primary sources',
        description:
          'Ask Perplexity to find actual customer reviews from G2, Capterra, Reddit, and Twitter. Compare AI-generated analysis with real user sentiment.',
      },
      {
        title: 'Synthesize into client-ready report',
        description:
          'Use ChatGPT to combine all findings into a structured report: executive summary, competitive landscape, market sizing, customer personas, trends, and recommendations.',
      },
    ],
    pro_tips: [
      'Use Perplexity\'s \'Focus\' mode for different sources: Academic for research papers, Reddit for honest opinions, News for recent developments',
      'Always ask Perplexity: \'What\'s the data source and publication date?\' to avoid stale info',
      'Feed your final report back into ChatGPT and ask \'What ethical concerns does this analysis raise?\' — catches blind spots',
    ],
    common_mistakes: [
      {
        mistake: 'Accepting AI-generated numbers without verification',
        fix: 'Cross-reference every statistic with Perplexity\'s source URLs. AI can hallucinate market data.',
      },
      {
        mistake: 'Researching in silos instead of comparatively',
        fix: 'Always ask for side-by-side comparisons. \'Compare these 5 competitors across pricing, features, and customer satisfaction.\'',
      },
    ],
    real_results: [
      { metric: 'Report time', value: '2 hours', description: 'From 2 weeks manually (90% faster)' },
      { metric: 'Client value', value: '$8,000', description: 'Paid for competitive analysis report' },
      { metric: 'Sources verified', value: '45+', description: 'Cited sources across 8 competitors' },
    ],
    sample_prompts: [
      {
        prompt: '"Analyze these 5 competitors in the AI writing space: Jasper, Copy.ai, Writesonic, Rytr, and Sudowrite. Compare pricing, features, target audience, and recent updates from the last 3 months."',
        output_summary: 'Perplexity returned 15 cited sources per competitor. Gemini then synthesized a comparison table across 12 dimensions. ChatGPT wrote the final analysis.',
        what_worked: 'Perplexity found pricing pages from 2026 that were hard to locate manually. Gemini spotted a feature gap none of us noticed.',
      },
    ],
    revenue_impact: '$8,000 consulting fee for one report',
    upvotes: 44,
    downvotes: 1,
    shares: 22,
    tags: ['research', 'competitive-analysis', 'perplexity', 'gemini', 'consulting'],
    pipeline_stage: 'research',
    createdAt: '2026-05-01',
    is_verified: true,
  },

  // ════════════════════════════════════════════════════
  // NEW PLAYBOOK 5: Building AI Agents with LangChain + Claude
  // ════════════════════════════════════════════════════
  {
    id: 'ai-agents-langchain-claude',
    title: 'Building AI Agents with LangChain + Claude',
    subtitle: 'Architecture patterns for autonomous AI agents that work',
    description:
      'I built a multi-agent system using LangChain for orchestration and Claude (via API) for reasoning. The system handles customer research, content drafting, and social media posting autonomously. Here\'s the architecture and prompts that made it work.',
    author: {
      name: 'Alex Kowalski',
      handle: '@alex_agent_builder',
    },
    related_tool_slugs: ['langchain', 'claude', 'chatgpt'],
    difficulty: 'Advanced',
    icon: '🤖',
    gradient: 'from-purple-500/20 to-violet-500/10',
    steps: [
      {
        title: 'Design multi-agent architecture',
        description:
          'Define your agent roles: Researcher Agent (gathers data), Writer Agent (drafts content), Reviewer Agent (quality check), Publisher Agent (schedules output). Each agent has a system prompt that defines its persona, tools, and constraints.',
        tip: 'Use a Supervisor Agent pattern — one agent coordinates the others, delegates tasks, and handles errors. LangChain makes this straightforward.',
      },
      {
        title: 'Build the LangChain orchestration layer',
        description:
          'Use LangChain\'s AgentExecutor with tool definitions for each sub-agent. Configure: memory (conversation buffer), tools (web search, file access, API calls), and callbacks (logging, error handling).',
      },
      {
        title: 'Configure Claude as the reasoning engine',
        description:
          'Claude excels at multi-step reasoning. Set up Claude as the primary agent with: system prompt (persona + constraints), tool definitions (what the agent can use), and memory (state management).',
      },
      {
        title: 'Implement human-in-the-loop checkpoints',
        description:
          'Before publishing anything, insert a human review step. The agent generates content, flags it for review, and waits for approval. This prevents autonomous mistakes from reaching production.',
      },
      {
        title: 'Add self-healing and monitoring',
        description:
          'Implement error handling: if an agent fails, the supervisor retries with a different approach. Add logging to track: tasks completed, error rates, token usage, and quality scores.',
      },
      {
        title: 'Deploy and measure',
        description:
          'Deploy as a cron job or webhook. Track: tasks completed per day, error rate, human intervention rate (target <10%), and cost per task.',
      },
    ],
    pro_tips: [
      'Use Claude\'s 200K context to store your entire codebase as context — agents understand the full system',
      'Set max token limits per agent to prevent runaway costs. My budget: $0.50/task max for Claude',
      'Use structured output (JSON mode) for agent responses — makes parsing and routing reliable',
      'Log all agent decisions to a LangSmith dashboard for debugging and optimization',
    ],
    common_mistakes: [
      {
        mistake: 'Over-complicating the architecture with too many agents',
        fix: 'Start with 2 agents: Orchestrator + Worker. Add specialized agents only when you see a clear bottleneck.',
      },
      {
        mistake: 'Not setting proper timeouts and retry limits',
        fix: 'Agents can loop infinitely on complex tasks. Set max_iterations=10 and a 30-second timeout per agent call.',
      },
    ],
    real_results: [
      { metric: 'Tasks automated', value: '12/day', description: 'Customer research, content drafting, social posts' },
      { metric: 'Human intervention', value: '8%', description: 'Only 8% of tasks need manual review' },
      { metric: 'Monthly cost', value: '$120', description: 'API costs for Claude + LangChain + vector DB' },
    ],
    sample_prompts: [
      {
        prompt: '"Research [topic], draft a 500-word blog post, check it for accuracy, and schedule it for tomorrow at 9 AM. Use the following context: [brand guidelines document, target audience profile, SEO keywords]."',
        output_summary: 'The supervisor agent decomposed this into 4 sub-tasks: research (Researcher Agent with web search), draft (Writer Agent with Claude), review (Reviewer Agent checking facts and tone), schedule (Publisher Agent with API call).',
        what_worked: 'The structured decomposition into sub-agents reduced errors by 60% compared to a single agent doing everything.',
        what_didnt: 'The first version used gpt-3.5-turbo for the reviewer. It missed factual errors. Switching to Claude for review caught 3x more issues.',
      },
    ],
    revenue_impact: 'Replaced a $3K/mo virtual assistant with a $120/mo AI agent system',
    upvotes: 38,
    downvotes: 2,
    shares: 19,
    tags: ['agents', 'langchain', 'claude', 'automation', 'architecture'],
    pipeline_stage: 'deployment',
    createdAt: '2026-05-05',
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
