'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Sparkles, TrendingUp, Clock, Layers, Shield, Orbit, Terminal, Zap, ChevronRight, Cpu, Brain, Rocket, Trophy } from 'lucide-react';
import type { Agent, ROISummary } from '@/types';

const MOCK_AGENTS: Agent[] = [
  { id: '1', userId: 'user1', name: 'Travel Guide', baseModel: 'realistic-human', skinData: null, level: 12, xp: 3400, createdAt: new Date().toISOString() },
  { id: '2', userId: 'user1', name: 'Budget Keeper', baseModel: 'abstract-orb', skinData: null, level: 8, xp: 2100, createdAt: new Date().toISOString() },
  { id: '3', userId: 'user1', name: 'Research Bot', baseModel: 'cute-robot', skinData: null, level: 15, xp: 5200, createdAt: new Date().toISOString() },
  { id: '4', userId: 'user1', name: 'Crypto Trader', baseModel: 'future-robot-brain', skinData: null, level: 6, xp: 900, createdAt: new Date().toISOString() },
  { id: '5', userId: 'user1', name: 'Data Analyst', baseModel: 'abstract-orb', skinData: null, level: 10, xp: 2800, createdAt: new Date().toISOString() },
];

const MOCK_ROI: ROISummary = {
  hoursSaved: 18.5, moneySaved: 540, tasksCompleted: 73, periodStart: '', periodEnd: '',
};

export default function DashboardPage() {
  const [agents] = useState<Agent[]>(MOCK_AGENTS);
  const [roi] = useState<ROISummary>(MOCK_ROI);
  const [godTier, setGodTier] = useState(false);

  return (
    <div className="min-h-screen titan-gradient titan-grid-bg">
      {/* Top bar */}
      <header className="border-b border-titan-border/50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-titan-cyan/10 border border-titan-cyan/30 flex items-center justify-center">
              <Terminal className="h-4 w-4 text-titan-cyan" />
            </div>
            <h1 className="text-lg font-bold titan-text-gradient tracking-tight">TITAN</h1>
            <Badge className="bg-titan-cyan/10 text-titan-cyan border-titan-cyan/30 text-[10px] tracking-widest uppercase font-mono">
              v0.2 · {godTier ? 'God' : 'Phasr'} Forge
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            {/* God-Tier Toggle */}
            <button
              onClick={() => setGodTier(!godTier)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${godTier ? 'bg-gradient-to-r from-titan-cyan to-titan-violet' : 'bg-titan-border/50'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${godTier ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className="text-[10px] font-mono text-titan-muted">{godTier ? 'GOD MODE' : 'STANDARD'}</span>
            <div className="flex items-center gap-1.5 text-xs">
              <Cpu className="h-3 w-3 text-titan-cyan/60" />
              <span className="font-mono text-titan-muted">{agents.length} agents</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Zap className={`h-3 w-3 ${godTier ? 'text-titan-violet' : 'text-titan-emerald'}`} />
              <span className={`font-mono ${godTier ? 'text-titan-violet' : 'text-titan-emerald'}`}>+${roi.moneySaved}</span>
            </div>
          </div>
        </div>
      </header>

      {/* God-Tier Banner */}
      {godTier && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-titan-violet/20 bg-gradient-to-r from-titan-violet/5 via-titan-cyan/5 to-titan-violet/5"
        >
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono">
              <Trophy className="h-3.5 w-3.5 text-titan-amber" />
              <span className="text-titan-amber">God-Tier Mode Active</span>
              <span className="text-titan-muted/60 mx-1">·</span>
              <span className="text-titan-muted/80">Self-evolving skills · Robotics hooks · Economic agency</span>
            </div>
            <Badge className="bg-gradient-to-r from-titan-violet/20 to-titan-cyan/20 text-titan-violet border-titan-violet/30 text-[9px] font-mono">
              Level 100 Cap Unlocked
            </Badge>
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="swarm" className="space-y-6">
          <TabsList className="bg-titan-surface border border-titan-border/50 p-1 rounded-xl">
            <TabsTrigger value="swarm" className="data-[state=active]:bg-titan-cyan/15 data-[state=active]:text-titan-cyan rounded-lg text-xs gap-1.5">
              <Layers className="h-3.5 w-3.5" />Swarm
            </TabsTrigger>
            <TabsTrigger value="forge" className="data-[state=active]:bg-titan-cyan/15 data-[state=active]:text-titan-cyan rounded-lg text-xs gap-1.5">
              <Bot className="h-3.5 w-3.5" />Forge
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-titan-cyan/15 data-[state=active]:text-titan-cyan rounded-lg text-xs gap-1.5">
              <Shield className="h-3.5 w-3.5" />Audit
            </TabsTrigger>
            <TabsTrigger value="roi" className="data-[state=active]:bg-titan-cyan/15 data-[state=active]:text-titan-cyan rounded-lg text-xs gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />ROI
            </TabsTrigger>
            <TabsTrigger value="bau" className="data-[state=active]:bg-titan-cyan/15 data-[state=active]:text-titan-cyan rounded-lg text-xs gap-1.5">
              <Orbit className="h-3.5 w-3.5" />BAU
            </TabsTrigger>
            <TabsTrigger value="godtier" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-titan-violet/20 data-[state=active]:to-titan-cyan/20 data-[state=active]:text-titan-violet rounded-lg text-xs gap-1.5">
              <Rocket className="h-3.5 w-3.5" />{godTier ? '✦ God' : 'Progression'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="swarm"><SwarmOrchestrator agents={agents} godTier={godTier} /></TabsContent>
          <TabsContent value="forge"><SkillForgeTab godTier={godTier} /></TabsContent>
          <TabsContent value="audit"><AuditTab /></TabsContent>
          <TabsContent value="roi"><ROITab roi={roi} godTier={godTier} /></TabsContent>
          <TabsContent value="bau"><BAUTab /></TabsContent>
          <TabsContent value="godtier"><GodTierTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ─── SWARM ORCHESTRATOR ─── */
function SwarmOrchestrator({ agents, godTier }: { agents: Agent[]; godTier: boolean }) {
  const [task, setTask] = useState('');

  return (
    <div className="grid gap-6">
      <Card className={`relative h-[500px] overflow-hidden ${godTier ? 'bg-gradient-to-br from-titan-card/60 via-titan-violet/5 to-titan-card/60' : 'bg-titan-card/60'} border-titan-border/50 titan-glow`}>
        <div className="absolute inset-0 titan-grid-bg opacity-30" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" opacity={godTier ? 0.35 : 0.2}>
          {agents.slice(1).map((_, i) => {
            const angle = (2 * Math.PI * i) / (agents.length - 1);
            const x = 50 + Math.cos(angle) * 30;
            const y = 50 + Math.sin(angle) * 30;
            return (
              <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`}
                stroke={godTier ? '#A78BFA' : '#22D3EE'} strokeWidth={godTier ? 1.5 : 1} strokeDasharray="4 4" />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="relative w-[400px] h-[400px]">
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={godTier
                ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }
                : { scale: [1, 1.05, 1] }
              }
              transition={{ duration: godTier ? 2 : 3, repeat: Infinity }}
            >
              <AgentNode agent={agents[0]} isCenter godTier={godTier} />
            </motion.div>

            {agents.slice(1).map((agent, i) => {
              const angle = (2 * Math.PI * i) / (agents.length - 1);
              return (
                <motion.div
                  key={agent.id}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * 140}px)`,
                    top: `calc(50% + ${Math.sin(angle) * 140}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  drag
                  dragMomentum={false}
                  whileHover={{ scale: 1.15 }}
                >
                  <AgentNode agent={agent} godTier={godTier} />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-30">
          <div className={`flex gap-2 bg-titan-surface/90 backdrop-blur-sm border rounded-xl p-1.5 shadow-2xl ${godTier ? 'border-titan-violet/40' : 'border-titan-border/50'}`}>
            <input
              placeholder={godTier ? "tell your god-tier swarm what to do..." : "tell your swarm what to do..."}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-titan-muted/60 font-mono"
            />
            <Button size="sm" disabled={!task}
              className={godTier
                ? 'bg-gradient-to-r from-titan-violet to-titan-cyan text-white font-semibold gap-1 text-xs'
                : 'bg-titan-cyan text-titan-bg hover:bg-titan-cyan/90 font-semibold gap-1 text-xs'
              }
            >
              <Zap className="h-3.5 w-3.5" />Execute
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} godTier={godTier} />
        ))}
      </div>
    </div>
  );
}

function AgentNode({ agent, isCenter, godTier }: { agent: Agent; isCenter?: boolean; godTier?: boolean }) {
  const size = isCenter ? 'w-20 h-20 text-3xl' : 'w-14 h-14 text-xl';
  const emoji = agent.baseModel === 'future-robot-brain' ? '🧠' : agent.baseModel === 'cute-robot' ? '🤖' : '🌀';
  const border = godTier ? 'border-titan-violet/40 shadow-titan-violet/20' : 'border-titan-border/60';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`${size} rounded-2xl bg-gradient-to-br from-${godTier ? 'titan-violet' : 'titan-cyan'}/20 via-titan-card to-${godTier ? 'titan-cyan' : 'titan-violet'}/10 flex items-center justify-center border ${border} shadow-lg backdrop-blur-sm`}>
        <span>{emoji}</span>
      </div>
      <span className="text-[11px] font-mono text-titan-text/80">{agent.name}</span>
      <Badge className={`${godTier ? 'bg-titan-violet/10 text-titan-violet/80 border-titan-violet/20' : 'bg-titan-cyan/10 text-titan-cyan/80 border-titan-cyan/20'} text-[9px] h-4 px-1.5 font-mono`}>
        Lv{agent.level}
      </Badge>
    </div>
  );
}

function AgentCard({ agent, godTier }: { agent: Agent; godTier?: boolean }) {
  const borderHover = godTier ? 'hover:border-titan-violet/30' : 'hover:border-titan-cyan/30';
  return (
    <Card className={`p-3 bg-titan-card/60 border-titan-border/40 ${borderHover} hover:titan-glow transition-all duration-300 cursor-pointer group`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-${godTier ? 'titan-violet' : 'titan-cyan'}/15 to-titan-violet/10 flex items-center justify-center text-base border border-titan-border/40`}>
          {agent.baseModel === 'future-robot-brain' ? '🧠' : '🤖'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-mono font-medium truncate">{agent.name}</p>
          <p className="text-[10px] font-mono text-titan-muted/70">Lvl {agent.level} · XP {agent.xp}</p>
        </div>
        <ChevronRight className={`h-3 w-3 ${godTier ? 'text-titan-violet/50' : 'text-titan-muted'} opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>
    </Card>
  );
}

/* ─── SKILL FORGE ─── */
function SkillForgeTab({ godTier }: { godTier?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 p-4 bg-titan-card/60 border-titan-border/50">
        <h3 className="font-mono text-xs text-titan-cyan tracking-widest uppercase mb-4">Templates</h3>
        {(godTier
          ? ['Travel Agent', 'Crypto Trader', 'Budget Keeper', 'Research Bot', 'Robotics Arm 🦾', 'Drone Pilot 🚁']
          : ['Travel Agent', 'Crypto Trader', 'Budget Keeper', 'Research Bot']
        ).map((t, i) => (
          <Button key={t} variant="ghost"
            className="w-full justify-start text-xs font-mono text-titan-text/70 hover:text-titan-cyan hover:bg-titan-cyan/5 h-8 mb-1">
            <ChevronRight className="h-2.5 w-2.5 mr-2 text-titan-cyan/50" />
            {t}
          </Button>
        ))}

        {godTier && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-titan-violet/10 to-titan-cyan/10 border border-titan-violet/20">
            <p className="text-[10px] font-mono text-titan-violet/80">✦ God-Tier unlocked</p>
            <p className="text-[9px] font-mono text-titan-muted mt-0.5">Robotics + self-evolving templates available</p>
          </div>
        )}
      </Card>
      <Card className="lg:col-span-2 p-4 bg-titan-card/60 border-titan-border/50 min-h-[400px] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-xs text-titan-cyan tracking-widest uppercase">Editor</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"
              className="border-titan-border/50 text-xs font-mono h-7 text-titan-muted hover:text-titan-cyan">
              Test
            </Button>
            <Button size="sm"
              className="bg-titan-cyan/15 text-titan-cyan border border-titan-cyan/30 text-xs font-mono h-7 hover:bg-titan-cyan/25">
              Audit
            </Button>
            {godTier && (
              <Button size="sm"
                className="bg-gradient-to-r from-titan-violet/20 to-titan-cyan/20 text-titan-violet border border-titan-violet/30 text-xs font-mono h-7">
                <Brain className="h-3 w-3 mr-1" />Evolve
              </Button>
            )}
          </div>
        </div>
        <div className="bg-titan-bg/80 rounded-lg p-4 font-mono text-[11px] leading-relaxed border border-titan-border/30">
          <pre className="text-titan-muted/80">
{`---
name: "My Skill"
version: "0.1.0"
dependencies: []
---

## Instructions

Write what this skill does...

## Input

Describe expected inputs.

## Output

Describe expected outputs.`}
          </pre>
        </div>
        <div className="absolute -bottom-px -right-px w-32 h-32 bg-titan-cyan/5 rounded-full blur-3xl pointer-events-none" />
      </Card>
    </div>
  );
}

/* ─── AUDIT ─── */
function AuditTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 text-center space-y-4 bg-titan-card/60 border-titan-border/50">
        <div className="w-14 h-14 rounded-2xl bg-titan-cyan/10 border border-titan-cyan/30 flex items-center justify-center mx-auto">
          <Shield className="h-6 w-6 text-titan-cyan" />
        </div>
        <h3 className="font-mono text-sm text-titan-text">Certification Scan</h3>
        <p className="text-xs font-mono text-titan-muted/80 max-w-xs mx-auto leading-relaxed">
          Run OWASP Agentic Top 10 + TDAD impact analysis
        </p>
        <Button className="bg-titan-cyan/15 text-titan-cyan border border-titan-cyan/30 hover:bg-titan-cyan/25 font-mono text-xs">
          <Zap className="h-3.5 w-3.5 mr-1.5" />Run Full Scan
        </Button>
      </Card>
      <Card className="p-6 bg-titan-card/60 border-titan-border/50">
        <h3 className="font-mono text-xs text-titan-cyan tracking-widest uppercase mb-4">Recent Audits</h3>
        <div className="space-y-3">
          {[
            { name: 'travel-booker', score: 94, tier: 'silver' as const },
            { name: 'crypto-monitor', score: 82, tier: 'bronze' as const },
            { name: 'expense-tracker', score: 97, tier: 'gold' as const },
          ].map((audit) => (
            <div key={audit.name} className="flex items-center justify-between py-2 border-b border-titan-border/30 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-titan-text/80">{audit.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-titan-muted">{audit.score}/100</span>
                <Badge className={
                  audit.tier === 'gold'
                    ? 'bg-titan-amber/15 text-titan-amber border-titan-amber/30 text-[9px] font-mono'
                    : audit.tier === 'silver'
                    ? 'bg-titan-cyan/10 text-titan-cyan border-titan-cyan/20 text-[9px] font-mono'
                    : 'bg-titan-violet/10 text-titan-violet border-titan-violet/20 text-[9px] font-mono'
                }>
                  {audit.tier}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── ROI ─── */
function ROITab({ roi, godTier }: { roi: ROISummary; godTier?: boolean }) {
  const metrics = [
    { icon: Clock, label: 'Hours Saved', value: `${roi.hoursSaved}h`, color: 'text-titan-cyan' },
    { icon: TrendingUp, label: 'Money Saved', value: `$${roi.moneySaved}`, color: godTier ? 'text-titan-violet' : 'text-titan-emerald' },
    { icon: Sparkles, label: 'Tasks Done', value: String(roi.tasksCompleted), color: 'text-titan-violet' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <Card key={m.label} className="p-6 bg-titan-card/60 border-titan-border/50 hover:titan-glow transition-all">
          <div className="flex items-center gap-2 text-[10px] font-mono text-titan-muted uppercase tracking-wider mb-3">
            <m.icon className={`h-3 w-3 ${m.color}`} />
            {m.label}
          </div>
          <p className={`text-3xl font-bold font-mono ${m.color}`}>{m.value}</p>
          <p className="text-[10px] font-mono text-titan-muted/50 mt-1">this month</p>
        </Card>
      ))}
    </div>
  );
}

/* ─── BAU ─── */
function BAUTab() {
  const statuses = [
    { label: 'Healthy', count: 5, color: 'text-titan-emerald', bg: 'bg-titan-emerald/10', border: 'border-titan-emerald/20' },
    { label: 'Degraded', count: 0, color: 'text-titan-amber', bg: 'bg-titan-amber/10', border: 'border-titan-amber/20' },
    { label: 'Dead', count: 0, color: 'text-titan-red', bg: 'bg-titan-red/10', border: 'border-titan-red/20' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statuses.map((s) => (
        <Card key={s.label} className={`p-6 bg-titan-card/60 ${s.bg} ${s.border} border`}>
          <p className={`text-3xl font-bold font-mono ${s.color}`}>{s.count}</p>
          <p className={`text-xs font-mono mt-1 ${s.color}/70`}>{s.label}</p>
        </Card>
      ))}
      <Card className="sm:col-span-3 p-4 bg-titan-card/60 border-titan-border/50">
        <div className="flex items-center justify-between text-[10px] font-mono text-titan-muted">
          <div className="flex items-center gap-2">
            <Orbit className="h-3 w-3 text-titan-cyan/60" />
            Last heartbeat: <span className="text-titan-cyan/80">{new Date().toLocaleTimeString()}</span>
          </div>
          <Badge className="bg-titan-emerald/10 text-titan-emerald border-titan-emerald/20 text-[9px] font-mono">
            System Nominal
          </Badge>
        </div>
      </Card>
    </div>
  );
}

/* ─── GOD TIER ─── */
function GodTierTab() {
  return (
    <div className="space-y-6">
      {/* Level cap card */}
      <Card className="p-8 bg-gradient-to-br from-titan-violet/10 via-titan-card/60 to-titan-cyan/10 border-titan-violet/30 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-titan-violet/5 to-titan-cyan/5" />
        <motion.div
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Trophy className="h-12 w-12 mx-auto mb-4 text-titan-amber" />
          <h2 className="text-xl font-bold titan-text-gradient mb-2">God-Tier Progression</h2>
          <p className="text-xs font-mono text-titan-muted/80 mb-6 max-w-md mx-auto">
            Self-evolving skills, robotics embodiment, economic agency — unlocked
          </p>
          <div className="flex justify-center gap-3">
            <Badge className="bg-titan-violet/20 text-titan-violet border-titan-violet/30 text-xs font-mono px-4 py-1.5">
              Level Cap: 100
            </Badge>
            <Badge className="bg-titan-cyan/20 text-titan-cyan border-titan-cyan/30 text-xs font-mono px-4 py-1.5">
              Self-Evolving ✓
            </Badge>
            <Badge className="bg-titan-emerald/20 text-titan-emerald border-titan-emerald/30 text-xs font-mono px-4 py-1.5">
              Robotics Ready
            </Badge>
          </div>
        </motion.div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Brain, label: 'Self-Evolving Skills', desc: 'Skills auto-improve from memory graph analysis. Each execution makes them smarter.', status: 'Active' },
          { icon: Rocket, label: 'Robotics Embodiment', desc: 'Export your agent as a ROS2-compatible robotics manifest. Motor skills, sensors, safety constraints.', status: 'Ready' },
          { icon: Zap, label: 'Economic Agency', desc: 'Your swarm can earn, trade, and reinvest. On-chain royalties stubbed for production.', status: 'Preview' },
        ].map((f) => (
          <Card key={f.label} className="p-6 bg-titan-card/60 border-titan-border/50 hover:border-titan-violet/30 transition-all">
            <f.icon className="h-5 w-5 text-titan-violet mb-3" />
            <h3 className="font-mono text-sm text-titan-text mb-2">{f.label}</h3>
            <p className="text-[11px] font-mono text-titan-muted/80 leading-relaxed mb-4">{f.desc}</p>
            <Badge className="bg-titan-emerald/10 text-titan-emerald border-titan-emerald/20 text-[9px] font-mono">
              {f.status}
            </Badge>
          </Card>
        ))}
      </div>

      {/* Robotics manifest preview */}
      <Card className="p-6 bg-titan-card/60 border-titan-violet/20">
        <h3 className="font-mono text-xs text-titan-violet tracking-widest uppercase mb-4">Robotics Manifest Preview</h3>
        <div className="bg-titan-bg/80 rounded-lg p-4 font-mono text-[10px] leading-relaxed border border-titan-violet/20">
          <pre className="text-titan-muted/80">
{`{
  "agentId": "agent-1",
  "hardware": ["ros2", "arduino", "esp32"],
  "motorSkills": ["navigate", "grasp", "orient"],
  "sensors": ["camera", "lidar", "microphone"],
  "safety": ["emergency_stop", "max_speed_0.5mps"],
  "embodiment": "abstract"
}`}
          </pre>
        </div>
      </Card>
    </div>
  );
}
