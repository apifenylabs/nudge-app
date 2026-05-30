'use client';

interface InfographicProps {
  width?: number;
  height?: number;
}

export default function InfographicSaveTokens({ width = 1200, height = 630 }: InfographicProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: width, fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <defs>
        <linearGradient id="bg-tokens" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>
        <linearGradient id="accent-tokens" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="metric-tokens" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
        <filter id="shadow-tokens">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#10b981" floodOpacity="0.08" />
        </filter>
        <filter id="shadow-card">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.04" />
        </filter>
      </defs>

      {/* Background */}
      <rect width={width} height={height} rx="20" fill="url(#bg-tokens)" />

      {/* Subtle decorative circles */}
      <circle cx="1100" cy="100" r="160" fill="#10b981" opacity="0.03" />
      <circle cx="100" cy="530" r="120" fill="#0d9488" opacity="0.03" />
      <circle cx="600" cy="315" r="200" fill="#a7f3d0" opacity="0.02" />

      {/* Top accent bar */}
      <rect x="0" y="0" width={width} height="6" fill="url(#accent-tokens)" rx="3" />

      {/* Header */}
      <text x="600" y="72" textAnchor="middle" fontSize="32" fontWeight="800" fill="#065f46">Save $100/mo on AI Tokens</text>
      <text x="600" y="104" textAnchor="middle" fontSize="18" fill="#6b7280" fontWeight="500">Prompt compression · Model switching · Caching strategies</text>

      {/* Key Stat — Hero */}
      <rect x="80" y="130" width="1040" height="72" rx="12" fill="#059669" filter="url(#shadow-tokens)" />
      <text x="600" y="170" textAnchor="middle" fontSize="28" fontWeight="700" fill="#ffffff">Cut your AI spend by 65% without sacrificing output quality</text>
      <text x="600" y="195" textAnchor="middle" fontSize="16" fill="#d1fae5">$160/mo → $55/mo  ·  2 hours setup  ·  Passive savings from week 2</text>

      {/* 4-Step Strategy Cards */}
      {/* Step 1 */}
      <rect x="80" y="228" width="240" height="160" rx="14" fill="white" filter="url(#shadow-card)" />
      <circle cx="110" cy="260" r="18" fill="#d1fae5" />
      <text x="110" y="266" textAnchor="middle" fontSize="16" fontWeight="700" fill="#059669">1</text>
      <text x="80" y="294" fontSize="15" fontWeight="700" fill="#065f46">Audit Your Spend</text>
      <text x="80" y="316" fontSize="12" fill="#6b7280">Check billing, categorize</text>
      <text x="80" y="336" fontSize="12" fill="#6b7280">usage, target the top 20%</text>
      <text x="80" y="356" fontSize="12" fill="#6b7280">that drives 80% of cost.</text>
      <text x="80" y="380" fontSize="11" fontWeight="600" fill="#059669">💰 Save: 10-20%</text>

      {/* Step 2 */}
      <rect x="340" y="228" width="240" height="160" rx="14" fill="white" filter="url(#shadow-card)" />
      <circle cx="370" cy="260" r="18" fill="#d1fae5" />
      <text x="370" y="266" textAnchor="middle" fontSize="16" fontWeight="700" fill="#059669">2</text>
      <text x="340" y="294" fontSize="15" fontWeight="700" fill="#065f46">Compress Prompts</text>
      <text x="340" y="316" fontSize="12" fill="#6b7280">Remove redundancies, use</text>
      <text x="340" y="336" fontSize="12" fill="#6b7280">&lt;optional&gt; tags, set word</text>
      <text x="340" y="356" fontSize="12" fill="#6b7280">limits. 60% shorter.</text>
      <text x="340" y="380" fontSize="11" fontWeight="600" fill="#059669">✂️ Save: 30-50%</text>

      {/* Step 3 */}
      <rect x="600" y="228" width="240" height="160" rx="14" fill="white" filter="url(#shadow-card)" />
      <circle cx="630" cy="260" r="18" fill="#d1fae5" />
      <text x="630" y="266" textAnchor="middle" fontSize="16" fontWeight="700" fill="#059669">3</text>
      <text x="600" y="294" fontSize="15" fontWeight="700" fill="#065f46">Switch Models Smartly</text>
      <text x="600" y="316" fontSize="12" fill="#6b7280">GPT-4o-mini for drafts,</text>
      <text x="600" y="336" fontSize="12" fill="#6b7280">Sonnet for medium, Opus</text>
      <text x="600" y="356" fontSize="12" fill="#6b7280">for hard tasks only.</text>
      <text x="600" y="380" fontSize="11" fontWeight="600" fill="#059669">🔄 Save: 60-80%</text>

      {/* Step 4 */}
      <rect x="860" y="228" width="240" height="160" rx="14" fill="white" filter="url(#shadow-card)" />
      <circle cx="890" cy="260" r="18" fill="#d1fae5" />
      <text x="890" y="266" textAnchor="middle" fontSize="16" fontWeight="700" fill="#059669">4</text>
      <text x="860" y="294" fontSize="15" fontWeight="700" fill="#065f46">Cache & Batch</text>
      <text x="860" y="316" fontSize="12" fill="#6b7280">Save frequent responses,</text>
      <text x="860" y="336" fontSize="12" fill="#6b7280">batch 10 tasks into one</text>
      <text x="860" y="356" fontSize="12" fill="#6b7280">prompt, clear history.</text>
      <text x="860" y="380" fontSize="11" fontWeight="600" fill="#059669">⚡ Save: 20-40%</text>

      {/* Bottom: Pro Tips */}
      <rect x="80" y="412" width="680" height="92" rx="14" fill="white" filter="url(#shadow-card)" />
      <text x="100" y="436" fontSize="13" fontWeight="700" fill="#065f46">🔥 Pro Tips</text>
      <text x="100" y="458" fontSize="12" fill="#4b5563">✓ OpenRouter: same models, 2-3x cheaper on different providers</text>
      <text x="100" y="478" fontSize="12" fill="#4b5563">✓ Set max_tokens=500-1000 for most tasks (default is 4096)</text>
      <text x="100" y="498" fontSize="12" fill="#4b5563">✓ Reusable system prompts work across models — switch freely</text>

      {/* Tools used */}
      <rect x="780" y="412" width="340" height="92" rx="14" fill="white" filter="url(#shadow-card)" />
      <text x="800" y="436" fontSize="13" fontWeight="700" fill="#065f46">🧰 Tools</text>
      <rect x="800" y="448" width="72" height="24" rx="6" fill="#d1fae5" />
      <text x="836" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">ChatGPT</text>
      <rect x="878" y="448" width="62" height="24" rx="6" fill="#dbeafe" />
      <text x="909" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">Claude</text>
      <rect x="946" y="448" width="64" height="24" rx="6" fill="#fce7f3" />
      <text x="978" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="#db2777">Gemini</text>
      <rect x="800" y="478" width="82" height="24" rx="6" fill="#ede9fe" />
      <text x="841" y="495" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">OpenRouter</text>

      {/* Footer */}
      <text x="600" y="595" textAnchor="middle" fontSize="13" fontWeight="600" fill="#059669">apifeny.ai</text>
      <text x="600" y="615" textAnchor="middle" fontSize="11" fill="#9ca3af">Full step-by-step guide · Free templates · Real user results</text>
    </svg>
  );
}
