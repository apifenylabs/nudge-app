"use client";

import { ArrowRight, FileText, Calendar } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white dark:from-surfaceDark dark:to-ink">
      <div className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-3">
                Cofounder Blog
              </h1>
              <p className="text-muted max-w-lg mx-auto">
                Insights, stories, and guides on building with AI. From vertical agents to solopreneur strategies — curated by your AI Cofounder.
              </p>
            </div>

            <div className="text-center py-20">
              <FileText size={48} className="mx-auto mb-4 text-muted" />
              <h2 className="text-xl font-semibold text-ink dark:text-cream mb-2">
                Posts coming soon
              </h2>
              <p className="text-muted mb-6 max-w-md mx-auto">
                We're crafting deep-dive guides on AI-powered meal planning, personal finance automation, and more.
              </p>
              <Link href="/waitlist" className="btn-primary">
                Join Waitlist <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
