"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [vertical, setVertical] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-surfaceDark dark:to-ink">
      <div className="section-padding">
        <div className="section-container">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Mail size={32} className="text-accent" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-3">
                Join the Waitlist
              </h1>
              <p className="text-muted dark:text-cream/80">
                Be the first to get access to your AI Cofounder. We'll notify you when your vertical is ready.
              </p>
            </div>

            {submitted ? (
              <div className="card p-8 text-center animate-scale-in">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={24} className="text-success" />
                </div>
                <h2 className="text-xl font-semibold text-ink dark:text-cream mb-2">
                  You're on the list!
                </h2>
                <p className="text-muted dark:text-cream/80 text-sm">
                  We'll email you at <strong className="text-ink dark:text-cream">{email}</strong> when the AI Cofounder for{" "}
                  {vertical && <strong className="text-accent">{vertical}</strong>} is ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 animate-slide-up">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
                      What interests you?
                    </label>
                    <select
                      value={vertical}
                      onChange={(e) => setVertical(e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">Select a vertical...</option>
                      <option value="Meal Planning">🥗 Meal Planning & Nutrition</option>
                      <option value="Personal Finance">💰 Personal Finance</option>
                      <option value="Solopreneur">⚡ Solopreneur / Small Biz</option>
                      <option value="Travel">✈️ Travel Planning</option>
                      <option value="All">🔥 All of the above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
                      Your email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center text-base py-3">
                    Join the Waitlist <ArrowRight size={18} />
                  </button>
                  <p className="text-xs text-muted dark:text-cream/60 text-center">
                    No spam. Unsubscribe anytime. We'll only email you about your AI Cofounder.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
