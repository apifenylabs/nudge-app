// ══════════════════════════════════════════════════════════
// APIFENY.AI — Playbooks Collection
// ══════════════════════════════════════════════════════════
// Reusable how-to guides across different AI tools.
// Each playbook focuses on a specific workflow or use case.
// ══════════════════════════════════════════════════════════

export interface Playbook {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Which tools this playbook uses (slugs) */
  related_tool_slugs: string[];
  /** Difficulty level */
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Time to complete reading */
  read_time_minutes: number;
  /** Step-by-step guide */
  steps: { title: string; description: string; tip?: string }[];
  /** Pro tips */
  pro_tips: string[];
  /** Common mistakes */
  common_mistakes?: { mistake: string; fix: string }[];
  /** Icon emoji */
  icon: string;
  /** Gradient for card */
  gradient: string;
  /** SEO */
  meta_title?: string;
  meta_description?: string;
  /** Pipeline stage this playbook fits */
  pipeline_stage?: string;
  /** Revenue impact description */
  revenue_impact?: string;
  /** Real results from using this playbook */
  real_results?: { metric: string; value: string; description: string }[];
}

export const playbooks: Playbook[] = [
  {
    slug: 'content-creation-with-chatgpt',
    title: 'Content Creation with ChatGPT',
    subtitle: 'Write better content faster',
    description:
      'Master ChatGPT for content creation — from blog posts to social media. Learn prompt engineering techniques that work.',
    related_tool_slugs: ['chatgpt', 'perplexity'],
    difficulty: 'Beginner',
    read_time_minutes: 8,
    icon: '✍️',
    gradient: 'from-neon/30 to-aqua/20',
    steps: [
      {
        title: 'Define your content goal',
        description:
          'Before writing, clearly define what you want to create — blog post, tweet thread, email newsletter, or social caption.',
        tip: 'Use the PREP framework: Purpose, Recipient, Emotion, Platform.',
      },
      {
        title: 'Set context with Custom Instructions',
        description:
          'Tell ChatGPT who you are and what tone you want. Example: "You are a marketing professional writing for Asian entrepreneurs."',
        tip: 'Save your custom instructions as a GPT for reuse.',
      },
      {
        title: 'Write a structured prompt',
        description:
          'Include: format, tone, length, keywords, and a reference example. Bad: "Write a blog post." Good: "Write a 800-word blog post in a professional but warm tone about AI tools for small businesses in Singapore."',
      },
      {
        title: 'Review and iterate',
        description:
          'Ask ChatGPT to revise specific sections. Use follow-up prompts like "Make this more conversational" or "Add more statistics."',
      },
      {
        title: 'Fact-check with Perplexity',
        description:
          'Cross-reference claims using Perplexity for cited sources. This ensures your content is accurate and authoritative.',
      },
    ],
    pro_tips: [
      'Create a library of reusable prompts for different content types',
      'Use ChatGPT\'s "Continue generating" for long-form content',
      'Combine 3-4 AI outputs into one final piece for the best quality',
    ],
    common_mistakes: [
      {
        mistake: 'Accepting the first output without review',
        fix: 'Always ask for revisions. First drafts are 70% there.',
      },
      {
        mistake: 'Not providing enough context',
        fix: 'Give examples of writing you like. ChatGPT mimics style well.',
      },
    ],
    pipeline_stage: 'content',
    revenue_impact: '$3K/mo affiliate revenue with consistent publishing',
    real_results: [
      { metric: 'Monthly Posts', value: '12 blogs + 120 social', description: '3 blog posts + 5 social posts/day' },
      { metric: 'Time Saved/Week', value: '15 hours', description: 'Down from 25 hours with manual writing' },
    ],
  },
  {
    slug: 'build-an-app-with-cursor',
    title: 'Build an App with Cursor',
    subtitle: 'From idea to MVP in hours',
    description:
      'Use Cursor\'s AI agent mode to build a full-stack web application from scratch. No prior coding experience needed.',
    related_tool_slugs: ['cursor', 'chatgpt', 'langchain'],
    difficulty: 'Intermediate',
    read_time_minutes: 12,
    icon: '💻',
    gradient: 'from-sky-500/30 to-indigo-500/30',
    steps: [
      {
        title: 'Set up your Cursor environment',
        description:
          'Download Cursor and open your project folder. Use Ctrl+K (Cmd+K) for inline edits and Cmd+L for chat.',
      },
      {
        title: 'Describe your app idea',
        description:
          'In Agent mode (Cmd+Shift+A), describe your app in detail. Include tech stack preferences (Next.js, Tailwind, Supabase).',
        tip: 'Be specific about features. "A task manager" → "A task manager with drag-drop, due dates, and team assignment."',
      },
      {
        title: 'Review the architecture plan',
        description:
          'Cursor will propose a file structure and plan. Review and approve before it starts coding.',
      },
      {
        title: 'Iterate with inline edits',
        description:
          'Use Ctrl+K to make targeted edits to specific files. Fix bugs, add features, refine UI.',
      },
      {
        title: 'Deploy to Vercel',
        description:
          'Once your app is ready, use Cursor\'s terminal to run `npx vercel deploy` and deploy directly.',
      },
    ],
    pro_tips: [
      '@-mention specific files in chat for context-aware suggestions',
      'Use the Composer (Cmd+I) for multi-file changes in one go',
      'Keep a CLAUDE.md file in your project root with project context',
    ],
    common_mistakes: [
      {
        mistake: 'Vague descriptions leading to wrong architecture',
        fix: 'Spend 5 minutes writing a clear spec before asking Cursor to code.',
      },
      {
        mistake: 'Not reviewing generated code',
        fix: 'Always scan generated code for security issues and edge cases.',
      },
    ],
    pipeline_stage: 'coding',
    revenue_impact: '$420 MRR from SaaS MVP built in 72 hours',
    real_results: [
      { metric: 'Time to MVP', value: '72 hours', description: 'From idea to working product with Stripe' },
      { metric: 'First Week Signups', value: '45 users', description: 'Posted build journey on X' },
    ],
  },
  {
    slug: 'travel-planning-with-ai',
    title: 'AI-Powered Family Travel Planning',
    subtitle: 'Plan smarter family vacations',
    description:
      'Use Gemini, ChatGPT, and Perplexity together to plan the perfect family vacation in Asia. Itineraries, budgets, translations, and more.',
    related_tool_slugs: ['gemini', 'chatgpt', 'perplexity', 'canva-ai'],
    difficulty: 'Beginner',
    read_time_minutes: 10,
    icon: '🧳',
    gradient: 'from-emerald-400/30 to-sky-400/30',
    steps: [
      {
        title: 'Research destinations with Perplexity',
        description:
          'Ask Perplexity: "Best family-friendly destinations in Southeast Asia for a 7-day trip. Include kid-friendly activities and safety tips." Get cited sources for each recommendation.',
      },
      {
        title: 'Build itinerary with Gemini',
        description:
          'Use Gemini\'s deep research to create a day-by-day itinerary. Include travel times, meal breaks, and rest periods for kids.',
        tip: 'Gemini handles long context well — paste full hotel and flight details.',
      },
      {
        title: 'Create visual plan with Canva',
        description:
          'Use Canva Magic Design to create a travel itinerary PDF. Add photos, maps, and booking details.',
      },
      {
        title: 'Translate and prepare',
        description:
          'Use Gemini or ChatGPT to translate key phrases into local languages. Create a phrase card for common situations.',
      },
      {
        title: 'Pack and budget with ChatGPT',
        description:
          'Ask ChatGPT for a packing list tailored to your destination and a budget breakdown based on your research.',
      },
    ],
    pro_tips: [
      'Create a shared Google Doc and paste AI outputs there for family collaboration',
      'Use Perplexity Collections to organize research by country or activity type',
      'Ask AI for local food recommendations that are kid-friendly',
    ],
    common_mistakes: [
      {
        mistake: 'Trusting AI-generated prices without verification',
        fix: 'Always check current prices on booking sites before finalizing budget.',
      },
    ],
    pipeline_stage: 'planning',
    real_results: [
      { metric: 'Planning Time Saved', value: '70%', description: 'Reduced trip planning from 8 hours to 2.5 hours' },
    ],
  },
  {
    slug: 'ai-marketing-for-asia',
    title: 'AI Marketing for Asian Markets',
    subtitle: 'Reach Asian audiences authentically',
    description:
      'Combine AI tools for multilingual marketing campaigns targeting Asian markets. From copywriting to visual content.',
    related_tool_slugs: ['chatgpt', 'canva-ai', 'midjourney', 'synthesia', 'elevenlabs'],
    difficulty: 'Intermediate',
    read_time_minutes: 10,
    icon: '📊',
    gradient: 'from-asia/30 to-amber-400/30',
    steps: [
      {
        title: 'Research market trends',
        description:
          'Use Perplexity to research trending topics, cultural sensitivities, and consumer behavior in your target Asian market.',
      },
      {
        title: 'Create multilingual copy',
        description:
          'Write your core message in English, then use ChatGPT to translate and adapt for Chinese, Japanese, Korean, or Thai markets. Ask for culturally appropriate alternatives.',
        tip: 'Always have a native speaker review AI translations for cultural nuance.',
      },
      {
        title: 'Design culturally relevant visuals',
        description:
          'Use Canva Magic Studio or Midjourney to create marketing visuals. Reference local aesthetics, colors, and design patterns.',
      },
      {
        title: 'Produce localized video',
        description:
          'Use Synthesia AI avatars that match your target demographic. Select Asian avatars and add localized voiceovers with ElevenLabs.',
      },
      {
        title: 'Review and launch',
        description:
          'Create a checklist: language accuracy, cultural appropriateness, local pricing display, payment method compatibility.',
      },
    ],
    pro_tips: [
      'Create separate brand kits in Canva for each market',
      'Use local festivals and holidays in your campaign timing',
      'Test AI-generated content with small focus groups from the target market',
    ],
    common_mistakes: [
      {
        mistake: 'Direct translation without cultural adaptation',
        fix: 'Ask AI to adapt, not translate. Localize idioms and references.',
      },
      {
        mistake: 'Ignoring local platform preferences',
        fix: 'Research which platforms (WeChat, Line, KakaoTalk, Zalo) are dominant in your target market.',
      },
    ],
    pipeline_stage: 'marketing',
    revenue_impact: '5x ROI on ad spend targeting multilingual Asian audiences',
    real_results: [
      { metric: 'Ad ROI Improvement', value: '5x', description: 'Using AI to tailor ad copy per Asian market' },
      { metric: 'Content Production', value: '10x faster', description: 'Localize 1 post into 8 Asian languages' },
    ],
  },
  {
    slug: 'productivity-workflow-with-ai',
    title: 'AI Productivity Workflow',
    subtitle: 'Automate your daily tasks',
    description:
      'Set up an AI-powered productivity system using Notion AI, ChatGPT, and automation tools. Save 10+ hours per week.',
    related_tool_slugs: ['notion-ai', 'chatgpt', 'perplexity'],
    difficulty: 'Beginner',
    read_time_minutes: 7,
    icon: '⚡',
    gradient: 'from-violet-500/30 to-fuchsia-500/30',
    steps: [
      {
        title: 'Set up your Notion workspace',
        description:
          'Create databases for tasks, projects, notes, and meetings. Use Notion templates for consistency.',
      },
      {
        title: 'Configure Notion AI',
        description:
          'Enable Notion AI in workspace settings. Use AI Write for drafting and AI Q&A for querying your workspace.',
        tip: 'Create a "Daily Summary" database view that compiles yesterday\'s meeting notes and tasks.',
      },
      {
        title: 'Create meeting note templates',
        description:
          'Build a template that auto-formats action items, decisions, and follow-ups. Use AI to summarize meeting transcripts.',
      },
      {
        title: 'Link ChatGPT for deep work',
        description:
          'Use ChatGPT for research, writing, and brainstorming. Copy outputs to your Notion workspace as reference documents.',
      },
      {
        title: 'Weekly review with Perplexity',
        description:
          'Every Friday, use Perplexity to catch up on industry news relevant to your projects.',
      },
    ],
    pro_tips: [
      'Use Notion AI Q&A to search across all your docs — it saves hours of manual searching',
      'Create a "Weekly Wins" database to track accomplishments for performance reviews',
      'Set up recurring AI prompts for weekly planning (target outcomes, blocked items, priorities)',
    ],
    common_mistakes: [
      {
        mistake: 'Trying to use too many tools at once',
        fix: 'Start with just Notion AI + ChatGPT. Add tools only when you have a specific need.',
      },
    ],
    pipeline_stage: 'deployment',
    real_results: [
      { metric: 'Daily Tasks Automated', value: '12+', description: 'Recurring workflows now fully automated' },
      { metric: 'Hours Saved/Week', value: '10+ hours', description: 'Reallocated to high-value work' },
    ],
  },
  {
    slug: 'ai-video-production',
    title: 'AI Video Production Pipeline',
    subtitle: 'From script to published video',
    description:
      'Full video production workflow using AI tools: scriptwriting, voiceover, visuals, and editing.',
    related_tool_slugs: ['runway', 'elevenlabs', 'chatgpt', 'canva-ai', 'descript'],
    difficulty: 'Intermediate',
    read_time_minutes: 9,
    icon: '🎬',
    gradient: 'from-rose-500/30 to-amber-500/30',
    steps: [
      {
        title: 'Write the script with ChatGPT',
        description:
          'Generate a video script with hook, body, and CTA. Include timestamps and visual notes.',
      },
      {
        title: 'Generate voiceover with ElevenLabs',
        description:
          'Select a voice that matches your brand. Adjust stability and clarity for natural delivery. Generate in your target language.',
        tip: 'Use ElevenLabs\' voice library or clone a custom voice for brand consistency.',
      },
      {
        title: 'Create visuals with Runway',
        description:
          'Use Runway Gen-3 for text-to-video clips, or generate background footage that matches your script.',
      },
      {
        title: 'Edit with Descript',
        description:
          'Import your voiceover and video clips. Edit by deleting words in the transcript. Add captions automatically.',
      },
      {
        title: 'Polish and export',
        description:
          'Add transitions, background music, and end screen. Export at 1080p for social media platforms.',
      },
    ],
    pro_tips: [
      'Use Descript\'s Studio Sound to clean up audio from any source',
      'Create reusable templates in Descript for recurring video formats',
      'Use Canva\'s resize feature to adapt one video for multiple platforms',
    ],
    pipeline_stage: 'content',
    revenue_impact: 'Create professional video content 5x faster with AI tools',
    real_results: [
      { metric: 'Video Production Speed', value: '5x', description: 'From scripting to finished video' },
      { metric: 'Cost Savings', value: '80%', description: 'No studio, no crew, no editing suite needed' },
    ],
  },

  // ════════════════════════════════════════════════════
  // AI PIPELINE PLAYBOOKS — Vibe Coding Flow
  // ════════════════════════════════════════════════════

  {
    slug: 'best-llms-for-coding',
    title: 'Best LLMs for Coding',
    subtitle: 'Ranked & reviewed for real dev work',
    description:
      'A data-backed comparison of LLMs for software development. We rank Claude, Cursor, ChatGPT, Gemini, and Copilot across code generation, debugging, refactoring, and documentation. Includes real benchmarks and practical recommendations for each task type.',
    related_tool_slugs: ['cursor', 'claude', 'chatgpt', 'gemini', 'devin'],
    difficulty: 'Intermediate',
    read_time_minutes: 10,
    icon: '💻',
    gradient: 'from-sky-500/30 to-indigo-500/30',
    steps: [
      {
        title: 'Understand the coding LLM landscape',
        description:
          'The top contenders: Cursor (best IDE integration for daily coding), Claude Sonnet 4 (best reasoning for complex logic), ChatGPT (best all-rounder for quick scripts), Gemini (best long-context for large codebases), Copilot (best autocomplete for VS Code users).',
        tip: 'Use Cursor for day-to-day development, Claude for debugging complex issues, and Gemini for refactoring large files.',
      },
      {
        title: 'Code generation benchmarks',
        description:
          'In real-world tests: Cursor/Claude score highest on code generation (generates ~85% correct on first try for standard CRUD apps). ChatGPT scores 70-75%. Gemini scores 65-70% but handles 1M+ token contexts. Copilot excels at inline completions.',
      },
      {
        title: 'Debugging & refactoring comparison',
        description:
          'For identifying bugs: Claude is #1 (reads code like a senior engineer, catches edge cases). For refactoring: ChatGPT with o3-mini is best (understands architectural intent). For automated fixes: Cursor\'s Agent mode can self-heal runtime errors.',
        tip: 'When stuck on a bug, paste the full error + relevant file into Claude first, then use Cursor to apply the fix.',
      },
      {
        title: 'Documentation & testing',
        description:
          'GitHub Copilot leads for inline documentation. ChatGPT/Claude are better for writing comprehensive READMEs and test suites. Gemini\'s long context helps it generate tests that cover more edge cases.',
      },
      {
        title: 'Pick your stack for the job',
        description:
          'Rapid prototyping: Cursor + Claude combo. Full-stack app: Cursor\'s Agent mode. Code review: Claude. Legacy code refactor: Gemini (for its 1M context). API integration: ChatGPT (best docs comprehension).',
        tip: 'Most professional devs use 2-3 LLMs in parallel. Don\'t pick one — build a pipeline.',
      },
    ],
    pro_tips: [
      'Use Cursor\'s Composer (Cmd+I) for multi-file changes that require architectural understanding',
      'Keep a CLAUDE.md or CURSOR.md in your project root with tech stack preferences and conventions',
      'For code review, paste the diff into Claude and ask \"What edge cases am I missing?\"',
      'Use Gemini 2.5 Pro for reviewing entire codebases — its 1M context sees the whole picture',
    ],
    common_mistakes: [
      {
        mistake: 'Asking one LLM to do everything',
        fix: 'Use Cursor for coding, Claude for reasoning, ChatGPT for documentation. Each has strengths.',
      },
      {
        mistake: 'Accepting first-generated code without review',
        fix: 'Always scan generated code for security issues (SQL injection, API key leaks) and edge cases.',
      },
    ],
    pipeline_stage: 'coding',
    revenue_impact: 'Build full-stack apps 10x faster with AI coding assistants',
    real_results: [
      { metric: 'Development Speed', value: '10x', description: 'From idea to working code with AI assistance' },
      { metric: 'Debug Time Reduction', value: '60%', description: 'AI-powered debugging cuts troubleshooting time' },
    ],
  },
  {
    slug: 'ai-pipeline-idea-to-deploy',
    title: 'AI Pipeline: Idea to Deploy',
    subtitle: 'Full vibe coding workflow',
    description:
      'End-to-end pipeline for building and shipping a SaaS app using AI. Covers strategic planning → product ownership → research → ideation → coding → review → testing → deployment. Based on real workflows from solopreneurs shipping in 1-2 weeks.',
    related_tool_slugs: ['chatgpt', 'cursor', 'claude', 'perplexity', 'canva-ai'],
    difficulty: 'Advanced',
    read_time_minutes: 14,
    icon: '🏗️',
    gradient: 'from-neon/40 to-aqua/30',
    steps: [
      {
        title: 'Phase 1 — Strategic Planning (Best LLM: ChatGPT o3)',
        description:
          'Define what you\'re building and why. Ask ChatGPT: "I want to build [idea]. Help me define the MVP scope, target users, monetization model, and key metrics." Use the LLM as a product strategist — challenge assumptions, identify risks.',
        tip: 'Ask for a Lean Canvas output format. This structures your thinking and catches gaps.',
      },
      {
        title: 'Phase 2 — Product Ownership (Best LLM: ChatGPT + Claude)',
        description:
          'Turn strategy into tickets. Use ChatGPT to break the MVP into epics and user stories. Then use Claude to review the product spec for edge cases and missing features. Create a backlog of 10-15 tickets for your first sprint.',
        tip: 'Output as markdown files in your project repo. Cursor can read these directly.',
      },
      {
        title: 'Phase 3 — Research (Best LLM: Perplexity + Gemini)',
        description:
          'Research your tech stack, competitors, and best practices. Use Perplexity for up-to-date documentation and API references. Use Gemini for deep-dive research into architecture patterns and edge cases.',
      },
      {
        title: 'Phase 4 — Ideation & Architecture (Best LLM: Claude)',
        description:
          'Design your system architecture. Claude excels here — it understands the full picture. Ask for: data model, API routes, component tree, and state management plan. Review and iterate before writing code.',
        tip: 'Ask Claude to generate a PRD (Product Requirements Document) — this becomes your blueprint.',
      },
      {
        title: 'Phase 5 — Coding (Best LLM: Cursor + Claude)',
        description:
          'Start with Cursor\'s Agent mode. Provide your PRD + tickets and let it scaffold the project. For complex logic, switch to Claude for implementation. Use Cursor\'s Composer for multi-file changes.',
      },
      {
        title: 'Phase 6 — Code Review (Best LLM: Claude)',
        description:
          'After each feature, paste the diff into Claude. Ask: "Review this for bugs, security issues, performance problems, and edge cases." Claude catches things human reviewers miss.',
      },
      {
        title: 'Phase 7 — Testing (Best LLM: ChatGPT + Devin)',
        description:
          'Generate test suites with ChatGPT. For E2E testing, describe your user flows and let it write Playwright/Cypress tests. Devin can autonomously run and fix failing tests.',
      },
      {
        title: 'Phase 8 — Deployment (Best LLM: ChatGPT)',
        description:
          'Use ChatGPT for DevOps: Dockerfile generation, CI/CD configuration, environment variable management. Deploy with Vercel for frontend, Railway/Render for backend. Let ChatGPT debug deployment errors.',
        tip: 'Ask ChatGPT to write a deployment checklist — you\'ll follow it in <30 min.',
      },
    ],
    pro_tips: [
      'Keep a project-level markdown file with all decisions — feed it to every new LLM session for context',
      'The full pipeline from idea to deploy takes 1-2 weeks for a solo dev using this workflow',
      'Don\'t skip Phase 1-4 — 80% of projects fail because of poor planning, not bad code',
      'Record your MVP build as content — \"Building in 2 weeks with AI\" is a top-performing format',
    ],
    common_mistakes: [
      {
        mistake: 'Jumping straight to coding without architecture planning',
        fix: 'Spend 2 hours on phases 1-4. It will save you 20+ hours of refactoring later.',
      },
      {
        mistake: 'Using one LLM for all pipeline stages',
        fix: 'Each stage has a best-fit LLM. Use the recommendations above. The cost difference is negligible vs. the quality gain.',
      },
    ],
    pipeline_stage: 'deployment',
    revenue_impact: 'From idea to deployment in days instead of weeks',
    real_results: [
      { metric: 'Time to Deploy', value: '3-7 days', description: 'Full pipeline from idea to production' },
      { metric: 'Tool Switching Saved', value: '5+ tools', description: 'Unified AI pipeline replaces fragmented toolchain' },
    ],
  },
  {
    slug: 'best-llms-for-strategic-planning',
    title: 'Best LLMs for Strategic Planning',
    subtitle: 'Think bigger, plan smarter',
    description:
      'A comparison of how different LLMs perform as strategic advisors. Covering business planning, competitive analysis, go-to-market strategy, and risk assessment. Includes prompt patterns that produce VC-quality analysis.',
    related_tool_slugs: ['chatgpt', 'claude', 'perplexity', 'gemini'],
    difficulty: 'Intermediate',
    read_time_minutes: 9,
    icon: '🧠',
    gradient: 'from-violet-500/30 to-fuchsia-500/30',
    steps: [
      {
        title: 'ChatGPT o3 — Best for brainstorming & iteration',
        description:
          'ChatGPT o3 is the best conversational strategist. Use it to: brainstorm business models, refine value propositions, explore pricing strategies, and iterate on ideas rapidly. Its fast response lets you explore 10+ angles in one session.',
        tip: 'Use the "red team" technique: ask it to argue against your idea to find weaknesses.',
      },
      {
        title: 'Claude — Best for deep analysis & risk assessment',
        description:
          'Claude excels at structured strategic thinking. Use it for: competitive analysis (can process 10+ competitor profiles), risk matrices, SWOT analysis, and go-to-market timing. Its reasoning is more methodical and nuanced.',
      },
      {
        title: 'Perplexity — Best for market research',
        description:
          'Perplexity is your research layer. Use it for: finding market size data, reading analyst reports, checking competitor funding/news, and validating assumptions with cited sources. Every claim has a source you can verify.',
      },
      {
        title: 'Gemini — Best for comprehensive analysis',
        description:
          'Gemini\'s 1M context can process your entire business plan, financial model, market research, and competitor analysis in one pass. Ask it to find contradictions, gaps, and opportunities across all documents.',
        tip: 'Upload your pitch deck + financial model + competitor matrix into Gemini and ask for a strategic review.',
      },
      {
        title: 'The winning strategy workflow',
        description:
          'Phase 1: ChatGPT o3 for idea generation + refinement. Phase 2: Perplexity for market validation. Phase 3: Claude for risk analysis. Phase 4: Gemini for comprehensive synthesis. This 4-phase workflow produces better strategy than most consulting firms.',
      },
    ],
    pro_tips: [
      'Create a \"Strategy Vault\" — save the best prompts as a reusable GPT or Claude project',
      'For pricing strategy, always ask AI for 3 models: freemium, subscription, and usage-based — then compare',
      'Use Claude Projects to maintain context across multiple strategic sessions',
    ],
    common_mistakes: [
      {
        mistake: 'Treating AI strategy as final answers instead of inputs',
        fix: 'AI gives you options and analysis. Use your judgment for the final decision.',
      },
      {
        mistake: 'Not verifying market size claims',
        fix: 'Always ask for sources and verify with Perplexity before using data in pitches or plans.',
      },
    ],
    pipeline_stage: 'planning',
    revenue_impact: 'Better strategic decisions with AI-powered market analysis',
    real_results: [
      { metric: 'Planning Efficiency', value: '3x faster', description: 'Competitive analysis in hours instead of days' },
      { metric: 'Decision Confidence', value: 'Higher', description: 'Data-backed strategy with AI research synthesis' },
    ],
  },
  {
    slug: 'best-agent-roles-for-solopreneurs',
    title: 'Best AI Agent Roles for Solopreneurs',
    subtitle: 'Build your one-person team',
    description:
      'The most effective AI agent roles for solo founders, ranked by impact. From coding assistant to marketing agent to customer support — configure your AI team to maximize output with minimal overhead.',
    related_tool_slugs: ['cursor', 'chatgpt', 'perplexity', 'claude', 'canva-ai', 'elevenlabs'],
    difficulty: 'Beginner',
    read_time_minutes: 11,
    icon: '🤖',
    gradient: 'from-amber-500/30 to-orange-500/30',
    steps: [
      {
        title: 'Agent Role #1: The CTO (Coding Assistant)',
        description:
          'Best tools: Cursor (primary), Claude (secondary). Your CTO handles: architecture decisions, code generation, debugging, code review, and deployment. Set up Cursor with your project context and let it drive development.',
        tip: 'Create a CLAUDE.md in your repo that lists your tech stack, coding conventions, and deployment process.',
      },
      {
        title: 'Agent Role #2: The Marketing Lead (Content & Growth)',
        description:
          'Best tools: ChatGPT (strategy + copy), Canva AI (visuals), Perplexity (research). Your marketing lead handles: content calendars, blog posts, social media copy, email sequences, and SEO strategy.',
      },
      {
        title: 'Agent Role #3: The Customer Support Rep',
        description:
          'Best tools: ChatGPT (response drafting), ElevenLabs (voice support). Create a knowledge base document of your FAQs, product specs, and policies. Feed it to ChatGPT for consistent, on-brand customer responses.',
      },
      {
        title: 'Agent Role #4: The CFO/Accountant',
        description:
          'Best tools: ChatGPT (financial modeling), Gemini (document analysis). Handle: pricing analysis, cost projections, budget tracking, and invoice review. Upload spreadsheets to Gemini for comprehensive analysis.',
      },
      {
        title: 'Agent Role #5: The Operations Manager',
        description:
          'Best tools: ChatGPT (process design), Perplexity (best practices). Your ops manager handles: workflow optimization, vendor evaluation, timeline management, and process documentation.',
        tip: 'Ask ChatGPT to create standard operating procedures (SOPs) for recurring tasks. Save as markdown.',
      },
      {
        title: 'Assemble your AI team',
        description:
          'Start with 2-3 roles and expand. Most solopreneurs find the CTO + Marketing Lead combo covers 80% of their needs. Add roles as your business grows. The total cost: ~$60-100/mo for all tools.',
      },
    ],
    pro_tips: [
      'Create a \"Company Wiki\" document — your AI agents need context about your business to be effective',
      'Set up recurring AI meetings: Sunday planning (ChatGPT), Wednesday review (Claude), Friday execution check (Cursor)',
      'Keep a \"Lessons Learned\" doc that you feed back into your AI agents — they get better over time',
    ],
    common_mistakes: [
      {
        mistake: 'Trying to use all AI agent roles at once',
        fix: 'Start with CTO + Marketing. Add more when you feel the bottleneck. Over-automation kills productivity.',
      },
      {
        mistake: 'Not maintaining context between sessions',
        fix: 'Keep a running document that captures decisions, status, and next steps. Feed it to each AI session.',
      },
    ],
    pipeline_stage: 'deployment',
    revenue_impact: 'Automate entire workflows with multi-agent AI teams',
    real_results: [
      { metric: 'Tasks Automated', value: '15+', description: 'Recurring weekly tasks now fully autonomous' },
      { metric: 'Hours/Week Saved', value: '20+ hours', description: 'AI agent team handles delegation and execution' },
    ],
  },

  // ════════════════════════════════════════════════════
  // NEW PLAYBOOK: AI-Powered Market Research
  // ════════════════════════════════════════════════════
  {
    slug: 'ai-powered-market-research',
    title: 'AI-Powered Market Research',
    subtitle: 'Competitive analysis, market sizing & customer research',
    description:
      'Learn how to use AI tools for comprehensive market research: competitive analysis, market sizing, customer persona development, and trend spotting. Replace weeks of manual research with AI-powered analysis in hours.',
    related_tool_slugs: ['perplexity', 'gemini', 'chatgpt'],
    difficulty: 'Intermediate',
    read_time_minutes: 10,
    icon: '🔬',
    gradient: 'from-sky-500/30 to-cyan-500/30',
    steps: [
      {
        title: 'Define your research scope with ChatGPT',
        description:
          'Start by asking ChatGPT to structure your research. Provide your industry, target market, and key questions. Get a research framework with hypotheses to test, data points to collect, and sources to investigate.',
        tip: 'Use the prompt: \'Act as a market research consultant. I need to understand [industry/market]. Create a research framework with: 5 key questions, data sources, competitor categories, and success metrics.\'',
      },
      {
        title: 'Deep-dive competitive analysis with Perplexity',
        description:
          'Use Perplexity to research each competitor: funding history, product features, pricing, customer reviews, and market positioning. Perplexity cites sources, so you can verify claims and cite original research.',
        tip: 'Create a Perplexity Collection per competitor. Ask: \'What are [Competitor]\'s latest features, pricing changes, and customer sentiment in Q1 2026?\' Save all sources.',
      },
      {
        title: 'Market sizing with Gemini long-context',
        description:
          'Upload industry reports, analyst PDFs, and competitor financials into Gemini (1M context). Ask it to: extract market size data, identify growth rates per segment, and build a TAM/SAM/SOM model.',
        tip: 'Gemini can process 10+ industry reports simultaneously. Ask for a market sizing table with sources for each data point.',
      },
      {
        title: 'Customer persona development with ChatGPT',
        description:
          'Feed ChatGPT customer interview transcripts, support tickets, and review data. Ask it to identify patterns, create detailed personas, and map customer journeys. Validate personas with real data.',
        tip: 'Upload anonymized support transcripts. Ask \'Identify 3 distinct customer segments based on the problems they describe. Create a persona for each.\'',
      },
      {
        title: 'Trend spotting with Perplexity + ChatGPT',
        description:
          'Ask Perplexity for emerging trends with recently published sources. Then use ChatGPT to synthesize trends, identify patterns, and create a trend impact matrix (probability × impact).',
      },
      {
        title: 'Synthesize findings into a research report',
        description:
          'Use ChatGPT to combine all findings into a structured report: executive summary, competitive landscape, market sizing, customer personas, trends, and recommendations. Add a SWOT analysis and action plan.',
        tip: 'Ask for the report in a startup-pitch format: 10 slides max, investor-ready. Then export to Google Slides via AI.',
      },
    ],
    pro_tips: [
      'Create a \'Research Dashboard\' in Perplexity — organize competitors and topics into collections for one-click updates',
      'Always ask AI for \'What am I missing?\' as a final question — it catches blind spots',
      'Use Gemini\'s 1M context to compare 3+ competitor pricing pages simultaneously',
      'Save every research output to a shared workspace (Notion/Google Docs) for team access',
    ],
    common_mistakes: [
      {
        mistake: 'Relying on a single AI source for market data',
        fix: 'Cross-verify all market claims across Perplexity (cited sources) and Gemini (analyst reports). AI can hallucinate statistics.',
      },
      {
        mistake: 'Not updating research periodically',
        fix: 'Set a monthly Perplexity search for each competitor. Markets change fast — stale data is worse than no data.',
      },
    ],
    pipeline_stage: 'research',
    revenue_impact: 'Save $5K-15K on market research consulting fees and 2-3 weeks per project',
    real_results: [
      { metric: 'Research Time Saved', value: '80%', description: 'Competitive analysis in 2 hours vs 2 weeks manually' },
      { metric: 'Cost Savings', value: '$5-15K', description: 'Replaces agency/consultant market research fees' },
      { metric: 'Persona Accuracy', value: '90%+', description: 'AI-derived personas validated against real customer data' },
    ],
  },

  // ════════════════════════════════════════════════════
  // NEW PLAYBOOK: AI Testing & QA Automation
  // ════════════════════════════════════════════════════
  {
    slug: 'ai-testing-qa-automation',
    title: 'AI Testing & QA Automation',
    subtitle: 'Automated testing, bug detection & code quality',
    description:
      'Use AI to automate testing and quality assurance: generate test suites, detect edge cases, review code for bugs, and ensure production readiness. Essential for solopreneurs shipping without a dedicated QA team.',
    related_tool_slugs: ['claude', 'chatgpt', 'cursor'],
    difficulty: 'Intermediate',
    read_time_minutes: 9,
    icon: '✅',
    gradient: 'from-green-500/30 to-emerald-500/30',
    steps: [
      {
        title: 'Generate comprehensive test suites with ChatGPT',
        description:
          'Describe your feature and ask ChatGPT to generate unit tests, integration tests, and edge case tests. Provide your tech stack (Jest, Playwright, Cypress) and let it write complete test files.',
        tip: 'Prompt: \'Generate Jest tests for this React component. Include: 5 happy-path tests, 5 edge cases, and 3 error-state tests. Use @testing-library/react.\'',
      },
      {
        title: 'AI-powered code review with Claude',
        description:
          'Paste your code diff or entire files into Claude. Ask it to review for: security vulnerabilities, performance bottlenecks, race conditions, memory leaks, and logic errors. Claude reads code like a senior engineer.',
        tip: 'Create a Claude Project with your codebase context. Paste the diff and ask \'What edge cases am I missing? What security issues exist?\'',
      },
      {
        title: 'Automated bug detection with Cursor Agent',
        description:
          'Use Cursor\'s Agent mode to auto-detect bugs. Run your app, encounter an error, paste the error into Cursor\'s chat. It will trace the stack, identify the root cause, and propose a fix.',
        tip: 'Cursor\'s Agent can self-heal runtime errors. Let it read the error, trace the call stack, and apply a fix. Review before accepting.',
      },
      {
        title: 'End-to-end testing with Playwright + AI',
        description:
          'Describe your user flows and let ChatGPT generate Playwright/Cypress E2E tests. Include: login flows, payment flows, error handling, and responsive layouts.',
        tip: 'Prompt: \'Write 10 Playwright E2E tests for a SaaS app: signup, login, create project, invite teammate, process payment, cancel subscription. Use page object model.\'',
      },
      {
        title: 'Regression testing with AI diff analysis',
        description:
          'After code changes, paste the before/after diff into Claude. Ask it to identify: unintended side effects, broken functionality, API contract changes, and UI regressions.',
        tip: 'Set up a CI step that runs diffs through Claude automatically on each PR. Catches regressions before they reach production.',
      },
    ],
    pro_tips: [
      'Create a \'Test Spec Document\' in your repo — feed it to AI every time you generate tests for consistency',
      'Use Claude\'s 200K context to review your entire codebase at once for cross-cutting security issues',
      'Set up GitHub Actions + Claude API for automated PR reviews — catches bugs before you even see the code',
      'Generate accessibility (a11y) tests with AI: ask ChatGPT to check for ARIA labels, keyboard navigation, and contrast ratios',
    ],
    common_mistakes: [
      {
        mistake: 'Generating tests without running them first',
        fix: 'Always run generated tests immediately. AI occasionally imports wrong libraries or uses incorrect API patterns.',
      },
      {
        mistake: 'Skipping edge case generation',
        fix: 'Explicitly ask AI for edge cases: \'Generate tests for: empty state, loading state, error state, network failure, rate limiting, concurrency, and invalid input.\'',
      },
    ],
    pipeline_stage: 'review',
    revenue_impact: 'Reduce QA costs by 70% and catch 3x more bugs before production',
    real_results: [
      { metric: 'Bugs Caught Pre-Production', value: '3x more', description: 'AI review catches edge cases human reviewers miss' },
      { metric: 'QA Time Reduction', value: '70%', description: 'Automated test generation + AI review replaces manual QA' },
      { metric: 'Test Coverage', value: '90%+', description: 'AI generates comprehensive edge-case tests in minutes' },
    ],
  },

  // ════════════════════════════════════════════════════
  // PHASE 6 — NEW PLAYBOOK: AI for Education
  // ════════════════════════════════════════════════════
  {
    slug: 'ai-for-education-and-tutoring',
    title: 'AI for Education & Tutoring',
    subtitle: 'Personalized learning with AI tutors',
    description:
      'Use AI tools to create personalized learning experiences: AI tutoring, lesson planning, quiz generation, and progress tracking. Ideal for teachers, tutors, students, and self-learners who want to accelerate learning with AI assistance.',
    related_tool_slugs: ['chatgpt', 'gemini', 'khanmigo', 'duolingo-max', 'notion-ai', 'perplexity'],
    difficulty: 'Beginner',
    read_time_minutes: 9,
    icon: '📚',
    gradient: 'from-blue-500/30 to-indigo-500/30',
    steps: [
      {
        title: 'Set up AI tutoring with Khanmigo',
        description:
          'Khanmigo is the best AI tutor for structured subjects (math, science, history). It uses Socratic questioning — it doesn\'t give answers, it guides students to find them. Perfect for homework help and concept mastery.',
        tip: 'Khanmigo is free for teachers and $44/year for students. Use it as your primary tutoring assistant.',
      },
      {
        title: 'Generate lesson plans with ChatGPT',
        description:
          'Feed ChatGPT your curriculum, grade level, and learning objectives. Ask for: complete lesson plans, slide outlines, discussion questions, and assessment rubrics. Customize for different learning styles.',
        tip: 'Prompt: "Create a 45-minute lesson plan for [topic] at [grade level]. Include: hook activity, 3 learning stations, discussion questions, exit ticket, and differentiation for ELL students."',
      },
      {
        title: 'Create interactive quizzes with Gemini',
        description:
          'Use Gemini to generate quizzes with distractors, explanations for wrong answers, and adaptive difficulty. Its long 1M context can process entire textbooks to create comprehensive assessments.',
      },
      {
        title: 'Build a study guide with Notion AI',
        description:
          'Use Notion AI to compile notes, flashcards, and study guides. Ask Notion AI to summarize chapters, create concept maps, and generate practice problems.',
        tip: 'Create a Notion template with: key concepts, vocabulary, practice problems, and self-assessment checklist.',
      },
      {
        title: 'Practice language learning with Duolingo Max',
        description:
          'Duolingo Max uses GPT-4 for roleplay exercises and explain-my-answer features. Use Gemini for immersion: ask it to write stories at your language level, then read and translate.',
      },
      {
        title: 'Research topics with Perplexity',
        description:
          'Students can use Perplexity for research projects. Every answer comes with citations, teaching source evaluation and critical thinking. Perplexity Pro includes academic mode for paper citations.',
      },
    ],
    pro_tips: [
      'Create a "Learning Journey" document in Notion — track what you study, AI-generated summaries, and progress',
      'Use ChatGPT to explain concepts at different levels: "Explain quantum computing to a 10-year-old" then "Explain it at a graduate level"',
      'Teachers: Use AI to generate 3 differentiation levels for every lesson (remedial, standard, advanced)',
      'Students: Ask AI for mnemonics and memory techniques for any subject you\'re studying',
    ],
    common_mistakes: [
      {
        mistake: 'Letting AI tutor give answers instead of guiding',
        fix: 'Use Khanmigo or prompt ChatGPT: "Don\'t give me the answer, ask me guiding questions instead."',
      },
      {
        mistake: 'Not verifying AI-generated content for accuracy',
        fix: 'Cross-reference AI quiz questions and lesson content with your curriculum standards and textbooks.',
      },
    ],
    pipeline_stage: 'content',
    revenue_impact: 'Teachers save 10+ hours/week on lesson planning with AI-generated materials',
    real_results: [
      { metric: 'Planning Time Saved', value: '10+ hours/week', description: 'AI lesson plans, quizzes, and worksheets replace manual prep' },
      { metric: 'Student Engagement', value: '+25%', description: 'Personalized AI tutoring improves comprehension and retention' },
      { metric: 'Tutoring Cost', value: '90% less', description: 'AI tutor vs. human tutor for daily homework help' },
    ],
  },

  // ════════════════════════════════════════════════════
  // PHASE 6 — NEW PLAYBOOK: AI for Customer Support
  // ════════════════════════════════════════════════════
  {
    slug: 'ai-for-customer-support',
    title: 'AI for Customer Support',
    subtitle: 'Automate support with AI agents',
    description:
      'Build an AI-powered customer support system that handles 80%+ of tickets automatically. Using RAG pipelines, AI chatbots, and smart escalation. Cut support costs while improving response times and customer satisfaction.',
    related_tool_slugs: ['intercom-ai', 'zendesk-answer-bot', 'chatgpt', 'langchain', 'intercom-fin', 'deepl'],
    difficulty: 'Intermediate',
    read_time_minutes: 10,
    icon: '💬',
    gradient: 'from-emerald-500/30 to-teal-500/30',
    steps: [
      {
        title: 'Audit your current support volume',
        description:
          'Export your last 3 months of support tickets. Categorize by topic, frequency, and resolution time. The top 5-10 categories (usually 60-70% of volume) are candidates for AI automation.',
        tip: 'Ask ChatGPT to analyze your ticket export: "Categorize these 500 support tickets. Identify the top 10 recurring issues and their frequency."',
      },
      {
        title: 'Build your knowledge base',
        description:
          'Document solutions for the most common issues. Use ChatGPT to turn past ticket resolutions into clear Q&A articles. Each entry: problem, solution, common variations, and escalation criteria.',
        tip: 'Format your knowledge base as markdown files organized by category. This feeds directly into RAG pipelines.',
      },
      {
        title: 'Set up an AI chatbot',
        description:
          'Use Intercom Fin for a managed solution (connects to your knowledge base, handles 50%+ instantly) or build a custom RAG chatbot with LangChain + OpenAI for more control and lower cost at scale.',
        tip: 'Intercom Fin is best for quick setup (<1 hour). LangChain custom build is better if you have 10K+ monthly tickets.',
      },
      {
        title: 'Implement smart escalation',
        description:
          'Set confidence thresholds: 90%+ confidence → auto-respond. 70-90% → AI drafts response, human approves. <70% → route to human immediately. Review weekly to improve the knowledge base.',
      },
      {
        title: 'Add multilingual support',
        description:
          'Use DeepL API to translate customer messages and AI responses. This doubles your coverage with minimal cost (~$0.02/translation). Configure auto-detection of customer language.',
      },
      {
        title: 'Monitor and improve continuously',
        description:
          'Track: auto-resolution rate, CSAT for AI vs human, escalation rate, and top unresolved topics. Every week, add solutions for the top unresolved issues to your knowledge base.',
      },
    ],
    pro_tips: [
      'Always give customers an easy "talk to human" option — AI support with no escape route frustrates users',
      'Use sentiment analysis: when customer sentiment drops below a threshold, auto-escalate to a human',
      'Create an internal Slack/Teams channel for AI escalations with pre-formatted context summaries',
      'Start with email/ticket support before adding live chat — async support is easier to automate well',
    ],
    common_mistakes: [
      {
        mistake: 'Launching AI support without testing edge cases',
        fix: 'Run 100 random historical tickets through your AI system first. Check whether responses are accurate, on-brand, and helpful.',
      },
      {
        mistake: 'Not updating the knowledge base regularly',
        fix: 'Set a weekly review of tickets the AI couldn\'t handle. Add 5-10 new Q&A entries each week.',
      },
    ],
    pipeline_stage: 'deployment',
    revenue_impact: 'Reduce support costs by 60-80% while maintaining or improving CSAT scores',
    real_results: [
      { metric: 'Auto-Resolution Rate', value: '75-85%', description: 'Tickets resolved without human intervention' },
      { metric: 'Cost Reduction', value: '60-80%', description: 'From $2K/mo support tool + staff to $200/mo AI system' },
      { metric: 'Response Time', value: '<5 seconds', description: 'Down from 4-24 hour average with AI responses' },
    ],
  },

  // ════════════════════════════════════════════════════
  // PHASE 6 — NEW PLAYBOOK: AI for Design & Creative
  // ════════════════════════════════════════════════════
  {
    slug: 'ai-for-design-and-creative',
    title: 'AI for Design & Creative',
    subtitle: 'Design everything with AI',
    description:
      'Master AI-powered design tools for creating visual content: logos, marketing materials, UI mockups, product photography, and video assets. No design skills required — just clear vision and the right tools.',
    related_tool_slugs: ['canva-ai', 'midjourney', 'leonardo-ai', 'runway', 'gamma', 'chatgpt', 'pika', 'sana-ai'],
    difficulty: 'Beginner',
    read_time_minutes: 9,
    icon: '🎨',
    gradient: 'from-rose-500/30 to-violet-500/30',
    steps: [
      {
        title: 'Generate brand assets with Midjourney',
        description:
          'Use Midjourney to create logos, brand illustrations, and visual identity elements. Describe your brand style in detail: "Professional fintech brand, clean lines, blue and gold palette, minimalist, 3D isometric style."',
        tip: 'Use Midjourney\'s style reference (--sref) to maintain consistency across all generated assets.',
      },
      {
        title: 'Create marketing visuals with Canva AI',
        description:
          'Canva Magic Studio offers: Magic Design (generates complete templates from text), Magic Eraser (removes backgrounds), Magic Expand (extends images), and Magic Animate (adds motion). Use it for social media, ads, and presentations.',
        tip: 'Create a Canva Brand Kit with your colors, fonts, and logos. AI will auto-apply your brand to every design.',
      },
      {
        title: 'Generate product photography with Leonardo AI',
        description:
          'Leonardo AI excels at product mockups and photography. Create photorealistic product images on any background. Use the \'Product Photography\' preset for consistent, e-commerce-ready outputs.',
      },
      {
        title: 'Create presentations with Gamma',
        description:
          'Gamma generates complete slide decks from a prompt. Upload your content and pick a theme. It creates coherent, well-designed presentations with charts, images, and layouts in minutes.',
      },
      {
        title: 'Edit and animate with Runway',
        description:
          'Runway Gen-3 handles: text-to-video for background clips, video-to-video for style transfers, inpainting for frame editing, and motion brush for animation. Use it to bring static designs to life.',
        tip: 'Start with Gen-3 Turbo for speed, use Gen-3 Alpha for quality. Export at consistent settings for your platform.',
      },
      {
        title: 'Polish UI mockups with ChatGPT',
        description:
          'Describe your UI vision to ChatGPT for layout suggestions, component descriptions, and design rationale. Use it to write design specs that Midjourney or Canva can execute.',
      },
    ],
    pro_tips: [
      'Create a \'Prompt Library\' in Notion — save your best prompts organized by asset type (logo, social, presentation, mockup)',
      'For brand consistency, always include style references: color palette, mood board images, and brand voice description',
      'Batch-generate: run 20 prompts at once, pick the best 5, refine, then finalize. Don\'t generate one at a time',
      'Use Leonardo AI\'s API for automated batch product photography at scale',
    ],
    common_mistakes: [
      {
        mistake: 'Not using style references for brand consistency',
        fix: 'Every tool has a style reference feature. Always include brand colors, style keywords, and reference images.',
      },
      {
        mistake: 'Generating high-res before nailing the concept',
        fix: 'Start with quick drafts (512x512, low quality) to iterate on ideas. Only render final quality once you\'re satisfied.',
      },
    ],
    pipeline_stage: 'content',
    revenue_impact: 'Design costs drop from $5K/mo agency to $100/mo AI tooling for a startup',
    real_results: [
      { metric: 'Design Output', value: '5x faster', description: 'From brief to final design in hours instead of days' },
      { metric: 'Cost Savings', value: '90%+', description: 'Replaces agency/contractor design costs for startups' },
      { metric: 'Iteration Speed', value: '10x', description: 'Generate, review, refine — AI enables rapid design iteration' },
    ],
  },

  // ════════════════════════════════════════════════════
  // PHASE 6 — NEW PLAYBOOK: AI for Finance & Analysis
  // ════════════════════════════════════════════════════
  {
    slug: 'ai-for-finance-and-analysis',
    title: 'AI for Finance & Analysis',
    subtitle: 'Financial analysis, modeling & reporting with AI',
    description:
      'Use AI tools for financial analysis: financial modeling, market research, report generation, budget tracking, and investment research. Designed for analysts, CFOs, investors, and business owners who need faster, data-backed financial decisions.',
    related_tool_slugs: ['gemini', 'chatgpt', 'perplexity', 'exa', 'notion-ai', 'claude'],
    difficulty: 'Intermediate',
    read_time_minutes: 10,
    icon: '📊',
    gradient: 'from-amber-500/30 to-yellow-500/30',
    steps: [
      {
        title: 'Build financial models with ChatGPT',
        description:
          'Describe your business model and ask ChatGPT to build a financial model: revenue projections, cost structure, unit economics, cash flow, and breakeven analysis. It can output as spreadsheet formulas or Python code.',
        tip: 'Prompt: "Build a 3-year financial model for a SaaS startup with $100/mo subscription, 5% monthly growth, 30% churn year 1, 60% gross margin. Include revenue, costs, cash flow, and key metrics."',
      },
      {
        title: 'Analyze financial documents with Gemini',
        description:
          'Upload earnings reports, 10-K filings, balance sheets, or investment memoranda into Gemini. Its 1M context processes entire documents at once. Ask for: key metrics extraction, trend analysis, risk factors, and peer comparison.',
        tip: 'Upload 5 competitor quarterly reports simultaneously and ask Gemini for a comparative financial health analysis.',
      },
      {
        title: 'Research markets with Perplexity',
        description:
          'Use Perplexity for investment research: market trends, sector performance, competitor analysis, and macroeconomic indicators. Every claim has cited sources you can verify and use in reports.',
        tip: 'Set up Perplexity Collections for each stock/industry you track. Run weekly \'Pro Search\' for updates.',
      },
      {
        title: 'Deep-dive company research with Exa',
        description:
          'Exa is purpose-built for company and industry research. Use it to find: funding history, partnership announcements, product launches, leadership changes, and customer sentiment from across the web.',
      },
      {
        title: 'Automate financial reporting with Claude',
        description:
          'Feed Claude raw financial data and ask it to generate: board reports, investor updates, variance analysis, and KPI dashboards. Claude\'s structured output makes it perfect for consistent, professional financial communications.',
      },
      {
        title: 'Track budgets with Notion AI',
        description:
          'Set up a Notion database for budget tracking with categories, actuals, and forecasts. Use Notion AI to: summarize monthly spending, flag overages, and generate budget vs actual reports.',
        tip: 'Create a Notion template with: monthly budget, actual spending, variance, and AI-generated insights.',
      },
    ],
    pro_tips: [
      'Always export AI-generated financial models as CSV/Excel and validate with your own formulas before using for decisions',
      'Use Gemini for document analysis (best at processing long PDFs), ChatGPT for model building (best at structured output), Perplexity for research (best at cited sources)',
      'Create a \'Financial Dashboard\' in Notion with AI-generated weekly summaries pulled from your data',
      'For investment research, always do the final check yourself — AI can hallucinate stock prices and financial metrics',
    ],
    common_mistakes: [
      {
        mistake: 'Relying on AI for final investment decisions',
        fix: 'Use AI for research and analysis. Final investment decisions require human judgment and risk assessment.',
      },
      {
        mistake: 'Not verifying AI-generated financial projections',
        fix: 'Always check: are growth rates realistic? Are cost assumptions aligned with industry benchmarks? Does the model handle edge cases?',
      },
    ],
    pipeline_stage: 'research',
    revenue_impact: 'Financial analysis tasks in hours instead of days, saving $2K-5K/week in analyst time',
    real_results: [
      { metric: 'Report Creation Time', value: '80% faster', description: 'From 2 days to 2 hours for quarterly financial reports' },
      { metric: 'Model Accuracy', value: '95%+', description: 'AI-generated models match manual models after validation' },
      { metric: 'Research Coverage', value: '3x more', description: 'Cover 30+ companies/assets/week with AI-assisted research' },
    ],
  },

  // ════════════════════════════════════════════════════
  // PHASE 6 — NEW PLAYBOOK: AI for Marketing Automation
  // ════════════════════════════════════════════════════
  {
    slug: 'ai-for-marketing-automation',
    title: 'AI for Marketing Automation',
    subtitle: 'Full-stack marketing with AI from strategy to analytics',
    description:
      'Automate your entire marketing workflow with AI: strategy development, content creation, SEO optimization, email campaigns, social media management, and performance analytics. Built for marketing teams and solopreneurs who want agency-quality output at a fraction of the cost.',
    related_tool_slugs: ['chatgpt', 'perplexity', 'semrush', 'ahrefs', 'surferseo', 'copy-ai', 'canva-ai', 'jasper', 'exa'],
    difficulty: 'Intermediate',
    read_time_minutes: 11,
    icon: '📈',
    gradient: 'from-fuchsia-500/30 to-rose-500/30',
    steps: [
      {
        title: 'Develop your marketing strategy with ChatGPT',
        description:
          'Describe your product, target audience, and budget. Ask ChatGPT for: go-to-market strategy, customer segments, channel mix, content themes, and campaign calendar. Iterate with follow-up questions.',
        tip: 'Prompt: "Create a 90-day marketing plan for a B2B SaaS tool targeting APAC SMBs. Budget: $3K/mo. Include: channel strategy, content calendar, KPI targets, and budget allocation."',
      },
      {
        title: 'Research keywords and SEO with Semrush',
        description:
          'Use Semrush for keyword research, competitor SEO analysis, and content gap analysis. Export findings and feed into ChatGPT for content briefs. Surfer SEO optimizes content for ranking while you write.',
        tip: 'Semrush + ChatGPT combo: export keyword clusters, paste into ChatGPT, get optimized content briefs with headings and key points.',
      },
      {
        title: 'Create content at scale with Copy.ai',
        description:
          'Copy.ai is purpose-built for marketing content: blog posts, landing pages, email sequences, social media copy, ad copy, and PR. Create workflows that generate 10+ content pieces from one strategy doc.',
      },
      {
        title: 'Optimize content for search with Surfer SEO',
        description:
          'Use Surfer SEO\'s AI content editor that scores your writing against top-ranking pages. It recommends: word count, headings, keywords, images, and readability. Write in Surfer or paste ChatGPT output for optimization.',
        tip: 'Write the first draft in ChatGPT, paste into Surfer SEO, follow its recommendations, and you\'ll rank page 1 for mid-competition keywords.',
      },
      {
        title: 'Create email campaigns with Jasper',
        description:
          'Jasper excels at email marketing: sequence design, subject lines, body copy, CTAs, and A/B testing variants. Use its brand voice feature to ensure consistency across all email touchpoints.',
        tip: 'Create a \'Brand Voice\' profile in Jasper with your tone, vocabulary, and constraints. All marketing copy will sound like you.',
      },
      {
        title: 'Analyze performance with ChatGPT + Exa',
        description:
          'Export your marketing analytics (Google Analytics, social media insights, email stats) and upload to ChatGPT for analysis. Use Exa to benchmark your performance against competitors and industry standards.',
      },
    ],
    pro_tips: [
      'Create a \'Marketing Command Center\' in Notion — one dashboard with strategy docs, content calendar, campaign tracker, and KPI dashboard',
      'Use AI for A/B testing: generate 10 subject line variants, 5 email templates, 3 landing page versions — test all in one campaign',
      'Set up a weekly AI marketing review: paste this week\'s analytics into ChatGPT for automated insights and recommendations',
      'Build a 30-day content bank: 30 blog posts, 60 social posts, 15 email sequences — generated, optimized, and scheduled in one weekend',
    ],
    common_mistakes: [
      {
        mistake: 'Using AI content without SEO optimization',
        fix: 'Always run AI-generated content through Surfer SEO or your preferred optimization tool. Unoptimized AI content rarely ranks.',
      },
      {
        mistake: 'Not maintaining a consistent brand voice',
        fix: 'Use tools with brand voice features (Jasper, Copy.ai) or include brand voice guidelines in every ChatGPT prompt.',
      },
    ],
    pipeline_stage: 'marketing',
    revenue_impact: 'Replace a $10K/mo marketing agency with $300/mo in AI tools for in-house content creation',
    real_results: [
      { metric: 'Content Output', value: '5x more', description: '10 blog posts + 30 social posts + 5 emails per week vs 2 blog posts manually' },
      { metric: 'Cost Savings', value: '97%', description: 'From $10K/mo agency to $300/mo AI tooling' },
      { metric: 'Organic Traffic Growth', value: '+200%', description: 'SEO-optimized AI content drives measurable traffic increases' },
    ],
  },

  // ════════════════════════════════════════════════════
  // PHASE 7 — NEW PLAYBOOKS (for Real Estate, Healthcare, Ecommerce, HR, Legal, F&B, Gaming, Startups)
  // ════════════════════════════════════════════════════

  // --- 1: AI for Real Estate ---
  {
    slug: 'ai-for-real-estate',
    title: 'AI for Real Estate',
    subtitle: 'Property valuation, virtual staging & lead gen with AI',
    description:
      'Transform your real estate business with AI: automated property valuations, virtual staging, lead generation, market analysis, listing copywriting, and client communication. Built for agents, brokers, investors, and property managers looking to close deals faster with less overhead.',
    related_tool_slugs: ['chatgpt', 'gemini', 'canva-ai', 'midjourney', 'perplexity', 'claude', 'elevenlabs'],
    difficulty: 'Beginner',
    read_time_minutes: 9,
    icon: '🏠',
    gradient: 'from-sky-500/30 to-blue-500/30',
    steps: [
      {
        title: 'Generate property valuations with ChatGPT',
        description:
          'Describe a property (location, size, beds/baths, condition, recent comps) and ask ChatGPT for a valuation range, price-per-sqft analysis, and market positioning strategy. Use structured prompts for consistent CMAs across your portfolio.',
        tip: 'Prompt: "You are a real estate analyst. Given: 3-bed 2-bath condo in Sai Kung, 850 sqft, renovated 2022, last sold for HK$8M in 2020. Recent comps: unit 5A sold HK$9.2M, unit 12C sold HK$9.8M. Generate CMA with price recommendation, risk factors, and optimal listing strategy."',
      },
      {
        title: 'Create virtual staging images with Midjourney',
        description:
          'Photograph empty rooms, upload the images to Midjourney, and use reference-based generation to furnish rooms virtually. Create multiple design styles (modern, minimalist, Scandinavian, luxury) for the same space to appeal to different buyers.',
        tip: 'Use Midjourney\'s image-to-image: upload empty room photo + prompt "furnished modern living room with natural light, Scandinavian furniture, potted plants, cozy atmosphere --iw 0.5" for realistic staging.',
      },
      {
        title: 'Design marketing materials with Canva AI',
        description:
          'Use Canva AI to create property brochures, flyers, open house signs, social media posts, and video intros from one property template. Canva Magic Write generates listing descriptions in your brand voice.',
      },
      {
        title: 'Research markets with Perplexity + Gemini',
        description:
          'Use Perplexity for neighborhood research: schools, transport, crime rates, development plans, and price trends. Upload master plans and district reports into Gemini for synthesized market intelligence.',
        tip: 'Create a Perplexity Collection per district. Run weekly deep dives on new developments, zoning changes, and infrastructure projects.',
      },
      {
        title: 'Automate client outreach with Claude',
        description:
          'Use Claude to draft personalized listing emails, follow-ups, open house invitations, and market update newsletters. Claude handles tone and personalization at scale.',
      },
      {
        title: 'Create property video walkthroughs with AI',
        description:
          'Use ElevenLabs for voiceover narration and AI video tools for walkthrough montages. Script the tour, generate narration, and match to property photos/video clips.',
        tip: 'Generate 3 versions: 60s social media teaser, 2-min full tour, 5-min deep dive for serious buyers.',
      },
    ],
    pro_tips: [
      'Build a property database in Notion with AI fields: auto-generated CMA summaries from ChatGPT API',
      'Use Midjourney to stage the same room in 3 styles — modern, minimalist, and luxury — and let buyers vote on their favorite',
      'Automate social media: one ChatGPT prompt generates 30 days of property posts, tips, and market updates',
      'Always disclose AI-generated staging images — some markets have disclosure requirements',
    ],
    common_mistakes: [
      {
        mistake: 'Using AI for legal or contractual advice',
        fix: 'AI-generated lease terms and contracts can contain errors. Always have a licensed attorney review legal documents.',
      },
      {
        mistake: 'Over-staging with unrealistic AI images',
        fix: 'Keep virtual staging realistic — furniture that could actually fit, proper lighting, and accurate room dimensions.',
      },
    ],
    pipeline_stage: 'marketing',
    revenue_impact: 'Save $500-2K/listing on staging + photography, close 2x faster with AI-powered lead responses',
    real_results: [
      { metric: 'Listing Response Time', value: '90% faster', description: 'From 4 hours to 15 min for personalized client responses' },
      { metric: 'Content Output', value: '10x more', description: '30 property posts + 5 brochures + 3 video tours per week vs 3 posts manually' },
      { metric: 'Cost Savings', value: '$1.5K/listing', description: 'Eliminated professional staging ($800) + photographer ($700) using AI alternatives' },
    ],
  },

  // --- 2: AI for Healthcare ---
  {
    slug: 'ai-for-healthcare',
    title: 'AI for Healthcare',
    subtitle: 'Medical research, patient comms & clinical workflows with AI',
    description:
      'Leverage AI in healthcare: accelerate medical research, draft patient communications, analyze clinical data, summarize health records, and streamline administrative workflows. Designed for clinicians, researchers, healthcare administrators, and medical students who need HIPAA-aware AI usage.',
    related_tool_slugs: ['perplexity', 'claude', 'chatgpt', 'gemini', 'notion-ai', 'exa'],
    difficulty: 'Intermediate',
    read_time_minutes: 10,
    icon: '🏥',
    gradient: 'from-emerald-500/30 to-teal-500/30',
    steps: [
      {
        title: 'Research medical literature with Perplexity Pro',
        description:
          'Use Perplexity Pro with its deep research mode to search medical databases (PubMed, Cochrane, clinicaltrials.gov). Get cited, up-to-date answers on treatments, drug interactions, clinical guidelines, and emerging research.',
        tip: 'Use focused prompts: "Summarize the latest RCTs on GLP-1 agonists for weight management in non-diabetic patients from 2023-2025, with citations and study design limitations."',
      },
      {
        title: 'Analyze clinical data with Claude',
        description:
          'Upload de-identified clinical data, lab results, or patient cohort data into Claude for analysis. Claude\'s 200K context handles large datasets, identifies patterns, and generates summary reports with statistical insights.',
        tip: 'Always de-identify data before uploading. Use Claude\'s structured output for consistent reporting formats across cohorts.',
      },
      {
        title: 'Draft patient communications with ChatGPT',
        description:
          'Generate patient letters, discharge summaries, referral notes, and educational materials. Customize reading level (5th grade for patients, professional for colleagues) and language.',
        tip: 'Create templates in ChatGPT: "Draft a discharge summary for a 58yo male post-hip replacement, reading level 6, in English and Spanish."',
      },
      {
        title: 'Summarize medical records with Gemini',
        description:
          'Upload patient records, chart notes, or full histories into Gemini. Its massive context window processes entire patient timelines and generates concise summaries with key findings, medication changes, and care plan updates.',
      },
      {
        title: 'Track research with Notion AI + Exa',
        description:
          'Build a Notion research database: track papers, clinical trials, and drug developments. Use Exa for automated web research updates. Notion AI summarizes new entries and flags relevant findings.',
        tip: 'Set up a weekly Notion automation: Exa searches for new papers on your topics of interest → auto-created database entries → Notion AI generates one-paragraph summaries.',
      },
      {
        title: 'Create medical education content with AI',
        description:
          'Use ChatGPT or Claude to create study materials, flashcards, case studies, and presentations. Generate MCQs with explanations for medical student training.',
        tip: 'Prompt: "Create 10 USMLE-style questions on cardiology with answer explanations referencing latest ACC/AHA guidelines."',
      },
    ],
    pro_tips: [
      'Never upload PHI/PII to public AI tools. Use enterprise/HIPAA-compliant instances or de-identify all data first',
      'Perplexity Pro is best for real-time clinical answers with citations — use it as a clinical decision support adjunct',
      'Claude\'s structured outputs are perfect for creating standardized clinical report templates',
      'Create a \'Medical Research Assistant\' system: Perplexity for discovery → Claude for analysis → Notion for storage',
    ],
    common_mistakes: [
      {
        mistake: 'Entering patient-identifiable information into public AI tools',
        fix: 'Always strip names, DOBs, addresses, IDs. Use anonymized patient IDs (Patient-001). Check your institution\'s AI usage policy.',
      },
      {
        mistake: 'Treating AI output as clinical decision-making authority',
        fix: 'AI is an adjunct tool, not a replacement for clinical judgment. Always verify AI-generated recommendations against guidelines.',
      },
    ],
    pipeline_stage: 'research',
    revenue_impact: 'Reduce documentation time by 70%, saving $20K-50K/year per clinician in administrative overhead',
    real_results: [
      { metric: 'Documentation Time', value: '75% faster', description: 'Discharge summaries from 45 min to 10 min per patient' },
      { metric: 'Research Coverage', value: '5x more', description: 'Literature searches cover 5x more sources in the same time' },
      { metric: 'Patient Satisfaction', value: '+25%', description: 'Faster, clearer patient communications improve satisfaction scores' },
    ],
  },

  // --- 3: AI for Ecommerce ---
  {
    slug: 'ai-for-ecommerce',
    title: 'AI for Ecommerce',
    subtitle: 'Product descriptions, chatbot, inventory & personalization',
    description:
      'Supercharge your online store with AI: bulk product descriptions, AI-powered chatbots, inventory forecasting, personalized recommendations, and automated customer support. Built for Shopify, WooCommerce, and custom store owners who want to scale without hiring a team.',
    related_tool_slugs: ['chatgpt', 'canva-ai', 'copy-ai', 'midjourney', 'jasper', 'gemini', 'perplexity', 'exa'],
    difficulty: 'Beginner',
    read_time_minutes: 9,
    icon: '🛒',
    gradient: 'from-orange-500/30 to-amber-500/30',
    steps: [
      {
        title: 'Generate bulk product descriptions with ChatGPT',
        description:
          'Upload your product catalog (CSV/JSON) to ChatGPT and generate SEO-optimized product descriptions in bulk. Specify tone, word count, keywords, and format. Generate titles, meta descriptions, bullet points, and long descriptions all at once.',
        tip: 'Prompt: "I have 200 products in this CSV. Generate: SEO title (60 chars), meta desc (160 chars), 3 bullet features, 2-paragraph description. Tone: friendly expert. Keywords: [list]. Output as CSV."',
      },
      {
        title: 'Create product images with Midjourney',
        description:
          'Generate product images, lifestyle shots, and variations. Use image-to-image for consistent backgrounds. Create seasonal versions, color variants, and use-case scenes without photo shoots.',
        tip: 'Create a brand style reference in Midjourney: consistent background, lighting, angle. Use --cref for consistent character/product appearance across shots.',
      },
      {
        title: 'Design store visuals with Canva AI',
        description:
          'Use Canva AI to create: store banners, product collages, social media ads, email headers, and promotional graphics — all from one brand kit. Canva Magic Studio suggests layouts based on your products.',
      },
      {
        title: 'Set up AI chatbot for customer support',
        description:
          'Use ChatGPT API or a chatbot platform to build a store assistant that answers: order status, shipping questions, size guides, return policies, and product recommendations. Train it on your product catalog and policies.',
        tip: 'Start with FAQ-only mode to prevent hallucinations. Gradually expand to order lookups with read-only API access to your store backend.',
      },
      {
        title: 'Optimize inventory with Perplexity + Gemini',
        description:
          'Use Perplexity for market trend analysis and demand forecasting. Feed insights into Gemini along with your sales history for inventory recommendations: reorder points, seasonal stock levels, and slow-mover alerts.',
      },
      {
        title: 'Create email campaigns with Jasper',
        description:
          'Build email sequences: abandoned cart recovery, post-purchase follow-up, back-in-stock alerts, seasonal promotions, and loyalty offers. Jasper generates personalized variants based on customer segments.',
        tip: 'Run A/B tests on subject lines and CTAs. Jasper can generate 10+ variants for each campaign in minutes.',
      },
    ],
    pro_tips: [
      'Create a product content factory: CSV → ChatGPT → Google Sheets → Shopify import. One pipeline handles 500+ products',
      'Use Perplexity to monitor competitor pricing and promotions weekly — feed insights into your pricing strategy',
      'Set up an AI-powered FAQ system before hiring support staff. Most stores can handle 60-80% of queries with AI',
      'Generate seasonal product variants (Christmas, summer, back-to-school) two months ahead using AI image generation',
    ],
    common_mistakes: [
      {
        mistake: 'Generic AI descriptions that sound like every other store',
        fix: 'Include unique brand voice, specific product measurements, real materials, and actual use cases. Edit AI outputs for authenticity.',
      },
      {
        mistake: 'AI chatbot giving wrong product information',
        fix: 'Always constrain your chatbot to verified product data. Use RAG (retrieval augmented generation) with your actual inventory database.',
      },
    ],
    pipeline_stage: 'marketing',
    revenue_impact: 'Reduce product listing time by 90%, increase conversion through personalized recommendations',
    real_results: [
      { metric: 'Listing Creation Time', value: '95% faster', description: '500 products listed in 2 days vs 4 weeks manually' },
      { metric: 'Conversion Rate', value: '+18%', description: 'AI-generated descriptions and images improved conversion vs generic listings' },
      { metric: 'Support Tickets Automated', value: '70%', description: 'AI chatbot resolved 7 out of 10 customer queries without human intervention' },
    ],
  },

  // --- 4: AI for HR & Recruiting ---
  {
    slug: 'ai-for-hr-and-recruiting',
    title: 'AI for HR & Recruiting',
    subtitle: 'Resume screening, interview prep & onboarding automation',
    description:
      'Revolutionize your HR workflows with AI: automated resume screening, structured interview guides, personalized onboarding, performance review drafting, and employee sentiment analysis. Designed for HR professionals, recruiters, and team leads at growing companies.',
    related_tool_slugs: ['chatgpt', 'claude', 'gemini', 'notion-ai', 'perplexity', 'exa'],
    difficulty: 'Beginner',
    read_time_minutes: 9,
    icon: '👥',
    gradient: 'from-violet-500/30 to-purple-500/30',
    steps: [
      {
        title: 'Automate resume screening with ChatGPT',
        description:
          'Upload batches of resumes (anonymized) to ChatGPT and ask for: candidate ranking against job requirements, skill gap analysis, experience level, culture-fit indicators, and red flags. Use structured output for ATS integration.',
        tip: 'Prompt: "You are a senior recruiter. Screen these 20 resumes for a Senior Product Manager role (requirements included). Output: candidate ID, match score 0-100, top 3 strengths, top 3 gaps, interview recommendation (yes/no/maybe). Output as table."',
      },
      {
        title: 'Generate interview guides with Claude',
        description:
          'Give Claude the job description and candidate profile. Generate: role-specific interview questions, behavioral questions (STAR method), technical assessment prompts, and scoring rubrics. Tailored to each candidate\'s experience.',
        tip: 'Create interview kits: Claude generates 10 situational questions + 5 role-specific questions + 3 take-home challenge options per role template.',
      },
      {
        title: 'Create personalized onboarding with Notion AI',
        description:
          'Build Notion onboarding templates: day-1 checklists, role-specific learning paths, team introductions, and policy documents. Notion AI auto-fills templates with role, department, and manager details.',
        tip: 'Create a master onboarding template in Notion. Notion AI generates: personalized welcome doc, first-week schedule, tool access checklist, and team directory.',
      },
      {
        title: 'Draft performance reviews with ChatGPT',
        description:
          'Feed in employee accomplishments, peer feedback, and OKR progress. ChatGPT drafts balanced performance reviews with strengths, areas for improvement, goals, and development plans.',
        tip: 'Prompt: "Employee achieved [X], received feedback [Y], missed [Z]. Write a balanced performance review with: achievements, growth areas, 3 SMART goals for next quarter, and recommended training."',
      },
      {
        title: 'Analyze employee sentiment with Exa + Gemini',
        description:
          'Use Exa to gather employee reviews (Glassdoor, Indeed) and industry benchmarks. Upload survey results to Gemini for sentiment analysis, trend detection, and actionable recommendations.',
      },
      {
        title: 'Automate HR communications with Claude',
        description:
          'Generate offer letters, rejection emails, policy updates, company announcements, and benefits communications. Claude maintains consistent professional tone across all HR touchpoints.',
        tip: 'Create a \'HR Communications\' knowledge base in Claude Projects with your company\'s tone, legal disclaimers, and brand guidelines.',
      },
    ],
    pro_tips: [
      'Always anonymize resumes before AI screening (remove names, photos, schools, ages) to reduce bias',
      'Use AI for initial screening, not final decisions — humans should always make the hiring call',
      'Create a \'Recruiting Hub\' in Notion: job descriptions, interview guides, candidate tracker, and offer templates — AI-generated and consistent',
      'Set up automated onboarding: offer accepted → Notion AI generates personalized onboarding plan → sent to new hire week before start date',
    ],
    common_mistakes: [
      {
        mistake: 'AI screening introducing bias against qualified candidates',
        fix: 'Regularly audit AI screening decisions for bias. Rotate screening criteria. Always have a human review "no" recommendations.',
      },
      {
        mistake: 'Generic AI-generated rejection emails that damage employer brand',
        fix: 'Personalize rejection communications: mention specific qualifications appreciated, suggest future roles, and leave the door open.',
      },
    ],
    pipeline_stage: 'research',
    revenue_impact: 'Reduce time-to-hire by 50% and save $10K-20K per hire in recruiter hours and agency fees',
    real_results: [
      { metric: 'Screening Time', value: '85% faster', description: '100 resumes reviewed in 30 min vs 8 hours manually' },
      { metric: 'Time-to-Hire', value: '45% reduction', description: 'From 45 days to 25 days average time-to-hire' },
      { metric: 'Onboarding Completion', value: '90%', description: 'AI-guided onboarding increased first-week task completion by 40%' },
    ],
  },

  // --- 5: AI for Legal ---
  {
    slug: 'ai-for-legal',
    title: 'AI for Legal',
    subtitle: 'Contract review, legal research & document automation',
    description:
      'Transform legal workflows with AI: contract review and redlining, legal research, document drafting, due diligence analysis, and compliance monitoring. Built for lawyers, paralegals, legal ops teams, and in-house counsel who need faster, more thorough legal work.',
    related_tool_slugs: ['claude', 'perplexity', 'chatgpt', 'gemini', 'exa', 'notion-ai'],
    difficulty: 'Advanced',
    read_time_minutes: 11,
    icon: '⚖️',
    gradient: 'from-stone-500/30 to-slate-500/30',
    steps: [
      {
        title: 'Review contracts with Claude',
        description:
          'Upload contracts to Claude (up to 200K tokens = ~150 pages). Ask for: clause-by-clause analysis, risk flags, unfavorable terms, missing provisions, and negotiation recommendations. Claude excels at structured document analysis.',
        tip: 'Prompt: "Review this SaaS agreement. Flag: liability caps, indemnification scope, termination for convenience, auto-renewal, data ownership, SLA commitments, and non-compete. For each flag: severity (high/medium/low), risk explanation, and recommended counter."',
      },
      {
        title: 'Conduct legal research with Perplexity Pro',
        description:
          'Use Perplexity Pro for legal research: case law, statutes, regulations, and commentary. Get cited answers with jurisdiction filters. Perplexity\'s academic/legal search covers Westlaw, LexisNexis, and law review sources.',
        tip: 'Prompt with jurisdiction: "Under Delaware corporate law, what are the fiduciary duties of directors in a change-of-control transaction? Cite relevant cases and statutes."',
      },
      {
        title: 'Draft legal documents with ChatGPT',
        description:
          'Generate first drafts of legal documents: NDAs, service agreements, MOU, letters of intent, settlement agreements, and client engagement letters. Use detailed prompts with jurisdiction, parties, and key terms.',
        tip: 'Prompt: "Draft a mutual NDA between [Company A] (Delaware corp) and [Company B] (Singapore Pte Ltd). Term: 3 years. Governing law: Singapore. Include: definition of confidential info, exclusions, return of materials, injunctive relief, and governing law."',
      },
      {
        title: 'Auto-redline agreements with Gemini',
        description:
          'Upload a contract and your preferred terms. Gemini compares both, highlights differences, and suggests redlines. Its document intelligence identifies non-standard clauses faster than manual review.',
      },
      {
        title: 'Track compliance with Notion AI + Exa',
        description:
          'Build a compliance database: regulatory deadlines, filing requirements, policy changes. Use Exa to monitor regulatory updates. Notion AI drafts compliance status reports and flags upcoming obligations.',
        tip: 'Set up Notion database with auto-created entries from Exa searches on regulatory changes in your jurisdictions.',
      },
      {
        title: 'Conduct due diligence with Claude',
        description:
          'Upload due diligence documents (financials, contracts, IP filings, corporate records) into Claude for analysis. Generate due diligence reports with findings organized by risk category, severity, and recommended actions.',
      },
    ],
    pro_tips: [
      'Never upload privileged or confidential client data to AI without client consent and security review',
      'Always cite AI-generated legal arguments back to primary sources — AI can hallucinate case citations',
      'Use Claude for contract review (best at structured document analysis), Perplexity for research (best at sourced answers)',
      'Create a \'Playbook\' for each practice area: standard clauses, common counter-arguments, filing templates — AI-generated and attorney-reviewed',
    ],
    common_mistakes: [
      {
        mistake: 'Relying on AI for legal advice without attorney review',
        fix: 'AI is a drafting and research assistant. Every legal document and strategy must be reviewed by a licensed attorney.',
      },
      {
        mistake: 'Accepting AI-generated case citations without verification',
        fix: 'AI can hallucinate case names and citations. Always verify in Westlaw/LexisNexis. Use Perplexity for grounded research with real citations.',
      },
    ],
    pipeline_stage: 'research',
    revenue_impact: 'Reduce document review time by 60-80%, saving $50K-150K/year in billable hours and contract review costs',
    real_results: [
      { metric: 'Review Speed', value: '4x faster', description: '50-page contract reviewed in 45 min vs 3 hours manually' },
      { metric: 'Research Time', value: '65% reduction', description: 'Legal research from 4 hours to 1.5 hours with AI-assisted search' },
      { metric: 'First Draft Time', value: '80% faster', description: 'Standard agreements drafted in 30 min vs 2.5 hours' },
    ],
  },

  // --- 6: AI for Food & Hospitality ---
  {
    slug: 'ai-for-food-and-hospitality',
    title: 'AI for Food & Hospitality',
    subtitle: 'Menu planning, recipe development & restaurant ops with AI',
    description:
      'Elevate your food and hospitality business with AI: menu engineering, recipe creation and scaling, inventory management, customer feedback analysis, social media marketing, and staff training. Built for chefs, restaurateurs, hoteliers, and food entrepreneurs who want to innovate faster and run leaner.',
    related_tool_slugs: ['chatgpt', 'midjourney', 'canva-ai', 'perplexity', 'gemini', 'notion-ai', 'elevenlabs'],
    difficulty: 'Beginner',
    read_time_minutes: 9,
    icon: '🍽️',
    gradient: 'from-red-500/30 to-rose-500/30',
    steps: [
      {
        title: 'Design menus with ChatGPT',
        description:
          'Describe your cuisine, price point, and concept. ChatGPT generates: menu structure, dish descriptions, pricing strategy, pairings, and seasonal rotation plans. Optimize for food cost percentage and popularity.',
        tip: 'Prompt: "You are a restaurant menu consultant. Create a 25-item menu for a modern Cantonese restaurant in Hong Kong. Average check HK$400. Include: 6 appetizers, 8 mains, 4 sides, 3 desserts, 4 drinks. For each: name, description, price, food cost %, and why it belongs on the menu."',
      },
      {
        title: 'Develop and scale recipes with Gemini',
        description:
          'Upload existing recipes and ask Gemini to: scale for volume production, substitute ingredients, adjust for dietary restrictions, calculate nutritional info, and suggest plating variations. Gemini handles the math and logic.',
        tip: 'Gemini\'s 1M context can process an entire recipe book: "Scale this pastry recipe from 12 portions to 200. Convert grams to cups. Suggest 3 dairy-free substitutions."',
      },
      {
        title: 'Create food photography with Midjourney',
        description:
          'Generate professional food photography for menus, social media, and delivery apps. Describe the dish, plating style, lighting, and background. Midjourney produces studio-quality images without a photo shoot.',
        tip: 'Prompt: "Bowl of wonton noodle soup, overhead shot, warm lighting, ceramic bowl, chopsticks, steam rising, minimalist table setting, depth of field --ar 4:3"',
      },
      {
        title: 'Manage inventory with Perplexity + Notion AI',
        description:
          'Use Perplexity to track ingredient prices, seasonal availability, and supplier alternatives. Record inventory in Notion. Use Notion AI to: forecast reorder points, flag price increases, and suggest substitutions.',
        tip: 'Set up weekly Perplexity searches for your top 20 ingredients. Notion AI auto-generates: reorder alerts, substitution suggestions, and cost trend reports.',
      },
      {
        title: 'Create marketing content with Canva AI',
        description:
          'Use Canva AI to create: daily specials posters, social media campaigns, email newsletters, delivery app images, and event flyers. Canva Magic Write generates menu descriptions and promotional copy.',
      },
      {
        title: 'Analyze customer feedback with ChatGPT',
        description:
          'Export reviews from Google, OpenRice, Deliveroo, and social media. ChatGPT analyzes: common praise, complaints, request patterns, sentiment trends, and actionable improvements.',
        tip: 'Run a weekly analysis: paste the week\'s reviews into ChatGPT and get: top 3 positives, top 3 negatives, and 3 actionable recommendations.',
      },
    ],
    pro_tips: [
      'Create a \'Digital Recipe Book\' in Notion: ingredients, prep steps, plating guides, photos, and cost cards — AI-generated and consistent',
      'Use Midjourney to visualize new dishes before they hit the menu — test customer reactions on social media first',
      'Automate social media: one generative session produces 30 posts from seasonal specials, behind-the-scenes, and customer reviews',
      'Build an AI training manual for staff: ChatGPT generates recipes, plating guides, and allergen info from your menu',
    ],
    common_mistakes: [
      {
        mistake: 'Using AI recipes without testing food safety',
        fix: 'AI-generated recipes may not account for food safety (cooking temps, cross-contamination, shelf life). Always test and validate with a qualified chef.',
      },
      {
        mistake: 'AI-generated menus that sound generic or over-designed',
        fix: 'Add your restaurant\'s personality, sourcing stories, and chef\'s background to descriptions. Authenticity sells.',
      },
    ],
    pipeline_stage: 'marketing',
    revenue_impact: 'Reduce menu development from weeks to days, save $2K-5K/month on photography and design',
    real_results: [
      { metric: 'Menu Development', value: '70% faster', description: 'New seasonal menu created in 3 days vs 2 weeks' },
      { metric: 'Social Media Output', value: '8x more', description: 'From 4 posts/week to 30+ AI-assisted posts/week' },
      { metric: 'Food Cost Optimization', value: '-12%', description: 'AI-driven menu engineering reduced food cost by 12% while maintaining margins' },
    ],
  },

  // --- 7: AI for Gaming & Entertainment ---
  {
    slug: 'ai-for-gaming-and-entertainment',
    title: 'AI for Gaming & Entertainment',
    subtitle: 'Game dev, asset creation & streaming with AI',
    description:
      'Create games and entertainment content with AI: game concept development, asset generation (2D/3D art, audio, animations), level design, narrative writing, code assistance, and streaming content production. Built for indie game developers, content creators, and entertainment studios who want to ship faster without large teams.',
    related_tool_slugs: ['chatgpt', 'midjourney', 'claude', 'gemini', 'elevenlabs', 'perplexity', 'canva-ai'],
    difficulty: 'Intermediate',
    read_time_minutes: 11,
    icon: '🎮',
    gradient: 'from-indigo-500/30 to-fuchsia-500/30',
    steps: [
      {
        title: 'Concept and design games with ChatGPT',
        description:
          'Describe your game idea and ChatGPT helps with: game design document, core mechanics, progression systems, economy balance, narrative structure, and monetization strategy. Iterate on mechanics and get detailed breakdowns.',
        tip: 'Prompt: "Design a 2D platformer where the player controls a shapeshifting AI. Core mechanic: transform between 4 forms (speed, strength, stealth, flight). Generate: game design doc, level progression, ability unlock tree, enemy types, and boss fight concepts."',
      },
      {
        title: 'Generate game art with Midjourney',
        description:
          'Create 2D sprites, backgrounds, UI elements, concept art, and promotional artwork. Use consistent style references across all assets. Create animation sprite sheets and tileable backgrounds.',
        tip: 'Use --sref (style reference) for consistent game art: same artist style across characters, environments, and UI. Generate sprite sheets with consistent lighting and POV.',
      },
      {
        title: 'Write game narrative with Claude',
        description:
          'Claude excels at narrative design: dialogue trees, branching storylines, character backstories, quest descriptions, and lore documents. Its structured output is perfect for game narrative databases.',
        tip: 'Generate branching dialogue with JSON output: Claude creates dialogue trees with conditions, variables, and branching paths ready for game engine import.',
      },
      {
        title: 'Create audio and voice acting with ElevenLabs',
        description:
          'Use ElevenLabs for: character voice generation (multiple voices), sound effect descriptions, narrator voiceovers, and dynamic dialogue. Generate consistent character voices across all in-game dialogue.',
      },
      {
        title: 'Get coding assistance with ChatGPT + Gemini',
        description:
          'Use AI for game code: Unity/C# scripts, Unreal/Blueprint logic, Godot/GDScript, shader code, AI behaviors, physics systems, and UI code. Debug errors and optimize performance.',
        tip: 'Prompt: "Write a C# script for Unity: 2D top-down character movement with WASD, smooth acceleration/deceleration, animation state machine integration, and collision detection."',
      },
      {
        title: 'Market your game with Canva AI + ChatGPT',
        description:
          'Create: Steam page assets, trailer scripts, press kits, social media campaigns, and developer blog posts. ChatGPT writes compelling game descriptions and pitch emails. Canva AI creates store art and promotional banners.',
        tip: 'Generate a press kit in one session: ChatGPT writes game description, dev bio, and pitch email. Canva creates banner, screenshots layout, and logo variations.',
      },
    ],
    pro_tips: [
      'Create a \'Game Bible\' in Notion with AI-generated sections: lore, characters, mechanics, dialogue trees, and quests',
      'Use style references in Midjourney to maintain consistent art direction from first concept to final asset',
      'For indie devs: AI handles 80% of scripting, prototyping, and asset creation — focus your time on gameplay tuning',
      'Generate demo content for Steam Next Fest: trailer script, screenshots, dev blog posts — all AI-assisted in one weekend',
    ],
    common_mistakes: [
      {
        mistake: 'AI-generated art with inconsistent style across the game',
        fix: 'Use consistent style references and seed values. Create a style guide document and reference it in every generation prompt.',
      },
      {
        mistake: 'Over-relying on AI for game code without understanding the logic',
        fix: 'Use AI as a coding assistant, not a replacement. Review every AI-generated script for edge cases, performance issues, and architectural fit.',
      },
    ],
    pipeline_stage: 'build',
    revenue_impact: 'Reduce indie game development cost by 60-80%, from $100K+ to under $20K with AI-assisted development',
    real_results: [
      { metric: 'Dev Time', value: '70% faster', description: 'Prototype to playable demo in 2 weeks vs 2 months traditional' },
      { metric: 'Asset Creation Cost', value: '85% savings', description: 'AI-generated art and audio instead of hiring artists and sound designers' },
      { metric: 'Iteration Speed', value: '10x faster', description: 'Rapid prototyping with AI: 10 game mechanic variations tested in a day' },
    ],
  },

  // --- 8: AI for Startups & Venture ---
  {
    slug: 'ai-for-startups-and-venture',
    title: 'AI for Startups & Venture',
    subtitle: 'Pitch decks, market sizing & investor comms with AI',
    description:
      'Accelerate your startup journey with AI: pitch deck creation, market sizing, competitive analysis, financial modeling, investor updates, SAFe documentation, and fundraising strategy. Built for founders, VCs, and angel investors who want data-backed decisions and faster fundraising cycles.',
    related_tool_slugs: ['chatgpt', 'perplexity', 'claude', 'gemini', 'exa', 'canva-ai', 'notion-ai', 'semrush'],
    difficulty: 'Intermediate',
    read_time_minutes: 11,
    icon: '🚀',
    gradient: 'from-cyan-500/30 to-blue-500/30',
    steps: [
      {
        title: 'Build your pitch deck with Canva AI + ChatGPT',
        description:
          'First, use ChatGPT to structure your pitch: problem, solution, market size, business model, traction, team, and ask. Then use Canva AI to design the deck with professional templates, AI-generated slide content, and data visualizations.',
        tip: 'Prompt for ChatGPT: "I am building a pitch deck for [product]. Generate: investor-ready slide titles, key data points for each slide, compelling narratives, and 3 one-liner value propositions. Target: Series A VCs."',
      },
      {
        title: 'Size your market with Perplexity + Exa',
        description:
          'Use Perplexity to find TAM/SAM/SOM data, industry reports, growth forecasts, and analyst projections. Exa deep-dives into competitor funding, partnerships, and product launches. Cross-reference multiple sources for accuracy.',
        tip: 'Prompt for Perplexity Pro: "Give me TAM/SAM/SOM for the AI-powered customer support market in APAC. Include: market size, CAGR, key players, funding rounds, and growth drivers. Cite all sources."',
      },
      {
        title: 'Analyze competitors with Exa + Gemini',
        description:
          'Exa searches the entire web for competitor intelligence: funding, product launches, hiring trends, customer sentiment, and partnership announcements. Feed into Gemini for a structured competitive landscape with positioning maps.',
        tip: 'Set up weekly Exa searches for your top 10 competitors. Upload results to Gemini for a living competitive analysis document.',
      },
      {
        title: 'Create financial projections with ChatGPT',
        description:
          'Describe your business model, pricing, growth assumptions, and costs. ChatGPT builds: 3-year financial projections, unit economics, burn rate analysis, fundraising requirements, and scenario planning.',
        tip: 'Prompt: "Build a 3-year financial model for a B2B SaaS with 3 pricing tiers, 5% monthly growth, 20% churn, $50K seed. Include: P&L, cash flow, customer acquisition cost, LTV, and fundraising timeline. Output as table."',
      },
      {
        title: 'Draft investor communications with Claude',
        description:
          'Generate: investor updates, board decks, executive summaries, one-pagers, and due diligence responses. Claude maintains consistent messaging and tone across all investor-facing materials.',
        tip: 'Create a \'Investor Updates\' template in Claude Projects with your KPIs, milestones, and tone guide. Generate monthly updates in 10 minutes.',
      },
      {
        title: 'Research investors with Perplexity + Notion AI',
        description:
          'Research target investors: portfolio fit, check size, stage preference, sector focus, and recent deals. Track in Notion with AI-generated investor profiles and outreach sequences.',
        tip: 'Build a target investor list in Notion. Use Perplexity to research each firm. Notion AI generates: personalized outreach drafts and follow-up templates.',
      },
    ],
    pro_tips: [
      'Never send AI-generated investor materials without human editing — investors can tell and it damages credibility',
      'Use AI for research and first drafts, spend saved time on relationship building — VCs invest in people, not documents',
      'Build a \'Fundraising Hub\' in Notion: pitch deck, financial model, investor tracker, due diligence documents, and update templates',
      'Create a data room: use ChatGPT to generate all standard documents (one-pager, executive summary, product deck, financial model) from one business description',
    ],
    common_mistakes: [
      {
        mistake: 'Using generic AI-generated market sizing without validation',
        fix: 'Every market size figure must trace back to a credible source. Use Perplexity for cited data and verify against industry reports.',
      },
      {
        mistake: 'AI-generated pitch decks that lack the founder\'s authentic voice',
        fix: 'Use AI for structure and data, but rewrite the narrative in your own words. Investors invest in your story and vision.',
      },
    ],
    pipeline_stage: 'research',
    revenue_impact: 'Reduce fundraising prep from 3 months to 3 weeks, saving $5K-15K in consultants and design services',
    real_results: [
      { metric: 'Fundraising Prep Time', value: '80% faster', description: 'From 12 weeks to 3 weeks for full fundraising materials' },
      { metric: 'Pitch Deck Quality', value: '+40%', description: 'AI-optimized decks have higher clarity scores on peer review' },
      { metric: 'Investor Meetings', value: '3x more', description: 'Faster prep means more time for meetings and relationship building' },
    ],
  },
];

export function getPlaybookBySlug(slug: string): Playbook | undefined {
  return playbooks.find((p) => p.slug === slug);
}

export function getAllPlaybookSlugs(): string[] {
  return playbooks.map((p) => p.slug);
}
