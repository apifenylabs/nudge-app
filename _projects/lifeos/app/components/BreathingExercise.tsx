'use client';

/**
 * LifeOS — Breathing Exercise (Mindfulness Plugin)
 *
 * Interactive breathing guide with box breathing, 4-7-8, and custom patterns.
 * Fully self-contained — no API calls, no Supabase, no dependencies.
 * Tracks sessions in localStorage for streak data.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Breathing Patterns ──────────────────────────────────────────────

interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  emoji: string;
  /** Phases in seconds: [inhale, hold, exhale, hold] */
  phases: [number, number, number, number];
  color: string;
}

const PATTERNS: BreathingPattern[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal 4-count inhale, hold, exhale, hold. Calms the nervous system.',
    emoji: '📦',
    phases: [4, 4, 4, 4],
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Inhale 4, hold 7, exhale 8. The "relaxing breath" from Dr. Weil.',
    emoji: '😌',
    phases: [4, 7, 8, 0],
    color: 'from-indigo-400 to-purple-500',
  },
  {
    id: 'resonance',
    name: 'Resonance Breathing',
    description: 'Slow 5.5-second inhale/exhale. Optimizes heart rate variability.',
    emoji: '💓',
    phases: [5.5, 0, 5.5, 0],
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 'relaxing',
    name: 'Deep Relaxation',
    description: 'Long, slow exhale to activate the parasympathetic system.',
    emoji: '🧘',
    phases: [4, 0, 8, 0],
    color: 'from-teal-400 to-emerald-500',
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    description: 'Quick energizing pattern. Short holds, emphasis on inhale.',
    emoji: '⚡',
    phases: [4, 2, 4, 1],
    color: 'from-amber-400 to-orange-500',
  },
];

// ─── Phase Labels ─────────────────────────────────────────────────────

type BreathPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out' | 'idle';

const PHASE_LABELS: Record<BreathPhase, { label: string; icon: string }> = {
  inhale: { label: 'Breathe In', icon: '⬆️' },
  'hold-in': { label: 'Hold', icon: '⏸️' },
  exhale: { label: 'Breathe Out', icon: '⬇️' },
  'hold-out': { label: 'Hold', icon: '⏸️' },
  idle: { label: 'Ready', icon: '▶️' },
};

export default function BreathingExercise() {
  const [pattern, setPattern] = useState<BreathingPattern>(PATTERNS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('idle');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [rounds, setRounds] = useState(5);
  const [totalSessions, setTotalSessions] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  // Circle animation progress (0-1 for current phase)
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const phaseStartRef = useRef<number>(0);

  // Load session count
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lifeos-breathing-sessions');
      if (raw) setTotalSessions(JSON.parse(raw).length);
    } catch { /* ignore */ }
  }, []);

  // ─── Phase Sequence Runner ──────────────────────────────────────

  const phaseSequence: BreathPhase[] = ['inhale', 'hold-in', 'exhale', 'hold-out'];

  const getPhaseDuration = useCallback((phase: BreathPhase, p: BreathingPattern): number => {
    const idx = phaseSequence.indexOf(phase);
    if (idx === -1) return 0;
    return p.phases[idx] || 0;
  }, []);

  const advancePhase = useCallback(() => {
    setCycleCount(prev => prev + 1);
    setCurrentPhase('inhale');
    const duration = getPhaseDuration('inhale', pattern);
    setPhaseTimeLeft(duration);
    phaseStartRef.current = Date.now();
    setProgress(0);
  }, [pattern, getPhaseDuration]);

  const nextPhase = useCallback((current: BreathPhase) => {
    const idx = phaseSequence.indexOf(current);
    if (idx === -1 || idx >= 3) {
      // Cycle complete
      advancePhase();
      return;
    }

    const next = phaseSequence[idx + 1];
    const duration = getPhaseDuration(next, pattern);

    if (duration === 0) {
      // Skip this phase (e.g., no hold)
      nextPhase(next);
      return;
    }

    setCurrentPhase(next);
    setPhaseTimeLeft(duration);
    phaseStartRef.current = Date.now();
    setProgress(0);

    // If this was meant to be the last phase of a cycle, advance after
    if (next === 'hold-out') {
      setTimeout(() => advancePhase(), duration * 1000);
    }
  }, [pattern, getPhaseDuration, advancePhase]);

  // ─── Start / Stop ───────────────────────────────────────────────

  const startSession = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCycleCount(0);
    setCurrentPhase('inhale');
    const duration = getPhaseDuration('inhale', pattern);
    setPhaseTimeLeft(duration);
    startTimeRef.current = Date.now();
    phaseStartRef.current = Date.now();
    setProgress(0);
  };

  const stopSession = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setPhaseTimeLeft(0);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Save session
    const session = {
      date: new Date().toISOString(),
      pattern: pattern.id,
      cycles: cycleCount,
      duration: Math.round((Date.now() - startTimeRef.current) / 1000),
    };
    try {
      const raw = localStorage.getItem('lifeos-breathing-sessions');
      const sessions = raw ? JSON.parse(raw) : [];
      sessions.push(session);
      localStorage.setItem('lifeos-breathing-sessions', JSON.stringify(sessions));
      setTotalSessions(sessions.length);
    } catch { /* ignore */ }
  };

  // ─── Progress Timer ─────────────────────────────────────────────

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      if (currentPhase === 'idle') return;

      const elapsed = (Date.now() - phaseStartRef.current) / 1000;
      const phaseDuration = getPhaseDuration(currentPhase, pattern);

      if (phaseDuration <= 0) {
        nextPhase(currentPhase);
        return;
      }

      const pct = Math.min(elapsed / phaseDuration, 1);
      setProgress(pct);
      setPhaseTimeLeft(Math.max(0, phaseDuration - elapsed));

      if (pct >= 1) {
        nextPhase(currentPhase);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, currentPhase, pattern, getPhaseDuration, nextPhase]);

  // ─── Circle SVG ─────────────────────────────────────────────────

  const circleRadius = 70;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circleCircumference * (1 - progress);

  const phaseDuration = getPhaseDuration(currentPhase, pattern);
  const displayedTimeLeft = currentPhase === 'idle' ? 0 : Math.ceil(phaseTimeLeft * 10) / 10;

  return (
    <div className="space-y-6">
      {/* Pattern Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              if (!isRunning) setPattern(p);
            }}
            disabled={isRunning}
            className={`p-3 rounded-xl border text-left transition-all ${
              pattern.id === p.id
                ? 'border-teal-300 bg-teal-50 ring-1 ring-teal-400'
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{p.emoji}</span>
              <span className="font-medium text-sm text-gray-900">{p.name}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{p.description}</p>
            <div className="flex gap-1 mt-1.5">
              {p.phases.map((ph, i) => (
                <span key={i} className="text-[10px] text-gray-400 bg-gray-50 px-1 py-0.5 rounded border border-gray-100">
                  {['In', 'Hld', 'Out', 'Hld'][i]}: {ph}s
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Main Exercise Area */}
      <div className="flex flex-col items-center py-6">
        {/* Animated Breathing Circle */}
        <div className="relative w-48 h-48 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80" cy="80" r={circleRadius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            {/* Progress ring */}
            <circle
              cx="80" cy="80" r={circleRadius}
              fill="none"
              stroke={`url(#breathingGradient)`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-100 ease-linear"
            />
            <defs>
              <linearGradient id="breathingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isRunning ? '#14b8a6' : '#d1d5db'} />
                <stop offset="100%" stopColor={isRunning ? '#06b6d4' : '#d1d5db'} />
              </linearGradient>
            </defs>
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">
              {isRunning ? PHASE_LABELS[currentPhase]?.icon || '▶️' : '🧘'}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {isRunning ? PHASE_LABELS[currentPhase]?.label || 'Ready' : 'Ready'}
            </span>
            {isRunning && (
              <span className="text-sm text-gray-500 font-mono mt-1">
                {displayedTimeLeft}s
              </span>
            )}
            {!isRunning && (
              <span className="text-xs text-gray-400 mt-1">Press Start</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-4">
          {!isRunning ? (
            <button
              onClick={startSession}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              ▶️ Start Session
            </button>
          ) : (
            <button
              onClick={stopSession}
              className="px-6 py-2.5 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-all"
            >
              ⏹️ Stop
            </button>
          )}
        </div>

        {/* Session Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Cycles: <strong className="text-gray-800">{cycleCount}</strong></span>
          <span>·</span>
          <span>Target: <strong className="text-gray-800">{rounds}</strong> cycles</span>
          <span>·</span>
          <span>Total sessions: <strong className="text-gray-800">{totalSessions}</strong></span>
        </div>

        {/* Round selector (only when stopped) */}
        {!isRunning && (
          <div className="mt-3 flex items-center gap-2">
            <label className="text-xs text-gray-500">Target cycles:</label>
            <input
              type="number"
              min={1}
              max={50}
              value={rounds}
              onChange={(e) => setRounds(Math.max(1, parseInt(e.target.value) || 5))}
              className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-400/30"
            />
          </div>
        )}
      </div>

      {/* Session History */}
      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          📋 {showHistory ? 'Hide' : 'Show'} Session History ({totalSessions} total)
        </button>

        {showHistory && totalSessions > 0 && (
          <div className="mt-3 space-y-1">
            {/* Display last 10 sessions from localStorage */}
            <div className="text-xs text-gray-400">
              {(() => {
                try {
                  const raw = localStorage.getItem('lifeos-breathing-sessions');
                  if (!raw) return <p>No sessions recorded yet.</p>;
                  const sessions = JSON.parse(raw).slice(-10).reverse();
                  return sessions.map((s: any, i: number) => (
                    <div key={i} className="flex justify-between py-1 px-3 bg-gray-50 rounded-lg mb-1">
                      <span className="text-gray-700">
                        {PATTERNS.find(p => p.id === s.pattern)?.emoji || '🧘'} {s.cycles} cycles
                      </span>
                      <span className="text-gray-400">
                        {s.duration}s · {new Date(s.date).toLocaleDateString()}
                      </span>
                    </div>
                  ));
                } catch {
                  return <p className="text-gray-400">Unable to load history.</p>;
                }
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
