/**
 * Beginner-friendly strategy presets for Trading Lab.
 */

import { Strategy } from '../engine/types.ts';

export const STRATEGY_PRESETS: Strategy[] = [
  {
    id: 'preset_sma_crossover',
    name: 'SMA Golden Crossover',
    description: 'Enters when short-term momentum (SMA 20) crosses above medium-term trend (SMA 50). Exits when it crosses back below.',
    entryConditions: [
      {
        id: 'c1',
        leftIndicator: { type: 'SMA', period: 20 },
        operator: 'crosses_above',
        rightType: 'indicator',
        rightIndicator: { type: 'SMA', period: 50 },
      },
    ],
    exitConditions: [
      {
        id: 'e1',
        leftIndicator: { type: 'SMA', period: 20 },
        operator: 'crosses_below',
        rightType: 'indicator',
        rightIndicator: { type: 'SMA', period: 50 },
      },
    ],
    risk: {
      stopLossPercent: null,
      takeProfitPercent: null,
    },
  },
  {
    id: 'preset_sma_rsi',
    name: 'SMA Trend + RSI Filter',
    description: 'Enters when SMA 20 is above SMA 50 AND RSI is below 65 to avoid buying into overextended tops.',
    entryConditions: [
      {
        id: 'c1',
        leftIndicator: { type: 'SMA', period: 20 },
        operator: 'crosses_above',
        rightType: 'indicator',
        rightIndicator: { type: 'SMA', period: 50 },
      },
      {
        id: 'c2',
        leftIndicator: { type: 'RSI', period: 14 },
        operator: 'is_below',
        rightType: 'value',
        rightValue: 65,
      },
    ],
    exitConditions: [
      {
        id: 'e1',
        leftIndicator: { type: 'SMA', period: 20 },
        operator: 'crosses_below',
        rightType: 'indicator',
        rightIndicator: { type: 'SMA', period: 50 },
      },
    ],
    risk: {
      stopLossPercent: null,
      takeProfitPercent: null,
    },
  },
  {
    id: 'preset_trend_risk',
    name: 'Trend Follower with 5% Stop Loss',
    description: 'Standard trend entry with a mechanical 5% stop loss to cut adverse excursions early and protect capital.',
    entryConditions: [
      {
        id: 'c1',
        leftIndicator: { type: 'SMA', period: 20 },
        operator: 'crosses_above',
        rightType: 'indicator',
        rightIndicator: { type: 'SMA', period: 50 },
      },
    ],
    exitConditions: [
      {
        id: 'e1',
        leftIndicator: { type: 'SMA', period: 20 },
        operator: 'crosses_below',
        rightType: 'indicator',
        rightIndicator: { type: 'SMA', period: 50 },
      },
    ],
    risk: {
      stopLossPercent: 5,
      takeProfitPercent: 15,
    },
  },
];
