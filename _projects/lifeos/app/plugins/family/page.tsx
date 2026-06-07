'use client';

/**
 * LifeOS — Family OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - Family profile and connection phase overview
 * - Phase progression UI with expandable accordion
 *
 * Overrides the generic [id]/page.tsx for the Family plugin.
 * Fully self-contained — no Supabase required.
 */

import { useState } from 'react';
import Link from 'next/link';
import { PLUGINS } from '@/app/lib/plugin-registry';
import FamilyActivityPlanner from '@/app/components/FamilyActivityPlanner';

const plugin = PLUGINS.find(p => p.id === 'family')!;

// ─── Phase descriptions for visual stepper ──────────────────────────

const PHASE_EMOJIS: Record<string, string> = {
  map: '👨‍👩‍👧‍👦',
  connect: '💞',
  plan: '📅',
  execute: '⚡',
  bond: '🤝',
};

const ACCENT = 'pink';
const ACCENT_DARK = 'rose';

export default function FamilyPluginPage() {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-pink-50 via-white to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: plugin.gradient,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-rose-50 text-rose-700 border-rose-200">
              🟢 Active
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              👨‍👩‍👧‍👦 Lifestyle
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{
              background: `${plugin.gradient.split(',')[0]}15`,
              border: `1px solid ${plugin.gradient.split(',')[0].replace('linear-gradient(135deg, ', '').trim().split(' ')[0]}30`,
            }}>
              {plugin.emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{plugin.name}</h1>
              <p className="text-sm text-gray-500">{plugin.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm">
              Start a conversation →
            </span>
            <span className="text-xs text-gray-400">No account needed. Free to use.</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plugin.features.map(f => (
            <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Family Activity Planner ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <FamilyActivityPlanner />
      </section>

      {/* ── Conversation Phases (Interactive Step-Through) ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Conversation Phases</h2>
        <p className="text-sm text-gray-500 mb-6">
          Family OS has {plugin.phases.length} AI-led phases. Tap any phase to see how it works.
        </p>

        {/* Phase Stepper */}
        <div className="space-y-3">
          {plugin.phases.map((phase, i) => (
            <div key={phase.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                      {phase.objectives.map((obj, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-3.5 h-3.5 text-pink-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* ── Quick Family Tips ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">💡 Pro Family Tips</h2>
        <p className="text-sm text-gray-500 mb-6">
          Practical wisdom for stronger family bonds and smoother daily life.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FAMILY_TIPS.map((tip, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="text-xl mb-2">{tip.emoji}</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{tip.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related Plugins ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/plugins/home" className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl hover:shadow-sm hover:border-amber-300 transition-all">
            <span className="text-2xl">🏠</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Home OS</h3>
              <p className="text-xs text-gray-500">Maintain your home and tackle projects together</p>
            </div>
          </Link>
          <Link href="/plugins/relationships" className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl hover:shadow-sm hover:border-rose-300 transition-all">
            <span className="text-2xl">💑</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Relationships OS</h3>
              <p className="text-xs text-gray-500">Strengthen your closest connections</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-gray-800 hover:text-pink-600 transition-colors">
            ← Back to LifeOS
          </Link>
          <Link href="/plugins" className="text-xs text-gray-400 hover:text-pink-600 transition-colors">
            All Plugins
          </Link>
        </div>
      </footer>
    </main>
  );
}

const FAMILY_TIPS = [
  {
    emoji: '🗓️',
    title: 'Weekly Family Meeting',
    description: 'Set aside 30 minutes every Sunday to sync calendars, plan meals, and check in with everyone. Keeps chaos organized and voices heard.',
  },
  {
    emoji: '🍽️',
    title: 'Device-Free Dinner',
    description: 'Make dinner a no-phone zone. Even 20 minutes of undistracted conversation builds stronger bonds and better communication habits.',
  },
  {
    emoji: '🎯',
    title: 'One-on-One Time',
    description: 'Schedule individual time with each family member weekly. Even 15 minutes of undivided attention strengthens your connection.',
  },
  {
    emoji: '🏡',
    title: 'Family Chore Roulette',
    description: 'Rotate chores weekly to share the load and teach responsibility. Let kids choose their chore with a fun spin-the-wheel system.',
  },
  {
    emoji: '🎨',
    title: 'Start a Tradition',
    description: 'Traditions create belonging — movie night Fridays, pancake Sundays, or seasonal outings. Start one small ritual this month.',
  },
  {
    emoji: '💬',
    title: 'Gratitude Circle',
    description: 'At dinner or bedtime, have each person share one thing they\'re grateful for. It shifts focus from problems to appreciation.',
  },
];
