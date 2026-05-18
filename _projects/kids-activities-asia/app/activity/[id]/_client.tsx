'use client';

import Link from 'next/link';
import { getActivityById } from '@/lib/getData';

export default function ActivityDetailClient({ id }: { id: string }) {
  const activity = getActivityById(id);

  if (!activity) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl block mb-4">😕</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Activity Not Found</h1>
        <p className="text-gray-500 mb-6">This activity might have been removed or renamed.</p>
        <Link href="/search" className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
          Browse All Activities
        </Link>
      </div>
    );
  }

  const icon = activity.category === 'Theme Park' ? '🎢' : 
    activity.category === 'Educational' ? '📚' : 
    activity.category === 'Sports & Fitness' ? '⚽' : 
    activity.category === 'Zoo & Animals' ? '🦁' : 
    activity.category === 'Outdoors & Nature' ? '🌿' : '🎪';

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/search" className="text-orange-500 hover:text-orange-600 font-medium text-sm mb-6 inline-block">
        ← Back to activities
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50 p-8 md:p-12">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-white/80 text-orange-700 px-3 py-1 rounded-full">{activity.category}</span>
                <span className="text-sm bg-white/80 text-blue-700 px-3 py-1 rounded-full">{activity.subCategory}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{activity.name}</h1>
              <p className="text-lg text-gray-600">{activity.city}, {activity.country}</p>
            </div>
            <span className="text-6xl hidden md:block">{icon}</span>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <span className="text-2xl block mb-1">⭐</span>
              <span className="font-bold text-lg text-gray-900">{activity.rating}</span>
              <span className="text-xs text-gray-500 block">({activity.reviewCount.toLocaleString()} reviews)</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <span className="text-2xl block mb-1">👶</span>
              <span className="font-semibold text-gray-900">{activity.ageRange} yrs</span>
              <span className="text-xs text-gray-500 block">Recommended age</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <span className="text-2xl block mb-1">🕐</span>
              <span className="font-semibold text-gray-900">{activity.sessionDuration}</span>
              <span className="text-xs text-gray-500 block">Duration</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <span className="text-2xl block mb-1">💰</span>
              <span className="font-bold text-lg text-gray-900">{activity.priceRange}</span>
              <span className="text-xs text-gray-500 block">{activity.priceRange === '$' ? 'Budget-friendly'
                : activity.priceRange === '$$' ? 'Moderate' : 'Premium'}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Activity</h2>
            <p className="text-gray-700 leading-relaxed">{activity.description}</p>
          </div>

          {/* Location & Best Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📍 Location</h3>
              <p className="text-gray-700">{activity.location}</p>
              <p className="text-sm text-gray-500 mt-1">{activity.region}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🕐 Best Time to Visit</h3>
              <p className="text-gray-700">{activity.bestTime}</p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {activity.amenities.map((amenity, i) => (
                <span key={i} className="bg-gray-50 border border-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Safety */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🛡️</span>
              <h2 className="text-xl font-semibold text-gray-900">Safety & Parent Peace of Mind</h2>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Safety rating: <span className="font-bold text-yellow-700">{activity.safetyRating}/5.0</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {activity.safetyFeatures.map((feature, i) => (
                <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm">
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Book Now */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Plan Your Visit</h2>
            <p className="text-gray-600 mb-4">Book tickets and save time with these trusted partners.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {activity.affiliateLinks.klook && (
                <a
                  href={activity.affiliateLinks.klook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                >
                  🎫 Book on Klook
                </a>
              )}
              {activity.affiliateLinks.tripcom && (
                <a
                  href={activity.affiliateLinks.tripcom}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-orange-500 border-2 border-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
                >
                  🎫 Book on Trip.com
                </a>
              )}
              {!activity.affiliateLinks.klook && !activity.affiliateLinks.tripcom && (
                <p className="text-gray-500 text-sm">Visit their website directly for booking information.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
