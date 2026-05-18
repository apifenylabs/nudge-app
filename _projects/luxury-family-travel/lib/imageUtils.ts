// Image utilities for the luxury directory
// Manages photo credits, attribution, and fallback images

export interface PhotoCredit {
  url: string;
  source: string;
  sourceUrl: string;
  license: 'official' | 'press' | 'ugc_verified' | 'editorial';
}

export interface ImageMap {
  [destinationId: string]: {
    hero: PhotoCredit;
    gallery: PhotoCredit[];
  };
}

// Loads the image map from public/data/image-map.json
export async function loadImageMap(): Promise<ImageMap> {
  try {
    const res = await fetch('/data/image-map.json');
    if (!res.ok) return {};
    const data = await res.json();
    return data.photos || {};
  } catch {
    return {};
  }
}

// Build the credit label for display
export function getCreditLabel(credit: PhotoCredit): string {
  const labels: Record<string, string> = {
    official: 'Official',
    press: 'Press Kit',
    ugc_verified: 'Verified Guest',
    editorial: 'Editorial'
  };
  return `📷 ${labels[credit.license] || 'Photo'}`;
}
