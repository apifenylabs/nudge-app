'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bot, Cpu, CircuitBoard, Monitor, Cog, HardDrive,
  ChevronRight, Radio, Wifi, Terminal, Power, PowerOff,
  Activity, AlertTriangle, Clock, RefreshCw, Trash2, Eye,
  CirclePlay, CircleStop, Share2, Plus, Globe, WifiOff
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { JSX } from 'react';
import type { RobotDeployment, PlatformType, DeploymentStatus } from '@/types';

// ─── Display types (mapped from API types) ──────────────────────────────

type DisplayStatus = 'online' | 'offline' | 'deploying' | 'error' | 'paused';

const API_TO_DISPLAY_STATUS: Record<DeploymentStatus, DisplayStatus> = {
  active: 'online',
  pending: 'deploying',
  error: 'error',
  disconnected: 'offline',
};

interface DisplayDeployment extends RobotDeployment {
  name: string;
  platformLabel: string;
  displayStatus: DisplayStatus;
  uptimeHours: number;
  commandsExecuted: number;
  ipAddress: string;
  firmwareVersion: string;
}

// ─── Platform config ────────────────────────────────────────────────────

const PLATFORM_CONFIG: Record<PlatformType, { icon: typeof Cpu; color: string; label: string }> = {
  'ros2':           { icon: CircuitBoard, color: '#14B8A6', label: 'ROS2' },
  'arduino':        { icon: Cpu,          color: '#10B981', label: 'Arduino / ESP32' },
  'raspberry-pi':   { icon: Monitor,      color: '#F59E0B', label: 'Raspberry Pi' },
  'custom':         { icon: Cog,          color: '#7C3AED', label: 'Custom Hardware' },
};

const STATUS_CONFIG: Record<DisplayStatus, { label: string; color: string; dot: string }> = {
  online:    { label: 'Online',    color: '#10B981', dot: '#10B981' },
  offline:   { label: 'Offline',   color: '#6B7280', dot: '#6B7280' },
  deploying: { label: 'Deploying', color: '#F59E0B', dot: '#F59E0B' },
  error:     { label: 'Error',     color: '#EF4444', dot: '#EF4444' },
  paused:    { label: 'Paused',    color: '#8B5CF6', dot: '#8B5CF6' },
};

// ─── Sample data fallback ───────────────────────────────────────────────

const SAMPLE_DEPLOYMENTS: DisplayDeployment[] = [
  {
    id: 'mock-dep-001',
    name: 'Warehouse Rover',
    platform: 'ros2',
    platformLabel: 'ROS2',
    agentId: 'agent-a1',
    agentName: 'Scout Alpha',
    status: 'active',
    displayStatus: 'online',
    endpoint: 'http://192.168.1.42:9090',
    lastHeartbeat: '2 min ago',
    deployedAt: new Date(Date.now() - 127 * 3600_000).toISOString(),
    uptimeHours: 127,
    commandsExecuted: 3451,
    ipAddress: '192.168.1.42',
    firmwareVersion: 'v2.3.1',
    config: {},
  },
  {
    id: 'mock-dep-002',
    name: 'Weather Station',
    platform: 'raspberry-pi',
    platformLabel: 'Raspberry Pi',
    agentId: 'agent-b2',
    agentName: 'Sensor Sentinel',
    status: 'active',
    displayStatus: 'online',
    endpoint: 'http://192.168.1.105:8080',
    lastHeartbeat: '30 sec ago',
    deployedAt: new Date(Date.now() - 812 * 3600_000).toISOString(),
    uptimeHours: 812,
    commandsExecuted: 12890,
    ipAddress: '192.168.1.105',
    firmwareVersion: 'v1.9.4',
    config: {},
  },
  {
    id: 'mock-dep-003',
    name: 'Servo Arm Controller',
    platform: 'arduino',
    platformLabel: 'Arduino',
    agentId: 'agent-c3',
    agentName: 'Gripper Ghost',
    status: 'disconnected',
    displayStatus: 'offline',
    endpoint: 'http://192.168.1.77:3030',
    lastHeartbeat: '3 hours ago',
    deployedAt: new Date(Date.now() - 45 * 3600_000).toISOString(),
    uptimeHours: 45,
    commandsExecuted: 678,
    ipAddress: '192.168.1.77',
    firmwareVersion: 'v0.4.2',
    config: {},
  },
  {
    id: 'mock-dep-004',
    name: 'Factory Bridge',
    platform: 'custom',
    platformLabel: 'Custom',
    agentId: 'agent-d4',
    agentName: 'Pipe Phoenix',
    status: 'error',
    displayStatus: 'error',
    endpoint: 'http://10.0.0.88:5000',
    lastHeartbeat: '1 day ago',
    deployedAt: new Date(Date.now() - 200 * 3600_000).toISOString(),
    uptimeHours: 0,
    commandsExecuted: 234,
    ipAddress: '10.0.0.88',
    firmwareVersion: 'v3.0.0',
    config: {},
  },
  {
    id: 'mock-dep-005',
    name: 'Drone Swarm Lead',
    platform: 'ros2',
    platformLabel: 'ROS2',
    agentId: 'agent-e5',
    agentName: 'Sky Marshal',
    status: 'pending',
    displayStatus: 'deploying',
    lastHeartbeat: '—',
    deployedAt: new Date().toISOString(),
    uptimeHours: 0,
    commandsExecuted: 0,
    ipAddress: '—',
    firmwareVersion: 'v0.1.0',
    config: {},
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────

function toDisplayDeployment(d: RobotDeployment): DisplayDeployment {
  const displayStatus = API_TO_DISPLAY_STATUS[d.status] ?? 'offline';
  // Derive a friendly name from agent + platform
  const platformLabel = PLATFORM_CONFIG[d.platform]?.label ?? d.platform.toUpperCase();
  const name = `${d.agentName} (${platformLabel})`;

  // Calculate pseudo uptime from deployedAt
  const uptimeHours = Math.floor(
    (Date.now() - new Date(d.deployedAt).getTime()) / 3600_000
  );

  return {
    ...d,
    name,
    platformLabel,
    displayStatus,
    uptimeHours,
    commandsExecuted: Math.floor(Math.random() * 1000), // mock — replace with real counter
    ipAddress: d.endpoint ? new URL(d.endpoint).hostname : '—',
    firmwareVersion: '—',
  };
}

// ─── Status Indicator ──────────────────────────────────────────────────

function StatusDot({ status }: { status: DisplayStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <motion.span
      className="inline-block w-2 h-2 rounded-full"
      style={{ background: cfg.dot }}
      animate={status === 'online' ? { opacity: [1, 0.4, 1] } : {}}
      transition={status === 'online' ? { duration: 2, repeat: Infinity } : {}}
    />
  );
}

// ─── Detail Panel ──────────────────────────────────────────────────────

function DetailPanel({
  deployment,
  onClose,
}: {
  deployment: DisplayDeployment | null;
  onClose: () => void;
}) {
  if (!deployment) return null;
  const platformCfg = PLATFORM_CONFIG[deployment.platform];
  const PlatformIcon = platformCfg.icon;
  const statusCfg = STATUS_CONFIG[deployment.displayStatus];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="p-5 bg-titan-card/60 border-titan-border/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${platformCfg.color}15`, border: `1px solid ${platformCfg.color}30` }}
            >
              <PlatformIcon className="h-5 w-5" style={{ color: platformCfg.color }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-titan-text">{deployment.name}</h3>
              <p className="text-[10px] font-mono text-titan-muted/70">{deployment.agentName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-titan-muted/50 hover:text-titan-text transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Status', value: statusCfg.label, color: statusCfg.color },
            { label: 'Platform', value: deployment.platformLabel, color: platformCfg.color },
            { label: 'Uptime', value: `${deployment.uptimeHours}h` },
            { label: 'Commands', value: deployment.commandsExecuted.toLocaleString() },
            { label: 'IP', value: deployment.ipAddress },
            { label: 'Firmware', value: deployment.firmwareVersion },
            { label: 'Agent ID', value: deployment.agentId },
            { label: 'Deployed', value: new Date(deployment.deployedAt).toLocaleDateString() },
          ].map((item) => (
            <div key={item.label} className="text-center p-2 rounded-lg bg-titan-card/40 border border-titan-border/20">
              <p className="text-[9px] font-mono text-titan-muted/60 uppercase tracking-wider mb-0.5">{item.label}</p>
              <p
                className="text-xs font-semibold font-mono"
                style={item.color ? { color: item.color } : { color: '#E2E8F0' }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 text-[10px] h-8 gap-1.5"
            style={{
              background: deployment.displayStatus === 'online'
                ? 'linear-gradient(135deg, #14B8A6, #F59E0B)'
                : `${platformCfg.color}25`,
              color: deployment.displayStatus === 'online' ? '#0A0E17' : platformCfg.color,
              border: deployment.displayStatus !== 'online' ? `1px solid ${platformCfg.color}30` : 'none',
            }}
          >
            <Terminal className="h-3 w-3" />
            Send Command
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-[10px] h-8 gap-1.5 border-titan-border/30 text-titan-muted/70"
          >
            <Activity className="h-3 w-3" />
            View Logs
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────

export default function RoboticsDashboardPage() {
  const [deployments, setDeployments] = useState<DisplayDeployment[]>(SAMPLE_DEPLOYMENTS);
  const [loading, setLoading] = useState(true);
  const [selectedDeployment, setSelectedDeployment] = useState<DisplayDeployment | null>(null);
  const [filter, setFilter] = useState<DisplayStatus | 'all'>('all');
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [deployForm, setDeployForm] = useState<{ name: string; agentName: string; endpoint: string; platform: PlatformType }>({ name: '', agentName: '', endpoint: '', platform: 'ros2' });

  // Fetch deployments from API
  const fetchDeployments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/robotics/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setDeployments(json.data.map(toDisplayDeployment));
      }
    } catch {
      // Fallback to sample data
      setDeployments(SAMPLE_DEPLOYMENTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeployments();
  }, [fetchDeployments]);

  const filteredDeployments = useMemo(() => {
    if (filter === 'all') return deployments;
    return deployments.filter(d => d.displayStatus === filter);
  }, [deployments, filter]);

  const filterOptions: { key: DisplayStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'online', label: 'Online' },
    { key: 'offline', label: 'Offline' },
    { key: 'error', label: 'Error' },
    { key: 'deploying', label: 'Deploying' },
    { key: 'paused', label: 'Paused' },
  ];

  const stats = useMemo(() => ({
    total: deployments.length,
    online: deployments.filter(d => d.displayStatus === 'online').length,
    error: deployments.filter(d => d.displayStatus === 'error').length,
    totalCommands: deployments.reduce((s, d) => s + d.commandsExecuted, 0),
  }), [deployments]);

  return (
    <div className="min-h-screen titan-gradient relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0 titan-radial-glow-warm" />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 20%, rgba(20, 184, 166, 0.08) 0%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
      <div className="absolute inset-0 pointer-events-none z-0 titan-grid-bg" />

      <div className="relative z-10">
        {/* Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-titan-muted/60">
              <span className="hover:text-titan-teal/80 cursor-pointer transition-colors">Dashboard</span>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className="hover:text-titan-teal/80 cursor-pointer transition-colors">Robotics</span>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className="text-titan-teal/80">Deployments</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-titan-teal/10 border border-titan-teal/30 flex items-center justify-center">
                  <HardDrive className="h-5 w-5 text-titan-teal" />
                </div>
                <div>
                  <h1 className="text-lg font-bold titan-text-gradient tracking-tight">Robot Deployments</h1>
                  <p className="text-xs font-mono text-titan-muted">{stats.online}/{stats.total} online · {stats.totalCommands.toLocaleString()} commands</p>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Dialog open={deployModalOpen} onOpenChange={setDeployModalOpen}>
                  <Button
                    size="sm"
                    onClick={() => setDeployModalOpen(true)}
                    className="gap-1.5 text-[10px] h-8 bg-gradient-to-r from-titan-teal to-teal-500 hover:from-titan-teal/90 hover:to-teal-500/90 text-white"
                  >
                    <Plus className="h-3 w-3" />
                    New Deployment
                  </Button>
                  <DialogContent className="sm:max-w-md !bg-titan-card border border-titan-border/40">
                    <DialogHeader>
                      <DialogTitle className="text-titan-text">New Robot Deployment</DialogTitle>
                      <DialogDescription className="text-titan-muted/70">
                        Connect a new robot or agent endpoint to your swarm. Enter the connection details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                      <div className="grid gap-1.5">
                        <label htmlFor="deploy-name" className="text-[10px] font-mono text-titan-muted/60 uppercase tracking-wider">
                          Name
                        </label>
                        <Input
                          id="deploy-name"
                          placeholder="My Robot"
                          value={deployForm.name}
                          onChange={(e) => setDeployForm(p => ({ ...p, name: e.target.value }))}
                          className="border-titan-border/30 bg-titan-card/60 text-titan-text text-sm"
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <label htmlFor="deploy-agent" className="text-[10px] font-mono text-titan-muted/60 uppercase tracking-wider">
                          Agent Name
                        </label>
                        <Input
                          id="deploy-agent"
                          placeholder="ros2-navigation"
                          value={deployForm.agentName}
                          onChange={(e) => setDeployForm(p => ({ ...p, agentName: e.target.value }))}
                          className="border-titan-border/30 bg-titan-card/60 text-titan-text text-sm"
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <label htmlFor="deploy-endpoint" className="text-[10px] font-mono text-titan-muted/60 uppercase tracking-wider">
                          Endpoint URL
                        </label>
                        <Input
                          id="deploy-endpoint"
                          placeholder="http://192.168.1.100:8080"
                          value={deployForm.endpoint}
                          onChange={(e) => setDeployForm(p => ({ ...p, endpoint: e.target.value }))}
                          className="border-titan-border/30 bg-titan-card/60 text-titan-text text-sm"
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <label htmlFor="deploy-platform" className="text-[10px] font-mono text-titan-muted/60 uppercase tracking-wider">
                          Platform
                        </label>
                        <select
                          id="deploy-platform"
                          value={deployForm.platform}
                          onChange={(e) => setDeployForm(p => ({ ...p, platform: e.target.value as PlatformType }))}
                          className="w-full px-3 py-2 rounded-lg border border-titan-border/30 bg-titan-card/60 text-titan-text text-sm focus:outline-none focus:ring-2 focus:ring-titan-teal/30 focus:border-titan-teal/50"
                        >
                          <option value="ros2">ROS2 (NVIDIA Jetson / Robot)</option>
                          <option value="raspberry-pi">Raspberry Pi</option>
                          <option value="arduino">Arduino / ESP32</option>
                          <option value="custom">Custom Hardware</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter className="!bg-transparent !border-titan-border/20">
                      <Button
                        variant="outline"
                        onClick={() => setDeployModalOpen(false)}
                        className="border-titan-border/30 text-titan-muted/70"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          // Create a new deployment entry and add to list
                          const newDep: RobotDeployment = {
                            id: `dep-${Date.now()}`,
                            agentName: deployForm.agentName,
                            platform: deployForm.platform,
                            status: 'pending',
                            agentId: `agent-${deployForm.agentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                            endpoint: deployForm.endpoint || undefined,
                            deployedAt: new Date().toISOString(),
                            lastHeartbeat: new Date().toISOString(),
                            config: {},
                          };
                          const display = toDisplayDeployment(newDep);
                          setDeployments(prev => [display, ...prev]);
                          setDeployModalOpen(false);
                          setDeployForm({ name: '', agentName: '', endpoint: '', platform: 'ros2' });
                        }}
                        disabled={!deployForm.agentName}
                        className="bg-gradient-to-r from-titan-teal to-teal-500 hover:from-titan-teal/90 hover:to-teal-500/90 text-white"
                      >
                        <Globe className="h-3 w-3 mr-1" />
                        Deploy
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={fetchDeployments}
                  disabled={loading}
                  className="gap-1.5 text-[10px] h-8 border-titan-border/30 text-titan-muted/70 hover:text-titan-teal"
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Loading…' : 'Refresh'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {[
              { icon: <HardDrive className="h-3.5 w-3.5" />, value: stats.total, label: 'Total Deployments', color: '#14B8A6' },
              { icon: <Radio className="h-3.5 w-3.5" />, value: stats.online, label: 'Online', color: '#10B981' },
              { icon: <AlertTriangle className="h-3.5 w-3.5" />, value: stats.error, label: 'Errors', color: '#EF4444' },
              { icon: <Terminal className="h-3.5 w-3.5" />, value: stats.totalCommands.toLocaleString(), label: 'Total Commands', color: '#F59E0B' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-3 rounded-xl bg-titan-card/40 border border-titan-border/30 text-center"
              >
                <div className="flex justify-center mb-1" style={{ color: stat.color }}>{stat.icon}</div>
                <p className="text-lg font-bold font-mono" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[9px] font-mono text-titan-muted/60 uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filter tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
          <motion.div
            className="flex gap-1 p-1 rounded-lg bg-titan-card/30 border border-titan-border/20 w-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {filterOptions.map((opt) => {
              const active = filter === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setFilter(opt.key)}
                  className={`px-3 py-1.5 text-[10px] font-mono rounded-md transition-all ${
                    active
                      ? 'bg-titan-teal/15 text-titan-teal border border-titan-teal/20'
                      : 'text-titan-muted/60 hover:text-titan-text border border-transparent'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Deployments list + detail panel */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Deployments column */}
            <div className={`space-y-3 ${selectedDeployment ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <AnimatePresence mode="popLayout">
                {filteredDeployments.map((dep) => {
                  const platformCfg = PLATFORM_CONFIG[dep.platform];
                  const PlatformIcon = platformCfg.icon;
                  const statusCfg = STATUS_CONFIG[dep.displayStatus];
                  const isSelected = selectedDeployment?.id === dep.id;

                  return (
                    <motion.div
                      key={dep.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`p-4 bg-titan-card/40 border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-titan-teal/40 shadow-lg shadow-titan-teal/5'
                            : 'border-titan-border/30 hover:border-titan-border/60'
                        }`}
                        onClick={() => setSelectedDeployment(isSelected ? null : dep)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Status + Platform icon */}
                            <div className="relative shrink-0">
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: `${platformCfg.color}12`, border: `1px solid ${platformCfg.color}25` }}
                              >
                                <PlatformIcon className="h-4 w-4" style={{ color: platformCfg.color }} />
                              </div>
                              <motion.span
                                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-titan-card"
                                style={{ background: statusCfg.dot }}
                                animate={dep.displayStatus === 'online' ? { opacity: [1, 0.4, 1] } : {}}
                                transition={dep.displayStatus === 'online' ? { duration: 2, repeat: Infinity } : {}}
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-titan-text truncate">{dep.name}</h3>
                                <Badge
                                  className="text-[8px] h-3.5 px-1 font-mono border-0 shrink-0"
                                  style={{ background: `${statusCfg.color}20`, color: statusCfg.color }}
                                >
                                  {statusCfg.label}
                                </Badge>
                              </div>
                              <p className="text-[10px] font-mono text-titan-muted/70 flex items-center gap-1.5 mt-0.5">
                                <Bot className="h-2.5 w-2.5 inline" />
                                {dep.agentName}
                                <span className="mx-1">·</span>
                                <Clock className="h-2.5 w-2.5 inline" />
                                {dep.displayStatus === 'deploying' ? 'Just now' : formatRelativeTime(dep.lastHeartbeat)}
                              </p>
                            </div>
                          </div>

                          {/* Commands count */}
                          <div className="text-right shrink-0 ml-3">
                            <p className="text-xs font-bold font-mono text-titan-text/80">{dep.commandsExecuted.toLocaleString()}</p>
                            <p className="text-[8px] font-mono text-titan-muted/50">cmds</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredDeployments.length === 0 && (
                <div className="text-center py-16 text-titan-muted/60">
                  <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No deployments match this filter</p>
                  <p className="text-[10px] font-mono mt-1">Try a different filter or connect new hardware</p>
                </div>
              )}
            </div>

            {/* Detail column */}
            <AnimatePresence>
              {selectedDeployment && (
                <DetailPanel
                  deployment={selectedDeployment}
                  onClose={() => setSelectedDeployment(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Relative time helper ───────────────────────────────────────────────

function formatRelativeTime(isoString: string): string {
  if (isoString === '—') return '—';
  const diff = Date.now() - new Date(isoString).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
