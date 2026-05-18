"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import type { Discussion, Comment } from "@/lib/types";
import { MessageCircle, Pin, Plus, Send } from "lucide-react";
import { format } from "date-fns";

const STORAGE_KEY = "social-beast-discussions";

function getDiscussions(): Discussion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultDiscussions;
  } catch {
    return defaultDiscussions;
  }
}

function saveDiscussions(d: Discussion[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}

const defaultDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Best time to post on Twitter for family travel content?",
    content: "I've been experimenting with posting times. What works best for you all?",
    author: "Sarah",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    pinned: true,
    comments: [
      {
        id: "c1",
        content: "9 AM HKT seems to get most engagement for me!",
        author: "Mike",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
  {
    id: "2",
    title: "Telegram channel growth tips",
    content: "How are you all growing your travel Telegram channels?",
    author: "Alex",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    pinned: false,
    comments: [],
  },
];

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>(defaultDiscussions);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

  useEffect(() => {
    setDiscussions(getDiscussions());
  }, []);

  const handleCreatePost = () => {
    if (!newTitle.trim()) return;
    const post: Discussion = {
      id: crypto.randomUUID?.() || `${Date.now()}`,
      title: newTitle,
      content: newContent,
      author: "You",
      createdAt: new Date().toISOString(),
      pinned: false,
      comments: [],
    };
    const updated = [post, ...discussions];
    setDiscussions(updated);
    saveDiscussions(updated);
    setNewTitle("");
    setNewContent("");
    setShowNewPost(false);
  };

  const handleAddComment = (discussionId: string) => {
    const text = commentTexts[discussionId] || "";
    if (!text.trim()) return;
    const comment: Comment = {
      id: crypto.randomUUID?.() || `${Date.now()}-c`,
      content: text,
      author: "You",
      createdAt: new Date().toISOString(),
    };
    const updated = discussions.map((d) =>
      d.id === discussionId
        ? { ...d, comments: [...d.comments, comment] }
        : d
    );
    setDiscussions(updated);
    saveDiscussions(updated);
    setCommentTexts((prev) => ({ ...prev, [discussionId]: "" }));
  };

  const sortedDiscussions = [...discussions].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-cream">Community</h1>
          <p className="text-sm text-muted mt-1">
            Discuss strategies, share tips, and connect
          </p>
        </div>
        <button onClick={() => setShowNewPost(!showNewPost)} className="btn-primary">
          <Plus size={16} />
          <span className="hidden sm:inline">New Discussion</span>
        </button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className="card p-4 mb-6 animate-slide-up">
          <div className="space-y-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Discussion title..."
              className="input-field text-sm"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              className="input-field resize-none text-sm"
            />
            <div className="flex gap-2">
              <button onClick={handleCreatePost} className="btn-primary text-sm">
                <Send size={14} /> Post
              </button>
              <button onClick={() => setShowNewPost(false)} className="btn-secondary text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discussions */}
      <div className="space-y-4">
        {sortedDiscussions.map((discussion) => {
          const isExpanded = expandedId === discussion.id;
          const commentText = commentTexts[discussion.id] || "";

          return (
            <div key={discussion.id} className="card p-4 md:p-5 animate-fade-in">
              <div className="flex items-start gap-3">
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : discussion.id)
                  }
                  className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <MessageCircle size={16} className="text-accent" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {discussion.pinned && (
                      <Pin size={14} className="text-highlight" />
                    )}
                    <h3 className="font-semibold text-ink dark:text-cream text-sm">
                      {discussion.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted mb-2">{discussion.content}</p>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{discussion.author}</span>
                    <span>•</span>
                    <span>{format(new Date(discussion.createdAt), "MMM d")}</span>
                    <span>•</span>
                    <span>{discussion.comments.length} comments</span>
                  </div>
                </div>
              </div>

              {/* Comments */}
              {isExpanded && (
                <div className="mt-4 pl-11 space-y-3 animate-slide-up">
                  {discussion.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-surface-hover dark:bg-dark-surface-2 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-ink dark:text-cream">
                          {comment.author}
                        </span>
                        <span className="text-xs text-muted">
                          {format(new Date(comment.createdAt), "MMM d, h:mm a")}
                        </span>
                      </div>
                      <p className="text-sm text-muted">{comment.content}</p>
                    </div>
                  ))}

                  {/* Comment Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) =>
                        setCommentTexts((prev) => ({
                          ...prev,
                          [discussion.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddComment(discussion.id);
                      }}
                      placeholder="Write a comment..."
                      className="input-field text-sm flex-1"
                    />
                    <button
                      onClick={() => handleAddComment(discussion.id)}
                      className="btn-primary !px-3"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
