"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down";
  trendValue?: string;
  icon: React.ReactNode;
  loading?: boolean;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  loading = false,
}: StatsCardProps) {
  const [animValue, setAnimValue] = useState(loading ? "—" : value);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setAnimValue(value), 100);
      return () => clearTimeout(timer);
    }
  }, [value, loading]);

  return (
    <div className="card p-4 md:p-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-ink dark:text-cream">
            {animValue}
          </p>
          {subtitle && (
            <p className="text-xs text-muted">{subtitle}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {trend && trendValue && (
        <div className="mt-3 flex items-center gap-1.5">
          {trend === "up" ? (
            <TrendingUp size={14} className="text-accent" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}
          <span
            className={`text-xs font-medium ${
              trend === "up" ? "text-accent" : "text-red-400"
            }`}
          >
            {trendValue}
          </span>
          <span className="text-xs text-muted">vs last week</span>
        </div>
      )}
    </div>
  );
}
