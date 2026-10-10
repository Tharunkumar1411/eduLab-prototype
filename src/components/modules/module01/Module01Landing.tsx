import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { MODULE_01_OVERVIEW, MODULE_01_STAGES, StageInfo } from '../../../data/modules/module01Data.ts';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';

interface Module01LandingProps {
  completedStages: number[];
  onStartStage: (stageId: number) => void;
  onBack: () => void;
  userXp: number;
}

export const Module01Landing: React.FC<Module01LandingProps> = ({
  completedStages,
  onStartStage,
  onBack,
  userXp,
}) => {
  // Determine next unlocked stage (first stage not completed)
  const nextStageId =
    MODULE_01_STAGES.find((s) => !completedStages.includes(s.id))?.id || 1;
  const isModuleFullyCompleted = completedStages.length === MODULE_01_STAGES.length;

  const progressPercent = Math.round(
    (completedStages.length / MODULE_01_STAGES.length) * 100
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-teal-300 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono-num">{userXp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <section aria-labelledby="module-01-hero" className="w-full">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/30 p-6 sm:p-8 shadow-xl overflow-hidden space-y-6">
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              {/* Badge */}
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-500/15 border border-teal-500/30">
                  {MODULE_01_OVERVIEW.number}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 normal-case font-medium">Beginner Fundamentals</span>
              </div>

              <h1 id="module-01-hero" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
                {MODULE_01_OVERVIEW.title}
              </h1>

              <p className="text-base sm:text-lg text-teal-200/90 font-medium italic">
                "{MODULE_01_OVERVIEW.hook}"
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {MODULE_01_OVERVIEW.description}
              </p>

              {/* Badges strip */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium flex-wrap pt-2">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>~{MODULE_01_OVERVIEW.totalMinutes} min total</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono-num">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{MODULE_01_OVERVIEW.totalXp} XP Available</span>
                </span>
                <span className="text-slate-600">·</span>
                <span>5 Interactive Games</span>
              </div>
            </div>

            {/* Character & Quick Start CTA */}
            <div className="shrink-0 flex flex-col items-center gap-4 bg-slate-950/60 border border-slate-800 p-5 rounded-2xl md:min-w-[220px]">
              <CharacterMentor
                state={isModuleFullyCompleted ? 'celebrating' : 'talking'}
                size="md"
              />
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Progress</span>
                  <span className="font-mono-num text-teal-300">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => onStartStage(nextStageId)}
                className="w-full min-h-[46px] px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-98 text-slate-950 font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <span>
                  {isModuleFullyCompleted
                    ? 'Replay Module'
                    : completedStages.length > 0
                    ? `Continue Stage ${nextStageId}`
                    : 'Start Module 01'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Marketplace Illustration Card */}
      <section className="w-full">
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 p-5 sm:p-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="text-5xl sm:text-6xl p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 shrink-0">
              🛒🥭
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                The Learning Promise
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                From a Backyard Mango Tree to the Stock Exchange
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You will experience five short hands-on games. No pre-memorized definitions or robotic quizzes. Just small choices, real consequences, and friendly discoveries that stick with you for life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Five Mini-Game Stages */}
      <section aria-labelledby="stages-heading" className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="stages-heading" className="text-lg font-bold text-slate-100 tracking-tight">
              5 Connected Mini-Games
            </h2>
            <p className="text-xs text-slate-400">
              Play through each stage in sequence to unlock the next concept.
            </p>
          </div>
          <span className="text-xs font-bold font-mono-num text-teal-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
            {completedStages.length} / 5 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {MODULE_01_STAGES.map((stage, idx) => {
            const isCompleted = completedStages.includes(stage.id);
            // Stage is unlocked if it's stage 1 or previous stage is completed
            const isUnlocked = stage.id === 1 || completedStages.includes(stage.id - 1);
            const isCurrent = stage.id === nextStageId && !isCompleted;

            return (
              <div
                key={stage.id}
                className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden min-h-[175px] ${
                  isCurrent
                    ? 'bg-slate-900 border-teal-500/80 shadow-lg shadow-teal-950/30 ring-1 ring-teal-500/30'
                    : isCompleted
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                    : isUnlocked
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/40 border-slate-850 opacity-60'
                }`}
              >
                {/* Header row */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{stage.icon}</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Stage 0{stage.id}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[11px] font-bold text-teal-300 bg-teal-950/50 border border-teal-500/30 px-2 py-0.5 rounded-lg">
                        Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-lg">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-100">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stage.tagline}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>⏱️ {stage.estimatedMinutes}m</span>
                    <span>·</span>
                    <span className="text-amber-400 font-semibold font-mono-num">
                      +{stage.xpReward} XP
                    </span>
                  </div>

                  <button
                    disabled={!isUnlocked}
                    onClick={() => onStartStage(stage.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-sm shadow-teal-500/20'
                        : isCompleted
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : isUnlocked
                        ? 'bg-slate-800 hover:bg-slate-700 text-teal-300'
                        : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>{isCompleted ? 'Replay' : isCurrent ? 'Play Now' : 'Start'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
