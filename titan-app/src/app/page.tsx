"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, ChevronRight, Check, Mail, Swords,
} from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import MascotGrid from "@/components/landing/MascotGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import GodTierSection from "@/components/landing/GodTierSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustBadges from "@/components/landing/TrustBadges";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import ProgressionSection from "@/components/landing/ProgressionSection";
import SkinSystem from "@/components/landing/SkinSystem";
import QuickStartSection from "@/components/landing/QuickStartSection";

const MASCOT_OPTIONS = [
  { name: "Sage", emoji: "🦉" },
  { name: "Spark", emoji: "⚡" },
  { name: "Aegis", emoji: "🛡️" },
  { name: "Drift", emoji: "🐉" },
  { name: "Pixel", emoji: "🎮" },
];

export default function LandingPage() {
  const router = useRouter();
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistMascot, setWaitlistMascot] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistMessage, setWaitlistMessage] = useState("");

  const trackCTA = useCallback((label: string) => {
    try { track("landing_cta", { label }); } catch {}
  }, []);

  const handleSignup = useCallback(() => {
    trackCTA("hero_start_free");
    router.push("/login");
  }, [router, trackCTA]);

  const handleSeeHow = useCallback(() => {
    trackCTA("hero_see_how");
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [trackCTA]);

  const handleWaitlistSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.includes("@")) return;

    setWaitlistStatus("loading");
    setWaitlistMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail,
          name: waitlistName,
          preferredMascot: waitlistMascot,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setWaitlistStatus("success");
        setWaitlistMessage(data.message || "You're on the list! 🎉");
        trackCTA("waitlist_signup");
      } else {
        setWaitlistStatus("error");
        setWaitlistMessage(data.error || "Something went wrong.");
      }
    } catch {
      setWaitlistStatus("error");
      setWaitlistMessage("Network error. Please try again.");
    }
  }, [waitlistEmail, waitlistName, waitlistMascot, trackCTA]);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }]} />

      {/* SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Titan — AI Agent Platform",
            operatingSystem: "Web",
            applicationCategory: "AIApplication",
            description:
              "Build your own AI agent collective with Titan. Gamified XP progression, 5 iconic companion archetypes, skill forge, certifications, and God-Tier unlocks.",
            url: "https://titan-app-puce.vercel.app",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "Apifeny Labs" },
          }),
        }}
      />

      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-200/50 group-hover:scale-105">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">Titan</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign In</a>
            <Button size="sm" onClick={() => { trackCTA("nav_get_started"); router.push("/login"); }}>
              Get Started
            </Button>
          </nav>
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => { trackCTA("nav_start_free_mobile"); router.push("/login"); }}>
              Start Free
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-teal-50/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-amber-50/60 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50">
              <Sparkles className="h-3 w-3 mr-1" />
              Your AI Swarm, Evolved
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
              Your AI Agent
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
                Grows With You
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed">
              Pick a companion. Give it skills. Watch it evolve from a baby mascot into a God-Tier
              AI swarm that works for you — managing tasks, analyzing data, and automating your life.
              Like raising a Pokémon, but it actually does your work.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button size="lg" onClick={handleSignup} className="w-full sm:w-auto group">
                <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Build Your First Agent — Free
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleSeeHow} className="w-full sm:w-auto">
                See How It Works
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                No credit card
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                Start in 2 minutes
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                340+ agents built
              </span>
            </div>
          </div>

          <MascotGrid />
        </div>
      </section>

      <HowItWorks />
      <QuickStartSection />
      <GodTierSection />
      <TestimonialsSection />
      <TrustBadges />
      <FeaturesSection />
      <ProgressionSection />
      <SkinSystem />
      <PricingSection />

      {/* ── Early Access Waitlist ── */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-teal-50/30 via-white to-amber-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-teal-200 bg-teal-50 text-teal-700">
              <Mail className="h-3 w-3 mr-1" />
              Private Beta
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Join the Waitlist
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We&apos;re onboarding builders in waves. Sign up with your email and tell us your
              preferred companion — we&apos;ll send you an invite when your cohort opens, plus
              exclusive early-bird pricing.
            </p>

            {waitlistStatus === "success" ? (
              <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-8">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-teal-600" />
                </div>
                <p className="text-lg font-semibold text-teal-700 mb-1">{waitlistMessage}</p>
                <p className="text-sm text-gray-500">We&apos;ll email you when your cohort opens.</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />
                <select
                  value={waitlistMascot}
                  onChange={(e) => setWaitlistMascot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 bg-white"
                >
                  <option value="">Pick your companion (optional)</option>
                  {MASCOT_OPTIONS.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.emoji} {m.name}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  disabled={waitlistStatus === "loading"}
                  className="w-full"
                >
                  {waitlistStatus === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Signing up...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Join Waitlist
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>

                {waitlistStatus === "error" && (
                  <p className="text-sm text-red-500 mt-2">{waitlistMessage}</p>
                )}
              </form>
            )}

            <p className="text-xs text-gray-400 mt-6">
              <span className="font-medium text-gray-500">Join 340+ creators</span> building their AI swarm. No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="border border-gray-200 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Ready to ascend?
            </h2>
            <p className="text-gray-500 mb-6">
              Start free. No credit card required. Your swarm awaits.
            </p>
            <Button size="lg" onClick={() => { trackCTA("final_cta_enter_forge"); router.push("/login"); }}>
              <Swords className="h-4 w-4 mr-2" />
              Enter the Forge
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Titan</span>
            <span className="text-xs text-gray-400">Phasr Forge · © 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="/compare" className="hover:text-gray-600 transition-colors">Compare</a>
            <span className="text-gray-300">·</span>
            <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
            <span className="text-gray-300">·</span>
            <span>Built with shadcn/ui</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
