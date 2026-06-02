/**
 * LifeOS — Productivity Plugin Page
 *
 * Features:
 * - Pomodoro Timer with configurable focus/break intervals
 * - Session tracking and focus history
 * - Productivity tips and habit tracking
 *
 * Static SSR shell with client-side interactive components.
 */

import type { Metadata } from 'next';
import PomodoroTimer from '@/app/components/PomodoroTimer';

export const metadata: Metadata = {
  title: '⚡ Productivity OS — LifeOS AI Copilot',
  description:
    'Focus timers, concentration training, and productivity tools. ' +
    'Build deep work habits with the Pomodoro Technique. Track your focus sessions over time.',
  openGraph: {
    title: '⚡ Productivity OS — LifeOS',
    description: 'Focus timers and productivity tracking powered by AI.',
    url: 'https://lifeos.vercel.app/plugins/productivity',
    siteName: 'LifeOS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '⚡ Productivity OS — LifeOS',
    description: 'Focus timers and productivity tracking.',
  },
};

export default function ProductivityPluginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* ── Hero ── */}
      <section className="py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          ⚡ Productivity OS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Build deep focus, track your concentration streaks, and master the Pomodoro
          Technique — with data that shows you what works.
        </p>
      </section>

      {/* ── Pomodoro Timer ── */}
      <section className="px-4 pb-12">
        <PomodoroTimer />
      </section>

      {/* ── Tips Section ── */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          💡 Tips for Better Focus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TIPS.map((tip, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                         rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{tip.emoji}</div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{tip.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const TIPS = [
  {
    emoji: '📵',
    title: 'Eliminate Distractions First',
    description:
      'Put your phone on DND, close all tabs except what you need, and use noise-canceling headphones. The first 10 minutes are the hardest — push through.',
  },
  {
    emoji: '⏰',
    title: 'Start Small, Build Up',
    description:
      'If 25 minutes feels too long, start with 15. Consistency beats duration. Gradually increase as your focus muscle strengthens.',
  },
  {
    emoji: '📊',
    title: 'Track Your Patterns',
    description:
      'Review your session history to find your peak hours. Are you more focused in the morning or evening? Schedule deep work accordingly.',
  },
  {
    emoji: '🔄',
    title: 'Respect the Breaks',
    description:
      'Use short breaks to stand, stretch, or hydrate. Avoid social media — it hijacks your attention and makes the next focus session harder.',
  },
  {
    emoji: '🎯',
    title: 'One Task Per Pomodoro',
    description:
      'Before each focus session, pick ONE task. Not "work on project" — "write introduction paragraph." Single-task during each pomodoro.',
  },
  {
    emoji: '📝',
    title: 'Capture Before You Forget',
    description:
      'If a random thought pops up during focus, jot it down quickly. Don\'t act on it. Trust that it\'s captured and return to your task.',
  },
];
