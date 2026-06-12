'use client';

import { useState, useCallback } from 'react';
import { Copy, CheckCircle, ArrowRight, BookOpen, Twitter, Youtube, FileText, Monitor, Camera } from 'lucide-react';

const RESOURCES = [
  {
    icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
    title: 'Getting Started Guide',
    desc: 'Step-by-step walkthrough for new affiliates — from link creation to first payout.',
    tag: 'PDF',
  },
  {
    icon: <Twitter className="w-6 h-6 text-sky-400" />,
    title: 'Social Media Kit',
    desc: 'Pre-written posts, images, and stories for Twitter/X, LinkedIn, and Instagram.',
    tag: 'Assets',
  },
  {
    icon: <Youtube className="w-6 h-6 text-red-400" />,
    title: 'Video Scripts',
    desc: 'Talking points and full scripts for YouTube reviews, tutorials, and unboxing-style content.',
    tag: 'Scripts',
  },
  {
    icon: <FileText className="w-6 h-6 text-purple-400" />,
    title: 'Blog Templates',
    desc: 'SEO-optimised blog post templates — comparison posts, tutorials, and listicles featuring Titan.',
    tag: 'Templates',
  },
  {
    icon: <Monitor className="w-6 h-6 text-amber-400" />,
    title: 'Banners & Badges',
    desc: 'Downloadable banner ads, embeddable badges, and referral widgets for your site.',
    tag: 'PNG/SVG',
  },
  {
    icon: <Camera className="w-6 h-6 text-rose-400" />,
    title: 'Swipe File',
    desc: 'Proven email sequences, DM templates, and landing page copy that converts.',
    tag: 'Copy',
  },
];

function CopyLinkDemoSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText('titan.build/refer?ref=yourname').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section className="px-6 py-16">
      <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
        <Copy className="w-8 h-8 mx-auto mb-4 text-emerald-400" />
        <h2 className="text-2xl font-bold text-center mb-2">Your Referral Link</h2>
        <p className="text-gray-400 text-center mb-6 max-w-md mx-auto">
          After signing up, your unique link will look like this — ready to share anywhere.
        </p>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-700/40 border border-gray-600/40">
          <code className="flex-1 text-sm text-emerald-300 font-mono break-all">
            titan.build/refer?ref=yourname
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
            title={copied ? 'Copied!' : 'Copy example link'}
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {copied && (
          <p className="text-emerald-400 text-xs mt-3 text-center font-medium">
            Link copied! (demo — your real link will be available after sign-up)
          </p>
        )}
        <p className="text-gray-500 text-xs mt-3 text-center">
          You&apos;ll get your real link after creating a free account.
        </p>
      </div>
    </section>
  );
}

function EarningsCalculatorSection() {
  const [refs, setRefs] = useState(10);
  const avgPlan = 29;

  const monthly = refs * avgPlan * 0.2;
  const yearly = monthly * 12;

  return (
    <section className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Estimate Your Earnings</h2>
        <p className="text-gray-400 text-center mb-8 max-w-lg mx-auto">
          See what 20% recurring commission looks like at different referral counts.
        </p>
        <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
          <div className="flex flex-col items-center mb-6">
            <span className="text-gray-400 text-sm mb-2">Active Referrals</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRefs(Math.max(1, refs - 1))}
                className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-lg font-bold"
              >
                −
              </button>
              <span className="text-4xl font-bold text-emerald-400 w-20 text-center">{refs}</span>
              <button
                onClick={() => setRefs(Math.min(500, refs + 1))}
                className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-lg font-bold"
              >
                +
              </button>
            </div>
            <input
              type="range"
              min={1}
              max={500}
              value={refs}
              onChange={(e) => setRefs(Number(e.target.value))}
              className="w-full max-w-sm mt-4 accent-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-gray-700/30">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Monthly</span>
              <div className="text-2xl font-bold text-emerald-400">${monthly.toFixed(0)}</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-700/30">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Yearly</span>
              <div className="text-2xl font-bold text-amber-400">${yearly.toFixed(0)}</div>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">
            Based on avg. plan price of ${avgPlan}/mo. Actual earnings vary by plan tier and upgrades.
          </p>
        </div>
      </div>
    </section>
  );
}

function AffiliateResourcesSection() {
  const [requested, setRequested] = useState<string | null>(null);

  const handleRequest = (title: string) => {
    setRequested(title);
    setTimeout(() => setRequested(null), 2500);
  };

  return (
    <section className="px-6 py-16 bg-gray-900/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Affiliate Resources</h2>
        <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
          Everything you need to start promoting Titan effectively — free for all enrolled affiliates.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((r) => (
            <div
              key={r.title}
              className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/40 hover:border-emerald-500/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="group-hover:scale-110 transition-transform">{r.icon}</div>
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-mono px-2 py-0.5 rounded border border-gray-700">
                  {r.tag}
                </span>
              </div>
              <h3 className="font-semibold mb-1 text-sm">{r.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">{r.desc}</p>
              <button
                onClick={() => handleRequest(r.title)}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium inline-flex items-center gap-1"
              >
                {requested === r.title ? (
                  <>✓ Download link sent to your email</>
                ) : (
                  <>Request Access <ArrowRight className="w-3 h-3" /></>
                )}
              </button>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-xs text-center mt-6">
          Resources are free for all enrolled affiliates. Sign up first, then download instantly from your dashboard.
        </p>
      </div>
    </section>
  );
}

export default function ReferralClient() {
  return (
    <>
      <EarningsCalculatorSection />
      <CopyLinkDemoSection />
      <AffiliateResourcesSection />
    </>
  );
}
