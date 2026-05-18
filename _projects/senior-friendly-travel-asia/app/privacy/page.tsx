import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Senior-Friendly Travel Asia',
  description: 'Privacy policy for Senior-Friendly Travel Asia. Learn how we collect, use, and protect your personal data when you use our accessible travel directory.',
  openGraph: {
    title: 'Privacy Policy — Senior-Friendly Travel Asia',
    description: 'How we handle your data and privacy on Senior-Friendly Travel Asia.',
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">Privacy Policy</h1>
          <p className="text-teal-100">Last updated: May 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 prose prose-gray max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Senior-Friendly Travel Asia (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. 
          This policy explains how we collect, use, and protect your personal information when you 
          visit our website at seniorfriendlytravel.asia.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li><strong>Contact forms:</strong> When you message us, we collect your name, email, and message content.</li>
          <li><strong>Suggestions:</strong> Any destination or content suggestions you submit voluntarily.</li>
        </ul>
        <h3>Information Collected Automatically</h3>
        <ul>
          <li><strong>Analytics data:</strong> Page views, referral sources, browser type, and device information via Vercel Analytics (anonymized).</li>
          <li><strong>Cookies:</strong> We use minimal cookies for analytics. No tracking cookies for advertising.</li>
          <li><strong>Log data:</strong> Standard server logs (IP address, browser user agent, pages visited).</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To respond to your inquiries and suggestions</li>
          <li>To improve our directory and content based on usage patterns</li>
          <li>To monitor site performance and fix technical issues</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>We do <strong>not</strong> sell your personal information to third parties.</p>

        <h2>4. Third-Party Services</h2>
        <ul>
          <li><strong>Vercel:</strong> Our hosting provider. See <a href="https://vercel.com/privacy" target="_blank" rel="noopener">Vercel&apos;s privacy policy</a>.</li>
          <li><strong>Google Analytics:</strong> Anonymous usage statistics. You can opt out via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out</a>.</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>
          We retain contact form submissions for up to 12 months. Analytics data is retained 
          for 26 months per Google Analytics standard retention. You may request deletion of 
          your data at any time by contacting us.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent for data processing</li>
          <li>Opt out of analytics tracking</li>
        </ul>

        <h2>7. Cookies</h2>
        <p>
          We use minimal cookies for essential site functionality and anonymized analytics. 
          We do not use advertising cookies, cross-site tracking cookies, or fingerprinting.
        </p>

        <h2>8. Affiliate Links</h2>
        <p>
          Some pages may contain affiliate links to booking platforms (Booking.com, Klook, 
          Viator, etc.). We may earn a small commission at no extra cost to you. These links 
          are marked with <code>rel=&quot;sponsored&quot;</code>.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page 
          with an updated &quot;Last updated&quot; date.
        </p>

        <h2>9.5. Usage Data         <h2>10. Contact</h2>amp; Ecosystem Improvement</h2>
        <p>
          We offer an optional telemetry feature to help improve all sites in our ecosystem.
          When enabled, anonymous usage data (page views, feature clicks, affiliate interactions)
          is collected to understand how visitors use our sites. <strong>No data is collected
          without your explicit consent.</strong> You can opt in or out at any time via the
          toggle in the bottom-right corner of any page.
        </p>
        <p>
          Data collected includes: page paths visited, feature interactions, and session duration.
          No personally identifiable information is ever collected or stored. All data is
          aggregated for analytics purposes only.
        </p>

        <h2>10. Contact</h2>
        <p>
          For privacy-related questions, please <Link href="/contact" className="text-teal-700 underline">contact us</Link>.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-8 text-sm text-gray-400 flex gap-6">
        <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
        <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
        <Link href="/health" className="hover:text-teal-600 transition-colors">Travel Health Guide</Link>
      </div>
    </main>
  );
}
