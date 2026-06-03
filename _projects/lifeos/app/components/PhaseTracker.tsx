'use client';

/**
 * LifeOS — Phase Tracker (localStorage-based)
 *
 * Interactive phase progress + goal tracking for each plugin.
 * Persists to localStorage — works without Supabase, survives refreshes.
 *
 * Features:
 *   - Check off completed phases per plugin
 *   - Add custom goals/notes per phase
 *   - Overall completion bar
 *   - Per-plugin journal entries
 *   - Auto-saves to localStorage
 */

import { useState, useEffect, useCallback } from 'react';
import SparklineTrend, { recordTrendPoint } from './SparklineTrend';

// ─── Types ────────────────────────────────────────────────────────────

interface PhaseProgress {
  completed: boolean;
  goals: string[];
  notes: string;
}

interface PluginProgress {
  phases: Record<string, PhaseProgress>;
  journalEntries: { date: string; text: string }[];
  lastUpdated: string;
}

interface PhaseData {
  id: string;
  name: string;
  description: string;
  objectives: string[];
}

// ─── LocalStorage Helpers ─────────────────────────────────────────────

const STORAGE_PREFIX = 'lifeos_progress_';

function loadProgress(pluginId: string): PluginProgress {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + pluginId);
    if (raw) {
      const parsed = JSON.parse(raw) as PluginProgress;
      // Normalize phases to ensure all existing ones exist
      return parsed;
    }
  } catch {
    // Ignore corrupt data
  }
  return {
    phases: {},
    journalEntries: [],
    lastUpdated: new Date().toISOString(),
  };
}

function saveProgress(pluginId: string, progress: PluginProgress) {
  progress.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_PREFIX + pluginId, JSON.stringify(progress));
}

// ─── Goal Input ───────────────────────────────────────────────────────

function GoalInput({
  goals,
  onAdd,
  onRemove,
}: {
  goals: string[];
  onAdd: (goal: string) => void;
  onRemove: (index: number) => void;
}) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a personal goal…"
          className="flex-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 text-gray-700 placeholder:text-gray-400"
        />
        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="px-2.5 py-1.5 text-xs font-medium bg-teal-50 text-teal-700 rounded-lg border border-teal-200 hover:bg-teal-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
      {goals.length > 0 && (
        <ul className="space-y-1">
          {goals.map((goal, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-gray-600 group">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
              <span className="flex-1">{goal}</span>
              <button
                onClick={() => onRemove(i)}
                className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all text-[11px]"
                title="Remove goal"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Journal Section ──────────────────────────────────────────────────

function JournalSection({
  entries,
  onAddEntry,
}: {
  entries: { date: string; text: string }[];
  onAddEntry: (text: string) => void;
}) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddEntry(trimmed);
    setText('');
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Journal your experience with this plugin…"
          rows={3}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 text-gray-700 placeholder:text-gray-400 resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-3 py-1.5 text-xs font-medium bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Save Journal Entry
        </button>
      </div>
      {entries.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {[...entries].reverse().map((entry, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-400 mb-1 font-mono">{entry.date}</p>
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main PhaseTracker Component ──────────────────────────────────────

export default function PhaseTracker({
  pluginId,
  pluginName,
  phases: phaseDefinitions,
}: {
  pluginId: string;
  pluginName: string;
  phases: PhaseData[];
}) {
  const [progress, setProgress] = useState<PluginProgress>(() => ({
    phases: {},
    journalEntries: [],
    lastUpdated: new Date().toISOString(),
  }));
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    setProgress(loadProgress(pluginId));
  }, [pluginId]);

  // Persist on change (debounced)
  useEffect(() => {
    if (!isClient) return;
    const timer = setTimeout(() => saveProgress(pluginId, progress), 300);
    return () => clearTimeout(timer);
  }, [progress, pluginId, isClient]);

  const togglePhase = useCallback(
    (phaseId: string) => {
      setProgress((prev) => {
        const current = prev.phases[phaseId] || { completed: false, goals: [], notes: '' };
        const newCompleted = !current.completed;
        // Record trend point after state update (we'll compute pct after render)
        return {
          ...prev,
          phases: {
            ...prev.phases,
            [phaseId]: { ...current, completed: newCompleted },
          },
        };
      });
    },
    []
  );

  // Record trend point whenever completed count changes
  const completedCount = phaseDefinitions.filter(
    (p) => progress.phases[p.id]?.completed
  ).length;
  const totalCount = phaseDefinitions.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  useEffect(() => {
    if (!isClient) return;
    recordTrendPoint(pluginId, pct);
  }, [pct, pluginId, isClient]);

  const addGoal = useCallback(
    (phaseId: string, goal: string) => {
      setProgress((prev) => {
        const current = prev.phases[phaseId] || { completed: false, goals: [], notes: '' };
        return {
          ...prev,
          phases: {
            ...prev.phases,
            [phaseId]: { ...current, goals: [...current.goals, goal] },
          },
        };
      });
    },
    []
  );

  const removeGoal = useCallback(
    (phaseId: string, index: number) => {
      setProgress((prev) => {
        const current = prev.phases[phaseId] || { completed: false, goals: [], notes: '' };
        return {
          ...prev,
          phases: {
            ...prev.phases,
            [phaseId]: {
              ...current,
              goals: current.goals.filter((_, i) => i !== index),
            },
          },
        };
      });
    },
    []
  );

  const addJournalEntry = useCallback(
    (text: string) => {
      setProgress((prev) => ({
        ...prev,
        journalEntries: [
          ...prev.journalEntries,
          { date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }), text },
        ],
      }));
    },
    []
  );

  const resetProgress = useCallback(() => {
    const fresh: PluginProgress = { phases: {}, journalEntries: [], lastUpdated: new Date().toISOString() };
    setProgress(fresh);
    saveProgress(pluginId, fresh);
    setShowResetConfirm(false);
  }, [pluginId]);

  // computed above before render

  if (!isClient) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="animate-pulse flex gap-3 items-center mb-4">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-100 rounded" />
        </div>
        <div className="h-2 bg-gray-100 rounded-full mb-6" />
        <div className="space-y-3">
          {phaseDefinitions.map((_, i) => (
            <div key={i} className="h-12 bg-gray-50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* ── Header ── */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">
            📋 My {pluginName} Progress
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowJournal(!showJournal)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${
                showJournal
                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
              }`}
            >
              📝 Journal
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1 text-[11px] font-medium bg-white text-gray-400 border border-gray-200 rounded-lg hover:text-red-400 hover:border-red-200 transition-colors"
              title="Reset progress"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-mono text-gray-500 shrink-0 min-w-[3ch] text-right">
            {pct}%
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mb-2">
          {completedCount} of {totalCount} phases completed
        </p>

        {/* Trend sparkline */}
        <SparklineTrend pluginId={pluginId} currentPct={pct} simplified />
      </div>

      {/* ── Journal (togglable) ── */}
      {showJournal && (
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <JournalSection
            entries={progress.journalEntries}
            onAddEntry={addJournalEntry}
          />
        </div>
      )}

      {/* ── Phase List ── */}
      <div className="p-5 space-y-2">
        {phaseDefinitions.map((phase) => {
          const p = progress.phases[phase.id] || { completed: false, goals: [], notes: '' };
          const isExpanded = expandedPhase === phase.id;

          return (
            <div
              key={phase.id}
              className={`rounded-lg border transition-all ${
                p.completed
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              {/* Phase header */}
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
              >
                {/* Checkbox */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePhase(phase.id);
                  }}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                    p.completed
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300 hover:border-teal-400'
                  }`}
                >
                  {p.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Phase info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{phase.name}</span>
                    {p.completed && (
                      <span className="text-[10px] text-emerald-600 font-medium">✓ Done</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{phase.description}</p>
                </div>

                {/* Expand indicator */}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-50">
                  {/* Objectives */}
                  <div className="mt-3 mb-3">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1.5">
                      Objectives
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.objectives.map((obj) => (
                        <span
                          key={obj}
                          className="text-[11px] text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100"
                        >
                          {obj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Personal goals */}
                  <div className="mb-3">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1.5">
                      Personal Goals
                    </p>
                    <GoalInput
                      goals={p.goals}
                      onAdd={(g) => addGoal(phase.id, g)}
                      onRemove={(i) => removeGoal(phase.id, i)}
                    />
                  </div>

                  {/* Quick complete toggle */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                      p.completed
                        ? 'text-gray-400 border-gray-200 hover:border-gray-300'
                        : 'text-teal-700 bg-teal-50 border-teal-200 hover:bg-teal-100'
                    }`}
                  >
                    {p.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Reset confirmation modal ── */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Reset Progress?</h3>
            <p className="text-xs text-gray-500 mb-4">
              This will clear all phase progress, goals, and journal entries for <strong>{pluginName}</strong>.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={resetProgress}
                className="px-4 py-2 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Last updated footnote ── */}
      <div className="px-5 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] text-gray-300">
          💾 Saved locally · {progress.lastUpdated
            ? new Date(progress.lastUpdated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : '—'}
        </span>
        <button
          onClick={() => setShowJournal(true)}
          className="text-[10px] text-teal-500 hover:text-teal-600 bg-transparent border-none p-0 cursor-pointer"
        >
          View all journal entries ({progress.journalEntries.length})
        </button>
      </div>
    </div>
  );
}
