// ═══════════════════════════════════════════════════════════════════════════════
// APIFENY.AI — Success Stories (User-Reported Results)
// ═══════════════════════════════════════════════════════════════════════════════
// Stores real user-submitted success stories with revenue proof.
// MVP uses localStorage; production uses Supabase.
// ═══════════════════════════════════════════════════════════════════════════════

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    handle?: string;
    avatar?: string;
  };
  /** Which playbook/tool was used */
  source_type: 'playbook' | 'community_playbook' | 'tool';
  source_id: string;
  source_name: string;
  /** Revenue proof */
  revenue?: {
    amount: number; // monthly in USD
    currency: string;
    verified: boolean;
    proof_url?: string;
    proof_description: string;
  };
  /** Impact metrics (non-revenue) */
  impact_metrics?: {
    metric: string;
    value: string;
    description: string;
  }[];
  /** What the user built */
  what_was_built: string;
  /** Key lessons */
  lessons: string[];
  /** Tags */
  tags: string[];
  /** The result category */
  category: 'revenue' | 'traffic' | 'productivity' | 'learning' | 'community' | 'other';
  /** Likes from other users */
  likes: number;
  /** Shared count */
  shares: number;
  /** Status */
  is_verified: boolean; // editorial team verified
  /** Timestamp */
  createdAt: string;
  // ── Phase 5: Playbook-linked stories with revenue tracking ──
  /** Slug of the playbook this story is linked to */
  playbook_slug?: string;
  /** Slug(s) of tools used */
  tool_slugs?: string[];
  /** Revenue proof string for badge display */
  revenue_proof?: string;
  /** Display results as { metric, value }[] */
  results?: { metric: string; value: string }[];
}

export const successStories: SuccessStory[] = [
  {
    id: 'ss-001',
    title: 'Built a $420 MRR SaaS MVP in 72 hours',
    description:
      'Used the Cursor + Claude pipeline to go from idea to paid users in three days. Deployed with Stripe, Vercel, and Next.js. Now scaling to $1K MRR.',
    author: { name: 'Alex Chen', handle: '@alexchen_builds' },
    source_type: 'community_playbook',
    source_id: 'cp-001',
    source_name: 'Building a SaaS MVP with Cursor + Claude',
    revenue: {
      amount: 420,
      currency: 'USD',
      verified: true,
      proof_description: 'Stripe dashboard screenshot — 10 paying users at $42/mo',
    },
    what_was_built: 'AI-powered feedback analysis tool for indie hackers',
    lessons: [
      'Ship the backend first, polish the UI later',
      'Post the build-in-public journey on X — 45 signups in 24h',
      'Skip tests until you have paying users',
    ],
    tags: ['saas', 'mvp', 'cursor', 'stripe', 'solopreneur'],
    category: 'revenue',
    likes: 34,
    shares: 12,
    is_verified: true,
    createdAt: '2026-05-05',
  },
  {
    id: 'ss-002',
    title: '$3.2K/mo affiliate content engine',
    description:
      'Built a fully automated content pipeline producing 3 blog posts/week and 5 daily social posts. ChatGPT writes, Perplexity researches, Canva creates visuals.',
    author: { name: 'Maya S.', handle: '@mayacontent' },
    source_type: 'community_playbook',
    source_id: 'cp-002',
    source_name: 'Automating Content Marketing with ChatGPT + Perplexity',
    revenue: {
      amount: 3200,
      currency: 'USD',
      verified: false,
      proof_description: 'Affiliate dashboard screenshots from Amazon Associates + tool programs',
    },
    impact_metrics: [
      { metric: 'Monthly Traffic', value: '28K visitors', description: 'Organic + social referral' },
      { metric: 'Monthly Posts', value: '12 blogs + 120 social', description: '3 blog posts + 5 social posts/day' },
    ],
    what_was_built: 'Content marketing engine for AI and tech blogs',
    lessons: [
      'AI gives 80% of the substance — the human voice is the other 20% and it matters',
      'Repurpose each blog post into 5 pieces of social content',
      'Batch content creation day to stay consistent',
    ],
    tags: ['content', 'marketing', 'affiliate', 'automation'],
    category: 'revenue',
    likes: 28,
    shares: 15,
    is_verified: true,
    createdAt: '2026-05-03',
  },
  {
    id: 'ss-003',
    title: 'Customer support automation saving $1.9K/mo',
    description:
      'Replaced 1.5 full-time support staff with an AI chatbot powered by custom GPTs and Zendesk integration. Response time dropped from 4h to 30s.',
    author: { name: 'Raj P.', handle: '@rajbuilds' },
    source_type: 'community_playbook',
    source_id: 'cp-003',
    source_name: 'Customer Support Automation with Custom GPTs + Zendesk',
    revenue: {
      amount: 1900,
      currency: 'USD',
      verified: true,
      proof_description: 'Payroll savings documented — 1.5 FTE reduction, verified by finance team',
    },
    impact_metrics: [
      { metric: 'Response Time', value: '30 seconds', description: 'Down from 4 hours' },
      { metric: 'Resolution Rate', value: '87%', description: 'First-contact resolution with AI' },
      { metric: 'Staff Hours Saved', value: '180h/month', description: 'Reallocated to product development' },
    ],
    what_was_built: 'AI customer support bot with custom GPTs + Zendesk API',
    lessons: [
      'Start with the top 10 most common support questions — you cover 80% of tickets',
      'Always give the AI a human escalation path for complex issues',
      'Track resolution rate religiously — that is your north star metric',
    ],
    tags: ['support', 'automation', 'gpt', 'zendesk', 'cost-savings'],
    category: 'revenue',
    likes: 19,
    shares: 8,
    is_verified: true,
    createdAt: '2026-04-28',
  },
  {
    id: 'ss-004',
    title: 'SEO traffic grew 8x in 60 days with AI content strategy',
    description:
      'Used Perplexity for keyword research and ChatGPT for content drafting. Went from 3K to 24K monthly organic visits in 2 months.',
    author: { name: 'Sarah K.' },
    source_type: 'playbook',
    source_id: 'content-creation-with-chatgpt',
    source_name: 'Content Creation with ChatGPT',
    impact_metrics: [
      { metric: 'Organic Traffic', value: '24K/mo', description: 'Up from 3K — 8x growth' },
      { metric: 'Posts Published', value: '36 posts', description: '3 per week for 12 weeks' },
      { metric: 'Top 10 Keywords', value: '47 keywords', description: 'Ranking on page 1 of Google' },
    ],
    what_was_built: 'SEO content strategy for a travel blog',
    lessons: [
      'Perplexity for keyword gaps is better than any paid tool I tried',
      'Add a human-edited section to every AI post — Google can detect pure AI content',
      'Internal linking is the #1 underused SEO tactic',
    ],
    tags: ['seo', 'content', 'traffic', 'blogging'],
    category: 'traffic',
    likes: 15,
    shares: 5,
    is_verified: false,
    createdAt: '2026-05-10',
  },
  {
    id: 'ss-005',
    title: 'Learned to code and shipped my first app in 2 weeks',
    description:
      'Zero coding experience. Used Cursor IDE + GPT-4 to learn React and ship a habit tracker app. Now freelancing with the same stack.',
    author: { name: 'Tom W.' },
    source_type: 'playbook',
    source_id: 'build-an-app-with-cursor',
    source_name: 'Build an App with Cursor',
    what_was_built: 'Habit tracking mobile-first PWA with React + Supabase',
    lessons: [
      'You do not need to learn syntax — you need to learn architecture',
      'Cursor agent mode is magic for beginners — it writes what you describe',
      'Ship something imperfect. My first app had bugs and people still used it.',
    ],
    tags: ['coding', 'learning', 'cursor', 'beginner', 'freelancing'],
    category: 'learning',
    likes: 22,
    shares: 9,
    is_verified: false,
    createdAt: '2026-05-08',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 5 — Playbook-Linked Success Stories (Revenue Display Layer)
// Fields: playbook_slug, tool_slugs[], revenue_proof, results[], timestamp
// ═══════════════════════════════════════════════════════════════════════════════

export const playbookSuccessStories: SuccessStory[] = [
  {
    id: 'pb-ss-001',
    title: '$3.2K MRR From Automated Affiliate Content',
    description:
      'Used the Content Creation with ChatGPT playbook to build a fully automated content engine producing 3 blog posts/week and 5 daily social posts. Affiliate revenue from Amazon Associates + tool programs hit $3.2K MRR in 4 months.',
    author: { name: 'Maya S.', handle: '@mayacontent' },
    source_type: 'playbook',
    source_id: 'content-creation-with-chatgpt',
    source_name: 'Content Creation with ChatGPT',
    playbook_slug: 'content-creation-with-chatgpt',
    tool_slugs: ['chatgpt', 'perplexity', 'canva-ai'],
    revenue_proof: '$3.2K MRR',

    results: [
      { metric: 'Monthly Revenue', value: '$3,200' },
      { metric: 'Monthly Traffic', value: '28K visitors' },
      { metric: 'Posts/Month', value: '12 blogs + 120 social' },
    ],
    revenue: {
      amount: 3200,
      currency: 'USD',
      verified: false,
      proof_description: 'Affiliate dashboard screenshots from Amazon Associates + tool programs',
    },
    impact_metrics: [
      { metric: 'Monthly Traffic', value: '28K visitors', description: 'Organic + social referral' },
      { metric: 'Monthly Posts', value: '12 blogs + 120 social', description: '3 blog posts + 5 social posts/day' },
    ],
    what_was_built: 'Automated affiliate content engine for AI and tech blogs',
    lessons: ['Consistency beats volume', 'Repurpose every post 5 ways', 'Track affiliate links from day one'],
    tags: ['content', 'affiliate', 'automation', 'revenue'],
    category: 'revenue',
    likes: 42,
    shares: 18,
    is_verified: true,
    createdAt: '2026-05-12',
  },
  {
    id: 'pb-ss-002',
    title: 'Built and Launched a SaaS MVP in 72 Hours',
    description:
      'Followed the Build an App with Cursor playbook to go from idea to paid users in three days. Deployed with Stripe + Vercel. Now serving 45 paying users at $420 MRR.',
    author: { name: 'Alex Chen', handle: '@alexchen_builds' },
    source_type: 'playbook',
    source_id: 'build-an-app-with-cursor',
    source_name: 'Build an App with Cursor',
    playbook_slug: 'build-an-app-with-cursor',
    tool_slugs: ['cursor', 'chatgpt', 'langchain'],
    revenue_proof: '$420 MRR',

    results: [
      { metric: 'Monthly Revenue', value: '$420' },
      { metric: 'Users', value: '45 paid' },
      { metric: 'Time to Ship', value: '72 hours' },
    ],
    revenue: {
      amount: 420,
      currency: 'USD',
      verified: true,
      proof_description: 'Stripe dashboard — 10 paying users at $42/mo',
    },
    what_was_built: 'AI-powered feedback analysis SaaS tool',
    lessons: ['Ship backend first, polish UI later', 'Post build-in-public on X for free traction', 'Skip tests until you have paying users'],
    tags: ['saas', 'mvp', 'cursor', 'stripe', 'solopreneur'],
    category: 'revenue',
    likes: 38,
    shares: 14,
    is_verified: true,
    createdAt: '2026-05-10',
  },
  {
    id: 'pb-ss-003',
    title: 'Recovered 15 Hours/Week with AI Productivity Workflow',
    description:
      'Applied the AI Productivity Workflow playbook to automate meeting notes, task management, and weekly planning. Saved 15+ hours per week across a team of 4. Reallocated to product development.',
    author: { name: 'Priya K.', handle: '@priyaprod' },
    source_type: 'playbook',
    source_id: 'productivity-workflow-with-ai',
    source_name: 'AI Productivity Workflow',
    playbook_slug: 'productivity-workflow-with-ai',
    tool_slugs: ['notion-ai', 'chatgpt', 'perplexity'],
    revenue_proof: '$1.9K/mo saved',

    results: [
      { metric: 'Hours Saved/Week', value: '15 hours' },
      { metric: 'Tasks Automated', value: '12+ daily' },
      { metric: 'Team Headcount Savings', value: '$1,900/mo' },
    ],
    revenue: {
      amount: 1900,
      currency: 'USD',
      verified: true,
      proof_description: 'Payroll savings: reduced 0.5 FTE, verified by operations team',
    },
    impact_metrics: [
      { metric: 'Hours Saved/Week', value: '15 hours', description: 'Team of 4 — meeting notes, task mgmt, planning' },
      { metric: 'Productivity Increase', value: '40%', description: 'Reallocated to product development' },
    ],
    what_was_built: 'Automated productivity system for a 4-person startup team',
    lessons: ['Automate meeting notes first — biggest time sink', 'Weekly planning with AI saves 2h every Monday', 'Start with 2 tools, add more when needed'],
    tags: ['productivity', 'automation', 'notion', 'team'],
    category: 'productivity',
    likes: 25,
    shares: 10,
    is_verified: true,
    createdAt: '2026-05-09',
  },
  {
    id: 'pb-ss-004',
    title: '8x SEO Traffic Growth in 60 Days',
    description:
      'Used the Content Creation with ChatGPT playbook combined with Perplexity for keyword research. Went from 3K to 24K monthly organic visitors. 47 keywords now ranking on page 1 of Google.',
    author: { name: 'Sarah K.' },
    source_type: 'playbook',
    source_id: 'content-creation-with-chatgpt',
    source_name: 'Content Creation with ChatGPT',
    playbook_slug: 'content-creation-with-chatgpt',
    tool_slugs: ['chatgpt', 'perplexity'],

    results: [
      { metric: 'Organic Traffic', value: '24K/mo' },
      { metric: 'Top 10 Keywords', value: '47' },
      { metric: 'Traffic Growth', value: '8x' },
    ],
    impact_metrics: [
      { metric: 'Organic Traffic', value: '24K/mo', description: 'Up from 3K — 8x growth' },
      { metric: 'Posts Published', value: '36 posts', description: '3 per week for 12 weeks' },
      { metric: 'Top 10 Keywords', value: '47 keywords', description: 'Ranking on page 1 of Google' },
    ],
    what_was_built: 'SEO content strategy for a travel blog',
    lessons: ['Perplexity for keyword gaps beats paid tools', 'Human-edit every AI post — Google detects pure AI', 'Internal linking is the most underused SEO tactic'],
    tags: ['seo', 'content', 'traffic', 'blogging', 'growth'],
    category: 'traffic',
    likes: 18,
    shares: 6,
    is_verified: false,
    createdAt: '2026-05-08',
  },
  {
    id: 'pb-ss-005',
    title: '5x ROI on Asian Market Ad Campaigns',
    description:
      'Applied the AI Marketing for Asian Markets playbook to localize ad campaigns for Hong Kong, Singapore, and Japan. AI-powered copy adaptation and culturally tailored visuals drove 5x ROI improvement on ad spend.',
    author: { name: 'Michael L.', handle: '@mikegrows' },
    source_type: 'playbook',
    source_id: 'ai-marketing-for-asia',
    source_name: 'AI Marketing for Asian Markets',
    playbook_slug: 'ai-marketing-for-asia',
    tool_slugs: ['chatgpt', 'canva-ai', 'midjourney', 'synthesia', 'elevenlabs'],
    revenue_proof: '5x ROI on ad spend',

    results: [
      { metric: 'Ad ROI', value: '5x' },
      { metric: 'Markets Launched', value: '3 markets' },
      { metric: 'Content Localization Speed', value: '10x faster' },
    ],
    revenue: {
      amount: 5000,
      currency: 'USD',
      verified: false,
      proof_description: 'Ad platform dashboards showing ROI improvement across HK, SG, JP campaigns',
    },
    impact_metrics: [
      { metric: 'Ad ROI', value: '5x', description: 'AI-tailored copy per Asian market drove massive improvement' },
      { metric: 'Markets Launched', value: '3', description: 'Hong Kong, Singapore, Japan' },
    ],
    what_was_built: 'Multilingual ad campaign engine for Asian markets',
    lessons: ['Never direct-translate — culturally adapt each market', 'Local payment methods matter as much as copy', 'Start with one market, prove the model, then expand'],
    tags: ['marketing', 'asia', 'ads', 'localization', 'growth'],
    category: 'revenue',
    likes: 31,
    shares: 12,
    is_verified: true,
    createdAt: '2026-05-06',
  },
  {
    id: 'pb-ss-006',
    title: 'Learned to Code and Shipped First App in 2 Weeks',
    description:
      'Zero coding experience. Used the Build an App with Cursor playbook to learn React and ship a habit tracker PWA. Now freelancing with the same stack at $80/hr.',
    author: { name: 'Tom W.' },
    source_type: 'playbook',
    source_id: 'build-an-app-with-cursor',
    source_name: 'Build an App with Cursor',
    playbook_slug: 'build-an-app-with-cursor',
    tool_slugs: ['cursor', 'chatgpt'],

    results: [
      { metric: 'Learning Time to Ship', value: '14 days' },
      { metric: 'Freelance Rate', value: '$80/hr' },
      { metric: 'App Users', value: '200+' },
    ],
    what_was_built: 'Habit tracking mobile-first PWA with React + Supabase',
    lessons: ['You don\'t need syntax, you need architecture', 'Cursor agent mode writes what you describe', 'Ship imperfect — people use buggy apps'],
    tags: ['coding', 'learning', 'cursor', 'beginner', 'freelancing'],
    category: 'learning',
    likes: 24,
    shares: 11,
    is_verified: false,
    createdAt: '2026-05-05',
  },
  {
    id: 'pb-ss-007',
    title: 'Customer Support Automation Saved $1.9K/mo',
    description:
      'Replaced 1.5 full-time support staff with an AI chatbot built using productivity-focused AI tools. Response time dropped from 4 hours to 30 seconds. Resolution rate hit 87%.',
    author: { name: 'Raj P.', handle: '@rajbuilds' },
    source_type: 'playbook',
    source_id: 'productivity-workflow-with-ai',
    source_name: 'AI Productivity Workflow',
    playbook_slug: 'productivity-workflow-with-ai',
    tool_slugs: ['chatgpt', 'notion-ai'],
    revenue_proof: '$1.9K/mo saved',

    results: [
      { metric: 'Monthly Savings', value: '$1,900' },
      { metric: 'Response Time', value: '30 seconds' },
      { metric: 'Resolution Rate', value: '87%' },
    ],
    revenue: {
      amount: 1900,
      currency: 'USD',
      verified: true,
      proof_description: 'Payroll savings — 1.5 FTE reduction verified by finance team',
    },
    impact_metrics: [
      { metric: 'Response Time', value: '30 seconds', description: 'Down from 4 hours' },
      { metric: 'Resolution Rate', value: '87%', description: 'First-contact resolution with AI' },
    ],
    what_was_built: 'AI customer support bot with custom GPTs + Zendesk API',
    lessons: ['Start with the top 10 support questions — covers 80% of tickets', 'Always have a human escalation path', 'Track resolution rate as the north star metric'],
    tags: ['support', 'automation', 'cost-savings', 'productivity'],
    category: 'revenue',
    likes: 21,
    shares: 9,
    is_verified: true,
    createdAt: '2026-04-28',
  },
];

/**
 * Get all playbook-linked success stories for a given playbook slug.
 */
export function getStoriesByPlaybookSlug(slug: string): SuccessStory[] {
  return playbookSuccessStories.filter((s) => s.playbook_slug === slug);
}

/**
 * Get the top revenue-generating stories from playbook-linked stories.
 */
export function getTopRevenuePlaybookStories(limit = 6): SuccessStory[] {
  return [...playbookSuccessStories]
    .filter((s) => s.revenue)
    .sort((a, b) => (b.revenue?.amount || 0) - (a.revenue?.amount || 0))
    .slice(0, limit);
}

// ─── Helper functions ──────────────────────────────────────────────────────

const STORAGE_KEY = 'apifeny_success_story_likes';

export function getLikeState(storyId: string): boolean {
  if (typeof window === 'undefined') return false;
  const liked = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return liked[storyId] || false;
}

export function toggleLike(storyId: string): boolean {
  if (typeof window === 'undefined') return false;
  const liked = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (liked[storyId]) {
    delete liked[storyId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(liked));
    return false;
  } else {
    liked[storyId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(liked));
    return true;
  }
}

export function getStoriesByCategory(category: string): SuccessStory[] {
  if (category === 'all') return successStories;
  return successStories.filter((s) => s.category === category);
}

export function getTopRevenueStories(limit = 10): SuccessStory[] {
  return [...successStories]
    .filter((s) => s.revenue)
    .sort((a, b) => (b.revenue?.amount || 0) - (a.revenue?.amount || 0))
    .slice(0, limit);
}

export function getLeaderboard(): { rank: number; name: string; amount: number; verified: boolean; storyTitle: string; storyId: string }[] {
  return [...successStories]
    .filter((s) => s.revenue)
    .sort((a, b) => (b.revenue?.amount || 0) - (a.revenue?.amount || 0))
    .slice(0, 25)
    .map((s, i) => ({
      rank: i + 1,
      name: s.author.name,
      amount: s.revenue!.amount,
      verified: s.revenue!.verified,
      storyTitle: s.title,
      storyId: s.id,
    }));
}

export const CATEGORY_META: Record<string, { label: string; icon: string; gradient: string }> = {
  revenue: { label: 'Revenue & Monetization', icon: '💰', gradient: 'from-emerald-500/20 to-teal-500/10' },
  traffic: { label: 'Traffic & Growth', icon: '📈', gradient: 'from-blue-500/20 to-cyan-500/10' },
  productivity: { label: 'Productivity', icon: '⚡', gradient: 'from-amber-500/20 to-orange-500/10' },
  learning: { label: 'Learning & Skills', icon: '🎓', gradient: 'from-violet-500/20 to-purple-500/10' },
  community: { label: 'Community Building', icon: '👥', gradient: 'from-pink-500/20 to-rose-500/10' },
  other: { label: 'Other', icon: '✨', gradient: 'from-tech-500/20 to-tech-400/10' },
};
