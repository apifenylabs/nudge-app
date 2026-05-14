import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Trophy,
  Users,
} from 'lucide-react';
import { playbooks, getPlaybookBySlug, getAllPlaybookSlugs } from '@/lib/playbooks';
import { toolsData } from '@/lib/data';
import { playbookSuccessStories } from '@/lib/success-stories';
import { cn } from '@/lib/utils';
import ToolCard from '@/components/ToolCard';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import PlaybookTOC from '@/components/PlaybookTOC';

interface PlaybookPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPlaybookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PlaybookPageProps): Promise<Metadata> {
  const playbook = getPlaybookBySlug(params.slug);
  if (!playbook) return { title: 'Playbook Not Found' };

  return {
    title: playbook.meta_title || playbook.title,
    description: playbook.meta_description || playbook.description,
    openGraph: {
      title: `${playbook.title} — Apifeny AI Playbook`,
      description: playbook.meta_description || playbook.description,
    },
  };
}

export default function PlaybookPage({ params }: PlaybookPageProps) {
  const playbook = getPlaybookBySlug(params.slug);
  if (!playbook) notFound();

  const relatedTools = playbook.related_tool_slugs
    .map((slug) => toolsData.find((t) => t.slug === slug && t.is_published))
    .filter(Boolean) as typeof toolsData;

  const difficultyColor = {
    Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Advanced: 'bg-neon/20 text-neon-light border-neon/30',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: playbook.title,
    description: playbook.description,
    author: { '@type': 'Organization', name: 'Apifeny AI' },
    datePublished: '2026-01-01',
    publisher: { '@type': 'Organization', name: 'Apifeny AI' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://apifeny-ai.vercel.app/playbook/${playbook.slug}`,
    },
    about: {
      '@type': 'Thing',
      name: playbook.pipeline_stage || 'AI Playbook',
    },
  };

  const showToc = playbook.steps.length > 3;

  return (
    <>
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back link */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
        All Playbooks
      </Link>

      {/* Hero */}
      <div
        className={`rounded-xl bg-gradient-to-r ${playbook.gradient} bg-tech-700/90 border border-tech-500/30 p-6 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-tech-grid opacity-30" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{playbook.icon}</span>
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
                difficultyColor[playbook.difficulty]
              )}
            >
              {playbook.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
              <Clock className="w-3 h-3" />
              {playbook.read_time_minutes} min read
            </span>
            {playbook.pipeline_stage && (
              <Link
                href={`/rankings/${playbook.pipeline_stage}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/15 text-violet-400 border border-violet-500/25 hover:bg-violet-500/25 hover:text-violet-300 transition"
              >
                <TrendingUp className="w-3 h-3" />
                {playbook.pipeline_stage}
              </Link>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{playbook.title}</h1>
          <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-2 leading-relaxed tracking-wide">{playbook.description}</p>

          {/* Revenue impact callout */}
          {playbook.revenue_impact && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-3 group/revenue transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/40 hover:scale-[1.02]">
              <DollarSign className="w-4 h-4 text-amber-400 group-hover/revenue:scale-110 transition-transform" />
              <span className="text-xs text-amber-300 font-medium group-hover/revenue:text-amber-200 transition-colors">{playbook.revenue_impact}</span>
            </div>
          )}

          {relatedTools.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-tech-200">Tools used:</span>
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neon/10 text-neon-light border border-neon/20 hover:bg-neon/20 transition"
                >
                  {tool.name}
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table of Contents */}
      {showToc && <PlaybookTOC steps={playbook.steps} />}

      {/* Step-by-Step Guide */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-neon-light" />
          Step-by-Step Guide
        </h2>

        <div className="space-y-4">
          {playbook.steps.map((step, i) => (
            <div
              id={`step-${i + 1}`}
              key={i}
              className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-5 sm:p-6 relative"
            >
              {/* Step number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon to-aqua flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-tech-100 leading-relaxed">{step.description}</p>
                  {step.tip && (
                    <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-asia/10 border border-asia/20">
                      <Lightbulb className="w-4 h-4 text-asia shrink-0 mt-0.5" />
                      <p className="text-xs text-tech-100">
                        <span className="font-semibold text-asia">Pro tip:</span> {step.tip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-asia" />
          Pro Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {playbook.pro_tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl border border-asia/20 bg-asia/5"
            >
              <Lightbulb className="w-5 h-5 text-asia shrink-0 mt-0.5" />
              <p className="text-sm text-tech-100">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes */}
      {playbook.common_mistakes && playbook.common_mistakes.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-3">
            {playbook.common_mistakes.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-tech-100 mb-1">
                      <span className="text-amber-400 font-medium">Mistake:</span>{' '}
                      {item.mistake}
                    </p>
                    <p className="text-sm text-tech-200">
                      <span className="text-emerald-400 font-medium">Fix:</span>{' '}
                      {item.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Real Results */}
      {playbook.real_results && playbook.real_results.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-400" />
            Real Results from This Playbook
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {playbook.real_results.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5 text-center"
              >
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">
                  {r.value}
                </div>
                <div className="text-xs font-medium text-white mb-0.5">{r.metric}</div>
                <div className="text-[10px] text-tech-300">{r.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Success Stories */}
      {(() => {
        const relatedStories = playbookSuccessStories.filter(
          (s) => s.playbook_slug === playbook.slug
        );
        if (relatedStories.length === 0) return null;

        return (
          <section className="mb-8 sm:mb-10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              Community Success Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedStories.slice(0, 4).map((story) => (
                <div
                  key={story.id}
                  className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon/30 to-aqua/30 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {story.author.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white truncate">
                          {story.author.name}
                        </div>
                        {story.revenue_proof && (
                          <div className="text-[10px] text-emerald-400 font-semibold">
                            {story.revenue_proof}
                          </div>
                        )}
                      </div>
                    </div>
                    {story.revenue?.verified && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 shrink-0">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-tech-200 line-clamp-2 mb-2">{story.description}</p>
                  {story.results && story.results.length > 0 && (
                    <div className="grid grid-cols-3 gap-1.5">
                      {story.results.slice(0, 3).map((r, i) => (
                        <div key={i} className="text-center p-1 rounded bg-tech-600/50">
                          <div className="text-[10px] font-bold text-white truncate">{r.value}</div>
                          <div className="text-[8px] text-tech-300 truncate">{r.metric}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/success-stories`}
                    className="inline-flex items-center gap-0.5 text-[10px] text-neon-light hover:underline mt-2"
                  >
                    View details
                    <ChevronRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              ))}
            </div>
            {relatedStories.length > 4 && (
              <div className="mt-4 text-center">
                <Link
                  href="/success-stories"
                  className="inline-flex items-center gap-1 text-xs text-neon-light hover:text-neon transition"
                >
                  View all {relatedStories.length} stories
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </section>
        );
      })()}

      {/* Try These Tools */}
      {relatedTools.length > 0 && (
        <section className="pt-6 sm:pt-8 border-t border-tech-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-light" />
                Try These Tools
              </h2>
              <p className="text-xs sm:text-sm text-tech-200 mt-1">
                Use the exact tools referenced in this playbook to get {playbook.real_results?.[0]?.value || 'real results'} fast.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm text-neon-light hover:text-neon transition shrink-0"
            >
              Browse all tools
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </div>
    </>
  );
}
