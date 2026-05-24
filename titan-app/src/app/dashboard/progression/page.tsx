"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Rocket, Trophy, Sparkles, Star, Shield,
} from "lucide-react";

import {
  useProgressionGame,
  useGodTier,
  getAchievementById,
  checkAchievements,
  BASE_ORBITING_AGENTS,
} from "@/lib/dashboard-store";
import { getAbilitiesForLevel } from "@/lib/swarm/god-tier-engine";
import type { ProgressionState } from "@/lib/dashboard-store";

export default function ProgressionPage() {
  const [progression, setProgression] = useProgressionGame();
  const currentLevel = useMemo(() => Math.max(1, Math.floor(progression.totalXp / 500) + 1), [progression.totalXp]);
  const godTierStatus = useGodTier(progression, currentLevel);
  const godTierAbilities = useMemo(() => getAbilitiesForLevel(currentLevel), [currentLevel]);

  const [keepBasicLook, setKeepBasicLook] = useState(() => {
    if (typeof window === 'undefined') return false;
    try { return localStorage.getItem('titan-keep-basic-look') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('titan-keep-basic-look', String(keepBasicLook)); } catch {}
  }, [keepBasicLook]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: '#D4A017' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#D4A017' }}>ACHIEVEMENT HALL</h2>
        <span className="text-[10px] font-mono" style={{ color: '#666666' }}>// milestones &amp; God-Tier</span>
      </div>

      {/* God-Tier Banner */}
      <motion.div className="p-6 rounded-2xl relative overflow-hidden"
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
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Rocket className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: '#D4A017' }}>Progression System</h3>
            <p className="text-sm" style={{ color: '#666666' }}>Level up agents to unlock God-Tier capabilities</p>
          </div>
          {currentLevel >= 30 ? (
            <Badge className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 text-xs font-mono font-bold">
              Active · {godTierAbilities.length} abilities
            </Badge>
          ) : (
            <Badge className="ml-auto text-xs font-mono"
              style={{
                background: 'rgba(212,160,23,0.2)',
                color: '#D4A017',
                borderColor: 'rgba(212,160,23,0.3)',
              }}>
              Next: Lv.30 (Lv.{currentLevel})
            </Badge>
          )}
        </div>
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
          { title: 'Unlocked Achievements', value: `${progression.achievements.length}/5`, desc: 'Track your milestone progress', color: '#0EA5A5' },
          { title: 'God-Tier Abilities', value: currentLevel >= 30 ? `${godTierAbilities.length}` : '0', desc: currentLevel >= 30 ? `${godTierAbilities.length} abilities active` : `Unlocked at Lv.30 (current: Lv.${currentLevel})`, color: '#D4A017' },
          { title: 'Total XP Earned', value: progression.totalXp.toLocaleString(), desc: `Score: ${godTierStatus.godTierScore}/100 · Level ${currentLevel}`, color: '#10B981' },
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

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'first-skill', name: 'First Skill Run', emoji: '🏆' },
          { id: 'first-audit', name: 'First Audit', emoji: '⚡' },
          { id: 'gold-standard', name: 'Gold Standard', emoji: '🌟' },
          { id: 'swarm-master', name: 'Swarm Master', emoji: '🌀' },
          { id: 'xp-collector', name: 'XP Collector', emoji: '💎' },
        ].map((ach) => {
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
              <p className="text-xs mt-1" style={{ color: '#1F1F1F' }}>{ach.name}</p>
              {unlocked && <p className="text-[9px] font-mono mt-0.5" style={{ color: '#10B981' }}>✓ Unlocked</p>}
              {!unlocked && <p className="text-[9px] font-mono mt-0.5" style={{ color: '#666666' }}>🔒 Locked</p>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
