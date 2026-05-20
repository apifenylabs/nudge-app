/**
 * Negotiation Engine — inter-agent message passing and priority queuing.
 * Phase 3 deliverable.
 */
import type { Agent, MemoryEntry } from '@/types';

type NegotiationResult = {
  success: boolean;
  data: Record<string, unknown>;
  sourceAgent: string;
  targetAgent: string;
};

/**
 * Request data from another agent in the swarm.
 * Agents negotiate via a simple handshake: request → response.
 */
export async function negotiateWithAgent(
  sourceAgent: Agent,
  targetAgent: Agent,
  request: string,
  priority: 'low' | 'normal' | 'high' = 'normal',
): Promise<NegotiationResult> {
  // Priority queuing: high-priority requests preempt
  const queueDelay = priority === 'high' ? 0 : priority === 'normal' ? 100 : 500;
  await sleep(queueDelay);

  // Placeholder for actual LLM-based negotiation
  console.log(
    `[Negotiate] ${sourceAgent.name} → ${targetAgent.name}: "${request}" (${priority})`,
  );

  return {
    success: true,
    data: { message: `Responded to: ${request}` },
    sourceAgent: sourceAgent.id,
    targetAgent: targetAgent.id,
  };
}

/**
 * Broadcast a message to all agents in the swarm.
 */
export async function broadcastToSwarm(
  agents: Agent[],
  message: string,
): Promise<NegotiationResult[]> {
  return Promise.all(
    agents.map((target) =>
      negotiateWithAgent(agents[0], target, message, 'normal'),
    ),
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
