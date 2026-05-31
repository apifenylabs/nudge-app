"use client";

import { useState, useCallback, useRef, useEffect, useReducer } from "react";
import type { NodeDef } from "./NodePalette";

/* ─────────────────────────────────────────────────────────────
   Canvas Node
   ───────────────────────────────────────────────────────────── */
interface CanvasNode {
  id: string;
  defId: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  config?: Record<string, string>;
  connectedTo: string[]; // node ids
}

/* Props for communicating state up to parent (Sandbox Preview) */
type OnNodesChange = (
  nodes: { id: string; label: string; icon: string; defId: string; config?: Record<string, string> }[],
  connections: { from: string; to: string }[],
  xp: number
) => void;

interface Props {
  selectedRank: string;
  onNodesChange?: OnNodesChange;
}

const RANK_XP: Record<string, { label: string; color: string; maxXp: number }> = {
  E: { label: "Novice E",   color: "from-gray-500 to-gray-600",    maxXp: 100 },
  D: { label: "Recruit D",  color: "from-green-500 to-green-600",  maxXp: 250 },
  C: { label: "Veteran C",  color: "from-blue-500 to-blue-600",    maxXp: 500 },
  B: { label: "Hunter B",   color: "from-purple-500 to-fuchsia-600", maxXp: 1000 },
  A: { label: "Elite A",    color: "from-amber-500 to-orange-600", maxXp: 2000 },
  S: { label: "Sovereign S", color: "from-cyan-400 to-blue-600",    maxXp: 5000 },
};

const RANK_ORDER = ["E", "D", "C", "B", "A", "S"];

/* ─────────────────────────────────────────────────────────────
   Config Prompts per node type
   ───────────────────────────────────────────────────────────── */
const NODE_CONFIG_PROMPTS: Record<string, { key: string; label: string; placeholder: string }[]> = {
  "prompt-crafter": [
    { key: "systemPrompt", label: "System Prompt", placeholder: "You are a helpful assistant that..." },
    { key: "temperature",  label: "Temperature",  placeholder: "0.7" },
  ],
  "tool-weaver": [
    { key: "tools",        label: "Tools (comma sep)", placeholder: "web_search, calculator, weather" },
    { key: "maxResults",   label: "Max Results",       placeholder: "5" },
  ],
  "memory-sage": [
    { key: "memoryType", label: "Memory Type", placeholder: "short-term / long-term / episodic" },
    { key: "contextSize",label: "Context Tokens", placeholder: "4096" },
  ],
  "agent-cmd": [
    { key: "strategy",  label: "Orchestration", placeholder: "chain / parallel / debate" },
    { key: "subAgents", label: "Sub-Agent Slots",placeholder: "3" },
  ],
  "knowledge-base": [
    { key: "source", label: "Source",       placeholder: "URL / upload / database" },
    { key: "chunkSize", label: "Chunk Size",placeholder: "512" },
  ],
  "skill-slot": [
    { key: "skill",    label: "Skill Name",  placeholder: "e.g. Python coding, copywriting" },
    { key: "proficiency", label: "Proficiency",placeholder: "beginner / intermediate / expert" },
  ],
  "guardrail": [
    { key: "topics",     label: "Allowed Topics",    placeholder: "tech, finance, health" },
    { key: "blockWords", label: "Blocked Keywords",  placeholder: "violence, adult, hate" },
  ],
  "progression": [
    { key: "xpGoal",  label: "XP Goal",  placeholder: "500" },
    { key: "unlock",  label: "Unlock At Rank",placeholder: "C" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Generate unique id
   ───────────────────────────────────────────────────────────── */
let _nodeCounter = 0;
function nodeId() {
  _nodeCounter++;
  return `n${_nodeCounter}-${Date.now().toString(36)}`;
}

/* ─────────────────────────────────────────────────────────────
   Undo/Redo History Stack
   ───────────────────────────────────────────────────────────── */
interface CanvasSnapshot {
  nodes: CanvasNode[];
  connections: { from: string; to: string }[];
  canvasXp: number;
}

const MAX_HISTORY = 50;

function useHistory(initial: CanvasSnapshot) {
  const [past, setPast] = useState<CanvasSnapshot[]>([]);
  const [present, setPresent] = useState<CanvasSnapshot>(initial);
  const [future, setFuture] = useState<CanvasSnapshot[]>([]);

  const push = useCallback((snapshot: CanvasSnapshot) => {
    setPast((prev) => {
      const next = [...prev, snapshot];
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
    });
    setFuture([]);
  }, []);

  const undo = useCallback(() => {
    setPast((prev) => {
      if (prev.length === 0) return prev;
      const previous = prev[prev.length - 1];
      const newPast = prev.slice(0, -1);
      setPresent(previous);
      setFuture((f) => [present, ...f]);
      return newPast;
    });
  }, [present]);

  const redo = useCallback(() => {
    setFuture((prev) => {
      if (prev.length === 0) return prev;
      const next = prev[0];
      const newFuture = prev.slice(1);
      setPresent(next);
      setPast((p) => [...p, present]);
      return newFuture;
    });
  }, [present]);

  const reset = useCallback((snapshot: CanvasSnapshot) => {
    setPast([]);
    setPresent(snapshot);
    setFuture([]);
  }, []);

  return { present, setPresent, push, undo, redo, reset, canUndo: past.length > 0, canRedo: future.length > 0 };
}

export default function AgentStudio({ selectedRank, onNodesChange }: Props) {
  const hist = useHistory({ nodes: [], connections: [], canvasXp: 0 });
  const { present: state, setPresent, push: pushHistory, undo, redo, canUndo, canRedo } = hist;
  const { nodes, connections, canvasXp } = state;

  const setNodes = useCallback((updater: CanvasNode[] | ((prev: CanvasNode[]) => CanvasNode[])) => {
    setPresent((prev) => {
      const nextNodes = typeof updater === 'function' ? updater(prev.nodes) : updater;
      pushHistory({ nodes: prev.nodes, connections: prev.connections, canvasXp: prev.canvasXp });
      return { ...prev, nodes: nextNodes };
    });
  }, [setPresent, pushHistory]);

  const setConnections = useCallback((updater: { from: string; to: string }[] | ((prev: { from: string; to: string }[]) => { from: string; to: string }[])) => {
    setPresent((prev) => {
      const nextConnections = typeof updater === 'function' ? updater(prev.connections) : updater;
      pushHistory({ nodes: prev.nodes, connections: prev.connections, canvasXp: prev.canvasXp });
      return { ...prev, connections: nextConnections };
    });
  }, [setPresent, pushHistory]);

  const setCanvasXp = useCallback((updater: number | ((prev: number) => number)) => {
    setPresent((prev) => {
      const next = typeof updater === 'function' ? updater(prev.canvasXp) : updater;
      return { ...prev, canvasXp: next };
    });
  }, [setPresent]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  /* Remit state to parent on change */
  const prevSnapshotRef = useRef("");
  useEffect(() => {
    if (!onNodesChange) return;
    const snapshot = JSON.stringify({ n: nodes.length, c: connections.length, xp: canvasXp });
    if (snapshot !== prevSnapshotRef.current) {
      prevSnapshotRef.current = snapshot;
      onNodesChange(
        nodes.map((n) => ({ id: n.id, label: n.label, icon: n.icon, defId: n.defId, config: n.config })),
        connections,
        canvasXp
      );
    }
  }, [nodes, connections, canvasXp, onNodesChange]);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  /* ── Keyboard shortcuts (Ctrl+Z / Ctrl+Shift+Z) ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const rank = RANK_XP[selectedRank] || RANK_XP.E;
  const rankIndex = RANK_ORDER.indexOf(selectedRank);
  const xpProgress = Math.min(canvasXp / rank.maxXp, 1);
  const unlockedRanks = RANK_ORDER.slice(0, rankIndex + 1);

  /* ── Handle drops from NodePalette ── */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data || !canvasRef.current) return;

    const nodeDef: NodeDef = JSON.parse(data);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 80;
    const y = e.clientY - rect.top - 20;

    setNodes((prev) => [
      ...prev,
      {
        id: nodeId(),
        defId: nodeDef.id,
        label: nodeDef.label,
        icon: nodeDef.icon,
        x: Math.max(0, x),
        y: Math.max(0, y),
        config: {},
        connectedTo: [],
      },
    ]);
    setCanvasXp((p) => p + 15);
  }, []);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  /* ── Node dragging ── */
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    setDraggingNode(nodeId);
    setDragOffset({ x: e.clientX - node.x, y: e.clientY - node.y });
  };

  useEffect(() => {
    if (!draggingNode) return;
    const handleMove = (e: MouseEvent) => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === draggingNode
            ? { ...n, x: Math.max(0, e.clientX - dragOffset.x), y: Math.max(0, e.clientY - dragOffset.y) }
            : n
        )
      );
    };
    const handleUp = () => setDraggingNode(null);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [draggingNode, dragOffset]);

  /* ── Config updates ── */
  const updateConfig = (nodeId: string, key: string, value: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId ? { ...n, config: { ...n.config, [key]: value } } : n
      )
    );
  };

  /* ── Connection drawing ── */
  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (connectingFrom) {
      if (connectingFrom !== nodeId) {
        setConnections((prev) => [...prev, { from: connectingFrom, to: nodeId }]);
        setCanvasXp((p) => p + 10);
      }
      setConnectingFrom(null);
    } else {
      setSelectedNode(nodeId);
    }
  };

  const handleCanvasClick = () => {
    setSelectedNode(null);
    setConnectingFrom(null);
  };

  /* ── Delete node ── */
  const deleteNode = (nodeId: string) => {
    setPresent((prev) => {
      pushHistory({ nodes: prev.nodes, connections: prev.connections, canvasXp: prev.canvasXp });
      return {
        nodes: prev.nodes.filter((n) => n.id !== nodeId),
        connections: prev.connections.filter((c) => c.from !== nodeId && c.to !== nodeId),
        canvasXp: prev.canvasXp,
      };
    });
    setSelectedNode(null);
  };

  const selectedNodeData = nodes.find((n) => n.id === selectedNode);
  const configFields = selectedNodeData ? NODE_CONFIG_PROMPTS[selectedNodeData.defId] : undefined;

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-white/70">Agent Studio</span>
          <span className="text-[10px] text-white/30">{nodes.length} nodes · {connections.length} links</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Undo/Redo buttons */}
          <button
            onClick={undo}
            disabled={!canUndo}
            className="px-2 py-1 rounded text-[10px] font-mono font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-white/5 enabled:text-white/60"
            title="Undo (Ctrl+Z)"
          >
            ↩ Undo
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="px-2 py-1 rounded text-[10px] font-mono font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-white/5 enabled:text-white/60"
            title="Redo (Ctrl+Shift+Z)"
          >
            ↪ Redo
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button
            onClick={() => setConnectingFrom(null)}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
              connectingFrom ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-white/40"
            }`}
          >
            {connectingFrom ? "🔗 Linking..." : "Link Mode"}
          </button>
          <button
            onClick={() => { setPresent({ nodes: [], connections: [], canvasXp: 0 }); setSelectedNode(null); }}
            className="px-2 py-1 rounded text-[10px] text-white/40 hover:text-white/70 hover:bg-white/5"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex overflow-hidden">
        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative flex-1 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.03)_0%,_transparent_70%)]"
        >
          {/* Grid dots */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Connection lines (SVG) */}
          <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: "100%", height: "100%" }}>
            {connections.map((conn, i) => {
              const from = nodes.find((n) => n.id === conn.from);
              const to = nodes.find((n) => n.id === conn.to);
              if (!from || !to) return null;
              const x1 = from.x + 80, y1 = from.y + 20;
              const x2 = to.x + 80, y2 = to.y + 20;
              const midX = (x1 + x2) / 2;
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                  stroke="rgba(6,182,212,0.3)"
                  strokeWidth="1.5"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onClick={(e) => handleNodeClick(e, node.id)}
              className={`absolute z-10 p-2 rounded-lg border cursor-pointer transition-all select-none ${
                selectedNode === node.id
                  ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                  : "border-white/10 bg-gray-900/80 hover:border-white/20"
              }`}
              style={{ left: node.x, top: node.y, width: 160 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{node.icon}</span>
                <span className="text-[11px] font-medium text-white/80 truncate">{node.label}</span>
              </div>
              {node.config && Object.keys(node.config).length > 0 && (
                <div className="mt-1 pt-1 border-t border-white/5">
                  {Object.entries(node.config).slice(0, 2).map(([k, v]) => (
                    <div key={k} className="text-[8px] text-white/30 truncate">
                      {k}: {v}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Empty state */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl block mb-3">🤖</span>
                <p className="text-sm text-white/40">Drag nodes from the palette to start building</p>
                <p className="text-[10px] text-white/20 mt-1">Arrange, connect, and configure your agent</p>
              </div>
            </div>
          )}
        </div>

        {/* Right panel — Node Config */}
        {selectedNodeData && configFields ? (
          <div className="w-64 bg-gray-900/80 border-l border-white/10 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-white/80">
                {selectedNodeData.icon} {selectedNodeData.label}
              </h3>
              <button
                onClick={() => deleteNode(selectedNode!)}
                className="text-[10px] text-red-400/60 hover:text-red-400"
              >
                ✕ Delete
              </button>
            </div>

            <div className="space-y-3">
              {configFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-[10px] text-white/50 mb-1 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={selectedNodeData.config?.[field.key] || ""}
                    onChange={(e) => updateConfig(selectedNodeData.id, field.key, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              ))}
            </div>

            {/* Connection summary */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-[10px] text-white/30">
                Connections: {connections.filter((c) => c.from === selectedNodeData.id).length} outbound
              </p>
              <p className="text-[10px] text-white/30">
                {connections.filter((c) => c.to === selectedNodeData.id).length} inbound
              </p>
            </div>
          </div>
        ) : (
          <div className="w-64 bg-gray-900/80 border-l border-white/10 p-4 flex items-center justify-center">
            <p className="text-[10px] text-white/20 text-center">
              Click a node to configure it
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
