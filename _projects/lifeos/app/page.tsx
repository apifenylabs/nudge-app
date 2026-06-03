'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import OnboardingWizard from './components/OnboardingWizard';
import { trackEvent, startSession as startAnalyticsSession, endSession, trackMessage, trackPhaseProgress } from './lib/usage-analytics';

// Dynamic import: Excalidraw is client-only
const ExcalidrawCanvas = dynamic(
  () => import('./components/ExcalidrawCanvas'),
  { ssr: false },
);
import type { ChatSession, ChatMessage } from './lib/chat-persistence';
import type { PluginDefinition, PluginPhase } from './lib/plugin-registry';
import MiniSparkline from './components/MiniSparkline';
import UsageSummaryBar from './components/UsageSummaryBar';


type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const CANVAS_COLORS: Record<string, string> = {
  red: '#FEE2E2', orange: '#FED7AA', amber: '#FDE68A', green: '#D1FAE5',
  teal: '#CCFBF1', blue: '#DBEAFE', indigo: '#E0E7FF', purple: '#E9D5FF', pink: '#FCE7F3',
};

// ─── Plugin Card — PRD §11.1 ───────────────────────────────────────

function PluginCard({
  plugin,
  onSelect,
}: {
  plugin: PluginDefinition;
  onSelect: (plugin: PluginDefinition) => void;
}) {
  const statusBadge = plugin.status === 'coming-soon'
    ? { label: 'Coming Soon', style: 'bg-gray-100 text-gray-400 border-gray-200' }
    : plugin.status === 'beta'
    ? { label: 'Beta', style: 'bg-amber-50 text-amber-600 border-amber-200' }
    : { label: 'Active', style: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
  const canSelect = plugin.status === 'active' || plugin.status === 'beta';

  return (
    <button
      onClick={() => (plugin.status === 'active' || plugin.status === 'beta') && onSelect(plugin)}
      disabled={plugin.status === 'coming-soon'}
      className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 ${
        canSelect
          ? 'bg-white border-gray-200 hover:shadow-lg hover:-translate-y-1 hover:border-transparent cursor-pointer'
          : 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-60'
      }`}
    >
      {/* Animated gradient border on hover */}
      {canSelect && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `${plugin.gradient}15`,
            border: `1px solid transparent`,
            backgroundClip: 'padding-box',
          }}
        />
      )}

      <div className="relative z-10">
        {/* Emoji icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
          style={{
            background: plugin.status === 'active' ? `${plugin.gradient.split(',')[0]}15` : '#F3F4F6',
            border: `1px solid ${
              plugin.status === 'active'
                ? plugin.gradient.split(',')[0].replace('linear-gradient(135deg, ', '').trim().split(' ')[0]
                : '#E5E7EB'
            }30`,
          }}
        >
          {plugin.emoji}
        </div>

        {/* Name + status */}
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-bold text-gray-900">{plugin.name}</h3>
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${statusBadge.style}`}>
            {statusBadge.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{plugin.description}</p>

        {/* Mini sparkline trend — only for active/beta plugins */}
        {canSelect && (
          <div className="mb-2.5">
            <MiniSparkline pluginId={plugin.id} />
          </div>
        )}

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1">
          {plugin.features.slice(0, 3).map(f => (
            <span
              key={f}
              className="text-[9px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100"
            >
              {f.length > 22 ? f.slice(0, 20) + '…' : f}
            </span>
          ))}
          {plugin.features.length > 3 && (
            <span className="text-[9px] font-mono text-gray-300">+{plugin.features.length - 3}</span>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Recent Session Cards — Quick-Resume (PRD: "Don't make me start over") ──

function RecentSessionCards({
  sessions,
  onResume,
  onDelete,
  plugins,
}: {
  sessions: ChatSession[];
  onResume: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  plugins: PluginDefinition[];
}) {
  if (sessions.length === 0) return null;

  // Show max 3 most recent sessions
  const recent = sessions.slice(0, 3);

  // Resolve emoji from plugin registry (single source of truth) — fallback to 🧠
  const getPluginEmoji = (mode: string): string => {
    const plugin = plugins.find(p => p.id === mode);
    return plugin?.emoji || '🧠';
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🔄</span>
        <h2 className="text-sm font-bold text-gray-800">Continue Where You Left Off</h2>
        <span className="text-[10px] text-teal-500 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full font-medium">Recent</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {recent.map(s => {
          const emoji = getPluginEmoji(s.mode);
          const timeAgo = getTimeAgo(s.updated_at);

          return (
            <button
              key={s.id}
              onClick={() => onResume(s.id)}
              className="group relative p-4 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Subtle gradient accent bar at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Header: emoji + time */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-lg">
                    {emoji}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">{timeAgo}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                  {s.title.length > 36 ? s.title.slice(0, 34) + '…' : s.title}
                </h3>

                {/* Meta: message count + mode */}
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{s.message_count} {s.message_count === 1 ? 'message' : 'messages'}</span>
                  <span className="text-gray-200">·</span>
                  <span className="capitalize">{s.mode}</span>
                </div>

                {/* Partial message preview — last assistant snippet */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-start gap-1.5">
                    <svg className="w-3 h-3 mt-0.5 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                      {s.title === 'New Conversation' ? 'Tap to resume your conversation' : 'Continue where you left off…'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => onDelete(s.id, e)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all text-gray-300"
                title="Delete session"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Resume CTA — always visible subtle */}
              <div className="mt-3 pt-2 border-t border-gray-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-600 group-hover:text-teal-700 transition-colors">
                  Resume
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper: human-readable time ago
function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ─── Phase Progress Bar ────────────────────────────────────────────

function PhaseBar({
  phases,
  currentPhase,
  onPhaseChange,
}: {
  phases: PluginPhase[];
  currentPhase: string;
  onPhaseChange?: (phaseId: string) => void;
}) {
  const currentIndex = phases.findIndex(p => p.id === currentPhase);
  return (
    <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
      {phases.map((phase, i) => {
        const isCurrent = phase.id === currentPhase;
        const isPast = currentIndex >= 0 && i < currentIndex;
        return (
          <button
            key={phase.id}
            onClick={() => onPhaseChange?.(phase.id)}
            disabled={!isCurrent && !isPast}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all ${
              isCurrent
                ? 'bg-teal-100 text-teal-800 border border-teal-300 font-semibold shadow-sm'
                : isPast
                ? 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                : 'bg-gray-50/50 text-gray-300 border border-gray-100'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              isCurrent ? 'bg-teal-500 animate-pulse' : isPast ? 'bg-green-400' : 'bg-gray-200'
            }`} />
            <span>{i + 1}. {phase.name}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Typing Indicator ──────────────────────────────────────────────

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<PluginDefinition | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [plugins, setPlugins] = useState<PluginDefinition[]>([]);
  const [showPluginOverlay, setShowPluginOverlay] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardedCategories, setOnboardedCategories] = useState<string[]>([]);
  const [freeChatInput, setFreeChatInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'beta' | 'coming-soon'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [notifyPlugin, setNotifyPlugin] = useState<PluginDefinition | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifiedPlugins, setNotifiedPlugins] = useState<string[]>([]);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyError, setNotifyError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Check if onboarding has been completed
    const done = localStorage.getItem('lifeos_onboarding_done');
    if (!done) {
      setShowOnboarding(true);
    } else {
      // Restore previously selected categories
      const saved = localStorage.getItem('lifeos_onboarding_categories');
      if (saved) {
        try {
          const cats = JSON.parse(saved);
          if (Array.isArray(cats)) setOnboardedCategories(cats);
        } catch { /* ignore */ }
      }
    }

    // Load plugin definitions from API
    fetch('/api/plugins')
      .then(r => r.json())
      .then(data => {
        if (data.plugins) setPlugins(data.plugins);
      })
      .catch(() => {
        // Fallback to bundled definitions — load from plugin registry inline
        import('./lib/plugin-registry').then(mod => {
          setPlugins(mod.PLUGINS);
        });

    // Load previously notified plugins from localStorage
    const savedNotified = localStorage.getItem('lifeos_notified_plugins');
    if (savedNotified) {
      try {
        const parsed = JSON.parse(savedNotified);
        if (Array.isArray(parsed)) setNotifiedPlugins(parsed);
      } catch { /* ignore */ }
    }
      });
  }, []);

  useEffect(() => {
    if (showHistory) {
      loadSessions();
    }
  }, [showHistory]);

  // Auto-dismiss notify modal after success
  useEffect(() => {
    if (notifySuccess) {
      const timer = setTimeout(() => setNotifyPlugin(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notifySuccess]);

  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const res = await fetch('/api/chat');
      const data = await res.json();
      if (data.sessions) setSessions(data.sessions);
    } catch { /* ignore */ }
    setLoadingSessions(false);
  };

  const resumeSession = async (sid: string) => {
    try {
      const res = await fetch(`/api/chat?sessionId=${encodeURIComponent(sid)}&action=messages`);
      const data = await res.json();
      if (data.messages) {
        const msgs: Message[] = data.messages.map((m: ChatMessage) => ({
          role: m.role,
          content: m.content,
        }));
        setMessages(msgs);
        setSessionId(sid);
        setStarted(true);
        setShowHistory(false);
      }
    } catch { /* ignore */ }
  };

  const deleteSession = async (sid: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/chat?sessionId=${encodeURIComponent(sid)}`, { method: 'DELETE' });
    setSessions(prev => prev.filter(s => s.id !== sid));
  };

  const newSession = () => {
    setMessages([]);
    setSessionId(null);
    setStarted(false);
    setSelectedPlugin(null);
    setCurrentPhase('');
    setInput('');
    setShowHistory(false);
  };

  // ─── Select a plugin — AI-led conversation starts ──────────────
  const selectPlugin = useCallback((plugin: PluginDefinition) => {
    setSelectedPlugin(plugin);
    setCurrentPhase(plugin.phases[0]?.id || '');
    setShowPluginOverlay(false);

    // Track plugin selection
    trackEvent(plugin.id, plugin.name, 'plugin_opened');
    startAnalyticsSession(plugin.id, plugin.name);

    // Auto-send first message to trigger AI to LEAD
    const greeting = `I'd like to start with ${plugin.name}. Talk me through it.`;
    setInput('');
    setStarted(true);
    setMessages([{ role: 'user', content: greeting }]);
    callChatApi(greeting, true, plugin.id, plugin.phases[0]?.id);
  }, []);

  const callChatApi = (
    message: string,
    isFirst: boolean,
    pluginId?: string,
    phase?: string,
  ) => {
    setThinking(true);

    const body: any = {
      message,
      sessionId: isFirst ? null : sessionId,
      isFirst,
      mode: pluginId || selectedPlugin?.id || 'travel',
      phase: phase || currentPhase || undefined,
    };

    if (!isFirst && messages.length > 0) {
      body.history = messages.map(m => ({ role: m.role, content: m.content }));
    }

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(r => r.json())
      .then(data => {
        setThinking(false);
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        setSessionId(data.sessionId);
        if (data.phase) {
          setCurrentPhase(prevPhase => {
            if (prevPhase && prevPhase !== data.phase) {
              trackPhaseProgress(selectedPlugin?.id || 'life', selectedPlugin?.name || 'LifeOS', prevPhase, data.phase);
            }
            return data.phase;
          });
        }
      })
      .catch(() => {
        setThinking(false);
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't reach the AI. Please check the API key is set." }]);
      });
  };

  const startSession = () => {
    if (!input.trim() || selectedPlugin) return;
    setStarted(true);
    const msg = input.trim();
    setInput('');
    setMessages([{ role: 'user', content: msg }]);
    callChatApi(msg, true);

    // Track free chat message
    trackMessage('life', 'LifeOS', 'user');
  };

  const sendMessage = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || thinking) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    callChatApi(msg, false);

    // Track message for current plugin (or free chat)
    const pid = selectedPlugin?.id || 'life';
    const pname = selectedPlugin?.name || 'LifeOS';
    trackMessage(pid, pname, 'user');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!started) startSession();
      else sendMessage();
    }
  };

  const activePlugin = selectedPlugin;
  const phases = activePlugin?.phases || [];

  // ─── Onboarding handlers ──────────────────────────────────────
  const handleOnboardingComplete = (categories: string[]) => {
    setShowOnboarding(false);
    setOnboardedCategories(categories);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* ── WELCOME SCREEN: Plugin Grid (PRD §11.1) ── */}
      {!started && !selectedPlugin && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="max-w-3xl w-full">
            {/* Hero */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                LifeOS
              </h1>
              <p className="text-base text-gray-500 max-w-md mx-auto">
                Your AI copilot for everything in life.
              </p>
              <p className="text-sm text-gray-400 mt-1 italic">
                "I don't wait for you to tell me what to do — I ask. I challenge. I guide."
              </p>
            </div>

            {/* Usage Summary Bar — top-of-page activity stats */}
            <UsageSummaryBar />

            {/* Recent Session Cards — quick resume (last 3) */}
            <RecentSessionCards
              sessions={sessions}
              onResume={resumeSession}
              onDelete={deleteSession}
              plugins={plugins}
            />

            {/* Search & Filter Bar */}
            <div className="mb-6 space-y-3">
              {/* Search input */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search plugins..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Status filter pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {(['all', 'active', 'beta', 'coming-soon'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      statusFilter === status
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600'
                    }`}
                  >
                    {status === 'all' ? 'All' : status === 'coming-soon' ? 'Coming Soon' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              {/* Category filter tags */}
              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                {['all', 'travel', 'finance', 'health', 'career', 'learning', 'family', 'home', 'social', 'relationships', 'productivity', 'nutrition', 'mindfulness'].map(cat => {
                  const catPlugin = cat === 'all' ? null : plugins.find(p => p.id === cat);
                  const isCategoryActive = categoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(isCategoryActive ? 'all' : cat)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium transition-all ${
                        isCategoryActive
                          ? 'bg-teal-100 text-teal-700 border border-teal-300 shadow-sm'
                          : 'bg-white text-gray-400 border border-gray-200 hover:border-teal-200 hover:text-teal-500'
                      }`}
                    >
                      {cat === 'all' ? '✨ All' : `${catPlugin?.emoji || ''} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommended For You — based on onboarding preferences */}
            {onboardedCategories.length > 0 && plugins.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🎯</span>
                  <h2 className="text-sm font-bold text-gray-800">Recommended For You</h2>
                  <span className="text-[10px] text-teal-500 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full font-medium">Personalized</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Based on the areas you selected during onboarding.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {plugins
                    .filter(p => onboardedCategories.includes(p.id))
                    .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    .filter(p => statusFilter === 'all' || p.status === statusFilter)
                    .map(plugin => (
                      <PluginCard
                        key={plugin.id}
                        plugin={plugin}
                        onSelect={selectPlugin}
                      />
                    ))}
                </div>
                <div className="mt-3 text-center">
                  <button
                    onClick={() => {
                      localStorage.removeItem('lifeos_onboarding_categories');
                      setOnboardedCategories([]);
                    }}
                    className="text-[11px] text-gray-400 hover:text-gray-600 underline"
                  >
                    ✕ Dismiss recommendations
                  </button>
                </div>
              </div>
            )}

            {/* Plugin Grid */}
            {(() => {
              if (plugins.length === 0) {
                // Loading skeleton — plugins not yet loaded
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-gray-200 bg-white animate-pulse">
                        <div className="w-12 h-12 rounded-xl bg-gray-200 mb-3" />
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                      </div>
                    ))}
                  </div>
                );
              }

              const filtered = plugins.filter(plugin => {
                const matchesSearch = searchQuery === '' ||
                  plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  plugin.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
                const matchesStatus = statusFilter === 'all' || plugin.status === statusFilter;
                const matchesCategory = categoryFilter === 'all' || plugin.id === categoryFilter;
                return matchesSearch && matchesStatus && matchesCategory;
              });

              return (
                <>
                  {filtered.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">No plugins match your search.</p>
                      <button
                        onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                        className="mt-2 text-xs text-teal-500 hover:text-teal-600 underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                      {filtered.map(plugin => (
                        <PluginCard
                          key={plugin.id}
                          plugin={plugin}
                          onSelect={selectPlugin}
                        />
                      ))}
                    </div>
                  )}
                </>
              );
            })()}

            {/* ── Coming Soon Preview Strip ── */}
            {(() => {
              const comingSoonPlugins = plugins.filter(p => p.status === 'coming-soon');
              const filteredComingSoon = comingSoonPlugins.filter(p =>
                searchQuery === '' ||
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              if (filteredComingSoon.length === 0) return null;

              return (
                <div className="mb-8">
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-fuchsia-50/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5" />

                    <div className="relative px-5 py-4">
                      {/* Section header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base">🔮</span>
                        <h2 className="text-sm font-bold text-gray-800">Coming Soon</h2>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-purple-200 bg-purple-50 text-purple-600">
                          Preview
                        </span>
                      </div>

                      {/* Cards row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredComingSoon.map(plugin => {
                          const gradientParts = plugin.gradient.match(/[#][\w]+/g) || [];
                          const color1 = gradientParts[0] || '#8B5CF6';
                          const color2 = gradientParts[1] || '#7C3AED';

                          return (
                            <div
                              key={plugin.id}
                              className="relative p-4 rounded-xl border border-purple-200/60 bg-white/90 backdrop-blur-sm hover:border-purple-300/80 transition-all duration-300 group"
                            >
                              <div className="flex items-start gap-3">
                                {/* Emoji */}
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                                  style={{
                                    background: `${color1}15`,
                                    border: `1px solid ${color1}25`,
                                  }}
                                >
                                  {plugin.emoji}
                                </div>

                                <div className="flex-1 min-w-0">
                                  {/* Name + badge */}
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-bold text-gray-900">{plugin.name}</h3>
                                    <span
                                      className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border whitespace-nowrap"
                                      style={{
                                        borderColor: `${color1}30`,
                                        background: `${color1}10`,
                                        color: color1,
                                      }}
                                    >
                                      🔜 Coming Soon
                                    </span>
                                  </div>

                                  {/* Description */}
                                  <p className="text-xs text-gray-500 leading-relaxed mb-2">
                                    {plugin.description}
                                  </p>

                                  {/* Features count */}
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] text-gray-400">
                                      {plugin.features.length} planned features
                                    </span>
                                    <span className="text-[8px] text-gray-300">·</span>
                                    <span className="text-[10px] text-gray-400">
                                      {plugin.phases.length} phases
                                    </span>
                                  </div>

                                  {/* Features preview */}
                                  <div className="flex flex-wrap gap-1 mb-2.5">
                                    {plugin.features.slice(0, 2).map(f => (
                                      <span
                                        key={f}
                                        className="text-[9px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100"
                                      >
                                        {f.length > 24 ? f.slice(0, 22) + '…' : f}
                                      </span>
                                    ))}
                                    {plugin.features.length > 2 && (
                                      <span className="text-[9px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
                                        +{plugin.features.length - 2} more
                                      </span>
                                    )}
                                  </div>

                                  {/* Notify me button (placeholder) */}
                                  <button
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
                                    style={{
                                      background: `${color1}12`,
                                      color: color1,
                                      border: `1px solid ${color1}20`,
                                    }}
                                    onMouseEnter={e => {
                                      (e.currentTarget as HTMLElement).style.background = `${color1}20`;
                                    }}
                                    onMouseLeave={e => {
                                      (e.currentTarget as HTMLElement).style.background = `${color1}12`;
                                    }}
                                    onClick={() => {
                                      setNotifyPlugin(plugin);
                                      setNotifyEmail('');
                                      setNotifySuccess(false);
                                    }}
                                  >
                                    <span>🔔</span>
                                    <span>Notify me</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Plugins count indicator */}
            {plugins.length > 0 && (
              <div className="text-center mb-6">
                <span className="text-[11px] text-gray-400">
                  {plugins.filter(p => statusFilter === 'all' || p.status === statusFilter).filter(p =>
                    searchQuery === '' ||
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length} of {plugins.length} plugins
                </span>
              </div>
            )}

            {/* Free chat entry — start without a plugin */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-teal-400/10 rounded-2xl" />
                <div className="relative bg-white/80 border border-teal-100 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">LifeOS Free Chat</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-teal-200 bg-teal-50 text-teal-600">
                      No plugin needed
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Just talk. Ask anything — LifeOS will figure out what you need.
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={freeChatInput}
                      onChange={e => setFreeChatInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (freeChatInput.trim()) {
                            setStarted(true);
                            const msg = freeChatInput.trim();
                            setFreeChatInput('');
                            setMessages([{ role: 'user', content: msg }]);
                            // Create a virtual 'life' plugin
                            callChatApi(msg, true);
                          }
                        }
                      }}
                      placeholder="e.g. I want to plan a trip to Japan..."
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        if (freeChatInput.trim()) {
                          setStarted(true);
                          const msg = freeChatInput.trim();
                          setFreeChatInput('');
                          setMessages([{ role: 'user', content: msg }]);
                          callChatApi(msg, true);
                        }
                      }}
                      disabled={!freeChatInput.trim()}
                      className="px-3 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => { setShowHistory(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent conversations
                </button>
                <a
                  href="/quick-actions"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-all shadow-sm"
                >
                  ⚡ Quick Actions
                </a>
                <a
                  href="/analytics"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-all shadow-sm"
                >
                  📊 Analytics
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CHAT + CANVAS VIEW ── */}
      {started && activePlugin && (
        <div className="flex h-screen">
          {/* Chat Panel */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-gray-200">
            {/* Chat header */}
            <div className="border-b border-gray-200 px-4 py-2.5 bg-white flex items-center gap-2">
              {/* Plugin badge */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: `${activePlugin.color.split(' ')[0].replace('from-', '')}15`.trim(),
                  color: activePlugin.color.includes('teal') ? '#0D9488' :
                          activePlugin.color.includes('cyan') ? '#06B6D4' :
                          activePlugin.color.includes('emerald') ? '#059669' : '#0D9488',
                }}
              >
                <span>{activePlugin.emoji}</span>
                <span>{activePlugin.name}</span>
              </div>

              {/* Phase progress */}
              <div className="flex-1 mx-2">
                <PhaseBar phases={phases} currentPhase={currentPhase} />
              </div>

              {/* Controls */}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                title="History"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <button
                onClick={() => setShowPluginOverlay(true)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                title="Switch plugin"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>

              <button
                onClick={newSession}
                className="text-[11px] text-teal-600 hover:text-teal-800 font-medium px-2"
              >
                + New
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-teal-500 text-white rounded-br-md'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                          </svg>
                        </div>
                        <span className="text-[11px] font-semibold text-teal-700">LifeOS</span>
                        {activePlugin && (
                          <span className="text-[10px] text-gray-400">· {activePlugin.emoji} {activePlugin.name}</span>
                        )}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {thinking && <TypingBubble />}
              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-gray-200 px-4 py-3 bg-white">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={activePlugin ? `Ask ${activePlugin.name} anything...` : "Ask LifeOS anything..."}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                  rows={1}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || thinking}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-1.5 text-sm font-medium"
                >
                  Send
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Canvas Panel — Excalidraw Integration (PRD §3.3) ── */}
          <div className="w-[400px] bg-white border-l border-gray-100 hidden lg:flex lg:flex-col" style={{ height: '100vh' }}>
            {activePlugin && sessionId ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <ExcalidrawCanvas
                  pluginId={activePlugin.id}
                  sessionId={sessionId}
                  plugin={activePlugin}
                  currentPhase={currentPhase}
                />
              </div>
            ) : (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Canvas</span>
                </div>
                <div className="mt-4 text-xs text-gray-400 text-center">
                  Select a plugin and start a conversation to see your canvas.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── HISTORY SIDEBAR ── */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowHistory(false)} />
          <div className="relative w-80 bg-white border-r border-gray-200 shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-800">Conversations</h2>
                <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                onClick={newSession}
                className="w-full py-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors"
              >
                + New conversation
              </button>
            </div>

            {loadingSessions ? (
              <div className="p-4 text-center">
                <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">No conversations yet.</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {sessions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => resumeSession(s.id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm">{plugins.find(p => p.id === s.mode)?.emoji || '🧘'}</span>
                        <span className="text-sm font-medium text-gray-800 truncate">
                          {s.title.length > 40 ? s.title.slice(0, 40) + '…' : s.title}
                        </span>
                      </div>
                      <button
                        onClick={(e) => deleteSession(s.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400">{s.message_count} messages</span>
                      <span className="text-[10px] text-gray-300">·</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(s.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1" onClick={() => setShowHistory(false)} />
        </div>
      )}

      {/* ── PLUGIN SWITCHER (mini overlay in chat view) ── */}
      {showPluginOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowPluginOverlay(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-lg mx-4 w-full">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Switch Plugin</h3>
            <div className="grid grid-cols-2 gap-2">
              {plugins.filter(p => p.status === 'active' || p.status === 'beta').map(plugin => (
                <button
                  key={plugin.id}
                  onClick={() => {
                    setShowPluginOverlay(false);
                    selectPlugin(plugin);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlugin?.id === plugin.id
                      ? 'bg-teal-50 border-teal-300 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-teal-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xl mb-1">{plugin.emoji}</div>
                  <div className="text-xs font-semibold text-gray-800">{plugin.name}</div>
                  <div className="text-[10px] text-gray-400">{plugin.description}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPluginOverlay(false)}
              className="mt-4 w-full py-2 text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── NOTIFY ME MODAL — for coming-soon plugins ── */}
      {notifyPlugin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setNotifyPlugin(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm mx-4 w-full">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{notifyPlugin.emoji}</div>
              <h3 className="text-sm font-bold text-gray-900">{notifyPlugin.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Get notified when this plugin launches.</p>
            </div>

            {notifySuccess ? (
              <div className="text-center py-4">
                <div className="w-10 h-10 mx-auto mb-2 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800">You're on the list!</p>
                <p className="text-xs text-gray-500 mt-1">We'll let you know when {notifyPlugin.name} is ready.</p>
                <button
                  onClick={() => setNotifyPlugin(null)}
                  className="mt-4 text-xs text-teal-600 hover:text-teal-700 underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={e => {
                    setNotifyEmail(e.target.value);
                    if (notifyError) setNotifyError(null);
                  }}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-1"
                />
                {notifyError && (
                  <p className="text-xs text-red-500 mt-1 mb-2">{notifyError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setNotifyPlugin(null)}
                    className="flex-1 py-2.5 text-xs text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const email = notifyEmail.trim();
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!email || !emailRegex.test(email)) {
                        setNotifyError('Please enter a valid email address.');
                        return;
                      }
                      // Save to localStorage
                      const updated = Array.from(new Set(notifiedPlugins.concat([notifyPlugin.id])));
                      setNotifiedPlugins(updated);
                      localStorage.setItem('lifeos_notified_plugins', JSON.stringify(updated));
                      setNotifySuccess(true);
                    }}
                    disabled={!notifyEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notifyEmail.trim())}
                    className="flex-1 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl hover:from-teal-600 hover:to-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Notify me
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── CROSS-PLUGIN RECOMMENDATIONS — based on onboarding + usage ── */}
      {!started && !selectedPlugin && plugins.length > 0 && (() => {
        // Suggest plugins related to the ones the user already onboarded with
        const onboardedSet = new Set(onboardedCategories);

        // Plugin affinity pairs: if user has one, suggest the other
        const AFFINITY_MAP: Record<string, string[]> = {
          'travel': ['learning', 'finance'],
          'finance': ['productivity', 'home'],
          'health': ['nutrition', 'mindfulness'],
          'career': ['learning', 'productivity'],
          'learning': ['career', 'productivity'],
          'family': ['relationships', 'home'],
          'home': ['finance', 'family'],
          'social': ['relationships', 'career'],
          'relationships': ['family', 'social'],
          'mindfulness': ['health', 'productivity'],
          'productivity': ['career', 'learning'],
          'nutrition': ['health', 'mindfulness'],
        };

        const relatedIds = new Set<string>();
        for (const cat of onboardedCategories) {
          const affinity = AFFINITY_MAP[cat];
          if (affinity) {
            for (const id of affinity) {
              if (!onboardedSet.has(id)) relatedIds.add(id);
            }
          }
        }

        if (relatedIds.size === 0) return null;

        const recommended = plugins.filter(p =>
          relatedIds.has(p.id) &&
          (p.status === 'active' || p.status === 'beta') &&
          (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (statusFilter === 'all' || p.status === statusFilter)
        );

        if (recommended.length === 0) return null;

        return (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔗</span>
              <h2 className="text-sm font-bold text-gray-800">You Might Also Like</h2>
              <span className="text-[10px] text-teal-500 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full font-medium">Cross-Plugin</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Based on the plugins you use, these might complement your workflow.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {recommended.map(plugin => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  onSelect={selectPlugin}
                />
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── ONBOARDING WIZARD — first visit ── */}
      {showOnboarding && (
        <OnboardingWizard
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </div>
  );
}
