import { MessageSquare, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { allPosts } from '@/lib/generated-blog-data'

const posts = allPosts

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">Nudge</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-600/25 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mb-4">
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Nudge Blog
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Tips, strategies, and insights for calmer, more organized households.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl p-6 block group hover:shadow-card-hover transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20 flex items-center justify-center text-xl shrink-0">
                    {post.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span>{post.readTime}</span>
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card-premium rounded-3xl p-10 shadow-elevated">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
              Ready to put these tips into action?
            </h2>
            <Link href="/auth/signup" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xl shadow-indigo-600/20 hover:brightness-110 transition-all inline-flex items-center gap-2">
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-foreground">Nudge</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/for/families" className="hover:text-foreground transition-colors">For Families</Link>
            <Link href="/for/working-parents" className="hover:text-foreground transition-colors">For Working Parents</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Nudge</p>
        </div>
      </footer>
    </div>
  )
}
