/**
 * Deterministic Educational Explanation Engine.
 * Generates objective, learning-oriented post-backtest postmortems.
 * Strict SEBI / educational boundaries: Explains mechanics, never gives financial advice.
 */

import { BacktestResult } from './types.ts';

export interface EducationalAnalysis {
  summaryTitle: string;
  verdict: 'outperformed' | 'underperformed' | 'neutral';
  keyObservations: string[];
  mechanicsBreakdown: string[];
  drawdownDiagnosis: string;
  nextExperimentSuggestions: string[];
}

export function generateEducationalExplanation(result: BacktestResult): EducationalAnalysis {
  const {
    totalReturnPercent,
    benchmarkReturnPercent,
    maxDrawdownPercent,
    winRatePercent,
    totalTrades,
    profitFactor,
    strategy,
    trades,
  } = result;

  const returnDiff = totalReturnPercent - benchmarkReturnPercent;
  let verdict: 'outperformed' | 'underperformed' | 'neutral' = 'neutral';
  if (returnDiff > 3) verdict = 'outperformed';
  else if (returnDiff < -3) verdict = 'underperformed';

  // 1. Summary Title
  let summaryTitle = '';
  if (totalTrades === 0) {
    summaryTitle = 'No Trades Triggered: Conditions Were Too Strict';
  } else if (verdict === 'outperformed') {
    summaryTitle = `Strategy Outperformed Buy & Hold by ${returnDiff.toFixed(1)}%`;
  } else if (verdict === 'underperformed') {
    summaryTitle = `Buy & Hold Outperformed Strategy by ${Math.abs(returnDiff).toFixed(1)}%`;
  } else {
    summaryTitle = `Strategy Performed Inline with Underlying Asset`;
  }

  // 2. Key Observations
  const keyObservations: string[] = [];

  if (totalTrades === 0) {
    keyObservations.push(
      'The entry conditions never aligned simultaneously during the selected historical window.',
      'Check if indicator thresholds (like RSI boundaries) were set at unreachable extremes.'
    );
  } else {
    keyObservations.push(
      `Executed ${totalTrades} trades over the backtest window with an overall win rate of ${winRatePercent}%.`,
      `Final portfolio value reached ₹${result.finalCapital.toLocaleString('en-IN')} from initial capital of ₹${result.initialCapital.toLocaleString('en-IN')}.`
    );

    if (profitFactor >= 1.5) {
      keyObservations.push(
        `Profit Factor of ${profitFactor} indicates winning trades generated substantially more gross rupee gain than was lost during losing trades.`
      );
    } else if (profitFactor < 1.0) {
      keyObservations.push(
        `Profit Factor of ${profitFactor} indicates total losses exceeded gains across the sequence of trades.`
      );
    }
  }

  // 3. Mechanics Breakdown
  const mechanicsBreakdown: string[] = [];
  const stopLossHits = trades.filter(t => t.exitReason === 'stop_loss').length;
  const takeProfitHits = trades.filter(t => t.exitReason === 'take_profit').length;
  const conditionExits = trades.filter(t => t.exitReason === 'condition').length;

  if (totalTrades > 0) {
    if (stopLossHits > 0) {
      mechanicsBreakdown.push(
        `Risk Control: Stop-loss was triggered ${stopLossHits} time(s). This intentionally capped downside on failed trend attempts.`
      );
    } else if (strategy.risk.stopLossPercent) {
      mechanicsBreakdown.push(
        `Risk Control: Configured ${strategy.risk.stopLossPercent}% stop-loss was never breached; exits were governed by indicator signals.`
      );
    } else {
      mechanicsBreakdown.push(
        `Risk Control: No stop-loss percentage was defined. Positions remained exposed until indicator exit conditions triggered.`
      );
    }

    if (takeProfitHits > 0) {
      mechanicsBreakdown.push(
        `Target Realization: Take-profit target was hit ${takeProfitHits} time(s), locking in gains before momentum reversed.`
      );
    }

    if (conditionExits > 0) {
      mechanicsBreakdown.push(
        `Signal Exits: ${conditionExits} trade(s) closed due to reverse indicator crossovers or oscillator rules.`
      );
    }
  }

  // 4. Drawdown Diagnosis
  let drawdownDiagnosis = '';
  if (maxDrawdownPercent < 8) {
    drawdownDiagnosis = `Mild Drawdown (${maxDrawdownPercent}%): The strategy managed downside volatility well, avoiding sharp capital drawdowns relative to the underlying stock.`;
  } else if (maxDrawdownPercent < 18) {
    drawdownDiagnosis = `Moderate Drawdown (${maxDrawdownPercent}%): The portfolio experienced standard market pullbacks. Most drawdowns happened during consolidation phases between trends.`;
  } else {
    drawdownDiagnosis = `Significant Drawdown (${maxDrawdownPercent}%): Capital dropped noticeably from its highest peak. In real investing, psychological endurance during a ${maxDrawdownPercent}% drawdown is challenging without strict risk management.`;
  }

  // 5. Next Experiment Suggestions
  const nextExperimentSuggestions: string[] = [];
  if (strategy.risk.stopLossPercent === null || strategy.risk.stopLossPercent === undefined) {
    nextExperimentSuggestions.push(
      'Experiment 1: Add a 4% to 6% Stop Loss to test whether truncating losing trades improves overall drawdown.'
    );
  } else {
    nextExperimentSuggestions.push(
      `Experiment 1: Test loosening or tightening your stop loss from ${strategy.risk.stopLossPercent}% to see its effect on win rate versus total profit.`
    );
  }

  const hasRsi = strategy.entryConditions.some(c => c.leftIndicator.type === 'RSI' || c.rightIndicator?.type === 'RSI');
  if (!hasRsi) {
    nextExperimentSuggestions.push(
      'Experiment 2: Add an RSI condition (e.g. RSI 14 < 65) to filter out buying when the stock is already overextended.'
    );
  } else {
    nextExperimentSuggestions.push(
      'Experiment 2: Try adjusting the moving average periods (e.g., test a faster EMA 9 / 21 crossover versus SMA 20 / 50).'
    );
  }

  nextExperimentSuggestions.push(
    'Experiment 3: Click "Modify & Compare" to run the adjusted parameters side-by-side with this baseline.'
  );

  return {
    summaryTitle,
    verdict,
    keyObservations,
    mechanicsBreakdown,
    drawdownDiagnosis,
    nextExperimentSuggestions,
  };
}
