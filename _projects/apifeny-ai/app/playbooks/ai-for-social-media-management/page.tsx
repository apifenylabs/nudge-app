'use client';

import IconRenderer from '@/components/IconRenderer';
import SeoMetadata from '@/components/SeoMetadata';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Download, CheckCircle, BookOpen, Users, Target, Zap,
  TrendingUp, DollarSign, Star, Clock, Sparkles, Lightbulb,
  ChevronRight, ShoppingCart, FileText, Rocket, Shield, Globe,
  Search as SearchIcon, Image, Activity, Calendar,
} from 'lucide-react';

const sections = [{"id":"s0","icon":"Calendar","color":"text-pink-400","title":"Content Calendar Creation with ChatGPT","desc":"Feed ChatGPT your brand voice to generate a 30-day content calendar.","items":["Generate 30-day content calendars across 6 platforms","Platform-specific post ideas for Instagram, TikTok, LinkedIn, X","Content themes by week for cohesive storytelling"]},{"id":"s1","icon":"FileText","color":"text-rose-400","title":"Write Captions and Hooks with Claude","desc":"Claude writes punchy, platform-optimized copy from any topic.","items":["Generate 5 hook variations per post for A/B testing","Platform-optimized caption lengths per platform","Hashtag clusters of 15-30 tags by niche"]},{"id":"s2","icon":"Image","color":"text-fuchsia-400","title":"Visual Content with Canva AI","desc":"Combine Canva Magic Studio with DALL-E 3 for on-brand visuals.","items":["Generate on-brand visuals from text descriptions","Create carousel posts with consistent styling","Auto-generate story templates for daily posting"]},{"id":"s3","icon":"Clock","color":"text-amber-400","title":"Scheduling and Automation","desc":"Set up Buffer queues and batch-schedule posts with Zapier.","items":["Create a Buffer queue and batch-schedule posts","Cross-post automation with Zapier templates","Best posting times per platform (data-backed)"]},{"id":"s4","icon":"TrendingUp","color":"text-emerald-400","title":"Engagement Analysis with AI","desc":"Export analytics and feed them to ChatGPT for deep analysis.","items":["Engagement rate analysis by content type","Best-performing post times and days","Content format performance comparisons"]},{"id":"s5","icon":"Globe","color":"text-cyan-400","title":"Trend Spotting and Viral Strategies","desc":"Monitor trending topics and identify viral patterns.","items":["AI monitoring for trending topics and formats","Viral pattern identification from successful content","Weekly trend report with actionable post ideas"]}];

const includedItems = [{"icon":"BookOpen","text":"6 comprehensive chapters","subtext":"35+ pages of actionable content"},{"icon":"FileText","text":"Ready-to-use prompt library","subtext":"25+ copy-paste social media prompts"},{"icon":"Calendar","text":"Content calendar template","subtext":"30-day schedule for 6 platforms"},{"icon":"Image","text":"Canva AI design templates","subtext":"Carousel, story, and ad formats"},{"icon":"TrendingUp","text":"Viral strategy framework","subtext":"Trend spotting pattern analysis"},{"icon":"Rocket","text":"Scheduling automation setup","subtext":"Buffer + Zapier integration guide"}];

const whoItsFor = [{"icon":"Users","text":"Social media managers","subtext":"Managing 3+ brand accounts"},{"icon":"Target","text":"Solopreneurs","subtext":"Building personal brand while running a business"},{"icon":"Star","text":"Content creators","subtext":"Growing audience across multiple platforms"},{"icon":"Lightbulb","text":"Marketing freelancers","subtext":"Offering AI-powered social services"}];

const whatYoullLearn = [{"icon":"Calendar","text":"Create 30-day content calendars","subtext":"Platform-optimized in minutes"},{"icon":"FileText","text":"Write scroll-stopping hooks","subtext":"5 variations per post"},{"icon":"Image","text":"Design visuals with Canva AI","subtext":"On-brand carousels and stories"},{"icon":"TrendingUp","text":"Analyze and optimize engagement","subtext":"Data-backed posting strategy"}];

const socialProofStats = [{"icon":"Users","value":"750+","label":"Creators using AI workflows","color":"text-pink-400","bg":"bg-pink-500/10","border":"border-pink-500/20"},{"icon":"Rocket","value":"5x","label":"Average reach growth","color":"text-pink-400","bg":"bg-pink-500/10","border":"border-pink-500/20"},{"icon":"Clock","value":"80%","label":"Less time on content","color":"text-pink-400","bg":"bg-pink-500/10","border":"border-pink-500/20"},{"icon":"Zap","value":"100%","label":"Tested every prompt","color":"text-pink-400","bg":"bg-pink-500/10","border":"border-pink-500/20"}];

const testimonials = [{"name":"Maya Patel","title":"SMM at GrowthLab","stars":5,"quote":"I went from dreading content days to pumping out a month's worth in 3 hours. The Notion calendar template is worth it alone."},{"name":"James Carter","title":"Solopreneur","stars":5,"quote":"Never thought I'd say this about social media, but the playbook makes it actually fun."},{"name":"Sarah Kim","title":"Freelance Marketer","stars":5,"quote":"My clients noticed within two weeks. Better content, faster turnaround."}];

const bonuses = [{"name":"30-Day Content Calendar Template","value":"$12","desc":"Editable Google Sheets template for 6 platforms"},{"name":"Hashtag Research Tool","value":"$9","desc":"AI-powered hashtag cluster generator"},{"name":"Canva Brand Kit Setup Guide","value":"$14","desc":"Visual brand setup for instant AI designs"}];

const faqItems = [{"q":"Is this a digital download?","a":"Yes! The playbook is a PDF delivered instantly after purchase."},{"q":"What if I'm a complete beginner?","a":"Perfect for beginners. The first chapter covers all the basics."},{"q":"Which AI tools do I need?","a":"ChatGPT Plus and Claude. Under $20/mo total."},{"q":"Can I get a refund?","a":"Absolutely. If it doesn't grow your reach 5x, refund."}];

function CheckoutOverlay({ onBack }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'ai-for-social-media-management' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 shadow-2xl shadow-neon/10">
        <button onClick={onBack} className="absolute top-4 right-4 text-tech-300 hover:text-white" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-neon to-aqua flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">AI for Social Media Management</h3>
          <p className="text-sm text-tech-200">Complete PDF Playbook</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neon/15 border border-neon/20">
            <DollarSign className="w-4 h-4 text-neon-light" />
            <span className="text-lg font-bold text-white">$7</span>
            <span className="text-xs text-tech-200">one-time</span>
          </div>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-white font-medium mb-1">{message}</p>
            <button onClick={onBack} className="mt-4 text-sm text-neon-light hover:underline">Back</button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label htmlFor="ce" className="block text-sm font-medium text-tech-200 mb-1">Email</label>
              <input id="ce" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/60 focus:ring-1 focus:ring-neon/20" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing...</>
              ) : (
                <><Download className="w-4 h-4" /> Download PDF — $7</>
              )}
            </button>
            {status === 'error' && <p className="text-xs text-red-400">{message}</p>}
            <p className="text-[10px] text-tech-300 text-center">Secure checkout. Instant download.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function AIForSocialMediaManagementInner() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <SeoMetadata title="AI for Social Media Management — Apifeny" description="Manage social media with AI: content calendars, caption writing, visuals, scheduling, and engagement analysis with ChatGPT, Claude, and Canva AI." />
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tech-300">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li className="text-tech-500">/</li>
            <li><Link href="/playbooks" className="hover:text-white">Playbooks</Link></li>
            <li className="text-tech-100 truncate max-w-[200px]">AI for Social Media</li>
          </ol>
        </nav>
        <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5" /> All Playbooks
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/30 border border-neon/20 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-aqua/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">📱</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">Beginner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">AI for Social Media Management: Schedule to Viral</h1>
            <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">Manage social media like a pro with AI. From content calendars and scheduling to engagement analysis and trend spotting — this 35+ page PDF shows you how to use ChatGPT, Claude, and Canva AI to grow your presence across 6 platforms.</p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100"><FileText className="w-3 h-3" /> 35+ pages</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100"><Clock className="w-3 h-3" /> 6 chapters</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100"><Sparkles className="w-3 h-3" /> 25+ prompts</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100"><Globe className="w-3 h-3" /> Updated June 2026</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-neon/20"><Download className="w-4 h-4" /> Download PDF — $7</button>
              <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-neon/30"><BookOpen className="w-4 h-4" /> Preview Contents</a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-tech-200">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 750+ creators have downloaded this playbook</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Guarantee — grow your reach 5x or get refunded</span>
            </div>
          </div>
        </div>

        {/* What's Inside */}
        <section className="mb-8 sm:mb-10" id="preview">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-neon-light" /> What's Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {includedItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-pink-500/20 bg-pink-500/10">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center"><IconRenderer name={item.icon} className="w-5 h-5 text-pink-400" /></div>
                <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-rose-400" /> Who This Is For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whoItsFor.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center"><IconRenderer name={item.icon} className="w-5 h-5 text-rose-400" /></div>
                <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-fuchsia-400" /> What You'll Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whatYoullLearn.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-pink-500/20 bg-pink-500/5">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center"><IconRenderer name={item.icon} className="w-5 h-5 text-pink-400" /></div>
                <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter Preview */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><SearchIcon className="w-4 h-4 text-amber-400" /> Chapter Preview</h2>
          <p className="text-sm text-tech-200 mb-6">Here's everything covered. Each chapter has actionable strategies and ready-to-use prompts.</p>
          <div className="space-y-4">
            {sections.map((s) => (
              <details key={s.id} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-pink-500/20">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center"><IconRenderer name={s.icon} className={'w-5 h-5 ' + s.color} /></div>
                    <div><h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-pink-300">{s.title}</h3><p className="text-xs text-tech-300 mt-0.5 line-clamp-1">{s.desc}</p></div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <ul className="space-y-2">
                    {s.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-tech-100"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Real Results */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-pink-400" /> Real Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialProofStats.map((st, i) => (
              <div key={i} className={'flex flex-col items-center text-center p-4 sm:p-5 rounded-xl border ' + st.border + ' ' + st.bg}>
                <div className={'w-10 h-10 rounded-lg ' + st.bg + ' flex items-center justify-center mb-2'}><IconRenderer name={st.icon} className={'w-5 h-5 ' + st.color} /></div>
                <div className={'text-xl sm:text-2xl font-bold ' + st.color}>{st.value}</div>
                <div className="text-xs text-tech-200 mt-1">{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col p-5 rounded-xl border border-tech-500/20 bg-tech-700/60">
                <div className="flex items-center gap-0.5 mb-3">{Array.from({ length: t.stars }).map((_, si) => (<Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />))}</div>
                <blockquote className="text-xs sm:text-sm text-tech-100 leading-relaxed mb-3 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="border-t border-tech-500/10 pt-3 mt-auto"><div className="text-sm font-medium text-white">{t.name}</div><div className="text-xs text-tech-300">{t.title}</div></div>
              </div>
            ))}
          </div>
        </section>

        {/* Bonuses */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Free Bonuses ($35 Value)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bonuses.map((bonus, i) => (
              <div key={i} className="relative flex flex-col p-5 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="absolute -top-2 right-3"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FREE</span></div>
                <div className="text-base font-semibold text-white mb-1 pr-12">{bonus.name}</div>
                <p className="text-xs text-tech-200 mb-2">{bonus.desc}</p>
                <div className="flex items-center gap-2 mt-auto"><span className="text-lg font-bold text-emerald-400">$0</span><span className="text-xs text-tech-300 line-through">{bonus.value}</span></div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-tech-300 text-center">Get all bonuses instantly when you buy today.</p>
        </section>

        {/* FOMO */}
        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-tech-500/20 bg-tech-700/60 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-cyan-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2"><Clock className="w-5 h-5 text-cyan-400" /> Price Increasing Soon</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="text-center"><div className="text-3xl sm:text-4xl font-bold text-neon-light">$7</div><div className="text-xs text-tech-300">Current price</div></div>
                <div className="hidden sm:block text-2xl text-tech-500">&rarr;</div>
                <div className="text-center"><div className="text-2xl sm:text-3xl font-bold text-tech-300 line-through">$14</div><div className="text-xs text-tech-300">Next tier</div></div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs"><TrendingUp className="w-3.5 h-3.5" /> Sales: 750+</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs"><Clock className="w-3.5 h-3.5" /> Price increasing soon</span>
              </div>
              <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-neon/20"><ShoppingCart className="w-4 h-4" /> Buy Now at $7</button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-pink-500/20">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none"><span className="text-sm sm:text-base font-medium text-white group-hover:text-pink-300 pr-4">{faq.q}</span><ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" /></summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3"><p className="text-xs sm:text-sm text-tech-200 leading-relaxed">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-tech-800 border border-emerald-500/20 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-tech-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">100% Risk-Free — 30-Day Money-Back Guarantee</h2>
              <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4 leading-relaxed">If AI for Social Media Management doesn't help you grow your reach within 30 days, I'll refund every cent. No questions asked. You keep the bonuses.</p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-tech-300">
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Instant download</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 30-day guarantee</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Free updates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-neon/10 border border-neon/20 p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-neon/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-neon to-aqua mb-4"><FileText className="w-8 h-8 text-white" /></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Get Started?</h2>
            <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">Get the complete 35+ page PDF playbook.</p>
            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-tech-700/80 border border-tech-500/20 mb-4">
              <div className="text-left"><div className="text-2xl font-bold text-white">$7</div><div className="text-[10px] text-tech-300">one-time payment</div></div>
              <div className="h-8 w-px bg-tech-500/30" />
              <div className="text-left"><div className="text-xs font-medium text-emerald-400">Lifetime access</div><div className="text-[10px] text-tech-300">Free updates</div></div>
            </div>
            <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-neon/20"><ShoppingCart className="w-4 h-4" /> Download PDF — $7</button>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-tech-300">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Instant download</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> 30-day guarantee</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Free updates</span>
            </div>
          </div>
        </section>
      </div>
      {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
    </>
  );
}

export default function AIForSocialMediaManagementPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-tech-700 rounded w-1/4" />
          <div className="h-8 bg-tech-700 rounded w-3/4" />
          <div className="h-64 bg-tech-700 rounded" />
        </div>
      </div>
    }>
      <AIForSocialMediaManagementInner />
    </Suspense>
  );
}
