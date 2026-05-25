'use client';

import { useState, useEffect, useMemo } from 'react';

// ── Types ──

interface VolunteerEntry {
  date: string;         // YYYY-MM-DD
  hours: number;
  organization: string;
  serviceType: string;
  notes: string;
}

const STORAGE_KEY = 'lifeos_volunteering';

// ── Helpers ──

function loadEntries(): VolunteerEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: VolunteerEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

const SERVICE_TYPES = [
  'Teaching / Mentoring',
  'Environmental Cleanup',
  'Animal Welfare',
  'Food / Shelter Assistance',
  'Community Event',
  'Fundraising',
  'Health / Medical',
  'Tech / Digital Volunteering',
  'Disaster Relief',
  'Other',
];

// ── Component ──

export default function VolunteeringTracker() {
  const [entries, setEntries] = useState<VolunteerEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<'weekly' | 'monthly'>('monthly');

  // Form state
  const [formDate, setFormDate] = useState(todayStr());
  const [formHours, setFormHours] = useState(1);
  const [formOrg, setFormOrg] = useState('');
  const [formServiceType, setFormServiceType] = useState(SERVICE_TYPES[0]);
  const [formNotes, setFormNotes] = useState('');

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formOrg.trim() || formHours <= 0) return;

    const newEntry: VolunteerEntry = {
      date: formDate,
      hours: formHours,
      organization: formOrg.trim(),
      serviceType: formServiceType,
      notes: formNotes.trim(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);

    // Reset form
    setFormDate(todayStr());
    setFormHours(1);
    setFormOrg('');
    setFormServiceType(SERVICE_TYPES[0]);
    setFormNotes('');
    setShowForm(false);
  };

  // ── Summary calculations ──

  const { totalHours, totalSessions, uniqueOrgs, topServiceType } = useMemo(() => {
    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
    const totalSessions = entries.length;
    const orgSet = new Set(entries.map((e) => e.organization));
    const uniqueOrgs = orgSet.size;

    // Most common service type
    const typeCounts: Record<string, number> = {};
    entries.forEach((e) => {
      typeCounts[e.serviceType] = (typeCounts[e.serviceType] || 0) + 1;
    });
    let topServiceType = SERVICE_TYPES[0];
    let maxCount = 0;
    for (const [type, count] of Object.entries(typeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topServiceType = type;
      }
    }

    return { totalHours, totalSessions, uniqueOrgs, topServiceType };
  }, [entries]);

  // ── Period breakdown ──

  const periodEntries = useMemo(() => {
    const now = new Date();
    let cutoff: Date;
    if (view === 'weekly') {
      cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - 7);
    } else {
      cutoff = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    return entries.filter((e) => new Date(e.date + 'T12:00:00') >= cutoff);
  }, [entries, view]);

  const periodHours = periodEntries.reduce((s, e) => s + e.hours, 0);
  const periodSessions = periodEntries.length;

  // ── Recent entries (last 10) ──

  const recentEntries = entries.slice(0, 10);

  // ── Render ──

  return (
    <div className="card" style={{ borderLeft: '3px solid #6366f1' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
      }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
            <span>🤝</span>
            <span>Volunteering & Community</span>
          </h2>
          <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
            Track your time giving back
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? '#fee2e2' : '#6366f1',
            color: showForm ? '#dc2626' : 'white',
            border: 'none',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all .15s',
          }}
        >
          {showForm ? '✕ Cancel' : '+ Log Hours'}
        </button>
      </div>

      {/* Log Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#f8f8ff',
            borderRadius: 12,
            padding: 14,
            marginBottom: 12,
            border: '1px solid #e0e0ff',
          }}
        >
          <div style={{ display: 'grid', gap: 10 }}>
            {/* Date */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#555', display: 'block', marginBottom: 3 }}>
                Date
              </label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 13,
                }}
              />
            </div>

            {/* Hours */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#555', display: 'block', marginBottom: 3 }}>
                Hours Volunteered
              </label>
              <input
                type="number"
                min={0.25}
                max={24}
                step={0.25}
                value={formHours}
                onChange={(e) => setFormHours(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 13,
                }}
              />
            </div>

            {/* Organization */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#555', display: 'block', marginBottom: 3 }}>
                Organization
              </label>
              <input
                type="text"
                value={formOrg}
                onChange={(e) => setFormOrg(e.target.value)}
                placeholder="e.g. Red Cross, Local Food Bank..."
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 13,
                }}
              />
            </div>

            {/* Service Type */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#555', display: 'block', marginBottom: 3 }}>
                Type of Service
              </label>
              <select
                value={formServiceType}
                onChange={(e) => setFormServiceType(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 13,
                  background: 'white',
                }}
              >
                {SERVICE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#555', display: 'block', marginBottom: 3 }}>
                Notes (optional)
              </label>
              <textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="How did it feel? Who did you help?"
                maxLength={300}
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 12,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: 50,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!formOrg.trim() || formHours <= 0}
              style={{
                background: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '10px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                opacity: formOrg.trim() && formHours > 0 ? 1 : 0.4,
                transition: 'opacity .15s',
              }}
            >
              ✓ Log Volunteer Session
            </button>
          </div>
        </form>
      )}

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
        marginBottom: 12,
      }}>
        <StatBox label="Total Hours" value={totalHours.toFixed(1)} emoji="⏱️" />
        <StatBox label="Sessions" value={String(totalSessions)} emoji="📋" />
        <StatBox label="Organizations" value={String(uniqueOrgs)} emoji="🏛️" />
        <StatBox label="Top Type" value={topServiceType.split(' ')[0]} emoji="⭐" />
      </div>

      {/* View Toggle + Period Summary */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <ViewToggle active={view === 'weekly'} onClick={() => setView('weekly')} label="Weekly" />
          <ViewToggle active={view === 'monthly'} onClick={() => setView('monthly')} label="Monthly" />
        </div>
        <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
          {periodHours.toFixed(1)}h · {periodSessions} session{periodSessions !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Recent entries list */}
      {recentEntries.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '20px 0',
          color: '#bbb',
          fontSize: 13,
        }}>
          No volunteer sessions logged yet. Start giving back! 🤝
        </div>
      ) : (
        <div>
          {recentEntries.map((entry, idx) => {
            const inPeriod = periodEntries.includes(entry);
            return (
              <div
                key={`${entry.date}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: '1px solid #f0f0f0',
                  opacity: inPeriod ? 1 : 0.5,
                }}
              >
                {/* Hour badge */}
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: inPeriod ? '#eef2ff' : '#f5f5f5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: inPeriod ? '#6366f1' : '#999',
                    lineHeight: 1,
                  }}>
                    {entry.hours}h
                  </span>
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#333',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {entry.organization}
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: '#888',
                    marginTop: 1,
                  }}>
                    {entry.serviceType}
                    {entry.notes && ` · "${entry.notes.slice(0, 40)}${entry.notes.length > 40 ? '…' : ''}"`}
                  </div>
                </div>

                {/* Date */}
                <span style={{
                  fontSize: 10,
                  color: '#aaa',
                  fontWeight: 500,
                  flexShrink: 0,
                }}>
                  {formatDate(entry.date)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Mini helpers ──

function StatBox({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div style={{
      background: '#f8f8ff',
      borderRadius: 10,
      padding: '8px 6px',
      textAlign: 'center',
      border: '1px solid #eef2ff',
    }}>
      <div style={{ fontSize: 16, marginBottom: 2 }}>{emoji}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#6366f1' }}>{value}</div>
      <div style={{ fontSize: 9, color: '#888', marginTop: 1 }}>{label}</div>
    </div>
  );
}

function ViewToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 12px',
        borderRadius: 14,
        border: active ? '1px solid #6366f1' : '1px solid #ddd',
        background: active ? '#eef2ff' : 'transparent',
        color: active ? '#6366f1' : '#888',
        fontSize: 11,
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        transition: 'all .15s',
      }}
    >
      {label}
    </button>
  );
}
