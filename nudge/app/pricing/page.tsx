import { CheckCircle, ArrowRight, Star, MessageSquare, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import CheckoutButton from '@/components/billing/CheckoutButton'

const plans = [
  {
    name: 'Free',
    tagline: 'Perfect for getting started',
    price: '$0',
    period: '/month',
    popular: false,
    features: [
      '5 tasks per day',
      'Basic voice input',
      'Telegram integration',
      'Email reminders',
      'Single user',
    ],
    cta: 'Get Started Free',
    href: '/auth/signup',
    primary: false,
    checkoutPlan: 'free' as const,
  },
  {
    name: 'Pro',
    tagline: 'Best for busy families',
    price: '$5',
    period: '/month',
    popular: true,
    features: [
      'Unlimited tasks',
      'Advanced voice AI',
      'Telegram + mobile apps',
      'Push & SMS reminders',
      'Up to 5 family members',
      'Recurring chores',
      'Weekly scorecards',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    primary: true,
    checkoutPlan: 'pro' as const,
  },
  {
    name: 'Family',
    tagline: 'For larger households',
    price: '$9',
    period: '/month',
    popular: false,
    features: [
      'Everything in Pro',
      'Unlimited family members',
      'Priority support',
      'Custom reminders',
      'Advanced analytics',
      'API access',
      'Early access to new features',
      'Dedicated onboarding',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    primary: false,
    checkoutPlan: 'family' as const,
  },
]

const faq = [
  { q: 'Can I start for free?', a: 'Yes! Start with the Free plan — no credit card required. Upgrade anytime when you need more tasks or family members.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and Apple Pay. Stripe handles all payments securely.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. No contracts, no commitments. Cancel from your settings and keep access until the end of your billing period.' },
  { q: 'What happens if I hit my task limit?', a: 'You\'ll get a friendly nudge to upgrade. Your existing tasks stay safe — you just can\'t add new ones until the next day or you upgrade.' },
  { q: 'Is my data secure?', a: 'Yes. All data is encrypted at rest and in transit. We use Supabase and Vercel for infrastructure. No data sharing, ever.' },
  { q: 'Can I switch plans?', a: 'Yes, upgrade or downgrade at any time. Changes take effect immediately.' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="pt-20 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mb-4">
            Pricing
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Start free. Upgrade when your family grows. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`bg-white dark:bg-gray-900 border rounded-2xl p-8 flex flex-col relative ${
                  plan.popular
                    ? 'border-2 border-indigo-200 dark:border-indigo-800 shadow-elevated scale-[1.02]'
                    : 'border-gray-200/60 dark:border-gray-800/60 shadow-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-indigo-600/30 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Most Popular
                    </div>
                  </div>
                )}

                <div className={`mb-6 ${plan.popular ? 'mt-2' : ''}`}>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full text-center text-sm rounded-xl font-semibold tracking-wide transition-all duration-200 py-3 px-6 flex items-center justify-center gap-1 ${
                    plan.primary
                      ? 'bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97]'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97]'
                  }`}
                >
                  <CheckoutButton plan={plan.checkoutPlan} label={plan.cta} className={`w-full text-center text-sm rounded-xl font-semibold tracking-wide transition-all duration-200 py-3 px-6 flex items-center justify-center gap-1 ${
  plan.primary
    ? 'bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97]'
    : plan.checkoutPlan === 'family'
      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:shadow-lg hover:shadow-amber-400/25 active:scale-[0.97]'
      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97]'
}`} />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            No credit card required for free trial. Cancel anytime. Secure payments via Stripe.
          </p>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="pb-20 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto pt-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
            Compare plans in detail
          </h2>

          <div className="glass-card overflow-hidden rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center px-4 py-4 font-semibold text-muted-foreground">Free</th>
                  <th className="text-center px-4 py-4 font-semibold text-indigo-600">Pro</th>
                  <th className="text-center px-4 py-4 font-semibold text-muted-foreground">Family</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Daily tasks', '5/day', 'Unlimited', 'Unlimited'],
                  ['Voice input', 'Basic', 'Advanced AI', 'Advanced AI'],
                  ['Telegram integration', true, true, true],
                  ['Mobile app', false, true, true],
                  ['Push notifications', false, true, true],
                  ['SMS reminders', false, true, true],
                  ['Family members', '1', 'Up to 5', 'Unlimited'],
                  ['Recurring chores', false, true, true],
                  ['Weekly scorecards', false, true, true],
                  ['Priority support', false, true, true],
                  ['Analytics', false, false, true],
                  ['API access', false, false, true],
                ].map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-secondary/30' : ''} border-b border-border/40 last:border-0`}>
                    <td className="px-6 py-3.5 font-medium text-foreground">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className="text-center px-4 py-3.5 text-muted-foreground">
                        {typeof cell === 'boolean' ? (
                          cell ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground/40">&mdash;</span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="glass-card rounded-2xl overflow-hidden group">
                <summary className="px-6 py-4 font-semibold text-foreground cursor-pointer flex items-center justify-between list-none hover:bg-secondary/30 transition-colors">
                  {item.q}
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card-premium rounded-3xl p-10 md:p-14 shadow-elevated">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Ready to nudge your family?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
              Join 1,000+ families. Start free, upgrade when you need more. No credit card required.
            </p>
            <Link href="/auth/signup" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2 shadow-xl shadow-indigo-600/20">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3" /> 14-day free trial • No commitment • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Nudge. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
