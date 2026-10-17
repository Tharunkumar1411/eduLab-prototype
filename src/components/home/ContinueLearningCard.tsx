import React from 'react';
import { ArrowRight, Flame, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import { PathNode } from '../../data/learningPath.ts';
import { LearningModuleId, MODULE_DEFINITIONS } from '../../data/learningModules.ts';

interface ContinueLearningCardProps {
  isNewUser: boolean;
  currentNode: PathNode;
  progressPercent: number;
  streakDays: number;
  userLevel: number;
  userXp: number;
  activeModuleId?: LearningModuleId;
  isSimulatingNewUser?: boolean;
  onToggleUserMode?: () => void;
  onStartOrContinue: (node: PathNode) => void;
  onStartModule01?: () => void;
  onGoToPlayground?: () => void;
  onOpenLeaderboard?: () => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  isNewUser,
  currentNode,
  streakDays,
  userLevel,
  userXp,
  activeModuleId = 'stocks',
  isSimulatingNewUser,
  onToggleUserMode,
  onStartOrContinue,
  onStartModule01,
  onGoToPlayground,
  onOpenLeaderboard,
}) => {
  const currentModuleId: LearningModuleId = activeModuleId || 'stocks';
  const moduleDef = MODULE_DEFINITIONS[currentModuleId] || MODULE_DEFINITIONS.stocks;

  // First course details of the selected module
  const getCourseDetails = () => {
    switch (currentModuleId) {
      case 'mutual-funds':
        return {
          courseTitle: 'Course 1: Mutual Fund Basics & Pooling',
          buttonLabel: isNewUser ? 'Start Module' : 'Continue Module',
        };
      case 'bonds':
        return {
          courseTitle: 'Course 1: Bond Basics & Fixed Income',
          buttonLabel: isNewUser ? 'Start Module' : 'Continue Module',
        };
      case 'fno':
        return {
          courseTitle: 'Course 1: Derivatives Intuition & Contracts',
          buttonLabel: isNewUser ? 'Start Module' : 'Continue Module',
        };
      case 'stocks':
      default:
        return {
          courseTitle: isNewUser
            ? 'Course 1: What Is a Market?'
            : `Course 1: ${currentNode?.title || 'What is a Share?'}`,
          buttonLabel: isNewUser ? 'Start Module 01' : 'Continue Module',
        };
    }
  };

  const { courseTitle, buttonLabel } = getCourseDetails();

  const handleCtaClick = () => {
    if (currentModuleId === 'mutual-funds') {
      if (onGoToPlayground) {
        onGoToPlayground();
      } else {
        onStartOrContinue(currentNode);
      }
    } else if (isNewUser && onStartModule01) {
      onStartModule01();
    } else {
      onStartOrContinue(currentNode);
    }
  };

  // Render user streak and level badges strip
  const renderLearnerMetrics = () => (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-amber-600 dark:text-amber-400 font-semibold shadow-xs">
        <Flame className="w-3.5 h-3.5 fill-amber-500/20 text-amber-500" />
        <span className="font-mono-num">{streakDays}d streak</span>
      </div>

      {onOpenLeaderboard ? (
        <button
          onClick={onOpenLeaderboard}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-950/80 hover:bg-teal-50 dark:hover:bg-teal-950/50 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 text-xs text-teal-700 dark:text-teal-300 font-semibold shadow-xs transition-colors cursor-pointer group"
          title="View Global Leaderboard"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
          <span className="font-mono-num">{userXp.toLocaleString()} XP</span>
          <span className="text-[10px] text-teal-600/80 dark:text-teal-400/80 font-normal underline">Rank</span>
        </button>
      ) : (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-teal-700 dark:text-teal-300 font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="font-mono-num">{userXp.toLocaleString()} XP</span>
        </div>
      )}

      <div className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-semibold shadow-xs">
        <span>Lvl {userLevel}</span>
      </div>

      {onToggleUserMode && (
        <button
          onClick={onToggleUserMode}
          className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-950/50 hover:bg-slate-200 dark:hover:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700/80 text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          title="Switch view preview"
        >
          {isSimulatingNewUser ? (
            <>
              <ToggleLeft className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>New</span>
            </>
          ) : (
            <>
              <ToggleRight className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Returning</span>
            </>
          )}
        </button>
      )}
    </div>
  );

  return (
    <section aria-labelledby="learning-heading" className="w-full">
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
        {/* Top Header Row: Section Tag & Learner Streak / Level metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span id="learning-heading">{isNewUser ? 'Start Learning' : 'Continue Learning'}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-slate-600 dark:text-slate-300 font-semibold normal-case">
              {moduleDef.title}
            </span>
          </div>

          {renderLearnerMetrics()}
        </div>

        {/* Content: First Course of Selected Module & Start Module CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {courseTitle}
            </h2>
          </div>

          <div className="shrink-0 flex items-center">
            <button
              onClick={handleCtaClick}
              className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-teal-600/25 cursor-pointer active:scale-98"
            >
              <span>{buttonLabel}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
