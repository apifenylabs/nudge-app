'use client';

export default function PromptEngineeringInfographic() {
  const steps = [
    { step: 1, title: 'System Prompts', desc: 'Define persona & constraints upfront' },
    { step: 2, title: 'Chain-of-Thought', desc: 'Step-by-step reasoning for accuracy' },
    { step: 3, title: 'Few-Shot Examples', desc: 'Show 2-3 examples before asking' },
    { step: 4, title: 'Role Prompting', desc: 'Assign role + expertise level' },
    { step: 5, title: 'Structured Output', desc: 'JSON, markdown, XML templates' },
    { step: 6, title: 'Iterate & Refine', desc: 'Plan for 3-5 iterations per prompt' },
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
          <linearGradient id="prompt-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="50%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fdf4ff" />
          </linearGradient>
          <linearGradient id="prompt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="prompt-indigo-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#c7d2fe" />
          </linearGradient>
          <linearGradient id="prompt-violet-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ede9fe" />
            <stop offset="100%" stopColor="#ddd6fe" />
          </linearGradient>
          <filter id="prompt-shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6366f1" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="1200" height="630" rx="24" fill="url(#prompt-bg)" />

        {/* Top accent */}
        <rect x="0" y="0" width="1200" height="8" fill="url(#prompt-gradient)" rx="4" />

        {/* Header */}
        <text x="600" y="62" textAnchor="middle" fontSize="34" fontWeight="800" fill="#1f2937">
          The Ultimate Prompt Engineering Playbook
        </text>
        <text x="600" y="92" textAnchor="middle" fontSize="18" fontWeight="500" fill="#6b7280">
          Master system prompts, CoT, few-shot & output formatting
        </text>

        <line x1="180" y1="108" x2="1020" y2="108" stroke="#e5e7eb" strokeWidth="1" />

        {/* Badge */}
        <rect x="432" y="116" width="336" height="34" rx="17" fill="url(#prompt-indigo-light)" />
        <text x="600" y="138" textAnchor="middle" fontSize="14" fontWeight="600" fill="#4338ca">
          ✨ For anyone who uses ChatGPT/Claude daily
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
            <g key={s.step} filter="url(#prompt-shadow)">
              <rect x={x} y={y} width={boxW} height={boxH} rx="16" fill="white" stroke={i % 2 === 0 ? "#ddd6fe" : "#c7d2fe"} strokeWidth="1" />
              <circle cx={x + 32} cy={y + 34} r="16" fill="url(#prompt-gradient)" />
              <text x={x + 32} y={y + 39} textAnchor="middle" fontSize="15" fontWeight="700" fill="white">{s.step}</text>
              <text x={x + 60} y={y + 39} fontSize="17" fontWeight="700" fill="#1f2937">
                {s.title}
              </text>
              <text x={x + 22} y={y + 72} fontSize="13" fontWeight="400" fill="#6b7280">
                {s.desc}
              </text>
              {i < steps.length - 1 && col < 2 && (
                <line x1={x + boxW - 5} y1={y + 34} x2={x + boxW + 22} y2={y + 34} stroke="#a5b4fc" strokeWidth="2" strokeDasharray="4,3" />
              )}
              <text x={x + 22} y={y + 98} fontSize="12" fill="#6b7280">
                • {i === 0 ? 'Set: role, tone, behavior, format' : i === 1 ? 'Boost accuracy 50% to 90%+' : i === 2 ? '3 examples = sweet spot' : i === 3 ? 'Add expertise level to role' : i === 4 ? 'JSON for data, markdown for docs' : 'Small refinements compound'}
              </text>
              <text x={x + 22} y={y + 118} fontSize="12" fill="#6b7280">
                • {i === 0 ? 'Add guardrails & unsure responses' : i === 1 ? 'Provide reasoning template' : i === 2 ? 'Include 1 edge-case example' : i === 3 ? '"VC reviewer" vs "Socratic tutor"' : i === 4 ? 'Provide template in the prompt' : 'Create a Prompt Library in Notion'}
              </text>
              <rect x={x + 15} y={y + 130} width={boxW - 30} height="22" rx="6" fill={i % 2 === 0 ? "#ede9fe" : "#e0e7ff"} />
              <text x={x + 24} y={y + 145} fontSize="11" fontWeight="600" fill={i % 2 === 0 ? "#6d28d9" : "#4338ca"}>
                💡 {i === 0 ? 'Formula: "You are a ROLE. You speak TONE..."' : i === 1 ? 'Add quality self-check at prompt end' : i === 2 ? 'Test with cheap model first' : i === 3 ? 'Combine role + constraints for best result' : i === 4 ? 'Claude works best with XML tags' : 'Each iteration builds on the last'}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <rect x="0" y="602" width="1200" height="28" fill="url(#prompt-gradient)" opacity="0.05" />
        <text x="600" y="620" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9ca3af">
          apifeny.ai/playbooks/ultimate-prompt-engineering
        </text>
      </svg>
    </div>
  );
}
