"use client";

import React, { useState, useEffect, useCallback } from "react";
import GodTierAura from "../molecules/GodTierAura";

// ─── Rank Theme Config ───────────────────────────────────────────────────
interface RankTheme {
  levelRange: [number, number];
  label: string;
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
    bg: string;
    border: string;
    text: string;
    accent: string;
    terminalBg: string;
    terminalHeader: string;
  };
}

const RANK_THEMES: RankTheme[] = [
  {
    levelRange: [1, 4],
    label: "Hatchling",
    emoji: "🥚",
    colors: {
      primary: "#94a3b8",
      secondary: "#64748b",
      bg: "rgba(30,41,59,0.8)",
      border: "rgba(148,163,184,0.2)",
      text: "#cbd5e1",
      accent: "#94a3b8",
      terminalBg: "#0f172a",
      terminalHeader: "#1e293b",
    },
  },
  {
    levelRange: [5, 9],
    label: "Apprentice",
    emoji: "🐣",
    colors: {
      primary: "#22c55e",
      secondary: "#16a34a",
      bg: "rgba(22,163,74,0.08)",
      border: "rgba(34,197,94,0.25)",
      text: "#e2f0e4",
      accent: "#22c55e",
      terminalBg: "#052e16",
      terminalHeader: "#14532d",
    },
  },
  {
    levelRange: [10, 14],
    label: "Adept",
    emoji: "🦊",
    colors: {
      primary: "#3b82f6",
      secondary: "#2563eb",
      bg: "rgba(59,130,246,0.08)",
      border: "rgba(59,130,246,0.25)",
      text: "#dbeafe",
      accent: "#3b82f6",
      terminalBg: "#0f172a",
      terminalHeader: "#1e3a5f",
    },
  },
  {
    levelRange: [15, 19],
    label: "Master",
    emoji: "🐉",
    colors: {
      primary: "#a855f7",
      secondary: "#9333ea",
      bg: "rgba(168,85,247,0.08)",
      border: "rgba(168,85,247,0.25)",
      text: "#f3e8ff",
      accent: "#a855f7",
      terminalBg: "#1a0a2e",
      terminalHeader: "#2d1b4e",
    },
  },
  {
    levelRange: [20, 24],
    label: "Grandmaster",
    emoji: "🦅",
    colors: {
      primary: "#ec4899",
      secondary: "#db2777",
      bg: "rgba(236,72,153,0.08)",
      border: "rgba(236,72,153,0.25)",
      text: "#fce7f3",
      accent: "#ec4899",
      terminalBg: "#1f0d1a",
      terminalHeader: "#3b1a2e",
    },
  },
  {
    levelRange: [25, 29],
    label: "Legend",
    emoji: "🌟",
    colors: {
      primary: "#f97316",
      secondary: "#ea580c",
      bg: "rgba(249,115,22,0.08)",
      border: "rgba(249,115,22,0.25)",
      text: "#fff7ed",
      accent: "#f97316",
      terminalBg: "#1f0f05",
      terminalHeader: "#3b1f0a",
    },
  },
  {
    levelRange: [30, 99],
    label: "God-Tier",
    emoji: "👑",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.35)",
      text: "#fef3c7",
      accent: "#f59e0b",
      terminalBg: "#1a1404",
      terminalHeader: "#3b2e08",
    },
  },
];

function getThemeForLevel(level: number): RankTheme {
  return RANK_THEMES.find((t) => level >= t.levelRange[0] && level <= t.levelRange[1]) ?? RANK_THEMES[0];
}

// ─── Sandbox Log Entry ───────────────────────────────────────────────────
interface LogEntry {
  id: number;
  timestamp: string;
  text: string;
  type: "info" | "success" | "warn" | "error" | "command" | "system";
}

// ─── Inline keyframes ────────────────────────────────────────────────────
const SANDBOX_KF_ID = "agent-sandbox-kf";

function injectSandboxKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SANDBOX_KF_ID)) return;
  const style = document.createElement("style");
  style.id = SANDBOX_KF_ID;
  style.textContent = `
    @keyframes sandbox-fade-in {
      0% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes sandbox-pulse-dot {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes sandbox-scan-line {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    .sandbox-log-entry {
      animation: sandbox-fade-in 0.3s ease-out;
    }
    .sandbox-typing-dot {
      animation: sandbox-pulse-dot 1s ease-in-out infinite;
    }
    .sandbox-scan {
      animation: sandbox-scan-line 6s linear infinite;
    }
  `;
  document.head.appendChild(style);
}

// ─── Props ───────────────────────────────────────────────────────────────
interface AgentSandboxProps {
  agentLevel: number;
  agentName?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────
export default function AgentSandbox({
  agentLevel,
  agentName = "Titan-Agent",
  className = "",
}: AgentSandboxProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 0, timestamp: new Date().toLocaleTimeString(), text: `⚡ ${agentName} sandbox initialized`, type: "system" },
    { id: 1, timestamp: new Date().toLocaleTimeString(), text: `Rank: ${getThemeForLevel(agentLevel).label} (Level ${agentLevel})`, type: "info" },
    { id: 2, timestamp: new Date().toLocaleTimeString(), text: "Ready for commands. Type 'help' to see available commands.", type: "info" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [presetsEnabled, setPresetsEnabled] = useState(true);
  const logEndRef = React.useRef<HTMLDivElement>(null);
  const nextId = React.useRef(3);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const theme = getThemeForLevel(agentLevel);

  useEffect(() => {
    injectSandboxKeyframes();
  }, []);

  // Scroll to bottom on new logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Re-theme log when level changes
  useEffect(() => {
    setLogs((prev) => [
      ...prev,
      {
        id: nextId.current++,
        timestamp: new Date().toLocaleTimeString(),
        text: `⬆️ Agent evolved to Level ${agentLevel} — ${theme.label} rank applied`,
        type: "success",
      },
    ]);
  }, [agentLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  const addLog = useCallback((text: string, type: LogEntry["type"]) => {
    setLogs((prev) => [
      ...prev,
      { id: nextId.current++, timestamp: new Date().toLocaleTimeString(), text, type },
    ]);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = inputValue.trim();
      if (!cmd || isProcessing) return;

      setInputValue("");
      addLog(`→ ${cmd}`, "command");
      setIsProcessing(true);

      // Simulate command processing
      const responseText = simulateCommand(cmd, agentLevel);
      setTimeout(() => {
        addLog(responseText, responseText.startsWith("⚠️") ? "warn" : responseText.startsWith("❌") ? "error" : "success");
        setIsProcessing(false);
      }, 400 + Math.random() * 600);

      // Handle presets toggle sentinel (uses ref to avoid stale closure)
      if (responseText === "__TOGGLE_PRESETS__") {
        setTimeout(() => {
          setPresetsEnabled((prev) => {
            const next = !prev;
            addLog(
              next
                ? "ℹ️ Preset buttons shown"
                : "ℹ️ Preset buttons hidden. Type 'presets' to show again.",
              "system"
            );
            return next;
          });
        }, 400);
      }

      // Update theme on level-set command
      if (cmd.startsWith("level ")) {
        const parts = cmd.split(" ");
        const newLevel = parseInt(parts[1], 10);
        if (!isNaN(newLevel) && newLevel >= 1 && newLevel <= 99) {
          setTimeout(() => {
            addLog(`🎨 Sandbox re-themed to ${getThemeForLevel(newLevel).label} colors`, "system");
          }, 800);
        }
      }
    },
    [inputValue, isProcessing, addLog, agentLevel]
  );

  const typeColor = (type: LogEntry["type"]): string => {
    switch (type) {
      case "success": return theme.colors.primary;
      case "warn": return "#f59e0b";
      case "error": return "#ef4444";
      case "command": return "#60a5fa";
      case "system": return theme.colors.secondary;
      default: return theme.colors.text;
    }
  };

  // ─── Keyboard shortcuts ───────────────────────────────
  useEffect(() => {
    const sandboxEl = inputRef.current?.closest('[data-sandbox]') as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only fire when the sandbox is focused or input is focused
      const target = e.target as HTMLElement;
      const inSandbox = target.closest('[data-sandbox]');
      if (!inSandbox) return;

      // Ignore if user is typing in the input (except special keys)
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Allow Enter (normal submit) and Escape (blur input)
        if (e.key === 'Enter' || e.key === 'Escape') return;
        e.preventDefault();
      }

      // Map keys to preset commands
      const keyMap: Record<string, string> = {
        's': 'stop',
        'f': 'move forward 0.5',
        'r': 'move reverse 0.3',
        'ArrowLeft': 'turn left 90',
        'ArrowRight': 'turn right 45',
        'q': 'scan',
        't': 'status',
      };

      const mapped = keyMap[e.key];
      if (!mapped || isProcessing) return;

      e.preventDefault();
      setInputValue(mapped);
      // Auto-blur input so keydown doesn't echo into the text field
      inputRef.current?.blur();

      // Brief delay then submit
      setTimeout(() => {
        setInputValue(mapped);
        // Trigger the form submit
        const form = inputRef.current?.closest('form');
        form?.requestSubmit();
      }, 30);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isProcessing]);

  return (
    <div
      data-sandbox
      className={className}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.terminalBg,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        fontSize: 14,
        position: "relative",
      }}
    >
      {/* God-Tier Aura overlay (level 30+) */}
      {agentLevel >= 30 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <GodTierAura level={agentLevel} size={600} pulseDuration={4} />
        </div>
      )}

      {/* Scan-line effect for higher ranks */}
      {agentLevel >= 15 && (
        <div
          className="sandbox-scan"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${theme.colors.accent}80, transparent)`,
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* ─── Terminal Header (rank-themed) ──────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          background: theme.colors.terminalHeader,
          borderBottom: `1px solid ${theme.colors.border}`,
          userSelect: "none",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
          </div>
          <span style={{ fontSize: 12, color: theme.colors.secondary, fontWeight: 600 }}>
            {theme.emoji} {agentName} — Terminal
          </span>
        </div>
        <div
          style={{
            fontSize: 11,
            padding: "2px 10px",
            borderRadius: 999,
            background: `${theme.colors.accent}22`,
            color: theme.colors.accent,
            fontWeight: 600,
          }}
        >
          Lv.{agentLevel} {theme.label}
        </div>
      </div>

      {/* ─── Preset Command Buttons ──────────────────────── */}
      {presetsEnabled && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            padding: "6px 14px 0 14px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {[
            { label: "🛑 Stop", cmd: "stop", shortcut: "S" },
            { label: "▶️ Forward", cmd: "move forward 0.5", shortcut: "F" },
            { label: "↩️ Reverse", cmd: "move reverse 0.3", shortcut: "R" },
            { label: "⬅️ Left", cmd: "turn left 90", shortcut: "←" },
            { label: "➡️ Right", cmd: "turn right 45", shortcut: "→" },
            { label: "📡 Scan", cmd: "scan", shortcut: "Q" },
            { label: "📊 Status", cmd: "status", shortcut: "T" },
          ].map((preset) => (
            <button
              key={preset.cmd}
              title={`${preset.cmd} (keyboard: ${preset.shortcut})`}
              onClick={() => {
                if (isProcessing) return;
                setInputValue(preset.cmd);
                // Auto-submit after a brief moment so user sees it populate
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 50);
              }}
              disabled={isProcessing}
              style={{
                padding: "3px 10px",
                borderRadius: 6,
                border: `1px solid ${theme.colors.border}`,
                background: `${theme.colors.accent}10`,
                color: theme.colors.accent,
                fontSize: 11,
                fontWeight: 500,
                cursor: isProcessing ? "not-allowed" : "pointer",
                opacity: isProcessing ? 0.35 : 0.8,
                transition: "opacity 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.background = `${theme.colors.accent}25`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = isProcessing ? "0.35" : "0.8";
                e.currentTarget.style.background = `${theme.colors.accent}10`;
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* ─── Log Output ─────────────────────────────────── */}
      <div
        style={{
          padding: "12px 14px",
          maxHeight: 360,
          minHeight: 200,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "relative",
          zIndex: 2,
        }}
      >
        {logs.map((entry) => (
          <div key={entry.id} className="sandbox-log-entry" style={{ display: "flex", gap: 8, lineHeight: 1.6 }}>
            <span style={{ color: theme.colors.secondary, fontSize: 11, flexShrink: 0, opacity: 0.7 }}>
              {entry.timestamp}
            </span>
            <span style={{ color: typeColor(entry.type), whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {entry.text}
            </span>
          </div>
        ))}
        {isProcessing && (
          <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
            <span className="sandbox-typing-dot" style={{ color: theme.colors.primary, fontSize: 18 }}>●</span>
            <span className="sandbox-typing-dot" style={{ color: theme.colors.primary, fontSize: 18, animationDelay: "0.2s" }}>●</span>
            <span className="sandbox-typing-dot" style={{ color: theme.colors.primary, fontSize: 18, animationDelay: "0.4s" }}>●</span>
          </div>
        )}
        <div ref={logEndRef} />
      </div>

      {/* ─── Command Input ──────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderTop: `1px solid ${theme.colors.border}`,
          background: theme.colors.terminalHeader,
          position: "relative",
          zIndex: 2,
        }}
      >
        <span style={{ color: theme.colors.accent, fontWeight: 700, fontSize: 13 }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isProcessing ? "Processing..." : "Type or click a preset"}
          disabled={isProcessing}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: theme.colors.text,
            fontSize: 13,
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={isProcessing || !inputValue.trim()}
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            border: `1px solid ${theme.colors.border}`,
            background: `${theme.colors.accent}15`,
            color: theme.colors.accent,
            fontSize: 11,
            fontWeight: 600,
            cursor: isProcessing ? "default" : "pointer",
            opacity: isProcessing || !inputValue.trim() ? 0.4 : 1,
          }}
        >
          RUN
        </button>
      </form>
    </div>
  );
}

// ─── Command Simulator ────────────────────────────────────────────────────
function simulateCommand(cmd: string, level: number): string {
  const lower = cmd.toLowerCase().trim();
  const theme = getThemeForLevel(level);

  if (lower === "help") {
    return [
      "Available commands:",
      "  help        — Show this message",
      `  status      — Show agent status (Lv.${level} ${theme.label})`,
      "  scan        — Run environment scan",
      "  clear       — Clear terminal output",
      `  level <N>   — Set level (1-99) — themes sandbox`,
      "  about       — About this agent",
      "",
      "Robot control presets:",
      "  stop               — Emergency stop",
      "  move forward <m>   — Move forward N meters",
      "  move reverse <m>   — Move backward N meters",
      "  turn left <deg>    — Rotate left N degrees",
      "  turn right <deg>   — Rotate right N degrees",
      "  presets            — Toggle preset buttons on/off",
      "",
      "⌨️ Keyboard shortcuts (sandbox focused):",
      "  S — Stop",
      "  F — Forward 0.5m",
      "  R — Reverse 0.3m",
      "  ← — Turn left 90°",
      "  → — Turn right 45°",
      "  Q — Scan",
      "  T — Status",
    ].join("\n");
  }

  if (lower === "status") {
    const capabilities = level >= 30
      ? "God-Tier: swarm coordination, cosmic aura, multi-agent orchestration, autonomous strategy"
      : level >= 20
        ? "Grandmaster: multi-step tasks, context retention, advanced tool usage"
        : level >= 10
          ? "Adept: complex commands, intermediate reasoning, tool access"
          : "Basic: simple commands, single-step tasks, learning";
    return `✓ Status — ${theme.emoji} ${theme.label} (Lv.${level})\n  Capabilities: ${capabilities}\n  Rank theme: ${theme.colors.primary}\n  Scan line: ${level >= 15 ? "enabled" : "disabled (unlock at Master/Lv.15+)"}`;
  }

  if (lower === "scan") {
    const scanResults = level >= 10
      ? "✓ System OK\n  ✓ Network OK\n  ✓ Memory: 8.2 GB available\n  ✓ GPUs: 1x NVIDIA A100\n  ⚡ All systems nominal"
      : "✓ System OK\n  ✓ Network OK\n  ⚡ Enhanced diagnostics: Lv.10+";
    return scanResults;
  }

  if (lower === "presets") {
    return "__TOGGLE_PRESETS__"; // handled by component — supplies its own log
  }

  if (lower === "clear") return "__CLEAR__";

  if (lower.startsWith("level ")) {
    const val = parseInt(cmd.split(" ")[1], 10);
    if (isNaN(val) || val < 1 || val > 99) return `❌ Invalid level: use level 1-99`;
    const nextTheme = getThemeForLevel(val);
    return `⬆️ Level set to ${val}. Sandbox re-theming to ${nextTheme.label}...\n${val >= 30 ? '👑 God-Tier aura activated — golden radiance engaged' : val >= 15 ? '✨ Scan-line effect activated — enhanced optics online' : ''}`;
  }

  // ─── Robot Control Commands ─────────────────────────────
  if (lower === "stop" || lower === "emergency stop") {
    return `🛑 Emergency STOP signal sent at ${new Date().toLocaleTimeString()}\n✅ All motors halted. Robot in safe mode.`;
  }

  if (lower.startsWith("move forward")) {
    const distance = lower.replace("move forward", "").trim() || "0.5";
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) return `⚠️ Invalid distance: "${distance}". Use e.g. "move forward 1.0"`;
    const batch = Math.ceil(dist / 0.25);
    return `▶️ Moving forward ${dist}m in ${batch} steps...\n🔧 Motors @ 65% PWM | Odometry: +${dist.toFixed(2)}m | ETA: ${(dist * 0.8).toFixed(1)}s\n✅ Arrived. Position: (${(dist * 0.98).toFixed(2)}, 0.00)`;
  }

  if (lower.startsWith("move reverse")) {
    const distance = lower.replace("move reverse", "").trim() || "0.3";
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) return `⚠️ Invalid distance: "${distance}"`;
    return `↩️ Reversing ${dist}m...\n🔧 Motors @ -55% PWM | Odometry: ${(-dist * 0.98).toFixed(2)}m | ETA: ${(dist * 0.9).toFixed(1)}s\n✅ Stopped. Position: (${(-dist * 0.98).toFixed(2)}, 0.00)`;
  }

  if (lower.startsWith("turn left")) {
    const degStr = lower.replace("turn left", "").trim() || "90";
    const deg = parseInt(degStr, 10);
    if (isNaN(deg) || deg <= 0) return `⚠️ Invalid degrees: "${degStr}"`;
    const rad = ((deg * Math.PI) / 180).toFixed(2);
    return `⬅️ Rotating left ${deg}°...\n🔧 Servos: diff-steer | Gyro: +${rad}rad | ETA: ${(deg * 0.012).toFixed(1)}s\n✅ Heading: ${deg}° counterclockwise from origin`;
  }

  if (lower.startsWith("turn right")) {
    const degStr = lower.replace("turn right", "").trim() || "45";
    const deg = parseInt(degStr, 10);
    if (isNaN(deg) || deg <= 0) return `⚠️ Invalid degrees: "${degStr}"`;
    const rad = ((-deg * Math.PI) / 180).toFixed(2);
    return `➡️ Rotating right ${deg}°...\n🔧 Servos: diff-steer | Gyro: ${rad}rad | ETA: ${(deg * 0.012).toFixed(1)}s\n✅ Heading: ${deg}° clockwise from origin`;
  }

  if (lower === "about") {
    return `Titan Agent Sandbox — v1.0\n  Framework: Next.js + React\n  Rank system: 7 tiers, Hatchling → God-Tier\n  Theme: visual progression by agent level\n  Current: ${theme.emoji} ${theme.label}`;
  }

  return `⚠️ Unknown command: "${cmd}". Type "help" for available commands.`;
}
