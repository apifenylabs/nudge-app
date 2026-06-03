'use client';

/**
 * LifeOS — Mindfulness OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - Breathing Exercise Timer (interactive guided breathing)
 * - Session tracking with localStorage persistence
 * - Phase overview with expandable details
 *
 * Overrides the generic [id]/page.tsx for the Mindfulness plugin.
 * Fully self-contained — no Supabase required.
 */

import { useState } from 'react';
import Link from 'next/link';
import BreathingExercise from '@/app/components/BreathingExercise';
import { PLUGINS } from '@/app/lib/plugin-registry';

const plugin = PLUGINS.find(p => p.id === 'mindfulness')!;
const pluginWithFallback = plugin || {
  name: 'Mindfulness',
  emoji: '🧘',
  description: 'Meditation, focus, stress relief, and mental clarity.',
  features: [
    'Guided breathing exercises with multiple patterns',
    'Session tracking and progress history',
    'Mindfulness reminders and daily check-ins',
    'Focus span measurement and training',
    'Emotional resilience building',
  ],
  gradient: 'linear-gradient(135deg, #22D3EE, #14B8A6)',
  phases: [
    { id: 'baseline', name: 'Baseline', description: 'Assess your current mental landscape', leadPrompt: '', objectives: ['Assess current practice', 'Identify stress triggers', 'Establish baseline'] },
    { id: 'awareness', name: 'Awareness', description: 'Build self-awareness', leadPrompt: '', objectives: ['Identify flow states', 'Map emotions', 'Recognize patterns'] },
    { id: 'practice', name: 'Practice', description: 'Build a daily routine', leadPrompt: '', objectives: ['Design starter routine', 'Choose meditation style', 'Set reminders'] },
    { id: 'focus', name: 'Deep Focus', description: 'Strengthen attention', leadPrompt: '', objectives: ['Track focus span', 'Manage distractions', 'Build deep work'] },
    { id: 'resilience', name: 'Emotional Resilience', description: 'Handle stress with grace', leadPrompt: '', objectives: ['Identify coping', 'Build frameworks', 'Create crisis plan'] },
    { id: 'review', name: 'Review & Evolve', description: 'Monthly reflection', leadPrompt: '', objectives: ['Review consistency', 'Track trends', 'Adjust practice'] },
  ],
};

const PHASE_EMOJIS: Record<string, string> = {
  baseline: '📊',
  awareness: '🔍',
  practice: '🧘',
  focus: '🎯',
  resilience: '💪',
  review: '📝',
};

export default function MindfulnessPluginPage() {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-cyan-50 via-white to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: pluginWithFallback.gradient,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
              🟡 Beta
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              🧘 Mindfulness
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
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm">
              Start a conversation →
            </span>
            <span className="text-xs text-gray-400">No account needed. Free to use.</span>
          </div>
        </div>
      </section>

      {/* ── Breathing Exercise (Interactive Tool) ── */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold text-gray-900">🫁 Guided Breathing</h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">Interactive Tool</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Choose a breathing pattern and start a session. Session history is saved locally.
        </p>
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <BreathingExercise />
        </div>
      </section>

      {/* ── Quick Mindfulness Practices ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">🧘 Quick Practices</h2>
        <p className="text-sm text-gray-500 mb-6">
          Simple exercises you can do anywhere, anytime.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRACTICES.map((practice, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="text-xl mb-2">{practice.emoji}</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{practice.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">{practice.description}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-100">
                  ⏱️ {practice.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pluginWithFallback.features.map((f: string) => (
            <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conversation Phases ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Conversation Phases</h2>
        <p className="text-sm text-gray-500 mb-6">
          {pluginWithFallback.phases.length} AI-led phases that guide you from exploration to mastery.
        </p>

        <div className="space-y-3">
          {pluginWithFallback.phases.map((phase: any, i: number) => (
            <div key={phase.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Objectives</h4>
                    <div className="space-y-1">
                      {phase.objectives.map((obj: string, j: number) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-3.5 h-3.5 text-teal-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/plugins/health" className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl hover:shadow-sm hover:border-teal-300 transition-all">
            <span className="text-2xl">💪</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Health OS</h3>
              <p className="text-xs text-gray-500">Mind-body connection for overall wellness</p>
            </div>
          </Link>
          <Link href="/plugins/productivity" className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl hover:shadow-sm hover:border-teal-300 transition-all">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Productivity OS</h3>
              <p className="text-xs text-gray-500">Clear mind = better decisions and focus</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors">
            ← Back to LifeOS
          </Link>
          <Link href="/plugins" className="text-xs text-gray-400 hover:text-teal-600 transition-colors">
            All Plugins
          </Link>
        </div>
      </footer>
    </main>
  );
}

const PRACTICES = [
  {
    emoji: '🫁',
    title: '5-5-5 Breathing',
    description: 'Inhale for 5 seconds, hold for 5, exhale for 5. Repeat 3-5 times. Great for immediate calm.',
    duration: '1 min',
  },
  {
    emoji: '👀',
    title: '20-20-20 Rule',
    description: 'Every 20 min, look at something 20 feet away for 20 seconds. Reduces eye strain and resets focus.',
    duration: '20 sec',
  },
  {
    emoji: '🦶',
    title: 'Grounding 5-4-3-2-1',
    description: 'Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste. Anchors you in the present.',
    duration: '2 min',
  },
  {
    emoji: '🚶',
    title: 'Mindful Walking',
    description: 'Walk slowly for 50 steps, focusing entirely on the sensation of your feet touching the ground.',
    duration: '3 min',
  },
  {
    emoji: '🙏',
    title: 'Gratitude Pause',
    description: 'Close your eyes. Think of three specific things you\'re grateful for right now. Feel the gratitude.',
    duration: '2 min',
  },
  {
    emoji: '🔊',
    title: 'Sound Meditation',
    description: 'Close your eyes and listen. Identify the nearest sound, then the farthest. Expand your auditory field.',
    duration: '3 min',
  },
];
