/**
 * EcosystemToggle — Client component for telemetry opt-in/out.
 *
 * Renders a small card at the bottom of any page:
 *   "Help improve the ecosystem"
 *   [Toggle] "Send anonymous usage data to help make this site better"
 *
 * Usage in layout.tsx (after 'use client'):
 *   import EcosystemToggle from '@/components/EcosystemToggle';
 *   ...
 *   <EcosystemToggle />
 *
 * Styling: Works on light/dark backgrounds via Tailwind. Invisible to users who
 * don't interact with it — absolutely positioned, non-intrusive.
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';

const TELEMETRY_KEY = 'ecosystem_telemetry_consent';

export default function EcosystemToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const val = localStorage.getItem(TELEMETRY_KEY);
      setEnabled(val === 'true');
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleToggle = useCallback((newVal: boolean) => {
    setEnabled(newVal);
    try {
      localStorage.setItem(TELEMETRY_KEY, newVal ? 'true' : 'false');
    } catch {
      // Silently fail
    }
  }, []);

  // Don't render on SSR
  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs">
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg p-3 text-xs">
        <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">
          🤝 Help improve the ecosystem
        </p>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => handleToggle(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-gray-500 dark:text-gray-400 leading-tight">
            Send anonymous usage data to help make this site better
          </span>
        </label>
        <div className="mt-2 flex justify-between items-center">
          <span className={`text-[10px] font-medium ${enabled ? 'text-green-500' : 'text-gray-400'}`}>
            {enabled ? '✓ Opted in' : '○ Opted out'}
          </span>
          <a
            href="/privacy"
            className="text-[10px] text-blue-500 hover:text-blue-600 underline"
          >
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
}
