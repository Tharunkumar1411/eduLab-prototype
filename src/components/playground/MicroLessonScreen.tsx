/**
 * Playground Micro-Lesson Screen for Stock Market Foundations.
 * 
 * Replaces the modal popup with a dedicated, responsive full-screen learning interface.
 * Removes conversational mentor speech bubbles so learners dive straight into
 * high-signal mental models, visual breakdowns, interactive decisions, and reflection.
 */

import React, { useState } from 'react';
import { MicroQuestion, PathNode } from '../../data/learningPath.ts';
import { GUIDED_LESSONS, GuidedLessonStage } from '../../data/guidedCurriculum.ts';
import {
  ArrowLeft,
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
  XCircle,
  Zap,
} from 'lucide-react';

export interface MicroLessonScreenProps {
  node: PathNode;
  onBack?: () => void;
  onClose?: () => void;
  onComplete: (nodeId: string, xpEarned: number) => void;
}

type StageType = 'learn' | 'see' | 'try' | 'decide' | 'reflect';

export const MicroLessonScreen: React.FC<MicroLessonScreenProps> = ({
  node,
  onBack,
  onClose,
  onComplete,
}) => {
  const handleExit = onBack || onClose || (() => {});
  const guidedLesson: GuidedLessonStage | undefined = GUIDED_LESSONS[node.id];

  // 5 Stages state
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

  // Stages array for navigation
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
  // RENDER GUIDED 5-STAGE SCREEN
  // ==========================================
  if (guidedLesson) {
    const selectedCard = guidedLesson.try.cards.find(c => c.id === trySelectedCardId);

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300 select-none">
        {/* Top Screen Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={handleExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Path</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="text-xs font-bold text-slate-300">
              <span className="text-teal-400">Level {guidedLesson.levelNumber}</span>
              <span className="text-slate-600 mx-1.5">·</span>
              <span className="text-slate-100">{guidedLesson.title}</span>
            </div>
          </div>

          {/* Duolingo-style Stages Breadcrumb Bar */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            {stages.map((stg, idx) => {
              const IconComponent = stg.icon;
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <button
                  key={stg.key}
                  onClick={() => {
                    // Allow navigating back to completed stages
                    if (isPassed || isCurrent) {
                      setCurrentStage(stg.key);
                    }
                  }}
                  disabled={!isPassed && !isCurrent}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-teal-500/20 border border-teal-500/60 text-teal-300 shadow-xs ring-1 ring-teal-500/30'
                      : isPassed
                      ? 'bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/50 cursor-pointer'
                      : 'text-slate-600 border border-transparent cursor-not-allowed'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isCurrent ? 'text-teal-400 animate-pulse' : ''}`} />
                  <span className="hidden sm:inline">{stg.label}</span>
                </button>
              );
            })}
          </div>

          {/* XP Reward Counter */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono-num bg-amber-950/60 border border-amber-800/40 px-3 py-1.5 rounded-xl self-end sm:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{guidedLesson.xpReward} XP</span>
          </div>
        </div>

        {/* Continuous Progress Bar */}
        <div className="w-full bg-slate-800/60 h-2 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Screen Content Container */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          {/* ============================================================ */}
          {/* STAGE 1: LEARN (Direct Core Mental Model & Thinking Pillars)  */}
          {/* ============================================================ */}
          {currentStage === 'learn' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Core Concept Spotlight Card */}
              <div className="p-6 sm:p-7 bg-gradient-to-br from-teal-950/50 via-slate-900 to-slate-950 border border-teal-500/40 rounded-2xl space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-teal-400" />
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Core Mental Model · Stage 1 of 5
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                    ~{guidedLesson.estimatedMinutes} min
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                  {guidedLesson.learn.conceptTitle}
                </h2>

                <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl">
                  <p className="text-sm sm:text-base font-semibold text-teal-200 leading-relaxed">
                    💡 {guidedLesson.learn.conceptHighlight}
                  </p>
                </div>
              </div>

              {/* Mental Model Pillars */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  How an Astute Investor Thinks
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {guidedLesson.learn.mentalModel.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed hover:border-slate-700 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="pt-0.5">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investor Question Prompt */}
              <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl flex items-center gap-3 text-xs sm:text-sm text-amber-200">
                <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong className="font-bold text-amber-300">The Key Investor Question:</strong>{' '}
                  {guidedLesson.learn.investorQuestion}
                </span>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStage('see')}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <span>Continue to See It in Action</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STAGE 2: SEE (Visual Example & Real Numbers)                 */}
          {/* ============================================================ */}
          {currentStage === 'see' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                  <Eye className="w-4 h-4" />
                  <span>Visual Breakdown · Stage 2 of 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                  {guidedLesson.see.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Notice how the numbers behave when we look underneath the surface.
                </p>
              </div>

              {/* Visual Type: Comparison Cards */}
              {guidedLesson.see.visualType === 'cards-comparison' && guidedLesson.see.companyA && guidedLesson.see.companyB && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company A Card */}
                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3.5 relative overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-sm font-bold text-slate-200">
                        {guidedLesson.see.companyA.name}
                      </span>
                      {guidedLesson.see.companyA.tag && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {guidedLesson.see.companyA.tag}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {guidedLesson.see.companyA.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm ${
                            m.highlight
                              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200 font-semibold'
                              : 'bg-slate-900/90 text-slate-300'
                          }`}
                        >
                          <span className="text-slate-400">{m.label}</span>
                          <span className="font-mono-num font-bold text-slate-100">{m.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 italic pt-1.5 border-t border-slate-850">
                      {guidedLesson.see.companyA.summary}
                    </p>
                  </div>

                  {/* Company B Card */}
                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3.5 relative overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-sm font-bold text-slate-200">
                        {guidedLesson.see.companyB.name}
                      </span>
                      {guidedLesson.see.companyB.tag && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-800">
                          {guidedLesson.see.companyB.tag}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {guidedLesson.see.companyB.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm ${
                            m.highlight
                              ? 'bg-teal-500/10 border border-teal-500/30 text-teal-200 font-semibold'
                              : 'bg-slate-900/90 text-slate-300'
                          }`}
                        >
                          <span className="text-slate-400">{m.label}</span>
                          <span className="font-mono-num font-bold text-slate-100">{m.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 italic pt-1.5 border-t border-slate-850">
                      {guidedLesson.see.companyB.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* Visual Type: Waterfall */}
              {guidedLesson.see.visualType === 'waterfall' && guidedLesson.see.waterfallSteps && (
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5">
                  {guidedLesson.see.waterfallSteps.map((step, sIdx) => {
                    const isProfit = step.type === 'profit';
                    const isExpense = step.type === 'expense';
                    return (
                      <div
                        key={sIdx}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                          isProfit
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-bold'
                            : isExpense
                            ? 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-200 font-medium'
                        }`}
                      >
                        <div>
                          <span className="block font-semibold">{step.label}</span>
                          <span className="text-[11px] text-slate-400 block">{step.note}</span>
                        </div>
                        <span className="font-mono-num text-sm sm:text-base font-bold">{step.amount}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Key Observation Banner */}
              <div className="p-4 bg-teal-950/40 border border-teal-800/50 rounded-xl flex items-center gap-3 text-xs sm:text-sm text-teal-200">
                <Sparkles className="w-5 h-5 text-teal-400 shrink-0" />
                <span>
                  <strong className="text-teal-300 font-bold">Key Observation:</strong>{' '}
                  {guidedLesson.see.keyObservation}
                </span>
              </div>

              {/* Bottom Navigation */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStage('learn')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  ← Back to Learn
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStage('try')}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <span>Continue to Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STAGE 3: TRY (Interactive Hands-On Mini-Game)                */}
          {/* ============================================================ */}
          {currentStage === 'try' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Hands-On Challenge · Stage 3 of 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                  {guidedLesson.try.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {guidedLesson.try.prompt}
                </p>
              </div>

              {/* Interactive Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {guidedLesson.try.cards.map((card) => {
                  const isSelected = trySelectedCardId === card.id;
                  let cardStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (trySubmitted) {
                    if (card.isCorrect) {
                      cardStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
                    } else if (isSelected && !card.isCorrect) {
                      cardStyle = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/50';
                    } else {
                      cardStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-slate-800 border-teal-500 text-white ring-2 ring-teal-500/50';
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
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[140px] select-none cursor-pointer ${cardStyle}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold font-mono-num text-teal-400">
                            Option {card.id.toUpperCase()}
                          </span>
                          {trySubmitted && card.isCorrect && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                              <Check className="w-3 h-3 stroke-[3]" /> Correct
                            </span>
                          )}
                          {trySubmitted && isSelected && !card.isCorrect && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded-full border border-rose-800">
                              <XCircle className="w-3 h-3" /> Incorrect
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h3 className="text-sm sm:text-base font-bold leading-snug">
                            {card.name}
                          </h3>
                          {card.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {card.badge}
                            </span>
                          )}
                        </div>
                        {card.details && card.details.length > 0 && (
                          <div className="space-y-1 mt-2">
                            {card.details.map((d, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/60 px-2 py-1 rounded"
                              >
                                <span className="text-slate-400">{d.label}</span>
                                <span className="font-mono-num font-semibold text-slate-200">
                                  {d.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {trySubmitted && (isSelected || card.isCorrect) && (
                        <div
                          className={`mt-3 p-2.5 rounded-xl text-xs font-medium border leading-relaxed ${
                            card.isCorrect
                              ? 'bg-emerald-950/90 border-emerald-700/60 text-emerald-200'
                              : 'bg-rose-950/90 border-rose-700/60 text-rose-200'
                          }`}
                        >
                          {card.feedback}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStage('see')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  ← Back to See
                </button>

                {!trySubmitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (trySelectedCardId) setTrySubmitted(true);
                    }}
                    disabled={!trySelectedCardId}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
                  >
                    <span>Check My Answer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentStage('decide')}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
                  >
                    <span>Continue to Decision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STAGE 4: DECIDE (Investigative Nuance & Dilemma)              */}
          {/* ============================================================ */}
          {currentStage === 'decide' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Investigative Dilemma · Stage 4 of 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                  {guidedLesson.decide.question}
                </h2>
              </div>

              {/* Scenario Context Card */}
              {guidedLesson.decide.scenarioCard && (
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm font-bold text-slate-200">
                      {guidedLesson.decide.scenarioCard.company}
                    </span>
                    <span className="text-xs text-teal-400 font-semibold bg-teal-950/60 border border-teal-800/40 px-2 py-0.5 rounded-lg">
                      Market Context
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {guidedLesson.decide.scenarioCard.stats.map((st, sIdx) => (
                      <div key={sIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block truncate">{st.label}</span>
                        <span className="text-xs sm:text-sm font-bold font-mono-num text-amber-300 mt-0.5 block">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    {guidedLesson.decide.scenarioCard.contextNote}
                  </p>
                </div>
              )}

              {/* Nuance Options */}
              <div className="space-y-3">
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
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 select-none cursor-pointer ${style}`}
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
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : isSelected ? (
                          <div className="w-2 h-2 rounded-full bg-slate-950" />
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <span className="leading-relaxed block text-sm sm:text-base font-semibold">
                          {opt.text}
                        </span>
                        {decideSubmitted && (opt.isBest || isSelected) && (
                          <span
                            className={`block mt-2.5 text-xs leading-relaxed p-2.5 rounded-xl border ${
                              opt.isBest
                                ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-200'
                                : 'bg-rose-950/60 border-rose-700/50 text-rose-200'
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

              {decideSubmitted && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl text-xs sm:text-sm text-amber-200 leading-relaxed">
                  💡 <strong className="text-amber-300 font-bold">Golden Takeaway:</strong> {guidedLesson.decide.goldenTakeaway}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStage('try')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  ← Back to Challenge
                </button>

                {!decideSubmitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (decideSelectedOptionId) setDecideSubmitted(true);
                    }}
                    disabled={!decideSelectedOptionId}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
                  >
                    <span>Submit Decision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentStage('reflect')}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
                  >
                    <span>View Takeaway & Claim XP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STAGE 5: REFLECT & APPLY (Golden Rule + Mastery + XP)         */}
          {/* ============================================================ */}
          {currentStage === 'reflect' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center py-4 space-y-2">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/50 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <Trophy className="w-10 h-10 text-emerald-400" />
                </div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-teal-400 block pt-2">
                  Concept Mastered · Level {guidedLesson.levelNumber}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
                  {guidedLesson.title}
                </h2>
              </div>

              {/* Golden Rule of Investing Card */}
              <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl space-y-3 relative overflow-hidden shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Golden Rule #{guidedLesson.reflect.goldenRuleNumber}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-amber-200">
                  "{guidedLesson.reflect.ruleQuote}"
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {guidedLesson.reflect.investorMindsetTakeaway}
                </p>
              </div>

              {/* Key Takeaways Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Detective Memory Anchors
                </span>
                <div className="space-y-2.5">
                  {guidedLesson.reflect.checklistItems.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Claim XP Action */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleFinishGuidedLesson}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black rounded-2xl text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 cursor-pointer"
                >
                  <span>Claim +{guidedLesson.xpReward} XP & Continue Path</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // FALLBACK QUIZ SCREEN (NO GUIDED LESSON)
  // ==========================================
  const currentQ = questions[quizIdx];
  const selectedOption = currentQ?.options.find(o => o.id === quizSelectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <button
          onClick={handleExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Path</span>
        </button>
        <div className="flex-1 max-w-xs bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700 mx-4">
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

      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        {!quizFinished && currentQ ? (
          <>
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Question {quizIdx + 1} of {questions.length} · {node.title}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3">
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
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-semibold block">{opt.text}</span>
                    {quizSubmitted && (opt.isCorrect || isSelected) && (
                      <span className={`block mt-2 text-xs ${opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                        {opt.explanation}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-3">
              {!quizSubmitted ? (
                <button
                  onClick={() => quizSelectedOptionId && setQuizSubmitted(true)}
                  disabled={!quizSelectedOptionId}
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm cursor-pointer shadow-md shadow-teal-500/20"
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
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-100">Level Cleared!</h2>
            <p className="text-sm text-slate-400">You earned +{node.xpReward} XP.</p>
            <button
              onClick={() => onComplete(node.id, node.xpReward)}
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              Claim XP & Return to Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
