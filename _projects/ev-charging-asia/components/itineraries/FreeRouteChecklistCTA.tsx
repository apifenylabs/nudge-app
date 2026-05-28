'use client';

import { useState, useCallback } from 'react';
import { Download, Check, Mail, Loader2, FileText } from 'lucide-react';

interface FreeRouteChecklistCTAProps {
  routeName: string;
  routeSlug: string;
}

/**
 * Free Route Checklist Lead Magnet
 * 
 * Converts visitors by offering a free "10-Point EV Road Trip Checklist" in
 * exchange for their email. The download triggers immediately after signup
 * and the email is stored for follow-up sequences.
 * 
 * Fully additive — displayed below the hero section on every route detail page.
 */
export default function FreeRouteChecklistCTA({ routeName, routeSlug }: FreeRouteChecklistCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  const generateChecklistText = useCallback((name: string): string => {
    const lines: string[] = [];
    const sep = '═'.repeat(56);

    lines.push(sep);
    lines.push('  🚗  10-POINT EV ROAD TRIP CHECKLIST');
    lines.push(`  ${name.toUpperCase()}`);
    lines.push(sep);
    lines.push('');
    lines.push('  ☐  1.  CHECK RANGE — Know your EV\'s real-world range');
    lines.push('          Account for elevation, AC/heat, and highway speeds.');
    lines.push('          Route distance: check total km vs. your range x charges.');
    lines.push('');
    lines.push('  ☐  2.  PLAN CHARGING STOPS — Map every charge point');
    lines.push('          Verify charger type (CCS2, CHAdeMO, GB/T, Type 2).');
    lines.push('          Download charging apps: PlugShare, ChargePoint, local networks.');
    lines.push('          Have backup stops for every charge.');
    lines.push('');
    lines.push('  ☐  3.  DOWNLOAD OFFLINE MAPS — Cell service isn\'t guaranteed');
    lines.push('          Google Maps offline: save the entire route region.');
    lines.push('          Download maps.me or MapsPro for EV routing.');
    lines.push('          Save screenshots of charging station locations.');
    lines.push('');
    lines.push('  ☐  4.  PACK EV ACCESSORIES — Don\'t get caught out');
    lines.push('          Type 2 charging cable (mode 3).');
    lines.push('          CCS2-to-CHAdeMO adapter (for Japan/Singapore).');
    lines.push('          Portable Level 1 charger (granny charger) for emergencies.');
    lines.push('          Tire repair kit + 12V air compressor.');
    lines.push('');
    lines.push('  ☐  5.  BOOK EV-FRIENDLY ACCOMMODATION — Charge while you sleep');
    lines.push('          Filter Booking.com for "EV charging" amenity.');
    lines.push('          Call ahead to confirm charger availability (not just "has EV").');
    lines.push('          Ask about charging speed and whether it\'s reserved for guests.');
    lines.push('');
    lines.push('  ☐  6.  CHECK CROSS-BORDER REQUIREMENTS — Multi-country trips');
    lines.push('          Vehicle import permit (carnet de passage if needed).');
    lines.push('          Insurance: green card / cross-border coverage.');
    lines.push('          Toll passes: Touch \'n Go (MY), Autopass (SG), ETC (JP).');
    lines.push('          Road tax and EV incentives/rebates at border.');
    lines.push('');
    lines.push('  ☐  7.  PACK FAMILY ESSENTIALS — The kids will thank you');
    lines.push('          Snacks and water bottles (charging stops are unpredictable).');
    lines.push('          Travel adapters for different charging plug types.');
    lines.push('          Sun shades for windows (Asia sun is intense).');
    lines.push('          First aid kit + motion sickness meds for winding roads.');
    lines.push('          Entertainment: tablets, books, car games for charging waits.');
    lines.push('');
    lines.push('  ☐  8.  PREPARE FOR EMERGENCIES — Hope for the best, plan for worst');
    lines.push('          Roadside assistance number for each country.');
    lines.push('          Emergency contact: embassy/consulate numbers.');
    lines.push('          Physical map (phones die). Cash for tolls/tips (cards fail).');
    lines.push('          Know your EV\'s tow mode instructions.');
    lines.push('');
    lines.push('  ☐  9.  OPTIMIZE DRIVING FOR RANGE — Get the most out of each charge');
    lines.push('          Use Eco/Energy-Saving mode.');
    lines.push('          Regenerative braking on max setting (one-pedal mode).');
    lines.push('          Maintain steady speed: 90-100 km/h on highways.');
    lines.push('          Preheat/precool cabin while plugged in.');
    lines.push('          Avoid rapid acceleration and hard braking.');
    lines.push('');
    lines.push('  ☐  10.  SHARE YOUR ROUTE — Safety first');
    lines.push('           Share your live location with family/friends.');
    lines.push('           Post your planned route on social media for tips.');
    lines.push('           Tag @evchargingasia for features!');
    lines.push('');
    lines.push(sep);
    lines.push('  ✅ Checklist by EV Charging Asia (ev-charging-asia.vercel.app)');
    lines.push('  🌏 Family + Luxury EV Road Trips Across Asia');
    lines.push(sep);

    return lines.join('\n');
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setErrorMsg('');
    setStatus('submitting');

    try {
      // Register subscription
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: `free-checklist-${routeSlug}` }),
      });

      if (!res.ok && res.status !== 409) {
        throw new Error('Subscription failed');
      }

      // Trigger download immediately
      const text = generateChecklistText(routeName);
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${routeSlug}-ev-checklist.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }, [email, routeName, routeSlug, generateChecklistText]);

  // Success state
  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <Check size={16} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-800">Checklist Downloading!</p>
          <p className="text-xs text-emerald-600 mt-0.5">Your 10-point EV road trip checklist is downloading now. Check your inbox for travel tips and route updates.</p>
        </div>
      </div>
    );
  }

  // Idle: compact banner with inline form toggle
  if (!showForm) {
    return (
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center shrink-0">
            <FileText size={16} className="text-sky-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">📋 Free Route Checklist</p>
            <p className="text-xs text-gray-500 truncate">10-point EV road trip checklist — drive with confidence</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="shrink-0 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg transition-all whitespace-nowrap"
        >
          Get Free Guide
        </button>
      </div>
    );
  }

  // Form state
  return (
    <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center shrink-0">
          <Mail size={16} className="text-sky-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">📋 Get Your Free EV Route Checklist</p>
          <p className="text-xs text-gray-500">Enter your email & we'll send you the 10-point checklist instantly</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          required
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="shrink-0 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center gap-1.5"
        >
          {status === 'submitting' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Download size={14} />
          )}
          {status === 'submitting' ? 'Sending...' : 'Send & Download'}
        </button>
      </form>
      {errorMsg && <p className="text-xs text-red-500 mt-1.5">{errorMsg}</p>}
      <p className="text-[10px] text-gray-400 mt-2">No spam. Unsubscribe anytime. We'll send you route tips and updates.</p>
    </div>
  );
}
