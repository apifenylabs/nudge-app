import { MessageSquare, CheckCircle, Bell, Mic, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function FamiliesPage() {
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
            Best Family Task Manager for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              Busy Parents
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            Juggling school runs, chores, appointments, and extracurriculars? Nudge is the AI-powered family task manager that turns chaos into calm. Assign tasks by voice, Telegram, or text — and get everyone on the same page.
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

      {/* Pain points */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
            Does this sound familiar?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Bell, title: 'Forgotten chores', text: '&ldquo;I asked you to take out the trash!&rdquo; — sound familiar? Stop repeating yourself.' },
              { icon: Users, title: 'Scheduling chaos', text: 'Who&rsquo;s doing pickup? Who&rsquo;s cooking dinner? Nudge keeps everyone accountable.' },
              { icon: Mic, title: 'Too busy to type', text: 'Just say it. Voice tasks mean you can assign while loading the dishwasher or driving home.' },
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

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
            How Nudge works for families
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your family', text: 'Add your partner, kids (13+), and anyone else in your household. Each person gets their own profile.' },
              { step: '02', title: 'Assign tasks instantly', text: 'Use voice, Telegram, or the dashboard. &ldquo;Nudge: remind Mia to feed the cat at 6pm&rdquo; — done.' },
              { step: '03', title: 'Track & celebrate', text: 'Get notified when tasks are completed. Watch your family streak grow. See who&rsquo;s crushing it this week.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-4">
            Everything your family needs
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            One app for chores, errands, appointments, and everything else.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Voice task creation — just speak it',
              'Telegram bot integration',
              'Smart reminders & notifications',
              'Family scorecards & streaks',
              'Recurring chores & routines',
              'Mobile-optimized dashboard',
              'Shared family calendar view',
              'Priority-based task sorting',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-4 glass-card rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card-premium rounded-3xl p-10 md:p-14 shadow-elevated">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Start nudging your family today
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
              Free plan includes 5 tasks/day. Upgrade to Pro ($5/mo) for unlimited tasks and up to 5 family members.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/auth/signup" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xl shadow-indigo-600/20 hover:brightness-110 transition-all">
                Start Free &mdash; No Credit Card
              </Link>
              <Link href="/pricing" className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary/80 transition-all">
                See Plans
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
