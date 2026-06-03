'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Google AdSense display ad unit.
 * Only loads on the client side once per ad slot.
 */
export default function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Skip if already initialized for this component instance
    if (initialized.current) return;
    initialized.current = true;

    try {
      // Push the ad if Adsense is loaded
      if (typeof (window as any).adsbygoogle !== 'undefined') {
        (window as any).adsbygoogle.push({});
      } else {
        // Retry after a short delay if Adsense hasn't loaded yet
        const timer = setTimeout(() => {
          if (typeof (window as any).adsbygoogle !== 'undefined') {
            (window as any).adsbygoogle.push({});
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Silently fail — ads are non-critical
    }
  }, []);

  return (
    <div className={`bg-gray-50 rounded-2xl border border-gray-200 py-6 px-4 text-center ${className}`}>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Advertisement</p>
      <div ref={adRef} className="mx-auto" style={{ maxWidth: format === 'auto' ? '728px' : undefined }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6046953221141245"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
