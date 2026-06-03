/* ─────────────────────────────────────────────────────────────
   Swarm Orchestrator — Multi-Agent Orchestration Engine
   Simulates team-based agent execution from connected canvas
   nodes. Generates XP awards, rank-up triggers, and execution
   logs for the SandboxPreview.
   
   Concept: Each connected sub-graph on the canvas represents
   an agent "swarm team." The orchestrator runs them in
   sequence/parallel/debate modes and produces results.
   ───────────────────────────────────────────────────────────── */

export interface SwarmNodeInfo {
  id: string;
  label: string;
  icon: string;
  defId: string;
  config?: Record<string, string>;
}

export interface SwarmConnection {
  from: string;
  to: string;
}

export type TaskMode = "chain" | "parallel" | "debate";

export interface SwarmTask {
  mode: TaskMode;
  teams: SwarmTeam[];
  totalNodes: number;
  totalLinks: number;
}

export interface SwarmTeam {
  name: string;
  members: SwarmNodeInfo[];
  leadId: string | null; // Agent Cmd node if present
}

export interface SynergyBreakdown {
  /** Base difficulty XP before multipliers */
  baseDifficulty: number;
  /** Multi-team synergy multiplier (1.0 if single team) */
  teamSynergyMultiplier: number;
  /** Cross-team connection bonus XP */
  crossTeamConnectionsBonus: number;
  /** Mode-based bonus multiplier */
  modeMultiplier: number;
  /** Commander leadership bonus XP */
  commanderBonus: number;
  /** Final computed XP */
  totalXpAwarded: number;
}

export interface SwarmResult {
  success: boolean;
  tasksCompleted: number;
  xpAwarded: number;
  summary: string;
  details: string[];
  elapsed: number; // simulated ms
  newRank?: string;
  rankTitle?: string;
  /** Team collaboration synergy breakdown */
  synergy?: SynergyBreakdown;
}

/* ─────────────────────────────────────────────────────────────
   Team Assignment — groups connected sub-graphs into teams
   ───────────────────────────────────────────────────────────── */

/**
 * Finds connected components in the node graph using a simple
 * BFS on the connection edges. Each component becomes a team.
 */
function findTeams(
  nodes: SwarmNodeInfo[],
  connections: SwarmConnection[]
): SwarmTeam[] {
  if (nodes.length === 0) return [];

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const adjacency = new Map<string, string[]>();

  // Build adjacency list
  for (const n of nodes) adjacency.set(n.id, []);
  for (const conn of connections) {
    adjacency.get(conn.from)?.push(conn.to);
    adjacency.get(conn.to)?.push(conn.from);
  }

  // BFS to find connected components
  const visited = new Set<string>();
  const teams: SwarmTeam[] = [];

  for (const node of nodes) {
    if (visited.has(node.id)) continue;

    const component: string[] = [];
    const queue = [node.id];
    visited.add(node.id);

    while (queue.length > 0) {
      const current = queue.shift()!;
      component.push(current);
      for (const neighbor of adjacency.get(current) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    const members = component.map((id) => nodeMap.get(id)!).filter(Boolean);
    const cmd = members.find((m) => m.defId === "agent-cmd");

    teams.push({
      name: cmd?.label || `Team ${teams.length + 1}`,
      members,
      leadId: cmd?.id || null,
    });
  }

  return teams;
}

/* ─────────────────────────────────────────────────────────────
   Difficulty & XP Calculation
   ───────────────────────────────────────────────────────────── */

function calcDifficulty(teams: SwarmTeam[], connections: SwarmConnection[]): number {
  const totalNodes = teams.reduce((s, t) => s + t.members.length, 0);
  const cmdCount = teams.filter((t) => t.leadId).length;
  const toolCount = teams.reduce(
    (s, t) => s + t.members.filter((m) => ["tool-weaver", "knowledge-base", "skill-slot"].includes(m.defId)).length,
    0
  );
  const guardCount = teams.reduce(
    (s, t) => s + t.members.filter((m) => m.defId === "guardrail").length,
    0
  );

  // Base difficulty from node count
  let difficulty = totalNodes * 10;
  difficulty += cmdCount * 15; // Commander bonus
  difficulty += toolCount * 8; // Tool integration
  difficulty += guardCount * 5; // Safety compliance
  difficulty += connections.length * 3; // Pipeline complexity

  return difficulty;
}

/* ─────────────────────────────────────────────────────────────
   Synergy & Team Collaboration Bonus Calculation
   ───────────────────────────────────────────────────────────── */

interface SynergyInput {
  teams: SwarmTeam[];
  connections: SwarmConnection[];
  mode: TaskMode;
  difficulty: number;
}

/**
 * Calculate collaboration synergies:
 * - Multi-team XP multiplier (more teams = higher synergy)
 * - Cross-team connection bonus (connections between different teams)
 * - Mode multiplier (debate > parallel > chain for collaboration)
 * - Commander leadership bonus per cmd node
 */
function calcSynergy(input: SynergyInput): SynergyBreakdown {
  const { teams, connections, mode, difficulty } = input;

  // 1. Team synergy multiplier
  // 1 team = 1.0, 2 teams = 1.15, 3+ = 1.25
  const teamSynergyMultiplier =
    teams.length === 1 ? 1.0 :
    teams.length === 2 ? 1.15 :
    1.25;

  // 2. Cross-team connections bonus
  const nodeToTeam = new Map<string, number>();
  teams.forEach((team, idx) => {
    team.members.forEach((m) => nodeToTeam.set(m.id, idx));
  });

  let crossTeamLinks = 0;
  for (const conn of connections) {
    const fromTeam = nodeToTeam.get(conn.from);
    const toTeam = nodeToTeam.get(conn.to);
    if (fromTeam !== undefined && toTeam !== undefined && fromTeam !== toTeam) {
      crossTeamLinks++;
    }
  }
  const crossTeamConnectionsBonus = crossTeamLinks * 12;

  // 3. Mode multiplier
  // Chain: 1.0, Parallel: 1.15, Debate: 1.3
  const modeMultiplier =
    mode === "chain" ? 1.0 :
    mode === "parallel" ? 1.15 :
    1.3;

  // 4. Commander leadership bonus
  const cmdCount = teams.filter((t) => t.leadId).length;
  const commanderBonus = cmdCount * 20;

  // 5. Total
  const baseXp = Math.round(difficulty * teamSynergyMultiplier * modeMultiplier);
  const totalXpAwarded = baseXp + crossTeamConnectionsBonus + commanderBonus;

  return {
    baseDifficulty: difficulty,
    teamSynergyMultiplier,
    crossTeamConnectionsBonus,
    modeMultiplier,
    commanderBonus,
    totalXpAwarded,
  };
}

const RANK_TITLES: Record<string, string> = {
  E: "Novice",
  D: "Recruit",
  C: "Veteran",
  B: "Hunter",
  A: "Elite",
  S: "Sovereign",
};

const RANK_THRESHOLDS: Record<string, number> = {
  E: 0,
  D: 100,
  C: 350,
  B: 850,
  A: 1850,
  S: 3850,
};

const RANK_ORDER = ["E", "D", "C", "B", "A", "S"];

/**
 * Determines if a given XP total (after adding award) triggers a rank-up.
 */
function checkRankUp(totalXp: number, currentRank: string): { newRank: string | null; rankTitle: string | null } {
  const currentIdx = RANK_ORDER.indexOf(currentRank);
  if (currentIdx < 0 || currentIdx >= RANK_ORDER.length - 1) return { newRank: null, rankTitle: null };

  for (let i = currentIdx + 1; i < RANK_ORDER.length; i++) {
    const candidate = RANK_ORDER[i];
    if (totalXp >= (RANK_THRESHOLDS[candidate] ?? Infinity)) {
      return { newRank: candidate, rankTitle: RANK_TITLES[candidate] || null };
    }
  }

  return { newRank: null, rankTitle: null };
}

/* ─────────────────────────────────────────────────────────────
   Simulation
   ───────────────────────────────────────────────────────────── */

/**
 * Simulate a swarm run. Returns results with XP awards and
 * optional rank-up info.
 */
export function runSwarm(
  nodes: SwarmNodeInfo[],
  connections: SwarmConnection[],
  currentRank: string,
  currentTotalXp: number,
  modeOverride?: TaskMode
): SwarmResult {
  const teams = findTeams(nodes, connections);
  if (teams.length === 0) {
    return {
      success: false,
      tasksCompleted: 0,
      xpAwarded: 0,
      summary: "No teams formed. Add connections between nodes to create agent teams.",
      details: ["⚠️ No connected agent teams detected."],
      elapsed: 0,
    };
  }

  // Determine mode: explicit override > commander config > auto-detect
  const firstCmd = teams[0].members.find((m) => m.defId === "agent-cmd");
  const mode: TaskMode =
    modeOverride ||
    (firstCmd?.config?.strategy as TaskMode) ||
    (teams.length > 1 ? "parallel" : "chain");

  const difficulty = calcDifficulty(teams, connections);

  // Enhanced synergy-based XP calculation (team collaboration bonuses)
  const synergy = calcSynergy({ teams, connections, mode, difficulty });
  const xpAwarded = synergy.totalXpAwarded;

  // Simulate elapsed time
  const baseTime = 800 + teams.length * 400 + connections.length * 100;
  const elapsed = Math.min(baseTime, 5000); // Cap at 5s

  // Build execution summary details
  const details: string[] = [];
  details.push(`🧠 Mode: ${mode.toUpperCase()}`);
  details.push(`👥 Teams: ${teams.length}`);

  for (const team of teams) {
    const names = team.members.map((m) => `${m.icon}${m.label}`).join(" → ");
    details.push(`  • ${team.name}: [${names}]`);
    if (team.leadId) {
      const lead = team.members.find((m) => m.id === team.leadId);
      if (lead?.config?.strategy) {
        details.push(`    Strategy: ${lead.config.strategy}`);
      }
    }
  }

  // Synergy details
  if (teams.length > 1) {
    details.push(`🤝 Synergy: ${(synergy.teamSynergyMultiplier * 100).toFixed(0)}% team multiplier`);
  }
  if (synergy.crossTeamConnectionsBonus > 0) {
    details.push(`🔗 Cross-team links: +${synergy.crossTeamConnectionsBonus} XP`);
  }
  details.push(`🎯 Mode bonus: ${(synergy.modeMultiplier * 100).toFixed(0)}% mode multiplier`);
  if (synergy.commanderBonus > 0) {
    details.push(`⚔️ Leadership: +${synergy.commanderBonus} XP`);
  }

  details.push(`⚡ Base difficulty: ${difficulty} points`);
  details.push(`🎯 XP Earned: +${xpAwarded}`);

  // Check rank-up
  const newTotalXp = currentTotalXp + xpAwarded;
  const { newRank, rankTitle } = checkRankUp(newTotalXp, currentRank);

  if (newRank) {
    details.push(`🏆 RANK UP! ${newRank} — ${rankTitle}`);
  }

  // Subtle failures for dramatic effect (90% success rate)
  const rolled = Math.random();
  const success = rolled < 0.9;
  if (!success) {
    const failures = [
      "⚠️ Agent CMD timeout on Team 1 — retrying...",
      "⚠️ Memory conflict detected — cascading context...",
      "⚠️ Tool integration failed — falling back to baseline...",
      "⚠️ Guardrail triggered — rerouting response pipeline...",
      "⚠️ Parallel process deadlock — arbitrator resolved...",
    ];
    const chosen = failures[Math.floor(Math.random() * failures.length)];
    details.push(chosen);
  }

  details.push(success ? "✅ All teams completed." : "⚠️ Partial completion with recoverable errors.");
  details.push(`⏱️ ${elapsed}ms`);

  return {
    success,
    tasksCompleted: teams.length,
    xpAwarded: success ? xpAwarded : Math.round(xpAwarded * 0.6), // Partial XP on failure
    summary: success
      ? `${teams.length} team${teams.length > 1 ? "s" : ""} completed in ${elapsed}ms. ${xpAwarded} XP earned.`
      : `${teams.length} team${teams.length > 1 ? "s" : ""} ran with errors. Partial XP awarded.`,
    details,
    elapsed,
    newRank: newRank || undefined,
    rankTitle: rankTitle || undefined,
    synergy,
  };
}

export { findTeams, calcDifficulty, checkRankUp, calcSynergy };
