/**
 * Visual Condition Row Builder for Strategy Builder.
 * Allows visually selecting: [Indicator] [Operator] [Target Indicator / Value].
 */

import React from 'react';
import { Condition, IndicatorType, Operator } from '../../engine/types.ts';
import { Trash2 } from 'lucide-react';

interface ConditionRowProps {
  condition: Condition;
  onChange: (updated: Condition) => void;
  onDelete: () => void;
  canDelete: boolean;
  prefixLabel?: string;
}

export const ConditionRow: React.FC<ConditionRowProps> = ({
  condition,
  onChange,
  onDelete,
  canDelete,
  prefixLabel = 'WHEN',
}) => {
  const handleLeftTypeChange = (type: IndicatorType) => {
    onChange({
      ...condition,
      leftIndicator: {
        type,
        period: type === 'RSI' ? 14 : condition.leftIndicator.period ?? 20,
      },
    });
  };

  const handleLeftPeriodChange = (period: number) => {
    onChange({
      ...condition,
      leftIndicator: {
        ...condition.leftIndicator,
        period: Math.max(2, Math.min(200, period)),
      },
    });
  };

  const handleOperatorChange = (operator: Operator) => {
    onChange({
      ...condition,
      operator,
    });
  };

  const handleRightTypeChange = (rightType: 'indicator' | 'value') => {
    if (rightType === 'indicator') {
      onChange({
        ...condition,
        rightType,
        rightIndicator: { type: 'SMA', period: 50 },
        rightValue: undefined,
      });
    } else {
      onChange({
        ...condition,
        rightType,
        rightIndicator: undefined,
        rightValue: 50,
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
      {/* Prefix Label */}
      <span className="text-xs font-bold text-teal-400 font-mono-num w-12 shrink-0">
        {prefixLabel}
      </span>

      {/* Left Indicator Type */}
      <select
        value={condition.leftIndicator.type}
        onChange={(e) => handleLeftTypeChange(e.target.value as IndicatorType)}
        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-100 focus:outline-none focus:border-teal-500"
      >
        <option value="SMA">SMA</option>
        <option value="EMA">EMA</option>
        <option value="RSI">RSI</option>
        <option value="PRICE">Price</option>
      </select>

      {/* Left Period (if applicable) */}
      {condition.leftIndicator.type !== 'PRICE' && (
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
          <span className="text-[11px] text-slate-400">Period:</span>
          <input
            type="number"
            value={condition.leftIndicator.period ?? 20}
            onChange={(e) => handleLeftPeriodChange(Number(e.target.value))}
            className="w-12 bg-transparent text-xs font-mono-num font-bold text-slate-100 focus:outline-none text-center"
            min={2}
            max={200}
          />
        </div>
      )}

      {/* Operator */}
      <select
        value={condition.operator}
        onChange={(e) => handleOperatorChange(e.target.value as Operator)}
        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-amber-300 focus:outline-none focus:border-amber-500"
      >
        <option value="crosses_above">crosses above ↑</option>
        <option value="crosses_below">crosses below ↓</option>
        <option value="is_above">is above &gt;</option>
        <option value="is_below">is below &lt;</option>
      </select>

      {/* Target: Indicator vs Numeric Value Selector */}
      <select
        value={condition.rightType}
        onChange={(e) => handleRightTypeChange(e.target.value as 'indicator' | 'value')}
        className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-300 focus:outline-none"
      >
        <option value="indicator">Indicator</option>
        <option value="value">Fixed Value</option>
      </select>

      {/* Right Indicator or Fixed Value */}
      {condition.rightType === 'indicator' && condition.rightIndicator ? (
        <div className="flex items-center gap-1.5">
          <select
            value={condition.rightIndicator.type}
            onChange={(e) =>
              onChange({
                ...condition,
                rightIndicator: {
                  type: e.target.value as IndicatorType,
                  period: condition.rightIndicator?.period ?? 50,
                },
              })
            }
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-100 focus:outline-none"
          >
            <option value="SMA">SMA</option>
            <option value="EMA">EMA</option>
            <option value="RSI">RSI</option>
            <option value="PRICE">Price</option>
          </select>

          {condition.rightIndicator.type !== 'PRICE' && (
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
              <span className="text-[11px] text-slate-400">Period:</span>
              <input
                type="number"
                value={condition.rightIndicator.period ?? 50}
                onChange={(e) =>
                  onChange({
                    ...condition,
                    rightIndicator: {
                      ...condition.rightIndicator!,
                      period: Math.max(2, Math.min(200, Number(e.target.value))),
                    },
                  })
                }
                className="w-12 bg-transparent text-xs font-mono-num font-bold text-slate-100 focus:outline-none text-center"
                min={2}
                max={200}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1">
          <span className="text-[11px] text-slate-400">Threshold:</span>
          <input
            type="number"
            value={condition.rightValue ?? 50}
            onChange={(e) =>
              onChange({
                ...condition,
                rightValue: Number(e.target.value),
              })
            }
            className="w-16 bg-transparent text-xs font-mono-num font-bold text-slate-100 focus:outline-none text-center"
          />
        </div>
      )}

      {/* Delete Condition Button */}
      {canDelete && (
        <button
          onClick={onDelete}
          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-lg ml-auto transition-colors"
          title="Remove condition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
