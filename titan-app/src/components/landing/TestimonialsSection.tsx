import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { Users, Bot, Trophy, TrendingUp } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "marcus-l",
    name: "Marcus L.",
    role: "Solo Developer",
    content: "Titan replaces 3 SaaS tools I was paying for. My mascot tracks my trading bot, runs my blog SEO checks, and even manages my affiliate links — all from one dashboard.",
    rating: 5 as const,
    badge: "Lv. 18 — 8,420 XP",
  },
  {
    id: "sarah-k",
    name: "Sarah K.",
    role: "Startup Founder",
    content: "The progression system is genius. I actually enjoy optimizing my workflows because every optimization gives XP. It turns productivity into a game I want to play.",
    rating: 5 as const,
    badge: "Lv. 24 — 11,950 XP",
  },
  {
    id: "james-c",
    name: "James C.",
    role: "Digital Nomad",
    content: "I built and certified a gold-tier travel planning agent in under 2 hours. The skill forge is the fastest agent builder I've used — and I've used most of them.",
    rating: 4 as const,
    badge: "Lv. 12 — 5,680 XP",
  },
  {
    id: "elena-m",
    name: "Elena M.",
    role: "Freelance Designer",
    content: "I was skeptical about gamified productivity, but Titan actually works. I've automated my client intake, invoicing, and portfolio updates. My Spark mascot is at level 15 already.",
    rating: 5 as const,
    badge: "Lv. 15 — 6,230 XP",
  },
  {
    id: "ray-t",
    name: "Ray T.",
    role: "DevOps Engineer",
    content: "The orbital swarm visualization alone is worth it. I can see all my agents working in real-time, and the God-Tier automation is legit — it's like having 10 interns.",
    rating: 4 as const,
    badge: "Lv. 28 — 14,100 XP",
  },
];

const TRUST_STATS = [
  { label: "Beta Users", value: "50+", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Agents Built", value: "340+", icon: Bot, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Skills Certified", value: "180+", icon: Trophy, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Avg. XP Gained", value: "4,200", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function TestimonialsSection() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/50">
      <div className="py-16 sm:py-20">
        <TestimonialCarousel testimonials={TESTIMONIALS} />

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {TRUST_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`${s.bg} rounded-xl px-4 py-4 flex flex-col items-center text-center border border-gray-100`}>
                <div className={`${s.color} mb-1.5`}><Icon className="h-4 w-4" /></div>
                <span className="text-xl font-bold text-gray-900">{s.value}</span>
                <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
