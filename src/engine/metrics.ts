/**
 * Financial performance metrics calculation for Trading Lab.
 */

import { EquityPoint, Trade } from './types.ts';

/**
 * Calculates Compound Annual Growth Rate (CAGR).
 */
export function calculateCAGR(initialCapital: number, finalCapital: number, totalDays: number): number {
  if (initialCapital <= 0 || finalCapital <= 0 || totalDays <= 0) {
    return 0;
  }
  const years = totalDays / 365.25;
  if (years <= 0) return 0;
  const cagr = Math.pow(finalCapital / initialCapital, 1 / years) - 1;
  return cagr * 100;
}

/**
 * Calculates Maximum Drawdown (%) from peak to trough.
 */
export function calculateMaxDrawdown(equityCurve: EquityPoint[]): number {
  if (equityCurve.length === 0) return 0;
  let peak = equityCurve[0].equity;
  let maxDd = 0;

  for (const point of equityCurve) {
    if (point.equity > peak) {
      peak = point.equity;
    }
    const dd = peak > 0 ? ((peak - point.equity) / peak) * 100 : 0;
    if (dd > maxDd) {
      maxDd = dd;
    }
  }

  return maxDd;
}

/**
 * Calculates Profit Factor (Sum of Gross Profits / Sum of Gross Losses).
 */
export function calculateProfitFactor(trades: Trade[]): number {
  let grossProfit = 0;
  let grossLoss = 0;

  for (const trade of trades) {
    if (trade.pnl > 0) {
      grossProfit += trade.pnl;
    } else {
      grossLoss += Math.abs(trade.pnl);
    }
  }

  if (grossLoss === 0) {
    return grossProfit > 0 ? 99.9 : 1.0;
  }
  return Number((grossProfit / grossLoss).toFixed(2));
}
