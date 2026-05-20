"use client";

import { useEffect, useState, useCallback } from "react";
import AppShell from "@/components/AppShell";
import CalendarView from "@/components/CalendarView";
import { getScheduledPosts } from "@/lib/posts";
import { generateWeek, getWeeklySchedule } from "@/lib/calendar-generator";
import { CONTENT_BUCKETS } from "@/lib/content-buckets";
import type { Post, Platform } from "@/lib/types";
import { format } from "date-fns";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Calendar as CalendarIcon,
  Clock,
  Globe,
  CheckCircle2,
  List,
  Plus,
  Target,
  MessageCircle,
  Linkedin,
  Camera,
  FileText,
  Twitter,
  AlertCircle,
} from "lucide-react";

const PLATFORM_ICONS: Record<string, any> = {
  twitter: Twitter,
  telegram: MessageCircle,
  linkedin: Linkedin,
  instagram: Camera,
  blog: FileText,
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CalendarPage() {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [postsForDay, setPostsForDay] = useState<Post[]>([]);
  const [showBuckets, setShowBuckets] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState<{ generated: number; posts: Post[] } | null>(null);
  const [genError, setGenError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    const posts = await getScheduledPosts();
    setScheduledPosts(posts);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const key = format(date, "yyyy-MM-dd");
    const dayPosts = scheduledPosts.filter(
      (p) => p.scheduledFor && format(new Date(p.scheduledFor), "yyyy-MM-dd") === key
    );
    setPostsForDay(dayPosts);
  };

  const handleGenerateWeek = async () => {
    setGenerating(true);
    setGenError(null);
    try {
      const result = await generateWeek();
      setGenResult(result);
      // Reload posts to show new ones
      await loadPosts();
    } catch (err) {
      setGenError("Failed to generate posts. Please try again.");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const selectedBucketData = selectedBucket
    ? CONTENT_BUCKETS.find((b) => b.id === selectedBucket)
    : null;

  const schedule = getWeeklySchedule();

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-cream">Content Calendar</h1>
          <p className="text-sm text-muted mt-1">
            {scheduledPosts.length} post{scheduledPosts.length !== 1 ? "s" : ""} scheduled
          </p>
        </div>
        <button
          onClick={handleGenerateWeek}
          disabled={generating}
          className="btn-primary"
        >
          {generating ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          {generating ? "Generating..." : "Generate Week"}
        </button>
      </div>

      {/* Generation Result Toast */}
      {genResult && (
        <div className="card p-4 mb-6 border-l-4 border-accent bg-accent/5 animate-slide-up flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-accent shrink-0" />
            <div>
              <p className="text-sm font-medium text-ink dark:text-cream">
                Generated {genResult.generated} draft posts for the next 7 days
              </p>
              <p className="text-xs text-muted mt-0.5">
                Starting Monday — edit and review in the Posts tab before publishing
              </p>
            </div>
          </div>
          <button
            onClick={() => setGenResult(null)}
            className="text-muted hover:text-ink dark:hover:text-cream text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Error Toast */}
      {genError && (
        <div className="card p-4 mb-6 border-l-4 border-red-400 bg-red-50 dark:bg-red-900/10 animate-slide-up flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-red-400 shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">{genError}</p>
          </div>
          <button
            onClick={() => setGenError(null)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Sidebar — Content Strategy */}
        <div className="xl:col-span-1 order-2 xl:order-1 space-y-4">
          {/* Posting Schedule */}
          <div className="card p-4">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-sm font-semibold text-ink dark:text-cream flex items-center gap-2">
                <Clock size={14} className="text-accent" />
                Weekly Schedule
              </h2>
              {showSchedule ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
            </button>
            {showSchedule && (
              <div className="mt-3 space-y-2 animate-fade-in">
                {schedule.map((day) => (
                  <div key={day.dayOfWeek} className="border-b border-border dark:border-dark-border pb-2 last:border-0 last:pb-0">
                    <p className="text-xs font-medium text-ink dark:text-cream mb-1">{DAY_NAMES[day.dayOfWeek]}</p>
                    {day.slots.map((slot, i) => {
                      const Icon = PLATFORM_ICONS[slot.platform] || Globe;
                      const bucket = CONTENT_BUCKETS.find((b) => b.id === slot.bucketId);
                      return (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted ml-2 mb-0.5">
                          <span className="font-mono">{String(slot.time.hour).padStart(2, "0")}:{String(slot.time.minute).padStart(2, "0")}</span>
                          <Icon size={10} />
                          <span>{bucket?.emoji || ""} {slot.bucketId?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || slot.bucketId}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Platform Calendar View (mini) */}
          <div className="card p-4">
            <h2 className="text-sm font-semibold text-ink dark:text-cream flex items-center gap-2 mb-3">
              <Globe size={14} className="text-accent" />
              Platform Distribution
            </h2>
            <div className="space-y-2">
              {(["twitter", "linkedin", "telegram", "instagram", "blog"] as Platform[]).map((platform) => {
                const count = scheduledPosts.filter((p) => p.platform === platform).length;
                const pct = scheduledPosts.length > 0 ? Math.round((count / scheduledPosts.length) * 100) : 0;
                const Icon = PLATFORM_ICONS[platform] || Globe;
                const platformNames: Record<string, string> = {
                  twitter: "Twitter/X",
                  telegram: "Telegram",
                  linkedin: "LinkedIn",
                  instagram: "Instagram",
                  blog: "Blog",
                };
                return (
                  <div key={platform} className="flex items-center gap-2">
                    <Icon size={12} className="text-muted shrink-0" />
                    <span className="text-xs text-muted flex-1">{platformNames[platform]}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-border dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-mono text-ink dark:text-cream w-6 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Buckets */}
          <div className="card p-4">
            <button
              onClick={() => setShowBuckets(!showBuckets)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-sm font-semibold text-ink dark:text-cream flex items-center gap-2">
                <Target size={14} className="text-accent" />
                Content Buckets
              </h2>
              {showBuckets ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
            </button>
            {showBuckets && (
              <div className="mt-3 space-y-1 animate-fade-in">
                {CONTENT_BUCKETS.map((bucket) => {
                  const count = scheduledPosts.filter((p) => p.content.includes(bucket.emoji) || p.content.toLowerCase().includes(bucket.name.toLowerCase())).length;
                  return (
                    <button
                      key={bucket.id}
                      onClick={() => setSelectedBucket(selectedBucket === bucket.id ? null : bucket.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                        selectedBucket === bucket.id
                          ? "bg-accent/10 text-accent"
                          : "text-muted hover:text-ink dark:hover:text-cream hover:bg-surface-hover dark:hover:bg-dark-surface-2"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{bucket.emoji}</span>
                        <span>{bucket.name}</span>
                      </span>
                      <span className="font-mono">{bucket.frequency}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Bucket Details */}
          {selectedBucketData && (
            <div className="card p-4 animate-fade-in">
              <h3 className="text-sm font-semibold text-ink dark:text-cream mb-1">
                {selectedBucketData.emoji} {selectedBucketData.name}
              </h3>
              <p className="text-xs text-muted mb-2">{selectedBucketData.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-green text-[10px]">{selectedBucketData.frequency}</span>
                <span className="text-[10px] text-muted">Tone: {selectedBucketData.tone}</span>
              </div>
              <p className="text-xs font-medium text-muted mb-2">Best platforms:</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedBucketData.bestPlatforms.map((p) => {
                  const Icon = PLATFORM_ICONS[p] || Globe;
                  return (
                    <span key={p} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/5 text-accent text-[10px]">
                      <Icon size={10} />
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </span>
                  );
                })}
              </div>

              <p className="text-xs font-medium text-muted mb-2">Templates ({selectedBucketData.templates.length}):</p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedBucketData.templates.map((tpl) => (
                  <div key={tpl.id} className="card p-2.5 border border-border/50">
                    <p className="text-xs font-medium text-ink dark:text-cream mb-1">{tpl.title}</p>
                    <p className="text-[10px] text-muted line-clamp-2 font-mono leading-relaxed">{tpl.body}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {tpl.platforms.map((platform) => {
                        const Icon = PLATFORM_ICONS[platform] || Globe;
                        return <Icon key={platform} size={10} className="text-muted" />;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Week Details */}
          <div className="card p-4">
            <h2 className="text-sm font-semibold text-ink dark:text-cream flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-highlight" />
              Generate Week
            </h2>
            <p className="text-xs text-muted mb-3">
              Auto-creates draft posts for Monday through Sunday this week using your content buckets and optimal posting schedule.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted">
              <CalendarIcon size={12} />
              <span>Posts for next 7 days starting Monday</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted mt-1">
              <List size={12} />
              <span>~12-14 posts generated</span>
            </div>
          </div>
        </div>

        {/* Main Content — Calendar Grid */}
        <div className="xl:col-span-2 order-1 xl:order-2">
          <CalendarView posts={scheduledPosts} onDayClick={handleDayClick} />
        </div>

        {/* Right Sidebar — Day Details */}
        <div className="xl:col-span-1 order-3 space-y-4">
          <div className="card p-4 md:p-5">
            <h2 className="text-lg font-semibold text-ink dark:text-cream mb-4 flex items-center gap-2">
              <CalendarIcon size={16} className="text-accent" />
              {selectedDate
                ? format(selectedDate, "MMMM d, yyyy")
                : "Select a day"}
            </h2>
            {postsForDay.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon size={28} className="mx-auto mb-2 text-muted opacity-50" />
                <p className="text-sm text-muted">
                  {selectedDate
                    ? "No posts scheduled for this day."
                    : "Click on a day to see scheduled posts."}
                </p>
                {selectedDate && (
                  <p className="text-xs text-muted mt-1">
                    Try &ldquo;Generate Week&rdquo; to fill your calendar
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {postsForDay.sort((a, b) => {
                  if (!a.scheduledFor) return 1;
                  if (!b.scheduledFor) return -1;
                  return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime();
                }).map((post) => {
                  const Icon = PLATFORM_ICONS[post.platform] || Globe;
                  const statusColors: Record<string, string> = {
                    draft: "badge-gray",
                    scheduled: "badge-amber",
                    posted: "badge-green",
                    archived: "badge-gray",
                  };
                  return (
                    <div key={post.id} className="card p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <Icon size={12} className="text-accent" />
                          <span className="text-[10px] font-medium text-muted uppercase">{post.platform}</span>
                        </div>
                        <span className={statusColors[post.status] || "badge-gray"}>
                          {post.status}
                        </span>
                      </div>
                      {post.scheduledFor && (
                        <div className="flex items-center gap-1 mb-1.5">
                          <Clock size={10} className="text-muted" />
                          <span className="text-[10px] text-muted font-mono">
                            {format(new Date(post.scheduledFor), "h:mm a")}
                          </span>
                        </div>
                      )}
                      <p className="text-sm text-ink dark:text-cream line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Stats for selected day */}
          {selectedDate && (
            <div className="card p-4">
              <h3 className="text-sm font-medium text-ink dark:text-cream mb-3">
                Day Overview
              </h3>
              <div className="space-y-2 text-xs">
                {(["twitter", "linkedin", "telegram", "instagram"] as Platform[]).map((platform) => {
                  const count = postsForDay.filter((p) => p.platform === platform).length;
                  const Icon = PLATFORM_ICONS[platform] || Globe;
                  return (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted">
                        <Icon size={10} /> {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                      <span className={`font-mono ${count > 0 ? "text-accent" : "text-muted"}`}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
