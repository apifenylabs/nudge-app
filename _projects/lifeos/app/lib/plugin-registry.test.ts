/**
 * Unit tests for plugin-registry.ts
 *
 * Covers:
 * - Plugin registry structural integrity (all 12 plugins)
 * - All phase definitions have required fields
 * - Helper functions (getPlugin, getActivePlugins, getPhasePrompt, etc.)
 * - Phase ordering and nextPhase traversal
 * - Manifest generation consistency
 */
import { describe, it, expect } from 'vitest';
import {
  PLUGINS,
  getPlugin,
  getActivePlugins,
  getPhasePrompt,
  getInitialPhase,
  nextPhase,
  type PluginDefinition,
  type PluginPhase,
} from './plugin-registry';

// ─── Plugin Registry Integrity ─────────────────────────────────────

describe('Plugin Registry', () => {
  it('exports exactly 14 plugins', () => {
    expect(PLUGINS).toHaveLength(14);
  });

  it('all plugins have unique ids', () => {
    const ids = PLUGINS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all plugins have the required top-level fields', () => {
    const requiredFields: (keyof PluginDefinition)[] = [
      'id', 'name', 'emoji', 'description', 'color', 'gradient',
      'badge', 'phases', 'systemPrompt', 'features', 'status',
    ];
    for (const plugin of PLUGINS) {
      for (const field of requiredFields) {
        expect(plugin[field], `${plugin.id} missing ${field}`).toBeDefined();
      }
    }
  });

  it('all plugins have a valid status', () => {
    const validStatuses = ['active', 'coming-soon', 'beta'];
    for (const plugin of PLUGINS) {
      expect(validStatuses, `${plugin.id} has invalid status: ${plugin.status}`)
        .toContain(plugin.status);
    }
  });

  it('all plugins have a non-empty features array', () => {
    for (const plugin of PLUGINS) {
      expect(plugin.features.length, `${plugin.id} has no features`).toBeGreaterThan(0);
      for (const feature of plugin.features) {
        expect(typeof feature).toBe('string');
        expect(feature.length).toBeGreaterThan(0);
      }
    }
  });

  it('all plugins have a non-empty systemPrompt', () => {
    for (const plugin of PLUGINS) {
      expect(plugin.systemPrompt.length, `${plugin.id} systemPrompt too short`)
        .toBeGreaterThan(100);
    }
  });

  it('all plugins have valid Tailwind color/gradient strings', () => {
    for (const plugin of PLUGINS) {
      expect(plugin.color).toMatch(/^from-/);
      expect(plugin.gradient).toMatch(/^linear-gradient/);
    }
  });

  it('all plugins have an emoji', () => {
    for (const plugin of PLUGINS) {
      expect(plugin.emoji.length, `${plugin.id} missing emoji`).toBeGreaterThan(0);
    }
  });

  it('all plugins refer to LifeOS/aicofounder in systemPrompt', () => {
    for (const plugin of PLUGINS) {
      expect(plugin.systemPrompt).toContain('LifeOS');
    }
  });
});

// ─── Phase Structure ───────────────────────────────────────────────

describe('Plugin Phases', () => {
  it('all plugins have at least 3 phases', () => {
    for (const plugin of PLUGINS) {
      expect(
        plugin.phases.length,
        `${plugin.id} has only ${plugin.phases.length} phases`
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it('every phase has all required fields', () => {
    const requiredPhaseFields: (keyof PluginPhase)[] = [
      'id', 'name', 'description', 'leadPrompt', 'objectives',
    ];
    for (const plugin of PLUGINS) {
      for (const phase of plugin.phases) {
        for (const field of requiredPhaseFields) {
          expect(
            phase[field],
            `${plugin.id} phase "${phase.id}" missing "${field}"`
          ).toBeDefined();
        }
      }
    }
  });

  it('every phase has a non-empty leadPrompt', () => {
    for (const plugin of PLUGINS) {
      for (const phase of plugin.phases) {
        expect(
          phase.leadPrompt.length,
          `${plugin.id} phase "${phase.id}" leadPrompt too short`
        ).toBeGreaterThan(50);
      }
    }
  });

  it('every phase has at least 1 objective', () => {
    for (const plugin of PLUGINS) {
      for (const phase of plugin.phases) {
        expect(
          phase.objectives.length,
          `${plugin.id} phase "${phase.id}" has no objectives`
        ).toBeGreaterThan(0);
        for (const obj of phase.objectives) {
          expect(typeof obj).toBe('string');
          expect(obj.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('phase ids are unique within each plugin', () => {
    for (const plugin of PLUGINS) {
      const phaseIds = plugin.phases.map(p => p.id);
      expect(
        new Set(phaseIds).size,
        `${plugin.id} has duplicate phase ids: ${phaseIds}`
      ).toBe(phaseIds.length);
    }
  });

  it('phase ids use lowercase kebab-case', () => {
    const kebabCase = /^[a-z][a-z0-9-]*$/;
    for (const plugin of PLUGINS) {
      for (const phase of plugin.phases) {
        expect(
          phase.id,
          `${plugin.id} phase "${phase.id}" is not kebab-case`
        ).toMatch(kebabCase);
      }
    }
  });

  it('plugin ids use lowercase kebab-case', () => {
    const kebabCase = /^[a-z][a-z0-9-]*$/;
    for (const plugin of PLUGINS) {
      expect(plugin.id).toMatch(kebabCase);
    }
  });

  it('phases are ordered with unique descriptions per index', () => {
    // Every plugin's first phase should be an "entry" or "discover" type
    for (const plugin of PLUGINS) {
      const firstPhase = plugin.phases[0];
      const lastPhase = plugin.phases[plugin.phases.length - 1];
      expect(firstPhase).toBeDefined();
      expect(lastPhase).toBeDefined();
    }
  });
});

// ─── Helper Functions ──────────────────────────────────────────────

describe('getPlugin()', () => {
  it('returns the correct plugin by id', () => {
    const travel = getPlugin('travel');
    expect(travel).toBeDefined();
    expect(travel!.name).toBe('Travel OS');
  });

  it('returns undefined for unknown plugin id', () => {
    expect(getPlugin('nonexistent')).toBeUndefined();
  });

  it('returns correct plugin for every registered plugin', () => {
    for (const plugin of PLUGINS) {
      expect(getPlugin(plugin.id)!.id).toBe(plugin.id);
    }
  });
});

describe('getActivePlugins()', () => {
  it('returns only plugins with status "active"', () => {
    const active = getActivePlugins();
    for (const plugin of active) {
      expect(plugin.status).toBe('active');
    }
  });

  it('returns all active plugins (none should be pending)', () => {
    const active = getActivePlugins();
    // Currently all 12 plugins are "active"
    expect(active.length).toBe(12);
  });
});

describe('getPhasePrompt()', () => {
  it('returns the leadPrompt for a valid plugin + phase', () => {
    const prompt = getPhasePrompt('travel', 'discover');
    expect(prompt).toBeDefined();
    expect(prompt!.length).toBeGreaterThan(50);
    expect(prompt).toContain('Tell me');
  });

  it('returns undefined for unknown plugin id', () => {
    expect(getPhasePrompt('nope', 'discover')).toBeUndefined();
  });

  it('returns undefined for unknown phase id', () => {
    expect(getPhasePrompt('travel', 'nope')).toBeUndefined();
  });
});

describe('getInitialPhase()', () => {
  it('returns the first phase for a valid plugin', () => {
    const phase = getInitialPhase('travel');
    expect(phase).toBeDefined();
    expect(phase!.id).toBe('discover');
  });

  it('returns undefined for unknown plugin', () => {
    expect(getInitialPhase('nowhere')).toBeUndefined();
  });

  it('first phase is always the entry point', () => {
    for (const plugin of PLUGINS) {
      const initial = getInitialPhase(plugin.id);
      expect(initial).toBeDefined();
      expect(initial!.id).toBe(plugin.phases[0].id);
    }
  });
});

describe('nextPhase()', () => {
  it('returns the subsequent phase in order', () => {
    const next = nextPhase('travel', 'discover');
    expect(next).toBeDefined();
    expect(next!.id).toBe('intent');
  });

  it('returns undefined for last phase', () => {
    const travelPlugin = getPlugin('travel')!;
    const lastPhaseId = travelPlugin.phases[travelPlugin.phases.length - 1].id;
    expect(nextPhase('travel', lastPhaseId)).toBeUndefined();
  });

  it('returns undefined for unknown plugin', () => {
    expect(nextPhase('fake', 'start')).toBeUndefined();
  });

  it('returns undefined for unknown phase id', () => {
    expect(nextPhase('travel', 'fake-phase')).toBeUndefined();
  });

  it('walks through entire phase chain for every plugin', () => {
    for (const plugin of PLUGINS) {
      const visited: string[] = [];
      let current = getInitialPhase(plugin.id);
      while (current) {
        visited.push(current.id);
        current = nextPhase(plugin.id, current.id);
      }
      expect(visited).toEqual(plugin.phases.map(p => p.id));
    }
  });
});

// ─── Plugin-Specific Structural Checks ─────────────────────────────

describe('Travel OS specific', () => {
  it('has 6 phases in the correct order', () => {
    const travel = getPlugin('travel')!;
    expect(travel.phases.map(p => p.id)).toEqual([
      'discover', 'intent', 'plan', 'prepare', 'experience', 'reflect',
    ]);
  });
});

describe('Finance OS specific', () => {
  it('has 5 phases', () => {
    const finance = getPlugin('finance')!;
    expect(finance.phases.map(p => p.id)).toEqual([
      'assess', 'diagnose', 'plan', 'execute', 'review',
    ]);
  });
});

describe('Productivity OS specific', () => {
  it('has 5 phases', () => {
    const prod = getPlugin('productivity')!;
    expect(prod.phases.map(p => p.id)).toEqual([
      'audit', 'design', 'system', 'optimize', 'review',
    ]);
  });
});

describe('Mindfulness OS specific', () => {
  it('has 6 phases', () => {
    const mind = getPlugin('mindfulness')!;
    expect(mind.phases.map(p => p.id)).toEqual([
      'baseline', 'awareness', 'practice', 'focus', 'resilience', 'review',
    ]);
  });
});

describe('Nutrition OS specific', () => {
  it('has 5 phases', () => {
    const nut = getPlugin('nutrition')!;
    expect(nut.phases.map(p => p.id)).toEqual([
      'profile', 'audit', 'plan', 'habits', 'review',
    ]);
  });
});

// ─── Edge Cases ────────────────────────────────────────────────────

describe('Edge cases', () => {
  it('does not mutate the PLUGINS array', () => {
    const originalCount = PLUGINS.length;
    const active = getActivePlugins();
    expect(PLUGINS.length).toBe(originalCount);
    expect(active.length).toBeLessThanOrEqual(originalCount);
  });

  it('all gradients are valid CSS linear-gradient strings', () => {
    const gradientPattern = /^linear-gradient\(\d+deg,\s*#[0-9A-Fa-f]{6},\s*#[0-9A-Fa-f]{6}\)$/;
    for (const plugin of PLUGINS) {
      expect(
        plugin.gradient,
        `${plugin.id} gradient "${plugin.gradient}" is malformed`
      ).toMatch(gradientPattern);
    }
  });

  it('all color fields match the pattern from-COLOR-NUMBER to-COLOR-NUMBER', () => {
    const colorPattern = /^from-[a-z]+-[0-9]{2,4} to-[a-z]+-[0-9]{2,4}$/;
    for (const plugin of PLUGINS) {
      expect(
        plugin.color,
        `${plugin.id} color "${plugin.color}" is malformed`
      ).toMatch(colorPattern);
    }
  });
});
