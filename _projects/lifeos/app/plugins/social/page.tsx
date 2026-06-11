'use client';

/**
 * LifeOS — Social OS Plugin Page
 *
 * Dedicated interactive plugin page for social life management:
 * - Network mapping, social goal planning, event execution, and nurture phases
 * - Phase progression stepper with detailed AI conversation previews
 * - Friendship tips, social energy management, and networking guidance
 *
 * Overrides the generic [id]/page.tsx for the Social plugin.
 * Fully self-contained — no Supabase required.
 */

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { PLUGINS } from '@/app/lib/plugin-registry';

const plugin = PLUGINS.find(p => p.id === 'social')!;

// ─── Phase descriptions for visual stepper ──────────────────────────

const PHASE_EMOJIS: Record<string, string> = {
  network: '🌐',
  plan: '📝',
  execute: '🎉',
  nurture: '💗',
};

export default function SocialPluginPage() {
  const [activePhase, setActivePhase] = useState<string | null>('network');

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-fuchsia-50 via-white to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: plugin.gradient,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200">
              🟢 Active
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              🎉 Social hub
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
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-sm">
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
              <svg className="w-4 h-4 text-fuchsia-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          Social OS has {plugin.phases.length} AI-led phases. Tap any phase to see how it works.
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
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                          <svg className="w-3.5 h-3.5 text-fuchsia-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* ── Social Energy Dashboard ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">🔋 Social Energy Dashboard</h2>
        <p className="text-sm text-gray-500 mb-6">
          Track your social battery and discover the best activities for your current energy level.
        </p>
        <SocialEnergyDashboard />
      </section>

      {/* ── Quick Social Tips ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">💡 Pro Social Tips</h2>
        <p className="text-sm text-gray-500 mb-6">
          Practical strategies for a richer, more connected social life.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOCIAL_TIPS.map((tip, i) => (
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
          <Link href="/plugins/relationships" className="flex items-center gap-3 p-4 bg-gradient-to-r from-fuchsia-50 to-purple-50 border border-fuchsia-200 rounded-xl hover:shadow-sm hover:border-fuchsia-300 transition-all">
            <span className="text-2xl">💑</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Relationships OS</h3>
              <p className="text-xs text-gray-500">Deepen your most important romantic connection</p>
            </div>
          </Link>
          <Link href="/plugins/learning" className="flex items-center gap-3 p-4 bg-gradient-to-r from-fuchsia-50 to-purple-50 border border-fuchsia-200 rounded-xl hover:shadow-sm hover:border-fuchsia-300 transition-all">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Learning OS</h3>
              <p className="text-xs text-gray-500">Share learning journeys and find study groups</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-gray-800 hover:text-fuchsia-600 transition-colors">
            ← Back to LifeOS
          </Link>
          <Link href="/plugins" className="text-xs text-gray-400 hover:text-fuchsia-600 transition-colors">
            All Plugins
          </Link>
        </div>
      </footer>
    </main>
  );
}

// ─── Social Energy Dashboard Component ──────────────────────────────

function SocialEnergyDashboard() {
  const [energyLevel, setEnergyLevel] = useState<number>(60);
  const [socialLog, setSocialLog] = useState<Array<{type: string; label: string; time: string}>>([]);
  const [logInput, setLogInput] = useState('');

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const addLog = useCallback((type: string, label: string) => {
    setSocialLog(prev => [{ type, label, time: timeStr }, ...prev].slice(0, 20));
  }, [timeStr]);

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logInput.trim()) return;
    addLog('log', logInput.trim());
    setLogInput('');
    // Energy drain: social interaction reduces energy
    setEnergyLevel(prev => Math.max(0, prev - 8));
  };

  const energyColor = energyLevel > 60 ? 'from-emerald-400 to-emerald-500' :
    energyLevel > 30 ? 'from-amber-400 to-amber-500' :
    'from-rose-400 to-rose-500';

  const energyText = energyLevel > 60 ? 'High — ready for social adventures!' :
    energyLevel > 30 ? 'Medium — choose wisely.' :
    'Low — time to recharge.';

  const recommendedActivities = energyLevel > 70 ? [
    { emoji: '🎉', label: 'Party or group outing' },
    { emoji: '🤝', label: 'Networking event' },
    { emoji: '🍽️', label: 'Host a dinner party' },
  ] : energyLevel > 40 ? [
    { emoji: '☕', label: 'Coffee with one friend' },
    { emoji: '🚶', label: 'Walk & talk catch-up' },
    { emoji: '🎮', label: 'Low-key game night (2-3 people)' },
  ] : [
    { emoji: '📱', label: 'Text or voice note a friend' },
    { emoji: '🧘', label: 'Solo recharge (read, walk alone)' },
    { emoji: '📝', label: 'Reply to messages at your pace' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Energy Meter */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Your Social Battery</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="10" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - energyLevel / 100)}`}
                className={`text-transparent bg-gradient-to-r ${energyColor} [stroke:url(#energyGrad)]`}
              />
              <defs>
                <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={energyLevel > 60 ? 'stop-color-emerald-400' : energyLevel > 30 ? 'stop-color-amber-400' : 'stop-color-rose-400'} />
                  <stop offset="100%" className={energyLevel > 60 ? 'stop-color-emerald-500' : energyLevel > 30 ? 'stop-color-amber-500' : 'stop-color-rose-500'} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{energyLevel}%</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${energyColor} transition-all duration-500`}
                style={{ width: `${energyLevel}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{energyText}</p>
          </div>
        </div>

        {/* Energy Controls */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium mb-2">Adjust your energy:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setEnergyLevel(prev => Math.min(100, prev + 15)); addLog('boost', 'Recharged naturally'); }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors">
              😴 Rest & recharge +15%
            </button>
            <button onClick={() => { setEnergyLevel(prev => Math.min(100, prev + 10)); addLog('boost', 'Me time — solo activity'); }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition-colors">
              🧘 Solo recharge +10%
            </button>
            <button onClick={() => { setEnergyLevel(prev => Math.max(0, prev - 20)); addLog('drain', 'Draining social event'); }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors">
              🎉 Heavy social -20%
            </button>
            <button onClick={() => { setEnergyLevel(50); setSocialLog([]); }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors">
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Activities + Log */}
      <div className="space-y-4">
        {/* Recommended activities based on energy */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">✨ Recommended for Your Energy</h3>
          <div className="space-y-2">
            {recommendedActivities.map((act, i) => (
              <button key={i} onClick={() => addLog('activity', act.label)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-fuchsia-50 hover:border-fuchsia-200 transition-all text-left group"
              >
                <span className="text-lg">{act.emoji}</span>
                <span className="text-sm text-gray-700 group-hover:text-fuchsia-700 transition-colors">{act.label}</span>
                <span className="ml-auto text-[10px] text-gray-400 group-hover:text-fuchsia-500">Log it →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom log input */}
        <form onSubmit={handleLogSubmit} className="flex gap-2">
          <input
            type="text"
            value={logInput}
            onChange={e => setLogInput(e.target.value)}
            placeholder="What did you do? (e.g. Coffee with Sarah)"
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:border-fuchsia-300"
          />
          <button type="submit"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:shadow-md transition-all">
            Log
          </button>
        </form>

        {/* Social Activity Log */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Activity Log</h3>
          {socialLog.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No activities logged yet. Tap an activity above or type one in.</p>
          ) : (
            <div className="space-y-1.5">
              {socialLog.map((entry, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-[10px] text-gray-400 w-12 shrink-0">{entry.time}</span>
                  <span className={entry.type === 'boost' ? 'text-emerald-600' : entry.type === 'drain' ? 'text-rose-500' : 'text-gray-700'}>
                    {entry.type === 'boost' ? '🔋' : entry.type === 'drain' ? '⚡' : '📌'} {entry.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SOCIAL_TIPS = [
  {
    emoji: '🔋',
    title: 'Know Your Social Battery',
    description: 'Extroverts gain energy from people; introverts recharge alone. Plan your social events around your energy cycles, not FOMO. One quality hangout beats three draining ones.',
  },
  {
    emoji: '📅',
    title: 'The Monthly One-on-One',
    description: 'Schedule a rotating monthly coffee or call with one friend at a time. Deep friendships are maintained in ones and twos, not group chats. Set a recurring calendar reminder.',
  },
  {
    emoji: '🎯',
    title: 'Quality Over Quantity',
    description: 'Dunbar\'s number suggests we can maintain ~150 relationships, but only 5 close ones. Invest most of your social energy in the relationships that truly matter.',
  },
  {
    emoji: '🗓️',
    title: 'Host Before You\'re Asked',
    description: 'Stuck waiting for invites? Host something simple — a dinner, a walk, a board game night. You control the vibe, the guest list, and the timing. People respect initiative.',
  },
  {
    emoji: '📝',
    title: 'Birthday & Milestone Tracker',
    description: 'Set reminders for birthdays, anniversaries, and milestones 3 days in advance. A thoughtful message or small gesture on these days goes further than daily text banter.',
  },
  {
    emoji: '🔄',
    title: 'Rekindle a Seven-Month Rule',
    description: 'If you haven\'t spoken to someone in 7+ months, reach out. "Hey, it\'s been too long — what\'s new with you?" Most people are delighted, not annoyed, to be remembered.',
  },
];
