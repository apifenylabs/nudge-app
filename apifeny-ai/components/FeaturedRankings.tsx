'use client';

import Link from 'next/link';
import { ChevronRight, Layers, Trophy, BookOpen } from 'lucide-react';
import { RANKING_CATEGORIES } from '@/lib/ranking-categories';
import { playbooks } from '@/lib/playbooks';

const featured = RANKING_CATEGORIES.slice(0, 6);

export default function FeaturedRankings() {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Rankings by Workflow</h2>
            <p className="text-xs sm:text-sm text-tech-200">
              Curated rankings for every stage of your AI workflow
            </p>
          </div>
        </div>
        <Link
          href="/rankings"
          className="text-sm text-neon-light hover:text-neon transition flex items-center gap-1"
        >
          All rankings
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((rc) => (
          <Link
            key={rc.slug}
            href={`/rankings/${rc.slug}`}
            className="group relative rounded-xl border border-tech-500/30 p-4 hover:border-neon/40 transition-all hover:-translate-y-1 overflow-hidden"
            style={{ backgroundImage: `linear-gradient(135deg, ${rc.gradient}), linear-gradient(to bottom right, rgba(17,17,34,0.85), rgba(17,17,34,0.85))` }}
          >
            <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
            <div className="relative flex items-start gap-3">
              <span className="text-2xl shrink-0">{rc.icon}</span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-0.5">
                  {rc.title}
                </h3>
                <p className="text-[11px] text-tech-300 line-clamp-2">{rc.subtitle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-tech-400 flex items-center gap-0.5">
                    <Trophy className="w-3 h-3 text-amber-400/60" />
                    Top {rc.displayCount}
                  </span>
                  {/* Link to related playbook */}
                  {(() => {
                    // Find playbook matching this ranking's pipeline stage
                    const matchingPlaybook = playbooks.find(
                      (pb) => pb.pipeline_stage === rc.pipelineStage
                    );
                    if (!matchingPlaybook) return null;
                    return (
                      <Link
                        href={`/playbook/${matchingPlaybook.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-0.5 text-[10px] text-neon-light/60 hover:text-neon-light transition"
                      >
                        <BookOpen className="w-3 h-3" />
                        Playbook
                      </Link>
                    );
                  })()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
