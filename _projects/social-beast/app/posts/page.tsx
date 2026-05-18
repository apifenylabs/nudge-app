"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import PostCard from "@/components/PostCard";
import { getPosts, archivePost, deletePost } from "@/lib/posts";
import type { Post, Platform, PostStatus } from "@/lib/types";
import { Search, Filter, Archive, Trash2, CheckSquare } from "lucide-react";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [statusFilter, setStatusFilter] = useState<PostStatus | "all">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    getPosts().then((p) => {
      setPosts(p);
      setFiltered(p);
    });
  }, []);

  useEffect(() => {
    let result = posts;
    if (search) {
      result = result.filter((p) =>
        p.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (platformFilter !== "all") {
      result = result.filter((p) => p.platform === platformFilter);
    }
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }
    setFiltered(result);
  }, [search, platformFilter, statusFilter, posts]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkArchive = async () => {
    for (const id of selectedIds) {
      await archivePost(id);
    }
    setSelectedIds(new Set());
    setPosts(await getPosts());
  };

  const handleBulkDelete = async () => {
    for (const id of selectedIds) {
      await deletePost(id);
    }
    setSelectedIds(new Set());
    setPosts(await getPosts());
  };

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-cream">All Posts</h1>
        <span className="text-sm text-muted">{filtered.length} posts</span>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="input-field pl-9 py-2 text-sm"
            />
          </div>
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as Platform | "all")}
            className="input-field py-2 text-sm"
          >
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="telegram">Telegram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="blog">Blog</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PostStatus | "all")}
            className="input-field py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="posted">Posted</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="text-sm text-muted">
              {selectedIds.size} selected
            </span>
            <button onClick={handleBulkArchive} className="btn-secondary text-xs">
              <Archive size={14} /> Archive
            </button>
            <button onClick={handleBulkDelete} className="btn-secondary text-xs text-red-400">
              <Trash2 size={14} /> Delete
            </button>
            <button onClick={() => setSelectedIds(new Set())} className="btn-ghost text-xs">
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Filter size={32} className="mx-auto mb-3 text-muted" />
          <p className="text-muted text-sm">No posts found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((post) => (
            <div key={post.id} className="relative group">
              <button
                onClick={() => toggleSelect(post.id)}
                className={`absolute top-3 left-3 z-10 w-5 h-5 rounded border-2 transition-all duration-150 ${
                  selectedIds.has(post.id)
                    ? "bg-accent border-accent"
                    : "border-muted/50 opacity-0 group-hover:opacity-100"
                }`}
              >
                {selectedIds.has(post.id) && (
                  <CheckSquare size={14} className="text-white" />
                )}
              </button>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
