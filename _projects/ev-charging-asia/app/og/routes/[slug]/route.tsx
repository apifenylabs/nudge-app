import { ImageResponse } from 'next/og';
import { getItineraryBySlug } from '@/data/itineraries';

export const runtime = 'edge';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const it = getItineraryBySlug(params.slug);

  // Dynamic version with route data
  if (it) {
    const primaryCountry = it.countries[0] || 'Asia';
    const flagMap: Record<string, string> = {
      thailand: '🇹🇭', malaysia: '🇲🇾', singapore: '🇸🇬', japan: '🇯🇵',
      india: '🇮🇳', indonesia: '🇮🇩', vietnam: '🇻🇳', china: '🇨🇳',
      philippines: '🇵🇭', korea: '🇰🇷',
    };
    const flag = flagMap[primaryCountry.toLowerCase()] || '⚡';
    const difficultyBadgeColor = it.difficulty === 'easy' ? '#10b981' : it.difficulty === 'moderate' ? '#f59e0b' : '#ef4444';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 50%, #0284c7 100%)',
            padding: 60,
            position: 'relative',
          }}
        >
          {/* Abstract map decoration */}
          <svg
            style={{ position: 'absolute', top: -40, right: -40, opacity: 0.1 }}
            width="320"
            height="320"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="0.5" />
            <line x1="20" y1="30" x2="80" y2="70" stroke="white" strokeWidth="0.5" strokeDasharray="2,3" />
            <line x1="30" y1="80" x2="70" y2="20" stroke="white" strokeWidth="0.5" strokeDasharray="2,3" />
          </svg>

          {/* Flag and badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <span style={{ fontSize: 48, lineHeight: 1 }}>{flag}</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20h16" /><path d="M4 4v16" /><path d="M8 16V8" /><path d="M12 16V5" /><path d="M16 16v-3" /><path d="M20 16v-7" />
              </svg>
              {it.totalDistanceKm} km
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              {it.totalDrivingHours}h
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: 'white',
              margin: '0 0 16px 0',
              lineHeight: 1.15,
              maxWidth: 800,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {it.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.85)',
              margin: '0 0 24px 0',
              lineHeight: 1.4,
              maxWidth: 650,
            }}
          >
            {it.subtitle || it.description.slice(0, 120)}
          </p>

          {/* Bottom row: cities, difficulty, charging stops */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 16 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {it.cities.slice(0, 3).join(' → ')}
              {it.cities.length > 3 && ` +${it.cities.length - 3} more`}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 999,
                backgroundColor: difficultyBadgeColor,
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {it.difficulty === 'easy' ? '🟢' : it.difficulty === 'moderate' ? '🟡' : '🔴'} {it.difficulty}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.5 6.5h11" /><path d="M8 17 6 3h12l-2 14" /><circle cx="11" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M6.5 6.5 8 17" />
              </svg>
              {it.estimatedChargingStops} charging stops
            </div>
          </div>

          {/* Brand */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 60,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'rgba(255,255,255,0.6)',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            EV Charging Asia
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Fallback for unknown routes
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #064e3b, #0d9488)',
          color: 'white',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <p style={{ marginTop: 24 }}>EV Charging Asia</p>
        <p style={{ fontSize: 24, opacity: 0.7 }}>Road Trip Routes</p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
