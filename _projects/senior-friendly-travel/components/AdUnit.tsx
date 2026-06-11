'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'autorelaxed' | 'fluid';
  layout?: string;
  className?: string;
  label?: string;
}

/**
 * Google AdSense ad unit.
 * Supports: display ads, multiplex (autorelaxed), in-article (fluid).
 * Only loads on the client side.
 */
export default function AdUnit({ slot, format = 'auto', layout, className = '', label = 'Advertisement' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      if (typeof (window as any).adsbygoogle !== 'undefined') {
        (window as any).adsbygoogle.push({});
      } else {
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
    <div className={`text-center ${className}`}>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{label}</p>
      <div ref={adRef} className="mx-auto overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6046953221141245"
          data-ad-slot={slot}
          data-ad-format={format}
          data-ad-layout={layout || undefined}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
