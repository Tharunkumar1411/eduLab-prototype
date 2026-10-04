import React from 'react';
import { ArrowRight, BookOpen, Flame, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import { PathNode } from '../../data/learningPath.ts';

interface ContinueLearningCardProps {
  isNewUser: boolean;
  currentNode: PathNode;
  progressPercent: number;
  streakDays: number;
  userLevel: number;
  userXp: number;
  isSimulatingNewUser?: boolean;
  onToggleUserMode?: () => void;
  onStartOrContinue: (node: PathNode) => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  isNewUser,
  currentNode,
  progressPercent,
  streakDays,
  userLevel,
  userXp,
  isSimulatingNewUser,
  onToggleUserMode,
  onStartOrContinue,
}) => {
  // Render user streak and level badges strip
  const renderLearnerMetrics = () => (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-amber-400 font-semibold shadow-xs">
        <Flame className="w-3.5 h-3.5 fill-amber-500/20 text-amber-500" />
        <span className="font-mono-num">{streakDays}d streak</span>
      </div>

      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-teal-300 font-semibold shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
        <span className="font-mono-num">{userXp.toLocaleString()} XP</span>
      </div>

      <div className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-semibold shadow-xs">
        <span>Lvl {userLevel}</span>
      </div>

      {onToggleUserMode && (
        <button
          onClick={onToggleUserMode}
          className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-dashed border-slate-700/80 text-[10px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Switch view preview"
        >
          {isSimulatingNewUser ? (
            <>
              <ToggleLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>New</span>
            </>
          ) : (
            <>
              <ToggleRight className="w-3.5 h-3.5 text-teal-400" />
              <span>Returning</span>
            </>
          )}
        </button>
      )}
    </div>
  );

  // New User State: "Start Learning"
  if (isNewUser) {
    return (
      <section aria-labelledby="start-learning-heading" className="w-full">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden space-y-4">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Section Tag & Learner Streak / Level metrics */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-slate-800/80 pb-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span id="start-learning-heading">Start Learning</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal normal-case">Recommended First Step</span>
            </div>

            {renderLearnerMetrics()}
          </div>

          {/* Lesson Content & CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10 pt-1">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
                What is a Stock?
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Learn how purchasing a share makes you a legal fractional owner of a real business, not a casino gambler.
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1 font-medium">
                <span>⏱️ 3 min interactive</span>
                <span className="text-slate-600">·</span>
                <span className="text-teal-400 font-semibold">⭐ +150 XP</span>
                <span className="text-slate-600">·</span>
                <span>Zero jargon</span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onStartOrContinue(currentNode)}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-98 text-slate-950 font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <span>Start</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Returning User State: "Continue Learning"
  return (
    <section aria-labelledby="continue-learning-heading" className="w-full">
      <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-md transition-all space-y-4">
        {/* Top Row: Section Tag & Learner Streak / Level metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span id="continue-learning-heading">Continue Learning</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 font-normal normal-case">{currentNode.levelBadge || 'Level Up'}</span>
          </div>

          {renderLearnerMetrics()}
        </div>

        {/* Lesson Content & Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2.5 flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight truncate">
              {currentNode.title}
            </h2>

            <p className="text-sm text-slate-300 line-clamp-2">
              {currentNode.subtitle || 'Master the essential mental model and put it into practice.'}
            </p>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1 max-w-md">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Unit Progress</span>
                <span className="tabular-nums font-semibold text-slate-200">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <button
              onClick={() => onStartOrContinue(currentNode)}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-98 text-slate-950 font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
