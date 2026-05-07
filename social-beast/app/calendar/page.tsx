"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import CalendarView from "@/components/CalendarView";
import { getScheduledPosts } from "@/lib/posts";
import type { Post } from "@/lib/types";
import { format } from "date-fns";

export default function CalendarPage() {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [postsForDay, setPostsForDay] = useState<Post[]>([]);

  useEffect(() => {
    getScheduledPosts().then(setScheduledPosts);
  }, []);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const key = format(date, "yyyy-MM-dd");
    const dayPosts = scheduledPosts.filter(
      (p) => p.scheduledFor && format(new Date(p.scheduledFor), "yyyy-MM-dd") === key
    );
    setPostsForDay(dayPosts);
  };

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-cream">Content Calendar</h1>
        <span className="text-sm text-muted">
          {scheduledPosts.length} scheduled
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarView posts={scheduledPosts} onDayClick={handleDayClick} />
        </div>

        <div>
          <div className="card p-4 md:p-5">
            <h2 className="text-lg font-semibold text-ink dark:text-cream mb-4">
              {selectedDate
                ? format(selectedDate, "MMMM d, yyyy")
                : "Select a day"}
            </h2>
            {postsForDay.length === 0 ? (
              <p className="text-sm text-muted">
                {selectedDate
                  ? "No posts scheduled for this day."
                  : "Click on a day to see scheduled posts."}
              </p>
            ) : (
              <div className="space-y-3">
                {postsForDay.map((post) => (
                  <div key={post.id} className="card p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-amber text-[10px]">
                        {post.platform}
                      </span>
                      {post.scheduledFor && (
                        <span className="text-[10px] text-muted">
                          {format(new Date(post.scheduledFor), "h:mm a")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ink dark:text-cream line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
