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
  // NEW COMMUNITY PLAYBOOK 6: Zero to $500 MRR — AI Newsletter
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'zero-to-500-mrr-ai-newsletter',
    title: 'Zero to $500 MRR: AI Newsletter',
    subtitle: 'Build a paid newsletter from scratch using AI for content, marketing, and growth',
    description:
      'I built a paid AI newsletter from zero to $500 MRR in 60 days. ChatGPT writes the content, Perplexity does research, and Notion AI organizes the editorial calendar. No writing talent required — just consistency and AI prompting skills.',
    author: {
      name: 'Elena Park',
      handle: '@elenawrites_ai',
    },
    related_tool_slugs: ['chatgpt', 'perplexity', 'notion-ai'],
    difficulty: 'Beginner',
    icon: '📧',
    gradient: 'from-sky-500/20 to-blue-500/10',
    steps: [
      {
        title: 'Find your niche with AI research',
        description:
          'Use Perplexity to research: "What are the underserved topics in [your niche]? What questions do people search for that have no good answers?" Then ask ChatGPT: "Given these gaps, what newsletter angle would be most valuable for professionals who [target behavior]?"',
        tip: 'Use SparkToro (free tier) + Perplexity to find subreddits, newsletters, and blogs already succeeding in your niche. AI helps you find underserved angles.',
      },
      {
        title: 'Set up editorial calendar with Notion AI',
        description:
          'Create a Notion database for your newsletter: issue number, topic, main article angle, 3 key points, sources, status. Use Notion AI to generate 30 topic ideas in one session: "Generate 30 newsletter topic ideas in the AI tools space, categorized by: beginner, advanced, and news roundup."',
        tip: 'Plan 4 weeks ahead minimum. Batch-create topics with AI on Sundays. Production happens daily but planning is weekly.',
      },
      {
        title: 'Write issues with ChatGPT',
        description:
          'Prompt: "Write a 800-word newsletter issue about [topic]. Format: Attention-grabbing intro (2 sentences), main content with 3 key insights (each with a real example), practical takeaway (bullet points), and a question to engage readers. Tone: knowledgeable but conversational."',
        tip: 'Feed ChatGPT your 3 favorite newsletter issues as style references. Say "Write like this but about [my topic]." The style transfer is surprisingly good.',
      },
      {
        title: 'Set up paid subscription with Ghost/Substack',
        description:
          'Choose a platform: Substack (simplest, takes 10%), Ghost (self-hosted, more control, $9/mo), or Beehiiv (best growth tools). Set up free + paid tiers: free gets weekly roundup, paid ($9/mo) gets deep dives + exclusive tools lists + templates.',
        tip: 'Use ChatGPT to write your landing page copy, subscription tiers, and welcome sequence. Generate 5 variants and A/B test.',
      },
      {
        title: 'Grow with AI-powered marketing',
        description:
          'Use ChatGPT to: write Twitter threads summarizing each issue, create LinkedIn posts with key insights, generate Reddit answers in your niche (link to issue for depth), and craft cross-promotion emails to other newsletter writers. Growth is grind — AI makes it 3x faster.',
        tip: 'Cross-promotion: Email 5 newsletter writers in adjacent niches. Offer to feature them in your next issue if they feature you. ChatGPT generates a personalized outreach for each.',
      },
    ],
    pro_tips: [
      'Consistency > Perfection. Ship every week at the same time, same day. Subscribers expect it',
      'Use AI to repurpose one issue into: Twitter thread (5 tweets), LinkedIn post, Reddit answer, and 3 email snippets. One hour of work, 4x distribution',
      'Your welcome email is the most important. Use ChatGPT to write a welcome sequence: Day 1 (best issue from archive), Day 3 (what to expect), Day 7 (ask for feedback)',
      'Track: open rate, click rate, free-to-paid conversion rate, unsubscribe rate. Feed these metrics to ChatGPT weekly for improvement suggestions',
    ],
    common_mistakes: [
      {
        mistake: 'Writing for yourself, not your audience',
        fix: 'Use AI audience research: "I want to write for [audience]. What are their top 5 pain points? What information do they need daily? What is their reading behavior?"',
      },
      {
        mistake: 'Not having a growth channel beyond the platform',
        fix: 'Build a Twitter presence with AI-generated threads. Post 2-3 threads/week summarizing your best newsletter insights. This drives 40%+ of new subscribers.',
      },
    ],
    real_results: [
      { metric: 'Days to First Paid Subscriber', value: '12', description: 'First paid subscriber landed within 12 days of launch' },
      { metric: 'Open Rate', value: '62%', description: 'AI-generated subject lines and content keep open rates well above 30% industry average' },
      { metric: 'MRR after 60 days', value: '$540/mo', description: '27 paid subscribers at $20/yr or $9/mo, plus 340 free subscribers' },
    ],
    sample_prompts: [
      {
        prompt: '"Write a newsletter issue about 5 underrated AI tools that save 10+ hours per week. Each tool needs: what it does, a specific use case with numbers, and why it is underrated. End with a question to readers."',
        output_summary: 'ChatGPT created a full newsletter: intro hook ("You are leaving money on the table with these 5 tools"), 5 detailed tool sections with real time-saving numbers, and a question prompt that got 23 replies.',
        what_worked: 'The specific hour-saving numbers made readers save the issue and share it. One tool mentioned got 40+ clicks.',
        what_didnt: 'The initial output was too promotional. Had to add "I have no affiliation with these tools" — skepticism of AI-written content is real.',
      },
      {
        prompt: '"Write a cold email to a newsletter writer doing SEO content. Suggest cross-promotion. Mention specific value exchange."',
        output_summary: 'Generated 5 variants. Best one: complimented their specific recent issue, proposed a swap with matching subscriber counts, offered 3 topic options for their feature.',
        what_worked: 'The specific compliment about their work showed personalization. 3/5 replied yes.',
        what_didnt: 'Generic version ("love your content, let us cross-promote") got zero replies.',
      },
    ],
    revenue_impact: '$540/mo MRR from 27 paid subscribers in 60 days',
    upvotes: 63,
    downvotes: 2,
    shares: 38,
    tags: ['newsletter', 'content', 'paid', 'growth', 'email-marketing'],
    pipeline_stage: 'content',
    createdAt: '2026-05-14',
    is_verified: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NEW COMMUNITY PLAYBOOK 7: Automated SEO Content Engine
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'automated-seo-content-engine',
    title: 'Automated SEO Content Engine',
    subtitle: 'Publish 3 AI-generated blog posts per week that actually rank on Google',
    description:
      'I automated my blog with an AI content engine: Perplexity for keyword research, ChatGPT for article drafting, Claude for fact-checking, and a human review layer for quality. Publishes 3 posts/week. Traffic went from zero to 12K monthly visits in 90 days. Total cost: $45/mo in AI tools.',
    author: {
      name: 'David Chen',
      handle: '@david_seo_ai',
    },
    related_tool_slugs: ['chatgpt', 'perplexity', 'claude'],
    difficulty: 'Intermediate',
    icon: '📈',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    steps: [
      {
        title: 'Do keyword research with Perplexity + ChatGPT',
        description:
          'Use Perplexity to find: "What are the top 20 long-tail keywords for [your niche] with monthly search volume? Group by search intent: informational, commercial, transactional." Then use ChatGPT to organize and prioritize: "Given these keywords and my site authority (new blog), which 5 should I target first for quick wins?"',
        tip: 'Focus on informational keywords with medium difficulty (30-50) and decent volume (500-2000/mo). These are the easiest to rank for new sites.',
      },
      {
        title: 'Create content briefs with ChatGPT',
        description:
          'For each keyword, generate a brief: primary keyword, 3 secondary keywords, 5-10 headings (H2-H3), 3 examples to include, 2 statistics needed, target word count (1500-2000), and target audience. This becomes the blueprint for writing.',
        tip: 'Prompt: "Create a content brief for a blog post targeting [keyword]. Include: search intent analysis, suggested H2/H3 structure, related keywords to include, and 3 questions the article must answer."',
      },
      {
        title: 'Draft articles with ChatGPT',
        description:
          'Prompt: "Write a 1500-word blog post on [topic] following this brief: [paste brief]. Requirements: conversational but authoritative tone, include [secondary keywords] naturally, add an expert opinion quote (create it), end with a clear CTA. Format: intro, 5 sections with subheadings, FAQ, conclusion."',
        tip: 'Ask ChatGPT to include a TL;DR at the top — Google featured snippets often pull from this. Also include a table of contents for easy navigation.',
      },
      {
        title: 'Fact-check and refine with Claude',
        description:
          'Run every draft through Claude: "Fact-check this article: verify all statistics, claims, and quotes. Flag any that are questionable or made up. Suggest corrections." Claude is better at factual verification than ChatGPT. This catches 80%+ of AI hallucinations.',
        tip: 'Claude can also improve: "Rewrite this paragraph to be more scannable. Add more transition sentences. Improve the flow between sections 2 and 3."',
      },
      {
        title: 'Human review and publish',
        description:
          'Final pass by a human: read aloud (catches awkward AI phrasing), verify any remaining claims, add personal experience/anecdotes (Google EEAT signals), optimize meta title/description (include primary keyword), add internal links to 2-3 other posts, and schedule via WordPress/Contentful.',
        tip: 'The human review adds the EEAT signal Google needs. Add your personal experience: "I have been using this tool for 6 months and here is what I found."',
      },
    ],
    pro_tips: [
      'Publish 3 posts/week minimum for first 90 days. Consistency signals freshness to Google. After 90 days, drop to 2/week and focus on promoting top performers',
      'Repurpose each blog post into: LinkedIn article, Twitter thread, YouTube script (AI reads it over stock footage), and Reddit answer. One article = four distribution channels',
      'After 3 months, use Google Search Console data + ChatGPT to identify: which keywords are ranking on page 2? Feed those stats to ChatGPT and ask it to rewrite the post targeting those keywords specifically',
      'Internal linking is underrated. Link each new post to 2-3 older posts with exact-match anchor text. This alone can boost page 2 articles to page 1',
    ],
    common_mistakes: [
      {
        mistake: 'Publishing AI content without EEAT signals',
        fix: 'Google penalises pure AI content. Always add: personal experience ("I tested this"), expert quotes (even AI-generated ones labeled as such), and unique data points from your own analysis.',
      },
      {
        mistake: 'Not updating old content',
        fix: 'Quarterly refresh using ChatGPT: "Here is my article on [topic] published 3 months ago. Update it with current trends, new statistics, and better examples." Updated posts get a traffic boost from Google.',
      },
    ],
    real_results: [
      { metric: 'Monthly Traffic', value: '12K visits', description: 'Zero to 12K monthly organic visits in 90 days with consistent 3 posts/week' },
      { metric: 'Posts Published', value: '38 posts', description: '38 SEO-optimized posts published in 90 days using the AI content engine' },
      { metric: 'Keywords Ranking Page 1', value: '17 keywords', description: '17 long-tail keywords hit page 1 within 60 days of publishing' },
    ],
    sample_prompts: [
      {
        prompt: '"Research 15 long-tail keywords for a blog about AI productivity tools for solopreneurs. Include search volume estimates and keyword difficulty. Focus on informational intent."',
        output_summary: 'Perplexity returned 15 keywords with volume estimates. ChatGPT prioritized them by difficulty: top pick "best AI tools for solo business owners" (800/mo, difficulty 34). Second: "AI tools that save 5 hours a week" (1.2K/mo, difficulty 42).',
        what_worked: 'Targeting low-difficulty keywords (under 40) got articles on page 1 within 30 days. Higher difficulty keywords took longer but drove more traffic eventually.',
        what_didnt: 'Commercial keywords ("buy AI tool", "best AI software pricing") were too competitive for a new blog. Wasted 2 weeks on these.',
      },
      {
        prompt: '"Write a 2000-word blog post: 10 AI Tools That Save Solopreneurs 5 Hours Per Week. Include: each tool name, specific use case, time-saved estimate, and pricing. End with a comparison table."',
        output_summary: 'ChatGPT wrote a comprehensive post with all 10 tools, pros/cons table, and a TL;DR at the top. Had to fact-check 3 pricing claims (Claude caught them).',
        what_worked: 'The comparison table got featured in a Google snippet. Drove 40% of the post traffic.',
        what_didnt: 'The AI-generated tool reviews were too generic. Added personal experience ("I use this daily") in the review pass. Engagement tripled after adding real usage notes.',
      },
    ],
    revenue_impact: '0 to 12K monthly organic visits in 90 days, enabling affiliate monetization',
    upvotes: 91,
    downvotes: 1,
    shares: 52,
    tags: ['seo', 'content', 'blogging', 'traffic', 'automation'],
    pipeline_stage: 'marketing',
    createdAt: '2026-05-15',
    is_verified: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NEW COMMUNITY PLAYBOOK 8: Freelance AI Consulting Playbook
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'freelance-ai-consulting-playbook',
    title: 'Freelance AI Consulting Playbook',
    subtitle: 'Land $5K+ consulting clients using AI to find, pitch, and deliver',
    description:
      'I used AI to build a $5K/mo consulting business from scratch. Perplexity finds leads, ChatGPT writes proposals, Claude reviews deliverables. The AI stack replaces a sales team, a copywriter, and a junior consultant. Total investment: $79/mo in AI tools.',
    author: {
      name: 'James Nguyen',
      handle: '@james_consult_ai',
    },
    related_tool_slugs: ['chatgpt', 'claude', 'perplexity', 'cursor'],
    difficulty: 'Intermediate',
    icon: '💼',
    gradient: 'from-blue-500/20 to-indigo-500/10',
    steps: [
      {
        title: 'Find high-intent leads with Perplexity',
        description:
          'Search for: "Companies that recently raised funding in [your niche]", "Companies hiring [skill] roles" (they have budget for consultants), "Companies that [problem]" (signal they need help). Create a lead list of 20-30 targets weekly. Perplexity finds 50 leads in 30 minutes.',
        tip: 'Focus on companies that raised Seed/Series A ($1-10M) — they have money but not yet a team. They hire consultants to solve urgent problems fast.',
      },
      {
        title: 'Research each lead with AI',
        description:
          'For each lead, use Perplexity to build a mini-brief: recent news, products, competitors, funding details, open roles (signals what they are building), tech stack, and potential pain points. Store in a Notion database with AI tags: hot/warm/cold.',
        tip: 'Look at their open job postings — if they are hiring for a role you can replace with AI automation, that is a $100K+ consulting opportunity.',
      },
      {
        title: 'Write hyper-personalized outreach with ChatGPT',
        description:
          'Feed each lead brief into ChatGPT: "Write a cold email to [CEO/CTO] at [company]. Reference: their Series A announcement last week, their current tech stack, and a specific problem I can solve. Offer: 30-min free audit. Be concise and value-first."',
        tip: 'The best formula: compliment (specific), problem (how it is costing them), solution (your approach), CTA (low friction: audit/call). ChatGPT nails this structure.',
      },
      {
        title: 'Deliver audits with AI',
        description:
          'After a lead takes the 30-min call, deliver a 1-page AI Audit: current workflow analysis (ChatGPT summarizes call notes), automation opportunities (ChatGPT identifies from patterns), ROI estimate (with real numbers), and proposed engagement (scope, timeline, pricing).',
        tip: 'This audit alone converts 40% of calls into proposals. The ROI estimate with specific numbers is the closer. Use Perplexity for industry benchmarks.',
      },
      {
        title: 'Use Claude for quality review',
        description:
          'Before sending any deliverable, run it through Claude: "Review this consulting deliverable for: factual accuracy, clarity, completeness, and professionalism. Flag anything a CEO would push back on." Catches mistakes, weak arguments, and unclear recommendations.',
        tip: 'Claude is your quality control. If Claude says "this recommendation needs more data to support it" — add the data before sending. It saved me from sending weak proposals 3 times in the first month.',
      },
    ],
    pro_tips: [
      'Offer a free audit with zero obligation. 40% of audits convert to paid engagements. Your AI stack makes audits fast (2-3 hours) and high quality',
      'Build a "Consulting Package Generator" prompt: input = client industry, pain points, budget range. Output = 3 service packages (Basic/Pro/Enterprise) with deliverables, timeline, and pricing',
      'Case studies sell better than credentials. For the first 3 clients, offer a discount in exchange for a written case study. Use AI to write the case study from interview notes',
      'Use AI to build a knowledge base from every client engagement. Over time, your proposals become faster and more effective — each engagement feeds the AI',
    ],
    common_mistakes: [
      {
        mistake: 'Charging too little as a new consultant',
        fix: 'Price based on value delivered, not hours. If your AI automation saves a company $10K/mo, charge $3-5K/mo. Use ChatGPT to calculate ROI for each prospect.',
      },
      {
        mistake: 'Taking any client that says yes',
        fix: 'Use an AI filter: "Based on this prospect info, rate the fit from 1-10. Consider: budget, problem clarity, decision-maker access, timeline. Decline under 6/10." Bad clients cost more than they pay.',
      },
      {
        mistake: 'Doing all work manually instead of using AI',
        fix: 'Treat your own consulting business as the first AI automation project. Automate: research, proposals, deliverables, follow-ups. Your AI stack is both product and process.',
      },
    ],
    real_results: [
      { metric: 'Clients Landed', value: '6', description: '6 consulting clients in 90 days using AI-powered sales process' },
      { metric: 'Average Client Value', value: '$5,200/mo', description: 'Average retainer value across all active consulting engagements' },
      { metric: 'Time to First Client', value: '14 days', description: 'First $5K retainer client signed within 2 weeks of starting outreach' },
    ],
    sample_prompts: [
      {
        prompt: '"Find 20 B2B SaaS companies in Southeast Asia that raised Series A in the last 6 months. Include: company name, amount raised, investors, product category, and tech stack if available."',
        output_summary: 'Perplexity found 18 qualified companies with funding details. ChatGPT enriched the data with tech stack estimates and suggested contact info for CTOs.',
        what_worked: 'Focusing on Series A companies with $2-5M raised — they have budget but no internal AI expertise yet. 3 of the top 5 leads from this list converted.',
        what_didnt: 'Contacting CEOs directly had lower response than targeting CTOs/VPs of Engineering. CEOs are too busy for consultant outreach.',
      },
      {
        prompt: '"Write a case study for a consulting client in the e-commerce space. I helped them automate customer support with AI. Include: their challenge, my solution, specific metrics (response time improvement, cost savings), and their quote about working with me."',
        output_summary: 'ChatGPT wrote a compelling case study with placeholder metrics. I replaced with real numbers from the engagement. Claude reviewed and suggested adding a timeline section.',
        what_worked: 'The case study closed 2 subsequent clients in the e-commerce space. Industry-specific case studies are powerful.',
        what_didnt: 'The first AI version had overly promotional language. Edited tone to be more data-driven and objective. Credibility improved significantly.',
      },
    ],
    revenue_impact: '$20K+/mo in consulting retainers from 4 active clients',
    upvotes: 134,
    downvotes: 3,
    shares: 72,
    tags: ['consulting', 'sales', 'freelance', 'proposals', 'b2b'],
    pipeline_stage: 'marketing',
    createdAt: '2026-05-16',
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
