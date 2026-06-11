import type { Metadata } from 'next';
import Footer from '../components/organisms/Footer';

export const metadata: Metadata = {
  title: 'Titan — The Solo Leveling Steam of AI Agents',
  description: 'Visually level-up your personal agent swarm, certify god-tier skills, own the IP, and BYO into any enterprise or robot brain.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
