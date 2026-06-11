'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Heart, MapPin, Shield, Star, Clock, Users,
  TreePine, Church, Hotel, Stethoscope, Sun, Search,
  SlidersHorizontal, ArrowUpRight, BadgeCheck, Accessibility
} from 'lucide-react';

const FEATURED_DESTINATIONS = [
  {
    name: 'Singapore',
    country: 'Singapore',
    image: '/images/singapore.jpg',
    description: 'Excellent accessibility, English-friendly, world-class healthcare, and plenty of senior discounts.',
    accessibility_rating: 9.2,
    facilities: ['Wheelchair-friendly MRT', 'Senior concessions', 'English spoken', 'Top hospitals'],
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    image: '/images/tokyo.jpg',
    description: 'Clean, safe, punctual public transport. Senior-friendly attractions with priority seating everywhere.',
    accessibility_rating: 8.8,
    facilities: ['Priority seating', 'Senior discounts', 'Excellent healthcare', 'Wheelchair access'],
  },
  {
    name: 'Chiang Mai',
    country: 'Thailand',
    image: '/images/chiang-mai.jpg',
    description: 'Slow-paced, affordable, with quality medical care and a relaxed temple-dotted old city.',
    accessibility_rating: 7.5,
    facilities: ['Affordable healthcare', 'Flat old city', 'Senior pricing', 'Relaxed pace'],
  },
  {
    name: 'Taipei',
    country: 'Taiwan',
    image: '/images/taipei.jpg',
    description: 'Easy to navigate, affordable, excellent public hospital system, and very senior-friendly culture.',
    accessibility_rating: 8.5,
    facilities: ['MRT accessibility', 'English signage', 'Senior discounts', 'Excellent hospitals'],
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    image: '/images/kyoto.jpg',
    description: 'Tranquil temples, serene gardens, slow-paced exploration, and excellent accessibility for older visitors.',
    accessibility_rating: 8.2,
    facilities: ['Accessible temples', 'Senior discounts', 'Peaceful gardens', 'Guided tours'],
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    image: '/images/bangkok.jpg',
    description: 'Affordable luxury, excellent private hospitals, and many hotels with senior-friendly amenities.',
    accessibility_rating: 7.0,
    facilities: ['World-class hospitals', 'Senior rates', 'Affordable', 'Medical tourism hub'],
  },
];

const CATEGORIES = [
  { name: 'Accessible Hotels', icon: Hotel, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  { name: 'Medical Facilities', icon: Stethoscope, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  { name: 'Slow-Paced Tours', icon: Clock, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  { name: 'Senior Discounts', icon: BadgeCheck, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
  { name: 'Accessible Transport', icon: Accessibility, color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300' },
  { name: 'Peaceful Gardens', icon: TreePine, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
];

const SENIOR_TIPS = [
  {
    title: 'Choose the Right Season',
    text: 'Travel between November and February when temperatures are mild. Avoid monsoon seasons and extreme summer heat.',
    icon: Sun,
  },
  {
    title: 'Get Travel Insurance',
    text: 'Always get comprehensive insurance that covers pre-existing conditions. Medical evacuation coverage is essential.',
    icon: Shield,
  },
  {
    title: 'Plan for Rest Days',
    text: 'Build in rest days between excursions. A 2:1 ratio of rest to activity days keeps the trip enjoyable.',
    icon: Clock,
  },
  {
    title: 'Use Senior Discounts',
    text: 'Many attractions offer discounts for 60+. Always carry your passport for age verification. Japan, Thailand, and Singapore have generous programs.',
    icon: BadgeCheck,
  },
];

export default function HomeContent() {
  const [visibleTips, setVisibleTips] = useState(4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-100 text-sm font-medium mb-4">
              <Accessibility className="w-5 h-5" />
              <span>Curated for Travelers 60+</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
              Senior-Friendly<br />
              <span className="text-emerald-200">Asia Travel</span>
            </h1>
            <p className="text-lg sm:text-xl text-teal-50/90 max-w-2xl mb-8 leading-relaxed">
              Discover accessible destinations, mobility-friendly hotels, slow-paced tours, 
              and senior-friendly accommodation across Asia. Travel with confidence, comfort, and dignity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/destination"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg shadow-emerald-900/20"
              >
                <MapPin className="w-5 h-5" />
                Explore Destinations
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                <Star className="w-5 h-5" />
                Senior Travel Tips
              </Link>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="border-t border-white/10 bg-black/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-6 sm:gap-12 text-sm">
            <div><span className="font-bold text-xl">15+</span> <span className="text-teal-100">Destinations</span></div>
            <div><span className="font-bold text-xl">50+</span> <span className="text-teal-100">Senior-Friendly Hotels</span></div>
            <div><span className="font-bold text-xl">100%</span> <span className="text-teal-100">Curated for 60+</span></div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            What Matters for Senior Travel
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every listing is evaluated for accessibility, medical proximity, and comfort for older travelers.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${cat.color} transition-all hover:scale-105 hover:shadow-lg`}
            >
              <cat.icon className="w-8 h-8" />
              <span className="text-sm font-semibold text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-white dark:bg-gray-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">
                Top Senior-Friendly Destinations
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Handpicked for accessibility, healthcare quality, and comfort.
              </p>
            </div>
            <Link
              href="/destination"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_DESTINATIONS.map((dest) => (
              <Link
                key={dest.name}
                href={`/destination/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="h-40 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-white/50" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-sm text-gray-500">{dest.country}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-lg text-sm font-semibold">
                      <Shield className="w-3.5 h-3.5" />
                      {dest.accessibility_rating}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.facilities.slice(0, 3).map((f) => (
                      <span key={f} className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/destination"
              className="inline-flex items-center gap-1 text-emerald-600 font-semibold"
            >
              View All Destinations <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Senior Travel Tips */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Tips for Senior Travelers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Practical advice to make your Asia trip safe, comfortable, and memorable.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SENIOR_TIPS.slice(0, visibleTips).map((tip) => (
            <div
              key={tip.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-4">
                <tip.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Ready to Explore Asia with Confidence?
          </h2>
          <p className="text-lg text-teal-50/90 mb-8 max-w-2xl mx-auto">
            Stay updated with new senior-friendly destinations, accessibility guides, and exclusive senior travel deals.
          </p>
          <form className="max-w-md mx-auto flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
