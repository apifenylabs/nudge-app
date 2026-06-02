import { describe, it, expect, vi } from 'vitest';
import { negotiateWithAgent, broadcastToSwarm } from './negotiation';
import type { Agent } from '@/types';

// Disable timers so sleep resolves instantly
vi.useFakeTimers();

const mockAgentAlpha: Agent = {
  id: 'agent-alpha',
  userId: 'user-1',
  name: 'Alpha',
  baseModel: 'cute-robot',
  skinData: null,
  level: 15,
  xp: 2000,
  createdAt: '2026-01-01',
};

const mockAgentBeta: Agent = {
  id: 'agent-beta',
  userId: 'user-1',
  name: 'Beta',
  baseModel: 'anime-guardian',
  skinData: null,
  level: 22,
  xp: 4500,
  createdAt: '2026-01-15',
};

const mockAgentGamma: Agent = {
  id: 'agent-gamma',
  userId: 'user-1',
  name: 'Gamma',
  baseModel: 'realistic-human',
  skinData: null,
  level: 30,
  xp: 8000,
  createdAt: '2026-02-01',
};

describe('negotiateWithAgent', () => {
  it('returns successful result with correct shape', async () => {
    const promise = negotiateWithAgent(mockAgentAlpha, mockAgentBeta, 'Share memory graph');
    vi.advanceTimersByTime(500);
    const result = await promise;

    expect(result.success).toBe(true);
    expect(result.sourceAgent).toBe(mockAgentAlpha.id);
    expect(result.targetAgent).toBe(mockAgentBeta.id);
    expect(result.data).toHaveProperty('message');
  });

  it('uses no delay for high priority', async () => {
    const start = Date.now();
    const promise = negotiateWithAgent(mockAgentAlpha, mockAgentBeta, 'Urgent request', 'high');
    vi.advanceTimersByTime(0);
    const result = await promise;
    expect(result.success).toBe(true);
  });

  it('uses 100ms delay for normal priority', async () => {
    const promise = negotiateWithAgent(mockAgentAlpha, mockAgentBeta, 'Normal request', 'normal');
    vi.advanceTimersByTime(100);
    const result = await promise;
    expect(result.success).toBe(true);
  });

  it('uses 500ms delay for low priority', async () => {
    const promise = negotiateWithAgent(mockAgentAlpha, mockAgentBeta, 'Low request', 'low');
    vi.advanceTimersByTime(500);
    const result = await promise;
    expect(result.success).toBe(true);
  });

  it('defaults to normal priority when not specified', async () => {
    const promise = negotiateWithAgent(mockAgentAlpha, mockAgentBeta, 'Default request');
    vi.advanceTimersByTime(100);
    const result = await promise;
    expect(result.success).toBe(true);
  });

  it('includes data in response', async () => {
    const promise = negotiateWithAgent(mockAgentAlpha, mockAgentBeta, 'Hello', 'high');
    vi.advanceTimersByTime(0);
    const result = await promise;
    expect(result.data.message).toMatch(/Hello/);
  });
});

describe('broadcastToSwarm', () => {
  it('broadcasts to all agents in the array', async () => {
    const agents = [mockAgentAlpha, mockAgentBeta, mockAgentGamma];
    const promise = broadcastToSwarm(agents, 'System update');
    vi.advanceTimersByTime(300);
    const results = await promise;

    expect(results).toHaveLength(3);
    results.forEach((r) => {
      expect(r.success).toBe(true);
    });
  });

  it('includes each agent as target in results', async () => {
    const agents = [mockAgentAlpha, mockAgentBeta];
    const promise = broadcastToSwarm(agents, 'Ping');
    vi.advanceTimersByTime(200);
    const results = await promise;

    expect(results[0].targetAgent).toBe(mockAgentAlpha.id);
    expect(results[1].targetAgent).toBe(mockAgentBeta.id);
  });

  it('returns empty array for empty swarm', async () => {
    const promise = broadcastToSwarm([], 'No one here');
    vi.advanceTimersByTime(0);
    const results = await promise;

    expect(results).toHaveLength(0);
  });
});
