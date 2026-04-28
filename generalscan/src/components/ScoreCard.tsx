"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
} from "@/components/ui/progress";
import { getScoreColor, getScoreBgColor, getScoreLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ScoreBreakdown } from "@/lib/types";

interface ScoreCardProps {
  title: string;
  score: number;
  breakdown?: ScoreBreakdown[];
  grade?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ScoreCard({ title, score, breakdown, grade, icon, className }: ScoreCardProps) {
  const normalizedScore = Math.round(Math.max(0, Math.min(100, score)));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-muted-foreground">{icon}</span>}
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          {grade && (
            <span
              className={cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white",
                getScoreBgColor(normalizedScore)
              )}
            >
              {grade}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-3">
          <span className={cn("text-3xl font-bold", getScoreColor(normalizedScore))}>
            {normalizedScore}
          </span>
          <span className="text-sm text-muted-foreground">/ 100</span>
          <span
            className={cn(
              "ml-auto text-xs font-medium px-2 py-0.5 rounded-full",
              normalizedScore >= 60
                ? "bg-green-100 text-green-700"
                : normalizedScore >= 40
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {getScoreLabel(normalizedScore)}
          </span>
        </div>

        {/* Progress bar */}
        <Progress value={normalizedScore} className="flex-col gap-0">
          <ProgressTrack className="h-2 w-full">
            <ProgressIndicator
              className={cn("h-full rounded-full", getScoreBgColor(normalizedScore))}
              style={{ width: `${normalizedScore}%` }}
            />
          </ProgressTrack>
        </Progress>

        {breakdown && breakdown.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground truncate mr-2">{item.factor}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", getScoreBgColor(item.score))}
                      style={{ width: `${(item.score / item.max) * 100}%` }}
                    />
                  </div>
                  <span className="tabular-nums text-muted-foreground min-w-[3ch] text-right">
                    {item.score}/{item.max}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ScoreCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-9 w-20 bg-muted rounded animate-pulse mb-3" />
        <div className="h-2 w-full bg-muted rounded animate-pulse" />
        <div className="mt-3 space-y-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
