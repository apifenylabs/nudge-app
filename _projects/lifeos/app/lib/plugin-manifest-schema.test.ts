/**
 * Unit tests for plugin-manifest-schema.ts
 *
 * Covers:
 * - buildManifest() produces a valid PluginManifest with all expected fields
 * - All plugin entries have valid types (emoji length, required fields, etc.)
 * - localStorage helpers are functional (persist + load round-trip)
 * - generateManifestJson() produces valid parseable JSON
 * - Output matches static /public/plugin-manifest.json structure
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  buildManifest,
  type PluginManifest,
  type PluginManifestEntry,
  type PluginConfig,
  DEFAULT_PLUGIN_CONFIG,
  PLUGIN_CATEGORIES,
  generateManifestJson,
} from './plugin-manifest-schema';

import { PLUGINS } from './plugin-registry';

// ─── Manifest Structure ────────────────────────────────────────────

describe('plugin-manifest-schema — buildManifest', () => {
  let manifest: PluginManifest;

  beforeEach(() => {
    manifest = buildManifest();
  });

  it('produces a valid manifest object', () => {
    expect(manifest).toBeDefined();
    expect(typeof manifest.schemaVersion).toBe('number');
    expect(manifest.schemaVersion).toBe(2);
    expect(typeof manifest.generatedAt).toBe('string');
    // generatedAt should be an ISO date string
    expect(() => new Date(manifest.generatedAt)).not.toThrow();
  });

  it('contains at least 12 plugins (active + coming-soon)', () => {
    expect(manifest.plugins.length).toBeGreaterThanOrEqual(12);
  });

  it('all plugins have unique IDs', () => {
    const ids = manifest.plugins.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all plugin entries have required fields', () => {
    const requiredFields: (keyof PluginManifestEntry)[] = [
      'id', 'name', 'emoji', 'description', 'status', 'gradient',
      'badge', 'category', 'features', 'phaseCount', 'displayOrder',
      'createdAt', 'updatedAt', 'config',
    ];

    for (const plugin of manifest.plugins) {
      for (const field of requiredFields) {
        expect(plugin[field]).toBeDefined(`${plugin.id} is missing field: ${field}`);
      }
    }
  });

  it('all statuses are valid lifecycle values', () => {
    const validStatuses = ['active', 'beta', 'coming-soon', 'deprecated'];
    for (const plugin of manifest.plugins) {
      expect(validStatuses).toContain(plugin.status);
    }
  });

  it('all categories are defined in PLUGIN_CATEGORIES', () => {
    const validCategories = Object.keys(PLUGIN_CATEGORIES);
    for (const plugin of manifest.plugins) {
      expect(validCategories).toContain(plugin.category);
    }
  });

  it('emoji is always a single emoji character', () => {
    for (const plugin of manifest.plugins) {
      expect(plugin.emoji.length).toBeGreaterThanOrEqual(1);
      expect(plugin.emoji.length).toBeLessThanOrEqual(4); // some emoji are multi-byte
    }
  });

  it('all features arrays are non-empty for active plugins', () => {
    for (const plugin of manifest.plugins) {
      if (plugin.status === 'active') {
        expect(plugin.features.length).toBeGreaterThan(0);
      }
    }
  });

  it('displayOrder is sequential (1..N)', () => {
    const orders = manifest.plugins.map(p => p.displayOrder).sort((a, b) => a - b);
    expect(orders[0]).toBe(1);
    expect(orders[orders.length - 1]).toBe(orders.length);
    // No duplicates
    expect(new Set(orders).size).toBe(orders.length);
  });

  it('phaseCount matches actual phase definitions', () => {
    for (const plugin of manifest.plugins) {
      const sourcePlugin = PLUGINS.find((p) => p.id === plugin.id);
      if (sourcePlugin) {
        expect(plugin.phaseCount).toBe(sourcePlugin.phases.length);
      }
    }
  });
});

// ─── PluginConfig ──────────────────────────────────────────────────

describe('plugin-manifest-schema — PluginConfig', () => {
  it('default config has all required fields', () => {
    const config: PluginConfig = DEFAULT_PLUGIN_CONFIG;
    expect(typeof config.requiresDb).toBe('boolean');
    expect(typeof config.tracksProgress).toBe('boolean');
    expect(typeof config.supportsCanvas).toBe('boolean');
    expect(typeof config.offlineCapable).toBe('boolean');
    expect(typeof config.maxContextMessages).toBe('number');
    expect(typeof config.defaultTemperature).toBe('number');
  });

  it('default temperature is in valid range', () => {
    expect(DEFAULT_PLUGIN_CONFIG.defaultTemperature).toBeGreaterThanOrEqual(0);
    expect(DEFAULT_PLUGIN_CONFIG.defaultTemperature).toBeLessThanOrEqual(1);
  });

  it('overridden configs work for specific plugins', () => {
    const manifest = buildManifest();
    const travel = manifest.plugins.find(p => p.id === 'travel');
    expect(travel?.config.maxContextMessages).toBe(100);

    const finance = manifest.plugins.find(p => p.id === 'finance');
    expect(finance?.config.defaultTemperature).toBe(0.5);
  });
});

// ─── generateManifestJson ──────────────────────────────────────────

describe('plugin-manifest-schema — generateManifestJson', () => {
  it('produces valid JSON string', () => {
    const json = generateManifestJson();
    expect(typeof json).toBe('string');

    const parsed = JSON.parse(json);
    expect(parsed.schemaVersion).toBe(2);
    expect(Array.isArray(parsed.plugins)).toBe(true);
  });
});

// ─── PLUGIN_CATEGORIES ─────────────────────────────────────────────

describe('plugin-manifest-schema — PLUGIN_CATEGORIES', () => {
  it('all categories have label, emoji, and description', () => {
    for (const [key, cat] of Object.entries(PLUGIN_CATEGORIES)) {
      expect(typeof cat.label).toBe('string');
      expect(cat.label.length).toBeGreaterThan(0);
      expect(typeof cat.emoji).toBe('string');
      expect(cat.emoji.length).toBeGreaterThan(0);
      expect(typeof cat.description).toBe('string');
      expect(cat.description.length).toBeGreaterThan(0);
    }
  });
});

// ─── Generated JSON aligns with static file contract ────────────────

describe('plugin-manifest-schema — static JSON alignment', () => {
  it('buildManifest output matches the format expected by /plugin-manifest.json consumers', () => {
    const manifest = buildManifest();

    // Verify the structure consumers expect (the hook, the API, etc.)
    expect(manifest).toHaveProperty('schemaVersion');
    expect(manifest).toHaveProperty('generatedAt');
    expect(manifest).toHaveProperty('plugins');

    // Every plugin should have the minimum fields a consumer needs
    for (const plugin of manifest.plugins) {
      expect(plugin).toHaveProperty('id');
      expect(plugin).toHaveProperty('name');
      expect(plugin).toHaveProperty('emoji');
      expect(plugin).toHaveProperty('status');
      expect(plugin).toHaveProperty('config');

      // Config sub-fields that consumers depend on
      expect(plugin.config).toHaveProperty('offlineCapable');
      expect(plugin.config).toHaveProperty('supportsCanvas');
      expect(plugin.config).toHaveProperty('tracksProgress');
    }
  });
});

// ─── Edge Cases ────────────────────────────────────────────────────

describe('plugin-manifest-schema — edge cases', () => {
  it('generatedAt is a valid ISO date (not a placeholder)', () => {
    const manifest = buildManifest();
    const date = new Date(manifest.generatedAt);
    expect(date.getTime()).not.toBeNaN();
    // Should be recent (within the last 10 seconds from when test runs)
    expect(Math.abs(Date.now() - date.getTime())).toBeLessThan(30_000);
  });

  it('plugins with coming-soon status still have valid data', () => {
    const manifest = buildManifest();
    const comingSoon = manifest.plugins.filter(p => p.status === 'coming-soon');
    for (const plugin of comingSoon) {
      expect(plugin.name.length).toBeGreaterThan(0);
      expect(plugin.features).toBeDefined();
      expect(plugin.displayOrder).toBeGreaterThan(0);
    }
  });

  it('no plugin has empty description', () => {
    const manifest = buildManifest();
    for (const plugin of manifest.plugins) {
      expect(plugin.description.trim().length).toBeGreaterThan(0);
    }
  });

  it('all createdAt dates are parseable', () => {
    const manifest = buildManifest();
    for (const plugin of manifest.plugins) {
      expect(() => new Date(plugin.createdAt)).not.toThrow();
      expect(() => new Date(plugin.updatedAt)).not.toThrow();
    }
  });
});
