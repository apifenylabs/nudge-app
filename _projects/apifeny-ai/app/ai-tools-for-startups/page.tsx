import { Metadata } from 'next';
import Link from 'next/link';
import {
  Rocket,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Star,
  Zap,
  PenTool,
  Code,
  Palette,
  BarChart3,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import ToolCard from '@/components/ToolCard';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Best AI Tools for Startups in 2026 — Affordable, Scalable, Asia-Ready | Apifeny AI',
  description:
    'Discover the best AI tools for startups in 2026. Affordable and scalable AI for bootstrapped founders — coding, marketing, design, and operations. Asia-ready with local pricing and multi-language support.',
  keywords: [
    'AI tools for startups',
    'startup AI tools',
    'affordable AI for founders',
    'AI for bootstrapped startups',
    'best AI tools for small business',
    'AI tools for solopreneurs',
    'startup productivity AI',
    'AI for early stage companies',
    'cheap AI tools for startups',
    'Asia AI tools for startups',
  ],
  alternates: { canonical: `${BASE_URL}/ai-tools-for-startups` },
  openGraph: {
    title: 'Best AI Tools for Startups 2026 — Founders Guide | Apifeny AI',
    description:
      '35+ AI tools hand-picked for startups. Coding assistants, marketing AI, design tools — all affordable, scalable, and Asia-ready.',
    url: `${BASE_URL}/ai-tools-for-startups`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'AI Tools for Startups | Apifeny AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Startups 2026',
    description: '35+ affordable AI tools for bootstrapped startups. Coding, marketing, design, and ops.',
    images: ['/og'],
  },
  robots: { index: true, follow: true },
};

// ── Tool categories relevant to startups ──────────────────────────────

const STARTUP_CATEGORIES = [
  {
    id: 'code',
    title: 'AI Coding Tools',
    description: 'Ship faster with AI pair programmers, code generators, and debugging assistants. Free tiers and affordable pro plans for early-stage teams.',
    icon: Code,
    slug: 'code-development',
    color: 'from-cyan-500/20 to-blue-500/10',
    tools: [] as string[],
  },
  {
    id: 'writing',
    title: 'AI Writing & Content',
    description: 'Generate blog posts, social media content, email campaigns, and pitch decks without a content team. Free tiers included.',
    icon: PenTool,
    slug: 'writing-content',
    color: 'from-violet-500/20 to-purple-500/10',
    tools: [] as string[],
  },
  {
    id: 'design',
    title: 'AI Design & Branding',
    description: 'Create logos, social graphics, product mockups, and brand kits with AI design tools. Professional output at 10% of agency cost.',
    icon: Palette,
    slug: 'design-creative',
    color: 'from-pink-500/20 to-rose-500/10',
    tools: [] as string[],
  },
  {
    id: 'marketing',
    title: 'AI Marketing & Growth',
    description: 'Automate email campaigns, SEO research, ad copy, and social media scheduling. Growth hacking powered by AI.',
    icon: BarChart3,
    slug: 'marketing-seo',
    color: 'from-amber-500/20 to-orange-500/10',
    tools: [] as string[],
  },
];

export default function AIToolsForStartupsPage() {
  // Snapshot top tool counts for each startup-relevant category
  const toolCount = toolsData.filter(t => t.is_published).length;

  // Pick recommended tools with audience_relevance matching startup contexts
  const recommendedTools = toolsData
    .filter(t => t.is_published)
    .sort((a, b) => b.trending_score - a.trending_score)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-tech-900">
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rocket-500/10 via-transparent to-tech-900 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rocket-500/10 border border-rocket-500/20 text-rocket-400 text-xs font-medium mb-6">
            <Rocket className="w-3.5 h-3.5" />
            Startup Edition
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
            Best AI Tools for{' '}
            <span className="bg-gradient-to-r from-rocket-400 to-orange-400 bg-clip-text text-transparent">
              Startups
            </span>{' '}
            in 2026
          </h1>

          <p className="text-lg sm:text-xl text-tech-200 max-w-2xl mb-8 leading-relaxed">
            Hand-picked AI tools that actually make sense for early-stage startups, bootstrapped founders,
            and small teams. Affordable pricing, free tiers, Asia-ready — no enterprise bloat.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 text-tech-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>{toolCount}+ tools curated</span>
            </div>
            <div className="flex items-center gap-2 text-tech-300">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span>Most under $20/month</span>
            </div>
            <div className="flex items-center gap-2 text-tech-300">
              <Users className="w-4 h-4 text-green-400" />
              <span>Built for teams of 1-10</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rocket-500 to-orange-500 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-rocket-500/25 hover:-translate-y-0.5"
            >
              Browse All Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-rocket-500/30 hover:text-white text-sm sm:text-base font-medium transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Startup Playbooks
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why This Matters ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Why Startups Need AI — <span className="text-rocket-400">Now</span>
          </h2>
          <p className="text-tech-300 max-w-3xl mx-auto leading-relaxed">
            In 2026, AI is no longer optional for startups. The most efficient early-stage companies use AI
            to do the work of 5+ full-time hires — coding, content, design, marketing, and customer support —
            for under $100/month total. This page cuts through the noise and shows you exactly which tools
            deliver real ROI at startup scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: DollarSign, title: 'Under $30/mo', desc: 'Most recommended tools have generous free tiers or start under $30/month. No enterprise contracts.' },
            { icon: Clock, title: '10x Productivity', desc: 'AI coding assistants alone save 3-5 hours per developer per day. Content AI saves entire marketing days.' },
            { icon: Users, title: 'Small Team Fit', desc: 'Built for teams of 1-10. No minimum seats, no sales calls, no onboarding fees.' },
            { icon: TrendingUp, title: 'Scalable as You Grow', desc: 'Start free, upgrade when you need it. All tools scale from solo founder to 50-person team.' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-tech-800/50 border border-tech-500/20 rounded-xl p-6 hover:border-rocket-500/20 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-rocket-500/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-rocket-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-tech-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Comparison Table ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Top Startup AI Tools — <span className="text-rocket-400">At a Glance</span>
          </h2>
          <p className="text-tech-300 max-w-2xl mx-auto leading-relaxed">
            The most popular AI tools among early-stage founders. All rated for startup value,
            pricing, and Asia-readiness.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-tech-500/20">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-tech-800 border-b border-tech-500/20">
                <th className="px-5 py-4 text-tech-200 font-semibold">Tool</th>
                <th className="px-5 py-4 text-tech-200 font-semibold hidden sm:table-cell">Best For</th>
                <th className="px-5 py-4 text-tech-200 font-semibold">Starting Price</th>
                <th className="px-5 py-4 text-tech-200 font-semibold hidden md:table-cell">Free Tier</th>
                <th className="px-5 py-4 text-tech-200 font-semibold">Rating</th>
                <th className="px-5 py-4 text-tech-200 font-semibold">Asia Ready</th>
              </tr>
            </thead>
            <tbody>
              {[
                { slug: 'chatgpt', name: 'ChatGPT', best: 'Daily assistant, coding, content', price: 'Free / $20/mo', free: '✅ Full access', rating: 4.7, asia: '✅' },
                { slug: 'claude', name: 'Claude', best: 'Long docs, reasoning, coding', price: 'Free / $20/mo', free: '✅ Generous', rating: 4.6, asia: '✅' },
                { slug: 'cursor', name: 'Cursor', best: 'AI-native coding', price: 'Free / $20/mo', free: '✅ 2K completions', rating: 4.7, asia: '✅' },
                { slug: 'deepseek', name: 'DeepSeek Chat', best: 'Reasoning, coding, low cost', price: 'Free', free: '✅ Full access', rating: 4.4, asia: '✅✅' },
                { slug: 'copilot', name: 'GitHub Copilot', best: 'Code completion, IDE native', price: 'Free / $10/mo', free: '✅ 2K completions', rating: 4.5, asia: '✅' },
                { slug: 'canva-ai', name: 'Canva AI', best: 'Design for non-designers', price: 'Free / $13/mo', free: '✅ Robust', rating: 4.6, asia: '✅' },
              ].map((row, i) => (
                <tr key={row.slug} className={`border-b border-tech-500/10 ${i % 2 === 0 ? 'bg-tech-800/30' : 'bg-tech-900/20'} hover:bg-tech-800/60 transition-colors`}>
                  <td className="px-5 py-4">
                    <Link href={`/tools/${row.slug}`} className="text-white font-medium hover:text-rocket-400 transition">
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-tech-300 hidden sm:table-cell">{row.best}</td>
                  <td className="px-5 py-4 text-green-400 font-medium">{row.price}</td>
                  <td className="px-5 py-4 text-tech-300 hidden md:table-cell">{row.free}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-tech-200">{row.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-tech-300">{row.asia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-tech-500 mt-4">
          Prices as of May 2026. All tools have free tiers suitable for early-stage startups.{' '}
          <Link href="/tools" className="text-rocket-400 hover:text-rocket-300 underline">Browse all {toolCount} tools →</Link>
        </p>
      </section>

      {/* ── Category Sections ───────────────────────────────────────── */}
      {STARTUP_CATEGORIES.map((cat) => (
        <section key={cat.id} className={`bg-gradient-to-b ${cat.color} border-y border-tech-500/10`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <cat.icon className="w-5 h-5 text-rocket-400" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{cat.title}</h2>
                </div>
                <p className="text-tech-300 max-w-2xl">{cat.description}</p>
              </div>
              <Link
                href={`/categories/${cat.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-rocket-400 hover:text-rocket-300 transition shrink-0"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Show tools in this category */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolsData
                .filter(t => {
                  const catName = cat.title.replace(' & ', ' & ').toLowerCase();
                  const toolCat = t.category?.toLowerCase() || '';
                  // Map categories to slug patterns
                  const catSlugMap: Record<string, string[]> = {
                    code: ['code & development', 'code', 'development'],
                    writing: ['writing & content', 'writing', 'content'],
                    design: ['design & creative', 'design', 'creative'],
                    marketing: ['marketing & seo', 'marketing', 'seo'],
                  };
                  const matches = catSlugMap[cat.id] || [];
                  return t.is_published && matches.some(m => toolCat.includes(m));
                })
                .sort((a, b) => b.trending_score - a.trending_score)
                .slice(0, 6)
                .map(tool => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="group bg-tech-800/60 border border-tech-500/20 rounded-lg p-4 hover:border-rocket-500/30 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">
                          {tool.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-medium text-sm group-hover:text-rocket-300 transition truncate">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-tech-400 mt-0.5 line-clamp-2">
                          {tool.tagline || tool.description?.slice(0, 80)}
                        </p>
                        {tool.avg_rating > 0 && (
                          <div className="flex items-center gap-1 mt-1.5">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-tech-400">{tool.avg_rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link
                href={`/categories/${cat.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-rocket-400 hover:text-rocket-300 transition"
              >
                View All {cat.title}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* ── Recommended Playbooks ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-5 h-5 text-rocket-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Startup Playbooks</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playbooks
            .filter(p => {
              const startupRelevant = ['ai-workflow-automation', 'content-creation-with-chatgpt', 'ai-for-marketing-automation', 'ai-content-creation-busy-founders', 'ai-sales-funnel-builder', 'ai-marketing-for-asia'];
              return startupRelevant.includes(p.slug);
            })
            .slice(0, 6)
            .map(pb => (
              <Link
                key={pb.slug}
                href={`/playbook/${pb.slug}`}
                className="group bg-tech-800/40 border border-tech-500/20 rounded-xl p-6 hover:border-rocket-500/30 transition-all"
              >
                <h3 className="font-semibold text-white group-hover:text-rocket-300 transition mb-2">
                  {pb.title}
                </h3>
                <p className="text-sm text-tech-400 line-clamp-2 mb-3">
                  {pb.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-rocket-400 group-hover:gap-2 transition-all">
                  Read Playbook
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────── */}
      {/* ── BLOG CROSS-LINKS ── */}
      <BlogCategoryLinks
        slugs={['ai-tools', 'productivity', 'coding-development', 'solopreneur']}
        heading="Startup Guides & Tips"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative rounded-2xl bg-gradient-to-br from-rocket-500/10 via-orange-500/5 to-tech-800 border border-tech-500/30 p-8 sm:p-12 text-center">
          <Rocket className="w-10 h-10 text-rocket-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Supercharge Your Startup?
          </h2>
          <p className="text-tech-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Browse our full directory of {toolCount}+ AI tools, find the right stack for your stage,
            and start shipping faster than ever.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rocket-500 to-orange-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-rocket-500/25 hover:-translate-y-0.5"
            >
              Explore All {toolCount} Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-rocket-500/30 hover:text-white transition-all"
            >
              Browse by Category
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
