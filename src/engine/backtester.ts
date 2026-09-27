/**
 * Sequential bar-by-bar backtesting engine.
 * Purely chronological; zero look-ahead bias.
 */

import { BacktestResult, EquityPoint, OHLCV, Strategy, Trade } from './types.ts';
import { evaluateEntryConditions, evaluateExitConditions, precomputeIndicators } from './conditions.ts';
import { calculateCAGR, calculateMaxDrawdown, calculateProfitFactor } from './metrics.ts';

export interface BacktestOptions {
  initialCapital?: number;
  transactionFeePercent?: number; // e.g. 0.1 for 0.1% per leg (brokerage + STT + slippage)
}

export function runBacktest(
  data: OHLCV[],
  strategy: Strategy,
  stockSymbol: string,
  options: BacktestOptions = {}
): BacktestResult {
  const initialCapital = options.initialCapital ?? 100000; // default ₹1,00,000
  const feeRate = (options.transactionFeePercent ?? 0.1) / 100;

  if (!data || data.length === 0) {
    throw new Error('Historical data cannot be empty.');
  }

  // Precompute required indicator series
  const allConditions = [...strategy.entryConditions, ...strategy.exitConditions];
  const seriesMap = precomputeIndicators(data, allConditions);

  let cash = initialCapital;
  let shares = 0;
  let currentTradeEntry: {
    entryDate: string;
    entryPrice: number;
    shares: number;
    barIndex: number;
  } | null = null;

  const trades: Trade[] = [];
  const equityCurve: EquityPoint[] = [];

  // For benchmark (buy and hold 100% at bar 0)
  const benchmarkInitialShares = initialCapital / data[0].close;

  let peakEquity = initialCapital;

  for (let i = 0; i < data.length; i++) {
    const bar = data[i];
    const currentPrice = bar.close;

    // Check open position first for exit conditions or risk stops
    if (currentTradeEntry !== null) {
      const entryPrice = currentTradeEntry.entryPrice;
      let shouldExit = false;
      let exitReason: 'condition' | 'stop_loss' | 'take_profit' | 'end_of_data' = 'condition';
      let exitPrice = currentPrice;

      // 1. Check Stop Loss
      if (strategy.risk.stopLossPercent && strategy.risk.stopLossPercent > 0) {
        const stopPrice = entryPrice * (1 - strategy.risk.stopLossPercent / 100);
        if (bar.low <= stopPrice) {
          shouldExit = true;
          exitReason = 'stop_loss';
          // Exit executed at stop price or bar open if gap down
          exitPrice = Math.min(bar.open, stopPrice);
        }
      }

      // 2. Check Take Profit
      if (!shouldExit && strategy.risk.takeProfitPercent && strategy.risk.takeProfitPercent > 0) {
        const targetPrice = entryPrice * (1 + strategy.risk.takeProfitPercent / 100);
        if (bar.high >= targetPrice) {
          shouldExit = true;
          exitReason = 'take_profit';
          // Exit executed at target price or bar open if gap up
          exitPrice = Math.max(bar.open, targetPrice);
        }
      }

      // 3. Check Strategy Exit Conditions
      if (!shouldExit && evaluateExitConditions(strategy.exitConditions, i, seriesMap)) {
        shouldExit = true;
        exitReason = 'condition';
        exitPrice = currentPrice;
      }

      // 4. Force exit on last bar to crystallize performance
      if (!shouldExit && i === data.length - 1) {
        shouldExit = true;
        exitReason = 'end_of_data';
        exitPrice = currentPrice;
      }

      if (shouldExit) {
        const grossProceeds = shares * exitPrice;
        const exitFee = grossProceeds * feeRate;
        const netProceeds = grossProceeds - exitFee;
        cash += netProceeds;

        const totalCost = currentTradeEntry.shares * currentTradeEntry.entryPrice * (1 + feeRate);
        const pnl = netProceeds - totalCost;
        const pnlPercent = (pnl / totalCost) * 100;

        trades.push({
          id: `trade_${trades.length + 1}`,
          entryDate: currentTradeEntry.entryDate,
          entryPrice: currentTradeEntry.entryPrice,
          exitDate: bar.date,
          exitPrice: Number(exitPrice.toFixed(2)),
          shares: currentTradeEntry.shares,
          pnl: Number(pnl.toFixed(2)),
          pnlPercent: Number(pnlPercent.toFixed(2)),
          exitReason,
          holdBars: i - currentTradeEntry.barIndex,
        });

        shares = 0;
        currentTradeEntry = null;
      }
    }

    // If flat, check entry conditions
    if (currentTradeEntry === null && i < data.length - 1) {
      const isEntry = evaluateEntryConditions(strategy.entryConditions, i, seriesMap);
      if (isEntry && cash > 100) {
        // Position sizing: allocate available cash
        const maxInvest = cash * 0.98; // keep slight buffer for transaction costs
        const targetShares = Math.floor(maxInvest / currentPrice);

        if (targetShares > 0) {
          const tradeCost = targetShares * currentPrice;
          const entryFee = tradeCost * feeRate;
          const totalOutlay = tradeCost + entryFee;

          if (cash >= totalOutlay) {
            cash -= totalOutlay;
            shares = targetShares;
            currentTradeEntry = {
              entryDate: bar.date,
              entryPrice: currentPrice,
              shares: targetShares,
              barIndex: i,
            };
          }
        }
      }
    }

    // Calculate current portfolio equity at bar close
    const portfolioEquity = cash + shares * currentPrice;
    if (portfolioEquity > peakEquity) {
      peakEquity = portfolioEquity;
    }
    const currentDrawdown = peakEquity > 0 ? ((peakEquity - portfolioEquity) / peakEquity) * 100 : 0;
    const benchmarkEquity = benchmarkInitialShares * currentPrice;

    equityCurve.push({
      date: bar.date,
      equity: Number(portfolioEquity.toFixed(2)),
      benchmarkEquity: Number(benchmarkEquity.toFixed(2)),
      drawdownPercent: Number(currentDrawdown.toFixed(2)),
      inTrade: shares > 0,
      price: currentPrice,
    });
  }

  const finalCapital = equityCurve[equityCurve.length - 1].equity;
  const totalReturnPercent = Number((((finalCapital - initialCapital) / initialCapital) * 100).toFixed(2));
  const finalBenchmark = equityCurve[equityCurve.length - 1].benchmarkEquity;
  const benchmarkReturnPercent = Number((((finalBenchmark - initialCapital) / initialCapital) * 100).toFixed(2));

  // Days calculation
  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);
  const diffDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const cagrPercent = Number(calculateCAGR(initialCapital, finalCapital, diffDays).toFixed(2));

  const maxDrawdownPercent = Number(calculateMaxDrawdown(equityCurve).toFixed(2));

  const totalTrades = trades.length;
  const winningTrades = trades.filter(t => t.pnl > 0).length;
  const losingTrades = trades.filter(t => t.pnl <= 0).length;
  const winRatePercent = totalTrades > 0 ? Number(((winningTrades / totalTrades) * 100).toFixed(1)) : 0;
  const profitFactor = calculateProfitFactor(trades);

  const avgTradeReturn = totalTrades > 0 
    ? Number((trades.reduce((sum, t) => sum + t.pnlPercent, 0) / totalTrades).toFixed(2))
    : 0;

  return {
    strategy,
    stockSymbol,
    initialCapital,
    finalCapital,
    totalReturnPercent,
    benchmarkReturnPercent,
    cagrPercent,
    maxDrawdownPercent,
    totalTrades,
    winningTrades,
    losingTrades,
    winRatePercent,
    profitFactor,
    averageTradeReturnPercent: avgTradeReturn,
    trades,
    equityCurve,
  };
}
