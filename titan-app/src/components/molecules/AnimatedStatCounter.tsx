"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedStatCounterProps {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  duration?: number;
  color?: string;
  decimals?: number;
}

export function AnimatedStatCounter({
  end,
  label,
  prefix = "",
  suffix = "",
  icon,
  duration = 2,
  color = "#14B8A6",
  decimals = 0,
}: AnimatedStatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [inView, end, duration]);

  const displayValue = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1.5 p-4 sm:p-5 rounded-xl bg-titan-card/50 border border-titan-border/20 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {icon && (
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-1"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}
        >
          {icon}
        </div>
      )}
      <span
        className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tabular-nums"
        style={{ color }}
      >
        {prefix}{displayValue}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-mono text-titan-muted/70 text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}
