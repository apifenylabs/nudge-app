"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Cpu,
  CircuitBoard,
  Wifi,
  Bot,
  ArrowRight,
  Server,
  Monitor,
  Radio,
  Zap,
} from "lucide-react";

const platforms = [
  {
    id: "ros2",
    icon: CircuitBoard,
    name: "ROS2",
    desc: "Deploy as a ROS2 node — real-time sensor fusion and actuator control",
    color: "from-rose-500/20 to-rose-600/10",
    border: "border-rose-500/30",
    textColor: "text-rose-400",
  },
  {
    id: "arduino",
    icon: Cpu,
    name: "Arduino / ESP32",
    desc: "Flash skill logic directly to microcontrollers — low-power edge AI",
    color: "from-teal-500/20 to-teal-600/10",
    border: "border-teal-500/30",
    textColor: "text-teal-400",
  },
  {
    id: "raspberry-pi",
    icon: Monitor,
    name: "Raspberry Pi",
    desc: "Run your agent as a systemd service — full Linux capability",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
    textColor: "text-emerald-400",
  },
  {
    id: "custom",
    icon: Radio,
    name: "Custom Hardware",
    desc: "Generic webhook / gRPC bridge — any robot, any protocol",
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30",
    textColor: "text-amber-400",
  },
];

export default function RoboticsLanding() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-[#E2E8F0]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-teal-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-teal-500/30 bg-teal-500/10 text-teal-400 mb-4">
              <Zap className="w-3 h-3" />
              Phase 6 — Robotics
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
              Deploy Your Titan Agent{" "}
              <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                to Any Robot
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Your AI companion isn&apos;t stuck in a browser. Deploy it to ROS2
              robots, ESP32 microcontrollers, Raspberry Pis — any hardware with
              a network connection.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link
                href="/robotics/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-teal-500 to-amber-500 text-[#0A0E17] hover:shadow-lg hover:shadow-teal-500/25 transition-all"
              >
                <Bot className="w-4 h-4" />
                Manage Deployments
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
            {[
              { label: "Platforms", value: "4", icon: Server },
              { label: "Deployments", value: "—", icon: Bot },
              { label: "Protocols", value: "3", icon: Wifi },
              { label: "Status", value: "Active", icon: CircuitBoard },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <stat.icon className="w-4 h-4 text-slate-500 mb-1" />
                <span className="text-lg font-bold text-white">{stat.value}</span>
                <span className="text-[11px] text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Platform cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((p, i) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  href={`/robotics/${p.id}`}
                  className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 hover:border-slate-600 transition-all"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.4s ease, transform 0.4s ease, border-color 0.2s`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 border ${p.border} bg-slate-800/80`}
                    >
                      <Icon className={`w-5 h-5 ${p.textColor}`} />
                    </div>
                    <h3 className="font-semibold text-sm text-white mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Setup guide
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
