/**
 * Strategy Experimentation & Side-by-Side Comparison View.
 * Core differentiator: Empowers users to compare Baseline vs Modified Experiment
 * to see how parameter adjustments impacted Return, Drawdown, and Win Rate.
 */

import React from 'react';
import { BacktestResult } from '../../engine/types.ts';
import { ArrowDown, ArrowUp, CheckCircle, ChevronRight, GitCompare, RotateCcw, Sliders, TrendingUp } from 'lucide-react';

interface StrategyComparisonViewProps {
  originalResult: BacktestResult;
  experimentResult: BacktestResult;
  onModifyAgain: () => void;
  onAcceptExperimentAsNewBaseline: () => void;
}

export const StrategyComparisonView: React.FC<StrategyComparisonViewProps> = ({
  originalResult,
  experimentResult,
  onModifyAgain,
  onAcceptExperimentAsNewBaseline,
}) => {
  const diffReturn = experimentResult.totalReturnPercent - originalResult.totalReturnPercent;
  const diffDrawdown = originalResult.maxDrawdownPercent - experimentResult.maxDrawdownPercent; // positive means lower/better drawdown
  const diffWinRate = experimentResult.winRatePercent - originalResult.winRatePercent;
  const diffProfitFactor = experimentResult.profitFactor - originalResult.profitFactor;
  const diffTrades = experimentResult.totalTrades - originalResult.totalTrades;

  const metrics = [
    {
      label: 'Total Return',
      orig: `${originalResult.totalReturnPercent > 0 ? '+' : ''}${originalResult.totalReturnPercent}%`,
      exp: `${experimentResult.totalReturnPercent > 0 ? '+' : ''}${experimentResult.totalReturnPercent}%`,
      diff: `${diffReturn > 0 ? '+' : ''}${diffReturn.toFixed(1)}%`,
      isBetter: diffReturn > 0,
      neutral: Math.abs(diffReturn) < 0.1,
    },
    {
      label: 'Max Drawdown (Lower is better)',
      orig: `-${originalResult.maxDrawdownPercent}%`,
      exp: `-${experimentResult.maxDrawdownPercent}%`,
      diff: `${diffDrawdown > 0 ? '-' : '+'}${Math.abs(diffDrawdown).toFixed(1)}%`,
      isBetter: diffDrawdown > 0, // lower drawdown is better
      neutral: Math.abs(diffDrawdown) < 0.1,
    },
    {
      label: 'Win Rate',
      orig: `${originalResult.winRatePercent}%`,
      exp: `${experimentResult.winRatePercent}%`,
      diff: `${diffWinRate > 0 ? '+' : ''}${diffWinRate.toFixed(1)}%`,
      isBetter: diffWinRate > 0,
      neutral: Math.abs(diffWinRate) < 0.1,
    },
    {
      label: 'Profit Factor',
      orig: `${originalResult.profitFactor}x`,
      exp: `${experimentResult.profitFactor}x`,
      diff: `${diffProfitFactor > 0 ? '+' : ''}${diffProfitFactor.toFixed(2)}x`,
      isBetter: diffProfitFactor > 0,
      neutral: Math.abs(diffProfitFactor) < 0.05,
    },
    {
      label: 'Total Trades',
      orig: `${originalResult.totalTrades}`,
      exp: `${experimentResult.totalTrades}`,
      diff: `${diffTrades > 0 ? '+' : ''}${diffTrades}`,
      isBetter: true,
      neutral: true,
    },
    {
      label: 'CAGR (Annualized)',
      orig: `${originalResult.cagrPercent}%`,
      exp: `${experimentResult.cagrPercent}%`,
      diff: `${(experimentResult.cagrPercent - originalResult.cagrPercent).toFixed(1)}%`,
      isBetter: experimentResult.cagrPercent > originalResult.cagrPercent,
      neutral: Math.abs(experimentResult.cagrPercent - originalResult.cagrPercent) < 0.1,
    },
  ];

  // Overlaid Dual Equity Curve SVG
  const chartWidth = 850;
  const chartHeight = 240;
  const paddingX = 45;
  const paddingY = 20;

  const origCurve = originalResult.equityCurve;
  const expCurve = experimentResult.equityCurve;

  const allEquities = [
    ...origCurve.map(p => p.equity),
    ...expCurve.map(p => p.equity),
  ];
  const minEquity = Math.min(...allEquities) * 0.98;
  const maxEquity = Math.max(...allEquities) * 1.02;
  const range = maxEquity - minEquity || 1;

  const getX = (idx: number, total: number) => {
    return paddingX + (idx / (total - 1)) * (chartWidth - paddingX * 2);
  };
  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minEquity) / range) * (chartHeight - paddingY * 2);
  };

  const origPath = origCurve.reduce((acc, pt, i) => {
    const x = getX(i, origCurve.length);
    const y = getY(pt.equity);
    return `${acc} ${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  const expPath = expCurve.reduce((acc, pt, i) => {
    const x = getX(i, expCurve.length);
    const y = getY(pt.equity);
    return `${acc} ${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold uppercase tracking-wider mb-1">
            <GitCompare className="w-4 h-4" />
            <span>Experimentation Lab</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Original Strategy vs. Modified Experiment
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare performance differences to observe the effect of rule tweaks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onModifyAgain}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tweak Parameters Again</span>
          </button>

          <button
            onClick={onAcceptExperimentAsNewBaseline}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors shadow-sm"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Set as New Baseline</span>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-medium">
              <th className="pb-3 font-semibold">Key Metric</th>
              <th className="pb-3 font-semibold text-slate-300">
                Original ({originalResult.strategy.name})
              </th>
              <th className="pb-3 font-semibold text-teal-300">
                Experiment ({experimentResult.strategy.name})
              </th>
              <th className="pb-3 font-semibold text-right">Net Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 font-mono-num">
            {metrics.map((m, idx) => (
              <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                <td className="py-3 font-sans font-medium text-slate-300">
                  {m.label}
                </td>
                <td className="py-3 text-slate-400">{m.orig}</td>
                <td className="py-3 text-slate-100 font-bold">{m.exp}</td>
                <td className="py-3 text-right">
                  {m.neutral ? (
                    <span className="text-slate-400 font-semibold">{m.diff}</span>
                  ) : m.isBetter ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                      <ArrowUp className="w-3 h-3" />
                      <span>{m.diff}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded">
                      <ArrowDown className="w-3 h-3" />
                      <span>{m.diff}</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlaid Dual Equity Curve Chart */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-850">
          <span className="text-slate-400 font-semibold">
            Overlaid Portfolio Equity Comparison (₹1,00,000 Base)
          </span>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-500 rounded-full" />
              <span className="text-slate-400">Original</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-teal-400 rounded-full" />
              <span className="text-teal-300 font-bold">Experiment</span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[220px]">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
            {/* Grid line */}
            <line x1={paddingX} y1={getY(100000)} x2={chartWidth - paddingX} y2={getY(100000)} stroke="#334155" strokeDasharray="3 3" />

            {/* Original line */}
            <path d={origPath} fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="4 3" />

            {/* Experiment line */}
            <path d={expPath} fill="none" stroke="#14B8A6" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};
