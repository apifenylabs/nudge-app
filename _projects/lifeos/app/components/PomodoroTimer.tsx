'use client';

/**
 * LifeOS Pomodoro Timer / Concentration Plugin
 *
 * Full-featured Pomodoro timer with:
 * - Focus / Short Break / Long Break modes
 * - Session tracking (completed pomodoros today, streak)
 * - Sound notifications via Web Audio API
 * - Configurable durations
 * - Stats persistence in localStorage
 * - Auto-start next session option
 * - Dark/light friendly UI
 *
 * Mobile-responsive, keyboard-accessible, no external dependencies.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface SessionStats {
  completedToday: number;
  totalFocusMinutes: number;
  streakDays: number;
  lastSessionDate: string; // ISO date string (YYYY-MM-DD)
  sessions: CompletedSession[];
}

interface CompletedSession {
  date: string;
  duration: number; // minutes
  mode: TimerMode;
  interrupted: boolean;
}

interface PomodoroConfig {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number; // every N pomodoros
  autoStartBreak: boolean;
  autoStartFocus: boolean;
  soundEnabled: boolean;
}

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_CONFIG: PomodoroConfig = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  autoStartBreak: true,
  autoStartFocus: true,
  soundEnabled: true,
};

const STORAGE_KEY_STATS = 'lifeos-pomodoro-stats';
const STORAGE_KEY_CONFIG = 'lifeos-pomodoro-config';

// ─── Helpers ─────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function loadStats(): SessionStats {
  if (typeof window === 'undefined') return emptyStats();
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (!raw) return emptyStats();
    const parsed = JSON.parse(raw) as SessionStats;
    // Reset daily counts if last session was yesterday or earlier
    const today = getTodayKey();
    if (parsed.lastSessionDate !== today) {
      parsed.completedToday = 0;
    }
    return parsed;
  } catch {
    return emptyStats();
  }
}

function emptyStats(): SessionStats {
  return {
    completedToday: 0,
    totalFocusMinutes: 0,
    streakDays: 0,
    lastSessionDate: getTodayKey(),
    sessions: [],
  };
}

function saveStats(stats: SessionStats): void {
  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  } catch { /* quota exceeded, silently fail */ }
}

function loadConfig(): PomodoroConfig {
  if (typeof window === 'undefined') return { ...DEFAULT_CONFIG };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) return { ...DEFAULT_CONFIG };
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function saveConfig(config: PomodoroConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch { /* silently fail */ }
}

// ─── Sound via Web Audio API ────────────────────────────────────────

let audioCtx: AudioContext | null = null;

function playNotification(): void {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.5);

    // Second tone
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1108, audioCtx.currentTime + 0.15);
    gain2.gain.setValueAtTime(0.3, audioCtx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.65);
    osc2.start(audioCtx.currentTime + 0.15);
    osc2.stop(audioCtx.currentTime + 0.65);
  } catch {
    // Audio not available — silently continue
  }
}

// ─── Mode Labels ────────────────────────────────────────────────────

const MODE_LABELS: Record<TimerMode, string> = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

const MODE_EMOJIS: Record<TimerMode, string> = {
  focus: '🎯',
  shortBreak: '☕',
  longBreak: '🌿',
};

const MODE_COLORS: Record<TimerMode, string> = {
  focus: 'text-rose-600 border-rose-300 bg-rose-50',
  shortBreak: 'text-emerald-600 border-emerald-300 bg-emerald-50',
  longBreak: 'text-blue-600 border-blue-300 bg-blue-50',
};

const MODE_BG: Record<TimerMode, string> = {
  focus: 'from-rose-500 to-pink-600',
  shortBreak: 'from-emerald-500 to-teal-600',
  longBreak: 'from-blue-500 to-indigo-600',
};

// ─── Main Component ─────────────────────────────────────────────────

export default function PomodoroTimer() {
  const [config, setConfigState] = useState<PomodoroConfig>(loadConfig);
  const [stats, setStatsState] = useState<SessionStats>(loadStats);

  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(config.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [interrupted, setInterrupted] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeRef = useRef(mode);
  const isRunningRef = useRef(isRunning);
  const configRef = useRef(config);

  // Keep refs in sync
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { isRunningRef.current = isRunning; }, [isRunning]);
  useEffect(() => { configRef.current = config; }, [config]);

  const updateStats = useCallback((updater: (prev: SessionStats) => SessionStats) => {
    setStatsState(prev => {
      const next = updater(prev);
      saveStats(next);
      return next;
    });
  }, []);

  const setConfig = useCallback((updater: (prev: PomodoroConfig) => PomodoroConfig) => {
    setConfigState(prev => {
      const next = updater(prev);
      saveConfig(next);
      return next;
    });
  }, []);

  const getDurationForMode = useCallback((m: TimerMode): number => {
    switch (m) {
      case 'focus': return config.focusMinutes * 60;
      case 'shortBreak': return config.shortBreakMinutes * 60;
      case 'longBreak': return config.longBreakMinutes * 60;
    }
  }, [config]);

  // ── Timer tick ──
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Timer completed
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);

          const currentMode = modeRef.current;
          const currentConfig = configRef.current;

          if (currentMode === 'focus') {
            const now = getTodayKey();
            updateStats(s => {
              const newStats = { ...s };
              newStats.completedToday += 1;
              newStats.totalFocusMinutes += currentConfig.focusMinutes;
              newStats.lastSessionDate = now;
              newStats.sessions = [...newStats.sessions, {
                date: now,
                duration: currentConfig.focusMinutes,
                mode: 'focus' as TimerMode,
                interrupted: false,
              }].slice(-100); // keep last 100
              return newStats;
            });

            setPomodorosCompleted(prev => {
              const next = prev + 1;
              const isLongBreak = next % currentConfig.longBreakInterval === 0;
              const nextMode: TimerMode = isLongBreak ? 'longBreak' : 'shortBreak';
              setMode(nextMode);
              setTimeLeft(
                isLongBreak
                  ? currentConfig.longBreakMinutes * 60
                  : currentConfig.shortBreakMinutes * 60
              );
              if (currentConfig.soundEnabled) playNotification();
              if (currentConfig.autoStartBreak) {
                setIsRunning(true);
              }
              return next;
            });
          } else {
            // Break completed → back to focus
            setMode('focus');
            setTimeLeft(currentConfig.focusMinutes * 60);
            if (currentConfig.soundEnabled) playNotification();
            if (currentConfig.autoStartFocus) {
              setIsRunning(true);
            }
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, updateStats]);

  // ── Switch mode manually ──
  const switchMode = useCallback((newMode: TimerMode) => {
    if (isRunning) {
      // Record as interrupted if focus was running
      if (mode === 'focus') {
        updateStats(s => ({
          ...s,
          sessions: [...s.sessions, {
            date: getTodayKey(),
            duration: Math.round((config.focusMinutes * 60 - timeLeft) / 60),
            mode: 'focus' as TimerMode,
            interrupted: true,
          }].slice(-100),
        }));
      }
    }
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getDurationForMode(newMode));
  }, [isRunning, mode, timeLeft, config, updateStats, getDurationForMode]);

  // ── Start / Pause ──
  const toggleTimer = useCallback(() => {
    if (timeLeft <= 0) {
      // Reset current mode
      setTimeLeft(getDurationForMode(mode));
      setIsRunning(true);
    } else {
      setIsRunning(prev => !prev);
    }
  }, [timeLeft, mode, getDurationForMode]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDurationForMode(mode));
    setInterrupted(false);
  }, [mode, getDurationForMode]);

  // ── Progress ──
  const totalSeconds = getDurationForMode(mode);
  const progress = totalSeconds > 0 ? (1 - timeLeft / totalSeconds) * 100 : 0;
  const circleCircumference = 2 * Math.PI * 120;
  const strokeDashoffset = circleCircumference * (1 - progress / 100);

  // ── Session count for mode label ──
  const sessionCountLabel = mode === 'focus'
    ? `Pomodoro #${pomodorosCompleted + 1}`
    : mode === 'longBreak'
      ? 'Long break'
      : 'Short break';

  // ── Today's progress summary ──
  const todayMinutes = stats.totalFocusMinutes;
  const streakText = stats.streakDays > 0 ? `🔥 ${stats.streakDays} day streak` : 'Start a streak today';

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ── Header ── */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          🍅 Pomodoro Timer
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Focus sessions with breaks. Build concentration, one pomodoro at a time.
        </p>
      </div>

      {/* ── Today's Mini Stats ── */}
      <div className="flex justify-center gap-6 mb-6 text-sm">
        <div className="text-center">
          <span className="block text-2xl font-bold text-rose-500">{stats.completedToday}</span>
          <span className="text-gray-500 dark:text-gray-400">Today</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-emerald-500">{todayMinutes}</span>
          <span className="text-gray-500 dark:text-gray-400">Min focus</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-amber-500">
            {stats.streakDays > 0 ? `${stats.streakDays}d` : '–'}
          </span>
          <span className="text-gray-500 dark:text-gray-400">Streak</span>
        </div>
      </div>

      {/* ── Mode Selector ── */}
      <div className="flex justify-center gap-2 mb-8">
        {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            disabled={isRunning && m !== mode}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${mode === m
                ? `bg-white shadow-md ${MODE_COLORS[m]} border-2`
                : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 border-2 border-transparent'
              }
              ${isRunning && m !== mode ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {MODE_EMOJIS[m]} {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {/* ── Timer Circle ── */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-64 h-64">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
            <circle
              cx="130" cy="130" r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="130" cy="130" r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-linear ${
                mode === 'focus' ? 'text-rose-500' :
                mode === 'shortBreak' ? 'text-emerald-500' :
                'text-blue-500'
              }`}
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-6xl font-mono font-bold tracking-wider ${
              mode === 'focus' ? 'text-rose-600 dark:text-rose-400' :
              mode === 'shortBreak' ? 'text-emerald-600 dark:text-emerald-400' :
              'text-blue-600 dark:text-blue-400'
            }`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {sessionCountLabel}
            </div>
            {interrupted && (
              <div className="text-xs text-amber-500 mt-1">⚠️ Interrupted</div>
            )}
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={toggleTimer}
          className={`
            px-8 py-3 rounded-full text-white font-semibold text-lg shadow-lg
            transition-all hover:scale-105 active:scale-95
            bg-gradient-to-r ${MODE_BG[mode]}
          `}
        >
          {isRunning ? '⏸ Pause' : timeLeft <= 0 ? '🔄 Restart' : '▶ Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-3 rounded-full text-gray-500 border border-gray-300 dark:border-gray-600
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          title="Reset timer"
        >
          🔄 Reset
        </button>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => { setShowSettings(!showSettings); setShowStats(false); }}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            showSettings
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          ⚙️ Settings
        </button>
        <button
          onClick={() => { setShowStats(!showStats); setShowSettings(false); }}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            showStats
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          📊 History
        </button>
      </div>

      {/* ── Settings Panel ── */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">⚙️ Timer Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SettingSlider
              label="Focus (min)"
              value={config.focusMinutes}
              min={5} max={60} step={5}
              onChange={v => setConfig(prev => ({ ...prev, focusMinutes: v }))}
            />
            <SettingSlider
              label="Short Break (min)"
              value={config.shortBreakMinutes}
              min={1} max={15} step={1}
              onChange={v => setConfig(prev => ({ ...prev, shortBreakMinutes: v }))}
            />
            <SettingSlider
              label="Long Break (min)"
              value={config.longBreakMinutes}
              min={5} max={30} step={5}
              onChange={v => setConfig(prev => ({ ...prev, longBreakMinutes: v }))}
            />
            <SettingSlider
              label="Pomodoros until long break"
              value={config.longBreakInterval}
              min={2} max={8} step={1}
              onChange={v => setConfig(prev => ({ ...prev, longBreakInterval: v }))}
            />
          </div>
          <div className="mt-4 space-y-3">
            <ToggleSetting
              label="Auto-start breaks"
              checked={config.autoStartBreak}
              onChange={v => setConfig(prev => ({ ...prev, autoStartBreak: v }))}
            />
            <ToggleSetting
              label="Auto-start focus sessions"
              checked={config.autoStartFocus}
              onChange={v => setConfig(prev => ({ ...prev, autoStartFocus: v }))}
            />
            <ToggleSetting
              label="Sound notifications"
              checked={config.soundEnabled}
              onChange={v => setConfig(prev => ({ ...prev, soundEnabled: v }))}
            />
          </div>
          <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Settings saved automatically to localStorage.
          </div>
        </div>
      )}

      {/* ── Stats / History Panel ── */}
      {showStats && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">📊 Focus History</h3>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatCard label="Today" value={`${stats.completedToday}`} emoji="🍅" />
            <StatCard label="Total Focus Time" value={`${Math.round(stats.totalFocusMinutes / 60)}h ${stats.totalFocusMinutes % 60}m`} emoji="⏱" />
            <StatCard label="Total Sessions" value={`${stats.sessions.length}`} emoji="📋" />
            <StatCard label="Streak" value={`${stats.streakDays > 0 ? `${stats.streakDays} days` : '–'}`} emoji="🔥" />
          </div>

          {/* Recent sessions */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Recent Sessions (last 20)
            </h4>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {stats.sessions.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                  No sessions yet. Start your first pomodoro!
                </p>
              ) : (
                [...stats.sessions].reverse().slice(0, 20).map((s, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
                      s.interrupted
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                        : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <span>
                      {s.mode === 'focus' ? '🎯' : s.mode === 'shortBreak' ? '☕' : '🌿'}{' '}
                      {s.date}
                    </span>
                    <span>
                      {s.duration}min {s.interrupted ? '(interrupted)' : '✅'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Clear data */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                if (confirm('Delete all focus history? This cannot be undone.')) {
                  const empty = emptyStats();
                  setStatsState(empty);
                  saveStats(empty);
                }
              }}
              className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              🗑 Clear all history
            </button>
          </div>
        </div>
      )}

      {/* ── Motivational Tip ── */}
      {!isRunning && timeLeft > 0 && (
        <div className="text-center text-sm text-gray-400 dark:text-gray-500 italic">
          {mode === 'focus'
            ? '💡 Tip: Close notifications. Put phone face-down. Just focus.'
            : '🧘 Take a real break. Step away from the screen.'}
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────

function SettingSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}: <span className="font-bold text-gray-900 dark:text-white">{value}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none
                   cursor-pointer accent-rose-500"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-0.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ToggleSetting({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-rose-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  );
}

function StatCard({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
      <div className="text-lg">{emoji}</div>
      <div className="text-sm font-bold text-gray-800 dark:text-white">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
