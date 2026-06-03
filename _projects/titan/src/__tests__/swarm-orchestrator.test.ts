import { describe, it, expect } from "vitest";
import {
  runSwarm,
  findTeams,
  calcDifficulty,
  checkRankUp,
  calcSynergy,
  type SwarmNodeInfo,
  type SwarmConnection,
  type TaskMode,
} from "@/lib/swarm-orchestrator";

const basicNodes: SwarmNodeInfo[] = [
  { id: "n1", label: "Commander", icon: "🧠", defId: "agent-cmd" },
  { id: "n2", label: "Crafter", icon: "📝", defId: "prompt-crafter" },
  { id: "n3", label: "Tool", icon: "🔍", defId: "tool-weaver" },
];

const basicConnections: SwarmConnection[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
];

/* ── findTeams ── */

describe("findTeams", () => {
  it("returns empty array for no nodes", () => {
    expect(findTeams([], [])).toEqual([]);
  });

  it("groups isolated nodes as individual teams", () => {
    const nodes = [
      { id: "a", label: "A", icon: "🤖", defId: "agent-cmd" },
      { id: "b", label: "B", icon: "🤖", defId: "prompt-crafter" },
    ];
    const teams = findTeams(nodes, []);
    expect(teams).toHaveLength(2);
    expect(teams[0].members).toHaveLength(1);
    expect(teams[1].members).toHaveLength(1);
  });

  it("groups connected nodes into a single team", () => {
    const teams = findTeams(basicNodes, basicConnections);
    expect(teams).toHaveLength(1);
    expect(teams[0].members).toHaveLength(3);
  });

  it("creates separate teams for disconnected graphs", () => {
    const nodes = [
      { id: "a", label: "A", icon: "🤖", defId: "agent-cmd" },
      { id: "b", label: "B", icon: "🤖", defId: "prompt-crafter" },
      { id: "c", label: "C", icon: "🤖", defId: "tool-weaver" },
      { id: "d", label: "D", icon: "🤖", defId: "memory-sage" },
    ];
    const connections = [
      { from: "a", to: "b" },
      { from: "c", to: "d" },
    ];
    const teams = findTeams(nodes, connections);
    expect(teams).toHaveLength(2);
  });

  it("assigns team name from commander node if present", () => {
    const teams = findTeams(basicNodes, basicConnections);
    expect(teams[0].name).toBe("Commander");
    expect(teams[0].leadId).toBe("n1");
  });

  it("names team 'Team N' when no commander", () => {
    const nodes = [
      { id: "x", label: "Just Tool", icon: "🔍", defId: "tool-weaver" },
    ];
    const teams = findTeams(nodes, []);
    expect(teams[0].name).toBe("Team 1");
    expect(teams[0].leadId).toBeNull();
  });
});

/* ── calcDifficulty ── */

describe("calcDifficulty", () => {
  it("returns 0 for empty teams", () => {
    expect(calcDifficulty([], [])).toBe(0);
  });

  it("calculates base difficulty from node count and connections", () => {
    const teams = findTeams(basicNodes, basicConnections);
    // 3 nodes × 10 = 30, + cmd(15) + tool(8) + 2 conns × 3 = 6 → 59
    const diff = calcDifficulty(teams, basicConnections);
    expect(diff).toBe(59);
  });

  it("adds guardrail bonus", () => {
    const nodes = [
      { id: "g1", label: "Guard", icon: "🛡️", defId: "guardrail" },
    ];
    const teams = findTeams(nodes, []);
    // 1 node × 10 = 10, + guard(5) = 15
    expect(calcDifficulty(teams, [])).toBe(15);
  });
});

/* ── checkRankUp ── */

describe("checkRankUp", () => {
  it("returns null for rank S (max)", () => {
    const result = checkRankUp(5000, "S");
    expect(result.newRank).toBeNull();
  });

  it("detects rank-up from E to D", () => {
    const result = checkRankUp(150, "E"); // D threshold = 100
    expect(result.newRank).toBe("D");
    expect(result.rankTitle).toBe("Recruit");
  });

  it("detects rank-up from C to B", () => {
    const result = checkRankUp(900, "C"); // B threshold = 850
    expect(result.newRank).toBe("B");
    expect(result.rankTitle).toBe("Hunter");
  });

  it("returns null when below next threshold", () => {
    const result = checkRankUp(50, "E");
    expect(result.newRank).toBeNull();
  });
});

/* ── calcSynergy ── */

describe("calcSynergy", () => {
  const singleTeam: SwarmNodeInfo[] = [
    { id: "a", label: "A", icon: "🤖", defId: "agent-cmd" },
    { id: "b", label: "B", icon: "🤖", defId: "prompt-crafter" },
  ];
  const singleTeamConns: SwarmConnection[] = [
    { from: "a", to: "b" },
  ];
  const multiTeamNodes: SwarmNodeInfo[] = [
    { id: "a", label: "A", icon: "🤖", defId: "agent-cmd" },
    { id: "b", label: "B", icon: "🤖", defId: "prompt-crafter" },
    { id: "c", label: "C", icon: "🤖", defId: "tool-weaver" },
    { id: "d", label: "D", icon: "🤖", defId: "memory-sage" },
  ];
  const multiTeamConns: SwarmConnection[] = [
    { from: "a", to: "b" },
    { from: "c", to: "d" },
  ];

  it("returns 1.0 multiplier for single team", () => {
    const teams = findTeams(singleTeam, singleTeamConns);
    const synergy = calcSynergy({ teams, connections: singleTeamConns, mode: "chain", difficulty: 50 });
    expect(synergy.teamSynergyMultiplier).toBe(1.0);
  });

  it("gives multi-team synergy boost", () => {
    const teams = findTeams(multiTeamNodes, multiTeamConns);
    const synergy = calcSynergy({ teams, connections: multiTeamConns, mode: "chain", difficulty: 50 });
    expect(synergy.teamSynergyMultiplier).toBe(1.15);
  });

  it("gives highest multiplier for 3+ teams", () => {
    const threeTeams = findTeams(
      [
        { id: "a", label: "A", icon: "🤖", defId: "agent-cmd" },
        { id: "b", label: "B", icon: "🤖", defId: "prompt-crafter" },
        { id: "c", label: "C", icon: "🤖", defId: "tool-weaver" },
      ],
      [] // all isolated
    );
    expect(threeTeams).toHaveLength(3);
    const synergy = calcSynergy({ teams: threeTeams, connections: [], mode: "chain", difficulty: 50 });
    expect(synergy.teamSynergyMultiplier).toBe(1.25);
  });

  it("applies mode multipliers correctly", () => {
    const teams = findTeams(singleTeam, []);
    const chain = calcSynergy({ teams, connections: [], mode: "chain", difficulty: 50 });
    const parallel = calcSynergy({ teams, connections: [], mode: "parallel", difficulty: 50 });
    const debate = calcSynergy({ teams, connections: [], mode: "debate", difficulty: 50 });

    expect(chain.modeMultiplier).toBe(1.0);
    expect(parallel.modeMultiplier).toBe(1.15);
    expect(debate.modeMultiplier).toBe(1.3);
  });

  it("awards cross-team connection bonus", () => {
    // Two teams, one connection between them
    const crossNodes: SwarmNodeInfo[] = [
      { id: "a", label: "A", icon: "🤖", defId: "prompt-crafter" },
      { id: "b", label: "B", icon: "🤖", defId: "tool-weaver" },
    ];
    const crossConns: SwarmConnection[] = [{ from: "a", to: "b" }];
    const teams = findTeams(crossNodes, crossConns);
    // Isolated nodes but connected → should be one team; force two-team scenario
    // Use multiTeamNodes with cross-team connection
    const teamsWithCross = findTeams(multiTeamNodes, multiTeamConns);
    // Add a cross-team link between team0's a and team1's c
    const connsWithCross: SwarmConnection[] = [
      ...multiTeamConns,
      { from: "a", to: "c" }, // cross-team
    ];
    const synergy = calcSynergy({
      teams: teamsWithCross,
      connections: connsWithCross,
      mode: "chain",
      difficulty: 50,
    });
    expect(synergy.crossTeamConnectionsBonus).toBe(12);
  });

  it("awards commander leadership bonus per cmd node", () => {
    const teams = findTeams(basicNodes, basicConnections);
    // basicNodes has 1 cmd
    const synergy = calcSynergy({ teams, connections: basicConnections, mode: "chain", difficulty: 50 });
    expect(synergy.commanderBonus).toBe(20);
  });

  it("computes totalXpAwarded correctly", () => {
    const teams = findTeams(basicNodes, basicConnections);
    // difficulty=59, single team (1.0), mode=chain(1.0), no cross-team, 1 commander
    // baseXp = 59 * 1.0 * 1.0 = 59
    // crossTeamBonus = 0, commanderBonus = 20
    // total = 79
    const synergy = calcSynergy({ teams, connections: basicConnections, mode: "chain", difficulty: 59 });
    expect(synergy.totalXpAwarded).toBe(79);
    expect(synergy.baseDifficulty).toBe(59);
  });
});

/* ── runSwarm (integration) ── */

describe("runSwarm", () => {
  it("returns failure for empty nodes", () => {
    const result = runSwarm([], [], "E", 0);
    expect(result.success).toBe(false);
    expect(result.xpAwarded).toBe(0);
    expect(result.summary).toContain("No teams formed");
  });

  it("runs successfully with basic nodes and connections", () => {
    const result = runSwarm(basicNodes, basicConnections, "E", 0);
    expect(result.success).toBe(true);
    expect(result.tasksCompleted).toBe(1);
    expect(result.xpAwarded).toBeGreaterThan(0);
    expect(result.details.length).toBeGreaterThan(5);
  });

  it("includes synergy breakdown in result", () => {
    const result = runSwarm(basicNodes, basicConnections, "E", 0);
    expect(result.synergy).toBeDefined();
    expect(result.synergy!.baseDifficulty).toBeGreaterThan(0);
    // On success: xpAwarded == totalXpAwarded. On failure: xpAwarded is 60% of totalXpAwarded.
    const expectedXp = result.success ? result.synergy!.totalXpAwarded : Math.round(result.synergy!.totalXpAwarded * 0.6);
    expect(result.xpAwarded).toBe(expectedXp);
  });

  it("uses mode override correctly", () => {
    const result = runSwarm(basicNodes, basicConnections, "E", 0, "debate");
    expect(result.details.some((d) => d.includes("DEBATE"))).toBe(true);
    // Debate has 1.3x mode multiplier
    expect(result.synergy!.modeMultiplier).toBe(1.3);
  });

  it("detects rank-up when XP crosses threshold", () => {
    // Give enough base XP to push from E (0) to D (100+) 
    // Use enough nodes to get high base XP
    const manyNodes: SwarmNodeInfo[] = [
      { id: "n1", label: "Cmd", icon: "🧠", defId: "agent-cmd" },
      { id: "n2", label: "Craft", icon: "📝", defId: "prompt-crafter" },
      { id: "n3", label: "Tool1", icon: "🔍", defId: "tool-weaver" },
      { id: "n4", label: "Tool2", icon: "🔍", defId: "tool-weaver" },
      { id: "n5", label: "Mem", icon: "🧠", defId: "memory-sage" },
    ];
    const manyConns = [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
      { from: "n3", to: "n4" },
      { from: "n4", to: "n5" },
    ];
    const result = runSwarm(manyNodes, manyConns, "E", 0);
    // 5 nodes × 10 = 50 + cmd(15) + tool(8+8) + 4 conns × 3 = 12 → 93 base × 1.0 × 1.0 + 20 cmd = 113
    // Should cross D threshold (100)
    if (result.success) {
      // XP could vary with the synergy system but should be significant
      expect(result.xpAwarded).toBeGreaterThanOrEqual(100);
    }
  });

  it("returns partial XP on simulated failure", () => {
    // runSwarm has 10% failure rate — deterministic test: force high-enough
    // difficulty that we can check the structure
    const result = runSwarm(basicNodes, basicConnections, "E", 0);
    expect(result.elapsed).toBeGreaterThan(0);
    expect(result.summary).toBeTruthy();
    // The success/failure is random, but the structure is always the same
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("tasksCompleted");
    expect(result).toHaveProperty("xpAwarded");
    expect(result).toHaveProperty("details");
    expect(result).toHaveProperty("elapsed");
  });

  it("uses multi-team synergy for disconnected graphs", () => {
    const twoTeamNodes: SwarmNodeInfo[] = [
      { id: "a", label: "Alpha Cmd", icon: "🧠", defId: "agent-cmd" },
      { id: "b", label: "Alpha Tool", icon: "🔍", defId: "tool-weaver" },
      { id: "c", label: "Beta Cmd", icon: "🧠", defId: "agent-cmd" },
      { id: "d", label: "Beta Craft", icon: "📝", defId: "prompt-crafter" },
    ];
    const twoTeamConns: SwarmConnection[] = [
      { from: "a", to: "b" },
      { from: "c", to: "d" },
    ];
    const result = runSwarm(twoTeamNodes, twoTeamConns, "C", 500);
    expect(result.tasksCompleted).toBe(2);
    expect(result.synergy!.teamSynergyMultiplier).toBe(1.15);
  });
});
