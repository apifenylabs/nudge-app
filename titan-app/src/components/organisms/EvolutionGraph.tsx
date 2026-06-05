"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";

// ─── Evolution Stage Data ──────────────────────────────────────────────
const STAGES = [
  { level: 1,  label: "Hatchling",   emoji: "🥚", color: "#94a3b8", glow: "rgba(148,163,184,0.3)", desc: "Raw potential" },
  { level: 5,  label: "Apprentice",  emoji: "🐣", color: "#22c55e", glow: "rgba(34,197,94,0.3)",  desc: "Learning fast" },
  { level: 10, label: "Adept",       emoji: "🦊", color: "#3b82f6", glow: "rgba(59,130,246,0.3)", desc: "Skilled executor" },
  { level: 15, label: "Master",      emoji: "🐉", color: "#a855f7", glow: "rgba(168,85,247,0.3)", desc: "Autonomous solver" },
  { level: 20, label: "Grandmaster", emoji: "🦅", color: "#ec4899", glow: "rgba(236,72,153,0.3)", desc: "Strategic thinker" },
  { level: 25, label: "Legend",      emoji: "🌟", color: "#f97316", glow: "rgba(249,115,22,0.3)", desc: "Peerless" },
] as const;

// ─── Particle Engine (simple canvas-free) ──────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number;
  color: string;
}

function makeParticle(w: number, h: number, color: string): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    life: 0,
    maxLife: 80 + Math.random() * 120,
    size: 1 + Math.random() * 2,
    color,
  };
}

// ─── Hook: useCanvasParticles ──────────────────────────────────────────
function useCanvasParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  activeColor: string,
  isActive: boolean
) {
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let w = cvs.width = cvs.offsetWidth * window.devicePixelRatio;
    let h = cvs.height = cvs.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const resize = () => {
      w = cvs.width = cvs.offsetWidth * window.devicePixelRatio;
      h = cvs.height = cvs.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", resize);

    // Init 30 particles
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(makeParticle(w, h, activeColor));
    }

    const animate = () => {
      if (!ctx || !cvs) return;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const alpha = isActive
          ? Math.min(1, (p.life / p.maxLife) * 2) * (1 - p.life / p.maxLife)
          : 0.2 * (1 - p.life / p.maxLife);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${alpha})`).replace("rgb", "rgba");
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles[i] = makeParticle(w, h, activeColor);
        }
      }

      // Draw connections between nearby particles (when active)
      if (isActive) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = activeColor.replace(")", `,${0.1 * (1 - dist / 120)})`).replace("rgb", "rgba");
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, activeColor, isActive]);
}

// ─── Component ──────────────────────────────────────────────────────────
interface EvolutionGraphProps {
  currentLevel: number;
  className?: string;
}

export default function EvolutionGraph({ currentLevel, className = "" }: EvolutionGraphProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active stage
  const activeStage = useMemo(() => {
    let idx = 0;
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (currentLevel >= STAGES[i].level) { idx = i; break; }
    }
    return idx;
  }, [currentLevel]);

  const activeColor = STAGES[activeStage].color;
  const isActive = hoveredIndex !== null || true; // always show particles subtly

  useCanvasParticles(canvasRef, activeColor, true);

  // Auto-advance active index for demo (slow pulse)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Progress indicator (as if "evolving")
  useEffect(() => {
    const t = setInterval(() => {
      setAnimProgress((prev) => {
        if (prev >= 1) return 0;
        return Math.min(1, prev + 0.008);
      });
    }, 50);
    return () => clearInterval(t);
  }, []);

  // ─── SVG node positions (circular layout) ─────────────
  const cx = 160, cy = 160, radius = 110;
  const nodes = STAGES.map((stage, i) => {
    const angle = (i / STAGES.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...stage,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      angle,
      unlocked: currentLevel >= stage.level,
      isCurrent: false,
    };
  });
  // Mark current stage
  nodes[activeStage] = { ...nodes[activeStage], isCurrent: true };

  // Edge paths
  const edges = useMemo(() => {
    const paths: { d: string; from: number; to: number }[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i], b = nodes[i + 1];
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const cpOffset = 20;
      const perpX = -dy;
      const perpY = dx;
      const len = Math.sqrt(perpX * perpX + perpY * perpY);
      const nx = (perpX / len) * cpOffset;
      const ny = (perpY / len) * cpOffset;
      paths.push({
        d: `M ${a.x} ${a.y} Q ${midX + nx} ${midY + ny} ${b.x} ${b.y}`,
        from: i,
        to: i + 1,
      });
    }
    return paths;
  }, []);

  // Pulse animation for current stage
  const pulseScale = 1 + 0.06 * Math.sin(Date.now() / 400);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "24px 16px",
        borderRadius: 20,
        background: "linear-gradient(145deg, #0a0e17 0%, #111827 100%)",
        border: "1px solid rgba(148,163,184,0.12)",
        overflow: "hidden",
        minHeight: 420,
      }}
    >
      {/* Canvas particle layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
          Agent Evolution
        </div>
        <div style={{ fontSize: 12, color: "#475569" }}>
          {STAGES[activeStage].label} · Level {STAGES[activeStage].level}
        </div>
      </div>

      {/* SVG Graph */}
      <svg
        viewBox="0 0 320 320"
        style={{
          width: 320,
          height: 320,
          position: "relative",
          zIndex: 1,
          overflow: "visible",
        }}
      >
        <defs>
          {STAGES.map((s) => (
            <radialGradient key={s.label} id={`glow-${s.label}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow for active stage */}
        <circle
          cx={nodes[activeStage].x}
          cy={nodes[activeStage].y}
          r={60 * pulseScale}
          fill={`url(#glow-${nodes[activeStage].label})`}
          style={{ transition: "all 0.6s ease" }}
        />

        {/* Edges */}
        {edges.map((edge, i) => {
          const unlocked = currentLevel >= STAGES[edge.to].level;
          const isNext = edge.from === activeStage || edge.to === activeStage;
          return (
            <path
              key={i}
              d={edge.d}
              fill="none"
              stroke={unlocked ? STAGES[edge.to].color : "#1e293b"}
              strokeWidth={unlocked ? 2.5 : 1.5}
              strokeOpacity={unlocked ? 0.8 : 0.3}
              style={{
                transition: "stroke 0.5s ease, stroke-width 0.5s ease",
                filter: isNext && !unlocked ? "none" : undefined,
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isHovered = hoveredIndex === i;
          const scale = node.isCurrent ? pulseScale : isHovered ? 1.15 : 1;
          const unlocked = node.unlocked;

          return (
            <g
              key={node.label}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer ring glow */}
              {unlocked && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={28}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={1}
                  strokeOpacity={0.3 + (node.isCurrent ? 0.3 : 0)}
                  style={{ transition: "all 0.4s ease" }}
                />
              )}

              {/* Main node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={22}
                fill={unlocked ? `${node.color}22` : "#0f172a"}
                stroke={unlocked ? node.color : "#1e293b"}
                strokeWidth={unlocked ? 2 : 1.5}
                style={{
                  transition: "all 0.4s ease",
                  transform: `scale(${scale})`,
                  transformOrigin: `${node.x}px ${node.y}px`,
                  filter: unlocked ? "drop-shadow(0 0 6px rgba(255,255,255,0.1))" : undefined,
                }}
              />

              {/* Emoji */}
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={18}
                style={{ pointerEvents: "none", filter: unlocked ? "none" : "grayscale(0.8)" }}
              >
                {node.emoji}
              </text>

              {/* Label */}
              <text
                x={node.x}
                y={node.y + 36}
                textAnchor="middle"
                fontSize={9}
                fill={unlocked ? node.color : "#475569"}
                fontWeight={600}
                style={{ transition: "fill 0.3s ease" }}
              >
                {node.label}
              </text>

              {/* Level */}
              <text
                x={node.x}
                y={node.y + 47}
                textAnchor="middle"
                fontSize={8}
                fill="#475569"
              >
                Lvl {node.level}
              </text>

              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={node.x - 60}
                    y={node.y - 80}
                    width={120}
                    height={28}
                    rx={6}
                    fill="#1e293b"
                    stroke={node.color}
                    strokeWidth={1}
                    strokeOpacity={0.5}
                  />
                  <text
                    x={node.x}
                    y={node.y - 61}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#cbd5e1"
                  >
                    {unlocked ? "✓ " : "🔒 "}{node.desc}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Animated pulse ring on current */}
        {nodes[activeStage] && (
          <circle
            cx={nodes[activeStage].x}
            cy={nodes[activeStage].y}
            r={28}
            fill="none"
            stroke={nodes[activeStage].color}
            strokeWidth={1.5}
            strokeOpacity={0.6 * Math.sin(Date.now() / 600)}
            style={{ transition: "opacity 0.1s linear" }}
          >
            <animate
              attributeName="r"
              values="28;38;28"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.6;0;0.6"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>

      {/* Progress bar */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#475569" }}>
          <span>Level 1 · Hatchling</span>
          <span>Level 25 · Legend</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 4,
            borderRadius: 2,
            background: "rgba(148,163,184,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(currentLevel / 30) * 100}%`,
              height: "100%",
              borderRadius: 2,
              background: `linear-gradient(90deg, ${STAGES[0].color}, ${STAGES[activeStage].color})`,
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <div style={{ fontSize: 10, color: "#475569", textAlign: "center" }}>
          Level {currentLevel} ·{" "}
          {activeStage >= STAGES.length - 1
            ? "Max evolution reached 👑"
            : `${STAGES[activeStage + 1].level - currentLevel} levels to ${STAGES[activeStage + 1].label}`}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        {STAGES.map((s, i) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 999,
              fontSize: 9,
              fontWeight: 500,
              background: currentLevel >= s.level ? `${s.color}15` : "rgba(30,41,59,0.5)",
              color: currentLevel >= s.level ? s.color : "#475569",
              border: `1px solid ${currentLevel >= s.level ? `${s.color}44` : "rgba(30,41,59,0.5)"}`,
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: 10 }}>{s.emoji}</span>
            {s.label}
          </div>
        ))}
      </div>

      {/* Interaction hint */}
      <div style={{ position: "relative", zIndex: 1, fontSize: 9, color: "#334155" }}>
        Hover over stages to preview · Evolve by earning XP
      </div>
    </div>
  );
}
