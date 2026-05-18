"use client";

import { useEffect, useState } from "react";
import { getScoreColor, getScoreLabel } from "@/lib/score";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  animate?: boolean;
}

export default function ScoreGauge({
  score,
  size = 160,
  strokeWidth = 12,
  label = "Overall Score",
  animate = true,
}: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(animate ? 0 : score);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;
  const scoreColor = getScoreColor(score);

  useEffect(() => {
    if (!animate) {
      setAnimatedScore(score);
      return;
    }

    // Animate count up
    const duration = 1500;
    const steps = 30;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, animate]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          className="-rotate-90 transform"
          aria-label={`Score gauge showing ${score} out of 100`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Score arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${scoreColor}`}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-4xl font-bold transition-colors duration-500 ${scoreColor}`}
          >
            {animatedScore}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            /100
          </span>
        </div>
      </div>
      <span className="font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold ${getScoreColor(
          score
        ).replace("text", "bg")}/20 ${scoreColor}`}
        style={{
          backgroundColor: `var(--${scoreColor.replace("text-", "")}-100)`,
        }}
      >
        {getScoreLabel(score)}
      </span>
    </div>
  );
}
