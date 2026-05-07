'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Sparkles, TrendingUp, Layers, BookOpen, Trophy, ArrowRight } from 'lucide-react';
import FeaturedCategories from '@/components/FeaturedCategories';
import TrendingTools from '@/components/TrendingTools';
import SponsoredToolSpot from '@/components/SponsoredToolSpot';
import MustUseThisMonth from '@/components/MustUseThisMonth';
import FeaturedCollections from '@/components/FeaturedCollections';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const statsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filterPills = [
    { label: 'Free', filter: 'pricing=Free' },
    { label: 'Paid', filter: 'pricing=Paid' },
    { label: 'Agentic', filter: 'agentic=true' },
    { label: 'Multimodal', filter: 'multimodal=true' },
    { label: 'Asia-Ready', filter: 'asiaReady=true' },
  ];

  const stats = [
    { icon: Layers, value: '19,000+', label: 'AI Tools', desc: 'Curated from around the web' },
    { icon: BookOpen, value: '1,200+', label: 'Categories', desc: 'Organized by use case' },
    { icon: TrendingUp, value: '8,500+', label: 'Playbooks', desc: 'How-to guides for every tool' },
    { icon: Trophy, value: 'Asia-Ready', label: 'Rankings', desc: 'Built for Asian users' },
  ];

  return (
    <div>
      {/* ════════════════════════════════════ */}
      {/* HERO SECTION                       */}
      {/* ════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-tech-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-aqua/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20 text-center">
          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Cosme-Style AI Directory
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5 animate-slide-up">
            Discover the best{' '}
            <span className="bg-gradient-to-r from-neon-light to-aqua bg-clip-text text-transparent">
              AI tools
            </span>{' '}
            <br className="hidden sm:block" />
            for every use case
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-tech-100/70 max-w-2xl mx-auto mb-8 sm:mb-10 animate-slide-up">
            19,000+ curated tools. Cosme-style rankings. Asia-ready filters.
            Find the perfect AI tool, agent, or playbook for your next project.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-6 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 19,000+ AI tools and agents…"
                className="w-full bg-tech-800/90 border border-tech-500/40 rounded-xl pl-12 pr-5 py-4 text-base text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-2 focus:ring-neon/10 transition shadow-lg shadow-black/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 animate-fade-in">
            {filterPills.map((pill) => (
              <Link
                key={pill.label}
                href={`/tools?${pill.filter}`}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-tech-500/30 bg-tech-700/60 text-tech-100 hover:text-white hover:border-neon/40 hover:bg-tech-700 text-xs sm:text-sm font-medium transition"
              >
                {pill.label}
              </Link>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <div className="w-5 h-8 rounded-full border border-tech-500/30 mx-auto flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-tech-300 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* STATS BAR                          */}
      {/* ════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="relative py-10 sm:py-12 border-y border-tech-500/20 bg-tech-800/40"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-neon/10 mb-3">
                    <Icon className="w-5 h-5 text-neon-light" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-tech-200 mt-1">{stat.label}</div>
                  <div className="text-[10px] sm:text-xs text-tech-300 mt-0.5">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* FEATURED CATEGORIES                 */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCategories />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* TRENDING THIS WEEK                  */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingTools />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* MUST-USE THIS MONTH                 */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MustUseThisMonth />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* CURATED COLLECTIONS                 */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCollections />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* PLAYBOOKS                          */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* SPONSORED TOOLS SPOT               */}
      {/* ════════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SponsoredToolSpot />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* NEWSLETTER CTA                      */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-6 sm:p-8 rounded-2xl border border-neon/20 bg-gradient-to-br from-tech-700/80 to-tech-800/60">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neon/15 mb-4">
              <Mail className="w-6 h-6 text-neon-light" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Get the weekly AI tools digest
            </h2>
            <p className="text-sm sm:text-base text-tech-200 mb-6 max-w-md mx-auto">
              New tools, trending playbooks, and Asia-ready AI picks delivered to your inbox every Monday.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-tech-800 border border-tech-500/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
              />
              <button className="px-6 py-3 rounded-lg bg-neon hover:bg-neon-dark text-white font-medium text-sm transition flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-tech-300 mt-3">
              No spam, unsubscribe anytime. Read by 12,000+ AI enthusiasts in Asia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Need Mail icon
function Mail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
