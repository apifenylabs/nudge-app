'use client';

/**
 * LifeOS — Nutrition OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - Expandable phase stepper (5 phases: Profile, Audit, Plan, Habits, Review)
 * - Quick nutrition actions gallery
 * - Habit streak tracker
 * - Meal log quick entry
 * - Cross-plugin links to related plugins
 *
 * Overrides the generic [id]/page.tsx for the Nutrition plugin.
 * Fully self-contained — localStorage only, no Supabase required.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Plugin Metadata ────────────────────────────────────────────────

const PLUGIN = {
  id: 'nutrition',
  name: 'Nutrition OS',
  emoji: '🥗',
  description: 'Build sustainable eating habits that fit your life — with personalized meal plans, habit tracking, and evidence-based guidance.',
  color: 'from-green-500 to-lime-600',
  gradient: 'linear-gradient(135deg, #22C55E, #65A30D)',
  badge: 'Diet coach',
  features: [
    'Full nutrition profile — diet, restrictions, goals, health conditions',
    'Diet quality audit with macronutrient and micronutrient gap analysis',
    'Personalized eating plan respecting budget, time, and cooking skill',
    'Habit-first approach: one micro-habit at a time for lasting change',
    'Weekly check-ins with pattern detection and plan adjustment',
    'Evidence-based guidance citing nutrition research and guidelines',
  ],
  phases: [
    {
      id: 'profile',
      name: 'Profile',
      description: 'Build your nutritional baseline',
      objectives: [
        'Understand current eating patterns and restrictions',
        'Identify nutrition goals (weight, energy, performance, health)',
        'Build a nutrition profile with baseline metrics',
        'Flag any diet-related health concerns needing professional input',
      ],
    },
    {
      id: 'audit',
      name: 'Audit',
      description: 'Analyze diet quality and find gaps',
      objectives: [
        'Calculate macronutrient and micronutrient gap analysis',
        'Assess diet quality score (whole foods vs processed ratio)',
        'Identify hydration, timing, and dependency patterns',
        'Surface the single biggest nutritional gap to fix first',
      ],
    },
    {
      id: 'plan',
      name: 'Plan',
      description: 'Build a sustainable eating plan',
      objectives: [
        'Identify top 3 highest-impact dietary changes',
        'Create a meal structure that fits schedule and preferences',
        'Build a template week with specific meal ideas',
        'Respect budget, time, and cooking skill constraints',
      ],
    },
    {
      id: 'habits',
      name: 'Habits',
      description: 'Build small daily nutrition habits that stick',
      objectives: [
        'Select one small nutrition habit to start this week',
        'Use habit stacking: anchor to an existing routine',
        'Define minimum viable version to reduce friction',
        'Track completion daily without guilt or perfectionism',
      ],
    },
    {
      id: 'review',
      name: 'Review',
      description: 'Weekly check-in and plan adjustment',
      objectives: [
        'Track habit consistency without guilt',
        'Identify patterns: triggers, energy shifts, barriers',
        'Celebrate wins and adjust plan based on real feedback',
        'Set next week\'s habit or progression level',
      ],
    },
  ],
  tips: [
    { id: 'n1', text: 'Eat 30+ different plants per week for optimal gut microbiome diversity', impact: 'high' as const },
    { id: 'n2', text: 'Protein timing matters less than total daily intake — spread across meals', impact: 'high' as const },
    { id: 'n3', text: 'Hydrate before meals — thirst is often mistaken for hunger', impact: 'medium' as const },
    { id: 'n4', text: 'Add vegetables first, subtract nothing else. Build habits, don\'t restrict', impact: 'high' as const },
    { id: 'n5', text: 'Fermented foods (yogurt, kimchi, sauerkraut) support gut health daily', impact: 'medium' as const },
    { id: 'n6', text: 'Meal prep on Sunday saves 5+ hours of decision fatigue during the week', impact: 'medium' as const },
  ],
};

// ─── Quick Action Cards ─────────────────────────────────────────────

const QUICK_ACTIONS = [
  { emoji: '📝', title: 'Diet Snapshot', desc: 'Log what you ate today for a quick quality score and gap analysis', action: 'Log Meals →' },
  { emoji: '🎯', title: 'Set a Habit', desc: 'Pick one micro-habit to build this week (e.g., veggies at dinner)', action: 'Pick Habit →' },
  { emoji: '📊', title: 'Weekly Review', desc: 'Check your habit streak, energy levels, and adjust the plan', action: 'Review Week →' },
  { emoji: '🥗', title: 'Meal Ideas', desc: 'Get personalized meal suggestions based on your goals and preferences', action: 'Get Ideas →' },
  { emoji: '🛒', title: 'Prep Plan', desc: 'Build a shopping list and prep schedule for the week ahead', action: 'Plan Prep →' },
  { emoji: '💧', title: 'Hydration Check', desc: 'Track daily water intake and build a hydration habit', action: 'Track Water →' },
];

// ─── Components ─────────────────────────────────────────────────────

/** Expandable phase stepper */
function PhaseStepper({ phases }: { phases: typeof PLUGIN.phases }) {
  const [openPhase, setOpenPhase] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {phases.map((phase, i) => {
        const isOpen = openPhase === phase.id;
        return (
          <div
            key={phase.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setOpenPhase(isOpen ? null : phase.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white">{phase.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{phase.description}</div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.objectives.map((obj, oi) => (
                    <li key={oi} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Quick Actions Gallery */
function QuickActionsGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {QUICK_ACTIONS.map((action, i) => (
        <div
          key={i}
          className="group relative p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-green-300 dark:hover:border-green-700 transition-all cursor-pointer"
          onClick={() => {
            try {
              const log = JSON.parse(localStorage.getItem('nutrition_quick_actions') || '[]');
              log.push({ title: action.title, time: new Date().toISOString() });
              localStorage.setItem('nutrition_quick_actions', JSON.stringify(log.slice(-50)));
            } catch { /* noop */ }
          }}
        >
          <div className="text-2xl mb-2">{action.emoji}</div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{action.desc}</p>
          <span className="text-sm font-medium text-green-600 dark:text-green-400 group-hover:underline">
            {action.action}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Habit Streak Tracker — localStorage */
function HabitStreakTracker() {
  const [streak, setStreak] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('nutrition_habit_streak') || '{"streak":0,"lastDate":""}');
      const today = new Date().toDateString();
      if (data.lastDate === today) {
        setChecked(true);
        setStreak(data.streak);
      } else {
        setChecked(false);
        setStreak(data.streak);
      }
    } catch { /* noop */ }
  }, []);

  const checkIn = () => {
    try {
      const today = new Date().toDateString();
      const data = JSON.parse(localStorage.getItem('nutrition_habit_streak') || '{"streak":0,"lastDate":""}');
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = data.streak;
      if (data.lastDate === yesterday || data.lastDate === '') {
        newStreak = data.streak + 1;
      } else if (data.lastDate === today) {
        return; // already checked in
      } else {
        newStreak = 1; // reset
      }

      localStorage.setItem('nutrition_habit_streak', JSON.stringify({ streak: newStreak, lastDate: today }));
      setStreak(newStreak);
      setChecked(true);
    } catch { /* noop */ }
  };

  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-lime-50 dark:from-gray-800 dark:to-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🔥 Habit Streak</h3>
      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{streak} days</div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {checked ? 'Today checked in ✅' : 'Haven\'t checked in today yet'}
      </p>
      <button
        onClick={checkIn}
        disabled={checked}
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          checked
            ? 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 cursor-default'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {checked ? '✅ Done for Today' : "☑️ I Completed Today's Habit"}
      </button>
    </div>
  );
}

/** Meal Log Quick Entry */
function MealLogEntry() {
  const [entries, setEntries] = useState<{ meal: string; note: string; time: string }[]>([]);
  const [meal, setMeal] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('nutrition_meal_log') || '[]');
      setEntries(saved.slice(-20));
    } catch { /* noop */ }
  }, []);

  const addEntry = () => {
    if (!meal.trim()) return;
    const entry = { meal: meal.trim(), note: note.trim(), time: new Date().toLocaleTimeString() };
    const updated = [...entries, entry];
    setEntries(updated);
    try {
      localStorage.setItem('nutrition_meal_log', JSON.stringify(updated));
    } catch { /* noop */ }
    setMeal('');
    setNote('');
  };

  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📝 Quick Meal Log</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={meal}
          onChange={e => setMeal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addEntry()}
          placeholder="What did you eat?"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={addEntry}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
        >
          Log
        </button>
      </div>
      <input
        type="text"
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Optional note (portion, how you felt)"
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
      />
      {entries.length > 0 && (
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {entries.slice(-5).reverse().map((e, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <span className="text-green-500 mt-0.5">🍽️</span>
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">{e.meal}</span>
                {e.note && <span className="text-gray-400"> — {e.note}</span>}
                <span className="block text-gray-400">{e.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {entries.length === 0 && (
        <p className="text-xs text-gray-400 dark:text-gray-500 italic">No meals logged today yet</p>
      )}
    </div>
  );
}

/** Quick Tips Grid */
function QuickTips() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {PLUGIN.tips.map(tip => (
        <div key={tip.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">💡</span>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{tip.text}</p>
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                tip.impact === 'high'
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                  : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
              }`}>
                {tip.impact === 'high' ? '🔥 High Impact' : '📈 Medium'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────

export default function NutritionOSPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-500 via-lime-500 to-lime-600 dark:from-green-700 dark:via-lime-800 dark:to-green-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)',
        }} />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              Active Plugin
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              5 Phases
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              6 Features
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {PLUGIN.emoji} {PLUGIN.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-6">
            {PLUGIN.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#quick-actions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-green-600 font-semibold hover:bg-green-50 transition-colors shadow-lg"
            >
              ⚡ Quick Actions
            </a>
            <a
              href="#phase-stepper"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              📋 View Phases
            </a>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-2">
            {PLUGIN.features.map((f, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/15 text-white/90 backdrop-blur-sm">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Actions Gallery ─── */}
      <section id="quick-actions" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quick Nutrition Actions</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Start a nutrition activity with one click. Your data stays local.</p>
        <QuickActionsGallery />
      </section>

      {/* ─── Habit Tracker + Meal Log ─── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HabitStreakTracker />
          <MealLogEntry />
        </div>
      </section>

      {/* ─── Phase Stepper ─── */}
      <section id="phase-stepper" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">📋 Your Nutrition Journey</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">A structured path from understanding your diet to building lasting habits. Expand each phase.</p>
        <PhaseStepper phases={PLUGIN.phases} />
      </section>

      {/* ─── Tips ─── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 Nutrition Tips</h2>
        <QuickTips />
      </section>

      {/* ─── Related Plugins ─── */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔗 Related Plugins</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">These plugins complement your nutrition journey.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/plugins/health"
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
          >
            <div className="text-2xl mb-2">🏥</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Health OS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track sleep, exercise, stress, and overall wellness metrics</p>
          </Link>
          <Link
            href="/plugins/mindfulness"
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all group"
          >
            <div className="text-2xl mb-2">🧘</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Mindfulness OS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Build mindful eating habits and reduce stress around food</p>
          </Link>
          <Link
            href="/plugins/productivity"
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
          >
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Productivity OS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Plan meal prep time and build consistent eating routines</p>
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
        <p>🥗 LifeOS Nutrition OS — v1.0 • Data stored locally • Supabase persistence coming soon</p>
      </footer>
    </div>
  );
}
