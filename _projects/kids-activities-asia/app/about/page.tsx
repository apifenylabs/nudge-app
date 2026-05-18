export const metadata = {
  title: 'About | Kids Activities Asia',
  description: 'Kids Activities Asia helps parents find the best activities, classes, and attractions for their children across Asia.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">About Kids Activities Asia</h1>
      
      <section className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Kids Activities Asia is your curated guide to the best things to do with kids across Asia. We help parents 
          find age-appropriate, safe, and engaging activities for children from babies to teens.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Every activity on this site is parent-reviewed, safety-rated, and organized by age group so you can 
          quickly find the perfect outing for your family — whether you&apos;re a local or visiting.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How We Rate Activities</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Safety Rating (1-5):</strong> Based on safety features, staff training, and parent reviews</li>
          <li><strong>Age Range:</strong> Recommended ages based on activity design and content</li>
          <li><strong>Price Range:</strong> $ (budget), $$ (moderate), $$$ (premium)</li>
          <li><strong>Popularity Score:</strong> Based on review volume and parent recommendations</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Our Cities</h2>
        <p className="text-gray-700">
          We currently cover Hong Kong, Singapore, Bangkok, Tokyo, Bali, and Osaka — with more cities 
          being added regularly. Each city&apos;s activities are curated by local parents who know what&apos;s 
          best for families.
        </p>
      </section>

      <section className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">📩 Suggest an Activity</h2>
        <p className="text-gray-700">
          Know a great kids&apos; activity that should be listed? We&apos;d love to hear about it. 
          Contact us through our <a href="/contact" className="text-orange-500 hover:text-orange-600">contact page</a>.
        </p>
      </section>
    </div>
  );
}
