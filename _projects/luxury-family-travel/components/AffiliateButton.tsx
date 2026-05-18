'use client';

import { ExternalLink } from 'lucide-react';

interface AffiliateButtonProps {
  url: string;
  label: string;
  className?: string;
}

export default function AffiliateButton({ url, label, className = '' }: AffiliateButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md ${className || 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'}`}
    >
      {label}
      <ExternalLink size={14} />
    </a>
  );
}
