"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import WaitlistForm from "./components/WaitlistForm";

/* ─────────────────────────────────────────────────────────────
   Particle Background (Enhanced with Corona, Nebula, Hue Cycling)
   — Optimized: respects prefers-reduced-motion, defers init via
     requestIdleCallback, pauses when tab hidden
   ───────────────────────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const reducedMotionRef = useRef(false);
  const visibilityRef = useRef(true);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;

    if (mq.matches) {
      // Don't render canvas at all for reduced motion users
      return;
    }

    // Listen for changes to reduced-motion preference
    const handleMqChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        // User switched to reduced motion — cancel animation
        if (animId) cancelAnimationFrame(animId);
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
    mq.addEventListener("change", handleMqChange);

    // Defer canvas setup to avoid blocking LCP
    const setup = () => {
      setShowCanvas(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animId: number;
      let w = window.innerWidth;
      let h = window.innerHeight;
      let time = 0;
      let nebulaTime = 0;

      const resize = () => {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas!.width = w;
        canvas!.height = h;
      };
      window.addEventListener("resize", resize);
      resize();

      // mouse tracking
      const onMouse = (e: MouseEvent) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      };
      const onLeave = () => {
        mouseRef.current.x = -9999;
        mouseRef.current.y = -9999;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("mouseleave", onLeave, { passive: true });

      // Tab visibility: pause animation when hidden
      const onVisibility = () => {
        visibilityRef.current = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVisibility);

      const particles: {
        x: number; y: number;
        vx: number; vy: number;
        r: number;
        baseHue: number;
        hueShift: number;
        life: number;
      }[] = [];

      // Nebula wisps — large slow-drifting blobs
      const nebulaWisps: {
        x: number; y: number;
        vx: number; vy: number;
        r: number;
        hue: number;
      }[] = [];

      const count = Math.min(100, Math.floor((w * h) / 18000));
      const wispCount = Math.min(6, Math.floor((w * h) / 80000));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.8 + 0.4,
          baseHue: Math.random() * 360,
          hueShift: Math.random() * Math.PI * 2,
          life: 1,
        });
      }

      for (let i = 0; i < wispCount; i++) {
        nebulaWisps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          r: 120 + Math.random() * 180,
          hue: 180 + Math.random() * 60,
        });
      }

      const draw = () => {
        // Skip draw if reduced motion or tab hidden
        if (!visibilityRef.current) {
          animId = requestAnimationFrame(draw);
          return;
        }
        if (reducedMotionRef.current) {
          return;
        }

        time += 0.005;
        nebulaTime += 0.002;
        ctx!.clearRect(0, 0, w, h);

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // ── 1. Nebula wisps ──
        for (const wisp of nebulaWisps) {
          wisp.x += wisp.vx + Math.sin(nebulaTime + wisp.hue) * 0.15;
          wisp.y += wisp.vy + Math.cos(nebulaTime * 0.7 + wisp.hue * 0.5) * 0.15;

          if (wisp.x < -wisp.r) wisp.x = w + wisp.r;
          if (wisp.x > w + wisp.r) wisp.x = -wisp.r;
          if (wisp.y < -wisp.r) wisp.y = h + wisp.r;
          if (wisp.y > h + wisp.r) wisp.y = -wisp.r;

          const alpha = 0.03 + 0.02 * Math.sin(nebulaTime * 1.3 + wisp.hue);
          const gradient = ctx!.createRadialGradient(wisp.x, wisp.y, 0, wisp.x, wisp.y, wisp.r);
          gradient.addColorStop(0, `hsla(${wisp.hue + 10 * Math.sin(nebulaTime + wisp.hue)}, 80%, 60%, ${alpha})`);
          gradient.addColorStop(0.5, `hsla(${wisp.hue - 30}, 70%, 40%, ${alpha * 0.6})`);
          gradient.addColorStop(1, `hsla(${wisp.hue - 60}, 60%, 20%, 0)`);

          ctx!.beginPath();
          ctx!.arc(wisp.x, wisp.y, wisp.r, 0, Math.PI * 2);
          ctx!.fillStyle = gradient;
          ctx!.fill();
        }

        // ── 2. Main particles ──
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;

          p.vx += Math.sin(time + p.hueShift) * 0.002;
          p.vy += Math.cos(time + p.hueShift * 1.3) * 0.002;

          const maxV = 0.4;
          if (Math.abs(p.vx) > maxV) p.vx = Math.sign(p.vx) * maxV;
          if (Math.abs(p.vy) > maxV) p.vy = Math.sign(p.vy) * maxV;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          const dx = p.x - mx;
          const dy = p.y - my;
          const distMouse = Math.sqrt(dx * dx + dy * dy);
          if (distMouse < 120 && distMouse > 0) {
            const force = (120 - distMouse) / 120;
            p.x += (dx / distMouse) * force * 2;
            p.y += (dy / distMouse) * force * 2;
          }

          const hue = (p.baseHue + time * 12 + p.hueShift * 8) % 360;
          const pulse = 0.25 + 0.15 * Math.sin(time * 2 + p.hueShift);

          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fillStyle = `hsla(${hue}, 80%, 70%, ${pulse})`;
          ctx!.fill();

          if (p.r > 1.3) {
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx!.fillStyle = `hsla(${hue}, 80%, 70%, ${pulse * 0.12})`;
            ctx!.fill();
          }
        }

        // ── 3. Corona burst ──
        const coronaChance = 0.008;
        if (Math.random() < coronaChance) {
          const cx = w / 2 + (Math.random() - 0.5) * w * 0.5;
          const cy = h / 2 + (Math.random() - 0.5) * h * 0.3;
          const countBeams = 6 + Math.floor(Math.random() * 8);
          const hue = (time * 30) % 360;
          for (let i = 0; i < countBeams; i++) {
            const angle = (Math.PI * 2 * i) / countBeams + (Math.random() - 0.5) * 0.4;
            const len = 40 + Math.random() * 80;
            ctx!.beginPath();
            ctx!.moveTo(cx, cy);
            ctx!.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
            ctx!.strokeStyle = `hsla(${hue + i * 20}, 90%, 70%, 0.15)`;
            ctx!.lineWidth = 0.5 + Math.random();
            ctx!.stroke();
          }
        }

        // ── 4. Dynamic connections ──
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              const alpha = 0.07 * (1 - dist / 130);
              const hue = (particles[i].baseHue + particles[j].baseHue) / 2 + time * 10;
              ctx!.beginPath();
              ctx!.moveTo(particles[i].x, particles[i].y);
              ctx!.lineTo(particles[j].x, particles[j].y);
              ctx!.strokeStyle = `hsla(${hue % 360}, 70%, 70%, ${alpha})`;
              ctx!.lineWidth = 0.6;
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
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    };

    // Defer canvas init — use requestIdleCallback with setTimeout fallback
    if (typeof requestIdleCallback === "function") {
      const idleId = requestIdleCallback(setup, { timeout: 200 });
      return () => {
        cancelIdleCallback(idleId);
        mq.removeEventListener("change", handleMqChange);
      };
    } else {
      const timer = setTimeout(setup, 200);
      return () => {
        clearTimeout(timer);
        mq.removeEventListener("change", handleMqChange);
      };
    }
  }, []);

  if (!showCanvas && !reducedMotionRef.current) {
    // Show a static gradient placeholder before canvas kicks in
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f0f2a] to-[#0a0a1a]" />
    );
  }

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // auto-close mobile menu on scroll
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    // slight delay so the toggle click itself doesn't close immediately
    const timer = setTimeout(() => {
      window.addEventListener("click", onClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", onClick);
    };
  }, [mobileOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080fe0] backdrop-blur-xl border-b border-[#1e293b]/50"
          : "bg-transparent"
      }`}
    >
      <div ref={menuRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗡️</span>
            <span className="text-lg font-bold">
              <span className="text-cyan-400">Ti</span>
              <span className="text-purple-400">tan</span>
            </span>
          </div>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="/features" className="hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="/progression" className="hover:text-cyan-400 transition-colors">
              Progression
            </a>
            <a href="/pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <a href="/robotics" className="hover:text-cyan-400 transition-colors">
              Robotics
            </a>
            <a href="/sandbox" className="hover:text-cyan-400 transition-colors">
              Studio
            </a>
          </div>

          {/* Desktop CTA */}
          <button className="hidden md:inline-flex px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
            Launch App
          </button>

          {/* Hamburger button (mobile) */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[2px] w-6 rounded bg-slate-300 transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 rounded bg-slate-300 transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 rounded bg-slate-300 transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 sm:mx-6 mb-3 rounded-2xl border border-[#1e293b]/60 bg-[#08080ff0] backdrop-blur-xl p-5 space-y-1">
            <a
              href="/features"
              onClick={closeMobile}
              className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
            >
              Features
            </a>
            <a
              href="/progression"
              onClick={closeMobile}
              className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
            >
              Progression
            </a>
            <a
              href="/pricing"
              onClick={closeMobile}
              className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
            >
              Pricing
            </a>
            <a
              href="/robotics"
              onClick={closeMobile}
              className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
            >
              Robotics
            </a>
            <a
              href="/sandbox"
              onClick={closeMobile}
              className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
            >
              Studio
            </a>
            <div className="pt-2">
              <button
                onClick={closeMobile}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Launch App
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating orbs (decorative)
   ───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   Back to Top button
   ───────────────────────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-600/80 backdrop-blur-md border border-cyan-400/20 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stats bar — animated social proof counters
   ───────────────────────────────────────────────────────────── */
const STATS = [
  { label: "Hunters On Waitlist", value: 2847, suffix: "+", icon: "🗡️" },
  { label: "Agent Tiers", value: 6, suffix: "", icon: "👑" },
  { label: "Skill Nodes", value: 24, suffix: "", icon: "✨" },
  { label: "Active Developers", value: 156, suffix: "+", icon: "🧙" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1500;
          const steps = 30;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-black text-white">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="text-2xl">{stat.icon}</span>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                >
                  <TierCard tier={tier} index={i} />
                </motion.div>
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
                  <motion.div
                    key={node.label}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                  >
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────── */}
        <StatsSection />

        {/* ── CTA ─────────────────────────────────────────── */}
        <section
          id="cta"
          className="relative py-24 sm:py-32 px-4"
        >
          <FloatingOrbs />

          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div
              className="glass rounded-3xl p-10 sm:p-16 border border-cyan-500/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                The Gates Are{" "}
                <span className="text-gradient">Opening</span>
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Join the first wave of hunters. Build, train, and deploy your AI
                agent army — no experience required.
              </p>

              <WaitlistForm />
            </motion.div>
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
              <a href="/features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
              <a href="/sandbox" className="hover:text-cyan-400 transition-colors">Studio</a>
              <a href="/robotics" className="hover:text-cyan-400 transition-colors">Robotics</a>
            </div>
          </div>
        </footer>
        <BackToTop />
      </main>
    </>
  );
}
