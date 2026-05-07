"use client";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/lib/types";

interface CalendarViewProps {
  posts: Post[];
  onDayClick?: (date: Date) => void;
}

export default function CalendarView({ posts, onDayClick }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const grouped = days.reduce<Record<string, Post[]>>((acc, day) => {
    const key = format(day, "yyyy-MM-dd");
    const dayPosts = posts.filter(
      (p) => p.scheduledFor && format(new Date(p.scheduledFor), "yyyy-MM-dd") === key
    );
    if (dayPosts.length > 0) acc[key] = dayPosts;
    return acc;
  }, {} as Record<string, Post[]>);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="card p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-ink dark:text-cream">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="btn-ghost p-2" aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="btn-secondary text-xs px-3 py-1.5"
          >
            Today
          </button>
          <button onClick={nextMonth} className="btn-ghost p-2" aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-muted py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-border dark:bg-dark-border rounded-lg overflow-hidden">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const dayPosts = grouped[key] || [];
          const isToday = isSameDay(day, new Date());
          const inMonth = isSameMonth(day, currentMonth);

          return (
            <button
              key={key}
              onClick={() => onDayClick?.(day)}
              className={`min-h-[60px] md:min-h-[80px] p-1.5 md:p-2 text-left transition-all duration-100 ${
                inMonth
                  ? "bg-surface dark:bg-dark-surface-2 hover:bg-surface-hover dark:hover:bg-dark-surface"
                  : "bg-muted/5 dark:bg-dark-surface-2/50"
              } ${isToday ? "ring-2 ring-accent/40 ring-inset" : ""}`}
            >
              <span
                className={`text-xs font-medium ${
                  isToday
                    ? "text-accent"
                    : inMonth
                    ? "text-ink dark:text-cream"
                    : "text-muted"
                }`}
              >
                {format(day, "d")}
              </span>
              {dayPosts.length > 0 && (
                <div className="mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold">
                    {dayPosts.length}
                  </span>
                  <div className="hidden md:block mt-1 space-y-0.5">
                    {dayPosts.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        className="text-[10px] truncate text-muted leading-tight"
                      >
                        {p.content.slice(0, 30)}...
                      </div>
                    ))}
                    {dayPosts.length > 2 && (
                      <div className="text-[10px] text-accent font-medium">
                        +{dayPosts.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
