import React, { useState } from 'react';
import {
  LearningModuleId,
  MODULE_DEFINITIONS,
  ModuleProgress,
  getModuleStats,
} from '../../data/learningModules.ts';
import { LEARNING_UNITS, PathNode } from '../../data/learningPath.ts';
import { PLAYGROUND_CASES, PlaygroundCase } from '../../data/cases.ts';
import {
  TrendingUp,
  PieChart,
  Landmark,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  Play,
  Award,
  BookOpen,
  AlertTriangle,
  Bell,
  Check,
  RotateCcw,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { MutualFundsHub } from './mutualFunds/MutualFundsHub.tsx';

interface ModuleLandingPageProps {
  moduleId: LearningModuleId;
  progress: ModuleProgress;
  onBackToCatalog: () => void;
  onStartOrResumeLesson: (node: PathNode) => void;
  onOpenGamePath: () => void;
  onStartModule01: () => void;
  onInvestigateCase: (caseItem: PlaygroundCase) => void;
  onSwitchModule: (newModuleId: LearningModuleId) => void;
  onCompleteMutualFundsLevel?: (levelId: string, xpEarned: number) => void;
  userXp?: number;
}

export const ModuleLandingPage: React.FC<ModuleLandingPageProps> = ({
  moduleId,
  progress,
  onBackToCatalog,
  onStartOrResumeLesson,
  onOpenGamePath,
  onStartModule01,
  onInvestigateCase,
  onSwitchModule,
  onCompleteMutualFundsLevel,
  userXp,
}) => {
  // Delegate directly to dedicated MutualFundsHub when Mutual Funds is active
  if (moduleId === 'mutual-funds') {
    return (
      <MutualFundsHub
        userXp={userXp ?? progress.earnedXp}
        progress={progress}
        onCompleteLevel={onCompleteMutualFundsLevel || (() => {})}
        onBackToCatalog={onBackToCatalog}
      />
    );
  }

  const def = MODULE_DEFINITIONS[moduleId];
  const stats = getModuleStats(moduleId, progress);
  const isStocks = moduleId === 'stocks';

  // Interactive "Notify Me" state for planned modules
  const [hasNotified, setHasNotified] = useState(false);

  // For Stocks: resolve next recommended node and units
  const allStockNodes = LEARNING_UNITS.flatMap((u) => u.nodes);
  const nextUncompletedNode =
    allStockNodes.find((n) => !progress.completedActivityIds.includes(n.id)) ||
    allStockNodes[0];

  const getModuleIcon = (iconName: string, className: string = 'w-6 h-6') => {
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
        return <BookOpen className={className} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-24 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Quick Back Link */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToCatalog}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>All Modules</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500">Module:</span>
          <span className={def.accentColor.text}>{def.title}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border bg-gradient-to-br ${def.accentColor.bg} ${def.accentColor.border} relative overflow-hidden shadow-2xl`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 ${def.accentColor.text}`}>
                {getModuleIcon(def.iconName, 'w-6 h-6')}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${def.accentColor.badge}`}>
                {isStocks ? 'Active Module · 4 Units' : 'Curriculum in Development'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
              {def.title}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-teal-300/90">
              {def.tagline}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {def.description}
            </p>
          </div>

          {/* Module Progress Card or Availability Status */}
          <div className="shrink-0 w-full md:w-72 p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Module Progress</span>
              <span className={`font-black ${isStocks ? 'text-emerald-400' : 'text-slate-400'}`}>
                {stats.percent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(stats.percent, 3)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-slate-800/80">
              <div className="p-2 rounded-xl bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">XP Earned</span>
                <span className="text-sm font-black text-amber-400 font-mono-num">{stats.earnedXp} XP</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Done</span>
                <span className="text-sm font-black text-slate-200 font-mono-num">
                  {stats.completedActivities}/{stats.totalActivities}
                </span>
              </div>
            </div>

            {isStocks && (
              <button
                type="button"
                onClick={() => onStartOrResumeLesson(nextUncompletedNode)}
                className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>
                  {progress.completedActivityIds.length > 0 ? 'Continue Next Lesson' : 'Start Lesson 1'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* STOCKS MODULE CONTENT (ACTIVE) */}
      {/* ======================================================== */}
      {isStocks ? (
        <div className="space-y-8">
          {/* Quick Access Portals: Next Lesson + Beginner Quest + Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Next Recommended Activity */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-teal-500/40 space-y-3 flex flex-col justify-between shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Next Recommended Lesson</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-100">
                  {nextUncompletedNode.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {nextUncompletedNode.subtitle}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">
                  +{nextUncompletedNode.xpReward} XP
                </span>
                <button
                  onClick={() => onStartOrResumeLesson(nextUncompletedNode)}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Learn Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Interactive Serpentine Game Path */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Duolingo-Style Path</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-100">
                  Visual Learning Journey
                </h3>
                <p className="text-xs text-slate-400">
                  Winding serpentine roadmap with 3D tactile nodes, treasure chests, and case milestones.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">All 4 Units</span>
                <button
                  onClick={onOpenGamePath}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Path</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Beginner Quest: Module 01 */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  <span>🥭 Mini-Games</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-100">
                  What Is a Market?
                </h3>
                <p className="text-xs text-slate-400">
                  Five interactive story games: The Marketplace, Find a Buyer, Price Discovery, and Make the Trade.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold">+250 XP</span>
                <button
                  onClick={onStartModule01}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Play Quest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Curriculum Breakdown: 4 Units of Stocks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                  Stocks Curriculum Levels
                </h2>
                <p className="text-xs text-slate-400">
                  Progressive mental models designed to take beginners from zero to forensic analysis.
                </p>
              </div>
              <button
                onClick={onOpenGamePath}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LEARNING_UNITS.map((unit) => {
                const totalUnitNodes = unit.nodes.length;
                const completedInUnit = unit.nodes.filter((n) =>
                  progress.completedActivityIds.includes(n.id)
                ).length;
                const isUnitComplete = completedInUnit === totalUnitNodes && totalUnitNodes > 0;
                const isUnitStarted = completedInUnit > 0;

                return (
                  <div
                    key={unit.id}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                          Unit {unit.unitNumber}
                        </span>
                        <h3 className="text-base font-bold text-slate-100 mt-0.5">
                          {unit.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {unit.description}
                        </p>
                      </div>

                      {isUnitComplete ? (
                        <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      ) : isUnitStarted ? (
                        <span className="text-xs font-bold text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2.5 py-1 rounded-xl shrink-0">
                          {completedInUnit}/{totalUnitNodes}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
                          {totalUnitNodes} lessons
                        </span>
                      )}
                    </div>

                    {/* Node List inside this Unit */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      {unit.nodes.map((node) => {
                        const isNodeDone = progress.completedActivityIds.includes(node.id);
                        return (
                          <div
                            key={node.id}
                            onClick={() => onStartOrResumeLesson(node)}
                            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors cursor-pointer ${
                              isNodeDone
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300 hover:border-emerald-500/60'
                                : 'bg-slate-950/70 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isNodeDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                              )}
                              <span className="font-semibold truncate">{node.title}</span>
                            </div>

                            <span className="text-[11px] font-bold text-amber-400 shrink-0 ml-2">
                              +{node.xpReward} XP
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Forensic Investigations Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              Forensic Investigations & Clue Boards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PLAYGROUND_CASES.slice(0, 2).map((c) => (
                <div
                  key={c.id}
                  onClick={() => onInvestigateCase(c)}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2 py-0.5 rounded-lg">
                      {c.companyName} ({c.ticker})
                    </span>
                    <span className="text-xs font-bold text-amber-400">+{c.xpReward} XP</span>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {c.hook}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                    <span>{c.clues.length} Forensic Clues</span>
                    <span className="text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Examine Case</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* PLANNED MODULES (MUTUAL FUNDS, BONDS, F&O) */
        /* ======================================================== */
        <div className="space-y-8">
          {/* SEBI Investor Notice for F&O if applicable */}
          {def.riskNotice && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-300 block">Strict Risk Education Priority</span>
                <p className="leading-relaxed opacity-90">{def.riskNotice}</p>
              </div>
            </div>
          )}

          {/* What You Will Learn in This Module */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              What You Will Discover in {def.shortTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {def.keyTakeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                >
                  <span className="w-5 h-5 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Roadmap (Honestly Communicated) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                  Curriculum Roadmap
                </h2>
                <p className="text-xs text-slate-400">
                  Four structured levels in active content development. No fake quizzes or fabricated progress.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                Phase 2 Deployment
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {def.roadmap.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3 opacity-90"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                      Level {item.levelNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>~{item.estimatedMinutes} mins</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-teal-400/80 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Topics Covered
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.topics.map((topic, tidx) => (
                        <span
                          key={tidx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Notifications & Cross-Module Action */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-100">
                Want to learn {def.shortTitle} first?
              </h3>
              <p className="text-xs text-slate-400 max-w-lg">
                We are crafting hands-on decision games and math simulators for this module.
                In the meantime, build your foundational business mental models in Stocks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setHasNotified(true)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  hasNotified
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                }`}
              >
                {hasNotified ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Notification Saved!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5" />
                    <span>Notify When Live</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onSwitchModule('stocks')}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <span>Switch to Stocks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
