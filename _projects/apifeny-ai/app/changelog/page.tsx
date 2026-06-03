import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GitCommit, Sparkles, Zap, Bug, Globe, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Changelog — Apifeny AI Updates',
  description: 'Track every update, improvement, and fix to Apifeny AI — from visual overhauls to payment infrastructure.',
};

type ChangeType = 'feature' | 'improvement' | 'fix' | 'launch';
type ChangeEntry = {
  date: string;
  type: ChangeType;
  title: string;
  description: string;
  icon: typeof Sparkles;
};

const changes: ChangeEntry[] = [
  {
    date: 'Jun 2, 2026',
    type: 'launch',
    title: 'Payments Are LIVE',
    description: 'Stripe checkout is live. Pro Monthly ($37/mo), Pro Yearly ($247/yr), and single playbooks ($9-19) are now purchasable. No more "waitlist" — real buttons, real checkout URLs.',
    icon: DollarSign,
  },
  {
    date: 'Jun 2, 2026',
    type: 'improvement',
    title: 'Pricing Reset — Research-Backed',
    description: 'Dropped Pro Monthly from $47 to $37, yearly from $470 to $247. Based on competitive research against Felixbot ($29-99 range), Alex Hormozi ($75/mo rebuild cost), and 11x.ai ($5K/mo enterprise). $37 is the sweet spot — above the noise floor, below the steep line.',
    icon: Sparkles,
  },
  {
    date: 'Jun 2, 2026',
    type: 'fix',
    title: '404 Page — Dead Link Removed',
    description: 'Not-found page was pointing to family-travel-directory.vercel.app (dead). Now links back to /playbooks.',
    icon: Bug,
  },
  {
    date: 'Jun 2, 2026',
    type: 'improvement',
    title: 'Footer Cleaned Up',
    description: 'Removed 5 dead sister site links from footer: Luxury Family Travel Asia, Kids Activities Asia, Senior-Friendly Travel Asia, Social Beast, and the travel affiliate bar. Only Family Travel Asia and EV Charging Asia remain.',
    icon: Globe,
  },
  {
    date: 'Jun 2, 2026',
    type: 'feature',
    title: 'Changelog Launched',
    description: 'This page. Every update tracked and timestamped. No more wondering what changed.',
    icon: GitCommit,
  },
  {
    date: 'Jun 2, 2026',
    type: 'feature',
    title: 'Workflow Diagram — Homepage',
    description: 'Interactive SVG workflow diagram on the homepage showing how Apifeny works: Problem → Playbook → Tools → Result. Visual explanation for new visitors.',
    icon: Zap,
  },
];

const typeStyles: Record<ChangeType, string> = {
  launch: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  feature: 'bg-violet-100 text-violet-700 border-violet-200',
  improvement: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  fix: 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition mb-4"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Changelog</h1>
          <p className="text-sm text-gray-500">
            Every update, improvement, and fix shipped to Apifeny AI. <span className="text-neon">Built in public.</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-6 bottom-0 w-px bg-gray-200" />

          <div className="space-y-8">
            {changes.map((change, i) => {
              const Icon = change.icon;
              return (
                <div key={i} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-[7px] top-0 w-[17px] h-[17px] rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    <div className="w-[7px] h-[7px] rounded-full bg-neon" />
                  </div>

                  {/* Card */}
                  <div className="rounded-xl border border-gray-200 p-4 sm:p-5 hover:border-gray-300 transition">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-neon shrink-0" />
                        <h3 className="text-sm font-semibold text-gray-900">{change.title}</h3>
                      </div>
                      <span
                        className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border uppercase tracking-wider ${typeStyles[change.type]}`}
                      >
                        {change.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{change.description}</p>
                    <p className="text-[10px] text-gray-400 mt-2 font-mono">{change.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscribe */}
        <div className="mt-10 text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-500">
            This changelog updates automatically with every deploy. No email list. Just show up.
          </p>
        </div>
      </div>
    </div>
  );
}
