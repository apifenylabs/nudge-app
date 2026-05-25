"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Particle Background
   ───────────────────────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
    };
    window.addEventListener("resize", resize);
    resize();

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = Math.min(80, Math.floor((w * h) / 20000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(34, 211, 238, 0.3)";
        ctx!.fill();
      }

      // subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(34, 211, 238, ${0.08 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Typewriter hook
   ───────────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 50) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

/* ─────────────────────────────────────────────────────────────
   Tier Card
   ───────────────────────────────────────────────────────────── */
const tiers = [
  {
    name: "Novice",
    subtitle: "E-Rank",
    color: "from-slate-400 to-slate-500",
    icon: "⚔️",
    features: [
      "1 Agent slot",
      "Basic prompt tools",
      "Text-only responses",
      "Community templates",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Hunter",
    subtitle: "B-Rank",
    color: "from-cyan-500 to-cyan-600",
    icon: "🗡️",
    features: [
      "5 Agent slots",
      "Tool integration",
      "File & web access",
      "Advanced memory",
      "Custom knowledge bases",
    ],
    cta: "Go Hunter",
    highlight: true,
  },
  {
    name: "Sovereign",
    subtitle: "S-Rank",
    color: "from-purple-500 to-fuchsia-600",
    icon: "👑",
    features: [
      "Unlimited agents",
      "Multi-agent orchestration",
      "API access & webhooks",
      "Custom training",
      "Private deployment",
      "Priority support",
    ],
    cta: "Ascend",
    highlight: false,
  },
];

function TierCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl p-[1px] transition-all duration-500 ${
        tier.highlight ? "scale-105 z-10" : "scale-100"
      } ${hovered ? (tier.highlight ? "scale-110" : "scale-105") : ""}`}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* neon border glow */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-40 blur-sm transition-opacity duration-300 ${
          hovered ? "opacity-70" : ""
        }`}
        style={{
          background: `linear-gradient(135deg, ${tier.highlight ? "#22d3ee" : "#334155"}, ${tier.highlight ? "#a855f7" : "#1e293b"})`,
        }}
      />
      <div className="glass relative rounded-2xl p-6 h-full flex flex-col">
        {/* Tier badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{tier.icon}</span>
          <span
            className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${tier.color} text-transparent bg-clip-text`}
          >
            {tier.subtitle}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">{tier.name}</h3>

        <ul className="space-y-2 mb-6 flex-1">
          {tier.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-cyan-400 mt-0.5 shrink-0">◆</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            tier.highlight
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/30"
              : "border border-slate-600 text-slate-300 hover:border-cyan-500/50 hover:text-white"
          }`}
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Progression Tree nodes
   ───────────────────────────────────────────────────────────── */
const treeNodes = [
  {
    tier: "E",
    label: "Prompt Crafter",
    desc: "Basic instruction tuning",
    color: "border-slate-600",
    glow: "shadow-slate-600/30",
  },
  {
    tier: "D",
    label: "Tool Weaver",
    desc: "Function calling & APIs",
    color: "border-cyan-800",
    glow: "shadow-cyan-800/30",
  },
  {
    tier: "C",
    label: "Memory Sage",
    desc: "Context & recall systems",
    color: "border-cyan-600",
    glow: "shadow-cyan-600/30",
  },
  {
    tier: "B",
    label: "Agent Commander",
    desc: "Multi-agent coordination",
    color: "border-cyan-500",
    glow: "shadow-cyan-500/30",
  },
  {
    tier: "A",
    label: "Reality Forger",
    desc: "Tool synthesis & planning",
    color: "border-purple-500",
    glow: "shadow-purple-500/30",
  },
  {
    tier: "S",
    label: "Sovereign Engine",
    desc: "Autonomous agent army",
    color: "border-fuchsia-500",
    glow: "shadow-fuchsia-500/40",
  },
];

/* ─────────────────────────────────────────────────────────────
   Navbar
   ───────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080fe0] backdrop-blur-xl border-b border-[#1e293b]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗡️</span>
          <span className="text-lg font-bold">
            <span className="text-cyan-400">Ti</span>
            <span className="text-purple-400">tan</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Tiers
          </a>
          <a href="#progression" className="hover:text-cyan-400 transition-colors">
            Progression
          </a>
          <a href="#cta" className="hover:text-cyan-400 transition-colors">
            Get Started
          </a>
        </div>

        <button className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
          Launch App
        </button>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating orbs (decorative)
   ───────────────────────────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <>
      <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute top-1/3 right-[10%] w-80 h-80 rounded-full bg-purple-600/5 blur-3xl animate-float-delayed pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full bg-cyan-600/5 blur-3xl animate-float-slow pointer-events-none" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
export default function HomePage() {
  const { displayed, done } = useTypewriter(
    "The gates are opening. Will you rise — or be consumed?",
    30
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <ParticleField />

      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16"
        >
          <FloatingOrbs />

          {/* Arcanum glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs text-cyan-400 mb-8 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Closed Alpha — Sign Up Now
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
              <span className="text-gradient">Build Your</span>
              <br />
              <span className="text-white">AI Agent Army</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              A visual agent builder powered by{" "}
              <span className="text-cyan-400 font-semibold">Solo Leveling</span>{" "}
              progression mechanics. Train your agents. Evolve their skills.
              Conquer the battlefield.
            </p>

            {/* Typewriter */}
            <p className="text-sm text-slate-500 h-6 mb-10 font-mono">
              {displayed}
              {!done && <span className="animate-pulse text-cyan-400">▍</span>}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#cta"
                className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105"
              >
                <span className="relative z-10">Start Free</span>
              </a>
              <a
                href="#features"
                className="px-8 py-3.5 rounded-xl border border-slate-600 text-slate-300 font-semibold text-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
              >
                See Tiers
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs animate-bounce">
            <span>SCROLL</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ── FEATURES / TIERS ────────────────────────────── */}
        <section
          id="features"
          className="relative py-24 sm:py-32 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Choose Your <span className="text-gradient">Path</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Every hunter starts somewhere. Pick your rank and ascend through
                the tiers — each level unlocks new powers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {tiers.map((tier, i) => (
                <TierCard key={tier.name} tier={tier} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PROGRESSION TREE ──────────────────────────── */}
        <section
          id="progression"
          className="relative py-24 sm:py-32 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Progression <span className="text-gradient">Tree</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Unlock specializations as you rank up. Each skill tree branch
                makes your agents more powerful.
              </p>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute top-8 left-[calc(8.33%+1px)] right-[calc(8.33%+1px)] h-0.5 bg-gradient-to-r from-slate-700 via-cyan-500/50 to-fuchsia-500/50 hidden md:block" />

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-3">
                {treeNodes.map((node, i) => (
                  <div key={node.label} className="flex flex-col items-center text-center">
                    {/* Node circle */}
                    <div
                      className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-2 ${node.color} bg-[#0f0f1a] ${node.glow} shadow-lg mb-3 transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                    >
                      <span
                        className={`text-sm font-black ${
                          i < 3
                            ? "text-cyan-400"
                            : i < 5
                              ? "text-purple-400"
                              : "text-fuchsia-400"
                        }`}
                      >
                        {node.tier}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {node.label}
                    </h4>
                    <p className="text-xs text-slate-500">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section
          id="cta"
          className="relative py-24 sm:py-32 px-4"
        >
          <FloatingOrbs />

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="glass rounded-3xl p-10 sm:p-16 border border-cyan-500/10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                The Gates Are{" "}
                <span className="text-gradient">Opening</span>
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Join the first wave of hunters. Build, train, and deploy your AI
                agent army — no experience required.
              </p>

              <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300">
                Start Free — Ascend Now
              </button>

              <p className="text-xs text-slate-600 mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <footer className="relative border-t border-slate-800/50 py-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>🗡️</span>
              <span className="text-slate-500">
                Titan — {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                Docs
              </span>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                GitHub
              </span>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                Discord
              </span>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                Privacy
              </span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
