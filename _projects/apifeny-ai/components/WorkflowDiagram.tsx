'use client';

import { useState } from 'react';

type Step = {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: string;
};

const steps: Step[] = [
  {
    id: 'problem',
    label: 'You Have a Problem',
    icon: '🤔',
    description: 'Stuck on content, code, marketing, data, finance, or automation? Start here.',
    color: '#6366f1', // violet
  },
  {
    id: 'playbook',
    label: 'Find Your Playbook',
    icon: '📖',
    description: '105+ step-by-step AI playbooks. Each one solves a real problem. Filter by category or search.',
    color: '#06b6d4', // cyan
  },
  {
    id: 'tools',
    label: 'Pick Your Tools',
    icon: '🛠️',
    description: '60+ curated AI tools ranked by use case. Asia-ready filters, local pricing, multi-language support.',
    color: '#10b981', // emerald
  },
  {
    id: 'ship',
    label: 'Ship Results',
    icon: '🚀',
    description: 'Copy-paste prompts, follow the workflow, get real output. No fluff, just results.',
    color: '#f59e0b', // amber
  },
];

const arrows = [
  { from: 'problem', to: 'playbook' },
  { from: 'playbook', to: 'tools' },
  { from: 'tools', to: 'ship' },
];

export default function WorkflowDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Desktop: horizontal flow */}
      <div className="hidden md:flex items-center justify-center gap-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            {/* Step card */}
            <div
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              className="relative group cursor-pointer"
            >
              <svg width="200" height="200" className="drop-shadow-sm" role="img" aria-label={`${step.label}: ${step.description}`}>
                {/* Hexagon shape */}
                <defs>
                  <linearGradient id={`grad-${step.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={step.color} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={step.color} stopOpacity="0.05" />
                  </linearGradient>
                  <filter id={`glow-${step.id}`}>
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Outer hex */}
                <polygon
                  points="100,10 180,55 180,145 100,190 20,145 20,55"
                  fill={`url(#grad-${step.id})`}
                  stroke={activeStep === step.id ? step.color : '#e5e7eb'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={activeStep === step.id ? { filter: `drop-shadow(0 0 8px ${step.color}33)` } : {}}
                />
                {/* Icon */}
                <text x="100" y="70" textAnchor="middle" fontSize="28" className="select-none">
                  {step.icon}
                </text>
                {/* Label */}
                <text
                  x="100"
                  y="115"
                  textAnchor="middle"
                  fill={activeStep === step.id ? step.color : '#374151'}
                  fontSize="11"
                  fontWeight="600"
                  className="transition-colors duration-300 select-none"
                >
                  {step.label}
                </text>
                {/* Sub-label */}
                <text
                  x="100"
                  y="140"
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="9"
                  className="select-none"
                >
                  Step {i + 1}
                </text>
              </svg>
            </div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <svg width="80" height="60" className="-mx-4" role="img" aria-label={`Arrow from ${step.label} to ${steps[i + 1]?.label}`}>
                <line
                  x1="0"
                  y1="30"
                  x2="75"
                  y2="30"
                  stroke={activeStep === step.id || activeStep === steps[i + 1]?.id ? step.color : '#d1d5db'}
                  strokeWidth="2"
                  strokeDasharray="6 3"
                  className="transition-colors duration-300"
                />
                <polygon
                  points="75,25 85,30 75,35"
                  fill={activeStep === step.id || activeStep === steps[i + 1]?.id ? step.color : '#d1d5db'}
                  className="transition-colors duration-300"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical accordion */}
      <div className="md:hidden space-y-3">
        {steps.map((step, i) => (
          <div key={step.id} className="relative">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-px bg-gray-200" />
            )}

            <div
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              className="relative pl-14 cursor-pointer"
            >
              {/* Circle */}
              <div
                className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300"
                style={{
                  borderColor: activeStep === step.id ? step.color : '#e5e7eb',
                  backgroundColor: activeStep === step.id ? `${step.color}15` : '#f9fafb',
                }}
              >
                {step.icon}
              </div>

              <div className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition">
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-semibold transition-colors duration-300"
                    style={{ color: activeStep === step.id ? step.color : '#111827' }}
                  >
                    {step.label}
                  </span>
                  <span
                    className="text-[10px] font-mono text-gray-400 px-2 py-0.5 rounded-full bg-gray-100"
                  >
                    {i + 1}/{steps.length}
                  </span>
                </div>
                {activeStep === step.id && (
                  <p className="text-xs text-gray-500 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active description (desktop) */}
      <div className="hidden md:block mt-6 text-center min-h-[48px]">
        {activeStep ? (
          <p className="text-sm text-gray-500 animate-in fade-in slide-in-from-top-1 duration-200">
            {steps.find((s) => s.id === activeStep)?.description}
          </p>
        ) : (
          <p className="text-sm text-gray-400">Hover over each step to learn more</p>
        )}
      </div>

      {/* Bottom label */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          PROBLEM → PLAYBOOK → TOOLS → RESULTS
        </span>
      </div>
    </div>
  );
}
