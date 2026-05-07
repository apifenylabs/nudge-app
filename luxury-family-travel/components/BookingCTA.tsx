'use client';

import { ExternalLink, Calendar, CreditCard, ChevronRight } from 'lucide-react';

interface BookingCTAProps {
  hotelName: string;
  destinationId: string;
  priceRange?: string;
  className?: string;
}

const partnerLinks: Record<string, { booking: string; agoda: string; expedia: string }> = {
  'phuket-001': {
    booking: 'https://www.booking.com/hotel/th/amanpuri.html?label=lft',
    agoda: 'https://www.agoda.com/amanpuri/hotel/phuket-th.html?cid=lft',
    expedia: 'https://www.expedia.com/Phuket-Hotels-Amanpuri.hl=4',
  },
  'bali-001': {
    booking: 'https://www.booking.com/hotel/id/four-seasons-sayan.html?label=lft',
    agoda: 'https://www.agoda.com/four-seasons-resort-bali-at-sayan/hotel/bali-id.html?cid=lft',
    expedia: 'https://www.expedia.com/Ubud-Hotels-Four-Seasons-Resort-Bali-at-Sayan.hl=1',
  },
  'maldives-001': {
    booking: 'https://www.booking.com/hotel/mv/soneva-fushi.html?label=lft',
    agoda: 'https://www.agoda.com/soneva-fushi/hotel/maldives.html?cid=lft',
    expedia: 'https://www.expedia.com/Maldives-Hotels-Soneva-Fushi.hl=',
  },
  'tokyo-001': {
    booking: 'https://www.booking.com/hotel/jp/aman-tokyo.html?label=lft',
    agoda: 'https://www.agoda.com/aman-tokyo/hotel/tokyo-jp.html?cid=lft',
    expedia: 'https://www.expedia.com/Tokyo-Hotels-Aman-Tokyo.hl=4',
  },
  'maldives-002': {
    booking: 'https://www.booking.com/hotel/mv/velaa-private-island.html?label=lft',
    agoda: 'https://www.agoda.com/velaa-private-island/hotel/maldives.html?cid=lft',
    expedia: 'https://www.expedia.com/Maldives-Hotels-Velaa-Private-Island.hl=',
  },
  'kyoto-001': {
    booking: 'https://www.booking.com/hotel/jp/aman-kyoto.html?label=lft',
    agoda: 'https://www.agoda.com/aman-kyoto/hotel/kyoto-jp.html?cid=lft',
    expedia: 'https://www.expedia.com/Kyoto-Hotels-Aman-Kyoto.hl=4',
  },
  'hongkong-002': {
    booking: 'https://www.booking.com/hotel/hk/four-seasons-hong-kong.html?label=lft',
    agoda: 'https://www.agoda.com/four-seasons-hotel-hong-kong/hotel/hong-kong-hk.html?cid=lft',
    expedia: 'https://www.expedia.com/Hong-Kong-Hotels-Four-Seasons-Hotel-Hong-Kong.hl=1',
  },
  'hongkong-001': {
    booking: 'https://www.booking.com/hotel/hk/mandarin-oriental-hong-kong.html?label=lft',
    agoda: 'https://www.agoda.com/mandarin-oriental-hong-kong/hotel/hong-kong-hk.html?cid=lft',
    expedia: 'https://www.expedia.com/Hong-Kong-Hotels-Mandarin-Oriental-Hong-Kong.hl=1',
  },
  'palawan-001': {
    booking: 'https://www.booking.com/hotel/ph/amanpulo.html?label=lft',
    agoda: 'https://www.agoda.com/amanpulo/hotel/palawan-ph.html?cid=lft',
    expedia: 'https://www.expedia.com/Palawan-Hotels-Amanpulo.hl=4',
  },
  'phuket-002': {
    booking: 'https://www.booking.com/hotel/th/trisara.html?label=lft',
    agoda: 'https://www.agoda.com/trisara/hotel/phuket-th.html?cid=lft',
    expedia: 'https://www.expedia.com/Phuket-Hotels-Trisara.hl=4',
  },
  'bali-002': {
    booking: 'https://www.booking.com/hotel/id/bulgari-resort-bali.html?label=lft',
    agoda: 'https://www.agoda.com/bulgari-resort-bali/hotel/bali-id.html?cid=lft',
    expedia: 'https://www.expedia.com/Bali-Hotels-Bulgari-Resort-Bali.hl=',
  },
  'maldives-005': {
    booking: 'https://www.booking.com/hotel/mv/cheval-blanc-randheli.html?label=lft',
    agoda: 'https://www.agoda.com/cheval-blanc-randheli/hotel/maldives.html?cid=lft',
    expedia: 'https://www.expedia.com/Maldives-Hotels-Cheval-Blanc-Randheli.hl=',
  },
  'bali-003': {
    booking: 'https://www.booking.com/hotel/id/ayana-estate-bali.html?label=lft',
    agoda: 'https://www.agoda.com/ayana-resort-and-spa-bali/hotel/bali-id.html?cid=lft',
    expedia: 'https://www.expedia.com/Bali-Hotels-Ayana-Resort-and-Spa.hl=',
  },
  'langkawi-001': {
    booking: 'https://www.booking.com/hotel/my/the-datai-langkawi.html?label=lft',
    agoda: 'https://www.agoda.com/the-datai-langkawi/hotel/langkawi-my.html?cid=lft',
    expedia: 'https://www.expedia.com/Langkawi-Hotels-The-Datai-Langkawi.hl=4',
  },
  'singapore-001': {
    booking: 'https://www.booking.com/hotel/sg/raffles-singapore.html?label=lft',
    agoda: 'https://www.agoda.com/raffles-hotel-singapore/hotel/singapore-sg.html?cid=lft',
    expedia: 'https://www.expedia.com/Singapore-Hotels-Raffles-Hotel-Singapore.hl=1',
  },
};

export default function BookingCTA({ hotelName, destinationId, priceRange, className = '' }: BookingCTAProps) {
  const links = partnerLinks[destinationId];

  if (!links) {
    // Generic search link as fallback
    const searchQuery = encodeURIComponent(hotelName);
    return (
      <div className={`bg-navy rounded-xl p-5 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-gold/70 font-semibold mb-1">Ready to book?</p>
            <p className="text-white text-sm font-medium">{hotelName}</p>
            {priceRange && <p className="text-white/50 text-xs mt-0.5">{priceRange} per night</p>}
          </div>
          <a
            href={`https://www.booking.com/searchresults.html?ss=${searchQuery}&label=lft`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-all"
          >
            Check Rates
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-navy rounded-xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-gold/70 font-semibold mb-1">Book This Resort</p>
          <p className="text-white text-sm font-medium">{hotelName}</p>
          {priceRange && <p className="text-white/50 text-xs mt-0.5">{priceRange} per night</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <a
          href={links.booking}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-all min-h-[44px]"
        >
          <Calendar size={14} />
          Booking.com
          <ChevronRight size={14} />
        </a>
        <a
          href={links.agoda}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all min-h-[44px] border border-white/10"
        >
          <CreditCard size={14} />
          Agoda
        </a>
        <a
          href={links.expedia}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all min-h-[44px] border border-white/10"
        >
          <ExternalLink size={14} />
          Expedia
        </a>
      </div>
      <p className="text-[10px] text-white/30 mt-2">
        We may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
