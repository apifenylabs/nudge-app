'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Share2,
  ChevronRight,
  Clock,
  TrendingUp,
  CheckCircle,
  Search,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
  Twitter,
  Linkedin,
  Globe,
} from 'lucide-react';
import {
  communityPlaybooks,
  CommunityPlaybook,
  getVotes,
  getUserVote,
  recordVote,
  removeVote,
  incrementShareCount,
  getShareLinks,
} from '@/lib/community-playbooks';
import { cn } from '@/lib/utils';

// ─── Helper to load comment count from localStorage ─────────────────────

function getCommentCount(playbookId: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const data = localStorage.getItem(`apifeny_cp_comments_${playbookId}`);
    if (!data) return 0;
    const comments = JSON.parse(data);
    return comments.reduce((sum: number, c: { replies?: unknown[] }) => sum + 1 + (c.replies?.length || 0), 0);
  } catch {
    return 0;
  }
}

// ─── Individual Playbook Card ─────────────────────────────────────────────

function CommunityPlaybookCard({
  playbook,
  rank,
  commentCount,
}: {
  playbook: CommunityPlaybook;
  rank?: number;
  commentCount: number;
}) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(getUserVote(playbook.id));
  const [upvotes, setUpvotes] = useState(playbook.upvotes);
  const [downvotes, setDownvotes] = useState(playbook.downvotes);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleVote = (vote: 'up' | 'down') => {
    if (userVote === vote) {
      // Remove vote
      removeVote(playbook.id);
      setUserVote(null);
      if (vote === 'up') setUpvotes((p) => p - 1);
      else setDownvotes((p) => p - 1);
    } else {
      // Record vote (remove previous if exists)
      if (userVote === 'up') setUpvotes((p) => p - 1);
      if (userVote === 'down') setDownvotes((p) => p - 1);
      recordVote(playbook.id, vote);
      setUserVote(vote);
      if (vote === 'up') setUpvotes((p) => p + 1);
      else setDownvotes((p) => p + 1);
    }
  };

  const netScore = upvotes - downvotes;
  const shareLinks = getShareLinks(playbook);

  return (
    <div className="group relative rounded-xl border border-tech-500/30 bg-tech-700/80 p-5 hover:border-neon/40 transition-all hover:-translate-y-1">
      <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-xl pointer-events-none" />
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{playbook.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                    playbook.difficulty === 'Beginner'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : playbook.difficulty === 'Intermediate'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-neon/20 text-neon-light border-neon/30'
                  )}
                >
                  {playbook.difficulty}
                </span>
                {playbook.is_verified && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-sky-500/15 text-sky-400 border border-sky-500/20">
                    <CheckCircle className="w-2.5 h-2.5" />
                    Verified
                  </span>
                )}
              </div>
              <span className="text-[10px] text-tech-400 mt-0.5 block">
                by {playbook.author.name}
              </span>
            </div>
          </div>

          {/* Vote buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleVote('up');
              }}
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-lg text-xs border transition',
                userVote === 'up'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-tech-800 text-tech-300 border-tech-500/30 hover:border-emerald-500/30 hover:text-emerald-400'
              )}
            >
              <ThumbsUp className="w-3 h-3" />
              {upvotes}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleVote('down');
              }}
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-lg text-xs border transition',
                userVote === 'down'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  : 'bg-tech-800 text-tech-300 border-tech-500/30 hover:border-rose-500/30 hover:text-rose-400'
              )}
            >
              <ThumbsDown className="w-3 h-3" />
              {downvotes}
            </button>

            {/* Share */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowShareMenu(!showShareMenu);
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-tech-800 text-tech-300 border border-tech-500/30 hover:border-sky-500/30 hover:text-sky-400 transition"
              >
                <Share2 className="w-3 h-3" />
                {playbook.shares}
              </button>

              {showShareMenu && (
                <div
                  className="absolute right-0 top-full mt-1 w-36 rounded-xl border border-tech-500/30 bg-tech-800 shadow-xl shadow-black/30 z-50 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => incrementShareCount(playbook.id)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-tech-200 hover:bg-tech-700 hover:text-white transition"
                  >
                    <Twitter className="w-3.5 h-3.5 text-sky-400" />
                    Share on X
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => incrementShareCount(playbook.id)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-tech-200 hover:bg-tech-700 hover:text-white transition"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    Share on LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title & description */}
        <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-1">
          {playbook.title}
        </h3>
        <p className="text-[11px] text-tech-200 line-clamp-2 mb-3 leading-relaxed">
          {playbook.description}
        </p>

        {/* Revenue impact if any */}
        {playbook.revenue_impact && (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <TrendingUp className="w-2.5 h-2.5" />
            {playbook.revenue_impact}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {playbook.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-tech-800 text-tech-300 border border-tech-500/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-tech-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {playbook.steps.length} steps
            </span>
            {commentCount > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {commentCount}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(playbook.createdAt).toLocaleDateString()}
            </span>
          </div>
          <Link
            href={`/community-playbook/${playbook.id}`}
            className="text-[10px] text-tech-300 group-hover:text-neon-light transition-colors flex items-center gap-0.5"
          >
            Read playbook
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Click overlay */}
      <Link
        href={`/community-playbook/${playbook.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Read ${playbook.title}`}
      >
        <span className="sr-only">Read playbook</span>
      </Link>
    </div>
  );
}

// ─── Submit Button ───────────────────────────────────────────────────────

function SubmitPlaybookCard() {
  return (
    <Link
      href="/submit-playbook"
      className="group relative rounded-xl border border-dashed border-neon/30 bg-neon/5 p-5 hover:bg-neon/10 hover:border-neon/50 transition-all hover:-translate-y-1 flex flex-col items-center justify-center text-center"
    >
      <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center mb-3 group-hover:scale-110 transition">
        <Sparkles className="w-6 h-6 text-neon-light" />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1">Share Your Playbook</h3>
      <p className="text-[11px] text-tech-200 max-w-[200px] mb-3">
        Built something with AI? Share your workflow, prompts, and results with the community.
      </p>
      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-[11px] font-medium transition">
        Submit playbook
        <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────

export default function CommunityPlaybooksPage() {
  useEffect(() => {
    document.title = 'Community AI Playbooks — Apifeny AI';
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'votes' | 'newest'>('votes');
  const [regionFilter, setRegionFilter] = useState<string>('global');

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    communityPlaybooks.forEach((cp) => cp.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = [...communityPlaybooks];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (cp) =>
          cp.title.toLowerCase().includes(q) ||
          cp.description.toLowerCase().includes(q) ||
          cp.author.name.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (tagFilter) {
      result = result.filter((cp) => cp.tags.includes(tagFilter));
    }

    // Region filter
    if (regionFilter !== 'global') {
      result = result.filter((cp) => {
        const regionMatch = cp.tags.some((t) => t.toLowerCase().includes(regionFilter));
        return regionMatch;
      });
    }

    // Sort
    if (sortBy === 'votes') {
      result.sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes));
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [searchQuery, tagFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero */}
      <section className="relative mb-8">
        <div className="absolute inset-0 bg-tech-grid opacity-30 rounded-2xl" />
        <div className="relative rounded-2xl bg-gradient-to-br from-asia/10 via-emerald-500/5 to-tech-800 border border-tech-500/30 p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Community
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Community{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-asia bg-clip-text text-transparent">
              Playbooks
            </span>
          </h1>
          <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
            Real workflows from real people. Each playbook includes the exact prompts used, what
            worked, what didn&apos;t, and measurable results — including revenue where applicable.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{communityPlaybooks.length}</span> playbooks
            </div>
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <ThumbsUp className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">
                {communityPlaybooks.reduce((s, p) => s + p.upvotes, 0)}
              </span> total upvotes
            </div>
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">
                {communityPlaybooks.filter((p) => p.revenue_impact).length}
              </span> with revenue impact
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Region filter */}
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="bg-tech-800 border border-tech-500/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
        >
          <option value="global">🌍 Global</option>
          <option value="asia">🌏 Asia</option>
          <option value="north-america">🌎 North America</option>
          <option value="europe">🌍 Europe</option>
        </select>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tech-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search playbooks..."
            className="w-full bg-tech-800 border border-tech-500/50 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'votes' | 'newest')}
          className="bg-tech-800 border border-tech-500/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
        >
          <option value="votes">Most Votes</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setTagFilter(null)}
          className={cn(
            'px-2.5 py-1 rounded-full text-[10px] font-medium border transition',
            !tagFilter
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-tech-800 text-tech-300 border-tech-500/30 hover:border-tech-400/50'
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
            className={cn(
              'px-2.5 py-1 rounded-full text-[10px] font-medium border transition',
              tagFilter === tag
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-tech-800 text-tech-300 border-tech-500/30 hover:border-tech-400/50'
            )}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Submit card */}
        <SubmitPlaybookCard />

        {/* Playbook cards */}
        {filtered.map((cp) => (
          <CommunityPlaybookCard key={cp.id} playbook={cp} commentCount={getCommentCount(cp.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-tech-300">No playbooks match your search.</p>
        </div>
      )}
    </div>
  );
}
