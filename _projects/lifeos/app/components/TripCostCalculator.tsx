'use client';

/**
 * LifeOS — Trip Cost Calculator
 *
 * Interactive client component for Travel OS plugin.
 * Helps users estimate trip costs across categories.
 * Fully self-contained — no API calls, no Supabase.
 * Stores budgets locally in localStorage.
 */

import { useState, useEffect, useCallback } from 'react';

interface CostCategory {
  id: string;
  label: string;
  emoji: string;
  low: number;
  mid: number;
  high: number;
}

const DEFAULT_CATEGORIES: CostCategory[] = [
  { id: 'flights', label: 'Flights', emoji: '✈️', low: 300, mid: 800, high: 2000 },
  { id: 'accommodation', label: 'Accommodation', emoji: '🏨', low: 30, mid: 120, high: 400 },
  { id: 'food', label: 'Food & Drink', emoji: '🍽️', low: 20, mid: 50, high: 150 },
  { id: 'transport', label: 'Local Transport', emoji: '🚕', low: 10, mid: 30, high: 80 },
  { id: 'activities', label: 'Activities', emoji: '🎫', low: 15, mid: 50, high: 150 },
  { id: 'insurance', label: 'Insurance & Fees', emoji: '🛡️', low: 5, mid: 15, high: 50 },
  { id: 'misc', label: 'Miscellaneous', emoji: '📦', low: 10, mid: 30, high: 100 },
];

type BudgetStyle = 'budget' | 'moderate' | 'luxury';

const BUDGET_MULTIPLIERS: Record<BudgetStyle, { label: string; desc: string; key: keyof CostCategory }> = {
  budget: { label: '🎒 Budget', desc: 'Low-cost travel, hostels, street food', key: 'low' },
  moderate: { label: '🏝️ Moderate', desc: 'Mid-range hotels, mix of dining', key: 'mid' },
  luxury: { label: '✨ Luxury', desc: 'Premium hotels, fine dining, tours', key: 'high' },
};

export default function TripCostCalculator() {
  const [budgetStyle, setBudgetStyle] = useState<BudgetStyle>('moderate');
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(1);
  const [categories, setCategories] = useState<CostCategory[]>(DEFAULT_CATEGORIES);
  const [savedTrips, setSavedTrips] = useState<Array<{ name: string; total: number; date: string }>>([]);
  const [tripName, setTripName] = useState('');

  // Load saved trips from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lifeos-trip-costs');
      if (raw) setSavedTrips(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const getDailyCost = useCallback((cat: CostCategory): number => {
    const key = BUDGET_MULTIPLIERS[budgetStyle].key;
    return cat[key] as number;
  }, [budgetStyle]);

  const totalEstimate = categories.reduce((sum, cat) => {
    const daily = getDailyCost(cat);
    // Flights are one-time, everything else is per-day
    const isOneTime = cat.id === 'flights' || cat.id === 'insurance';
    return sum + (isOneTime ? daily : daily * days) * travelers;
  }, 0);

  const perPersonCost = totalEstimate / travelers;

  const saveTrip = () => {
    const name = tripName.trim() || `Trip ${savedTrips.length + 1}`;
    const entry = { name, total: totalEstimate, date: new Date().toLocaleDateString() };
    const updated = [...savedTrips, entry].slice(-10); // keep last 10
    setSavedTrips(updated);
    localStorage.setItem('lifeos-trip-costs', JSON.stringify(updated));
    setTripName('');
  };

  return (
    <div className="space-y-6">
      {/* Style Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(BUDGET_MULTIPLIERS) as [BudgetStyle, typeof BUDGET_MULTIPLIERS['budget']][]).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setBudgetStyle(key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                budgetStyle === key
                  ? 'border-teal-300 bg-teal-50 ring-1 ring-teal-400'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm text-gray-900">{val.label}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{val.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Trip Parameters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Duration (days)</label>
          <input
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
          <input
            type="number"
            min={1}
            max={50}
            value={travelers}
            onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
          />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Cost Breakdown</h3>
        <div className="space-y-2">
          {categories.map((cat) => {
            const daily = getDailyCost(cat);
            const isOneTime = cat.id === 'flights' || cat.id === 'insurance';
            const lineTotal = (isOneTime ? daily : daily * days) * travelers;
            const maxPossible = (isOneTime ? cat.high : cat.high * days) * travelers;
            const pct = maxPossible > 0 ? (lineTotal / totalEstimate) * 100 : 0;

            return (
              <div key={cat.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg shrink-0">{cat.emoji}</span>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                    <span className="text-[11px] text-gray-400 ml-2">
                      ${daily}/day × {isOneTime ? '1x' : `${days} days`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5 hidden sm:block">
                    <div
                      className="bg-teal-400 h-1.5 rounded-full transition-all"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-20 text-right">
                    ${lineTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium opacity-90">Total Estimate</span>
          <span className="text-xs opacity-75">${perPersonCost.toLocaleString()} / person</span>
        </div>
        <div className="text-3xl font-bold">
          ${totalEstimate.toLocaleString()}
        </div>
        <div className="text-xs opacity-75 mt-1">
          {days} days · {travelers} traveler{travelers > 1 ? 's' : ''} · {BUDGET_MULTIPLIERS[budgetStyle].label}
        </div>
      </div>

      {/* Save Trip */}
      <div className="flex gap-2">
        <input
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          placeholder="Name this trip estimate..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
        />
        <button
          onClick={saveTrip}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          💾 Save
        </button>
      </div>

      {/* Saved Trips */}
      {savedTrips.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Saved Estimates</h3>
          <div className="space-y-1.5">
            {savedTrips.slice().reverse().map((trip, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-lg text-sm">
                <span className="text-gray-700 font-medium">{trip.name}</span>
                <span className="text-gray-500">
                  ${trip.total.toLocaleString()} · {trip.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
