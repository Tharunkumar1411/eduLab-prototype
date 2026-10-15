import React, { useState } from 'react';
import {
  calculateExpenseRatioDrag,
} from '../../../data/mutualFundsData.ts';
import {
  ArrowLeft,
  ArrowRight,
  TrendingDown,
  Percent,
  AlertTriangle,
  Scale,
  Sparkles,
  HelpCircle,
  Award,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';

interface Level4RiskAndFeesProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type TabType = 'ter_drag_simulator' | 'two_funds_dilemma' | 'reflection' | 'completed';

export const Level4RiskAndFees: React.FC<Level4RiskAndFeesProps> = ({ onComplete, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('ter_drag_simulator');

  // --- Part 1: TER Drag Simulator State ---
  const [corpusAmount, setCorpusAmount] = useState<number>(500000);
  const [investmentYears, setInvestmentYears] = useState<number>(15);

  const simulationData = calculateExpenseRatioDrag(corpusAmount, investmentYears, 12);
  const finalYearData = simulationData[simulationData.length - 1];

  // --- Part 2: Two Funds Dilemma State ---
  const [selectedInspectionCard, setSelectedInspectionCard] = useState<string | null>(null);
  const [chosenFundDecision, setChosenFundDecision] = useState<string | null>(null);

  // --- Reflection State ---
  const [reflectionChoice, setReflectionChoice] = useState<string | null>(null);

  const handleFinishLevel = () => {
    setActiveTab('completed');
    onComplete(250);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Mutual Funds Hub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-teal-400">Level 4 of 5</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">Risk, Fees & Fund Comparison</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* ======================================================== */}
        {/* TAB 1: THE EXPENSE RATIO (TER) DRAG EXPERIMENT */}
        {/* ======================================================== */}
        {activeTab === 'ter_drag_simulator' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Percent className="w-3.5 h-3.5" />
                <span>Interactive Experiment 1: The Silent Fee Drag</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Why a 1.5% Fee Difference Is NOT "Trivial"
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every mutual fund charges a <strong>Total Expense Ratio (TER)</strong>, deducted silently from your NAV daily.
                Compare a <strong>Direct Plan (0.3% TER)</strong> against a <strong>Regular Plan (1.8% TER)</strong> over time:
              </p>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase">Initial Portfolio Corpus</span>
                  <span className="font-extrabold text-teal-300 font-mono-num text-sm">
                    ₹{corpusAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2000000}
                  step={100000}
                  value={corpusAmount}
                  onChange={(e) => setCorpusAmount(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹1 Lakh</span>
                  <span>₹10 Lakh</span>
                  <span>₹20 Lakh</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase">Compounding Horizon</span>
                  <span className="font-extrabold text-amber-300 font-mono-num text-sm">
                    {investmentYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={5}
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>25 Years</span>
                </div>
              </div>
            </div>

            {/* Side by Side Comparison Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Direct Plan (0.3% Fee)
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-num block">
                  ₹{finalYearData?.directPlanValue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400/80 font-medium">Net 11.7% Annual Return</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Regular Plan (1.8% Fee)
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono-num block">
                  ₹{finalYearData?.regularPlanValue.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-400/80 font-medium">Net 10.2% Annual Return</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/60 to-slate-950 border border-rose-500/40 space-y-1">
                <span className="text-[10px] text-rose-300 uppercase font-extrabold block">
                  Cumulative Wealth Lost in Fees
                </span>
                <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono-num block">
                  -₹{finalYearData?.cumulativeCostDifference.toLocaleString()}
                </span>
                <span className="text-[10px] text-rose-300/80 font-bold">
                  {Math.round((finalYearData?.cumulativeCostDifference / finalYearData?.directPlanValue) * 100)}% of your final wealth vanished!
                </span>
              </div>
            </div>

            {/* The Compounding Explanation Box */}
            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs sm:text-sm text-teal-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Why Does a 1.5% Fee Eat 20%+ of Your Wealth?</span>
              </div>
              <p className="leading-relaxed opacity-95">
                Because fees are deducted <strong>every single year from your entire accumulated corpus</strong>,
                not just from your profits. The money paid in fees would have compounded over future decades.
                Over a 15-to-20-year investing journey, switching from Regular to Direct can save you enough money to buy a brand new car!
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('two_funds_dilemma')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Experiment 2: Two Funds, One Decision</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: TWO FUNDS, ONE DECISION */}
        {/* ======================================================== */}
        {activeTab === 'two_funds_dilemma' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Scale className="w-3.5 h-3.5" />
                <span>Interactive Experiment 2: The Past-Returns Trap</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Fund Alpha vs Fund Beta: Look Beyond the Billboard Return
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Retail investors often make the mistake of sorting mutual fund lists by "1-Year Return" and picking #1.
                Inspect the forensic cards below to uncover the hidden trade-offs:
              </p>
            </div>

            {/* Two Funds Comparison Table Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fund Alpha Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-100">Fund Alpha</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 font-bold border border-amber-500/30">
                    High Momentum
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">1-Year Headline Return:</span>
                    <span className="font-black text-emerald-400 font-mono-num">+34.2% (Dazzling!)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Total Expense Ratio (TER):</span>
                    <span className="font-bold text-rose-400 font-mono-num">2.20% (High Fee Drag)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Total Stocks Held:</span>
                    <span className="font-bold text-slate-200">22 Stocks (Concentrated)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Top 5 Holdings Weight:</span>
                    <span className="font-bold text-amber-400 font-mono-num">58.4% (Heavy Bet)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">SEBI Riskometer:</span>
                    <span className="font-bold text-rose-400">Very High Risk</span>
                  </div>
                </div>
              </div>

              {/* Fund Beta Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-100">Fund Beta</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 font-bold border border-teal-500/30">
                    Diversified Compounder
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">1-Year Headline Return:</span>
                    <span className="font-bold text-slate-200 font-mono-num">+18.5% (Steady)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Total Expense Ratio (TER):</span>
                    <span className="font-bold text-emerald-400 font-mono-num">0.35% (Ultra Low)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Total Stocks Held:</span>
                    <span className="font-bold text-slate-200">65 Stocks (Diversified)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Top 5 Holdings Weight:</span>
                    <span className="font-bold text-slate-300 font-mono-num">24.1% (Resilient)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">SEBI Riskometer:</span>
                    <span className="font-bold text-teal-300">Moderate / High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clickable Forensic Clue Cards */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Click to inspect forensic trade-offs:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  {
                    id: 'card_cycle',
                    title: '1. Mean Reversion & Past Return Traps',
                    desc: 'A fund that gains 34% in 1 year often took speculative sector bets. When that sector cools down, top funds frequently sink to the bottom quartile in subsequent years.',
                  },
                  {
                    id: 'card_conc',
                    title: '2. Concentration Vulnerability (58.4%)',
                    desc: 'Fund Alpha has almost 60% of its capital in just 5 stocks. If 2 of those companies report accounting fraud or earnings misses, the NAV will plummet.',
                  },
                ].map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedInspectionCard(c.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedInspectionCard === c.id
                        ? 'bg-teal-950/40 border-teal-500 text-teal-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-slate-200 block mb-1">{c.title}</span>
                    <p className="line-clamp-3 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('reflection')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Level 4 Reflection Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: REFLECTION */}
        {/* ======================================================== */}
        {activeTab === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Level 4 Reflection</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Why Does SEBI Mandate the Warning: "Past Performance Is Not Indicative of Future Results"?
              </h2>
              <p className="text-sm text-slate-300">
                Consider the evidence you just examined in Level 4.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'ref_4_a',
                  text: 'Because past performance is usually fabricated by the AMC.',
                  isCorrect: false,
                  feedback: 'Incorrect! Historical NAV returns in India are audited and strictly regulated by SEBI. The numbers are factual; the mistake is assuming past market cycles will repeat identically.',
                },
                {
                  id: 'ref_4_b',
                  text: 'Because market cycles rotate, manager styles fall in and out of favor, and taking high risk can make a fund look brilliant temporarily right before a crash.',
                  isCorrect: true,
                  feedback: 'Spot on! A fund holding speculative momentum stocks looks like a genius during a bull run, but crashes hardest when the cycle turns. Sustainable wealth requires looking at risk-adjusted consistency, diversification, and low fee drag.',
                },
                {
                  id: 'ref_4_c',
                  text: 'Because mutual funds are prohibited from tracking indices.',
                  isCorrect: false,
                  feedback: 'Incorrect! Index funds specifically track market indices.',
                },
              ].map((opt) => {
                const isSelected = reflectionChoice === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setReflectionChoice(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs">
                        {isSelected ? (opt.isCorrect ? '✓' : '✕') : '○'}
                      </span>
                      <div className="space-y-1">
                        <p>{opt.text}</p>
                        {isSelected && (
                          <p className={`text-xs mt-2 ${opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {opt.feedback}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {reflectionChoice && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleFinishLevel}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  <span>Complete Level 4 & Claim +250 XP</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: COMPLETED */}
        {/* ======================================================== */}
        {activeTab === 'completed' && (
          <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-100">
                Level 4 Mastered!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                You now recognize the compounding drag of Expense Ratios (TER) and know why looking solely at 1-year past returns is an analytical trap.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-sm">
              <Award className="w-4 h-4" />
              <span>+250 XP Earned</span>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm cursor-pointer"
              >
                Return to Mutual Funds Journey
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
