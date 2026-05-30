'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Cpu, CircuitBoard, Radio, Cog, Rocket, ChevronRight, Activity,
  Zap, HardDrive, Wifi, Terminal, Bot, Monitor, Sparkles, Crown, Star
} from 'lucide-react';
import Link from 'next/link';
import { useLevelProgression } from '@/lib/swarm/use-level-progression';
import { getGodTierStatus, getVisualTier, getAbilitiesForLevel } from '@/lib/swarm/god-tier-engine';

// ─-- Platform Definitions --────────────────────────────────────────────

interface PlatformDef {
  id: string;
  name: string;
  icon: typeof Cpu;
  description: string;
  detail: string;
  color: string;
  badge: string;
  capabilities: string[];
}

const PLATFORMS: PlatformDef[] = [
  {
    id: 'ros2',
    name: 'ROS2',
    icon: CircuitBoard,
    description: 'Deploy as distributed ROS2 nodes with full topic/pub-sub integration.',
    detail: 'ROS2 Humble / Iron compatible. Your agent subscribes to camera, lidar, and odometry topics, publishes control commands, and runs real-time inference on the edge.',
    color: '#14B8A6',
    badge: 'Robot OS',
    capabilities: ['Topic pub-sub', 'Node lifecycle', 'TF transforms', 'Action servers'],
  },
  {
    id: 'arduino',
    name: 'Arduino / ESP32',
    icon: Cpu,
    description: 'Flash agent logic directly to microcontroller for sensor/actuator control.',
    detail: 'Compile Titan skills to Arduino-compatible C++ sketches. Wire up sensors (DHT, ultrasonic, IMU) and actuators (servos, motors, relays) via GPIO.',
    color: '#10B981',
    badge: 'Microcontroller',
    capabilities: ['GPIO control', 'I2C/SPI/UART', 'Sensor fusion', 'Low-power mode'],
  },
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi',
    icon: Monitor,
    description: 'Run your agent as a systemd service on any Raspberry Pi with camera/GPS/GPIO.',
    detail: 'Full Linux deployment. Agent runs as a persistent service with auto-start, health-check pings back to Titan, and full access to Pi 5 hardware (CSI camera, PiGPIO, HATs).',
    color: '#F59E0B',
    badge: 'Single-Board',
    capabilities: ['systemd service', 'CSI camera', 'GPIO + HATs', 'WiFi/BT mesh'],
  },
  {
    id: 'custom',
    name: 'Custom Hardware',
    icon: Cog,
    description: 'Generic webhook / gRPC bridge for any robot with an API.',
    detail: 'Bring your own hardware. Titan sends structured commands via HTTP webhook, gRPC stream, or MQTT broker. Includes auto-retry, circuit-breaker, and heartbeat monitoring.',
    color: '#7C3AED',
    badge: 'Universal Bridge',
    capabilities: ['Webhook API', 'gRPC stream', 'MQTT broker', 'Circuit breaker'],
  },
];

// ─-- Particle Field (subtle teal-only for white bg) --─────────────────

function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 200 + Math.random() * 160,
      delay: Math.random() * 100,
      color: 'rgba(20, 184, 166,',
      opacity: 0.12,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `${p.color} ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color} ${p.opacity * 0.5})`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -6, 2, -10, -2, -14, 0, -8, -4, -10, 0],
            x: [0, 4, -2, 6, -4, 5, -6, 3, -3, 2, 0],
            scale: [1, 1.08, 0.82, 1.15, 0.88, 1.1, 0.75, 1.05, 0.85, 1.02, 1],
            opacity: [
              p.opacity * 0.2, p.opacity * 0.6, p.opacity * 0.4,
              p.opacity * 0.8, p.opacity * 0.25, p.opacity * 0.7,
              p.opacity * 0.15, p.opacity * 0.6, p.opacity * 0.35,
              p.opacity * 0.55, p.opacity * 0.2,
            ],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─-- Stat Counter --─────────────────────────────────────────────────────

function RoboticsStat({ icon, end, label, color }: { icon: React.ReactNode; end: number; label: string; color: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end]);

  return (
    <div className="p-4 rounded-xl bg-white border border-gray-200 text-center">
      <div className="flex justify-center mb-2" style={{ color }}>{icon}</div>
      <p className="text-xl sm:text-2xl font-bold font-mono" style={{ color }}>
        {count.toLocaleString()}+
      </p>
      <p className="text-[10px] font-mono text-gray-500 mt-0.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}

// ─-- Main Page --────────────────────────────────────────────────────────

export default function RoboticsPage() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const [{ showGodModal, hasGodTierAura }, progressionActions] = useLevelProgression(level);

  // Sync level into the hook
  useEffect(() => {
    progressionActions.setLevel(level);
  }, [level, progressionActions]);

  const handleLevelUp = useCallback(() => {
    setLevel((prev) => Math.min(prev + 1, 55));
  }, []);

  const handleLevelDown = useCallback(() => {
    setLevel((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleAddXp = useCallback(() => {
    setXp((prev) => progressionActions.addXp(25, prev, 100));
  }, [progressionActions]);

  const handleResetLevel = useCallback(() => {
    setLevel(1);
    setXp(0);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* -- Background glow overlay -- */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-bl from-teal-50/60 to-transparent" />

      {/* -- Particles -- */}
      <ParticleField />

      {/* -- God-Tier Modal -- */}
      {showGodModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <motion.div
            className="relative max-w-md mx-4 p-8 rounded-2xl border text-center overflow-hidden bg-white"
            style={{
              borderColor: 'rgba(20, 184, 166, 0.3)',
            }}
            initial={{ scale: 0.85, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Animated crown */}
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👑
            </motion.div>

            <h2 className="text-2xl font-bold titan-text-gradient mb-2">God-Tier Unlocked!</h2>
            <p className="text-sm text-gray-500 mb-4 font-mono">
              Your agent has reached Level {level} and awakened new abilities.
            </p>

            {/* Abilities preview */}
            <div className="text-left mb-6 space-y-2">
              {getAbilitiesForLevel(level).filter(a => a.type === 'visual' || a.type === 'passive').slice(0, 4).map((ability) => (
                <div key={ability.id} className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-lg">{ability.icon}</span>
                  <div>
                    <p className="text-gray-900 font-semibold">{ability.name}</p>
                    <p className="text-gray-500 text-[10px]">{ability.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => progressionActions.dismissGodModal()}
              className="px-8 py-2.5 rounded-xl text-xs font-semibold shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
                color: '#FFFFFF',
              }}
            >
              ✦ Continue
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10">
        {/* -- Title Bar -- */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-2">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                hasGodTierAura
                  ? 'border-2 animate-pulse'
                  : 'bg-teal-50 border border-teal-200'
              }`}
              style={hasGodTierAura ? { borderColor: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)' } : {}}
              animate={hasGodTierAura ? { boxShadow: ['0 0 10px rgba(245,158,11,0.3)', '0 0 20px rgba(245,158,11,0.5)', '0 0 10px rgba(245,158,11,0.3)'] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {hasGodTierAura ? (
                <Crown className="h-5 w-5 text-amber-500" />
              ) : (
                <Bot className="h-5 w-5 text-teal-600" />
              )}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold titan-text-gradient tracking-tight">Robotics</h1>
                {/* Level badge */}
                <motion.div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono"
                  style={{
                    background: hasGodTierAura
                      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(20, 184, 166, 0.15))'
                      : 'rgba(20, 184, 166, 0.1)',
                    border: `1px solid ${hasGodTierAura ? 'rgba(245, 158, 11, 0.4)' : 'rgba(20, 184, 166, 0.2)'}`,
                    color: hasGodTierAura ? '#F59E0B' : '#0D9488',
                  }}
                  animate={hasGodTierAura ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="h-2.5 w-2.5" />
                  <span>Lv.{level}</span>
                  {hasGodTierAura && <span className="text-[8px]">✦ GOD</span>}
                </motion.div>
              </div>
              <p className="text-xs font-mono text-gray-500">Deploy your Titan agents to any robot</p>
            </div>
          </motion.div>

          {/* -- Navigation hint + Level Controls -- */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className="flex items-center gap-2 text-[10px] font-mono text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="hover:text-teal-600 cursor-pointer transition-colors">Dashboard</span>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className="text-teal-600">Robotics</span>
            </motion.div>

            {/* Level controls (collapsible for demo) */}
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setShowControls((p) => !p)}
                className="text-[10px] font-mono text-gray-400 hover:text-gray-600 px-2 py-1 rounded border border-gray-200"
              >
                {showControls ? 'Hide' : 'Dev'}
              </button>
              {showControls && (
                <>
                  <button
                    onClick={handleLevelDown}
                    className="text-[10px] font-mono px-1.5 py-1 rounded border border-gray-200 text-gray-400 hover:text-teal-600"
                  >
                    -Lv
                  </button>
                  <button
                    onClick={handleLevelUp}
                    className="text-[10px] font-mono px-1.5 py-1 rounded border border-gray-200 text-gray-400 hover:text-teal-600"
                  >
                    +Lv
                  </button>
                  <button
                    onClick={handleAddXp}
                    className="text-[10px] font-mono px-1.5 py-1 rounded border border-gray-200 text-gray-400 hover:text-amber-500"
                  >
                    +XP
                  </button>
                  <button
                    onClick={handleResetLevel}
                    className="text-[10px] font-mono px-1.5 py-1 rounded border border-gray-200 text-red-400 hover:text-red-500"
                  >
                    Reset
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* -- Hero Section -- */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Pill badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4 sm:mb-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <Zap className="h-3 w-3 text-amber-500" />
              <span className="text-[10px] sm:text-xs font-mono text-amber-600 tracking-wider">
                BRIDGE THE DIGITAL &amp; PHYSICAL
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4 leading-tight">
              <span className="titan-text-gradient">Deploy Your Agent</span>
              <br />
              <span className="text-gray-900">to Any Robot</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed">
              Your Titan agent isn't just software — it's a brain for your hardware.
              Deploy to ROS2 robots, Arduino microcontrollers, Raspberry Pi, or any custom rig.
            </p>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.button
                className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
                  color: '#FFFFFF',
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <HardDrive className="h-3.5 w-3.5" />
                Connect Hardware
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.button>

              <Link href="/robotics/dashboard">
                <motion.button
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-gray-500 border border-gray-200 inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Activity className="h-3.5 w-3.5" />
                  View Dashboard
                </motion.button>
              </Link>

              <Link href="/robotics/[platform]">
                <motion.button
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-gray-500 border border-gray-200 inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Setup Guides
                </motion.button>
              </Link>
            </motion.div>

            {/* Quick features row below CTA */}
            <motion.div
              className="flex items-center justify-center gap-4 sm:gap-6 mt-5 text-[10px] sm:text-xs font-mono text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="flex items-center gap-1.5">
                <Radio className="h-3 w-3 text-teal-500" /> ROS2 compatible
              </span>
              <span className="flex items-center gap-1.5">
                <Wifi className="h-3 w-3 text-teal-500" /> Real-time telemetry
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-teal-500" /> Edge inference
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* -- Stats Row -- */}
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <RoboticsStat icon={<Zap className="h-4 w-4" />} end={128} label="Devices Online" color="#0D9488" />
            <RoboticsStat icon={<Bot className="h-4 w-4" />} end={47} label="Agents Deployed" color="#F59E0B" />
            <RoboticsStat icon={<Terminal className="h-4 w-4" />} end={15600} label="Commands Issued" color="#10B981" />
            <RoboticsStat icon={<Cpu className="h-4 w-4" />} end={8} label="Platforms Supported" color="#7C3AED" />
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 mb-14 sm:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-1">
              <span className="titan-text-gradient">Supported Platforms</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-mono">
              Choose your hardware, deploy in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PLATFORMS.map((platform, index) => {
              const Icon = platform.icon;
              const isHovered = hoveredPlatform === platform.id;
              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredPlatform(platform.id)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                >
                  <Card
                    className={`p-5 sm:p-6 h-full bg-white border transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? 'shadow-lg'
                        : ''
                    }`}
                    style={{
                      borderColor: isHovered ? 'rgba(20, 184, 166, 0.4)' : '#E5E7EB',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon container */}
                      <motion.div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${platform.color}12`,
                          border: `1px solid ${platform.color}30`,
                        }}
                        animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-5 w-5" style={{ color: platform.color }} />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        {/* Platform name + badge */}
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                            {platform.name}
                          </h3>
                          <Badge
                            className="text-[9px] h-4 px-1.5 font-mono border-0"
                            style={{
                              background: `${platform.color}20`,
                              color: platform.color,
                            }}
                          >
                            {platform.badge}
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3">
                          {platform.description}
                        </p>

                        {/* Detail (reveal on hover) */}
                        <motion.p
                          className="text-[11px] font-mono text-gray-400 leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={
                            isHovered
                              ? { opacity: 1, height: 'auto' }
                              : { opacity: 0, height: 0 }
                          }
                          transition={{ duration: 0.25 }}
                        >
                          {platform.detail}
                        </motion.p>

                        {/* Capability tags */}
                        <motion.div
                          className="flex flex-wrap gap-1.5 mt-3"
                          initial={{ opacity: 0 }}
                          animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
                          transition={{ duration: 0.2 }}
                        >
                          {platform.capabilities.slice(0, isHovered ? 4 : 2).map((cap) => (
                            <span
                              key={cap}
                              className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                              style={{
                                borderColor: `${platform.color}25`,
                                color: `${platform.color}80`,
                                background: `${platform.color}08`,
                              }}
                            >
                              {cap}
                            </span>
                          ))}
                          {platform.capabilities.length > 2 && !isHovered && (
                            <span className="text-[9px] font-mono text-gray-400">
                              +{platform.capabilities.length - 2} more
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 sm:p-8 bg-white border border-gray-200 backdrop-blur-sm relative overflow-hidden">
            {/* Subtle inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.06) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 border border-teal-200 flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Rocket className="h-6 w-6 text-teal-600" />
              </motion.div>

              <h2 className="text-lg sm:text-xl font-bold mb-2">
                <span className="titan-text-gradient">Ready to build something physical?</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-5 font-mono max-w-md mx-auto">
                Connect your first robot in under 5 minutes. No credit card required.
                Start with a simulated device to test before deploying to real hardware.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/robotics/dashboard">
                <motion.button
                  className="px-7 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
                    color: '#FFFFFF',
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Activity className="h-3.5 w-3.5" />
                  Open Dashboard
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.button>
              </Link>

              <Link href="/robotics">
                <motion.button
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-gray-500 border border-gray-200 inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Explore Platforms
                </motion.button>
              </Link>
              </div>

              {/* Trust badge */}
              <div className="flex items-center justify-center gap-4 mt-4 text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <Terminal className="h-2.5 w-2.5" /> No install required
                </span>
                <span className="flex items-center gap-1">
                  <Radio className="h-2.5 w-2.5" /> Real-time dashboard
                </span>
                <span className="flex items-center gap-1">
                  <Cpu className="h-2.5 w-2.5" /> Open-source bridges
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
