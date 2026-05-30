"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Crown, Check, Zap, ChevronRight, Sparkles,
  Star, Shield, Infinity, Bot, Layers, Save
} from "lucide-react";
import { usePlan } from "@/hooks/usePlan";
import { PLAN_FEATURES, PLAN_PRICES } from "@/lib/plans";

export default function BillingPage() {
  const router = useRouter();
  const { plan, isPro, upgrade, downgrade, label } = usePlan();

  const featureRows = [
    { label: "Swarms", free: "1 swarm", pro: "Unlimited", icon: Layers },
    { label: "Agents", free: "3 agents", pro: "Unlimited", icon: Bot },
    { label: "Mascots", free: "Basic (5)", pro: "All mascots", icon: Star },
    { label: "Save/Load Swarms", free: "✗", pro: "✓", icon: Save },
    { label: "Skill Forge", free: "✓", pro: "✓", icon: Zap },
    { label: "Audit Center", free: "✗", pro: "✓", icon: Shield },
    { label: "Priority Support", free: "✗", pro: "✓", icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/dashboard')}
          className="p-2 rounded-xl border transition-colors"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB',
            color: '#6B7280',
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold" style={{ color: '#111827' }}>Billing & Plan</h1>
          <p className="text-xs font-mono" style={{ color: '#6B7280' }}>Manage your subscription</p>
        </div>
      </div>

      {/* Current plan badge */}
      <div className="flex items-center gap-2">
        <div
          className="px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
          style={{
            background: isPro
              ? 'rgba(13,148,136,0.1)'
              : 'rgba(148, 163, 184, 0.1)',
            color: isPro ? '#0D9488' : '#94A3B8',
            border: `1px solid ${isPro ? 'rgba(13,148,136,0.2)' : 'rgba(148, 163, 184, 0.2)'}`,
          }}
        >
          <Crown className="h-3.5 w-3.5" />
          {label}
        </div>
        {!isPro && (
          <span className="text-[10px] font-mono" style={{ color: '#94A3B8' }}>
            · $19/mo for Pro
          </span>
        )}
      </div>

      {/* Plan comparison */}
      <div className="rounded-2xl border overflow-hidden"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
        }}>
        {/* Header row */}
        <div className="grid grid-cols-3 gap-0 border-b"
          style={{ borderColor: '#E5E7EB' }}>
          <div className="p-3 sm:p-4"></div>
          <div className="p-3 sm:p-4 text-center font-semibold text-xs font-mono"
            style={{ color: '#6B7280' }}>
            Free
          </div>
          <div className="p-3 sm:p-4 text-center font-semibold text-xs font-mono"
            style={{
              color: '#0D9488',
              background: 'rgba(13,148,136,0.04)',
            }}>
            <span className="titan-text-gradient">Pro</span>
          </div>
        </div>

        {/* Feature rows */}
        {featureRows.map((row, i) => (
          <div
            key={row.label}
            className="grid grid-cols-3 gap-0 border-b"
            style={{
              borderColor: '#E5E7EB',
              background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)',
            }}
          >
            <div className="p-3 sm:p-4 flex items-center gap-2 text-xs font-medium"
              style={{ color: '#111827' }}>
              <row.icon className="h-3.5 w-3.5 shrink-0" style={{ color: '#6B7280' }} />
              {row.label}
            </div>
            <div className="p-3 sm:p-4 text-center text-xs" style={{ color: '#94A3B8' }}>
              {row.free}
            </div>
            <div className="p-3 sm:p-4 text-center text-xs font-medium" style={{ color: '#0D9488' }}>
              {row.pro}
            </div>
          </div>
        ))}

        {/* Price row */}
        <div className="grid grid-cols-3 gap-0">
          <div className="p-3 sm:p-4"></div>
          <div className="p-3 sm:p-4 text-center">
            <span className="text-2xl font-bold" style={{ color: '#111827' }}>$0</span>
            <span className="text-xs" style={{ color: '#94A3B8' }}>/mo</span>
          </div>
          <div className="p-3 sm:p-4 text-center"
            style={{ background: 'rgba(13,148,136,0.04)' }}>
            <span className="text-2xl font-bold" style={{ color: '#0D9488' }}>$19</span>
            <span className="text-xs" style={{ color: '#94A3B8' }}>/mo</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      {isPro ? (
        <motion.div
          className="rounded-2xl border p-5 text-center"
          style={{
            background: 'rgba(13,148,136,0.04)',
            borderColor: 'rgba(13,148,136,0.15)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Crown className="h-8 w-8 mx-auto mb-2" style={{ color: '#F59E0B' }} />
          <h3 className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>You're on Pro</h3>
          <p className="text-xs" style={{ color: '#6B7280' }}>
            You have unlimited access to all features.
          </p>
          <button
            onClick={downgrade}
            className="mt-4 px-4 py-1.5 rounded-lg text-[11px] font-mono border transition-colors"
            style={{
              borderColor: '#E5E7EB',
              color: '#6B7280',
            }}
          >
            Downgrade to Free (dev only)
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="rounded-2xl border p-5 text-center"
          style={{
            background: 'rgba(13,148,136,0.04)',
            borderColor: 'rgba(245,158,11,0.15)',
            boxShadow: '0 0 30px rgba(245,158,11,0.05)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="h-8 w-8 mx-auto mb-2" style={{ color: '#F59E0B' }} />
          <h3 className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>
            Unlock the full ecosystem
          </h3>
          <p className="text-xs mb-4" style={{ color: '#6B7280' }}>
            Get unlimited swarms, all mascots, and save/load support for $19/mo.
          </p>
          <motion.button
            onClick={upgrade}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 shadow-lg mx-auto"
            style={{
              background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
              color: '#FFFFFF',
            }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <Zap className="h-4 w-4" />
            Upgrade to Pro
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
