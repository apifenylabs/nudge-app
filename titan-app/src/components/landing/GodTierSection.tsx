import { Badge } from "@/components/ui/badge";
import { Diamond, Crown } from "lucide-react";

const ABILITIES = [
  { tier: "Tier 3", name: "Autonomous Deployment", color: "text-amber-600", desc: "Self-deploying agent swarms" },
  { tier: "Tier 2", name: "Swarm Orchestration", color: "text-purple-600", desc: "Real-time multi-agent coordination" },
  { tier: "Tier 1", name: "Skill Evolution", color: "text-rose-600", desc: "Memory-driven ability upgrades" },
];

const STATS = [
  { label: "Ability Tiers", value: "3", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "God Powers", value: "14", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Unlock Level", value: "30", color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Robotics Ready", value: "✓", color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function GodTierSection() {
  return (
    <section className="border-t border-gray-100 bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-purple-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="outline" className="mb-4 border-purple-200 bg-purple-50 text-purple-700">
              <Diamond className="h-3 w-3 mr-1" />
              God-Tier Engine
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ascend beyond level 30
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Hit <strong>Level 30</strong> to unlock the God-Tier system — a suite of 14 transcendent abilities
              across three tiers. Automate audits, spawn orbital swarms, command robotics,
              and evolve your mascot into its final form.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl px-4 py-3 flex items-center justify-between`}>
                  <span className="text-sm text-gray-600">{s.label}</span>
                  <span className={`text-lg font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl border border-purple-100 shadow-lg shadow-purple-100/30 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">God-Tier Abilities</span>
              </div>
              <div className="space-y-3">
                {ABILITIES.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${a.color.replace('text-', 'bg-').replace('600', '100')} ${a.color}`}>
                      {a.tier}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{a.name}</p>
                      <p className="text-xs text-gray-500">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
