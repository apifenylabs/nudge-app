import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

const FOOTER_LINKS = {
  Products: [
    { href: "/categories/meal-planning", label: "Meal Planning AI" },
    { href: "/categories/personal-finance", label: "Personal Finance AI" },
    { href: "/categories/solopreneur", label: "Solopreneur AI" },
    { href: "/categories/travel", label: "Travel AI" },
  ],
  Company: [
    { href: "/blog", label: "Blog" },
    { href: "/waitlist", label: "Join Waitlist" },
  ],
  "More From Us": [
    { href: "https://familytravelasia.com", label: "Family Travel Asia" },
    { href: "https://ev-charging-asia.vercel.app", label: "EV Charging Asia" },
    { href: "https://apifeny-ai.vercel.app", label: "Apifeny AI Tools" },
  ],
};

export default function CrossSiteFooter() {
  return (
    <footer className="border-t border-border dark:border-darkBorder bg-white dark:bg-surfaceDark">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-lg font-display font-semibold gradient-text"
            >
              ⚡ Cofounder
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Your AI cofounder — a guided agent that helps you ideate, build,
              launch, and scale. Starting with your niche.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/70 dark:text-cream/70 hover:text-accent dark:hover:text-accentLight transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/50 dark:border-darkBorder/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            &copy; {new Date().getFullYear()} Cofounder. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Sparkles size={12} className="text-accent" /> and{" "}
            <Heart size={12} className="text-highlight" /> by agents for humans
          </p>
        </div>
      </div>
    </footer>
  );
}
