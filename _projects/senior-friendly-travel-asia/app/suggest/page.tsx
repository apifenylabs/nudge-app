import { Metadata } from 'next';
import Link from 'next/link';
import { Send, Sparkles, Accessibility } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Suggest a Destination — Senior-Friendly Travel Asia',
  description: 'Know a senior-friendly spot in Asia? Share your recommendation and help other seniors discover accessible destinations.',
  openGraph: {
    title: 'Suggest a Destination — Senior-Friendly Travel Asia',
    description: 'Share your senior-friendly travel recommendation for Asia.',
  },
};

export default function SuggestPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">Suggest a Destination</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            Know a Great Senior-Friendly Spot?
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl leading-relaxed">
            We&apos;re building this directory together. Share your experience and help other seniors
            discover the best of Asia.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Share Your Tip</h2>
              <p className="text-sm text-gray-500">
                Tell us about a destination we should add to our directory
              </p>
            </div>
          </div>
          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="New Destination Suggestion - Senior Travel" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination Name
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="e.g., Ubud, Bali — Senior-friendly retreats"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                name="country"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm bg-white"
              >
                <option value="">Select a country</option>
                <option value="japan">Japan</option>
                <option value="thailand">Thailand</option>
                <option value="vietnam">Vietnam</option>
                <option value="indonesia">Indonesia</option>
                <option value="singapore">Singapore</option>
                <option value="malaysia">Malaysia</option>
                <option value="south-korea">South Korea</option>
                <option value="taiwan">Taiwan</option>
                <option value="philippines">Philippines</option>
                <option value="cambodia">Cambodia</option>
                <option value="laos">Laos</option>
                <option value="myanmar">Myanmar</option>
                <option value="sri-lanka">Sri Lanka</option>
                <option value="india">India</option>
                <option value="china">China</option>
                <option value="hong-kong">Hong Kong</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why is this destination senior-friendly? <span className="text-gray-400">(select all that apply)</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Good public transport',
                  'Wheelchair accessible',
                  'Slow-paced activities',
                  'Medical facilities nearby',
                  'English widely spoken',
                  'Affordable accommodation',
                  'Pleasant climate',
                  'Safe for solo seniors',
                ].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" name="features" value={opt} className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Tell us more <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm resize-y"
                placeholder="Share your experience, accessibility tips, or favorite spots in this destination..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-800 transition-all shadow-sm"
            >
              Submit Suggestion
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Prefer to send a quick note?{' '}
            <Link href="/contact" className="text-teal-700 hover:text-teal-800 font-medium underline underline-offset-2">
              Use our contact form
            </Link>
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-8 text-sm text-gray-400 flex gap-6">
        <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
        <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
        <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
      </div>
    </main>
  );
}
