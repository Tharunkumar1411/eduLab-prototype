/**
 * Trading Lab Container Component.
 * Orchestrates the full loop:
 * Stock Explorer -> Strategy Builder -> Backtest Simulation -> Results -> AI Explanation -> Modify & Compare.
 */

import React, { useState } from 'react';
import { INDIAN_STOCKS } from '../../data/stocks.ts';
import { STRATEGY_PRESETS } from '../../data/presets.ts';
import { BacktestResult, StockInfo, Strategy } from '../../engine/types.ts';
import { runBacktest } from '../../engine/backtester.ts';
import { generateEducationalExplanation } from '../../engine/explanation.ts';
import { CharacterMentor, CharacterState } from '../character/CharacterMentor.tsx';
import { StockExplorer } from './StockExplorer.tsx';
import { StrategyBuilder } from './StrategyBuilder.tsx';
import { BacktestResultsView } from './BacktestResultsView.tsx';
import { AIExplanationView } from './AIExplanationView.tsx';
import { StrategyComparisonView } from './StrategyComparisonView.tsx';
import { TechToolsSimulator } from './TechToolsSimulator.tsx';
import { QuickCalculators } from './QuickCalculators.tsx';
import { BeginnerTradingLab } from './BeginnerTradingLab.tsx';
import { Activity, ArrowLeft, Calculator, ChevronRight, GitCompare, Play, RotateCcw, Sliders, Sparkles, TrendingUp, Zap } from 'lucide-react';

export interface LabProgress {
  selectedStockSymbol: string;
  selectedStockName: string;
  selectedStockSector: string;
  labTab: 'explorer' | 'tech_tools' | 'builder' | 'results' | 'comparison' | 'calculators';
  strategyName: string;
  entryConditionsCount: number;
  exitConditionsCount: number;
  hasStopLoss: boolean;
  stopLossPercent?: number | null;
  hasTakeProfit: boolean;
  takeProfitPercent?: number | null;
  latestBacktestReturn?: number;
  latestDrawdown?: number;
  benchmarkReturn?: number;
  winRate?: number;
  totalTrades?: number;
  profitFactor?: number;
  hasExperimentRun?: boolean;
  experimentReturnDiff?: number;
  experimentDrawdownDiff?: number;
}

interface TradingLabProps {
  onGoToPlayground: () => void;
  onLabStateUpdate?: (progress: LabProgress) => void;
}

type LabTab = 'explorer' | 'tech_tools' | 'builder' | 'results' | 'comparison' | 'calculators';

export const TradingLab: React.FC<TradingLabProps> = ({ onGoToPlayground, onLabStateUpdate }) => {
  const [selectedStock, setSelectedStock] = useState<StockInfo>(INDIAN_STOCKS[0]);
  const [activeTab, setActiveTab] = useState<LabTab>('explorer');
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);

  // Strategy states
  const [currentStrategy, setCurrentStrategy] = useState<Strategy>(STRATEGY_PRESETS[0]);
  const [baselineResult, setBaselineResult] = useState<BacktestResult | null>(null);
  const [experimentResult, setExperimentResult] = useState<BacktestResult | null>(null);

  // Sync state to parent / ChatContext
  React.useEffect(() => {
    if (onLabStateUpdate) {
      const expDiffReturn = (baselineResult && experimentResult)
        ? Number((experimentResult.totalReturnPercent - baselineResult.totalReturnPercent).toFixed(1))
        : undefined;
      const expDiffDrawdown = (baselineResult && experimentResult)
        ? Number((baselineResult.maxDrawdownPercent - experimentResult.maxDrawdownPercent).toFixed(1))
        : undefined;

      onLabStateUpdate({
        selectedStockSymbol: selectedStock.symbol,
        selectedStockName: selectedStock.name,
        selectedStockSector: selectedStock.sector,
        labTab: activeTab,
        strategyName: currentStrategy.name,
        entryConditionsCount: currentStrategy.entryConditions.length,
        exitConditionsCount: currentStrategy.exitConditions.length,
        hasStopLoss: currentStrategy.risk.stopLossPercent !== null && currentStrategy.risk.stopLossPercent !== undefined,
        stopLossPercent: currentStrategy.risk.stopLossPercent,
        hasTakeProfit: currentStrategy.risk.takeProfitPercent !== null && currentStrategy.risk.takeProfitPercent !== undefined,
        takeProfitPercent: currentStrategy.risk.takeProfitPercent,
        latestBacktestReturn: baselineResult?.totalReturnPercent,
        latestDrawdown: baselineResult?.maxDrawdownPercent,
        benchmarkReturn: baselineResult?.benchmarkReturnPercent,
        winRate: baselineResult?.winRatePercent,
        totalTrades: baselineResult?.totalTrades,
        profitFactor: baselineResult?.profitFactor,
        hasExperimentRun: Boolean(experimentResult),
        experimentReturnDiff: expDiffReturn,
        experimentDrawdownDiff: expDiffDrawdown,
      });
    }
  }, [selectedStock, activeTab, currentStrategy, baselineResult, experimentResult, onLabStateUpdate]);

  // Mentor state
  const [mentorState, setMentorState] = useState<CharacterState>('talking');
  const [mentorMessage, setMentorMessage] = useState<string>(
    'Welcome to the Trading Lab! Build visual rules, backtest without code, and understand the mechanics behind every trade.'
  );
  const [mentorSubMessage, setMentorSubMessage] = useState<string>(
    'First, pick an Indian bluechip stock and study its moving averages.'
  );

  const handleRunBacktest = () => {
    try {
      const result = runBacktest(selectedStock.history, currentStrategy, selectedStock.symbol, {
        initialCapital: 100000,
        transactionFeePercent: 0.1,
      });

      if (!baselineResult) {
        setBaselineResult(result);
        setActiveTab('results');
        setMentorState(result.totalReturnPercent > 0 ? 'happy' : 'thinking');
        setMentorMessage(
          `Backtest simulation complete for ${selectedStock.symbol}! Review your equity curve, CAGR, and drawdown below.`
        );
        setMentorSubMessage(
          'Notice how moving average crossovers behave during sideways vs trending regimes.'
        );
      } else {
        // We are running an experiment!
        setExperimentResult(result);
        setActiveTab('comparison');
        setMentorState('surprised');
        setMentorMessage(
          `Experiment simulation finished! Check the side-by-side comparison table to see the impact of your strategy tweaks.`
        );
        setMentorSubMessage(
          'Did changing your parameters improve return, or did it reduce your max drawdown?'
        );
      }
    } catch (err) {
      console.error(err);
      setMentorState('confused');
      setMentorMessage('Could not run backtest. Check if conditions are valid.');
    }
  };

  const handleModifyAndCompare = () => {
    // Keep baselineResult as is, switch to builder for modifying
    setActiveTab('builder');
    setMentorState('thinking');
    setMentorMessage(
      'Now adjust something! Try tweaking the SMA period (e.g. 20 to 10), adding an RSI condition, or setting a 5% stop loss.'
    );
    setMentorSubMessage(
      'When you click Run, we will compare this modified experiment against your baseline.'
    );
  };

  const handleAcceptExperimentAsBaseline = () => {
    if (experimentResult) {
      setBaselineResult(experimentResult);
      setExperimentResult(null);
      setActiveTab('results');
      setMentorState('celebrating');
      setMentorMessage('Experiment saved as your new baseline benchmark!');
      setMentorSubMessage('Continue experimenting or test on a different stock.');
    }
  };

  const handleResetAll = () => {
    setBaselineResult(null);
    setExperimentResult(null);
    setCurrentStrategy(STRATEGY_PRESETS[0]);
    setActiveTab('explorer');
    setMentorState('idle');
    setMentorMessage('Trading Lab reset. Ready for a fresh experiment!');
    setMentorSubMessage('Select a stock or strategy preset to begin.');
  };

  if (!isAdvancedMode) {
    return (
      <BeginnerTradingLab
        onSwitchToAdvanced={() => setIsAdvancedMode(true)}
        onGoToPlayground={onGoToPlayground}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Return to Beginner Hub Bar */}
      <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setIsAdvancedMode(false)}
          className="flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Beginner Market Tools (Phase 1)</span>
        </button>
        <span className="text-[11px] text-slate-500 font-medium">
          Advanced Strategy & Backtesting Lab (Phase 3 & 4)
        </span>
      </div>

      {/* Mentor Header */}
      <CharacterMentor
        state={mentorState}
        message={mentorMessage}
        subMessage={mentorSubMessage}
      />

      {/* Lab Navigation Breadcrumb / Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('explorer');
              setMentorState('talking');
              setMentorMessage('Select an Indian bluechip stock and study its moving averages and chart patterns.');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'explorer'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>1. Stock Explorer</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

          {/* NEW: Tech Tools Simulator Tab */}
          <button
            onClick={() => {
              setActiveTab('tech_tools');
              setMentorState('talking');
              setMentorMessage(
                'Master technical analysis tools! Learn RSI, EMA Crossovers, and Bollinger Bands with live parameter adjustments, pattern recognition, and candle-by-candle market playback.'
              );
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tech_tools'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 ring-1 ring-emerald-500/30'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>2. Tech Tools Simulator</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
              Interactive
            </span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'builder'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>3. Strategy Builder</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

          <button
            onClick={() => {
              if (baselineResult) setActiveTab('results');
            }}
            disabled={!baselineResult}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'results'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : baselineResult
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>4. Backtest Results</span>
          </button>

          {experimentResult && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GitCompare className="w-3 h-3 text-teal-400" />
                <span>5. Experiment Comparison</span>
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('calculators')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'calculators'
                ? 'bg-slate-800 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Quick Calculators</span>
          </button>

          {(baselineResult || experimentResult) && (
            <button
              onClick={handleResetAll}
              className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              title="Reset Lab"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: STOCK EXPLORER */}
      {activeTab === 'explorer' && (
        <StockExplorer
          selectedStock={selectedStock}
          onSelectStock={(s) => setSelectedStock(s)}
          onProceedToTechTools={() => {
            setActiveTab('tech_tools');
            setMentorState('talking');
            setMentorMessage(
              `Try applying technical tools to ${selectedStock.symbol}! Master RSI, Moving Averages, and Bollinger Bands with live simulation.`
            );
          }}
          onProceedToBuilder={() => {
            setActiveTab('builder');
            setMentorState('thinking');
            setMentorMessage(
              `Building strategy for ${selectedStock.symbol}. Choose a preset or define custom entry and risk conditions.`
            );
          }}
        />
      )}

      {/* VIEW 2: TECH TOOLS SIMULATOR */}
      {activeTab === 'tech_tools' && (
        <TechToolsSimulator
          onGoToBuilder={() => {
            setActiveTab('builder');
            setMentorState('thinking');
            setMentorMessage('Ready to automate these rules? Build a systematic strategy and backtest it across years of market history.');
          }}
          onGoToExplorer={() => setActiveTab('explorer')}
        />
      )}

      {/* VIEW 2: STRATEGY BUILDER */}
      {activeTab === 'builder' && (
        <StrategyBuilder
          strategy={currentStrategy}
          onUpdateStrategy={(st) => setCurrentStrategy(st)}
          onRunBacktest={handleRunBacktest}
          selectedStockSymbol={selectedStock.symbol}
        />
      )}

      {/* VIEW 3: RESULTS & POSTMORTEM */}
      {activeTab === 'results' && baselineResult && (
        <div className="space-y-6">
          <BacktestResultsView
            result={baselineResult}
            onModifyAndCompare={handleModifyAndCompare}
            onNewStrategy={() => {
              setBaselineResult(null);
              setActiveTab('builder');
            }}
          />

          <AIExplanationView
            analysis={generateEducationalExplanation(baselineResult)}
          />
        </div>
      )}

      {/* VIEW 4: EXPERIMENT COMPARISON */}
      {activeTab === 'comparison' && baselineResult && experimentResult && (
        <StrategyComparisonView
          originalResult={baselineResult}
          experimentResult={experimentResult}
          onModifyAgain={handleModifyAndCompare}
          onAcceptExperimentAsNewBaseline={handleAcceptExperimentAsBaseline}
        />
      )}

      {/* VIEW 5: QUICK CALCULATORS */}
      {activeTab === 'calculators' && <QuickCalculators />}
    </div>
  );
};
