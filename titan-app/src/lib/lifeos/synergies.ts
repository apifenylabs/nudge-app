/**
 * LifeOS Cross-Plugin Synergy Engine
 *
 * Maps relationships between LifeOS plugins — completing tasks in one plugin
 * unlocks bonuses, suggestions, and XP multipliers in related plugins.
 *
 * This turns LifeOS from a collection of isolated self-improvement playbooks
 * into a connected system where every action reverberates.
 *
 * USAGE:
 *   getSynergiesFor(category)         → direct synergy partners
 *   getCrossPluginSuggestions(plugin) → task recommendations from partner plugins
 *   computeXpBonus(plugins)           → total XP multiplier from active synergies
 *   getPluginClusters()               → all synergy groups for the UI
 */

import type { LifeCategory, LifeOSPlugin, PluginPhase, PhaseTask } from './plugins';
import { getAvailableCategories } from './plugins';

// ─── Synergy Definitions ────────────────────────────────────────────────

export interface Synergy {
  /** Plugin A */
  source: LifeCategory;
  /** Plugin B (the partner) */
  target: LifeCategory;
  /** How they connect (for UI display) */
  label: string;
  /** Description of the cross-benefit */
  description: string;
  /** XP multiplier when BOTH plugins have at least one task completed */
  xpMultiplier: number;
  /** Cross-plugin suggestions: when a task in source is done, suggest task in target */
  crossSuggestions: CrossSuggestion[];
}

export interface CrossSuggestion {
  /** Phase in the target plugin to suggest */
  targetPhase: PluginPhase;
  /** Task label in the target plugin — matched by prefix/substring */
  targetTaskLabel: string;
  /** Message shown to the user */
  message: string;
  /** Minimum progress (0-100) needed in source plugin to show this */
  requireSourceProgress: number;
}

export interface SynergyCluster {
  name: string;
  emoji: string;
  description: string;
  categories: LifeCategory[];
  synergies: { a: LifeCategory; b: LifeCategory }[];
}

export interface SynergyClusterWithStatus extends SynergyCluster {
  activeCategories: LifeCategory[];
  inactiveCategories: LifeCategory[];
  progress: number;
}

// ─── Synergy Registry ───────────────────────────────────────────────────

const SYNERGIES: Synergy[] = [
  // ── Health & Fitness (body axis) ──
  {
    source: 'health',
    target: 'fitness',
    label: 'Body-Mind Loop',
    description: 'Health tracking feeds fitness insights. Knowing your biomarkers makes workouts smarter.',
    xpMultiplier: 1.25,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Assess current fitness', message: 'Health OS says your biomarkers are logged — use them to set baseline fitness metrics.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Set up tracking system', message: 'Your Health OS record has baseline data — connect it to your fitness tracker for a unified dashboard.', requireSourceProgress: 40 },
      { targetPhase: 'maintain', targetTaskLabel: 'Track habit consistency', message: 'Health OS has been tracking your wellness metrics — cross-reference with fitness habit consistency for deeper insights.', requireSourceProgress: 60 },
    ],
  },
  {
    source: 'fitness',
    target: 'health',
    label: 'Body-Mind Loop',
    description: 'Workout data enriches health records. Performance trends reveal wellness patterns.',
    xpMultiplier: 1.25,
    crossSuggestions: [
      { targetPhase: 'build', targetTaskLabel: 'Connect wearables', message: 'Your Fitness OS has workout data — sync wearables to Health OS for full-body analytics.', requireSourceProgress: 20 },
      { targetPhase: 'maintain', targetTaskLabel: 'Monthly metric report', message: 'Cross-reference your fitness performance with health metrics — are recovery and gains correlated?', requireSourceProgress: 60 },
    ],
  },

  // ── Finance & Career (ambition axis) ──
  {
    source: 'finance',
    target: 'career',
    label: 'Wealth-Work Flywheel',
    description: 'Career growth accelerates income. Financial clarity reveals which work investments pay off.',
    xpMultiplier: 1.3,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Benchmark salary expectations', message: 'Your Finance OS knows your current numbers — benchmark them against market ranges now.', requireSourceProgress: 10 },
      { targetPhase: 'ship', targetTaskLabel: 'Negotiate offers', message: 'Finance OS shows your runway and savings — use that leverage in offer negotiations.', requireSourceProgress: 40 },
      { targetPhase: 'maintain', targetTaskLabel: 'Track wins and impact', message: 'Document career achievements in Finance OS context — they justify your next raise or promotion.', requireSourceProgress: 50 },
    ],
  },
  {
    source: 'career',
    target: 'finance',
    label: 'Wealth-Work Flywheel',
    description: 'Career income flows into financial systems. Better earnings enable bigger financial goals.',
    xpMultiplier: 1.3,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Set financial goals', message: 'Your Career OS shows your earning trajectory — set financial goals that match your growth path.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Set up auto-savings', message: 'New income from career growth? Automate savings before lifestyle inflation catches up.', requireSourceProgress: 40 },
    ],
  },

  // ── Travel & Luxury Travel (exploration axis) ──
  {
    source: 'travel',
    target: 'luxury-travel',
    label: 'Upgrade Path',
    description: 'Travel experience is the foundation. Luxury OS adds the VIP layer to your journeys.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Define luxury criteria', message: 'From your Travel OS itinerary, what moments would you upgrade if budget were no object?', requireSourceProgress: 30 },
      { targetPhase: 'ship', targetTaskLabel: 'Arrange arrival logistics', message: 'Your Travel OS trip is planned — add VIP arrival logistics through Luxury OS.', requireSourceProgress: 60 },
    ],
  },
  {
    source: 'luxury-travel',
    target: 'travel',
    label: 'Upgrade Path',
    description: 'Luxury experiences set new standards. Travel OS absorbs those standards into every trip.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Estimate budget', message: 'Your Luxury OS experience shows what premium costs — apply those lessons to realistic travel budgeting.', requireSourceProgress: 20 },
    ],
  },

  // ── Family & Kids (home axis) ──
  {
    source: 'family',
    target: 'kids',
    label: 'Family Ecosystem',
    description: 'Family OS coordinates the household. Kids OS handles the younger members specifically.',
    xpMultiplier: 1.25,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Map daily routines', message: 'Family OS mapped household routines — now overlay the kids-specific schedule for full clarity.', requireSourceProgress: 30 },
      { targetPhase: 'maintain', targetTaskLabel: 'Rotate chore assignments', message: 'Your Family OS chore system is running — adapt it with age-appropriate tasks from Kids OS.', requireSourceProgress: 60 },
    ],
  },
  {
    source: 'kids',
    target: 'family',
    label: 'Family Ecosystem',
    description: 'Children thrive when the whole family system supports them.',
    xpMultiplier: 1.25,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Design shared calendar', message: 'Kids OS has enrichment activities mapped — merge them into the Family shared calendar.', requireSourceProgress: 30 },
      { targetPhase: 'build', targetTaskLabel: 'Set up shared calendar', message: 'Kids activity schedule is ready — add it to the Family OS master calendar for full visibility.', requireSourceProgress: 50 },
    ],
  },

  // ── Senior & Health (care axis) ──
  {
    source: 'senior',
    target: 'health',
    label: 'Care Continuum',
    description: 'Senior care is deeply health-driven. Health OS provides the data backbone for care decisions.',
    xpMultiplier: 1.3,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Compile health history', message: 'Senior OS collected health records — use them as the foundation for your Health OS baseline.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Create health records vault', message: 'Senior OS has medical history — digitize and vault it through your Health OS.', requireSourceProgress: 40 },
    ],
  },
  {
    source: 'health',
    target: 'senior',
    label: 'Care Continuum',
    description: 'Health awareness improves senior care quality and prevention.',
    xpMultiplier: 1.3,
    crossSuggestions: [
      { targetPhase: 'build', targetTaskLabel: 'Set up medication reminders', message: 'Health OS can extend medication tracking to cover all family seniors. Extend the system.', requireSourceProgress: 40 },
    ],
  },

  // ── Learning & Career (growth axis) ──
  {
    source: 'learning',
    target: 'career',
    label: 'Skill-to-Income Pipeline',
    description: 'Learning builds skills. Career OS converts skills into income and advancement.',
    xpMultiplier: 1.35,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Audit current skills', message: 'Your Learning OS curriculum is growing — what new skills are ready for career application?', requireSourceProgress: 25 },
      { targetPhase: 'build', targetTaskLabel: 'Create portfolio projects', message: 'Learning OS completions deserve portfolio projects — build one that demonstrates your new skills.', requireSourceProgress: 50 },
      { targetPhase: 'ship', targetTaskLabel: 'Apply to target roles', message: 'Learning OS milestones completed — you have new credentials. Apply to roles that require them.', requireSourceProgress: 70 },
    ],
  },
  {
    source: 'career',
    target: 'learning',
    label: 'Skill-to-Income Pipeline',
    description: 'Career gaps reveal learning priorities. Real work shows exactly what to study next.',
    xpMultiplier: 1.35,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Define learning goals', message: 'Your Career OS goals reveal skill gaps — define learning goals that close them.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Begin core curriculum', message: 'Career roadmap says you need X skill — start learning it now with a focused curriculum.', requireSourceProgress: 40 },
    ],
  },

  // ── Mindfulness & Spirituality (inner axis) ──
  {
    source: 'mindfulness',
    target: 'spirituality',
    label: 'Inner Journey',
    description: 'Mindfulness is the practice. Spirituality is the meaning layer built on top.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Define what spirituality means to you', message: 'Your mindfulness practice has built awareness — now explore what spirituality means for your inner life.', requireSourceProgress: 30 },
      { targetPhase: 'build', targetTaskLabel: 'Start daily spiritual log', message: 'Your mindfulness journal is running — extend it into a spiritual log that captures insights and gratitude.', requireSourceProgress: 50 },
    ],
  },
  {
    source: 'spirituality',
    target: 'mindfulness',
    label: 'Inner Journey',
    description: 'Spiritual insights deepen mindfulness. Purpose awareness enriches every present moment.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'build', targetTaskLabel: 'Set up meditation tracker', message: 'Your spiritual practice includes meditation — start tracking sessions to build consistency.', requireSourceProgress: 20 },
    ],
  },

  // ── Social & Career (network axis) ──
  {
    source: 'social',
    target: 'career',
    label: 'Network Capital',
    description: 'Social connections are career accelerators. Strong networks open doors. ',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Plan networking strategy', message: 'Social OS has your personal network active — extend it to your professional network for career growth.', requireSourceProgress: 25 },
      { targetPhase: 'ship', targetTaskLabel: 'Ask for referrals', message: 'Social OS has reconnected you with your network — warm referrals are the highest-conversion job applications.', requireSourceProgress: 50 },
    ],
  },
  {
    source: 'career',
    target: 'social',
    label: 'Network Capital',
    description: 'Career progress introduces you to new people. Professional growth feeds your social ecosystem.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'maintain', targetTaskLabel: 'Quarterly network expansion', message: 'Your career has connected you with new people — add them to your social contact CRM.', requireSourceProgress: 30 },
    ],
  },

  // ── Business & Finance (enterprise axis) ──
  {
    source: 'business',
    target: 'finance',
    label: 'Enterprise Engine',
    description: 'Business operations generate financial data. Finance OS tracks and optimizes the money flow.',
    xpMultiplier: 1.35,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Audit current finances', message: 'Your Business OS shows operational spend — audit personal finances with the same rigor.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Set up auto-savings', message: 'Business cash flow is tracking — set up automated personal savings from business distributions.', requireSourceProgress: 40 },
    ],
  },
  {
    source: 'finance',
    target: 'business',
    label: 'Enterprise Engine',
    description: 'Financial clarity improves business decisions. Healthy personal finances fund business growth.',
    xpMultiplier: 1.35,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Review financial health', message: 'Your personal finance snapshot is clear — apply the same analysis to business financial health.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Set up OKR tracking tool', message: 'Personal financial OKRs are working — extend OKR tracking to business metrics.', requireSourceProgress: 50 },
    ],
  },

  // ── Hobbies & Learning (creative axis) ──
  {
    source: 'hobbies',
    target: 'learning',
    label: 'Creative Learning Loop',
    description: 'Hobbies make learning fun. Learning makes hobbies deeper and more rewarding.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Curate learning resources', message: 'Your hobby has sparked curiosity — find high-quality learning resources to deepen your skill.', requireSourceProgress: 20 },
      { targetPhase: 'ship', targetTaskLabel: 'Share knowledge', message: 'Your hobby project is complete — write a post, teach a friend, or share what you built.', requireSourceProgress: 50 },
    ],
  },
  {
    source: 'learning',
    target: 'hobbies',
    label: 'Creative Learning Loop',
    description: 'Learning frameworks make hobby growth systematic and measurable.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Plan skill progression path', message: 'Your Learning OS has a progression framework — apply milestones to your hobby development.', requireSourceProgress: 30 },
    ],
  },

  // ── Home & Family (domestic axis) ──
  {
    source: 'home',
    target: 'family',
    label: 'Domestic Harmony',
    description: 'Home maintenance and family life are inseparable. Smooth home ops = happier family.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Plan meal schedule', message: 'Home OS has kitchen inventory — plan a weekly meal schedule that uses what you have.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Set up shared calendar', message: 'Home maintenance schedule is set — overlay family events on the same calendar.', requireSourceProgress: 40 },
    ],
  },
  {
    source: 'family',
    target: 'home',
    label: 'Domestic Harmony',
    description: 'A well-run family keeps the home in good order naturally.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Design cleaning schedule', message: 'Family OS has chore assignments — create a home cleaning schedule that syncs with family routines.', requireSourceProgress: 30 },
    ],
  },

  // ── EV & Travel (mobility axis) ──
  {
    source: 'ev',
    target: 'travel',
    label: 'Electric Mobility',
    description: 'EV ownership transforms how you travel. Route planning, charging stops, and green travel align.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Set destination criteria', message: 'Your EV OS knows your range and charging network — filter destinations by EV accessibility.', requireSourceProgress: 20 },
      { targetPhase: 'build', targetTaskLabel: 'Build route library', message: 'Your Travel OS itinerary can incorporate EV charging stops — blend them into route planning.', requireSourceProgress: 40 },
    ],
  },
  {
    source: 'travel',
    target: 'ev',
    label: 'Electric Mobility',
    description: 'Travel planning reveals optimal EV routes and charging strategies.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Plan optimal routes', message: 'Your Travel OS knows where you go most — plan optimal EV charging routes for those destinations.', requireSourceProgress: 25 },
    ],
  },

  // ── Relationships & Social (connection axis) ──
  {
    source: 'relationships',
    target: 'social',
    label: 'Connection Web',
    description: 'Deep relationships anchor a healthy social life. Strong bonds make socializing meaningful.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'canvas', targetTaskLabel: 'Build recurring events', message: 'Your key relationships are mapped — create recurring events that deepen those connections.', requireSourceProgress: 25 },
      { targetPhase: 'ship', targetTaskLabel: 'Send gratitude messages', message: 'Relationships OS shows who matters most — send them a genuine thank-you message.', requireSourceProgress: 50 },
    ],
  },
  {
    source: 'social',
    target: 'relationships',
    label: 'Connection Web',
    description: 'Your social network is the soil in which deep relationships grow.',
    xpMultiplier: 1.2,
    crossSuggestions: [
      { targetPhase: 'research', targetTaskLabel: 'Identify relationship patterns', message: 'Your Social OS network map helps identify which connections deserve deeper cultivation.', requireSourceProgress: 20 },
      { targetPhase: 'maintain', targetTaskLabel: 'Nurture core relationships', message: 'Social OS has you meeting new people — nurture your top 5 personal relationships with the same intention.', requireSourceProgress: 40 },
    ],
  },
];

// ─── Clusters ───────────────────────────────────────────────────────────

export const SYNERGY_CLUSTERS: SynergyCluster[] = [
  {
    name: 'Body & Wellness',
    emoji: '💪',
    description: 'Health, fitness, mindfulness, and spirituality — your physical and inner wellbeing.',
    categories: ['health', 'fitness', 'mindfulness', 'spirituality'],
    synergies: [
      { a: 'health', b: 'fitness' },
      { a: 'mindfulness', b: 'spirituality' },
      { a: 'health', b: 'mindfulness' },
    ],
  },
  {
    name: 'Wealth & Work',
    emoji: '💰',
    description: 'Finance, career, business — building your economic future.',
    categories: ['finance', 'career', 'business'],
    synergies: [
      { a: 'finance', b: 'career' },
      { a: 'finance', b: 'business' },
      { a: 'career', b: 'business' },
    ],
  },
  {
    name: 'Home & Family',
    emoji: '🏠',
    description: 'Family, kids, senior, home — the heart of daily life.',
    categories: ['family', 'kids', 'senior', 'home'],
    synergies: [
      { a: 'family', b: 'kids' },
      { a: 'family', b: 'home' },
      { a: 'senior', b: 'health' },
    ],
  },
  {
    name: 'Exploration & Travel',
    emoji: '✈️',
    description: 'Travel, luxury travel, EV — movement and discovery.',
    categories: ['travel', 'luxury-travel', 'ev'],
    synergies: [
      { a: 'travel', b: 'luxury-travel' },
      { a: 'travel', b: 'ev' },
    ],
  },
  {
    name: 'Growth & Learning',
    emoji: '📚',
    description: 'Learning, career, hobbies — skill building and creative expression.',
    categories: ['learning', 'career', 'hobbies'],
    synergies: [
      { a: 'learning', b: 'career' },
      { a: 'learning', b: 'hobbies' },
    ],
  },
  {
    name: 'Connection & Community',
    emoji: '🤝',
    description: 'Social, relationships — the people in your life.',
    categories: ['social', 'relationships'],
    synergies: [
      { a: 'social', b: 'relationships' },
      { a: 'social', b: 'career' },
    ],
  },
];

// ─── Public API ─────────────────────────────────────────────────────────

/**
 * Get all synergies where the given category is the source.
 */
export function getSynergiesFor(category: LifeCategory): Synergy[] {
  return SYNERGIES.filter(s => s.source === category);
}

/**
 * Get all synergies that involve a given category (as source or target).
 */
export function getConnectedSynergies(category: LifeCategory): Synergy[] {
  return SYNERGIES.filter(s => s.source === category || s.target === category);
}

/**
 * Get all unique category partners for a given category.
 */
export function getSynergyPartners(category: LifeCategory): LifeCategory[] {
  const partners = new Set<LifeCategory>();
  for (const s of SYNERGIES) {
    if (s.source === category) partners.add(s.target);
    if (s.target === category) partners.add(s.source);
  }
  return Array.from(partners);
}

/**
 * Get cross-plugin suggestions for a plugin — tasks in partner plugins
 * that become actionable based on current progress.
 */
export function getCrossPluginSuggestions(plugin: LifeOSPlugin): {
  targetCategory: LifeCategory;
  targetPluginName: string;
  targetPluginEmoji: string;
  suggestions: CrossSuggestion[];
  synergyLabel: string;
}[] {
  const result: {
    targetCategory: LifeCategory;
    targetPluginName: string;
    targetPluginEmoji: string;
    suggestions: CrossSuggestion[];
    synergyLabel: string;
  }[] = [];

  const synergiesAsSource = SYNERGIES.filter(s => s.source === plugin.category);
  
  for (const synergy of synergiesAsSource) {
    const validSuggestions = synergy.crossSuggestions.filter(
      s => plugin.overallProgress >= s.requireSourceProgress
    );

    if (validSuggestions.length > 0) {
      // Get target plugin info from the full definitions
      const targetDef = getAvailableCategories().find(c => c.category === synergy.target);
      
      result.push({
        targetCategory: synergy.target,
        targetPluginName: targetDef?.name || synergy.target,
        targetPluginEmoji: targetDef?.emoji || '🔗',
        suggestions: validSuggestions,
        synergyLabel: synergy.label,
      });
    }
  }

  return result;
}

/**
 * Compute the total XP multiplier for a set of active plugins.
 * Each active synergy pair adds its multiplier (1.0 = no bonus).
 * Returns the combined multiplier.
 *
 * Example: 2 active synergies with 1.25 and 1.3 → base * 1.25 * 1.3
 */
export function computeXpMultiplier(plugins: LifeOSPlugin[]): number {
  const activeCategories = new Set(plugins.map(p => p.category));
  // A synergy is "active" if both source and target have at least one completed task
  const activeSynergies = SYNERGIES.filter(s => {
    if (!activeCategories.has(s.source) || !activeCategories.has(s.target)) return false;
    const sourcePlugin = plugins.find(p => p.category === s.source);
    const targetPlugin = plugins.find(p => p.category === s.target);
    if (!sourcePlugin || !targetPlugin) return false;
    const sourceTasks = sourcePlugin.phases.flatMap(p => p.tasks);
    const targetTasks = targetPlugin.phases.flatMap(p => p.tasks);
    return sourceTasks.some(t => t.done) && targetTasks.some(t => t.done);
  });

  if (activeSynergies.length === 0) return 1.0;

  // Multiply all active synergy multipliers
  return activeSynergies.reduce((acc, s) => acc * s.xpMultiplier, 1.0);
}

/**
 * Get active synergies (both source and target have completed tasks).
 */
export function getActiveSynergies(plugins: LifeOSPlugin[]): Synergy[] {
  const pluginMap = new Map(plugins.map(p => [p.category, p]));

  return SYNERGIES.filter(s => {
    const src = pluginMap.get(s.source);
    const tgt = pluginMap.get(s.target);
    if (!src || !tgt) return false;
    const srcDone = src.phases.flatMap(p => p.tasks).some(t => t.done);
    const tgtDone = tgt.phases.flatMap(p => p.tasks).some(t => t.done);
    return srcDone && tgtDone;
  });
}

/**
 * Get all synergy clusters with their active status based on current plugins.
 */
export function getClusterStatus(plugins: LifeOSPlugin[]): SynergyClusterWithStatus[] {
  const activeCategories = new Set(plugins.map(p => p.category));

  return SYNERGY_CLUSTERS.map(cluster => {
    const activeCats = cluster.categories.filter(c => activeCategories.has(c));
    const inactiveCats = cluster.categories.filter(c => !activeCategories.has(c));
    const progress = cluster.categories.length > 0
      ? Math.round((activeCats.length / cluster.categories.length) * 100)
      : 0;

    return {
      ...cluster,
      activeCategories: activeCats,
      inactiveCategories: inactiveCats,
      progress,
    };
  });
}

/**
 * Get total number of defined synergies.
 */
export function getTotalSynergies(): number {
  return SYNERGIES.length;
}

/**
 * Get all synergies that are "unlocked" as recommendations
 * (user has one but not the other plugin active).
 */
export function getRecommendedSynergies(plugins: LifeOSPlugin[]): Synergy[] {
  const activeCategories = new Set(plugins.map(p => p.category));

  return SYNERGIES.filter(s => {
    const hasSource = activeCategories.has(s.source);
    const hasTarget = activeCategories.has(s.target);
    // XOR: user has one but not the other
    return hasSource !== hasTarget;
  });
}
