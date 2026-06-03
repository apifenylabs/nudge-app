'use client';

import { useEffect } from 'react';

/**
 * PremiumThemeInitializer
 * 
 * Sets CSS custom properties for dark/light mode at the document level
 * based on the user's system preference. Provides smooth transitions
 * and a consistent luxury theme across the entire site.
 * 
 * This runs once on mount and listens for system preference changes.
 */
export default function PremiumThemeInitializer() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Apply initial theme
    applyTheme(mediaQuery.matches);

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => {
      applyTheme(e.matches);
    };
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // This component renders nothing — it's purely a side-effect initializer
  return null;
}
