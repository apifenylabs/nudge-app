'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Station, computeStationScore, scoreTier } from '@/lib/scoring'

interface StationCardProps {
  station: Station
}

interface AmenityIcon {
  key: keyof Station
  icon: string
  label: string
}

const AMENITIES: AmenityIcon[] = [
  { key: 'hasRestroomNearby', icon: '🚻', label: 'Restroom' },
  { key: 'hasFoodNearby', icon: '🍽️', label: 'Food' },
  { key: 'hasCoveredParking', icon: '🅿️', label: 'Covered' },
  { key: 'has24by7Access', icon: '🕐', label: '24/7' },
  { key: 'isMallParking', icon: '🏪', label: 'Mall' },
]

const StationCard: FC<StationCardProps> = ({ station }) => {
  const score = computeStationScore(station)
  const tier = scoreTier(score)

  // Family-friendly: 3+ family amenities
  const familyAmenities = [station.hasRestroomNearby, station.hasFoodNearby, station.hasCoveredParking, station.isMallParking]
  const familyScore = familyAmenities.filter(Boolean).length
  const isFamilyFriendly = familyScore >= 2

  const activeAmenities = AMENITIES.filter(a => station[a.key] === true)
  const connectorColors: Record<string, string> = {
    CCS2: 'bg-blue-100 text-blue-800',
    CHAdeMO: 'bg-purple-100 text-purple-800',
    'GB/T': 'bg-green-100 text-green-800',
    NACS: 'bg-orange-100 text-orange-800',
    'Type 2': 'bg-teal-100 text-teal-800',
  }

  return (
    <Link
      href={`/station/${station.id}`}
      className="block bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:shadow-lg hover:bg-white/80 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
            {station.name}
          </h3>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {station.address}, {station.city}, {station.country}
          </p>
        </div>
        <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full text-xs font-medium border ${tier.color}`}>
          {tier.label}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold text-gray-900">{station.chargerSpeed}</span>
        <span className="text-xs text-gray-500">kW</span>
        <span className="mx-1 text-gray-300">|</span>
        <span className="text-yellow-500 text-sm">{'★'.repeat(Math.round(station.reliability))}</span>
        <span className="text-xs text-gray-400">{station.reliability.toFixed(1)}</span>
        <span className="mx-1 text-gray-300">|</span>
        <span className="text-xs text-gray-500">{station.operator || 'Unknown'}</span>
      </div>

      {/* Connector types */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {station.chargerTypes.slice(0, 4).map((conn) => (
          <span
            key={conn}
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${connectorColors[conn] || 'bg-gray-100 text-gray-700'}`}
          >
            {conn}
          </span>
        ))}
        {station.chargerTypes.length > 4 && (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500">
            +{station.chargerTypes.length - 4}
          </span>
        )}
      </div>

      {/* Amenity icons */}
      {activeAmenities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {activeAmenities.map(a => (
            <span key={a.key} className="text-[11px] px-1.5 py-0.5 bg-gray-50 rounded" title={a.label}>
              {a.icon} {a.label}
            </span>
          ))}
        </div>
      )}

      {/* Family-friendly badge */}
      {isFamilyFriendly && (
        <div className="flex items-center gap-1">
          <span className="text-[11px] px-2 py-0.5 bg-pink-50 text-pink-700 border border-pink-200 rounded-full font-medium">
            👶 Family Friendly
          </span>
        </div>
      )}
    </Link>
  )
}

export default StationCard
