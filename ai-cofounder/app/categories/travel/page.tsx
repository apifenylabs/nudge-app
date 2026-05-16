"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Compass, Map, Calendar, DollarSign, Lightbulb, Star, Clock, Users } from "lucide-react";

const STEPS = [
  { icon: Map, title: "Where & When?", desc: "Tell us your destination, dates, and travel style." },
  { icon: DollarSign, title: "Budget & Vibe", desc: "Set your budget range and travel vibe — luxury, backpacker, family-friendly, or adventure." },
  { icon: Star, title: "Your Interests", desc: "Foodie? Hiker? History buff? Culture seeker? We tailor every recommendation." },
  { icon: Compass, title: "AI Explores", desc: "We scan 50+ sources for real reviews, hidden gems, and price comparisons." },
  { icon: Calendar, title: "Your Itinerary", desc: "A complete day-by-day plan with activities, restaurants, transport, and costs." },
];

const SAMPLE_ITINERARY = [
  { day: "Day 1", title: "Arrival & City Immersion", items: [
    { time: "09:00", activity: "Arrive & check in at hotel", cost: "$0" },
    { time: "10:30", activity: "Walking tour of old quarter", cost: "$0" },
    { time: "13:00", activity: "Lunch: Local recommendation (hidden gem)", cost: "$15" },
    { time: "15:00", activity: "Visit rooftop viewpoint", cost: "$5" },
    { time: "19:00", activity: "Sunset dinner cruise", cost: "$45" },
  ]},
  { day: "Day 2", title: "Nature & Adventure", items: [
    { time: "07:00", activity: "Guided nature hike", cost: "$25" },
    { time: "12:00", activity: "Picnic at scenic overlook", cost: "$10" },
    { time: "14:30", activity: "Snorkeling / water activities", cost: "$35" },
    { time: "18:00", activity: "Street food tour", cost: "$12" },
    { time: "21:00", activity: "Night market exploration", cost: "$0" },
  ]},
  { day: "Day 3", title: "Culture & Departure", items: [
    { time: "08:00", activity: "Local cooking class", cost: "$30" },
    { time: "11:00", activity: "Museum / cultural site", cost: "$10" },
    { time: "13:30", activity: "Farewell lunch", cost: "$18" },
    { time: "15:00", activity: "Airport transfer with scenic route", cost: "$20" },
  ]},
];

const FEATURES_COMING = [
  { icon: Users, title: "Group Planning", desc: "Collaborative trip building with friends or family." },
  { icon: Clock, title: "Real-Time Adjustments", desc: "AI adjusts your plan on the fly — weather, delays, new finds." },
  { icon: DollarSign, title: "Price Alerts", desc: "Get notified when flights, hotels, or activities drop in price." },
  { icon: Star, title: "Hidden Gems Engine", desc: "Recommendations from real locals, not tourist traps." },
];

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-surfaceDark dark:to-ink">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-travel/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="section-container relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-travel/10 text-travel text-sm font-medium mb-6">
              <Compass size={14} />
              ✈️ Travel Cofounder
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink dark:text-cream mb-4">
              Your AI Travel Planner
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-8">
              Skip the 20-tab research spiral. Get a personalized itinerary with real recommendations, price comparisons, and hidden gems — all in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary bg-travel hover:bg-orange-600 text-lg px-8 py-3">
                Get Your First Itinerary — Free <ArrowRight size={18} />
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white/50 dark:bg-ink/30">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-ink dark:text-cream mb-4">
            How It Works
          </h2>
          <p className="text-muted text-center max-w-xl mx-auto mb-12">
            Five questions. One complete trip. No tabs required.
          </p>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-travel/40 via-travel/20 to-transparent" />
            <div className="space-y-12 lg:space-y-16">
              {STEPS.map((step, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  <div className="flex-1">
                    <div className={`card p-6 lg:p-8 animate-on-scroll ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-flex items-center gap-2 mb-3 ${i % 2 === 0 ? 'ml-auto' : ''}`}>
                        <span className="step-number bg-travel/10 text-travel">{i + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-ink dark:text-cream mb-2">{step.title}</h3>
                      <p className="text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-12 h-12 rounded-full bg-travel/10 items-center justify-center flex-shrink-0">
                    <step.icon size={20} className="text-travel" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Itinerary Preview */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-ink dark:text-cream mb-4">
            Sample 3-Day Itinerary
          </h2>
          <p className="text-muted text-center max-w-xl mx-auto mb-12">
            What your personalized AI itinerary looks like. Real costs. Real recommendations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_ITINERARY.map((day, i) => (
              <div key={i} className="card p-6 animate-scale-in">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={20} className="text-travel" />
                  <h3 className="font-semibold text-ink dark:text-cream">{day.day}</h3>
                </div>
                <p className="text-sm text-travel font-medium mb-4">{day.title}</p>
                <div className="space-y-3">
                  {day.items.map((item, j) => (
                    <div key={j} className="flex items-start justify-between gap-2 pb-3 border-b border-border dark:border-darkBorder last:border-0">
                      <div>
                        <p className="text-xs text-muted font-mono">{item.time}</p>
                        <p className="text-sm text-ink dark:text-cream">{item.activity}</p>
                      </div>
                      <span className="text-xs font-mono text-travel whitespace-nowrap">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted text-sm">
              Total estimated cost: <span className="font-semibold text-ink dark:text-cream">$270</span> for 3 days
            </p>
          </div>
        </div>
      </section>

      {/* Coming Features */}
      <section className="section-padding bg-white/50 dark:bg-ink/30">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <span className="badge badge-travel">Coming Soon</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-ink dark:text-cream mb-12">
            What's Coming
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES_COMING.map((feature, i) => (
              <div key={i} className="card p-6 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-travel/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} className="text-travel" />
                </div>
                <h3 className="font-semibold text-ink dark:text-cream mb-2">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card p-12 text-center bg-gradient-to-br from-travel/5 to-accent/5">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-4">
              Ready to Plan Your Next Trip?
            </h2>
            <p className="text-muted max-w-lg mx-auto mb-8">
              Get a personalized itinerary created by AI that knows your style, budget, and preferences.
            </p>
            <button className="btn-primary bg-travel hover:bg-orange-600 text-lg px-10 py-3">
              Join the Waitlist <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
