/**
 * Beginner-Friendly Trading Lab Prototype.
 * 
 * Implements the minimal, approachable 3-tool learning flow:
 * Pick a tool -> Learn what it means -> Try it on a chart -> Make a simple observation -> Check understanding
 * 
 * Tools:
 * 1. Moving Average (See the general direction of a stock)
 * 2. RSI (Understand whether price has moved strongly in one direction)
 * 3. Volume (See how much trading activity is happening)
 */

import React, { useState, useMemo } from 'react';
import { INDIAN_STOCKS } from '../../data/stocks.ts';
import { calculateSMA, calculateRSI } from '../../engine/indicators.ts';
import { CharacterMentor, CharacterState } from '../character/CharacterMentor.tsx';
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';

export type BeginnerToolId = 'moving_average' | 'rsi' | 'volume';

interface BeginnerTradingLabProps {
  onSwitchToAdvanced?: () => void;
  onGoToPlayground?: () => void;
}

export const BeginnerTradingLab: React.FC<BeginnerTradingLabProps> = ({
  onSwitchToAdvanced,
  onGoToPlayground,
}) => {
  // Navigation: null = Tool Hub list, or specific tool ID
  const [activeToolId, setActiveToolId] = useState<BeginnerToolId | null>(null);

  // Track completed tools & user XP in lab
  const [completedTools, setCompletedTools] = useState<BeginnerToolId[]>([]);
  const [labXp, setLabXp] = useState(0);

  // Current active step in tool lesson: 'learn' | 'try' | 'check' | 'done'
  const [currentStep, setCurrentStep] = useState<'learn' | 'try' | 'check' | 'done'>('learn');

  // Interactive state for Moving Average
  const [maPeriod, setMaPeriod] = useState<number>(20);

  // Interactive state for RSI: selected bar index
  const [selectedRsiBarIdx, setSelectedRsiBarIdx] = useState<number>(35);

  // Interactive state for Volume: selected bar index
  const [selectedVolBarIdx, setSelectedVolBarIdx] = useState<number>(42);

  // Mini-challenge answers
  const [maQuizAnswer, setMaQuizAnswer] = useState<string | null>(null);
  const [rsiQuizAnswer, setRsiQuizAnswer] = useState<string | null>(null);
  const [volQuizAnswer, setVolQuizAnswer] = useState<string | null>(null);

  // Data source: use 60 recent bars from Tata Motors / Reliance
  const stock = INDIAN_STOCKS[0]; // Tata Motors
  const rawBars = useMemo(() => stock.history.slice(-60), [stock]);

  // Calculations for Moving Average chart
  const smaValues = useMemo(() => {
    return calculateSMA(rawBars, maPeriod);
  }, [rawBars, maPeriod]);

  // Calculations for RSI chart
  const rsiValues = useMemo(() => {
    return calculateRSI(rawBars, 14);
  }, [rawBars]);

  // Price bounds for SVG rendering
  const minPrice = useMemo(() => Math.min(...rawBars.map(b => b.low)) * 0.98, [rawBars]);
  const maxPrice = useMemo(() => Math.max(...rawBars.map(b => b.high)) * 1.02, [rawBars]);
  const priceRange = maxPrice - minPrice || 1;

  // Max volume for volume bars
  const maxVolume = useMemo(() => Math.max(...rawBars.map(b => b.volume)) * 1.1, [rawBars]);

  const handleSelectTool = (id: BeginnerToolId) => {
    setActiveToolId(id);
    setCurrentStep('learn');
  };

  const handleCompleteTool = (toolId: BeginnerToolId) => {
    if (!completedTools.includes(toolId)) {
      setCompletedTools(prev => [...prev, toolId]);
      setLabXp(prev => prev + 50);
    }
    setCurrentStep('done');
  };

  // Helper SVG coordinate calculations
  const chartWidth = 560;
  const chartHeight = 160;
  const getX = (idx: number) => 30 + (idx / (rawBars.length - 1)) * (chartWidth - 50);
  const getY = (price: number) => chartHeight - 20 - ((price - minPrice) / priceRange) * (chartHeight - 40);

  // Generate SVG path for prices
  const pricePathD = useMemo(() => {
    return rawBars
      .map((b, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(b.close).toFixed(1)}`)
      .join(' ');
  }, [rawBars, minPrice, maxPrice]);

  // Generate SVG path for Moving Average
  const maPathD = useMemo(() => {
    let path = '';
    let started = false;
    smaValues.forEach((val, i) => {
      if (val !== null) {
        path += `${!started ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(val).toFixed(1)} `;
        started = true;
      }
    });
    return path;
  }, [smaValues, minPrice, maxPrice]);

  // Generate SVG path for RSI
  const rsiHeight = 90;
  const getRsiY = (rsiVal: number) => rsiHeight - 15 - (rsiVal / 100) * (rsiHeight - 30);

  const rsiPathD = useMemo(() => {
    let path = '';
    let started = false;
    rsiValues.forEach((val, i) => {
      if (val !== null) {
        path += `${!started ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getRsiY(val).toFixed(1)} `;
        started = true;
      }
    });
    return path;
  }, [rsiValues]);

  // ==========================================
  // VIEW: TOOLS HUB (Minimal & Beginner-Friendly)
  // ==========================================
  if (!activeToolId) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-4 px-2">
        {/* Hero Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Beginner Phase 1 · Interactive Prototypes</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            TRADING LAB
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Learn how traders use simple tools to understand a stock’s movement.
          </p>

          {/* Quick CTA */}
          <div className="pt-2">
            <button
              onClick={() => handleSelectTool(completedTools.includes('moving_average') ? (completedTools.includes('rsi') ? 'volume' : 'rsi') : 'moving_average')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-teal-500/20 inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Learning</span>
            </button>
          </div>

          {/* Progress Tracker */}
          <div className="pt-4 border-t border-slate-800/80 mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Your Progress:</span>
              <div className="flex items-center gap-1.5 font-mono">
                {['moving_average', 'rsi', 'volume'].map((id, idx) => (
                  <span
                    key={id}
                    className={`w-3 h-3 rounded-full flex items-center justify-center text-[9px] ${
                      completedTools.includes(id as BeginnerToolId)
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 border border-slate-700 text-slate-500'
                    }`}
                  >
                    {completedTools.includes(id as BeginnerToolId) ? '✓' : ''}
                  </span>
                ))}
              </div>
              <span className="font-bold text-teal-400 font-mono-num ml-1">
                {completedTools.length} / 3 tools learned
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono-num">
              <Award className="w-4 h-4" />
              <span>+{labXp} XP Earned</span>
            </div>
          </div>
        </div>

        {/* What do you want to learn? (The 3 tools) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              What do you want to learn?
            </h2>
            <span className="text-xs text-slate-500">Pick any tool to start (3 mins each)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tool 1: Moving Average */}
            <button
              onClick={() => handleSelectTool('moving_average')}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-48 ${
                completedTools.includes('moving_average')
                  ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/70'
                  : 'bg-slate-900 border-slate-800 hover:border-teal-500/60 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center text-xl">
                    📈
                  </div>
                  {completedTools.includes('moving_average') ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Learned
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      Beginner · 3 min
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
                  Moving Average
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  See the general direction of a stock by smoothing out daily noise.
                </p>
              </div>

              <div className="flex items-center text-xs font-semibold text-teal-400 pt-2 border-t border-slate-800/60">
                <span>Start Tool</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Tool 2: RSI */}
            <button
              onClick={() => handleSelectTool('rsi')}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-48 ${
                completedTools.includes('rsi')
                  ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/70'
                  : 'bg-slate-900 border-slate-800 hover:border-amber-500/60 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl">
                    ⚡
                  </div>
                  {completedTools.includes('rsi') ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Learned
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      Beginner · 3 min
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  RSI (Momentum)
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Understand whether price has moved strongly in one direction recently.
                </p>
              </div>

              <div className="flex items-center text-xs font-semibold text-amber-400 pt-2 border-t border-slate-800/60">
                <span>Start Tool</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Tool 3: Volume */}
            <button
              onClick={() => handleSelectTool('volume')}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-48 ${
                completedTools.includes('volume')
                  ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/70'
                  : 'bg-slate-900 border-slate-800 hover:border-purple-500/60 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center text-xl">
                    📊
                  </div>
                  {completedTools.includes('volume') ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Learned
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      Beginner · 3 min
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                  Volume (Activity)
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  See how many shares were traded to gauge market conviction.
                </p>
              </div>

              <div className="flex items-center text-xs font-semibold text-purple-400 pt-2 border-t border-slate-800/60">
                <span>Start Tool</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Progressive Learning Roadmap (Phased Unlocks) */}
        <div className="p-6 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                Your Learning Path Ahead
              </span>
              <h3 className="text-sm font-bold text-slate-200">
                From Simple Market Tools to Complete Strategies
              </h3>
            </div>
            {onSwitchToAdvanced && (
              <button
                onClick={onSwitchToAdvanced}
                className="text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-700"
              >
                Peek at Advanced Builder →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {/* Phase 1 */}
            <div className="p-3 bg-teal-950/40 border border-teal-500/40 rounded-xl space-y-1">
              <span className="text-[9px] font-bold text-teal-300 block uppercase">Phase 1 · Active</span>
              <span className="text-xs font-bold text-slate-100 block">Market Tools</span>
              <p className="text-[11px] text-slate-400">MA, RSI, Volume</p>
            </div>

            {/* Phase 2 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl space-y-1 opacity-70">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Phase 2</span>
                <Lock className="w-3 h-3 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-300 block">Signals</span>
              <p className="text-[11px] text-slate-500">Crossovers & Clues</p>
            </div>

            {/* Phase 3 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl space-y-1 opacity-70">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Phase 3</span>
                <Lock className="w-3 h-3 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-300 block">Rules</span>
              <p className="text-[11px] text-slate-500">Entry, Exit & Safety</p>
            </div>

            {/* Phase 4 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl space-y-1 opacity-70">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Phase 4</span>
                <Lock className="w-3 h-3 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-300 block">Backtesting</span>
              <p className="text-[11px] text-slate-500">Historical Proof</p>
            </div>

            {/* Phase 5 */}
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl space-y-1 opacity-70">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Phase 5</span>
                <Lock className="w-3 h-3 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-300 block">Simulation</span>
              <p className="text-[11px] text-slate-500">Paper Trading & XP</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: INDIVIDUAL TOOL WORKSPACE (3 Steps)
  // Step 1: Learn -> Step 2: Try -> Step 3: Check
  // ==========================================
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2 px-2 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveToolId(null)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Tools</span>
        </button>

        {/* 3 Step Indicator: Learn -> Try -> Check */}
        <div className="flex items-center gap-2">
          {(['learn', 'try', 'check'] as const).map((stepKey, sIdx) => {
            const isCurrent = currentStep === stepKey;
            const isCompleted =
              currentStep === 'done' ||
              (stepKey === 'learn' && (currentStep === 'try' || currentStep === 'check')) ||
              (stepKey === 'try' && currentStep === 'check');

            return (
              <button
                key={stepKey}
                onClick={() => {
                  if (currentStep !== 'done') setCurrentStep(stepKey);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 ring-1 ring-teal-500/30'
                    : isCompleted
                    ? 'text-emerald-400 hover:bg-slate-800'
                    : 'text-slate-500'
                }`}
              >
                <span>{sIdx + 1}. {stepKey.charAt(0).toUpperCase() + stepKey.slice(1)}</span>
                {isCompleted && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inspector Fin as Learning Guide */}
      <div className="flex items-start gap-3.5 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
          <CharacterMentor
            size="sm"
            state={currentStep === 'done' ? 'celebrating' : 'talking'}
          />
        </div>
        <div className="flex-1 min-w-0 text-xs text-slate-300 leading-relaxed pt-0.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-teal-400 uppercase tracking-wider text-[11px]">
              Inspector Fin · Learning Guide
            </span>
          </div>
          {activeToolId === 'moving_average' && (
            <p className="text-slate-300">
              {currentStep === 'learn' &&
                "👋 Let's start with the Moving Average. Don't worry about complex math! A moving average simply smooths out daily ups and downs so you can see where the stock is generally heading."}
              {currentStep === 'try' &&
                'Move the slider below. Notice how a 10-day line hugs the daily price tightly, while a 50-day line turns into a smooth, steady trend.'}
              {currentStep === 'check' &&
                'Time for one quick question to lock in your intuition. No stress!'}
              {currentStep === 'done' &&
                'Fantastic job! You now understand the #1 tool traders use to filter out market noise.'}
            </p>
          )}

          {activeToolId === 'rsi' && (
            <p className="text-slate-300">
              {currentStep === 'learn' &&
                "👋 Don't worry about memorizing formulas. RSI simply helps us see how strongly a stock has been moving recently."}
              {currentStep === 'try' &&
                'Tap across different dates on the chart. Watch how RSI jumps high during rapid surges and dips low after sharp falls.'}
              {currentStep === 'check' &&
                'Here is the golden rule test: does a high RSI mean you must sell? Let’s check!'}
              {currentStep === 'done' &&
                'Spot on! Remember: RSI is a clue about recent momentum, not an automatic buy/sell command.'}
            </p>
          )}

          {activeToolId === 'volume' && (
            <p className="text-slate-300">
              {currentStep === 'learn' &&
                '👋 Price tells you WHERE the stock went; Volume tells you HOW MANY people participated in that move!'}
              {currentStep === 'try' &&
                'Look at the bar columns underneath the price. Spot the huge spike where institutions bought millions of shares in a single day.'}
              {currentStep === 'check' &&
                'Let’s test your intuition when a stock makes a sudden big jump.'}
              {currentStep === 'done' &&
                'Outstanding! You now know how to spot whether big institutional money is backing a price move.'}
            </p>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOVING AVERAGE WORKSPACE                                               */}
      {/* ========================================================================= */}
      {activeToolId === 'moving_average' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          {/* STEP 1: LEARN */}
          {currentStep === 'learn' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  Tool 1: Moving Average
                </span>
                <h2 className="text-xl font-bold text-slate-100">
                  What is a Moving Average?
                </h2>
              </div>

              {/* Simple definition */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 leading-relaxed space-y-2">
                <p className="font-medium text-slate-100">
                  A <strong>moving average</strong> smooths out daily price movements so you can see the general direction of a stock more easily.
                </p>
                <p className="text-xs text-slate-400">
                  Daily stock prices bounce around like a restless ball. The moving average calculates the average closing price over a set number of days (e.g. the last 20 days), drawing a clean line through the noise.
                </p>
              </div>

              {/* Simple Visual Metaphor */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Concept Illustration:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-slate-300 block mb-1">⚡ Daily Price (Zig-zag)</span>
                    <p className="text-slate-400 text-[11px]">
                      Jumps up and down constantly from daily headlines and retail emotions.
                    </p>
                  </div>
                  <div className="p-3 bg-teal-950/40 rounded-lg border border-teal-500/30">
                    <span className="font-bold text-teal-300 block mb-1">📈 Moving Average (Smooth Line)</span>
                    <p className="text-slate-300 text-[11px]">
                      Filters out the noise to reveal the underlying current and trend.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('try')}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
              >
                <span>Try It on an Indian Stock Chart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: TRY (Interactive Slider on Tata Motors) */}
          {currentStep === 'try' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Try It: Move the Slider
                  </h3>
                  <p className="text-xs text-slate-400">
                    See what happens when we calculate a shorter vs. longer moving average.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-teal-950 text-teal-300 border border-teal-800">
                  {maPeriod}-Day Moving Average
                </span>
              </div>

              {/* Slider Controller */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">10 Days (Fast & Close)</span>
                  <span className="text-teal-400 font-bold font-mono-num">{maPeriod} Days</span>
                  <span className="text-slate-400">50 Days (Smooth & Slow)</span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={maPeriod}
                  onChange={(e) => setMaPeriod(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />

                {/* Dynamic Explanation */}
                <div className="p-2.5 bg-slate-900 rounded-lg text-xs border border-slate-800 flex items-center gap-2">
                  <span className="text-teal-400 font-bold">Observation:</span>
                  <span className="text-slate-300">
                    {maPeriod <= 15
                      ? '10-15 days follows price very closely, reacting quickly to every turn.'
                      : maPeriod <= 35
                      ? '20-30 days balances noise reduction while keeping up with the trend.'
                      : '40-50 days is much smoother, showing the major direction but slower to react.'}
                  </span>
                </div>
              </div>

              {/* Interactive SVG Chart */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-850">
                  <span className="font-semibold text-slate-300">Tata Motors · Daily Chart (Last 60 Days)</span>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-slate-400 inline-block" /> Daily Price
                    </span>
                    <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
                      <span className="w-3 h-1 bg-teal-400 inline-block rounded" /> {maPeriod}-Day Moving Average
                    </span>
                  </div>
                </div>

                <div className="w-full overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-44 select-none"
                  >
                    {/* Horizontal Grid lines */}
                    <line x1="30" y1="30" x2={chartWidth - 20} y2="30" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                    <line x1="30" y1="80" x2={chartWidth - 20} y2="80" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                    <line x1="30" y1="130" x2={chartWidth - 20} y2="130" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />

                    {/* Jagged daily price line */}
                    <path
                      d={pricePathD}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.8"
                    />

                    {/* Smooth Moving average line */}
                    <path
                      d={maPathD}
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('check')}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
              >
                <span>Ready for the Mini-Challenge →</span>
              </button>
            </div>
          )}

          {/* STEP 3: CHECK UNDERSTANDING */}
          {currentStep === 'check' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  Step 3: Quick Check
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  The stock has been moving upward for several weeks with daily zig-zags. Which line helps you see the overall direction?
                </h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setMaQuizAnswer('ma')}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    maQuizAnswer === 'ma'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <div>
                      <span className="font-bold text-sm block">The Moving Average</span>
                      <span className="text-[11px] text-slate-400">It smooths out the fluctuations to highlight the trend.</span>
                    </div>
                  </div>
                  {maQuizAnswer === 'ma' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>

                <button
                  onClick={() => setMaQuizAnswer('jagged')}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    maQuizAnswer === 'jagged'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs">
                      B
                    </div>
                    <div>
                      <span className="font-bold text-sm block">Only the daily closing price jumps</span>
                      <span className="text-[11px] text-slate-400">Focusing only on daily blips can distract you from the bigger picture.</span>
                    </div>
                  </div>
                </button>
              </div>

              {maQuizAnswer === 'ma' && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> Correct!
                  </div>
                  <p>
                    Exactly right! The moving average removes emotional daily noise so you can spot the true direction.
                  </p>
                </div>
              )}

              {maQuizAnswer === 'ma' && (
                <button
                  onClick={() => handleCompleteTool('moving_average')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Complete Lesson & Claim +50 XP</span>
                  <Award className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* STEP 4: DONE */}
          {currentStep === 'done' && (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-100">
                Moving Average Mastered!
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You earned <strong>+50 XP</strong>. You now know how to look at price trends without being blinded by daily noise.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveToolId(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Back to Tools
                </button>
                <button
                  onClick={() => handleSelectTool('rsi')}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <span>Next Tool: RSI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. RSI WORKSPACE                                                          */}
      {/* ========================================================================= */}
      {activeToolId === 'rsi' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          {/* STEP 1: LEARN */}
          {currentStep === 'learn' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Tool 2: RSI (Relative Strength Index)
                </span>
                <h2 className="text-xl font-bold text-slate-100">
                  What is RSI?
                </h2>
              </div>

              {/* Simple definition */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 leading-relaxed space-y-2">
                <p className="font-medium text-slate-100">
                  <strong>RSI</strong> is a simple speedometer that shows how strongly a stock has been moving recently.
                </p>
                <p className="text-xs text-slate-400">
                  It moves between 0 and 100. It doesn't tell you the price; it tells you the <em>speed and strength</em> of recent price moves.
                </p>
              </div>

              {/* Simple Scale Visual */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  The RSI Scale (0 to 100):
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-between text-amber-200">
                    <span className="font-bold">70 to 100</span>
                    <span>High RSI → Price moved strongly upward recently</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-400">
                    <span>30 to 70</span>
                    <span>Middle Range → Balanced normal movement</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-purple-200">
                    <span className="font-bold">0 to 30</span>
                    <span>Low RSI → Price moved weakly / downward recently</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('try')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Try It on an Interactive Chart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: TRY (Tap points on chart to see RSI) */}
          {currentStep === 'try' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Try It: Tap or Click Along the Chart
                  </h3>
                  <p className="text-xs text-slate-400">
                    See what happens to the RSI number when price moves strongly.
                  </p>
                </div>
                {rsiValues[selectedRsiBarIdx] !== null && (
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-md border ${
                      (rsiValues[selectedRsiBarIdx] || 50) >= 70
                        ? 'bg-amber-950 text-amber-300 border-amber-700'
                        : (rsiValues[selectedRsiBarIdx] || 50) <= 30
                        ? 'bg-purple-950 text-purple-300 border-purple-700'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    RSI = {(rsiValues[selectedRsiBarIdx] || 50).toFixed(0)}
                  </span>
                )}
              </div>

              {/* Dynamic feedback pill */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    Date: {rawBars[selectedRsiBarIdx]?.date} · Price: ₹{rawBars[selectedRsiBarIdx]?.close}
                  </span>
                  <span className="font-semibold text-slate-100">
                    {(rsiValues[selectedRsiBarIdx] || 50) >= 70
                      ? '⚡ RSI is High: The stock has moved strongly upward recently.'
                      : (rsiValues[selectedRsiBarIdx] || 50) <= 30
                      ? '⚡ RSI is Low: The stock has moved weakly / downward recently.'
                      : '⚡ RSI is in the normal middle zone: Price movement is balanced.'}
                  </span>
                </div>
              </div>

              {/* Interactive Dual Chart (Price on top, RSI underneath) */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Click on the chart to inspect:
                </span>

                {/* Price Chart */}
                <div className="w-full">
                  <svg
                    viewBox={`0 0 ${chartWidth} 110`}
                    className="w-full h-28 cursor-pointer select-none"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const relX = (clickX / rect.width) * (chartWidth - 50);
                      const barIdx = Math.max(0, Math.min(rawBars.length - 1, Math.round((relX / (chartWidth - 50)) * (rawBars.length - 1))));
                      setSelectedRsiBarIdx(barIdx);
                    }}
                  >
                    <path
                      d={pricePathD}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Selected crosshair line */}
                    <line
                      x1={getX(selectedRsiBarIdx)}
                      y1="10"
                      x2={getX(selectedRsiBarIdx)}
                      y2="100"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={getX(selectedRsiBarIdx)}
                      cy={getY(rawBars[selectedRsiBarIdx]?.close || minPrice)}
                      r="4"
                      fill="#f59e0b"
                    />
                  </svg>
                </div>

                {/* RSI Sub-Panel */}
                <div className="border-t border-slate-800/80 pt-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                    <span>RSI Oscillator (0-100)</span>
                    <span className="text-amber-400">70 (High)</span>
                    <span className="text-purple-400">30 (Low)</span>
                  </div>

                  <svg
                    viewBox={`0 0 ${chartWidth} ${rsiHeight}`}
                    className="w-full h-20 select-none cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const relX = (clickX / rect.width) * (chartWidth - 50);
                      const barIdx = Math.max(0, Math.min(rawBars.length - 1, Math.round((relX / (chartWidth - 50)) * (rawBars.length - 1))));
                      setSelectedRsiBarIdx(barIdx);
                    }}
                  >
                    {/* 70 Guideline */}
                    <line x1="30" y1={getRsiY(70)} x2={chartWidth - 20} y2={getRsiY(70)} stroke="#f59e0b" strokeDasharray="3 3" opacity="0.6" />
                    {/* 30 Guideline */}
                    <line x1="30" y1={getRsiY(30)} x2={chartWidth - 20} y2={getRsiY(30)} stroke="#a855f7" strokeDasharray="3 3" opacity="0.6" />

                    {/* RSI Line */}
                    <path
                      d={rsiPathD}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />

                    {/* Crosshair dot */}
                    {rsiValues[selectedRsiBarIdx] !== null && (
                      <circle
                        cx={getX(selectedRsiBarIdx)}
                        cy={getRsiY(rsiValues[selectedRsiBarIdx] || 50)}
                        r="4"
                        fill="#38bdf8"
                      />
                    )}
                  </svg>
                </div>
              </div>

              {/* Crucial Nuance Box */}
              <div className="p-3.5 bg-amber-950/30 border border-amber-800/50 rounded-xl text-xs text-amber-200 leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">⚠️ The Golden Rule of RSI:</span>
                <p>
                  High RSI does <strong>not</strong> automatically mean "sell". Low RSI does <strong>not</strong> automatically mean "buy". RSI is simply a clue about recent momentum — not a final decision!
                </p>
              </div>

              <button
                onClick={() => setCurrentStep('check')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Ready for the Mini-Challenge →</span>
              </button>
            </div>
          )}

          {/* STEP 3: CHECK UNDERSTANDING */}
          {currentStep === 'check' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Step 3: Quick Check
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  RSI just reached 78 after several strong green days. What does this tell an astute observer?
                </h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setRsiQuizAnswer('clue')}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    rsiQuizAnswer === 'clue'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <div>
                      <span className="font-bold text-sm block">Price has moved strongly recently</span>
                      <span className="text-[11px] text-slate-400">It is a clue that momentum is hot, but not an automatic order to sell.</span>
                    </div>
                  </div>
                  {rsiQuizAnswer === 'clue' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>

                <button
                  onClick={() => setRsiQuizAnswer('blind_sell')}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    rsiQuizAnswer === 'blind_sell'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs">
                      B
                    </div>
                    <div>
                      <span className="font-bold text-sm block">You must blindly sell everything immediately</span>
                      <span className="text-[11px] text-slate-400">Strong stocks can stay at high RSI for weeks during powerful trends!</span>
                    </div>
                  </div>
                </button>
              </div>

              {rsiQuizAnswer === 'clue' && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> That’s the investor mindset!
                  </div>
                  <p>
                    RSI is a clue, not an order. You learned the fundamental nuance that separates beginners from seasoned observers.
                  </p>
                </div>
              )}

              {rsiQuizAnswer === 'clue' && (
                <button
                  onClick={() => handleCompleteTool('rsi')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Complete Lesson & Claim +50 XP</span>
                  <Award className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* STEP 4: DONE */}
          {currentStep === 'done' && (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-100">
                RSI Momentum Mastered!
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You earned <strong>+50 XP</strong>. You know how to read price momentum and avoid the rookie trap of buying/selling on RSI alone.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveToolId(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Back to Tools
                </button>
                <button
                  onClick={() => handleSelectTool('volume')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <span>Next Tool: Volume</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VOLUME WORKSPACE                                                       */}
      {/* ========================================================================= */}
      {activeToolId === 'volume' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          {/* STEP 1: LEARN */}
          {currentStep === 'learn' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  Tool 3: Volume
                </span>
                <h2 className="text-xl font-bold text-slate-100">
                  What is Volume?
                </h2>
              </div>

              {/* Simple definition */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 leading-relaxed space-y-2">
                <p className="font-medium text-slate-100">
                  <strong>Volume</strong> shows how many shares were actually bought and sold during a day.
                </p>
                <p className="text-xs text-slate-400">
                  Price shows the direction of travel, but volume shows the <em>fuel</em>. When millions of shares trade at once, it means big institutional funds (mutual funds, foreign banks) are participating.
                </p>
              </div>

              {/* Simple Metaphor */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  The Volume Metaphor:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-slate-300 block mb-1">Low Volume Day</span>
                    <p className="text-slate-400 text-[11px]">
                      Just a few retail trades. Easy for price to drift with no real conviction.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-950/40 rounded-lg border border-purple-500/30">
                    <span className="font-bold text-purple-300 block mb-1">Huge Volume Spike</span>
                    <p className="text-slate-300 text-[11px]">
                      Giant institutions are moving money. Signals high conviction in the move!
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('try')}
                className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <span>Try It on a Chart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: TRY (Inspect volume spikes) */}
          {currentStep === 'try' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Try It: Compare Low vs. High Volume Days
                  </h3>
                  <p className="text-xs text-slate-400">
                    Tap any bar below to inspect the shares traded on that day.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-purple-950 text-purple-300 border border-purple-800">
                  {((rawBars[selectedVolBarIdx]?.volume || 1000000) / 100000).toFixed(1)} Lakh Shares
                </span>
              </div>

              {/* Dynamic feedback */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px]">
                  Date: {rawBars[selectedVolBarIdx]?.date} · Price: ₹{rawBars[selectedVolBarIdx]?.close}
                </span>
                <span className="font-semibold text-slate-100">
                  {(rawBars[selectedVolBarIdx]?.volume || 0) > 3000000
                    ? '🔥 High Volume Surge: Big institutional activity occurred on this session!'
                    : 'Ordinary Daily Volume: Typical quiet trading session with moderate participation.'}
                </span>
              </div>

              {/* Price & Volume Chart */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Price (Top) & Daily Volume (Bottom):
                </span>

                {/* Price Line */}
                <div className="w-full">
                  <svg viewBox={`0 0 ${chartWidth} 100`} className="w-full h-24 select-none">
                    <path d={pricePathD} fill="none" stroke="#94a3b8" strokeWidth="2" />
                    <line
                      x1={getX(selectedVolBarIdx)}
                      y1="5"
                      x2={getX(selectedVolBarIdx)}
                      y2="95"
                      stroke="#c084fc"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  </svg>
                </div>

                {/* Volume Histogram */}
                <div className="border-t border-slate-800/80 pt-1">
                  <svg
                    viewBox={`0 0 ${chartWidth} 60`}
                    className="w-full h-16 select-none cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const relX = (clickX / rect.width) * (chartWidth - 50);
                      const barIdx = Math.max(0, Math.min(rawBars.length - 1, Math.round((relX / (chartWidth - 50)) * (rawBars.length - 1))));
                      setSelectedVolBarIdx(barIdx);
                    }}
                  >
                    {rawBars.map((bar, i) => {
                      const barHeight = (bar.volume / maxVolume) * 45;
                      const isSelected = i === selectedVolBarIdx;
                      const isSurge = bar.volume > 3000000;

                      return (
                        <rect
                          key={i}
                          x={getX(i) - 2}
                          y={55 - barHeight}
                          width="4"
                          height={barHeight}
                          rx="1"
                          fill={isSelected ? '#c084fc' : isSurge ? '#a855f7' : '#334155'}
                          className="hover:fill-purple-400 transition-colors"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('check')}
                className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <span>Ready for the Mini-Challenge →</span>
              </button>
            </div>
          )}

          {/* STEP 3: CHECK UNDERSTANDING */}
          {currentStep === 'check' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  Step 3: Quick Check
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  The stock price suddenly jumps up 5% today. Which tool would you check next to see how many shares participated in that move?
                </h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setVolQuizAnswer('volume')}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    volQuizAnswer === 'volume'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <div>
                      <span className="font-bold text-sm block">Volume</span>
                      <span className="text-[11px] text-slate-400">Shows how many shares traded, confirming whether big institutions backed the move.</span>
                    </div>
                  </div>
                  {volQuizAnswer === 'volume' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>

                <button
                  onClick={() => setVolQuizAnswer('random')}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    volQuizAnswer === 'random'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs">
                      B
                    </div>
                    <div>
                      <span className="font-bold text-sm block">Nothing — price went up so it’s automatically a buy</span>
                      <span className="text-[11px] text-slate-400">Low-volume price jumps can easily fake you out and reverse tomorrow!</span>
                    </div>
                  </div>
                </button>
              </div>

              {volQuizAnswer === 'volume' && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> Bullseye!
                  </div>
                  <p>
                    A large increase in volume shows conviction. High volume means institutions bought heavily, not just a couple retail orders.
                  </p>
                </div>
              )}

              {volQuizAnswer === 'volume' && (
                <button
                  onClick={() => handleCompleteTool('volume')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Complete Lesson & Claim +50 XP</span>
                  <Award className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* STEP 4: DONE */}
          {currentStep === 'done' && (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-100">
                Volume Mastered!
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You earned <strong>+50 XP</strong>. You now know how to check market participation and confirm institutional conviction.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveToolId(null)}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <span>Back to Trading Lab Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
