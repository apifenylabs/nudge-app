'use client';

/**
 * BudgetMosaic
 *
 * Interactive budget allocation tool using the 50/30/20 rule.
 * - Enter after-tax income
 * - Visual breakdown: Needs (50%), Wants (30%), Savings/Debt (20%)
 * - Customize categories within each bucket
 * - localStorage persistence
 * - Comparison view: plan vs actual spending
 *
 * Fully self-contained — no Supabase required.
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'lifeos-budget-mosaic';

interface BudgetData {
  income: number;
  currency: string;
  needs: number;      // % actual
  wants: number;      // % actual
  savings: number;    // % actual
  customCategories: { name: string; amount: number; bucket: 'needs' | 'wants' | 'savings' }[];
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'HKD', 'SGD', 'JPY', 'AUD', 'CAD'];

const DEFAULT_DATA: BudgetData = {
  income: 5000,
  currency: 'USD',
  needs: 55,
  wants: 25,
  savings: 20,
  customCategories: [],
};

export default function BudgetMosaic() {
  const [data, setData] = useState<BudgetData>(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatAmount, setNewCatAmount] = useState(0);
  const [newCatBucket, setNewCatBucket] = useState<'needs' | 'wants' | 'savings'>('wants');
  const [activeTab, setActiveTab] = useState<'plan' | 'actual' | 'insights'>('plan');

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...DEFAULT_DATA, ...parsed });
      }
    } catch {}
    setLoaded(true);
  }, []);

  // Save to localStorage
  const save = useCallback((d: BudgetData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  }, []);

  const update = useCallback((patch: Partial<BudgetData>) => {
    setData(prev => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, [save]);

  // ── Derived values ──
  const needsTarget = data.income * 0.50;
  const wantsTarget = data.income * 0.30;
  const savingsTarget = data.income * 0.20;

  const needsActual = data.income * (data.needs / 100);
  const wantsActual = data.income * (data.wants / 100);
  const savingsActual = data.income * (data.savings / 100);

  const needsDelta = needsActual - needsTarget;
  const wantsDelta = wantsActual - wantsTarget;
  const savingsDelta = savingsActual - savingsTarget;

  const actualTotal = needsActual + wantsActual + savingsActual;
  const remaining = data.income - actualTotal;

  const formatCurrency = (n: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: data.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
  };

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* ── Income Input ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Monthly After-Tax Income</label>
          <div className="flex items-center gap-2">
            <select
              value={data.currency}
              onChange={e => update({ currency: e.target.value })}
              className="w-16 h-10 px-1.5 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="number"
              min={0}
              step={100}
              value={data.income}
              onChange={e => update({ income: Math.max(0, parseInt(e.target.value) || 0) })}
              className="flex-1 h-10 px-3 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Allocated</div>
          <div className={`text-lg font-bold ${Math.abs(remaining) < 50 ? 'text-emerald-600' : remaining > 0 ? 'text-amber-600' : 'text-rose-600'}`}>
            {formatCurrency(actualTotal)}
            <span className="text-xs font-normal text-gray-400 ml-1">/ {formatCurrency(data.income)}</span>
          </div>
          <div className={`text-[11px] ${Math.abs(remaining) < 50 ? 'text-emerald-500' : remaining > 0 ? 'text-amber-500' : 'text-rose-500'}`}>
            {remaining === 0 ? '✓ Balanced' : remaining > 0 ? `${formatCurrency(remaining)} unallocated` : `Over by ${formatCurrency(Math.abs(remaining))}`}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'plan' as const, label: '50/30/20 Plan' },
          { id: 'actual' as const, label: 'Your Budget' },
          { id: 'insights' as const, label: 'Insights' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-700'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Plan (50/30/20 Visual) ── */}
      {activeTab === 'plan' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            The <strong>50/30/20 rule</strong> (Sen. Elizabeth Warren): 50% of after-tax income on needs,
            30% on wants, 20% on savings and debt repayment.
          </p>

          {/* Visual bar */}
          <div className="h-6 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: '50%' }}>50%</div>
            <div className="bg-amber-400 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: '30%' }}>30%</div>
            <div className="bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: '20%' }}>20%</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-emerald-800">🏠 Needs</span>
                <span className="text-xs font-mono text-emerald-700">{formatCurrency(needsTarget)}</span>
              </div>
              <div className="text-[11px] text-emerald-600">Rent, utilities, groceries, insurance, minimum debt payments</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-amber-800">🎯 Wants</span>
                <span className="text-xs font-mono text-amber-700">{formatCurrency(wantsTarget)}</span>
              </div>
              <div className="text-[11px] text-amber-600">Dining, travel, hobbies, subscriptions, shopping</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-800">💰 Savings</span>
                <span className="text-xs font-mono text-blue-700">{formatCurrency(savingsTarget)}</span>
              </div>
              <div className="text-[11px] text-blue-600">Emergency fund, investments, extra debt payments, retirement</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Your Actual Budget ── */}
      {activeTab === 'actual' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500">
            Enter your actual spending percentages to see how you compare to the 50/30/20 guideline.
          </p>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-700">🏠 Needs: <span className="text-emerald-600 font-semibold">{data.needs}%</span></label>
                <span className={`text-[10px] font-mono ${needsDelta === 0 || Math.abs(needsDelta) < 50 ? 'text-emerald-500' : needsDelta > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {needsDelta === 0 || Math.abs(needsDelta) < 50 ? 'On track' : needsDelta > 0 ? `Over by ${formatCurrency(needsDelta)}` : `Under by ${formatCurrency(Math.abs(needsDelta))}`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={data.needs}
                onChange={e => update({ needs: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-700">🎯 Wants: <span className="text-amber-600 font-semibold">{data.wants}%</span></label>
                <span className={`text-[10px] font-mono ${wantsDelta === 0 || Math.abs(wantsDelta) < 50 ? 'text-emerald-500' : wantsDelta > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {wantsDelta === 0 || Math.abs(wantsDelta) < 50 ? 'On track' : wantsDelta > 0 ? `Over by ${formatCurrency(wantsDelta)}` : `Under by ${formatCurrency(Math.abs(wantsDelta))}`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={data.wants}
                onChange={e => update({ wants: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-700">💰 Savings & Debt: <span className="text-blue-600 font-semibold">{data.savings}%</span></label>
                <span className={`text-[10px] font-mono ${savingsDelta === 0 || Math.abs(savingsDelta) < 50 ? 'text-emerald-500' : savingsDelta > 0 ? 'text-emerald-500 text-blue-500' : 'text-rose-500'}`}>
                  {Math.abs(savingsDelta) < 50 ? 'On track' : savingsDelta > 0 ? `Over by ${formatCurrency(savingsDelta)}` : `Under by ${formatCurrency(Math.abs(savingsDelta))}`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={data.savings}
                onChange={e => update({ savings: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Visual comparison bar */}
            <div className="h-5 rounded-full overflow-hidden flex border border-gray-200">
              <div className="bg-emerald-400 flex items-center justify-center text-[10px] font-bold text-white transition-all" style={{ width: `${data.needs}%` }}>{data.needs}%</div>
              <div className="bg-amber-300 flex items-center justify-center text-[10px] font-bold text-white transition-all" style={{ width: `${data.wants}%` }}>{data.wants}%</div>
              <div className="bg-blue-400 flex items-center justify-center text-[10px] font-bold text-white transition-all" style={{ width: `${data.savings}%` }}>{data.savings}%</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Insights ── */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            How your spending compares to the 50/30/20 benchmark and what to adjust.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`rounded-xl p-4 border ${Math.abs(needsDelta) < 100 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Needs</div>
              <div className={`text-sm font-bold ${Math.abs(needsDelta) < 100 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {Math.abs(needsDelta) < 100 ? '✓ Healthy' : `⚠️ ${needsDelta > 0 ? 'Over budget' : 'Under'}`}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {Math.abs(needsDelta) < 100
                  ? '50% target is on track'
                  : needsDelta > 0
                    ? 'Needs exceed 50%. Review fixed costs for savings.'
                    : 'Needs under 50%. Great position!'
                }
              </div>
            </div>
            <div className={`rounded-xl p-4 border ${Math.abs(wantsDelta) < 100 ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200'}`}>
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Wants</div>
              <div className={`text-sm font-bold ${Math.abs(wantsDelta) < 100 ? 'text-amber-700' : 'text-rose-700'}`}>
                {Math.abs(wantsDelta) < 100 ? '✓ Balanced' : wantsDelta > 0 ? '⚠️ Over target' : 'Below target'}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {Math.abs(wantsDelta) < 100
                  ? 'Wants spending is within comfortable range'
                  : wantsDelta > 0
                    ? 'Wants eating into savings. Trim subscriptions/dining.'
                    : 'Less on wants means more for savings. Great!'
                }
              </div>
            </div>
            <div className={`rounded-xl p-4 border ${Math.abs(savingsDelta) < 50 ? 'bg-blue-50 border-blue-200' : Math.abs(savingsDelta) < 300 ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200'}`}>
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Savings</div>
              <div className={`text-sm font-bold ${Math.abs(savingsDelta) < 50 ? 'text-blue-700' : Math.abs(savingsDelta) < 300 ? 'text-amber-700' : 'text-rose-700'}`}>
                {Math.abs(savingsDelta) < 50 ? '✓ On track for 20%' : savingsDelta > 0 ? '🎉 Above target!' : '⚠️ Below 20%'}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {Math.abs(savingsDelta) < 50
                  ? 'Your savings rate meets the 20% guideline'
                  : savingsDelta > 0
                    ? 'You\'re saving more than 20% — building wealth fast'
                    : 'Try reducing "wants" by 5% to boost savings rate'
                }
              </div>
            </div>
          </div>

          {/* Quick assessment */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">📊 Budget Health Score</h4>
            <div className="flex items-center gap-3">
              {(() => {
                const needsOk = Math.abs(needsDelta) < 100;
                const wantsOk = Math.abs(wantsDelta) < 100;
                const savingsOk = Math.abs(savingsDelta) < 100;
                const score = [needsOk, wantsOk, savingsOk].filter(Boolean).length;
                return (
                  <>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      score >= 2 ? 'bg-emerald-100 text-emerald-700' : score === 1 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {score}/3
                    </div>
                    <div className="text-xs text-gray-500">
                      {score >= 2
                        ? 'Your budget is reasonably balanced. Small tweaks can optimize further.'
                        : score === 1
                          ? 'One area is strong. Focus on bringing the other two in line.'
                          : 'Your budget needs restructuring. Start with needs vs wants. External help recommended.'
                      }
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Quick tips */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-emerald-700 mb-2">💡 Quick Wins</h4>
            <ul className="space-y-1">
              <li className="flex items-center gap-2 text-[11px] text-emerald-800">
                <span className="text-emerald-500">→</span>
                Review recurring subscriptions — cancel what you haven't used in 30 days
              </li>
              <li className="flex items-center gap-2 text-[11px] text-emerald-800">
                <span className="text-emerald-500">→</span>
                Set up auto-transfer of 20% to savings on payday
              </li>
              <li className="flex items-center gap-2 text-[11px] text-emerald-800">
                <span className="text-emerald-500">→</span>
                One "no-spend" day per week reduces wants spending by ~15%
              </li>
            </ul>
          </div>

          {/* Reset */}
          <div className="text-right pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                update(DEFAULT_DATA);
                localStorage.removeItem(STORAGE_KEY);
              }}
              className="text-[10px] text-gray-400 hover:text-rose-500 transition-colors"
            >
              Reset budget data ↓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
