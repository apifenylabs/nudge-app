"use client";

import AppShell from "@/components/AppShell";

const builds = [
  {
    date: "2026-05-14",
    title: "The 19-Post Day",
    color: "amber",
    stats: [
      { label: "Blog Posts Created", value: "6" },
      { label: "AI Tools Added (Apifeny)", value: "30" },
      { label: "Nudge Features Shipped", value: "3 phases" },
      { label: "EV Stations Mapped", value: "1,125" },
      { label: "Destinations Total", value: "1,103" },
      { label: "Live Sites", value: "6" },
      { label: "Total Pages Indexed", value: "3,000+" },
      { label: "Build Cost", value: "$0.65" },
    ],
    milestones: [
      "Nudge Phase 15 — Task Edit/Delete UI with 5s undo toast",
      "Nudge Phase 16 — Offline IndexedDB queue (works without internet)",
      "Nudge Phase 17 — Recurring task auto-creation (daily/weekly/monthly)",
      "Apifeny AI: 60→75→90 AI tools catalogued and deployed",
      "4 new editorial playbooks + 2 community playbooks (151 pages)",
      "PlaybookComments component — threaded discussions on community pages",
      "Region filter (Asia/NA/Europe/Global) on rankings",
      "EV Post #49: KL→Singapore road trip (NSE highway + border crossing)",
      "EV Post #50: Japan EV road trip (Tokyo→Hakone→Kyoto)",
      "EV Post #52: Thailand coastal Phuket→Hua Hin (500km)",
      "EV Post #53: Singapore family hotels with EV charging",
      "EV Blog: China Yangtze River Delta EV road trip (Shanghai→Hangzhou→Nanjing)",
      "Family Travel: India family travel guide + Bali 10 best hotels + Vietnam all-inclusive resorts",
      "Senior-Friendly: Walking tours across 5 Asian cities + Medical tourism guide",
      "Luxury Travel: Merged 500 destinations from batch files (121 countries)",
      "Affiliate infra: Cross-site booking CTAs on all 6 sites",
      "Site recovery: Redeployed Luxury & Senior (were returning 404)",
    ],
  },
];

export default function BuildLogPage() {
  const day = builds[0];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-mono text-muted">
            BUILD LOG / {day.date}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-1 text-ink dark:text-cream">
            {day.title}
          </h1>
          <p className="text-muted mt-2">
            What one autonomous agent orchestra built in 24 hours — for less than cost of a Hong Kong egg tart.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {day.stats.map((stat) => (
            <div
              key={stat.label}
              className="card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl sm:text-3xl font-black text-accent">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Cost Banner */}
        <div className="card p-4 mb-8 border-l-4 border-accent bg-accent/5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-bold text-ink dark:text-cream">
                Total cost: <span className="text-accent">$0.65</span>
              </p>
              <p className="text-xs text-muted">
                17 milestones. 7 sub-agents. 100% AI-automated workflow. Human reviewed deployments only.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <h2 className="text-xl font-bold text-ink dark:text-cream mb-4">
          🚀 What was shipped
        </h2>
        <div className="space-y-2">
          {day.milestones.map((ms, i) => (
            <div key={i} className="card p-3 flex items-start gap-3 hover:bg-accent/5 transition-colors">
              <span className="text-xs font-mono text-accent mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-ink dark:text-cream">{ms}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-accent/10 to-rose/10 text-center">
          <p className="text-sm text-muted italic">
            "The marginal cost of completeness is near zero with AI. Boil the ocean."
          </p>
          <p className="text-xs text-muted mt-1">— Captain Orchestra, CEO</p>
        </div>
      </div>
    </AppShell>
  );
}
