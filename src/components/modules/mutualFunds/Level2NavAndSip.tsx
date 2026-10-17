/**
 * Mutual Funds — Level 2: The NAV Machine lesson.
 *
 * A stage-driven, story-based lesson built on `useNavLessonMachine`.
 * Mentor "Inspector Fin" reacts via `useCharacterController`.
 * NAV math lives in `src/data/navCalculations.ts` and never depends on
 * animation state.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Calculator,
  TrendingUp,
  TrendingDown,
  CircleEqual,
  Award,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Lock,
} from 'lucide-react';

import { CharacterMentor } from '../../character/CharacterMentor.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { useAnimatedNumber } from '../../common/useAnimatedNumber.ts';
import {
  INVESTMENT_AMOUNT_OPTIONS,
  NAV_CHANGE_OPTIONS,
  buildHoldingSnapshot,
  buildMythbusterComparison,
  calculateUnits,
  formatPercent,
  formatRupee,
  formatUnits,
} from '../../../data/navCalculations.ts';
import {
  MythbusterPrediction,
  useNavLessonMachine,
} from './useNavLessonMachine.ts';

interface Level2NavAndSipProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

const LESSON_XP_REWARD = 200;

const STAGE_LABELS: Record<string, string> = {
  intro: 'Set the Stage',
  chooseInvestment: 'Choose an Investment',
  calculateUnits: 'Calculate Units',
  changeNav: 'Change the NAV',
  observeValue: 'Observe the Consequence',
  mythbuster: 'Mythbuster',
  reflection: 'Reflection',
  complete: 'Complete',
};

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export const Level2NavAndSip: React.FC<Level2NavAndSipProps> = ({ onComplete, onBack }) => {
  const machine = useNavLessonMachine();
  const { state } = machine;
  const character = useCharacterController({
    initialState: 'talking',
    initialMessage: "Hi, I'm Inspector Fin. Let's crack the NAV code together.",
    initialSubMessage: 'A quick experiment with ₹2,000 before you ever invest a rupee.',
  });

  const completeAwardedRef = useRef(false);

  // Emit the entry message/reaction whenever the stage changes.
  useEffect(() => {
    switch (state.stage) {
      case 'intro':
        character.speak(
          "Hi, I'm Inspector Fin. Let's crack the NAV code together.",
          'A quick experiment with ₹2,000 before you ever invest a rupee.',
        );
        character.react('talking', { durationMs: 2200 });
        break;
      case 'chooseInvestment':
        character.speak(
          'Pick an investment amount.',
          "This is money going in — not the number of units you'll receive.",
        );
        character.react('thinking', { durationMs: 2500 });
        break;
      case 'calculateUnits':
        character.speak(
          'At an NAV of ₹20, how many units does your money buy?',
          'Units = Amount ÷ NAV. The display will count them up for you.',
        );
        character.react('surprised', { durationMs: 2000 });
        break;
      case 'changeNav':
        character.speak(
          'Markets move. Pick a scenario and watch the NAV shift.',
          'Your unit count stays frozen — only the per-unit value changes.',
        );
        character.react('talking', { durationMs: 2200 });
        break;
      case 'observeValue':
        character.speak(
          'What actually changed just now — the number of units, or the value per unit?',
        );
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'mythbuster':
        character.speak(
          'A fund with NAV ₹10 vs one with NAV ₹100 — predict who wins.',
          'Both go up by the same 10%. Where do you bet?',
        );
        character.react('surprised', { durationMs: 2000 });
        break;
      case 'reflection':
        character.speak(
          'One last thought experiment to lock the lesson in.',
        );
        character.react('talking', { durationMs: 2000 });
        break;
      case 'complete':
        character.speak(
          'You cracked it! NAV is the per-unit value — nothing more, nothing less.',
          `+${LESSON_XP_REWARD} XP added to your Mutual Funds journey.`,
        );
        character.react('celebrating', { durationMs: 2400 });
        break;
      default:
        break;
    }
    // Only re-run on stage change (character hook identity is stable via useMemo).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stage]);

  // Idempotent XP award on first entry to `complete`.
  useEffect(() => {
    if (state.stage === 'complete' && !completeAwardedRef.current) {
      completeAwardedRef.current = true;
      onComplete(LESSON_XP_REWARD);
    }
  }, [state.stage, onComplete]);

  const handleSendAndReact = (action: Parameters<typeof machine.send>[0]) => {
    const { event } = machine.send(action);
    if (event) {
      character.emit(event);
    }
  };

  const handleAnswerFeedback = (isCorrect: boolean) => {
    character.react(isCorrect ? 'happy' : 'confused', { durationMs: 1800 });
  };

  const stageIndex = machine.stageIndex;
  const stageTotal = machine.stageTotal;
  const progressPercent = Math.round(((stageIndex + 1) / stageTotal) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 pb-24 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      {/* Lesson Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Mutual Funds Hub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-teal-400">Level 2 of 5</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">NAV Machine</span>
        </div>
      </div>

      {/* Progress strip */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span className="text-slate-400">
            Step {stageIndex + 1} of {stageTotal} ·{' '}
            <span className="text-teal-300">{STAGE_LABELS[state.stage]}</span>
          </span>
          <span className="text-slate-500 font-mono-num">{progressPercent}%</span>
        </div>
        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 motion-safe:transition-all motion-safe:duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Character + Dialogue */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6">
        <CharacterMentor
          state={character.state}
          message={character.message}
          subMessage={character.subMessage}
          size="md"
          revealProgressively
        />
      </div>

      {/* Stage Body */}
      <div
        key={state.stage}
        className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
      >
        {state.stage === 'intro' && (
          <IntroStage onStart={() => handleSendAndReact({ type: 'START' })} />
        )}

        {state.stage === 'chooseInvestment' && (
          <ChooseInvestmentStage
            invested={state.invested}
            onSelect={(amount) => machine.send({ type: 'SELECT_AMOUNT', amount })}
            onConfirm={() => handleSendAndReact({ type: 'CONFIRM_AMOUNT' })}
          />
        )}

        {state.stage === 'calculateUnits' && (
          <CalculateUnitsStage
            invested={state.invested}
            nav={state.initialNav}
            selectedAnswerId={state.unitsQuizAnswerId}
            onAnswer={(answerId, isCorrect) => {
              machine.send({ type: 'ANSWER_UNITS_QUIZ', answerId, isCorrect });
              handleAnswerFeedback(isCorrect);
            }}
            onContinue={() => handleSendAndReact({ type: 'ADVANCE_TO_NAV_CHANGE' })}
          />
        )}

        {state.stage === 'changeNav' && (
          <ChangeNavStage
            invested={state.invested}
            initialNav={state.initialNav}
            currentNav={state.currentNav}
            scenarioKey={state.navScenario}
            onSelect={(scenario) => handleSendAndReact({ type: 'SELECT_NAV_SCENARIO', scenario })}
            onContinue={() => handleSendAndReact({ type: 'ADVANCE_TO_OBSERVE' })}
          />
        )}

        {state.stage === 'observeValue' && (
          <ObserveValueStage
            invested={state.invested}
            initialNav={state.initialNav}
            currentNav={state.currentNav}
            scenarioKey={state.navScenario}
            selectedAnswerId={state.observationAnswerId}
            onAnswer={(answerId, isCorrect) => {
              machine.send({ type: 'ANSWER_OBSERVATION', answerId, isCorrect });
              handleAnswerFeedback(isCorrect);
            }}
            onContinue={() => handleSendAndReact({ type: 'ADVANCE_TO_MYTH' })}
          />
        )}

        {state.stage === 'mythbuster' && (
          <MythbusterStage
            prediction={state.mythbusterPrediction}
            revealed={state.mythbusterRevealed}
            onPredict={(prediction) => machine.send({ type: 'PREDICT_MYTH', prediction })}
            onReveal={() => {
              const correct = state.mythbusterPrediction === 'equal';
              handleSendAndReact({ type: 'REVEAL_MYTH' });
              handleAnswerFeedback(correct);
            }}
            onContinue={() => handleSendAndReact({ type: 'ADVANCE_TO_REFLECTION' })}
          />
        )}

        {state.stage === 'reflection' && (
          <ReflectionStage
            selectedAnswerId={state.reflectionAnswerId}
            onAnswer={(answerId, isCorrect) => {
              machine.send({ type: 'ANSWER_REFLECTION', answerId, isCorrect });
              handleAnswerFeedback(isCorrect);
            }}
            onFinish={() => handleSendAndReact({ type: 'FINISH' })}
          />
        )}

        {state.stage === 'complete' && (
          <CompleteStage
            correctAnswers={machine.correctAnswersCount}
            totalQuizzes={4}
            onReturn={onBack}
          />
        )}
      </div>

      {/* Educational Disclaimer */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-4 py-3 text-[11px] text-slate-400 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          Educational simulation. All NAV figures and scenarios are deterministic examples designed to illustrate the mechanics of mutual fund units. Real investing involves fees, taxes, distributions, and market risk not modelled here.
        </span>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * STAGE COMPONENTS
 * -------------------------------------------------------------------------- */

const StageIntro: React.FC<{ icon: React.ReactNode; eyebrow: string; title: string }> = ({ icon, eyebrow, title }) => (
  <div className="space-y-2 mb-5">
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
      {icon}
      <span>{eyebrow}</span>
    </div>
    <h2 className="text-xl sm:text-2xl font-black text-slate-100">{title}</h2>
  </div>
);

const PrimaryActionButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ onClick, disabled, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
      disabled
        ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
        : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'
    }`}
  >
    {children}
  </button>
);

/* --- Stage: Intro --- */
const IntroStage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="space-y-5">
    <StageIntro
      icon={<Sparkles className="w-3.5 h-3.5" />}
      eyebrow="Step 1 · Set the Stage"
      title="You have ₹2,000. What does NAV actually tell you?"
    />
    <p className="text-sm text-slate-300 leading-relaxed">
      <strong>NAV</strong> is short for <strong>Net Asset Value</strong>. It is the per-unit value of a mutual fund, recalculated at the end of every trading day. Before you ever buy a unit, let's run a short, controlled experiment on exactly what NAV changes — and what it doesn't.
    </p>
    <div className="flex justify-end">
      <PrimaryActionButton onClick={onStart}>
        <span>Start the experiment</span>
        <ArrowRight className="w-4 h-4" />
      </PrimaryActionButton>
    </div>
  </div>
);

/* --- Stage: Choose Investment --- */
const ChooseInvestmentStage: React.FC<{
  invested: number;
  onSelect: (amount: number) => void;
  onConfirm: () => void;
}> = ({ invested, onSelect, onConfirm }) => (
  <div className="space-y-5">
    <StageIntro
      icon={<Calculator className="w-3.5 h-3.5" />}
      eyebrow="Step 2 · Choose an Investment"
      title="Pick your experiment amount."
    />
    <p className="text-sm text-slate-300 leading-relaxed">
      This is <strong>the rupees going in</strong>, not the units you receive. We'll work out the units next, together.
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {INVESTMENT_AMOUNT_OPTIONS.map((amount) => (
        <button
          key={amount}
          type="button"
          onClick={() => onSelect(amount)}
          className={`py-4 rounded-2xl text-sm font-black transition-all cursor-pointer border ${
            invested === amount
              ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20'
              : 'bg-slate-950/70 text-slate-200 border-slate-800 hover:border-slate-700'
          }`}
        >
          ₹{amount.toLocaleString('en-IN')}
        </button>
      ))}
    </div>
    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
      You selected <strong className="text-slate-200 font-mono-num">₹{invested.toLocaleString('en-IN')}</strong>. This is money going in, not the number of units received yet.
    </div>
    <div className="flex justify-end">
      <PrimaryActionButton onClick={onConfirm}>
        <span>Lock amount & see units</span>
        <ArrowRight className="w-4 h-4" />
      </PrimaryActionButton>
    </div>
  </div>
);

/* --- Stage: Calculate Units --- */
const CalculateUnitsStage: React.FC<{
  invested: number;
  nav: number;
  selectedAnswerId: string | null;
  onAnswer: (answerId: string, isCorrect: boolean) => void;
  onContinue: () => void;
}> = ({ invested, nav, selectedAnswerId, onAnswer, onContinue }) => {
  const units = calculateUnits(invested, nav);
  const displayedUnits = useAnimatedNumber(units, 900);

  const options: QuizOption[] = useMemo(() => {
    const correctUnits = calculateUnits(invested * 2, nav);
    return [
      {
        id: 'half',
        text: `${(units / 2).toFixed(2)} units`,
        isCorrect: false,
        explanation: 'Think again — the amount doubled, not halved.',
      },
      {
        id: 'same',
        text: `${units.toFixed(2)} units`,
        isCorrect: false,
        explanation: 'Not quite — units scale with the amount you invest at the same NAV.',
      },
      {
        id: 'double',
        text: `${correctUnits.toFixed(2)} units`,
        isCorrect: true,
        explanation: 'Correct! Twice the amount at the same NAV = twice the units.',
      },
    ].sort((a, b) => a.id.localeCompare(b.id));
  }, [invested, nav, units]);

  const selected = options.find((o) => o.id === selectedAnswerId);

  return (
    <div className="space-y-5">
      <StageIntro
        icon={<Calculator className="w-3.5 h-3.5" />}
        eyebrow="Step 3 · Calculate Units"
        title="The money-to-units handshake."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatBox label="Investment" value={formatRupee(invested)} caption="Rupees in" />
        <StatBox label="NAV per unit" value={formatRupee(nav, 2)} caption="At the moment of purchase" />
        <StatBox
          label="Units received"
          value={displayedUnits.toFixed(2)}
          caption={`Amount ÷ ₹${nav}`}
          accent="teal"
        />
      </div>
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-sm text-slate-300 leading-relaxed">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
          Observation Quiz
        </span>
        If you invested <strong className="text-slate-100 font-mono-num">twice as much</strong> at the same NAV of ₹{nav}, how many units would you receive?
      </div>
      <div className="space-y-2">
        {options.map((opt) => (
          <QuizButton
            key={opt.id}
            option={opt}
            selected={selectedAnswerId === opt.id}
          onClick={() => onAnswer(opt.id, opt.isCorrect)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <PrimaryActionButton
          onClick={onContinue}
          disabled={!selected?.isCorrect}
        >
          <span>{selected?.isCorrect ? 'Continue to NAV change' : 'Pick the correct answer to continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </PrimaryActionButton>
      </div>
    </div>
  );
};

/* --- Stage: Change NAV --- */
const ChangeNavStage: React.FC<{
  invested: number;
  initialNav: number;
  currentNav: number;
  scenarioKey: string | null;
  onSelect: (scenario: 'dip20' | 'flat' | 'up25' | 'up50') => void;
  onContinue: () => void;
}> = ({ invested, initialNav, currentNav, scenarioKey, onSelect, onContinue }) => {
  const snapshot = buildHoldingSnapshot(invested, initialNav, currentNav);
  const displayedNav = useAnimatedNumber(snapshot.currentNav, 650);
  const displayedValue = useAnimatedNumber(snapshot.currentValue, 650);
  const displayedPnL = useAnimatedNumber(snapshot.profitLoss, 650);

  const direction: 'up' | 'down' | 'flat' =
    snapshot.profitLoss > 0 ? 'up' : snapshot.profitLoss < 0 ? 'down' : 'flat';

  return (
    <div className="space-y-5">
      <StageIntro
        icon={<TrendingUp className="w-3.5 h-3.5" />}
        eyebrow="Step 4 · Change the NAV"
        title="Markets move. Your unit count doesn't."
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {NAV_CHANGE_OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onSelect(option.key)}
            className={`py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
              scenarioKey === option.key
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox
          label="Units held"
          value={snapshot.units.toFixed(2)}
          caption="Unchanged"
          icon={<Lock className="w-3 h-3" />}
        />
        <StatBox label="Current NAV" value={formatRupee(displayedNav, 2)} caption="Per unit value" />
        <StatBox
          label="Current value"
          value={formatRupee(displayedValue)}
          caption="Units × Current NAV"
          accent="teal"
        />
        <StatBox
          label={direction === 'down' ? 'Loss' : direction === 'up' ? 'Gain' : 'No change'}
          value={`${snapshot.profitLoss >= 0 ? '+' : ''}${formatRupee(displayedPnL)}`}
          caption={formatPercent(snapshot.returnPercent)}
          accent={direction === 'down' ? 'rose' : direction === 'up' ? 'emerald' : 'slate'}
          icon={
            direction === 'down' ? (
              <TrendingDown className="w-3 h-3" />
            ) : direction === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <CircleEqual className="w-3 h-3" />
            )
          }
        />
      </div>

      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <span className="font-bold text-slate-100 block mb-1">What just happened?</span>
        You still own <strong className="font-mono-num text-slate-100">{snapshot.units.toFixed(2)}</strong> units. The <strong>per-unit value</strong> moved from ₹{initialNav} to ₹{snapshot.currentNav.toFixed(2)}. No units were bought or sold.
      </div>

      <div className="flex justify-end">
        <PrimaryActionButton onClick={onContinue} disabled={scenarioKey === null}>
          <span>Observe the consequence</span>
          <ArrowRight className="w-4 h-4" />
        </PrimaryActionButton>
      </div>
    </div>
  );
};

/* --- Stage: Observe Value --- */
const ObserveValueStage: React.FC<{
  invested: number;
  initialNav: number;
  currentNav: number;
  scenarioKey: string | null;
  selectedAnswerId: string | null;
  onAnswer: (answerId: string, isCorrect: boolean) => void;
  onContinue: () => void;
}> = ({ invested, initialNav, currentNav, selectedAnswerId, onAnswer, onContinue }) => {
  const snapshot = buildHoldingSnapshot(invested, initialNav, currentNav);
  const options: QuizOption[] = [
    {
      id: 'units_changed',
      text: 'The number of units I own changed.',
      isCorrect: false,
      explanation: 'Not quite — you did not buy or sell. Unit count stayed the same.',
    },
    {
      id: 'nav_changed',
      text: 'The value of each unit changed. Units stayed exactly the same.',
      isCorrect: true,
      explanation: `Exactly. NAV moved from ₹${initialNav} to ₹${snapshot.currentNav.toFixed(2)}. You still own ${snapshot.units.toFixed(2)} units.`,
    },
    {
      id: 'invested_changed',
      text: 'The money I originally invested changed.',
      isCorrect: false,
      explanation: 'Your invested amount is fixed history. What moved is the per-unit NAV.',
    },
  ];

  const selected = options.find((o) => o.id === selectedAnswerId);

  return (
    <div className="space-y-5">
      <StageIntro
        icon={<Lightbulb className="w-3.5 h-3.5" />}
        eyebrow="Step 5 · Observe the Consequence"
        title={`You still own ${snapshot.units.toFixed(2)} units. What changed?`}
      />
      <div className="space-y-2">
        {options.map((opt) => (
          <QuizButton
            key={opt.id}
            option={opt}
            selected={selectedAnswerId === opt.id}
            onClick={() => onAnswer(opt.id, opt.isCorrect)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <PrimaryActionButton onClick={onContinue} disabled={!selected?.isCorrect}>
          <span>{selected?.isCorrect ? 'Continue to Mythbuster' : 'Pick the correct answer to continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </PrimaryActionButton>
      </div>
    </div>
  );
};

/* --- Stage: Mythbuster --- */
const MythbusterStage: React.FC<{
  prediction: MythbusterPrediction | null;
  revealed: boolean;
  onPredict: (prediction: MythbusterPrediction) => void;
  onReveal: () => void;
  onContinue: () => void;
}> = ({ prediction, revealed, onPredict, onReveal, onContinue }) => {
  const comparison = buildMythbusterComparison();

  const predictionOptions: { id: MythbusterPrediction; label: string; detail: string }[] = [
    { id: 'A', label: 'Fund A (₹10 NAV) wins', detail: 'Looks "cheap" because the NAV is low.' },
    { id: 'equal', label: 'Both end exactly equal', detail: 'If the underlying moves the same %, outcome is the same.' },
    { id: 'B', label: 'Fund B (₹100 NAV) wins', detail: 'Looks "premium" because the NAV is high.' },
  ];

  return (
    <div className="space-y-5">
      <StageIntro
        icon={<Sparkles className="w-3.5 h-3.5" />}
        eyebrow="Step 6 · Mythbuster"
        title="Is a ₹10 NAV fund automatically cheaper than a ₹100 one?"
      />
      <p className="text-sm text-slate-300 leading-relaxed">
        Both funds hold similar underlying assets. Both go up by the same {comparison.underlyingGrowthPercent}%. You invest {formatRupee(comparison.fundA.invested)} in each. Predict the outcome first — then we'll reveal the math.
      </p>

      <div className="space-y-2">
        {predictionOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onPredict(opt.id)}
            disabled={revealed}
            className={`w-full text-left p-4 rounded-2xl border transition-all ${
              prediction === opt.id
                ? 'bg-teal-500/10 border-teal-500 text-teal-200'
                : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
            } ${revealed ? 'opacity-80 cursor-default' : 'cursor-pointer'}`}
          >
            <span className="block text-sm font-bold">{opt.label}</span>
            <span className="block text-xs text-slate-400 mt-0.5">{opt.detail}</span>
          </button>
        ))}
      </div>

      {!revealed && (
        <div className="flex justify-end">
          <PrimaryActionButton onClick={onReveal} disabled={prediction === null}>
            <span>Reveal the math</span>
            <ArrowRight className="w-4 h-4" />
          </PrimaryActionButton>
        </div>
      )}

      {revealed && (
        <div className="space-y-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FundRevealCard fund={comparison.fundA} underlyingGrowthPercent={comparison.underlyingGrowthPercent} />
            <FundRevealCard fund={comparison.fundB} underlyingGrowthPercent={comparison.underlyingGrowthPercent} />
          </div>
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-sm text-amber-100 leading-relaxed">
            <strong>Both end at {formatRupee(comparison.fundA.endValue)}.</strong> NAV level says nothing about cheapness. What drives value is the <em>% change</em> in the underlying — not whether the starting NAV was ₹10 or ₹100.
          </div>
          <div className="flex justify-end">
            <PrimaryActionButton onClick={onContinue}>
              <span>One last reflection</span>
              <ArrowRight className="w-4 h-4" />
            </PrimaryActionButton>
          </div>
        </div>
      )}
    </div>
  );
};

const FundRevealCard: React.FC<{
  fund: ReturnType<typeof buildMythbusterComparison>['fundA'];
  underlyingGrowthPercent: number;
}> = ({ fund, underlyingGrowthPercent }) => (
  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-sm">
    <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
      {fund.label} · NAV ₹{fund.nav}
    </span>
    <div className="text-slate-200">
      Invest <span className="font-mono-num">{formatRupee(fund.invested)}</span> → receive
      {' '}
      <span className="font-mono-num text-teal-300 font-bold">{formatUnits(fund.units)}</span>.
    </div>
    <div className="text-slate-300">
      Underlying rises <strong>{underlyingGrowthPercent}%</strong>, NAV becomes
      {' '}
      <span className="font-mono-num text-slate-100 font-bold">₹{fund.gainedNav.toFixed(2)}</span>.
    </div>
    <div className="text-emerald-300 font-bold font-mono-num">
      Ending value: {formatRupee(fund.endValue)} ({fund.profit >= 0 ? '+' : ''}{formatRupee(fund.profit)})
    </div>
  </div>
);

/* --- Stage: Reflection --- */
const ReflectionStage: React.FC<{
  selectedAnswerId: string | null;
  onAnswer: (answerId: string, isCorrect: boolean) => void;
  onFinish: () => void;
}> = ({ selectedAnswerId, onAnswer, onFinish }) => {
  const options: QuizOption[] = [
    {
      id: 'units',
      text: 'The number of units I own changes my investment\'s value.',
      isCorrect: false,
      explanation: 'Only when you buy or sell. Day-to-day, units stay constant.',
    },
    {
      id: 'nav',
      text: 'The NAV (per-unit value) is what moves my investment\'s value day to day.',
      isCorrect: true,
      explanation: 'Right. In this experiment, with no buys or sells, every movement in your portfolio value came from NAV, not units.',
    },
    {
      id: 'both',
      text: 'Both change constantly, independently of each other.',
      isCorrect: false,
      explanation: 'Not in this experiment. Units only change when you transact. NAV moves every market day.',
    },
  ];

  const selected = options.find((o) => o.id === selectedAnswerId);

  return (
    <div className="space-y-5">
      <StageIntro
        icon={<Lightbulb className="w-3.5 h-3.5" />}
        eyebrow="Step 7 · Reflection"
        title="Which changes your investment's value in this experiment?"
      />
      <div className="space-y-2">
        {options.map((opt) => (
          <QuizButton
            key={opt.id}
            option={opt}
            selected={selectedAnswerId === opt.id}
            onClick={() => onAnswer(opt.id, opt.isCorrect)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <PrimaryActionButton onClick={onFinish} disabled={!selected?.isCorrect}>
          <span>{selected?.isCorrect ? `Complete Level 2 & claim +${LESSON_XP_REWARD} XP` : 'Pick the correct answer to continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </PrimaryActionButton>
      </div>
    </div>
  );
};

/* --- Stage: Complete --- */
const CompleteStage: React.FC<{
  correctAnswers: number;
  totalQuizzes: number;
  onReturn: () => void;
}> = ({ correctAnswers, totalQuizzes, onReturn }) => (
  <div className="py-6 text-center space-y-5 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
      <CheckCircle2 className="w-8 h-8" />
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl font-black text-slate-100">Level 2 Mastered</h3>
      <p className="text-sm text-slate-300 max-w-md mx-auto">
        NAV = per-unit value. Units are what you own. Day-to-day, NAV moves — your unit count doesn't. A low NAV isn't "cheap"; only % change in the underlying matters.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
      <SummaryTile label="Correct answers" value={`${correctAnswers}/${totalQuizzes}`} />
      <SummaryTile label="XP earned" value={`+${LESSON_XP_REWARD}`} accent="amber" />
    </div>
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-sm">
      <Award className="w-4 h-4" />
      <span>+{LESSON_XP_REWARD} XP added</span>
    </div>
    <div className="flex items-center justify-center gap-3 pt-2">
      <button
        type="button"
        onClick={onReturn}
        className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm cursor-pointer"
      >
        Return to Mutual Funds Hub
      </button>
    </div>
  </div>
);

/* --------------------------------------------------------------------------
 * SHARED LITTLE COMPONENTS
 * -------------------------------------------------------------------------- */

const StatBox: React.FC<{
  label: string;
  value: React.ReactNode;
  caption?: string;
  accent?: 'teal' | 'emerald' | 'rose' | 'slate';
  icon?: React.ReactNode;
}> = ({ label, value, caption, accent, icon }) => {
  const accentClass =
    accent === 'teal'
      ? 'text-teal-300'
      : accent === 'emerald'
      ? 'text-emerald-300'
      : accent === 'rose'
      ? 'text-rose-300'
      : 'text-slate-100';
  return (
    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
      <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
        {icon}
        <span>{label}</span>
      </span>
      <span className={`text-base sm:text-lg font-black font-mono-num block ${accentClass}`}>
        {typeof value === 'number' ? value.toFixed(2) : value}
      </span>
      {caption && <span className="text-[10px] text-slate-500 block">{caption}</span>}
    </div>
  );
};

const QuizButton: React.FC<{
  option: QuizOption;
  selected: boolean;
  onClick: () => void;
}> = ({ option, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
      selected
        ? option.isCorrect
          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
          : 'bg-rose-950/60 border-rose-500 text-rose-100'
        : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700'
    }`}
  >
    <div className="flex items-start gap-3">
      <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs">
        {selected ? (option.isCorrect ? '✓' : '✕') : '○'}
      </span>
      <div className="space-y-1">
        <p>{option.text}</p>
        {selected && (
          <p className={`text-xs ${option.isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
            {option.explanation}
          </p>
        )}
      </div>
    </div>
  </button>
);

const SummaryTile: React.FC<{ label: string; value: string; accent?: 'amber' | 'teal' }> = ({ label, value, accent }) => (
  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
    <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
      {label}
    </span>
    <span className={`text-lg font-black font-mono-num block mt-0.5 ${accent === 'amber' ? 'text-amber-300' : 'text-teal-300'}`}>
      {value}
    </span>
  </div>
);

