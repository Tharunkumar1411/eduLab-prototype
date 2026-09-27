/**
 * Stock Explorer Component for Indian Blue-chips.
 * Provides interactive price chart, indicator toggles, and fundamental valuation stats.
 */

import React, { useState } from 'react';
import { INDIAN_STOCKS } from '../../data/stocks.ts';
import { StockInfo } from '../../engine/types.ts';
import { calculateSMA } from '../../engine/indicators.ts';
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, TrendingUp } from 'lucide-react';

interface StockExplorerProps {
  selectedStock: StockInfo;
  onSelectStock: (stock: StockInfo) => void;
  onProceedToBuilder: () => void;
  onProceedToTechTools?: () => void;
}

export const StockExplorer: React.FC<StockExplorerProps> = ({
  selectedStock,
  onSelectStock,
  onProceedToBuilder,
  onProceedToTechTools,
}) => {
  const [showSMA20, setShowSMA20] = useState(true);
  const [showSMA50, setShowSMA50] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const history = selectedStock.history;
  const sma20 = calculateSMA(history, 20);
  const sma50 = calculateSMA(history, 50);

  // SVG Chart Dimensions & Math
  const minPrice = Math.min(...history.map(d => d.low)) * 0.98;
  const maxPrice = Math.max(...history.map(d => d.high)) * 1.02;
  const priceRange = maxPrice - minPrice || 1;

  const chartWidth = 800;
  const chartHeight = 280;
  const paddingX = 40;
  const paddingY = 20;

  const getX = (index: number) => {
    return paddingX + (index / (history.length - 1)) * (chartWidth - paddingX * 2);
  };

  const getY = (price: number) => {
    return chartHeight - paddingY - ((price - minPrice) / priceRange) * (chartHeight - paddingY * 2);
  };

  // Build price path
  const pricePath = history.reduce((acc, bar, i) => {
    const x = getX(i);
    const y = getY(bar.close);
    return `${acc} ${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  // Fill area path
  const firstX = getX(0);
  const lastX = getX(history.length - 1);
  const bottomY = chartHeight - paddingY;
  const areaPath = `${pricePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

  // Build SMA paths
  const getSmaPath = (series: (number | null)[]) => {
    let path = '';
    for (let i = 0; i < series.length; i++) {
      const val = series[i];
      if (val !== null) {
        const x = getX(i);
        const y = getY(val);
        path += `${path === '' ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
    }
    return path;
  };

  const sma20Path = showSMA20 ? getSmaPath(sma20) : '';
  const sma50Path = showSMA50 ? getSmaPath(sma50) : '';

  const activeBar = hoverIndex !== null ? history[hoverIndex] : history[history.length - 1];

  return (
    <div className="space-y-6">
      {/* Stock Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {INDIAN_STOCKS.map(s => {
          const isSelected = s.symbol === selectedStock.symbol;
          const isPositive = s.changePercent >= 0;

          return (
            <button
              key={s.symbol}
              onClick={() => onSelectStock(s)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all shrink-0 ${
                isSelected
                  ? 'bg-slate-800 border-teal-500 shadow-md ring-1 ring-teal-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-100 font-mono-num">{s.symbol}</span>
                  <span className={`text-[11px] font-mono-num font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? '+' : ''}{s.changePercent}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block truncate max-w-[130px]">
                  {s.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Stock Detail Banner & Interactive Price Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        {/* Header with price and quick indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>NSE / BSE Listed</span>
              <span>·</span>
              <span>{selectedStock.sector}</span>
              <span>·</span>
              <span>1 Year Daily Candles</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <span>{selectedStock.name}</span>
              <span className="text-sm font-mono-num font-semibold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded">
                ₹{selectedStock.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </h2>
          </div>

          {/* Indicator Overlay Toggles */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setShowSMA20(!showSMA20)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                showSMA20 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>SMA 20</span>
            </button>

            <button
              onClick={() => setShowSMA50(!showSMA50)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                showSMA50 ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>SMA 50</span>
            </button>
          </div>
        </div>

        {/* SVG Interactive Chart */}
        <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden">
          {/* Active tooltip hover info */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-850">
            <div>
              Date: <span className="text-slate-200 font-mono-num font-semibold">{activeBar.date}</span>
            </div>
            <div className="flex items-center gap-3 font-mono-num">
              <span>O: <strong className="text-slate-200">₹{activeBar.open}</strong></span>
              <span>H: <strong className="text-slate-200">₹{activeBar.high}</strong></span>
              <span>L: <strong className="text-slate-200">₹{activeBar.low}</strong></span>
              <span>C: <strong className="text-emerald-400">₹{activeBar.close}</strong></span>
            </div>
          </div>

          <div className="relative w-full h-[280px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full cursor-crosshair overflow-visible"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, (mouseX - paddingX) / (chartWidth - paddingX * 2)));
                const index = Math.round(ratio * (history.length - 1));
                setHoverIndex(index);
              }}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="stockAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Price Grid Lines */}
              {[0.25, 0.5, 0.75].map(ratio => {
                const y = paddingY + ratio * (chartHeight - paddingY * 2);
                const price = maxPrice - ratio * priceRange;
                return (
                  <g key={ratio}>
                    <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                    <text x={chartWidth - paddingX + 5} y={y + 3} fill="#64748B" fontSize="9" fontFamily="monospace">
                      ₹{price.toFixed(0)}
                    </text>
                  </g>
                );
              })}

              {/* Area & Price Line */}
              <path d={areaPath} fill="url(#stockAreaGrad)" />
              <path d={pricePath} fill="none" stroke="#14B8A6" strokeWidth="2" />

              {/* SMA 20 Overlay */}
              {showSMA20 && sma20Path && (
                <path d={sma20Path} fill="none" stroke="#F59E0B" strokeWidth="1.75" />
              )}

              {/* SMA 50 Overlay */}
              {showSMA50 && sma50Path && (
                <path d={sma50Path} fill="none" stroke="#3B82F6" strokeWidth="1.75" />
              )}

              {/* Hover Cursor Vertical Line */}
              {hoverIndex !== null && (
                <g>
                  <line
                    x1={getX(hoverIndex)}
                    y1={paddingY}
                    x2={getX(hoverIndex)}
                    y2={chartHeight - paddingY}
                    stroke="#94A3B8"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={getX(hoverIndex)}
                    cy={getY(history[hoverIndex].close)}
                    r="4"
                    fill="#14B8A6"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Fundamental Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Market Cap</span>
            <span className="text-sm font-bold font-mono-num text-slate-200 mt-0.5 block">
              ₹{(selectedStock.marketCapCr / 100000).toFixed(1)} Lakh Cr
            </span>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block">P/E Ratio</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-bold font-mono-num text-slate-200">
                {selectedStock.peRatio}x
              </span>
              <span className="text-[10px] text-slate-400 font-mono-num">
                (Ind: {selectedStock.industryPe}x)
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Earnings / Share (EPS)</span>
            <span className="text-sm font-bold font-mono-num text-slate-200 mt-0.5 block">
              ₹{selectedStock.eps}
            </span>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Return on Equity (ROE)</span>
            <span className="text-sm font-bold font-mono-num text-emerald-400 mt-0.5 block">
              {selectedStock.roe}%
            </span>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block">52W High</span>
            <span className="text-sm font-bold font-mono-num text-slate-200 mt-0.5 block">
              ₹{selectedStock.high52W}
            </span>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block">52W Low</span>
            <span className="text-sm font-bold font-mono-num text-slate-200 mt-0.5 block">
              ₹{selectedStock.low52W}
            </span>
          </div>
        </div>

        {/* CTAs to Tech Tools Simulator and Strategy Builder */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-400 max-w-sm">
            Ready to test trading hypotheses on <strong className="text-slate-200">{selectedStock.symbol}</strong>? Master technical tools or backtest automated rules.
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onProceedToTechTools && (
              <button
                onClick={onProceedToTechTools}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs border border-teal-500/40 transition-colors shadow-sm"
              >
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span>Practice Technical Tools</span>
              </button>
            )}

            <button
              onClick={onProceedToBuilder}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-teal-500/20"
            >
              <span>Strategy Builder</span>
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
