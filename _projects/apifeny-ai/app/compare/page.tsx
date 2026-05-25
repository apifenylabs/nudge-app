import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  Brain,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'AI Tool Comparisons — Side-by-Side | Apifeny AI',
  description:
    'Head-to-head AI tool comparisons: ChatGPT vs Claude, DeepSeek vs ChatGPT, and more. Pricing, coding, features — find the best AI for your needs.',
  alternates: { canonical: `${BASE_URL}/compare` },
  openGraph: {
    title: 'AI Tool Comparisons — Side-by-Side | Apifeny AI',
    description: 'Head-to-head AI tool comparisons with scorecards, pricing, and use-case verdicts.',
    url: `${BASE_URL}/compare`,
    siteName: 'Apifeny AI',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const COMPARISONS = [
  {
    slug: 'deepseek-vs-chatgpt',
    title: 'DeepSeek vs ChatGPT',
    description:
      'DeepSeek (V3/R1) vs ChatGPT (GPT-4o/o3): pricing (free vs $20/mo), coding benchmarks, Asian language support, and open-source flexibility.',
    score: 'DeepSeek 7.7 · ChatGPT 7.9',
    icon: Zap,
    color: 'from-neon/10 via-aqua/5 to-tech-800',
    border: 'neon/30',
  },
  {
    slug: 'chatgpt-vs-claude',
    title: 'ChatGPT vs Claude',
    description:
      'The two $20/mo AI giants: ChatGPT vs Claude. Coding, writing, context window (128K vs 200K), ecosystem, and multimodal capabilities compared.',
    score: 'ChatGPT 8.3 · Claude 8.3',
    icon: Brain,
    color: 'from-aqua/10 via-neon/5 to-tech-800',
    border: 'aqua/30',
  },
];

export default function CompareIndexPage() {
  return (
    <div className="min-h-screen bg-tech-900">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Comparisons', item: '/compare' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-tech-400 hover:text-neon-light transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          Back to Tools
        </Link>

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="relative rounded-2xl bg-gradient-to-br from-neon/5 via-tech-800 to-aqua/5 border border-tech-500/30 p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Side-by-Side
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              AI Tool{' '}
              <span className="bg-gradient-to-r from-neon-light to-aqua bg-clip-text text-transparent">
                Comparisons
              </span>
            </h1>
            <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl">
              Honest, data-backed head-to-head comparisons of the most popular AI tools.
              Scorecards, pricing breakdowns, use-case verdicts — everything you need to choose.
            </p>
          </div>
        </section>

        {/* ─── Comparison Cards ──────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPARISONS.map((cmp) => (
              <Link
                key={cmp.slug}
                href={`/compare/${cmp.slug}`}
                className="group rounded-xl bg-tech-800/40 border border-tech-500/20 overflow-hidden hover:border-neon/40 transition"
              >
                <div className={`bg-gradient-to-br ${cmp.color} p-6`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-tech-800/50 flex items-center justify-center">
                      <cmp.icon className="w-5 h-5 text-neon-light" />
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-neon-light transition">
                      {cmp.title}
                    </h2>
                  </div>
                  <p className="text-sm text-tech-200 leading-relaxed mb-4">
                    {cmp.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-tech-400 font-mono">{cmp.score}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-neon-light group-hover:gap-2 transition-all">
                      View comparison <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────── */}
        <section className="mt-12 rounded-xl bg-tech-800/60 border border-dashed border-tech-500/30 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Want to compare two AI tools?</h2>
          <p className="text-sm text-tech-300 max-w-md mx-auto mb-4">
            We add new comparisons regularly. Check the detailed scorecards, pricing tables, and
            use-case verdicts for each matchup.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
          >
            Browse all AI tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
