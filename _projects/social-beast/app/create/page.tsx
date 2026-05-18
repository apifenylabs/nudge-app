"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import PostForm from "@/components/PostForm";
import { publishToMultiplePlatforms } from "@/lib/publish";
import { Sparkles } from "lucide-react";

function CreatePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialContent = searchParams.get("content") || "";

  const handleSubmit = async (data: {
    content: string;
    platforms: string[];
    scheduleFor?: string;
    mediaUrls: string[];
  }) => {
    const results = await publishToMultiplePlatforms(
      data.content,
      data.platforms as any,
      data.mediaUrls,
      data.scheduleFor
    );
    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    if (failCount > 0) {
      alert(`Posted to ${successCount} platform(s). ${failCount} failed.`);
    }

    router.push("/");
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-cream">Create Post</h1>
        <p className="text-sm text-muted mt-1">
          Compose and publish across your platforms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PostForm onSubmit={handleSubmit} initialContent={initialContent} />
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-medium text-ink dark:text-cream mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-highlight" />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-xs text-muted">
              <li>• Keep tweets under 280 characters</li>
              <li>• Use emojis to boost engagement 25%</li>
              <li>• Post between 9 AM - 11 AM for best reach</li>
              <li>• Add 2-3 hashtags for discovery</li>
              <li>• Images increase clicks by 42%</li>
            </ul>
          </div>

          <div className="card p-4">
            <h3 className="text-sm font-medium text-ink dark:text-cream mb-3">
              Character Limits
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Twitter / X</span>
                <span className="font-mono text-ink dark:text-cream">280</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Telegram</span>
                <span className="font-mono text-ink dark:text-cream">4,096</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">LinkedIn</span>
                <span className="font-mono text-ink dark:text-cream">3,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Instagram</span>
                <span className="font-mono text-ink dark:text-cream">2,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Blog</span>
                <span className="font-mono text-ink dark:text-cream">10,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full" />
        </div>
      </AppShell>
    }>
      <CreatePageContent />
    </Suspense>
  );
}
