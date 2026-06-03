"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { runSwarm, type SwarmResult, type TaskMode } from "@/lib/swarm-orchestrator";
import { useXpNotification } from "@/components/XpNotification";
import DeployModal from "./DeployModal";

/* ─────────────────────────────────────────────────────────────
   SandboxPreview — Live output/preview pane
   Shows node/connection stats, runs swarm orchestration, and
   triggers XP toasts on completion.
   ───────────────────────────────────────────────────────────── */

interface NodeData {
  id: string;
  label: string;
  icon: string;
  defId: string;
  config?: Record<string, string>;
}

interface ConnectionData {
  from: string;
  to: string;
}

interface Props {
  nodes: NodeData[];
  connections: ConnectionData[];
  isRunning: boolean;
  onToggleRun: () => void;
  selectedRank: string;
  /** Optional external XP counter (from sandbox page). If absent, treats XP locally. */
  externalXp?: number;
  /** Called after a swarm run awards XP. Parent can use this to update its XP state. */
  onXpAwarded?: (amount: number) => void;
  /** Override orchestration mode. Default: auto-detect from team config. */
  swarmMode?: TaskMode;
}

export default function SandboxPreview({
  nodes,
  connections,
  isRunning,
  onToggleRun,
  selectedRank,
  externalXp,
  onXpAwarded,
  swarmMode,
}: Props) {
  const [deployOpen, setDeployOpen] = useState(false);
  const [lastResult, setLastResult] = useState<SwarmResult | null>(null);
  const [swarmState, setSwarmState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [localXpAccum, setLocalXpAccum] = useState(0);
  const [selectedMode, setSelectedMode] = useState<TaskMode>("chain");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const xpNotify = useXpNotification();

  // Clean up timers
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* ── Swarm Execution ── */
  const handleRunSwarm = useCallback(() => {
    if (nodes.length === 0 || connections.length === 0) return;

    setSwarmState("running");
    setLastResult(null);

    // Simulate async execution delay
    timerRef.current = setTimeout(() => {
      const currentXp = externalXp !== undefined ? externalXp : localXpAccum;
      const effectiveMode = swarmMode || selectedMode;
      const result = runSwarm(nodes, connections, selectedRank, currentXp, effectiveMode);
      setLastResult(result);
      setSwarmState("done");
      setLocalXpAccum((prev) => prev + result.xpAwarded);
      onXpAwarded?.(result.xpAwarded);

      // Push XP toast
      if (result.newRank && result.rankTitle) {
        xpNotify.push({
          amount: result.xpAwarded,
          source: "Swarm Orchestration",
          newRank: result.newRank,
          rankTitle: result.rankTitle,
        });
      } else {
        xpNotify.push({
          amount: result.xpAwarded,
          source: "Swarm Orchestration",
        });
      }
    }, 600); // Brief delay for dramatic effect
  }, [nodes, connections, selectedRank, externalXp, localXpAccum, onXpAwarded, xpNotify, swarmMode, selectedMode]);

  // Reset running state after result
  useEffect(() => {
    if (swarmState === "done" || swarmState === "error") {
      onToggleRun();
    }
  }, [swarmState, onToggleRun]);

  /* ── Summary stats ── */
  const promptCrafter = nodes.find((n) => n.defId === "prompt-crafter");
  const commander = nodes.find((n) => n.defId === "agent-cmd");
  const guard = nodes.find((n) => n.defId === "guardrail");
  const memoryCount = nodes.filter((n) => ["memory-sage"].includes(n.defId)).length;
  const toolCount = nodes.filter((n) => ["tool-weaver", "knowledge-base", "skill-slot"].includes(n.defId)).length;

  /* ── Group nodes by category ── */
  const core = nodes.filter((n) => ["prompt-crafter", "agent-cmd"].includes(n.defId));
  const tools = nodes.filter((n) => ["tool-weaver", "knowledge-base", "skill-slot"].includes(n.defId));
  const memory = nodes.filter((n) => ["memory-sage"].includes(n.defId));
  const advanced = nodes.filter((n) => ["guardrail", "progression"].includes(n.defId));

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-900/80 border-b border-white/10">
        <span className="text-xs font-semibold text-white/60">Preview</span>
        <div className="flex items-center gap-2">
          {/* Swarm Mode Selector */}
          {!swarmMode && (
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value as TaskMode)}
              disabled={swarmState === "running"}
              className="px-1.5 py-1 rounded text-[9px] font-semibold bg-gray-800 text-white/60 border border-white/10 focus:outline-none focus:border-cyan-500/40 cursor-pointer disabled:opacity-30"
            >
              <option value="chain">🔗 Chain</option>
              <option value="parallel">⚡ Parallel</option>
              <option value="debate">💬 Debate</option>
            </select>
          )}
          {/* Run Swarm button */}
          <button
            onClick={handleRunSwarm}
            disabled={swarmState === "running" || nodes.length === 0 || connections.length === 0}
            className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
              swarmState === "running"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                : nodes.length === 0 || connections.length === 0
                ? "bg-white/5 text-white/20 cursor-not-allowed"
                : "bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30"
            }`}
          >
            {swarmState === "running" ? "🌀 Running..." : "🐝 Run Swarm"}
          </button>
          <button
            onClick={() => {
              onToggleRun();
              setDeployOpen(true);
            }}
            disabled={nodes.length === 0}
            className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
              nodes.length === 0
                ? "bg-white/5 text-white/20 cursor-not-allowed"
                : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
            }`}
          >
            🚀 Deploy
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <span className="text-2xl block mb-2">📟</span>
              <p className="text-[10px] text-white/30">
                Add nodes to the canvas to see a preview summary.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Agent Name */}
            <div>
              <h3 className="text-xs font-semibold text-white/80 mb-1">
                {commander ? commander.label : promptCrafter ? promptCrafter.label : "Unnamed Agent"}
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Rank {selectedRank}
                </span>
                <span className="text-[9px] text-white/30">
                  {nodes.length} node{nodes.length !== 1 ? "s" : ""}
                </span>
                {connections.length > 0 && (
                  <span className="text-[9px] text-white/20">
                    {connections.length} link{connections.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>

            {/* Nodes sections (same as before) */}
            {core.length > 0 && (
              <Section title="Core">
                {core.map((n) => (
                  <NodeBadge key={n.id} icon={n.icon} label={n.label} config={n.config} />
                ))}
              </Section>
            )}
            {tools.length > 0 && (
              <Section title={`Tools (${toolCount})`}>
                {tools.map((n) => (
                  <NodeBadge key={n.id} icon={n.icon} label={n.label} config={n.config} />
                ))}
              </Section>
            )}
            {memory.length > 0 && (
              <Section title={`Memory (${memoryCount})`}>
                {memory.map((n) => (
                  <NodeBadge key={n.id} icon={n.icon} label={n.label} config={n.config} />
                ))}
              </Section>
            )}
            {advanced.length > 0 && (
              <Section title="Safety & Progression">
                {advanced.map((n) => (
                  <NodeBadge key={n.id} icon={n.icon} label={n.label} config={n.config} />
                ))}
              </Section>
            )}

            {/* Connections Summary */}
            {connections.length > 0 && (
              <div className="pt-2 border-t border-white/5">
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Pipeline</p>
                <div className="flex items-center gap-1 text-[10px] text-cyan-400/60">
                  <span>🔗</span>
                  <span>{connections.length} data flow{connections.length !== 1 ? "s" : ""} active</span>
                </div>
              </div>
            )}

            {/* Guards */}
            {guard && (
              <div className="pt-2 border-t border-white/5">
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Protection</p>
                <p className="text-[10px] text-green-400/60">
                  🛡️ Guardrails enabled{guard.config?.topics ? ` (${guard.config.topics})` : ""}
                </p>
              </div>
            )}

            {/* ── Swarm Results ── */}
            {swarmState === "running" && (
              <div className="pt-2 border-t border-white/5 animate-pulse">
                <p className="text-[10px] text-amber-400/70 font-semibold">🌀 Swarm in progress...</p>
                <p className="text-[9px] text-white/30 mt-1">
                  Orchestrating {connections.length} flows across {nodes.length} agents...
                </p>
              </div>
            )}

            {lastResult && (swarmState === "done" || swarmState === "error") && (
              <div
                className={`pt-2 border-t border-white/5 ${
                  lastResult.success ? "" : "opacity-80"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {lastResult.newRank ? (
                    <span className="text-sm">🏆</span>
                  ) : lastResult.success ? (
                    <span className="text-sm">✅</span>
                  ) : (
                    <span className="text-sm">⚠️</span>
                  )}
                  <p
                    className={`text-[10px] font-semibold ${
                      lastResult.newRank
                        ? "text-yellow-300"
                        : lastResult.success
                        ? "text-green-400/80"
                        : "text-amber-400/80"
                    }`}
                  >
                    {lastResult.success
                      ? lastResult.newRank
                        ? `Rank Up! ${lastResult.newRank}`
                        : "Swarm Complete"
                      : "Partial Success"}
                  </p>
                </div>

                {/* Execution log */}
                <div className="bg-black/40 rounded-lg px-2.5 py-2 border border-white/5 space-y-0.5 max-h-[240px] overflow-y-auto">
                  {lastResult.details.map((line, i) => (
                    <p
                      key={i}
                      className={`text-[9px] font-mono ${
                        line.startsWith("🏆")
                          ? "text-yellow-400 font-bold"
                          : line.startsWith("⚠️")
                          ? "text-amber-400/80"
                          : line.startsWith("✅")
                          ? "text-green-400/70"
                          : line.startsWith("🧠") || line.startsWith("👥") || line.startsWith("⚡") || line.startsWith("🎯") || line.startsWith("⏱️")
                          ? "text-cyan-300/80"
                          : line.startsWith("  •") || line.startsWith("    ")
                          ? "text-white/40"
                          : "text-white/30"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Synergy breakdown (when available) */}
                {lastResult.synergy && lastResult.synergy.teamSynergyMultiplier > 1 && (
                  <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5 bg-white/[0.02] rounded px-2 py-1.5 border border-white/5">
                    <span className="text-[8px] text-white/30">Team synergy</span>
                    <span className="text-[8px] text-cyan-300/70 text-right">
                      ×{lastResult.synergy.teamSynergyMultiplier.toFixed(2)}
                    </span>
                    <span className="text-[8px] text-white/30">Mode multiplier</span>
                    <span className="text-[8px] text-cyan-300/70 text-right">
                      ×{lastResult.synergy.modeMultiplier.toFixed(2)}
                    </span>
                    {lastResult.synergy.crossTeamConnectionsBonus > 0 && (
                      <>
                        <span className="text-[8px] text-white/30">Cross-team links</span>
                        <span className="text-[8px] text-green-400/70 text-right">
                          +{lastResult.synergy.crossTeamConnectionsBonus} XP
                        </span>
                      </>
                    )}
                    {lastResult.synergy.commanderBonus > 0 && (
                      <>
                        <span className="text-[8px] text-white/30">Leadership bonus</span>
                        <span className="text-[8px] text-purple-400/70 text-right">
                          +{lastResult.synergy.commanderBonus} XP
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* XP flash */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-300 tabular-nums">
                    +{lastResult.xpAwarded} XP
                  </span>
                  <span className="text-[8px] text-white/20">{lastResult.elapsed}ms</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer stats */}
      {nodes.length > 0 && (
        <div className="px-3 py-1.5 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] text-white/20">{nodes.length} nodes</span>
          <span className="text-[9px] text-white/20">{connections.length} links</span>
        </div>
      )}

      {/* ── Deploy Modal ── */}
      <DeployModal
        open={deployOpen}
        onClose={() => {
          setDeployOpen(false);
          onToggleRun();
        }}
        nodes={nodes}
        connections={connections}
        selectedRank={selectedRank}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1.5">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NodeBadge({ icon, label, config }: { icon: string; label: string; config?: Record<string, string> }) {
  const configPreview = config && Object.keys(config).length > 0
    ? Object.entries(config).slice(0, 1).map(([k, v]) => `${k}: ${v}`).join(", ")
    : null;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
      <span className="text-xs">{icon}</span>
      <span className="text-[10px] text-white/70 truncate flex-1">{label}</span>
      {configPreview && (
        <span className="text-[7px] text-white/20 truncate max-w-[80px]">{configPreview}</span>
      )}
    </div>
  );
}
