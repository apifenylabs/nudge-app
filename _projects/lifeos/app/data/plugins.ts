/**
 * LifeOS Plugin Architecture
 *
 * Plugins extend the core LifeOS tracking with additional dimensions.
 * Each plugin defines:
 *   - id: unique slug
 *   - name: display name
 *   - description: what it tracks
 *   - emoji: icon
 *   - fields: array of scalar or checkbox fields
 *   - category: which domain it belongs to
 */

export interface PluginField {
  id: string;
  label: string;
  type: 'scale' | 'checkbox' | 'text';
  /** For scale: min/max/step/default */
  min?: number;
  max?: number;
  step?: number;
  default: number | boolean | string;
}

export interface PluginDef {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'habit' | 'goal' | 'reflection' | 'health_extra' | 'social_extra' | 'work_extra' | 'learning' | 'finance' | 'mindfulness';
  fields: PluginField[];
  /** Optional: suggest to user based on detected patterns */
  autoSuggest?: string;
}

export const BUILTIN_PLUGINS: PluginDef[] = [
  // ── Daily Habits ──
  {
    id: 'daily_habits',
    name: 'Daily Habits',
    description: 'Track key micro-habits',
    emoji: '✅',
    category: 'habit',
    fields: [
      { id: 'made_bed', label: 'Made Bed', type: 'checkbox', default: false },
      { id: 'drank_water', label: 'Drank Water (8+ cups)', type: 'checkbox', default: false },
      { id: 'no_scroll_30m', label: 'No Phone Scroll First 30m', type: 'checkbox', default: false },
      { id: 'read_10m', label: 'Read 10+ Minutes', type: 'checkbox', default: false },
      { id: 'steps_5k', label: '5,000+ Steps', type: 'checkbox', default: false },
    ],
  },

  // ── Screen Time ──
  {
    id: 'screen_time',
    name: 'Screen Time',
    description: 'Digital wellness tracking',
    emoji: '📱',
    category: 'habit',
    fields: [
      { id: 'total_screen_hrs', label: 'Total Screen Time (hrs)', type: 'scale', min: 0, max: 16, step: 0.5, default: 4 },
      { id: 'social_scroll_hrs', label: 'Social Media Scroll (hrs)', type: 'scale', min: 0, max: 8, step: 0.5, default: 1 },
      { id: 'productive_screen_hrs', label: 'Productive Screen (hrs)', type: 'scale', min: 0, max: 12, step: 0.5, default: 3 },
    ],
  },

  // ── Gratitude ──
  {
    id: 'gratitude',
    name: 'Gratitude & Reflection',
    description: 'What went well? What could improve?',
    emoji: '🙏',
    category: 'reflection',
    fields: [
      { id: 'grateful_for', label: 'I am grateful for…', type: 'text', default: '' },
      { id: 'win_of_day', label: 'Biggest win today', type: 'text', default: '' },
      { id: 'lesson_learned', label: 'Lesson learned', type: 'text', default: '' },
    ],
  },

  // ── Deep Work ──
  {
    id: 'deep_work',
    name: 'Deep Work Log',
    description: 'Track focused work sessions',
    emoji: '🎯',
    category: 'work_extra',
    fields: [
      { id: 'deep_work_sessions', label: 'Deep Work Sessions', type: 'scale', min: 0, max: 6, step: 1, default: 0 },
      { id: 'deep_work_hrs', label: 'Total Deep Work (hrs)', type: 'scale', min: 0, max: 12, step: 0.5, default: 0 },
      { id: 'interruptions', label: 'Interruptions Count', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
    ],
  },

  // ── Social Connections ──
  {
    id: 'social_quality',
    name: 'Social Connections',
    description: 'Quality of social interactions',
    emoji: '💬',
    category: 'social_extra',
    fields: [
      { id: 'meaningful_convs', label: 'Meaningful Conversations', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'quality_rating', label: 'Interaction Quality (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
    ],
  },

  // ── Health Extras ──
  {
    id: 'health_extras',
    name: 'Health & Body',
    description: 'Additional health metrics',
    emoji: '🩺',
    category: 'health_extra',
    fields: [
      { id: 'caffeine_cups', label: 'Caffeine (cups)', type: 'scale', min: 0, max: 10, step: 1, default: 1 },
      { id: 'alcohol_units', label: 'Alcohol (units)', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'stress_level', label: 'Stress Level (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
    ],
  },

  // ── Goals ──
  {
    id: 'goals',
    name: 'Goals & Progress',
    description: 'Track progress toward specific goals',
    emoji: '🏆',
    category: 'goal',
    fields: [
      { id: 'goal_1_progress', label: 'Goal 1: Progress (0-100%)', type: 'scale', min: 0, max: 100, step: 5, default: 0 },
      { id: 'goal_2_progress', label: 'Goal 2: Progress (0-100%)', type: 'scale', min: 0, max: 100, step: 5, default: 0 },
      { id: 'goal_1_name', label: 'Goal 1 Name', type: 'text', default: '' },
      { id: 'goal_2_name', label: 'Goal 2 Name', type: 'text', default: '' },
    ],
  },

  // ── Learning & Growth ──
  {
    id: 'learning',
    name: 'Learning & Growth',
    description: 'Track daily learning — courses, reading, skills',
    emoji: '📚',
    category: 'learning',
    fields: [
      { id: 'study_minutes', label: 'Focused Study (min)', type: 'scale', min: 0, max: 240, step: 10, default: 30 },
      { id: 'pages_read', label: 'Pages Read', type: 'scale', min: 0, max: 100, step: 1, default: 0 },
      { id: 'skill_practiced', label: 'Skill Practiced', type: 'text', default: '' },
      { id: 'course_progress', label: 'Course Progress (%)', type: 'scale', min: 0, max: 100, step: 5, default: 0 },
    ],
    autoSuggest: 'track_learning',
  },

  // ── Finance Tracking ──
  {
    id: 'finance',
    name: 'Daily Finance',
    description: 'Quick financial pulse check',
    emoji: '💰',
    category: 'finance',
    fields: [
      { id: 'spent_today', label: 'Spent Today ($)', type: 'scale', min: 0, max: 500, step: 5, default: 0 },
      { id: 'saved_today', label: 'Saved Today ($)', type: 'scale', min: 0, max: 500, step: 5, default: 0 },
      { id: 'budget_feeling', label: 'Budget Feeling (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
    ],
    autoSuggest: 'track_finance',
  },

  // ── Mindfulness & Energy ──
  {
    id: 'mindfulness',
    name: 'Mindfulness & Energy',
    description: 'Track meditation, energy levels, and mental clarity',
    emoji: '🧘',
    category: 'mindfulness',
    fields: [
      { id: 'meditation_min', label: 'Meditation (min)', type: 'scale', min: 0, max: 60, step: 1, default: 0 },
      { id: 'energy_morning', label: 'Morning Energy (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'energy_evening', label: 'Evening Energy (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'journaled', label: 'Journaled Today', type: 'checkbox', default: false },
    ],
    autoSuggest: 'track_mindfulness',
  },
];

/** Active plugins (user-selected). Stored in localStorage. */
const PLUGIN_ACTIVE_KEY = 'lifeos_active_plugins';

export function loadActivePlugins(): string[] {
  try {
    const raw = localStorage.getItem(PLUGIN_ACTIVE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveActivePlugins(ids: string[]) {
  localStorage.setItem(PLUGIN_ACTIVE_KEY, JSON.stringify(ids));
}

export function getActivePluginDefs(): PluginDef[] {
  const active = loadActivePlugins();
  return BUILTIN_PLUGINS.filter((p) => active.includes(p.id));
}
