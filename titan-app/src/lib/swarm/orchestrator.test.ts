import { describe, it, expect, vi } from 'vitest';
import { orchestrateSwarm } from './orchestrator';
import type { Agent } from '@/types';

const mockAgents: Agent[] = [
  {
    id: 'agent-research',
    userId: 'user-1',
    name: 'Researcher',
    baseModel: 'cute-robot',
    skinData: null,
    level: 12,
    xp: 1500,
    createdAt: '2026-01-01',
  },
  {
    id: 'agent-writer',
    userId: 'user-1',
    name: 'Writer',
    baseModel: 'anime-guardian',
    skinData: null,
    level: 18,
    xp: 3200,
    createdAt: '2026-01-10',
  },
  {
    id: 'agent-reviewer',
    userId: 'user-1',
    name: 'Reviewer',
    baseModel: 'realistic-human',
    skinData: null,
    level: 25,
    xp: 6000,
    createdAt: '2026-02-01',
  },
];

describe('orchestrateSwarm', () => {
  it('returns completed status for valid task', async () => {
    const result = await orchestrateSwarm('Write a blog post about AI agents', mockAgents);
    expect(result.status).toBe('completed');
  });

  it('decomposes task into one sub-task per agent', async () => {
    const result = await orchestrateSwarm('Research and summarize latest AI trends', mockAgents);
    expect(result.coordinatedPlan.subTasks).toHaveLength(3);
  });

  it('assigns correct mainTask', async () => {
    const task = 'Analyze market data';
    const result = await orchestrateSwarm(task, mockAgents);
    expect(result.coordinatedPlan.mainTask).toBe(task);
  });

  it('each sub-task has required fields', async () => {
    const result = await orchestrateSwarm('Create a report', mockAgents);
    for (const sub of result.coordinatedPlan.subTasks) {
      expect(sub).toHaveProperty('agentId');
      expect(sub).toHaveProperty('instruction');
      expect(sub).toHaveProperty('dependsOn');
      expect(Array.isArray(sub.dependsOn)).toBe(true);
    }
  });

  it('all sub-tasks return successful interactions', async () => {
    const result = await orchestrateSwarm('Build a prototype', mockAgents);
    expect(result.results).toHaveLength(3);
    result.results.forEach((interaction) => {
      expect(interaction.success).toBe(true);
    });
  });

  it('results include agentId and taskDescription', async () => {
    const result = await orchestrateSwarm('Test task', mockAgents);
    for (const record of result.results) {
      expect(record).toHaveProperty('agentId');
      expect(record).toHaveProperty('taskDescription');
    }
  });
});
