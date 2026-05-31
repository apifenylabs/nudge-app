'use client';

import { useState, useCallback } from 'react';
import { playbooks } from '@/lib/playbooks';
import Link from 'next/link';

const STAGES = [
  { key: 'planning', label: 'Strategize', emoji: '🧠', description: 'Define goals, scope, and success metrics before you build.', highlight: 'planning' },
  { key: 'ideation', label: 'Ideate', emoji: '💡', description: 'Brainstorm solutions, explore angles with AI.', highlight: 'ideation' },
  { key: 'research', label: 'Research', emoji: '🔍', description: 'Validate assumptions, gather data with AI-powered research.', highlight: 'research' },
  { key: 'build', label: 'Build', emoji: '⚡', description: 'Create MVPs, prototypes, and minimum viable products.', highlight: 'build' },
  { key: 'coding', label: 'Code', emoji: '💻', description: 'Write, debug, and optimize code with AI coding tools.', highlight: 'coding' },
  { key: 'review', label: 'Review & QA', emoji: '🔄', description: 'Review output, catch issues before launch.', highlight: 'review' },
  { key: 'testing', label: 'Test', emoji: '🧪', description: 'Automated and manual testing with AI assistance.', highlight: 'testing' },
  { key: 'deployment', label: 'Launch', emoji: '🚀', description: 'Deploy to production, monitor, and iterate.', highlight: 'deployment' },
  { key: 'content', label: 'Content', emoji: '✍️', description: 'Create blogs, videos, social content with AI.', highlight: 'content' },
  { key: 'marketing', label: 'Marketing', emoji: '📣', description: 'Reach audiences with AI-driven campaigns.', highlight: 'marketing' },
];

const STAGE_COLORS: Record<string, string> = {
  planning: 'from-violet-500 to-purple-600 shadow-violet-200',
  ideation: 'from-pink-500 to-rose-600 shadow-pink-200',
  research: 'from-sky-500 to-blue-600 shadow-sky-200',
  build: 'from-blue-500 to-indigo-600 shadow-blue-200',
  coding: 'from-indigo-500 to-violet-600 shadow-indigo-200',
  review: 'from-amber-500 to-orange-600 shadow-amber-200',
  testing: 'from-orange-500 to-red-500 shadow-orange-200',
  deployment: 'from-emerald-500 to-teal-600 shadow-emerald-200',
  content: 'from-rose-500 to-pink-600 shadow-rose-200',
  marketing: 'from-fuchsia-500 to-purple-600 shadow-fuchsia-200',
};

export default function PipelineFlowVisual() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [scrolledTo, setScrolledTo] = useState<string | null>(null);

  const filteredPlaybooks = activeStage
    ? playbooks.filter(p => p.pipeline_stage === activeStage)
    : [];

  const scrollToStage = useCallback((key: string) => {
    setActiveStage(key);
    setScrolledTo(key);
    const el = document.getElementById(`stage-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const PAID_PLAYBOOKS = ['ai-solopreneur-toolkit', 'directory-builder-template', 'ai-workflow-automation'];

  return (
    <div className="mb-12">
      {/* Pipeline Flow Diagram */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <span>🏗️</span> The AI Pipeline — From Idea to Revenue
        </h3>

        {/* Desktop: Horizontal pipeline */}
        <div className="hidden lg:block">
          <div className="relative flex items-start justify-between gap-0">
            {STAGES.map((stage, i) => (
              <div key={stage.key} className="flex flex-col items-center flex-1 min-w-0 relative">
                {/* Connector line */}
                {i < STAGES.length - 1 && (
                  <div className="absolute top-5 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gray-200 to-gray-100" />
                )}

                {/* Stage node */}
                <button
                  onClick={() => scrollToStage(stage.key)}
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-lg
                    bg-gradient-to-br ${STAGE_COLORS[stage.key]}
                    text-white shadow-md
                    hover:scale-110 hover:shadow-lg
                    transition-all duration-200
                    ${activeStage === stage.key ? 'ring-2 ring-offset-2 ring-violet-400 scale-110' : ''}
                  `}
                  title={stage.label}
                >
                  {stage.emoji}
                </button>

                {/* Label */}
                <span className={`mt-2 text-[10px] font-semibold text-center leading-tight
                  ${activeStage === stage.key ? 'text-violet-700' : 'text-gray-500'}
                  transition-colors duration-150
                `}>
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal scrollable */}
        <div className="lg:hidden overflow-x-auto -mx-6 px-6 pb-2">
          <div className="flex items-center gap-4 min-w-max">
            {STAGES.map((stage, i) => (
              <div key={stage.key} className="flex items-center">
                <button
                  onClick={() => scrollToStage(stage.key)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0
                    bg-gradient-to-br ${STAGE_COLORS[stage.key]}
                    text-white shadow-md
                    hover:scale-110 transition-all duration-200
                    ${activeStage === stage.key ? 'ring-2 ring-offset-2 ring-violet-400 scale-110' : ''}
                  `}
                  title={stage.label}
                >
                  {stage.emoji}
                </button>
                {i < STAGES.length - 1 && (
                  <div className="w-4 h-[2px] bg-gray-200 shrink-0 mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active stage detail panel */}
        {activeStage && (
          <div className="mt-6 pt-5 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">{STAGES.find(s => s.key === activeStage)?.emoji}</span>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {STAGES.find(s => s.key === activeStage)?.label}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {STAGES.find(s => s.key === activeStage)?.description}
                </p>
              </div>
            </div>

            {filteredPlaybooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredPlaybooks.slice(0, 6).map(pb => (
                  <Link
                    key={pb.slug}
                    href={PAID_PLAYBOOKS.includes(pb.slug) ? `/playbooks/${pb.slug}` : `/playbook/${pb.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50/30 transition-all group"
                  >
                    <span className="text-lg shrink-0">{pb.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-900 group-hover:text-violet-700 transition-colors truncate">
                        {pb.title}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {pb.difficulty} · {pb.read_time_minutes} min
                      </p>
                    </div>
                  </Link>
                ))}
                {filteredPlaybooks.length > 6 && (
                  <Link
                    href={`#stage-${activeStage}`}
                    onClick={() => setActiveStage(null)}
                    className="flex items-center justify-center text-xs text-violet-600 hover:text-violet-700 font-medium p-3 rounded-xl border border-dashed border-gray-200 hover:border-violet-200 transition-all"
                  >
                    See all {filteredPlaybooks.length} playbooks →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No playbooks in this stage yet. Coming soon.
              </p>
            )}
          </div>
        )}

        {/* CTA to explore all stages */}
        {!activeStage && (
          <p className="text-xs text-gray-400 text-center mt-4">
            Click any stage above to see matching playbooks
          </p>
        )}
      </div>
    </div>
  );
}
