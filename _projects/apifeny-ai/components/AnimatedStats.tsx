'use client';

import { useEffect, useRef, useState } from 'react';
import { BookOpen, Users, TrendingUp, DollarSign } from 'lucide-react';

interface Stat {
  icon: typeof BookOpen;
  value: string;
  label: string;
  color: string;
  bg: string;
}

const stats: Stat[] = [
  { icon: BookOpen, value: '105', label: 'Playbooks', color: 'text-violet-600', bg: 'bg-violet-100' },
  { icon: Users, value: '630', label: 'Solopreneurs using Apifeny', color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { icon: TrendingUp, value: '3x', label: 'Faster content production', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { icon: DollarSign, value: '22 hrs', label: 'Saved per week (avg)', color: 'text-amber-600', bg: 'bg-amber-100' },
];

function AnimatedCount({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500; // ms
          const steps = 30;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isCount = !isNaN(Number(stat.value));
        return (
          <div key={stat.label} className="text-center group">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
              {isCount ? (
                <AnimatedCount target={parseInt(stat.value)} />
              ) : stat.value.includes('+') ? (
                <>
                  <AnimatedCount target={parseInt(stat.value)} />+
                </>
              ) : (
                stat.value
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
