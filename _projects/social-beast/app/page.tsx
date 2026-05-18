"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import StatsCard from "@/components/StatsCard";
import PostCard from "@/components/PostCard";
import { Send, FileText, CalendarClock, BarChart3, Twitter, MessageCircle, Linkedin, Camera, FileText as FileTextIcon } from "lucide-react";
import { getPostStats, getRecentPosts, getPosts } from "@/lib/posts";
import { getTotalStats } from "@/lib/analytics";
import type { Post, Platform } from "@/lib/types";

const PLATFORM_STATUS: { platform: Platform; label: string }[] = [
  { platform: "twitter", label: "Twitter / X" },
  { platform: "telegram", label: "Telegram" },
  { platform: "linkedin", label: "LinkedIn" },
  { platform: "instagram", label: "Instagram" },
  { platform: "blog", label: "Blog" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, posted: 0, scheduled: 0, draft: 0, archived: 0 });
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [totalEng, setTotalEng] = useState(0);
  const [quickPost, setQuickPost] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [s, posts, t] = await Promise.all([
      getPostStats(),
      getRecentPosts(5),
      getTotalStats(),
    ]);
    setStats(s);
    setRecentPosts(posts);
    setTotalEng(t.totalEngagement);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Social Beast?",
                "acceptedAnswer": { "@type": "Answer", "text": "Social Beast is a social media scheduling and analytics tool that helps you create, schedule, and track posts across Twitter, LinkedIn, Telegram, Instagram, and your blog from one dashboard." }
              },
              {
                "@type": "Question",
                "name": "Which platforms does Social Beast support?",
                "acceptedAnswer": { "@type": "Answer", "text": "Social Beast connects to Twitter/X, LinkedIn, Telegram, Instagram, and your own blog. More platforms are coming based on user requests." }
              },
              {
                "@type": "Question",
                "name": "Can I schedule posts in advance?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can create drafts, schedule posts for any future date and time, and manage your entire content calendar from the dashboard." }
              },
              {
                "@type": "Question",
                "name": "Does Social Beast provide analytics?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Track total engagement, post performance, and platform-level metrics to understand what content resonates with your audience." }
              }
            ]
          })
        }}
      />
      <AppShell>
      {/* Quick Create */}
      <div className="card p-4 md:p-5 mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={quickPost}
            onChange={(e) => setQuickPost(e.target.value)}
            placeholder="What's new? Type something to post..."
            className="input-field flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && quickPost.trim()) {
                window.location.href = `/create?content=${encodeURIComponent(quickPost)}`;
              }
            }}
          />
          <button
            onClick={() => {
              if (quickPost.trim()) {
                window.location.href = `/create?content=${encodeURIComponent(quickPost)}`;
              }
            }}
            className="btn-primary whitespace-nowrap"
          >
            <Send size={16} />
            <span className="hidden sm:inline">Quick Post</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatsCard
          title="Total Posts"
          value={stats.total}
          icon={<FileText size={18} className="text-accent" />}
        />
        <StatsCard
          title="Published"
          value={stats.posted}
          icon={<Send size={18} className="text-accent" />}
          trend="up"
          trendValue="12%"
        />
        <StatsCard
          title="Scheduled"
          value={stats.scheduled}
          icon={<CalendarClock size={18} className="text-highlight" />}
        />
        <StatsCard
          title="Drafts"
          value={stats.draft}
          icon={<BarChart3 size={18} className="text-muted" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-ink dark:text-cream mb-4">
            Recent Posts
          </h2>
          {recentPosts.length === 0 ? (
            <div className="card p-8 text-center">
              <FileTextIcon size={32} className="mx-auto mb-3 text-muted" />
              <p className="text-muted text-sm">
                No posts yet. Create your first post!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Platform Status */}
        <div>
          <h2 className="text-lg font-semibold text-ink dark:text-cream mb-4">
            Platform Status
          </h2>
          <div className="card p-4 space-y-3">
            {PLATFORM_STATUS.map(({ platform, label }) => {
              const connected = true; // Placeholder
              return (
                <div
                  key={platform}
                  className="flex items-center justify-between py-2 border-b border-border dark:border-dark-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        connected ? "bg-accent" : "bg-muted"
                      }`}
                    />
                    <span className="text-sm text-ink dark:text-cream">
                      {label}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      connected ? "text-accent" : "text-muted"
                    }`}
                  >
                    {connected ? "Connected" : "Disconnected"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="card p-4 mt-4">
            <h3 className="text-sm font-medium text-ink dark:text-cream mb-3">
              Engagement
            </h3>
            <p className="text-2xl font-bold text-accent">{totalEng}</p>
            <p className="text-xs text-muted mt-1">
              Total interactions across all posts
            </p>
          </div>
        </div>
      </div>
    </AppShell>
    </>
  );
}
