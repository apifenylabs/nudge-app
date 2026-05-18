'use client';

import { ShieldCheck, Award, BadgeCheck } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'default' | 'compact';
}

export default function TrustBadges({ variant = 'default' }: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-lg text-[10px] font-medium border border-emerald-200 dark:border-emerald-800/50">
          <BadgeCheck size={11} className="shrink-0" />
          <span>Verified Data</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 rounded-lg text-[10px] font-medium border border-sky-200 dark:border-sky-800/50">
          <Award size={11} className="shrink-0" />
          <span>Expert Reviewed</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 rounded-lg text-[10px] font-medium border border-amber-200 dark:border-amber-800/50">
          <ShieldCheck size={11} className="shrink-0" />
          <span>100+ Verified</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
        <BadgeCheck size={16} className="text-emerald-500 shrink-0" />
        <div>
          <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Data Accuracy</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Verified station info</div>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/40">
        <Award size={16} className="text-sky-500 shrink-0" />
        <div>
          <div className="text-xs font-semibold text-sky-800 dark:text-sky-300">Expert Reviewed</div>
          <div className="text-[10px] text-sky-600 dark:text-sky-400">Curated by EV travellers</div>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/40">
        <ShieldCheck size={16} className="text-amber-500 shrink-0" />
        <div>
          <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">Satisfaction</div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400">1,000+ happy travellers</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Banner-style trust bar — great for hero sections.
 */
export function TrustBar() {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full border border-white/20">
      <span className="flex items-center gap-1 text-[10px] text-emerald-200">
        <BadgeCheck size={12} /> Verified Data
      </span>
      <span className="w-1 h-1 rounded-full bg-white/20" />
      <span className="flex items-center gap-1 text-[10px] text-sky-200">
        <Award size={12} /> Expert Curated
      </span>
      <span className="w-1 h-1 rounded-full bg-white/20" />
      <span className="flex items-center gap-1 text-[10px] text-amber-200">
        <ShieldCheck size={12} /> 100% Verified
      </span>
    </div>
  );
}
