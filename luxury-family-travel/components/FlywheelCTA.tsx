'use client';

import { Compass, ArrowRight, Sparkles, Heart, Crown } from 'lucide-react';
import Link from 'next/link';

export default function FlywheelCTA() {
  return (
    <section className="relative mb-16">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy rounded-2xl overflow-hidden border border-gold/20 shadow-xl">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-5 right-5 w-32 h-32 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-5 left-5 w-48 h-48 bg-gold rounded-full blur-3xl" />
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="relative px-6 sm:px-10 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/30 text-gold text-xs font-medium mb-4">
                <Compass size={12} />
                <Sparkles size={12} />
                Two sides of family travel
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-cream mb-3 leading-tight">
                Inspiring your escape. Helping you plan it.
              </h3>
              <div className="space-y-3 text-sm text-cream/60">
                <p className="flex items-start gap-2">
                  <span className="text-gold shrink-0 mt-0.5"><Crown size={14} /></span>
                  <span><strong className="text-cream">Here:</strong> The ultra-curated, dream-worthy luxury experiences you&apos;ll want to book this year.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-gold shrink-0 mt-0.5"><Heart size={14} /></span>
                  <span><strong className="text-cream">Our sister site Family Travel Asia:</strong> Honest parent reviews, budget-friendly itineraries, real tips from real families who&apos;ve been there.</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="https://familytravelasia.com"
                target="_blank"
                className="group flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all shadow-lg active:scale-[0.98]"
              >
                <Heart size={16} />
                Practical Tips at Family Travel Asia
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
