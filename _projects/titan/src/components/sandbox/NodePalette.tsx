"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Node Types — Draggable Agent Skill Nodes
   ───────────────────────────────────────────────────────────── */
export interface NodeDef {
  id: string;
  label: string;
  icon: string;
  desc: string;
  category: "core" | "tools" | "memory" | "advanced";
}

const NODES: NodeDef[] = [
  { id: "prompt-crafter", label: "Prompt Crafter", icon: "✍️", desc: "Design system prompts with variables, rules, and constraints.", category: "core" },
  { id: "tool-weaver",    label: "Tool Weaver",    icon: "🔧", desc: "Connect APIs, web search, calculators, and custom tools.", category: "tools" },
  { id: "memory-sage",    label: "Memory Sage",    icon: "🧠", desc: "Configure short-term, long-term, and episodic memory.",     category: "memory" },
  { id: "agent-cmd",      label: "Agent Commander",icon: "⚡", desc: "Multi-agent orchestration — routing, delegation, chain-of-thought.", category: "advanced" },
  { id: "knowledge-base", label: "Knowledge Base", icon: "📚", desc: "Upload docs, scrape URLs, or connect a database.",         category: "tools" },
  { id: "skill-slot",     label: "Skill Slot",     icon: "🎯", desc: "Teach a specific skill: coding, writing, analysis, research.", category: "core" },
  { id: "guardrail",      label: "Guardrail",      icon: "🛡️", desc: "Safety filters, topic boundaries, output validation.",      category: "advanced" },
  { id: "progression",    label: "Progression XP", icon: "⬆️", desc: "Tracks agent XP — unlocks higher-tier capabilities.",      category: "memory" },
];

interface Props {
  onDragStart: (node: NodeDef) => void;
  unlockedRanks: string[];
}

const CATEGORY_ICONS: Record<string, string> = {
  core: "⚙️",
  tools: "🔧",
  memory: "🧠",
  advanced: "💎",
};

export default function NodePalette({ onDragStart, unlockedRanks }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = ["all", ...new Set(NODES.map((n) => n.category))];

  const filtered = activeCategory === "all" ? NODES : NODES.filter((n) => n.category === activeCategory);

  const isLocked = (nodeId: string) => {
    if (unlockedRanks.includes("S")) return false;
    const lockedAdvanced = ["guardrail", "agent-cmd"];
    const lockedMid = ["knowledge-base", "progression"];
    if (lockedAdvanced.includes(nodeId) && !unlockedRanks.includes("A")) return true;
    if (lockedMid.includes(nodeId) && !unlockedRanks.includes("B")) return true;
    return false;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-3 border-b border-white/10">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Node Palette</h3>
        <p className="text-[10px] text-white/30 mt-0.5">Drag nodes onto the canvas</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-white/5 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-white/40 hover:text-white/70 border border-transparent"
            }`}
          >
            {cat === "all" ? "✨ All" : `${CATEGORY_ICONS[cat] || ""} ${cat}`}
          </button>
        ))}
      </div>

      {/* Node List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filtered.map((node) => {
          const locked = isLocked(node.id);
          return (
            <div
              key={node.id}
              draggable={!locked}
              onDragStart={(e) => {
                if (!locked) {
                  e.dataTransfer.setData("application/json", JSON.stringify(node));
                  onDragStart(node);
                }
              }}
              className={`group relative p-2 rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                locked
                  ? "border-white/5 opacity-40 cursor-not-allowed"
                  : "border-white/10 hover:border-cyan-500/40 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">{node.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-white/80">{node.label}</span>
                    {locked && <span className="text-[9px] text-amber-400/60">🔒</span>}
                  </div>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-tight">{node.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="px-3 py-2 border-t border-white/5">
        <p className="text-[9px] text-white/20 text-center">
          Unlock Advanced nodes at Rank B+ &middot; Kit nodes at Rank A+
        </p>
      </div>
    </div>
  );
}
