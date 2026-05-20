import {
  MessageSquare,
  CheckCircle,
  Users,
  Bell,
  Mic,
  Sparkles,
  Smartphone,
  Clock,
  Heart,
  Star,
  ArrowRight,
  Quote,
  Twitter,
  Github,
  Instagram,
  Mail,
} from 'lucide-react'
import Link from 'next/link'
import StickyMicButton from '@/components/voice/StickyMicButton'

/* SEO keywords (visible to crawlers):
   voice task manager, family assistant app, voice reminders, AI family organizer,
   family chore tracker, household coordination, voice-powered productivity,
   family task management, nudge app, AI voice assistant for families
*/

const features = [
  { icon: Mic, iconBg: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', title: 'Voice-First Input', desc: 'Speak naturally — "Pick up milk after work" — and Nudge creates a task with the right person, date, and priority. No typing, no forms, no friction.' },
  { icon: Sparkles, iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', title: 'AI That Understands You', desc: 'Powered by Whisper + NLP. Nudge understands context, detects urgency, assigns family members, and sets smart deadlines from natural speech.' },
  { icon: Bell, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', title: 'Smart Reminders', desc: 'Timely nudges via Telegram, push, or SMS. Escalate if someone forgets. Nudge learns when your family is most responsive.' },
  { icon: Users, iconBg: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400', title: 'Family Dashboard', desc: 'Everyone sees the same board. No more "Did you see my text?" — assign, track, and celebrate completions together.' },
  { icon: Clock, iconBg: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400', title: 'Recurring Routines', desc: 'Set weekly chores that repeat automatically. "Jake takes out trash every Monday" — Nudge handles the schedule.' },
  { icon: Heart, iconBg: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', title: 'Weekly Scorecard', desc: 'See who crushed it and who needs a nudge. Turn chores into friendly family competition with streak tracking.' },
]

const steps = [
  { step: '01', icon: Mic, gradient: 'from-indigo-600 to-indigo-400', title: 'Speak Naturally', desc: 'Tap the mic or send a voice message to Telegram. Just say what needs done — "Ask Sarah to buy diapers on her way home."' },
  { step: '02', icon: Sparkles, gradient: 'from-amber-400 to-orange-400', title: 'AI Processes It', desc: 'Nudge transcribes with Whisper, then extracts who, what, and when using NLP. A task appears on the dashboard instantly.' },
  { step: '03', icon: Bell, gradient: 'from-emerald-500 to-teal-400', title: 'Smart Follow-Through', desc: 'Reminders go out at the right time. Nudge escalates if uncompleted. Weekly scorecards show your family\'s progress.' },
]

const testimonials = [
  { quote: 'Nudge saved our marriage. Okay, maybe not that dramatic, but it definitely saved us from the "I told you to do it" arguments. Game changer.', name: 'Sarah & Mike', role: 'Parents of 3, Austin TX', rating: 5, initials: 'SM' },
  { quote: 'My kids actually do their chores now because Nudge reminds them — not me. It turned me from nagging mom to cool mom. Worth every penny.', name: 'Jessica Chen', role: 'Working mom, San Francisco', rating: 5, initials: 'JC' },
  { quote: 'We tried 5 different chore apps before Nudge. The voice input is what makes it stick. Just say it and it\'s done. So simple.', name: 'David Park', role: 'Dad & tech lead, Seattle', rating: 5, initials: 'DP' },
]

const plans = [
  { name: 'Free', tagline: 'For individuals getting started', price: '$0', period: '/month', popular: false, features: ['5 tasks per day', 'Basic voice input', 'Telegram integration', 'Email reminders', 'Single user'], cta: 'Get Started Free', href: '/auth/signup', primary: false },
  { name: 'Pro', tagline: 'For busy families', price: '$5', period: '/month', popular: true, features: ['Unlimited tasks', 'Advanced voice AI', 'Telegram + mobile apps', 'Push & SMS reminders', 'Up to 5 family members', 'Recurring chores', 'Weekly scorecards'], cta: 'Start Free Trial', href: '/auth/signup', primary: true },
  { name: 'Family', tagline: 'For larger households', price: '$9', period: '/month', popular: false, features: ['Everything in Pro', 'Unlimited family members', 'Priority support', 'Custom reminders', 'Advanced analytics', 'API access', 'Early access to new features'], cta: 'Start Free Trial', href: '/auth/signup', primary: false },
]

const footerLinks = {
  Product: ['Features', 'How It Works', 'Pricing', 'For Families', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'CCPA'],
}

export default function Home() {
  return (
    <>
      <StickyMicButton />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-shadow duration-200">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Nudge</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="hidden sm:inline-flex px-4 py-2 rounded-xl font-medium tracking-wide transition-all duration-200 hover:bg-secondary/60 active:scale-[0.97] text-sm">Sign In</Link>
              <Link href="/auth/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97] text-sm">Get Started Free</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-8 animate-fade-in border border-indigo-200/50 dark:border-indigo-800/30">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              <span>Now in Telegram &middot; AI-powered</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05] animate-fade-in-up">
              Tell your family{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">what needs done</span>
              <br />
              Nudge handles the rest.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
              The AI-powered <span className="text-foreground font-semibold">voice task manager</span> for families.
              Speak naturally, Nudge understands who, what, and when &mdash; then assigns, reminds,
              and follows up so nothing falls through the cracks.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['JD', 'SM', 'AK', 'LR'].map((initials, i) => (
                    <div key={i} className={`w-7 h-7 ${['bg-indigo-500','bg-amber-400','bg-emerald-500','bg-pink-500'][i]} rounded-full border-2 border-background flex items-center justify-center`}>
                      <span className="text-[10px] text-white font-bold">{initials}</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground"><span className="text-foreground font-semibold">1,000+</span> families</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                <span className="ml-1">4.9/5 from 200+ reviews</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <Link href="/auth/signup" className="bg-indigo-600 text-white text-base px-8 py-4 rounded-xl font-semibold tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97] flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/15">
                Start Free &mdash; No credit card <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#how-it-works" className="bg-secondary text-secondary-foreground text-base px-8 py-4 rounded-xl font-semibold tracking-wide transition-all duration-200 hover:bg-secondary/80 active:scale-[0.97] flex items-center justify-center gap-2">
                <Mic className="w-4 h-4" /> See how it works
              </Link>
            </div>

            {/* Demo mockup */}
            <div className="relative max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/40 dark:border-gray-800/40 shadow-elevated rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm text-foreground">Voice Input</p>
                      <p className="text-xs text-muted-foreground">Tap to speak &bull; Natural language</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Ready
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30 mb-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 flex items-center gap-[3px] h-8">
                      {[1,2,3,4,5,6,7,8,9,10].map(i => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-indigo-400 to-indigo-300 dark:from-indigo-500 dark:to-indigo-400 rounded-full"
                          style={{ height: `${Math.max(20, Math.sin(Date.now()/300+i*0.8)*12+28)}%`, opacity: 0.5+(i/10)*0.5 }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow shrink-0">
                      <span className="text-white font-bold text-xs">N</span>
                    </div>
                    <div className="bg-indigo-600 rounded-2xl rounded-tl-none px-4 py-3 shadow-md max-w-[85%]">
                      <p className="text-white text-sm font-medium">🎤 &ldquo;Remind Jake to take out trash tonight&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-emerald-500 rounded-2xl rounded-tr-none px-4 py-3 shadow-md max-w-[85%]">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                        <p className="text-white text-sm font-medium">Task created!</p>
                      </div>
                      <p className="text-emerald-100 text-xs">Take out trash &bull; Assigned to Jake &bull; Due 8pm</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-6">
                <div className="flex items-center gap-1.5 px-3.5 py-2 bg-foreground text-background dark:bg-white dark:text-foreground rounded-xl text-xs font-semibold tracking-wide shadow-sm">
                  <Smartphone className="w-3.5 h-3.5" /> iOS App
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 bg-foreground text-background dark:bg-white dark:text-foreground rounded-xl text-xs font-semibold tracking-wide shadow-sm">
                  <Smartphone className="w-3.5 h-3.5" /> Android App
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold tracking-wide shadow-sm shadow-indigo-600/30">
                  <MessageSquare className="w-3.5 h-3.5" /> Telegram
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-12 md:py-16 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center mb-8">Trusted by families at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 dark:opacity-30">
            {['Amazon','Google','Meta','Stripe','Shopify','Netflix'].map(c => (
              <span key={c} className="text-sm md:text-base font-bold text-foreground tracking-tight">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mb-4">Features</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">Everything your family needs</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">Stop texting reminders that get ignored. Nudge handles coordination so you can focus on what matters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 rounded-2xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: `${i*0.05}s` }}>
                  <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-5 h-5 ${f.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mb-4">How It Works</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">Three steps to a calmer household</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">From voice to done in seconds. No learning curve, no complicated setup.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.step} className="text-center animate-fade-in-up" style={{ animationDelay: `${i*0.05}s` }}>
                  <div className="relative inline-flex mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-xl`}>
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background dark:bg-white dark:text-foreground flex items-center justify-center text-xs font-bold shadow-md">{s.step}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 mb-4">Testimonials</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">Loved by families everywhere</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">Real families sharing real results. Nudge saves 4+ hours per week on average.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 shadow-card rounded-2xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: `${i*0.05}s` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length:t.rating}).map((_,j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-indigo-200 dark:text-indigo-800 absolute -top-1 -left-1" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-white text-xs font-bold">{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mb-4">Pricing</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">Simple, transparent pricing</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">Start free. Upgrade when you need more. No hidden fees, no surprises.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div key={plan.name} className={`bg-white dark:bg-gray-900 border rounded-2xl p-8 flex flex-col relative animate-fade-in-up ${plan.popular ? 'border-2 border-indigo-200 dark:border-indigo-800 shadow-elevated scale-[1.02]' : 'border-gray-200/60 dark:border-gray-800/60 shadow-card'}`} style={{ animationDelay: `${i*0.05}s` }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-indigo-600/30">Most Popular</div>
                  </div>
                )}
                <div className={`mb-6 ${plan.popular ? 'mt-2' : ''}`}>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`w-full text-center text-sm rounded-xl font-semibold tracking-wide transition-all duration-200 py-3 px-6 flex items-center justify-center gap-1 ${plan.primary ? 'bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97]' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97]'}`}>
                  {plan.cta}
                  {plan.popular && <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">No credit card required for free trial. Cancel anytime.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/40 dark:border-gray-800/40 shadow-elevated rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">Stop managing. Start living.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">Join 1,000+ families saving 4+ hours per week. Start free, upgrade when you need more.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup" className="bg-indigo-600 text-white text-base px-10 py-4 rounded-xl font-semibold tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97] flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20">
                  <Users className="w-5 h-5" /> Start Your Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#how-it-works" className="bg-secondary text-secondary-foreground text-base px-8 py-4 rounded-xl font-semibold tracking-wide transition-all duration-200 hover:bg-secondary/80 active:scale-[0.97]">Learn More</Link>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Free forever plan available &bull; No credit card &bull; Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">Nudge</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">The AI-powered voice task manager that helps families stay organized without the hassle.</p>
            </div>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map(l => <li key={l}><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Nudge. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Github, label: 'GitHub' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Mail, label: 'Email' },
              ].map(({icon:Icon,label}) => (
                <Link key={label} href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200" aria-label={label}>
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
