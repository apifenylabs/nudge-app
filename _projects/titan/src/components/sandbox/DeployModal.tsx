"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   DeployModal — Simulated agent deployment overlay
   Shows node-by-node execution flow with live animation
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
  open: boolean;
  onClose: () => void;
  nodes: NodeData[];
  connections: ConnectionData[];
  selectedRank: string;
}

type Phase = "init" | "connecting" | "executing" | "complete";

type LogLine = {
  icon: string;
  text: string;
  variant: "neutral" | "success" | "warn" | "error";
};

const RANK_MULTIPLIER: Record<string, number> = {
  E: 1, D: 2, C: 3, B: 5, A: 8, S: 13,
};

const NODE_DEF_ICONS: Record<string, string> = {
  "prompt-crafter": "✍️",
  "tool-weaver": "🔧",
  "memory-sage": "🧠",
  "agent-cmd": "🧠",
  "knowledge-base": "📚",
  "skill-slot": "🎯",
  "guardrail": "🛡️",
  "progression": "⬆️",
};

/* Pool of plausible deployment messages */
const PHASE_MESSAGES: Record<string, LogLine[]> = {
  init: [
    { icon: "🔌", text: "Booting agent runtime...", variant: "neutral" },
    { icon: "📡", text: "Initializing kernel modules...", variant: "neutral" },
    { icon: "⚙️", text: "Allocating compute resources...", variant: "neutral" },
    { icon: "🔐", text: "Verifying rank credentials...", variant: "neutral" },
  ],
  connecting: [
    { icon: "🔗", text: "Routing data flow graph...", variant: "neutral" },
    { icon: "📊", text: "Mapping dependency topology...", variant: "neutral" },
    { icon: "🧬", text: "Weaving agent pipeline...", variant: "neutral" },
  ],
  executing: [
    { icon: "⚡", text: "Executing primary loop...", variant: "neutral" },
    { icon: "🔄", text: "Spinning up sub-agents...", variant: "neutral" },
    { icon: "🔍", text: "Running self-verification...", variant: "neutral" },
  ],
};

export default function DeployModal({ open, onClose, nodes, connections, selectedRank }: Props) {
  const [phase, setPhase] = useState<Phase>("init");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const [pulseNode, setPulseNode] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rankXp = RANK_MULTIPLIER[selectedRank] || 1;

  /* Compute derived stats */
  const agentName = nodes.find(n => n.defId === "agent-cmd")?.label || "Unnamed Agent";
  const corePrompt = nodes.find(n => n.defId === "prompt-crafter");
  const toolCount = nodes.filter(n => ["tool-weaver", "knowledge-base", "skill-slot"].includes(n.defId)).length;
  const hasGuardrails = nodes.some(n => n.defId === "guardrail");

  const addLog = useCallback((line: LogLine) => {
    setLogs(prev => [...prev, line]);
  }, []);

  /* Auto-scroll */
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  /* Reset and run deployment sequence */
  useEffect(() => {
    if (!open) {
      setPhase("init");
      setLogs([]);
      setVisibleNodes([]);
      setPulseNode(null);
      return;
    }

    const delay = (ms: number) => new Promise(r => { timerRef.current = setTimeout(r, ms); });

    (async () => {
      // ── Phase 1: Init ──
      setPhase("init");
      for (const msg of PHASE_MESSAGES.init) {
        addLog(msg);
        await delay(350 + Math.random() * 200);
      }

      addLog({ icon: "✅", text: "Runtime ready.", variant: "success" });
      await delay(400);

      // ── Phase 2: Show nodes one by one ──
      setPhase("connecting");
      const ordered = [...nodes];
      for (let i = 0; i < ordered.length; i++) {
        const n = ordered[i];
        setVisibleNodes(prev => [...prev, n.id]);
        setPulseNode(n.id);
        const icon = NODE_DEF_ICONS[n.defId] || n.icon;
        addLog({ icon, text: `Loaded: ${n.label}`, variant: "neutral" });
        await delay(300 + Math.random() * 200);
        setPulseNode(null);
      }

      addLog({ icon: "✅", text: `${nodes.length} nodes registered.`, variant: "success" });
      await delay(300);

      // ── Phase 2b: Connections ──
      if (connections.length > 0) {
        for (const msg of PHASE_MESSAGES.connecting) {
          addLog(msg);
          await delay(300 + Math.random() * 150);
        }
        addLog({ icon: "🔗", text: `${connections.length} edges mapped.`, variant: "success" });
        await delay(300);
      }

      // ── Phase 3: Execute ──
      setPhase("executing");
      for (const msg of PHASE_MESSAGES.executing) {
        addLog(msg);
        await delay(300 + Math.random() * 200);
      }

      if (corePrompt) {
        const sys = corePrompt.config?.systemPrompt || "default";
        addLog({ icon: "✍️", text: `Prompt: "${sys.substring(0, 45)}${sys.length > 45 ? '…' : ''}"`, variant: "success" });
      }

      if (hasGuardrails) {
        addLog({ icon: "🛡️", text: "Guardrails: active — no violations.", variant: "success" });
      }

      addLog({ icon: "📦", text: `Tools stack: ${toolCount} tool(s) ready.`, variant: "success" });

      await delay(500);

      // ── Complete ──
      setPhase("complete");
      addLog({ icon: "🌟", text: `Deployment complete! Rank ${selectedRank} (${rankXp}x multiplier)`, variant: "success" });
      addLog({ icon: "📊", text: `Agent: ${agentName} · ${nodes.length} nodes · ${connections.length} links`, variant: "neutral" });
      addLog({ icon: "💡", text: corePrompt ? "Agent is fully configured and ready." : "Tip: Add a Prompt Crafter node to define behaviour.", variant: "neutral" });

      // Auto-simulated XP gain
      const xpGain = (nodes.length * 15 + connections.length * 10) * rankXp;
      addLog({ icon: "⬆️", text: `+${xpGain} XP earned (${rankXp}x rank bonus)`, variant: "success" });
    })();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[580px] max-h-[80vh] bg-gray-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className={`text-lg ${phase === "complete" ? "animate-pulse" : "animate-spin"}`}>
              {phase === "complete" ? "✨" : "🚀"}
            </span>
            <div>
              <h2 className="text-sm font-bold text-white">Deploying Agent</h2>
              <p className="text-[10px] text-white/30">
                {phase === "init" && "Initialising runtime…"}
                {phase === "connecting" && "Registering nodes & wiring connections…"}
                {phase === "executing" && "Running execution pipeline…"}
                {phase === "complete" && "Agent deployed successfully ✅"}
              </p>
            </div>
          </div>
          {phase === "complete" && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
            >
              Done
            </button>
          )}
        </div>

        {/* ── Body: node grid + log stream ── */}
        <div className="flex gap-4 p-5 max-h-[60vh] overflow-y-auto">
          {/* Left: node diagram */}
          <div className="w-[200px] shrink-0">
            <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2">Agent Topology</div>
            <div className="space-y-1.5">
              {nodes.map((n, i) => {
                const visible = visibleNodes.includes(n.id);
                const pulsing = pulseNode === n.id;
                const icon = NODE_DEF_ICONS[n.defId] || n.icon;
                return (
                  <div
                    key={n.id}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-[11px] transition-all duration-300 ${
                      !visible
                        ? "opacity-0 translate-x-[-8px]"
                        : pulsing
                          ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                          : "border-white/5 bg-white/[0.02] text-white/60"
                    }`}
                  >
                    <span className="text-xs">{icon}</span>
                    <span className="truncate">{n.label}</span>
                    {connections.some(c => c.from === n.id) && visible && (
                      <span className="ml-auto text-[8px] text-cyan-400/50">→</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: log stream */}
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2">Deploy Log</div>
            <div className="space-y-0.5 max-h-[300px] overflow-y-auto font-mono">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-1.5 text-[10px] leading-relaxed ${
                    log.variant === "success" ? "text-green-400" :
                    log.variant === "warn" ? "text-amber-300" :
                    log.variant === "error" ? "text-red-400" :
                    "text-white/60"
                  }`}
                >
                  <span className="shrink-0">{log.icon}</span>
                  <span>{log.text}</span>
                </div>
              ))}
              {phase !== "complete" && (
                <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                  <span className="animate-pulse">●</span>
                  <span>Processing...</span>
                </div>
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        {/* ── Footer: rank badge + stats ── */}
        {phase === "complete" && (
          <div className="px-5 py-3 border-t border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold text-[9px]">
                  Rank {selectedRank}
                </span>
                <span className="text-white/30">{nodes.length} nodes · {connections.length} links</span>
              </div>
              <span className="text-white/20">{agentName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
