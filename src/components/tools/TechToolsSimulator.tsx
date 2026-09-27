/**
 * Practical Technical Tools Learning & Real-Work Simulation Engine.
 * 
 * Designed to be 100% Beginner-Friendly with:
 * - Real-world analogies (Rubber Band, Speedboat, Coiled Spring)
 * - Beginner Mode toggle with Step-by-Step Guided Mission
 * - One-Click Beginner Order Presets (Auto-fills Quantity, Stop-Loss, and Target)
 * - Live "What am I seeing?" Plain-English Candle Coach
 * - Interactive Beginner Trading Cheat Sheet Modal
 * - Visual Signal Alert badges on the chart
 */

import React, { useState, useEffect, useRef } from 'react';
import { TECH_TOOLS, TechToolDefinition } from '../../data/techToolsData.ts';
import { calculateRSI, calculateEMA, calculateSMA, calculateBollingerBands } from '../../engine/indicators.ts';
import { CharacterMentor } from '../character/CharacterMentor.tsx';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Eye,
  FastForward,
  HelpCircle,
  Info,
  Lightbulb,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Trophy,
  X,
  XCircle,
  Zap,
} from 'lucide-react';

interface TechToolsSimulatorProps {
  onGoToBuilder?: () => void;
  onGoToExplorer?: () => void;
}

type ToolPhase = 'anatomy' | 'challenge' | 'simulation';

interface SimulatedTrade {
  id: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  entryCandleIndex: number;
  entryDate: string;
  shares: number;
  stopLoss: number | null;
  takeProfit: number | null;
  exitPrice?: number;
  exitCandleIndex?: number;
  exitDate?: string;
  pnl?: number;
  pnlPercent?: number;
  exitReason?: 'MANUAL' | 'STOP_LOSS' | 'TAKE_PROFIT' | 'END_OF_DATA';
}

export const TechToolsSimulator: React.FC<TechToolsSimulatorProps> = ({
  onGoToBuilder,
  onGoToExplorer,
}) => {
  const [selectedToolId, setSelectedToolId] = useState<'rsi' | 'ma_cross' | 'bollinger'>('rsi');
  const [activePhase, setActivePhase] = useState<ToolPhase>('anatomy');

  // Beginner Mode State
  const [isBeginnerMode, setIsBeginnerMode] = useState<boolean>(true);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [showWinCelebration, setShowWinCelebration] = useState<boolean>(false);

  const currentTool = TECH_TOOLS.find(t => t.id === selectedToolId) || TECH_TOOLS[0];

  // ==========================================
  // PHASE 1: PARAMETER PLAYGROUND STATE
  // ==========================================
  const [paramPeriod, setParamPeriod] = useState(14);
  const [paramOverbought, setParamOverbought] = useState(70);
  const [paramOversold, setParamOversold] = useState(30);
  const [paramFastMa, setParamFastMa] = useState(20);
  const [paramSlowMa, setParamSlowMa] = useState(50);
  const [paramStdDev, setParamStdDev] = useState(2.0);

  // Sync parameter defaults when tool changes
  useEffect(() => {
    if (selectedToolId === 'rsi') {
      setParamPeriod(14);
      setParamOverbought(70);
      setParamOversold(30);
    } else if (selectedToolId === 'ma_cross') {
      setParamFastMa(20);
      setParamSlowMa(50);
    } else if (selectedToolId === 'bollinger') {
      setParamPeriod(20);
      setParamStdDev(2.0);
    }
  }, [selectedToolId]);

  // ==========================================
  // PHASE 2: CHALLENGE STATE
  // ==========================================
  const [selectedChallengeOptionId, setSelectedChallengeOptionId] = useState<string | null>(null);
  const [isChallengeSubmitted, setIsChallengeSubmitted] = useState(false);

  useEffect(() => {
    setSelectedChallengeOptionId(null);
    setIsChallengeSubmitted(false);
  }, [selectedToolId]);

  // ==========================================
  // PHASE 3: CANDLE-BY-CANDLE SIMULATOR STATE
  // ==========================================
  const sim = currentTool.simulation;
  const allCandles = sim.candles;

  const [currentCandleIndex, setCurrentCandleIndex] = useState(sim.initialCandleCount);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2>(1);

  // Virtual Trading Account
  const [accountBalance, setAccountBalance] = useState(100000);
  const [activeTrade, setActiveTrade] = useState<SimulatedTrade | null>(null);
  const [tradeHistory, setTradeHistory] = useState<SimulatedTrade[]>([]);

  // Order input controls
  const [orderQuantity, setOrderQuantity] = useState(sim.beginnerPreset?.shares || 50);
  const [customStopLoss, setCustomStopLoss] = useState<string>('');
  const [customTakeProfit, setCustomTakeProfit] = useState<string>('');

  // Coach Message
  const [simCoachMessage, setSimCoachMessage] = useState<string>(
    'Simulation initialized. Step forward candle-by-candle and watch for your technical trigger!'
  );

  // Playback timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset simulation when switching tools
  const handleResetSimulation = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentCandleIndex(sim.initialCandleCount);
    setActiveTrade(null);
    setTradeHistory([]);
    setAccountBalance(100000);
    setCustomStopLoss('');
    setCustomTakeProfit('');
    setShowWinCelebration(false);
    setSimCoachMessage(
      'Simulation ready! Click "Next Candle" or "▶ Play" to watch the market develop.'
    );
  };

  useEffect(() => {
    handleResetSimulation();
  }, [selectedToolId]);

  // Sliced candles visible up to current candle index
  const visibleCandles = allCandles.slice(0, currentCandleIndex);
  const currentCandle = visibleCandles[visibleCandles.length - 1];

  // Indicator series computed strictly up to currentCandleIndex
  const rsiSeries = calculateRSI(visibleCandles, paramPeriod);
  const currentRsi = rsiSeries[rsiSeries.length - 1];

  const fastEmaSeries = calculateEMA(visibleCandles, paramFastMa);
  const slowEmaSeries = calculateEMA(visibleCandles, paramSlowMa);
  const currentFastEma = fastEmaSeries[fastEmaSeries.length - 1];
  const currentSlowEma = slowEmaSeries[slowEmaSeries.length - 1];

  const bbSeries = calculateBollingerBands(visibleCandles, paramPeriod, paramStdDev);
  const currentBbUpper = bbSeries.upper[bbSeries.upper.length - 1];
  const currentBbMiddle = bbSeries.middle[bbSeries.middle.length - 1];
  const currentBbLower = bbSeries.lower[bbSeries.lower.length - 1];
  const currentBbWidth = bbSeries.bandwidth[bbSeries.bandwidth.length - 1];

  // Auto-play timer effect
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = playbackSpeed === 1 ? 950 : 500;
      timerRef.current = setInterval(() => {
        handleStepForward();
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, currentCandleIndex, allCandles.length, activeTrade]);

  // Step forward one candle and check stop loss / take profit triggers
  const handleStepForward = () => {
    setCurrentCandleIndex((prevIndex) => {
      if (prevIndex >= allCandles.length) {
        setIsPlaying(false);
        return prevIndex;
      }

      const nextIndex = prevIndex + 1;
      const nextCandle = allCandles[nextIndex - 1];

      // Check coaching triggers
      const coachingMoment = sim.finCoachingMoments.find(m => m.candleIndex === nextIndex);
      if (coachingMoment) {
        setSimCoachMessage(coachingMoment.triggerMessage);
      }

      // Check if active trade hit Stop-Loss or Take-Profit
      if (activeTrade && nextCandle) {
        if (activeTrade.type === 'LONG') {
          // Check Stop-Loss
          if (activeTrade.stopLoss && nextCandle.low <= activeTrade.stopLoss) {
            const exitP = activeTrade.stopLoss;
            const pnl = Number(((exitP - activeTrade.entryPrice) * activeTrade.shares).toFixed(2));
            const pnlPercent = Number((((exitP - activeTrade.entryPrice) / activeTrade.entryPrice) * 100).toFixed(2));
            const closed: SimulatedTrade = {
              ...activeTrade,
              exitPrice: exitP,
              exitCandleIndex: nextIndex,
              exitDate: nextCandle.date,
              pnl,
              pnlPercent,
              exitReason: 'STOP_LOSS',
            };
            setTradeHistory(prev => [closed, ...prev]);
            setAccountBalance(prev => prev + pnl);
            setActiveTrade(null);
            setSimCoachMessage(`🛑 Stop-Loss hit at ₹${exitP}! Your financial seatbelt saved you from a larger decline.`);
          }
          // Check Take-Profit
          else if (activeTrade.takeProfit && nextCandle.high >= activeTrade.takeProfit) {
            const exitP = activeTrade.takeProfit;
            const pnl = Number(((exitP - activeTrade.entryPrice) * activeTrade.shares).toFixed(2));
            const pnlPercent = Number((((exitP - activeTrade.entryPrice) / activeTrade.entryPrice) * 100).toFixed(2));
            const closed: SimulatedTrade = {
              ...activeTrade,
              exitPrice: exitP,
              exitCandleIndex: nextIndex,
              exitDate: nextCandle.date,
              pnl,
              pnlPercent,
              exitReason: 'TAKE_PROFIT',
            };
            setTradeHistory(prev => [closed, ...prev]);
            setAccountBalance(prev => prev + pnl);
            setActiveTrade(null);
            setShowWinCelebration(true);
            setSimCoachMessage(`🎯 Target reached at ₹${exitP}! Profit of +₹${pnl.toLocaleString('en-IN')} locked in!`);
          }
        }
      }

      return nextIndex;
    });
  };

  // One-click Beginner Preset
  const handleApplyBeginnerPreset = () => {
    if (sim.beginnerPreset) {
      setOrderQuantity(sim.beginnerPreset.shares);
      setCustomStopLoss(sim.beginnerPreset.stopLoss.toString());
      setCustomTakeProfit(sim.beginnerPreset.takeProfit.toString());
      setSimCoachMessage(`✨ Beginner Preset Loaded: ${sim.beginnerPreset.label}. Click "BUY LONG (Market)" to enter!`);
    }
  };

  // Trade Execution Handlers
  const handleBuyMarket = () => {
    if (!currentCandle || activeTrade) return;
    const entryPrice = currentCandle.close;
    const sl = customStopLoss ? parseFloat(customStopLoss) : entryPrice * 0.98;
    const tp = customTakeProfit ? parseFloat(customTakeProfit) : entryPrice * 1.05;

    const newTrade: SimulatedTrade = {
      id: `trade_${Date.now()}`,
      type: 'LONG',
      entryPrice,
      entryCandleIndex: currentCandleIndex,
      entryDate: currentCandle.date,
      shares: orderQuantity,
      stopLoss: sl,
      takeProfit: tp,
    };

    setActiveTrade(newTrade);
    setSimCoachMessage(
      `🟢 Position Opened: Bought ${orderQuantity} shares at ₹${entryPrice}. Stop-Loss active at ₹${sl.toFixed(1)}, Target at ₹${tp.toFixed(1)}.`
    );
  };

  const handleClosePosition = () => {
    if (!activeTrade || !currentCandle) return;
    const exitPrice = currentCandle.close;
    const pnl = Number(((exitPrice - activeTrade.entryPrice) * activeTrade.shares).toFixed(2));
    const pnlPercent = Number((((exitPrice - activeTrade.entryPrice) / activeTrade.entryPrice) * 100).toFixed(2));

    const closed: SimulatedTrade = {
      ...activeTrade,
      exitPrice,
      exitCandleIndex: currentCandleIndex,
      exitDate: currentCandle.date,
      pnl,
      pnlPercent,
      exitReason: 'MANUAL',
    };

    setTradeHistory(prev => [closed, ...prev]);
    setAccountBalance(prev => prev + pnl);
    setActiveTrade(null);
    if (pnl > 0) setShowWinCelebration(true);
    setSimCoachMessage(
      `Position manually closed at ₹${exitPrice}. P&L: ${pnl >= 0 ? '+' : ''}₹${pnl.toLocaleString('en-IN')} (${pnlPercent}%).`
    );
  };

  // Live P&L of active trade
  const unrealizedPnl = activeTrade && currentCandle
    ? Number(((currentCandle.close - activeTrade.entryPrice) * activeTrade.shares).toFixed(2))
    : 0;

  const unrealizedPnlPercent = activeTrade && currentCandle
    ? Number((((currentCandle.close - activeTrade.entryPrice) / activeTrade.entryPrice) * 100).toFixed(2))
    : 0;

  // Signal detection checks for live badges
  const isRsiSignalActive = selectedToolId === 'rsi' && currentRsi !== null && currentRsi >= 28 && currentRsi <= 35 && currentCandleIndex >= 37 && currentCandleIndex <= 40;
  const isMaSignalActive = selectedToolId === 'ma_cross' && currentFastEma !== null && currentSlowEma !== null && currentFastEma >= currentSlowEma && currentCandleIndex >= 38 && currentCandleIndex <= 42;
  const isBbSignalActive = selectedToolId === 'bollinger' && currentBbUpper !== null && currentCandle && currentCandle.close >= currentBbUpper * 0.995 && currentCandleIndex >= 36 && currentCandleIndex <= 40;

  // SVG Chart Dimensions & Helpers
  const chartCandles = visibleCandles.slice(-35); // show last 35 visible candles
  const chartHigh = Math.max(...chartCandles.map(c => c.high), 1);
  const chartLow = Math.min(...chartCandles.map(c => c.low), 0);
  const chartRange = chartHigh - chartLow || 1;

  const svgWidth = 720;
  const svgHeight = 220;
  const paddingX = 45;
  const paddingY = 20;

  const getSvgX = (i: number) => {
    return paddingX + (i / Math.max(chartCandles.length - 1, 1)) * (svgWidth - paddingX * 2);
  };

  const getSvgY = (price: number) => {
    return svgHeight - paddingY - ((price - chartLow) / chartRange) * (svgHeight - paddingY * 2);
  };

  // Current plain-English candle explanation
  const currentCommentary = sim.candleCommentary[currentCandleIndex] ||
    (currentCandle ? `Candle ${currentCandleIndex}: ${currentCandle.date} closed at ₹${currentCandle.close}. ${currentCandle.close >= currentCandle.open ? '🟢 Green day (buyers in control).' : '🔴 Red day (sellers in control).'}` : '');

  return (
    <div className="space-y-6">
      {/* Top Header Banner with Beginner Mode Switch */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase tracking-wider">
              Interactive Tech Tools Lab
            </span>
            <span className="text-xs text-slate-400 font-medium">Learn → Spot Signals → Live Market Simulation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2.5">
            <span>Technical Analysis in Practice</span>
            {isBeginnerMode && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                👶 Beginner Friendly
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Ditch complex formulas. Master practical momentum, trend, and volatility tools using real-world analogies, pattern challenges, and candle-by-candle market execution.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {/* Beginner Mode Toggle */}
          <button
            onClick={() => setIsBeginnerMode(!isBeginnerMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              isBeginnerMode
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Beginner Guide: {isBeginnerMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Jargon Decoder / Cheat Sheet Button */}
          <button
            onClick={() => setShowCheatSheet(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Cheat Sheet</span>
          </button>

          {/* Paper Trading Capital */}
          <div className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Paper Capital</span>
            <span className="text-sm font-mono-num font-bold text-emerald-400">
              ₹{(accountBalance + unrealizedPnl).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Tech Tools Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TECH_TOOLS.map((tool) => {
          const isSelected = tool.id === selectedToolId;
          return (
            <button
              key={tool.id}
              onClick={() => setSelectedToolId(tool.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-teal-500 ring-2 ring-teal-500/40 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    tool.category === 'Momentum'
                      ? 'bg-amber-950/60 border-amber-800/50 text-amber-300'
                      : tool.category === 'Trend'
                      ? 'bg-teal-950/60 border-teal-800/50 text-teal-300'
                      : 'bg-purple-950/60 border-purple-800/50 text-purple-300'
                  }`}>
                    {tool.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{tool.difficulty}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <span>{tool.name}</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{tool.tagline}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 italic">Analogy: {tool.analogy.metaphor}</span>
                {isSelected ? (
                  <span className="font-bold text-teal-400 flex items-center gap-0.5">
                    Active <ChevronRight className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="text-slate-500">Select</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3-Phase Step Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActivePhase('anatomy')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activePhase === 'anatomy'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>1. Tool Anatomy & Analogy</span>
          </button>

          <button
            onClick={() => setActivePhase('challenge')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activePhase === 'challenge'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>2. Signal Spotter Challenge</span>
          </button>

          <button
            onClick={() => setActivePhase('simulation')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activePhase === 'simulation'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                : 'bg-slate-900 border border-slate-800 text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>3. Real-Time Market Simulation</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Active Stock:</span>
          <span className="font-bold text-slate-200 font-mono-num">{sim.stockName} ({sim.stockSymbol})</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PHASE 1: TOOL ANATOMY & REAL-WORLD ANALOGY                   */}
      {/* ============================================================ */}
      {activePhase === 'anatomy' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Beginner Analogy Spotlight Banner */}
          <div className="p-5 bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 rounded-2xl space-y-3 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{currentTool.analogy.icon}</span>
                <div>
                  <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block">
                    The Beginner Metaphor
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100">
                    {currentTool.analogy.title}
                  </h3>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 font-medium">
                No Math Required
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              "{currentTool.analogy.story}"
            </p>

            <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center gap-2.5 text-xs text-teal-200">
              <Lightbulb className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                <strong className="text-teal-300 font-semibold">The Golden Rule:</strong>{' '}
                {currentTool.analogy.goldenTakeaway}
              </span>
            </div>
          </div>

          {/* Fin Mentor Card */}
          <div className="flex items-start gap-3.5 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl">
            <div className="w-14 h-14 shrink-0">
              <CharacterMentor size="sm" state="talking" />
            </div>
            <div className="flex-1 text-slate-200 text-xs sm:text-sm leading-relaxed pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-teal-400 text-xs uppercase tracking-wider">
                  Inspector Fin · Quick Orientation
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {currentTool.name}
                </span>
              </div>
              <p className="text-slate-300 font-sans leading-normal">
                "{currentTool.anatomy.howItWorks}"
              </p>
            </div>
          </div>

          {/* Interactive Parameters & Formula Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Interactive Sliders Panel */}
            <div className="lg:col-span-2 p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-teal-400" />
                  <h4 className="text-sm font-bold text-slate-100">Live Parameter Tuning</h4>
                </div>
                <span className="text-xs text-slate-400">See how changes affect sensitivity</span>
              </div>

              {selectedToolId === 'rsi' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-300">RSI Period:</span>
                      <span className="font-mono-num font-bold text-teal-400">{paramPeriod} bars</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      value={paramPeriod}
                      onChange={(e) => setParamPeriod(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>5 (Very Sensitive / Jittery)</span>
                      <span>14 (Institutional Standard)</span>
                      <span>30 (Very Slow / Smooth)</span>
                    </div>
                    <p className="text-[11px] text-teal-300/80 mt-1.5 bg-teal-950/30 p-2 rounded-lg border border-teal-800/30">
                      💡 <strong>Plain English:</strong> Lowering the period from 14 to 7 makes RSI react twice as fast to minor bumps. Most traders keep it at <strong>14</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-300">Overbought Level:</span>
                        <span className="font-mono-num font-bold text-rose-400">{paramOverbought}</span>
                      </div>
                      <input
                        type="range"
                        min={65}
                        max={85}
                        step={5}
                        value={paramOverbought}
                        onChange={(e) => setParamOverbought(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <span className="text-[10px] text-slate-500">Above this = buyers exhausted</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-300">Oversold Level:</span>
                        <span className="font-mono-num font-bold text-emerald-400">{paramOversold}</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={35}
                        step={5}
                        value={paramOversold}
                        onChange={(e) => setParamOversold(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <span className="text-[10px] text-slate-500">Below this = sellers exhausted</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedToolId === 'ma_cross' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-300">Fast EMA (Speedboat Momentum):</span>
                      <span className="font-mono-num font-bold text-teal-400">{paramFastMa} periods</span>
                    </div>
                    <input
                      type="range"
                      min={9}
                      max={30}
                      value={paramFastMa}
                      onChange={(e) => setParamFastMa(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <p className="text-[11px] text-teal-300/80 mt-1.5 bg-teal-950/30 p-2 rounded-lg border border-teal-800/30">
                      💡 <strong>Plain English:</strong> Tracks short-term price direction. 20 EMA is the institutional benchmark for 1 month of trading days.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-300">Slow EMA (Cruise Ship Trend):</span>
                      <span className="font-mono-num font-bold text-amber-400">{paramSlowMa} periods</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={100}
                      step={5}
                      value={paramSlowMa}
                      onChange={(e) => setParamSlowMa(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <p className="text-[11px] text-amber-300/80 mt-1.5 bg-amber-950/30 p-2 rounded-lg border border-amber-800/30">
                      💡 <strong>Plain English:</strong> Tracks intermediate trend over 1 quarter (50 days). When Fast cuts above Slow, the tide has turned!
                    </p>
                  </div>
                </div>
              )}

              {selectedToolId === 'bollinger' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-300">Baseline SMA Period:</span>
                      <span className="font-mono-num font-bold text-teal-400">{paramPeriod} bars</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      value={paramPeriod}
                      onChange={(e) => setParamPeriod(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-300">Standard Deviation Multiplier (Band Width):</span>
                      <span className="font-mono-num font-bold text-purple-400">{paramStdDev.toFixed(1)}σ</span>
                    </div>
                    <input
                      type="range"
                      min={1.5}
                      max={3.0}
                      step={0.1}
                      value={paramStdDev}
                      onChange={(e) => setParamStdDev(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <p className="text-[11px] text-purple-300/80 mt-1.5 bg-purple-950/30 p-2 rounded-lg border border-purple-800/30">
                      💡 <strong>Plain English:</strong> At 2.0σ, approximately 95% of all price bars stay inside the bands. A close outside means an extraordinary breakout!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Beginner Quick Guide & Retail Traps */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-teal-400">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="text-sm font-bold text-slate-200">How to Read in 10 Seconds</h4>
              </div>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {currentTool.anatomy.proTradingRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider block mb-1">
                  ⚠️ Rookie Mistake to Avoid
                </span>
                <p className="text-xs text-rose-200/90 bg-rose-950/30 border border-rose-800/40 p-2.5 rounded-lg leading-relaxed">
                  {currentTool.anatomy.commonRetailMistake}
                </p>
              </div>

              <button
                onClick={() => setActivePhase('challenge')}
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 mt-2"
              >
                <span>Proceed to Signal Spotter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PHASE 2: SIGNAL SPOTTER CHALLENGE                            */}
      {/* ============================================================ */}
      {activePhase === 'challenge' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-400" />
                <h3 className="text-base font-bold text-slate-100">
                  {currentTool.challenge.title}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                Pattern Recognition Test
              </span>
            </div>

            {/* Scenario Story */}
            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                The Dilemma
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {currentTool.challenge.scenarioDescription}
              </p>
              <div className="text-[11px] text-amber-300/90 italic pt-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Coach Hint: {currentTool.challenge.chartHint}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-100 mb-2.5">
                {currentTool.challenge.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentTool.challenge.options.map((opt) => {
                  const isSelected = selectedChallengeOptionId === opt.id;
                  let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (isChallengeSubmitted) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
                    } else if (isSelected && !opt.isCorrect) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/50';
                    } else {
                      style = 'bg-slate-950/40 border-slate-850 opacity-60';
                    }
                  } else if (isSelected) {
                    style = 'bg-slate-800 border-teal-500 text-white ring-2 ring-teal-500/40';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isChallengeSubmitted && setSelectedChallengeOptionId(opt.id)}
                      disabled={isChallengeSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 select-none ${style}`}
                    >
                      <div className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected
                          ? isChallengeSubmitted
                            ? opt.isCorrect
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'bg-rose-500 border-rose-400 text-white'
                            : 'bg-teal-500 border-teal-400 text-slate-950'
                          : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isChallengeSubmitted && opt.isCorrect ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : isSelected ? (
                          <div className="w-2 h-2 rounded-full bg-slate-950" />
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <span className="leading-relaxed block text-sm font-semibold">{opt.text}</span>
                        {isChallengeSubmitted && (opt.isCorrect || isSelected) && (
                          <span className={`block mt-2 text-xs font-normal leading-relaxed ${
                            opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                          }`}>
                            {opt.explanation}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {!isChallengeSubmitted ? (
              <button
                onClick={() => selectedChallengeOptionId && setIsChallengeSubmitted(true)}
                disabled={!selectedChallengeOptionId}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
              >
                <span>Submit My Trading Stance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs text-amber-200">
                  💡 {currentTool.challenge.finInsight}
                </div>
                <button
                  onClick={() => setActivePhase('simulation')}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Ready! Launch Real-Time Simulation</span>
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PHASE 3: REAL-TIME MARKET PLAYBACK SIMULATOR                 */}
      {/* ============================================================ */}
      {activePhase === 'simulation' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Step-by-Step Beginner Mission Guide */}
          {isBeginnerMode && (
            <div className="p-4 bg-slate-900 border border-emerald-500/30 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Beginner Simulation Mission · {sim.scenarioTitle}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono-num">
                  Candle {currentCandleIndex} of {allCandles.length}
                </span>
              </div>

              {/* 4-Step Visual Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {sim.beginnerSteps.map((step) => {
                  const isCurrent =
                    (!activeTrade && step.actionRequired === 'ADVANCE' && currentCandleIndex < (step.targetCandleIndex || 35)) ||
                    (!activeTrade && step.actionRequired === 'BUY' && currentCandleIndex >= 37 && currentCandleIndex <= 42) ||
                    (activeTrade && (step.actionRequired === 'MANAGE' || step.actionRequired === 'EXIT'));

                  return (
                    <div
                      key={step.stepNumber}
                      className={`p-2.5 rounded-xl border text-xs transition-all ${
                        isCurrent
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[10px] uppercase text-emerald-400">
                          {step.title}
                        </span>
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                      </div>
                      <p className="text-[11px] leading-relaxed line-clamp-2">
                        {step.instruction}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dynamic Signal Alert Badge if trigger is active right now */}
          {(isRsiSignalActive || isMaSignalActive || isBbSignalActive) && !activeTrade && (
            <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 rounded-xl flex items-center justify-between gap-3 shadow-lg shadow-emerald-500/25 animate-bounce-subtle">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 fill-current" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
                  🟢 HIGH PROBABILITY BUY SIGNAL ACTIVE! ({currentTool.name} confirmed on Candle {currentCandleIndex})
                </span>
              </div>
              <button
                onClick={handleApplyBeginnerPreset}
                className="px-3 py-1 bg-slate-950 text-emerald-400 hover:text-white font-bold rounded-lg text-xs transition-colors shrink-0 shadow-sm"
              >
                Apply Preset & Prepare Order
              </button>
            </div>
          )}

          {/* Simulation Chart Window */}
          <div className="p-4 sm:p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
            {/* Chart Top Sub-Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-850 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-medium">Symbol</span>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-100 font-mono-num">{sim.stockSymbol}</h3>
                  <span className="text-xs text-slate-400">{sim.stockName}</span>
                </div>
              </div>

              {currentCandle && (
                <div className="flex items-center gap-4 text-xs font-mono-num">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Price</span>
                    <span className="text-sm font-bold text-slate-100">₹{currentCandle.close.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">High / Low</span>
                    <span className="text-slate-300">₹{currentCandle.high.toFixed(1)} / ₹{currentCandle.low.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Indicator Reading</span>
                    {selectedToolId === 'rsi' && (
                      <span className={`font-bold ${currentRsi !== null && currentRsi < 30 ? 'text-emerald-400' : currentRsi !== null && currentRsi > 70 ? 'text-rose-400' : 'text-amber-300'}`}>
                        RSI: {currentRsi !== null ? currentRsi.toFixed(1) : '--'}
                      </span>
                    )}
                    {selectedToolId === 'ma_cross' && (
                      <span className="font-bold text-teal-300">
                        20 EMA: ₹{currentFastEma !== null ? currentFastEma.toFixed(1) : '--'}
                      </span>
                    )}
                    {selectedToolId === 'bollinger' && (
                      <span className="font-bold text-purple-300">
                        Upper: ₹{currentBbUpper !== null ? currentBbUpper.toFixed(1) : '--'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SVG Candlestick & Indicator Canvas */}
            <div className="relative overflow-hidden bg-slate-900/90 rounded-xl border border-slate-800 p-2 select-none">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-56 sm:h-64">
                {/* Horizontal grid lines */}
                <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#1e293b" strokeDasharray="3 3" />
                <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#1e293b" strokeDasharray="3 3" />
                <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#1e293b" strokeDasharray="3 3" />

                {/* Y-Axis price labels */}
                <text x={paddingX - 8} y={paddingY + 4} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                  ₹{chartHigh.toFixed(0)}
                </text>
                <text x={paddingX - 8} y={svgHeight / 2 + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                  ₹{((chartHigh + chartLow) / 2).toFixed(0)}
                </text>
                <text x={paddingX - 8} y={svgHeight - paddingY + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                  ₹{chartLow.toFixed(0)}
                </text>

                {/* Technical Indicator Overlays */}
                {/* Bollinger Bands Shaded Area & Lines */}
                {selectedToolId === 'bollinger' && chartCandles.map((c, i) => {
                  const globalIdx = visibleCandles.length - chartCandles.length + i;
                  const upperVal = bbSeries.upper[globalIdx];
                  const middleVal = bbSeries.middle[globalIdx];
                  const lowerVal = bbSeries.lower[globalIdx];

                  if (i === 0 || upperVal === null || lowerVal === null || middleVal === null) return null;
                  const prevUpper = bbSeries.upper[globalIdx - 1];
                  const prevLower = bbSeries.lower[globalIdx - 1];
                  const prevMid = bbSeries.middle[globalIdx - 1];
                  if (!prevUpper || !prevLower || !prevMid) return null;

                  const x1 = getSvgX(i - 1);
                  const x2 = getSvgX(i);

                  return (
                    <g key={`bb_${i}`}>
                      <line x1={x1} y1={getSvgY(prevUpper)} x2={x2} y2={getSvgY(upperVal)} stroke="#c084fc" strokeWidth="1.5" />
                      <line x1={x1} y1={getSvgY(prevMid)} x2={x2} y2={getSvgY(middleVal)} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1={x1} y1={getSvgY(prevLower)} x2={x2} y2={getSvgY(lowerVal)} stroke="#c084fc" strokeWidth="1.5" />
                    </g>
                  );
                })}

                {/* Moving Average Crossover Lines (20 EMA Teal & 50 EMA Amber) */}
                {selectedToolId === 'ma_cross' && chartCandles.map((c, i) => {
                  const globalIdx = visibleCandles.length - chartCandles.length + i;
                  const fVal = fastEmaSeries[globalIdx];
                  const sVal = slowEmaSeries[globalIdx];

                  if (i === 0 || fVal === null || sVal === null) return null;
                  const prevF = fastEmaSeries[globalIdx - 1];
                  const prevS = slowEmaSeries[globalIdx - 1];
                  if (!prevF || !prevS) return null;

                  const x1 = getSvgX(i - 1);
                  const x2 = getSvgX(i);

                  return (
                    <g key={`ma_${i}`}>
                      <line x1={x1} y1={getSvgY(prevF)} x2={x2} y2={getSvgY(fVal)} stroke="#2dd4bf" strokeWidth="2" />
                      <line x1={x1} y1={getSvgY(prevS)} x2={x2} y2={getSvgY(sVal)} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                    </g>
                  );
                })}

                {/* Candlesticks Rendering */}
                {chartCandles.map((candle, idx) => {
                  const x = getSvgX(idx);
                  const isUp = candle.close >= candle.open;
                  const yOpen = getSvgY(candle.open);
                  const yClose = getSvgY(candle.close);
                  const yHigh = getSvgY(candle.high);
                  const yLow = getSvgY(candle.low);

                  const bodyTop = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);
                  const candleColor = isUp ? '#10b981' : '#f43f5e';

                  return (
                    <g key={idx} className="transition-all">
                      {/* Upper & lower wick */}
                      <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={candleColor} strokeWidth="1.5" />
                      {/* Real Body */}
                      <rect
                        x={x - 4}
                        y={bodyTop}
                        width={8}
                        height={bodyHeight}
                        fill={candleColor}
                        rx={1}
                      />
                    </g>
                  );
                })}

                {/* Active Trade Stop-Loss & Take-Profit Visual Reference Lines */}
                {activeTrade && (
                  <>
                    {/* Entry Price Line */}
                    <line
                      x1={paddingX}
                      y1={getSvgY(activeTrade.entryPrice)}
                      x2={svgWidth - paddingX}
                      y2={getSvgY(activeTrade.entryPrice)}
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <text x={svgWidth - paddingX - 4} y={getSvgY(activeTrade.entryPrice) - 4} fill="#38bdf8" fontSize="9" textAnchor="end" fontFamily="monospace">
                      Entry ₹{activeTrade.entryPrice}
                    </text>

                    {/* Stop-Loss Line */}
                    {activeTrade.stopLoss && (
                      <>
                        <line
                          x1={paddingX}
                          y1={getSvgY(activeTrade.stopLoss)}
                          x2={svgWidth - paddingX}
                          y2={getSvgY(activeTrade.stopLoss)}
                          stroke="#f43f5e"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                        <text x={svgWidth - paddingX - 4} y={getSvgY(activeTrade.stopLoss) - 4} fill="#f43f5e" fontSize="9" textAnchor="end" fontFamily="monospace">
                          SL ₹{activeTrade.stopLoss}
                        </text>
                      </>
                    )}

                    {/* Take-Profit Line */}
                    {activeTrade.takeProfit && (
                      <>
                        <line
                          x1={paddingX}
                          y1={getSvgY(activeTrade.takeProfit)}
                          x2={svgWidth - paddingX}
                          y2={getSvgY(activeTrade.takeProfit)}
                          stroke="#10b981"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                        <text x={svgWidth - paddingX - 4} y={getSvgY(activeTrade.takeProfit) - 4} fill="#10b981" fontSize="9" textAnchor="end" fontFamily="monospace">
                          Target ₹{activeTrade.takeProfit}
                        </text>
                      </>
                    )}
                  </>
                )}
              </svg>

              {/* Sub-panel for RSI Oscillator */}
              {selectedToolId === 'rsi' && (
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-400">RSI(14):</span>
                    <span className="font-mono-num font-bold text-amber-300">
                      {currentRsi !== null ? currentRsi.toFixed(1) : '--'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (Guidance: 30 Oversold / 70 Overbought)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-emerald-400">● 30 Bullish Hook Zone</span>
                    <span className="text-rose-400">● 70 Exhaustion Zone</span>
                  </div>
                </div>
              )}
            </div>

            {/* Plain-English Live Candle Coach Bar */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 text-xs">
              <Eye className="w-4 h-4 text-teal-400 shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  What Am I Seeing Right Now?
                </span>
                <p className="text-slate-200 mt-0.5 font-sans leading-normal">
                  {currentCommentary}
                </p>
              </div>
            </div>

            {/* Playback Controls & Action Pad */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
              {/* Playback Stepper */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Time Playback Controls
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStepForward}
                    disabled={currentCandleIndex >= allCandles.length}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 disabled:opacity-50 text-xs font-bold text-slate-100 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Next Candle</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isPlaying
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={handleResetSimulation}
                    className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 rounded-xl border border-slate-700"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Order Execution Pad with Beginner Preset */}
              <div className="lg:col-span-2 p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Execution Pad & Risk Controls
                  </span>
                  {/* One-Click Beginner Preset Button */}
                  <button
                    onClick={handleApplyBeginnerPreset}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-[11px] font-bold text-teal-300 transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-teal-400" />
                    <span>✨ Apply Beginner Preset</span>
                  </button>
                </div>

                {!activeTrade ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Quantity</label>
                        <input
                          type="number"
                          value={orderQuantity}
                          onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs font-mono-num text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-rose-400 block mb-1">Stop-Loss (₹)</label>
                        <input
                          type="number"
                          placeholder="Auto 2%"
                          value={customStopLoss}
                          onChange={(e) => setCustomStopLoss(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs font-mono-num text-rose-300 placeholder:text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-emerald-400 block mb-1">Target (₹)</label>
                        <input
                          type="number"
                          placeholder="Auto 5%"
                          value={customTakeProfit}
                          onChange={(e) => setCustomTakeProfit(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs font-mono-num text-emerald-300 placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleBuyMarket}
                      disabled={!currentCandle}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                      <span>BUY LONG (Market: ₹{currentCandle?.close.toFixed(2)})</span>
                    </button>
                  </div>
                ) : (
                  /* Active Position View */
                  <div className="p-3 bg-slate-950 border border-teal-500/40 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-bold text-slate-200">
                          Active Long Position ({activeTrade.shares} shares @ ₹{activeTrade.entryPrice})
                        </span>
                      </div>
                      <div className={`font-mono-num text-sm font-black ${unrealizedPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {unrealizedPnl >= 0 ? '+' : ''}₹{unrealizedPnl.toLocaleString('en-IN')} ({unrealizedPnlPercent}%)
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-slate-850 pt-2">
                      <div>SL: ₹{activeTrade.stopLoss?.toFixed(1) || 'None'}</div>
                      <div>Target: ₹{activeTrade.takeProfit?.toFixed(1) || 'None'}</div>
                    </div>

                    <button
                      onClick={handleClosePosition}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Close Position at Market (₹{currentCandle?.close.toFixed(2)})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Inspector Fin Coach Speech */}
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 shrink-0">
                <CharacterMentor size="sm" state="talking" />
              </div>
              <div className="text-xs text-slate-300">
                <span className="font-bold text-teal-400 block mb-0.5">Inspector Fin Coaching:</span>
                <p>{simCoachMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* WINNING TRADE CELEBRATION MODAL                              */}
      {/* ============================================================ */}
      {showWinCelebration && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center animate-bounce-subtle">
              <Trophy className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Discipline Wins!
              </span>
              <h3 className="text-xl font-black text-slate-100">
                Target Reached with Technical Edge
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                You waited for confirmation, set predefined risk limits with a Stop-Loss, and let the statistical probability work in your favor!
              </p>
            </div>
            <button
              onClick={() => setShowWinCelebration(false)}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Continue Practicing
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* BEGINNER TRADING JARGON CHEAT SHEET MODAL                    */}
      {/* ============================================================ */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-slate-100">
                  Beginner Trading Cheat Sheet
                </h3>
              </div>
              <button
                onClick={() => setShowCheatSheet(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">🕯️ Candlesticks</span>
                <p className="text-slate-300 leading-relaxed">
                  Green body = Price closed higher than it opened (buyers won). Red body = Price closed lower than it opened (sellers won). Wicks (thin lines) show the highest and lowest prices reached during the day.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-rose-400 block mb-1">🛡️ Stop-Loss (SL)</span>
                <p className="text-slate-300 leading-relaxed">
                  Your financial seatbelt! An automatic order that sells your shares if the trade goes wrong, ensuring you never lose more than 1% to 2% of your capital.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-teal-400 block mb-1">🎯 Take-Profit (Target)</span>
                <p className="text-slate-300 leading-relaxed">
                  Your goal line. Automatically sells your shares when a target price is reached so that emotional greed doesn't cause you to give back your profits.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">🪢 Bullish RSI Hook</span>
                <p className="text-slate-300 leading-relaxed">
                  Waiting for RSI to cross back ABOVE 30 with a green candle. This prevents "catching a falling knife" during aggressive selloffs.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-teal-400 block mb-1">🚤 Golden Cross</span>
                <p className="text-slate-300 leading-relaxed">
                  When the fast 20 EMA line crosses above the slow 50 EMA line. Proves that institutional buying has pushed the overall tide upward.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-purple-400 block mb-1">🌀 Bollinger Squeeze</span>
                <p className="text-slate-300 leading-relaxed">
                  When the upper and lower bands pinch together tightly like a hallway. Signals that volatility is sleeping like a compressed spring before an explosive breakout.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCheatSheet(false)}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Got it! Back to Lab
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
