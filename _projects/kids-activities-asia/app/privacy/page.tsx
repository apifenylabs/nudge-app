export const metadata = {
  title: 'Privacy Policy | Kids Activities Asia',
  description: 'Privacy policy for Kids Activities Asia.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-gray-500">Last updated: May 4, 2026</p>

      <section className="space-y-3 text-gray-700">
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <p>We collect minimal information to provide our service:</p>
        <ul className="list-disc list-inside">
          <li>Page visit data via Vercel Analytics (anonymous)</li>
          <li>Contact form submissions (name, email, message)</li>
          <li>No cookies or tracking beyond standard analytics</li>
        </ul>
      </section>

      <section className="space-y-3 text-gray-700">
        <h2 className="text-xl font-semibold">How We Use Your Data</h2>
        <ul className="list-disc list-inside">
          <li>To improve our directory and recommendations</li>
          <li>To respond to your inquiries</li>
          <li>We never sell or share personal data</li>
        </ul>
      </section>

      <section className="space-y-3 text-gray-700">
        <h2 className="text-xl font-semibold">Affiliate Links</h2>
        <p>
          Some activity listings contain affiliate links to booking platforms. We may earn a small 
          commission at no extra cost to you. This helps us maintain and grow the directory.
        </p>
      </section>

      <section className="space-y-3 text-gray-700">
        <h2 className="text-xl font-semibold">Usage Data &amp; Ecosystem Improvement</h2>
        <p>
          We offer an optional telemetry feature to help improve all sites in our ecosystem.
          When enabled, anonymous usage data (page views, feature clicks, affiliate interactions)
          is collected to understand how visitors use our sites.
        </p>
        <p>
          <strong>No data is collected without your explicit consent.</strong>
          You can opt in or out at any time via the toggle in the bottom-right corner of any page.
          Data collected includes: page paths visited, feature interactions, and session duration.
          No personally identifiable information is ever collected or stored.
        </p>
      </section>


      <section className="space-y-3 text-gray-700">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>For privacy questions, contact us through our contact form.</p>
      </section>
    </div>
  );
}
