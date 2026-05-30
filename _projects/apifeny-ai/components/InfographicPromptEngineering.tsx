'use client';

interface InfographicProps {
  width?: number;
  height?: number;
}

export default function InfographicPromptEngineering({ width = 1200, height = 630 }: InfographicProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: width, fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <defs>
        <linearGradient id="bg-prompt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f5f3ff" />
          <stop offset="100%" stopColor="#ede9fe" />
        </linearGradient>
        <linearGradient id="accent-prompt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="stat-indigo" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="technique-bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eef2ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="technique-bg-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f3ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter id="shadow-prompt">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.08" />
        </filter>
        <filter id="shadow-card-prompt">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.04" />
        </filter>
      </defs>

      {/* Background */}
      <rect width={width} height={height} rx="20" fill="url(#bg-prompt)" />

      {/* Decorative */}
      <circle cx="1080" cy="70" r="130" fill="#6366f1" opacity="0.03" />
      <circle cx="100" cy="540" r="100" fill="#8b5cf6" opacity="0.03" />
      <rect x="400" y="300" width="400" height="400" rx="200" fill="#c7d2fe" opacity="0.02" transform="rotate(-30 600 500)" />

      {/* Top accent bar */}
      <rect x="0" y="0" width={width} height="6" fill="url(#accent-prompt)" rx="3" />

      {/* Header */}
      <text x="600" y="72" textAnchor="middle" fontSize="32" fontWeight="800" fill="#3730a3">The Ultimate Prompt Engineering Playbook</text>
      <text x="600" y="104" textAnchor="middle" fontSize="17" fill="#6366f1" fontWeight="500">System prompts · Chain-of-thought · Few-shot · Role prompting · Output formatting</text>

      {/* Hero Stat */}
      <rect x="80" y="128" width="1040" height="68" rx="12" fill="url(#stat-indigo)" filter="url(#shadow-prompt)" />
      <text x="600" y="164" textAnchor="middle" fontSize="24" fontWeight="700" fill="#ffffff">70% better outputs with structured prompting — 5x fewer revisions</text>
      <text x="600" y="188" textAnchor="middle" fontSize="15" fill="#c7d2fe">Master in 2 weeks · Works with ChatGPT, Claude & Gemini</text>

      {/* 5 Techniques — Left Column */}
      {/* Technique 1: System Prompts */}
      <rect x="40" y="218" width="545" height="150" rx="14" fill="white" filter="url(#shadow-card-prompt)" />
      <rect x="60" y="234" width="32" height="32" rx="10" fill="#6366f1" />
      <text x="76" y="255" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">1</text>
      <text x="106" y="254" fontSize="16" fontWeight="700" fill="#3730a3">System Prompts</text>
      <text x="106" y="278" fontSize="11" fill="#6b7280">The single highest-leverage technique. Define role, tone,</text>
      <text x="106" y="296" fontSize="11" fill="#6b7280">behavior, guardrails, and output format upfront.</text>
      <rect x="60" y="312" width="500" height="20" rx="6" fill="#eef2ff" />
      <text x="72" y="326" fontSize="10" fill="#4f46e5" fontFamily="monospace">"You are a [ROLE]. You speak [TONE]. You always [BEHAVIOR]. You never [GUARDRAIL]."</text>

      {/* Technique 2: Chain-of-Thought */}
      <rect x="40" y="384" width="545" height="150" rx="14" fill="white" filter="url(#shadow-card-prompt)" />
      <rect x="60" y="400" width="32" height="32" rx="10" fill="#6366f1" />
      <text x="76" y="421" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">2</text>
      <text x="106" y="420" fontSize="16" fontWeight="700" fill="#3730a3">Chain-of-Thought Reasoning</text>
      <text x="106" y="444" fontSize="11" fill="#6b7280">Ask the model to "think step by step" before answering.</text>
      <text x="106" y="462" fontSize="11" fill="#6b7280">Boosts accuracy from 50% → 90%+ on complex tasks.</text>
      <rect x="60" y="478" width="500" height="20" rx="6" fill="#eef2ff" />
      <text x="72" y="492" fontSize="10" fill="#4f46e5" fontFamily="monospace">"First, list what you know. Second, identify constraints. Third, work through each option."</text>

      {/* Technique 3: Few-Shot */}
      <rect x="615" y="218" width="545" height="150" rx="14" fill="white" filter="url(#shadow-card-prompt)" />
      <rect x="635" y="234" width="32" height="32" rx="10" fill="#6366f1" />
      <text x="651" y="255" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">3</text>
      <text x="681" y="254" fontSize="16" fontWeight="700" fill="#3730a3">Few-Shot Prompting</text>
      <text x="681" y="278" fontSize="11" fill="#6b7280">Give 2-3 input→output examples before asking.</text>
      <text x="681" y="296" fontSize="11" fill="#6b7280">Most reliable way to control format, style & quality.</text>
      <rect x="635" y="312" width="500" height="20" rx="6" fill="#f5f3ff" />
      <text x="647" y="326" fontSize="10" fill="#7c3aed" fontFamily="monospace">Input → Output | Input → Output | Input → [YOUR TASK]</text>

      {/* Technique 4: Role Prompting */}
      <rect x="615" y="384" width="545" height="150" rx="14" fill="white" filter="url(#shadow-card-prompt)" />
      <rect x="635" y="400" width="32" height="32" rx="10" fill="#6366f1" />
      <text x="651" y="421" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">4</text>
      <text x="681" y="420" fontSize="16" fontWeight="700" fill="#3730a3">Role Prompting</text>
      <text x="681" y="444" fontSize="11" fill="#6b7280">Assign specific roles to shape depth and perspective.</text>
      <text x="681" y="462" fontSize="11" fill="#6b7280">"Senior engineer" vs "Socratic tutor" → different outputs.</text>
      <rect x="635" y="478" width="500" height="20" rx="6" fill="#f5f3ff" />
      <text x="647" y="492" fontSize="10" fill="#7c3aed" fontFamily="monospace">"You are a skeptical VC reviewing this pitch. Challenge every assumption."</text>

      {/* Technique 5: Output Formatting */}
      <rect x="40" y="550" width="1120" height="48" rx="14" fill="white" filter="url(#shadow-card-prompt)" />
      <rect x="60" y="560" width="32" height="28" rx="8" fill="#6366f1" />
      <text x="76" y="579" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">5</text>
      <text x="106" y="578" fontSize="14" fontWeight="700" fill="#3730a3">Structured Output Formatting</text>
      <text x="260" y="578" fontSize="12" fill="#6b7280">Specify JSON, markdown, XML, or table format. Provide a template.</text>
      <text x="260" y="595" fontSize="11" fill="#9ca3af">Ex: "Output as JSON with keys: title, summary, steps[], risks[]"</text>

      {/* Brand */}
      <text x="600" y="622" textAnchor="middle" fontSize="12" fontWeight="600" fill="#6366f1">apifeny.ai</text>
    </svg>
  );
}
