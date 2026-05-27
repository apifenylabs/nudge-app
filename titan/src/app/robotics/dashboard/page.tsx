"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  CircuitBoard,
  Radio,
  Settings,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  WifiOff,
  Plus,
  X,
  Loader2,
  ChevronRight,
} from 'lucide-react';

import type {
  RobotPlatform,
  DeploymentStatus,
  DeploymentHealth,
  RobotDeployment,
} from '../../../lib/robotics/types';

// ─── UI helpers ──────────────────────────────────────────────────────────

const PLATFORM_ICONS: Record<RobotPlatform, React.ReactNode> = {
  ros2: <Cpu className="w-5 h-5" />,
  arduino: <CircuitBoard className="w-5 h-5" />,
  'raspberry-pi': <Radio className="w-5 h-5" />,
  custom: <Settings className="w-5 h-5" />,
};

const PLATFORM_COLORS: Record<RobotPlatform, string> = {
  ros2: '#14B8A6',
  arduino: '#F59E0B',
  'raspberry-pi': '#8B5CF6',
  custom: '#6366F1',
};

const STATUS_CONFIG: Record<
  DeploymentStatus,
  { icon: React.ReactNode; label: string; bg: string; dot: string }
> = {
  active: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    label: 'Active',
    bg: 'bg-emerald-900/30 border-emerald-700/40',
    dot: 'bg-emerald-400',
  },
  pending: {
    icon: <Clock className="w-4 h-4" />,
    label: 'Pending',
    bg: 'bg-amber-900/30 border-amber-700/40',
    dot: 'bg-amber-400',
  },
  error: {
    icon: <AlertCircle className="w-4 h-4" />,
    label: 'Error',
    bg: 'bg-red-900/30 border-red-700/40',
    dot: 'bg-red-400',
  },
  disconnected: {
    icon: <WifiOff className="w-4 h-4" />,
    label: 'Disconnected',
    bg: 'bg-slate-700/30 border-slate-600/40',
    dot: 'bg-slate-400',
  },
};

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function platformName(p: RobotPlatform): string {
  const names: Record<RobotPlatform, string> = {
    ros2: 'ROS2',
    arduino: 'Arduino / ESP32',
    'raspberry-pi': 'Raspberry Pi',
    custom: 'Custom Hardware',
  };
  return names[p];
}

// ─── Deploy Modal ───────────────────────────────────────────────────────

function DeployModal({
  open,
  onClose,
  onDeploy,
}: {
  open: boolean;
  onClose: () => void;
  onDeploy: (platform: RobotPlatform, endpoint?: string) => void;
}) {
  const [platform, setPlatform] = useState<RobotPlatform>('ros2');
  const [endpoint, setEndpoint] = useState('');
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    if (!open) {
      setPlatform('ros2');
      setEndpoint('');
      setDeploying(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    setDeploying(true);
    await onDeploy(platform, endpoint || undefined);
    setDeploying(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Deploy Agent</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform selector */}
        <label className="mb-1 block text-xs font-medium text-slate-400 uppercase tracking-wider">
          Platform
        </label>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {(Object.keys(PLATFORM_ICONS) as RobotPlatform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                platform === p
                  ? 'border-slate-400 bg-slate-800 text-white'
                  : 'border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              <span style={{ color: PLATFORM_COLORS[p] }}>
                {PLATFORM_ICONS[p]}
              </span>
              {platformName(p)}
            </button>
          ))}
        </div>

        {/* Endpoint (optional) */}
        <label className="mb-1 block text-xs font-medium text-slate-400 uppercase tracking-wider">
          Endpoint <span className="text-slate-600">(optional)</span>
        </label>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder={
            platform === 'ros2'
              ? 'ws://192.168.1.100:9090'
              : platform === 'arduino'
                ? '/dev/ttyUSB0'
                : 'https://rpi.local:8443'
          }
          className="mb-6 w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
        />

        <button
          onClick={handleSubmit}
          disabled={deploying}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:from-teal-400 hover:to-cyan-500 disabled:opacity-50"
        >
          {deploying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <ZapIcon className="w-4 h-4" />
              Deploy to {platformName(platform)}
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

// ─── Deployment Card ────────────────────────────────────────────────────

function DeploymentCard({
  dep,
  onRemove,
}: {
  dep: DeploymentHealth;
  onRemove: (id: string) => void;
}) {
  const cfg = STATUS_CONFIG[dep.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={`group relative rounded-xl border p-4 transition-all ${cfg.bg} hover:brightness-110`}
    >
      <div className="flex items-start justify-between">
        {/* Left: icon + info */}
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/60"
            style={{ color: PLATFORM_COLORS[dep.platform] }}
          >
            {PLATFORM_ICONS[dep.platform]}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{dep.agentName}</h3>
            <p className="text-xs text-slate-400">
              {platformName(dep.platform)}
              {dep.endpoint && (
                <span className="ml-2 font-mono text-slate-500">
                  {dep.endpoint}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right: status badge + remove */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              dep.status === 'active'
                ? 'bg-emerald-900/40 text-emerald-300'
                : dep.status === 'error'
                  ? 'bg-red-900/40 text-red-300'
                  : dep.status === 'pending'
                    ? 'bg-amber-900/40 text-amber-300'
                    : 'bg-slate-800/60 text-slate-400'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.icon}
            {cfg.label}
          </span>
          <button
            onClick={() => onRemove(dep.id)}
            className="rounded-lg p-1.5 text-slate-500 opacity-0 transition-all hover:bg-red-900/40 hover:text-red-400 group-hover:opacity-100"
            title="Remove deployment"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom row: timestamps + detail */}
      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <span>Deployed {timeAgo(dep.deployedAt)}</span>
        <span>·</span>
        <span
          className={
            dep.status === 'disconnected' ? 'text-slate-400' : 'text-slate-400'
          }
        >
          Last heartbeat {timeAgo(dep.lastHeartbeat)}
        </span>
        {dep.detail && dep.status === 'error' && (
          <>
            <span>·</span>
            <span className="text-red-400">{dep.detail}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────

function EmptyState({ onDeploy }: { onDeploy: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-500">
        <Cpu className="w-8 h-8" />
      </div>
      <h3 className="mb-1 text-lg font-bold text-white">No Deployments Yet</h3>
      <p className="mb-6 max-w-sm text-center text-sm text-slate-400">
        Deploy your Titan agent to a robot platform. Supports ROS2, Arduino,
        Raspberry Pi, and custom hardware.
      </p>
      <button
        onClick={onDeploy}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:from-teal-400 hover:to-cyan-500"
      >
        <Plus className="w-4 h-4" />
        Deploy Your First Agent
      </button>
    </motion.div>
  );
}

// ─── Summary Card ───────────────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-2xl font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────

export default function RoboticsDashboardPage() {
  const [deployments, setDeployments] = useState<DeploymentHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeploy, setShowDeploy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDeployments = async () => {
    try {
      const res = await fetch('/api/robotics/status');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: DeploymentHealth[] = await res.json();
      setDeployments(data);
    } catch (err) {
      console.error('Failed to fetch deployments:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDeployments();
    const interval = setInterval(fetchDeployments, 30_000);
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = async (platform: RobotPlatform, endpoint?: string) => {
    try {
      const res = await fetch('/api/robotics/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: `agent_${Date.now()}`,
          agentName: `Agent-${platform.toUpperCase()}`,
          platform,
          endpoint,
        }),
      });
      if (!res.ok) throw new Error('Deploy failed');
      await fetchDeployments();
    } catch (err) {
      console.error('Deploy failed:', err);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const res = await fetch('/api/robotics/deploy', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Remove failed');
      await fetchDeployments();
    } catch (err) {
      console.error('Remove failed:', err);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDeployments();
  };

  const stats = {
    active: deployments.filter((d) => d.status === 'active').length,
    error: deployments.filter((d) => d.status === 'error').length,
    total: deployments.length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Robotics Dashboard</h1>
              <p className="text-xs text-slate-400">
                Manage your agent deployments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 text-slate-400 transition-all hover:border-slate-600 hover:text-white disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
              />
            </button>
            <button
              onClick={() => setShowDeploy(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:from-teal-400 hover:to-cyan-500"
            >
              <Plus className="w-4 h-4" />
              Deploy
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-auto max-w-5xl px-6 pt-6 pb-3">
        <div className="grid grid-cols-3 gap-3">
          <SummaryCard
            label="Active"
            value={stats.active}
            color="#34D399"
            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
          />
          <SummaryCard
            label="Errors"
            value={stats.error}
            color="#F87171"
            icon={<AlertCircle className="w-3.5 h-3.5" />}
          />
          <SummaryCard
            label="Total"
            value={stats.total}
            color="#94A3B8"
            icon={<Cpu className="w-3.5 h-3.5" />}
          />
        </div>
      </div>

      {/* Deployments list */}
      <div className="mx-auto max-w-5xl px-6 pb-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
          </div>
        ) : deployments.length === 0 ? (
          <EmptyState onDeploy={() => setShowDeploy(true)} />
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {deployments.map((dep) => (
                <DeploymentCard
                  key={dep.id}
                  dep={dep}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Deploy modal */}
      <AnimatePresence>
        {showDeploy && (
          <DeployModal
            open={showDeploy}
            onClose={() => setShowDeploy(false)}
            onDeploy={handleDeploy}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
