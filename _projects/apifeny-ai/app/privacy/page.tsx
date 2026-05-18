import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Apifeny AI privacy policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-neon-light" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Privacy Policy</h1>
      </div>
      <p className="text-sm text-tech-200 mb-8">Last updated: January 2025</p>

      <div className="prose prose-sm prose-invert max-w-none space-y-6 text-tech-100">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Introduction</h2>
          <p className="leading-relaxed">
            Apifeny AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website apifeny.ai.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Information We Collect</h2>
          <h3 className="text-sm font-semibold text-tech-100 mb-1">Personal Information</h3>
          <p className="leading-relaxed mb-3">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Submit a tool to our directory</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our forms</li>
          </ul>
          <p className="leading-relaxed">This information may include your name, email address, and website URL.</p>

          <h3 className="text-sm font-semibold text-tech-100 mb-1 mt-4">Automatically Collected Information</h3>
          <p className="leading-relaxed">
            When you visit our site, we automatically collect certain information through
            analytics services (Vercel Analytics and Speed Insights), including your IP
            address, browser type, device information, and usage patterns. This data is
            anonymized and used to improve our service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. How We Use Your Information</h2>
          <p className="leading-relaxed mb-3">We use the collected information for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Operating and maintaining our AI tools directory</li>
            <li>Improving user experience and site performance</li>
            <li>Processing tool submissions</li>
            <li>Sending newsletters (only with your explicit consent)</li>
            <li>Analyzing usage trends and popular content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Data Storage and Security</h2>
          <p className="leading-relaxed">
            We implement reasonable security measures to protect your data. Your information
            is stored securely using Supabase (our database provider) and Vercel (our hosting
            provider). While we strive to protect your personal data, no method of
            transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Third-Party Services</h2>
          <p className="leading-relaxed">We use the following third-party services:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Vercel</strong> — Hosting, Analytics, and Speed Insights</li>
            <li><strong>Supabase</strong> — Database and authentication</li>
          </ul>
          <p className="leading-relaxed mt-3">
            These services have their own privacy policies governing data handling.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. Cookies</h2>
          <p className="leading-relaxed">
            We use minimal cookies necessary for the operation of our site. We do not use
            tracking cookies for advertising purposes. Essential cookies may be set by our
            hosting provider (Vercel) for performance and security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. Your Rights</h2>
          <p className="leading-relaxed mb-3">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Unsubscribe from our newsletter at any time</li>
            <li>Opt out of analytics collection (via browser settings)</li>
          </ul>
          <p className="leading-relaxed mt-3">
            To exercise these rights, contact us at privacy@apifeny.ai.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page. Changes are effective immediately
            upon posting.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8.5. Usage Data &amp; Ecosystem Improvement</h2>
          <p className="leading-relaxed">
            We offer an optional telemetry feature to help improve all sites in our ecosystem.
            When enabled, anonymous usage data (page views, feature clicks, affiliate interactions)
            is collected to understand how visitors use our sites.
          </p>
          <p className="leading-relaxed">
            <strong>No data is collected without your explicit consent.</strong> You can opt in or
            out at any time via the toggle in the bottom-right corner of any page. Data collected
            includes: page paths visited, feature interactions, and session duration. No personally
            identifiable information is ever collected or stored.
          </p>
        </section>


        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. Contact Us</h2>
          <p className="leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at privacy@apifeny.ai.
          </p>
        </section>
      </div>
    </div>
  );
}
