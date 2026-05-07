'use client';

import AdUnit from '@/components/AdUnit';

interface BlogAdSlotsProps {
  position: 'top' | 'bottom';
}

/**
 * Client component for blog in-article ad placements.
 * In-Article Ad 1 appears at ~1/3 mark (top)
 * In-Article Ad 2 appears at ~2/3 mark (bottom)
 */
export default function BlogAdSlots({ position }: BlogAdSlotsProps) {
  if (position === 'top') {
    return (
      <div className="my-10 py-6 border-t border-b border-gray-100">
        <AdUnit
          slot="2438530490"
          format="fluid"
          layout="in-article"
          className="mb-4"
          label="Advertisement"
        />
      </div>
    );
  }

  return (
    <div className="my-10 py-6 border-t border-b border-gray-100">
      <AdUnit
        slot="2942850962"
        format="fluid"
        layout="in-article"
        className="mb-4"
        label="Advertisement"
      />
    </div>
  );
}
