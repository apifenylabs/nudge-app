'use client';

import { Check, X, Minus, AlertCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface ComparisonRow {
  feature: string;
  optionA: string | number | boolean;
  optionB: string | number | boolean;
  bestFor: string;
  explanation?: string;
}

interface ComparisonTableProps {
  title: string;
  subtitle?: string;
  optionAName: string;
  optionBName: string;
  rows: ComparisonRow[];
  recommendation?: string;
  className?: string;
}

export default function ComparisonTable({
  title,
  subtitle,
  optionAName,
  optionBName,
  rows,
  recommendation,
  className = ''
}: ComparisonTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const renderValue = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center justify-center">
          <Check className="w-5 h-5 text-emerald-500" />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <X className="w-5 h-5 text-gray-300" />
        </div>
      );
    }
    
    if (typeof value === 'number') {
      return (
        <div className="text-center">
          <span className="font-bold text-gray-900">{value}</span>
          {value >= 4.5 && <div className="text-xs text-emerald-600 mt-1">Excellent</div>}
          {value >= 4.0 && value < 4.5 && <div className="text-xs text-amber-600 mt-1">Good</div>}
          {value < 4.0 && <div className="text-xs text-rose-600 mt-1">Fair</div>}
        </div>
      );
    }
    
    return <span className="text-gray-700">{value}</span>;
  };

  const getBestForColor = (text: string) => {
    if (text.includes(optionAName)) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (text.includes(optionBName)) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (text.includes('Both')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span>Family decision helper</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left p-4 font-semibold text-gray-700 bg-gray-50">Feature</th>
              <th className="text-center p-4 font-semibold text-gray-700 bg-blue-50">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-blue-700">{optionAName}</span>
                  <div className="w-8 h-1 bg-blue-500 rounded-full mt-1"></div>
                </div>
              </th>
              <th className="text-center p-4 font-semibold text-gray-700 bg-purple-50">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-purple-700">{optionBName}</span>
                  <div className="w-8 h-1 bg-purple-500 rounded-full mt-1"></div>
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-gray-700 bg-gray-50">Best For</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${expandedRow === index ? 'bg-gray-50' : ''}`}
                onClick={() => setExpandedRow(expandedRow === index ? null : index)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{row.feature}</span>
                    {row.explanation && (
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="text-center p-4">
                  {renderValue(row.optionA)}
                </td>
                <td className="text-center p-4">
                  {renderValue(row.optionB)}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getBestForColor(row.bestFor)}`}>
                    {row.bestFor}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded explanation */}
      {expandedRow !== null && rows[expandedRow]?.explanation && (
        <div className="p-4 bg-blue-50 border-t border-blue-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 mb-1">About {rows[expandedRow].feature}</p>
              <p className="text-blue-800 text-sm">{rows[expandedRow].explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Our Recommendation</h4>
              <p className="text-gray-700 mt-1">{recommendation}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">{optionAName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-600">{optionBName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Based on family reviews, safety data, and value analysis. Updated daily.
        </p>
      </div>
    </div>
  );
}

// Example usage data
export const disneyComparisonData = {
  title: "Disneyland vs DisneySea: Family Decision Guide",
  subtitle: "Which Tokyo Disney park is right for your family?",
  optionAName: "Disneyland",
  optionBName: "DisneySea",
  rows: [
    {
      feature: "Best Age Range",
      optionA: "2-10 years",
      optionB: "6-17 years",
      bestFor: "Younger kids vs Older kids/teens",
      explanation: "Disneyland has more gentle rides suitable for toddlers, while DisneySea offers more thrilling attractions for older children."
    },
    {
      feature: "Theme & Atmosphere",
      optionA: "Classic Disney Magic",
      optionB: "Nautical Adventure",
      bestFor: "Traditional vs Unique experience",
      explanation: "Disneyland features familiar Disney characters and castles, while DisneySea offers a unique maritime theme not found elsewhere."
    },
    {
      feature: "Crowd Levels",
      optionA: "More crowded",
      optionB: "Slightly less crowded",
      bestFor: "Popular choice vs Niche appeal",
      explanation: "Disneyland attracts more families with young children, while DisneySea's unique theme draws slightly fewer visitors."
    },
    {
      feature: "Ride Intensity",
      optionA: "Gentle to Moderate",
      optionB: "Moderate to Thrilling",
      bestFor: "First-timers vs Thrill-seekers",
      explanation: "Perfect for children's first theme park experience vs更适合寻求刺激的大孩子和青少年。"
    },
    {
      feature: "Stroller Access",
      optionA: "Excellent",
      optionB: "Good (more stairs)",
      bestFor: "Toddlers vs Walkers",
      explanation: "Disneyland has more flat pathways and stroller-friendly areas compared to DisneySea's multi-level design."
    },
    {
      feature: "Food Options",
      optionA: "Classic American",
      optionB: "International cuisine",
      bestFor: "Picky eaters vs Adventurous",
      explanation: "Familiar burgers and fries vs unique seafood and international dishes from around the world."
    },
    {
      feature: "Character Meets",
      optionA: "More frequent",
      optionB: "Less frequent",
      bestFor: "Character lovers vs Experience seekers",
      explanation: "Traditional Disney characters appear more often in Disneyland vs unique characters in DisneySea."
    },
    {
      feature: "Photo Opportunities",
      optionA: "Iconic castle",
      optionB: "Unique landscapes",
      bestFor: "Classic photos vs Creative shots",
      explanation: "Cinderella Castle is iconic vs Mediterranean harbor and volcano provide unique backdrops."
    }
  ],
  recommendation: "Choose Disneyland for families with children under 8, DisneySea for families with kids 6+. For first-time visitors with mixed ages, Disneyland is the safer choice."
};