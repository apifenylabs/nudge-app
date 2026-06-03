"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedStatBar — same visual as the existing StatBar but with
 * animated count-up number on the value label.
 */
interface Props {
  label: string;
  value: number;
  max: number;
  color: string; // e.g. "from-cyan-400 to-blue-600"
  delay?: number; // ms to wait before starting
}

export default function AnimatedStatBar({ label, value, max, color, delay = 0 }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  // Animate on mount with optional delay
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let raf: number;

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const duration = 800;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress); // ease-out quad
      setDisplayValue(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, value]);

  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-[10px] font-bold text-white/40 uppercase tracking-wider">
        {label}
      </span>
      <div
        ref={barRef}
        className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 ease-out`}
          style={{ width: `${hasStarted ? pct : 0}%` }}
        />
      </div>
      <span
        className="w-6 text-right text-[10px] font-mono tabular-nums transition-all duration-300"
        style={{
          color: hasStarted
            ? color.includes('gray')
              ? '#9ca3af'
              : color.includes('green')
                ? '#86efac'
                : color.includes('blue')
                  ? '#93c5fd'
                  : color.includes('purple')
                    ? '#c4b5fd'
                    : color.includes('amber')
                      ? '#fcd34d'
                      : color.includes('cyan')
                        ? '#67e8f9'
                        : '#94a3b8'
              : 'rgba(255,255,255,0.3)',
        }}
      >
        {displayValue}
      </span>
    </div>
  );
}
