'use client';

import { Clock, DollarSign, Star, Zap, Heart, Shield, Calendar, Users, MapPin, Gift } from 'lucide-react';
import { useState } from 'react';

interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'time' | 'money' | 'safety' | 'experience' | 'hidden';
  impact: 'high' | 'medium' | 'low';
  source?: string;
  lastVerified?: string;
  tags?: string[];
}

interface TipsAndTricksProps {
  title?: string;
  subtitle?: string;
  tips: Tip[];
  className?: string;
}

const categoryConfigMap = {
  time: { icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', label: 'Time Saver' },
  money: { icon: DollarSign, color: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', label: 'Money Saver' },
  safety: { icon: Shield, color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', label: 'Safety Tip' },
  experience: { icon: Star, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', label: 'Experience Boost' },
  hidden: { icon: Zap, color: 'text-rose-500', bgColor: 'bg-rose-50', borderColor: 'border-rose-200', label: 'Hidden Gem' }
};

const impactConfigMap = {
  high: { color: 'text-rose-600', bgColor: 'bg-rose-100', label: 'High Impact' },
  medium: { color: 'text-amber-600', bgColor: 'bg-amber-100', label: 'Medium Impact' },
  low: { color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Low Impact' }
};

export default function TipsAndTricks({
  title = "Pro Tips & Tricks",
  subtitle = "Time-tested advice from experienced families",
  tips,
  className = ''
}: TipsAndTricksProps) {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'impact' | 'category'>('impact');

  const filteredTips = tips.filter(tip => 
    filter === 'all' || tip.category === filter || tip.impact === filter
  );

  const sortedTips = [...filteredTips].sort((a, b) => {
    if (sortBy === 'impact') {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    }
    return a.category.localeCompare(b.category);
  });

  const categories = Object.keys(categoryConfigMap) as Array<keyof typeof categoryConfigMap>;
  const impacts: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium">Updated:</span>
            <span className="text-gray-700">Today</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tips
          </button>
          
          {categories.map(category => {
            const config = categoryConfigMap[category];
            const Icon = config.icon;
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === category
                    ? `${config.bgColor} ${config.color} border ${config.borderColor}`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {config.label}
              </button>
            );
          })}
          
          {impacts.map(impact => {
            const config = impactConfigMap[impact];
            return (
              <button
                key={impact}
                onClick={() => setFilter(impact)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === impact
                    ? `${config.bgColor} ${config.color}`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm text-gray-500">Sort by:</span>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setSortBy('impact')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'impact' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Impact
            </button>
            <button
              onClick={() => setSortBy('category')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'category' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Category
            </button>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedTips.map((tip) => {
            const categoryConfig = categoryConfigMap[tip.category];
            const impactConfig = impactConfigMap[tip.impact];
            const Icon = categoryConfig.icon;
            
            return (
              <div
                key={tip.id}
                className={`p-4 rounded-xl border ${categoryConfig.borderColor} ${categoryConfig.bgColor} hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${categoryConfig.bgColor} border ${categoryConfig.borderColor}`}>
                      <Icon className={`w-4 h-4 ${categoryConfig.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{tip.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${impactConfig.bgColor} ${impactConfig.color}`}>
                          {impactConfig.label}
                        </span>
                        <span className="text-xs text-gray-500">{categoryConfig.label}</span>
                      </div>
                    </div>
                  </div>
                  
                  {tip.lastVerified && (
                    <span className="text-xs text-gray-400">
                      Verified {tip.lastVerified}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">{tip.description}</p>
                
                {tip.tags && tip.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tip.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-white/50 text-gray-600 rounded border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {tip.source && (
                  <div className="mt-3 pt-3 border-t border-gray-200/50">
                    <p className="text-xs text-gray-500">
                      Source: <span className="text-gray-600">{tip.source}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>{tips.filter(t => t.impact === 'high').length} high-impact tips</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <span>{tips.filter(t => t.category === 'money').length} money-saving tips</span>
            </div>
          </div>
          <div className="text-gray-500">
            Total savings: ~$200+ per family
          </div>
        </div>
      </div>
    </div>
  );
}

// Example data
export const tokyoDisneyTips: Tip[] = [
  {
    id: 'tip-001',
    title: 'Arrive 30 Minutes Before Opening',
    description: 'Head straight to Fantasyland for popular rides with minimal wait times. Most visitors head to Tomorrowland first.',
    category: 'time',
    impact: 'high',
    source: 'Tokyo Disney Official Guide',
    lastVerified: 'Today',
    tags: ['Crowd Management', 'Strategy']
  },
  {
    id: 'tip-002',
    title: 'Buy Tickets Online 2+ Months Early',
    description: 'Save 15% on ticket prices by purchasing well in advance through the official website.',
    category: 'money',
    impact: 'high',
    source: 'Klook Partner Pricing',
    lastVerified: 'Today',
    tags: ['Discount', 'Advance Purchase']
  },
  {
    id: 'tip-003',
    title: 'Use Single Rider Lines',
    description: 'For older kids (8+), Single Rider lines can cut wait times by 70% on popular attractions.',
    category: 'time',
    impact: 'high',
    source: 'Family Travel Forum',
    lastVerified: 'Yesterday',
    tags: ['Teens', 'Wait Times']
  },
  {
    id: 'tip-004',
    title: 'Pack Your Own Snacks',
    description: 'Tokyo Disney allows outside food. Save $50+ per day for a family of four by bringing snacks.',
    category: 'money',
    impact: 'high',
    source: 'Park Policy Document',
    lastVerified: 'Today',
    tags: ['Budget', 'Food']
  },
  {
    id: 'tip-005',
    title: 'Visit on Weekday in September',
    description: 'Lowest crowd levels occur on weekdays during September and October after summer break ends.',
    category: 'experience',
    impact: 'medium',
    source: 'Crowd Calendar Data',
    lastVerified: 'Today',
    tags: ['Seasonal', 'Crowds']
  },
  {
    id: 'tip-006',
    title: 'Free Celebration Buttons',
    description: 'Get free "Celebration" buttons at City Hall for birthdays, first visits, or anniversaries.',
    category: 'hidden',
    impact: 'low',
    source: 'Cast Member Tip',
    lastVerified: 'Today',
    tags: ['Freebie', 'Souvenir']
  },
  {
    id: 'tip-007',
    title: 'Baby Care Centers',
    description: 'Free baby food, nursing rooms, and quiet areas available. Much better than US Disney parks.',
    category: 'safety',
    impact: 'medium',
    source: 'Parent Reviews',
    lastVerified: 'Today',
    tags: ['Toddlers', 'Amenities']
  },
  {
    id: 'tip-008',
    title: 'Rainy Day Strategy',
    description: 'Rain = shorter lines. Free ponchos available at many shops. Perfect for getting on popular rides.',
    category: 'hidden',
    impact: 'medium',
    source: 'Local Guide',
    lastVerified: 'Today',
    tags: ['Weather', 'Strategy']
  }
];