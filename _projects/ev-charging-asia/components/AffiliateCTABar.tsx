'use client';

import { FC } from 'react';
import { ExternalLink, Star, Zap } from 'lucide-react';
import { AffiliateLink } from '@/lib/affiliate-links';

interface AffiliateCTAsProps {
  links: AffiliateLink[];
  title?: string;
  maxDisplay?: number;
}

/**
 * Affiliate CTA buttons for station pages — "Book nearby hotel", "Rent EV", etc.
 */
const AffiliateCTABar: FC<AffiliateCTAsProps> = ({ links, title = 'Travel Essentials', maxDisplay = 4 }) => {
  if (!links || links.length === 0) return null;

  const displayed = links.slice(0, maxDisplay);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/70 p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Star size={16} className="text-amber-500 fill-amber-500" />
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <span className="text-[10px] text-gray-400 ml-auto">Affiliate links</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayed.map((link) => {
          // Determine color based on type
          const colorMap: Record<string, string> = {
            ev_rental: 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100',
            hotel: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
            tour: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
            gear: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100',
            experience: 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100',
          };
          const colors = colorMap[link.type] || 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100';
          const icons: Record<string, React.ReactNode> = {
            ev_rental: <Zap size={14} />,
            hotel: <span className="text-xs">🏨</span>,
            tour: <span className="text-xs">🎫</span>,
            gear: <span className="text-xs">🔌</span>,
            experience: <span className="text-xs">🌟</span>,
          };

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${colors}`}
            >
              {icons[link.type] || <ExternalLink size={14} />}
              <span className="truncate max-w-[140px]">{link.name}</span>
              <ExternalLink size={10} className="opacity-60 shrink-0" />
            </a>
          );
        })}
      </div>
      <p className="text-[10px] text-gray-400 mt-2">
        We earn a commission if you book through these links, at no extra cost to you. 🤝
      </p>
    </div>
  );
};

export default AffiliateCTABar;
