'use client';

/**
 * LifeOS — Health OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - HabitMoodDashboard (daily habits + mood tracking)
 * - Quick health practices gallery
 * - Phase overview with expandable stepper
 * - Cross-plugin links to related plugins
 *
 * Overrides the generic [id]/page.tsx for the Health plugin.
 * Fully self-contained — localStorage only, no Supabase required.
 */

import { useState } from 'react';
import Link from 'next/link';
import HabitMoodDashboard from '@/app/components/HabitMoodDashboard';
import { PLUGINS } from '@/app/lib/plugin-registry';

const plugin = PLUGINS.find(p => p.id === 'health')!;

// ─── Health quick practices ──────────────────────────────────────────

const QUICK_PRACTICES = [
  {
    emoji: '💧',
    title: 'Water Check',
    description: 'Set a daily hydration target. Log each glass. See your weekly average.',
    duration: '30s',
    benefit: 'Hydration',
  },
  {
    emoji: '🧘',
    title: '2-Minute Breath',
    description: 'Box breathing: 4s in, 4s hold, 4s out, 4s hold. Calms the nervous system instantly.',
    duration: '2 min',
    benefit: 'Stress',
  },
  {
    emoji: '🚶',
    title: 'Walk Break',
    description: '10-minute walk after meals improves digestion, blood sugar, and mental clarity.',
    duration: '10 min',
    benefit: 'Activity',
  },
  {
    emoji: '😴',
    title: 'Sleep Log',
    description: 'Track bedtime, wake time, and sleep quality. Spot patterns affecting your rest.',
    duration: '1 min',
    benefit: 'Sleep',
  },
  {
    emoji: '🥗',
    title: 'Meal Snapshot',
    description: 'Quick food log — note protein, veggies, and how you felt after eating.',
    duration: '2 min',
    benefit: 'Nutrition',
  },
  {
    emoji: '🎯',
    title: 'Mood Check-in',
    description: 'Rate your mood 1-10 with a note. Watch trends over days and weeks.',
    duration: '30s',
    benefit: 'Mental',
  },
];

// ─── Health Metric Cards (for the top dashboard-style overview) ──────

const METRICS = [
  { label: 'Mood', emoji: '😊', target: '7+', color: 'from-emerald-400 to-teal-500' },
  { label: 'Sleep', emoji: '😴', target: '7-9h', color: 'from-indigo-400 to-purple-500' },
  { label: 'Exercise', emoji: '🏃', target: '3-5x/wk', color: 'from-rose-400 to-pink-500' },
  { label: 'Hydration', emoji: '💧', target: '8 cups', color: 'from-sky-400 to-blue-500' },
  { label: 'Nutrition', emoji: '🥗', target: 'Balanced', color: 'from-lime-400 to-green-500' },
  { label: 'Stress', emoji: '🧘', target: 'Low/Managed', color: 'from-amber-400 to-orange-500' },
];

// ─── Phase emoji map ─────────────────────────────────────────────────

const PHASE_EMOJIS: Record<string, string> = {
  baseline: '📋',
  research: '🔬',
  plan: '🎯',
  habit: '🔄',
  review: '📊',
};

export default function HealthPluginPage() {
  const [activePhase, setActivePhase] = useState<string | null>('baseline');

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-rose-50 via-white to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: plugin.gradient,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
              🟢 Active
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              💪 Health
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
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-sm">
              Start a health conversation →
            </span>
            <span className="text-xs text-gray-400">No account needed. Free to use.</span>
          </div>
        </div>
      </section>

      {/* ── Target Metrics Dashboard ── */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold text-gray-900">🎯 Target Zones</h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">Quick Reference</span>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          General wellness targets. Your actual goals depend on age, activity level, and health status.
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

      {/* ── Habit & Mood Dashboard ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold text-gray-900">📝 Habit & Mood Tracker</h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">Interactive Tool</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Track daily habits — water, exercise, sleep, nutrition — and log your mood.
          All data stays in your browser. See correlations between habits and how you feel.
        </p>
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <HabitMoodDashboard />
        </div>
      </section>

      {/* ── Quick Practices ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">⚡ Quick Health Practices</h2>
        <p className="text-sm text-gray-500 mb-6">
          Small actions with outsized impact. Pick one and start today.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_PRACTICES.map((p, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="text-xl">{p.emoji}</div>
                <span className="text-[10px] font-medium text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                  {p.duration}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">{p.description}</p>
              <span className="text-[10px] font-medium text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                {p.benefit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plugin.features.map(f => (
            <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          Health OS has {plugin.phases.length} AI-led phases. Tap any phase to see how the AI opens the conversation.
        </p>
        <div className="space-y-3">
          {plugin.phases.map((phase, i) => (
            <div key={phase.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                          <svg className="w-3.5 h-3.5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <Link href="/plugins/mindfulness" className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-purple-50 border border-rose-200 rounded-xl hover:shadow-sm hover:border-rose-300 transition-all">
            <span className="text-2xl">🧘</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Mindfulness OS</h3>
              <p className="text-xs text-gray-500">Breathing exercises, meditation, and stress reduction</p>
            </div>
          </Link>
          <Link href="/plugins/travel" className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-xl hover:shadow-sm hover:border-rose-300 transition-all">
            <span className="text-2xl">🌍</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Travel OS</h3>
              <p className="text-xs text-gray-500">Health prep before international travel</p>
            </div>
          </Link>
          <Link href="/plugins/nutrition" className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-lime-50 border border-rose-200 rounded-xl hover:shadow-sm hover:border-rose-300 transition-all">
            <span className="text-2xl">🥗</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Nutrition (Coming Soon)</h3>
              <p className="text-xs text-gray-500">Meal plans, macros, and dietary tracking</p>
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
