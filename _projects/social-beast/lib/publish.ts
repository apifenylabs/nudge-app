import type { Post, Platform } from "./types";
import { createPost, updatePost } from "./posts";
import { postToPlatform } from "./platforms";

// ───── Publish Logic ───────────────────────────────────────────────────────

interface PublishResult {
  success: boolean;
  postId: string;
  platform: Platform;
  error?: string;
}

/**
 * Publish a single post to its target platform.
 * Returns the result for logging/tracking.
 */
export async function publishPost(
  content: string,
  platform: Platform,
  mediaUrls: string[] = [],
  scheduleFor?: string
): Promise<PublishResult> {
  // 1. Create post record
  const post = await createPost({
    content,
    platform,
    mediaUrls,
    affiliateLinks: [],
    status: scheduleFor ? "scheduled" : "posted",
    scheduledFor: scheduleFor || null,
    postedAt: scheduleFor ? null : new Date().toISOString(),
  });

  // 2. If scheduled, don't actually publish yet
  if (scheduleFor) {
    return {
      success: true,
      postId: post.id,
      platform,
    };
  }

  // 3. Publish immediately
  try {
    const result = await postToPlatform(platform, content, mediaUrls);
    if (result.success) {
      await updatePost(post.id, {
        status: "posted",
        postedAt: new Date().toISOString(),
      });
    }
    return {
      success: result.success,
      postId: post.id,
      platform,
    };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    await updatePost(post.id, { status: "draft" });
    return {
      success: false,
      postId: post.id,
      platform,
      error,
    };
  }
}

/**
 * Publish same content to multiple platforms.
 */
export async function publishToMultiplePlatforms(
  content: string,
  platforms: Platform[],
  mediaUrls: string[] = [],
  scheduleFor?: string
): Promise<PublishResult[]> {
  return Promise.all(
    platforms.map((platform) =>
      publishPost(content, platform, mediaUrls, scheduleFor)
    )
  );
}
