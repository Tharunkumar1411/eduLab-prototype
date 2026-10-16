import React from 'react';
import {
  LearningModuleId,
  MODULE_DEFINITIONS,
  ModuleProgress,
  getModuleStats,
} from '../../data/learningModules.ts';
import {
  User,
  Flame,
  Sparkles,
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Award,
  BookOpen,
  PieChart,
  TrendingUp,
  Landmark,
  Zap,
  Search,
} from 'lucide-react';

interface ProfileViewProps {
  userXp: number;
  userLevel: number;
  streakDays: number;
  completedNodeIds: string[];
  completedCaseIds: string[];
  modulesProgress: Record<LearningModuleId, ModuleProgress>;
  activeModuleId?: LearningModuleId;
  onSelectModule: (moduleId: LearningModuleId) => void;
  onNavigateToModule: (moduleId: LearningModuleId) => void;
  onOpenLeaderboard: () => void;
  onGoToPlayground: () => void;
  onOpenOnboarding?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userXp,
  userLevel,
  streakDays,
  completedNodeIds,
  completedCaseIds,
  modulesProgress,
  activeModuleId = 'stocks',
  onSelectModule,
  onNavigateToModule,
  onOpenLeaderboard,
  onGoToPlayground,
  onOpenOnboarding,
}) => {
  const stocksStats = getModuleStats('stocks', modulesProgress.stocks);
  const mfStats = getModuleStats('mutual-funds', modulesProgress['mutual-funds']);
  const moduleList: LearningModuleId[] = ['stocks', 'mutual-funds', 'bonds', 'fno'];

  const getLevelTitle = (lvl: number) => {
    if (lvl <= 1) return 'Novice Detective';
    if (lvl === 2) return 'Market Investigator';
    if (lvl === 3) return 'Financial Analyst';
    if (lvl === 4) return 'Senior Auditor';
    return 'Master Strategist';
  };

  const getModuleIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'PieChart':
        return <PieChart className={className} />;
      case 'Landmark':
        return <Landmark className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const nextLevelXp = userLevel * 500;
  const currentLevelBaseXp = (userLevel - 1) * 500;
  const xpInCurrentLevel = Math.max(0, userXp - currentLevelBaseXp);
  const xpToNextLevel = 500;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpToNextLevel) * 100));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Header Profile Identity Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/30 border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-lg shrink-0">
              <User className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                  FinCraft Learner
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Level {userLevel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-teal-400 font-semibold">
                {getLevelTitle(userLevel)}
              </p>
              <p className="text-xs text-slate-400">
                Active Path: <span className="text-slate-200 font-semibold">{MODULE_DEFINITIONS[activeModuleId].title}</span>
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Leaderboard</span>
            </button>

            <button
              onClick={onGoToPlayground}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md shadow-teal-500/20"
            >
              <span>Go to Playground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Level {userLevel} Progress</span>
            <span className="font-mono-num font-semibold text-slate-200">
              {xpInCurrentLevel} / {xpToNextLevel} XP ({nextLevelXp - userXp} XP to Level {userLevel + 1})
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(levelProgressPercent, 3)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODULE SELECTION SECTION (MOVED TO PROFILE AS REQUESTED) */}
      {/* ======================================================== */}
      <div className="rounded-3xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                Select Active Learning Module
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Choose your current focus module. Your Playground tab will directly load this path.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            {onOpenOnboarding && (
              <button
                type="button"
                onClick={onOpenOnboarding}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-teal-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                title="Restart Welcome & Module Selection Tour"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Onboarding Tour</span>
              </button>
            )}
            <span className="text-slate-500">Active:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {MODULE_DEFINITIONS[activeModuleId].shortTitle}
            </span>
          </div>
        </div>

        {/* The 4 Module Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {moduleList.map((modId) => {
            const def = MODULE_DEFINITIONS[modId];
            const isActive = activeModuleId === modId;
            const progress = modulesProgress[modId];
            const stats = getModuleStats(modId, progress);
            const isAvailable = modId === 'stocks' || modId === 'mutual-funds';

            return (
              <div
                key={modId}
                onClick={() => {
                  if (isAvailable) {
                    onSelectModule(modId);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all duration-150 flex flex-col justify-between gap-3 text-left ${
                  isActive
                    ? 'bg-teal-500/10 border-teal-500 ring-2 ring-teal-500/40 shadow-lg shadow-teal-950/40 cursor-default'
                    : isAvailable
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950 cursor-pointer group'
                    : 'bg-slate-950/30 border-slate-900 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${isActive ? 'text-teal-400' : isAvailable ? def.accentColor.text : 'text-slate-600'}`}>
                      {getModuleIcon(def.iconName, 'w-4 h-4')}
                    </span>

                    {isActive ? (
                      <span className="text-[10px] font-extrabold bg-teal-500 text-slate-950 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                        <span>Active</span>
                      </span>
                    ) : !isAvailable ? (
                      <span className="text-[9px] font-bold bg-slate-900 text-slate-500 px-2 py-0.5 rounded-md uppercase">
                        Soon
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold font-mono-num text-teal-400">
                        {stats.percent}%
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {def.shortTitle}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                      {def.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  {isAvailable ? (
                    <span className="text-amber-400 font-mono-num font-bold">
                      +{stats.earnedXp} XP
                    </span>
                  ) : (
                    <span className="text-slate-500">Planned</span>
                  )}

                  {isAvailable && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToModule(modId);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                        isActive
                          ? 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      }`}
                    >
                      <span>{isActive ? 'Open' : 'Select'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Stat Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-amber-500/20" />
            <span>Streak</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono-num block">
            {streakDays} Days
          </span>
          <span className="text-[11px] text-slate-500">Active learning streak</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-teal-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Total XP</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-teal-300 font-mono-num block">
            {userXp.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500">Across all modules</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Activities</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-num block">
            {completedNodeIds.length + modulesProgress['mutual-funds'].completedActivityIds.length} Done
          </span>
          <span className="text-[11px] text-slate-500">Completed lessons & cases</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-purple-400 font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Cases Solved</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-purple-400 font-mono-num block">
            {completedCaseIds.length}
          </span>
          <span className="text-[11px] text-slate-500">Forensic mysteries resolved</span>
        </div>
      </div>

      {/* Modules Detailed Progress Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <span>Curriculum Progress Overview</span>
          </h2>
          <span className="text-xs text-slate-400">Independent tracking</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stocks Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">Stocks & Equity</h3>
                    <span className="text-[11px] text-slate-400">4 Units · 13 Lessons</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 font-mono-num">
                  {stocksStats.percent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(stocksStats.percent, 3)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{stocksStats.completedActivities} of {stocksStats.totalActivities} Done</span>
                <span className="text-amber-400 font-bold font-mono-num">+{stocksStats.earnedXp} XP</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToModule('stocks')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{activeModuleId === 'stocks' ? 'Continue Path' : 'Switch to Stocks'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mutual Funds Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">Mutual Funds</h3>
                    <span className="text-[11px] text-slate-400">5 Progressive Levels</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-400 font-mono-num">
                  {mfStats.percent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(mfStats.percent, 3)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{mfStats.completedActivities} of {mfStats.totalActivities} Levels Done</span>
                <span className="text-amber-400 font-bold font-mono-num">+{mfStats.earnedXp} XP</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToModule('mutual-funds')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{activeModuleId === 'mutual-funds' ? 'Continue Path' : 'Switch to Mutual Funds'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Solved Cases & Investigations Section */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-purple-400" />
          <span>Forensic Mysteries & Case Records</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          {completedCaseIds.length > 0
            ? `You have investigated and resolved ${completedCaseIds.length} financial mystery cases. Continue exploring corporate filings and red flags in the Playground.`
            : 'No mystery cases resolved yet. Explore the Cases section in Playground to investigate earnings manipulations, working capital traps, and valuation puzzles.'}
        </p>
        <button
          onClick={onGoToPlayground}
          className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Explore Forensic Cases</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
