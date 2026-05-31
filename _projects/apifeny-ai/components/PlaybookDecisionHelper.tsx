'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playbooks } from '@/lib/playbooks';

interface Option {
  id: string;
  label: string;
  emoji: string;
  matchStage?: string;
  matchKeywords?: string[];
}

const QUESTIONS = [
  {
    key: 'goal',
    question: 'What do you want to achieve?',
    options: [
      { id: 'create', label: 'Create content & marketing', emoji: '✍️', matchKeywords: ['content', 'marketing'] },
      { id: 'build', label: 'Build a product or app', emoji: '⚡', matchKeywords: ['build', 'coding', 'deployment', 'testing'] },
      { id: 'automate', label: 'Automate my workflow', emoji: '🤖', matchKeywords: ['coding', 'deployment', 'ideation'] },
      { id: 'decide', label: 'Research & make better decisions', emoji: '🧠', matchKeywords: ['research', 'planning', 'ideation'] },
      { id: 'learn', label: 'Just starting — learn AI basics', emoji: '🎓', matchKeywords: ['planning', 'content', 'ideation'] },
    ],
  },
  {
    key: 'skill',
    question: 'Your comfort level?',
    options: [
      { id: 'beginner', label: 'Total beginner', emoji: '🌱', matchKeywords: [] },
      { id: 'intermediate', label: 'Some experience with AI tools', emoji: '🌿', matchKeywords: [] },
      { id: 'advanced', label: 'Already use AI daily', emoji: '🌳', matchKeywords: [] },
    ],
  },
];

const PAID_PLAYBOOKS = ['ai-solopreneur-toolkit', 'directory-builder-template', 'ai-workflow-automation'];

export default function PlaybookDecisionHelper() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<typeof playbooks>([]);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const handleSelect = (option: Option) => {
    const updated = { ...answers, [current.key]: option.id };
    setAnswers(updated);

    if (!isLast) {
      setStep(step + 1);
    } else {
      // Compute recommendations
      const goalKey = updated.goal || '';
      const goalQuestion = QUESTIONS[0];
      const chosenOption = goalQuestion.options.find(o => o.id === goalKey);
      const stageFilter = chosenOption?.matchKeywords || [];
      const skillLevel: string = updated.skill || 'beginner';

      // Score each playbook
      const scored = playbooks
        .map(pb => {
          let score = 0;

          // Match by pipeline stage
          if (pb.pipeline_stage && stageFilter.includes(pb.pipeline_stage)) {
            score += 3;
          }

          // Match by title/description keywords
          const searchText = `${pb.title} ${pb.description}`.toLowerCase();
          stageFilter.forEach(kw => {
            if (searchText.includes(kw.toLowerCase())) score += 1;
          });

          // Difficulty match
          if (skillLevel === 'beginner' && pb.difficulty === 'Beginner') score += 2;
          if (skillLevel === 'intermediate' && pb.difficulty === 'Intermediate') score += 2;
          if (skillLevel === 'advanced' && pb.difficulty === 'Advanced') score += 2;
          // If advanced, intermediate also ok
          if (skillLevel === 'advanced' && pb.difficulty === 'Intermediate') score += 1;

          return { ...pb, score };
        })
        .filter(pb => pb.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

      setRecommendations(scored);
      setStep(QUESTIONS.length); // show results
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setRecommendations([]);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm mb-10">
      {/* Quiz header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-500" />
          Where should I start?
        </h3>
        {step > 0 && (
          <button
            onClick={reset}
            className="text-[10px] text-gray-400 hover:text-gray-600 underline transition"
          >
            Start over
          </button>
        )}
      </div>

      {/* Step indicator */}
      {step < QUESTIONS.length && (
        <div className="flex gap-1 mb-5">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i === step ? 'bg-violet-500' : i < step ? 'bg-violet-200' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>
      )}

      {/* Question step */}
      {step < QUESTIONS.length && (
        <div className="animate-in slide-in-from-right-4 duration-200">
          <p className="text-xs text-gray-500 mb-3">{current.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {current.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left
                  ${answers[current.key] === option.id
                    ? 'border-violet-300 bg-violet-50 ring-1 ring-violet-200'
                    : 'border-gray-100 hover:border-violet-200 hover:bg-violet-50/30'
                  }`}
              >
                <span className="text-lg shrink-0">{option.emoji}</span>
                <span className="text-xs font-medium text-gray-900">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results view */}
      {step >= QUESTIONS.length && recommendations.length > 0 && (
        <div className="animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <p className="text-xs font-semibold text-gray-900">
              Your top {recommendations.length} playbooks
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recommendations.map(pb => (
              <Link
                key={pb.slug}
                href={PAID_PLAYBOOKS.includes(pb.slug) ? `/playbooks/${pb.slug}` : `/playbook/${pb.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50/30 transition-all group"
              >
                <span className="text-lg shrink-0">{pb.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 group-hover:text-violet-700 transition-colors truncate">
                    {pb.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] px-1 py-0.5 rounded font-medium
                      ${pb.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' : ''}
                      ${pb.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' : ''}
                      ${pb.difficulty === 'Advanced' ? 'bg-violet-100 text-violet-700' : ''}
                    `}>
                      {pb.difficulty}
                    </span>
                    <span className="text-[9px] text-gray-400">{pb.read_time_minutes} min</span>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-violet-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
          <button
            onClick={reset}
            className="mt-4 text-[11px] text-violet-600 hover:text-violet-700 font-medium transition"
          >
            ← Try different answers
          </button>
        </div>
      )}
    </div>
  );
}
