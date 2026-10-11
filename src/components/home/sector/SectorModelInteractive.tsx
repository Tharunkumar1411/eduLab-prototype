import React, { useState } from 'react';
import { SectorLearningActivity } from '../../../data/sectors/types.ts';
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sliders,
  Sparkles,
  TrendingDown,
  TrendingUp,
  XCircle,
} from 'lucide-react';

interface SectorModelInteractiveProps {
  activity: SectorLearningActivity;
  onComplete: (xp: number) => void;
}

export const SectorModelInteractive: React.FC<SectorModelInteractiveProps> = ({
  activity,
  onComplete,
}) => {
  const cfg = activity.modelConfig!;

  // Interactive slider state
  const [lendingRate, setLendingRate] = useState<number>(cfg.defaultLendingRate);
  const [depositRate, setDepositRate] = useState<number>(cfg.defaultDepositRate);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Reflection question state
  const [reflectionAnswerId, setReflectionAnswerId] = useState<string | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  // Calculations
  const depositPool = cfg.depositPoolCr;
  const loansDeployed = cfg.loansDeployedCr;
  const reserves = cfg.reservesCr;

  const interestIncomeCr = Math.round((loansDeployed * lendingRate) / 100);
  const interestExpenseCr = Math.round((depositPool * depositRate) / 100);
  const netInterestIncomeCr = interestIncomeCr - interestExpenseCr;
  const simpleSpread = Number((lendingRate - depositRate).toFixed(2));
  const estimatedNim = Number(
    ((netInterestIncomeCr / (loansDeployed + reserves * 0.5)) * 100).toFixed(2)
  );

  const presets = [
    { label: 'Normal Baseline', loan: 9.0, dep: 5.0, note: 'Healthy 4.0% spread' },
    { label: 'CASA Advantage', loan: 9.0, dep: 4.0, note: 'High 5.0% spread (cheaper funding)' },
    { label: 'Rate Squeeze', loan: 8.5, dep: 6.5, note: 'Compressed 2.0% spread' },
    { label: 'High Lending Rate', loan: 12.0, dep: 5.5, note: 'Wide 6.5% spread (higher risk)' },
  ];

  const handleSliderChange = (type: 'loan' | 'dep', value: number) => {
    setHasInteracted(true);
    if (type === 'loan') setLendingRate(value);
    else setDepositRate(value);
  };

  const handleSelectPreset = (loan: number, dep: number) => {
    setHasInteracted(true);
    setLendingRate(loan);
    setDepositRate(dep);
  };

  const selectedOption = cfg.reflectionOptions.find((o) => o.id === reflectionAnswerId);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
          <Sliders className="w-4 h-4" />
          <span>Interactive Model · Step 2 of 4</span>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
          {cfg.headline}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {cfg.intro}
        </p>
      </div>

      {/* Interactive Simulation Dashboard */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-6">
        {/* Preset scenario buttons */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Test Preset Scenarios:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((p, idx) => {
              const isActive = lendingRate === p.loan && depositRate === p.dep;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(p.loan, p.dep)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500/20 border-teal-500 text-teal-200 ring-1 ring-teal-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="font-bold block text-slate-100">{p.label}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{p.note}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-slate-950 border border-slate-800/90">
          {/* Lending Rate Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                1. Average Loan Interest Rate (What Borrowers Pay)
              </span>
              <span className="font-mono-num font-black text-sm text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-lg">
                {lendingRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="7.0"
              max="14.0"
              step="0.1"
              value={lendingRate}
              onChange={(e) => handleSliderChange('loan', parseFloat(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-num">
              <span>7.0% (Cheap corporate)</span>
              <span>10.5% (Retail)</span>
              <span>14.0% (Unsecured)</span>
            </div>
          </div>

          {/* Deposit Cost Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                2. Average Deposit Cost (What Savers Receive)
              </span>
              <span className="font-mono-num font-black text-sm text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded-lg">
                {depositRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="3.0"
              max="8.0"
              step="0.1"
              value={depositRate}
              onChange={(e) => handleSliderChange('dep', parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-num">
              <span>3.0% (High CASA)</span>
              <span>5.0% (Blended)</span>
              <span>8.0% (Wholesale Term)</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Outcomes */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Live Simplified Cash Flow Results:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Interest Earned */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Interest Earned (Loans)</span>
                <span className="text-emerald-400">₹{loansDeployed.toLocaleString()} Cr × {lendingRate}%</span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono-num text-emerald-300 block">
                +₹{interestIncomeCr.toLocaleString()} Cr
              </span>
              <span className="text-[11px] text-slate-500 block">From home & business borrowers</span>
            </div>

            {/* Interest Paid */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Interest Paid (Deposits)</span>
                <span className="text-rose-400">₹{depositPool.toLocaleString()} Cr × {depositRate}%</span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono-num text-rose-300 block">
                −₹{interestExpenseCr.toLocaleString()} Cr
              </span>
              <span className="text-[11px] text-slate-500 block">Paid out to savings & FD accounts</span>
            </div>

            {/* Net Spread & Income */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-950/60 to-slate-950 border border-teal-500/40 space-y-1 shadow-md">
              <div className="flex items-center justify-between text-xs text-teal-300 font-semibold">
                <span>Net Interest Spread</span>
                <span className="font-mono-num">{lendingRate}% − {depositRate}%</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black font-mono-num text-teal-200">
                  {simpleSpread > 0 ? `+${simpleSpread}` : simpleSpread}%
                </span>
                <span className="text-xs text-slate-400 font-mono-num">
                  (₹{netInterestIncomeCr > 0 ? `+${netInterestIncomeCr}` : netInterestIncomeCr} Cr NII)
                </span>
              </div>
              <span className="text-[11px] text-teal-300/80 block">
                Est. Net Interest Margin (NIM): ~{estimatedNim}%
              </span>
            </div>
          </div>
        </div>

        {/* Concept Clarification Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Important Distinction: Spread vs NIM</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {cfg.explanation.spreadConcept}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-teal-900/60 pt-2.5">
            {cfg.explanation.spreadVsNim}
          </p>
          <p className="text-[11px] text-slate-400 italic">
            {cfg.explanation.limitationsNote}
          </p>
        </div>

        {/* Reflection Check */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Quick Concept Check
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-100">
            {cfg.reflectionQuestion}
          </h3>

          <div className="space-y-2.5">
            {cfg.reflectionOptions.map((opt) => {
              const isSelected = reflectionAnswerId === opt.id;
              let btnStyle = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';

              if (reflectionSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-100';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-slate-800 border-teal-500 text-white';
              }

              return (
                <button
                  key={opt.id}
                  disabled={reflectionSubmitted}
                  onClick={() => setReflectionAnswerId(opt.id)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="font-semibold block">{opt.text}</span>
                  {reflectionSubmitted && (opt.isCorrect || isSelected) && (
                    <span
                      className={`block mt-2 text-xs leading-relaxed ${
                        opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                      }`}
                    >
                      {opt.explanation}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            {!reflectionSubmitted ? (
              <button
                disabled={!reflectionAnswerId}
                onClick={() => setReflectionSubmitted(true)}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Check Understanding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => onComplete(activity.xpReward)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/25"
              >
                <span>Complete & Claim +{activity.xpReward} XP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
