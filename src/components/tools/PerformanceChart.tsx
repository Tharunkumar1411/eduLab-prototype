/**
 * Interactive Performance & Equity Curve Chart for Trading Lab.
 * Renders both Equity Curve vs Buy & Hold Benchmark and the Drawdown Sub-chart.
 */

import React, { useState } from 'react';
import { EquityPoint, Trade } from '../../engine/types.ts';

interface PerformanceChartProps {
  equityCurve: EquityPoint[];
  trades: Trade[];
  initialCapital: number;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  equityCurve,
  trades,
  initialCapital,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'equity' | 'drawdown'>('equity');

  if (equityCurve.length === 0) return null;

  const chartWidth = 850;
  const chartHeight = 280;
  const paddingX = 45;
  const paddingY = 25;

  // Determine min & max for equity curve
  const allEquities = equityCurve.flatMap(p => [p.equity, p.benchmarkEquity]);
  const minEquity = Math.min(...allEquities) * 0.97;
  const maxEquity = Math.max(...allEquities) * 1.03;
  const equityRange = maxEquity - minEquity || 1;

  // Drawdown min/max (0 to maxDrawdown)
  const maxDd = Math.max(...equityCurve.map(p => p.drawdownPercent), 5);

  const getX = (index: number) => {
    return paddingX + (index / (equityCurve.length - 1)) * (chartWidth - paddingX * 2);
  };

  const getYEquity = (val: number) => {
    return chartHeight - paddingY - ((val - minEquity) / equityRange) * (chartHeight - paddingY * 2);
  };

  const getYDrawdown = (dd: number) => {
    return paddingY + (dd / maxDd) * (chartHeight - paddingY * 2);
  };

  // Build Equity Line
  const equityPath = equityCurve.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getYEquity(pt.equity);
    return `${acc} ${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  // Fill area for equity
  const firstX = getX(0);
  const lastX = getX(equityCurve.length - 1);
  const bottomY = chartHeight - paddingY;
  const areaPath = `${equityPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

  // Benchmark line
  const benchmarkPath = equityCurve.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getYEquity(pt.benchmarkEquity);
    return `${acc} ${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  // Drawdown path
  const ddPath = equityCurve.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getYDrawdown(pt.drawdownPercent);
    return `${acc} ${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');
  const ddAreaPath = `${ddPath} L ${lastX} ${paddingY} L ${firstX} ${paddingY} Z`;

  const activePt = hoverIdx !== null ? equityCurve[hoverIdx] : equityCurve[equityCurve.length - 1];

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
      {/* Chart Controls & Readout Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-850">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'equity'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Portfolio Equity Curve
          </button>

          <button
            onClick={() => setActiveTab('drawdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'drawdown'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Drawdown (%)
          </button>
        </div>

        {/* Dynamic Hover Status */}
        <div className="flex items-center gap-4 text-xs font-mono-num">
          <div>
            <span className="text-slate-400">Date: </span>
            <span className="text-slate-200 font-bold">{activePt.date}</span>
          </div>

          {activeTab === 'equity' ? (
            <>
              <div>
                <span className="text-teal-400">Strategy: </span>
                <span className="text-slate-100 font-bold">
                  ₹{activePt.equity.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Buy & Hold: </span>
                <span className="text-slate-300">
                  ₹{activePt.benchmarkEquity.toLocaleString('en-IN')}
                </span>
              </div>
            </>
          ) : (
            <div>
              <span className="text-rose-400">Drawdown from Peak: </span>
              <span className="text-rose-300 font-bold">
                -{activePt.drawdownPercent}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[280px]">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full cursor-crosshair overflow-visible select-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const ratio = Math.max(0, Math.min(1, (mouseX - paddingX) / (chartWidth - paddingX * 2)));
            const index = Math.round(ratio * (equityCurve.length - 1));
            setHoverIdx(index);
          }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="drawdownGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {activeTab === 'equity' ? (
            <>
              {/* Horizontal Reference Lines */}
              {[0.25, 0.5, 0.75].map(ratio => {
                const y = paddingY + ratio * (chartHeight - paddingY * 2);
                const val = maxEquity - ratio * equityRange;
                return (
                  <g key={ratio}>
                    <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                    <text x={chartWidth - paddingX + 5} y={y + 3} fill="#64748B" fontSize="9" fontFamily="monospace">
                      ₹{(val / 1000).toFixed(0)}k
                    </text>
                  </g>
                );
              })}

              {/* Initial Capital Line (₹100k) */}
              <line
                x1={paddingX}
                y1={getYEquity(initialCapital)}
                x2={chartWidth - paddingX}
                y2={getYEquity(initialCapital)}
                stroke="#475569"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Area & Curves */}
              <path d={areaPath} fill="url(#equityGrad)" />
              <path d={benchmarkPath} fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d={equityPath} fill="none" stroke="#14B8A6" strokeWidth="2.5" />

              {/* Trade Entry/Exit Markers */}
              {trades.map(trade => {
                const entryIndex = equityCurve.findIndex(p => p.date === trade.entryDate);
                const exitIndex = equityCurve.findIndex(p => p.date === trade.exitDate);

                return (
                  <g key={trade.id}>
                    {entryIndex >= 0 && (
                      <circle
                        cx={getX(entryIndex)}
                        cy={getYEquity(equityCurve[entryIndex].equity)}
                        r="3"
                        fill="#10B981"
                        stroke="#0F172A"
                        strokeWidth="1.5"
                      />
                    )}
                    {exitIndex >= 0 && (
                      <circle
                        cx={getX(exitIndex)}
                        cy={getYEquity(equityCurve[exitIndex].equity)}
                        r="3.5"
                        fill={trade.pnl > 0 ? '#10B981' : '#F43F5E'}
                        stroke="#0F172A"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                );
              })}
            </>
          ) : (
            <>
              {/* Drawdown chart */}
              <path d={ddAreaPath} fill="url(#drawdownGrad)" />
              <path d={ddPath} fill="none" stroke="#F43F5E" strokeWidth="2" />
            </>
          )}

          {/* Hover Crosshair */}
          {hoverIdx !== null && (
            <g>
              <line
                x1={getX(hoverIdx)}
                y1={paddingY}
                x2={getX(hoverIdx)}
                y2={chartHeight - paddingY}
                stroke="#CBD5E1"
                strokeDasharray="2 2"
              />
              <circle
                cx={getX(hoverIdx)}
                cy={
                  activeTab === 'equity'
                    ? getYEquity(equityCurve[hoverIdx].equity)
                    : getYDrawdown(equityCurve[hoverIdx].drawdownPercent)
                }
                r="4.5"
                fill={activeTab === 'equity' ? '#14B8A6' : '#F43F5E'}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-850">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-teal-400 rounded-full" />
            <span className="text-slate-300">Strategy Portfolio</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-slate-400" />
            <span>Buy & Hold Benchmark</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Buy Signal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>Sell Signal</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500">
          Hover across chart to inspect daily portfolio equity
        </div>
      </div>
    </div>
  );
};
