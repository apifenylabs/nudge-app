"use client";

import { useState } from "react";
import NodePalette from "@/components/sandbox/NodePalette";
import AgentStudio from "@/components/sandbox/AgentStudio";

/* ─────────────────────────────────────────────────────────────
   Sandbox Page — Interactive Agent Builder
   ───────────────────────────────────────────────────────────── */
export default function SandboxPage() {
  const [selectedRank, setSelectedRank] = useState("E");

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

      {/* Header */}
      <div className="px-6 py-6 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Agent Studio</h1>
          <p className="text-sm text-white/40 mt-1">
            Build your AI agent army — drag, connect, configure, and rank up.
          </p>

          {/* Rank Selector */}
          <div className="flex items-center gap-2 mt-4">
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
      </div>

      {/* Main Layout — Palette (left) + Studio (right) */}
      <div className="flex-1 flex px-6 pb-6 gap-4 max-w-7xl mx-auto w-full">
        {/* Sidebar — Node Palette */}
        <div className="w-56 bg-gray-900/60 border border-white/10 rounded-xl overflow-hidden flex-shrink-0">
          <NodePalette
            onDragStart={() => {}}
            unlockedRanks={
              selectedRank === "E" ? ["E"] :
              selectedRank === "D" ? ["E", "D"] :
              selectedRank === "C" ? ["E", "D", "C"] :
              selectedRank === "B" ? ["E", "D", "C", "B"] :
              selectedRank === "A" ? ["E", "D", "C", "B", "A"] :
              ["E", "D", "C", "B", "A", "S"]
            }
          />
        </div>

        {/* Main — Agent Studio Canvas */}
        <div className="flex-1 bg-gray-900/40 border border-white/10 rounded-xl overflow-hidden">
          <AgentStudio selectedRank={selectedRank} />
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/5 bg-gray-900/30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-[10px] text-white/20">
            Titan Agent Studio &mdash; Drag nodes to build. Connect to orchestrate. Rank up to unlock.
          </p>
          <p className="text-[10px] text-white/10">v0.1.0 &middot; Interactive Sandbox</p>
        </div>
      </footer>
    </div>
  );
}
