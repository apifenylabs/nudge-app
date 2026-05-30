"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { useProgressionGame, checkAchievements } from "@/lib/dashboard-store";
import type { ProgressionState } from "@/lib/dashboard-store";

export default function SecurityPage() {
  const [progression, setProgression] = useProgressionGame();

  const [certifiedTier, setCertifiedTier] = useState<'gold' | 'silver' | 'bronze' | 'uncertified' | null>(null);
  const [certifiedSkill, setCertifiedSkill] = useState<string | null>(null);
  const [certifiedScore, setCertifiedScore] = useState(0);

  const auditCategories = useMemo(() => [
    { name: 'OWASP Top 10', checks: ['Broken Access Control', 'Cryptographic Failures', 'Injection', 'Insecure Design'], score: 96 },
    { name: 'TDAD Compliance', checks: ['Data Privacy', 'Model Transparency', 'Audit Trail', 'Bias Check'], score: 94 },
    { name: 'Agent Behavior', checks: ['Scope Limits', 'Permission Boundary', 'Escalation Path', 'Logging'], score: 98 },
    { name: 'Supply Chain', checks: ['Dependency Scan', 'License Check', 'Version Audit', 'Signature Verify'], score: 91 },
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#10B981' }}>SECURITY CENTER</h2>
        <span className="text-[10px] font-mono" style={{ color: '#6B7280' }}>// certifications &amp; compliance</span>
      </div>

      {/* Green certification banner */}
      <motion.div className="p-6 rounded-2xl border"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: certifiedTier === 'gold'
            ? 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))'
            : certifiedTier
              ? 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))'
              : 'linear-gradient(135deg, rgba(16,185,129,0.1), transparent)',
          borderColor: certifiedTier === 'gold'
            ? 'rgba(245,158,11,0.25)'
            : certifiedTier
              ? 'rgba(16,185,129,0.25)'
              : 'rgba(16,185,129,0.15)',
        }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Shield className={`h-6 w-6 ${certifiedTier === 'gold' ? 'text-amber-600' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: '#111827' }}>
              {certifiedTier === 'gold'
                ? '⭐ God-Tier Certified!'
                : certifiedTier
                  ? `${certifiedSkill || 'Skill'} Certified`
                  : 'All Agents Certified'}
            </h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {certifiedTier === 'gold'
                ? 'Exceptional quality — this skill is production-ready and exceeds all standards.'
                : certifiedTier
                  ? `Audit completed: ${certifiedTier.toUpperCase()} tier (${certifiedScore}%).`
                  : 'Your swarm passed all security checks — no vulnerabilities found'}
            </p>
          </div>
          <Badge className="ml-auto border-0 text-xs font-mono"
            style={{
              background: certifiedTier === 'gold'
                ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                : certifiedTier
                  ? '#10B981'
                  : '#10B981',
              color: '#FFFFFF',
            }}>
            {certifiedTier === 'gold' ? '✦ GOLD' : certifiedTier ? `✓ ${certifiedTier.toUpperCase()}` : '✓ Certified'}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {auditCategories.map((a, i) => (
          <motion.div key={i} className="p-4 rounded-xl transition-all"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold" style={{ color: '#111827' }}>{a.name}</h4>
              <span className="text-lg font-mono font-bold" style={{ color: '#10B981' }}>{a.score}%</span>
            </div>
            <div className="space-y-1.5">
              {a.checks.map((c, j) => (
                <div key={j} className="flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-[8px] text-emerald-700">✓</span>
                  </span>
                  {c}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
