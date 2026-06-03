'use client';

interface InfographicProps {
  width?: number;
  height?: number;
}

export default function InfographicBuildGame({ width = 1200, height = 630 }: InfographicProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Build a game with AI in one weekend — 6 steps: Choose and setup, design with Claude, build core loop, polish and juice, add leaderboard, deploy and share."
      style={{ width: '100%', height: 'auto', maxWidth: width, fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <defs>
        <linearGradient id="bg-game" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#faf5ff" />
          <stop offset="100%" stopColor="#f3e8ff" />
        </linearGradient>
        <linearGradient id="accent-game" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="stat-purple" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <filter id="shadow-game">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#7c3aed" floodOpacity="0.08" />
        </filter>
        <filter id="shadow-card-game">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.04" />
        </filter>
      </defs>

      {/* Background */}
      <rect width={width} height={height} rx="20" fill="url(#bg-game)" />

      {/* Decorative */}
      <circle cx="1100" cy="80" r="140" fill="#8b5cf6" opacity="0.03" />
      <circle cx="80" cy="550" r="100" fill="#a855f7" opacity="0.03" />
      <polygon points="600,0 640,40 600,80 560,40" fill="#c084fc" opacity="0.04" />

      {/* Top accent bar */}
      <rect x="0" y="0" width={width} height="6" fill="url(#accent-game)" rx="3" />

      {/* Header */}
      <text x="600" y="72" textAnchor="middle" fontSize="32" fontWeight="800" fill="#4c1d95">Build a Game with AI in One Weekend</text>
      <text x="600" y="104" textAnchor="middle" fontSize="18" fill="#7c3aed" fontWeight="500">Zero coding experience required · Just creativity</text>

      {/* Hero Stat Box */}
      <rect x="80" y="128" width="1040" height="68" rx="12" fill="url(#stat-purple)" filter="url(#shadow-game)" />
      <text x="600" y="164" textAnchor="middle" fontSize="24" fontWeight="700" fill="#ffffff">4-6 hours from zero code to a playable game you can ship</text>
      <text x="600" y="188" textAnchor="middle" fontSize="15" fill="#e9d5ff">Free tools · No experience · Portfolio-worthy results</text>

      {/* 6-Step Timeline */}
      {/* Step 1 */}
      <rect x="40" y="218" width="180" height="170" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <rect x="60" y="230" width="24" height="24" rx="8" fill="#ede9fe" />
      <text x="72" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">1</text>
      <text x="60" y="268" fontSize="14" fontWeight="700" fill="#4c1d95">Choose & Setup</text>
      <text x="60" y="288" fontSize="11" fill="#6b7280">Pick Snake, Pong, or</text>
      <text x="60" y="304" fontSize="11" fill="#6b7280">Breakout. Open Cursor,</text>
      <text x="60" y="320" fontSize="11" fill="#6b7280">describe your game.</text>
      <text x="60" y="372" fontSize="10" fontWeight="600" fill="#7c3aed">⏱ 30 min</text>

      {/* Step 2 */}
      <rect x="235" y="218" width="180" height="170" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <rect x="255" y="230" width="24" height="24" rx="8" fill="#ede9fe" />
      <text x="267" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">2</text>
      <text x="255" y="268" fontSize="14" fontWeight="700" fill="#4c1d95">Design with Claude</text>
      <text x="255" y="288" fontSize="11" fill="#6b7280">Describe vision, get</text>
      <text x="255" y="304" fontSize="11" fill="#6b7280">a 1-page game design</text>
      <text x="255" y="320" fontSize="11" fill="#6b7280">document (GDD).</text>
      <text x="255" y="372" fontSize="10" fontWeight="600" fill="#7c3aed">⏱ 45 min</text>

      {/* Step 3 */}
      <rect x="430" y="218" width="180" height="170" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <rect x="450" y="230" width="24" height="24" rx="8" fill="#ede9fe" />
      <text x="462" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">3</text>
      <text x="430" y="268" fontSize="14" fontWeight="700" fill="#4c1d95">Build Core Loop</text>
      <text x="430" y="288" fontSize="11" fill="#6b7280">Cursor Agent scaffolds</text>
      <text x="430" y="304" fontSize="11" fill="#6b7280">movement, collision,</text>
      <text x="430" y="320" fontSize="11" fill="#6b7280">scoring, game states.</text>
      <text x="430" y="372" fontSize="10" fontWeight="600" fill="#7c3aed">⏱ 2-3 hours</text>

      {/* Step 4 */}
      <rect x="625" y="218" width="180" height="170" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <rect x="645" y="230" width="24" height="24" rx="8" fill="#ede9fe" />
      <text x="657" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">4</text>
      <text x="625" y="268" fontSize="14" fontWeight="700" fill="#4c1d95">Polish & Juice</text>
      <text x="625" y="288" fontSize="11" fill="#6b7280">Particles, animations,</text>
      <text x="625" y="304" fontSize="11" fill="#6b7280">sound effects, screen</text>
      <text x="625" y="320" fontSize="11" fill="#6b7280">shake. Makes it real.</text>
      <text x="625" y="372" fontSize="10" fontWeight="600" fill="#7c3aed">⏱ 1-2 hours</text>

      {/* Step 5 */}
      <rect x="820" y="218" width="180" height="170" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <rect x="840" y="230" width="24" height="24" rx="8" fill="#ede9fe" />
      <text x="852" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">5</text>
      <text x="820" y="268" fontSize="14" fontWeight="700" fill="#4c1d95">Leaderboard</text>
      <text x="820" y="288" fontSize="11" fill="#6b7280">High scores via</text>
      <text x="820" y="304" fontSize="11" fill="#6b7280">localStorage, difficulty</text>
      <text x="820" y="320" fontSize="11" fill="#6b7280">scaling, start screen.</text>
      <text x="820" y="372" fontSize="10" fontWeight="600" fill="#7c3aed">⏱ 45 min</text>

      {/* Step 6 */}
      <rect x="1015" y="218" width="165" height="170" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <rect x="1035" y="230" width="24" height="24" rx="8" fill="#ede9fe" />
      <text x="1047" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">6</text>
      <text x="1035" y="268" fontSize="14" fontWeight="700" fill="#4c1d95">Deploy & Share</text>
      <text x="1035" y="288" fontSize="11" fill="#6b7280">One command to</text>
      <text x="1035" y="304" fontSize="11" fill="#6b7280">Vercel/Netlify.</text>
      <text x="1035" y="320" fontSize="11" fill="#6b7280">Free hosting.</text>
      <text x="1035" y="372" fontSize="10" fontWeight="600" fill="#7c3aed">⏱ 10 min</text>

      {/* Bottom: Results & Pro Tips */}
      <rect x="40" y="410" width="440" height="110" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <text x="60" y="436" fontSize="13" fontWeight="700" fill="#4c1d95">📊 Real Results</text>
      <text x="60" y="460" fontSize="12" fill="#6b7280">✓ 4-6 hours to a playable game (vs 2 weeks traditional)</text>
      <text x="60" y="480" fontSize="12" fill="#6b7280">✓ $0 cost — all free tools + free deployment</text>
      <text x="60" y="500" fontSize="12" fill="#6b7280">✓ Zero coding experience needed — AI writes everything</text>
      <text x="60" y="520" fontSize="12" fill="#6b7280">✓ Portfolio piece you can show potential clients</text>

      {/* Right: Tools */}
      <rect x="500" y="410" width="340" height="110" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <text x="520" y="436" fontSize="13" fontWeight="700" fill="#4c1d95">🧰 Tools Used</text>
      <rect x="520" y="448" width="68" height="24" rx="6" fill="#ede9fe" />
      <text x="554" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">Cursor</text>
      <rect x="596" y="448" width="62" height="24" rx="6" fill="#dbeafe" />
      <text x="627" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">Claude</text>
      <rect x="666" y="448" width="72" height="24" rx="6" fill="#fef3c7" />
      <text x="702" y="465" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">ChatGPT</text>
      <text x="520" y="498" fontSize="11" fill="#9ca3af">Game recommendations by skill level:</text>
      <text x="520" y="514" fontSize="11" fill="#6b7280">🐍 Snake (easiest) · 🏓 Pong · 🧱 Breakout · 🎮 Platformer</text>

      {/* Footer */}
      <rect x="860" y="410" width="320" height="110" rx="14" fill="white" filter="url(#shadow-card-game)" />
      <text x="880" y="436" fontSize="13" fontWeight="700" fill="#4c1d95">🔥 Pro Tips</text>
      <text x="880" y="460" fontSize="11" fill="#6b7280">✓ Record a 30-sec screen recording</text>
      <text x="880" y="480" fontSize="11" fill="#6b7280">  and post your build story on X</text>
      <text x="880" y="500" fontSize="11" fill="#6b7280">✓ Ship imperfect — every game you</text>
      <text x="880" y="520" fontSize="11" fill="#6b7280">  build teaches you something new</text>

      {/* Brand */}
      <text x="600" y="605" textAnchor="middle" fontSize="13" fontWeight="600" fill="#7c3aed">apifeny.ai</text>
      <text x="600" y="622" textAnchor="middle" fontSize="11" fill="#9ca3af">Full step-by-step guide · Free templates · Build your first game today</text>
    </svg>
  );
}
