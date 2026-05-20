import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ToastProvider } from '@/components/ui/Toast'
import SiteFooter from '@/components/SiteFooter'
import dynamic from 'next/dynamic';

const EcosystemToggle = dynamic(
  () => import('@/components/EcosystemToggle'),
  { ssr: false }
);

const TelemetryInit = dynamic(
  () => import('@/components/TelemetryInit'),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nudge - Voice Task Manager & Family Assistant App',
  description: 'Nudge transforms your voice into organized tasks. The AI family assistant that understands natural language, assigns tasks, sends smart reminders, and keeps everyone on track.',
  keywords: [
    'voice task manager',
    'family assistant app',
    'voice reminders',
    'AI family organizer',
    'family task management',
    'voice-powered productivity',
    'household coordination app',
    'family chore tracker',
  ],
  authors: [{ name: 'Nudge' }],
  creator: 'Nudge',
  publisher: 'Nudge',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_HK',
    siteName: 'Nudge',
    title: 'Nudge - Voice Task Manager & Family Assistant',
    description: 'Speak it once. Nudge handles the rest. The AI-powered voice task manager for busy families.',
    url: 'https://nudge.family',
    images: [
      {
        url: '/icons/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Nudge - Voice Task Manager',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nudge - Voice Task Manager for Families',
    description: 'Speak tasks naturally. Nudge understands, assigns, and reminds. The AI family organizer.',
    images: ['/icons/icon-512.png'],
    creator: '@nudgeapp',
  },
  other: {
    'geo.region': 'HK',
    'geo.placename': 'Hong Kong',
    'geo.position': '22.3193;114.1694',
    'ICBM': '22.3193, 114.1694',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Nudge',
    statusBarStyle: 'black-translucent',
    startupImage: '/icons/apple-touch-icon.png',
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: [{ url: '/icons/favicon-32.png', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nudge",
              "url": "https://nudge-sigma-liart.vercel.app",
              "description": "Voice task manager and family assistant app. Transform voice into organized tasks with smart reminders.",
              "sameAs": [],
            }),
          }}
        />

        {/* iOS PWA tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Nudge" />
        
        {/* Geo tags for local search */}
        <meta name="geo.region" content="HK" />
        <meta name="geo.placename" content="Hong Kong" />
        <meta name="geo.position" content="22.3193;114.1694" />
        <meta name="ICBM" content="22.3193, 114.1694" />

        {/* Windows PWA */}
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/icons/icon-192.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <ToastProvider>
            {children}
          </ToastProvider>
          <SiteFooter />
        </div>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <EcosystemToggle />
        <TelemetryInit />

        {/* Register service worker for PWA */}
        <Script
          id="pwa-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('SW registered:', registration.scope);
                    },
                    function(err) {
                      console.log('SW registration failed:', err);
                    }
                  );
                });
              }

              // Detect if installed as PWA
              if (window.matchMedia('(display-mode: standalone)').matches) {
                document.documentElement.classList.add('pwa-mode');
              }

              // Online/offline tracking — sync offline queue on reconnect
              window.addEventListener('online', function() {
                document.documentElement.classList.remove('offline-mode');
                document.documentElement.classList.add('online-mode');
                // Tell SW to check for pending operations
                if (navigator.serviceWorker.controller) {
                  navigator.serviceWorker.controller.postMessage({
                    type: 'CHECK_QUEUE'
                  });
                }
              });

              window.addEventListener('offline', function() {
                document.documentElement.classList.add('offline-mode');
                document.documentElement.classList.remove('online-mode');
              });
            `,
          }}
        />
      </body>
    </html>
  )
}