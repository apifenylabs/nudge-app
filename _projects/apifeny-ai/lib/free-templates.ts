// ═══════════════════════════════════════════════
// FREE TEMPLATES — One copy-paste prompt per playbook
// Each template is a teaser for the paid playbook PDF.
// ═══════════════════════════════════════════════

export interface FreeTemplate {
  /** Playbook slug this template belongs to */
  slug: string;
  /** Short headline for the template */
  title: string;
  /** One-paragraph context */
  description: string;
  /** The copy-paste prompt the user gets for free */
  prompt: string;
  /** How many additional prompts are in the full playbook */
  extraPrompts: number;
}

export const freeTemplates: FreeTemplate[] = [
  {
    slug: 'ai-solopreneur-toolkit',
    title: 'Free Prompt: Customer Support AI Bot',
    description: 'Build a support bot that handles 85% of tickets automatically.',
    prompt:
      `You are an expert customer support bot builder. Help me design a support automation system for my business.

My business: [describe your business — e.g., "SaaS tool for freelancers"]
My top 5 support questions:
1. [question]
2. [question]
3. [question]
4. [question]
5. [question]

Please give me:
1. A knowledge base structure — what docs/FAQs I need to prepare
2. A RAG pipeline setup — which tools to connect (OpenAI + LangChain + Telegram)
3. Response templates for each of my top 5 questions
4. An escalation rule — when should the AI pass to a human?
5. A 3-hour weekend implementation timeline`,
    extraPrompts: 12,
  },
  {
    slug: 'directory-builder-template',
    title: 'Free Prompt: Niche Directory Validator',
    description: 'Validate if your niche directory idea will make money.',
    prompt:
      `You are a digital strategy consultant specializing in niche directories. I have an idea for a directory website and need you to validate it.

My directory idea: [describe your niche — e.g., "Best coworking spaces in Bangkok"]
Target audience: [who will visit this site?]
Monetization plan: [affiliate, sponsored listings, ads, all three]

Analyze:
1. Search demand — estimate monthly searches for 10 related keywords
2. Competition — on a scale of 1-10, how saturated is this niche?
3. Affiliate potential — which 3+ affiliate programs exist in this space?
4. Content moat — could I generate 200+ unique listings?
5. Revenue estimate — what's a realistic monthly revenue after 6 months?

Score out of 10 and give me a green/yellow/red light.`,
    extraPrompts: 8,
  },
  {
    slug: 'ai-workflow-automation',
    title: 'Free Prompt: Workflow Audit & ROI Calculator',
    description: 'Find every automation opportunity in your business.',
    prompt:
      `You are a business automation specialist. Help me audit my weekly workflows and find high-ROI automation opportunities.

My role: [e.g., "solopreneur running an online store"]
Hours I work per week: [X hours]
My hourly rate: [$X]

List every recurring task I probably do (estimate if unsure), then for each task:
1. Task name
2. Hours per week spent
3. Cognitiveness (high/medium/low — how much human judgment is needed)
4. Current tool used (if any)

Then rank them by Automation ROI Score = (hours/week × hourly rate × 4 weeks) / (complexity factor: high=3, medium=1.5, low=1)

Give me the top 10 automation opportunities with estimated tool costs and setup time.`,
    extraPrompts: 10,
  },
  {
    slug: 'ai-content-creation-busy-founders',
    title: 'Free Prompt: 30-Day Content Plan',
    description: 'Batch plan a month of content in 30 minutes.',
    prompt:
      `You are a content strategist. Help me plan 30 days of content in one session.

My business: [describe your business]
My audience: [who you're writing for]
My top 5 topics: [what you write about]
My channels: [LinkedIn, X, blog, newsletter, etc.]

Please generate:
1. 4 content pillars (themes for each week)
2. 8 long-form post topics (2 per week, with hooks)
3. 30 social media post ideas (one per day, per channel)
4. 4 newsletter outlines (one per week)
5. Content repurposing plan — how one long-form post becomes 10+ pieces

Format it as a calendar I can copy into my Notion or Google Sheets.`,
    extraPrompts: 15,
  },
  {
    slug: 'ai-for-data-analysis',
    title: 'Free Prompt: Automated Data Analysis Script',
    description: 'Get an AI-generated Python script for your data.',
    prompt:
      `You are a data analyst. I need a Python analysis script for my dataset.

Dataset: [describe — e.g., "CSV with 10K customer rows, columns: signup_date, country, plan_type, revenue, churned"]
Goal: [what do you want to find out? — e.g., "Which customer segments churn most?"]
Output format: [e.g., "charts + summary table"]

Please give me:
1. A complete Python script using pandas, matplotlib/seaborn
2. Comments explaining each section
3. Expected output description
4. File naming conventions for saving outputs
5. A 1-paragraph executive summary template`,
    extraPrompts: 8,
  },
  {
    slug: 'ai-for-social-media-management',
    title: 'Free Prompt: Viral Hook Generator',
    description: 'Generate 20 scroll-stopping hooks for any topic.',
    prompt:
      `You are a social media hook specialist. I need hooks that stop the scroll.

My niche: [describe your niche]
My content angle: [education, entertainment, inspiration, or a mix]
My platform: [TikTok, Instagram Reels, YouTube Shorts, LinkedIn, X]
My audience: [who are they?]

Generate 20 hooks using these proven frameworks (5 each):
1. The Curiosity Gap — what almost no one knows about [topic]
2. The Before/After — "I used to X, then I did Y, and Z happened"
3. The Contrarian — "Everyone says X, but here's the truth"
4. The Direct Address — "[Audience], if you're struggling with [pain point], this is for you"

For each hook, tell me why it works and what kind of video/post would follow it.`,
    extraPrompts: 12,
  },
  {
    slug: 'ai-for-personal-finance',
    title: 'Free Prompt: Personal Finance Audit Template',
    description: 'AI-guided financial health check in 15 minutes.',
    prompt:
      `You are a certified financial planner. Help me do a 15-minute financial health check.

My age: [X]
My monthly income: [$X]
My monthly expenses: [$X]
My savings: [$X]
My debt: [$X] at [X]% interest
My investments: [$X] in [stocks/crypto/real estate/etc.]

Please analyze:
1. Emergency fund health — how many months can I cover?
2. Debt priority — which debt to pay off first
3. Investment gap — am I saving enough for my age?
4. Tax efficiency — any quick wins?
5. Action items — top 3 financial priorities this month

Be realistic, not optimistic. Tell me the hard truths.`,
    extraPrompts: 10,
  },
  {
    slug: 'ai-personal-assistant-setup',
    title: 'Free Prompt: Your AI Morning Briefing',
    description: 'Set up a daily AI brief that covers what matters.',
    prompt:
      `You are a personal executive assistant. Help me design my perfect AI-powered daily briefing.

My role: [describe your work]
My priorities this month: [top 3-5 priorities]
My industry: [what do you track?]
My KPIs: [what numbers matter daily?]
My tools: [which apps do I use — email, calendar, CRM, analytics, etc.]

Design a daily briefing system that:
1. Aggregates data from all my tools into one view
2. Highlights what changed since yesterday
3. Flags urgent items (emails, deadlines, alerts)
4. Suggests my top 3 priorities for today
5. Shows one strategic insight I might miss

Bonus: Write the exact ChatGPT/Claude prompt I should start my day with.`,
    extraPrompts: 7,
  },
];
