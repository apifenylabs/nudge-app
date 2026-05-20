import { MessageSquare, CheckCircle, Zap, Mic, Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function WorkingParentsPage() {
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
          <Link href="/auth/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-600/25 transition-all">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6">
            AI Task Manager for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              Working Parents
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            Between back-to-back meetings and family logistics, there&rsquo;s no bandwidth for chore charts. Nudge uses AI to parse natural language tasks, assign them to family members, and send smart reminders — so you can focus on what matters.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/auth/signup" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xl shadow-indigo-600/20 hover:brightness-110 transition-all inline-flex items-center gap-2">
              Start Free <Sparkles className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary/80 transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Pain point comparison */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-4">
            Without vs. With Nudge
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            The difference a good system makes for busy households.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border-red-200/50 dark:border-red-900/30">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4">Without Nudge ❌</h3>
              <ul className="space-y-3">
                {[
                  'Post-it notes everywhere',
                  '&ldquo;Did you do it?&rdquo; texts all day',
                  'Forgotten school pickups',
                  'Arguments about who does what',
                  'Missed appointments',
                  'Mental load on one person',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-red-400 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-6 rounded-2xl border-emerald-200/50 dark:border-emerald-900/30">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-4">With Nudge ✅</h3>
              <ul className="space-y-3">
                {[
                  'AI-parsed voice tasks in seconds',
                  'Automatic reminders via Telegram',
                  'Clear task ownership & deadlines',
                  'Fair distribution across family',
                  'Tracked completion & streaks',
                  'Everyone sees the same board',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why working parents love it */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
            Why working parents choose Nudge
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Blazing fast setup', text: 'Create your family in 30 seconds. Add tasks by voice, Telegram, or text. No training, no onboarding calls.' },
              { icon: Mic, title: 'Voice-first by design', text: 'Hands-free task creation. Say &ldquo;remind Sophia to practice piano at 5pm&rdquo; while making coffee.' },
              { icon: Clock, title: 'Works on your terms', text: 'Telegram bot for mobile, web dashboard for desktop, voice for multitasking. Nudge meets you where you are.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-4">
            Key features for busy households
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Designed to reduce friction, not add to it.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Natural language task parsing via AI',
              'Telegram bot — add tasks without the app',
              'Voice-to-task on the web',
              'Smart due date suggestions',
              'Recurring chores (weekly, daily, custom)',
              'Family member assignment with one tap',
              'Push notifications & reminders',
              'Dark mode, mobile-first design',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-4 glass-card rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card-premium rounded-3xl p-10 md:p-14 shadow-elevated">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Reclaim your mental bandwidth
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
              Join 1,000+ families using Nudge to reduce chore chaos. Start free, upgrade when you need more.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/auth/signup" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xl shadow-indigo-600/20 hover:brightness-110 transition-all">
                Start Free &mdash; No Credit Card
              </Link>
              <Link href="/for/families" className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary/80 transition-all">
                For Families
              </Link>
            </div>
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
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          </div>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Nudge</p>
        </div>
      </footer>
    </div>
  )
}
