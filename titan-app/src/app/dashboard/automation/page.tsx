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
        <span className="text-[10px] font-mono" style={{ color: '#6B7280' }}>// scheduled routines &amp; cron</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map((task, i) => (
          <motion.div key={i} className="p-4 rounded-xl relative overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold" style={{ color: '#111827' }}>{task.name}</h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                task.status === 'active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {task.status}
              </span>
            </div>
            <p className="text-xs" style={{ color: '#6B7280' }}>{task.desc}</p>
            <div className="flex items-center gap-3 text-[10px] font-mono mt-2" style={{ color: '#6B7280' }}>
              <span>🕐 {task.schedule}</span>
              <span>⚡ {task.last}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
