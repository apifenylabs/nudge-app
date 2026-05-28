"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Rocket, Trophy, Sparkles, Star, Shield, Zap, TrendingUp,
  Layers, Clock, BarChart3, ArrowUp,
} from "lucide-react";

import {
  useProgressionGame,
  useGodTier,
  getAchievementById,
  checkAchievements,
  ACHIEVEMENT_DEFS,
  BASE_ORBITING_AGENTS,
} from "@/lib/dashboard-store";
import { getAbilitiesForLevel } from "@/lib/swarm/god-tier-engine";
import type { ProgressionState } from "@/lib/dashboard-store";
import {
  getXpSourceBreakdown,
  computeLifeOSXp,
} from "@/lib/lifeos-xp-bridge";

function XpBreakdownCard({ totalXp, level }: { totalXp: number; level: number }) {
  // Real XP sources — LifeOS reads from actual analytics, not estimates
  const rawSources = useMemo(() => getXpSourceBreakdown(totalXp), [totalXp]);

  // Map string icon names to actual icon components for rendering
  const renderIcon = useCallback((iconName: string, className: string, style: React.CSSProperties) => {
    switch (iconName) {
      case 'Zap': return <Zap className={className} style={style} />;
      case 'Layers': return <Layers className={className} style={style} />;
      case 'Shield': return <Shield className={className} style={style} />;
      case 'Trophy': return <Trophy className={className} style={style} />;
      case 'Sparkles': return <Sparkles className={className} style={style} />;
      default: return <Zap className={className} style={style} />;
    }
  }, []);

  const maxPct = Math.max(...rawSources.map(s => s.pct), 1);

  return (
    <motion.div
      className="p-4 rounded-xl border"
      style={{
        background: '#FFFFFF',
        borderColor: '#E5E0D8',
        boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-3.5 w-3.5" style={{ color: '#14B8A6' }} />
        <h3 className="text-xs font-semibold font-mono uppercase tracking-wider" style={{ color: '#1F1F1F' }}>XP Sources</h3>
      </div>
      <div className="space-y-2.5">
        {rawSources.map((src, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                {renderIcon(src.icon, 'h-3 w-3', { color: src.color })}
                <span className="text-[10px] font-medium" style={{ color: '#1F1F1F' }}>{src.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold" style={{ color: src.color }}>{src.xp.toLocaleString()}</span>
                <span className="text-[9px] font-mono" style={{ color: '#666666' }}>{src.pct}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F0EDE8' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: src.color, opacity: 0.75 }}
                initial={{ width: 0 }}
                animate={{ width: `${(src.pct / maxPct) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LevelPathTimeline({ currentLevel, totalXp }: { currentLevel: number; totalXp: number }) {
  const milestones = useMemo(() => {
    const points = [];
    for (let lv = 1; lv <= 40; lv += 5) {
      points.push({
        level: lv,
        xpRequired: lv * 500,
        unlocked: totalXp >= lv * 500,
        isCurrent: lv === currentLevel,
        label: lv === 30 ? 'God-Tier' : lv === 40 ? 'Max' : undefined,
      });
    }
    return points;
  }, [currentLevel, totalXp]);

  return (
    <motion.div
      className="p-4 rounded-xl border"
      style={{
        background: '#FFFFFF',
        borderColor: '#E5E0D8',
        boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-3.5 w-3.5" style={{ color: '#D4A017' }} />
        <h3 className="text-xs font-semibold font-mono uppercase tracking-wider" style={{ color: '#1F1F1F' }}>Level Milestones</h3>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`shrink-0 flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all ${
                m.isCurrent ? 'ring-2 ring-offset-1' : ''
              }`}
              style={{
                minWidth: '44px',
                background: m.unlocked
                  ? 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(212,160,23,0.05))'
                  : '#F8F6F3',
                borderColor: m.isCurrent ? '#D4A017' : m.unlocked ? '#14B8A6' : '#E5E0D8',
                borderWidth: '1px',
                boxShadow: m.isCurrent ? '0 0 0 2px rgba(212,160,23,0.3)' : 'none',
              }}
            >
              <span className={`text-[10px] font-bold font-mono ${m.unlocked ? '' : 'opacity-30'}`}
                style={{ color: m.unlocked ? (m.level >= 30 ? '#D4A017' : '#0EA5A5') : '#666666' }}>
                Lv.{m.level}
              </span>
              {m.label && (
                <span className={`text-[6px] font-mono font-semibold uppercase tracking-wider ${
                  m.unlocked ? '' : 'opacity-30'
                }`}
                  style={{ color: m.level >= 30 ? '#D4A017' : '#666666' }}>
                  {m.label}
                </span>
              )}
              <div className={`w-1.5 h-1.5 rounded-full ${m.unlocked ? '' : 'opacity-30'}`}
                style={{ background: m.level >= 30 ? '#D4A017' : '#0EA5A5' }} />
            </div>
            {i < milestones.length - 1 && (
              <div className="h-px w-2 sm:w-3 shrink-0" style={{ background: '#E5E0D8' }} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProgressionPage() {
  const [progression, setProgression] = useProgressionGame();
  const currentLevel = useMemo(() => Math.max(1, Math.floor(progression.totalXp / 500) + 1), [progression.totalXp]);
  const godTierStatus = useGodTier(progression, currentLevel);
  const godTierAbilities = useMemo(() => getAbilitiesForLevel(currentLevel), [currentLevel]);

  // Auto-check achievements on mount
  useEffect(() => {
    const newAchievements = checkAchievements(progression);
    if (newAchievements.length > progression.achievements.length) {
      setProgression({ achievements: newAchievements });
    }
  }, [progression.totalXp, progression.skillsCertified, progression.goldSkills, progression.totalTasksRun]);

  const [keepBasicLook, setKeepBasicLook] = useState(() => {
    if (typeof window === 'undefined') return false;
    try { return localStorage.getItem('titan-keep-basic-look') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('titan-keep-basic-look', String(keepBasicLook)); } catch {}
  }, [keepBasicLook]);

  // Compute XP for next level
  const nextLevelXp = currentLevel * 500;
  const xpIntoLevel = progression.totalXp - (currentLevel - 1) * 500;
  const xpProgressInLevel = Math.min(100, Math.round((xpIntoLevel / 500) * 100));

  // Real LifeOS analytics for stats display
  const lifeosXpData = useMemo(() => computeLifeOSXp(), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: '#D4A017' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#D4A017' }}>ACHIEVEMENT HALL</h2>
        <span className="text-[10px] font-mono" style={{ color: '#666666' }}>// milestones &amp; God-Tier</span>
      </div>

      {/* Progression Hero Banner — more prominent level + XP display */}
      <motion.div className="p-6 sm:p-8 rounded-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(14,165,165,0.05))',
          border: '1px solid rgba(212,160,23,0.3)',
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}>
        <motion.div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(circle at 30% 50%, rgba(245,158,11,0.3) 0%, transparent 60%)' }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400/30 to-amber-500/10 flex items-center justify-center shadow-inner">
            <Rocket className="h-7 w-7 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-lg" style={{ color: '#D4A017' }}>Progression System</h3>
              {/* Big level badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-400/30"
                style={{ color: '#D4A017' }}>
                <ArrowUp className="h-3 w-3" />
                Lv.{currentLevel}
              </span>
            </div>
            <p className="text-sm mt-0.5" style={{ color: '#666666' }}>
              {xpProgressInLevel}% to Lv.{currentLevel + 1} · {progression.totalXp.toLocaleString()} total XP
            </p>
          </div>
          <div className="text-right shrink-0">
            {currentLevel >= 30 ? (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 text-xs font-mono font-bold">
                Active · {godTierAbilities.length} abilities
              </Badge>
            ) : (
              <Badge className="text-xs font-mono"
                style={{
                  background: 'rgba(212,160,23,0.2)',
                  color: '#D4A017',
                  borderColor: 'rgba(212,160,23,0.3)',
                }}>
                God-Tier Lv.30 (Lv.{currentLevel})
              </Badge>
            )}
          </div>
        </div>
        {/* Level progress bar — with animated shimmer */}
        <div className="mt-4 h-2 rounded-full overflow-hidden relative" style={{ background: 'rgba(14,165,165,0.12)' }}>
          <motion.div
            className="h-full rounded-full relative"
            style={{ background: 'linear-gradient(90deg, #14B8A6, #D4A017)' }}
            initial={{ width: 0 }}
            animate={{ width: `${xpProgressInLevel}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] font-mono font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {((currentLevel - 1) * 500).toLocaleString()} XP
          </span>
          <span className="text-[10px] font-mono font-bold" style={{ color: '#D4A017' }}>
            {xpIntoLevel.toLocaleString()} / 500
          </span>
          <span className="text-[10px] font-mono font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {(currentLevel * 500).toLocaleString()} XP
          </span>
        </div>
      </motion.div>

      {/* Real LifeOS Stats Card */}
      <motion.div
        className="p-4 rounded-xl border"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E0D8',
          boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-3.5 w-3.5" style={{ color: '#14B8A6' }} />
          <h3 className="text-xs font-semibold font-mono uppercase tracking-wider" style={{ color: '#1F1F1F' }}>LifeOS Contribution</h3>
          <span className="text-[9px] font-mono ml-auto" style={{ color: '#666666' }}>
            {lifeosXpData.activePlugins} active plugins
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-2 rounded-lg" style={{ background: '#F8F6F3' }}>
            <p className="text-lg font-bold" style={{ color: '#14B8A6' }}>{lifeosXpData.totalActions}</p>
            <p className="text-[9px] font-mono" style={{ color: '#666666' }}>Total Actions</p>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: '#F8F6F3' }}>
            <p className="text-lg font-bold" style={{ color: '#0EA5A5' }}>{lifeosXpData.activePlugins}</p>
            <p className="text-[9px] font-mono" style={{ color: '#666666' }}>Active Plugins</p>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: '#F8F6F3' }}>
            <p className="text-lg font-bold" style={{ color: '#D4A017' }}>{lifeosXpData.completedPlugins}</p>
            <p className="text-[9px] font-mono" style={{ color: '#666666' }}>Completed</p>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: '#F8F6F3' }}>
            <p className="text-lg font-bold" style={{ color: '#10B981' }}>{lifeosXpData.totalLifeosXp.toLocaleString()}</p>
            <p className="text-[9px] font-mono" style={{ color: '#666666' }}>XP Contributed</p>
          </div>
        </div>
        <p className="text-[9px] font-mono mt-2 text-center" style={{ color: '#999999' }}>
          Data sourced from LifeOS analytics · {lifeosXpData.streakDays}-day streak
        </p>
      </motion.div>

      {/* Evolution Toggle */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <motion.button
          onClick={() => setKeepBasicLook(prev => !prev)}
          className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all border ${
            keepBasicLook
              ? 'border-[#E5E0D8] text-[#666666]'
              : 'border-[#0EA5A5]/30 text-[#1F1F1F] shadow-sm'
          }`}
          style={{ background: keepBasicLook ? '#FFFFFF' : '#FFFFFF' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}>
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${keepBasicLook ? 'bg-[#666666]' : 'bg-[#0EA5A5]'}`} />
            Agent Evolution: {keepBasicLook ? 'OFF' : 'ON'}
          </span>
        </motion.button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Unlocked Achievements', value: `${progression.achievements.length}/${ACHIEVEMENT_DEFS.length}`, desc: `${ACHIEVEMENT_DEFS.length - progression.achievements.length} remaining · keep going!`, color: '#0EA5A5' },
          { title: 'God-Tier Abilities', value: currentLevel >= 30 ? `${godTierAbilities.length}` : '0', desc: currentLevel >= 30 ? `${godTierAbilities.length} abilities active` : `Unlocked at Lv.30 (current: Lv.${currentLevel})`, color: '#D4A017' },
          { title: 'Total XP Earned', value: progression.totalXp.toLocaleString(), desc: `Score: ${godTierStatus.godTierScore}/100 · ${progression.totalTasksRun} tasks`, color: '#10B981' },
        ].map((s, i) => (
          <motion.div key={i} className="p-4 rounded-xl"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E0D8',
              boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm font-semibold mt-1" style={{ color: '#1F1F1F' }}>{s.title}</p>
            <p className="text-[11px] mt-1" style={{ color: '#666666' }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* XP Breakdown + Level Timeline — side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <XpBreakdownCard totalXp={progression.totalXp} level={currentLevel} />
        <LevelPathTimeline currentLevel={currentLevel} totalXp={progression.totalXp} />
      </div>

      {/* God-Tier Preview — shown before unlocking */}
      {currentLevel < 30 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(212,160,23,0.06), rgba(14,165,165,0.03))',
            borderColor: 'rgba(212,160,23,0.18)',
          }}
        >
          {/* Subtle glow */}
          <motion.div
            className="absolute -inset-8 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.25) 0%, transparent 60%)',
            }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4" style={{ color: '#D4A017' }} />
              <h3 className="text-sm font-bold" style={{ color: '#D4A017' }}>
                God-Tier Preview
              </h3>
              <Badge
                className="text-[9px] font-mono font-semibold"
                style={{
                  background: 'rgba(212,160,23,0.15)',
                  color: '#D4A017',
                  borderColor: 'rgba(212,160,23,0.25)',
                }}
              >
                Unlocks Lv.30
              </Badge>
              <span className="text-[9px] font-mono ml-auto" style={{ color: '#666666' }}>
                {30 - currentLevel} levels to go
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: '#666666' }}>
              Push to <strong style={{ color: '#D4A017' }}>Level 30</strong> and unlock transcendent abilities that transform
              your agent swarm. Here&apos;s what awaits:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { icon: '✨', name: 'God-Tier Aura', desc: 'Golden radial pulse aura' },
                { icon: '👑', name: 'Crown Badge', desc: 'Level badge transforms' },
                { icon: '💫', name: 'Premium Ring', desc: 'Shimmering gold orbit' },
                { icon: '🗣️', name: 'God Command', desc: 'Command 5 agents at once' },
                { icon: '🔒', name: 'Soulbound Skill', desc: 'One immortal skill' },
                { icon: '⚡', name: 'Aura Pressure', desc: '+10% XP for nearby agents' },
              ].map((preview, i) => (
                <motion.div
                  key={i}
                  className="p-2.5 rounded-lg flex items-center gap-2 text-xs"
                  style={{
                    background: 'rgba(212,160,23,0.05)',
                    border: '1px solid rgba(212,160,23,0.1)',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-base shrink-0">{preview.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold truncate" style={{ color: '#1F1F1F' }}>
                      {preview.name}
                    </p>
                    <p className="text-[8px] font-mono truncate" style={{ color: '#666666' }}>
                      {preview.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div
                className="h-1.5 rounded-full flex-1 max-w-xs overflow-hidden"
                style={{ background: 'rgba(14,165,165,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #14B8A6, #D4A017)',
                    width: `${Math.min(100, (currentLevel / 30) * 100)}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (currentLevel / 30) * 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[9px] font-mono font-semibold shrink-0" style={{ color: '#D4A017' }}>
                Lv.{currentLevel} / 30
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* God-Tier Abilities */}
      {currentLevel >= 30 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border"
          style={{
            background: 'linear-gradient(135deg, rgba(212,160,23,0.08), rgba(14,165,165,0.03))',
            borderColor: 'rgba(212,160,23,0.25)',
          }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-bold" style={{ color: '#D4A017' }}>God-Tier Abilities</h3>
            <span className="text-[10px] font-mono ml-auto" style={{ color: '#666666' }}>
              {godTierAbilities.length} unlocked · Lv.{currentLevel}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {godTierAbilities.slice(0, 9).map((ability: any) => (
              <div key={ability.id} className="p-2.5 rounded-lg flex items-center gap-2 text-xs"
                style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.12)' }}>
                <span className="text-base">{ability.icon}</span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold truncate" style={{ color: '#1F1F1F' }}>{ability.name}</p>
                  <p className="text-[8px] font-mono truncate" style={{ color: '#666666' }}>{ability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Achievement Grid — now dynamically rendered from ACHIEVEMENT_DEFS */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-3.5 w-3.5" style={{ color: '#D4A017' }} />
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#666666' }}>All Achievements</span>
          <span className="text-[9px] font-mono ml-auto" style={{ color: '#666666' }}>
            {progression.achievements.length}/{ACHIEVEMENT_DEFS.length} unlocked
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACHIEVEMENT_DEFS.map((ach) => {
            const unlocked = progression.achievements.includes(ach.id);
            return (
              <motion.div key={ach.id} className={`p-3 rounded-xl border text-center ${unlocked ? '' : 'opacity-40'}`}
                style={{
                  background: unlocked ? '#FFFFFF' : '#F8F6F3',
                  borderColor: unlocked ? '#E5E0D8' : '#E5E0D8',
                  boxShadow: unlocked ? '0 10px 30px -10px rgba(31,31,31,0.08)' : 'none',
                }}
                whileHover={unlocked ? { y: -2 } : {}}>
                <span className={`text-2xl ${unlocked ? '' : 'grayscale'}`}>{ach.emoji}</span>
                <p className="text-xs mt-1 font-semibold" style={{ color: unlocked ? '#1F1F1F' : '#666666' }}>{ach.name}</p>
                <p className="text-[9px] mt-0.5 leading-tight" style={{ color: unlocked ? '#666666' : '#999999' }}>{ach.description}</p>
                {unlocked && <p className="text-[9px] font-mono mt-1" style={{ color: '#10B981' }}>✓ Unlocked</p>}
                {!unlocked && <p className="text-[9px] font-mono mt-1" style={{ color: '#666666' }}>🔒 Locked</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
