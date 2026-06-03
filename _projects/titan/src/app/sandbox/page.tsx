"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NodePalette from "@/components/sandbox/NodePalette";
import AgentStudio from "@/components/sandbox/AgentStudio";
import SandboxPreview from "@/components/sandbox/SandboxPreview";
import ProgressionBar from "@/components/sandbox/ProgressionBar";
import { useProgression } from "@/hooks/useProgression";
import { useXpNotification } from "@/components/XpNotification";

/* ─────────────────────────────────────────────────────────────
   Sandbox Page — Interactive Agent Builder
   Split-panel layout: Palette (left) + Studio (center) + Preview (right)
   ───────────────────────────────────────────────────────────── */

interface CanvasNode {
  id: string;
  label: string;
  icon: string;
  defId: string;
  config?: Record<string, string>;
}

interface Connection {
  from: string;
  to: string;
}

const RANKS = ["E", "D", "C", "B", "A", "S"];

const RANK_THRESHOLDS: Record<string, number> = { E: 100, D: 250, C: 500, B: 1000, A: 2000, S: Infinity };
const RANK_TITLES: Record<string, string> = { D: "Recruit", C: "Veteran", B: "Hunter", A: "Elite", S: "Sovereign" };

export default function SandboxPage() {
  const [selectedRank, setSelectedRank] = useState<string>("E");
  const [canvasNodes, setCanvasNodes] = useState<CanvasNode[]>([]);
  const [canvasConnections, setCanvasConnections] = useState<Connection[]>([]);

  // Connected progression — falls back to mock when Supabase unconfigured
  const progression = useProgression();
  const [canvasXp, setCanvasXp] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const xpNotify = useXpNotification();

  // Refs for latest rank/xp so callbacks don't stale-close
  const rankRef = useRef(selectedRank);
  const xpRef = useRef(canvasXp);
  useEffect(() => { rankRef.current = selectedRank; }, [selectedRank]);
  useEffect(() => { xpRef.current = canvasXp; }, [canvasXp]);

  // Seed from progression when data loads
  useEffect(() => {
    if (progression?.profile && canvasXp === 0) {
      setCanvasXp(progression.profile.total_xp);
      setSelectedRank(progression.profile.current_rank);
    }
  }, [progression?.profile?.total_xp]);

  // Rank-up check helper (uses refs for fresh values)
  const checkAndApplyRankUp = useCallback((totalXp: number, gain: number, source: string) => {
    const currentRank = rankRef.current;
    const currentThreshold = RANK_THRESHOLDS[currentRank];
    const curIdx = RANKS.indexOf(currentRank);

    if (currentThreshold && totalXp >= currentThreshold && curIdx < RANKS.length - 1) {
      const nextRank = RANKS[curIdx + 1];
      setSelectedRank(nextRank);
      setCanvasXp(totalXp - currentThreshold);
      xpNotify.push({
        amount: gain,
        source,
        newRank: nextRank,
        rankTitle: RANK_TITLES[nextRank],
      });
      return true;
    }
    return false;
  }, [xpNotify]);

  // Demo: simulate XP gain
  const handleAddXp = useCallback(() => {
    const gain = Math.floor(Math.random() * 30) + 5;
    const currentRank = rankRef.current;
    const currentXp = xpRef.current;
    const newXp = currentXp + gain;

    const ranked = checkAndApplyRankUp(newXp, gain, "Agent Studio — Sandbox simulation");
    if (!ranked) {
      setCanvasXp(newXp);
      xpNotify.push({ amount: gain, source: "Agent Studio — Sandbox simulation" });
    }
  }, [checkAndApplyRankUp, xpNotify]);

  // Swarm XP handler (called from SandboxPreview)
  const handleSwarmXp = useCallback((amount: number) => {
    const currentRank = rankRef.current;
    const currentXp = xpRef.current;
    const newXp = currentXp + amount;

    const ranked = checkAndApplyRankUp(newXp, amount, "Swarm Orchestration");
    if (!ranked) {
      setCanvasXp(newXp);
    }
  }, [checkAndApplyRankUp]);

  const handleToggleRun = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  /* Node palette — only as many ranks as current rank or below */
  const unlockedRanks =
    selectedRank === "E" ? ["E"] :
    selectedRank === "D" ? ["E", "D"] :
    selectedRank === "C" ? ["E", "D", "C"] :
    selectedRank === "B" ? ["E", "D", "C", "B"] :
    selectedRank === "A" ? ["E", "D", "C", "B", "A"] :
    ["E", "D", "C", "B", "A", "S"];

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 bg-gray-900/50 border-b border-white/10">
        <a href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <span className="text-lg">⚔️</span>
          <span className="font-bold text-sm">Titan</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/features" className="text-[11px] text-white/40 hover:text-white/70">Features</a>
          <a href="/pricing" className="text-[11px] text-white/40 hover:text-white/70">Pricing</a>
          <a href="/dashboard" className="text-[11px] text-white/40 hover:text-white/70">Dashboard</a>
        </div>
      </nav>

      {/* Header — Rank Selector + Progression Bar */}
      <div className="px-6 py-4 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-6xl mx-auto flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Agent Studio</h1>
            <p className="text-sm text-white/40 mt-1">
              Build your AI agent army — drag, connect, configure, and rank up.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Current Rank:</span>
              {RANKS.map((rank) => (
                <button
                  key={rank}
                  onClick={() => setSelectedRank(rank)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    selectedRank === rank
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                      : "bg-white/5 text-white/40 border border-white/10 hover:border-white/30"
                  }`}
                >
                  {rank}
                </button>
              ))}
            </div>
          </div>

          {/* Progression Bar (compact) */}
          <div className="w-64 shrink-0 mt-1">
            <div className="flex justify-end mb-2">
              <button
                onClick={handleAddXp}
                className="text-[10px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
              >
                ✨ +XP
              </button>
            </div>
            <ProgressionBar
              currentRank={selectedRank}
              currentXp={canvasXp}
              onRankSelect={setSelectedRank}
              compact={false}
            />
          </div>
        </div>
      </div>

      {/* Main Layout — Palette (left) + Studio (center) + Preview (right) */}
      <div className="flex-1 flex px-6 pb-6 gap-4 max-w-7xl mx-auto w-full min-h-0">
        {/* Sidebar — Node Palette */}
        <div className="w-56 bg-gray-900/60 border border-white/10 rounded-xl overflow-hidden flex-shrink-0">
          <NodePalette
            onDragStart={() => {}}
            unlockedRanks={unlockedRanks}
          />
        </div>

        {/* Center — Agent Studio Canvas */}
        <div className="flex-1 bg-gray-900/40 border border-white/10 rounded-xl overflow-hidden min-w-0">
          <AgentStudio
            selectedRank={selectedRank}
            onNodesChange={(nodes, connections, xp) => {
              setCanvasNodes(nodes);
              setCanvasConnections(connections);
              if (xp !== undefined) setCanvasXp(xp);
            }}
          />
        </div>

        {/* Right — Sandbox Preview / Live Output */}
        <div className="w-72 bg-gray-900/60 border border-white/10 rounded-xl overflow-hidden flex-shrink-0">
          <SandboxPreview
            nodes={canvasNodes}
            connections={canvasConnections}
            isRunning={isRunning}
            onToggleRun={handleToggleRun}
            selectedRank={selectedRank}
            externalXp={canvasXp}
            onXpAwarded={handleSwarmXp}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/5 bg-gray-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-[10px] text-white/20">
            Titan Agent Studio &mdash; Drag nodes to build. Connect to orchestrate. Rank up to unlock.
          </p>
          <p className="text-[10px] text-white/10">v0.2.0 &middot; Interactive Sandbox + Live Preview</p>
        </div>
      </footer>
    </div>
  );
}
