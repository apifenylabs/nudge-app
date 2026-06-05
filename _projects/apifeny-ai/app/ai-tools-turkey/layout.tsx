import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Türkçe & İngilizce Çift Dilli',
  description:
    'Türkiye iş, eğitim ve günlük yaşamda Türkçe ve İngilizceyi bir arada kullanır. Her aracı çoklu dil desteği açısından değerlendiriyoruz böylece dil engelleriyle karşılaşmazsınız — 85 milyonluk nüfusa hizmet için kritik.',
  openGraph: {
    title: 'Best AI Tools in Turkey (2026) — Apifeny AI',
    description:
      'Find AI tools built for Turkey. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-turkey',
    siteName: 'Apifeny AI',
    locale: 'tr-TR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Turkey (2026) — Apifeny AI',
    description:
      'Find AI tools built for Turkey. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-turkey',
    languages: {
      'tr-TR': 'https://apifeny-ai.vercel.app/ai-tools-turkey',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-turkey',
    },
  },
};

export default function AiToolsTurkeyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
