import React, { useState } from 'react';
import {
  SIP_SIMULATION_MONTHS,
} from '../../../data/mutualFundsData.ts';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Calculator,
  Calendar,
  TrendingUp,
  TrendingDown,
  HelpCircle,
  Award,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface Level2NavAndSipProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type TabType = 'nav_machine' | 'sip_simulator' | 'reflection' | 'completed';

export const Level2NavAndSip: React.FC<Level2NavAndSipProps> = ({ onComplete, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('nav_machine');

  // --- Part 1: NAV Machine State ---
  const [investedAmount, setInvestedAmount] = useState<number>(2000);
  const [initialNav, setInitialNav] = useState<number>(20);
  const [simulatedNav, setSimulatedNav] = useState<number>(25);

  const unitsAllocated = investedAmount / initialNav;
  const currentPortfolioValue = unitsAllocated * simulatedNav;
  const netGainOrLoss = currentPortfolioValue - investedAmount;
  const percentageReturn = ((simulatedNav - initialNav) / initialNav) * 100;

  // --- Part 2: SIP Simulator State ---
  const [revealedMonthIndex, setRevealedMonthIndex] = useState<number>(1); // 1 to 6

  const visibleSipMonths = SIP_SIMULATION_MONTHS.slice(0, revealedMonthIndex);
  const totalSipInvested = visibleSipMonths.reduce((sum, m) => sum + m.monthlyContribution, 0);
  const totalSipUnits = visibleSipMonths.reduce((sum, m) => sum + m.monthlyContribution / m.simulatedNav, 0);
  const currentSipNav = visibleSipMonths[visibleSipMonths.length - 1].simulatedNav;
  const currentSipValue = totalSipUnits * currentSipNav;
  const sipNetGain = currentSipValue - totalSipInvested;
  const sipPercentGain = totalSipInvested > 0 ? (sipNetGain / totalSipInvested) * 100 : 0;

  // --- Reflection State ---
  const [selectedReflection, setSelectedReflection] = useState<string | null>(null);

  const handleNextFromNav = () => {
    setActiveTab('sip_simulator');
  };

  const handleNextFromSip = () => {
    setActiveTab('reflection');
  };

  const handleFinishLevel = () => {
    setActiveTab('completed');
    onComplete(200);
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
          <span className="text-teal-400">Level 2 of 5</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">NAV & The Monthly SIP</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* ======================================================== */}
        {/* TAB 1: THE NAV MACHINE */}
        {/* ======================================================== */}
        {activeTab === 'nav_machine' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Experiment 1: The NAV Machine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                How Do Mutual Fund Units & NAV Work?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you invest in a mutual fund, you purchase <strong>Units</strong> at the scheme's
                current <strong>Net Asset Value (NAV)</strong>. Try changing your investment amount and watching what happens when NAV moves:
              </p>
            </div>

            {/* Interactive Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input 1: Invested Amount */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Select Investment Amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1000, 2000, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setInvestedAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        investedAmount === amt
                          ? 'bg-teal-500 text-slate-950 shadow-md'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500">
                  Initial Launch Purchase NAV: <strong className="text-slate-300">₹{initialNav}.00</strong>
                </div>
              </div>

              {/* Input 2: Simulate NAV Market Movement */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Simulate Market NAV Change
                  </label>
                  <span className="text-sm font-extrabold text-teal-300 font-mono-num">
                    ₹{simulatedNav.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { nav: 16, label: '-20% Dip' },
                    { nav: 20, label: 'Even (₹20)' },
                    { nav: 25, label: '+25% Gain' },
                    { nav: 30, label: '+50% Surge' },
                  ].map((sc) => (
                    <button
                      key={sc.nav}
                      onClick={() => setSimulatedNav(sc.nav)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        simulatedNav === sc.nav
                          ? 'bg-emerald-500 text-slate-950 shadow-md'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500">
                  Click a scenario button above to observe NAV fluctuations.
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 block">
                Calculated Investor Holdings (Fictional Simulation)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Units Held</span>
                  <span className="text-base sm:text-lg font-black text-slate-100 font-mono-num">
                    {unitsAllocated.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Amount ÷ ₹{initialNav}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Current NAV</span>
                  <span className="text-base sm:text-lg font-black text-slate-100 font-mono-num">
                    ₹{simulatedNav.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Per Unit Value</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Value</span>
                  <span className="text-base sm:text-lg font-black text-teal-300 font-mono-num">
                    ₹{currentPortfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Units × Current NAV</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Gain / Loss</span>
                  <span
                    className={`text-base sm:text-lg font-black font-mono-num flex items-center justify-center gap-1 ${
                      netGainOrLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {netGainOrLoss >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {netGainOrLoss >= 0 ? '+' : ''}₹{netGainOrLoss.toLocaleString()} ({percentageReturn > 0 ? '+' : ''}{percentageReturn.toFixed(0)}%)
                  </span>
                  <span className="text-[10px] text-slate-500 block">Unrealized P&L</span>
                </div>
              </div>
            </div>

            {/* Critical Beginner Epiphany: Is ₹10 NAV "Cheaper" than ₹100 NAV? */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>Mythbuster: "Is a ₹10 NAV fund cheaper or better than a ₹100 NAV fund?"</span>
              </div>
              <p className="leading-relaxed opacity-95">
                <strong>No! NAV does NOT indicate cheapness.</strong> A stock with ₹100 price might be cheap or expensive depending on earnings. But in a mutual fund, NAV is simply the mathematical division of assets by total units.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-200 block">Fund A (NAV ₹10)</span>
                  <span className="text-slate-400">Invest ₹10,000 → You get 1,000 units.</span>
                  <span className="text-teal-400 block mt-0.5">If underlying stocks rise 10%, NAV becomes ₹11. Value = ₹11,000 (+₹1,000).</span>
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">Fund B (NAV ₹100)</span>
                  <span className="text-slate-400">Invest ₹10,000 → You get 100 units.</span>
                  <span className="text-teal-400 block mt-0.5">If underlying stocks rise 10%, NAV becomes ₹110. Value = ₹11,000 (+₹1,000).</span>
                </div>
              </div>
              <p className="text-[11px] text-amber-300/80 font-medium">
                Both investors made the exact same ₹1,000 gain! Never pick a fund just because its NAV is low.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNextFromNav}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Experiment 2: The Monthly SIP Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SIP SIMULATOR (RUPEE COST AVERAGING) */}
        {/* ======================================================== */}
        {activeTab === 'sip_simulator' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Interactive Experiment 2: The Monthly Investor</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Why Market Dips Are the Best Friend of an SIP Investor
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                A <strong>Systematic Investment Plan (SIP)</strong> invests a fixed amount (₹1,000) every month.
                Watch what happens as the market experiences a real-world cycle of a bull peak, a crash, and a rebound:
              </p>
            </div>

            {/* Interactive Month Stepper Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Simulation Progress:</span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-950 border border-teal-500/30 text-teal-300 font-extrabold text-xs">
                  Month {revealedMonthIndex} of 6
                </span>
              </div>

              <div className="flex items-center gap-2">
                {revealedMonthIndex < 6 ? (
                  <button
                    type="button"
                    onClick={() => setRevealedMonthIndex((prev) => Math.min(6, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Simulate Next Month</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealedMonthIndex(1)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Simulation</span>
                  </button>
                )}
              </div>
            </div>

            {/* Step-by-Step SIP Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px] bg-slate-900/60">
                    <th className="p-3 sm:p-4">Month</th>
                    <th className="p-3 sm:p-4">Market Mood</th>
                    <th className="p-3 sm:p-4">SIP Rupee</th>
                    <th className="p-3 sm:p-4">Scheme NAV</th>
                    <th className="p-3 sm:p-4">Units Bought</th>
                    <th className="p-3 sm:p-4 text-right">Total Accumulated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {visibleSipMonths.map((m) => {
                    const unitsThisMonth = m.monthlyContribution / m.simulatedNav;
                    const isBargain = m.simulatedNav <= 40;
                    return (
                      <tr key={m.monthNumber} className="hover:bg-slate-900/30 transition-colors">
                        <td className="p-3 sm:p-4 font-bold">{m.monthName}</td>
                        <td className="p-3 sm:p-4">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                              m.simulatedNav <= 35
                                ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                                : m.simulatedNav <= 40
                                ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {m.marketCondition}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 font-mono-num font-semibold">₹{m.monthlyContribution}</td>
                        <td className="p-3 sm:p-4 font-mono-num font-bold text-slate-100">
                          ₹{m.simulatedNav.toFixed(1)}
                        </td>
                        <td className="p-3 sm:p-4 font-mono-num">
                          <span className={`font-extrabold ${isBargain ? 'text-teal-400' : 'text-slate-300'}`}>
                            {unitsThisMonth.toFixed(2)} units
                          </span>
                          {isBargain && (
                            <span className="ml-1.5 text-[10px] text-teal-400 font-bold hidden sm:inline">
                              (Discount Accumulation!)
                            </span>
                          )}
                        </td>
                        <td className="p-3 sm:p-4 font-mono-num font-semibold text-right text-emerald-400">
                          {visibleSipMonths
                            .slice(0, m.monthNumber)
                            .reduce((s, x) => s + x.monthlyContribution / x.simulatedNav, 0)
                            .toFixed(2)} u
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total Results Summary Strip */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-950 to-emerald-950/60 border border-teal-500/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Deposited</span>
                <span className="text-base sm:text-lg font-black text-slate-100 font-mono-num">
                  ₹{totalSipInvested.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">{revealedMonthIndex} months × ₹1,000</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Units Accumulated</span>
                <span className="text-base sm:text-lg font-black text-teal-300 font-mono-num">
                  {totalSipUnits.toFixed(2)} units
                </span>
                <span className="text-[10px] text-slate-500">Average Cost: ₹{(totalSipInvested / Math.max(1, totalSipUnits)).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Ending Value</span>
                <span className="text-base sm:text-lg font-black text-emerald-300 font-mono-num">
                  ₹{currentSipValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[10px] text-slate-500">{totalSipUnits.toFixed(1)} u × ₹{currentSipNav} NAV</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Unrealized Profit</span>
                <span className="text-base sm:text-lg font-black text-emerald-400 font-mono-num">
                  +₹{sipNetGain.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({sipPercentGain.toFixed(1)}%)
                </span>
                <span className="text-[10px] text-emerald-400/80 font-semibold">Rupee-Cost Averaged!</span>
              </div>
            </div>

            {/* SEBI Compliance & Educational Disclaimer Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 block flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Deterministic Educational Simulation Disclaimer</span>
              </span>
              <p className="leading-relaxed text-[11px]">
                All simulated NAVs are fictional figures created to demonstrate the mathematical mechanics of <strong>Rupee-Cost Averaging</strong>.
                SIP does not guarantee profits or eliminate market risk. If markets experience prolonged multi-year downturns, portfolio values can remain negative.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNextFromSip}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Continue to Level 2 Reflection</span>
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
                <span>Level 2 Reflection</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                If the NAV Drops From ₹50 to ₹35, Does a Monthly SIP Investor Suffer a Permanent Loss?
              </h2>
              <p className="text-sm text-slate-300">
                Reflect on what happened to the unit allocation during Month 3 in the simulator.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'ref_loss',
                  text: 'Yes, the money is gone forever, so the investor should cancel their SIP immediately.',
                  isCorrect: false,
                  feedback: 'Incorrect! In an equity fund with quality holdings, price drops are paper fluctuations. Cancelling the SIP during a drop deprives you of the chance to accumulate cheap units at discount prices.',
                },
                {
                  id: 'ref_accumulate',
                  text: 'No, the current paper value is lower temporarily, but the next ₹1,000 installment will buy MORE units at the lower NAV, lowering the average cost per unit.',
                  isCorrect: true,
                  feedback: 'Brilliant! That is the core superpower of an SIP. Falling markets are a buying discount for disciplined savers accumulating units over a multi-year horizon.',
                },
                {
                  id: 'ref_nav_cheap',
                  text: 'Yes, because a lower NAV proves the fund manager made mistakes.',
                  isCorrect: false,
                  feedback: 'Incorrect! When the broader stock market corrects, all equity fund NAVs decline, regardless of manager skill. Macro market cycles affect all equity schemes.',
                },
              ].map((opt) => {
                const isSelected = selectedReflection === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedReflection(opt.id)}
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

            {selectedReflection && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleFinishLevel}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  <span>Complete Level 2 & Claim +200 XP</span>
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
                Level 2 Mastered!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                You understand how NAV is calculated, why a lower NAV doesn't mean cheapness, and how SIP rupee-cost averaging works over market cycles.
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
