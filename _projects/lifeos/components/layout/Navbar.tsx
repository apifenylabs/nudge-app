"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/categories/meal-planning", label: "Meal Planning" },
  { href: "/categories/personal-finance", label: "Personal Finance" },
  { href: "/categories/solopreneur", label: "Solopreneur" },
  { href: "/categories/travel", label: "Travel" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Check stored preference
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/80 dark:bg-surfaceDark/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-display font-semibold"
        >
          <span className="gradient-text">⚡ Cofounder</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="btn-ghost text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="btn-ghost p-2"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Desktop CTA */}
          <Link
            href="/waitlist"
            className="hidden md:inline-flex btn-primary text-sm"
          >
            Join Waitlist
            <ArrowRight size={14} />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden btn-ghost p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream dark:bg-surfaceDark border-t border-border dark:border-darkBorder animate-slide-up">
          <nav className="section-container py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-ink dark:text-cream hover:bg-accent/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/waitlist"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 btn-primary w-full justify-center"
            >
              Join Waitlist
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
