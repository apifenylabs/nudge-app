"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Scan, CheckCircle2, AlertCircle, Terminal, Wifi,
  Zap, Shield, Bot, Globe, Microchip, Cpu, HardDrive,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ScanStatus = 'idle' | 'scanning' | 'ready' | 'error';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'unavailable';
  ip: string;
  lastSeen: string;
  capabilities: string[];
}

const MOCK_DEVICES: Device[] = [
  { id: 'd1', name: 'Jetson Nano', type: 'ros2', status: 'online', ip: '192.168.1.42', lastSeen: '2s ago', capabilities: ['object-detection', 'navigation', 'speech'] },
  { id: 'd2', name: 'ESP32-CAM', type: 'arduino', status: 'online', ip: '192.168.1.101', lastSeen: '5s ago', capabilities: ['camera', 'motion-sensor'] },
  { id: 'd3', name: 'Raspberry Pi 5', type: 'raspberry-pi', status: 'offline', ip: '192.168.1.77', lastSeen: '3h ago', capabilities: ['home-assistant', 'mqtt-broker'] },
  { id: 'd4', name: 'Servo Controller', type: 'arduino', status: 'unavailable', ip: '192.168.1.200', lastSeen: '2d ago', capabilities: ['motor-control', 'encoder'] },
  { id: 'd5', name: 'LiDAR Scanner', type: 'custom', status: 'online', ip: '192.168.1.88', lastSeen: '1m ago', capabilities: ['mapping', 'obstacle-avoidance'] },
];

const STATUS_STYLES: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  online: { label: 'Online', dot: '#10B981', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  offline: { label: 'Offline', dot: '#6B7280', bg: 'bg-gray-100', text: 'text-gray-500' },
  unavailable: { label: 'Unavailable', dot: '#EF4444', bg: 'bg-red-50', text: 'text-red-600' },
};

const TYPE_CONFIG: Record<string, { label: string; icon: typeof Cpu; color: string; bg: string }> = {
  ros2: { label: 'ROS2', icon: Cpu, color: '#0D9488', bg: 'bg-teal-50' },
  arduino: { label: 'Arduino / ESP32', icon: Microchip, color: '#10B981', bg: 'bg-emerald-50' },
  'raspberry-pi': { label: 'Raspberry Pi', icon: HardDrive, color: '#F59E0B', bg: 'bg-amber-50' },
  custom: { label: 'Custom Hardware', icon: Globe, color: '#7C3AED', bg: 'bg-purple-50' },
};

function ScanAnimation() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-4">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-teal-400/40"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-teal-400/20"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <Scan className="h-8 w-8 text-teal-600" />
        </motion.div>
      </div>
    </div>
  );
}

function ScanButton({ scanStatus, onScan }: { scanStatus: ScanStatus; onScan: () => void }) {
  const isScanning = scanStatus === 'scanning';
  return (
    <Button
      onClick={onScan}
      disabled={isScanning}
      className="text-xs font-semibold"
      style={{
        background: isScanning ? '#E5E7EB' : 'linear-gradient(135deg, #14B8A6, #0D9488)',
        color: isScanning ? '#6B7280' : '#FFFFFF',
        cursor: isScanning ? 'not-allowed' : 'pointer',
        borderRadius: '12px',
        height: '44px',
        padding: '0 24px',
      }}
    >
      {isScanning ? (
        <span className="flex items-center gap-2">
          <motion.span
            className="inline-block w-3 h-3 rounded-full border-2 border-gray-400 border-t-gray-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          Scanning network...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Scan className="h-4 w-4" />
          {scanStatus === 'ready' ? 'Re-scan Network' : 'Scan Network'}
        </span>
      )}
    </Button>
  );
}

export default function BYOPage() {
  const router = useRouter();
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [devices, setDevices] = useState<Device[]>([]);
  const [customIP, setCustomIP] = useState('');
  const [connecting, setConnecting] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState('#0D9488');

  const handleScan = useCallback(() => {
    setScanStatus('scanning');
    setCurrentColor('#0D9488');
    // Simulate network scan
    const timeout = setTimeout(() => {
      setDevices(MOCK_DEVICES);
      setScanStatus('ready');
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const handleConnect = useCallback(async (device: Device) => {
    if (device.status !== 'online') return;
    setConnecting(device.id);
    await new Promise(r => setTimeout(r, 800));
    setConnecting(null);
    // Successfully connected — add to feed / redirect
    router.push('/robotics/dashboard');
  }, [router]);

  const handleCustomConnect = useCallback(() => {
    if (!customIP.trim()) return;
    setCurrentColor('#0D9488');
    // Add custom device logic would go here
    setConnecting('custom');
    setTimeout(() => {
      setConnecting(null);
      setCustomIP('');
    }, 800);
  }, [customIP]);

  // Scan on mount — auto-discover
  const hasScanned = useRef(false);
  useEffect(() => {
    if (!hasScanned.current) {
      hasScanned.current = true;
      handleScan();
    }
  }, [handleScan]);

  const onlineCount = devices.filter(d => d.status === 'online').length;

  return (
    <div className="min-h-screen bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-bl from-teal-50/60 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back + Header */}
        <div className="flex items-center gap-3 mb-6">
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
            <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-900">
              <Terminal className="h-5 w-5 text-teal-600" />
              Bring Your Own Robot
              <Badge className="text-[9px] font-mono bg-teal-50 text-teal-700 border-teal-200">BETA</Badge>
            </h1>
            <p className="text-sm text-gray-500">Connect your hardware to the Titan swarm</p>
          </div>
        </div>

        {/* Scan Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <ScanButton scanStatus={scanStatus} onScan={handleScan} />
            {scanStatus === 'ready' && (
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <motion.span
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-emerald-700 font-medium">{onlineCount} online</span>
                <span className="text-gray-400">· {devices.length} found</span>
              </div>
            )}
          </div>

          {/* Custom IP connect */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Enter IP to connect..."
              value={customIP}
              onChange={(e) => setCustomIP(e.target.value)}
              className="text-xs h-9 border-gray-200"
              onKeyDown={(e) => e.key === 'Enter' && handleCustomConnect()}
            />
            <Button
              size="sm"
              onClick={handleCustomConnect}
              disabled={!customIP.trim() || connecting === 'custom'}
              className="text-[10px] h-9 whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
                color: '#FFFFFF',
              }}
            >
              {connecting === 'custom' ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <AnimatePresence mode="wait">
          {scanStatus === 'scanning' && (
            <motion.div
              key="scanning"
              className="text-center py-16 rounded-2xl border border-gray-200 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScanAnimation />
              <p className="text-sm font-medium text-gray-900">Scanning your local network...</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">Discovering ROS2, Arduino, and custom devices</p>
            </motion.div>
          )}

          {scanStatus === 'idle' && (
            <motion.div
              key="idle"
              className="text-center py-16 rounded-2xl border border-dashed border-gray-200 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Scan className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500">Click "Scan Network" to discover devices</p>
            </motion.div>
          )}

          {scanStatus === 'ready' && (
            <motion.div
              key="devices"
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {devices.map((device, i) => {
                const typeCfg = TYPE_CONFIG[device.type] || TYPE_CONFIG.custom;
                const TypeIcon = typeCfg.icon;
                const statusStyle = STATUS_STYLES[device.status];
                const isConnecting = connecting === device.id;

                return (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Card
                      className="transition-all duration-200 hover:shadow-md"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderLeft: `3px solid ${typeCfg.color}`,
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-xl ${typeCfg.bg} flex items-center justify-center shrink-0`}>
                              <TypeIcon className="h-5 w-5" style={{ color: typeCfg.color }} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-semibold text-gray-900">{device.name}</h3>
                                <Badge
                                  className="text-[9px] h-4 px-1.5 font-mono border-0"
                                  style={{
                                    background: device.status === 'online' ? 'rgba(16,185,129,0.15)' : 'rgba(107,114,128,0.1)',
                                    color: device.status === 'online' ? '#10B981' : '#6B7280',
                                  }}
                                >
                                  {statusStyle.label}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5 font-mono flex items-center gap-2">
                                {typeCfg.label}
                                <span className="text-gray-300">·</span>
                                {device.ip}
                                <span className="text-gray-300">·</span>
                                {device.lastSeen}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Capability badges */}
                            <div className="hidden sm:flex items-center gap-1">
                              {device.capabilities.slice(0, 2).map((cap) => (
                                <Badge
                                  key={cap}
                                  variant="outline"
                                  className="text-[8px] h-4 px-1.5 font-mono border-gray-200 text-gray-500"
                                >
                                  {cap}
                                </Badge>
                              ))}
                              {device.capabilities.length > 2 && (
                                <span className="text-[9px] text-gray-400 font-mono">+{device.capabilities.length - 2}</span>
                              )}
                            </div>

                            {/* Connect Button */}
                            <Button
                              size="sm"
                              onClick={() => handleConnect(device)}
                              disabled={device.status !== 'online' || isConnecting}
                              className="text-[10px] h-8 gap-1.5"
                              style={{
                                background: device.status === 'online'
                                  ? 'linear-gradient(135deg, #14B8A6, #0D9488)'
                                  : '#E5E7EB',
                                color: device.status === 'online' ? '#FFFFFF' : '#6B7280',
                                borderRadius: '10px',
                              }}
                            >
                              {isConnecting ? (
                                <motion.span
                                  className="inline-block w-2.5 h-2.5 rounded-full border-2 border-white/30 border-t-white"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                />
                              ) : (
                                <Wifi className="h-3 w-3" />
                              )}
                              {isConnecting ? 'Connecting...' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
