'use client';

/**
 * LifeOS — Learning OS Plugin Page
 *
 * Dedicated interactive plugin page with:
 * - Expandable phase stepper (5 phases: Focus, Structure, Study, Apply, Reflect)
 * - Quick learning actions gallery
 * - Study session timer with intervals
 * - Skill tracking widget
 * - Cross-plugin links to related plugins
 *
 * Overrides the generic [id]/page.tsx for the Learning plugin.
 * Fully self-contained — localStorage only, no Supabase required.
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Plugin Metadata ────────────────────────────────────────────────

const PLUGIN = {
  id: 'learning',
  name: 'Learning OS',
  emoji: '📚',
  description: 'Master any skill with structured curricula, interactive study sessions, and real-world projects — guided by AI that adapts to your pace.',
  color: 'from-amber-500 to-orange-600',
  gradient: 'linear-gradient(135deg, #F59E0B, #EA580C)',
  badge: 'Skill builder',
  features: [
    'AI-driven skill mapping and goal alignment',
    'Structured curriculum with measurable milestones',
    'Interactive study timer with recall intervals',
    'Real-world project assignments with progress tracking',
    'Adaptive path adjustment based on review results',
  ],
  phases: [
    {
      id: 'focus',
      name: 'Focus',
      description: 'Define what to learn and why — motivation drives retention',
      objectives: [
        'Identify learning goals: career, hobby, certification, or growth',
        'Assess current knowledge level honestly',
        'Find the intrinsic motivation behind the goal',
        'Choose a single focus area (avoid topic sprawl)',
      ],
    },
    {
      id: 'structure',
      name: 'Structure',
      description: 'Build a curriculum with the right sequence and best resources',
      objectives: [
        'Break the skill into progressive milestones',
        'Curate best resources: courses, books, mentors, communities',
        'Set a realistic timeline with weekly checkpoints',
        'Define success criteria for each milestone',
      ],
    },
    {
      id: 'study',
      name: 'Study',
      description: 'Active learning sessions with recall and application',
      objectives: [
        'Alternate between input (reading/watching) and active recall',
        'Use Feynman technique to identify gaps',
        'Take structured notes you can search later',
        'Target 80% understanding before moving on',
      ],
    },
    {
      id: 'apply',
      name: 'Apply',
      description: 'Real projects that transform knowledge into skill',
      objectives: [
        'Build something with what you learned',
        'Teach someone else (best test of understanding)',
        'Get feedback and iterate',
        'Document your process for portfolio',
      ],
    },
    {
      id: 'reflect',
      name: 'Reflect',
      description: 'Review progress and adjust the path forward',
      objectives: [
        'Review what worked and what didn\'t',
        'Update skill map with new knowledge',
        'Identify next learning frontier',
        'Celebrate progress — small wins compound',
      ],
    },
  ],
  quickActions: [
    { id: 'define-goal', label: '🎯 Define a Learning Goal', description: 'Set a specific skill target for the next 30 days' },
    { id: 'find-resources', label: '📖 Find Best Resources', description: 'Curate courses, books, and tutorials for any topic' },
    { id: 'study-session', label: '⏱️ Start Study Timer', description: '25-minute focused study with recall intervals' },
    { id: 'recall-test', label: '🧠 Test Your Recall', description: 'Feynman technique session to find knowledge gaps' },
    { id: 'assign-project', label: '🛠️ Pick a Practice Project', description: 'Real project that applies what you\'re learning' },
    { id: 'review-progress', label: '📊 Weekly Progress Review', description: 'Check milestones and adjust your learning path' },
  ],
  tips: [
    { id: 't1', text: 'Active recall beats passive reading 3:1 for long-term retention', impact: 'high' as const },
    { id: 't2', text: 'Spaced repetition: review after 1 day, 3 days, 1 week, 1 month', impact: 'high' as const },
    { id: 't3', text: 'Teach what you learn — explaining forces deeper understanding', impact: 'high' as const },
    { id: 't4', text: 'Block 45-90 min deep sessions, not 10-min sprints', impact: 'medium' as const },
    { id: 't5', text: 'Write notes in your own words within 24 hours', impact: 'medium' as const },
    { id: 't6', text: 'Alternate topics in study sessions (interleaving boosts pattern recognition)', impact: 'medium' as const },
  ],
};

// ─── Quick Action Cards ─────────────────────────────────────────────

const QUICK_ACTIONS = [
  {
    id: 'define-goal',
    emoji: '🎯',
    title: 'Define a Goal',
    desc: 'Set a specific skill target for the next 30 days. AI helps scope it to your current level.',
    action: 'Set Learning Goal →',
  },
  {
    id: 'find-resources',
    emoji: '📖',
    title: 'Find Resources',
    desc: 'Curate the best courses, books, and tutorials for any topic — quality-filtered and sequenced.',
    action: 'Curate Resources →',
  },
  {
    id: 'study-session',
    emoji: '⏱️',
    title: 'Study Timer',
    desc: '25-minute focused study with built-in recall prompts. Adapted Pomodoro for learning.',
    action: 'Start Session →',
  },
  {
    id: 'recall-test',
    emoji: '🧠',
    title: 'Test Recall',
    desc: 'Feynman technique drill. Identify exactly where your understanding has gaps.',
    action: 'Run Recall Test →',
  },
  {
    id: 'assign-project',
    emoji: '🛠️',
    title: 'Practice Project',
    desc: 'A real project matched to your current level. Build. Ship. Get feedback.',
    action: 'Get Project →',
  },
  {
    id: 'review-progress',
    emoji: '📊',
    title: 'Review Progress',
    desc: 'Weekly retrospective. What stuck? What needs more work? Adjust the path.',
    action: 'Review Week →',
  },
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
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center text-sm font-bold">
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
                      <svg className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      {QUICK_ACTIONS.map((action) => (
        <div
          key={action.id}
          className="group relative p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all cursor-pointer"
          onClick={() => {
            // LocalStorage log for now — will connect to AI agent later
            try {
              const log = JSON.parse(localStorage.getItem('learning_quick_actions') || '[]');
              log.push({ id: action.id, time: new Date().toISOString() });
              localStorage.setItem('learning_quick_actions', JSON.stringify(log.slice(-50)));
            } catch { /* noop */ }
          }}
        >
          <div className="text-2xl mb-2">{action.emoji}</div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{action.desc}</p>
          <span className="text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:underline">
            {action.action}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Study Session Timer */
function StudySessionTimer() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [recallInterval, setRecallInterval] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          if (mode === 'focus') {
            setMode('break');
            setTimeLeft(5 * 60);
            setSessions(s => s + 1);
            setRecallInterval(true);
            // Auto-clear recall flag after 3s
            setTimeout(() => setRecallInterval(false), 3000);
          } else {
            setMode('focus');
            setTimeLeft(25 * 60);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const toggle = useCallback(() => setIsRunning(r => !r), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(25 * 60);
    setRecallInterval(false);
  }, []);

  const switchMode = useCallback((m: 'focus' | 'break') => {
    setIsRunning(false);
    setMode(m);
    setTimeLeft(m === 'focus' ? 25 * 60 : 5 * 60);
    setRecallInterval(false);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => switchMode('focus')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'focus' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'break' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
        >
          Break (5m)
        </button>
      </div>

      <div className="text-5xl font-mono font-bold text-gray-900 dark:text-white mb-4">
        {formatTime(timeLeft)}
      </div>

      {recallInterval && (
        <div className="mb-3 px-3 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-medium animate-pulse">
          🧠 Recall check! Can you summarize what you just studied?
        </div>
      )}

      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={toggle}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}
        >
          {isRunning ? '⏹ Pause' : '▶ Start'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          ↺ Reset
        </button>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Sessions completed today: <span className="font-semibold text-amber-600 dark:text-amber-400">{sessions}</span>
      </div>
    </div>
  );
}

/** Quick Tips Grid with impact badges */
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

/** Skill Progress Card — localStorage based */
function SkillProgressCard() {
  const [goal, setGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState('');

  useEffect(() => {
    try {
      const g = localStorage.getItem('learning_current_goal');
      if (g) setSavedGoal(g);
    } catch { /* noop */ }
  }, []);

  const saveGoal = () => {
    if (!goal.trim()) return;
    try {
      localStorage.setItem('learning_current_goal', goal.trim());
      setSavedGoal(goal.trim());
      setGoal('');
    } catch { /* noop */ }
  };

  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🎯 Current Learning Goal</h3>
      {savedGoal ? (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 italic">&ldquo;{savedGoal}&rdquo;</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">In progress</span>
          </div>
          <button
            onClick={() => { setSavedGoal(''); try { localStorage.removeItem('learning_current_goal'); } catch { /* noop */ } }}
            className="mt-3 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear goal
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveGoal()}
            placeholder="e.g. Learn Spanish to A2 level"
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={saveGoal}
            className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
          >
            Set
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────

export default function LearningOSPage() {
  const [activeTab, setActiveTab] = useState<'phases' | 'study' | 'tips'>('phases');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 dark:from-amber-700 dark:via-orange-800 dark:to-orange-900">
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
              6+ Features
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-amber-600 font-semibold hover:bg-amber-50 transition-colors shadow-lg"
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

        {/* Feature badges row */}
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quick Learning Actions</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Start a learning activity with one click. Your actions are tracked locally.</p>
        <QuickActionsGallery />
      </section>

      {/* ─── Study Timer + Goal Setting ─── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">⏱️ Focused Study Timer</h2>
            <StudySessionTimer />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎯 Goal Tracker</h2>
            <SkillProgressCard />
          </div>
        </div>
      </section>

      {/* ─── Phase Stepper ─── */}
      <section id="phase-stepper" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">📋 Your Learning Journey</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">A structured path from goal setting to mastery. Expand each phase to see objectives.</p>
        <PhaseStepper phases={PLUGIN.phases} />
      </section>

      {/* ─── Tabbed Content: Tips ─── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">💡 Learning Tips</h2>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['phases', 'study', 'tips'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab === 'phases' ? '📋 Phases' : tab === 'study' ? '⏱️ Study' : '💡 Tips'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'phases' && (
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Learning OS Phase Flow</h3>
            <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><strong className="text-gray-900 dark:text-white">1. Focus</strong> — Define goals, motivation, and current level</li>
              <li><strong className="text-gray-900 dark:text-white">2. Structure</strong> — Build curriculum with milestones + resources</li>
              <li><strong className="text-gray-900 dark:text-white">3. Study</strong> — Active guided sessions with recall exercises</li>
              <li><strong className="text-gray-900 dark:text-white">4. Apply</strong> — Real-world projects that build skill</li>
              <li><strong className="text-gray-900 dark:text-white">5. Reflect</strong> — Review progress and adapt the path</li>
            </ol>
          </div>
        )}

        {activeTab === 'study' && (
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Effective Study Patterns</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 🧠 <strong>Active Recall</strong> — Close the book and explain from memory</li>
              <li>• 📝 <strong>Feynman Technique</strong> — Teach a concept to a 5-year-old</li>
              <li>• 🔄 <strong>Spaced Repetition</strong> — Review at 1d, 3d, 1w, 1m intervals</li>
              <li>• 🔀 <strong>Interleaving</strong> — Mix topics in one session for better pattern recognition</li>
              <li>• ✍️ <strong>Own Words</strong> — Re-write notes within 24 hours in your language</li>
              <li>• 🛠️ <strong>Project-Based</strong> — Build something real within the first 2 weeks</li>
            </ul>
          </div>
        )}

        {activeTab === 'tips' && <QuickTips />}
      </section>

      {/* ─── Related Plugins ─── */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔗 Related Plugins</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">These plugins complement your learning journey.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/plugins/career"
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
          >
            <div className="text-2xl mb-2">💼</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Career OS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Apply skills to career growth, promotions, and role transitions</p>
          </Link>
          <Link
            href="/plugins/productivity"
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
          >
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Productivity OS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Build deep focus habits and manage study time effectively</p>
          </Link>
          <Link
            href="/plugins/mindfulness"
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all group"
          >
            <div className="text-2xl mb-2">🧘</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Mindfulness OS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Reduce learning anxiety and maintain focus through mindfulness</p>
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
        <p>📚 LifeOS Learning OS — v1.0 • Data stored locally • Supabase persistence coming soon</p>
      </footer>
    </div>
  );
}
