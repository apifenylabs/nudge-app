import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Star,
  TrendingUp,
  Trophy,
  Layers,
  Sparkles,
  Globe,
} from 'lucide-react';
import { RANKING_CATEGORIES, getRankingCategory, getAllRankingSlugs } from '@/lib/ranking-categories';
import { toolsData } from '@/lib/data';
import { computeAllScores, RankedTool } from '@/lib/ranking-algorithm';
import ToolCard from '@/components/ToolCard';
import { cn } from '@/lib/utils';
import { playbooks } from '@/lib/playbooks';

interface RankingCategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllRankingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RankingCategoryPageProps): Promise<Metadata> {
  const cat = getRankingCategory(params.slug);
  if (!cat) return { title: 'Ranking Not Found' };

  return {
    title: cat.meta_title || `${cat.title} — AI Tool Rankings | Apifeny AI`,
    description: cat.meta_description || cat.description,
    openGraph: {
      title: cat.meta_title || `${cat.title} — Apifeny AI Rankings`,
      description: cat.meta_description,
    },
  };
}

export default function RankingCategoryPage({ params }: RankingCategoryPageProps) {
  const cat = getRankingCategory(params.slug);
  if (!cat) notFound();

  // Compute rankings across ALL tools to get the base score
  const allRanked = computeAllScores(toolsData);

  // Filter to tools that match this ranking category, sort by score
  const matchingTools = allRanked
    .filter((rt) => cat.toolFilter(rt.tool))
    .slice(0, cat.displayCount);

  // Rank display order (keep computed scores, reassign rank within this category)
  const rankedTools: RankedTool[] = matchingTools.map((rt, i) => ({
    ...rt,
    rank: i + 1,
  }));

  const topScore = rankedTools[0]?.score || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back link */}
      <Link
        href="/rankings"
        className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
        All Rankings
      </Link>

      {/* Hero */}
      <section className="relative mb-8 sm:mb-10">
        <div className="absolute inset-0 bg-tech-grid opacity-30 rounded-2xl" />
        <div
          className="relative rounded-2xl border border-tech-500/30 p-8 sm:p-12 overflow-hidden"
          style={{ backgroundImage: `linear-gradient(135deg, ${cat.gradient}), linear-gradient(to bottom right, rgba(17,17,34,0.9), rgba(17,17,34,0.9))` }}
        >
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{cat.icon}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neon/10 text-neon-light border border-neon/20">
                <Trophy className="w-3 h-3" />
                Top {cat.displayCount}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{cat.title}</h1>
            <p className="text-sm text-tech-200 max-w-2xl mb-4">{cat.description}</p>

            {/* Score range */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-tech-300">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-neon-light" />
                Score range: {topScore.toFixed(1)} — {rankedTools[rankedTools.length - 1]?.score.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-asia" />
                {rankedTools.length} tools
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Cosme algorithm
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking List */}
      <section>
        <div className="space-y-3">
          {rankedTools.map((rt, i) => (
            <Link
              key={rt.tool.id}
              href={`/tools/${rt.tool.slug}`}
              className={cn(
                'group relative flex items-center gap-4 sm:gap-6 rounded-xl border border-tech-500/30 p-4 sm:p-5 transition-all hover:-translate-y-0.5',
                i === 0
                  ? 'bg-gradient-to-r from-amber-500/10 via-neon/5 to-tech-700 border-amber-500/20 hover:border-amber-500/40'
                  : 'bg-tech-700/80 hover:border-neon/40'
              )}
            >
              {/* Rank badge */}
              <div className="shrink-0">
                {i === 0 ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                ) : i === 1 ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg shadow-gray-500/20">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">2</span>
                  </div>
                ) : i === 2 ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-700/20">
                    <span className="text-lg sm:text-xl font-bold text-amber-200">3</span>
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-tech-800 border border-tech-500/30 flex items-center justify-center">
                    <span className="text-base sm:text-lg font-bold text-tech-200">{rt.rank}</span>
                  </div>
                )}
              </div>

              {/* Tool info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-neon-light transition-colors truncate">
                    {rt.tool.name}
                  </h3>
                  {rt.tool.is_agentic && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-neon/15 text-neon-light border border-neon/20 shrink-0">
                      Agentic
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-tech-200 line-clamp-1">{rt.tool.tagline}</p>

                {/* Pipeline stage tags */}
                {rt.tool.best_for_pipeline_stage && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-tech-800 border border-tech-500/30 text-tech-300">
                      {rt.tool.best_for_pipeline_stage}
                    </span>
                  </div>
                )}
              </div>

              {/* Score */}
              <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border',
                    rt.score >= 8
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : rt.score >= 6
                      ? 'bg-neon/15 border-neon/30 text-neon-light'
                      : rt.score >= 4
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'bg-tech-800 border-tech-500/30 text-tech-300'
                  )}
                >
                  {rt.score.toFixed(1)}
                </div>
                <span className="text-[9px] text-tech-400 uppercase tracking-wider">Score</span>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-4 h-4 text-tech-400 group-hover:text-neon-light transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Related Playbooks */}
      {(() => {
        const relatedPlaybooks = playbooks.filter(
          (p) => p.pipeline_stage === cat.pipelineStage
        );
        if (relatedPlaybooks.length === 0) return null;
        return (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-neon-light" />
              Related Playbooks
            </h2>
            <p className="text-sm text-tech-200 mb-4">
              These playbooks match the {cat.pipelineStage} stage of your workflow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPlaybooks.map((pb) => (
                <Link
                  key={pb.slug}
                  href={`/playbook/${pb.slug}`}
                  className="group rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 hover:border-neon/40 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{pb.icon}</span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors">
                      {pb.title}
                    </h3>
                  </div>
                  <p className="text-xs text-tech-200 line-clamp-2 mb-3">{pb.description}</p>
                  {pb.real_results && pb.real_results.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {pb.real_results.slice(0, 2).map((r, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        >
                          {r.value} {r.metric}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-3 text-[10px] text-neon-light opacity-0 group-hover:opacity-100 transition-opacity">
                    View playbook
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* How scoring works */}
      <section className="rounded-xl border border-tech-500/30 bg-tech-700/50 p-6">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-neon-light" />
          How the ranking works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { label: 'Community Rating', weight: '35%', desc: 'Avg rating × review confidence (log-weighted)' },
            { label: 'Trending Velocity', weight: '20%', desc: 'Recent saves, reviews, and ratings × recency decay' },
            { label: 'Asia Score', weight: '20%', desc: 'Local pricing, language support, data residency' },
            { label: 'Editor Pick', weight: '15%', desc: 'Editorially selected — curated by our team' },
            { label: 'Saves & Bookmarking', weight: '10%', desc: 'Total saves normalized across the dataset' },
          ].map((factor, i) => (
            <div key={i} className="p-3 rounded-lg bg-tech-800 border border-tech-500/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white">{factor.label}</span>
                <span className="text-[10px] font-bold text-neon-light">{factor.weight}</span>
              </div>
              <p className="text-[10px] text-tech-300">{factor.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to browse all */}
      <div className="mt-8 text-center">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-tech-600 hover:bg-tech-500 text-white text-sm font-medium transition"
        >
          Browse all tools
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
