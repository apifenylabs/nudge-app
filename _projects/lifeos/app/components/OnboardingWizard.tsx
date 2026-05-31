'use client';

import { useState, useCallback } from 'react';

// ─── Plugin categories shown in the wizard ─────────────────────────

const CATEGORIES = [
  {
    id: 'travel',
    emoji: '✈️',
    name: 'Travel',
    description: 'Plan trips, build itineraries, discover destinations',
  },
  {
    id: 'finance',
    emoji: '💰',
    name: 'Finance',
    description: 'Budget, invest, save, plan big purchases',
  },
  {
    id: 'health',
    emoji: '💪',
    name: 'Health',
    description: 'Diet, sleep, fitness, mental health',
  },
  {
    id: 'career',
    emoji: '💼',
    name: 'Career',
    description: 'Job strategy, skills, networking, promotions',
  },
  {
    id: 'learning',
    emoji: '📚',
    name: 'Learning',
    description: 'Courses, skills, reading, certifications',
  },
  {
    id: 'family',
    emoji: '❤️',
    name: 'Family',
    description: 'Family events, care plans, shared goals',
  },
  {
    id: 'home',
    emoji: '🏠',
    name: 'Home',
    description: 'Home improvement, maintenance, organization',
  },
  {
    id: 'social',
    emoji: '🎉',
    name: 'Social',
    description: 'Social calendar, friendships, events',
  },
  {
    id: 'relationships',
    emoji: '💑',
    name: 'Relationships',
    description: 'Partner, communication, quality time',
  },
];

type Props = {
  onComplete: (selected: string[]) => void;
  onSkip: () => void;
};

export default function OnboardingWizard({ onComplete, onSkip }: Props) {
  const [step, setStep] = useState<'welcome' | 'select' | 'done'>('welcome');
  const [selected, setSelected] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const toggleCategory = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id],
    );
  };

  const finish = useCallback((selections: string[]) => {
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem('lifeos_onboarding_done', 'true');
      if (selections.length > 0) {
        localStorage.setItem('lifeos_onboarding_categories', JSON.stringify(selections));
      }
      setVisible(false);
      onComplete(selections);
    }, 400);
  }, [onComplete]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem('lifeos_onboarding_done', 'true');
      setVisible(false);
      onSkip();
    }, 400);
  };

  const handleDone = () => {
    finish(selected);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-400 ${
        exiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity duration-400 ${
          exiting ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleSkip}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg mx-4 bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-400 ${
          exiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {step === 'welcome' && (
          <div className="p-8">
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Welcome to LifeOS
            </h2>
            <p className="text-sm text-gray-400 text-center mb-8 max-w-sm mx-auto leading-relaxed">
              Your AI copilot for every area of life. I don&apos;t wait for you to tell me
              what to do — I ask, challenge, and guide.
            </p>

            {/* What would you like help with */}
            <button
              onClick={() => setStep('select')}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20"
            >
              Get started
            </button>

            <button
              onClick={handleSkip}
              className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip for now
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <div className="w-2 h-2 rounded-full bg-gray-700" />
            </div>
          </div>
        )}

        {step === 'select' && (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setStep('welcome')}
                className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-bold text-white">
                  What matters to you?
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pick the areas you want LifeOS to help with
                </p>
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 max-h-[360px] overflow-y-auto pr-1">
              {CATEGORIES.map(cat => {
                const isSelected = selected.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                        : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800'
                    }`}
                  >
                    {/* Checkmark overlay */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    <div className="text-2xl mb-1.5">{cat.emoji}</div>
                    <div className={`text-sm font-semibold mb-0.5 ${
                      isSelected ? 'text-cyan-300' : 'text-gray-200'
                    }`}>
                      {cat.name}
                    </div>
                    <div className="text-[10px] text-gray-500 leading-relaxed">
                      {cat.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <button
              onClick={handleDone}
              disabled={selected.length === 0}
              className={`w-full py-3 rounded-xl font-medium transition-all text-sm ${
                selected.length > 0
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selected.length > 0
                ? `Continue with ${selected.length} area${selected.length > 1 ? 's' : ''}`
                : 'Select at least one area'}
            </button>

            <button
              onClick={handleSkip}
              className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip for now
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              <div className="w-2 h-2 rounded-full bg-gray-700" />
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
