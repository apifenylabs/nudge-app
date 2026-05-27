'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, CheckCircle, Download, ArrowLeft, FileText } from 'lucide-react';
import { getPremiumRouteBySlug } from '@/lib/premium-routes';

export default function PremiumRouteDownloadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const sessionId = searchParams.get('session_id');

  const route = getPremiumRouteBySlug(slug);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Track successful purchase in analytics
    if (sessionId && route) {
      console.log(`✅ Premium route purchased: ${route.slug}, session: ${sessionId}`);
    }
  }, [sessionId, route]);

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Download Not Available</h1>
          <p className="text-gray-600 mb-4">This premium guide could not be found.</p>
          <Link href="/routes" className="text-sky-600 hover:underline text-sm">← Back to routes</Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloading(true);
    // Generate PDF preview content (in production, this would fetch from a generated PDF)
    const content = generateGuideText(route);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${route.slug}-premium-guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={18} className="text-green-500" />
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">EV Charging Asia</span>
          </Link>
          <Link href="/routes" className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <ArrowLeft size={14} />
            Routes
          </Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>

          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Purchase Complete!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Thank you for purchasing <strong>{route.title}</strong>
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-sky-500" />
              <span className="text-sm font-semibold text-gray-900">{route.title}</span>
            </div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>{route.pages} pages</span>
              <span>•</span>
              <span>${route.price.toFixed(2)}</span>
              <span>•</span>
              <span>{route.countries.join(', ')}</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-indigo-700 transition-all disabled:opacity-50 shadow-sm mb-4"
          >
            <Download size={18} />
            {downloading ? 'Downloading...' : 'Download Your Premium Guide'}
          </button>

          <p className="text-xs text-gray-400">
            A download link has also been sent to your email.{' '}
            <Link href={`/routes/${route.slug}`} className="text-sky-600 hover:underline">
              Back to route details
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function generateGuideText(route: ReturnType<typeof getPremiumRouteBySlug>): string {
  if (!route) return '';

  const sep = '='.repeat(60);
  const dash = '-'.repeat(60);
  const lines: string[] = [];

  lines.push(sep);
  lines.push(`  ${route.title}`);
  lines.push(sep);
  lines.push('');
  lines.push(route.subtitle);
  lines.push('');
  lines.push(route.description);
  lines.push('');
  lines.push(dash);
  lines.push('  PREMIUM GUIDE CONTENTS');
  lines.push(dash);
  lines.push('');
  lines.push('  This guide covers:');
  lines.push('');
  const contents = [
    'Day-by-day itinerary with turn-by-turn EV driving directions',
    'Verified charging stations with specific location tips',
    'Family-friendly activities with admission prices & hours',
    'EV-charging verified hotel recommendations',
    'Luxury dining and accommodation suggestions',
    'Local navigation app & SIM card recommendations',
    'Emergency contact numbers for roadside EV assistance',
    'Printable pre-trip checklist',
    'Packing guide for EV road trips',
    'Weather & seasonal driving tips',
    `  Total: ${route.pages} pages of curated content`,
  ];
  contents.forEach(c => lines.push(`  ✓ ${c}`));
  lines.push('');
  lines.push(dash);
  lines.push('  COVERED COUNTRIES');
  lines.push(dash);
  route.countries.forEach(c => lines.push(`  ✦ ${c}`));
  lines.push('');
  lines.push(dash);
  lines.push('  TAGS');
  lines.push(dash);
  lines.push(`  ${route.tags.join(', ')}`);
  lines.push('');
  lines.push(sep);
  lines.push('  Thank you for your purchase!');
  lines.push(`  Downloaded from EV Charging Asia — ${new Date().toLocaleDateString()}`);
  lines.push('  https://ev-charging-asia.vercel.app');
  lines.push(sep);

  return lines.join('\n');
}
