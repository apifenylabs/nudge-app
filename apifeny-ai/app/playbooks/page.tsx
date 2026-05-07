import Link from 'next/link';
import { Metadata } from 'next';
import { Clock, BookOpen, Sparkles, Lightbulb, Search, ArrowRight, ChevronRight } from 'lucide-react';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'AI Playbooks — Step-by-Step Guides | Apifeny AI',
  description: 'Practical, step-by-step AI playbooks. From content creation to app building. Real workflows, real results. Learn how to use AI tools for your projects.',
  openGraph: {
    title: 'AI Playbooks — Practical How-To Guides | Apifeny AI',
    description: 'Step-by-step playbooks for AI workflows. Learn how to use ChatGPT, Cursor, Gemini, and more for real projects.',
  },
};

const difficultyMeta = {
  Beginner: { label: 'Beginner', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  Intermediate: { label: 'Intermediate', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  Advanced: { label: 'Advanced', color: 'bg-neon/20 text-neon-light border-neon/30' },
};

export default function PlaybooksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero */}
      <section className="relative mb-10 sm:mb-12">
        <div className="absolute inset-0 bg-tech-grid opacity-30 rounded-2xl" />
        <div className="relative rounded-2xl bg-gradient-to-br from-neon/10 via-aqua/5 to-tech-800 border border-tech-500/30 p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Playbooks
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            AI Playbooks —{' '}
            <span className="bg-gradient-to-r from-neon-light to-aqua bg-clip-text text-transparent">
              Build with AI
            </span>
          </h1>
          <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
            Step-by-step guides for real AI workflows. From idea to deployment — pick a playbook
            and follow along with the tools you already use.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <BookOpen className="w-4 h-4 text-neon-light" />
              <span className="font-semibold text-white">{playbooks.length}</span> playbooks
            </div>
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <Sparkles className="w-4 h-4 text-asia" />
              <span className="font-semibold text-white">
                {new Set(playbooks.flatMap((p) => p.related_tool_slugs)).size}
              </span>{' '}
              tools covered
            </div>
            <div className="flex items-center gap-2 text-xs text-tech-200">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white">
                {Math.round(
                  playbooks.reduce((sum, p) => sum + p.read_time_minutes, 0) /
                    playbooks.length
                )}
              </span>{' '}
              min avg read
            </div>
          </div>
        </div>
      </section>

      {/* Playbooks Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {playbooks.map((pb) => {
            const diff = difficultyMeta[pb.difficulty];
            const toolCount = pb.related_tool_slugs.length;

            return (
              <Link
                key={pb.slug}
                href={`/playbook/${pb.slug}`}
                className={`group relative rounded-xl bg-gradient-to-br ${pb.gradient} bg-tech-700 border border-tech-500/30 p-5 hover:border-neon/40 transition-all hover:-translate-y-1 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-tech-grid opacity-20" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{pb.icon}</span>
                    <span
                      className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                        diff.color
                      )}
                    >
                      {diff.label}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[9px] text-tech-300 ml-auto">
                      <Clock className="w-3 h-3" />
                      {pb.read_time_minutes} min
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-1.5">
                    {pb.title}
                  </h3>
                  <p className="text-xs text-tech-200 line-clamp-2 mb-3 leading-relaxed">
                    {pb.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-tech-300">
                      {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
                    </span>
                    <span className="text-[10px] text-tech-300 group-hover:text-neon-light transition-colors flex items-center gap-0.5">
                      Read guide
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Coming Soon / CTA */}
      <section className="mt-12 rounded-xl border border-dashed border-tech-500/30 bg-tech-700/40 p-8 text-center">
        <Lightbulb className="w-10 h-10 text-asia/60 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-1">Have a playbook idea?</h3>
        <p className="text-sm text-tech-200 max-w-md mx-auto mb-4">
          Built something with AI that others could learn from? We&apos;re adding user-submitted
          playbooks soon.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-tech-600 hover:bg-tech-500 text-white text-sm font-medium transition"
        >
          Suggest a tool
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
