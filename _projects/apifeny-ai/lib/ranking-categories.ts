// ═══════════════════════════════════════════════════════════════════════════════
// APIFENY.AI — Workflow-Based Ranking Categories
// ═══════════════════════════════════════════════════════════════════════════════
// Curated rankings by real user workflows and pain points:
//   Strategic Planning, Ideation, Research, Coding, Review, Testing,
//   Deployment, Agent Building, Content Creation, Automation
//
// Each category defines:
//   - Which tools qualify (by best_for_pipeline_stage, category, agent role)
//   - A tailored ranking score using the Cosme algorithm
//   - Curated editorial description
// ═══════════════════════════════════════════════════════════════════════════════

export interface RankingCategory {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  /** Pipeline stage this ranking targets */
  pipelineStage: string;
  /** Which tools to include (by ID or filter function) */
  toolFilter: (tool: {
    id: string;
    slug: string;
    category: string;
    best_for_pipeline_stage?: string;
    agent_roles?: string[];
    use_cases?: string[];
    is_agentic?: boolean;
    is_multimodal?: boolean;
    supported_locales?: string[];
  }) => boolean;
  /** Number of tools to surface in this ranking */
  displayCount: number;
  /** SEO */
  meta_title?: string;
  meta_description?: string;
}

export const RANKING_CATEGORIES: RankingCategory[] = [
  {
    slug: 'strategic-planning',
    title: 'Strategic Planning',
    subtitle: 'Best AI for planning & strategy',
    description:
      'The top AI tools for strategic thinking, business planning, competitive analysis, and roadmap creation. These tools excel at synthesizing information and generating actionable strategies.',
    icon: '🧠',
    gradient: 'from-violet-500/20 to-indigo-500/10',
    pipelineStage: 'planning',
    toolFilter: (t) =>
      ['perplexity', 'gemini', 'chatgpt', 'claude'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'planning' ||
      t.best_for_pipeline_stage === 'all-rounder' ||
      ['Research & Analysis'].includes(t.category) ||
      (t.agent_roles || []).some((r) =>
        ['Research Assistant', 'Project Manager'].includes(r)
      ),
    displayCount: 8,
    meta_title: 'Best AI Tools for Strategic Planning 2026 — Apifeny AI',
    meta_description:
      'Curated ranking of the best AI tools for strategic planning, business strategy, competitive analysis, and roadmap creation. Editorially ranked for Asia.',
  },
  {
    slug: 'ideation',
    title: 'Ideation & Brainstorming',
    subtitle: 'Best AI for generating ideas',
    description:
      'AI tools that excel at brainstorming, creative ideation, concept generation, and exploring possibilities. Perfect for the start of any creative or business project.',
    icon: '💡',
    gradient: 'from-amber-500/20 to-orange-500/10',
    pipelineStage: 'ideation',
    toolFilter: (t) =>
      ['chatgpt', 'claude', 'perplexity', 'midjourney'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'planning' ||
      t.best_for_pipeline_stage === 'all-rounder' ||
      ['Design & Creative'].includes(t.category),
    displayCount: 8,
    meta_title: 'Best AI Tools for Ideation & Brainstorming 2026 — Apifeny AI',
    meta_description:
      'Discover the best AI tools for brainstorming, creative ideation, and concept generation. Editorially ranked for solopreneurs and teams in Asia.',
  },
  {
    slug: 'research',
    title: 'Research & Analysis',
    subtitle: 'Best AI for deep research',
    description:
      'AI-powered research tools that go beyond simple search. These tools synthesize information from multiple sources, cite their findings, and help you make data-driven decisions.',
    icon: '🔬',
    gradient: 'from-sky-500/20 to-cyan-500/10',
    pipelineStage: 'research',
    toolFilter: (t) =>
      ['perplexity', 'gemini', 'chatgpt', 'claude'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'research' ||
      t.best_for_pipeline_stage === 'all-rounder' ||
      ['Research & Analysis', 'Data & Analytics'].includes(t.category) ||
      (t.agent_roles || []).includes('Research Assistant'),
    displayCount: 8,
    meta_title: 'Best AI Tools for Research & Analysis 2026 — Apifeny AI',
    meta_description:
      'Top-rated AI research tools for deep analysis, data synthesis, and citation-backed answers. Ranked for Asian researchers and analysts.',
  },
  {
    slug: 'coding',
    title: 'Code & Development',
    subtitle: 'Best AI for coding',
    description:
      'The definitive ranking of AI coding assistants. From AI-native IDEs to code completion tools, agentic coders to review bots — find the perfect tool for your development workflow.',
    icon: '💻',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    pipelineStage: 'coding',
    toolFilter: (t) =>
      ['cursor', 'claude', 'chatgpt', 'devin', 'gemini'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'coding' ||
      ['Code & Development'].includes(t.category) ||
      (t.agent_roles || []).includes('Code Assistant') ||
      (t.use_cases || []).includes('Code Generation'),
    displayCount: 12,
    meta_title: 'Best AI Coding Assistants 2026 — Apifeny AI Rankings',
    meta_description:
      'Ranked: the best AI coding assistants and AI-native IDEs for 2026. Including Cursor, GitHub Copilot, Claude Code, Windsurf, and more. Editorially curated.',
  },
  {
    slug: 'code-review',
    title: 'Code Review & Quality',
    subtitle: 'Best AI for review & testing',
    description:
      'AI tools that review your code, catch bugs, suggest improvements, and ensure quality. Essential for solopreneurs shipping without a dedicated QA team.',
    icon: '✅',
    gradient: 'from-green-500/20 to-emerald-500/10',
    pipelineStage: 'review',
    toolFilter: (t) =>
      ['claude', 'chatgpt', 'cursor'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'review' ||
      t.best_for_pipeline_stage === 'testing' ||
      ['Code & Development'].includes(t.category) ||
      (t.use_cases || []).includes('Code Generation'),
    displayCount: 6,
    meta_title: 'Best AI Code Review & Testing Tools 2026 — Apifeny AI',
    meta_description:
      'Editor-ranked AI tools for code review, bug detection, testing, and quality assurance. Ship with confidence.',
  },
  {
    slug: 'deployment',
    title: 'Deployment & DevOps',
    subtitle: 'Best AI for shipping',
    description:
      'AI tools that help you deploy faster, manage infrastructure, and automate DevOps. From AI-powered CI/CD to infrastructure-as-code assistants.',
    icon: '🚀',
    gradient: 'from-blue-500/20 to-indigo-500/10',
    pipelineStage: 'deployment',
    toolFilter: (t) =>
      ['chatgpt', 'cursor', 'claude-code', 'replit-agent', 'bolt-new', 'devin'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'deployment' ||
      ['No-Code & Automation'].includes(t.category) ||
      (t.use_cases || []).some((u) => ['Automation', 'Code Generation'].includes(u)),
    displayCount: 6,
    meta_title: 'Best AI Deployment & DevOps Tools 2026 — Apifeny AI',
    meta_description:
      'Curated ranking of AI tools for deployment, DevOps, and shipping faster. Ideal for solo developers and small teams.',
  },
  {
    slug: 'agent-building',
    title: 'Agent Building',
    subtitle: 'Best AI for building agents',
    description:
      'The top frameworks, platforms, and tools for building autonomous AI agents. From orchestration frameworks to no-code agent builders.',
    icon: '🤖',
    gradient: 'from-purple-500/20 to-pink-500/10',
    pipelineStage: 'coding',
    toolFilter: (t) =>
      t.is_agentic ||
      (t.slug && ['langchain', 'llamaindex', 'crewai', 'autogpt', 'coze', 'dify', 'n8n', 'zapier-central', 'browse-ai', 'firecrawl'].includes(t.slug)),
    displayCount: 8,
    meta_title: 'Best AI Agent Building Tools 2026 — Apifeny AI',
    meta_description:
      'Ranked: the best tools and frameworks for building autonomous AI agents. From LangChain to Devin, find your agent stack.',
  },
  {
    slug: 'content-creation',
    title: 'Content Creation',
    subtitle: 'Best AI for creating content',
    description:
      'AI tools that produce written content, images, videos, and audio. Ranked by real output quality, Asia language support, and solopreneur practicality.',
    icon: '✍️',
    gradient: 'from-rose-500/20 to-pink-500/10',
    pipelineStage: 'content',
    toolFilter: (t) =>
      ['chatgpt', 'claude', 'canva-ai', 'elevenlabs', 'midjourney', 'runway', 'descript'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'content' ||
      t.best_for_pipeline_stage === 'all-rounder' ||
      ['Writing & Content', 'Image Generation', 'Video & Animation', 'Audio & Music'].includes(t.category) ||
      (t.use_cases || []).some((u) =>
        ['Content Creation', 'Design'].includes(u)
      ),
    displayCount: 10,
    meta_title: 'Best AI Content Creation Tools 2026 — Apifeny AI',
    meta_description:
      'Ranked: the best AI tools for creating written content, images, videos, and audio. Tested for output quality, Asia language support, and real solopreneur use.',
  },
  {
    slug: 'automation',
    title: 'Automation & Workflows',
    subtitle: 'Best AI for automation',
    description:
      'AI tools that automate repetitive tasks, build workflows, and connect your tools together. The force multiplier every solopreneur needs.',
    icon: '⚡',
    gradient: 'from-yellow-500/20 to-amber-500/10',
    pipelineStage: 'coding',
    toolFilter: (t) =>
      ['No-Code & Automation'].includes(t.category) ||
      (t.use_cases || []).includes('Automation') ||
      t.best_for_pipeline_stage === 'all-rounder',
    displayCount: 6,
    meta_title: 'Best AI Automation & Workflow Tools 2026 — Apifeny AI',
    meta_description:
      'Top AI tools for automating workflows, connecting apps, and streamlining repetitive tasks. Curated for solopreneurs in Asia.',
  },
  {
    slug: 'multimodal',
    title: 'Multimodal & Vision',
    subtitle: 'Best AI for images, video & audio',
    description:
      'AI tools that work across multiple modalities — text, images, video, and audio. The frontier of AI capability, ranked by real-world performance.',
    icon: '🎨',
    gradient: 'from-fuchsia-500/20 to-violet-500/10',
    pipelineStage: 'content',
    toolFilter: (t) =>
      t.is_multimodal ||
      ['Image Generation', 'Video & Animation', 'Audio & Music'].includes(t.category),
    displayCount: 8,
    meta_title: 'Best Multimodal AI Tools 2026 — Apifeny AI',
    meta_description:
      'Ranked: the best multimodal AI tools for images, video, audio, and cross-modal generation. Editorially curated for creators.',
  },
  {
    slug: 'marketing',
    title: 'Marketing & Growth',
    subtitle: 'Best AI for marketing',
    description:
      'AI tools for marketing strategy, copywriting, audience research, and campaign optimization. Perfect for solopreneurs running lean marketing operations.',
    icon: '📊',
    gradient: 'from-cyan-500/20 to-sky-500/10',
    pipelineStage: 'marketing',
    toolFilter: (t) =>
      ['chatgpt', 'perplexity', 'canva-ai'].includes(t.slug) ||
      t.best_for_pipeline_stage === 'marketing' ||
      t.best_for_pipeline_stage === 'all-rounder' ||
      ['Marketing & SEO'].includes(t.category) ||
      (t.use_cases || []).some((u) => ['Marketing'].includes(u)),
    displayCount: 8,
    meta_title: 'Best AI Marketing Tools 2026 — Apifeny AI',
    meta_description:
      'Curated ranking of AI tools for marketing, copywriting, audience research, and campaign optimization. Ranked for Asian markets.',
  },
  {
    slug: 'monetization',
    title: 'Monetization & Revenue',
    subtitle: 'Best AI for making money',
    description:
      'AI tools that help you monetize your products and services. From pricing optimization to affiliate marketing automation and revenue analytics.',
    icon: '💰',
    gradient: 'from-emerald-500/20 to-green-500/10',
    pipelineStage: 'deployment',
    toolFilter: (t) =>
      (t.use_cases || []).some((u) => ['Marketing', 'Sales'].includes(u)) ||
      ['Marketing & SEO', 'Sales & CRM', 'Customer Support'].includes(t.category) ||
      ['jasper', 'synthesia', 'murf-ai', 'intercom-ai', 'copy-ai', 'descript', 'elevenlabs', 'midjourney', 'cursor', 'perplexity'].includes(t.slug),
    displayCount: 8,
    meta_title: 'Best AI Monetization Tools 2026 — Apifeny AI',
    meta_description:
      'Top AI tools for monetization, revenue generation, and pricing optimization. Ranked for solopreneurs and indie hackers.',
  },
];

/**
 * Get a ranking category by slug.
 */
export function getRankingCategory(slug: string): RankingCategory | undefined {
  return RANKING_CATEGORIES.find((rc) => rc.slug === slug);
}

/**
 * Get all ranking slugs for static generation.
 */
export function getAllRankingSlugs(): string[] {
  return RANKING_CATEGORIES.map((rc) => rc.slug);
}
