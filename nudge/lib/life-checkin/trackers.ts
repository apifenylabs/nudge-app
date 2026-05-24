export interface TrackerOption {
  v: number;
  l: string;
}

export interface TrackerDef {
  id: string;
  label: string;
  options: TrackerOption[];
  def: number;
}

export const TRACKERS: TrackerDef[] = [
  { id: 'sleep',       label: '😴 Sleep',        options: [{ v: 1, l: '<6h' }, { v: 2, l: '6-7h' }, { v: 3, l: '7-8h' }, { v: 4, l: '8+' }], def: 2 },
  { id: 'mood',        label: '😊 Mood',         options: [{ v: 1, l: 'Bad' }, { v: 2, l: 'Meh' }, { v: 3, l: 'Good' }, { v: 4, l: 'Great' }], def: 2 },
  { id: 'energy',      label: '⚡ Energy',       options: [{ v: 1, l: 'Low' }, { v: 2, l: 'OK' }, { v: 3, l: 'High' }, { v: 4, l: 'Max' }], def: 2 },
  { id: 'exercise',    label: '🏃 Exercise',     options: [{ v: 0, l: 'None' }, { v: 1, l: 'Light' }, { v: 2, l: 'Good' }, { v: 3, l: 'Intense' }], def: 0 },
  { id: 'food',        label: '🥗 Nutrition',    options: [{ v: 0, l: 'Junk' }, { v: 1, l: 'OK' }, { v: 2, l: 'Good' }, { v: 3, l: 'Perfect' }], def: 1 },
  { id: 'productivity', label: '🎯 Productivity', options: [{ v: 0, l: 'Slacked' }, { v: 1, l: 'Light' }, { v: 2, l: 'Focused' }, { v: 3, l: 'Crushed' }], def: 1 },
  { id: 'social',      label: '💬 Social',       options: [{ v: 0, l: 'Isolated' }, { v: 1, l: 'Minimal' }, { v: 2, l: 'Connected' }, { v: 3, l: 'Great' }], def: 1 },
  { id: 'mindfulness', label: '🧘 Mindfulness',  options: [{ v: 0, l: 'None' }, { v: 1, l: 'Brief' }, { v: 2, l: 'Meditated' }, { v: 3, l: 'Deep session' }], def: 0 },
  { id: 'work',        label: '💼 Work quality', options: [{ v: 0, l: 'Bad' }, { v: 1, l: 'OK' }, { v: 2, l: 'Good' }, { v: 3, l: 'Excellent' }], def: 1 },
  { id: 'learning',    label: '📚 Learning',     options: [{ v: 0, l: 'None' }, { v: 1, l: 'Brief' }, { v: 2, l: 'Studied' }, { v: 3, l: 'Deep dive' }], def: 0 },
  { id: 'finance',     label: '💰 Finance',      options: [{ v: 0, l: 'Spent' }, { v: 1, l: 'OK' }, { v: 2, l: 'Saved' }, { v: 3, l: 'Budget on track' }], def: 1 },
  { id: 'homecare',    label: '🧹 Home care',    options: [{ v: 0, l: 'Mess' }, { v: 1, l: 'OK' }, { v: 2, l: 'Clean' }, { v: 3, l: 'Spotless' }], def: 1 },
  { id: 'creativity',  label: '🎨 Creativity',   options: [{ v: 0, l: 'None' }, { v: 1, l: 'Brief' }, { v: 2, l: 'Created' }, { v: 3, l: 'Masterpiece' }], def: 0 },
];
