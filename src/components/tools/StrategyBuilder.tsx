/**
 * Visual Strategy Builder for Trading Lab.
 * Allows constructing no-code algorithmic trading hypotheses.
 */

import React, { useState } from 'react';
import { Condition, Strategy } from '../../engine/types.ts';
import { STRATEGY_PRESETS } from '../../data/presets.ts';
import { ConditionRow } from './ConditionRow.tsx';
import { Code, Play, Plus, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';

interface StrategyBuilderProps {
  strategy: Strategy;
  onUpdateStrategy: (strategy: Strategy) => void;
  onRunBacktest: () => void;
  selectedStockSymbol: string;
}

export const StrategyBuilder: React.FC<StrategyBuilderProps> = ({
  strategy,
  onUpdateStrategy,
  onRunBacktest,
  selectedStockSymbol,
}) => {
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  const handleApplyPreset = (preset: Strategy) => {
    onUpdateStrategy({
      ...preset,
      id: `strategy_${Date.now()}`,
    });
  };

  const handleAddEntryCondition = () => {
    const newCondition: Condition = {
      id: `entry_${Date.now()}`,
      leftIndicator: { type: 'RSI', period: 14 },
      operator: 'is_below',
      rightType: 'value',
      rightValue: 65,
    };
    onUpdateStrategy({
      ...strategy,
      entryConditions: [...strategy.entryConditions, newCondition],
    });
  };

  const handleUpdateEntryCondition = (index: number, updated: Condition) => {
    const next = [...strategy.entryConditions];
    next[index] = updated;
    onUpdateStrategy({ ...strategy, entryConditions: next });
  };

  const handleDeleteEntryCondition = (index: number) => {
    const next = strategy.entryConditions.filter((_, i) => i !== index);
    onUpdateStrategy({ ...strategy, entryConditions: next });
  };

  const handleAddExitCondition = () => {
    const newCondition: Condition = {
      id: `exit_${Date.now()}`,
      leftIndicator: { type: 'SMA', period: 20 },
      operator: 'crosses_below',
      rightType: 'indicator',
      rightIndicator: { type: 'SMA', period: 50 },
    };
    onUpdateStrategy({
      ...strategy,
      exitConditions: [...strategy.exitConditions, newCondition],
    });
  };

  const handleUpdateExitCondition = (index: number, updated: Condition) => {
    const next = [...strategy.exitConditions];
    next[index] = updated;
    onUpdateStrategy({ ...strategy, exitConditions: next });
  };

  const handleDeleteExitCondition = (index: number) => {
    const next = strategy.exitConditions.filter((_, i) => i !== index);
    onUpdateStrategy({ ...strategy, exitConditions: next });
  };

  return (
    <div className="space-y-6">
      {/* Presets Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
              Quick Start Strategy Presets
            </span>
          </div>
          <span className="text-xs text-slate-400">Click to load pre-configured logic</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {STRATEGY_PRESETS.map((preset) => {
            const isActive = strategy.name === preset.name;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-slate-800 border-teal-500 shadow-md ring-1 ring-teal-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="text-xs font-bold text-slate-100 block">
                  {preset.name}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block line-clamp-2 leading-relaxed">
                  {preset.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Strategy Builder Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        {/* Strategy Name & Desc input */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-semibold text-slate-400 tracking-wider block">
            Strategy Title
          </label>
          <input
            type="text"
            value={strategy.name}
            onChange={(e) => onUpdateStrategy({ ...strategy, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-100 focus:outline-none focus:border-teal-500"
            placeholder="My Custom Strategy"
          />
        </div>

        {/* 1. ENTRY CONDITIONS (ALL CONDITIONS MUST BE MET: AND) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>ENTRY LOGIC (Buy Signal)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every condition below must simultaneously evaluate to TRUE to enter a long position.
              </p>
            </div>

            <button
              onClick={handleAddEntryCondition}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Condition</span>
            </button>
          </div>

          <div className="space-y-2">
            {strategy.entryConditions.map((condition, idx) => (
              <ConditionRow
                key={condition.id}
                condition={condition}
                prefixLabel={idx === 0 ? 'WHEN' : 'AND'}
                onChange={(updated) => handleUpdateEntryCondition(idx, updated)}
                onDelete={() => handleDeleteEntryCondition(idx)}
                canDelete={strategy.entryConditions.length > 1}
              />
            ))}
          </div>
        </div>

        {/* 2. EXIT CONDITIONS (ANY CONDITION TRIGGERS EXIT: OR) */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span>EXIT LOGIC (Sell Signal)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Position closes whenever an indicator signal triggers OR when risk stop levels are reached.
              </p>
            </div>

            <button
              onClick={handleAddExitCondition}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Exit Rule</span>
            </button>
          </div>

          <div className="space-y-2">
            {strategy.exitConditions.map((condition, idx) => (
              <ConditionRow
                key={condition.id}
                condition={condition}
                prefixLabel={idx === 0 ? 'EXIT' : 'OR'}
                onChange={(updated) => handleUpdateExitCondition(idx, updated)}
                onDelete={() => handleDeleteExitCondition(idx)}
                canDelete={strategy.exitConditions.length > 1}
              />
            ))}
          </div>
        </div>

        {/* 3. RISK MANAGEMENT CONTROLS */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Risk Management Controls
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Professional traders prioritize capital defense over win rate. Automated stops protect your portfolio from catastrophic trends.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stop Loss */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  Stop Loss (% from Entry)
                </span>
                <input
                  type="checkbox"
                  checked={strategy.risk.stopLossPercent !== null}
                  onChange={(e) =>
                    onUpdateStrategy({
                      ...strategy,
                      risk: {
                        ...strategy.risk,
                        stopLossPercent: e.target.checked ? 5 : null,
                      },
                    })
                  }
                  className="rounded text-teal-500 focus:ring-teal-500"
                />
              </div>

              {strategy.risk.stopLossPercent !== null ? (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={strategy.risk.stopLossPercent ?? 5}
                    onChange={(e) =>
                      onUpdateStrategy({
                        ...strategy,
                        risk: {
                          ...strategy.risk,
                          stopLossPercent: Number(e.target.value),
                        },
                      })
                    }
                    className="flex-1 accent-teal-500"
                  />
                  <span className="text-xs font-mono-num font-bold text-rose-400 w-12 text-right">
                    -{strategy.risk.stopLossPercent}%
                  </span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-500 block">
                  Disabled (positions will hold through adverse moves until indicator triggers)
                </span>
              )}
            </div>

            {/* Take Profit */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  Take Profit Target (%)
                </span>
                <input
                  type="checkbox"
                  checked={strategy.risk.takeProfitPercent !== null}
                  onChange={(e) =>
                    onUpdateStrategy({
                      ...strategy,
                      risk: {
                        ...strategy.risk,
                        takeProfitPercent: e.target.checked ? 15 : null,
                      },
                    })
                  }
                  className="rounded text-teal-500 focus:ring-teal-500"
                />
              </div>

              {strategy.risk.takeProfitPercent !== null ? (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="3"
                    max="40"
                    step="1"
                    value={strategy.risk.takeProfitPercent ?? 15}
                    onChange={(e) =>
                      onUpdateStrategy({
                        ...strategy,
                        risk: {
                          ...strategy.risk,
                          takeProfitPercent: Number(e.target.value),
                        },
                      })
                    }
                    className="flex-1 accent-teal-500"
                  />
                  <span className="text-xs font-mono-num font-bold text-emerald-400 w-12 text-right">
                    +{strategy.risk.takeProfitPercent}%
                  </span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-500 block">
                  Disabled (profit runs until technical exit rule triggers)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Live JSON Toggle for technical curiosity */}
        <div className="pt-2">
          <button
            onClick={() => setShowJsonPreview(!showJsonPreview)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-300 font-medium"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showJsonPreview ? 'Hide JSON Spec' : 'Inspect Strategy JSON Specification'}</span>
          </button>

          {showJsonPreview && (
            <pre className="mt-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono-num text-teal-300 overflow-x-auto max-h-56">
              {JSON.stringify(strategy, null, 2)}
            </pre>
          )}
        </div>

        {/* Action Button: Run Backtest */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Testing on <strong className="text-slate-200">{selectedStockSymbol}</strong> with ₹1,00,000 capital & 0.1% fees
          </div>

          <button
            onClick={onRunBacktest}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-emerald-900/40"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Run Backtest Simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
