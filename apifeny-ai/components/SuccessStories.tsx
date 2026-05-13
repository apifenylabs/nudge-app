'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { playbookSuccessStories, SuccessStory } from '@/lib/success-stories';
import { Sparkles, TrendingUp, Trophy, ChevronRight, ExternalLink, ThumbsUp, Share2 } from 'lucide-react';

interface SuccessStoriesProps {
  /** Optional playbook slug to filter by */
  playbookSlug?: string;
  /** Max stories to display (for homepage) */
  limit?: number;
  /** Hide header (for homepage embedding) */
  hideHeader?: boolean;
}

export default function SuccessStories({ playbookSlug, limit, hideHeader }: SuccessStoriesProps) {
  const [filterPlaybook, setFilterPlaybook] = useState<string>(playbookSlug || 'all');

  const stories = playbookSuccessStories
    .filter((s) => filterPlaybook === 'all' || s.playbook_slug === filterPlaybook)
    .slice(0, limit || playbookSuccessStories.length);

  // Get unique playbook slugs for filter
  const playbookFilters = Array.from(
    new Set(playbookSuccessStories.map((s) => s.playbook_slug))
  ).filter(Boolean) as string[];

  // Friendly playbook name map
  const playbookNames: Record<string, string> = {
    'content-creation-with-chatgpt': 'Content Creation',
    'build-an-app-with-cursor': 'Build an App',
    'productivity-workflow-with-ai': 'Productivity',
    'ai-marketing-for-asia': 'Asia Marketing',
  };

  const playbookIcons: Record<string, string> = {
    'content-creation-with-chatgpt': '✍️',
    'build-an-app-with-cursor': '💻',
    'productivity-workflow-with-ai': '⚡',
    'ai-marketing-for-asia': '📊',
  };

  const totalMRR = playbookSuccessStories
    .filter((s) => s.revenue)
    .reduce((sum, s) => sum + (s.revenue?.amount || 0), 0);

  return (
    <section className="relative">
      {!hideHeader && (
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Community Results</h2>
              <p className="text-xs sm:text-sm text-tech-200">
                Real results from people using these playbooks
              </p>
            </div>
          </div>
          {!playbookSlug && (
            <Link
              href="/success-stories"
              className="text-sm text-neon-light hover:text-neon transition flex items-center gap-1"
            >
              All stories
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl font-bold text-emerald-400">
            ${(totalMRR / 1000).toFixed(1)}K
          </div>
          <div className="text-[10px] sm:text-xs text-tech-200 mt-0.5">Total MRR Tracked</div>
        </div>
        <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl font-bold text-sky-400">{stories.length}</div>
          <div className="text-[10px] sm:text-xs text-tech-200 mt-0.5">Success Stories</div>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl font-bold text-amber-400">
            ${totalMRR > 0 ? Math.round(totalMRR / stories.filter((s) => s.revenue).length) : 0}
          </div>
          <div className="text-[10px] sm:text-xs text-tech-200 mt-0.5">Avg Revenue/Story</div>
        </div>
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl font-bold text-violet-400">
            {playbookFilters.length}
          </div>
          <div className="text-[10px] sm:text-xs text-tech-200 mt-0.5">Playbooks Featured</div>
        </div>
      </div>

      {/* Playbook filter */}
      {!playbookSlug && playbookFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <button
            onClick={() => setFilterPlaybook('all')}
            className={cn(
              'px-3 py-1.5 rounded-full text-[11px] font-medium border transition',
              filterPlaybook === 'all'
                ? 'bg-neon/20 text-neon-light border-neon/30'
                : 'bg-tech-700/60 text-tech-200 border-tech-500/30 hover:border-tech-400/50'
            )}
          >
            All Stories
          </button>
          {playbookFilters.map((slug) => (
            <button
              key={slug}
              onClick={() => setFilterPlaybook(slug)}
              className={cn(
                'px-3 py-1.5 rounded-full text-[11px] font-medium border transition flex items-center gap-1',
                filterPlaybook === slug
                  ? 'bg-neon/20 text-neon-light border-neon/30'
                  : 'bg-tech-700/60 text-tech-200 border-tech-500/30 hover:border-tech-400/50'
              )}
            >
              <span>{playbookIcons[slug]}</span>
              {playbookNames[slug] || slug}
            </button>
          ))}
        </div>
      )}

      {/* Stories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {stories.length === 0 && (
        <div className="rounded-xl border border-dashed border-tech-500/30 bg-tech-700/40 p-8 text-center">
          <TrendingUp className="w-10 h-10 text-tech-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white mb-1">No stories yet</h3>
          <p className="text-xs text-tech-200 max-w-md mx-auto mb-4">
            Be the first to share your results from this playbook!
          </p>
          <Link
            href="/my-playbooks"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
          >
            Share your results
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}

function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <Link
      href={`/playbook/${story.playbook_slug}`}
      className="group relative rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-5 hover:border-emerald-500/40 hover:-translate-y-1 transition-all overflow-hidden"
    >
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="relative">
        {/* Revenue badge */}
        {story.revenue_proof && (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-semibold mb-2">
            <Sparkles className="w-3 h-3" />
            {story.revenue_proof}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-1.5 leading-snug">
          {story.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-tech-200 line-clamp-2 mb-3 leading-relaxed">
          {story.description}
        </p>

        {/* Results metrics */}
        {story.results && story.results.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {story.results.slice(0, 3).map((r, i) => (
              <div key={i} className="text-center p-1.5 rounded-lg bg-tech-600/50">
                <div className="text-xs font-bold text-white truncate">{r.value}</div>
                <div className="text-[9px] text-tech-300 truncate">{r.metric}</div>
              </div>
            ))}
          </div>
        )}

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-neon/30 to-aqua/30 flex items-center justify-center text-[9px] font-bold text-white">
              {story.author.name.charAt(0)}
            </div>
            <span className="text-[10px] text-tech-300">{story.author.name}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-tech-400">
            <span className="flex items-center gap-0.5">
              <ThumbsUp className="w-3 h-3" />
              {story.likes}
            </span>
            <span className="flex items-center gap-0.5">
              <Share2 className="w-3 h-3" />
              {story.shares}
            </span>
          </div>
        </div>

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {story.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[9px] bg-tech-600/50 text-tech-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Playbook link */}
        {story.playbook_slug && (
          <div className="mt-3 pt-2 border-t border-tech-500/20">
            <span className="text-[10px] text-neon-light group-hover:underline inline-flex items-center gap-0.5">
              View playbook
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
