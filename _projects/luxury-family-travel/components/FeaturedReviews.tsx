'use client';

import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    quote: 'We\'ve stayed at luxury resorts all over the world, but nothing compares to the experience at Four Seasons Sayan. The kids\' club felt like a cultural immersion, not just babysitting. Our 7-year-old learned to make offerings and still talks about the rice terrace walks.',
    author: 'Sophie & James Chen',
    location: 'Singapore',
    resort: 'Four Seasons Sayan, Bali',
    rating: 5,
    family: 'Family of 4 (kids aged 5 & 7)',
  },
  {
    quote: 'Amanpuri exceeded every expectation. The private pool villa meant we could let the kids splash around while we relaxed on the daybed. The Thai boxing class for children was a highlight — our 10-year-old still practises his moves. Pure magic.',
    author: 'The Williams Family',
    location: 'London, UK',
    resort: 'Amanpuri, Phuket',
    rating: 5,
    family: 'Family of 4 (kids aged 8 & 10)',
  },
  {
    quote: 'Soneva Fushi is basically a kids\' paradise disguised as a luxury resort. The waterslide from our villa into the ocean, the chocolate room (yes, unlimited chocolate), and the observatory made this the most memorable family holiday we\'ve ever had. Six stars.',
    author: 'Alexandra & Marco Rossi',
    location: 'Milan, Italy',
    resort: 'Soneva Fushi, Maldives',
    rating: 5,
    family: 'Family of 5 (kids aged 4, 7 & 9)',
  },
  {
    quote: 'The attention to detail at Aman Tokyo is staggering. They had a step stool ready in the bathroom for our 3-year-old without us even asking. The concierge arranged a private sushi masterclass that captivated even our teenagers. Truly world-class.',
    author: 'Dr. Priya & Raj Patel',
    location: 'Mumbai, India',
    resort: 'Aman Tokyo, Japan',
    rating: 5,
    family: 'Family of 4 (kids aged 3 & 14)',
  },
  {
    quote: 'Velaa Private Island is worth every penny for families who value privacy. The submarine excursion was unforgettable for all of us, and the kids\' marine biology programme meant our children learned while having the time of their lives. The service ratio is incredible.',
    author: 'The von Bismarck Family',
    location: 'Vienna, Austria',
    resort: 'Velaa Private Island, Maldives',
    rating: 5,
    family: 'Family of 5 (kids aged 6, 8 & 11)',
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'}
      />
    ))}
  </div>
);

export default function FeaturedReviews() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">Real Families, Real Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark">What Families Say</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              Honest reviews from families who have experienced these properties first-hand.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-charcoal hover:border-gold/30 transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-charcoal hover:border-gold/30 transition-all"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gold/10">
            <Quote size={32} className="text-gold/20 absolute top-6 right-6" />
            <div className="max-w-3xl">
              <StarRating rating={t.rating} />
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed my-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-charcoal-dark">{t.author}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{t.resort}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.family} &middot; {t.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i === current ? 'bg-gold w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile nav */}
          <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500"
              aria-label="Previous review"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500"
              aria-label="Next review"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
