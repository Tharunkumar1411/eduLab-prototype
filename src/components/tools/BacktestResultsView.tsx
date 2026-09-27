/**
 * Backtest Results Dashboard View.
 * Displays performance metrics cards, interactive performance charts, and detailed trade log.
 */

import React, { useState } from 'react';
import { BacktestResult } from '../../engine/types.ts';
import { PerformanceChart } from './PerformanceChart.tsx';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronRight, FileSpreadsheet, RotateCcw, Sliders, XCircle } from 'lucide-react';

interface BacktestResultsViewProps {
  result: BacktestResult;
  onModifyAndCompare: () => void;
  onNewStrategy: () => void;
}

export const BacktestResultsView: React.FC<BacktestResultsViewProps> = ({
  result,
  onModifyAndCompare,
  onNewStrategy,
}) => {
  const [showAllTrades, setShowAllTrades] = useState(false);

  const isReturnPositive = result.totalReturnPercent >= 0;
  const isBenchmarkBeaten = result.totalReturnPercent > result.benchmarkReturnPercent;
  const displayedTrades = showAllTrades ? result.trades : result.trades.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* 6-Card Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. Total Return */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            Total Return
          </span>
          <div className="flex items-center gap-1">
            <span
              className={`text-lg font-bold font-mono-num ${
                isReturnPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isReturnPositive ? '+' : ''}{result.totalReturnPercent}%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono-num block truncate">
            B&H: {result.benchmarkReturnPercent > 0 ? '+' : ''}{result.benchmarkReturnPercent}%
          </span>
        </div>

        {/* 2. Final Capital */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            Final Capital
          </span>
          <span className="text-lg font-bold font-mono-num text-slate-100 block">
            ₹{result.finalCapital.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-500 font-mono-num block">
            Start: ₹{result.initialCapital.toLocaleString('en-IN')}
          </span>
        </div>

        {/* 3. CAGR */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            CAGR
          </span>
          <span className="text-lg font-bold font-mono-num text-slate-100 block">
            {result.cagrPercent}%
          </span>
          <span className="text-[10px] text-slate-500 block">
            Annualized rate
          </span>
        </div>

        {/* 4. Max Drawdown */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            Max Drawdown
          </span>
          <span className="text-lg font-bold font-mono-num text-rose-400 block">
            -{result.maxDrawdownPercent}%
          </span>
          <span className="text-[10px] text-slate-500 block">
            Peak to trough
          </span>
        </div>

        {/* 5. Win Rate */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            Win Rate
          </span>
          <span className="text-lg font-bold font-mono-num text-teal-400 block">
            {result.winRatePercent}%
          </span>
          <span className="text-[10px] text-slate-500 font-mono-num block">
            {result.winningTrades}W / {result.losingTrades}L
          </span>
        </div>

        {/* 6. Profit Factor */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            Profit Factor
          </span>
          <span className="text-lg font-bold font-mono-num text-amber-300 block">
            {result.profitFactor}x
          </span>
          <span className="text-[10px] text-slate-500 block">
            Gross gains / losses
          </span>
        </div>
      </div>

      {/* Performance Chart with Equity & Drawdown curves */}
      <PerformanceChart
        equityCurve={result.equityCurve}
        trades={result.trades}
        initialCapital={result.initialCapital}
      />

      {/* Trade History Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Execution Trade History ({result.trades.length} Trades)
            </h3>
          </div>

          {result.trades.length > 8 && (
            <button
              onClick={() => setShowAllTrades(!showAllTrades)}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              {showAllTrades ? 'Show Less' : `View All ${result.trades.length} Trades`}
            </button>
          )}
        </div>

        {result.trades.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No trades triggered. The indicator entry conditions were not met during this time window.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-2.5 font-semibold">Trade #</th>
                  <th className="pb-2.5 font-semibold">Entry Date</th>
                  <th className="pb-2.5 font-semibold">Entry (₹)</th>
                  <th className="pb-2.5 font-semibold">Exit Date</th>
                  <th className="pb-2.5 font-semibold">Exit (₹)</th>
                  <th className="pb-2.5 font-semibold">Hold</th>
                  <th className="pb-2.5 font-semibold">Exit Reason</th>
                  <th className="pb-2.5 font-semibold text-right">Net P&L (₹)</th>
                  <th className="pb-2.5 font-semibold text-right">Return %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 font-mono-num">
                {displayedTrades.map((t, idx) => {
                  const isWin = t.pnl > 0;

                  return (
                    <tr key={t.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-2.5 font-medium text-slate-300">0{idx + 1}</td>
                      <td className="py-2.5 text-slate-300">{t.entryDate}</td>
                      <td className="py-2.5 text-slate-200">₹{t.entryPrice.toFixed(2)}</td>
                      <td className="py-2.5 text-slate-300">{t.exitDate}</td>
                      <td className="py-2.5 text-slate-200">₹{t.exitPrice.toFixed(2)}</td>
                      <td className="py-2.5 text-slate-400">{t.holdBars} days</td>
                      <td className="py-2.5">
                        <span
                          className={`text-[11px] font-sans font-semibold ${
                            t.exitReason === 'stop_loss'
                              ? 'text-rose-400'
                              : t.exitReason === 'take_profit'
                              ? 'text-emerald-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {t.exitReason === 'stop_loss'
                            ? 'Stop Loss Trigger'
                            : t.exitReason === 'take_profit'
                            ? 'Take Profit Target'
                            : 'Indicator Signal'}
                        </span>
                      </td>
                      <td className={`py-2.5 text-right font-bold ${isWin ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isWin ? '+' : ''}₹{t.pnl.toLocaleString('en-IN')}
                      </td>
                      <td className={`py-2.5 text-right font-bold ${isWin ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isWin ? '+' : ''}{t.pnlPercent}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Experimentation CTA Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Strategy: <strong className="text-slate-200">{result.strategy.name}</strong> on <strong className="text-slate-200">{result.stockSymbol}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNewStrategy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-850 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Rules</span>
            </button>

            <button
              onClick={onModifyAndCompare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-md shadow-teal-900/30"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Modify & Compare Experiment →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
