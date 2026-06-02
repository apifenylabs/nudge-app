"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Cpu,
  CircuitBoard,
  Radio,
  Cog,
  ArrowRight,
  Zap,
  Globe,
  Layers,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import MascotDisplay from '../../components/organisms/MascotDisplay';
import { useLevelProgression } from '../../lib/swarm/use-level-progression';
import { checkGodTierUnlock, getGodTierAbilities, getGodTierTier } from '../../lib/swarm/god-tier-engine';

import type { Variants } from 'framer-motion';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

const PLATFORMS = [
  {
    icon: <Radio className="w-8 h-8" />,
    name: 'Raspberry Pi 5',
    href: '/robotics/raspberry-pi',
    description: 'Run your agent as a systemd service on a Raspberry Pi cluster or standalone.',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    name: 'NVIDIA Jetson Nano',
    href: '/robotics/jetson-nano',
    description: 'Deploy GPU-accelerated AI agents on NVIDIA Jetson Nano.',
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    name: 'Arduino Portenta H7',
    href: '/robotics/portenta-h7',
    description: 'Deploy Titan skill logic on industrial-grade dual-core microcontrollers.',
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    name: 'ESP32-S3',
    href: '/robotics/esp32-s3',
    description: 'Flash Titan skill logic to ESP32-S3 — wireless microcontroller with WiFi + BLE.',
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: <Cog className="w-8 h-8" />,
    name: 'Titan Rover Pro',
    href: '/robotics/titan-rover-pro',
    description: 'Official 4WD rover platform with LiDAR, IMU, camera, and autonomous navigation.',
    color: '#6366F1',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    icon: <Cog className="w-8 h-8" />,
    name: 'Titan Robotic Arm',
    href: '/robotics/titan-robotic-arm',
    description: '6-DOF precision arm for pick-and-place, assembly, and lab automation.',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
  },
];

const STATS = [
  { icon: <Globe className="w-5 h-5" />, value: '6', label: 'Platforms Supported' },
  { icon: <Zap className="w-5 h-5" />, value: '12+', label: 'Device Types' },
  { icon: <Layers className="w-5 h-5" />, value: '3', label: 'Deployment Layers' },
];

export default function RoboticsPage() {
  const [progState, progActions] = useLevelProgression(35);
  const godTier = checkGodTierUnlock(progState.level);
  const abilities = getGodTierAbilities(progState.level);
  const tierNum = getGodTierTier(progState.level);

  return (
    <main className="min-h-screen bg-[#0F172A] text-[#F1F5F9] overflow-hidden relative">
      {/* ── Background gradient ────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(20, 184, 166, 0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)',
        }}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeIn}
          >
            Deploy Your Agent{' '}
            <span className="bg-gradient-to-r from-[#14B8A6] to-[#F59E0B] bg-clip-text text-transparent">
              To Any Robot
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-[#94A3B8] max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeIn}
          >
            Titan agents aren't trapped in a browser. Deploy them to ROS2, Arduino,
            Raspberry Pi, or any custom hardware — and let your AI walk, fly, or roll.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeIn}
          >
            <a
              href="/robotics/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
                color: '#0F172A',
                boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(20, 184, 166, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(20, 184, 166, 0.3)';
              }}
            >
              Connect Hardware <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Progression Section ────────────────────────────── */}
      <section className="relative pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl font-bold mb-6 text-center"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeIn}
          >
            Your Agent
            {progState.hasGodTierAura && (
              <span className="ml-2 text-[#F59E0B]">👑</span>
            )}
          </motion.h2>

          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeIn}
          >
            {/* Mascot display — handles god-tier aura + modal internally */}
            <MascotDisplay
              level={progState.level}
              mascotName="Alpha-1"
              className="w-full max-w-sm rounded-2xl"
            />

            {/* Level controls — for demoing progression */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => progActions.setLevel(Math.max(1, progState.level - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(51, 65, 85, 0.6)',
                  color: '#94A3B8',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(51, 65, 85, 0.7)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)'; }}
              >
                <ChevronDown className="w-3 h-3" /> Down
              </button>
              <button
                onClick={() => progActions.setLevel(progState.level + 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: progState.hasGodTierAura
                    ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                    : 'rgba(51, 65, 85, 0.5)',
                  border: progState.hasGodTierAura
                    ? '1px solid rgba(245, 158, 11, 0.4)'
                    : '1px solid rgba(51, 65, 85, 0.6)',
                  color: progState.hasGodTierAura ? '#0F172A' : '#94A3B8',
                }}
                onMouseEnter={(e) => {
                  if (!progState.hasGodTierAura) e.currentTarget.style.background = 'rgba(51, 65, 85, 0.7)';
                }}
                onMouseLeave={(e) => {
                  if (!progState.hasGodTierAura) e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                }}
              >
                Level Up <ChevronUp className="w-3 h-3" />
              </button>
            </div>

            {/* God-Tier status panel */}
            {progState.hasGodTierAura && (
              <motion.div
                className="mt-4 p-4 rounded-xl max-w-sm w-full"
                style={{
                  background:
                    tierNum >= 4
                      ? 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(20,184,166,0.1))'
                      : 'rgba(245,158,11,0.08)',
                  border: `1px solid rgba(245,158,11,${tierNum >= 4 ? 0.3 : 0.2})`,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#F59E0B' }}>
                    {tierNum >= 4 ? '🌟 Ascended' : tierNum >= 3 ? '🌀 Advanced' : '👑 God-Tier'}
                  </span>
                  <span className="text-xs" style={{ color: '#64748B' }}>
                    Level {progState.level}
                  </span>
                </div>
                <div className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
                  Unlocked abilities:
                  {abilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {abilities.map((a) => (
                        <span
                          key={a}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                          style={{
                            background: 'rgba(245,158,11,0.12)',
                            color: '#FCD34D',
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Stats Row ──────────────────────────────────────── */}
      <motion.section
        className="relative pb-8 px-4"
        initial="hidden"
        animate="visible"
        custom={5}
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl"
              style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(51, 65, 85, 0.5)' }}
            >
              <div className="text-[#14B8A6]">{s.icon}</div>
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-xs text-[#64748B]">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Platform Cards ─────────────────────────────────── */}
      <section className="relative pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl font-bold mb-8 text-center"
            initial="hidden"
            animate="visible"
            custom={6}
            variants={fadeIn}
          >
            Supported Platforms
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {PLATFORMS.map((platform, i) => (
              <a
                key={platform.name}
                href={platform.href}
                className="block no-underline"
              >
                <motion.div
                  className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-200"
                  style={{
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(51, 65, 85, 0.6)',
                  }}
                  initial="hidden"
                  animate="visible"
                  custom={7 + i}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03, borderColor: platform.color }}
                >
                  {/* Accent line */}
                  <div
                    className="absolute top-0 left-4 right-4 h-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: platform.color }}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${platform.color}20, transparent)`,
                        color: platform.color,
                      }}
                    >
                      {platform.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-1">{platform.name}</h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover hint */}
                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: platform.color }}
                  >
                    Setup Guide <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
