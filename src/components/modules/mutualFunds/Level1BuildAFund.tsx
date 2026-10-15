import React, { useState } from 'react';
import {
  LEVEL_1_INVESTORS,
  LEVEL_1_PORTFOLIO_HOLDINGS,
  InvestorProfile,
} from '../../../data/mutualFundsData.ts';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  PieChart,
  Users,
  Shield,
  Briefcase,
  Layers,
  CheckCircle2,
  HelpCircle,
  Building2,
  Award,
} from 'lucide-react';

interface Level1BuildAFundProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type Stage = 'meet_savers' | 'pooling' | 'portfolio' | 'units_allocation' | 'reflection' | 'completed';

export const Level1BuildAFund: React.FC<Level1BuildAFundProps> = ({ onComplete, onBack }) => {
  const [stage, setStage] = useState<Stage>('meet_savers');
  const [selectedInvestorId, setSelectedInvestorId] = useState<string>('inv_ananya');
  const [reflectionAnswer, setReflectionAnswer] = useState<string | null>(null);
  const [isReflectionSubmitted, setIsReflectionSubmitted] = useState<boolean>(false);

  const totalPooledMoney = LEVEL_1_INVESTORS.reduce((acc, inv) => acc + inv.initialInvestment, 0);
  const baseNav = 10;
  const totalUnits = totalPooledMoney / baseNav;

  const handleNextStage = () => {
    if (stage === 'meet_savers') setStage('pooling');
    else if (stage === 'pooling') setStage('portfolio');
    else if (stage === 'portfolio') setStage('units_allocation');
    else if (stage === 'units_allocation') setStage('reflection');
    else if (stage === 'reflection') {
      setStage('completed');
      onComplete(150);
    }
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
          <span className="text-teal-400">Level 1 of 5</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">Mutual Fund Basics</span>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Stage 1: Meet the 3 Savers */}
        {stage === 'meet_savers' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>Step 1: The Small Saver's Dilemma</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Why Can't Individual Savers Diversify Alone?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Imagine three people in Bengaluru who want to invest in India's top 30 corporate enterprises.
                Notice how their savings and time constraints make direct investing challenging:
              </p>
            </div>

            {/* 3 Investor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LEVEL_1_INVESTORS.map((inv) => {
                const isSelected = selectedInvestorId === inv.id;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedInvestorId(inv.id)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-teal-950/40 border-teal-500 shadow-md ring-1 ring-teal-500/50'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                          {inv.avatar}
                        </span>
                        <span className="text-xs font-bold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                          ₹{inv.initialInvestment.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-100">{inv.name} ({inv.age})</h4>
                        <span className="text-xs text-teal-400 font-medium">{inv.profession}</span>
                      </div>
                      <p className="text-xs text-slate-400 italic">"{inv.quote}"</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Goal:</span>
                        <span className="text-slate-300 font-medium">{inv.primaryGoal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Horizon:</span>
                        <span className="text-slate-300 font-medium">{inv.timeHorizon}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The Math Reality Box */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block">The Single-Share Barrier</span>
                <p className="mt-0.5 leading-relaxed opacity-90">
                  Buying just <strong>1 single share</strong> of TCS (₹3,820), Reliance (₹2,850), and HDFC Bank (₹1,680)
                  already costs ₹8,350! Ananya only has ₹500. She cannot buy even 1 share of TCS.
                  How can all three invest together?
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNextStage}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Pool Their Money & Launch Fund</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 2: Pooling Money */}
        {stage === 'pooling' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>Step 2: Pooling Capital into a Common Trust</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                The Power of the Collective Pool
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                By pooling their money into an independent registered mutual fund trust, their combined capital becomes ₹30,500.
              </p>
            </div>

            {/* Visual Pooling Diagram */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-2xl">👩‍🎓</span>
                  <div className="text-xs text-slate-400 mt-1">Ananya's Share</div>
                  <div className="text-sm font-extrabold text-teal-400">₹500 (1.6%)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-2xl">👨‍💻</span>
                  <div className="text-xs text-slate-400 mt-1">Rahul's Share</div>
                  <div className="text-sm font-extrabold text-teal-400">₹5,000 (16.4%)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-2xl">👩‍💼</span>
                  <div className="text-xs text-slate-400 mt-1">Priya's Share</div>
                  <div className="text-sm font-extrabold text-teal-400">₹25,000 (82.0%)</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex items-center justify-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <span>↓ Pooled Into Collective Fund Corpus ↓</span>
              </div>

              {/* Central Corpus Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-teal-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-black text-xl border border-teal-500/40">
                    🏦
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">
                      Bluechip 30 Growth Scheme
                    </h3>
                    <span className="text-xs text-slate-400">
                      Registered Mutual Fund Trust (SEBI Regulated)
                    </span>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-xs text-slate-400 font-medium block">Total Pooled AUM</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono-num">
                    ₹{totalPooledMoney.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Architecture Roles Explanation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-teal-400">
                  <Users className="w-4 h-4" />
                  <span>1. Investors</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Provide money and receive proportionate <strong>units</strong> in exchange.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Building2 className="w-4 h-4" />
                  <span>2. AMC (Company)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  The business operations entity (e.g. HDFC AMC, SBI MF) managing accounting & compliance.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-purple-400">
                  <Briefcase className="w-4 h-4" />
                  <span>3. Fund Manager</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Licensed expert making research-backed buy and sell decisions under the scheme's mandate.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNextStage}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>See What the Fund Manager Buys</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 3: Portfolio Diversification */}
        {stage === 'portfolio' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <PieChart className="w-3.5 h-3.5" />
                <span>Step 3: Instant Diversification</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                With ₹30,500, the Fund Manager Buys 14 Companies
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Even though Ananya only contributed ₹500, she now participates in every single company
                in this institutional portfolio proportionately!
              </p>
            </div>

            {/* Holdings Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Holdings Basket</span>
                <span>Weight in Fund</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {LEVEL_1_PORTFOLIO_HOLDINGS.map((h) => (
                  <div
                    key={h.ticker}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-200 block">{h.companyName}</span>
                      <span className="text-[10px] text-slate-500">{h.sector}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-teal-950 border border-teal-500/30 text-teal-300 font-mono-num font-bold">
                      {h.weightPercent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Epiphany Box */}
            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs sm:text-sm text-teal-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Crucial Financial Concept: Units vs Individual Shares</span>
              </div>
              <p className="leading-relaxed opacity-95">
                Investors <strong>do not directly own</strong> share certificates of TCS or Reliance.
                The Mutual Fund Trust owns the underlying shares. Investors own <strong>Units</strong> of the mutual fund,
                which represent their proportional claim on the entire basket's daily net value.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNextStage}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Allocate Units (Base NAV = ₹10)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 4: Units Allocation at Base NAV ₹10 */}
        {stage === 'units_allocation' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Step 4: Proportional Unit Allocation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Units Issued at Launch NAV of ₹10.00
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                When a new mutual fund launches (New Fund Offer / NFO), units are issued at a standard base NAV
                (traditionally ₹10 in India). Units = Amount Invested ÷ NAV.
              </p>
            </div>

            {/* Unit Math Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px] bg-slate-900/60">
                    <th className="p-3 sm:p-4">Investor</th>
                    <th className="p-3 sm:p-4">Invested Amount</th>
                    <th className="p-3 sm:p-4">Launch NAV</th>
                    <th className="p-3 sm:p-4">Units Allocated</th>
                    <th className="p-3 sm:p-4 text-right">Fund Ownership</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="p-3 sm:p-4 font-bold flex items-center gap-2">
                      <span>👩‍🎓</span> Ananya
                    </td>
                    <td className="p-3 sm:p-4 font-mono-num font-semibold">₹500</td>
                    <td className="p-3 sm:p-4 font-mono-num text-slate-400">₹10.00</td>
                    <td className="p-3 sm:p-4 font-mono-num font-extrabold text-teal-400">50.00 Units</td>
                    <td className="p-3 sm:p-4 font-mono-num text-right font-medium text-slate-400">1.64%</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-bold flex items-center gap-2">
                      <span>👨‍💻</span> Rahul
                    </td>
                    <td className="p-3 sm:p-4 font-mono-num font-semibold">₹5,000</td>
                    <td className="p-3 sm:p-4 font-mono-num text-slate-400">₹10.00</td>
                    <td className="p-3 sm:p-4 font-mono-num font-extrabold text-teal-400">500.00 Units</td>
                    <td className="p-3 sm:p-4 font-mono-num text-right font-medium text-slate-400">16.39%</td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-bold flex items-center gap-2">
                      <span>👩‍💼</span> Priya
                    </td>
                    <td className="p-3 sm:p-4 font-mono-num font-semibold">₹25,000</td>
                    <td className="p-3 sm:p-4 font-mono-num text-slate-400">₹10.00</td>
                    <td className="p-3 sm:p-4 font-mono-num font-extrabold text-teal-400">2,500.00 Units</td>
                    <td className="p-3 sm:p-4 font-mono-num text-right font-medium text-slate-400">81.97%</td>
                  </tr>
                  <tr className="bg-slate-900/50 font-bold text-slate-100">
                    <td className="p-3 sm:p-4">Total Scheme</td>
                    <td className="p-3 sm:p-4 font-mono-num text-emerald-400">₹30,500</td>
                    <td className="p-3 sm:p-4 font-mono-num">—</td>
                    <td className="p-3 sm:p-4 font-mono-num text-emerald-400">3,050.00 Units</td>
                    <td className="p-3 sm:p-4 font-mono-num text-right text-emerald-400">100.0%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNextStage}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Final Concept Check & Reflection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 5: Reflection & Understanding Verification */}
        {stage === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Level 1 Reflection</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Does Ananya (50 Units) Own Different Stocks than Priya (2,500 Units)?
              </h2>
              <p className="text-sm text-slate-300">
                Think about the pooling structure you just created.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'ans_diff',
                  text: 'Yes, Priya gets better or more exclusive companies because she invested ₹25,000.',
                  isCorrect: false,
                  feedback: 'Incorrect! In a mutual fund, every single unit is identical in composition. Priya does not get different stocks; she simply owns more units of the exact same portfolio.',
                },
                {
                  id: 'ans_same',
                  text: 'No, every unit has the identical proportional slice of all 14 companies. Priya simply owns more units.',
                  isCorrect: true,
                  feedback: 'Spot on! This is the brilliance of mutual funds. Whether you invest ₹500 or ₹50,00,000, your rupees are exposed to the exact same high-quality diversified basket.',
                },
                {
                  id: 'ans_amc',
                  text: 'The AMC owns the stocks, so the investors do not participate in market gains.',
                  isCorrect: false,
                  feedback: 'Incorrect! The fund holds the stocks in trust for the unit-holders. When underlying stocks rise, the NAV rises, and all unit-holders benefit proportionately.',
                },
              ].map((opt) => {
                const isSelected = reflectionAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setReflectionAnswer(opt.id);
                      setIsReflectionSubmitted(true);
                    }}
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

            {isReflectionSubmitted && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextStage}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  <span>Complete Level 1 & Claim +150 XP</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage 6: Completed */}
        {stage === 'completed' && (
          <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-100">
                Level 1 Mastered!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                You now understand how small savers pool money into a mutual fund and why unit ownership grants instant corporate diversification.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-sm">
              <Award className="w-4 h-4" />
              <span>+150 XP Earned</span>
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
