/**
 * Stocks Level 1 — "What is a Stock?"
 *
 * A guided four-stage interactive mini-game. Replaces the generic 5-stage
 * read-heavy lesson used by every other stocks node, but ONLY for `node_lvl_1`.
 * All other lessons continue through the standard MicroLessonScreen flow.
 *
 * Stages:
 *   1. meet     — Meet Sunny Bakery
 *   2. own      — Pick a share count on a 100-tile grid; see ownership %
 *   3. change   — Scenario quiz about price when demand rises
 *   4. check    — Quiz distinguishing shares vs loan vs guaranteed dividend
 *   complete    — Compact summary; XP awarded exactly once
 *
 * Idempotent completion: the XP callback (`onComplete(nodeId, 150)`) is wrapped
 * in a ref guard so React re-renders can't double-award. The upstream
 * `recordModuleActivityCompletion` is already idempotent across sessions.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PathNode } from '../../../data/learningPath.ts';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
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
} from 'lucide-react';
import { SunnyBakeryIllustration } from './SunnyBakeryIllustration.tsx';
import {
  AnswerOption,
  DEFAULT_SELECTED_SHARES,
  LESSON_STAGE_LABEL,
  LESSON_STAGE_ORDER,
  LessonStage,
  STAGE_3_OPTIONS,
  STAGE_4_OPTIONS,
  SUNNY_BAKERY_TOTAL_SHARES,
  calculateOwnershipPercentage,
  clampShareCount,
  findOption,
  formatOwnershipPercent,
} from './ownershipCalculations.ts';

interface WhatIsStockLessonProps {
  node: PathNode;
  onBack: () => void;
  onComplete: (nodeId: string, xpEarned: number) => void;
}

const XP_REWARD_FALLBACK = 150;
const LEVEL_NUMBER = 1;

export const WhatIsStockLesson: React.FC<WhatIsStockLessonProps> = ({ node, onBack, onComplete }) => {
  const [stage, setStage] = useState<LessonStage>('meet');
  const [selectedShares, setSelectedShares] = useState<number>(DEFAULT_SELECTED_SHARES);

  const [stage3AnswerId, setStage3AnswerId] = useState<string | null>(null);
  const [stage3Submitted, setStage3Submitted] = useState(false);

  const [stage4AnswerId, setStage4AnswerId] = useState<string | null>(null);
  const [stage4Submitted, setStage4Submitted] = useState(false);

  const completeAwardedRef = useRef(false);
  const xpReward = node.xpReward || XP_REWARD_FALLBACK;

  const character = useCharacterController({
    initialState: 'talking',
    initialMessage: "Meet Sunny Bakery! The owner wants to expand.",
    initialSubMessage: 'Imagine you could own a small part of it.',
  });

  // Per-stage mentor dialogue + reaction. Short, complementary to the stage
  // body — never repeats the stage heading or the primary CTA label.
  useEffect(() => {
    switch (stage) {
      case 'meet':
        character.speak("Hi! Let me show you around.");
        character.react('talking', { durationMs: 2200 });
        break;
      case 'own':
        character.speak('Tap the tiles to change your stake.');
        character.react('thinking', { durationMs: 2200 });
        break;
      case 'change':
        character.speak('Think — what usually happens when demand rises?');
        character.react('thinking', { durationMs: 2200 });
        break;
      case 'check':
        character.speak('One quick check to lock it in.');
        character.react('thinking', { durationMs: 2200 });
        break;
      case 'complete':
        character.speak("Nice work. You've got it.");
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // Mentor hook identity is stable (useMemo inside the hook)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Idempotent award on first entry to `complete`.
  useEffect(() => {
    if (stage === 'complete' && !completeAwardedRef.current) {
      completeAwardedRef.current = true;
      onComplete(node.id, xpReward);
    }
  }, [stage, node.id, xpReward, onComplete]);

  const ownershipPct = calculateOwnershipPercentage(selectedShares);
  const stageIndex = LESSON_STAGE_ORDER.indexOf(stage);
  const progressPercent = Math.round(((stageIndex + 1) / LESSON_STAGE_ORDER.length) * 100);

  const stage3Selected = findOption(STAGE_3_OPTIONS, stage3AnswerId);
  const stage4Selected = findOption(STAGE_4_OPTIONS, stage4AnswerId);

  const handleStage3Submit = () => {
    if (!stage3Selected) return;
    setStage3Submitted(true);
    character.react(stage3Selected.isCorrect ? 'happy' : 'confused', { durationMs: 1800 });
  };

  const handleStage4Submit = () => {
    if (!stage4Selected) return;
    setStage4Submitted(true);
    character.react(stage4Selected.isCorrect ? 'happy' : 'confused', { durationMs: 1800 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4 pb-28 sm:pb-24 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 select-none">
      {/* Header — mirrors the MicroLessonScreen pattern */}
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
            <span className="text-slate-100">What is a Stock?</span>
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
        aria-label={`Lesson progress: step ${stageIndex + 1} of ${LESSON_STAGE_ORDER.length}`}
      >
        <div
          className="bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Compact step indicator — hidden on mobile where the stage body's
          eyebrow already names the step. */}
      <div className="hidden sm:flex items-center justify-between gap-2 text-[11px] font-semibold">
        <span className="text-slate-400">
          Step {stageIndex + 1} of {LESSON_STAGE_ORDER.length} ·{' '}
          <span className="text-teal-300">{LESSON_STAGE_LABEL[stage]}</span>
        </span>
        <span className="text-slate-500 font-mono-num">{progressPercent}%</span>
      </div>

      {/* Mentor + dialogue — compact on mobile, larger on desktop. */}
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
        className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 space-y-4"
      >
        {stage === 'meet' && <MeetStage />}
        {stage === 'own' && (
          <OwnStage
            selectedShares={selectedShares}
            onShareCountChange={(n) => setSelectedShares(clampShareCount(n))}
          />
        )}
        {stage === 'change' && (
          <ChangeStage
            selectedId={stage3AnswerId}
            submitted={stage3Submitted}
            onSelect={(id) => {
              if (stage3Submitted) return;
              setStage3AnswerId(id);
            }}
          />
        )}
        {stage === 'check' && (
          <CheckStage
            selectedId={stage4AnswerId}
            submitted={stage4Submitted}
            onSelect={(id) => {
              if (stage4Submitted) return;
              setStage4AnswerId(id);
            }}
          />
        )}
        {stage === 'complete' && (
          <CompleteStage
            ownershipPct={ownershipPct}
            stage3Correct={stage3Selected?.isCorrect ?? false}
            stage4Correct={stage4Selected?.isCorrect ?? false}
            xpReward={xpReward}
          />
        )}
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-3 sm:px-4 sm:py-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto flex items-stretch gap-2 sm:gap-3">
          {stage !== 'meet' && stage !== 'complete' && (
            <button
              type="button"
              onClick={() => {
                const prevIndex = Math.max(0, stageIndex - 1);
                setStage(LESSON_STAGE_ORDER[prevIndex]);
              }}
              className="shrink-0 px-3 sm:px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              aria-label="Back one step"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {stage === 'meet' && (
            <PrimaryCta onClick={() => setStage('own')}>
              <span>Let&rsquo;s explore</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'own' && (
            <PrimaryCta onClick={() => setStage('change')}>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'change' && !stage3Submitted && (
            <PrimaryCta onClick={handleStage3Submit} disabled={!stage3Selected}>
              <span>{stage3Selected ? 'Check answer' : 'Pick an option'}</span>
              {stage3Selected && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            </PrimaryCta>
          )}

          {stage === 'change' && stage3Submitted && (
            <PrimaryCta onClick={() => setStage('check')}>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'check' && !stage4Submitted && (
            <PrimaryCta onClick={handleStage4Submit} disabled={!stage4Selected}>
              <span>{stage4Selected ? 'Check answer' : 'Pick an option'}</span>
              {stage4Selected && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            </PrimaryCta>
          )}

          {stage === 'check' && stage4Submitted && (
            <PrimaryCta onClick={() => setStage('complete')}>
              <span>See summary</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </PrimaryCta>
          )}

          {stage === 'complete' && (
            <PrimaryCta
              onClick={onBack}
              variant="celebration"
            >
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
 * STAGE COMPONENTS
 * -------------------------------------------------------------------------- */

const MeetStage: React.FC = () => (
  <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
    <div className="relative max-h-[150px] sm:max-h-none overflow-hidden">
      <SunnyBakeryIllustration variant="calm" />
    </div>
    <div className="p-3 sm:p-5 space-y-2">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
        <Store className="w-3 h-3" />
        <span>Step 1 · Meet the business</span>
      </div>
      <h2 className="text-base sm:text-xl font-black text-slate-100 leading-tight">
        Welcome to Sunny Bakery.
      </h2>
      <p className="text-xs sm:text-sm text-slate-300 leading-snug">
        A small neighborhood bakery doing well — and the owner wants to expand. See what it means to own a small piece of a business like this.
      </p>
    </div>
  </div>
);

interface OwnStageProps {
  selectedShares: number;
  onShareCountChange: (next: number) => void;
}

const OwnStage: React.FC<OwnStageProps> = ({ selectedShares, onShareCountChange }) => {
  const tiles = useMemo(
    () => Array.from({ length: SUNNY_BAKERY_TOTAL_SHARES }, (_, i) => i),
    [],
  );

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 sm:p-5 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
          <Sparkles className="w-3 h-3" />
          <span>Step 2 · Own a piece</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm sm:text-xl font-black text-slate-100 leading-tight">
              Sunny Bakery has 100 equal shares in this example.
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Tap or drag to change what you own.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your stake</div>
            <div
              className="text-xl sm:text-3xl font-black text-teal-300 font-mono-num leading-none"
              aria-live="polite"
            >
              {formatOwnershipPercent(selectedShares)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono-num">
              {selectedShares} / {SUNNY_BAKERY_TOTAL_SHARES}
            </div>
          </div>
        </div>

        {/* Tile grid — 10 x 10 */}
        <div
          className="grid grid-cols-10 gap-1 sm:gap-1.5 p-2 sm:p-3 bg-slate-950/80 rounded-xl border border-slate-800"
          role="group"
          aria-label="Share tiles — tap to set your ownership"
        >
          {tiles.map((i) => {
            const isOwned = i < selectedShares;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onShareCountChange(i + 1)}
                aria-label={`Set ownership to ${i + 1} share${i === 0 ? '' : 's'}`}
                aria-pressed={isOwned}
                className={`aspect-square rounded-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                  isOwned
                    ? 'bg-gradient-to-br from-teal-500 to-emerald-400 shadow-sm shadow-teal-500/30'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60'
                }`}
              />
            );
          })}
        </div>

        {/* Slider + +/- for precise control */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onShareCountChange(selectedShares - 1)}
            disabled={selectedShares <= 1}
            className="shrink-0 w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/60 flex items-center justify-center text-slate-300 cursor-pointer"
            aria-label="Own one fewer share"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="range"
            min={1}
            max={SUNNY_BAKERY_TOTAL_SHARES}
            value={selectedShares}
            onChange={(e) => onShareCountChange(Number(e.target.value))}
            className="flex-1 accent-teal-500"
            aria-label="Number of shares you own"
          />
          <button
            type="button"
            onClick={() => onShareCountChange(selectedShares + 1)}
            disabled={selectedShares >= SUNNY_BAKERY_TOTAL_SHARES}
            className="shrink-0 w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/60 flex items-center justify-center text-slate-300 cursor-pointer"
            aria-label="Own one more share"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-snug">
        <strong className="text-slate-100 font-mono-num">{selectedShares}</strong> of {SUNNY_BAKERY_TOTAL_SHARES} equal shares ={' '}
        <strong className="text-teal-300 font-mono-num">{formatOwnershipPercent(selectedShares)}</strong> ownership stake.
      </div>
    </div>
  );
};

interface AnswerStageProps {
  selectedId: string | null;
  submitted: boolean;
  onSelect: (id: string) => void;
}

const ChangeStage: React.FC<AnswerStageProps> = ({ selectedId, submitted, onSelect }) => {
  const selected = findOption(STAGE_3_OPTIONS, selectedId);

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
      {/* Illustration banner — capped on mobile so the question stays near the top */}
      <div className="max-h-[120px] sm:max-h-[200px] overflow-hidden border-b border-slate-800">
        <SunnyBakeryIllustration variant="popular" />
      </div>

      <div className="p-3 sm:p-5 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
          <Store className="w-3 h-3" />
          <span>Step 3 · The business changes</span>
        </div>
        <h2 className="text-base sm:text-xl font-black text-slate-100 leading-tight">
          Sunny Bakery is getting popular.
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-snug">
          If more people believe it will do well, what could happen to the price they are willing to pay for its shares?
        </p>

        <div
          className="space-y-2"
          role="radiogroup"
          aria-label="Share price scenario"
        >
          {STAGE_3_OPTIONS.map((opt) => (
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
              {selected.isCorrect ? 'Nice. ' : 'Not quite. '}
            </strong>
            {selected.explanation}
          </div>
        )}
      </div>
    </div>
  );
};

const CheckStage: React.FC<AnswerStageProps> = ({ selectedId, submitted, onSelect }) => {
  const selected = findOption(STAGE_4_OPTIONS, selectedId);

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 sm:p-5 space-y-3">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold">
        <ShieldCheck className="w-3 h-3" />
        <span>Step 4 · Check your understanding</span>
      </div>
      <h2 className="text-base sm:text-xl font-black text-slate-100 leading-tight">
        You own 10 of Sunny Bakery&rsquo;s 100 shares. Which statement fits best?
      </h2>

      <div
        className="space-y-2"
        role="radiogroup"
        aria-label="What does owning shares mean"
      >
        {STAGE_4_OPTIONS.map((opt) => (
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
            {selected.isCorrect ? 'Exactly. ' : 'Not quite. '}
          </strong>
          {selected.explanation}
        </div>
      )}

      {submitted && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-snug space-y-1.5">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>A share = <strong className="text-slate-100">ownership</strong>, not a loan.</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Dividends are <strong className="text-slate-100">not guaranteed</strong> — many companies pay none at all.</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface CompleteStageProps {
  ownershipPct: number;
  stage3Correct: boolean;
  stage4Correct: boolean;
  xpReward: number;
}

const CompleteStage: React.FC<CompleteStageProps> = ({ ownershipPct, stage3Correct, stage4Correct, xpReward }) => {
  const correctCount = Number(stage3Correct) + Number(stage4Correct);

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 text-center space-y-4">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-black text-slate-100">You get it.</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-snug">
          A share is a small piece of ownership in a real business. Its price can rise or fall as expectations change — and ownership is nothing like a loan or a guaranteed cheque.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <SummaryTile label="Your stake" value={formatOwnershipPercent(Math.max(1, Math.round(ownershipPct)))} tone="teal" />
        <SummaryTile label="Correct answers" value={`${correctCount}/2`} tone="emerald" />
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
  // After submission we show which one is correct via a check icon so meaning
  // is never conveyed by color alone (accessibility: option 8.4 of the spec).
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
