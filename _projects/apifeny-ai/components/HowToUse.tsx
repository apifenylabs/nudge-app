'use client';

import { useState } from 'react';
import { Play, ChevronDown, ChevronUp, Lightbulb, CheckCircle2, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───

interface QuickStartStep {
  step: number;
  title: string;
  description: string;
}

interface HowToUseProps {
  toolName: string;
  toolSlug: string;
  guideTitle?: string;
  quickStartSteps?: QuickStartStep[];
  bestForPipelineStage?: string;
}

// ─── Pipeline Stage Meta ───

const PIPELINE_META: Record<string, { label: string; color: string; icon: string }> = {
  planning: { label: 'Strategic Planning', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30', icon: '🧠' },
  coding: { label: 'Coding & Development', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30', icon: '💻' },
  research: { label: 'Research & Analysis', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: '🔍' },
  content: { label: 'Content Creation', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30', icon: '📝' },
  design: { label: 'Design & Creative', color: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30', icon: '🎨' },
  testing: { label: 'Testing & QA', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: '🧪' },
  marketing: { label: 'Marketing & Growth', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: '📊' },
  'all-rounder': { label: 'All-Rounder', color: 'bg-neon/20 text-neon-light border-neon/30', icon: '⚡' },
};

// ─── Default Quick Starts (fallback if tool has no custom steps) ───

const DEFAULT_STEPS: QuickStartStep[] = [
  { step: 1, title: 'Sign up and set up your account', description: 'Create a free account and complete the onboarding wizard to set your preferences.' },
  { step: 2, title: 'Explore the interface', description: 'Familiarise yourself with the dashboard, main features, and settings menu.' },
  { step: 3, title: 'Start your first project', description: 'Create a new project or task and begin experimenting with the core functionality.' },
  { step: 4, title: 'Refine with advanced features', description: 'Explore advanced settings, integrations, and customisation options to get the most out of the tool.' },
  { step: 5, title: 'Share and collaborate', description: 'Share your results with team members or export them in your preferred format.' },
];

// ─── Component ───

export default function HowToUse({
  toolName,
  guideTitle,
  quickStartSteps,
  bestForPipelineStage,
}: HowToUseProps) {
  const [expanded, setExpanded] = useState(false);
  const steps = quickStartSteps && quickStartSteps.length > 0 ? quickStartSteps : DEFAULT_STEPS;
  const stageMeta = bestForPipelineStage ? PIPELINE_META[bestForPipelineStage] : null;

  return (
    <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-tech-600/50 transition text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon/20 to-aqua/20 border border-neon/20 flex items-center justify-center">
            <Play className="w-4 h-4 text-neon-light" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              {guideTitle || `How to Use ${toolName}`}
            </h3>
            <p className="text-[10px] text-tech-300">Quick-start guide — {steps.length} steps</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {stageMeta && (
            <span className={cn(
              'hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-medium border',
              stageMeta.color
            )}>
              <span>{stageMeta.icon}</span>
              {stageMeta.label}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-tech-300" />
          ) : (
            <ChevronDown className="w-4 h-4 text-tech-300" />
          )}
        </div>
      </button>

      {/* Expanded Steps */}
      {expanded && (
        <div className="px-4 sm:px-5 pb-5 animate-slide-up">
          <div className="border-t border-tech-500/20 pt-4 space-y-3">
            {steps.map((step) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon/20 to-aqua/20 border border-neon/20 flex items-center justify-center text-[10px] font-bold text-neon-light shrink-0">
                    {step.step}
                  </div>
                  {step.step < steps.length && (
                    <div className="w-px flex-1 bg-gradient-to-b from-neon/20 to-transparent min-h-[20px]" />
                  )}
                </div>
                <div className="pb-3 flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-white mb-0.5">{step.title}</h4>
                  <p className="text-[11px] text-tech-200 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pro Tips footer */}
          <div className="mt-4 p-3 rounded-lg bg-tech-800/60 border border-tech-500/20 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-medium text-amber-300 mb-0.5">Pro Tip</p>
              <p className="text-[11px] text-tech-200 leading-relaxed">
                Start with the free tier to explore features before committing to a paid plan.
                Most tools offer generous free quotas for individual users.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
