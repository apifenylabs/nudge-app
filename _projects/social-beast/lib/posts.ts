import type { Post, Platform, PostStatus } from "./types";

// ───── Storage Helpers ─────────────────────────────────────────────────────

const STORAGE_KEY = "social-beast-posts";

function getAllFromStorage(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAllToStorage(posts: Post[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// ───── CRUD (async for future Supabase swap) ───────────────────────────────

export async function getPosts(): Promise<Post[]> {
  return getAllFromStorage();
}

export async function getPost(id: string): Promise<Post | undefined> {
  return getAllFromStorage().find((p) => p.id === id);
}

export async function createPost(post: Omit<Post, "id" | "createdAt" | "updatedAt" | "engagement">): Promise<Post> {
  const newPost: Post = {
    ...post,
    id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    engagement: { likes: 0, shares: 0, clicks: 0, impressions: 0 },
  };
  const posts = getAllFromStorage();
  posts.unshift(newPost);
  saveAllToStorage(posts);
  return newPost;
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | undefined> {
  const posts = getAllFromStorage();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  posts[idx] = { ...posts[idx], ...updates, updatedAt: new Date().toISOString() };
  saveAllToStorage(posts);
  return posts[idx];
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = getAllFromStorage();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  saveAllToStorage(filtered);
  return true;
}

export async function archivePost(id: string): Promise<Post | undefined> {
  return updatePost(id, { status: "archived" });
}

export async function getPostsByPlatform(platform: Platform): Promise<Post[]> {
  return getAllFromStorage().filter((p) => p.platform === platform);
}

export async function getPostsByStatus(status: PostStatus): Promise<Post[]> {
  return getAllFromStorage().filter((p) => p.status === status);
}

export async function getScheduledPosts(): Promise<Post[]> {
  return getAllFromStorage().filter(
    (p) => p.status === "scheduled" && p.scheduledFor
  );
}

export async function getRecentPosts(limit = 10): Promise<Post[]> {
  return getAllFromStorage().slice(0, limit);
}

// ───── Stats ───────────────────────────────────────────────────────────────

export async function getPostStats(): Promise<{
  total: number;
  posted: number;
  scheduled: number;
  draft: number;
  archived: number;
}> {
  const posts = getAllFromStorage();
  return {
    total: posts.length,
    posted: posts.filter((p) => p.status === "posted").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    draft: posts.filter((p) => p.status === "draft").length,
    archived: posts.filter((p) => p.status === "archived").length,
  };
}
