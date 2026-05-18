import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Layers } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { RANKING_CATEGORIES } from '@/lib/ranking-categories';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'AI Tool Rankings by Workflow — Apifeny AI',
  description:
    'Curated AI tool rankings by real workflow categories. Strategic planning, coding, content creation, agent building, and more. Editorially ranked for Asia.',
  openGraph: {
    title: 'AI Tool Rankings by Workflow — Apifeny AI',
    description:
      'Find the best AI tools ranked by your workflow: strategic planning, coding, content, automation, and more.',
  },
};

export default function RankingsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Rankings', item: '/rankings' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back / Breadcrumb */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
        All Tools
      </Link>

      {/* Hero */}
      <section className="relative mb-10 sm:mb-12">
        <div className="absolute inset-0 bg-tech-grid opacity-30 rounded-2xl" />
        <div className="relative rounded-2xl bg-gradient-to-br from-neon/10 via-aqua/5 to-tech-800 border border-tech-500/30 p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
            <Layers className="w-3.5 h-3.5" />
            Workflow Rankings
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            AI Rankings by{' '}
            <span className="bg-gradient-to-r from-neon-light to-aqua bg-clip-text text-transparent">
              Workflow
            </span>
          </h1>
          <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
            Not all AI tools are equal for every job. We rank tools by the work you actually do —
            from strategic planning to code review, content creation to agent building.
            Each ranking is editorially curated and powered by our Cosme-style algorithm.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <Layers className="w-4 h-4 text-neon-light" />
              <span className="font-semibold text-white">{RANKING_CATEGORIES.length}</span> workflows
            </div>
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <span className="font-semibold text-white">60+</span> tools ranked
            </div>
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <span className="font-semibold text-white">5-factor</span> Cosme algorithm
            </div>
          </div>
        </div>
      </section>

      {/* Rankings Grid */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-6">Choose your workflow</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {RANKING_CATEGORIES.map((rc) => (
            <Link
              key={rc.slug}
              href={`/rankings/${rc.slug}`}
              className="group relative rounded-xl bg-gradient-to-br border border-tech-500/30 p-5 hover:border-neon/40 transition-all hover:-translate-y-1 overflow-hidden"
              style={{ backgroundImage: `linear-gradient(135deg, ${rc.gradient}), linear-gradient(to bottom right, var(--color-tech-700), var(--color-tech-700))` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-tech-grid opacity-20" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{rc.icon}</span>
                  <span className="text-[10px] text-tech-300 group-hover:text-neon-light transition-colors flex items-center gap-0.5">
                    View ranking
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-1">
                  {rc.title}
                </h3>
                <p className="text-xs text-tech-300 mb-1">{rc.subtitle}</p>
                <p className="text-[11px] text-tech-200 line-clamp-2 leading-relaxed">
                  {rc.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[10px] text-tech-400">
                  <span>Top {rc.displayCount} tools</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-xl border border-dashed border-tech-500/30 bg-tech-700/40 p-8 text-center">
        <Layers className="w-10 h-10 text-neon/60 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-1">Can&apos;t decide?</h3>
        <p className="text-sm text-tech-200 max-w-md mx-auto mb-4">
          Browse our full tools directory with powerful filters — find the right tool for any job.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
        >
          Browse all tools
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
    </>
  );
}
