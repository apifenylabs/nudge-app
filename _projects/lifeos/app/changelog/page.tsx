'use client';

import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';

interface ChangelogEntry {
  version: string;
  date: string;
  tag: 'major' | 'minor' | 'patch';
  title: string;
  changes: { type: 'feature' | 'improvement' | 'fix'; text: string }[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: '0.8.0',
    date: '2026-06-01',
    tag: 'major',
    title: 'Weekly Digest & Personality Profile',
    changes: [
      { type: 'feature', text: 'Weekly Digest: auto-generated summary of your week — habits, mood trends, plugin usage, and insights' },
      { type: 'feature', text: 'Personality Profile: archetype detection with affinity radar and plugin recommendations' },
      { type: 'feature', text: 'Usage Summary Bar: quick stats dashboard showing streaks, top plugins, and weekly activity' },
      { type: 'feature', text: 'Archetype-driven plugin sorting: plugins now rank by affinity to your detected personality type' },
      { type: 'improvement', text: 'Habit-mood correlation chart with mini sparkline trends on plugin cards' },
    ],
  },
  {
    version: '0.7.0',
    date: '2026-05-15',
    tag: 'major',
    title: 'Habit Tracking & Mood Analytics',
    changes: [
      { type: 'feature', text: 'Habit tracker with daily check-in, streak counters, and visual calendar heatmap' },
      { type: 'feature', text: 'Mood logging with correlation analysis — see how habits affect your mood over time' },
      { type: 'feature', text: 'Pomodoro timer with AI-suggested break activities based on your current plugin context' },
      { type: 'feature', text: 'Analytics dashboard with plugin usage graphs, message counts, and activity trends' },
      { type: 'improvement', text: 'Phase progress tracking now persists to localStorage between sessions' },
    ],
  },
  {
    version: '0.6.0',
    date: '2026-04-28',
    tag: 'major',
    title: 'Excalidraw Canvas Integration',
    changes: [
      { type: 'feature', text: 'Embedded Excalidraw canvas alongside chat for visual brainstorming and planning' },
      { type: 'feature', text: 'Canvas auto-saves with conversation sessions' },
      { type: 'feature', text: 'Drawing tool palette: shapes, text, arrows, sticky notes, and freehand' },
      { type: 'improvement', text: 'Chat flow now scrolls in sync with canvas interactions' },
    ],
  },
  {
    version: '0.5.0',
    date: '2026-04-10',
    tag: 'major',
    title: 'Quick Actions & Session Management',
    changes: [
      { type: 'feature', text: 'Quick Actions: preset combinations that launch multiple plugins at once (e.g., Weekly Review)' },
      { type: 'feature', text: 'Session history with resume, delete, and conversation search' },
      { type: 'feature', text: 'Recent session cards on the home screen for one-tap resume' },
      { type: 'feature', text: 'Conversation titles auto-generated from context' },
    ],
  },
  {
    version: '0.4.0',
    date: '2026-03-25',
    tag: 'major',
    title: 'Plugin System & Phase-Based Conversations',
    changes: [
      { type: 'feature', text: '12 specialized plugins: Travel, Finance, Health, Career, Learning, Family, Home, Social, Relationships, Productivity, Nutrition, Mindfulness' },
      { type: 'feature', text: 'Phase-based conversations with Discover → Plan → Execute → Review structure' },
      { type: 'feature', text: 'Coming Soon plugin notifications with email signup (local)' },
      { type: 'feature', text: 'Plugin status badges: Active, Beta, Coming Soon' },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-03-10',
    tag: 'minor',
    title: 'Onboarding & Personalisation',
    changes: [
      { type: 'feature', text: 'Onboarding wizard with category selection' },
      { type: 'feature', text: 'Recommended plugins based on onboarding preferences' },
      { type: 'feature', text: 'Plugin card UI with gradient accent, feature pills, and hover animations' },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-03-01',
    tag: 'minor',
    title: 'Chat Interface & Persistence',
    changes: [
      { type: 'feature', text: 'Multi-turn chat with OpenAI API integration' },
      { type: 'feature', text: 'LocalStorage-based conversation persistence' },
      { type: 'feature', text: 'Typing indicator and message history' },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-02-15',
    tag: 'patch',
    title: 'Initial Prototype',
    changes: [
      { type: 'feature', text: 'Basic chat interface with Travel plugin prototype' },
      { type: 'feature', text: 'Gradient-based plugin card design system' },
      { type: 'feature', text: 'Phase-aware conversation flow (Discover → Plan)' },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  major: 'bg-purple-100 text-purple-700 border-purple-200',
  minor: 'bg-blue-100 text-blue-700 border-blue-200',
  patch: 'bg-gray-100 text-gray-600 border-gray-200',
};

const CHANGE_ICONS: Record<string, string> = {
  feature: '✨',
  improvement: '🔧',
  fix: '🐛',
};

const TAG_ICONS: Record<string, string> = {
  major: '🚀',
  minor: '🔧',
  patch: '🐛',
};

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default function ChangelogPage() {
  const [filter, setFilter] = useState<'all' | 'major' | 'minor' | 'patch'>('all');

  const filtered = filter === 'all' ? CHANGELOG : CHANGELOG.filter(e => e.tag === filter);

  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>Changelog — LifeOS AI Copilot</title>
        <meta name="description" content="Track LifeOS updates — new plugins, features, improvements, and fixes. Latest version 0.8.0 with Weekly Digest, Personality Profile, and habit-mood correlation." />
        <meta property="og:title" content="Changelog — LifeOS AI Copilot" />
        <meta property="og:description" content="Track LifeOS product updates and releases." />
      </Head>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900">LifeOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-500 hover:text-teal-600 transition-colors">App</Link>
            <Link href="/about" className="text-xs text-gray-500 hover:text-teal-600 transition-colors">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs text-teal-700 font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
          8 releases since v0.1.0
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Changelog</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm">
          Every update that makes LifeOS smarter, more helpful, and more personal.
        </p>
      </section>

      {/* Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-3xl mx-auto flex items-center gap-2 justify-center">
          {(['all', 'major', 'minor', 'patch'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-gray-50 border border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400">No entries match this filter.</p>
            </div>
          ) : (
            filtered.map((entry, idx) => (
              <div key={entry.version} className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {idx < filtered.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-teal-400/40 to-gray-100" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-teal-400/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                </div>

                {/* Version badge */}
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full border ${TAG_STYLES[entry.tag]}`}>
                    {TAG_ICONS[entry.tag]} v{entry.version}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(entry.date)}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-900 mb-3">{entry.title}</h2>

                {/* Changes */}
                <ul className="space-y-2">
                  {entry.changes.map((change, ci) => (
                    <li key={ci} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0">{CHANGE_ICONS[change.type]}</span>
                      <span className="leading-relaxed">{change.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">LifeOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-teal-600 transition-colors">App</Link>
            <Link href="/about" className="text-xs text-gray-400 hover:text-teal-600 transition-colors">About</Link>
            <span className="text-[10px] text-gray-400">Changelog</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
