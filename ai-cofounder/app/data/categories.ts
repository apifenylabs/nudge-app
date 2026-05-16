// AI Cofounder — Category Data Layer
// Each vertical's: questions, affiliate configs, sample data, scoring

export interface Question {
  id: string;
  question: string;
  type: "text" | "select" | "multi" | "number" | "boolean";
  options?: { label: string; value: string }[];
  placeholder?: string;
  required: boolean;
  agentHint?: string; // what the parallel agent should research
}

export interface AffiliateConfig {
  name: string;
  url: string;
  commission: string; // e.g. "4-12%"
  category: string;
  tags: string[];
}

export interface ScoreFactor {
  name: string;
  weight: number; // 0-1
  currentScore: number; // 0-10
}

export interface CategoryData {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  tagline: string;
  description: string;
  painPoints: string[];
  questions: Question[];
  affiliates: AffiliateConfig[];
  sampleOutput: Record<string, unknown>;
  scoring: ScoreFactor[];
  tam: string; // Total Addressable Market
  cagr: string;
  competition: "Fragmented" | "Moderate" | "Crowded" | "Very fragmented";
}

// ──────────────────────────────────────────
// 1. MEAL PLANNING & NUTRITION
// ──────────────────────────────────────────

export const mealPlanning: CategoryData = {
  slug: "meal-planning",
  name: "Meal Planning & Nutrition",
  emoji: "🥗",
  color: "#10B981",
  tagline: "Your Personal Nutrition Cofounder",
  description: "Stop staring at your fridge. Get personalized weekly meal plans based on preferences, dietary needs, and what's in your pantry.",
  painPoints: [
    "What's for dinner? daily decision fatigue",
    "Food waste — $1,200/year average per household",
    "Nutrition confusion — conflicting diet advice everywhere",
    "Grocery budget overruns from impulse buys",
    "Time spent meal planning (2+ hours/week)",
    "Family members with different dietary needs",
  ],
  questions: [
    { id: "diet", question: "What's your dietary preference?", type: "select", options: [
      { label: "No preference / Balanced", value: "balanced" },
      { label: "Vegetarian", value: "vegetarian" },
      { label: "Vegan", value: "vegan" },
      { label: "Keto / Low-carb", value: "keto" },
      { label: "Pescatarian", value: "pescatarian" },
      { label: "Mediterranean", value: "mediterranean" },
      { label: "Paleo", value: "paleo" },
      { label: "Gluten-free", value: "gluten-free" },
    ], required: true, agentHint: "Research meal plans for this diet type" },
    { id: "allergies", question: "Any food allergies or restrictions?", type: "multi", options: [
      { label: "None", value: "none" },
      { label: "Dairy", value: "dairy" },
      { label: "Nuts", value: "nuts" },
      { label: "Shellfish", value: "shellfish" },
      { label: "Eggs", value: "eggs" },
      { label: "Soy", value: "soy" },
      { label: "Sulfites", value: "sulfites" },
    ], required: true },
    { id: "people", question: "How many people are you cooking for?", type: "number", placeholder: "2", required: true },
    { id: "goal", question: "What's your primary nutrition goal?", type: "select", options: [
      { label: "Weight loss", value: "weight-loss" },
      { label: "Muscle gain", value: "muscle-gain" },
      { label: "General health / maintenance", value: "maintenance" },
      { label: "More energy", value: "energy" },
      { label: "Better digestion", value: "digestion" },
      { label: "Budget-friendly eating", value: "budget" },
    ], required: true, agentHint: "Find 3 evidence-based diet strategies for this goal" },
    { id: "cookTime", question: "How much time can you spend cooking per meal?", type: "select", options: [
      { label: "15 min or less", value: "15" },
      { label: "30 min", value: "30" },
      { label: "45 min", value: "45" },
      { label: "1 hour+ (I enjoy cooking)", value: "60" },
    ], required: true },
    { id: "pantry", question: "Any ingredients already in your pantry/fridge? (Optional)", type: "text", placeholder: "e.g. chicken breast, rice, eggs, spinach...", required: false, agentHint: "Generate meals using these ingredients first, then suggest grocery additions" },
    { id: "budget", question: "Weekly grocery budget?", type: "select", options: [
      { label: "Under $50", value: "budget-low" },
      { label: "$50-$100", value: "budget-medium" },
      { label: "$100-$150", value: "budget-high" },
      { label: "No limit", value: "budget-unlimited" },
    ], required: true },
  ],
  affiliates: [
    { name: "HelloFresh", url: "https://www.hellofresh.com", commission: "10-15%", category: "meal-kit", tags: ["meal-delivery", "recipe-box"] },
    { name: "Instacart", url: "https://www.instacart.com", commission: "4-8%", category: "grocery-delivery", tags: ["groceries", "delivery"] },
    { name: "Amazon Fresh", url: "https://www.amazon.com/fresh", commission: "4-6%", category: "grocery", tags: ["groceries", "amazon"] },
    { name: "Thrive Market", url: "https://www.thrivemarket.com", commission: "5-10%", category: "healthy-grocery", tags: ["organic", "healthy"] },
    { name: "Noom", url: "https://www.noom.com", commission: "10-20%", category: "health-coaching", tags: ["weight-loss", "coaching"] },
    { name: "MyFitnessPal", url: "https://www.myfitnesspal.com", commission: "$2-5/sale", category: "tracking", tags: ["calorie-tracking", "fitness"] },
  ],
  sampleOutput: {
    weekPlan: [
      { day: "Monday", meals: { breakfast: "Overnight oats with berries & almond butter", lunch: "Quinoa bowl with roasted veggies & tahini", dinner: "Lemon herb chicken with asparagus & sweet potato" } },
      { day: "Tuesday", meals: { breakfast: "Greek yogurt parfait with granola & honey", lunch: "Leftover quinoa bowl", dinner: "Salmon with mango salsa & coconut rice" } },
      { day: "Wednesday", meals: { breakfast: "Green smoothie (spinach, banana, protein)", lunch: "Mediterranean wrap with hummus & falafel", dinner: "Turkey chili with avocado & cornbread" } },
      { day: "Thursday", meals: { breakfast: "Egg muffins with veggies & cheese", lunch: "Leftover turkey chili", dinner: "Stir-fried tofu with broccoli & brown rice" } },
      { day: "Friday", meals: { breakfast: "Avocado toast with poached egg", lunch: "Mason jar salad with grilled chicken", dinner: "Homemade pizza night (cauliflower crust option)" } },
      { day: "Saturday", meals: { breakfast: "Pancakes with fresh fruit & maple syrup", lunch: "Buddha bowl (sweet potato, chickpeas, greens)", dinner: "Date night: Steak with chimichurri & roasted potatoes" } },
      { day: "Sunday", meals: { breakfast: "Veggie frittata with side salad", lunch: "Leftover date night", dinner: "Meal prep: Build next week's plan together" } },
    ],
    groceryList: ["Chicken breast (2 lbs)", "Salmon fillets (4)", "Tofu (1 block)", "Quinoa (1 bag)", "Brown rice", "Sweet potatoes (3)", "Asparagus bunch", "Broccoli head", "Spinach (2 bags)", "Mixed greens", "Avocados (3)", "Lemons (4)", "Berries (frozen)", "Bananas (3)", "Oats", "Almond butter", "Olive oil", "Tahini"],
    estimatedCost: "$87",
    estimatedPrepTime: "3.5 hours total (30 min/day avg)",
  },
  scoring: [
    { name: "PAIN VOLUME", weight: 0.2, currentScore: 9 },
    { name: "REVENUE SPEED", weight: 0.2, currentScore: 9 },
    { name: "AFFILIATE MATURITY", weight: 0.2, currentScore: 8 },
    { name: "DATA AVAILABILITY", weight: 0.15, currentScore: 8 },
    { name: "BUILD EFFORT", weight: 0.1, currentScore: 7 },
    { name: "STRATEGIC FIT", weight: 0.15, currentScore: 9 },
  ],
  tam: "$1-1.6B",
  cagr: "19-28%",
  competition: "Fragmented",
};

// ──────────────────────────────────────────
// 2. PERSONAL FINANCE
// ──────────────────────────────────────────

export const personalFinance: CategoryData = {
  slug: "personal-finance",
  name: "Personal Finance",
  emoji: "💰",
  color: "#3B82F6",
  tagline: "Your Money Cofounder",
  description: "Stop guessing. Get a personalized financial plan, budget breakdown, and investment roadmap — built by AI that understands your goals.",
  painPoints: [
    "Budget overwhelm — tracking every expense is exhausting",
    "Debt repayment confusion — which to pay first?",
    "Investment paralysis — too many options, no clear path",
    "Saving for big goals (house, travel, retirement) feels impossible",
    "Hidden fees eating returns",
    "Tax optimization left on the table",
  ],
  questions: [
    { id: "income", question: "What's your monthly after-tax income?", type: "select", options: [
      { label: "Under $2,000", value: "under-2k" },
      { label: "$2,000 - $5,000", value: "2k-5k" },
      { label: "$5,000 - $10,000", value: "5k-10k" },
      { label: "$10,000 - $20,000", value: "10k-20k" },
      { label: "Over $20,000", value: "over-20k" },
    ], required: true, agentHint: "Research savings rates and investment strategies for this income tier" },
    { id: "goal", question: "What's your primary financial goal right now?", type: "select", options: [
      { label: "Pay off debt", value: "debt" },
      { label: "Build emergency fund", value: "emergency" },
      { label: "Save for a big purchase (house, car, etc.)", value: "big-purchase" },
      { label: "Invest for retirement", value: "retirement" },
      { label: "Grow wealth / passive income", value: "wealth" },
      { label: "Better budgeting & spending awareness", value: "budgeting" },
    ], required: true },
    { id: "debt", question: "Do you have any outstanding debt?", type: "select", options: [
      { label: "No debt", value: "none" },
      { label: "Credit card debt (high interest)", value: "credit-card" },
      { label: "Student loans", value: "student" },
      { label: "Mortgage", value: "mortgage" },
      { label: "Personal loan / car loan", value: "personal" },
    ], required: false },
    { id: "savings", question: "How many months of expenses in savings do you have?", type: "select", options: [
      { label: "Less than 1 month", value: "0-1" },
      { label: "1-3 months", value: "1-3" },
      { label: "3-6 months", value: "3-6" },
      { label: "6+ months", value: "6-plus" },
    ], required: true },
    { id: "risk", question: "What's your investment risk tolerance?", type: "select", options: [
      { label: "Very conservative (preserve capital)", value: "conservative" },
      { label: "Moderate (balanced growth)", value: "moderate" },
      { label: "Aggressive (maximize growth)", value: "aggressive" },
      { label: "Not investing yet", value: "none" },
    ], required: true },
    { id: "spending", question: "Roughly, where does your money go?", type: "multi", options: [
      { label: "Housing / Rent", value: "housing" },
      { label: "Food & Dining", value: "food" },
      { label: "Transportation", value: "transport" },
      { label: "Entertainment", value: "entertainment" },
      { label: "Shopping", value: "shopping" },
      { label: "Healthcare", value: "healthcare" },
      { label: "Subscriptions (Netflix, gym, etc.)", value: "subscriptions" },
    ], required: false },
  ],
  affiliates: [
    { name: "Betterment", url: "https://www.betterment.com", commission: "10-20%", category: "investing", tags: ["robo-advisor", "investing"] },
    { name: "Mint", url: "https://www.mint.com", commission: "$3-5/sale", category: "budgeting", tags: ["budget-tracking", "personal-finance"] },
    { name: "Credit Karma", url: "https://www.creditkarma.com", commission: "$5-20/lead", category: "credit", tags: ["credit-score", "monitoring"] },
    { name: "Rocket Mortgage", url: "https://www.rocketmortgage.com", commission: "200-500/lead", category: "mortgage", tags: ["home-loan", "mortgage"] },
    { name: "Robinhood", url: "https://www.robinhood.com", commission: "$5-10/user", category: "trading", tags: ["trading", "stocks", "crypto"] },
    { name: "NerdWallet", url: "https://www.nerdwallet.com", commission: "10-30%", category: "comparison", tags: ["cards", "loans", "comparison"] },
  ],
  sampleOutput: {
    monthlyBudget: { income: 5200, housing: 1500, food: 600, transport: 300, utilities: 200, subscriptions: 85, entertainment: 200, savings: 1200, investments: 800, remainder: 315 },
    recommendations: [
      "Move 3-month emergency fund ($5,400) to a high-yield savings account (4.2% APY)",
      "Consolidate credit card debt to a 0% APR balance transfer card — save $240/year",
      "Increase 401(k) contribution to 15% to hit max employer match",
      "Cancel 2 unused subscriptions ($45/month saved)",
    ],
    debtPayoffPlan: { strategy: "Avalanche (highest interest first)", monthsRemaining: 14, totalInterestSaved: 1280 },
  },
  scoring: [
    { name: "PAIN VOLUME", weight: 0.2, currentScore: 8 },
    { name: "REVENUE SPEED", weight: 0.2, currentScore: 7 },
    { name: "AFFILIATE MATURITY", weight: 0.2, currentScore: 9 },
    { name: "DATA AVAILABILITY", weight: 0.15, currentScore: 7 },
    { name: "BUILD EFFORT", weight: 0.1, currentScore: 6 },
    { name: "STRATEGIC FIT", weight: 0.15, currentScore: 8 },
  ],
  tam: "$1.3-6B+",
  cagr: "21-25%",
  competition: "Moderate",
};

// ──────────────────────────────────────────
// 3. SOLOPRENEUR / SMALL BIZ OPS
// ──────────────────────────────────────────

export const solopreneur: CategoryData = {
  slug: "solopreneur",
  name: "Solopreneur Ops",
  emoji: "⚡",
  color: "#8B5CF6",
  tagline: "Your Business Cofounder",
  description: "The AI operating system for solo founders. Ideate, validate, build, launch, and scale — all guided by your AI cofounder.",
  painPoints: [
    "Too many hats — founder, marketer, developer, support, accountant",
    "Decision fatigue on what to build next",
    "No team to validate ideas with",
    "Pricing uncertainty — leaving money on the table",
    "Customer acquisition is a black box",
    "Burnout from doing everything alone",
  ],
  questions: [
    { id: "stage", question: "What stage is your business in?", type: "select", options: [
      { label: "Just an idea", value: "idea" },
      { label: "Building MVP", value: "mvp" },
      { label: "Launched, need traction", value: "early" },
      { label: "Growing, need scaling", value: "growth" },
      { label: "Profitable, need optimization", value: "profitable" },
    ], required: true, agentHint: "Research typical milestones and bottlenecks for this stage" },
    { id: "niche", question: "What's your business niche or idea?", type: "text", placeholder: "e.g. AI tool for real estate agents, a newsletter about fermentation...", required: true, agentHint: "Analyze market size, competitors, and differentiation opportunities" },
    { id: "revenue", question: "Current monthly revenue?", type: "select", options: [
      { label: "$0 (pre-launch)", value: "zero" },
      { label: "$1 - $1,000", value: "1k" },
      { label: "$1,000 - $5,000", value: "5k" },
      { label: "$5,000 - $20,000", value: "20k" },
      { label: "$20,000+", value: "20k-plus" },
    ], required: true },
    { id: "time", question: "How many hours/week can you dedicate?", type: "select", options: [
      { label: "< 5 hours (side project)", value: "side" },
      { label: "5-15 hours (serious side hustle)", value: "side-plus" },
      { label: "15-30 hours (part-time focus)", value: "part-time" },
      { label: "30+ hours (full-time)", value: "full-time" },
    ], required: true },
    { id: "biggestPain", question: "What's your #1 bottleneck right now?", type: "select", options: [
      { label: "Getting first users / customers", value: "acquisition" },
      { label: "Building / shipping the product", value: "building" },
      { label: "Making sales / closing deals", value: "sales" },
      { label: "Managing time & priorities", value: "time" },
      { label: "Pricing & monetization", value: "pricing" },
      { label: "Content & marketing", value: "marketing" },
    ], required: true, agentHint: "Research 3 proven strategies for overcoming this specific bottleneck" },
    { id: "skills", question: "What skills do you already have?", type: "multi", options: [
      { label: "Coding / Development", value: "coding" },
      { label: "Design / UX", value: "design" },
      { label: "Writing / Content", value: "writing" },
      { label: "Sales / Outreach", value: "sales" },
      { label: "Marketing / Growth", value: "marketing" },
      { label: "Operations / Management", value: "ops" },
    ], required: false },
  ],
  affiliates: [
    { name: "Vercel", url: "https://vercel.com", commission: "$100/user/yr", category: "hosting", tags: ["hosting", "deploy"] },
    { name: "Supabase", url: "https://supabase.com", commission: "20% revenue", category: "backend", tags: ["database", "backend", "auth"] },
    { name: "Webflow", url: "https://webflow.com", commission: "20%", category: "website", tags: ["website", "design", "cms"] },
    { name: "ConvertKit", url: "https://convertkit.com", commission: "30%", category: "email", tags: ["email-marketing", "newsletter"] },
    { name: "Stripe", url: "https://stripe.com", commission: "varies", category: "payments", tags: ["payments", "billing"] },
    { name: "Linear", url: "https://linear.app", commission: "$10/user", category: "project-management", tags: ["project-management", "productivity"] },
  ],
  sampleOutput: {
    actionPlan: [
      { week: 1, focus: "Market validation", tasks: ["Interview 10 potential customers", "Build landing page + waitlist", "Research top 3 competitors"], hours: 15 },
      { week: 2, focus: "MVP core feature", tasks: ["Build core feature 1", "Set up payment (Stripe)", "Write first 3 help articles"], hours: 20 },
      { week: 3, focus: "Launch prep", tasks: ["Set up analytics", "Prepare launch content", "Pre-warm audience on X/Reddit"], hours: 15 },
      { week: 4, focus: "Launch & iterate", tasks: ["Ship to waitlist", "First feedback loop", "Fix top 5 issues"], hours: 20 },
    ],
    pricingRecommendation: { recommended: "$19/month", reasoning: "Pareto-optimal for a solopreneur tool — low enough to trial, high enough for $1k MRR at 53 customers", alternatives: ["Freemium with limits ($0)", "Pro at $29/month"] },
    competitorLandscape: { direct: 3, indirect: 7, gap: "No tool focused on Asian solopreneurs with local payment integration" },
  },
  scoring: [
    { name: "PAIN VOLUME", weight: 0.2, currentScore: 8 },
    { name: "REVENUE SPEED", weight: 0.2, currentScore: 7 },
    { name: "AFFILIATE MATURITY", weight: 0.2, currentScore: 7 },
    { name: "DATA AVAILABILITY", weight: 0.15, currentScore: 6 },
    { name: "BUILD EFFORT", weight: 0.1, currentScore: 6 },
    { name: "STRATEGIC FIT", weight: 0.15, currentScore: 9 },
  ],
  tam: "Emerging (high)",
  cagr: "AI-boom",
  competition: "Fragmented",
};

// ──────────────────────────────────────────
// 4. TRAVEL PLANNING
// ──────────────────────────────────────────

export const travel: CategoryData = {
  slug: "travel",
  name: "Travel Planning",
  emoji: "✈️",
  color: "#F97316",
  tagline: "Your Adventure Cofounder",
  description: "Skip the 20-tab research spiral. Get a personalized itinerary with real recommendations, price comparisons, and hidden gems.",
  painPoints: [
    "20+ browser tabs for one trip",
    "Analysis paralysis from too many options",
    "Overpaying for flights/hotels by not comparing",
    "Missing hidden gems that locals know",
    "Group trip coordination nightmare",
    "Trip planning takes 8+ hours per trip",
  ],
  questions: [
    { id: "destination", question: "Where are you going?", type: "text", placeholder: "e.g. Bali, Tokyo, Chiang Mai...", required: true, agentHint: "Research top attractions, local tips, and seasonal considerations" },
    { id: "dates", question: "When are you traveling and for how long?", type: "text", placeholder: "e.g. July 15-22, 2026 (7 days)", required: true, agentHint: "Check weather, peak season pricing, and events during these dates" },
    { id: "budget", question: "What's your total trip budget?", type: "select", options: [
      { label: "Under $500 (backpacker)", value: "budget" },
      { label: "$500 - $1,500 (mid-range)", value: "mid" },
      { label: "$1,500 - $5,000 (comfortable)", value: "comfort" },
      { label: "$5,000 - $15,000 (premium)", value: "premium" },
      { label: "Open-ended (luxury)", value: "luxury" },
    ], required: true },
    { id: "vibe", question: "What's your travel style?", type: "multi", options: [
      { label: "Culture & history", value: "culture" },
      { label: "Nature & adventure", value: "nature" },
      { label: "Food & culinary", value: "food" },
      { label: "Relaxation & wellness", value: "relax" },
      { label: "Nightlife & social", value: "nightlife" },
      { label: "Shopping & luxury", value: "shopping" },
      { label: "Family-friendly", value: "family" },
    ], required: true },
    { id: "travelers", question: "Who are you traveling with?", type: "select", options: [
      { label: "Solo", value: "solo" },
      { label: "Couple", value: "couple" },
      { label: "Family with kids", value: "family" },
      { label: "Friends (group)", value: "group" },
    ], required: true },
    { id: "pace", question: "What pace do you prefer?", type: "select", options: [
      { label: "Packed — see everything", value: "fast" },
      { label: "Balanced — must-sees + free time", value: "balanced" },
      { label: "Slow — deep immersion, few activities daily", value: "slow" },
      { label: "Open — plan only flights & first night", value: "open" },
    ], required: true, agentHint: "Create itinerary appropriate for this pace" },
    { id: "special", question: "Any special requirements?", type: "multi", options: [
      { label: "Dietary restrictions", value: "diet" },
      { label: "Accessibility needs", value: "accessibility" },
      { label: "Must-visit specific sites", value: "specific" },
      { label: "Working during trip (digital nomad)", value: "work" },
      { label: "Celebrating something (birthday, anniversary)", value: "celebration" },
    ], required: false },
  ],
  affiliates: [
    { name: "Booking.com", url: "https://www.booking.com", commission: "4-6%", category: "accommodation", tags: ["hotels", "apartments", "bookings"] },
    { name: "Klook", url: "https://www.klook.com", commission: "5-12%", category: "activities", tags: ["tours", "activities", "asia"] },
    { name: "Viator", url: "https://www.viator.com", commission: "8%", category: "tours", tags: ["tours", "excursions"] },
    { name: "Agoda", url: "https://www.agoda.com", commission: "4-7%", category: "accommodation", tags: ["hotels", "asia"] },
    { name: "Skyscanner", url: "https://www.skyscanner.com", commission: "$1-5/click", category: "flights", tags: ["flights", "comparison"] },
    { name: "GetYourGuide", url: "https://www.getyourguide.com", commission: "10%", category: "activities", tags: ["tours", "activities", "worldwide"] },
    { name: "Discover Cars", url: "https://www.discovercars.com", commission: "8-15%", category: "car-rental", tags: ["car-rental", "transport"] },
  ],
  sampleOutput: {
    itinerary: [
      { day: 1, title: "Arrival & City Immersion", meals: { breakfast: "Hotel included", lunch: "Local spot: Hidden alley ramen", dinner: "Rooftop bar with sunset views" }, activities: ["Check in & freshen up", "Self-guided walking tour of old quarter", "Visit observation deck", "Neighborhood exploration"], estimatedCost: 45 },
      { day: 2, title: "Nature & Culture", meals: { breakfast: "Café hopping (local coffee + pastry)", lunch: "Picnic at the gardens", dinner: "Street food tour" }, activities: ["Morning hike / nature walk", "Temple visit (skip-the-line via Klook)", "Local cooking class", "Night market"], estimatedCost: 72 },
      { day: 3, title: "Adventure & Departure", meals: { breakfast: "Smoothie bowl café", lunch: "Seaside restaurant", dinner: "Airport lounge" }, activities: ["Snorkeling / water sports", "Last-minute souvenir shopping", "Cultural show or spa treatment", "Airport transfer"], estimatedCost: 95 },
    ],
    totalEstimatedCost: 350,
    tips: ["Book attractions on Klook 48h ahead for 15% discount", "Buy local SIM upon arrival ($8 vs $20 roaming)", "The food tour on Day 2 is rated 4.9/5 — book early"],
  },
  scoring: [
    { name: "PAIN VOLUME", weight: 0.2, currentScore: 8 },
    { name: "REVENUE SPEED", weight: 0.2, currentScore: 8 },
    { name: "AFFILIATE MATURITY", weight: 0.2, currentScore: 9 },
    { name: "DATA AVAILABILITY", weight: 0.15, currentScore: 7 },
    { name: "BUILD EFFORT", weight: 0.1, currentScore: 5 },
    { name: "STRATEGIC FIT", weight: 0.15, currentScore: 8 },
  ],
  tam: "$1.4-4.8B",
  cagr: "11-18%",
  competition: "Fragmented",
};

// ──────────────────────────────────────────
// MASTER EXPORT
// ──────────────────────────────────────────

export const allCategories: Record<string, CategoryData> = {
  "meal-planning": mealPlanning,
  "personal-finance": personalFinance,
  solopreneur,
  travel,
};

export function getCategory(slug: string): CategoryData | undefined {
  return allCategories[slug];
}

export function scoreCategory(data: CategoryData): number {
  return data.scoring.reduce((sum, f) => sum + f.currentScore * f.weight * 10, 0);
}
