/**
 * Stocks Level 2 — "Revenue, Profit & Business"
 *
 * Four-stage interactive mini-simulation. Replaces the generic 5-stage read-
 * heavy lesson, but ONLY for `node_lvl_2`. Mirrors the structure of
 * WhatIsStockLesson so the two prototype lessons share a visual grammar.
 *
 * Stages:
 *   1. run      — Live revenue slider over Sunny Bakery
 *   2. costs    — Reveal cost lines; animated deduction to operating profit
 *   3. compare  — Normal day vs promotion day; quiz
 *   4. check    — Final subtraction quiz
 *   complete    — Summary; XP awarded exactly once
 */

import React, { useEffect, useRef, useState } from 'react';
import { PathNode } from '../../../data/learningPath.ts';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { useAnimatedNumber } from '../../common/useAnimatedNumber.ts';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Store,
  ShieldCheck,
  AlertCircle,
  Minus,
  Plus,
  Coins,
  Wallet,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { SunnyBakeryIllustration } from '../stocksLesson1/SunnyBakeryIllustration.tsx';
import {
  AnswerOption,
  CHECK_OPTIONS,
  COMPARE_OPTIONS,
  DEFAULT_ITEMS_SOLD,
  MAX_ITEMS_SOLD,
  MIN_ITEMS_SOLD,
  NORMAL_DAY_COSTS,
  NORMAL_DAY_SCENARIO,
  OperatingCostLine,
  PRICE_PER_ITEM,
  PROMOTION_DAY_SCENARIO,
  REVENUE_LESSON_STAGES,
  REVENUE_STAGE_LABEL,
  RevenueLessonStage,
  calculateOperatingProfit,
  calculateRevenue,
  clampItemsSold,
  findOption,
  formatRupee,
  formatSignedRupee,
  sumOperatingCosts,
} from './revenueCalculations.ts';

interface RevenueProfitLessonProps {
  node: PathNode;
  onBack: () => void;
  onComplete: (nodeId: string, xpEarned: number) => void;
}

const XP_REWARD_FALLBACK = 150;
const LEVEL_NUMBER = 2;

export const RevenueProfitLesson: React.FC<RevenueProfitLessonProps> = ({ node, onBack, onComplete }) => {
  const [stage, setStage] = useState<RevenueLessonStage>('run');
  const [itemsSold, setItemsSold] = useState<number>(DEFAULT_ITEMS_SOLD);

  const [compareAnswerId, setCompareAnswerId] = useState<string | null>(null);
  const [compareSubmitted, setCompareSubmitted] = useState(false);

  const [checkAnswerId, setCheckAnswerId] = useState<string | null>(null);
  const [checkSubmitted, setCheckSubmitted] = useState(false);

  const completeAwardedRef = useRef(false);
  const xpReward = node.xpReward || XP_REWARD_FALLBACK;

  const character = useCharacterController({
    initialState: 'talking',
    initialMessage: "You're running Sunny Bakery today.",
  });

  useEffect(() => {
    switch (stage) {
      case 'run':
        character.speak("You're running Sunny Bakery today.");
        character.react('talking', { durationMs: 2200 });
        break;
      case 'costs':
        character.speak('Here go the day’s costs.');
        character.react('thinking', { durationMs: 2200 });
        break;
      case 'compare':
        character.speak('More sales — but did more profit follow?');
        character.react('thinking', { durationMs: 2200 });
        break;
      case 'check':
        character.speak('One quick subtraction to finish.');
        character.react('thinking', { durationMs: 2200 });
        break;
      case 'complete':
        character.speak("Nice. Revenue ≠ profit.");
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Idempotent XP award on first entry to `complete`.
  useEffect(() => {
    if (stage === 'complete' && !completeAwardedRef.current) {
      completeAwardedRef.current = true;
      onComplete(node.id, xpReward);
    }
  }, [stage, node.id, xpReward, onComplete]);

  const revenue = calculateRevenue(PRICE_PER_ITEM, itemsSold);
  const operatingCostsTotal = sumOperatingCosts(NORMAL_DAY_COSTS);
  const operatingProfit = calculateOperatingProfit(revenue, operatingCostsTotal);

  const stageIndex = REVENUE_LESSON_STAGES.indexOf(stage);
  const progressPercent = Math.round(((stageIndex + 1) / REVENUE_LESSON_STAGES.length) * 100);

  const compareSelected = findOption(COMPARE_OPTIONS, compareAnswerId);
  const checkSelected = findOption(CHECK_OPTIONS, checkAnswerId);

  const handleCompareSubmit = () => {
    if (!compareSelected) return;
    setCompareSubmitted(true);
    character.react(compareSelected.isCorrect ? 'happy' : 'confused', { durationMs: 1800 });
  };

  const handleCheckSubmit = () => {
    if (!checkSelected) return;
    setCheckSubmitted(true);
    character.react(checkSelected.isCorrect ? 'happy' : 'confused', { durationMs: 1800 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4 pb-28 sm:pb-24 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 sm:px-5 sm:py-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 rounded-lg bg-slate-800/90 hover:bg-slate-750 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer group shrink-0"
            title="Back to Path"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Path</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block shrink-0" />

          <div className="text-xs font-bold text-slate-300 truncate">
            <span className="text-teal-400">Lvl {LEVEL_NUMBER}</span>
            <span className="text-slate-600 mx-1.5">·</span>
            <span className="text-slate-100">Revenue vs Profit</span>
          </div>
        </div>

        <div
          className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono-num bg-amber-950/60 border border-amber-800/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shrink-0"
          aria-label={`Reward: ${xpReward} XP`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{xpReward}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden border border-slate-700/50"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-label={`Lesson progress: step ${stageIndex + 1} of ${REVENUE_LESSON_STAGES.length}`}
      >
        <div
          className="bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Compact step indicator — desktop only (mobile shows the eyebrow in-body) */}
      <div className="hidden sm:flex items-center justify-between gap-2 text-[11px] font-semibold">
        <span className="text-slate-400">
          Step {stageIndex + 1} of {REVENUE_LESSON_STAGES.length} ·{' '}
          <span className="text-teal-300">{REVENUE_STAGE_LABEL[stage]}</span>
        </span>
        <span className="text-slate-500 font-mono-num">{progressPercent}%</span>
      </div>

      {/* Mentor + dialogue */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 sm:p-5">
        <div className="sm:hidden">
          <CharacterMentor
            size="sm"
            state={character.state}
            message={character.message}
            subMessage={character.subMessage}
            revealProgressively
          />
        </div>
        <div className="hidden sm:block">
          <CharacterMentor
            size="md"
            state={character.state}
            message={character.message}
            subMessage={character.subMessage}
            revealProgressively
          />
        </div>
      </div>

      {/* Stage body */}
      <div
        key={stage}
        className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 space-y-3 sm:space-y-4"
      >
        {stage === 'run' && (
          <RunStage
            itemsSold={itemsSold}
            onItemsSoldChange={(n) => setItemsSold(clampItemsSold(n))}
            revenue={revenue}
          />
        )}

        {stage === 'costs' && (
          <CostsStage
            revenue={revenue}
            costs={NORMAL_DAY_COSTS}
            operatingCosts={operatingCostsTotal}
            operatingProfit={operatingProfit}
            itemsSold={itemsSold}
          />
        )}

        {stage === 'compare' && (
          <CompareStage
            selectedId={compareAnswerId}
            submitted={compareSubmitted}
            onSelect={(id) => {
              if (compareSubmitted) return;
              setCompareAnswerId(id);
            }}
          />
        )}

        {stage === 'check' && (
          <CheckStage
            selectedId={checkAnswerId}
            submitted={checkSubmitted}
            onSelect={(id) => {
              if (checkSubmitted) return;
              setCheckAnswerId(id);
            }}
          />
        )}

        {stage === 'complete' && (
          <CompleteStage
            compareCorrect={compareSelected?.isCorrect ?? false}
            checkCorrect={checkSelected?.isCorrect ?? false}
            xpReward={xpReward}
          />
        )}
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-3 sm:px-4 sm:py-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto flex items-stretch gap-2 sm:gap-3">
          {stage !== 'run' && stage !== 'complete' && (
            <button
              type="button"
              onClick={() => {
                const prevIndex = Math.max(0, stageIndex - 1);
                setStage(REVENUE_LESSON_STAGES[prevIndex]);
              }}
              className="shrink-0 px-3 sm:px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              aria-label="Back one step"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {stage === 'run' && (
            <PrimaryCta onClick={() => setStage('costs')}>
              <span>See the costs</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'costs' && (
            <PrimaryCta onClick={() => setStage('compare')}>
              <span>Make a decision</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'compare' && !compareSubmitted && (
            <PrimaryCta onClick={handleCompareSubmit} disabled={!compareSelected}>
              <span>{compareSelected ? 'Check answer' : 'Pick an option'}</span>
              {compareSelected && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            </PrimaryCta>
          )}

          {stage === 'compare' && compareSubmitted && (
            <PrimaryCta onClick={() => setStage('check')}>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'check' && !checkSubmitted && (
            <PrimaryCta onClick={handleCheckSubmit} disabled={!checkSelected}>
              <span>{checkSelected ? 'Check answer' : 'Pick an option'}</span>
              {checkSelected && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            </PrimaryCta>
          )}

          {stage === 'check' && checkSubmitted && (
            <PrimaryCta onClick={() => setStage('complete')}>
              <span>See summary</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'complete' && (
            <PrimaryCta onClick={onBack} variant="celebration">
              <span>Back to Path · +{xpReward} XP earned</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}
        </div>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * STAGE 1 — Run the bakery
 * -------------------------------------------------------------------------- */

interface RunStageProps {
  itemsSold: number;
  onItemsSoldChange: (next: number) => void;
  revenue: number;
}

const RunStage: React.FC<RunStageProps> = ({ itemsSold, onItemsSoldChange, revenue }) => {
  const animatedRevenue = useAnimatedNumber(revenue, 600);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        <div className="max-h-[150px] sm:max-h-none overflow-hidden">
          <SunnyBakeryIllustration variant="calm" />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 sm:p-5 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
          <Store className="w-3 h-3" />
          <span>Step 1 · Run the bakery</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base sm:text-xl font-black text-slate-100 leading-tight">
              You&rsquo;re in charge today.
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Each bread costs <span className="font-mono-num text-slate-200">₹{PRICE_PER_ITEM}</span>. Pick how many you sell.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Revenue</div>
            <div
              className="text-xl sm:text-3xl font-black text-teal-300 font-mono-num leading-none"
              aria-live="polite"
            >
              {formatRupee(animatedRevenue)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono-num">
              {itemsSold} × ₹{PRICE_PER_ITEM}
            </div>
          </div>
        </div>

        {/* Slider + +/- */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onItemsSoldChange(itemsSold - 1)}
            disabled={itemsSold <= MIN_ITEMS_SOLD}
            className="shrink-0 w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/60 flex items-center justify-center text-slate-300 cursor-pointer"
            aria-label="Sell one fewer item"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="range"
            min={MIN_ITEMS_SOLD}
            max={MAX_ITEMS_SOLD}
            value={itemsSold}
            onChange={(e) => onItemsSoldChange(Number(e.target.value))}
            className="flex-1 accent-teal-500"
            aria-label="Items sold today"
          />
          <button
            type="button"
            onClick={() => onItemsSoldChange(itemsSold + 1)}
            disabled={itemsSold >= MAX_ITEMS_SOLD}
            className="shrink-0 w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/60 flex items-center justify-center text-slate-300 cursor-pointer"
            aria-label="Sell one more item"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-snug">
          Revenue is the money the bakery earns from sales <strong className="text-slate-100">before</strong> any costs are subtracted.
        </div>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * STAGE 2 — Where did the money go?
 * -------------------------------------------------------------------------- */

interface CostsStageProps {
  revenue: number;
  costs: readonly OperatingCostLine[];
  operatingCosts: number;
  operatingProfit: number;
  itemsSold: number;
}

const CostsStage: React.FC<CostsStageProps> = ({ revenue, costs, operatingCosts, operatingProfit, itemsSold }) => {
  // Reveal cost lines one by one, then animate the running balance from
  // revenue down to operating profit as each cost is applied.
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (revealedCount >= costs.length) return;
    const t = window.setTimeout(() => setRevealedCount((n) => n + 1), 650);
    return () => window.clearTimeout(t);
  }, [revealedCount, costs.length]);

  const appliedCostsSum = costs
    .slice(0, revealedCount)
    .reduce((sum, c) => sum + c.amount, 0);
  const runningBalance = revenue - appliedCostsSum;
  const animatedBalance = useAnimatedNumber(runningBalance, 500);

  const allRevealed = revealedCount >= costs.length;
  const profitPositive = operatingProfit >= 0;

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 sm:p-5 space-y-3">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
        <Wallet className="w-3 h-3" />
        <span>Step 2 · Where the money goes</span>
      </div>
      <h2 className="text-base sm:text-xl font-black text-slate-100 leading-tight">
        Revenue in, costs out. What&rsquo;s left?
      </h2>

      {/* Running balance */}
      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {allRevealed ? 'Operating profit' : 'Running balance'}
          </div>
          <div
            className={`text-2xl sm:text-3xl font-black font-mono-num leading-none ${
              allRevealed ? (profitPositive ? 'text-emerald-300' : 'text-rose-300') : 'text-teal-300'
            }`}
            aria-live="polite"
          >
            {allRevealed ? formatSignedRupee(operatingProfit) : formatRupee(animatedBalance)}
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono-num mt-0.5">
            Revenue {formatRupee(revenue)} ({itemsSold} × ₹{PRICE_PER_ITEM})
          </div>
        </div>
        {allRevealed && (
          <div className="shrink-0">
            {profitPositive ? (
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center" aria-hidden="true">
                <TrendingUp className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center" aria-hidden="true">
                <TrendingDown className="w-5 h-5" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cost lines, revealed one by one */}
      <div className="space-y-2">
        {costs.map((c, i) => {
          const isRevealed = i < revealedCount;
          return (
            <div
              key={c.id}
              className={`flex items-center justify-between gap-3 p-3 rounded-xl border text-sm transition-all ${
                isRevealed
                  ? 'bg-slate-950/70 border-slate-800 text-slate-200 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-2 motion-safe:duration-300'
                  : 'bg-slate-950/30 border-slate-800/60 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isRevealed ? 'bg-rose-500/15 text-rose-300' : 'bg-slate-800/60 text-slate-600'
                  }`}
                  aria-hidden="true"
                >
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{c.label}</span>
              </div>
              <span
                className={`font-mono-num font-bold ${
                  isRevealed ? 'text-rose-300' : 'text-slate-600'
                }`}
              >
                −{formatRupee(c.amount)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-snug">
        Revenue <span className="font-mono-num text-slate-100">{formatRupee(revenue)}</span>{' '}
        minus the costs we counted <span className="font-mono-num text-rose-300">({formatRupee(operatingCosts)})</span>{' '}
        leaves <span className="font-mono-num text-emerald-300">{formatSignedRupee(operatingProfit)}</span>{' '}
        in operating profit for this simplified example.
      </div>

      <p className="text-[11px] text-slate-500 leading-snug">
        This simplified example doesn&rsquo;t include taxes, interest, or every other business expense — so it&rsquo;s operating profit, not net profit.
      </p>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * STAGE 3 — Make a decision
 * -------------------------------------------------------------------------- */

interface CompareStageProps {
  selectedId: string | null;
  submitted: boolean;
  onSelect: (id: string) => void;
}

const CompareStage: React.FC<CompareStageProps> = ({ selectedId, submitted, onSelect }) => {
  const selected = findOption(COMPARE_OPTIONS, selectedId);

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 sm:p-5 space-y-3">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
        <Store className="w-3 h-3" />
        <span>Step 3 · Make a decision</span>
      </div>
      <h2 className="text-base sm:text-xl font-black text-slate-100 leading-tight">
        Promotion day: twice the sales. Twice the profit?
      </h2>

      {/* Side-by-side scenario cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <ScenarioCard scenario={NORMAL_DAY_SCENARIO} tone="neutral" />
        <ScenarioCard scenario={PROMOTION_DAY_SCENARIO} tone="promo" />
      </div>

      <p className="text-sm text-slate-300 leading-snug">
        On promotion day, Sunny Bakery sold twice as much. Did it make more operating profit?
      </p>

      <div className="space-y-2" role="radiogroup" aria-label="Promotion-day operating profit">
        {COMPARE_OPTIONS.map((opt) => (
          <AnswerButton
            key={opt.id}
            option={opt}
            selected={selectedId === opt.id}
            submitted={submitted}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>

      {submitted && selected && (
        <div
          className={`p-3 rounded-xl border text-xs sm:text-sm leading-snug motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 ${
            selected.isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
          }`}
          role="status"
        >
          <strong className={selected.isCorrect ? 'text-emerald-200' : 'text-rose-200'}>
            {selected.isCorrect ? 'Right. ' : 'Not quite. '}
          </strong>
          {selected.explanation}
        </div>
      )}

      <p className="text-[11px] text-slate-500 leading-snug">
        Fictional teaching figures. Real promotions and costs vary case by case.
      </p>
    </div>
  );
};

const ScenarioCard: React.FC<{ scenario: typeof NORMAL_DAY_SCENARIO; tone: 'neutral' | 'promo' }> = ({ scenario, tone }) => {
  const toneRing = tone === 'promo' ? 'border-amber-500/30' : 'border-slate-800';
  const toneBadge =
    tone === 'promo'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : 'bg-slate-800/80 text-slate-300 border-slate-700/60';
  const profitTone = scenario.operatingProfit >= 0 ? 'text-emerald-300' : 'text-rose-300';

  return (
    <div className={`p-3 rounded-xl bg-slate-950/70 border ${toneRing} space-y-2`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${toneBadge}`}>
          {scenario.label}
        </span>
        <span className="text-[10px] font-mono-num text-slate-500">
          {scenario.itemsSold} × ₹{scenario.pricePerItem}
        </span>
      </div>

      <div className="space-y-1 text-xs">
        <Row label="Revenue" value={formatRupee(scenario.revenue)} valueClass="text-teal-300 font-mono-num" />
        <Row label="Costs" value={`−${formatRupee(scenario.operatingCosts)}`} valueClass="text-rose-300 font-mono-num" />
        <div className="h-px bg-slate-800 my-1" />
        <Row
          label="Operating profit"
          value={formatSignedRupee(scenario.operatingProfit)}
          valueClass={`${profitTone} font-mono-num font-black text-sm`}
          labelClass="font-bold text-slate-200"
        />
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string; valueClass?: string; labelClass?: string }> = ({
  label,
  value,
  valueClass = 'text-slate-200',
  labelClass = 'text-slate-400',
}) => (
  <div className="flex items-center justify-between gap-2">
    <span className={labelClass}>{label}</span>
    <span className={valueClass}>{value}</span>
  </div>
);

/* --------------------------------------------------------------------------
 * STAGE 4 — Final check
 * -------------------------------------------------------------------------- */

interface CheckStageProps {
  selectedId: string | null;
  submitted: boolean;
  onSelect: (id: string) => void;
}

const CheckStage: React.FC<CheckStageProps> = ({ selectedId, submitted, onSelect }) => {
  const selected = findOption(CHECK_OPTIONS, selectedId);
  const correct = selected?.isCorrect;

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 sm:p-5 space-y-3">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
        <ShieldCheck className="w-3 h-3" />
        <span>Step 4 · Check your understanding</span>
      </div>
      <h2 className="text-base sm:text-xl font-black text-slate-100 leading-tight">
        Revenue ₹5,000. Costs ₹3,000. What is the operating profit?
      </h2>

      <div className="space-y-2" role="radiogroup" aria-label="Operating profit calculation">
        {CHECK_OPTIONS.map((opt) => (
          <AnswerButton
            key={opt.id}
            option={opt}
            selected={selectedId === opt.id}
            submitted={submitted}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>

      {submitted && selected && (
        <div
          className={`p-3 rounded-xl border text-xs sm:text-sm leading-snug motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 ${
            correct
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
          }`}
          role="status"
        >
          <strong className={correct ? 'text-emerald-200' : 'text-rose-200'}>
            {correct ? 'Exactly. ' : 'Not quite. '}
          </strong>
          {selected.explanation}
        </div>
      )}

      {submitted && (
        <div
          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-around text-center text-xs sm:text-sm font-mono-num motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
          aria-label="Subtraction breakdown"
        >
          <span className="text-teal-300 font-bold">₹5,000</span>
          <Minus className="w-4 h-4 text-slate-500" aria-hidden="true" />
          <span className="text-rose-300 font-bold">₹3,000</span>
          <span className="text-slate-500" aria-hidden="true">=</span>
          <span className="text-emerald-300 font-black text-sm sm:text-base">₹2,000</span>
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
 * COMPLETE
 * -------------------------------------------------------------------------- */

const CompleteStage: React.FC<{ compareCorrect: boolean; checkCorrect: boolean; xpReward: number }> = ({
  compareCorrect,
  checkCorrect,
  xpReward,
}) => {
  const correctCount = Number(compareCorrect) + Number(checkCorrect);
  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 text-center space-y-4">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-black text-slate-100">You get it.</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-snug">
          Revenue is the top of the funnel. What matters is what&rsquo;s left after the business pays its bills — and higher sales don&rsquo;t always mean higher operating profit.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <SummaryTile label="Correct answers" value={`${correctCount}/2`} tone="emerald" />
        <SummaryTile label="XP earned" value={`+${xpReward}`} tone="amber" />
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-sm">
        <Sparkles className="w-4 h-4" />
        <span>+{xpReward} XP added</span>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * SHARED LITTLE COMPONENTS
 * -------------------------------------------------------------------------- */

const AnswerButton: React.FC<{
  option: AnswerOption;
  selected: boolean;
  submitted: boolean;
  onSelect: () => void;
}> = ({ option, selected, submitted, onSelect }) => {
  const showResult = submitted && selected;
  const toneClass = showResult
    ? option.isCorrect
      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
      : 'bg-rose-950/60 border-rose-500 text-rose-100'
    : selected
    ? 'bg-teal-500/10 border-teal-500 text-teal-100'
    : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700';

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={submitted}
      role="radio"
      aria-checked={selected}
      className={`w-full text-left p-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400 ${toneClass} ${
        submitted ? 'cursor-default' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono font-bold ${
            showResult
              ? option.isCorrect
                ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                : 'border-rose-400 bg-rose-500 text-slate-950'
              : selected
              ? 'border-teal-400 bg-teal-500 text-slate-950'
              : 'border-slate-700 text-slate-500'
          }`}
          aria-hidden="true"
        >
          {showResult ? (option.isCorrect ? '✓' : '✕') : selected ? '•' : '○'}
        </span>
        <span>{option.text}</span>
      </div>
    </button>
  );
};

const PrimaryCta: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'celebration';
  children: React.ReactNode;
}> = ({ onClick, disabled, variant = 'default', children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 min-h-[48px] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:bg-slate-800 disabled:bg-none disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none text-slate-950 ${
      variant === 'celebration'
        ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 shadow-emerald-500/25 hover:brightness-110'
        : 'bg-gradient-to-r from-teal-500 to-emerald-400 shadow-teal-500/25 hover:brightness-110'
    }`}
  >
    {children}
  </button>
);

const SummaryTile: React.FC<{ label: string; value: string; tone?: 'teal' | 'emerald' | 'amber' }> = ({ label, value, tone = 'teal' }) => {
  const toneClass =
    tone === 'emerald' ? 'text-emerald-300' : tone === 'amber' ? 'text-amber-300' : 'text-teal-300';
  return (
    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{label}</div>
      <div className={`text-lg font-black font-mono-num mt-0.5 ${toneClass}`}>{value}</div>
    </div>
  );
};
