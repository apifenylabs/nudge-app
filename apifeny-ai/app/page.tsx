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
import NewsletterSignup from '@/components/NewsletterSignup';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import FeaturedRankings from '@/components/FeaturedRankings';
import SuccessStories from '@/components/SuccessStories';
import PipelineVisual from '@/components/PipelineVisual';

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

  const useCases = [
    {
      icon: '✍️',
      title: 'Write content that ranks',
      subtitle: 'Blog posts, social, email — with ChatGPT + Perplexity',
      playbookSlug: 'content-creation-with-chatgpt',
      playbookLabel: 'Content Creation Playbook',
      tools: ['ChatGPT', 'Perplexity'],
      bgGrad: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
      borderGlow: 'hover:border-violet-500/50',
    },
    {
      icon: '⚡',
      title: 'Ship an app tonight',
      subtitle: 'From idea to deployed MVP with Cursor + Claude',
      playbookSlug: 'build-an-app-with-cursor',
      playbookLabel: 'Build App Playbook',
      tools: ['Cursor', 'Claude', 'Vercel'],
      bgGrad: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderGlow: 'hover:border-cyan-500/50',
    },
    {
      icon: '🎯',
      title: 'Market to Asian audiences',
      subtitle: 'Multilingual campaigns that actually convert',
      playbookSlug: 'ai-marketing-for-asian-markets',
      playbookLabel: 'Asia Marketing Playbook',
      tools: ['ChatGPT', 'Canva', 'Synthesia', 'ElevenLabs'],
      bgGrad: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderGlow: 'hover:border-emerald-500/50',
    },
    {
      icon: '📹',
      title: 'Create pro videos with AI',
      subtitle: 'Full pipeline: script → voiceover → visuals → publish',
      playbookSlug: 'ai-video-production-pipeline',
      playbookLabel: 'Video Production Playbook',
      tools: ['ChatGPT', 'ElevenLabs', 'Runway', 'Descript'],
      bgGrad: 'from-amber-500/20 via-orange-500/10 to-transparent',
      borderGlow: 'hover:border-amber-500/50',
    },
  ];

  const browseByUseCase = [
    {
      icon: '📚',
      title: 'For Educators & Students',
      subtitle: 'AI tutoring, lesson planning, and personalized learning',
      playbookSlug: 'ai-for-education-and-tutoring',
      tag: 'NEW',
      bgGrad: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      borderGlow: 'hover:border-blue-500/50',
    },
    {
      icon: '💬',
      title: 'For Customer Support Teams',
      subtitle: 'Automate 80% of tickets with AI chatbots and RAG',
      playbookSlug: 'ai-for-customer-support',
      tag: 'NEW',
      bgGrad: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderGlow: 'hover:border-emerald-500/50',
    },
    {
      icon: '🎨',
      title: 'For Designers & Creatives',
      subtitle: 'Design everything with AI — from logos to video',
      playbookSlug: 'ai-for-design-and-creative',
      tag: 'NEW',
      bgGrad: 'from-rose-500/20 via-violet-500/10 to-transparent',
      borderGlow: 'hover:border-rose-500/50',
    },
    {
      icon: '📊',
      title: 'For Analysts & CFOs',
      subtitle: 'Financial modeling, research, and reporting with AI',
      playbookSlug: 'ai-for-finance-and-analysis',
      tag: 'NEW',
      bgGrad: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      borderGlow: 'hover:border-amber-500/50',
    },
    {
      icon: '📈',
      title: 'For Marketers',
      subtitle: 'Full-stack marketing automation from strategy to analytics',
      playbookSlug: 'ai-for-marketing-automation',
      tag: 'NEW',
      bgGrad: 'from-fuchsia-500/20 via-rose-500/10 to-transparent',
      borderGlow: 'hover:border-fuchsia-500/50',
    },
  ];

  const pipelineItems = [
    { stage: '💡 Idea', color: 'from-violet-500 to-purple-600', desc: 'Can\'t think what to build? Start here.' },
    { stage: '🔍 Research', color: 'from-cyan-500 to-blue-600', desc: 'Validate your idea before you build.' },
    { stage: '⚡ Build', color: 'from-fuchsia-500 to-pink-600', desc: 'Ship fast with AI-assisted coding.' },
    { stage: '🚀 Market', color: 'from-amber-500 to-orange-600', desc: 'Launch and grow your audience.' },
    { stage: '📈 Scale', color: 'from-emerald-500 to-teal-600', desc: 'Automate and optimize at scale.' },
  ];

  const stats = [
    { icon: BookOpen, value: '17', label: 'AI Playbooks', desc: 'Step-by-step guides that work' },
    { icon: Layers, value: '90+', label: 'AI Tools', desc: 'Curated, reviewed & ranked' },
    { icon: TrendingUp, value: '5', label: 'Pipeline Stages', desc: 'Idea → Research → Build → Market → Scale' },
    { icon: Trophy, value: 'Asia', label: 'Ranked', desc: 'Editorial scores for Asia' },
  ];

  return (
    <div>
      {/* ════════════════════════════════════ */}
      {/* HERO — REBUILT WITH VISUALS       */}
      {/* ════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-tech-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-transparent" />
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-neon/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-aqua/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 sm:pb-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4 sm:mb-5 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            AI Tools + Playbooks That Actually Work
          </div>

          {/* Headline — substance-first: problem → playbook → tools */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 animate-slide-up">
            You have a goal.{' '}
            <span className="bg-gradient-to-r from-neon-light via-aqua to-asia bg-clip-text text-transparent">
              We have the playbook.
            </span>
          </h1>

          {/* Subtext — problem statement first */}
          <p className="text-base sm:text-lg text-tech-100/70 max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up">
            The problem isn&apos;t finding AI tools — it&apos;s knowing how to use them together. 
            Every playbook on this site solves a real problem: write content that ranks, ship an 
            MVP tonight, market to Asia, or automate your support. Pick your goal, get the tools, 
            follow the workflow.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-5 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools and playbooks…"
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
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 animate-fade-in mb-2">
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
        </div>

        {/* Pipeline visual */}
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <PipelineVisual />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* VALUE PROPOSITION — "What do you want to build?"  */}
      {/* ════════════════════════════════════ */}
      <section className="py-12 sm:py-16 border-t border-tech-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What do you want to build today?
            </h2>
            <p className="text-tech-200 text-sm sm:text-base max-w-xl mx-auto">
              Pick a goal. We&apos;ll match you with the tools and playbook to make it happen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {useCases.map((uc) => (
              <Link
                key={uc.title}
                href={`/playbook/${uc.playbookSlug}`}
                className={`group relative rounded-xl bg-gradient-to-br ${uc.bgGrad} bg-tech-700 border border-tech-500/30 p-5 ${uc.borderGlow} transition-all hover:-translate-y-1 overflow-hidden`}
              >
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-tech-grid opacity-10" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="text-2xl mb-3">{uc.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-base font-semibold text-white group-hover:text-neon-light transition-colors mb-1">
                    {uc.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-xs text-tech-200 mb-3">{uc.subtitle}</p>
                  
                  {/* Tools used */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {uc.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-tech-600/60 text-tech-200 border border-tech-500/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-1 text-xs text-neon-light group-hover:gap-2 transition-all">
                    <span>{uc.playbookLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* BROWSE BY USE CASE — New playbooks  */}
      {/* ════════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Browse by use case
            </h2>
            <p className="text-tech-200 text-sm sm:text-base max-w-xl mx-auto">
              Not sure where to start? Pick your role and follow a complete playbook.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {browseByUseCase.map((uc) => (
              <Link
                key={uc.title}
                href={`/playbook/${uc.playbookSlug}`}
                className={`group relative rounded-xl bg-gradient-to-br ${uc.bgGrad} bg-tech-700 border border-tech-500/30 p-5 ${uc.borderGlow} transition-all hover:-translate-y-1 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-tech-grid opacity-10" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{uc.icon}</span>
                    {uc.tag && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-neon/20 text-neon-light border border-neon/30">
                        {uc.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-neon-light transition-colors mb-1">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-tech-200 mb-3">{uc.subtitle}</p>
                  <div className="flex items-center gap-1 text-xs text-neon-light group-hover:gap-2 transition-all">
                    <span>View playbook</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* PIPELINE STAGES — Visual nav        */}
      {/* ════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Follow a pipeline, not a directory
            </h2>
            <p className="text-sm text-tech-200">
              Every playbook fits into one of these stages. Pick where you are.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {pipelineItems.map((item) => (
              <Link
                key={item.stage}
                href={`/rankings/${item.stage.toLowerCase().replace('💡 ', '').replace('🔍 ', '').replace('⚡ ', '').replace('🚀 ', '').replace('📈 ', '')}`}
                className="group relative px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 hover:border-transparent transition-all hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${item.color}`} />
                <div className="relative flex items-center gap-2">
                  <span className="text-base">{item.stage}</span>
                  <ArrowRight className="w-3 h-3 text-tech-300 group-hover:text-white transition-colors" />
                </div>
                <p className="relative text-[10px] text-tech-300 group-hover:text-white/80 transition-colors mt-0.5">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* STATS BAR                          */}
      {/* ════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="relative py-10 sm:py-12 border-b border-tech-500/20 bg-tech-800/40"
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
      {/* TRENDING PLAYBOOKS (replaces Trending Tools) */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPlaybooks />
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
      {/* TRENDING TOOLS — moved down, still present */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingTools />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* RANKINGS BY WORKFLOW                */}
      {/* ════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-tech-800/30 border-y border-tech-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRankings />
        </div>
      </section>

      {/* ════════════════════════════════════ */}
      {/* SPONSORED + NEWSLETTER             */}
      {/* ════════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SponsoredToolSpot />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterSignup source="homepage-cta" />
        </div>
      </section>
    </div>
  );
}
