"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Zap, Trophy, ChevronRight, Bot, Star, Sparkles,
  Shield, Puzzle, TrendingUp, Orbit, Cpu, Swords, Crown,
} from "lucide-react";
import { AnimatedStatCounter } from "@/components/molecules/AnimatedStatCounter";
import { TestimonialsSection } from "@/components/molecules/TestimonialsSection";

// ─── Particle Field ────────────────────────────────────────────────────

function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 48 }, (_, i) => {
      const isTeal = Math.random() < 0.62;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 160 + Math.random() * 120,
        delay: Math.random() * 80,
        color: isTeal ? 'rgba(20, 184, 166,' : 'rgba(245, 158, 11,',
        opacity: isTeal ? 0.78 : 0.58,
        glowSize: 5 + Math.random() * 6,
        layer: Math.floor(Math.random() * 3),
      };
    }), []);

  const layerStyles = ['z-0', 'z-[1]', 'z-[2]'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div key={p.id} className={`absolute ${layerStyles[p.layer]} titan-particle-glow`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size + p.glowSize * 2, height: p.size + p.glowSize * 2 }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `${p.color} ${p.opacity})`,
              left: '50%', top: '50%',
              x: '-50%', y: '-50%',
              boxShadow: `0 0 ${p.glowSize * 4.2}px ${p.color} ${p.opacity * 0.7})`,
            }}
            animate={{
              y: [0, -8, 2, -12, -3, -18, 0, -10, -5, -14, 0],
              x: [0, 5, -3, 8, -5, 6, -7, 4, -4, 3, 0],
              scale: [1, 1.12, 0.78, 1.2, 0.85, 1.15, 0.72, 1.08, 0.8, 1.05, 1],
              opacity: [
                p.opacity * 0.25, p.opacity * 0.65, p.opacity * 0.45,
                p.opacity * 0.85, p.opacity * 0.3, p.opacity * 0.75,
                p.opacity * 0.2, p.opacity * 0.7, p.opacity * 0.4,
                p.opacity * 0.6, p.opacity * 0.25
              ],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Orbital Swarm Visual ──────────────────────────────────────────────

function OrbitalSwarm() {
  const dots = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      orbitRadius: 36 + i * 12,
      dotSize: 3 + i * 0.4,
      speed: 25 + i * 8,
      delay: i * 1.2,
      hue: i < 3 ? 'teal' : 'golden',
    })), []);

  return (
    <div className="relative w-40 h-40 mx-auto my-6 sm:my-8">
      {/* Center core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-12 h-12 rounded-full bg-titan-teal/15 border border-titan-teal/30 flex items-center justify-center titan-agent-deep">
          <Crown className="h-6 w-6 text-titan-golden" />
        </div>
      </div>
      {/* Orbiting agents */}
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: d.orbitRadius * 2, height: d.orbitRadius * 2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: d.speed, repeat: Infinity, ease: 'linear', delay: d.delay }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: d.dotSize,
              height: d.dotSize,
              left: '50%',
              top: 0,
              x: '-50%',
              y: '-50%',
              background: d.hue === 'teal' ? '#14B8A6' : '#F59E0B',
              boxShadow: `0 0 8px ${d.hue === 'teal' ? '#14B8A6' : '#F59E0B'}`,
            }}
          />
          {/* Connection line */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20"
            width={d.orbitRadius * 2}
            height={d.orbitRadius * 2}
            style={{ transform: 'rotate(0deg)' }}
          >
            <circle
              cx={d.orbitRadius}
              cy={d.orbitRadius}
              r={d.orbitRadius - 2}
              fill="none"
              stroke={d.hue === 'teal' ? '#14B8A6' : '#F59E0B'}
              strokeWidth="0.5"
              strokeDasharray="3 5"
              className="titan-orbit-ring"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Feature highlight card ────────────────────────────────────────────

interface FeatureHighlight {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FEATURES: FeatureHighlight[] = [
  {
    icon: <Swords className="h-5 w-5" />,
    title: "Skill Forge",
    description: "Craft custom agent skills with a Monaco-style editor and certify them through an automated audit pipeline. Hone your arsenal.",
    color: "#F59E0B",
  },
  {
    icon: <Crown className="h-5 w-5" />,
    title: "God-Tier System",
    description: "Ascend through agent tiers with automated progression — unlock elite abilities and golden certifications as you level up.",
    color: "#F59E0B",
  },
  {
    icon: <Orbit className="h-5 w-5" />,
    title: "Orbital Swarm",
    description: "Visualize your agent collective orbiting your core — real-time swarm orchestration with drag-and-drop reordering.",
    color: "#14B8A6",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "LifeOS Daily Tracker",
    description: "Plugins for travel, finance, health, and productivity — each with its own XP, streaks, and daily analytics. Stay consistent.",
    color: "#10B981",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Audit Center",
    description: "OWASP/TDAD compliance checks with gold/silver/bronze certification — built for production-grade agents.",
    color: "#10B981",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Visual Atelier",
    description: "Customize agent appearance with skins, outfits, and 3D-rendered tier upgrades as you rise through the ranks.",
    color: "#7C3AED",
  },
];

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <motion.div
      className="min-h-screen titan-gradient relative flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none z-0 titan-radial-glow-warm" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.06) 0%, transparent 65%)',
        mixBlendMode: 'screen',
      }} />
      <div className="absolute inset-0 pointer-events-none z-0 titan-grid-bg" />
      <ParticleField />

      {/* ── Nav Bar ── */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{
              background: 'linear-gradient(135deg, #14B8A6/20, #F59E0B/10)',
              borderColor: '#14B8A6/30',
            }}>
            <span className="text-sm font-bold titan-text-gradient">T</span>
          </div>
          <span className="text-sm font-bold text-titan-text">Titan</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogin}
            className="px-4 py-1.5 rounded-lg text-xs font-mono text-titan-muted hover:text-titan-text transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={handleGetStarted}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold"
            style={{
              background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
              color: '#0A0E17',
            }}
          >
            Enter the Forge
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-8 sm:pt-12 pb-8">
        <div className="max-w-4xl w-full text-center">
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-titan-teal/10 border border-titan-teal/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Swords className="h-3.5 w-3.5 text-titan-golden" />
            <span className="text-[10px] sm:text-xs font-mono text-titan-golden tracking-wider">
              SOLO-LEVELING PROGRESSION
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="titan-text-gradient">Level Up Your</span>
            <br />
            <span className="text-titan-text/90">AI Agent Swarm</span>
          </motion.h1>

          <motion.p
            className="text-titan-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Forge custom skills, command an orbital swarm, and climb through god-tier ranks.
            Titan turns your agent ecosystem into a living progression system — like a solo-leveling RPG for your productivity.
          </motion.p>

          {/* Orbital Swarm Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <OrbitalSwarm />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.button
              onClick={handleGetStarted}
              className="px-8 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
                color: '#0A0E17',
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Swords className="h-4 w-4" />
              Enter the Forge
              <ChevronRight className="h-4 w-4" />
            </motion.button>

            <motion.button
              onClick={handleLogin}
              className="px-8 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 border"
              style={{
                borderColor: 'rgba(20, 184, 166, 0.3)',
                color: '#14B8A6',
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Already Awakened? Sign In
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 sm:mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <AnimatedStatCounter end={528} label="Automated tasks completed" suffix="k+" icon={<Zap className="h-4 w-4" />} color="#14B8A6" />
            <AnimatedStatCounter end={12400} label="XP earned by early users" suffix="+" icon={<Trophy className="h-4 w-4" />} color="#F59E0B" />
            <AnimatedStatCounter end={47} label="Custom skills forged" prefix="" icon={<Bot className="h-4 w-4" />} color="#10B981" />
            <AnimatedStatCounter end={13} label="Gold certifications earned" prefix="" icon={<Star className="h-4 w-4" />} color="#F59E0B" />
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="relative z-10 w-full py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-titan-teal/10 border border-titan-teal/20">
              <Sparkles className="h-3 w-3 text-titan-teal" />
              <span className="text-[10px] font-mono text-titan-teal tracking-wider uppercase">
                Your Arsenal
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              <span className="titan-text-gradient">Power up your swarm</span>
              <span className="text-titan-text/80"> with every rank</span>
            </h2>
            <p className="text-xs sm:text-sm text-titan-muted/60 mt-2 max-w-lg mx-auto font-mono">
              Skill Forge, God-Tier system, orbital swarm, and LifeOS daily tracker — all built in.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="group relative p-4 sm:p-5 rounded-2xl bg-titan-card/60 border border-titan-border/20 backdrop-blur-sm transition-all duration-300"
                style={{ borderLeft: `3px solid ${f.color}40` }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}12`, border: `1px solid ${f.color}25`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-titan-text/90 group-hover:text-white transition-colors">
                  {f.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-titan-muted/70 leading-relaxed">
                  {f.description}
                </p>
                <div className="absolute -bottom-1 -right-1 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${f.color}20 0%, transparent 70%)`, filter: "blur(20px)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <div className="relative z-10">
        <TestimonialsSection />
      </div>

      {/* ── How It Works ── */}
      <section className="relative z-10 w-full py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-titan-teal/10 border border-titan-teal/20">
              <TrendingUp className="h-3 w-3 text-titan-teal" />
              <span className="text-[10px] font-mono text-titan-teal tracking-wider uppercase">
                Your Path
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              <span className="titan-text-gradient">From Rookie to God-Tier</span>
              <span className="text-titan-text/80"> in 3 steps</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                step: "01",
                title: "Awaken",
                desc: "Sign up, pick your mascot, and enter the forge. Your agent ecosystem spawns instantly.",
                color: "#14B8A6",
              },
              {
                step: "02",
                title: "Forge & Command",
                desc: "Craft custom skills, assemble your orbital swarm, and automate across LifeOS — travel, finance, health, productivity.",
                color: "#F59E0B",
              },
              {
                step: "03",
                title: "Ascend",
                desc: "Earn XP, unlock tier upgrades, and climb through God-Tier certifications. The swarm grows with you.",
                color: "#10B981",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                className="relative p-5 sm:p-6 rounded-2xl bg-titan-card/40 border border-titan-border/20 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg font-bold font-mono"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}>
                  {s.step}
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-titan-text/90">{s.title}</h3>
                <p className="text-[11px] sm:text-xs text-titan-muted/70 leading-relaxed">{s.desc}</p>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 text-titan-muted/20">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 py-10 sm:py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="p-6 sm:p-8 rounded-2xl bg-titan-card/40 border border-titan-border/20 backdrop-blur-sm titan-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 className="text-lg sm:text-xl font-bold mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="titan-text-gradient">Ready to ascend?</span>
            </motion.h2>
            <p className="text-xs sm:text-sm text-titan-muted/70 mb-4 font-mono">
              Start free. No credit card. Your swarm awaits the hunter.
            </p>
            <motion.button
              onClick={handleGetStarted}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #14B8A6, #F59E0B)', color: '#0A0E17' }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Enter the Forge
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-6 border-t border-titan-border/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold titan-text-gradient">Titan</span>
            <span className="text-[10px] text-titan-muted/50 font-mono">v0.4 · Living Ecosystem</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-titan-muted/50">
            <span>Phasr Forge</span>
            <span>·</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
