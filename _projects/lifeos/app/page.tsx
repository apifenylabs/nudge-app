'use client';

import { useState, useEffect, useCallback } from 'react';
import { TRACKERS, type TrackerDef, type TrackerOption } from './data/trackers';
import { loadFromLocalStorage, saveToLocalStorage, syncDayToSupabase, type LifeOSData, type DayEntry } from './lib/storage';
import WeeklyTrends from './components/WeeklyTrends';
import MonthlyInsights from './components/MonthlyInsights';
import DataManager from './components/DataManager';
import PluginManager, { PluginSection } from './components/PluginManager';
import ArchetypeDisplay from './components/ArchetypeDisplay';
import { getActivePluginDefs, type PluginDef } from './data/plugins';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getDateStr(): string {
  const d = new Date();
  return d.toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric',
  });
}

function loadData(): LifeOSData {
  return loadFromLocalStorage();
}

function saveDataToStorage(d: LifeOSData) {
  saveToLocalStorage(d);
}

function getScore(entry: DayEntry | undefined): number {
  if (!entry) return 0;
  let t = 0;
  TRACKERS.forEach((tk) => {
    const v = entry[tk.id as keyof DayEntry] ?? 0;
    t += v as number;
  });
  return Math.round((t / TRACKERS.length) * 25);
}

function getStreak(data: LifeOSData): number {
  const days = Object.keys(data.days || {}).sort().reverse();
  if (!days.length) return 0;
  let streak = 0;
  const today = getToday();
  for (const d of days) {
    if (d === today || streak > 0 || d === yesterday(today, streak)) {
      streak++;
    } else if (streak === 0) break;
  }
  return streak;
}

function yesterday(t: string, i: number): string {
  const d = new Date(t);
  d.setDate(d.getDate() - 1 - i);
  return d.toISOString().split('T')[0];
}

export default function Home() {
  const today = getToday();
  const [data, setData] = useState<LifeOSData>({ days: {} });
  const [values, setValues] = useState<Record<string, number>>({});
  const [pluginValues, setPluginValues] = useState<Record<string, Record<string, number | boolean | string>>>({});
  const [notes, setNotes] = useState('');
  const [activePlugins, setActivePlugins] = useState<PluginDef[]>([]);

  // Load data on mount
  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
    const entry = loaded.days?.[today] || {};
    const init: Record<string, number> = {};
    TRACKERS.forEach((tk) => {
      init[tk.id] = entry[tk.id as keyof DayEntry] !== undefined ? (entry[tk.id as keyof DayEntry] as number) : tk.def;
    });
    setValues(init);
    setNotes(entry.notes || '');

    // Load plugin data
    const plugins = getActivePluginDefs();
    setActivePlugins(plugins);
    const pv: Record<string, Record<string, number | boolean | string>> = {};
    plugins.forEach((p) => {
      const saved = (entry as any)?.[`_plugin_${p.id}`] as Record<string, number | boolean | string> | undefined;
      pv[p.id] = saved ?? {};
    });
    setPluginValues(pv);
  }, [today]);

  const entry = data.days?.[today] || {};
  const hasChanges = TRACKERS.some(
    (tk) =>
      values[tk.id] !==
      (entry[tk.id as keyof DayEntry] !== undefined ? entry[tk.id as keyof DayEntry] : tk.def)
  );
  const notesChanged =
    notes !== (entry.notes || '');
  const canSave = hasChanges || notesChanged;

  const handleSave = useCallback(() => {
    const d = loadData();
    if (!d.days) d.days = {};
    const newEntry: DayEntry = { ...values, notes } as DayEntry;
    // Attach plugin data
    activePlugins.forEach((p) => {
      (newEntry as any)[`_plugin_${p.id}`] = pluginValues[p.id] || {};
    });
    d.days[today] = newEntry;
    saveDataToStorage(d);
    setData(d);
    // Fire-and-forget sync to Supabase
    syncDayToSupabase(today, newEntry);
  }, [values, notes, today, activePlugins, pluginValues]);

  const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  }, []);

  const handlePluginValueChange = useCallback(
    (pluginId: string, fieldId: string, value: number | boolean | string) => {
      setPluginValues((prev) => ({
        ...prev,
        [pluginId]: { ...(prev[pluginId] || {}), [fieldId]: value },
      }));
    },
    [],
  );

  const handlePluginsChange = useCallback(() => {
    const plugins = getActivePluginDefs();
    setActivePlugins(plugins);
    const entry = data.days?.[today] || {};
    const pv: Record<string, Record<string, number | boolean | string>> = {};
    plugins.forEach((p) => {
      const saved = (entry as any)?.[`_plugin_${p.id}`] as Record<string, number | boolean | string> | undefined;
      pv[p.id] = saved ?? {};
    });
    setPluginValues(pv);
  }, [data.days, today]);

  const streak = getStreak(data);

  const historyDays = Object.keys(data.days || {})
    .sort()
    .reverse()
    .slice(0, 7);

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>
            ⟳ LifeOS{' '}
            <span className="streak">
              🔥 {streak} day{streak !== 1 ? 's' : ''}
            </span>
          </h1>
        </div>
        <div className="date">{getDateStr()}</div>
      </header>

      <div className="card">
        <h2>How was today?</h2>
        <div>
          {TRACKERS.map((tk) => (
            <TrackerRow
              key={tk.id}
              tracker={tk}
              value={values[tk.id] ?? tk.def}
              onChange={(v) => {
                setValues((prev) => ({ ...prev, [tk.id]: v }));
              }}
            />
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Notes / Reflect</h2>
        <textarea
          className="notes-area"
          value={notes}
          onChange={handleNotesChange}
          placeholder="What went well? What to improve?"
          maxLength={1000}
        />
      </div>

      <button className="save-btn" disabled={!canSave} onClick={handleSave}>
        {canSave || !entry.notes ? 'Save Today' : 'Saved ✓'}
      </button>

      {/* Plugin sections (active plugins) */}
      {activePlugins.map((p) => (
        <PluginSection
          key={p.id}
          plugin={p}
          values={pluginValues[p.id] || {}}
          onChange={(fieldId, value) => handlePluginValueChange(p.id, fieldId, value)}
        />
      ))}

      <PluginManager onPluginsChange={handlePluginsChange} />

      <ArchetypeDisplay
        data={data}
        todayScore={getScore(data.days?.[today])}
        streakDays={streak}
      />

      <WeeklyTrends data={data} />

      {Object.keys(data.days ?? {}).length >= 7 && <MonthlyInsights data={data} />}

      <DataManager />

      <div className="history">
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#444', marginBottom: 8 }}>
          Last 7 Days
        </h2>
        {historyDays.length === 0 ? (
          <div className="empty">No days tracked yet. Start today!</div>
        ) : (
          historyDays.map((d) => {
            const e = data.days[d];
            const score = getScore(e);
            const date = new Date(d + 'T12:00:00');
            const label = date.toLocaleDateString('en-US', {
              weekday: 'short', month: 'short', day: 'numeric',
            });
            const cls = score >= 80 ? 'day-good' : score >= 50 ? 'day-ok' : 'day-bad';
            return (
              <div className="history-item" key={d}>
                <span>{label}</span>
                <span className={`history-score ${cls}`}>{score}%</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function TrackerRow({
  tracker,
  value,
  onChange,
}: {
  tracker: TrackerDef;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="track-item">
      <div>
        <div className="track-label">{tracker.label}</div>
      </div>
      <div className="btn-group">
        {tracker.options.map((o) => {
          const active = o.v === value;
          let cls = 'btn';
          if (active) {
            cls += ' active';
            if (tracker.id === 'mood' && o.v === 1) cls += ' bad';
            if (tracker.id === 'mood' && o.v === 2) cls += ' mid';
          }
          return (
            <button key={o.v} className={cls} onClick={() => onChange(o.v)}>
              {o.l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
