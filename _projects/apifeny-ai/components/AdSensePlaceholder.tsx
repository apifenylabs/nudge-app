// ════════════════════════════════════════════════════════════════
// AdSensePlaceholder — Display Ad Slot Ready for Google AdSense
// ════════════════════════════════════════════════════════════════
// Once AdSense is approved, uncomment the <ins> block and remove
// the placeholder overlay. The component maintains the correct
// ad container dimensions so layout is stable before/after ads.
//
// Steps to activate:
//   1. Get AdSense approval (https://adsense.google.com)
//   2. Add this to layout.tsx <head>:
//      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXX" crossorigin="anonymous" />
//   3. Replace ca-pub-XXXX in this component
//   4. Uncomment the real ad block below
// ════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';

interface AdSensePlaceholderProps {
  /** Ad format slot */
  slot?: 'horizontal' | 'rectangle' | 'vertical';
  /** Optional CSS class override */
  className?: string;
}

const SLOT_DIMENSIONS: Record<string, { width: string; height: string; label: string }> = {
  horizontal: { width: '728px', height: '90px', label: '728×90 Leaderboard' },
  rectangle: { width: '336px', height: '280px', label: '336×280 Large Rectangle' },
  vertical: { width: '300px', height: '600px', label: '300×600 Skyscraper' },
};

export default function AdSensePlaceholder({ slot = 'horizontal', className = '' }: AdSensePlaceholderProps) {
  const dims = SLOT_DIMENSIONS[slot];
  const [adsEnabled, setAdsEnabled] = useState(false);

  useEffect(() => {
    // Check if AdSense has been initialized
    // When AdSense code is added to layout, flip this to true
    const checkAdSense = () => {
      if (typeof (window as any).adsbygoogle !== 'undefined') {
        setAdsEnabled(true);
      }
    };
    checkAdSense();
    const interval = setInterval(checkAdSense, 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── REAL ADSENSE AD (DISABLED UNTIL APPROVED) ───
  // When ready, uncomment this block:
  //
  // if (adsEnabled) {
  //   return (
  //     <div className={`flex justify-center ${className}`}>
  //       <ins
  //         className="adsbygoogle"
  //         style={{ display: 'block', width: dims.width, height: dims.height }}
  //         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  //         data-ad-slot="XXXXXXXXXX"
  //         data-ad-format={slot === 'horizontal' ? 'horizontal' : 'rectangle'}
  //         data-full-width-responsive={slot === 'horizontal' ? 'true' : 'false'}
  //       />
  //       <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  //     </div>
  //   );
  // }

  // ─── PLACEHOLDER (shown before AdSense is live) ───
  return (
    <div
      className={`
        relative flex items-center justify-center
        bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg
        mx-auto overflow-hidden
        ${className}
      `}
      style={{ width: dims.width, maxWidth: '100%', height: dims.height }}
    >
      {/* Actual rendered height while placeholder is shown */}
      <div className="flex flex-col items-center gap-1.5 text-gray-300 select-none">
        <Megaphone className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">
          {dims.label}
        </span>
        <span className="text-[8px] text-gray-200">Ad Space — Ready for AdSense</span>
      </div>

      {/* Overlay message on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
        <p className="text-xs text-gray-500 text-center px-4">
          <span className="font-semibold text-gray-700">Ad placeholder</span>
          <br />
          Ready for Google AdSense integration.
          <br />
          Update <code className="text-[10px] bg-gray-100 px-1 rounded">components/AdSensePlaceholder.tsx</code> when approved.
        </p>
      </div>
    </div>
  );
}
