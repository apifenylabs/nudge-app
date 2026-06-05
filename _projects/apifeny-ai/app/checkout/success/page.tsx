'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Download, ArrowLeft, Star, Shield, ExternalLink } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [showDetails, setShowDetails] = useState(false);

  const sessionId = searchParams.get('session_id');
  const product = searchParams.get('product') || 'your playbook';

  // If no session_id, redirect to playbooks
  useEffect(() => {
    if (!sessionId) {
      const t = setTimeout(() => router.push('/playbooks'), 5000);
      return () => clearTimeout(t);
    }

    // Auto-show details after 3s
    const t = setTimeout(() => setShowDetails(true), 3000);
    return () => clearTimeout(t);
  }, [sessionId, router]);

  // Countdown for email arrival
  useEffect(() => {
    if (showDetails && countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [showDetails, countdown]);

  const productName = product.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      <div className="max-w-xl mx-auto px-4 py-16">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Your <strong>{productName}</strong> playbook is being prepared.
          </p>
        </div>

        {/* Email Assurance */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900">Check Your Inbox</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We&apos;ve sent your download link to the email you provided at checkout.
            It should arrive within 1-2 minutes.
          </p>

          {/* Countdown indicator */}
          <div className="bg-purple-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-700">Email Delivery</span>
              <span className="text-sm text-purple-500">
                {countdown > 0 ? `Expecting delivery... ${countdown}s` : 'Should be there now 📬'}
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((10 - countdown) / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-2 text-sm text-gray-500">
            <p>📌 <strong>Not seeing it?</strong> Check spam/promotions folder</p>
            <p>📌 Make sure to use the same email you entered at checkout</p>
            <p>📌 Still stuck? <Link href="/contact" className="text-purple-600 font-medium hover:underline">Contact us</Link></p>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-6">
          <h3 className="text-lg font-semibold mb-3">⚡ What Happens Next</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>You&apos;ll receive an email with your <strong>unique download link</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Click the link to download your PDF playbook immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Save it, print it, feed it to your AI agent — it&apos;s yours forever</span>
            </li>
          </ul>
        </div>

        {/* Upsell */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-semibold text-gray-900">Love this playbook?</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Unlock <strong>all 104+ playbooks</strong> with Apifeny Pro — including future releases.
          </p>
          <Link
            href="/pro"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Upgrade to Pro — $37/mo
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Guarantee */}
        <div className="flex items-center gap-2 justify-center text-sm text-gray-500 mb-8">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Backed by our 7-day happiness guarantee</span>
        </div>

        <div className="text-center">
          <Link href="/playbooks" className="text-purple-600 font-medium hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Browse more playbooks
          </Link>
        </div>
      </div>
    </div>
  );
}

// Mail icon (avoiding lucide import issue on this version)
function Mail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-purple-600">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
