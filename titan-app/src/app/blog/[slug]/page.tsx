"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  User,
  Heart,
  MessageCircle,
  Eye,
  BookOpen,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { POSTS, type BlogPost } from "@/lib/blog-data";
import { BLOG_CONTENT } from "@/content/blog";

// ─── Related Posts ───────────────────────────────────────────────────────

function getRelatedPosts(current: BlogPost, limit = 3): BlogPost[] {
  return POSTS.filter(
    (p) => p.slug !== current.slug && (p.category === current.category || p.tags.some((t) => current.tags.includes(t)))
  ).slice(0, limit);
}

// ─── Blog Detail Page ────────────────────────────────────────────────────

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const post = POSTS.find((p) => p.slug === slug);
  const content = BLOG_CONTENT[slug];

  if (!post) {
    return (
      <>
        <BreadcrumbJsonLd
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Not Found", href: `/blog/${slug}` },
          ]}
        />
        <main className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-950 to-slate-950">
          <div className="mx-auto max-w-3xl px-4 pt-40 text-center">
            <h1 className="bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-5xl font-bold text-transparent">
              Post Not Found
            </h1>
            <p className="mt-4 text-lg text-violet-300/70">
              The article you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button
              variant="outline"
              className="mt-8 border-violet-500/30 text-violet-200 hover:bg-violet-500/10"
              onClick={() => router.push("/blog")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </main>
      </>
    );
  }

  const relatedPosts = getRelatedPosts(post);
  const categoryColors: Record<string, string> = {
    tutorials: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10",
    guides: "border-amber-500/30 text-amber-300 bg-amber-500/10",
    updates: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
    "ai-tips": "border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/10",
    community: "border-rose-500/30 text-rose-300 bg-rose-500/10",
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <main className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-950 to-slate-950">
        {/* ─── Back Navigation ─────────────────────────── */}

        <div className="mx-auto max-w-4xl px-4 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-violet-400 transition-colors hover:text-violet-200"
            onClick={() => track("blog_back_to_list", { slug: post.slug })}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>

        {/* ─── Hero ────────────────────────────────────── */}

        <section className="relative overflow-hidden border-b border-violet-200/20 pb-12 pt-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.08),transparent_60%)]" />

          <div className="mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category + Tags */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "border px-3 py-1 text-xs font-medium",
                    categoryColors[post.category] || "border-violet-500/30 text-violet-300 bg-violet-500/10"
                  )}
                >
                  {post.category}
                </Badge>
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300/70"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-violet-300/60">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {post.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments} comments
                </span>
              </div>

              {/* Excerpt */}
              <p className="mt-6 text-lg leading-relaxed text-violet-200/70">
                {post.excerpt}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Content ─────────────────────────────────── */}

        {content && content.sections.length > 0 ? (
          <section className="mx-auto max-w-4xl px-4 py-12">
            <div className="space-y-10">
              {content.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {section.title && (
                    <h2 className="mb-4 text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                  )}

                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="mb-3 text-base leading-relaxed text-violet-200/80 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}

                  {section.list && section.list.length > 0 && (
                    <ul
                      className={
                        section.type === "tip" || section.type === "warning"
                          ? "mt-4 space-y-2 rounded-lg border p-4"
                          : "mt-4 space-y-2"
                      }
                      style={{
                        borderColor:
                          section.type === "tip"
                            ? "rgba(34, 211, 238, 0.25)"
                            : section.type === "warning"
                              ? "rgba(251, 191, 36, 0.25)"
                              : undefined,
                        backgroundColor:
                          section.type === "tip"
                            ? "rgba(34, 211, 238, 0.05)"
                            : section.type === "warning"
                              ? "rgba(251, 191, 36, 0.05)"
                              : undefined,
                      }}
                    >
                      {section.type === "tip" && (
                        <li className="mb-2 text-sm font-semibold text-cyan-300">
                          💡 Pro Tip
                        </li>
                      )}
                      {section.type === "warning" && (
                        <li className="mb-2 text-sm font-semibold text-amber-300">
                          ⚠️ Important
                        </li>
                      )}
                      {section.list.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-2 text-base text-violet-200/80"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>

            {/* ─── Share / Engage ──────────────────────── */}
            <Separator className="my-12 bg-violet-500/20" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-violet-500/30 text-violet-200 hover:bg-violet-500/10"
                  onClick={() => track("blog_like", { slug: post.slug })}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-violet-500/30 text-violet-200 hover:bg-violet-500/10"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    track("blog_share_copy", { slug: post.slug });
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>

              <Link
                href="/blog"
                className="flex items-center gap-1 text-sm text-violet-400 transition-colors hover:text-violet-200"
              >
                <BookOpen className="h-4 w-4" />
                View all articles
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-4xl px-4 py-12">
            <p className="text-center text-violet-300/50">
              Full content coming soon. Check back for the complete article.
            </p>
          </section>
        )}

        {/* ─── Related Posts ───────────────────────────── */}

        {relatedPosts.length > 0 && (
          <section className="border-t border-violet-200/20 bg-violet-950/30 py-16">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-8 text-2xl font-semibold text-white">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related, i) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Link
                      href={`/blog/${related.slug}`}
                      onClick={() => track("blog_click_related", { slug: related.slug })}
                      className="group block rounded-xl border border-violet-500/20 bg-violet-900/20 p-6 transition-all hover:border-violet-400/40 hover:bg-violet-800/20"
                    >
                      <Badge
                        variant="outline"
                        className={cn(
                          "mb-3 border px-2 py-0.5 text-xs font-medium",
                          categoryColors[related.category] || "border-violet-500/30 text-violet-300"
                        )}
                      >
                        {related.category}
                      </Badge>
                      <h3 className="line-clamp-2 text-base font-semibold text-white transition-colors group-hover:text-violet-200">
                        {related.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-violet-300/60">
                        {related.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-violet-400/50">
                        <span>{related.date}</span>
                        <span>{related.readTime}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── CTA ──────────────────────────────────────── */}

        <section className="border-t border-violet-200/20 py-16">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to build your own agent?
            </h2>
            <p className="mt-4 text-violet-200/70">
              Join thousands of creators building AI agents on Titan. No coding required.
            </p>
            <Link href="/">
              <Button className="mt-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-fuchsia-400">
                Get Started Free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

// ─── cn helper (local, avoids importing full lib) ────────────────────────

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
