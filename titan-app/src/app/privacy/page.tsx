import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Titan",
  description: "Titan privacy policy. How we collect, use, and protect your data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">Titan</span>
          </Link>
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: May 29, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h2>
            <p className="text-gray-600">
              Titan (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at <strong>titan-app-puce.vercel.app</strong> (the &quot;Service&quot;).
            </p>
            <p className="text-gray-600 mt-2">
              By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
            <h3 className="font-medium text-gray-800 mt-3 mb-1">2.1 Personal Data</h3>
            <p className="text-gray-600">
              We may collect personally identifiable information such as your name, email address, and payment information when you:
            </p>
            <ul className="list-disc pl-5 text-gray-600 mt-1 space-y-1">
              <li>Create an account</li>
              <li>Sign up for the waitlist</li>
              <li>Purchase a subscription</li>
              <li>Contact our support team</li>
            </ul>

            <h3 className="font-medium text-gray-800 mt-4 mb-1">2.2 Usage Data</h3>
            <p className="text-gray-600">
              We automatically collect certain information when you visit our Service, including:
            </p>
            <ul className="list-disc pl-5 text-gray-600 mt-1 space-y-1">
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Usage patterns (pages visited, time spent, features used)</li>
              <li>Session data via cookies and similar tracking technologies</li>
            </ul>

            <h3 className="font-medium text-gray-800 mt-4 mb-1">2.3 Agent Data</h3>
            <p className="text-gray-600">
              Any skills, configurations, or content you create for your AI agents is stored securely and is not shared with third parties except as necessary to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
            <p className="text-gray-600">We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-1 space-y-1">
              <li>To provide, maintain, and improve our Service</li>
              <li>To process transactions and send related notifications</li>
              <li>To send technical notices, updates, and support messages</li>
              <li>To analyze usage patterns and optimize user experience</li>
              <li>To detect, prevent, and address technical issues or fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Data Storage &amp; Security</h2>
            <p className="text-gray-600">
              Your data is stored on secure infrastructure provided by Vercel (hosting) and Supabase (database). We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-5 text-gray-600 mt-1 space-y-1">
              <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication requirements</li>
              <li>OWASP-compliant development practices</li>
            </ul>
            <p className="text-gray-600 mt-2">
              However, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Data Sharing &amp; Disclosure</h2>
            <p className="text-gray-600">We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-1 space-y-1">
              <li><strong>Service providers:</strong> Vercel (hosting), Supabase (database), Stripe (payment processing) — each under their own data processing agreements</li>
              <li><strong>Legal requirements:</strong> If required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Cookies &amp; Tracking</h2>
            <p className="text-gray-600">
              We use cookies and similar technologies for analytics and functionality. You can control cookie preferences through your browser settings. Third-party services we use include:
            </p>
            <ul className="list-disc pl-5 text-gray-600 mt-1 space-y-1">
              <li>Vercel Analytics (anonymized usage data)</li>
              <li>Google Analytics (with IP anonymization enabled)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Your Rights</h2>
            <p className="text-gray-600">You have the right to:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-1 space-y-1">
              <li>Access, update, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Request a copy of your data in a portable format</li>
              <li>Object to or restrict processing of your data</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="text-gray-600 mt-2">
              To exercise these rights, contact us at <strong>privacy@titan-app.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal data only as long as necessary to provide the Service or comply with legal obligations. Account data is retained for the duration of your account plus 90 days after deletion to allow for recovery, after which it is permanently erased.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Children&apos;s Privacy</h2>
            <p className="text-gray-600">
              Our Service is not intended for individuals under 13. We do not knowingly collect personal information from children. If we discover that a child under 13 has provided us with personal data, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of material changes via email or through a prominent notice on our Service. Continued use after changes constitutes acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">11. Contact</h2>
            <p className="text-gray-600">
              For questions about this Privacy Policy, contact us at:
            </p>
            <p className="text-gray-600 mt-1">
              <strong>Email:</strong> privacy@titan-app.com<br />
              <strong>Platform:</strong> titan-app-puce.vercel.app
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <span className="text-xs text-gray-400">Titan · © 2026</span>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-gray-600 transition-colors">Pricing</Link>
            <span className="text-gray-300">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
