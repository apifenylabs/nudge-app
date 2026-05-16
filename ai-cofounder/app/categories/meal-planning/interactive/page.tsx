"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Check, Sparkles, ShoppingCart, Utensils, Clock, Users, DollarSign,
  Share2, Save, Mail, Loader2, Copy, MessageCircle, Sun, Moon, Apple, Heart, ShoppingBag, Zap, X,
} from "lucide-react";

// ────────────────────────────────────
// Data
// ────────────────────────────────────

const QUESTIONS = [
  { id: "diet", label: "What's your dietary preference?", type: "select" as const, options: [
    { label: "🥬 Balanced", value: "balanced" }, { label: "🥦 Vegetarian", value: "vegetarian" },
    { label: "🌱 Vegan", value: "vegan" }, { label: "🥑 Keto", value: "keto" },
    { label: "🐟 Pescatarian", value: "pescatarian" }, { label: "🫒 Mediterranean", value: "mediterranean" },
    { label: "🥩 Paleo", value: "paleo" }, { label: "🌾 Gluten-free", value: "gluten-free" },
  ]},
  { id: "allergies", label: "Any food allergies?", type: "multi" as const, options: [
    { label: "✅ None", value: "none" }, { label: "🥛 Dairy", value: "dairy" },
    { label: "🥜 Nuts", value: "nuts" }, { label: "🦐 Shellfish", value: "shellfish" },
    { label: "🥚 Eggs", value: "eggs" }, { label: "🫘 Soy", value: "soy" },
  ]},
  { id: "people", label: "How many people are you cooking for?", type: "number" as const },
  { id: "goal", label: "What's your primary nutrition goal?", type: "select" as const, options: [
    { label: "⚖️ Weight loss", value: "weight-loss" }, { label: "💪 Muscle gain", value: "muscle-gain" },
    { label: "❤️ General health", value: "maintenance" }, { label: "⚡ More energy", value: "energy" },
    { label: "🌿 Better digestion", value: "digestion" }, { label: "💰 Budget-friendly", value: "budget" },
  ]},
  { id: "cookTime", label: "How much time per meal?", type: "select" as const, options: [
    { label: "⏱ ≤15 min", value: "15" }, { label: "⏱ 30 min", value: "30" },
    { label: "⏱ 45 min", value: "45" }, { label: "🍳 1 hr+", value: "60" },
  ]},
  { id: "pantry", label: "Pantry ingredients? (Optional)", type: "text" as const },
  { id: "budget", label: "Weekly grocery budget?", type: "select" as const, options: [
    { label: "💰 Under $50", value: "budget-low" }, { label: "💰 $50–$100", value: "budget-medium" },
    { label: "💰 $100–$150", value: "budget-high" }, { label: "💎 No limit", value: "budget-unlimited" },
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
  "🧠 Analyzing your dietary preferences...",
  "🧠 Cross-referencing nutritional requirements...",
  "🧠 Optimizing for your budget...",
  "🧠 Building weekly plan from your ingredients...",
  "🧠 Finding smart substitutions & alternatives...",
  "✨ Finalizing your personalized meal plan!",
];

const MEAL_KEYS = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
const MEAL_ICONS = { Breakfast: Sun, Lunch: Utensils, Dinner: Moon, Snack: Apple } as const;
const CAT_EMOJIS: Record<string, string> = { Produce: "🥬", Protein: "🥩", Pantry: "🥫", Dairy: "🥛" };

const SUBSTITUTIONS = [
  { i: "Quinoa", s: "Brown rice, couscous, or cauliflower rice" },
  { i: "Almond butter", s: "Peanut butter, sunflower seed butter, or tahini" },
  { i: "Kale", s: "Spinach, Swiss chard, or mixed greens" },
  { i: "Coconut milk", s: "Oat milk, unsweetened almond milk, or regular milk" },
  { i: "Sweet potatoes", s: "Butternut squash, carrots, or pumpkin" },
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
  const topRef = useRef<HTMLDivElement>(null);

  const totalSteps = 8;
  const currentQ = QUESTIONS[qIdx];
  const isQuestionStep = step >= 1 && step <= 7;

  const progressPct = isQuestionStep ? ((qIdx + 1) / 7) * 100 : step === 8 ? 85 : step === 9 ? 92 : step === 10 ? 100 : 0;

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
    if (q.type === "text") return true; // optional
    return answers[q.id] !== undefined && answers[q.id] !== "";
  };

  // Generating animation
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
    setChatLog(l => [...l, { role: "user", text: chatMsg }, { role: "ai", text: "Great idea! Swap quinoa with cauliflower rice — saves 120 cal and $0.50/serving. Your weekly cost drops to $127!" }]);
    setChatMsg("");
  };

  const shareLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {}
  };

  const weeklyTotal = SAMPLE_WEEK.reduce((s, d) => s + d.cost, 0);
  const avgCals = Math.round(SAMPLE_WEEK.reduce((s, d) => s + d.cals, 0) / 7);

  return (
    <div className="min-h-screen bg-cream" ref={topRef}>
      {showConfetti && <Confetti />}

      {/* Progress bar — visible after welcome */}
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
                <span className="text-4xl">🥗</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4 tracking-tight">
                Get Your <span className="text-meal">Personalized</span> Meal Plan
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
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
                Start → <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-8 flex items-center justify-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> Dietitian-approved</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 10K+ plans generated</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== QUESTIONS (Steps 1–7) ==================== */}
        {isQuestionStep && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center animate-slide-up">
            <div className="w-full max-w-md mx-auto">
              {/* Step dots */}
              <div className="flex items-center justify-center gap-1.5 mb-8">
                {QUESTIONS.map((_, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === qIdx ? "bg-meal w-6" : idx < qIdx ? "bg-meal/40" : "bg-muted/20"}`} />
                ))}
              </div>
              <div className="mb-1"><span className="text-xs font-semibold text-meal tracking-wider uppercase">Step {qIdx + 1} of {QUESTIONS.length}</span></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-8 leading-tight">{currentQ.label}</h2>

              {/* Select */}
              {currentQ.type === "select" && currentQ.options && (
                <div className="grid gap-2.5">
                  {currentQ.options.map(opt => {
                    const sel = answers[currentQ.id] === opt.value;
                    return (
                      <button key={opt.value} onClick={() => upd(currentQ.id, opt.value)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 ${
                          sel ? "border-meal bg-meal/5 shadow-sm" : "border-border bg-white hover:border-meal/30 hover:bg-meal/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${sel ? "text-meal" : "text-ink"}`}>{opt.label}</span>
                          {sel && <Check className="w-5 h-5 text-meal" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Multi-select */}
              {currentQ.type === "multi" && currentQ.options && (
                <div className="grid gap-2.5">
                  {currentQ.options.map(opt => {
                    const arr = (answers[currentQ.id] as string[]) || [];
                    const sel = arr.includes(opt.value);
                    return (
                      <button key={opt.value} onClick={() => toggleM(currentQ.id, opt.value)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 ${
                          sel ? "border-meal bg-meal/5 shadow-sm" : "border-border bg-white hover:border-meal/30 hover:bg-meal/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${sel ? "text-meal" : "text-ink"}`}>{opt.label}</span>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${sel ? "border-meal bg-meal text-white" : "border-muted/40"}`}>
                            {sel && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  <p className="text-xs text-muted mt-1">Select all that apply</p>
                </div>
              )}

              {/* Number */}
              {currentQ.type === "number" && (
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                  <input type="number" min="1" max="20" placeholder="2"
                    value={(answers[currentQ.id] as string) || ""}
                    onChange={e => upd(currentQ.id, e.target.value)}
                    className="input-field pl-12 text-lg py-3.5 rounded-2xl" autoFocus />
                </div>
              )}

              {/* Text */}
              {currentQ.type === "text" && (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🥬</span>
                  <input type="text" placeholder="e.g. chicken breast, rice, eggs, spinach..."
                    value={(answers[currentQ.id] as string) || ""}
                    onChange={e => upd(currentQ.id, e.target.value)}
                    className="input-field pl-12 text-lg py-3.5 rounded-2xl" autoFocus />
                </div>
              )}

              {/* Nav */}
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
              <p className="text-sm text-muted mb-8">Our AI is analyzing your preferences</p>
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

            {/* Day tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-5 scrollbar-none">
              {SAMPLE_WEEK.map((d, idx) => (
                <button key={d.day} onClick={() => setSelectedDay(idx)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    idx === selectedDay ? "bg-meal text-white shadow-sm" : "bg-muted/10 text-muted hover:text-ink hover:bg-muted/20"
                  }`}
                >{d.day}</button>
              ))}
            </div>

            {/* Day meals card */}
            <div className="card p-6 mb-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-ink mb-5">{SAMPLE_WEEK[selectedDay].day}</h3>
              <div className="grid gap-3">
                {MEAL_KEYS.map(key => {
                  const Icon = MEAL_ICONS[key];
                  return (
                    <div key={key} className="flex items-start gap-3 p-3 rounded-xl bg-meal/[0.02] border border-border/40">
                      <div className="w-9 h-9 rounded-lg bg-meal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4.5 h-4.5 text-meal" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-meal uppercase tracking-wider">{key}</span>
                        <p className="text-sm text-ink mt-0.5 leading-relaxed">{(SAMPLE_WEEK[selectedDay].meals as any)[key]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cost + Nutrition row */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-meal" />
                  <span className="font-semibold text-sm text-ink">Weekly Cost</span>
                </div>
                <p className="text-2xl font-bold text-ink">${weeklyTotal}<span className="text-sm font-normal text-muted ml-1">total</span></p>
                <div className="mt-3 space-y-1.5 text-xs text-muted">
                  <div className="flex justify-between"><span>Groceries</span><span className="font-medium text-ink">$74</span></div>
                  <div className="flex justify-between"><span>Produce</span><span className="font-medium text-ink">$45</span></div>
                  <div className="flex justify-between"><span>Protein</span><span className="font-medium text-ink">$52</span></div>
                  <div className="flex justify-between"><span>Pantry</span><span className="font-medium text-ink">$38</span></div>
                </div>
              </div>
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-meal" />
                  <span className="font-semibold text-sm text-ink">Daily Nutrition (avg)</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Calories</span>
                    <span className="text-sm font-semibold text-ink">{avgCals.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Protein</span>
                    <span className="text-sm font-semibold text-ink">~95g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Fiber</span>
                    <span className="text-sm font-semibold text-ink">~28g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart substitutions */}
            <div className="card p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🔄</span>
                <span className="font-semibold text-sm text-ink">Smart Substitutions</span>
              </div>
              <div className="grid gap-2">
                {SUBSTITUTIONS.map(sub => (
                  <div key={sub.i} className="flex items-start gap-2 text-xs text-ink/70">
                    <span className="text-meal font-medium whitespace-nowrap">{sub.i}:</span>
                    <span>{sub.s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between">
              <button onClick={prev} className="btn-ghost text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
              <button onClick={next} className="btn-primary rounded-2xl px-6 py-3">
                Shopping List <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== SHOPPING LIST (Step 10) ==================== */}
        {step === 10 && (
          <div className="animate-slide-up pb-20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-ink">Your Shopping List</h2>
                <p className="text-sm text-muted mt-0.5">
                  {checkedItems.size}/{GROCERY_ITEMS.reduce((s, c) => s + c.items.length, 0)} checked
                </p>
              </div>
              <button onClick={prev} className="btn-ghost text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
            </div>

            {GROCERY_ITEMS.map(cat => (
              <div key={cat.cat} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{CAT_EMOJIS[cat.cat] || "🛒"}</span>
                  <h3 className="text-sm font-semibold text-ink">{cat.cat}</h3>
                  <span className="text-xs text-muted ml-auto">{cat.items.filter(i => checkedItems.has(i)).length}/{cat.items.length}</span>
                </div>
                <div className="space-y-1">
                  {cat.items.map(item => {
                    const ch = checkedItems.has(item);
                    return (
                      <button key={item} onClick={() => { const n = new Set(checkedItems); ch ? n.delete(item) : n.add(item); setCheckedItems(n); }}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all text-left ${
                          ch ? "bg-meal/5 opacity-60" : "card hover:shadow-sm"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          ch ? "bg-meal border-meal text-white" : "border-muted/30"
                        }`}>
                          {ch && <Check size={12} />}
                        </div>
                        <span className={`text-sm transition-all ${ch ? "line-through text-muted" : "text-ink"}`}>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Order buttons */}
            <div className="flex flex-col gap-3 mt-8">
              <button className="w-full py-3.5 rounded-2xl bg-meal text-white font-semibold text-sm hover:bg-meal/90 transition-all shadow-md flex items-center justify-center gap-2">
                <ShoppingBag size={16} /> Buy on Amazon Fresh →
              </button>
              <button className="w-full py-3.5 rounded-2xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-all shadow-md flex items-center justify-center gap-2">
                <ShoppingBag size={16} /> Buy on Instacart →
              </button>
            </div>
            <p className="text-xs text-muted text-center mt-3">Affiliate links. We may earn a commission at no extra cost to you.</p>

            {/* Save & Share */}
            <div className="flex gap-3 mt-8">
              <button onClick={handleSave} className="btn-primary flex-1 rounded-2xl">
                <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Plan"}
              </button>
              <button onClick={shareLink} className="btn-secondary flex-1 rounded-2xl">
                <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Share"}
              </button>
            </div>

            {/* Email capture */}
            <div className="card p-5 mt-6 bg-gradient-to-br from-accent/5 to-transparent">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Get weekly plans by email</p>
                  <p className="text-xs text-muted mt-0.5">Fresh personalized picks every Sunday.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" className="input-field text-sm rounded-xl flex-1" />
                <button className="btn-primary rounded-xl">Subscribe</button>
              </div>
            </div>

            {/* Premium upsell */}
            <div className="card p-5 mt-6 border-accent/20 bg-gradient-to-br from-accent/[0.03] to-accent/[0.06]">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">⚡ Upgrade for <span className="text-accent">$9/mo</span> — Custom substitutions, calorie tracking, family profiles, restaurant recommendations
                  </p>
                </div>
              </div>
              <Link href="/premium" className="btn-primary w-full justify-center rounded-2xl">
                Upgrade Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ──────────────────── FLOATING LIVE MODE ──────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {liveMode && (
          <div className="card w-80 shadow-xl rounded-2xl overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-meal to-accent p-4 text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Chef AI
                </span>
                <button onClick={() => setLiveMode(false)} className="text-white/70 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/70">Ask me anything about your meal plan</p>
            </div>
            <div className="p-3 max-h-52 overflow-y-auto space-y-2 bg-muted/10">
              {chatLog.length === 0 && (
                <p className="text-xs text-muted italic text-center py-2">Ask for substitutions or tweaks...</p>
              )}
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "card text-ink rounded-bl-md shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 border-t border-border">
              <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleChatSend()}
                placeholder="Substitute chicken with..."
                className="flex-1 text-xs px-3 py-2 rounded-xl bg-muted/10 border border-border focus:outline-none focus:ring-2 focus:ring-accent/20" />
              <button onClick={handleChatSend}
                className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 flex-shrink-0">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button onClick={() => setLiveMode(!liveMode)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            liveMode ? "bg-accent text-white" : "card hover:shadow-xl"
          }`}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
