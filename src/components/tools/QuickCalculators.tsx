/**
 * Quick Financial Calculators Suite:
 * - Position Sizing (Risk % & Share Calculation)
 * - Risk / Reward Ratio & Breakeven Rate
 * - CAGR (Compound Annual Growth Rate)
 * - Indian Stock Fundamental Comparison
 */

import React, { useState } from 'react';
import { INDIAN_STOCKS } from '../../data/stocks.ts';
import { Calculator, Check, Scale, Shield, TrendingUp } from 'lucide-react';

export const QuickCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'position' | 'riskreward' | 'cagr' | 'compare'>('position');

  // Position Sizing state
  const [capital, setCapital] = useState<number>(100000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [entryPrice, setEntryPrice] = useState<number>(2980);
  const [stopPrice, setStopPrice] = useState<number>(2831);

  // Risk Reward state
  const [rrEntry, setRrEntry] = useState<number>(1800);
  const [rrTarget, setRrTarget] = useState<number>(2160);
  const [rrStop, setRrStop] = useState<number>(1680);

  // CAGR state
  const [cagrStart, setCagrStart] = useState<number>(50000);
  const [cagrEnd, setCagrEnd] = useState<number>(115000);
  const [cagrYears, setCagrYears] = useState<number>(3.5);

  // Stock Compare state
  const [stockAIdx, setStockAIdx] = useState<number>(0);
  const [stockBIdx, setStockBIdx] = useState<number>(1);

  // Calculations
  const maxRupeeRisk = (capital * riskPercent) / 100;
  const perShareRisk = Math.max(0.1, entryPrice - stopPrice);
  const recommendedShares = entryPrice > stopPrice ? Math.floor(maxRupeeRisk / perShareRisk) : 0;
  const totalPositionOutlay = recommendedShares * entryPrice;

  // RR Calc
  const rrRisk = Math.max(0.1, rrEntry - rrStop);
  const rrReward = Math.max(0.1, rrTarget - rrEntry);
  const rrRatio = rrRisk > 0 ? (rrReward / rrRisk).toFixed(2) : '0';
  const breakevenWinRate = rrRisk + rrReward > 0 ? ((rrRisk / (rrRisk + rrReward)) * 100).toFixed(1) : '50';

  // CAGR Calc
  const cagrValue =
    cagrStart > 0 && cagrEnd > 0 && cagrYears > 0
      ? ((Math.pow(cagrEnd / cagrStart, 1 / cagrYears) - 1) * 100).toFixed(2)
      : '0';

  const stockA = INDIAN_STOCKS[stockAIdx];
  const stockB = INDIAN_STOCKS[stockBIdx];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
      {/* Tab navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('position')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'position'
              ? 'bg-slate-800 text-teal-300 shadow-sm border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Position Sizing</span>
        </button>

        <button
          onClick={() => setActiveTab('riskreward')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'riskreward'
              ? 'bg-slate-800 text-teal-300 shadow-sm border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Risk / Reward</span>
        </button>

        <button
          onClick={() => setActiveTab('cagr')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'cagr'
              ? 'bg-slate-800 text-teal-300 shadow-sm border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>CAGR Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'compare'
              ? 'bg-slate-800 text-teal-300 shadow-sm border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Stock Compare</span>
        </button>
      </div>

      {/* 1. POSITION SIZING */}
      {activeTab === 'position' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                Disciplined Position Size Calculator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Never risk more than a fixed percentage of your total account on any single trade.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Total Trading Capital (₹)</label>
                <input
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Max Risk per Trade (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Entry Price (₹)</label>
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Stop Loss Price (₹)</label>
                  <input
                    type="number"
                    value={stopPrice}
                    onChange={(e) => setStopPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold text-teal-400 tracking-wider block">
                Calculated Allocation
              </span>

              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[11px] text-slate-400 block">Buy Exactly</span>
                <span className="text-2xl font-bold font-mono-num text-teal-300 mt-0.5 block">
                  {recommendedShares} Shares
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <span className="text-slate-400 block">Total Outlay</span>
                  <span className="font-mono-num font-bold text-slate-200 mt-0.5 block">
                    ₹{totalPositionOutlay.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <span className="text-slate-400 block">Max Rupee Risk</span>
                  <span className="font-mono-num font-bold text-rose-400 mt-0.5 block">
                    ₹{maxRupeeRisk.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-850 pt-3">
              Rule: If the stop price of ₹{stopPrice} is hit, your total loss will be exactly ₹{maxRupeeRisk} ({riskPercent}% of account), preventing emotional blown accounts.
            </p>
          </div>
        </div>
      )}

      {/* 2. RISK / REWARD */}
      {activeTab === 'riskreward' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                Risk-to-Reward & Probability Analyzer
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculate potential return versus downside risk to ensure positive expected value.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Target Price (₹)</label>
                <input
                  type="number"
                  value={rrTarget}
                  onChange={(e) => setRrTarget(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Entry Price (₹)</label>
                <input
                  type="number"
                  value={rrEntry}
                  onChange={(e) => setRrEntry(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Stop Loss (₹)</label>
                <input
                  type="number"
                  value={rrStop}
                  onChange={(e) => setRrStop(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-rose-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold text-teal-400 tracking-wider block">
                Trade Ratio Analysis
              </span>

              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[11px] text-slate-400 block">Risk : Reward Ratio</span>
                <span className="text-2xl font-bold font-mono-num text-amber-300 mt-0.5 block">
                  1 : {rrRatio}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <span className="text-slate-400 block">Upside Potential</span>
                  <span className="font-mono-num font-bold text-emerald-400 mt-0.5 block">
                    +{(((rrTarget - rrEntry) / rrEntry) * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <span className="text-slate-400 block">Downside Risk</span>
                  <span className="font-mono-num font-bold text-rose-400 mt-0.5 block">
                    -{(((rrEntry - rrStop) / rrEntry) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-850 pt-3">
              With a 1:{rrRatio} ratio, your strategy needs a win rate of at least <strong className="text-slate-300 font-mono-num">{breakevenWinRate}%</strong> to break even long-term.
            </p>
          </div>
        </div>
      )}

      {/* 3. CAGR */}
      {activeTab === 'cagr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                Compound Annual Growth Rate (CAGR)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Measure the true annualized compounding return across any multi-year period.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Initial Investment (₹)</label>
                <input
                  type="number"
                  value={cagrStart}
                  onChange={(e) => setCagrStart(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Final Portfolio Value (₹)</label>
                <input
                  type="number"
                  value={cagrEnd}
                  onChange={(e) => setCagrEnd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Duration (Years)</label>
                <input
                  type="number"
                  step="0.25"
                  value={cagrYears}
                  onChange={(e) => setCagrYears(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono-num font-bold text-slate-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold text-teal-400 tracking-wider block">
                Compounding Result
              </span>

              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[11px] text-slate-400 block">CAGR Return</span>
                <span className="text-2xl font-bold font-mono-num text-emerald-400 mt-0.5 block">
                  {cagrValue}% / year
                </span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
                <span className="text-slate-400 block">Total Absolute Gain</span>
                <span className="font-mono-num font-bold text-slate-200 mt-0.5 block">
                  +₹{(cagrEnd - cagrStart).toLocaleString('en-IN')} ({(((cagrEnd - cagrStart) / cagrStart) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-850 pt-3">
              CAGR smooths out market fluctuations to show the steady geometric rate at which wealth compounded.
            </p>
          </div>
        </div>
      )}

      {/* 4. STOCK COMPARE */}
      {activeTab === 'compare' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-slate-100">
              Fundamental Peer Benchmarking
            </h3>

            <div className="flex items-center gap-3">
              <select
                value={stockAIdx}
                onChange={(e) => setStockAIdx(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-200"
              >
                {INDIAN_STOCKS.map((s, idx) => (
                  <option key={s.symbol} value={idx}>{s.symbol} ({s.name})</option>
                ))}
              </select>

              <span className="text-xs text-slate-500 font-semibold">vs</span>

              <select
                value={stockBIdx}
                onChange={(e) => setStockBIdx(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-200"
              >
                {INDIAN_STOCKS.map((s, idx) => (
                  <option key={s.symbol} value={idx}>{s.symbol} ({s.name})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3 font-semibold">Metric</th>
                  <th className="pb-3 font-semibold text-teal-300 font-mono-num">{stockA.symbol}</th>
                  <th className="pb-3 font-semibold text-amber-300 font-mono-num">{stockB.symbol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 font-mono-num">
                <tr>
                  <td className="py-2.5 font-sans font-medium text-slate-300">Sector</td>
                  <td className="py-2.5 text-slate-300 font-sans">{stockA.sector}</td>
                  <td className="py-2.5 text-slate-300 font-sans">{stockB.sector}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-medium text-slate-300">Market Cap</td>
                  <td className="py-2.5 text-slate-100 font-bold">₹{(stockA.marketCapCr / 100000).toFixed(1)}L Cr</td>
                  <td className="py-2.5 text-slate-100 font-bold">₹{(stockB.marketCapCr / 100000).toFixed(1)}L Cr</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-medium text-slate-300">P/E Ratio</td>
                  <td className="py-2.5 text-slate-200">{stockA.peRatio}x (Ind: {stockA.industryPe}x)</td>
                  <td className="py-2.5 text-slate-200">{stockB.peRatio}x (Ind: {stockB.industryPe}x)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-medium text-slate-300">Earnings Per Share (EPS)</td>
                  <td className="py-2.5 text-slate-200">₹{stockA.eps}</td>
                  <td className="py-2.5 text-slate-200">₹{stockB.eps}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-medium text-slate-300">Return on Equity (ROE)</td>
                  <td className="py-2.5 text-emerald-400 font-bold">{stockA.roe}%</td>
                  <td className="py-2.5 text-emerald-400 font-bold">{stockB.roe}%</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-medium text-slate-300">52-Week Range</td>
                  <td className="py-2.5 text-slate-400">₹{stockA.low52W} – ₹{stockA.high52W}</td>
                  <td className="py-2.5 text-slate-400">₹{stockB.low52W} – ₹{stockB.high52W}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
