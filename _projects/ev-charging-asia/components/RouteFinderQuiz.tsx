'use client';

import { useState, useMemo } from 'react';
import { Zap, ArrowRight, RotateCcw, MapPin, BatteryCharging, Users, Crown, Globe, Mountain, Sun, Umbrella } from 'lucide-react';
import Link from 'next/link';
import { getAllItineraries } from '@/data/itineraries';
import type { Itinerary } from '@/data/itineraries';

interface QuizAnswers {
  duration: 'short' | 'medium' | 'long';
  difficulty: 'easy' | 'moderate' | 'any';
  vibe: 'beach' | 'culture' | 'nature' | 'city' | 'mix';
  luxury: 'budget' | 'mid' | 'luxury';
  kids: 'yes' | 'maybe' | 'no';
  region: 'se-asia' | 'east-asia' | 'south-asia' | 'any';
}

const initialAnswers: QuizAnswers = {
  duration: 'medium',
  difficulty: 'easy',
  vibe: 'mix',
  luxury: 'mid',
  kids: 'yes',
  region: 'any',
};

const STEP_LABELS = ['Trip length', 'Difficulty', 'Vibe', 'Budget', 'Kids?', 'Region'];
const STEP_ICONS = [<span key="1">📅</span>, <span key="2">🟢</span>, <span key="3">🏖️</span>, <span key="4">💰</span>, <span key="5">👨‍👩‍👧‍👦</span>, <span key="6">🌏</span>];

function scoreItinerary(it: Itinerary, answers: QuizAnswers): number {
  let score = 0;

  // Duration match (in days)
  const days = parseInt(it.duration) || 3;
  if (answers.duration === 'short' && days <= 2) score += 3;
  else if (answers.duration === 'short' && days <= 3) score += 1;
  else if (answers.duration === 'medium' && days >= 2 && days <= 4) score += 3;
  else if (answers.duration === 'medium' && (days <= 1 || days === 5)) score += 1;
  else if (answers.duration === 'long' && days >= 4) score += 3;
  else if (answers.duration === 'long' && days >= 3) score += 1;

  // Difficulty match
  if (answers.difficulty === 'any') score += 2;
  else if (answers.difficulty === it.difficulty) score += 3;
  else if (answers.difficulty === 'easy' && (it.difficulty === 'easy' || it.difficulty === 'moderate')) score += 1;

  // Vibe match
  const tagsLower = it.tags.map(t => t.toLowerCase());
  const descLower = it.description.toLowerCase();
  const familyHighlightsLower = it.familyHighlights.map(h => h.toLowerCase());

  if (answers.vibe === 'beach' && (tagsLower.some(t => ['beach', 'coastal', 'phuket', 'bali', 'penang'].includes(t)) || /beach|coast|ocean/.test(descLower))) score += 3;
  if (answers.vibe === 'culture' && (tagsLower.some(t => ['culture', 'temple', 'heritage', 'history', 'kyoto', 'ayutthaya'].includes(t)) || /temple|historic|cultural|heritage/.test(descLower))) score += 3;
  if (answers.vibe === 'nature' && (tagsLower.some(t => ['nature', 'mountains', 'forest', 'lake', 'national park'].includes(t)) || /mountain|nature|scenic/.test(descLower))) score += 3;
  if (answers.vibe === 'city' && (tagsLower.some(t => ['city', 'tokyo', 'bangkok', 'singapore', 'kuala lumpur'].includes(t)) || /city|urban|metropolis/.test(descLower))) score += 3;
  if (answers.vibe === 'mix') score += 2; // All routes have mixed appeal

  // Luxury match
  if (answers.luxury === 'luxury' && it.luxuryHighlights.length >= 3) score += 3;
  else if (answers.luxury === 'luxury' && it.luxuryHighlights.length >= 1) score += 1;
  else if (answers.luxury === 'mid') score += 2;
  else if (answers.luxury === 'budget' && it.difficulty === 'easy') score += 2;

  // Kids match
  if (answers.kids === 'yes') {
    score += Math.min(it.familyHighlights.length, 5);
    if (it.familyHighlights.some(h => /kid|child|family|playground|petting|water park/.test(h.toLowerCase()))) score += 2;
    if (it.difficulty === 'easy') score += 2;
  } else if (answers.kids === 'maybe') {
    score += Math.min(it.familyHighlights.length, 3);
  } else if (answers.kids === 'no') {
    // Parents without kids still want good routes
    score += 1;
  }

  // Region match
  const countryLower = it.countries[0]?.toLowerCase() || '';
  if (answers.region === 'any') score += 2;
  else if (answers.region === 'se-asia' && ['thailand', 'malaysia', 'indonesia', 'vietnam', 'singapore', 'philippines'].includes(countryLower)) score += 3;
  else if (answers.region === 'east-asia' && ['japan', 'china', 'taiwan', 'south korea'].includes(countryLower)) score += 3;
  else if (answers.region === 'south-asia' && ['india', 'sri lanka', 'nepal', 'bangladesh'].includes(countryLower)) score += 3;

  return score;
}

export default function RouteFinderQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [results, setResults] = useState<Itinerary[]>([]);
  const [showResults, setShowResults] = useState(false);

  const allItineraries = useMemo(() => getAllItineraries(), []);

  const handleAnswer = (field: keyof QuizAnswers, value: string) => {
    const updated = { ...answers, [field]: value as QuizAnswers[keyof QuizAnswers] };
    setAnswers(updated);

    if (step < STEP_LABELS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate results
      const scored = allItineraries
        .map(it => ({ itinerary: it, score: scoreItinerary(it, updated) }))
        .sort((a, b) => b.score - a.score);

      setResults(scored.slice(0, 3).map(r => r.itinerary));
      setShowResults(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers(initialAnswers);
    setShowResults(false);
    setResults([]);
  };

  if (showResults && results.length > 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <div className="text-center mb-6">
          <span className="text-4xl mb-2 block">🎯</span>
          <h3 className="text-xl font-bold text-gray-900">Your Perfect Routes</h3>
          <p className="text-sm text-gray-500 mt-1">
            Based on your preferences, here are the top 3 EV road trips for you.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {results.map((it, i) => (
            <Link
              key={it.id}
              href={`/routes/${it.slug}`}
              className={`block rounded-xl border-2 p-4 hover:shadow-md transition-all ${
                i === 0
                  ? 'border-emerald-400 bg-emerald-50/50'
                  : 'border-gray-200 bg-white hover:border-sky-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-sky-500' : 'bg-amber-500'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{it.title.split(':')[0] || it.title}</h4>
                    <span className="text-[10px] text-gray-400">({it.duration})</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">{it.description}</p>
                  <div className="flex flex-wrap gap-2 text-[10px] text-gray-500">
                    <span>📏 {it.totalDistanceKm}km</span>
                    <span>⏱ {it.totalDrivingHours}h</span>
                    <span>🔌 {it.estimatedChargingStops} stops</span>
                    <span className={`px-1.5 py-0.5 rounded-full ${
                      it.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                      it.difficulty === 'moderate' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {it.difficulty}
                    </span>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-300 shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <RotateCcw size={14} />
            Start over
          </button>
          <Link
            href="/routes"
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors text-sm font-medium"
          >
            <MapPin size={14} />
            Browse all {allItineraries.length} routes
          </Link>
        </div>
      </div>
    );
  }

  const options: Record<string, { value: string; label: string; icon: React.ReactNode; desc: string }[]> = {
    duration: [
      { value: 'short', label: 'Quick Getaway', icon: <span>⚡</span>, desc: '1-2 days, perfect for weekends' },
      { value: 'medium', label: 'Road Trip', icon: <span>🚗</span>, desc: '2-4 days, classic road trip' },
      { value: 'long', label: 'Grand Adventure', icon: <span>🗺️</span>, desc: '4-5+ days, immersive journey' },
    ],
    difficulty: [
      { value: 'easy', label: 'Easy', icon: <span>🟢</span>, desc: 'Well-paved, frequent chargers' },
      { value: 'moderate', label: 'Moderate', icon: <span>🟡</span>, desc: 'Some challenging sections, fine with planning' },
      { value: 'any', label: 'Bring it on', icon: <span>🔴</span>, desc: 'No challenge is too big' },
    ],
    vibe: [
      { value: 'beach', label: 'Beach & Coast', icon: <span>🏖️</span>, desc: 'Sun, sand, and seaside driving' },
      { value: 'culture', label: 'Culture & History', icon: <span>🏛️</span>, desc: 'Temples, heritage, museums' },
      { value: 'nature', label: 'Nature & Scenery', icon: <span>🏔️</span>, desc: 'Mountains, forests, lakes' },
      { value: 'city', label: 'City Explorer', icon: <span>🌆</span>, desc: 'Urban attractions and nightlife' },
      { value: 'mix', label: 'Mix of everything', icon: <span>🎯</span>, desc: 'Give me it all!' },
    ],
    luxury: [
      { value: 'budget', label: 'Budget-friendly', icon: <span>💵</span>, desc: 'Keep it affordable' },
      { value: 'mid', label: 'Mid-range', icon: <span>💲</span>, desc: 'Nice hotels, good food' },
      { value: 'luxury', label: 'Luxury', icon: <span>👑</span>, desc: '5-star all the way' },
    ],
    kids: [
      { value: 'yes', label: 'Yes, kids coming', icon: <span>👨‍👩‍👧‍👦</span>, desc: 'Need kid-friendly stops' },
      { value: 'maybe', label: 'Maybe / Not sure', icon: <span>🤷</span>, desc: 'Plan for both scenarios' },
      { value: 'no', label: 'No kids', icon: <span>🧑‍🤝‍🧑</span>, desc: 'Adult adventure' },
    ],
    region: [
      { value: 'any', label: 'Anywhere in Asia', icon: <span>🌏</span>, desc: 'No preference' },
      { value: 'se-asia', label: 'Southeast Asia', icon: <span>🌴</span>, desc: 'Thailand, Malaysia, Vietnam, Indonesia' },
      { value: 'east-asia', label: 'East Asia', icon: <span>🗾</span>, desc: 'Japan, China, Korea' },
      { value: 'south-asia', label: 'South Asia', icon: <span>🕌</span>, desc: 'India, Sri Lanka' },
    ],
  };

  const currentField = Object.keys(initialAnswers)[step] as keyof QuizAnswers;
  const currentOptions = options[currentField];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-6">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex-1">
            <div className={`h-1.5 rounded-full transition-all ${
              i < step ? 'bg-emerald-400' : i === step ? 'bg-sky-500' : 'bg-gray-100'
            }`} />
          </div>
        ))}
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-6 text-[10px] text-gray-400 px-1">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className={`flex items-center gap-1 ${
            i === step ? 'text-sky-600 font-semibold' : i < step ? 'text-emerald-600' : ''
          }`}>
            {STEP_ICONS[i]}
            <span className="hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {step === 0 && 'How much time do you have?'}
          {step === 1 && 'What difficulty level?'}
          {step === 2 && 'What\'s your travel vibe?'}
          {step === 3 && 'What\'s your budget?'}
          {step === 4 && 'Are kids joining?'}
          {step === 5 && 'Which region?'}
        </h3>
        <p className="text-sm text-gray-500">Choose one option</p>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {currentOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(currentField, opt.value)}
            className="group text-left p-4 rounded-xl border-2 border-gray-100 hover:border-sky-400 hover:bg-sky-50/50 transition-all"
          >
            <div className="text-2xl mb-2">{opt.icon}</div>
            <div className="font-semibold text-gray-900 text-sm group-hover:text-sky-700 transition-colors">
              {opt.label}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
          </button>
        ))}
      </div>

      {/* Step counter */}
      <div className="text-center text-xs text-gray-400">
        Step {step + 1} of {STEP_LABELS.length}
      </div>
    </div>
  );
}
