'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return <div className="w-9 h-9" />; // placeholder to prevent layout shift
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? (
        <Sun size={16} className="text-amber-400" />
      ) : (
        <Moon size={16} className="text-gray-500" />
      )}
    </button>
  );
}
