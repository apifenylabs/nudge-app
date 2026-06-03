'use client';

/**
 * LifeOS — Productivity OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - PomodoroTimer with configurable focus/break intervals
 * - Expandable phase stepper (5 phases: Audit, Design, System, Optimize, Review)
 * - Quick productivity actions gallery
 * - Quick tips grid for better focus
 * - Cross-plugin links to related plugins
 *
 * Overrides the generic [id]/page.tsx for the Productivity plugin.
 * Fully self-contained — localStorage only, no Supabase required.
 */

import { useState } from 'react';
import Link from 'next/link';
import PomodoroTimer from '@/app/components/PomodoroTimer';

// ─── Plugin Metadata ────────────────────────────────────────────────

const PLUGIN = {
  id: 'productivity',
  name: 'Productivity OS',
  emoji: '⚡',
  description: 'Build deep focus, track your concentration streaks, and master the Pomodoro Technique — with data that shows you what works.',
  color: 'from-amber-500 to-yellow-600',
  gradient: 'linear-gradient(135deg, #F59E0B, #CA8A04)',
  badge: 'Focus system',
  features: [
    'Customizable Pomodoro Timer with focus/break/session intervals',
    'Focus session history with streak tracking',
    'Phase-based productivity coaching (Audit → Design → System → Optimize → Review)',
    'Time-blind habit tracking and distraction analysis',
    'Deep work training with progressive load increase',
  ],
  phases: [
    {
      id: 'audit',
      name: 'Audit',
      description: 'Understand current time allocation and bottlenecks',
      objectives: [
        'Audit daily routine, time sinks, and energy patterns',
        'Identify the single biggest productivity bottleneck',
        'Establish baseline: completion rate, deep work hours, distraction level',
      ],
    },
    {
      id: 'design',
      name: 'Design',
      description: 'Build your ideal day and system blueprint',
      objectives: [
        'Select a methodology: GTD, ZTD, time blocking, or custom',
        'Design ideal daily schedule aligned to energy peaks',
        'Define workspace and environment setup',
      ],
    },
    {
      id: 'system',
      name: 'System',
      description: 'Set up tools, routines, and review cadence',
      objectives: [
        'Set up task management tool with project structure',
        'Establish calendar blocking with time-blocked weekly template',
        'Create daily planning, weekly review, and monthly reflection routines',
      ],
    },
    {
      id: 'optimize',
      name: 'Optimize',
      description: 'Deep work training and distraction elimination',
      objectives: [
        'Identify and protect deep work blocks',
        'Eliminate notifications and context switching',
        'Schedule high-cognitive work during peak energy hours',
      ],
    },
    {
      id: 'review',
      name: 'Review',
      description: 'Weekly productivity review with score and trend',
      objectives: [
        'Calculate weekly productivity score',
        'Track trend across weeks and adjust the system',
        'Set one small experiment each week to improve',
      ],
    },
  ],
};

// ─── Phase Config ──────────────────────────────────────────────────

const PHASE_EMOJIS: Record<string, string> = {
  audit: '🔍',
  design: '🎨',
  system: '🔧',
  optimize: '⚡',
  review: '📊',
};

// ─── Quick Actions ─────────────────────────────────────────────────

const QUICK_ACTIONS = [
  {
    emoji: '⏱️',
    title: 'Run a Pomodoro',
    description: 'Start a 25-minute focus session right now. No planning, no prep. Just begin.',
    duration: '25 min',
    benefit: 'Focus',
  },
  {
    emoji: '📋',
    title: 'Brain Dump',
    description: 'Write down everything in your head right now. Tasks, worries, ideas. Clear the mental clutter.',
    duration: '5 min',
    benefit: 'Clarity',
  },
  {
    emoji: '🎯',
    title: 'Pick One MIT',
    description: 'What is the Most Important Task today? The one thing that must get done. Do it first.',
    duration: '2 min',
    benefit: 'Priority',
  },
  {
    emoji: '📵',
    title: 'Digital Declutter',
    description: 'Close all browser tabs except the one you need. Turn off notifications. Put phone face-down.',
    duration: '3 min',
    benefit: 'Environment',
  },
  {
    emoji: '📊',
    title: 'Weekly Review',
    description: 'Look back at the week. What got done? What slipped? Plan next week with intent.',
    duration: '15 min',
    benefit: 'Alignment',
  },
  {
    emoji: '🧘',
    title: 'Reset Break',
    description: 'Stand up, stretch, walk away from the screen for 5 minutes. Your brain needs the reset.',
    duration: '5 min',
    benefit: 'Recovery',
  },
];

// ─── Quick Tips ────────────────────────────────────────────────────

const TIPS = [
  {
    emoji: '📵',
    title: 'Eliminate Distractions First',
    description:
      'Put your phone on DND, close all tabs except what you need, and use noise-canceling headphones. The first 10 minutes are the hardest — push through.',
    impact: 'High',
  },
  {
    emoji: '⏰',
    title: 'Start Small, Build Up',
    description:
      'If 25 minutes feels too long, start with 15. Consistency beats duration. Gradually increase as your focus muscle strengthens.',
    impact: 'High',
  },
  {
    emoji: '📊',
    title: 'Track Your Patterns',
    description:
      'Review your session history to find your peak hours. Are you more focused in the morning or evening? Schedule deep work accordingly.',
    impact: 'Medium',
  },
  {
    emoji: '🔄',
    title: 'Respect the Breaks',
    description:
      'Use short breaks to stand, stretch, or hydrate. Avoid social media — it hijacks your attention and makes the next focus session harder.',
    impact: 'Medium',
  },
  {
    emoji: '🎯',
    title: 'One Task Per Pomodoro',
    description:
      'Before each focus session, pick ONE task. Not "work on project" — "write introduction paragraph." Single-task during each pomodoro.',
    impact: 'High',
  },
  {
    emoji: '📝',
    title: 'Capture Before You Forget',
    description:
      'If a random thought pops up during focus, jot it down quickly. Don\'t act on it. Trust that it\'s captured and return to your task.',
    impact: 'Medium',
  },
];

// ─── Related Plugins ───────────────────────────────────────────────

const RELATED_PLUGINS = [
  {
    id: 'health',
    name: 'Health OS',
    emoji: '💪',
    description: 'Sleep, energy, and mental clarity — the foundation of focus.',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness OS',
    emoji: '🧘',
    description: 'Train attention and reduce mental chatter between sessions.',
  },
  {
    id: 'learning',
    name: 'Learning OS',
    emoji: '📚',
    description: 'Structured skill development with deep work blocks.',
  },
];

// ─── Component ─────────────────────────────────────────────────────

export default function ProductivityPluginPage() {
  const [activePhase, setActivePhase] = useState<string | null>('audit');

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-amber-50 via-white to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: PLUGIN.gradient,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl mb-4">{PLUGIN.emoji}</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {PLUGIN.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-6">
              {PLUGIN.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                <span>🏷️</span>
                {PLUGIN.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                <span>📋</span>
                {PLUGIN.phases.length} phases
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                <span>💡</span>
                {PLUGIN.features.length} features
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Actions Gallery ── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            ⚡ Quick Productivity Actions
          </h2>
          <p className="text-gray-500">
            Small, high-impact actions you can take right now.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action, i) => (
            <div
              key={i}
              className="group relative bg-white border border-gray-200 rounded-xl p-5
                         hover:border-amber-300 hover:shadow-md transition-all cursor-default"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{action.emoji}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {action.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">⏱️ {action.duration}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                      {action.benefit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pomodoro Timer ── */}
      <section className="max-w-3xl mx-auto px-4 pb-8">
        <PomodoroTimer />
      </section>

      {/* ── Phase Stepper ── */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            🗺️ Your Productivity Journey
          </h2>
          <p className="text-gray-500">
            A structured path from audit to mastery. Expand each phase to see objectives.
          </p>
        </div>

        <div className="space-y-3">
          {PLUGIN.phases.map((phase, idx) => {
            const isOpen = activePhase === phase.id;
            return (
              <div
                key={phase.id}
                className="border border-gray-200 rounded-xl overflow-hidden
                           transition-all hover:border-amber-200"
              >
                <button
                  onClick={() => setActivePhase(isOpen ? null : phase.id)}
                  className="w-full flex items-center justify-between px-5 py-4
                             text-left bg-white hover:bg-amber-50/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{PHASE_EMOJIS[phase.id] || '📌'}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-gray-400">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{phase.description}</p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-0 bg-amber-50/20 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-2 mt-3">🎯 Objectives:</p>
                    <ul className="space-y-1.5">
                      {phase.objectives.map((obj, oi) => (
                        <li key={oi} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0">✦</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Quick Tips Grid ── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            💡 Tips for Better Focus
          </h2>
          <p className="text-gray-500">
            Evidence-backed techniques to sharpen your concentration.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIPS.map((tip, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5
                         hover:border-amber-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{tip.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tip.description}</p>
                  <span className={`inline-block mt-2 text-xs font-medium px-1.5 py-0.5 rounded ${
                    tip.impact === 'High'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {tip.impact} Impact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related Plugins ── */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              🔗 Related Tools
            </h2>
            <p className="text-gray-500">
              Productivity connects to every part of life. These plugins work well together.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {RELATED_PLUGINS.map((rp) => (
              <Link
                key={rp.id}
                href={`/plugins/${rp.id}`}
                className="group block bg-white border border-gray-200 rounded-xl p-5
                           hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">{rp.emoji}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {rp.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{rp.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
