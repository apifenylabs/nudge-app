'use client';

export default function BuildGameInfographic() {
  const steps = [
    { step: 1, title: 'Set Up & Pick Your Game', desc: 'Download Cursor, pick Snake/Pong' },
    { step: 2, title: 'Describe Vision to Claude', desc: 'Get a game design doc' },
    { step: 3, title: 'Build Core Loop with Cursor', desc: 'Agent mode scaffolds the game' },
    { step: 4, title: 'Add Polish & Juice', desc: 'Particles, animations, sounds' },
    { step: 5, title: 'Difficulty & Leaderboard', desc: 'Scaling, high scores, menus' },
    { step: 6, title: 'Deploy & Share', desc: 'Vercel/Netlify in 2 minutes' },
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
          <linearGradient id="game-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf4ff" />
            <stop offset="100%" stopColor="#f5f3ff" />
          </linearGradient>
          <linearGradient id="game-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="30%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="game-pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf2f8" />
            <stop offset="100%" stopColor="#fce7f3" />
          </linearGradient>
          <filter id="game-shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#a855f7" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="1200" height="630" rx="24" fill="url(#game-bg)" />

        {/* Top accent */}
        <rect x="0" y="0" width="1200" height="8" fill="url(#game-gradient)" rx="4" />

        {/* Header */}
        <text x="600" y="62" textAnchor="middle" fontSize="34" fontWeight="800" fill="#1f2937">
          Build a Game with AI in One Weekend
        </text>
        <text x="600" y="92" textAnchor="middle" fontSize="18" fontWeight="500" fill="#6b7280">
          From zero coding experience to a playable game in 48 hours
        </text>

        <line x1="180" y1="108" x2="1020" y2="108" stroke="#e5e7eb" strokeWidth="1" />

        {/* Badge */}
        <rect x="442" y="116" width="316" height="34" rx="17" fill="url(#game-pink)" />
        <text x="600" y="138" textAnchor="middle" fontSize="14" fontWeight="600" fill="#be185d">
          🎮 Perfect for creatives who want to ship software
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
            <g key={s.step} filter="url(#game-shadow)">
              <rect x={x} y={y} width={boxW} height={boxH} rx="16" fill="white" stroke={i % 2 === 0 ? "#e9d5ff" : "#c4b5fd"} strokeWidth="1" />
              <circle cx={x + 32} cy={y + 34} r="16" fill="url(#game-gradient)" />
              <text x={x + 32} y={y + 39} textAnchor="middle" fontSize="15" fontWeight="700" fill="white">{s.step}</text>
              <text x={x + 60} y={y + 39} fontSize="17" fontWeight="700" fill="#1f2937">
                {s.title}
              </text>
              <text x={x + 22} y={y + 72} fontSize="13" fontWeight="400" fill="#6b7280">
                {s.desc}
              </text>
              {i < steps.length - 1 && col < 2 && (
                <line x1={x + boxW - 5} y1={y + 34} x2={x + boxW + 22} y2={y + 34} stroke="#c4b5fd" strokeWidth="2" strokeDasharray="4,3" />
              )}
              <text x={x + 22} y={y + 98} fontSize="12" fill="#6b7280">
                • {i === 0 ? 'Cursor free tier is enough' : i === 1 ? 'Claude refines your spec' : i === 2 ? 'Canvas, collision, scoring' : i === 3 ? 'Web Audio API for sounds' : i === 4 ? 'localStorage highscores' : 'Prefer Vercel, it\'s free'}
              </text>
              <text x={x + 22} y={y + 118} fontSize="12" fill="#6b7280">
                • {i === 0 ? 'Choose Snake or Pong first' : i === 1 ? '1-page GDD — catch gaps early' : i === 2 ? 'Review code, then run' : i === 3 ? 'Screen shake + transitions' : i === 4 ? 'Speed ramps as food eaten' : 'Share on X / Product Hunt'}
              </text>
              <rect x={x + 15} y={y + 130} width={boxW - 30} height="22" rx="6" fill="#ede9fe" />
              <text x={x + 24} y={y + 145} fontSize="11" fontWeight="600" fill="#6d28d9">
                💡 {i === 0 ? 'Snake = 2-4 hours first day' : i === 1 ? 'Ask: "What am I missing?"' : i === 2 ? 'Don\'t ask all features at once' : i === 3 ? 'Ask ChatGPT for 8-bit sounds' : i === 4 ? 'Makes demo feel like real game' : 'Record 30s trailer, post story'}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <rect x="0" y="602" width="1200" height="28" fill="url(#game-gradient)" opacity="0.05" />
        <text x="600" y="620" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9ca3af">
          apifeny.ai/playbooks/build-a-game-with-ai
        </text>
      </svg>
    </div>
  );
}
