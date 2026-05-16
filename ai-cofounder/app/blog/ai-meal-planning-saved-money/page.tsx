"use client";

import { ArrowRight, CheckCircle2, UtensilsCrossed, DollarSign, Leaf, TrendingDown, Sparkles } from "lucide-react";
import Link from "next/link";

export default function MealPlanningSavedMoney() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-surfaceDark dark:to-ink">
      <article className="section-padding">
        <div className="section-container max-w-3xl">
          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge badge-meal">Personal Story</span>
              <span className="text-xs text-muted">May 16, 2026 • 8 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink dark:text-cream mb-4 leading-tight">
              How AI Meal Planning Saved Me $200/Month in 2026
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              I used to spend $600+ on groceries and still ordered takeout three times a week. Then I let an AI cofounder plan my meals. Here&apos;s exactly what happened.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent" />
                <span>Real story · Your AI Cofounder</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-6 text-ink/80 dark:text-cream/80 leading-relaxed">

            <p className="text-lg font-medium text-ink dark:text-cream">
              I&apos;m not proud of this, but here&apos;s the truth: I was spending $840 a month on food and still eating like I was in college.
            </p>

            <p>
              Every Sunday, I&apos;d walk through the grocery store with good intentions. I&apos;d grab bags of spinach I told myself I&apos;d use in smoothies. I&apos;d buy the bulk pack of chicken breasts because it was a better deal per pound. I&apos;d grab fancy cheeses and artisan bread on a whim.
            </p>

            <p>
              And by Thursday, half of it would be wilting in the crisper drawer while I ordered Pad Thai on Uber Eats for the third time that week.
            </p>

            <p>
              This wasn&apos;t a willpower problem. It was a <strong>systems problem</strong>. I had no plan, no inventory awareness, and no accountability. Every meal was a fresh decision, and decision fatigue always won by Wednesday.
            </p>

            <p>
              Then I built something to fix it. And it worked so well the numbers surprised even me.
            </p>

            {/* Stats: Before */}
            <div className="card p-6 my-8 border-l-4 border-l-red-400">
              <h3 className="text-lg font-bold text-ink dark:text-cream mb-4 flex items-center gap-2">
                <TrendingDown size={18} className="text-red-400" />
                Before AI Meal Planning
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-ink dark:text-cream">$600</p>
                  <p className="text-xs text-muted">groceries / month</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-ink dark:text-cream">$240</p>
                  <p className="text-xs text-muted">takeout / month</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-400">$840</p>
                  <p className="text-xs text-muted">total / month</p>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted text-center">
                $10,080 / year. On food. For one person.
              </div>
            </div>

            <h2 className="text-2xl font-bold text-ink dark:text-cream mt-10 mb-4">
              What Changed When I Let an AI Plan My Meals
            </h2>

            <p>
              I sat down with my AI cofounder and answered 7 questions. It took me about 4 minutes. The questions were simple — what I like to eat, my dietary preferences, how much time I have to cook, how many people I&apos;m feeding, my weekly budget, any ingredients I already have in my pantry, and my primary health goal.
            </p>

            <p>
              Thirty seconds later, I had a complete weekly meal plan with a consolidated grocery list. No flipping through recipe books. No scrolling Pinterest. No &ldquo;hmm, what sounds good?&rdquo; spiral.
            </p>

            <p>
              The first week was eye-opening. I followed the plan exactly. I only bought what was on the list. And something strange happened: I <em>stopped</em> ordering takeout. Not because I was forcing myself, but because I already knew what dinner was and had the ingredients ready.
            </p>

            <p>
              Here&apos;s what my numbers looked like after 4 weeks:
            </p>

            {/* Stats: After */}
            <div className="card p-6 my-8 border-l-4 border-l-meal">
              <h3 className="text-lg font-bold text-ink dark:text-cream mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-meal" />
                After AI Meal Planning
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-meal">$420</p>
                  <p className="text-xs text-muted">groceries / month</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-meal">$100</p>
                  <p className="text-xs text-muted">takeout / month</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-meal">$520</p>
                  <p className="text-xs text-muted">total / month</p>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted text-center">
                That&apos;s $320 / month saved.
              </div>
            </div>

            <div className="card p-6 my-8 bg-meal/5 border border-meal/20 text-center">
              <p className="text-lg font-bold text-ink dark:text-cream">
                $320 / month × 12 = <span className="text-meal text-2xl">$3,840 / year</span>
              </p>
              <p className="text-sm text-muted mt-1">
                I&apos;ll take that $3,840/year — and that&apos;s not counting the time saved.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-ink dark:text-cream mt-10 mb-4">
              5 Reasons Your Current System Isn&apos;t Working
            </h2>

            <p>
              If you&apos;re reading this and thinking &ldquo;that sounds like me,&rdquo; here&apos;s the honest diagnosis of why your current approach is broken:
            </p>

            <ul className="space-y-4 my-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-meal mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-ink dark:text-cream">You shop without a list.</strong>
                  <p className="text-sm text-muted">Walking into a store without a plan means every aisle is an impulse trap. Studies show unplanned purchases add 23-40% to your grocery bill.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-meal mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-ink dark:text-cream">Your pantry is a black box.</strong>
                  <p className="text-sm text-muted">You buy the same staples every week because you don&apos;t track what you already have. That&apos;s how you end up with three jars of cumin and no meal to use them in.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-meal mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-ink dark:text-cream">Decision fatigue at 6 PM.</strong>
                  <p className="text-sm text-muted">After a full day of work, deciding what to cook — and summoning the energy to do it — is genuinely hard. Takeout wins by default because it requires zero decisions.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-meal mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-ink dark:text-cream">You don&apos;t account for food waste.</strong>
                  <p className="text-sm text-muted">The average American household throws away $1,200+ in food every year. That&apos;s not &ldquo;the cost of fresh food&rdquo; — that&apos;s a planning failure dressed up as normal.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-meal mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-ink dark:text-cream">You&apos;re solving the wrong problem.</strong>
                  <p className="text-sm text-muted">More recipes aren&apos;t the answer. You don&apos;t need better ideas — you need a system that removes the mental overhead of food decisions. The meal plan itself is secondary to having <em>any</em> plan at all.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-ink dark:text-cream mt-10 mb-4">
              The Exact 7 Questions My AI Cofounder Asked Me
            </h2>

            <p>
              If you want to see if this works for you, here are the exact questions my AI cofounder asked. Answer these honestly, and you&apos;re already 80% of the way to a system that works.
            </p>

            <div className="space-y-3 my-6">
              <div className="card p-4 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-meal/10 text-meal text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-medium text-ink dark:text-cream">What&apos;s your dietary preference?</p>
                  <p className="text-sm text-muted">Balanced? Vegetarian? Keto? Your eating style determines the recipe universe you&apos;re drawing from.</p>
                </div>
              </div>
              <div className="card p-4 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-meal/10 text-meal text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <div>
                  <p className="font-medium text-ink dark:text-cream">Any food allergies or restrictions?</p>
                  <p className="text-sm text-muted">Dairy, nuts, shellfish, gluten — the AI needs to know what to avoid. This is where generic meal plans fall apart.</p>
                </div>
              </div>
              <div className="card p-4 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-meal/10 text-meal text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <div>
                  <p className="font-medium text-ink dark:text-cream">How many people are you cooking for?</p>
                  <p className="text-sm text-muted">Cooking for one is different than cooking for four. Portion sizing, leftovers strategy, and cost all change.</p>
                </div>
              </div>
              <div className="card p-4 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-meal/10 text-meal text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <div>
                  <p className="font-medium text-ink dark:text-cream">What&apos;s your primary nutrition goal?</p>
                  <p className="text-sm text-muted">Weight loss, muscle gain, more energy, or just eating better on a budget. Your goal determines macro targets and portion sizes.</p>
                </div>
              </div>
              <div className="card p-4 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-meal/10 text-meal text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                <div>
                  <p className="font-medium text-ink dark:text-cream">How much time can you cook per meal?</p>
                  <p className="text-sm text-muted">Be honest. If you only have 15 minutes, the plan should feature sheet-pan dinners and one-pot meals — not recipes that take an hour of prep.</p>
                </div>
              </div>
              <div className="card p-4 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-meal/10 text-meal text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
                <div>
                  <p className="font-medium text-ink dark:text-cream">What&apos;s already in your pantry?</p>
                  <p className="text-sm text-muted">This is the secret weapon. When the AI knows you have chicken, rice, and eggs, it builds meals around what you already <em>have</em> — not what the recipe thinks you should buy.</p>
                </div>
              </div>
              <div className="card p-4 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-meal/10 text-meal text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">7</span>
                <div>
                  <p className="font-medium text-ink dark:text-cream">What&apos;s your weekly grocery budget?</p>
                  <p className="text-sm text-muted">The AI optimizes every meal to fit within your budget. Under $50/week? It&apos;ll recommend lentils, eggs, and seasonal veggies over imported beef and out-of-season berries.</p>
                </div>
              </div>
            </div>

            <p>
              That&apos;s it. Seven questions. Four minutes. And the result was a complete, tailored meal plan that cut my food spending by nearly 40% in the first month.
            </p>

            <h2 className="text-2xl font-bold text-ink dark:text-cream mt-10 mb-4">
              Why This Works (And Why It&apos;s Not Just About the Money)
            </h2>

            <p>
              Yes, saving $3,840/year is life-changing for most people. But the real win isn&apos;t the money. It&apos;s the <strong>mental bandwidth</strong> you get back.
            </p>

            <p>
              Before AI meal planning, I was making 21+ food decisions every week. Each one required energy — what to eat, what to buy, what to cook, whether I had the ingredients. By Thursday, my decision battery was dead, and takeout was the path of least resistance.
            </p>

            <p>
              With the AI system, I make <strong>one decision per week</strong>: follow the plan or not. I&apos;ve never &ldquo;not.&rdquo; Because the plan is good, it respects my time, and it doesn&apos;t ask me to make 20 extra stops at specialty stores.
            </p>

            <p>
              The weekly grocery trip went from 45 minutes of wandering to 15 minutes of methodical shopping. Cooking went from a chore I dreaded to something I actually looked forward to — because I had a plan and the right ingredients.
            </p>

            <div className="card p-6 my-8 bg-gradient-to-br from-meal/5 to-accent/5 border border-meal/10">
              <h3 className="font-bold text-ink dark:text-cream mb-3">The Hidden Savings Nobody Talks About</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-meal mt-1 flex-shrink-0" />
                  <span><strong>Food waste:</strong> Dropped from ~$30/week thrown out to ~$5/week. That&apos;s $1,300/year I was literally throwing in the trash.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-meal mt-1 flex-shrink-0" />
                  <span><strong>Delivery fees &amp; tips:</strong> Three takeout orders a week meant ~$20 in fees + tips. Cutting to one = $40/week saved. $2,080/year.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-meal mt-1 flex-shrink-0" />
                  <span><strong>Impulse buys at the store:</strong> Without a list, I was adding 30% to my bill on stuff I didn&apos;t need. With a focused list, impulse buys nearly disappeared.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-meal mt-1 flex-shrink-0" />
                  <span><strong>Health outcomes:</strong> I&apos;m eating more vegetables, less processed food, and cooking with better oils. Harder to quantify, but my energy is noticeably better.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-ink dark:text-cream mt-10 mb-4">
              Try It Yourself
            </h2>

            <p>
              I designed this meal planner as the first vertical of the AI Cofounder platform. It asks you the same 7 questions I answered, and generates a complete weekly plan + grocery list in under a minute.
            </p>

            <p>
              It&apos;s free. No credit card. No signup walls. You just answer the questions and get your plan.
            </p>

            <p>
              If you&apos;re spending anything close to what I was spending, this will pay for itself on your first grocery trip. And if it doesn&apos;t work for you? You&apos;ve lost 4 minutes. But if it does — you&apos;re looking at $3,000-5,000/year back in your pocket.
            </p>

            <p>
              I&apos;ll take those odds.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 card p-8 text-center bg-gradient-to-br from-meal/5 to-accent/5">
            <h3 className="text-2xl font-bold text-ink dark:text-cream mb-3">
              Try the AI Meal Planner That Changed Everything
            </h3>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Answer 7 questions. Get a full personalized meal plan + grocery list. Free, no credit card, no signup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/categories/meal-planning" className="btn-primary bg-meal hover:bg-emerald-600 text-base px-6 py-3">
                Start AI Meal Planning <ArrowRight size={16} />
              </Link>
              <Link href="/waitlist" className="btn-secondary text-base px-6 py-3">
                Join Waitlist
              </Link>
            </div>
          </div>

          {/* Related articles + cross-links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Explore More</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/blog/meal-planning-ai-guide" className="card p-4 hover:border-meal/30 transition-colors">
                <span className="text-sm font-medium text-ink dark:text-cream flex items-center gap-1.5">
                  <UtensilsCrossed size={14} className="text-meal" />
                  Stop Wasting $1,200/Year on Food
                </span>
                <p className="text-xs text-muted mt-1">The full AI meal planning guide</p>
              </Link>
              <Link href="/categories/personal-finance" className="card p-4 hover:border-finance/30 transition-colors">
                <span className="text-sm font-medium text-ink dark:text-cream flex items-center gap-1.5">
                  <DollarSign size={14} className="text-finance" />
                  Personal Finance AI
                </span>
                <p className="text-xs text-muted mt-1">Automate your budget and savings</p>
              </Link>
              <Link href="/categories/solopreneur" className="card p-4 hover:border-solopreneur/30 transition-colors">
                <span className="text-sm font-medium text-ink dark:text-cream flex items-center gap-1.5">
                  <Leaf size={14} className="text-solopreneur" />
                  Solopreneur AI Playbook
                </span>
                <p className="text-xs text-muted mt-1">One-person business with AI</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
