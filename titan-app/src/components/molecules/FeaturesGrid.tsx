"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  Shield,
  TrendingUp,
  Puzzle,
  Zap,
  Sparkles,
  Orbit,
  Cpu,
} from "lucide-react";

interface FeatureHighlight {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FEATURES: FeatureHighlight[] = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: "Skill Forge",
    description:
      "Craft custom agent skills with a Monaco-style editor and certify them through an automated audit pipeline.",
    color: "#F59E0B",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Audit Center",
    description:
      "OWASP/TDAD compliance checks with gold/silver/bronze certification — built for production-grade agents.",
    color: "#10B981",
  },
  {
    icon: <Puzzle className="h-5 w-5" />,
    title: "LifeOS Integration",
    description:
      "Plugins for travel, finance, health, and productivity — each with its own XP, streaks, and analytics.",
    color: "#14B8A6",
  },
  {
    icon: <Orbit className="h-5 w-5" />,
    title: "Swarm Orchestrator",
    description:
      "Orchestrate multiple agents in real-time with command input, drag-and-drop reordering, and saved configurations.",
    color: "#7C3AED",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "ROI Dashboard",
    description:
      "Track value generated per agent with live metrics, XP progression, and achievement badges for every milestone.",
    color: "#14B8A6",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Visual Atelier",
    description:
      "Customize agent appearance with skins, outfits, and 3D-rendered tier upgrades that unlock as you level up.",
    color: "#F59E0B",
  },
];

function FeatureCard({ feature, index }: { feature: FeatureHighlight; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="group relative p-4 sm:p-5 rounded-2xl bg-titan-card/60 border border-titan-border/20 backdrop-blur-sm transition-all duration-300 hover:border-opacity-60 cursor-default"
      style={{
        borderLeft: `3px solid ${feature.color}40`,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
    >
      {/* Icon container */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
        style={{
          background: `${feature.color}12`,
          border: `1px solid ${feature.color}25`,
          color: feature.color,
        }}
      >
        {feature.icon}
      </div>

      {/* Content */}
      <h3 className="text-sm font-semibold mb-1.5 text-titan-text/90 group-hover:text-white transition-colors">
        {feature.title}
      </h3>
      <p className="text-[11px] sm:text-xs text-titan-muted/70 leading-relaxed">
        {feature.description}
      </p>

      {/* Subtle corner glow on hover */}
      <div
        className="absolute -bottom-1 -right-1 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${feature.color}20 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}

export function FeaturesGrid() {
  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-12">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-titan-teal/10 border border-titan-teal/20">
            <Sparkles className="h-3 w-3 text-titan-teal" />
            <span className="text-[10px] font-mono text-titan-teal tracking-wider uppercase">
              Everything you need
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            <span className="titan-text-gradient">Powerful features, </span>
            <span className="text-titan-text/80">zero complexity</span>
          </h2>
          <p className="text-xs sm:text-sm text-titan-muted/60 mt-2 max-w-lg mx-auto font-mono">
            From skill creation to swarm orchestration — Titan handles the heavy lifting
            so you can focus on what matters.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
