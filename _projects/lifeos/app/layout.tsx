import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeOS — Daily Loop',
  description: 'Track sleep, mood, energy, exercise, and nutrition daily.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
