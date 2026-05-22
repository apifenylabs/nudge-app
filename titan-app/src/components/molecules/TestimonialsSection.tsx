"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Digital Nomad · Travel Blogger",
    avatar: "🌍",
    text: "Titan saved me 12 hours a week on itinerary planning. The swarm agents handle research, budgeting, and alerts while I focus on creating content.",
    rating: 5,
    color: "#14B8A6",
  },
  {
    name: "Marcus Rivera",
    role: "Freelance Developer",
    avatar: "⚡",
    text: "I built my first custom skill in under 10 minutes. The Skill Forge is seriously powerful — it's like having a dev team in your terminal.",
    rating: 5,
    color: "#F59E0B",
  },
  {
    name: "Priya Kapoor",
    role: "Solo Entrepreneur",
    avatar: "🚀",
    text: "The ROI widget alone pays for itself. My agents track market data, manage invoices, and even suggest cost optimizations I never thought of.",
    rating: 5,
    color: "#10B981",
  },
  {
    name: "Alex Thompson",
    role: "Product Manager · Remote",
    avatar: "🎯",
    text: "Leveling up agents feels like a game, but the productivity gains are real. Swarm orchestration is a game-changer for cross-functional tracking.",
    rating: 5,
    color: "#7C3AED",
  },
];

export function TestimonialsSection() {
  const doubled = useMemo(() => [...TESTIMONIALS, ...TESTIMONIALS], []);

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-14">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-titan-golden/10 border border-titan-golden/20">
            <Star className="h-3 w-3 text-titan-golden" />
            <span className="text-[10px] font-mono text-titan-golden tracking-wider uppercase">
              Trusted by builders
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            <span className="titan-text-gradient">What early users say</span>
          </h2>
        </motion.div>

        {/* Scrolling testimonial carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none pb-2 snap-x snap-mandatory -mx-4 sm:mx-0 px-4 sm:px-0">
            {doubled.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                className="snap-start shrink-0 w-[280px] sm:w-[320px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % TESTIMONIALS.length) * 0.1 }}
              >
                <div
                  className="p-4 sm:p-5 rounded-2xl bg-titan-card/60 border border-titan-border/20 backdrop-blur-sm h-full flex flex-col transition-all duration-300 hover:border-opacity-50"
                  style={{
                    borderLeft: `3px solid ${t.color}50`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${t.color}70`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(51,65,85,0.2)`;
                    e.currentTarget.style.borderLeftColor = `${t.color}50`;
                  }}
                >
                  {/* Rating stars */}
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {Array.from({ length: t.rating }, (_, r) => (
                      <Star
                        key={r}
                        className="h-3 w-3"
                        style={{ fill: t.color, color: t.color }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-titan-text/85 leading-relaxed mb-3 flex-1">
                    <Quote className="h-3 w-3 inline -ml-0.5 mr-0.5 opacity-40" style={{ color: t.color }} />
                    {t.text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2.5 pt-2 border-t border-titan-border/20">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{
                        background: `${t.color}15`,
                        border: `1px solid ${t.color}25`,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-mono font-medium text-titan-text/90">
                        {t.name}
                      </p>
                      <p className="text-[10px] font-mono text-titan-muted/60">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
