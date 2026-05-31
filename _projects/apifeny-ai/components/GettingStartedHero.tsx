'use client';

import { Sparkles, ChevronRight, Clock, Zap } from 'lucide-react';

interface GettingStartedHeroProps {
  totalPlaybooks: number;
  beginnerCount: number;
  onFilterChange: (filter: string | null) => void;
  activeFilter: string | null;
}

export default function GettingStartedHero({
  totalPlaybooks,
  beginnerCount,
  onFilterChange,
  activeFilter,
}: GettingStartedHeroProps) {
  return (
    <section className="relative mb-10 sm:mb-14">
      {/* Main hero card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 border border-gray-200 p-6 sm:p-8 shadow-sm overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-200/10 rounded-full blur-2xl" />

        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-[10px] font-semibold mb-4">
            <Sparkles className="w-3 h-3" />
            {/* <Package className="w-2.5 h-2.5" /> */}
            <span>Free AI Playbook Library</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            Stop collecting AI tools.{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Start shipping with them.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mb-5 leading-relaxed">
            Copy-paste-ready playbooks for real work — content creation, coding, marketing,
            automation, research. Each playbook is a repeatable system, not a tutorial.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-500 mb-5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-gray-900">{totalPlaybooks}</span>
              <span>playbooks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-gray-900">{beginnerCount}</span>
              <span>beginner-ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-semibold text-gray-900">5-15 min</span>
              <span>each</span>
            </div>
          </div>

          {/* Quick-start buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterChange('beginner')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'beginner'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:shadow-sm'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              🚀 I&apos;m new to AI — where do I start?
            </button>
            <button
              onClick={() => onFilterChange(null)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === null
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
              Browse all playbooks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
