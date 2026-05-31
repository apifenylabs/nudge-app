"use client";

import { useState } from "react";
import NodePalette from "@/components/sandbox/NodePalette";
import AgentStudio from "@/components/sandbox/AgentStudio";
import SandboxPreview from "@/components/sandbox/SandboxPreview";
import ProgressionBar from "@/components/sandbox/ProgressionBar";

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

export default function SandboxPage() {
  const [selectedRank, setSelectedRank] = useState("E");
  const [canvasNodes, setCanvasNodes] = useState<CanvasNode[]>([]);
  const [canvasConnections, setCanvasConnections] = useState<Connection[]>([]);
  const [canvasXp, setCanvasXp] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleToggleRun = () => {
    setIsRunning((prev) => !prev);
  };

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
              {["E", "D", "C", "B", "A", "S"].map((rank) => (
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
