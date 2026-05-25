import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeOS — AI Copilot for Everything',
  description: 'Guided phases for every area of your life. Research → Canvas → Build → Ship → Maintain.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
