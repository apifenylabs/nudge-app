import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Bot,
  MessageSquare,
  BarChart3,
  Code,
  Globe,
  Shield,
  Smartphone,
  BookOpen,
  Lightbulb,
  Rocket,
  Star,
  ChevronRight,
  Search,
  Pen,
  FileText,
  Edit3,
  Share2,
  Phone,
  Mail,
  PieChart,
  Headphones,
  Building2,
  LineChart,
  Presentation,
  Gamepad2,
  Swords,
  Cuboid,
  Joystick,
  Palette,
  Music,
  Monitor,
  Users2,
  Brain,
  Puzzle,
  Trophy,
  Layers,
  ScrollText,
  Wand2,
  Repeat,
  Shuffle,
  Image,
  Volume2,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Best AI Tools for Game Development in 2026 — Art, Code, Design & Marketing | Apifeny AI',
  description:
    'Compare the best AI tools for game development in 2026. AI-powered 3D asset generation, game art, procedural world building, NPC dialogue, code assistance, game testing, audio design, and player analytics. Vetted for indie devs and Asia-Pacific game studios.',
  keywords: [
    'AI game development tools',
    'AI game art generation',
    'AI 3D asset generation',
    'AI NPC dialogue',
    'AI game testing',
    'AI procedural generation',
    'AI game audio',
    'AI game marketing',
    'AI player analytics',
    'indie game dev AI',
    'game development 2026',
    'best AI for game dev',
    'AI Unity tools',
    'AI Unreal Engine tools',
    'AI game design',
    'APAC game studios',
    'AI game localization',
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/ai-tools-for-gaming`,
  },
  openGraph: {
    title: 'Best AI Tools for Game Development in 2026 — Art, Code, Design & Marketing',
    description:
      'Definitive guide to the best AI tools for game development in 2026. AI-powered 3D asset generation, game art, procedural world building, NPC dialogue, code assistance, game testing, audio design, and player analytics — vetted for indie devs and Asia-Pacific game studios.',
    url: `${BASE_URL}/guides/ai-tools-for-gaming`,
    type: 'article',
    locale: 'en_US',
    siteName: 'Apifeny AI',
    images: [
      {
        url: `${BASE_URL}/og/ai-tools-for-gaming.jpg`,
        width: 1200,
        height: 630,
        alt: 'Best AI Tools for Game Development in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Game Development in 2026 — Art, Code, Design & Marketing',
    description:
      'Definitive guide to AI tools for game development — AI-powered 3D asset generation, game art, procedural world building, NPC dialogue, code assistance, game testing, audio design, and player analytics, vetted for indie devs and APAC game studios.',
  },
};

const sections = [
  {
    id: 'ai-game-art-3d-assets',
    title: '1. AI for Game Art & 3D Asset Generation',
    icon: Palette,
    color: 'bg-purple-50 dark:bg-purple-950/30',
    text: `AI-powered art and 3D asset generation has become the single biggest productivity leap for game developers in 2026. What used to take a team of artists weeks now takes a single developer hours. From concept art to fully rigged 3D models, AI tools cover the entire art pipeline.

How AI transforms game art and asset creation in 2026:
• Text-to-3D generation: Generate PBR-ready 3D models from text prompts or reference images
• Concept art generation: Create character designs, environments, and prop concepts in seconds
• Texture generation: AI produces seamless PBR textures (albedo, normal, roughness, metallic) from text
• UV unwrapping & rigging: Automated UV mapping and skeleton rigging for generated models
• Sprite sheet generation: Pixel art and 2D sprite sheets generated from descriptions
• Animation in-betweening: AI generates smooth transitions between keyframes
• Style transfer: Apply any art style (anime, realistic, pixel art, watercolor) to existing assets
• LOD generation: Automatic level-of-detail variants for performance optimization
• Asset variation: Generate dozens of color/texture variants from a single base model

For Asia-Pacific game studios and indie developers, AI art tools are especially transformative:
• Japan's anime game industry uses AI to rapidly prototype character designs and backgrounds
• Chinese mobile game studios leverage AI for massive asset pipelines across gacha games
• Southeast Asian indie studios can compete globally with AI-generated AAA-quality art on indie budgets
• South Korea's MMORPG developers use AI for procedurally generated open worlds and dungeons
• Indian game studios use AI for localization-friendly character and environment assets

Leading AI art and 3D tools include Midjourney for concept art, Leonardo AI for game-ready assets, and dedicated 3D generation platforms that integrate with Unity and Unreal Engine pipelines.`,
    tools: ['midjourney', 'leonardo-ai'],
    affiliateSuggestions: [
      { name: 'Midjourney', slug: 'midjourney', note: 'Concept art and visual style prototyping' },
      { name: 'Leonardo AI', slug: 'leonardo-ai', note: 'Game-ready asset generation with PBR textures' },
    ],
  },
  {
    id: 'ai-game-code-assistance',
    title: '2. AI for Game Code & Engine Assistance',
    icon: Code,
    color: 'bg-blue-50 dark:bg-blue-950/30',
    text: `Game development code is notoriously complex — combining performance-critical C++/C# with shader languages, visual scripting, and multiplayer networking. AI code assistants specialized for game engines have matured dramatically by 2026.

AI capabilities in game code assistance in 2026:
• Unity C# and Unreal C++ code completion: Context-aware suggestions for game-specific patterns
• Blueprint visual scripting generation: AI generates Blueprint node graphs from natural language descriptions
• Shader generation: Write HLSL/GLSL shaders from plain English descriptions (water, fire, toon shading, etc.)
• AI-driven bug detection: Identify common game bugs: null references, race conditions, memory leaks
• Performance optimization: AI suggests GPU-friendly alternatives for expensive operations
• Multiplayer networking: Generate authoritative server logic and client-prediction code
• AI-assisted refactoring: Restructure spaghetti code into clean architecture patterns
• Documentation generation: Auto-generate comments, READMEs, and design documents
• Asset pipeline scripts: AI writes import/export tools for custom asset formats

For indie developers using Cursor or GitHub Copilot, these capabilities integrate directly into Unity (with Rider/VS) and Unreal Engine (with VS or CLion) workflows. The key advantage is that game engines have specialized patterns — component-based architecture, coroutines, delegates, and ECS — that general-purpose code assistants handle better with context-aware tuning.

Asia-Pacific game development trends driving AI code tool adoption:
• China's game developer crunch culture is being reduced by AI automation of boilerplate code
• Japanese studios use AI to modernize legacy codebases (many still on older Unity versions)
• Philippine and Vietnamese outsourcing studios use AI to improve code quality output
• Korean mobile game studios use AI for rapid prototyping of new game mechanics`,
    tools: ['cursor', 'copilot', 'windsurf', 'claude'],
    affiliateSuggestions: [
      { name: 'Cursor', slug: 'cursor', note: 'Best AI code editor for Unity/Unreal game development' },
      { name: 'GitHub Copilot', slug: 'copilot', note: 'Excellent for boilerplate and C#/C++ completions' },
      { name: 'Windsurf', slug: 'windsurf', note: 'AI flow-state IDE for uninterrupted coding sessions' },
      { name: 'Claude', slug: 'claude', note: 'Game architecture design and blueprint logic planning' },
    ],
  },
  {
    id: 'ai-npc-dialogue-quests',
    title: '3. AI for NPC Dialogue, Quests & Narrative Design',
    icon: MessageSquare,
    color: 'bg-green-50 dark:bg-green-950/30',
    text: `Dynamic NPC dialogue and procedural quest generation powered by AI is one of the most exciting frontiers in game development. Instead of hand-writing thousands of dialogue lines and quest variations, developers now use large language models to create responsive, branching narratives.

AI-driven narrative capabilities in 2026:
• Dynamic NPC dialogue: NPCs respond contextually to player actions, world state, and previous conversations
• Procedural quest generation: AI creates unique quests with objectives, rewards, and narrative hooks
• Dialogue branching at scale: Generate thousands of dialogue variants without manual authoring
• Lore-consistent generation: AI grounded in game world documentation, factions, and history
• Multi-language NPC speech: Generate localized dialogue in Japanese, Chinese, Korean, Thai simultaneously
• Voice-over script generation: AI produces performance-ready VO scripts with emotion markers
• Quest reward balancing: AI suggests XP, loot, and gold values based on quest difficulty and progression
• Player choice tracking: Branching narratives that remember player decisions across hours of gameplay
• Procedural faction relationships: NPC factions respond dynamically to player reputation

The key challenge is maintaining narrative quality and game world consistency. Leading implementations use a "lore-first" approach — the AI is seeded with a game bible containing setting details, character backgrounds, faction relationships, and tone guidelines before generating any dialogue. This ensures generated content feels hand-crafted rather than generic.

Asia-Pacific game narrative trends benefiting from AI:
• Japanese JRPGs use AI for massive branching dialogue trees without ballooning writing teams
• Chinese open-world games generate regional quest variations that reflect local culture and language
• Korean MMORPGs use AI for dynamic faction and guild questlines
• Visual novel studios in Japan use AI to accelerate multiple-route narrative production`,
    tools: ['chatgpt', 'claude', 'deepseek'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Character backstory generation and dialogue prototyping' },
      { name: 'Claude', slug: 'claude', note: 'Long-form narrative design and lore bible creation' },
      { name: 'DeepSeek Chat', slug: 'deepseek', note: 'Cost-effective quest variation generation at scale' },
    ],
  },
  {
    id: 'ai-game-audio-music',
    title: '4. AI for Game Audio, Music & Sound Design',
    icon: Volume2,
    color: 'bg-pink-50 dark:bg-pink-950/30',
    text: `Game audio — from adaptive soundtracks to procedural sound effects — has been transformed by AI. In 2026, AI audio tools generate everything from orchestral scores that adapt to gameplay intensity to footstep sounds on procedurally generated terrain.

AI audio capabilities for game development:
• Adaptive music generation: Soundtracks that evolve with game state — combat, exploration, stealth, victory
• Procedural sound effects: Generate footstep sounds for any surface material, weapon sounds, ambient noise
• Voice synthesis for NPCs: Generate NPC dialogue with emotion, accent, and age variation
• Audio spatialization: AI suggests optimal audio positioning for 3D sound environments
• Foley generation: Realistic movement and interaction sounds from video of real-world actions
• Audio mixing & mastering: AI-balanced mix levels for dialogue, music, and effects
• Sound variation systems: Generate dozens of variations of a single sound to prevent repetition fatigue
• Localization dubbing: AI-generated voice dubs with lip-sync matching for multiple languages
• Real-time audio effects: AI-powered reverb, echo, and environmental audio processing

Leading platforms like ElevenLabs and Descript provide the foundational technology, while game-specific tools integrate directly with FMOD, Wwise, and Unity Audio Mixer APIs.

For indie developers, the biggest impact is budget: a full orchestral soundtrack that would cost $10,000-50,000 to commission can be generated with AI for pennies, while maintaining professional quality suitable for commercial releases.

Asia-Pacific game audio trends:
• Japanese RPGs use AI for expansive orchestral scores across 80+ hour games
• Chinese mobile games generate region-specific music that blends traditional instruments with modern production
• South Korean competitive games use AI for real-time audio that communicates game state to players`,
    tools: ['elevenlabs', 'descript'],
    affiliateSuggestions: [
      { name: 'ElevenLabs', slug: 'elevenlabs', note: 'NPC voice generation with emotional range and language support' },
      { name: 'Descript', slug: 'descript', note: 'Audio editing and voice synthesis for game trailers' },
    ],
  },
  {
    id: 'ai-procedural-generation-world-building',
    title: '5. AI for Procedural World Building & Level Design',
    icon: Layers,
    color: 'bg-teal-50 dark:bg-teal-950/30',
    text: `Procedural generation has been a staple of game development for decades, but AI takes it to a new level. Instead of hand-tuned noise functions and rule-based generation, AI models learn from thousands of real and game environments to create organic, believable worlds.

AI-powered world building capabilities in 2026:
• Terrain generation: AI creates realistic elevation maps, river systems, and biomes from natural language prompts
• City and settlement layout: Generate believable urban layouts with road networks, districts, and landmarks
• Interior layout design: AI designs dungeon, building, and cave layouts with logical room progression
• Vegetation and ecosystem placement: Realistic biome-accurate plant and animal distribution
• Road and path generation: AI creates natural-looking paths between points of interest
• Weather and climate simulation: Generate consistent weather patterns across large game worlds
• Lighting design: AI suggests optimal lighting placement for mood and gameplay visibility
• Parallax background generation: Multi-layer backgrounds for 2D side-scrollers
• Voxel world generation: Minecraft-style worlds with coherent biome regions and structure distribution

Modern AI world builders integrate with Unity Terrain Tools, Unreal Engine Landscape System, and Godot's terrain system. The key innovation is "coherent diversity" — AI generates worlds that feel varied and surprising while maintaining internal logic and playability.

Asia-Pacific game world building trends:
• Chinese open-world games use AI for massive, varied landscapes that avoid the "copy-paste" feel of traditional procedural generation
• Japanese games blend procedural generation with hand-crafted "points of interest" for the best of both approaches
• Southeast Asian developers use AI to build worlds that reflect the region's diverse geography — tropical islands, rainforests, and modern megacities`,
    tools: ['midjourney', 'leonardo-ai', 'runway'],
    affiliateSuggestions: [
      { name: 'Midjourney', slug: 'midjourney', note: 'Concept-level world building and environment design exploration' },
      { name: 'Leonardo AI', slug: 'leonardo-ai', note: 'Texture and tileable asset generation for game worlds' },
      { name: 'Runway', slug: 'runway', note: 'AI video for cinematics and world trailer generation' },
    ],
  },
  {
    id: 'ai-game-testing-qa',
    title: '6. AI for Game Testing & Quality Assurance',
    icon: Puzzle,
    color: 'bg-amber-50 dark:bg-amber-950/30',
    text: `Game QA is notoriously difficult — games have infinite states, complex physics interactions, and strict performance requirements. AI testing tools have matured to handle thousands of automated test scenarios that would require dozens of human testers.

AI game testing capabilities in 2026:
• Automated playtesting: AI agents play through game levels, identifying progression blockers and difficulty spikes
• Regression testing: AI detects new bugs introduced by code changes by comparing game state outputs
• Performance profiling: AI identifies frame-rate drops, memory leaks, and GPU bottlenecks
• Gameplay balance testing: AI simulates thousands of combat scenarios to identify overpowered/underpowered mechanics
• Localization testing: AI verifies that UI text fits in all languages and that cultural content is appropriate
• Physics edge case detection: AI discovers physics glitches, clipping issues, and collision bugs
• Save/load validation: Automated verification of save game integrity across patches
• Achievement validation: AI verifies that achievements trigger correctly under specified conditions
• Multiplayer netcode testing: AI simulates network conditions — latency, packet loss, desync scenarios

For mobile game developers in Asia, automated AI testing is especially critical given the diverse device ecosystem (hundreds of Android devices in China alone). AI testing tools can simulate gameplay across thousands of device configurations to catch device-specific bugs before release.

The integration of CI/CD pipelines with AI testing means that every build automatically triggers comprehensive testing — catching bugs within minutes rather than days.`,
    tools: ['chatgpt', 'devin', 'claude'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Test case generation from game design documents' },
      { name: 'Devin', slug: 'devin', note: 'Autonomous bug reproduction and fix suggestion' },
      { name: 'Claude', slug: 'claude', note: 'Complex game logic verification and edge case analysis' },
    ],
  },
  {
    id: 'ai-game-marketing-user-acquisition',
    title: '7. AI for Game Marketing & User Acquisition',
    icon: TrendingUp,
    color: 'bg-rose-50 dark:bg-rose-950/30',
    text: `The games market is hyper-competitive — over 10,000 games launch on Steam alone each year, and mobile app stores see countless more. AI-powered marketing and user acquisition (UA) tools give developers the edge in getting their game discovered.

AI marketing capabilities for game developers in 2026:
• Playable ad generation: AI creates interactive ad units that let users try a game before installing
• Trailer and promotional video creation: AI produces game trailers with dynamic pacing and music
• Store page optimization: AI writes and A/B tests app store descriptions, screenshots, and keywords
• Social media content generation: AI creates platform-specific content (TikTok snippets, Twitter clips, Reddit posts)
• Influencer outreach: AI identifies relevant streamers and generates personalized pitch emails
• Community management: AI assists with Discord moderation, FAQ generation, and player support
• Competitor analysis: AI monitors competitor launches, pricing, and review sentiment
• UA bid optimization: AI manages ad spend across Facebook, Google, TikTok, and AppLovin
• Review sentiment analysis: AI analyzes player reviews to surface actionable feedback and bug patterns

For indie developers, the democratization of marketing through AI levels the playing field. A solo developer can now execute a marketing campaign that previously required a dedicated marketing team.

Asia-Pacific game marketing insights:
• Japan's console-focused market requires distinct App Store strategies for iOS vs Nintendo eShop
• China's regulatory environment demands compliance-aware marketing (game license numbers, age ratings)
• Southeast Asia's diverse mobile market benefits from region-specific ad creative (Indonesia, Thailand, Vietnam each respond to different aesthetics)
• Korea's PC bangs (gaming cafes) require unique distribution and promotion strategies
• India's mobile-first, Jio-enabled gaming explosion represents the fastest-growing UA opportunity in 2026`,
    tools: ['canva-ai', 'chatgpt', 'perplexity'],
    affiliateSuggestions: [
      { name: 'Canva AI', slug: 'canva-ai', note: 'Store page graphics, social media creatives, and ad banners' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'App store descriptions, ad copy, and press releases' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Competitor research and market trend analysis' },
    ],
  },
  {
    id: 'ai-player-analytics-revenue',
    title: '8. AI for Player Analytics & Monetization',
    icon: BarChart3,
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: `Understanding how players interact with your game — where they drop off, what they buy, what frustrates them — is essential for retention and monetization. AI analytics tools process millions of player sessions to deliver actionable insights.

AI analytics capabilities for game developers:
• Player churn prediction: AI identifies players at risk of quitting and suggests re-engagement strategies
• Session behavior analysis: AI segments players by play style, spending patterns, and engagement levels
• A/B testing automation: AI designs and runs multivariate tests on game mechanics, pricing, and UI
• Monetization optimization: AI recommends optimal pricing for IAP items, battle passes, and cosmetics
• Difficulty curve analysis: AI identifies spikes where players get stuck and adjust difficulty
• Progression funnel analysis: AI pinpoints where in the player journey retention drops
• Social graph analysis: AI identifies influential players and viral sharing patterns
• Live ops recommendations: AI suggests event timing, rewards, and duration for optimal engagement
• Revenue forecasting: AI predicts LTV, ARPU, and revenue trends based on current KPIs

Asia-Pacific mobile F2P games generate the highest revenue per user globally, and AI analytics is essential for optimizing the complex monetization systems — gacha mechanics, battle passes, season passes, VIP tiers, and limited-time events.

Key metric improvements from AI analytics adoption:
• Player retention: +15-25% improvement in D7 and D30 retention
• Average Revenue Per Daily Active User (ARPDAU): +20-40% through optimized pricing and offer timing
• User Acquisition cost reduction: -30-50% through better targeting and creative optimization
• Development efficiency: -40-60% time spent on manual analytics and reporting`,
    tools: ['notion-ai', 'perplexity', 'chatgpt'],
    affiliateSuggestions: [
      { name: 'Notion AI', slug: 'notion-ai', note: 'Game design docs, analytics dashboards, and team wikis' },
      { name: 'Perplexity', slug: 'perplexity', note: 'Competitor game analysis and market research' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Analytics query writing and data interpretation' },
    ],
  },
  {
    id: 'ai-game-localization',
    title: '9. AI for Game Localization & Regional Adaptation',
    icon: Globe,
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    text: `Game localization is a critical bottleneck for global releases. Translating thousands of dialogue lines, UI strings, lore documents, and marketing materials across dozens of languages is expensive and time-consuming. AI localization tools have matured to handle 95%+ of the work, with human editors handling cultural adaptation and quality assurance.

AI localization capabilities for game development:
• Full-text game translation: Translate all game text across languages while preserving context and variables
• UI string adaptation: Handle variable interpolation, plural rules, and text expansion/shrinkage
• Voice-over localization: AI generates localized VO with lip-sync matching and emotional range
• Cultural adaptation: AI flags culturally sensitive content and suggests alternatives
• Locale-specific asset variants: Generate region-appropriate character skins, food items, and environmental details
• Legal compliance: AI flags content that may violate specific country regulations (gacha rates in China, age ratings in Korea)
• Right-to-left language support: Verify Arabic and Hebrew text display in game UI
• Font and glyph verification: Identify missing glyphs for CJK/Thai/Vietnamese in game fonts

For Asia-Pacific game developers targeting global markets, AI localization reduces time-to-market for international versions from 6-12 months to 2-4 weeks.

Common localization scope:
| Region | Languages | Special Considerations |
|--------|-----------|----------------------|
| Greater China | Simplified Chinese, Traditional Chinese | Game license (ISBN), gacha rate disclosure, content filters |
| Japan | Japanese | CERO rating system, kanji font support, cultural nuance |
| Korea | Korean | Game Rating Board (GRAC), real-name verification |
| Southeast Asia | Thai, Vietnamese, Indonesian, Malay | Smaller file sizes for mobile, multiple alphabets |
| South Asia | Hindi, Tamil, Bengali | Growing mobile market, lower device specs |
| West | English, French, German, Spanish, Portuguese | EU GDPR compliance, age rating systems, text expansion (30%+) |

The combination of AI translation + human polishing creates a localization pipeline that's both cost-effective and high-quality — the "AI-first, human-review" model that has become industry standard by 2026.`,
    tools: ['deepl', 'chatgpt', 'claude'],
    affiliateSuggestions: [
      { name: 'DeepL', slug: 'deepl', note: 'High-quality game text translation with context preservation' },
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Dialogue localization with tone and character voice preservation' },
      { name: 'Claude', slug: 'claude', note: 'Long-document lore translation and cultural adaptation review' },
    ],
  },
  {
    id: 'ai-game-design-rapid-prototyping',
    title: '10. AI for Game Design & Rapid Prototyping',
    icon: Lightbulb,
    color: 'bg-yellow-50 dark:bg-yellow-950/30',
    text: `Game design is traditionally an iterative process — game design documents (GDDs), paper prototypes, digital prototypes, and multiple rounds of playtesting. AI accelerates this process dramatically, letting designers go from concept to playable prototype in days instead of months.

AI game design capabilities in 2026:
• GDD generation: AI creates comprehensive game design documents from a brief description
• Mechanic brainstorming: AI suggests game mechanics based on genre, target audience, and platform
• Difficulty curve design: AI generates balanced difficulty progression across levels and game modes
• Economy modeling: AI simulates in-game economies to predict inflation, scarcity, and progression balance
• Combat system design: AI proposes combat mechanics, stats, and skill trees with balance considerations
• Player psychology analysis: AI predicts how players will respond to reward schedules and progression systems
• Level flow optimization: AI suggests level layouts that guide players naturally toward objectives
• Accessibility design: AI flags potential accessibility issues (color blindness, motion sickness, audio cues)
• Monetization design: AI recommends monetization models aligned with game genre and target audience

The most impactful use case for indie developers is rapid prototyping. A solo developer can describe their game concept to an AI, receive a complete GDD, generate placeholder art assets, write core scripts, and have a playable prototype within a week. This dramatically reduces the time and cost of "finding the fun."

Asia-Pacific design trends:
• Japanese game designers use AI to document and preserve design philosophies from veteran designers retiring from the industry
• Chinese mobile studios use AI to design F2P economy systems optimized for high-engagement monetization
• Korean developers use AI to balance complex competitive games with hundreds of characters and skills`,
    tools: ['chatgpt', 'claude', 'notion-ai'],
    affiliateSuggestions: [
      { name: 'ChatGPT', slug: 'chatgpt', note: 'Game mechanics brainstorming and GDD generation' },
      { name: 'Claude', slug: 'claude', note: 'Detailed system design documents and economy modeling' },
      { name: 'Notion AI', slug: 'notion-ai', note: 'Game design document organization and team collaboration' },
    ],
  },
];

const guideFaqs = [
  {
    "question": "What is the best AI tool for game development?",
    "answer": "Scenario for AI asset generation, ChatGPT for narrative and dialogue, and Cursor/Copilot for code are essential. Runway Gen-3 creates cinematic cutscenes from text descriptions."
  },
  {
    "question": "Can AI generate game assets?",
    "answer": "Yes \u2014 AI tools like Scenario, Leonardo AI, and Midjourney generate game-ready assets including characters, environments, textures, and UI elements, saving months of manual art creation."
  }
];

export default function AIToolsForGamingPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Guides', item: '/guides' },
    { name: 'AI for Gaming', item: '/guides/ai-tools-for-gaming' },
  ];

  const allToolSlugs = [...new Set(sections.flatMap((s) => s.tools))];
  const featuredTools = toolsData.filter((t) => allToolSlugs.includes(t.slug));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                <Gamepad2 className="h-4 w-4" />
                Game Development
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Best AI Tools for Game Development in 2026
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-white/80 sm:text-xl">
                From 3D asset generation and procedural world building to NPC dialogue and player analytics — the definitive guide to AI tools transforming game development for indie devs and studios across Asia-Pacific.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  25 min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4" />
                  10 categories
                </span>
                <span className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4" />
                  12+ tools reviewed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Table of Contents
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 rounded-lg p-3 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white"
                  >
                    <section.icon className="h-5 w-5 shrink-0 text-purple-500" />
                    <span>{section.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Each Section */}
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-4xl">
              <div className={`rounded-2xl border border-slate-200 p-8 dark:border-slate-700 ${section.color}`}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-800">
                    <section.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {section.text.split('\n').map((paragraph, i) => {
                    if (paragraph.trim().startsWith('•')) {
                      return (
                        <li key={i} className="ml-4 text-slate-700 dark:text-slate-300">
                          {paragraph.trim().replace('• ', '')}
                        </li>
                      );
                    }
                    if (paragraph.trim().startsWith('|') && paragraph.includes('|')) {
                      return <p key={i} className="text-sm font-mono text-slate-500">{paragraph.trim()}</p>;
                    }
                    if (paragraph.trim() === '') return null;
                    return (
                      <p key={i} className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
                </div>

                {/* Tool Cards */}
                {section.tools && section.tools.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                      <Wand2 className="h-5 w-5 text-purple-500" />
                      Recommended Tools
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {section.tools.map((slug) => {
                        const tool = toolsData.find((t) => t.slug === slug);
                        if (!tool) return null;
                        return (
                          <ToolCard
                            key={tool.slug}
                            tool={tool}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* Comparison Table */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800/50">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                AI Tools for Game Development: Quick Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Tool</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Best For</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Category</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Pricing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Midjourney</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Concept art, visual style</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Art & 3D</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Leonardo AI</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Game-ready 3D assets, PBR textures</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Art & 3D</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Cursor</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Unity/Unreal code assistance</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Code</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">GitHub Copilot</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">C#/C++ completions, boilerplate</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Code</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Claude</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Narrative design, lore bibles</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">Narrative</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">ElevenLabs</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">NPC voice, multilingual VO</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">Audio</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Descript</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Audio editing, trailer audio</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">Audio</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Canva AI</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Store assets, ad creatives</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">Marketing</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">DeepL</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Text localization, translation</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">Localization</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Perplexity</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Market research, competitor analysis</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">Marketing</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Guide */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 dark:border-slate-700 dark:from-green-950/30 dark:to-emerald-950/30">
              <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Game Development AI Budget Guide
              </h2>
              <p className="mb-6 text-slate-700 dark:text-slate-300">
                Estimated monthly AI tool costs for different team sizes. These estimates assume pro/paid tiers of the recommended tools.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-green-200 bg-white p-6 dark:border-green-800 dark:bg-slate-800">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Solo Indie</h3>
                  <p className="mb-4 text-3xl font-bold text-green-600">$60-120<span className="text-base font-normal text-slate-500">/mo</span></p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 1 code AI ($10-20)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 1 art AI ($10-30)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 1 LLM ($20)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 1 audio AI ($5-22)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 1 marketing AI ($12-30)</li>
                    <li className="mt-3 text-xs font-medium text-green-600">Covers all core game dev needs</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-blue-200 bg-white p-6 dark:border-blue-800 dark:bg-slate-800">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Small Studio</h3>
                  <p className="mb-4 text-3xl font-bold text-blue-600">$300-800<span className="text-base font-normal text-slate-500">/mo</span></p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-blue-500" /> 3-5 code AI seats ($30-100)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-blue-500" /> 2-3 art AI seats ($30-90)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-blue-500" /> 2 LLM seats ($40)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-blue-500" /> 2 audio AI ($10-44)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-blue-500" /> Localization tools ($50-200)</li>
                    <li className="mt-3 text-xs font-medium text-blue-600">Localization + QA automation included</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-purple-200 bg-white p-6 dark:border-purple-800 dark:bg-slate-800">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Mid-Size Studio</h3>
                  <p className="mb-4 text-3xl font-bold text-purple-600">$1,500-5,000<span className="text-base font-normal text-slate-500">/mo</span></p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Team-wide tool licenses</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> AI testing infrastructure</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Analytics & UA platforms</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Full pipeline integration</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Dedicated localization budget</li>
                    <li className="mt-3 text-xs font-medium text-purple-600">Enterprise-grade pipeline</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800/50">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    Can AI replace game artists entirely?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    No — AI excels at generating concept art, textures, and 3D asset bases, but human artists are still essential for quality control, stylistic direction, and creating assets that require deep creative vision. Most successful studios use AI for iteration and ideation while artists focus on hero assets and final polish.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    What's the best AI tool for a solo indie developer?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Start with Cursor (code), Leonardo AI (art assets), and Claude (design docs and narrative). This $40-60/month stack covers the three most time-consuming aspects of indie game dev. Add ElevenLabs for NPC voice and Canva for store assets as your game nears release.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    How do I make sure AI-generated content fits my game's art style?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Use style-consistent prompting techniques. Train a LoRA or DreamBooth model on your existing game assets. Most AI art tools now support style injection — upload reference images from your game to guide generation. For 3D assets, tools like Leonardo AI let you define material standards and polygon budgets.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    Is AI-generated game code reliable for production?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    AI-generated code has improved dramatically but still requires human review — especially for multiplayer networking, security, and performance-critical sections. Use AI for boilerplate, UI code, and asset pipeline scripts where correctness is easy to verify. Always test AI-generated code in isolation before integration.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    What about copyright and IP with AI-generated game assets?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    IP law for AI-generated content varies by jurisdiction. Key points: use tools with commercial usage rights in their terms of service, maintain records of your generation prompts and processes, and have a human artist modify AI outputs for strong copyright claims. The US Copyright Office requires "human authorship" for copyright protection. In Asia, Japan and Singapore have more AI-friendly IP frameworks, while China and Korea are still developing case law.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    How much faster is AI-assisted game development?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Reports from studios using AI tooling show 30-50% faster production timelines for art-heavy games, 40-60% faster for narrative-driven games, and 20-30% faster for code-heavy games. The biggest impact is in prototyping — AI reduces time-to-playable-prototype from 3-6 months to 2-4 weeks for a solo developer.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/30">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    Which game engines support AI tool integration best?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Unity has the most mature AI integration ecosystem with Unity Muse and Unity Sentis for in-game AI. Unreal Engine follows closely with sophisticated procedural generation tools. Godot has growing AI tool support through community plugins. For mobile engines, Cocos Creator (popular in China) integrates well with AI art and localization tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-12 text-center dark:from-purple-900 dark:to-blue-900">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Ready to Ship Your Game?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                Explore all AI tools and find the perfect stack for your game development pipeline. Compare pricing, features, and Asia-Pacific availability.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-purple-700 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
                >
                  Browse All AI Tools
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  More Developer Guides
                </Link>
              </div>
            </div>
          </div>
        </section>
            {/* FAQ Schema */}
      <FAQSchema faqs={guideFaqs} />
    </article>
    </>
  );
}
