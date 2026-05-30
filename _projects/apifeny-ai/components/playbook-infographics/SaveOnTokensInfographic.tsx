'use client';

export default function SaveOnTokensInfographic() {
  const steps = [
    { step: 1, title: 'Audit Your Spend', desc: 'Check billing & identify cost drivers' },
    { step: 2, title: 'Compress Prompts', desc: 'Remove fluff & use system prompts' },
    { step: 3, title: 'Match Model to Task', desc: 'Cheap models for simple work' },
    { step: 4, title: 'Batch Requests', desc: 'One prompt instead of ten' },
    { step: 5, title: 'Cache Responses', desc: 'Save & reuse common prompts' },
    { step: 6, title: 'Set Budget Alerts', desc: 'Daily & monthly token caps' },
  ];

  return (
    <div className="w-full flex justify-center my-8">
      <svg
        viewBox="0 0 1200 630"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-3xl rounded-2xl shadow-lg"
        style={{ fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif" }}
      >
        <defs>
          <linearGradient id="save-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
          <linearGradient id="save-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="save-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="save-emerald-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1fae5" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
          <filter id="save-shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#7c3aed" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="1200" height="630" rx="24" fill="url(#save-bg)" />

        {/* Top accent bar */}
        <rect x="0" y="0" width="1200" height="8" fill="url(#save-purple)" rx="4" />

        {/* Header */}
        <text x="600" y="62" textAnchor="middle" fontSize="34" fontWeight="800" fill="#1f2937">
          How to Save $100/mo on AI Token Costs
        </text>
        <text x="600" y="92" textAnchor="middle" fontSize="18" fontWeight="500" fill="#6b7280">
          Cut your AI spend by 60%+ without sacrificing quality
        </text>

        {/* Divider */}
        <line x1="200" y1="108" x2="1000" y2="108" stroke="#e5e7eb" strokeWidth="1" />

        {/* Badge */}
        <rect x="472" y="116" width="256" height="34" rx="17" fill="url(#save-emerald-light)" />
        <text x="600" y="138" textAnchor="middle" fontSize="14" fontWeight="600" fill="#059669">
          🎯 For solopreneurs burning cash on AI tools
        </text>

        {/* Steps */}
        {steps.map((s, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 68 + col * 382;
          const y = 180 + row * 210;
          const boxW = 355;
          const boxH = 165;
          return (
            <g key={s.step} filter="url(#save-shadow)">
              <rect x={x} y={y} width={boxW} height={boxH} rx="16" fill="white" stroke={i % 2 === 0 ? "#ddd6fe" : "#a7f3d0"} strokeWidth="1" />
              {/* Step number circle */}
              <circle cx={x + 32} cy={y + 34} r="16" fill="url(#save-purple)" />
              <text x={x + 32} y={y + 39} textAnchor="middle" fontSize="15" fontWeight="700" fill="white">{s.step}</text>
              {/* Step title */}
              <text x={x + 60} y={y + 39} fontSize="17" fontWeight="700" fill="#1f2937">
                {s.title}
              </text>
              {/* Step desc */}
              <text x={x + 22} y={y + 72} fontSize="13" fontWeight="400" fill="#6b7280">
                {s.desc}
              </text>
              {/* Arrow between steps (not the last) */}
              {i < steps.length - 1 && col < 2 && (
                <line x1={x + boxW - 5} y1={y + 34} x2={x + boxW + 22} y2={y + 34} stroke="#c4b5fd" strokeWidth="2" strokeDasharray="4,3" />
              )}
              {/* Description bullet points */}
              <text x={x + 22} y={y + 98} fontSize="12" fill="#6b7280">
                • {i === 0 ? 'Check ChatGPT/Claude billing' : i === 1 ? 'Remove redundant instructions' : i === 2 ? 'GPT-4o-mini for drafts' : i === 3 ? 'Collect 5-10 tasks per call' : i === 4 ? 'Save in Notion/DB' : 'Daily + monthly limits'}
              </text>
              <text x={x + 22} y={y + 118} fontSize="12" fill="#6b7280">
                • {i === 0 ? 'Find the top 20% cost drivers' : i === 1 ? 'Use optional tags for context' : i === 2 ? 'Reserve Opus for hard tasks' : i === 3 ? 'Share system prompts across batch' : i === 4 ? 'Hash-based lookup' : 'Alerts at 50% / 80% / 100%'}
              </text>
              {/* Tip label */}
              <rect x={x + 15} y={y + 130} width={boxW - 30} height="22" rx="6" fill={i % 2 === 0 ? "#ede9fe" : "#d1fae5"} />
              <text x={x + 24} y={y + 145} fontSize="11" fontWeight="600" fill={i % 2 === 0 ? "#6d28d9" : "#047857"}>
                💡 {i === 0 ? 'Export data; ask AI to analyze' : i === 1 ? 'Wrap optional context in <optional>' : i === 2 ? 'Try OpenRouter fallback chains' : i === 3 ? 'One prompt = 10 summaries' : i === 4 ? 'Similar prompts? Reuse results' : 'Review weekly, optimize biggest spenders'}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <rect x="0" y="602" width="1200" height="28" fill="url(#save-purple)" opacity="0.05" />
        <text x="600" y="620" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9ca3af">
          apifeny.ai/playbooks/how-to-save-on-ai-tokens
        </text>
      </svg>
    </div>
  );
}
