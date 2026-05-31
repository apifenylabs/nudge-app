"use client";

import { useState } from "react";
import DeployModal from "./DeployModal";

/* ─────────────────────────────────────────────────────────────
   SandboxPreview — Live output/preview pane
   Shows node/connection stats and a Deploy button that opens
   the animated deployment modal.
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
}

const NODE_DEF_LABELS: Record<string, string> = {
  "prompt-crafter": "Prompt Crafter",
  "tool-weaver": "Tool Weaver",
  "memory-sage": "Memory Sage",
  "agent-cmd": "Agent Commander",
  "knowledge-base": "Knowledge Base",
  "skill-slot": "Skill Slot",
  "guardrail": "Guardrail",
  "progression": "Progression XP",
};

export default function SandboxPreview({ nodes, connections, isRunning, onToggleRun, selectedRank }: Props) {
  const [deployOpen, setDeployOpen] = useState(false);

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
      <div className="flex-1 overflow-y-auto p-3">
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
          <div className="space-y-3">
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
              </div>
            </div>

            {/* Core Section */}
            {core.length > 0 && (
              <Section title="Core">
                {core.map((n) => (
                  <NodeBadge key={n.id} icon={n.icon} label={n.label} config={n.config} />
                ))}
              </Section>
            )}

            {/* Tools Section */}
            {tools.length > 0 && (
              <Section title={`Tools (${toolCount})`}>
                {tools.map((n) => (
                  <NodeBadge key={n.id} icon={n.icon} label={n.label} config={n.config} />
                ))}
              </Section>
            )}

            {/* Memory Section */}
            {memory.length > 0 && (
              <Section title={`Memory (${memoryCount})`}>
                {memory.map((n) => (
                  <NodeBadge key={n.id} icon={n.icon} label={n.label} config={n.config} />
                ))}
              </Section>
            )}

            {/* Advanced Section */}
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
          </div>
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
