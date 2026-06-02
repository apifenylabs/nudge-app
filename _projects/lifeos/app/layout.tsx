import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LifeOS — AI Copilot for Everything',
    template: '%s — LifeOS AI Copilot',
  },
  description: 'Your AI copilot for life. Have a conversation that leads, challenges, and builds a plan with you. Inspired by aicofounder.com — for every area of life.',
  metadataBase: new URL('https://lifeos.vercel.app'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'LifeOS — AI Copilot for Everything',
    description: 'A personality-aware AI copilot with 12 specialized plugins for travel, finance, health, career, learning, mindfulness, and more.',
    url: 'https://lifeos.vercel.app',
    siteName: 'LifeOS',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'LifeOS — AI Copilot for Everything',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeOS — AI Copilot for Everything',
    description: 'A personality-aware AI copilot with 12 specialized plugins for every area of life.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://lifeos.vercel.app',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

// ═══════════════════════════════════════════════════════════════
// JSON-LD: Organization + WebSite + SoftwareApplication + FAQPage
// ═══════════════════════════════════════════════════════════════

const FAQ_ITEMS = [
  {
    question: 'What is LifeOS?',
    answer: 'LifeOS is a personality-aware AI copilot that helps you navigate every area of life — from travel planning and financial coaching to career strategy and mindfulness. Unlike generic chatbots, LifeOS challenges your assumptions, asks probing questions, and builds actionable plans with you.',
  },
  {
    question: 'How is LifeOS different from ChatGPT or other AI assistants?',
    answer: "LifeOS doesn't wait for you to ask the right questions. It leads the conversation with specialized plugins for each life category — Travel OS, Finance OS, Career OS, and more. Each plugin has structured phases (Discover, Plan, Execute, Review) that guide you from exploration to action. There are 12 plugins total, each with an AI personality tuned to that domain.",
  },
  {
    question: 'Is LifeOS free?',
    answer: 'Yes, LifeOS is currently free to use. All 12 plugins are available at no cost. Future premium features (advanced analytics, expanded memory, priority support) may be introduced, but the core copilot experience will always be free.',
  },
  {
    question: 'What plugins are available?',
    answer: 'LifeOS has 12 specialized plugins: Travel OS (trip planning), Finance OS (budgeting and investing), Health OS (wellness and fitness), Career OS (job strategy), Learning OS (skill development), Family OS (family coordination), Home OS (home management), Social OS (relationships), Relationships OS (partnerships), Productivity OS (deep work), Nutrition OS (diet and habits), and Mindfulness OS (mental clarity).',
  },
  {
    question: 'Does LifeOS save my conversations?',
    answer: 'Yes, conversation history is saved locally in your browser. When Supabase is configured (optional), data can also sync to the cloud for access across devices. You can review past sessions, resume conversations, and delete history at any time.',
  },
  {
    question: 'Can LifeOS help with real planning, not just generic advice?',
    answer: 'Yes. Each plugin follows structured phases designed to produce concrete outputs. Travel OS builds day-by-day itineraries with research. Finance OS creates actual budget spreadsheets and investment plans. Career OS helps update your resume and prepare for interviews. Every conversation ends with actionable next steps.',
  },
  {
    question: 'Is my data private?',
    answer: 'Yes. By default, all data is stored locally in your browser. Cloud sync via Supabase is opt-in and optional. LifeOS does not sell or share your personal information. Conversations are not used to train external AI models.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://lifeos.vercel.app/#organization',
      name: 'LifeOS',
      url: 'https://lifeos.vercel.app',
      description: 'A personality-aware AI copilot for every area of life.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://lifeos.vercel.app/#website',
      url: 'https://lifeos.vercel.app',
      name: 'LifeOS',
      description: 'Your AI copilot for life. Have a conversation that leads, challenges, and builds a plan with you.',
      publisher: { '@id': 'https://lifeos.vercel.app/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://lifeos.vercel.app/#software',
      name: 'LifeOS',
      description: 'A personality-aware AI copilot with 10+ specialized plugins for travel, finance, health, career, learning, family, home, social, relationships, and mindfulness.',
      url: 'https://lifeos.vercel.app',
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://lifeos.vercel.app/#faq',
      name: 'LifeOS — Frequently Asked Questions',
      description: 'Common questions about LifeOS, the personality-aware AI copilot for every area of life.',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
