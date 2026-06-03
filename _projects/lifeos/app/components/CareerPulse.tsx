'use client';

/**
 * LifeOS — CareerPulse
 *
 * Interactive career satisfaction and skills gap analysis tool.
 * Fully self-contained — localStorage only, no Supabase required.
 *
 * Features:
 * - Role/industry text input
 * - Satisfaction slider (1-10)
 * - Skills checklist with add/remove/toggle mastered
 * - Gaps section for skills they want to develop
 * - Career Snapshot summary card
 * - Purple/violet accent palette matching Career OS
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────

interface CareerPulseData {
  role: string;
  industry: string;
  satisfaction: number;
  skills: SkillItem[];
}

interface SkillItem {
  id: string;
  name: string;
  mastered: boolean;
  gap: boolean; // true = they want to develop this
}

const STORAGE_KEY = 'lifeos-career-pulse';

const DEFAULT_SKILLS: SkillItem[] = [
  { id: 's1', name: 'Communication', mastered: false, gap: false },
  { id: 's2', name: 'Leadership', mastered: false, gap: false },
  { id: 's3', name: 'Technical / Domain Knowledge', mastered: false, gap: false },
  { id: 's4', name: 'Project Management', mastered: false, gap: false },
  { id: 's5', name: 'Data Analysis', mastered: false, gap: false },
  { id: 's6', name: 'Problem Solving', mastered: false, gap: false },
  { id: 's7', name: 'Teamwork / Collaboration', mastered: false, gap: false },
  { id: 's8', name: 'Public Speaking / Presentation', mastered: false, gap: false },
  { id: 's9', name: 'Writing', mastered: false, gap: false },
  { id: 's10', name: 'Negotiation', mastered: false, gap: false },
  { id: 's11', name: 'Critical Thinking', mastered: false, gap: false },
  { id: 's12', name: 'Networking', mastered: false, gap: false },
];

const DEFAULT_DATA: CareerPulseData = {
  role: '',
  industry: '',
  satisfaction: 7,
  skills: DEFAULT_SKILLS,
};

function loadData(): CareerPulseData {
  if (typeof window === 'undefined') return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CareerPulseData;
      // Ensure all fields exist (in case of schema changes)
      return {
        ...DEFAULT_DATA,
        ...parsed,
        skills: parsed.skills?.length ? parsed.skills : DEFAULT_DATA.skills,
      };
    }
  } catch {
    // Ignore corrupt data
  }
  return DEFAULT_DATA;
}

function saveData(data: CareerPulseData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export default function CareerPulse() {
  const [data, setData] = useState<CareerPulseData>(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newGapName, setNewGapName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setData(loadData());
    setLoaded(true);
  }, []);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    if (loaded) {
      saveData(data);
    }
  }, [data, loaded]);

  // ─── Field updaters ─────────────────────────────────────────────

  const updateRole = useCallback((role: string) => {
    setData(prev => ({ ...prev, role }));
  }, []);

  const updateIndustry = useCallback((industry: string) => {
    setData(prev => ({ ...prev, industry }));
  }, []);

  const updateSatisfaction = useCallback((satisfaction: number) => {
    setData(prev => ({ ...prev, satisfaction }));
  }, []);

  const toggleSkill = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        s.id === id ? { ...s, mastered: !s.mastered } : s
      ),
    }));
  }, []);

  const toggleGap = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        s.id === id ? { ...s, gap: !s.gap } : s
      ),
    }));
  }, []);

  const addSkill = useCallback(() => {
    const name = newSkillName.trim();
    if (!name) return;
    setData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: `s${Date.now()}`, name, mastered: false, gap: false },
      ],
    }));
    setNewSkillName('');
    inputRef.current?.focus();
  }, [newSkillName]);

  const addGap = useCallback(() => {
    const name = newGapName.trim();
    if (!name) return;
    // Check if it already exists
    setData(prev => {
      const existing = prev.skills.find(
        s => s.name.toLowerCase() === name.toLowerCase()
      );
      if (existing) {
        // Just mark existing as gap
        return {
          ...prev,
          skills: prev.skills.map(s =>
            s.id === existing.id ? { ...s, gap: true } : s
          ),
        };
      }
      return {
        ...prev,
        skills: [
          ...prev.skills,
          { id: `s${Date.now()}`, name, mastered: false, gap: true },
        ],
      };
    });
    setNewGapName('');
  }, [newGapName]);

  const removeSkill = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  }, []);

  // ─── Derived Data ───────────────────────────────────────────────

  const masteredSkills = data.skills.filter(s => s.mastered);
  const gapSkills = data.skills.filter(s => s.gap);
  const unmastered = data.skills.filter(s => !s.mastered);
  const satisfactionLabel =
    data.satisfaction <= 3
      ? '😟 Unhappy'
      : data.satisfaction <= 5
        ? '😐 Mixed'
        : data.satisfaction <= 7
          ? '🙂 Satisfied'
          : data.satisfaction <= 9
            ? '😄 Happy'
            : '🤩 Thrilled';

  // ─── Gradients & Colors ─────────────────────────────────────────

  const purpleGrad = 'from-violet-500 to-purple-600';
  const purpleLight = 'bg-violet-50 border-violet-200';
  const purpleDot = 'bg-violet-500';
  const purpleText = 'text-violet-600';

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
        Loading CareerPulse…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Role & Industry ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            Current Role
          </label>
          <input
            type="text"
            value={data.role}
            onChange={e => updateRole(e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            Industry
          </label>
          <input
            type="text"
            value={data.industry}
            onChange={e => updateIndustry(e.target.value)}
            placeholder="e.g. Fintech / SaaS"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* ── Satisfaction Slider ── */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Career Satisfaction
          </label>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-violet-600">{data.satisfaction}</span>
            <span className="text-xs text-gray-400">/ 10</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {satisfactionLabel}
            </span>
          </div>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={data.satisfaction}
          onChange={e => updateSatisfaction(Number(e.target.value))}
          className="w-full h-2 appearance-none cursor-pointer rounded-full bg-gray-200 accent-violet-600"
          style={{
            background: `linear-gradient(to right, #8B5CF6 ${(data.satisfaction - 1) * 11.111}%, #e5e7eb ${(data.satisfaction - 1) * 11.111}%)`,
          }}
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>1 — Unhappy</span>
          <span>5 — Mixed</span>
          <span>10 — Thrilled</span>
        </div>
      </div>

      {/* ── Skills Grid ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">🧠 Skills</h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">
            {masteredSkills.length} / {data.skills.length} mastered
          </span>
        </div>
        <div className="space-y-1.5 mb-3">
          {data.skills.map(skill => (
            <div
              key={skill.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm ${
                skill.mastered
                  ? 'bg-violet-50 border-violet-200'
                  : skill.gap
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => toggleSkill(skill.id)}
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    skill.mastered
                      ? 'bg-violet-500 border-violet-500 text-white'
                      : 'bg-white border-gray-300 hover:border-violet-400'
                  }`}
                  title={skill.mastered ? 'Mark as unmastered' : 'Mark as mastered'}
                >
                  {skill.mastered && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span
                  className={`truncate ${
                    skill.mastered
                      ? 'text-violet-700 font-medium'
                      : skill.gap
                        ? 'text-amber-700'
                        : 'text-gray-600'
                  }`}
                >
                  {skill.name}
                </span>
                {skill.gap && !skill.mastered && (
                  <span className="text-[10px] font-medium text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full shrink-0">
                    Gap
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {!skill.gap && (
                  <button
                    onClick={() => toggleGap(skill.id)}
                    className="text-[10px] text-gray-400 hover:text-amber-500 transition-colors px-1"
                    title="Mark as skill gap"
                  >
                    🎯
                  </button>
                )}
                {skill.gap && (
                  <button
                    onClick={() => toggleGap(skill.id)}
                    className="text-[10px] text-amber-500 hover:text-gray-400 transition-colors px-1"
                    title="Remove from gaps"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-[10px] text-gray-300 hover:text-red-400 transition-colors px-1"
                  title="Remove skill"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new skill */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            placeholder="Add a skill…"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-gray-300"
          />
          <button
            onClick={addSkill}
            disabled={!newSkillName.trim()}
            className="px-3 py-2 text-sm font-medium rounded-lg bg-violet-100 text-violet-700 hover:bg-violet-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            + Add
          </button>
        </div>
      </div>

      {/* ── Skills Gap Section ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">🎯 Skills I Want to Develop</h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-gray-100 text-gray-500 border-gray-200">
            {gapSkills.length} gaps
          </span>
        </div>

        {gapSkills.length === 0 ? (
          <p className="text-xs text-gray-400 italic px-1">
            No skill gaps marked yet. Click the 🎯 icon next to any skill above, or add new ones below.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-3">
            {gapSkills.map(skill => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-amber-50 border border-amber-200 text-amber-700"
              >
                🎯 {skill.name}
                <button
                  onClick={() => toggleGap(skill.id)}
                  className="text-amber-400 hover:text-amber-600 ml-0.5"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={newGapName}
            onChange={e => setNewGapName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGap()}
            placeholder="Skill you want to learn…"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-gray-300"
          />
          <button
            onClick={addGap}
            disabled={!newGapName.trim()}
            className="px-3 py-2 text-sm font-medium rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            + Add
          </button>
        </div>
      </div>

      {/* ── Career Snapshot Summary ── */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📊</span>
          <h3 className="text-sm font-semibold text-gray-900">Career Snapshot</h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-white text-violet-600 border-violet-200">
            Summary
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/80 rounded-lg p-3 border border-violet-100">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Role</div>
            <div className="text-sm font-medium text-gray-800">
              {data.role || <span className="text-gray-400 italic">Not set</span>}
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 border border-violet-100">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Industry</div>
            <div className="text-sm font-medium text-gray-800">
              {data.industry || <span className="text-gray-400 italic">Not set</span>}
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 border border-violet-100">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Satisfaction</div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-violet-600">{data.satisfaction}</span>
              <span className="text-[11px] text-gray-500">/ 10 — {satisfactionLabel}</span>
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 border border-violet-100">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Skills</div>
            <div className="text-sm text-gray-800">
              <span className="font-semibold text-violet-600">{masteredSkills.length}</span>{' '}
              mastered of <span className="font-semibold">{data.skills.length}</span> total
            </div>
          </div>
        </div>

        {/* Strongest & Weakest Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span>💪</span>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Strongest</span>
            </div>
            {masteredSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {masteredSkills.slice(0, 5).map(s => (
                  <span key={s.id} className="text-[11px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {s.name}
                  </span>
                ))}
                {masteredSkills.length > 5 && (
                  <span className="text-[10px] text-gray-400 self-center">+{masteredSkills.length - 5} more</span>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No skills mastered yet</p>
            )}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span>🎯</span>
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Gaps to Work On</span>
            </div>
            {gapSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {gapSkills.slice(0, 5).map(s => (
                  <span key={s.id} className="text-[11px] font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {s.name}
                  </span>
                ))}
                {gapSkills.length > 5 && (
                  <span className="text-[10px] text-gray-400 self-center">+{gapSkills.length - 5} more</span>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No gaps identified yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
