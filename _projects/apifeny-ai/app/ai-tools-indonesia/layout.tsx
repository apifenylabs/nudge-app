import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alat AI Terbaik di Indonesia (2026) — 85+ Tools untuk Startup & Enterprise',
  description:
    'Temukan alat AI terbaik untuk bisnis di Indonesia. 85+ alat AI yang di-curate dengan dukungan Bahasa Indonesia, harga IDR, kepatuhan UU PDP, dan ekosistem lokal. Diperbarui setiap hari.',
  openGraph: {
    title: 'Alat AI Terbaik di Indonesia (2026) — Apifeny AI',
    description:
      '85+ alat AI terbaik untuk pasar Indonesia. Dukungan Bahasa Indonesia, harga IDR, kepatuhan UU PDP, dan ramah ekosistem startup lokal.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-indonesia',
    siteName: 'Apifeny AI',
    locale: 'id-ID',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alat AI Terbaik di Indonesia (2026) — Apifeny AI',
    description:
      '85+ alat AI terbaik untuk pasar Indonesia. Dukungan Bahasa Indonesia, harga IDR, kepatuhan UU PDP, dan ramah ekosistem startup lokal.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-indonesia',
    languages: {
      'id-ID': 'https://apifeny-ai.vercel.app/ai-tools-indonesia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-indonesia',
    },
  },
};

export default function AiToolsIndonesiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
