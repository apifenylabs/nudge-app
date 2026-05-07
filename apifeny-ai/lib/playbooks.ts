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
  },
];

export function getPlaybookBySlug(slug: string): Playbook | undefined {
  return playbooks.find((p) => p.slug === slug);
}

export function getAllPlaybookSlugs(): string[] {
  return playbooks.map((p) => p.slug);
}
