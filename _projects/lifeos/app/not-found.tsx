"use client";

import Link from "next/link";
import { ArrowLeft, Compass, Bot } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="section-container">
        <div className="max-w-md mx-auto text-center">
          {/* Illustration */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-accent/5 flex items-center justify-center">
              <Compass size={56} className="text-accent/40" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Bot size={28} className="text-accent" />
            </div>
          </div>

          {/* Error code */}
          <div className="text-7xl sm:text-8xl font-bold gradient-text mb-2">
            404
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-ink dark:text-cream mb-3">
            Lost in the Sauce
          </h1>

          {/* Description */}
          <p className="text-muted mb-8 leading-relaxed">
            Even AI cofounders wander off the map sometimes. This page
            doesn&apos;t exist — but we can get you back on course.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn-primary">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <Link href="/categories/meal-planning" className="btn-secondary">
              Try Meal Planning
            </Link>
          </div>

          {/* Helper text */}
          <p className="mt-8 text-xs text-muted/50">
            Page not found · Check the URL or head back to start
          </p>
        </div>
      </div>
    </div>
  );
}
