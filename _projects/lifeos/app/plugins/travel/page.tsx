'use client';

/**
 * LifeOS — Travel OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - Trip Cost Calculator (interactive budget tool)
 * - Destination phase overview
 * - Phase progression UI
 *
 * Overrides the generic [id]/page.tsx for the Travel plugin.
 * Fully self-contained — no Supabase required.
 */

import { useState } from 'react';
import Link from 'next/link';
import TripCostCalculator from '@/app/components/TripCostCalculator';
import { PLUGINS } from '@/app/lib/plugin-registry';

const plugin = PLUGINS.find(p => p.id === 'travel')!;

// ─── Phase descriptions for visual stepper ──────────────────────────

const PHASE_EMOJIS: Record<string, string> = {
  discover: '🗺️',
  intent: '🎯',
  plan: '📋',
  prepare: '🎒',
  experience: '📍',
  reflect: '📝',
};

export default function TravelPluginPage() {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: plugin.gradient,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
              🟢 Active
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              🌍 Lifestyle
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
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm">
              Start a conversation →
            </span>
            <span className="text-xs text-gray-400">No account needed. Free to use.</span>
          </div>
        </div>
      </section>

      {/* ── Trip Cost Calculator ── */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold text-gray-900">💰 Trip Cost Calculator</h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">Interactive Tool</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Estimate your trip costs by travel style. Adjust duration, travelers, and categories.
          Estimates are saved locally for future reference.
        </p>
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <TripCostCalculator />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plugin.features.map(f => (
            <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conversation Phases (Interactive Step-Through) ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Conversation Phases</h2>
        <p className="text-sm text-gray-500 mb-6">
          Travel OS has {plugin.phases.length} AI-led phases. Tap any phase to see how it works.
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
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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

      {/* ── Quick Travel Tips ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">💡 Pro Travel Tips</h2>
        <p className="text-sm text-gray-500 mb-6">
          Quick tips gathered from seasoned travelers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRAVEL_TIPS.map((tip, i) => (
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
          <Link href="/plugins/finance" className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl hover:shadow-sm hover:border-teal-300 transition-all">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Finance OS</h3>
              <p className="text-xs text-gray-500">Budget your trip with real-time cost tracking</p>
            </div>
          </Link>
          <Link href="/plugins/health" className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl hover:shadow-sm hover:border-teal-300 transition-all">
            <span className="text-2xl">💪</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Health OS</h3>
              <p className="text-xs text-gray-500">Health prep before international travel</p>
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

const TRAVEL_TIPS = [
  {
    emoji: '📅',
    title: 'Travel Off-Peak',
    description: 'Fly mid-week (Tuesday-Wednesday) and travel in shoulder season for 30-50% savings on flights and accommodation.',
  },
  {
    emoji: '💳',
    title: 'No Foreign Transaction Fees',
    description: 'Get a credit card with no foreign transaction fees. You\'ll save 2-3% on every purchase abroad.',
  },
  {
    emoji: '📱',
    title: 'Download Offline Maps',
    description: 'Download Google Maps or Maps.me regions before you go. Navigation works without data or roaming.',
  },
  {
    emoji: '🧳',
    title: 'Pack Light, Move Fast',
    description: 'A carry-on only forces better decisions. You save on bag fees, skip baggage claim, and stay mobile.',
  },
  {
    emoji: '💧',
    title: 'Reusable Water Bottle',
    description: 'Many airports and hotels have free water refill stations. Save money and reduce plastic waste.',
  },
  {
    emoji: '🌐',
    title: 'Get an eSIM Before You Go',
    description: 'Install Airalo or Holafly eSIM before departure. Cheaper than roaming, no physical SIM swap.',
  },
];
