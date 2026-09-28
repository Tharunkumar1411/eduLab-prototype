/**
 * Guided Learning Game Modal for Stock Market Foundations.
 * 
 * Replaces traditional Q&A quizzes with an interactive 5-stage pedagogical journey:
 * LEARN -> SEE -> TRY -> DECIDE -> REFLECT & APPLY
 * 
 * Teaches beginners what to look at, what matters, and how real investors think.
 */

import React, { useState } from 'react';
import { MicroQuestion, PathNode } from '../../data/learningPath.ts';
import { GUIDED_LESSONS, GuidedLessonStage } from '../../data/guidedCurriculum.ts';
import { CharacterMentor } from '../character/CharacterMentor.tsx';
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  Flame,
  HelpCircle,
  Lightbulb,
  Lock,
  RotateCcw,
  Scale,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Trophy,
  X,
  XCircle,
  Zap,
} from 'lucide-react';

interface MicroLessonModalProps {
  node: PathNode;
  onClose: () => void;
  onComplete: (nodeId: string, xpEarned: number) => void;
}

type StageType = 'learn' | 'see' | 'try' | 'decide' | 'reflect';

export const MicroLessonModal: React.FC<MicroLessonModalProps> = ({
  node,
  onClose,
  onComplete,
}) => {
  const guidedLesson: GuidedLessonStage | undefined = GUIDED_LESSONS[node.id];

  // If guided lesson exists, manage the 5 stages:
  const [currentStage, setCurrentStage] = useState<StageType>('learn');
  const [trySelectedCardId, setTrySelectedCardId] = useState<string | null>(null);
  const [trySubmitted, setTrySubmitted] = useState(false);

  const [decideSelectedOptionId, setDecideSelectedOptionId] = useState<string | null>(null);
  const [decideSubmitted, setDecideSubmitted] = useState(false);

  // Fallback state for standard questions if node has no guided lesson
  const questions: MicroQuestion[] = node.questions || [];
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelectedOptionId, setQuizSelectedOptionId] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Stages array for progress tracking
  const stages: { key: StageType; label: string; icon: any }[] = [
    { key: 'learn', label: '1. Learn', icon: Lightbulb },
    { key: 'see', label: '2. See', icon: Eye },
    { key: 'try', label: '3. Try', icon: Sparkles },
    { key: 'decide', label: '4. Decide', icon: Scale },
    { key: 'reflect', label: '5. Reflect', icon: Award },
  ];

  const stageOrder: StageType[] = ['learn', 'see', 'try', 'decide', 'reflect'];
  const currentStageIndex = stageOrder.indexOf(currentStage);
  const progressPercent = ((currentStageIndex + 1) / stageOrder.length) * 100;

  const handleFinishGuidedLesson = () => {
    onComplete(node.id, guidedLesson ? guidedLesson.xpReward : node.xpReward);
  };

  // ==========================================
  // RENDER GUIDED 5-STAGE LESSON
  // ==========================================
  if (guidedLesson) {
    const selectedCard = guidedLesson.try.cards.find(c => c.id === trySelectedCardId);
    const selectedDecideOption = guidedLesson.decide.options.find(o => o.id === decideSelectedOptionId);

    return (
      <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
          {/* Top Header with Duolingo-style Progress Bar */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800"
              title="Exit Lesson"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stages Breadcrumb Bar */}
            <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2">
              {stages.map((stg, idx) => {
                const IconComponent = stg.icon;
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div
                    key={stg.key}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-teal-500/20 border border-teal-500/50 text-teal-300 ring-1 ring-teal-500/30'
                        : isPassed
                        ? 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400'
                        : 'text-slate-600 border border-transparent'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isCurrent ? 'text-teal-400 animate-pulse' : ''}`} />
                    <span className="hidden sm:inline">{stg.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono-num bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+{guidedLesson.xpReward} XP</span>
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-slate-850 h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* ============================================================ */}
            {/* STAGE 1: LEARN (Character introduces the problem/concept)    */}
            {/* ============================================================ */}
            {currentStage === 'learn' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Inspector Fin Speech Bubble */}
                <div className="flex items-start gap-3.5 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                    <CharacterMentor size="sm" state="talking" />
                  </div>
                  <div className="flex-1 min-w-0 text-slate-200 text-xs sm:text-sm leading-relaxed pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-teal-400 text-xs uppercase tracking-wider">
                        Inspector Fin · Concept Coach
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        Stage 1 of 5
                      </span>
                    </div>
                    <p className="text-slate-300 italic font-sans leading-normal">
                      "{guidedLesson.learn.finSpeech}"
                    </p>
                  </div>
                </div>

                {/* Core Concept Spotlight Card */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-500/30 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-teal-400" />
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Core Mental Model
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                    {guidedLesson.learn.conceptTitle}
                  </h3>
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                    <p className="text-sm font-semibold text-teal-200">
                      💡 {guidedLesson.learn.conceptHighlight}
                    </p>
                  </div>
                </div>

                {/* Mental Model Pillars */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    How an Astute Investor Thinks:
                  </span>
                  <div className="space-y-2">
                    {guidedLesson.learn.mentalModel.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed"
                      >
                        <div className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          {idx + 1}
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investor Question Prompt */}
                <div className="p-3.5 bg-amber-950/30 border border-amber-800/40 rounded-xl flex items-center gap-3 text-xs text-amber-200">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong className="font-semibold text-amber-300">Investor Question:</strong>{' '}
                    {guidedLesson.learn.investorQuestion}
                  </span>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STAGE 2: SEE (Visual example with simple real-world numbers)  */}
            {/* ============================================================ */}
            {currentStage === 'see' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start gap-3.5 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                    <CharacterMentor size="sm" state="thinking" />
                  </div>
                  <div className="flex-1 min-w-0 text-slate-300 text-xs sm:text-sm leading-relaxed pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-teal-400 text-xs uppercase tracking-wider">
                        Visual Breakdown
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        Stage 2 of 5
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans leading-normal">
                      "{guidedLesson.see.finCommentary}"
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">
                    {guidedLesson.see.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Notice how the numbers behave when we look underneath the surface.
                  </p>
                </div>

                {/* Visual Type: Comparison Cards */}
                {guidedLesson.see.visualType === 'cards-comparison' && guidedLesson.see.companyA && guidedLesson.see.companyB && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Company A Card */}
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-sm font-bold text-slate-200">
                          {guidedLesson.see.companyA.name}
                        </span>
                        {guidedLesson.see.companyA.tag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {guidedLesson.see.companyA.tag}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        {guidedLesson.see.companyA.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                              m.highlight
                                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200 font-semibold'
                                : 'bg-slate-900 text-slate-300'
                            }`}
                          >
                            <span className="text-slate-400">{m.label}</span>
                            <span className="font-mono-num font-bold text-slate-100">{m.value}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-850">
                        {guidedLesson.see.companyA.summary}
                      </p>
                    </div>

                    {/* Company B Card */}
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-sm font-bold text-slate-200">
                          {guidedLesson.see.companyB.name}
                        </span>
                        {guidedLesson.see.companyB.tag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                            {guidedLesson.see.companyB.tag}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        {guidedLesson.see.companyB.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                              m.highlight
                                ? 'bg-teal-500/10 border border-teal-500/30 text-teal-200 font-semibold'
                                : 'bg-slate-900 text-slate-300'
                            }`}
                          >
                            <span className="text-slate-400">{m.label}</span>
                            <span className="font-mono-num font-bold text-slate-100">{m.value}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-850">
                        {guidedLesson.see.companyB.summary}
                      </p>
                    </div>
                  </div>
                )}

                {/* Visual Type: Waterfall */}
                {guidedLesson.see.visualType === 'waterfall' && guidedLesson.see.waterfallSteps && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                    {guidedLesson.see.waterfallSteps.map((step, sIdx) => {
                      const isProfit = step.type === 'profit';
                      const isExpense = step.type === 'expense';
                      return (
                        <div
                          key={sIdx}
                          className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                            isProfit
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-bold'
                              : isExpense
                              ? 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-200 font-medium'
                          }`}
                        >
                          <div>
                            <span className="block font-semibold">{step.label}</span>
                            <span className="text-[10px] text-slate-400 block">{step.note}</span>
                          </div>
                          <span className="font-mono-num text-sm font-bold">{step.amount}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Key Observation Banner */}
                <div className="p-3.5 bg-teal-950/40 border border-teal-800/50 rounded-xl flex items-center gap-3 text-xs text-teal-200">
                  <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>
                    <strong className="text-teal-300 font-semibold">Key Observation:</strong>{' '}
                    {guidedLesson.see.keyObservation}
                  </span>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STAGE 3: TRY (Interactive mini-game/exercise)                */}
            {/* ============================================================ */}
            {currentStage === 'try' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start gap-3.5 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                    <CharacterMentor
                      size="sm"
                      state={
                        trySubmitted
                          ? selectedCard?.isCorrect
                            ? 'celebrating'
                            : 'confused'
                          : 'talking'
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-slate-300 text-xs sm:text-sm leading-relaxed pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-teal-400 text-xs uppercase tracking-wider">
                        Interactive Mini-Game
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        Stage 3 of 5
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans leading-normal">
                      {trySubmitted
                        ? selectedCard?.isCorrect
                          ? guidedLesson.try.finReaction.correct
                          : guidedLesson.try.finReaction.incorrect
                        : guidedLesson.try.finHint}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Hands-On Challenge
                  </span>
                  <h3 className="text-base font-bold text-slate-100 leading-snug">
                    {guidedLesson.try.prompt}
                  </h3>
                </div>

                {/* Interactive Cards Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {guidedLesson.try.cards.map((card) => {
                    const isSelected = trySelectedCardId === card.id;
                    let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50';

                    if (trySubmitted) {
                      if (card.isCorrect) {
                        style = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
                      } else if (isSelected && !card.isCorrect) {
                        style = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/50';
                      } else {
                        style = 'bg-slate-950/40 border-slate-850 opacity-50';
                      }
                    } else if (isSelected) {
                      style = 'bg-slate-800 border-teal-500 ring-2 ring-teal-500/50 text-white';
                    }

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => {
                          if (!trySubmitted) {
                            setTrySelectedCardId(card.id);
                          }
                        }}
                        disabled={trySubmitted}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between select-none ${style}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm text-slate-100">{card.name}</span>
                            {card.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                {card.badge}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 my-2">
                            {card.details.map((d, dIdx) => (
                              <div key={dIdx} className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">{d.label}:</span>
                                <span className="font-mono-num font-bold text-amber-300">{d.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Feedback when submitted */}
                        {trySubmitted && (isSelected || card.isCorrect) && (
                          <div
                            className={`mt-2 p-2 rounded-lg text-[11px] leading-relaxed border ${
                              card.isCorrect
                                ? 'bg-emerald-950/80 border-emerald-700/60 text-emerald-200'
                                : 'bg-rose-950/80 border-rose-700/60 text-rose-200'
                            }`}
                          >
                            {card.feedback}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {!trySubmitted && (
                  <button
                    type="button"
                    onClick={() => {
                      if (trySelectedCardId) setTrySubmitted(true);
                    }}
                    disabled={!trySelectedCardId}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                  >
                    <span>Check My Answer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* STAGE 4: DECIDE (Investigative nuance / what to look at next) */}
            {/* ============================================================ */}
            {currentStage === 'decide' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start gap-3.5 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                    <CharacterMentor size="sm" state="thinking" />
                  </div>
                  <div className="flex-1 min-w-0 text-slate-300 text-xs sm:text-sm leading-relaxed pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-amber-400 text-xs uppercase tracking-wider">
                        Investigative Dilemma
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        Stage 4 of 5
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans leading-normal">
                      "{guidedLesson.decide.finPrompt}"
                    </p>
                  </div>
                </div>

                {/* Scenario Context Card */}
                {guidedLesson.decide.scenarioCard && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-slate-200">
                        {guidedLesson.decide.scenarioCard.company}
                      </span>
                      <span className="text-[10px] text-teal-400 font-medium">Market Situation</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {guidedLesson.decide.scenarioCard.stats.map((st, sIdx) => (
                        <div key={sIdx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-400 block truncate">{st.label}</span>
                          <span className="text-xs font-bold font-mono-num text-amber-300 mt-0.5 block">
                            {st.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 italic">
                      {guidedLesson.decide.scenarioCard.contextNote}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    {guidedLesson.decide.question}
                  </h3>
                </div>

                {/* Nuance Options */}
                <div className="space-y-2.5">
                  {guidedLesson.decide.options.map((opt) => {
                    const isSelected = decideSelectedOptionId === opt.id;
                    let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';

                    if (decideSubmitted) {
                      if (opt.isBest) {
                        style = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
                      } else if (isSelected && !opt.isBest) {
                        style = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/50';
                      } else {
                        style = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                      }
                    } else if (isSelected) {
                      style = 'bg-slate-800 border-teal-500 text-white ring-2 ring-teal-500/50';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          if (!decideSubmitted) {
                            setDecideSelectedOptionId(opt.id);
                          }
                        }}
                        disabled={decideSubmitted}
                        className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 select-none ${style}`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                            isSelected
                              ? decideSubmitted
                                ? opt.isBest
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                  : 'bg-rose-500 border-rose-400 text-white'
                                : 'bg-teal-500 border-teal-400 text-slate-950'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {decideSubmitted && opt.isBest ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : isSelected ? (
                            <div className="w-2 h-2 rounded-full bg-slate-950" />
                          ) : null}
                        </div>

                        <div className="flex-1">
                          <span className="leading-relaxed block text-sm font-semibold">{opt.text}</span>
                          {decideSubmitted && (opt.isBest || isSelected) && (
                            <span
                              className={`block mt-2 text-xs font-normal leading-relaxed ${
                                opt.isBest ? 'text-emerald-300' : 'text-rose-300'
                              }`}
                            >
                              {opt.investorInsight}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {!decideSubmitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (decideSelectedOptionId) setDecideSubmitted(true);
                    }}
                    disabled={!decideSelectedOptionId}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                  >
                    <span>Submit Decision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
                    💡 <strong className="text-amber-300">Golden Takeaway:</strong> {guidedLesson.decide.goldenTakeaway}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* STAGE 5: REFLECT & APPLY (Explain why + Golden Rule + XP)    */}
            {/* ============================================================ */}
            {currentStage === 'reflect' && (
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center py-2 space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 flex items-center justify-center animate-bounce-subtle">
                    <Trophy className="w-8 h-8 text-emerald-400" />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-bold text-teal-400 block">
                    Concept Mastered · Level {guidedLesson.levelNumber}
                  </span>
                  <h3 className="text-2xl font-black text-slate-100">
                    {guidedLesson.title}
                  </h3>
                </div>

                {/* Golden Rule of Investing Card */}
                <div className="p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/40 rounded-2xl space-y-2.5 relative overflow-hidden shadow-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Golden Rule #{guidedLesson.reflect.goldenRuleNumber}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100">
                    {guidedLesson.reflect.ruleTitle}
                  </h4>
                  <blockquote className="text-xs sm:text-sm italic text-amber-200/90 font-serif border-l-2 border-amber-500 pl-3 py-0.5">
                    "{guidedLesson.reflect.ruleQuote}"
                  </blockquote>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {guidedLesson.reflect.investorMindsetTakeaway}
                  </p>
                </div>

                {/* Investor Notebook Checklist */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                    Added to Your Investor Notebook:
                  </span>
                  <div className="space-y-1.5">
                    {guidedLesson.reflect.checklistItems.map((chk, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{chk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unlocked Badge */}
                <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center gap-3">
                  <span className="text-3xl">{guidedLesson.reflect.unlockedBadge.icon}</span>
                  <div>
                    <span className="text-[10px] text-teal-400 uppercase font-bold tracking-wider block">
                      Badge Unlocked
                    </span>
                    <span className="text-sm font-bold text-slate-100">
                      {guidedLesson.reflect.unlockedBadge.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {guidedLesson.reflect.unlockedBadge.description}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="px-5 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
            {/* Back button */}
            {currentStageIndex > 0 && currentStage !== 'reflect' ? (
              <button
                type="button"
                onClick={() => {
                  const prevStage = stageOrder[currentStageIndex - 1];
                  setCurrentStage(prevStage);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-xs font-semibold text-slate-400 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {/* Next / Proceed button */}
            {currentStage === 'learn' && (
              <button
                type="button"
                onClick={() => setCurrentStage('see')}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md shadow-teal-500/20"
              >
                <span>See in Action</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStage === 'see' && (
              <button
                type="button"
                onClick={() => setCurrentStage('try')}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md shadow-teal-500/20"
              >
                <span>Try It Yourself</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStage === 'try' && trySubmitted && (
              <button
                type="button"
                onClick={() => setCurrentStage('decide')}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md shadow-teal-500/20"
              >
                <span>Make a Decision</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStage === 'decide' && decideSubmitted && (
              <button
                type="button"
                onClick={() => setCurrentStage('reflect')}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md shadow-teal-500/20"
              >
                <span>View Takeaway & Claim XP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStage === 'reflect' && (
              <button
                type="button"
                onClick={handleFinishGuidedLesson}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25"
              >
                <span>Claim +{guidedLesson.xpReward} XP & Continue Path</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FALLBACK QUIZ HANDLER IF NO GUIDED LESSON
  // ==========================================
  const currentQ = questions[quizIdx];
  const selectedOption = currentQ?.options.find(o => o.id === quizSelectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
          <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((quizIdx + 1) / (questions.length || 1)) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono-num">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{node.xpReward} XP</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {!quizFinished && currentQ ? (
            <>
              <div className="flex items-start gap-3 bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                  <CharacterMentor
                    size="sm"
                    state={quizSubmitted ? (isCorrect ? 'celebrating' : 'confused') : 'talking'}
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs text-slate-300 leading-relaxed pt-1">
                  <span className="font-semibold text-teal-400 block mb-0.5">{node.title}</span>
                  {quizSubmitted
                    ? isCorrect
                      ? currentQ.finReaction.correct
                      : currentQ.finReaction.incorrect
                    : 'Analyze the scenario and pick the right analytical insight.'}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Question {quizIdx + 1} of {questions.length}
                </span>
                <h3 className="text-base font-bold text-slate-100">{currentQ.question}</h3>
              </div>

              <div className="space-y-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = quizSelectedOptionId === opt.id;
                  let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
                  if (quizSubmitted) {
                    if (opt.isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100';
                    else if (isSelected && !opt.isCorrect) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-100';
                    else btnStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                  } else if (isSelected) {
                    btnStyle = 'bg-slate-800 border-teal-500 text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !quizSubmitted && setQuizSelectedOptionId(opt.id)}
                      disabled={quizSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {quizSubmitted && (opt.isCorrect || isSelected) && (
                        <span className={`block mt-1.5 text-[11px] ${opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {opt.explanation}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-100">Level Cleared!</h3>
              <p className="text-xs text-slate-400">You earned +{node.xpReward} XP.</p>
              <button
                onClick={() => onComplete(node.id, node.xpReward)}
                className="w-full py-3 bg-teal-500 text-slate-950 font-bold rounded-xl text-sm"
              >
                Continue
              </button>
            </div>
          )}
        </div>

        {!quizFinished && currentQ && (
          <div className="px-5 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
            {!quizSubmitted ? (
              <button
                onClick={() => quizSelectedOptionId && setQuizSubmitted(true)}
                disabled={!quizSelectedOptionId}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={() => {
                  if (quizIdx + 1 < questions.length) {
                    setQuizIdx(prev => prev + 1);
                    setQuizSelectedOptionId(null);
                    setQuizSubmitted(false);
                  } else {
                    setQuizFinished(true);
                  }
                }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
