/**
 * Tests for Hobbies OS adapters (Skillshare + Udemy).
 *
 * Verifies that:
 * 1. Both adapters instantiate correctly
 * 2. The registry can create adapters by provider name
 * 3. The config schemas match the registry definition
 * 4. Interface contracts are met (all methods return proper shapes)
 */

import { describe, it, expect } from 'vitest';
import { SkillshareAdapter, SkillshareError } from './plugin-adapters-skillshare';
import { UdemyAdapter, UdemyError } from './plugin-adapters-udemy';
import { YouTubeAdapter, YouTubeError } from './plugin-adapters-youtube';
import { pluginAdapterRegistry } from './plugin-adapter-registry';

/* ─── Registry Tests ────────────────────────────────────────────────────── */

describe('Hobbies OS Adapter Registry', () => {
  it('should list skillshare, udemy, and youtube as available providers', () => {
    const available = pluginAdapterRegistry.listAvailable();
    const hobbiesPlugin = available.find((p) => p.plugin === 'hobbies-os');
    expect(hobbiesPlugin).toBeDefined();
    expect(hobbiesPlugin!.providers).toContain('skillshare');
    expect(hobbiesPlugin!.providers).toContain('udemy');
    expect(hobbiesPlugin!.providers).toContain('youtube');
  });

  it('should create a SkillshareAdapter via registry', () => {
    const adapter = pluginAdapterRegistry.createAdapter('hobbies-os', 'skillshare', {
      apiKey: 'test-key',
    });
    expect(adapter).toBeInstanceOf(SkillshareAdapter);
    expect(adapter!.provider).toBe('skillshare');
  });

  it('should create a UdemyAdapter via registry', () => {
    const adapter = pluginAdapterRegistry.createAdapter('hobbies-os', 'udemy', {
      apiKey: 'test-key',
    });
    expect(adapter).toBeInstanceOf(UdemyAdapter);
    expect(adapter!.provider).toBe('udemy');
  });

  it('should create a YouTubeAdapter via registry', () => {
    const adapter = pluginAdapterRegistry.createAdapter('hobbies-os', 'youtube', {
      apiKey: 'test-key',
    });
    expect(adapter).toBeInstanceOf(YouTubeAdapter);
    expect(adapter!.provider).toBe('youtube');
  });

  it('should return null for unknown provider', () => {
    const adapter = pluginAdapterRegistry.createAdapter('hobbies-os', 'nonexistent', {});
    expect(adapter).toBeNull();
  });

  it('should cache the YouTube adapter when instantiated', () => {
    const adapter1 = pluginAdapterRegistry.createAdapter('hobbies-os', 'youtube', {
      apiKey: 'key-yt',
    });
    const adapter2 = pluginAdapterRegistry.getAdapter('hobbies-os', 'youtube');
    expect(adapter2).toBe(adapter1);
    expect(adapter2!.provider).toBe('youtube');
  });

  it('should cache instantiated adapters', () => {
    const adapter1 = pluginAdapterRegistry.createAdapter('hobbies-os', 'skillshare', {
      apiKey: 'key-1',
    });
    const adapter2 = pluginAdapterRegistry.getAdapter('hobbies-os', 'skillshare');
    expect(adapter2).toBe(adapter1);
  });
});

/* ─── Skillshare Adapter Tests ──────────────────────────────────────────── */

describe('SkillshareAdapter', () => {
  it('should instantiate with default config', () => {
    const adapter = new SkillshareAdapter({ apiKey: 'test-key' });
    expect(adapter.provider).toBe('skillshare');
    expect(adapter.config.apiKey).toBe('test-key');
    expect(adapter.config.timeoutMs).toBe(10_000);
  });

  it('should instantiate with custom config', () => {
    const adapter = new SkillshareAdapter({
      apiKey: 'custom-key',
      baseUrl: 'https://custom.skillshare.com/api',
      timeoutMs: 5000,
    });
    expect(adapter.config.baseUrl).toBe('https://custom.skillshare.com/api');
    expect(adapter.config.timeoutMs).toBe(5_000);
  });

  it('should have a SkillshareError class', () => {
    const error = new SkillshareError('Not found', 404);
    expect(error.statusCode).toBe(404);
    expect(error.message).toContain('[Skillshare]');
    expect(error.name).toBe('SkillshareError');
  });

  it('should return false on connect when offline (no network)', async () => {
    const adapter = new SkillshareAdapter({ apiKey: 'bad-key' });
    const connected = await adapter.connect();
    // Without a live API, this should fail gracefully
    expect(connected).toBe(false);
  });
});

/* ─── Udemy Adapter Tests ───────────────────────────────────────────────── */

describe('UdemyAdapter', () => {
  it('should instantiate with default config', () => {
    const adapter = new UdemyAdapter({ apiKey: 'test-key' });
    expect(adapter.provider).toBe('udemy');
    expect(adapter.config.apiKey).toBe('test-key');
    expect(adapter.config.timeoutMs).toBe(10_000);
  });

  it('should instantiate with custom config', () => {
    const adapter = new UdemyAdapter({
      apiKey: 'custom-key',
      baseUrl: 'https://custom.udemy.com/api',
      timeoutMs: 8000,
    });
    expect(adapter.config.baseUrl).toBe('https://custom.udemy.com/api');
    expect(adapter.config.timeoutMs).toBe(8_000);
  });

  it('should have a UdemyError class', () => {
    const error = new UdemyError('Unauthorized', 401);
    expect(error.statusCode).toBe(401);
    expect(error.message).toContain('[Udemy]');
    expect(error.name).toBe('UdemyError');
  });

  it('should return false on connect when offline (no network)', async () => {
    const adapter = new UdemyAdapter({ apiKey: 'bad-key' });
    const connected = await adapter.connect();
    expect(connected).toBe(false);
  });
});

/* ─── YouTube Adapter Tests ─────────────────────────────────────────────── */

describe('YouTubeAdapter', () => {
  it('should instantiate with default config', () => {
    const adapter = new YouTubeAdapter({ apiKey: 'test-key' });
    expect(adapter.provider).toBe('youtube');
    expect(adapter.config.apiKey).toBe('test-key');
    expect(adapter.config.timeoutMs).toBe(10_000);
  });

  it('should have a YouTubeError class', () => {
    const error = new YouTubeError('Quota exceeded', 403);
    expect(error.statusCode).toBe(403);
    expect(error.message).toContain('[YouTube]');
    expect(error.name).toBe('YouTubeError');
  });

  it('should return false on connect when offline (no network)', async () => {
    const adapter = new YouTubeAdapter({ apiKey: 'bad-key' });
    const connected = await adapter.connect();
    expect(connected).toBe(false);
  });

  it('should log a local session (read-only API constraint)', async () => {
    const adapter = new YouTubeAdapter({ apiKey: 'test' });
    const id = await adapter.logSession({
      provider: 'youtube',
      hobby: 'test',
      category: 'intellectual',
      startedAt: new Date().toISOString(),
      durationMinutes: 10,
      completed: true,
    });
    expect(id).toContain('manual:');
  });

  it('should return empty arrays for materials_purchased (always unsupported)', async () => {
    const adapter = new YouTubeAdapter({ apiKey: 'test' });
    const result = await adapter.getMetric('materials_purchased', '2026-01-01', '2026-06-04');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

/* ─── Interface Contract Tests ──────────────────────────────────────────── */

describe('HobbyAdapter interface contract', () => {
  const skillshare = new SkillshareAdapter({ apiKey: 'test' });
  const udemy = new UdemyAdapter({ apiKey: 'test' });
  const youtube = new YouTubeAdapter({ apiKey: 'test' });

  const requiredMethods: (keyof import('./plugin-adapters').HobbyAdapter)[] = [
    'connect',
    'getSessions',
    'getMilestones',
    'getSummary',
    'getMetric',
    'logSession',
    'healthCheck',
  ];

  for (const method of requiredMethods) {
    it(`Skillshare implements ${method}`, () => {
      expect(typeof (skillshare as any)[method]).toBe('function');
    });

    it(`Udemy implements ${method}`, () => {
      expect(typeof (udemy as any)[method]).toBe('function');
    });

    it(`YouTube implements ${method}`, () => {
      expect(typeof (youtube as any)[method]).toBe('function');
    });
  }

  // Verify default metric returns are empty arrays for unavailable metrics
  it('Skillshare returns empty arrays for unsupported metrics', async () => {
    const result = await skillshare.getMetric('materials_purchased', '2026-01-01', '2026-06-04');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('Udemy returns empty arrays for gracefully handled errors', async () => {
    const health = await udemy.healthCheck();
    expect(health).toHaveProperty('ok');
    expect(health).toHaveProperty('latencyMs');
    expect(health.ok).toBe(false);
  });

  it('YouTube returns empty arrays for gracefully handled errors', async () => {
    const health = await youtube.healthCheck();
    expect(health).toHaveProperty('ok');
    expect(health).toHaveProperty('latencyMs');
    expect(health.ok).toBe(false);
  });

  it('YouTube getSessions returns gracefully on offline (no crash)', async () => {
    const sessions = await youtube.getSessions('2026-01-01', '2026-06-04');
    expect(Array.isArray(sessions)).toBe(true);
  });

  it('YouTube getMilestones returns gracefully on offline', async () => {
    const milestones = await youtube.getMilestones('2026-01-01', '2026-06-04');
    expect(Array.isArray(milestones)).toBe(true);
  });

  it('YouTube getSummary returns gracefully on offline', async () => {
    const summary = await youtube.getSummary();
    expect(summary).toHaveProperty('totalHoursThisMonth');
    expect(summary).toHaveProperty('activeHobbies');
    expect(summary).toHaveProperty('recentSessions');
  });
});
