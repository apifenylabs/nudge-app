"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProgressionGame, BASE_ORBITING_AGENTS } from "@/lib/dashboard-store";

export default function AutomationPage() {
  const [progression] = useProgressionGame();

  const automations = useMemo(() => [
    { name: 'Daily Report', status: 'active' as const, schedule: 'Every 8h', last: '2h ago', desc: 'Swarm activity summary + key metrics' },
    { name: 'Market Scan', status: 'active' as const, schedule: 'Every 4h', last: '1h ago', desc: 'Crypto + travel price monitoring' },
    { name: 'Budget Check', status: 'active' as const, schedule: 'Daily 9AM', last: 'Today', desc: 'Expense tracking + savings report' },
    { name: 'Content Digest', status: 'paused' as const, schedule: 'Weekly Mon', last: '3d ago', desc: 'Curated reading list from research agents' },
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#7C3AED' }}>AUTOMATION HUB</h2>
        <span className="text-[10px] font-mono" style={{ color: '#666666' }}>// scheduled routines &amp; cron</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map((task, i) => (
          <motion.div key={i} className="p-4 rounded-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(124,58,237,0.02))',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold" style={{ color: '#1F1F1F' }}>{task.name}</h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                task.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {task.status}
              </span>
            </div>
            <p className="text-xs" style={{ color: '#666666' }}>{task.desc}</p>
            <div className="flex items-center gap-3 text-[10px] font-mono mt-2" style={{ color: '#666666' }}>
              <span>🕐 {task.schedule}</span>
              <span>⚡ {task.last}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
