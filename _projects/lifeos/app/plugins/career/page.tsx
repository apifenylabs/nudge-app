'use client';

/**
 * LifeOS — Career OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - CareerPulse (career satisfaction slider, skills checklist, gaps tool)
 * - Quick career practices and resources
 * - Phase overview with expandable stepper
 * - Cross-plugin links to related plugins
 *
 * Overrides the generic [id]/page.tsx for the Career plugin.
 * Fully self-contained — localStorage only, no Supabase required.
 */

import { useState } from 'react';
import Link from 'next/link';
import CareerPulse from '@/app/components/CareerPulse';
import { PLUGINS } from '@/app/lib/plugin-registry';

const plugin = PLUGINS.find(p => p.id === 'career')!;
const pluginWithFallback = plugin || {
  name: 'Career OS',
  emoji: '💼',
  description: 'Job strategy, skills, networking, promotions.',
  features: [
    'Full career snapshot and satisfaction assessment',
    'Market research with real salary benchmarks',
    'Grow-in-place, pivot, or independent strategy',
    'Resume, LinkedIn, and networking execution',
    'Interview prep and negotiation tactics',
    'Long-term upskill roadmap with industry radar',
  ],
  gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
  phases: [
    { id: 'where-you-are', name: 'Where You Are', description: 'Current role, satisfaction, and skills', leadPrompt: '', objectives: ['Assess current role and satisfaction', 'Identify strongest skills and gaps', 'Surface pain points and ambitions'] },
    { id: 'market-research', name: 'Market Research', description: 'Industry trends, salary data, opportunities', leadPrompt: '', objectives: ['Research salary benchmarks', 'Identify in-demand skills', 'Spot growth industries'] },
    { id: 'strategy', name: 'Strategy', description: 'Career path, pivot plan, or promotion roadmap', leadPrompt: '', objectives: ['Define career direction', 'Create actionable roadmap', 'Set milestones and timeline'] },
    { id: 'execute', name: 'Execute', description: 'Resume, networking, applications', leadPrompt: '', objectives: ['Optimize resume and LinkedIn', 'Build networking plan', 'Create application pipeline'] },
    { id: 'grow', name: 'Grow', description: 'Continuous learning and industry engagement', leadPrompt: '', objectives: ['Define upskill roadmap', 'Identify learning resources', 'Plan industry engagement'] },
  ],
};

// ─── Career Quick Actions ──────────────────────────────────────────

const QUICK_ACTIONS = [
  {
    emoji: '📝',
    title: 'Resume Audit',
    description: 'Run through a self-guided resume check. Highlight achievements, quantify impact, and cut fluff.',
    duration: '15 min',
    benefit: 'Clarity',
  },
  {
    emoji: '🔗',
    title: 'LinkedIn Refresh',
    description: 'Update your headline, summary, and recent roles. Add keywords recruiters search for in your field.',
    duration: '10 min',
    benefit: 'Visibility',
  },
  {
    emoji: '🤝',
    title: 'Reach Out',
    description: 'Pick 3 people in your network you haven\'t talked to in 6+ months. Send a genuine note.',
    duration: '5 min',
    benefit: 'Network',
  },
  {
    emoji: '📊',
    title: 'Salary Check',
    description: 'Compare your comp against benchmarks on Levels.fyi, Glassdoor, and Blind for your role and location.',
    duration: '10 min',
    benefit: 'Market IQ',
  },
  {
    emoji: '🎯',
    title: 'Skill Sprint',
    description: 'Pick one gap skill. Spend 25 minutes on a tutorial, article, or project. Repeat weekly.',
    duration: '25 min',
    benefit: 'Growth',
  },
  {
    emoji: '🗣️',
    title: 'Mock Interview',
    description: 'Practice answering "Tell me about yourself" and "Why are you looking?" in 2 minutes or less.',
    duration: '15 min',
    benefit: 'Prep',
  },
];

// ─── Phase emoji map ───────────────────────────────────────────────

const PHASE_EMOJIS: Record<string, string> = {
  'where-you-are': '📋',
  'market-research': '🔬',
  strategy: '🎯',
  execute: '⚡',
  grow: '🌱',
};

// ─── Metric Cards ──────────────────────────────────────────────────

const METRICS = [
  { label: 'Satisfaction', emoji: '😊', target: '8+', color: 'from-violet-400 to-purple-500' },
  { label: 'Skills', emoji: '🧠', target: 'Master Key 5', color: 'from-indigo-400 to-violet-500' },
  { label: 'Network', emoji: '🤝', target: '3x/month', color: 'from-fuchsia-400 to-pink-500' },
  { label: 'Learning', emoji: '📚', target: '5h/week', color: 'from-purple-400 to-indigo-500' },
  { label: 'Applications', emoji: '📩', target: '5-10/wk', color: 'from-violet-400 to-fuchsia-500' },
  { label: 'Interviews', emoji: '🎤', target: '1-2/wk', color: 'from-purple-400 to-rose-500' },
];

export default function CareerPluginPage() {
  const [activePhase, setActivePhase] = useState<string | null>('where-you-are');

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: pluginWithFallback.gradient,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
              🟢 Active
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              💼 Career
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{
              background: `${pluginWithFallback.gradient.split(',')[0]}15`,
              border: `1px solid ${pluginWithFallback.gradient.split(',')[0].replace('linear-gradient(135deg, ', '').trim().split(' ')[0]}30`,
            }}>
              {pluginWithFallback.emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{pluginWithFallback.name}</h1>
              <p className="text-sm text-gray-500">{pluginWithFallback.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-sm">
              Start a career conversation →
            </span>
            <span className="text-xs text-gray-400">No account needed. Free to use.</span>
          </div>
        </div>
      </section>

      {/* ── Target Metrics Dashboard ── */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold text-gray-900">🎯 Career Targets</h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">Quick Reference</span>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          General career health targets. Adjust based on your industry, seniority, and personal goals.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:shadow-sm transition-shadow">
              <div className="text-2xl mb-1">{m.emoji}</div>
              <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">{m.label}</div>
              <div className="text-sm font-bold text-gray-800">{m.target}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CareerPulse (Interactive Tool) ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold text-gray-900">📊 Career Pulse</h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">Interactive Tool</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Assess your career satisfaction, track your skills, and identify gaps to work on.
          All data stays in your browser.
        </p>
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <CareerPulse />
        </div>
      </section>

      {/* ── Quick Actions ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">⚡ Quick Career Actions</h2>
        <p className="text-sm text-gray-500 mb-6">
          High-impact tasks you can do in 30 minutes or less.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map((a, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="text-xl">{a.emoji}</div>
                <span className="text-[10px] font-medium text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                  {a.duration}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{a.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">{a.description}</p>
              <span className="text-[10px] font-medium text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                {a.benefit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pluginWithFallback.features.map((f: string) => (
            <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conversation Phases ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Conversation Phases</h2>
        <p className="text-sm text-gray-500 mb-6">
          Career OS has {pluginWithFallback.phases.length} AI-led phases. Tap any phase to see how the AI opens the conversation.
        </p>

        <div className="space-y-3">
          {pluginWithFallback.phases.map((phase: any, i: number) => (
            <div key={phase.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{PHASE_EMOJIS[phase.id] || '📌'}</span>
                      <span className="text-sm font-semibold text-gray-900">{phase.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{phase.description}</p>
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    activePhase === phase.id ? 'rotate-180' : ''
                  }`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activePhase === phase.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">How the AI opens this phase</h4>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white border border-gray-200 rounded-lg p-3 text-[13px]">
                      {phase.leadPrompt}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Objectives</h4>
                    <div className="space-y-1">
                      {phase.objectives.map((obj: string, j: number) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-3.5 h-3.5 text-violet-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {obj}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Related Plugins ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/plugins/learning" className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl hover:shadow-sm hover:border-violet-300 transition-all">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Learning OS</h3>
              <p className="text-xs text-gray-500">Upskill, learn new subjects, earn certifications</p>
            </div>
          </Link>
          <Link href="/plugins/finance" className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-emerald-50 border border-violet-200 rounded-xl hover:shadow-sm hover:border-violet-300 transition-all">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Finance OS</h3>
              <p className="text-xs text-gray-500">Salary negotiation prep and financial planning</p>
            </div>
          </Link>
          <Link href="/plugins/productivity" className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-amber-50 border border-violet-200 rounded-xl hover:shadow-sm hover:border-violet-300 transition-all">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Productivity OS</h3>
              <p className="text-xs text-gray-500">Optimize your day for deep work and career growth</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-gray-800 hover:text-violet-600 transition-colors">
            ← Back to LifeOS
          </Link>
          <Link href="/plugins" className="text-xs text-gray-400 hover:text-violet-600 transition-colors">
            All Plugins
          </Link>
        </div>
      </footer>
    </main>
  );
}
