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
  category: 'habit' | 'goal' | 'reflection' | 'health_extra' | 'social_extra' | 'work_extra' | 'learning' | 'finance' | 'mindfulness' | 'content_creation' | 'career' | 'environment' | 'habits_extra' | 'nutrition' | 'creativity' | 'finance_invest' | 'family_parenting' | 'pets' | 'events' | 'travel' | 'meal_planning' | 'sleep_recovery' | 'energy_focus' | 'media' | 'home' | 'volunteering' | 'digital_minimalism' | 'biz_ops' | 'content_marketing' | 'local_seo';
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

  // ── Relationships & Connections ──
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Track quality time with partner, family, and close friends',
    emoji: '💕',
    category: 'social_extra',
    fields: [
      { id: 'partner_time', label: 'Quality Time w/ Partner (0-5)', type: 'scale', min: 0, max: 5, step: 1, default: 0 },
      { id: 'family_called', label: 'Called / Messaged Family', type: 'checkbox', default: false },
      { id: 'friend_checkin', label: 'Checked in with a Friend', type: 'checkbox', default: false },
      { id: 'conflict_resolved', label: 'Conflict Resolved Well', type: 'checkbox', default: false },
      { id: 'relationship_note', label: 'Relationship Note', type: 'text', default: '' },
    ],
    autoSuggest: 'track_social',
  },

  // ── Side Projects ──
  {
    id: 'side_projects',
    name: 'Side Projects',
    description: 'Track progress on personal/creative side projects',
    emoji: '🔨',
    category: 'work_extra',
    fields: [
      { id: 'project_minutes', label: 'Project Time (min)', type: 'scale', min: 0, max: 240, step: 10, default: 0 },
      { id: 'shipped_task', label: 'Completed a Task', type: 'checkbox', default: false },
      { id: 'blockers', label: 'Main Blockers', type: 'text', default: '' },
      { id: 'project_name', label: 'Project Worked On', type: 'text', default: '' },
      { id: 'momentum_rating', label: 'Momentum (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
    ],
    autoSuggest: 'track_work',
  },

  // ── Travel Mode ──
  {
    id: 'travel_mode',
    name: 'Travel Mode',
    description: 'Track location, transit, and travel-specific wellness',
    emoji: '✈️',
    category: 'habit',
    fields: [
      { id: 'in_transit', label: 'Traveling Today', type: 'checkbox', default: false },
      { id: 'city_name', label: 'City / Location', type: 'text', default: '' },
      { id: 'steps_travel', label: 'Steps Exploring', type: 'scale', min: 0, max: 30000, step: 500, default: 5000 },
      { id: 'local_food', label: 'Tried Local Food', type: 'checkbox', default: false },
      { id: 'jet_lag_feeling', label: 'Jet Lag (1-5, 1=worst)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'travel_memory', label: 'Highlight of the Day', type: 'text', default: '' },
    ],
  },

  // ── Sleep & Recovery ──
  {
    id: 'sleep_recovery',
    name: 'Sleep & Recovery',
    description: 'Advanced sleep metrics beyond basic quality',
    emoji: '😴',
    category: 'health_extra',
    fields: [
      { id: 'sleep_hours', label: 'Hours Slept', type: 'scale', min: 0, max: 12, step: 0.5, default: 7 },
      { id: 'sleep_quality', label: 'Sleep Quality (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'woke_up_count', label: 'Times Woke Up', type: 'scale', min: 0, max: 10, step: 1, default: 1 },
      { id: 'napped', label: 'Napped Today', type: 'checkbox', default: false },
      { id: 'recovery_activity', label: 'Recovery Activity (sauna, stretch, etc.)', type: 'text', default: '' },
      { id: 'bedtime', label: 'Bedtime (24h, e.g. 23:00)', type: 'text', default: '' },
    ],
    autoSuggest: 'track_health',
  },

  // ── Content & Writing ──
  {
    id: 'content_writing',
    name: 'Content & Writing',
    description: 'Track writing output, content creation, and creative projects',
    emoji: '✍️',
    category: 'content_creation',
    fields: [
      { id: 'words_written', label: 'Words Written', type: 'scale', min: 0, max: 5000, step: 100, default: 0 },
      { id: 'articles_published', label: 'Pieces Published', type: 'scale', min: 0, max: 5, step: 1, default: 0 },
      { id: 'drafting_time_min', label: 'Drafting Time (min)', type: 'scale', min: 0, max: 240, step: 10, default: 0 },
      { id: 'editing_done', label: 'Editing / Revision Done', type: 'checkbox', default: false },
      { id: 'content_quality', label: 'Quality Rating (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'content_topic', label: 'Main Topic Written About', type: 'text', default: '' },
    ],
    autoSuggest: 'track_work',
  },

  // ── Career & Professional Growth ──
  {
    id: 'career_growth',
    name: 'Career & Professional Growth',
    description: 'Networking, skill-building, and career advancement activities',
    emoji: '💼',
    category: 'career',
    fields: [
      { id: 'networking_actions', label: 'Networking Actions (calls, events)', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'learning_new_skill', label: 'Learned a New Professional Skill', type: 'checkbox', default: false },
      { id: 'linkedin_posted', label: 'Posted / Engaged on LinkedIn', type: 'checkbox', default: false },
      { id: 'applied_to_roles', label: 'Applied to Opportunities', type: 'checkbox', default: false },
      { id: 'mentor_interaction', label: 'Mentor / Mentee Interaction', type: 'checkbox', default: false },
      { id: 'career_note', label: 'Career Reflection Note', type: 'text', default: '' },
    ],
    autoSuggest: 'track_work',
  },

  // ── Workspace & Environment ──
  {
    id: 'workspace_env',
    name: 'Workspace & Environment',
    description: 'Track your physical and digital workspace quality',
    emoji: '🖥️',
    category: 'environment',
    fields: [
      { id: 'desk_organized', label: 'Desk / Workspace Organized', type: 'checkbox', default: false },
      { id: 'digital_cleanup', label: 'Digital Cleanup (inbox/files)', type: 'checkbox', default: false },
      { id: 'ergo_posture', label: 'Good Posture / Ergonomics', type: 'checkbox', default: false },
      { id: 'workspace_score', label: 'Workspace Score (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'noise_level', label: 'Noise Level (1=quiet, 5=chaotic)', type: 'scale', min: 1, max: 5, step: 1, default: 2 },
      { id: 'environment_note', label: 'Environment Note', type: 'text', default: '' },
    ],
    autoSuggest: 'track_health',
  },

  // ── Reading & Input Diet ──
  {
    id: 'reading_input',
    name: 'Reading & Input Diet',
    description: 'Track books, articles, podcasts, and video consumption',
    emoji: '📖',
    category: 'habits_extra',
    fields: [
      { id: 'books_reading', label: 'Currently Reading (title)', type: 'text', default: '' },
      { id: 'pages_today', label: 'Pages Read Today', type: 'scale', min: 0, max: 150, step: 5, default: 0 },
      { id: 'articles_read', label: 'Articles / Newsletters Read', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'podcast_min', label: 'Podcast / Audiobook (min)', type: 'scale', min: 0, max: 120, step: 5, default: 0 },
      { id: 'key_takeaway', label: 'Key Takeaway Today', type: 'text', default: '' },
    ],
    autoSuggest: 'track_learning',
  },

  // ── Coding & Technical Work ──
  {
    id: 'coding_dev',
    name: 'Coding & Development',
    description: 'Track coding sessions, PRs, debugging, and technical growth',
    emoji: '💻',
    category: 'work_extra',
    fields: [
      { id: 'coding_min', label: 'Coding Time (min)', type: 'scale', min: 0, max: 480, step: 15, default: 0 },
      { id: 'commits_pushed', label: 'Commits Pushed', type: 'scale', min: 0, max: 30, step: 1, default: 0 },
      { id: 'prs_opened', label: 'PRs Opened / Merged', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'bugs_fixed', label: 'Bugs Squashed', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'learned_tech', label: 'Learned New Tech / API', type: 'checkbox', default: false },
      { id: 'code_reviewed', label: 'Reviewed Someone Else\'s Code', type: 'checkbox', default: false },
      { id: 'project_name_code', label: 'Project Worked On', type: 'text', default: '' },
    ],
    autoSuggest: 'track_work',
  },

  // ── Energy & Bio-rhythm ──
  {
    id: 'energy_biorhythm',
    name: 'Energy & Bio-rhythm',
    description: 'Map your natural energy peaks and troughs throughout the day',
    emoji: '🌊',
    category: 'health_extra',
    fields: [
      { id: 'peak_energy_hour', label: 'Peak Energy Hour (0-23)', type: 'scale', min: 0, max: 23, step: 1, default: 10 },
      { id: 'trough_hour', label: 'Low Energy Hour (0-23)', type: 'scale', min: 0, max: 23, step: 1, default: 14 },
      { id: 'caffeine_afternoon', label: 'Caffeine After 3pm', type: 'checkbox', default: false },
      { id: 'sunlight_30m', label: 'Morning Sunlight (30+ min)', type: 'checkbox', default: false },
      { id: 'eye_strain_breaks', label: 'Took Eye Strain Breaks', type: 'checkbox', default: false },
      { id: 'energy_score_note', label: 'Energy Pattern Note', type: 'text', default: '' },
    ],
    autoSuggest: 'track_health',
  },

  // ── Home & Lifestyle ──
  {
    id: 'home_lifestyle',
    name: 'Home & Lifestyle',
    description: 'Track cooking, chores, errands, and home maintenance',
    emoji: '🏠',
    category: 'habit',
    fields: [
      { id: 'cooked_meal', label: 'Cooked a Meal', type: 'checkbox', default: false },
      { id: 'did_chores', label: 'Completed Chores', type: 'checkbox', default: false },
      { id: 'errands_run', label: 'Errands Run', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'home_projects', label: 'Home Improvement (min)', type: 'scale', min: 0, max: 240, step: 10, default: 0 },
      { id: 'gratitude_home', label: 'Grateful for Home — Note', type: 'text', default: '' },
    ],
  },

  // ── Nutrition & Diet ──
  {
    id: 'nutrition_diet',
    name: 'Nutrition & Diet',
    description: 'Track meals, macros, hydration, and dietary quality',
    emoji: '🥗',
    category: 'nutrition',
    fields: [
      { id: 'meals_count', label: 'Meals Eaten Today', type: 'scale', min: 0, max: 6, step: 1, default: 3 },
      { id: 'protein_servings', label: 'Protein Servings', type: 'scale', min: 0, max: 6, step: 1, default: 2 },
      { id: 'veggie_servings', label: 'Veggie / Fruit Servings', type: 'scale', min: 0, max: 8, step: 1, default: 3 },
      { id: 'water_liters', label: 'Water (liters)', type: 'scale', min: 0, max: 5, step: 0.25, default: 1.5 },
      { id: 'cooked_from_scratch', label: 'Cooked from Scratch', type: 'checkbox', default: false },
      { id: 'ate_mindfully', label: 'Ate Mindfully (no screens)', type: 'checkbox', default: false },
      { id: 'diet_note', label: 'Diet Note / Craving', type: 'text', default: '' },
    ],
    autoSuggest: 'track_health',
  },

  // ── Creative Expression ──
  {
    id: 'creative_expression',
    name: 'Creative Expression',
    description: 'Track art, music, photography, design, and creative flow',
    emoji: '🎨',
    category: 'creativity',
    fields: [
      { id: 'creation_min', label: 'Creative Time (min)', type: 'scale', min: 0, max: 240, step: 10, default: 0 },
      { id: 'creation_type', label: 'Type of Creation', type: 'text', default: '' },
      { id: 'flow_state', label: 'Flow State (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'finished_piece', label: 'Finished / Published a Piece', type: 'checkbox', default: false },
      { id: 'inspired_by', label: 'Inspired By', type: 'text', default: '' },
      { id: 'creative_block', label: 'Facing Creative Block?', type: 'checkbox', default: false },
    ],
    autoSuggest: 'track_work',
  },

  // ── Finance & Investments ──
  {
    id: 'finance_investments',
    name: 'Finance & Investments',
    description: 'Track portfolio moves, market activity, and investment discipline',
    emoji: '📈',
    category: 'finance_invest',
    fields: [
      { id: 'portfolio_check', label: 'Checked Portfolio', type: 'checkbox', default: false },
      { id: 'trades_made', label: 'Trades Made Today', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'research_min', label: 'Research / Reading (min)', type: 'scale', min: 0, max: 120, step: 5, default: 0 },
      { id: 'followed_strategy', label: 'Followed Investment Strategy', type: 'checkbox', default: false },
      { id: 'pnl_feeling', label: 'P&L Feeling (1=rough, 5=great)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'investment_note', label: 'Investment Note / Thesis', type: 'text', default: '' },
    ],
    autoSuggest: 'track_finance',
  },

  // ── Family & Parenting ──
  {
    id: 'family_parenting',
    name: 'Family & Parenting',
    description: 'Track quality family time, parenting wins, and children milestones',
    emoji: '👨‍👩‍👧‍👦',
    category: 'family_parenting',
    fields: [
      { id: 'family_time_min', label: 'Quality Family Time (min)', type: 'scale', min: 0, max: 360, step: 10, default: 0 },
      { id: 'helped_child', label: 'Helped Child Learn / Grow', type: 'checkbox', default: false },
      { id: 'family_meal', label: 'Ate Together as Family', type: 'checkbox', default: false },
      { id: 'screen_free_play', label: 'Screen-Free Play / Quality Time', type: 'checkbox', default: false },
      { id: 'parenting_win', label: 'Parenting Win Today', type: 'checkbox', default: false },
      { id: 'family_note', label: 'Family Moment / Milestone', type: 'text', default: '' },
    ],
    autoSuggest: 'track_social',
  },

  // ── Gaming & Recreation ──
  {
    id: 'gaming_recreation',
    name: 'Gaming & Recreation',
    description: 'Track gaming sessions, hobbies, and recreational downtime',
    emoji: '🎮',
    category: 'habits_extra',
    fields: [
      { id: 'gaming_min', label: 'Total Gaming (min)', type: 'scale', min: 0, max: 360, step: 10, default: 0 },
      { id: 'hobby_time', label: 'Hobby / Recreation (min)', type: 'scale', min: 0, max: 240, step: 10, default: 0 },
      { id: 'played_with_friends', label: 'Played / Hung Out with Friends', type: 'checkbox', default: false },
      { id: 'recreation_balance', label: 'Recreation Balance (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'recreation_note', label: 'What did you do for fun?', type: 'text', default: '' },
    ],
  },

  // ── Pet Care ──
  {
    id: 'pet_care',
    name: 'Pet Care',
    description: 'Track pet care routines — walks, feeding, play, vet visits',
    emoji: '🐾',
    category: 'pets',
    fields: [
      { id: 'walked_pet', label: 'Walked / Exercised Pet', type: 'checkbox', default: false },
      { id: 'fed_pet', label: 'Fed Pet on Schedule', type: 'checkbox', default: false },
      { id: 'play_time_mins', label: 'Play Time (min)', type: 'scale', min: 0, max: 120, step: 1, default: 0 },
      { id: 'vet_appointment', label: 'Had Vet Appointment', type: 'checkbox', default: false },
      { id: 'pet_mood', label: 'Pet Mood (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
    ],
  },

  // ── Event Calendar ──
  {
    id: 'event_calendar',
    name: 'Event Calendar',
    description: 'Track events attended, social energy, and follow-ups',
    emoji: '📅',
    category: 'events',
    fields: [
      { id: 'attended_event', label: 'Attended an Event', type: 'checkbox', default: false },
      { id: 'event_type', label: 'Event Type / Name', type: 'text', default: '' },
      { id: 'prep_time_mins', label: 'Prep Time (min)', type: 'scale', min: 0, max: 120, step: 5, default: 0 },
      { id: 'social_energy_change', label: 'Social Energy Change (-5 to 5)', type: 'scale', min: -5, max: 5, step: 1, default: 0 },
      { id: 'followed_up', label: 'Followed Up After Event', type: 'checkbox', default: false },
    ],
  },

  // ── Travel ──
  {
    id: 'travel',
    name: 'Travel',
    description: 'Track trips, destinations, expenses, and productivity on the road',
    emoji: '✈️',
    category: 'travel',
    fields: [
      { id: 'destination', label: 'Destination', type: 'text', default: '' },
      { id: 'trip_purpose', label: 'Trip Purpose', type: 'text', default: '' },
      { id: 'expenses', label: 'Expenses ($)', type: 'scale', min: 0, max: 10000, step: 10, default: 0 },
      { id: 'cultural_activities', label: 'Did Cultural Activities', type: 'checkbox', default: false },
      { id: 'work_done_on_trip', label: 'Got Work Done on Trip', type: 'checkbox', default: false },
    ],
  },

  // ── Meal Planning ──
  {
    id: 'meal_planning',
    name: 'Meal Planning',
    description: 'Track meal prep, home cooking, veggies, and sugar-free choices',
    emoji: '🍽️',
    category: 'meal_planning',
    fields: [
      { id: 'meal_prepped', label: 'Prepped Meals Ahead', type: 'checkbox', default: false },
      { id: 'home_cooked', label: 'Cooked at Home', type: 'checkbox', default: false },
      { id: 'ate_veggies', label: 'Ate Vegetables', type: 'checkbox', default: false },
      { id: 'meal_cost', label: 'Total Meal Cost ($)', type: 'scale', min: 0, max: 100, step: 1, default: 0 },
      { id: 'soda_sugar_free', label: 'No Soda / Sugar Drinks', type: 'checkbox', default: false },
    ],
  },

  // ── Sleep & Recovery ──
  {
    id: 'sleep_recovery_v2',
    name: 'Sleep & Recovery',
    description: 'Detailed sleep tracking — hours, quality, wake feeling, caffeine cutoff',
    emoji: '😴',
    category: 'sleep_recovery',
    fields: [
      { id: 'sleep_hours', label: 'Hours Slept', type: 'scale', min: 0, max: 12, step: 0.5, default: 7 },
      { id: 'sleep_quality', label: 'Sleep Quality (1-10)', type: 'scale', min: 1, max: 10, step: 1, default: 6 },
      { id: 'wake_up_feeling', label: 'Wake-Up Feeling (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'napped', label: 'Napped Today', type: 'checkbox', default: false },
      { id: 'caffeine_cutoff_time', label: 'Caffeine Cutoff Time', type: 'text', default: '' },
    ],
  },

  // ── Energy & Focus ──
  {
    id: 'energy_focus',
    name: 'Energy & Focus',
    description: 'Map your energy throughout the day and track deep focus sessions',
    emoji: '⚡',
    category: 'energy_focus',
    fields: [
      { id: 'morning_energy', label: 'Morning Energy (1-10)', type: 'scale', min: 1, max: 10, step: 1, default: 5 },
      { id: 'afternoon_energy', label: 'Afternoon Energy (1-10)', type: 'scale', min: 1, max: 10, step: 1, default: 5 },
      { id: 'evening_energy', label: 'Evening Energy (1-10)', type: 'scale', min: 1, max: 10, step: 1, default: 5 },
      { id: 'deep_work_hrs', label: 'Deep Work (hrs)', type: 'scale', min: 0, max: 8, step: 0.5, default: 0 },
      { id: 'focus_block_completed', label: 'Completed a Focus Block', type: 'checkbox', default: false },
    ],
  },

  // ── Reading & Media ──
  {
    id: 'reading_media',
    name: 'Reading & Media',
    description: 'Track reading, audiobooks, podcasts, and documentaries',
    emoji: '📚',
    category: 'media',
    fields: [
      { id: 'pages_read', label: 'Pages Read', type: 'scale', min: 0, max: 200, step: 5, default: 0 },
      { id: 'reading_time_mins', label: 'Reading Time (min)', type: 'scale', min: 0, max: 180, step: 5, default: 0 },
      { id: 'book_title', label: 'Book Title', type: 'text', default: '' },
      { id: 'podcast_episode', label: 'Podcast / Audiobook Episode', type: 'text', default: '' },
      { id: 'watched_documentary', label: 'Watched a Documentary', type: 'checkbox', default: false },
    ],
  },

  // ── Volunteering & Community ──
  {
    id: 'volunteering_community',
    name: 'Volunteering & Community',
    description: 'Log volunteer hours, service type, and organizations you support',
    emoji: '🤝',
    category: 'volunteering',
    fields: [
      { id: 'vol_hours', label: 'Hours Volunteered', type: 'scale', min: 0, max: 24, step: 0.25, default: 0 },
      { id: 'vol_organization', label: 'Organization Name', type: 'text', default: '' },
      { id: 'vol_service_type', label: 'Type of Service', type: 'text', default: '' },
      { id: 'vol_session', label: 'Volunteered Today', type: 'checkbox', default: false },
      { id: 'vol_feeling', label: 'Impact Feeling (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'vol_notes', label: 'Notes / Reflection', type: 'text', default: '' },
    ],
    autoSuggest: 'track_social',
  },

  // ── Home Management ──
  {
    id: 'home_management',
    name: 'Home Management',
    description: 'Track cleaning, laundry, dishes, repairs, and organizing projects',
    emoji: '🏠',
    category: 'home',
    fields: [
      { id: 'cleaned_room', label: 'Cleaned a Room', type: 'checkbox', default: false },
      { id: 'laundry_done', label: 'Laundry Done', type: 'checkbox', default: false },
      { id: 'dishes_done', label: 'Dishes Done', type: 'checkbox', default: false },
      { id: 'home_repair_task', label: 'Home Repair Task Done', type: 'text', default: '' },
      { id: 'organizing_project', label: 'Organizing Project', type: 'text', default: '' },
    ],
  },

  // ── Podcast & Video Creation ──
  {
    id: 'podcast_video_creation',
    name: 'Podcast & Video Creation',
    description: 'Track podcast recording, video production, streaming, and content publishing',
    emoji: '🎙️',
    category: 'content_creation',
    fields: [
      { id: 'recorded_episode', label: 'Recorded a Podcast / Video', type: 'checkbox', default: false },
      { id: 'edited_min', label: 'Editing Time (min)', type: 'scale', min: 0, max: 240, step: 10, default: 0 },
      { id: 'published_episode', label: 'Published / Scheduled Episode', type: 'checkbox', default: false },
      { id: 'audio_video_quality', label: 'Audio/Video Quality (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'guest_or_topic', label: 'Guest / Topic', type: 'text', default: '' },
      { id: 'distribution_done', label: 'Distributed (YouTube, Spotify, etc.)', type: 'checkbox', default: false },
      { id: 'content_note', label: 'Content Note / Ideas', type: 'text', default: '' },
    ],
    autoSuggest: 'track_work',
  },

  // ── Outdoor & Nature Time ──
  {
    id: 'outdoor_nature',
    name: 'Outdoor & Nature Time',
    description: 'Track time outside, nature exposure, vitamin D, and green space quality',
    emoji: '🌿',
    category: 'environment',
    fields: [
      { id: 'outdoor_min', label: 'Time Outside (min)', type: 'scale', min: 0, max: 480, step: 10, default: 0 },
      { id: 'nature_exposure', label: 'Spent Time in Nature / Park', type: 'checkbox', default: false },
      { id: 'sunlight_exposure', label: 'Direct Sunlight (15+ min)', type: 'checkbox', default: false },
      { id: 'walked_outside', label: 'Walked / Exercised Outdoors', type: 'checkbox', default: false },
      { id: 'air_quality', label: 'Air Quality Felt Good', type: 'checkbox', default: false },
      { id: 'nature_note', label: 'Nature / Outdoor Note', type: 'text', default: '' },
    ],
    autoSuggest: 'track_health',
  },

  // ── Morning & Evening Routines ──
  {
    id: 'morning_evening_routine',
    name: 'Morning & Evening Routines',
    description: 'Track your bookend routines — how you start and end each day',
    emoji: '🌅',
    category: 'habit',
    fields: [
      { id: 'woke_up_early', label: 'Woke Up by Target Time', type: 'checkbox', default: false },
      { id: 'morning_stretch', label: 'Morning Stretch / Movement', type: 'checkbox', default: false },
      { id: 'morning_hydration', label: 'Drank Water Right After Wake', type: 'checkbox', default: false },
      { id: 'morning_plan', label: 'Planned the Day Ahead', type: 'checkbox', default: false },
      { id: 'evening_winddown_min', label: 'Evening Wind-Down (min)', type: 'scale', min: 0, max: 120, step: 5, default: 15 },
      { id: 'evening_no_screens', label: 'Screens Off 30m Before Bed', type: 'checkbox', default: false },
      { id: 'set_tomorrow', label: 'Prepped for Tomorrow', type: 'checkbox', default: false },
      { id: 'routine_quality', label: 'Routine Quality (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'routine_note', label: 'Routine Note', type: 'text', default: '' },
    ],
    autoSuggest: 'track_health',
  },

  // ── Digital Minimalism & Tech Hygiene ──
  {
    id: 'digital_minimalism',
    name: 'Digital Minimalism',
    description: 'Track intentional tech use, digital declutter, and screen-life balance',
    emoji: '🧘',
    category: 'digital_minimalism',
    fields: [
      { id: 'phone_free_morning', label: 'No Phone First 30 Min of Day', type: 'checkbox', default: false },
      { id: 'notification_sessions', label: 'Notification Check Sessions', type: 'scale', min: 0, max: 30, step: 1, default: 5 },
      { id: 'social_scroll_min', label: 'Social Media Scroll (min)', type: 'scale', min: 0, max: 180, step: 5, default: 30 },
      { id: 'doomscroll_flag', label: 'Caught Mindless Scrolling', type: 'checkbox', default: false },
      { id: 'digital_declutter', label: 'Unsubscribed / Deleted / Organized', type: 'checkbox', default: false },
      { id: 'phone_free_meal', label: 'Phone-Free Meal', type: 'checkbox', default: false },
      { id: 'grayscale_mode', label: 'Used Grayscale / Focus Mode', type: 'checkbox', default: false },
      { id: 'intention_before_unlock', label: 'Had Intention Before Unlocking', type: 'checkbox', default: false },
      { id: 'digital_note', label: 'Digital Hygiene Note', type: 'text', default: '' },
    ],
    autoSuggest: 'track_health',
  },

  // ── AI & Automation Tracking ──
  {
    id: 'ai_automation',
    name: 'AI & Automation Tracking',
    description: 'Tracks AI tool usage, automation saves, and prompt engineering sessions',
    emoji: '🤖',
    category: 'work_extra',
    fields: [
      { id: 'ai_tools_used', label: 'Used AI Tools Today', type: 'checkbox', default: false },
      { id: 'tools_list', label: 'Which AI Tools Used', type: 'text', default: '' },
      { id: 'prompt_sessions', label: 'Prompt Engineering Sessions', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'automation_saves_hrs', label: 'Hours Saved by Automation', type: 'scale', min: 0, max: 8, step: 0.5, default: 0 },
      { id: 'ai_output_quality', label: 'Output Quality Rating', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'learned_new_ai_skill', label: 'Learned New AI Technique', type: 'checkbox', default: false },
    ],
  },

  // ── Business Metrics ──
  {
    id: 'business_metrics',
    name: 'Business Metrics',
    description: 'Tracks daily business KPIs — revenue, traffic, user signups',
    emoji: '📊',
    category: 'work_extra',
    fields: [
      { id: 'daily_revenue', label: 'Daily Revenue ($)', type: 'scale', min: 0, max: 10000, step: 10, default: 0 },
      { id: 'website_visitors', label: 'Website Visitors', type: 'scale', min: 0, max: 50000, step: 100, default: 0 },
      { id: 'new_signups', label: 'New Signups', type: 'scale', min: 0, max: 1000, step: 1, default: 0 },
      { id: 'key_actions_taken', label: 'Key Business Actions', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'revenue_goal_met', label: 'Met Daily Revenue Goal', type: 'checkbox', default: false },
      { id: 'business_confidence', label: 'Business Confidence (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
      { id: 'business_note', label: 'Business Note / Idea', type: 'text', default: '' },
    ],
  },

  // ── Social Media Management ──
  {
    id: 'social_media',
    name: 'Social Media Management',
    description: 'Tracks social media posting, engagement, growth, and content calendar',
    emoji: '📱',
    category: 'content_creation',
    fields: [
      { id: 'platforms_posted', label: 'Platforms Posted On', type: 'text', default: '' },
      { id: 'posts_created', label: 'Posts Created', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'engagement_rate', label: 'Engagement (%)', type: 'scale', min: 0, max: 100, step: 1, default: 0 },
      { id: 'followers_gained', label: 'Followers Gained', type: 'scale', min: 0, max: 1000, step: 1, default: 0 },
      { id: 'dm_replies', label: 'DMs / Comments Replied To', type: 'scale', min: 0, max: 50, step: 1, default: 0 },
      { id: 'content_calendar_done', label: 'Updated Content Calendar', type: 'checkbox', default: false },
      { id: 'social_note', label: 'Social Media Note', type: 'text', default: '' },
    ],
  },

  // ── Business Operations ──
  {
    id: 'biz_operations',
    name: 'Business Operations',
    description: 'Track solopreneur ops — client work, invoicing, emails, CRM tasks, and project milestones',
    emoji: '⚙️',
    category: 'biz_ops',
    fields: [
      { id: 'client_work_hrs', label: 'Client Work (hrs)', type: 'scale', min: 0, max: 12, step: 0.5, default: 0 },
      { id: 'invoices_sent', label: 'Invoices Sent', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'crm_updated', label: 'Updated CRM / Leads', type: 'checkbox', default: false },
      { id: 'email_inbox_zero', label: 'Inbox Zero / Processed', type: 'checkbox', default: false },
      { id: 'project_milestones', label: 'Project Milestones Hit', type: 'scale', min: 0, max: 5, step: 1, default: 0 },
      { id: 'biz_ops_blocker', label: 'Biggest Blocker Today', type: 'text', default: '' },
      { id: 'biz_ops_score', label: 'Ops Smoothness (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
    ],
    autoSuggest: 'track_work',
  },

  // ── Content Marketing ──
  {
    id: 'content_marketing',
    name: 'Content Marketing',
    description: 'Track content distribution, SEO performance, email marketing, and lead generation',
    emoji: '📢',
    category: 'content_marketing',
    fields: [
      { id: 'content_pieces_distributed', label: 'Content Pieces Distributed', type: 'scale', min: 0, max: 10, step: 1, default: 0 },
      { id: 'email_sent_campaign', label: 'Sent Email Campaign', type: 'checkbox', default: false },
      { id: 'seo_keyword_optimized', label: 'SEO Keywords Optimized', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'traffic_generated', label: 'Referral Traffic (visitors)', type: 'scale', min: 0, max: 10000, step: 50, default: 0 },
      { id: 'new_backlinks', label: 'New Backlinks Earned', type: 'scale', min: 0, max: 50, step: 1, default: 0 },
      { id: 'social_crosspost', label: 'Crossposted to Social', type: 'checkbox', default: false },
      { id: 'content_marketing_note', label: 'Content Marketing Note / Idea', type: 'text', default: '' },
    ],
    autoSuggest: 'track_work',
  },

  // ── Local SEO ──
  {
    id: 'local_seo',
    name: 'Local SEO',
    description: 'Track Google Business Profile, local citations, reviews, and local ranking',
    emoji: '📍',
    category: 'local_seo',
    fields: [
      { id: 'gbp_posted', label: 'Posted to Google Business Profile', type: 'checkbox', default: false },
      { id: 'reviews_responded', label: 'Reviews Responded To', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'local_citations', label: 'Local Citations Created/Updated', type: 'scale', min: 0, max: 20, step: 1, default: 0 },
      { id: 'local_keywords_tracked', label: 'Local Keywords Tracked', type: 'scale', min: 0, max: 50, step: 1, default: 0 },
      { id: 'maps_ranking', label: 'Maps Ranking (1=top, 20=bottom)', type: 'scale', min: 1, max: 20, step: 1, default: 10 },
      { id: 'photo_gbp', label: 'Added Photo to GBP Listing', type: 'checkbox', default: false },
      { id: 'local_seo_note', label: 'Local SEO Note / Wins', type: 'text', default: '' },
      { id: 'local_seo_effort', label: 'Local SEO Effort (1-5)', type: 'scale', min: 1, max: 5, step: 1, default: 3 },
    ],
    autoSuggest: 'track_work',
  },
];

/** Active plugins (user-selected). Stored in localStorage. */
const PLUGIN_ACTIVE_KEY = 'lifeos_active_plugins';
const PLUGIN_ORDER_KEY = 'lifeos_plugin_order';

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

export function loadPluginOrder(): string[] {
  try {
    const raw = localStorage.getItem(PLUGIN_ORDER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePluginOrder(ids: string[]) {
  localStorage.setItem(PLUGIN_ORDER_KEY, JSON.stringify(ids));
}

export function getActivePluginDefs(): PluginDef[] {
  const active = loadActivePlugins();
  const order = loadPluginOrder();
  // Respect custom ordering; fall back to BUILTIN_PLUGINS order for plugins not in the order list
  const ordered = order.filter((id) => active.includes(id));
  const remaining = active.filter((id) => !ordered.includes(id));
  const allInOrder = [...ordered, ...remaining];
  return allInOrder
    .map((id) => BUILTIN_PLUGINS.find((p) => p.id === id))
    .filter((p): p is PluginDef => p !== undefined);
}
