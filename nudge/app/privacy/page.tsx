import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Nudge',
  description: 'Privacy policy for Nudge — voice task manager and family assistant app.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: May 18, 2026</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>
              Nudge collects minimal information necessary to provide voice task management services:
            </p>
            <ul>
              <li><strong>Account information:</strong> Email address and display name when you create an account.</li>
              <li><strong>Task data:</strong> Tasks, reminders, assignments, and due dates you create.</li>
              <li><strong>Usage data:</strong> Anonymous page views and feature interactions via Vercel Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. How We Use Your Data</h2>
            <ul>
              <li>To send task reminders and notifications</li>
              <li>To sync your tasks across devices</li>
              <li>To improve the app based on usage patterns</li>
              <li>We never sell or share personal data with third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Data Storage &amp; Security</h2>
            <p>
              Your data is stored securely using industry-standard encryption. We use Supabase
              for database storage and authentication. Data is transmitted over encrypted
              connections (TLS/SSL).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Cookies &amp; Analytics</h2>
            <p>
              We use essential cookies for authentication and session management. Vercel Analytics
              collects anonymous usage statistics. We do not use tracking cookies or share data
              with advertising networks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Usage Data &amp; Ecosystem Improvement</h2>
            <p>
              We offer an optional telemetry feature to help improve all sites in our ecosystem.
              When enabled, anonymous usage data (page views, feature clicks, affiliate interactions)
              is collected to understand how visitors use our sites.
            </p>
            <p>
              <strong>No data is collected without your explicit consent.</strong> You can opt in or
              out at any time via the toggle in the bottom-right corner of any page. Data collected
              includes: page paths visited, feature interactions, and session duration. No personally
              identifiable information is ever collected or stored.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Contact</h2>
            <p>
              For privacy-related questions, please contact us through our{' '}
              <a href="mailto:privacy@nudge.family" className="text-blue-600 hover:underline">
                privacy@nudge.family
              </a>{' '}
              or visit our <Link href="/join" className="text-blue-600 hover:underline">contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
