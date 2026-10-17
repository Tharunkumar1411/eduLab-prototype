import React, { useState } from 'react';
import {
  LEVEL_3_SCENARIOS,
  GoalMatchingScenario,
} from '../../../data/mutualFundsData.ts';
import { CharacterMentor, CharacterState } from '../../character/CharacterMentor.tsx';
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Shield,
  Layers,
  Sparkles,
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  Scale,
} from 'lucide-react';

interface Level3MatchTheFundProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type TabType = 'categories_primer' | 'scenario_matcher' | 'active_vs_passive' | 'reflection' | 'completed';

export const Level3MatchTheFund: React.FC<Level3MatchTheFundProps> = ({ onComplete, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('categories_primer');
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submittedScenarios, setSubmittedScenarios] = useState<Record<string, string>>({});
  const [reflectionAnswer, setReflectionAnswer] = useState<string | null>(null);

  const currentScenario = LEVEL_3_SCENARIOS[scenarioIndex];
  const selectedOption = currentScenario.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    setSubmittedScenarios((prev) => ({
      ...prev,
      [currentScenario.id]: optId,
    }));
  };

  const handleNextScenario = () => {
    if (scenarioIndex < LEVEL_3_SCENARIOS.length - 1) {
      setScenarioIndex((prev) => prev + 1);
      setSelectedOptionId(submittedScenarios[LEVEL_3_SCENARIOS[scenarioIndex + 1].id] || null);
    } else {
      setActiveTab('active_vs_passive');
    }
  };

  const handleFinishLevel = () => {
    setActiveTab('completed');
    onComplete(200);
  };

  const mentorByTab: Record<TabType, { state: CharacterState; message: string; subMessage?: string }> = {
    categories_primer: {
      state: 'talking',
      message: 'Four main fund flavors: Equity, Debt, Hybrid, Index.',
      subMessage: 'Pick the one that matches the goal, not the headline return.',
    },
    scenario_matcher: {
      state: 'thinking',
      message: "Read each saver's goal and time horizon carefully.",
    },
    active_vs_passive: {
      state: 'surprised',
      message: 'Active managers hunt for alpha. Index funds just track the market cheaply.',
    },
    reflection: {
      state: 'thinking',
      message: 'One last question to lock the matching intuition in.',
    },
    completed: {
      state: 'celebrating',
      message: 'Fund-to-goal matching clicked. Level 3 done.',
    },
  };
  const mentor = mentorByTab[activeTab];

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
          <span className="text-teal-400">Level 3 of 5</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">Types of Mutual Funds</span>
        </div>
      </div>

      {/* Inspector Fin — Level Mentor */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5">
        <CharacterMentor
          size="md"
          state={mentor.state}
          message={mentor.message}
          subMessage={mentor.subMessage}
          revealProgressively
        />
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* ======================================================== */}
        {/* TAB 1: CATEGORIES PRIMER */}
        {/* ======================================================== */}
        {activeTab === 'categories_primer' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>The 4 Main Mutual Fund Pillars</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Not All Mutual Funds Are Created Equal
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                A common beginner misconception is thinking: <em>"Mutual funds are risky stock bets."</em>
                In reality, Indian mutual funds cover a broad spectrum of asset classes with vastly different risk profiles:
              </p>
            </div>

            {/* 4 Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <span>📈</span> Equity Funds
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                    High Growth / High Risk
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Invests in shares of listed companies. High compounding potential over 5+ years, but subject to market drawdowns in the short term.
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                  Examples: Large Cap, Mid Cap, Flexi Cap, ELSS (Tax Saving).
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <span>🏛️</span> Debt Funds
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-950 border border-amber-500/30 text-amber-300">
                    Capital Safety / Moderate
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lends money to the government (G-Secs) and high-rated corporations. Generates predictable interest income with low volatility.
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                  Examples: Liquid Funds, Overnight Funds, Short Duration Funds.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-teal-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-teal-400 flex items-center gap-2">
                    <span>⚖️</span> Hybrid Funds
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-950 border border-teal-500/30 text-teal-300">
                    Balanced Volatility
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Blends Equity (for wealth growth) and Debt (for downside protection). Rebalances automatically when markets get euphoric or crash.
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                  Examples: Balanced Advantage Funds, Aggressive Hybrid.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-purple-400 flex items-center gap-2">
                    <span>🎯</span> Index Funds (Passive)
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-950 border border-purple-500/30 text-purple-300">
                    Low Cost / Direct Index
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Replicates a market index like Nifty 50 or Sensex automatically with zero human manager bias and rock-bottom expense ratios.
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                  Examples: Nifty 50 Index Fund, Nifty Next 50 Index Fund.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('scenario_matcher')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Interactive Challenge: Match Fund to Life Goal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SCENARIO MATCHER */}
        {/* ======================================================== */}
        {activeTab === 'scenario_matcher' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Stepper Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-slate-300">
                  Investor Mandate {scenarioIndex + 1} of {LEVEL_3_SCENARIOS.length}
                </span>
              </div>
              <div className="flex gap-1.5">
                {LEVEL_3_SCENARIOS.map((sc, i) => (
                  <div
                    key={sc.id}
                    className={`h-2 rounded-full transition-all ${
                      i === scenarioIndex
                        ? 'w-6 bg-teal-400'
                        : submittedScenarios[sc.id]
                        ? 'w-2 bg-emerald-500'
                        : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Investor Brief Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950/30 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {currentScenario.avatar}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      {currentScenario.personaName} ({currentScenario.age})
                    </h3>
                    <span className="text-xs text-teal-400 font-semibold">{currentScenario.goalTitle}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                    Target: <strong className="text-emerald-400">{currentScenario.targetAmount}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                    Horizon: <strong className="text-amber-300">{currentScenario.timeHorizon}</strong>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {currentScenario.description}
              </p>
            </div>

            {/* Selection Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Which mutual fund category fits {currentScenario.personaName}'s time horizon & risk appetite?
              </label>

              <div className="space-y-3">
                {currentScenario.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? opt.isSuitable
                            ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                            : 'bg-rose-950/40 border-rose-500 shadow-md ring-1 ring-rose-500/50'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-xs text-slate-300">
                            {isSelected ? (opt.isSuitable ? '✓' : '✕') : '○'}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-slate-100">
                            {opt.categoryTitle}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{opt.fundType}</span>
                      </div>

                      {/* Immediate Feedback Reveal */}
                      {isSelected && (
                        <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1.5 animate-in fade-in duration-200">
                          <div className="flex items-center gap-1.5 font-bold">
                            {opt.isSuitable ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Correct Choice!
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1">
                                <XCircle className="w-4 h-4" /> Mismatched Horizon / Risk!
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300 leading-relaxed">{opt.reasoning}</p>
                          <div className="text-[11px] text-amber-300/80 pt-1">
                            <strong>Key Risk Disclosed:</strong> {opt.keyRiskDisclosed}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedOption && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextScenario}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  <span>
                    {scenarioIndex < LEVEL_3_SCENARIOS.length - 1
                      ? 'Next Investor Scenario'
                      : 'Active vs Passive Management'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ACTIVE VS PASSIVE DEBRIEF */}
        {/* ======================================================== */}
        {activeTab === 'active_vs_passive' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Scale className="w-3.5 h-3.5" />
                <span>Active Management vs Passive Indexing</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                The Battle Between Stock Pickers & The Index
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you choose an equity fund, you face a major architectural choice:
                Do you pay a human manager to try and beat the market, or replicate the market at low cost?
              </p>
            </div>

            {/* Comparison Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-base font-bold text-teal-300">Active Management</h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-500/30">
                    Alpha Pursuit
                  </span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400">•</span>
                    <span>Fund manager selects stocks based on proprietary research.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400">•</span>
                    <span><strong>Goal:</strong> Generate "Alpha" (returns higher than benchmark).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong>Cost:</strong> Higher Total Expense Ratio (typically 1.5% - 2.2% in Regular, 0.7% - 1.2% in Direct).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400">•</span>
                    <span><strong>Risk:</strong> Human bias, manager changes, and potential underperformance after fees.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-base font-bold text-purple-300">Passive Indexing</h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-500/30">
                    Low-Cost Beta
                  </span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Computers buy all companies in an index (e.g. Nifty 50) in exact mathematical weights.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span><strong>Goal:</strong> Match index returns with minimal tracking error.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span><strong>Cost:</strong> Rock-bottom Total Expense Ratio (typically 0.10% - 0.25%).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span><strong>Trade-off:</strong> Will never beat the index, but will never underperform it due to bad stock-picking either.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('reflection')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Level 3 Reflection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: REFLECTION */}
        {/* ======================================================== */}
        {activeTab === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Level 3 Reflection</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Why Should an Investor Needing Money in 6 Months Avoid Pure Equity Funds?
              </h2>
              <p className="text-sm text-slate-300">
                Select the soundest financial reasoning based on market horizons.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'ref_3_a',
                  text: 'Because equity funds have high minimum investment requirements that lock your money.',
                  isCorrect: false,
                  feedback: 'Incorrect! Open-ended equity funds allow withdrawals anytime (liquid within 1-2 trading days). The issue is not lock-in; it is price volatility.',
                },
                {
                  id: 'ref_3_b',
                  text: 'Because equity prices fluctuate unpredictably in the short term. If markets drop 15% right before the 6-month deadline, the investor is forced to sell at a loss with no time to recover.',
                  isCorrect: true,
                  feedback: 'Spot on! The length of your time horizon dictates your risk tolerance. Short horizons cannot afford market drawdown risk, making capital-preserving debt instruments mandatory.',
                },
                {
                  id: 'ref_3_c',
                  text: 'Because SEBI prohibits holding equity funds for less than 12 months.',
                  isCorrect: false,
                  feedback: 'Incorrect! SEBI does not prohibit short holding periods; taxes and exit loads may apply, but there is no regulatory prohibition.',
                },
              ].map((opt) => {
                const isSelected = reflectionAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setReflectionAnswer(opt.id)}
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

            {reflectionAnswer && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleFinishLevel}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  <span>Complete Level 3 & Claim +200 XP</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: COMPLETED */}
        {/* ======================================================== */}
        {activeTab === 'completed' && (
          <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-100">
                Level 3 Mastered!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                You know how to map mutual fund categories to life goals, identify trade-offs between equity and debt, and understand Active vs Passive investing.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-sm">
              <Award className="w-4 h-4" />
              <span>+200 XP Earned</span>
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
