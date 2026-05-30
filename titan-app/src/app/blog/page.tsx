"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  User,
  TrendingUp,
  Bot,
  Sparkles,
  Cpu,
  Shield,
  Zap,
  BookOpen,
  ChevronRight,
  Heart,
  MessageCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { cn } from "@/lib/utils";
import { POSTS, CATEGORIES, getCategoryInfo, type BlogPost } from "@/lib/blog-data";

// ─── Category Icons ──────────────────────────────────────────────────────

const CATEGORIES_WITH_ICONS = CATEGORIES.map((c) => ({
  ...c,
  icon: (() => {
    switch (c.id) {
      case "tutorials":
        return <BookOpen className="h-4 w-4" />;
      case "guides":
        return <Zap className="h-4 w-4" />;
      case "updates":
        return <Sparkles className="h-4 w-4" />;
      case "ai-tips":
        return <Cpu className="h-4 w-4" />;
      case "community":
        return <Heart className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  })(),
}));

// ─── Blog Page ───────────────────────────────────────────────────────────

export default function BlogPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-violet-200/30 bg-gradient-to-b from-violet-950 via-violet-900 to-purple-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.1),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 border-violet-400/30 bg-violet-500/10 text-violet-200">
              <Sparkles className="mr-1 h-3 w-3" />
              Titan Blog
            </Badge>
            <h1 className="bg-gradient-to-r from-white via-violet-100 to-pink-100 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
              Insights &amp; Updates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-200/70">
              Tutorials, product deep-dives, community stories, and everything you need to master AI agent building on Titan.
            </p>
          </motion.div>

          {/* ─── Search Bar ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-400" />
              <Input
                type="text"
                placeholder="Search articles, tags, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full border-violet-400/20 bg-violet-900/40 pl-11 text-white placeholder:text-violet-400/50 focus:border-violet-400/50 focus:ring-violet-400/20"
              />
            </div>
          </motion.div>

          {/* ─── Category Filter ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES_WITH_ICONS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  track("blog_category_filter", { category: cat.id });
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                    : "border border-violet-400/20 bg-violet-900/30 text-violet-300 hover:border-violet-400/40 hover:bg-violet-800/40"
                )}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Post Grid ──────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-purple-950 via-violet-950 to-violet-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-sm text-violet-300/60"
          >
            {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            {searchQuery && <> for &ldquo;{searchQuery}&rdquo;</>}
          </motion.p>

          {/* Featured posts (large cards) */}
          {featuredPosts.length > 0 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mb-12 grid gap-6 md:grid-cols-2"
            >
              {featuredPosts.map((post) => (
                <motion.div key={post.slug} variants={itemAnim}>
                  <Link href={`/blog/${post.slug}`} onClick={() => track("blog_click_featured", { slug: post.slug })}>
                    <Card className="group relative overflow-hidden border-violet-400/20 bg-gradient-to-br from-violet-900/60 to-purple-900/40 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-500/10">
                      {/* Featured badge */}
                      <div className="absolute right-3 top-3 z-10">
                        <Badge className="border-amber-400/30 bg-amber-500/15 text-amber-300">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      </div>

                      {/* Illustration placeholder */}
                      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-violet-800/40 to-purple-800/30 sm:h-56">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-700/30 text-4xl">
                          {getCategoryIcon(post.category)}
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="mb-3 flex items-center gap-3 text-xs text-violet-300/60">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <Badge className="mb-3 border-violet-400/20 bg-violet-500/10 text-violet-300">
                          {getCategoryInfo(post.category).name}
                        </Badge>

                        <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-violet-200">
                          {post.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-violet-300/60">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-violet-400/50">
                            <span className="inline-flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatCount(post.views)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {post.comments}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-300 transition-colors group-hover:text-violet-200">
                            Read more
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Regular posts (3-column grid) */}
          {regularPosts.length > 0 && (
            <>
              {featuredPosts.length > 0 && (
                <div className="mb-8 flex items-center gap-3">
                  <Separator className="flex-1 bg-violet-400/10" />
                  <span className="whitespace-nowrap text-sm text-violet-300/40">More Articles</span>
                  <Separator className="flex-1 bg-violet-400/10" />
                </div>
              )}

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {regularPosts.map((post) => (
                  <motion.div key={post.slug} variants={itemAnim}>
                    <Link href={`/blog/${post.slug}`} onClick={() => track("blog_click_article", { slug: post.slug })}>
                      <Card className="group h-full overflow-hidden border-violet-400/20 bg-gradient-to-b from-violet-900/50 to-purple-900/30 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/10">
                        {/* Illustration placeholder */}
                        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-violet-800/30 to-purple-800/20 sm:h-44">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-700/30 text-3xl">
                            {getCategoryIcon(post.category)}
                          </div>
                        </div>

                        <CardContent className="p-5">
                          <div className="mb-2 flex items-center gap-2 text-xs text-violet-300/50">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>

                          <Badge className="mb-2 border-violet-400/20 bg-violet-500/10 text-xs text-violet-300">
                            {getCategoryInfo(post.category).name}
                          </Badge>

                          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-white transition-colors group-hover:text-violet-200">
                            {post.title}
                          </h3>
                          <p className="mb-3 line-clamp-2 text-xs text-violet-300/50">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between border-t border-violet-400/10 pt-3">
                            <div className="flex items-center gap-2 text-[11px] text-violet-400/40">
                              <span className="inline-flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {formatCount(post.views)}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.comments}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-300/60 transition-colors group-hover:text-violet-200">
                              Read
                              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {/* No results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <BookOpen className="mb-4 h-12 w-12 text-violet-400/30" />
              <h3 className="mb-2 text-xl font-semibold text-white">No articles found</h3>
              <p className="mb-6 text-sm text-violet-300/50">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="border-violet-400/30 text-violet-300 hover:bg-violet-800/40"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* ─── Newsletter CTA ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-2xl rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-900/60 to-purple-900/40 p-8 text-center backdrop-blur-sm"
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-violet-400" />
            <h3 className="mb-2 text-2xl font-bold text-white">Stay Ahead of the Curve</h3>
            <p className="mb-6 text-sm text-violet-300/60">
              Get the latest Titan tutorials, product updates, and community highlights delivered to your inbox every week.
            </p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 border-violet-400/20 bg-violet-900/40 text-white placeholder:text-violet-400/50 focus:border-violet-400/50"
              />
              <Button className="h-11 bg-violet-500 text-white hover:bg-violet-600">
                Subscribe
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-violet-400/40">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-violet-800/20 bg-violet-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-violet-400/40">
              &copy; {new Date().getFullYear()} Titan. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-xs text-violet-400/40 transition-colors hover:text-violet-300">
                Home
              </Link>
              <Link href="/pricing" className="text-xs text-violet-400/40 transition-colors hover:text-violet-300">
                Pricing
              </Link>
              <Link href="/privacy" className="text-xs text-violet-400/40 transition-colors hover:text-violet-300">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    tutorials: "📖",
    guides: "🗺️",
    updates: "🚀",
    "ai-tips": "🧠",
    community: "💬",
  };
  return icons[category] || "📝";
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}
