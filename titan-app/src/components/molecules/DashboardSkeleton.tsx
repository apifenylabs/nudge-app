"use client";

import { motion } from "framer-motion";

// ─── Pulse animation ────────────────────────────────────────────────────
// Smooth shimmer skeleton that matches the dashboard design system

function SkeletonBlock({ height = 16, width = '100%', rounded = '8px' }: { height?: number; width?: string | number; rounded?: string }) {
  return (
    <motion.div
      style={{
        height,
        width: typeof width === 'number' ? `${width}px` : width,
        borderRadius: rounded,
        background: '#E5E0D8',
      }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Welcome header skeleton */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Avatar circle */}
        <SkeletonBlock height={64} width={64} rounded="50%" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock height={20} width={180} />
          <SkeletonBlock height={12} width={240} />
          {/* XP bar */}
          <div className="mt-2">
            <SkeletonBlock height={8} width="100%" rounded="4px" />
          </div>
        </div>
      </div>

      {/* Today's Impact — 3 stat cards */}
      <div>
        <SkeletonBlock height={12} width={120} />
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
              <SkeletonBlock height={10} width={60} />
              <SkeletonBlock height={28} width={50} />
              <SkeletonBlock height={8} width={80} />
            </div>
          ))}
        </div>
      </div>

      {/* Two-column area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Swarm preview skeleton */}
        <div className="p-4 sm:p-5 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
          <SkeletonBlock height={12} width={100} />
          <div className="flex items-center justify-center py-4 sm:py-6">
            {/* Orbiting dots — static placeholder */}
            <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px]">
              <div className="absolute inset-0 rounded-full border" style={{ borderColor: '#E5E0D8' }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <SkeletonBlock height={48} width={48} rounded="50%" />
              </div>
            </div>
          </div>
          <SkeletonBlock height={56} width="100%" rounded="16px" />
        </div>

        {/* Quick actions skeleton */}
        <div className="space-y-2">
          <SkeletonBlock height={12} width={100} />
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-3 rounded-xl border flex items-center gap-3" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
              <SkeletonBlock height={36} width={36} rounded="8px" />
              <div className="flex-1 space-y-1">
                <SkeletonBlock height={12} width={120} />
                <SkeletonBlock height={8} width={160} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity sparkline skeleton */}
      <div className="p-4 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
        <SkeletonBlock height={12} width={120} />
        <div className="flex gap-4 mt-3">
          <div className="flex-1 space-y-2">
            <SkeletonBlock height={10} width={60} />
            <SkeletonBlock height={32} width="100%" rounded="4px" />
            <div className="flex gap-1 h-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonBlock key={i} height={16 + (i * 3) % 20} width="12%" rounded="2px" />
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <SkeletonBlock height={10} width={60} />
            <SkeletonBlock height={32} width="100%" rounded="4px" />
            <div className="flex gap-1 h-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonBlock key={i} height={16 + (i * 3) % 20} width="12%" rounded="2px" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System health banner */}
      <SkeletonBlock height={56} width="100%" rounded="12px" />
    </div>
  );
}
