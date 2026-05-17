"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Check, Sparkles, ShoppingCart, Utensils, Clock, Users, DollarSign,
  Share2, Save, Mail, Loader2, Sun, Moon, Apple, Heart, Star, Zap,
} from "lucide-react";

// ────────────────────────────────────
// Data
// ────────────────────────────────────

const QUESTIONS = [
  { id: "diet", label: "What's your dietary preference?", type: "select" as const, options: [
    { label: "\u{1F96C} Balanced", value: "balanced" }, { label: "\u{1F966} Vegetarian", value: "vegetarian" },
    { label: "\u{1F331} Vegan", value: "vegan" }, { label: "\u{1F951} Keto", value: "keto" },
    { label: "\u{1F41F} Pescatarian", value: "pescatarian" }, { label: "\u{1FAD2} Mediterranean", value: "mediterranean" },
    { label: "\u{1F969} Paleo", value: "paleo" }, { label: "\u{1F33E} Gluten-free", value: "gluten-free" },
  ]},
  { id: "cuisine", label: "What cuisine vibe are you in the mood for?", type: "select" as const, options: [
    { label: "🍣 Asian", value: "asian" }, { label: "🍝 Italian", value: "italian" },
    { label: "🌮 Mexican", value: "mexican" }, { label: "🥙 Middle Eastern", value: "middle-eastern" },
    { label: "🍔 American", value: "american" }, { label: "🍋 Mediterranean", value: "mediterranean" },
    { label: "🍜 Fusion", value: "fusion" },
  ]},
  { id: "allergies", label: "Any food allergies?", type: "multi" as const, options: [
    { label: "\u2705 None", value: "none" }, { label: "\u{1F95B} Dairy", value: "dairy" },
    { label: "\u{1F95C} Nuts", value: "nuts" }, { label: "\u{1F990} Shellfish", value: "shellfish" },
    { label: "\u{1F95A} Eggs", value: "eggs" }, { label: "\u{1FAD6} Soy", value: "soy" },
  ]},
  { id: "people", label: "How many people are you cooking for?", type: "number" as const },
  { id: "goal", label: "What's your primary nutrition goal?", type: "select" as const, options: [
    { label: "\u2696\uFE0F Weight loss", value: "weight-loss" }, { label: "\u{1F4AA} Muscle gain", value: "muscle-gain" },
    { label: "\u2764\uFE0F General health", value: "maintenance" }, { label: "\u26A1 More energy", value: "energy" },
    { label: "\u{1F33F} Better digestion", value: "digestion" }, { label: "\u{1F4B0} Budget-friendly", value: "budget" },
  ]},
  { id: "cookTime", label: "How much time per meal?", type: "select" as const, options: [
    { label: "\u23F1 \u226415 min", value: "15" }, { label: "\u23F1 30 min", value: "30" },
    { label: "\u23F1 45 min", value: "45" }, { label: "\u{1F373} 1 hr+", value: "60" },
  ]},
  { id: "pantry", label: "Pantry ingredients? (Optional)", type: "text" as const },
  { id: "budget", label: "Weekly grocery budget?", type: "select" as const, options: [
    { label: "\u{1F4B0} Under $50", value: "budget-low" }, { label: "\u{1F4B0} $50-$100", value: "budget-medium" },
    { label: "\u{1F4B0} $100-$150", value: "budget-high" }, { label: "\u{1F48E} No limit", value: "budget-unlimited" },
  ]},
];

const SAMPLE_WEEK = [
  { day: "Mon", meals: { Breakfast: "Overnight oats with berries & almond butter", Lunch: "Quinoa bowl with roasted veggies & tahini", Dinner: "Lemon herb chicken with asparagus & sweet potato", Snack: "Greek yogurt with honey & walnuts" }, cals: 1850, cost: 12 },
  { day: "Tue", meals: { Breakfast: "Green smoothie (spinach, banana, protein)", Lunch: "Leftover quinoa bowl", Dinner: "Salmon with mango salsa & coconut rice", Snack: "Apple slices with almond butter" }, cals: 1780, cost: 14 },
  { day: "Wed", meals: { Breakfast: "Avocado toast with poached egg", Lunch: "Mediterranean wrap with hummus & falafel", Dinner: "Turkey chili with avocado & cornbread", Snack: "Carrot sticks with hummus" }, cals: 1910, cost: 11 },
  { day: "Thu", meals: { Breakfast: "Egg muffins with veggies & cheese", Lunch: "Leftover chili with rice", Dinner: "Stir-fried tofu with broccoli & brown rice", Snack: "Handful of almonds" }, cals: 1650, cost: 9 },
  { day: "Fri", meals: { Breakfast: "Acai bowl with granola & banana", Lunch: "Caprese panini with basil", Dinner: "Homemade pizza night (cauliflower crust)", Snack: "Cucumber slices with tzatziki" }, cals: 1950, cost: 15 },
  { day: "Sat", meals: { Breakfast: "Fluffy pancakes with berries & maple syrup", Lunch: "Buddha bowl (sweet potato, chickpeas, tahini)", Dinner: "Steak with chimichurri & roasted potatoes", Snack: "Frozen grapes & pistachios" }, cals: 2100, cost: 18 },
  { day: "Sun", meals: { Breakfast: "Veggie frittata with side salad", Lunch: "Leftover steak salad", Dinner: "Meal prep Sunday", Snack: "Chia pudding with mango" }, cals: 1720, cost: 10 },
];

const GROCERY_ITEMS = [
  { cat: "Produce", items: ["Spinach (2 bags)", "Mixed greens", "Avocados (3)", "Lemons (4)", "Berries (frozen, 1 bag)", "Bananas (3)", "Sweet potatoes (4)", "Asparagus bunch", "Broccoli head", "Bell peppers (3)"] },
  { cat: "Protein", items: ["Chicken breast (2 lbs)", "Salmon fillets (4)", "Eggs (1 dozen)", "Greek yogurt (32 oz)", "Tofu (1 block)", "Canned black beans (2)"] },
  { cat: "Pantry", items: ["Rolled oats", "Quinoa (1 bag)", "Brown rice", "Almond butter", "Olive oil", "Tahini", "Honey / maple syrup", "Spices (cumin, paprika, garlic powder)"] },
  { cat: "Dairy", items: ["Milk (1 gallon)", "Feta cheese", "Parmesan"] },
];

const AGENT_THOUGHTS = [
  "\u{1F9E0} Analyzing your dietary preferences...",
  "\u{1F9E0} Cross-referencing nutritional requirements...",
  "\u{1F9E0} Optimizing for your budget...",
  "\u{1F9E0} Building weekly plan from your ingredients...",
  "\u{1F9E0} Finding smart substitutions & alternatives...",
  "\u2728 Finalizing your personalized meal plan!",
];

const MEAL_KEYS = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
const MEAL_ICONS = { Breakfast: Sun, Lunch: Utensils, Dinner: Moon, Snack: Apple } as const;
const CAT_EMOJIS: Record<string, string> = { Produce: "\u{1F96C}", Protein: "\u{1F969}", Pantry: "\u{1F36B}", Dairy: "\u{1F95B}" };

const SUBSTITUTIONS = [
  { i: "Quinoa", s: "Brown rice, couscous, or cauliflower rice" },
  { i: "Almond butter", s: "Peanut butter, sunflower seed butter, or tahini" },
  { i: "Kale", s: "Spinach, Swiss chard, or mixed greens" },
  { i: "Coconut milk", s: "Oat milk, unsweetened almond milk, or regular milk" },
  { i: "Sweet potatoes", s: "Butternut squash, carrots, or pumpkin" },
];

const UGC_TESTIMONIALS = [
  { name: "Sarah M.", text: "Saved $187 on groceries this month! 90 seconds vs 4 hours.", saved: "$187/mo", avatar: "SM" },
  { name: "Mike T.", text: "The pantry scan feature is genius. No more buying what I already have.", saved: "$94/mo", avatar: "MT" },
  { name: "Jessica L.", text: "Finally an app that gets my family's different dietary needs.", saved: "5 hrs/wk", avatar: "JL" },
  { name: "David K.", text: "Budget slider changed my life. Saved $200+ in two weeks.", saved: "$200+/mo", avatar: "DK" },
];

// ────────────────────────────────────
// Confetti
// ────────────────────────────────────
function Confetti() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    for (let i = 0; i < 50; i++) {
      const e = document.createElement("div");
      const size = 5 + Math.random() * 8;
      e.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-10px;width:${size}px;height:${size}px;background:${
        ["#7C3AED","#10B981","#3B82F6","#F59E0B","#EF4444"][Math.floor(Math.random()*5)]
      };border-radius:${Math.random()>.5?"50%":"2px"};animation:confetti-fall ${
        2+Math.random()*2}s ease-out ${Math.random()}s forwards;transform:rotate(${Math.random()*360}deg)`;
      c.appendChild(e);
    }
    return () => { c.innerHTML = ""; };
  }, []);
  return <div ref={ref} className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />;
}

// ────────────────────────────────────
// Chart components
// ────────────────────────────────────
function CostBreakdownChart({ weeklyTotal }: { weeklyTotal: number }) {
  const items = [
    { label: "Groceries", value: 74, emoji: "\u{1F36B}", color: "#10B981" },
    { label: "Produce", value: 45, emoji: "\u{1F96C}", color: "#3B82F6" },
    { label: "Protein", value: 52, emoji: "\u{1F969}", color: "#F59E0B" },
    { label: "Pantry", value: 38, emoji: "\u{1F9C2}", color: "#7C3AED" },
  ];
  const total = items.reduce((s, i) => s + i.value, 0);
  let cum = 0;
  const arcs = items.map(item => {
    const start = (cum / total) * 360;
    cum += item.value;
    const end = (cum / total) * 360;
    const startR = ((start - 90) * Math.PI) / 180;
    const endR = ((end - 90) * Math.PI) / 180;
    const x1 = 50 + 40 * Math.cos(startR);
    const y1 = 50 + 40 * Math.sin(startR);
    const x2 = 50 + 40 * Math.cos(endR);
    const y2 = 50 + 40 * Math.sin(endR);
    const large = end - start > 180 ? 1 : 0;
    return { ...item, path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${large} 1 ${x2} ${y2} Z` };
  });
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 100" className="w-40 h-40">
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.color} className="hover:opacity-80 transition-opacity" />
        ))}
        <circle cx="50" cy="50" r="20" fill="white" />
        <text x="50" y="47" textAnchor="middle" className="text-[10px] font-bold" fill="#1A1A2E">${weeklyTotal}</text>
        <text x="50" y="57" textAnchor="middle" className="text-[6px]" fill="#6B7280">total</text>
      </svg>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
        {arcs.map((a, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:a.color}} />
            <span className="text-ink/50">{a.emoji} {a.label}</span>
            <span className="font-medium text-ink">${a.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyNutritionBar() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const cals = [1850, 1780, 1910, 1650, 1950, 2100, 1720];
  const max = Math.max(...cals);
  return (
    <div>
      <div className="flex items-end justify-between gap-1.5 h-28">
        {days.map((d, i) => (
          <div key={d} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full rounded-t-md bg-gradient-to-t from-meal/40 to-meal transition-all duration-500 hover:opacity-80"
              style={{ height: `${(cals[i]/max)*100}%`, minHeight: "8px" }} />
            <span className="text-[9px] text-ink/50 font-medium">{d}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[9px] text-ink/50">
        <span>1,650</span>
        <span>2,100</span>
      </div>
    </div>
  );
}
// ────────────────────────────────────
// Main Component
// ────────────────────────────────────
export default function InteractiveMealPlanning() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [qIdx, setQIdx] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [genThought, setGenThought] = useState(0);
  const [genDone, setGenDone] = useState(false);
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState<{ role: string; text: string }[]>([]);
  const [liveMode, setLiveMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likedMeals, setLikedMeals] = useState<Set<string>>(new Set());
  const [showShopping, setShowShopping] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const currentQ = QUESTIONS[qIdx];
  const isQuestionStep = step >= 1 && step <= 8;

  const progressPct = isQuestionStep ? ((qIdx + 1) / 8) * 100 : step === 8 ? 85 : step === 9 ? 92 : step === 10 ? 100 : 0;

  const DAY_PHOTOS = [
    "1490645935967-10de6ba17061",
    "1546069901-ba9599a7e63c",
    "1504674900247-0877df9cc836",
    "1565299624946-b28f40a0ae38",
    "1567620905732-2d1ec7ab7445",
    "1482049995570-408f7c3f7f30",
    "1490645935967-10de6ba17061",
  ];

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }, [step, qIdx]);

  const upd = (id: string, val: string | string[]) => setAnswers(p => ({ ...p, [id]: val }));

  const toggleM = (id: string, val: string) => {
    const cur = (answers[id] as string[]) || [];
    if (val === "none") { upd(id, ["none"]); return; }
    const f = cur.filter(v => v !== "none");
    upd(id, f.includes(val) ? f.filter(v => v !== val) : [...f, val]);
  };

  const next = () => {
    if (step === 0) { setStep(1); return; }
    if (isQuestionStep) {
      if (qIdx < QUESTIONS.length - 1) { setQIdx(i => i + 1); return; }
      setStep(8); setGenThought(0); setGenDone(false); return;
    }
    setStep(s => Math.min(s + 1, 10));
  };

  const prev = () => {
    if (isQuestionStep && qIdx > 0) { setQIdx(i => i - 1); return; }
    if (isQuestionStep && qIdx === 0) { setStep(0); return; }
    setStep(s => Math.max(s - 1, 0));
  };

  const canGo = (): boolean => {
    if (!isQuestionStep) return true;
    const q = QUESTIONS[qIdx];
    if (q.type === "multi") return (answers[q.id] as string[] || []).length > 0;
    if (q.type === "number") { const v = answers[q.id] as string; return v !== undefined && v !== "" && parseInt(v) > 0; }
    if (q.type === "text") return true;
    return answers[q.id] !== undefined && answers[q.id] !== "";
  };

  useEffect(() => {
    if (step !== 8) return;
    if (genThought < AGENT_THOUGHTS.length - 1) {
      const t = setTimeout(() => setGenThought(g => g + 1), 800);
      return () => clearTimeout(t);
    }
    if (!genDone) {
      const t = setTimeout(() => { setGenDone(true); setShowConfetti(true); setTimeout(() => setShowConfetti(false), 4000); }, 1200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(9), 700);
    return () => clearTimeout(t);
  }, [step, genThought, genDone]);

  const handleSave = () => {
    localStorage.setItem("cofounder-meal-plan", JSON.stringify({ answers, plan: SAMPLE_WEEK, date: new Date().toISOString() }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChatSend = () => {
    if (!chatMsg.trim()) return;
    setChatLog(l => [...l, { role: "user", text: chatMsg }, { role: "ai", text: "Great idea! Swap quinoa with cauliflower rice - saves 120 cal and $0.50/serving. Your weekly cost drops to $127!" }]);
    setChatMsg("");
  };

  const shareLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {}
  };

  const toggleLike = (mealKey: string) => {
    const newLiked = new Set(likedMeals);
    if (newLiked.has(mealKey)) { newLiked.delete(mealKey); }
    else { newLiked.add(mealKey); }
    setLikedMeals(newLiked);
  };

  const toggleGroceryItem = (item: string) => {
    const c = new Set(checkedItems);
    if (c.has(item)) c.delete(item); else c.add(item);
    setCheckedItems(c);
  };

  const weeklyTotal = SAMPLE_WEEK.reduce((s, d) => s + d.cost, 0);
  const avgCals = Math.round(SAMPLE_WEEK.reduce((s, d) => s + d.cals, 0) / 7);

  return (
    <div className="min-h-screen bg-cream" ref={topRef}>
      {showConfetti && <Confetti />}

      {/* FOOD PHOTOGRAPHY HEADER */}
      <div className="relative h-32 sm:h-44 overflow-hidden bg-gradient-to-b from-meal/40 to-transparent">
        <div className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&h=400&fit=crop)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-meal/20" />
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="absolute top-4 left-[12%] text-2xl food-float">{'\u{1F957}'}</span>
          <span className="absolute top-3 right-[18%] text-3xl food-float" style={{animationDelay:"-1.5s"}}>{'\u{1F363}'}</span>
          <span className="absolute bottom-6 left-[25%] text-xl food-float" style={{animationDelay:"-3s"}}>{'\u{1F951}'}</span>
          <span className="absolute bottom-8 right-[22%] text-2xl food-float" style={{animationDelay:"-4.5s"}}>{'\u{1F35D}'}</span>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      {step === 0 && (
        <div className="bg-white/80 border-b border-border/30 py-2">
          <div className="section-container flex items-center justify-center gap-4 sm:gap-8 text-[10px] text-ink/50">
            <span className="flex items-center gap-1"><Check size={10} className="text-meal" /> Dietitian-approved</span>
            <span className="flex items-center gap-1"><Star size={10} className="text-highlight fill-highlight" /> 10K+ plans</span>
            <span className="flex items-center gap-1"><Users size={10} className="text-meal" /> 1,247 families</span>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {step > 0 && (
        <div className="fixed top-0 left-0 right-0 z-40 h-1.5 bg-white/80 backdrop-blur-sm border-b border-border/50">
          <div className="h-full bg-gradient-to-r from-meal to-accent rounded-r-full transition-all duration-500 ease-out" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      <div className="section-container section-padding">
        {/* ==================== WELCOME (Step 0) ==================== */}
        {step === 0 && (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-meal/10 mb-6 animate-scale-in">
                <span className="text-4xl food-float">{'\u{1F957}'}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4 tracking-tight">
                Get Your <span className="text-meal">Personalized</span> Meal Plan
              </h1>
              <p className="text-lg text-ink/70 leading-relaxed mb-8">
                Stop wondering what&apos;s for dinner. Answer a few questions and let our AI build a weekly plan tailored to your diet, budget, and pantry.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-10">
                {[
                  { icon: Users, label: "Diet-aware" }, { icon: DollarSign, label: "Budget-savvy" },
                  { icon: Clock, label: "Time-smart" }, { icon: ShoppingCart, label: "Waste-free" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="card p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-meal/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-meal" />
                    </div>
                    <span className="text-xs font-medium text-ink">{label}</span>
                  </div>
                ))}
              </div>
              <button onClick={next} className="btn-primary text-base px-8 py-3.5 rounded-2xl shadow-md">
                Start {String.fromCharCode(8594)} <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-8 flex items-center justify-center gap-4 text-xs text-ink/50">
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> Dietitian-approved</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 10K+ plans generated</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== UGC TESTIMONIAL ROTATOR ==================== */}
        {step === 0 && (
          <div className="mt-8 mb-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-muted uppercase tracking-widest">{'\u{1F4F8}'} What users say</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {UGC_TESTIMONIALS.map((t,i) => (
                <div key={i} className="flex-shrink-0 w-[250px] bg-white rounded-2xl p-3 border border-border/30 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-meal to-accent flex items-center justify-center text-[10px] font-bold text-white">{t.avatar}</div>
                    <span className="text-xs font-semibold text-ink">{t.name}</span>
                    <Star size={10} className="text-highlight fill-highlight ml-auto" />
                  </div>
                  <p className="text-xs text-ink/70 leading-relaxed">{'\u201C'}{t.text}{'\u201D'}</p>
                  <span className="inline-block mt-1 text-[10px] font-medium text-meal">{t.saved}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* ==================== QUESTIONS (Steps 1-7) ==================== */}
        {isQuestionStep && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center animate-slide-up">
            <div className="w-full max-w-md mx-auto">
              <div className="flex items-center justify-center gap-1.5 mb-8">
                {QUESTIONS.map((_, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === qIdx ? "bg-meal w-6" : idx < qIdx ? "bg-meal/40" : "bg-muted/20"}`} />
                ))}
              </div>
              <div className="mb-1"><span className="text-xs font-semibold text-meal tracking-wider uppercase">Step {qIdx + 1} of {QUESTIONS.length}</span></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-8 leading-tight">{currentQ.label}</h2>

              {currentQ.type === "select" && currentQ.options && (
                <div className="grid gap-2.5">
                  {currentQ.options.map(opt => {
                    const sel = answers[currentQ.id] === opt.value;
                    return (
                      <button key={opt.value} onClick={() => upd(currentQ.id, opt.value)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 ${
                          sel ? "border-meal bg-meal/5 shadow-sm" : "border-border bg-white hover:border-meal/30 hover:bg-meal/[0.02]"
                        }`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${sel ? "text-meal" : "text-ink"}`}>{opt.label}</span>
                          {sel && <Check className="w-5 h-5 text-meal" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQ.type === "multi" && currentQ.options && (
                <div className="grid gap-2.5">
                  {currentQ.options.map(opt => {
                    const arr = (answers[currentQ.id] as string[]) || [];
                    const sel = arr.includes(opt.value);
                    return (
                      <button key={opt.value} onClick={() => toggleM(currentQ.id, opt.value)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 ${
                          sel ? "border-meal bg-meal/5 shadow-sm" : "border-border bg-white hover:border-meal/30 hover:bg-meal/[0.02]"
                        }`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${sel ? "text-meal" : "text-ink"}`}>{opt.label}</span>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${sel ? "border-meal bg-meal text-white" : "border-muted/40"}`}>
                            {sel && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  <p className="text-xs text-ink/50 mt-1">Select all that apply</p>
                </div>
              )}

              {currentQ.type === "number" && (
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                  <input type="number" min="1" max="20" placeholder="2"
                    value={(answers[currentQ.id] as string) || ""}
                    onChange={e => upd(currentQ.id, e.target.value)}
                    className="input-field pl-12 text-lg py-3.5 rounded-2xl" autoFocus />
                </div>
              )}

              {currentQ.type === "text" && (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">{'\u{1F96C}'}</span>
                  <input type="text" placeholder="e.g. chicken breast, rice, eggs, spinach..."
                    value={(answers[currentQ.id] as string) || ""}
                    onChange={e => upd(currentQ.id, e.target.value)}
                    className="input-field pl-12 text-lg py-3.5 rounded-2xl" autoFocus />
                </div>
              )}

              <div className="flex items-center justify-between mt-10">
                <button onClick={prev} className="btn-ghost text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
                <button onClick={next} disabled={!canGo()} className="btn-primary rounded-2xl px-6 py-3">
                  {qIdx < QUESTIONS.length - 1 ? "Continue" : "Generate Plan"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== GENERATING (Step 8) ==================== */}
        {step === 8 && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
            <div className="text-center max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-meal/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Loader2 className="w-8 h-8 text-meal animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-ink mb-2">Cooking up your plan...</h2>
              <p className="text-sm text-ink/60 mb-8">Our AI is analyzing your preferences</p>
              <div className="space-y-2.5 text-left max-w-xs mx-auto">
                {AGENT_THOUGHTS.map((t, idx) => (
                  <div key={idx} className={`transition-all duration-500 ${idx <= genThought ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    <div className="bg-accent/5 border border-accent/10 rounded-2xl p-4 text-sm text-ink/70 italic">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* ==================== RESULTS (Step 9) ==================== */}
        {step === 9 && (
          <div className="animate-slide-up pb-20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-meal/10 mb-4">
                <Sparkles className="w-7 h-7 text-meal" />
              </div>
              <h2 className="text-3xl font-bold text-ink mb-2">Your Weekly Meal Plan</h2>
              <p className="text-muted text-sm">Tailored to your preferences</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-meal/10 text-meal text-xs font-medium hover:bg-meal/20 transition-all">
                <Save size={14} /> {saved ? "✓ Saved!" : "Save Plan"}
              </button>
              <button onClick={shareLink} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-all">
                <Share2 size={14} /> {copied ? "✓ Copied!" : "Share"}
              </button>
              <button onClick={() => setLiveMode(!liveMode)} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                liveMode ? "bg-meal text-white" : "bg-muted/10 text-muted hover:bg-muted/20"
              }`}>
                <Zap size={14} /> Live Mode {liveMode ? "ON" : "OFF"}
              </button>
              <button onClick={() => setShowShopping(!showShopping)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-highlight/10 text-highlight text-xs font-medium hover:bg-highlight/20 transition-all">
                <ShoppingCart size={14} /> Shopping List
              </button>
            </div>

            {/* Day tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-5 scrollbar-none">
              {SAMPLE_WEEK.map((d, idx) => (
                <button key={d.day} onClick={() => setSelectedDay(idx)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    idx === selectedDay ? "bg-meal text-white shadow-sm" : "bg-muted/10 text-muted hover:text-ink hover:bg-muted/20"
                  }`}>{d.day}</button>
              ))}
            </div>

            {/* Day meals card with photo background */}
            <div className="recipe-card mb-6">
              <div className="h-32 bg-cover bg-center opacity-30" style={{backgroundImage: `url(https://images.unsplash.com/photo-${DAY_PHOTOS[selectedDay]}?w=600&h=200&fit=crop)`}} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-ink">{SAMPLE_WEEK[selectedDay].day}</h3>
                  <span className="text-xs text-ink/50">{'\u{1F525}'} {SAMPLE_WEEK[selectedDay].cals} cal</span>
                </div>
                <div className="grid gap-3">
                  {MEAL_KEYS.map(key => {
                    const Icon = MEAL_ICONS[key];
                    const mealKey = SAMPLE_WEEK[selectedDay].day + "-" + key;
                    const isLiked = likedMeals.has(mealKey);
                    return (
                      <div key={key} className="flex items-start gap-3 p-3 rounded-xl bg-meal/[0.02] border border-border/40 group">
                        <div className="w-9 h-9 rounded-lg bg-meal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-meal" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-semibold text-meal uppercase tracking-wider">{key}</span>
                          <p className="text-sm text-ink mt-0.5 leading-relaxed">{(SAMPLE_WEEK[selectedDay].meals as any)[key]}</p>
                        </div>
                        <button onClick={() => toggleLike(mealKey)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                            isLiked ? "bg-rose-50 text-rose-500" : "opacity-0 group-hover:opacity-100 hover:bg-rose-50 text-muted"
                          }`}>
                          <Heart size={14} className={isLiked ? "fill-rose-500 text-rose-500 heart-pulse" : ""} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-meal" />
                  <span className="font-semibold text-sm text-ink">Cost Breakdown</span>
                </div>
                <CostBreakdownChart weeklyTotal={weeklyTotal} />
              </div>
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-meal" />
                  <span className="font-semibold text-sm text-ink">Daily Nutrition (avg)</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between"><span className="text-xs text-ink/50">Calories</span><span className="text-sm font-semibold text-ink">{avgCals.toLocaleString()}</span></div>
                  <div className="flex items-center justify-between"><span className="text-xs text-ink/50">Protein</span><span className="text-sm font-semibold text-ink">~95g</span></div>
                  <div className="flex items-center justify-between"><span className="text-xs text-ink/50">Fiber</span><span className="text-sm font-semibold text-ink">~28g</span></div>
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <DailyNutritionBar />
                  </div>
                </div>
              </div>
            </div>

            {/* Smart substitutions */}
            <div className="card p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{'\u{1F504}'}</span>
                <span className="font-semibold text-sm text-ink">Smart Substitutions</span>
              </div>
              <div className="grid gap-2">
                {SUBSTITUTIONS.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-meal font-medium">{s.i}</span>
                    <span className="text-ink/50">{'\u2192'}</span>
                    <span className="text-ink/70">{s.s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium upsell */}
            <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">{'\u{2728}'}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-ink mb-1">{'\u{1F451}'} Unlock Premium</h3>
                  <p className="text-sm text-ink/60 mb-3">Get personalized macro targets, export to PDF, unlimited substitutions, and priority support.</p>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-all">
                    Upgrade for $9/mo <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Affiliate links */}
            <div className="card p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{'\u{1F6D2}'}</span>
                <span className="font-semibold text-sm text-ink">Products We Love</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[{n:"Instant Pot Duo", p:"$89.99"}, {n:"Air Fryer XL", p:"$59.99"}, {n:"Meal Prep Containers", p:"$24.99"}, {n:"Vitamix Blender", p:"$349.99"}].map((p,i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/10">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm">{['\u{1F373}','\u{1F9C0}','\u{1F4E6}','\u{1F943}'][i]}</div>
                    <div><p className="font-medium text-ink">{p.n}</p><p className="text-muted truncate">{p.p}</p></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shopping List Modal */}
            {showShopping && (
              <div className="card p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-meal" />
                    <span className="font-semibold text-sm text-ink">Shopping List</span>
                  </div>
                  <button onClick={() => setShowShopping(false)} className="text-muted hover:text-ink">X</button>
                </div>
                <div className="grid gap-4">
                  {GROCERY_ITEMS.map((cat, ci) => (
                    <div key={ci}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span>{CAT_EMOJIS[cat.cat] || '\u{1F36B}'}</span>
                        <span className="text-xs font-semibold text-ink uppercase tracking-wider">{cat.cat}</span>
                      </div>
                      <div className="grid gap-1.5">
                        {cat.items.map((item, ii) => (
                          <label key={ii} className="flex items-center gap-2 cursor-pointer group">
                            <div onClick={() => toggleGroceryItem(item)}
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                checkedItems.has(item) ? "bg-meal border-meal text-white" : "border-muted/40 group-hover:border-meal/50"
                              }`}>
                              {checkedItems.has(item) && <Check className="w-3 h-3" />}
                            </div>
                            <span className={`text-xs ${checkedItems.has(item) ? "line-through text-muted" : "text-ink"}`}>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Mode Chat */}
            {liveMode && (
              <div className="card p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-meal" />
                  <span className="font-semibold text-sm text-ink">Live Mode</span>
                  <span className="bg-meal/10 text-meal text-[9px] font-bold px-1.5 py-0.5 rounded-full">CHANGING MEALS</span>
                </div>
                <div className="h-40 overflow-y-auto mb-3 space-y-2">
                  {chatLog.map((m,i) => (
                    <div key={i} className={`p-2 rounded-lg text-xs ${m.role === "user" ? "bg-meal/5 ml-6" : "bg-accent/5 mr-6"}`}>
                      <span className="font-semibold">{m.role === "user" ? "You" : "AI"}: </span>{m.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleChatSend()}
                    placeholder="Swap chicken with tofu..."
                    className="input-field flex-1 text-xs py-2 h-9" />
                  <button onClick={handleChatSend}
                    className="px-3 py-2 bg-meal text-white text-xs font-semibold rounded-xl hover:bg-emerald-600 transition-all">
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* ==================== SAVE/EMAIL (Step 10) ==================== */}
        {step === 10 && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="max-w-sm mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-meal/10 mb-5">
                <Mail className="w-8 h-8 text-meal" />
              </div>
              <h2 className="text-2xl font-bold text-ink mb-2">Plan Saved!</h2>
              <p className="text-sm text-ink/60 mb-6">Enter your email to receive future updates and new meal plans.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="you@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="input-field flex-1 text-sm py-3 h-11" />
                <button className="px-5 py-3 bg-accent text-white text-sm font-semibold rounded-2xl hover:bg-accent/90 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-ink/50 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
