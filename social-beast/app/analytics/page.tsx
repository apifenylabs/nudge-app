"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import AnalyticsChart from "@/components/AnalyticsChart";
import StatsCard from "@/components/StatsCard";
import { getTotalStats, getMockAnalytics, getMockPlatformBreakdown } from "@/lib/analytics";
import { BarChart3, TrendingUp, Users, MousePointerClick } from "lucide-react";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({ totalPosts: 0, publishedPosts: 0, totalEngagement: 0 });
  const dailyData = getMockAnalytics();
  const platformData = getMockPlatformBreakdown();

  useEffect(() => {
    getTotalStats().then(setStats);
  }, []);

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-cream">Analytics</h1>
        <p className="text-sm text-muted mt-1">
          Track your content performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={<BarChart3 size={18} className="text-accent" />}
        />
        <StatsCard
          title="Published"
          value={stats.publishedPosts}
          icon={<TrendingUp size={18} className="text-accent" />}
        />
        <StatsCard
          title="Engagement"
          value={stats.totalEngagement}
          icon={<Users size={18} className="text-highlight" />}
          trend="up"
          trendValue="8.2%"
        />
        <StatsCard
          title="Avg. Clicks/Post"
          value={stats.publishedPosts > 0 ? Math.round(stats.totalEngagement / stats.publishedPosts) : 0}
          icon={<MousePointerClick size={18} className="text-accent" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-4 md:p-6">
          <h3 className="text-sm font-medium text-ink dark:text-cream mb-4">
            Daily Engagement
          </h3>
          <AnalyticsChart type="line" data={dailyData} height={250} />
        </div>

        <div className="card p-4 md:p-6">
          <h3 className="text-sm font-medium text-ink dark:text-cream mb-4">
            Posts by Platform
          </h3>
          <AnalyticsChart type="pie" data={platformData} height={250} />
        </div>

        <div className="card p-4 md:p-6">
          <h3 className="text-sm font-medium text-ink dark:text-cream mb-4">
            Weekly Performance
          </h3>
          <AnalyticsChart type="bar" data={dailyData} height={250} />
        </div>

        <div className="card p-4 md:p-6">
          <h3 className="text-sm font-medium text-ink dark:text-cream mb-4">
            Best Performing Content
          </h3>
          <div className="space-y-3">
            {dailyData.slice(0, 3).map((d, i) => (
              <div
                key={d.name}
                className="flex items-center justify-between py-2 border-b border-border dark:border-dark-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted w-5">
                    #{i + 1}
                  </span>
                  <span className="text-sm text-ink dark:text-cream">
                    {d.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-accent">
                  {d.value} engagements
                </span>
              </div>
            ))}
            {dailyData.length === 0 && (
              <p className="text-sm text-muted">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
