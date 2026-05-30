'use client';

import React, { useState, useEffect, useCallback } from 'react';

const TELEMETRY_KEY = 'ecosystem_telemetry_consent';
const DISMISSED_KEY = 'ecosystem_telemetry_dismissed';

export default function EcosystemToggle() {
 const [enabled, setEnabled] = useState(false);
 const [dismissed, setDismissed] = useState(true);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 setMounted(true);
 try {
 const val = localStorage.getItem(TELEMETRY_KEY);
 setEnabled(val === 'true');
 const dismissVal = localStorage.getItem(DISMISSED_KEY);
 if (dismissVal === null) {
 // First visit — show the popup
 setDismissed(false);
 } else {
 setDismissed(dismissVal === 'true');
 }
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

 const handleDismiss = useCallback(() => {
 setDismissed(true);
 try {
 localStorage.setItem(DISMISSED_KEY, 'true');
 } catch {
 // Silently fail
 }
 }, []);

 if (!mounted || dismissed) return null;

 return (
 <div className="fixed bottom-4 right-4 z-50 max-w-xs">
 <div className="relative rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg p-3 text-xs">
 <button
 onClick={handleDismiss}
 className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 text-[11px] leading-none font-bold shadow-sm transition-colors"
 aria-label="Dismiss"
 >
 ✕
 </button>
 <p className="font-medium text-gray-700 mb-2">
 🤝 Help improve the ecosystem
 </p>
 <label className="flex items-start gap-2 cursor-pointer">
 <input
 type="checkbox"
 checked={enabled}
 onChange={(e) => handleToggle(e.target.checked)}
 className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
 />
 <span className="text-gray-500 leading-tight">
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
