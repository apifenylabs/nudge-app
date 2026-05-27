import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Bot,
  MessageSquare,
  BarChart3,
  Code,
  Globe,
  Shield,
  Smartphone,
  BookOpen,
  Lightbulb,
  Rocket,
  Star,
  ChevronRight,
  Search,
  Pen,
  FileText,
  Edit3,
  Share2,
  PenTool,
  Filter,
  Quote,
  Newspaper,
  Repeat,
  Megaphone,
  Pencil,
  Terminal,
  GitBranch,
  Layers,
  Cloud,
  Database,
  Monitor,
  Cpu,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Best AI Tools for Developers in 2026 — Code, Build & Ship Faster | Apifeny AI',
  description:
    'Compare the best AI tools for software developers in 2026 — AI code editors, pair programmers, full-stack app builders, code review bots, and deployment AI agents. Vetted for indie devs, startups, and engineering teams in Asia.',
  keywords: [
    'AI tools for developers',
    'AI coding assistant',
    'best AI code editor 2026',
    'GitHub Copilot alternatives',
    'Cursor AI',
    'AI app builder',
    'Bolt.new',
    'Replit Agent',
    'Lovable AI',
    'Windsurf IDE',
    'Vercel v0',
    'Devin AI',
    'Claude Code',
    'AI pair programming',
    'AI code review',
    'AI for full-stack development',
    'AI development tools Asia',
    'best AI coding tools',
    'AI software engineering',
    'no-code AI app builder',
    'AI developer tools 2026',
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/ai-tools-for-developers`,
  },
  openGraph: {
    title: 'Best AI Tools for Developers in 2026 — Code, Build & Ship Faster',
    description:
      'Definitive guide to the best AI tools for developers in 2026. AI code editors, pair programmers, full-stack app builders, code review bots, and deployment agents — vetted for indie developers and engineering teams in Asia.',
    url: `${BASE_URL}/guides/ai-tools-for-developers`,
    type: 'article',
    locale: 'en_US',
    siteName: 'Apifeny AI',
    images: [
      {
        url: `${BASE_URL}/og/ai-tools-for-developers.jpg`,
        width: 1200,
        height: 630,
        alt: 'Best AI Tools for Developers in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Developers in 2026 — Code, Build & Ship Faster',
    description:
      'Definitive guide to AI tools for developers — AI code editors, pair programmers, full-stack builders, and code review, vetted for indie devs and teams in Asia.',
  },
};

// ─── Content sections ───
const sections = [
  {
    id: 'ai-code-editors',
    title: '1. AI-Native Code Editors',
    icon: Code,
    color: 'bg-blue-50 dark:bg-blue-950/30',
    text: `AI-native code editors have completely transformed the developer workflow in 2026. Unlike traditional editors with plugin-based AI assistants, these editors embed AI directly into every interaction — from autocomplete to refactoring to debugging.

For developers in Asia, today's AI code editors offer:
• Context-aware code completion that understands your entire project
• Multi-file refactoring with a single natural-language prompt
• Inline debugging and error explanation
• Terminal command generation and explanation
• Git-aware suggestions that understand branch context
• Language-agnostic — works across TypeScript, Python, Rust, Go, and 50+ other languages
• Local models support (for teams with sensitive codebases)

The key differentiator in 2026 isn't just code completion — it's how well the editor understands your codebase, your coding patterns, and your project architecture.`,
    tools: ['cursor', 'windsurf', 'copilot'],
    affiliateSuggestions: [
      { name: 'Cursor', slug: 'cursor', note: 'Best AI-native code editor overall' },
      { name: 'Windsurf', slug: 'windsurf', note: 'Best for flow-state development' },
      { name: 'GitHub Copilot', slug: 'copilot', note: 'Best VS Code integration' },
    ],
  },
  {
    id: 'ai-pair-programming',
    title: '2. AI Pair Programming Assistants',
    icon: Terminal,
    color: 'bg-green-50 dark:bg-green-950/30',
    text: `Beyond editors, standalone AI pair programming tools offer deeper reasoning and planning capabilities. These are AI agents that can discuss architecture decisions, plan implementations, review your code, and even write entire features from a specification.

Key capabilities of modern AI pair programmers:
• Architecture discussion and design pattern recommendations
• Step-by-step implementation planning with dependency analysis
• Automatic test generation (unit, integration, e2e)
• Code review with security vulnerability detection
• Technical documentation generation
• Migration and upgrade assistance (e.g., Next.js 14 → 15, React 18 → 19)
• Legacy code modernization and refactoring

The best pair programming tools in 2026 combine large context windows (200K+ tokens) with project-aware reasoning. This means they can hold your entire codebase in context and make informed suggestions that consider all files.`,
    tools: ['claude-code', 'devin', 'aider'],
    affiliateSuggestions: [
      { name: 'Claude Code', slug: 'claude-code', note: 'Best for terminal-based pair programming' },
      { name: 'Devin', slug: 'devin', note: 'Autonomous AI software engineer' },
    ],
  },
  {
    id: 'fullstack-app-builders',
    title: '3. Full-Stack AI App Builders',
    icon: Layers,
    color: 'bg-purple-50 dark:bg-purple-950/30',
    text: `Full-stack AI app builders represent the biggest paradigm shift in 2026. Describe an app in natural language, and these tools generate the complete stack — database schema, API endpoints, frontend components, authentication, and deployment config.

What AI app builders handle today:
• Complete CRUD app generation from a single prompt
• Database schema design and migration scripts
• Authentication (OAuth, JWT, magic links)
• API route design and implementation
• Responsive frontend with modern UI frameworks
• Payment integration (Stripe, Razorpay)
• Email and notification systems
• Deployment configuration (Vercel, Railway, Docker)
• Multi-page navigation and routing

For Asian startups and indie developers, these tools reduce MVP development time from weeks to hours. A full-featured marketplace app that would require a team of 4 developers for 3 months can now be built by one developer in a weekend.`,
    tools: ['bolt-new', 'replit-agent', 'lovable', 'v0'],
    affiliateSuggestions: [
      { name: 'Bolt.new', slug: 'bolt-new', note: 'Best full-stack from a single prompt' },
      { name: 'Replit Agent', slug: 'replit-agent', note: 'Best browser-based development' },
      { name: 'Lovable', slug: 'lovable', note: 'Best for non-technical founders' },
      { name: 'Vercel v0', slug: 'v0', note: 'Best for UI component generation' },
    ],
  },
  {
    id: 'code-review-testing',
    title: '4. AI Code Review & Testing',
    icon: GitBranch,
    color: 'bg-amber-50 dark:bg-amber-950/30',
    text: `AI code review tools have evolved from simple lint checkers to full architectural reviewers that can spot performance issues, security vulnerabilities, and design anti-patterns.

Modern AI code review capabilities:
• Automated PR reviews with contextual understanding of the whole codebase
• Security vulnerability detection (OWASP Top 10, SANS 25)
• Performance regression detection
• Test coverage analysis and gap identification
• Automatic test generation for uncovered code paths
• Style consistency enforcement (TypeScript strictness, naming conventions)
• Documentation generation for public APIs and complex logic
• Dependency vulnerability scanning
• Migration path suggestions for deprecated APIs

For development teams in Asia, AI code review tools are particularly valuable for distributed teams — they ensure consistent code quality across time zones and reduce the burden on senior developers who would otherwise review every PR.`,
    tools: ['copilot', 'windsurf', 'cline'],
    affiliateSuggestions: [
      { name: 'GitHub Copilot', slug: 'copilot', note: 'Built-in PR review and code suggestions' },
      { name: 'Windsurf', slug: 'windsurf', note: 'AI-powered code review in the IDE' },
    ],
  },
  {
    id: 'ai-deployment-ops',
    title: '5. AI Deployment & DevOps Assistants',
    icon: Cloud,
    color: 'bg-sky-50 dark:bg-sky-950/30',
    text: `Deployment and infrastructure management is getting smarter with AI. From Dockerfile generation to Kubernetes config files, AI tools now handle the operational side of development.

AI-assisted DevOps in 2026:
• Dockerfile and docker-compose generation from project analysis
• Kubernetes manifest generation with resource optimization
• CI/CD pipeline configuration (GitHub Actions, GitLab CI)
• Cloud cost optimization suggestions
• Serverless function deployment and optimization
• Database migration planning and rollback strategies
• Monitoring and alerting configuration
• Incident response runbooks
• Infrastructure-as-Code generation (Terraform, Pulumi)

For Asian developers working across multiple cloud providers (AWS, GCP, Alibaba Cloud, Tencent Cloud), AI DevOps tools help navigate the unique configurations and compliance requirements of each platform.

The most popular setup among Asian indie developers in 2026: Vercel for frontend + Railway for backend + Supabase for database — all deployable from a single AI-generated configuration file.`,
    tools: ['bolt-new', 'replit-agent', 'cursor'],
    affiliateSuggestions: [
      { name: 'Bolt.new', slug: 'bolt-new', note: 'Built-in deployment and hosting' },
      { name: 'Cursor', slug: 'cursor', note: 'Generate deployment configs inline' },
    ],
  },
  {
    id: 'api-ai-assistants',
    title: '6. API Development & AI Assistants',
    icon: Database,
    color: 'bg-red-50 dark:bg-red-950/30',
    text: `API development has been revolutionized by AI. From automatically generating SDKs from OpenAPI specs to creating entire REST/GraphQL endpoints from natural language descriptions.

AI for API development:
• REST/GraphQL API endpoint generation from a description
• OpenAPI/Swagger spec auto-generation from code
• API testing with automatic edge case detection
• SDK generation in multiple languages (Python, JS, Go, Java, Swift)
• API documentation with interactive examples
• Rate limiting and caching strategy suggestions
• Authentication flow generation (JWT, sessions, OAuth2)
• Webhook handler generation
• Database query optimization suggestions

For Asian developers building APIs that serve regional audiences, AI tools can automatically generate error messages and documentation in multiple Asian languages — a massive time saver for regional platforms.`,
    tools: ['devin', 'claude-code', 'copilot'],
    affiliateSuggestions: [
      { name: 'Devin', slug: 'devin', note: 'Build entire API services autonomously' },
      { name: 'Copilot', slug: 'copilot', note: 'Inline API endpoint generation' },
    ],
  },
  {
    id: 'ai-for-indie-devs',
    title: '7. AI Stack for Indie Developers in Asia',
    icon: Monitor,
    color: 'bg-teal-50 dark:bg-teal-950/30',
    text: `Indie developers in Asia face unique challenges — building and shipping products while competing with well-funded teams. The right AI stack levels the playing field.

The recommended AI development stack for Asian indie devs in 2026:

├── **IDE:** Cursor or Windsurf (AI-native editing)
├── **Pair Programming:** Claude Code or Devin (Plan & build features)
├── **Full-Stack Builder:** Bolt.new (Quick MVPs and prototypes)
├── **UI Generation:** Vercel v0 (Components and pages from screenshots/descriptions)
├── **Code Review:** GitHub Copilot PR reviews (Automated quality control)
├── **Deployment:** Vercel + Railway (Zero-config deployment)
├── **Database:** Supabase (Managed Postgres with AI-assisted schema design)
└── **Monitoring:** Sentry + Vercel Analytics (Error tracking and performance)

**Monthly cost of this stack:** $0–$80/month per developer (most tools have generous free tiers)
**Without AI:** 4–6 weeks to build and ship an MVP
**With this AI stack:** 3–7 days to build and ship the same MVP

For developers in Southeast Asia, this combination is particularly powerful: Bolt.new + Supabase + Vercel creates an end-to-end pipeline that handles everything from database design to global CDN deployment, requiring zero DevOps knowledge.`,
    tools: ['cursor', 'bolt-new', 'claude-code', 'replit-agent', 'v0'],
    affiliateSuggestions: [
      { name: 'Cursor', slug: 'cursor', note: 'The backbone of the indie dev stack' },
      { name: 'Bolt.new', slug: 'bolt-new', note: 'Fastest way to prototype full-stack apps' },
      { name: 'Claude Code', slug: 'claude-code', note: 'Code review and feature planning' },
    ],
  },
];


const guideFaqs = [
  {
    "question": "What is the best AI coding assistant in 2026?",
    "answer": "Cursor and GitHub Copilot are the top AI coding assistants in 2026. Cursor excels at in-editor code generation and context understanding while Copilot integrates deeply with VS Code and has the largest training dataset. For beginners, Bolt.new and Lovable offer no-code app building without any programming knowledge."
  },
  {
    "question": "Can AI coding tools replace developers?",
    "answer": "AI coding tools dramatically boost developer productivity \u2014 experienced developers report 2-3x faster output \u2014 but they don't replace developers entirely. AI handles boilerplate code, test generation, and simple refactoring, but human oversight is essential for architecture decisions, security reviews, and complex logic."
  },
  {
    "question": "Which AI coding tool is best for beginners?",
    "answer": "For complete beginners, Bolt.new is the best starting point \u2014 you describe your app idea and it builds a full-stack web app. Lovable offers a similar experience. Once you understand basic programming concepts, Cursor and Copilot become more powerful for learning through real code generation."
  },
  {
    "question": "What is the cheapest AI coding assistant?",
    "answer": "GitHub Copilot offers a free tier for verified students and open-source maintainers. Codeium has a generous free individual tier. For beginners, Bolt.new and Replit Agent have free tiers. The most cost-effective paid option is Copilot at $10/month for individual developers."
  },
  {
    "question": "Which AI tools are best for Asian developers?",
    "answer": "All major AI coding tools work globally. Cursor and Copilot support code in any language. For documentation and API references in Chinese/Japanese/Korean, ChatGPT and DeepSeek provide better context than coding-specific tools. DeepSeek also offers competitive pricing for API usage in Asian markets."
  }
];

export default function AIToolsForDevelopersGuide() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Guides', item: '/guides' },
          { name: 'AI Tools for Developers', item: '/guides/ai-tools-for-developers' },
        ]}
        baseUrl={BASE_URL}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 dark:from-emerald-900 dark:via-teal-950 dark:to-cyan-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Guide · 14 min read
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Best AI Tools for Developers in 2026
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl mb-8">
            The definitive guide to AI-powered development tools — code editors, pair programmers, full-stack app builders, code review, and deployment AI agents. Vetted for indie developers, startups, and engineering teams in Asia.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-200/80">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Updated May 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              Developers &amp; Engineers
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Asia-Focused
            </span>
          </div>
        </div>
      </section>

      {/* ─── Table of Contents ─── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            What You&apos;ll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
              >
                <s.icon className="w-4 h-4 shrink-0" />
                {s.title.replace(/^\d+\.\s*/, '')}
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Now Section ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-6">
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong className="text-emerald-700 dark:text-emerald-300">Why AI development tools matter more in 2026:</strong> The average software developer now writes 45% less boilerplate code thanks to AI assistants. But the bigger shift is in what's possible — indie developers in Asia are shipping production-grade full-stack applications in 3–7 days using AI development tools. For startups and engineering teams, AI tools have reduced the time from concept to deployed MVP by 80%. This guide covers the AI development tools that actually work in 2026 — vetted for code quality, Asian tech stack compatibility, and value for money.
          </p>
        </div>
      </section>

      {/* ─── Quick Comparison Table ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Quick Comparison — Best AI Developer Tools
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Tool</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Best For</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Starting Price</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Key Features</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900 dark:text-white">Free Trial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { name: 'Cursor', best: 'AI-native code editing', price: '$0 (Free)', features: 'Tab autocomplete, multi-file edit, AI terminal, Cmd+K', free: '✅ Free tier' },
                  { name: 'Windsurf', best: 'Flow-state development', price: '$0 (Free)', features: 'AI autocomplete, Supercomplete, cascade agent, multi-file', free: '✅ Free tier' },
                  { name: 'GitHub Copilot', best: 'VS Code integration', price: '$10/mo', features: 'Code completion, chat, PR review, CLI, agent mode', free: '30-day trial' },
                  { name: 'Bolt.new', best: 'Full-stack from prompt', price: '$0 (Free)', features: 'Prompt-to-app, deploy, edit, StackBlitz sandbox', free: '✅ Free tier' },
                  { name: 'Devin', best: 'Autonomous engineering', price: '$500/mo', features: 'Plan, code, deploy autonomously, 6+ hour sessions', free: 'Pay-as-you-go' },
                  { name: 'Replit Agent', best: 'Browser-based dev', price: '$0 (Free)', features: 'Full-stack builder, deploy, collaborate, AI assist', free: '✅ Free tier' },
                  { name: 'Lovable', best: 'Non-technical founders', price: '$0 (Free)', features: 'Visual app builder, AI edit, publish, Supabase connect', free: '✅ Free tier' },
                  { name: 'Vercel v0', best: 'UI component gen', price: '$0 (Free)', features: 'Prompt-to-UI, screenshot-to-code, shadcn, React', free: '✅ Free tier' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{row.best}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{row.price}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-xs max-w-[200px]">{row.features}</td>
                    <td className="px-6 py-3 text-center">{row.free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Content Sections ─── */}
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-20 ${s.color} border-y border-gray-200/50 dark:border-gray-800/50`}
        >
          <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                <s.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {s.title}
              </h2>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
              {s.text.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Recommended Tools */}
            {s.tools.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  Recommended Tools
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {s.tools.map((slug) => {
                    const tool = toolsData.find((t: any) => t.slug === slug);
                    if (!tool) return null;
                    return (
                      <ToolCard
                        key={slug}
                        tool={tool as any}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Affiliate CTA */}
            {s.affiliateSuggestions.length > 0 && (
              <div className="mt-8 p-5 bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Try These Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {s.affiliateSuggestions.map((a) => {
                    const tool = toolsData.find((t: any) => t.slug === a.slug);
                    if (!tool) return null;
                    const link = (tool as any).affiliateUrl || (tool as any).website_url || (tool as any).url || `https://apifeny.ai/tools/${a.slug}`;
                    return (
                      <a
                        key={a.slug}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                      >
                        {a.name}
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ─── Final CTA ─── */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 sm:p-12">
          <Sparkles className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Code with AI?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
            Browse our curated directory of AI tools vetted for developers. Compare features, pricing, and Asia-specific capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-sm"
            >
              Browse All AI Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl px-6 py-3 transition-colors"
            >
              Browse by Category
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* ─── FAQ Schema ─── */}
      <FAQSchema faqs={guideFaqs} />
    </main>
  );
}

function ExternalLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}
