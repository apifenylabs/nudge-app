/**
 * LifeOS Plugin Adapter Registry
 * ===============================
 * Central registry for all third-party API adapters.
 *
 * Manages adapter lifecycle: registration, instantiation, health checks,
 * and runtime lookup. This is the entry point for any LifeOS plugin
 * that connects to an external mindfulness or hobbies provider.
 *
 * Usage:
 * ```ts
 * import { pluginAdapterRegistry } from './plugin-adapter-registry';
 *
 * // Get the Headspace adapter with user's config
 * const hs = pluginAdapterRegistry.createAdapter('mindfulness-os', 'headspace', {
 *   apiKey: process.env.HEADSPACE_API_KEY
 * });
 * const summary = await hs.getSummary();
 * ```
 *
 * @packageDocumentation
 */

import type {
  MindfulnessAdapter,
  HobbyAdapter,
  PluginAdapterRegistry,
  AdapterRegistration,
  MindfulnessAdapterConfig,
  HobbyAdapterConfig,
} from './plugin-adapters';

import { HeadspaceAdapter } from './plugin-adapters-headspace';
import { CalmAdapter } from './plugin-adapters-calm';
// Future imports:
// import { TenPercentHappierAdapter } from './plugin-adapters-ten-percent-happier';
import { SkillshareAdapter } from './plugin-adapters-skillshare';
import { UdemyAdapter } from './plugin-adapters-udemy';
import { YouTubeAdapter } from './plugin-adapters-youtube';

/* ─── Registry Implementation ───────────────────────────────────────────── */

/**
 * Singleton registry for plugin adapters.
 * Tracks all registered adapters and their health status.
 */
class AdapterRegistryImpl implements PluginAdapterRegistry {
  mindfulness = new Map<string, MindfulnessAdapter>();
  hobbies = new Map<string, HobbyAdapter>();

  private registrations = new Map<string, AdapterRegistration>();

  /* ── Registration ───────────────────────────────────────────────────── */

  /**
   * Register an adapter implementation by its plugin category and provider name.
   *
   * Registration makes the adapter available for instantiation via createAdapter().
   * Adapters are lazy-loaded — they are only instantiated when first requested.
   */
  register(...entries: AdapterRegistration[]): void {
    for (const entry of entries) {
      const key = this.registryKey(entry.plugin, entry.provider);
      this.registrations.set(key, entry);
    }
  }

  /**
   * Create (or retrieve cached) adapter instance for the given plugin/provider.
   */
  createAdapter(
    plugin: string,
    provider: string,
    config: Record<string, unknown>,
  ): MindfulnessAdapter | HobbyAdapter | null {
    const key = this.registryKey(plugin, provider);
    const registration = this.registrations.get(key);

    if (!registration) {
      console.warn(`[AdapterRegistry] No registration found for ${plugin}/${provider}`);
      return null;
    }

    if (!registration.isEnabled) {
      console.warn(`[AdapterRegistry] Adapter ${plugin}/${provider} is disabled`);
      return null;
    }

    try {
      const instance = registration.factory(config) as MindfulnessAdapter | HobbyAdapter;

      // Cache the instance for subsequent lookups
      if (instance.provider) {
        const map = plugin === 'mindfulness-os' ? this.mindfulness : this.hobbies;
        map.set(provider, instance as MindfulnessAdapter & HobbyAdapter);
      }

      return instance;
    } catch (error) {
      console.error(`[AdapterRegistry] Failed to create adapter ${plugin}/${provider}:`, error);
      return null;
    }
  }

  /**
   * Get an already-instantiated adapter by plugin category and provider.
   */
  getAdapter(
    plugin: 'mindfulness-os' | 'hobbies-os',
    provider: string,
  ): MindfulnessAdapter | HobbyAdapter | undefined {
    const map = plugin === 'mindfulness-os' ? this.mindfulness : this.hobbies;
    return map.get(provider);
  }

  /**
   * Run health checks on all registered and instantiated adapters.
   * Returns a map of provider → health status.
   */
  async healthCheckAll(): Promise<Record<string, { ok: boolean; latencyMs: number }>> {
    const results: Record<string, { ok: boolean; latencyMs: number }> = {};

    const adapters = [
      ...Array.from(this.mindfulness.values()),
      ...Array.from(this.hobbies.values()),
    ];

    await Promise.allSettled(
      adapters.map(async (adapter) => {
        try {
          const health = await adapter.healthCheck();
          results[adapter.provider] = health;
        } catch {
          results[adapter.provider] = { ok: false, latencyMs: -1 };
        }
      }),
    );

    return results;
  }

  /**
   * List all registered providers by plugin category.
   */
  listAvailable(): { plugin: string; providers: string[] }[] {
    const groups = new Map<string, string[]>();

    for (const [key, reg] of this.registrations) {
      const [plugin] = key.split(':');
      if (!groups.has(plugin)) groups.set(plugin, []);
      groups.get(plugin)!.push(reg.provider);
    }

    return Array.from(groups.entries()).map(([plugin, providers]) => ({
      plugin,
      providers,
    }));
  }

  /** Reset all instances (useful for testing or config reload). */
  reset(): void {
    this.mindfulness.clear();
    this.hobbies.clear();
    this.registrations.clear();
  }

  private registryKey(plugin: string, provider: string): string {
    return `${plugin}:${provider}`;
  }
}

/* ─── Singleton Export ──────────────────────────────────────────────────── */

/** Application-wide adapter registry. */
export const pluginAdapterRegistry = new AdapterRegistryImpl();

/* ─── Default Registration ──────────────────────────────────────────────── */

/**
 * Register all built-in adapters as available for runtime instantiation.
 *
 * Users must call createAdapter() with their credentials to activate one.
 * Disabled adapters are registered but will return null from createAdapter().
 *
 * To add a new adapter:
 * 1. Implement the interface in plugin-adapters-{provider}.ts
 * 2. Register it below with its provider name
 * 3. Define its configSchema for UI form generation
 */

pluginAdapterRegistry.register(
  {
    plugin: 'mindfulness-os',
    provider: 'headspace',
    factory: (config) => {
      return new HeadspaceAdapter(config as MindfulnessAdapterConfig);
    },
    configSchema: {
      apiKey: { type: 'string', required: true, label: 'Headspace API Key' },
      baseUrl: { type: 'string', required: false, label: 'Custom API Base URL' },
      timeoutMs: { type: 'number', required: false, label: 'Request Timeout (ms)', default: 10000 },
    },
    isEnabled: true,
  },
  {
    plugin: 'mindfulness-os',
    provider: 'calm',
    factory: (config) => {
      return new CalmAdapter(config as MindfulnessAdapterConfig);
    },
    configSchema: {
      apiKey: { type: 'string', required: true, label: 'Calm API Key' },
      baseUrl: { type: 'string', required: false, label: 'Custom API Base URL' },
      timeoutMs: { type: 'number', required: false, label: 'Request Timeout (ms)', default: 10000 },
    },
    isEnabled: true,
  },
  // Future registrations:
  // {
  //   plugin: 'mindfulness-os',
  //   provider: 'ten-percent-happier',
  //   factory: (config) => new TenPercentHappierAdapter(config as MindfulnessAdapterConfig),
  //   configSchema: { apiKey: { type: 'string', required: true, label: 'API Key' } },
  //   isEnabled: true,
  // },
  // Hobbies OS — Skillshare
  {
    plugin: 'hobbies-os',
    provider: 'skillshare',
    factory: (config) => {
      return new SkillshareAdapter(config as HobbyAdapterConfig);
    },
    configSchema: {
      apiKey: { type: 'string', required: true, label: 'Skillshare API Key' },
      baseUrl: { type: 'string', required: false, label: 'Custom API Base URL' },
      timeoutMs: { type: 'number', required: false, label: 'Request Timeout (ms)', default: 10000 },
    },
    isEnabled: true,
  },
  // Hobbies OS — Udemy
  {
    plugin: 'hobbies-os',
    provider: 'udemy',
    factory: (config) => {
      return new UdemyAdapter(config as HobbyAdapterConfig);
    },
    configSchema: {
      apiKey: { type: 'string', required: true, label: 'Udemy API Key' },
      baseUrl: { type: 'string', required: false, label: 'Custom API Base URL' },
      timeoutMs: { type: 'number', required: false, label: 'Request Timeout (ms)', default: 10000 },
    },
    isEnabled: true,
  },
  // Hobbies OS — YouTube (playlist-based hobby tracking)
  {
    plugin: 'hobbies-os',
    provider: 'youtube',
    factory: (config) => {
      return new YouTubeAdapter(config as HobbyAdapterConfig);
    },
    configSchema: {
      apiKey: { type: 'string', required: true, label: 'YouTube Data API Key v3' },
      baseUrl: { type: 'string', required: false, label: 'Custom API Base URL' },
      timeoutMs: { type: 'number', required: false, label: 'Request Timeout (ms)', default: 10000 },
    },
    isEnabled: true,
  },
);
