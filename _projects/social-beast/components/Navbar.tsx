"use client";

import { Bell, Sun, Moon, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm border-b border-border dark:border-dark-border">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Mobile menu toggle (hamburger hidden — sidebar collapsible) */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SB</span>
          </div>
          <span className="font-semibold text-ink dark:text-cream">Social Beast</span>
        </div>

        {/* Search — desktop */}
        <div className="hidden md:flex relative flex-1 max-w-md ml-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search posts..."
            className="input-field pl-9 py-2 text-sm"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="btn-ghost p-2 relative" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>
          <button
            onClick={toggleDark}
            className="btn-ghost p-2"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
