"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Save, GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  useProgressionGame,
  MAIN_AGENT,
  BASE_ORBITING_AGENTS,
} from "@/lib/dashboard-store";
import type { TitanAgent } from "@/lib/dashboard-store";
import { loadFeed, saveFeed, loadOrchestrations, saveOrchestrations } from "@/lib/persistence";
import type { FeedEntry, OrchestrationConfig } from "@/lib/persistence";
import { useMascotStore } from "@/stores/mascotStore";

// ─── Agent Avatar ──────────────────────────────────────────────────────

function AgentAvatar({ agent, size = 'md' }: { agent: TitanAgent; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? 160 : size === 'md' ? 80 : 56;
  const glowSize = dims * 1.8;

  return (
    <motion.div
      className="relative flex flex-col items-center gap-1.5 cursor-pointer group"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 12 }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: glowSize, height: glowSize,
          background: `radial-gradient(circle, ${agent.color}18 0%, ${agent.color}08 40%, transparent 70%)`,
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative rounded-2xl flex items-center justify-center"
        style={{
          width: dims, height: dims,
          background: `linear-gradient(145deg, ${agent.color}15, #FFFFFF 60%, ${agent.color}10)`,
          border: `1.5px solid ${agent.color}35`,
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-2xl" style={{
          background: `radial-gradient(circle at 35% 35%, ${agent.color}30 0%, transparent 70%)`,
          opacity: 0.4,
        }} />
        <span className="relative z-10 text-2xl">{agent.emoji}</span>
        <motion.div className="absolute -top-1.5 -right-1.5"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}>
          <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-[10px] h-5 px-1.5 font-mono border-0 shadow-lg shadow-amber-500/20">
            Lv{agent.level}
          </Badge>
        </motion.div>
      </motion.div>
      <motion.span
        className="text-xs font-mono text-gray-500 truncate max-w-[100px] text-center"
        whileHover={{ color: agent.color, textShadow: `0 0 8px ${agent.color}40` }}
      >
        {agent.name}
      </motion.span>
    </motion.div>
  );
}

// ─── Orbiting Swarm ────────────────────────────────────────────────────

function OrbitingSwarm({ agents }: { agents: TitanAgent[] }) {
  const { currentMascot, openPicker } = useMascotStore();
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] mx-auto max-w-full overflow-visible">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '75%', paddingBottom: '75%',
          border: `1px solid ${currentMascot.colorTint}30`,
          background: `radial-gradient(circle, ${currentMascot.colorTint}12 0%, transparent 70%)`,
          boxShadow: `0 0 60px ${currentMascot.colorTint}10`,
        }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: '48%', paddingBottom: '48%', border: `1px dashed ${currentMascot.colorTint}20` }} />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: '84%', paddingBottom: '84%', border: `1px solid ${currentMascot.colorTint}10` }}
        animate={{ rotate: 360, opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="hidden sm:block">
          <img src={currentMascot.image} alt={currentMascot.name}
            className="w-40 h-40 object-contain drop-shadow-lg cursor-pointer"
            style={{ filter: `drop-shadow(0 0 20px ${currentMascot.colorTint}60)` }}
            onClick={openPicker} />
        </div>
        <div className="sm:hidden">
          <img src={currentMascot.image} alt={currentMascot.name}
            className="w-24 h-24 object-contain drop-shadow-lg cursor-pointer"
            style={{ filter: `drop-shadow(0 0 12px ${currentMascot.colorTint}60)` }}
            onClick={openPicker} />
        </div>
      </div>
      {agents.map((agent, i) => {
        const orbitDuration = 18 + i * 4;
        return (
          <div key={agent.id} className="absolute z-20"
            style={{
              left: '50%', top: '50%', width: 0, height: 0,
              animation: `spin ${orbitDuration}s linear infinite`,
              animationDelay: `-${(i / agents.length) * orbitDuration}s`,
            }}>
            <div className="hidden sm:block" style={{ position: 'absolute', width: 56, height: 56, left: -28, top: -28 - 140 }}>
              <AgentAvatar agent={agent} size='sm' />
            </div>
            <div className="sm:hidden" style={{ position: 'absolute', width: 48, height: 48, left: -24, top: -24 - 100 }}>
              <AgentAvatar agent={agent} size='sm' />
            </div>
          </div>
        );
      })}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.12 }}>
        {agents.map((_, i) => {
          const angle = (i / agents.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const gradientId = `line-grad-${i}`;
          return (
            <g key={i}>
              <defs>
                <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' stopColor='#14B8A6' />
                  <stop offset='100%' stopColor='#F59E0B' />
                </linearGradient>
              </defs>
              <line x1='50%' y1='50%'
                x2={`${50 + Math.cos(rad) * 28}%`}
                y2={`${50 + Math.sin(rad) * 28}%`}
                stroke={`url(#${gradientId})`}
                strokeWidth='0.6' strokeDasharray='3 4' />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function SwarmPage() {
  const [progression, setProgression] = useProgressionGame();
  const [swarmInput, setSwarmInput] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [swarmSaveCount, setSwarmSaveCount] = useState(() => loadOrchestrations().length);
  const [bauEntries, setBauEntries] = useState<FeedEntry[]>(() => {
    const saved = loadFeed();
    return saved.length > 0 ? saved : [];
  });

  // Persist feed
  const feedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
    feedTimerRef.current = setTimeout(() => saveFeed(bauEntries), 300);
    return () => { if (feedTimerRef.current) clearTimeout(feedTimerRef.current); };
  }, [bauEntries]);

  // Drag-and-drop swarm order
  const [orderedAgents, setOrderedAgents] = useState<TitanAgent[]>(() => {
    try {
      const saved = localStorage.getItem('titan-swarm-order');
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        const map = new Map(BASE_ORBITING_AGENTS.map(a => [a.id, a]));
        const reordered = parsed.map(id => map.get(id)).filter(Boolean) as TitanAgent[];
        if (reordered.length === BASE_ORBITING_AGENTS.length) return reordered;
      }
    } catch {}
    return [...BASE_ORBITING_AGENTS];
  });

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => { dragItem.current = index; };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
  };
  const handleDrop = useCallback(() => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;
    const copy = [...orderedAgents];
    const dragged = copy[dragItem.current];
    copy.splice(dragItem.current, 1);
    copy.splice(dragOverItem.current, 0, dragged);
    setOrderedAgents(copy);
    try { localStorage.setItem('titan-swarm-order', JSON.stringify(copy.map(a => a.id))); } catch {}
    dragItem.current = null;
    dragOverItem.current = null;
  }, [orderedAgents]);

  // Saved orchestrations
  const [savedOrchestrations, setSavedOrchestrations] = useState(() => loadOrchestrations());
  useEffect(() => { saveOrchestrations(savedOrchestrations); }, [savedOrchestrations]);

  // Grant XP helper
  const grantXp = useCallback((xp: number, extras?: any) => {
    setProgression((prev: any) => ({ totalXp: prev.totalXp + xp }));
  }, [setProgression]);

  const addFeedEntry = useCallback((entry: FeedEntry) => {
    setBauEntries(prev => [entry, ...prev].slice(0, 50));
  }, []);

  const handleSwarmExecute = useCallback(() => {
    if (!swarmInput.trim()) return;
    addFeedEntry({
      id: `swarm-${Date.now()}`, avatar: '🌀', name: 'Swarm',
      text: `Executed: ${swarmInput.trim()}`,
      time: 'Just now', type: 'task',
    });
    grantXp(10);
    setSwarmInput('');
    setToastMsg(`Executed: ${swarmInput.trim()}`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, [swarmInput, addFeedEntry, grantXp]);

  const handleSaveSwarm = useCallback(() => {
    const newOrch: OrchestrationConfig = {
      id: `swarm-${Date.now()}`,
      name: `Swarm ${savedOrchestrations.length + 1}`,
      agentIds: orderedAgents.map(a => a.id),
      connections: orderedAgents.map((a, i) => ({
        source: a.id,
        target: orderedAgents[(i + 1) % orderedAgents.length].id,
        relationship: 'reports_to',
      })),
      savedAt: new Date().toISOString(),
    };
    setSavedOrchestrations(prev => [...prev, newOrch]);
    setSwarmSaveCount(prev => prev + 1);
    setProgression((prev: any) => ({ totalXp: prev.totalXp + 10 }));
    addFeedEntry({
      id: `swarm-save-${Date.now()}`, avatar: '🌀', name: 'Swarm',
      text: `Saved orchestration: ${newOrch.name}`,
      time: 'Just now', type: 'insight',
    });
  }, [orderedAgents, savedOrchestrations.length, setProgression, addFeedEntry]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Orbit view */}
      <Card className="relative h-[400px] sm:h-[500px] md:h-[550px] overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '20px',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)',
        }}>
        <div className="relative z-10 h-full flex items-center justify-center p-2 sm:p-4 max-w-full">
          <OrbitingSwarm agents={orderedAgents} />
        </div>
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[90vw] sm:max-w-lg px-2 sm:px-4 z-30">
          <div className="flex gap-1.5 sm:gap-2 rounded-xl p-1.5 shadow-2xl"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
            }}>
            <input
              value={swarmInput}
              onChange={(e) => setSwarmInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSwarmExecute()}
              placeholder="tell your swarm what to do..."
              className="flex-1 bg-transparent px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none placeholder:text-gray-400 font-mono min-w-0"
            />
            <Button
              onClick={handleSwarmExecute}
              className="font-semibold gap-1 text-[10px] sm:text-xs shrink-0"
              style={{
                background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
                color: '#FFFFFF',
                height: '56px',
                borderRadius: '16px',
              }}
            >
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Execute
            </Button>
          </div>
        </div>
      </Card>

      {/* Drag-and-Drop Agent List */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-mono" style={{ color: '#6B7280' }}>Drag agents to reorder swarm</p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveSwarm}
          className="text-[10px] h-7 gap-1"
          style={{ borderColor: 'rgba(13,148,136,0.3)', color: '#0D9488' }}
        >
          <Save className="h-3 w-3" />
          Save Swarm
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {orderedAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            className="p-3 rounded-xl cursor-grab active:cursor-grabbing group relative transition-all duration-300"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
            }}
            whileHover={{ y: -2 }}
            layout
          >
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-40 transition-opacity">
              <GripVertical className="h-3 w-3" style={{ color: '#6B7280' }} />
            </div>
            <div className="flex items-center gap-2.5">
              <motion.div className="w-9 h-9 rounded-xl flex items-center justify-center text-base border shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${agent.color}20, #FFFFFF)`,
                  borderColor: '#E5E7EB',
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}>
                {agent.emoji}
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono font-medium truncate" style={{ color: '#111827' }}>{agent.name}</p>
                <p className="text-[10px] font-mono" style={{ color: '#6B7280' }}>Lv{agent.level} · {agent.xp.toLocaleString()} XP</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
