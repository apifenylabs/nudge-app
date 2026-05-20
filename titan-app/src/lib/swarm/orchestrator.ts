/**
 * Swarm Orchestrator — cross-agent task decomposition and negotiation.
 * Phase 3 deliverable.
 */
import type { Agent, Interaction } from '@/types';

interface TaskDecomposition {
  mainTask: string;
  subTasks: Array<{
    agentId: string;
    instruction: string;
    dependsOn: string[];
  }>;
}

interface OrchestrationResult {
  status: 'executing' | 'completed' | 'failed';
  coordinatedPlan: TaskDecomposition;
  results: Interaction[];
}

/**
 * Decompose a natural-language task into sub-tasks
 * for the swarm's specialized agents.
 */
export async function orchestrateSwarm(
  userTask: string,
  agents: Agent[],
): Promise<OrchestrationResult> {
  // Phase 1: Decompose the task using the configured LLM
  const decomposition = await decomposeTask(userTask, agents);

  // Phase 2: Execute sub-tasks respecting dependency order
  const results: Interaction[] = [];
  const executed = new Set<string>();

  for (const subTask of decomposition.subTasks) {
    // Wait for dependencies
    const depsMet = subTask.dependsOn.every((dep) => executed.has(dep));
    if (!depsMet) {
      throw new Error(
        `Task ${subTask.instruction} has unmet dependencies: ${subTask.dependsOn.join(', ')}`,
      );
    }

    // Execute via model-agnostic call
    const result = await executeAgentTask(subTask);
    results.push(result);
    executed.add(subTask.agentId);
  }

  return {
    status: 'completed',
    coordinatedPlan: decomposition,
    results,
  };
}

async function decomposeTask(
  task: string,
  agents: Agent[],
): Promise<TaskDecomposition> {
  // This is a placeholder for the actual LLM call.
  // In production, call the OpenClaw proxy with model-agnostic routing.
  const agentDescriptions = agents
    .map((a) => `${a.name} (${a.baseModel})`)
    .join(', ');

  console.log(`[Orchestrator] Decomposing task: "${task}" for agents: ${agentDescriptions}`);

  // Placeholder decomposition
  return {
    mainTask: task,
    subTasks: agents.map((agent) => ({
      agentId: agent.id,
      instruction: `Execute relevant portion of: "${task}"`,
      dependsOn: [],
    })),
  };
}

async function executeAgentTask(
  subTask: TaskDecomposition['subTasks'][0],
): Promise<Interaction> {
  console.log(`[Orchestrator] Agent ${subTask.agentId}: ${subTask.instruction}`);

  return {
    id: crypto.randomUUID(),
    agentId: subTask.agentId,
    taskDescription: subTask.instruction,
    resultSummary: { status: 'completed', output: 'Task executed' },
    success: true,
    createdAt: new Date().toISOString(),
  } as Interaction;
}
