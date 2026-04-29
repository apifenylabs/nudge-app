import { Compass, Heart, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About | Asia Family Travel Directory',
  description:
    'The story behind Asia\'s most trusted family travel directory. Created by Chris, a dad of two young girls who got tired of guessing.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-6 shadow-lg">
            <Compass size={14} />
            Built by a dad, for parents like him
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Because every family deserves a stress-free vacation
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            This is the story of how two little girls, one exhausted dad, and a terrible booking experience
            led to something better.
          </p>
        </div>
      </section>

      {/* Personal Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Night That Changed Everything</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              It was 11:47 PM. My two girls — Mia, 3, and Sophie, 1 — had finally gone to sleep after
              what felt like the longest day of parenting. I opened my laptop with a dream: find a
              family-friendly beach resort in Phuket for next month's holiday.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Three hours later, I had visited 17 websites, opened 42 browser tabs, and felt
              <em> less </em> prepared than when I started. I knew the resort had a pool. I knew
              it had 4.3 stars on TripAdvisor. But did it have baby-changing facilities? Was the
              balcony railing child-safe? Was there a place I could put Sophie down for her afternoon
              nap without her rolling off a hotel bed?
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              The reviews were from everyone: honeymooners, solo backpackers, business travelers,
              someone who ranted about the Wi-Fi speed. What I needed was a review from <strong>another
              parent with a toddler and a baby</strong>. I needed to know if their 3-year-old loved
              the kids' club and if the 1-year-old survived the flight.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              That night, I found one review buried deep in a Reddit thread. A mom in Singapore had
              written seven paragraphs about the exact same resort, including tips like "bring a
              portable sound machine" and "the buffet opens at 6:30 AM — get there early before the
              hangry toddlers arrive." That single review was more useful than all 47,000 Google
              results combined.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-6 my-8">
              <div className="flex items-start gap-3">
                <Heart size={20} className="text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-800 font-medium italic">
                    "I thought: if one parent's honest story helped me this much, imagine what
                    hundreds could do. So I built the directory I wished existed."
                  </p>
                  <p className="text-gray-600 text-sm mt-2">— Chris, Creator & Dad to Mia (3) & Sophie (1)</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">What Makes Us Different</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Generic travel directories treat a couple's romantic getaway and a trip with a toddler
              the same way. They don't ask: <strong>"How old are your kids?"</strong> They don't tell
              you if a restaurant has high chairs. They don't warn you that the "family-friendly"
              hotel put your room on the fifth floor with no elevator.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Every destination in this directory includes:
            </p>

            <ul className="space-y-3 mb-6">
              {[
                "Age-specific recommendations — is this great for a 2-year-old or better for a 10-year-old?",
                "Safety ratings — because 'looks safe' isn't the same as 'actually safe'",
                "Real parent stories — honest advice from people who've been there with kids the same age",
                "Practical tips — stroller access, diaper facilities, nap-friendly timing, the stuff that actually matters",
                "No spam — every destination is curated by a parent, not an algorithm",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star size={16} className="text-amber-500 mt-1 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Our Mission</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              We believe that planning a family trip should be exciting, not exhausting. You should
              spend your limited free time dreaming about the beach, not scrolling through 800
              irrelevant Google reviews to find one mention of a "stroller-friendly path."
            </p>

            <p className="text-gray-700 leading-relaxed">
              Every destination, tip, and story on this directory comes from a real parent. We
              personally verify the details, visit when we can, and update as our own kids grow.
              Because what worked for a 1-year-old might not work for a 4-year-old — and we know
              that because we're living it too.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-500">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">230</div>
              <div className="text-sm text-gray-500">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">2,000+</div>
              <div className="text-sm text-gray-500">Parent Tips</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-500">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-white mb-4">Join thousands of parents traveling smarter</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Stop guessing. Start exploring. Every destination here was chosen by a parent who's been
            exactly where you are.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg"
          >
            Browse Destinations
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
