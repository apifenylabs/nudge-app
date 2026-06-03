import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Titan — The Solo Leveling Steam of AI Agents',
  description: 'Visually level-up your personal agent swarm, certify god-tier skills, own the IP, and BYO into any enterprise or robot brain.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
