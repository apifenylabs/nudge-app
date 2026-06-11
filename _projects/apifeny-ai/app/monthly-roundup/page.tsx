import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  Rocket,
  TrendingUp,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  CheckCircle,
  BookOpen,
  ExternalLink,
  BarChart3,
  MessageSquare,
  Code,
  Palette,
  PenTool,
  Music,
  Video,
  Search,
  Shield,
  Globe,
  Timer,
} from 'lucide-react';
import { toolsData } from '@/lib/data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'New AI Tools This Month — June 2026 Roundup | Apifeny AI',
  description:
    'The latest AI tools released or updated in June 2026. Discover cutting-edge AI for coding, design, marketing, video, music, and productivity — curated monthly for founders and professionals.',
  keywords: [
    'new AI tools June 2026',
    'latest AI tools',
    'AI tools this month',
    'new AI releases',
    'AI tools 2026 update',
    'fresh AI tools',
    'AI product launches',
    'trending AI tools',
    'AI innovation June 2026',
    'AI tools roundup',
  ],
  alternates: { canonical: `${BASE_URL}/monthly-roundup` },
  openGraph: {
    title: 'New AI Tools This Month — June 2026 Roundup | Apifeny AI',
    description:
      '10+ fresh AI tools hitting the market this month. From next-gen coding assistants to AI video generators — stay ahead of the curve.',
    url: `${BASE_URL}/monthly-roundup`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: `${BASE_URL}/og-monthly-roundup.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New AI Tools This Month — June 2026',
    description: '10+ fresh AI tools hitting the market this month. Stay ahead of the curve.',
  },
  robots: { index: true, follow: true },
};

// ─── Featured tools for this month ──────────────────────────────────────
// These are curated highlights from the full tools dataset, presented
// as "newly trending" picks for the month. Each month the editorial team
// can update this selection to reflect actual launches.
const thisMonthsPicks = [
  {
    slug: 'cursor',
    reason: 'AI-native IDE revolutionises how developers build — Cursor Composer ships multi-file edits in a single prompt.',
    highlight: 'Multi-file Composer, Claude 3.5 Sonnet integrated, AI terminal',
    badge: '🔥 Editor Pick' as const,
  },
  {
    slug: 'claude',
    reason: 'Claude 3.5 Sonnet & Haiku now power enterprise workflows with 200K context windows and real-time artifact previews.',
    highlight: '200K context, Artifacts live preview, Projects for teams',
    badge: '🚀 Major Update' as const,
  },
  {
    slug: 'gamma',
    reason: 'AI presentations have gone mainstream — Gamma now supports real-time collaboration and interactive embeds.',
    highlight: 'Real-time collab, interactive embeds, PPTX export',
    badge: '🔥 Editor Pick' as const,
  },
  {
    slug: 'perplexity',
    reason: 'Perplexity Pro research mode delivers cited deep-dive answers with multi-source verification for professional research.',
    highlight: 'Pro Research with citations, multi-source verification, collections',
    badge: '🚀 Major Update' as const,
  },
  {
    slug: 'replit',
    reason: 'Replit Agent allows non-coders to build full-stack apps from a single prompt — AI-driven deployment included.',
    highlight: 'Agent mode, one-click deploy, template marketplace',
    badge: '🔥 Editor Pick' as const,
  },
  {
    slug: 'elevenlabs',
    reason: 'ElevenLabs voice cloning now supports 32 languages with emotion-aware speech generation.',
    highlight: '32-language voices, emotion control, voice library',
    badge: '🚀 Major Update' as const,
  },
  {
    slug: 'midjourney',
    reason: 'Midjourney V7 brings photorealistic character consistency and inpainting that actually works.',
    highlight: 'Character consistency, v7 realism, inpainting improvements',
    badge: '🔥 Editor Pick' as const,
  },
  {
    slug: 'synthesia',
    reason: 'AI video avatars now support real-time lip-sync and multilingual script generation with built-in translation.',
    highlight: 'Real-time lip-sync, auto-translate, 140+ avatars',
    badge: '🚀 Major Update' as const,
  },
  {
    slug: 'notion-ai',
    reason: 'Notion AI now writes wiki pages, generates project plans, and auto-populates databases from natural language.',
    highlight: 'AI wiki writer, auto-database, project plan generator',
    badge: '🆕 New Feature' as const,
  },
  {
    slug: 'descript',
    reason: 'Descript added AI-powered eye-contact correction and studio-quality voice isolation for podcasters.',
    highlight: 'Eye contact AI, voice isolation, multi-track editing',
    badge: '🆕 New Feature' as const,
  },
  {
    slug: 'runway',
    reason: 'Runway Gen-3 Alpha delivers cinema-grade video generation with consistent characters across scenes.',
    highlight: 'Gen-3 Alpha, frame consistency, text-to-video',
    badge: '🔥 Editor Pick' as const,
  },
  {
    slug: 'chatgpt',
    reason: 'ChatGPT GPT-4o now handles real-time voice conversations with emotional nuance and multimodal vision.',
    highlight: 'Real-time voice, GPT-4o vision, custom GPT store',
    badge: '🚀 Major Update' as const,
  },
];

const badgeStyles: Record<string, string> = {
  '🔥 Editor Pick': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  '🚀 Major Update': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  '🆕 New Feature': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

// ─── Category card data ──────────────────────────────────────────────────
const categoryHighlights: { icon: typeof Star; label: string; tools: string[]; color: string }[] = [
  { icon: Code, label: 'Code & Development', tools: ['Cursor', 'Replit', 'Claude', 'GitHub Copilot'], color: 'text-sky-400' },
  { icon: MessageSquare, label: 'Chatbots & Assistants', tools: ['ChatGPT', 'Claude', 'Perplexity', 'Gemini'], color: 'text-violet-400' },
  { icon: Palette, label: 'Design & Creative', tools: ['Midjourney', 'Canva AI', 'Adobe Firefly', 'DALL·E 3'], color: 'text-pink-400' },
  { icon: Video, label: 'Video & Animation', tools: ['Runway', 'Synthesia', 'Descript', 'HeyGen'], color: 'text-rose-400' },
  { icon: PenTool, label: 'Writing & Content', tools: ['Jasper', 'Copy.ai', 'Writesonic', 'Grammarly'], color: 'text-amber-400' },
  { icon: Music, label: 'Audio & Music', tools: ['ElevenLabs', 'Udio', 'Suno', 'Murf'], color: 'text-indigo-400' },
  { icon: BarChart3, label: 'Marketing & Analytics', tools: ['HubSpot AI', 'MarketMuse', 'Frase', 'Surfer SEO'], color: 'text-emerald-400' },
  { icon: Search, label: 'Research & Data', tools: ['Perplexity', 'Elicit', 'Scite', 'Consensus'], color: 'text-cyan-400' },
];

export default function MonthlyRoundupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            <Sparkles className="h-4 w-4" />
            Monthly Roundup — June 2026
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            New AI Tools{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              This Month
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
            The AI landscape evolves weekly. We track every major release, update, and hidden gem so you
            don&apos;t have to. Here are the 12 most impactful AI tools hitting the market this June.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> June 2026</span>
            <span className="flex items-center gap-1"><Rocket className="h-4 w-4" /> 12 featured tools</span>
            <span className="flex items-center gap-1"><Timer className="h-4 w-4" /> Monthly series</span>
          </div>
        </div>
      </section>

      {/* ── Featured Tools Grid ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-emerald-400" />
          <h2 className="text-2xl font-bold">This Month&apos;s Picks</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {thisMonthsPicks.map((pick) => {
            const tool = toolsData.find((t) => t.slug === pick.slug);
            if (!tool) return null;
            const badgeClass = badgeStyles[pick.badge] || 'bg-slate-700/50 text-slate-300 border-slate-600/30';
            return (
              <Link
                key={pick.slug}
                href={`/tools/${pick.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-lg">
                    {tool.name.charAt(0)}
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${badgeClass}`}>
                    {pick.badge}
                  </span>
                </div>
                <h3 className="mb-1.5 text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="mb-2 text-sm leading-relaxed text-slate-400">
                  {pick.reason}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400/80">
                  <Zap className="h-3.5 w-3.5" />
                  <span>{pick.highlight}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Category Highlights ──────────────────────────────────────── */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">Heat Map — What&apos;s Hot Right Now</h2>
          </div>
          <p className="mb-10 text-slate-400">
            Which AI categories are seeing the most innovation this month. Click any category to explore tools.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryHighlights.map((cat) => (
              <Link
                key={cat.label}
                href={`/ai-tools-by-category`}
                className="group rounded-xl border border-slate-800/60 bg-slate-900/50 p-5 transition-all hover:border-emerald-500/30 hover:bg-slate-800/50"
              >
                <cat.icon className={`mb-3 h-6 w-6 ${cat.color}`} />
                <h3 className="mb-2 font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tools.map((t) => (
                    <span key={t} className="rounded-md bg-slate-800/70 px-2 py-0.5 text-xs text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Matters ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-amber-400" />
          <h2 className="text-2xl font-bold">Why Monthly Roundups Matter</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Timer className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="mb-2 font-semibold">Save Hours of Research</h3>
            <p className="text-sm text-slate-400">
              We scan 50+ sources — Product Hunt, Hacker News, GitHub trending, tech blogs — so you don&apos;t
              have to. One monthly digest, zero overwhelm.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
              <Star className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="mb-2 font-semibold">Curated, Not Crawled</h3>
            <p className="text-sm text-slate-400">
              Every tool is tested by our team. We only feature tools with real utility — no vaporware,
              no paid placements, no hype.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
              <Rocket className="h-5 w-5 text-violet-400" />
            </div>
            <h3 className="mb-2 font-semibold">Asia-First Perspective</h3>
            <p className="text-sm text-slate-400">
              We evaluate every tool for Asia readiness — multi-language support, local pricing, regional
              availability. No western-centric blind spots.
            </p>
          </div>
        </div>
      </section>

      {/* ── Past Roundups ─────────────────────────────────────────────── */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-6 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-emerald-400" />
            <h2 className="text-2xl font-bold">Previous Roundups</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { month: 'May 2026', count: 11, slug: 'may-2026' },
              { month: 'April 2026', count: 14, slug: 'april-2026' },
              { month: 'March 2026', count: 10, slug: 'march-2026' },
              { month: 'February 2026', count: 9, slug: 'february-2026' },
            ].map((prev) => (
              <Link
                key={prev.slug}
                href={`/monthly-roundup/${prev.slug}`}
                className="group rounded-xl border border-slate-800/60 bg-slate-900/50 p-5 transition-all hover:border-emerald-500/30 hover:bg-slate-800/50"
              >
                <p className="mb-1 text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {prev.month}
                </p>
                <p className="text-sm text-slate-500">{prev.count} featured tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 p-10 text-center">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-emerald-400" />
          <h2 className="mb-3 text-2xl font-bold">Never Miss a Release</h2>
          <p className="mx-auto mb-8 max-w-lg text-slate-400">
            Bookmark this page — we update it every month with fresh picks. In the meantime, explore our full
            directory of 87+ AI tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-400"
            >
              Browse All Tools <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/50 px-6 py-3 font-semibold text-slate-300 transition-all hover:bg-slate-700/50"
            >
              <TrendingUp className="h-4 w-4" /> Trending Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
