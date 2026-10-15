import React from 'react';
import {
  MODULE_DEFINITIONS,
  LearningModuleId,
  ModuleProgress,
  getModuleStats,
} from '../../data/learningModules.ts';
import {
  TrendingUp,
  PieChart,
  Landmark,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Compass,
  Layers,
  Award,
} from 'lucide-react';

interface ModuleCatalogScreenProps {
  modulesProgress: Record<LearningModuleId, ModuleProgress>;
  onSelectModule: (moduleId: LearningModuleId) => void;
  userTotalXp: number;
}

export const ModuleCatalogScreen: React.FC<ModuleCatalogScreenProps> = ({
  modulesProgress,
  onSelectModule,
  userTotalXp,
}) => {
  const moduleList: LearningModuleId[] = ['stocks', 'mutual-funds', 'bonds', 'fno'];

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
        return <Compass className={className} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Independent Learning Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
          What do you want to learn?
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Choose any financial asset to begin. Every module has its own independent curriculum,
          interactive decisions, and isolated progress. You are never forced into a single universal path.
        </p>
      </div>

      {/* Quick Architecture Guarantee Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-slate-300 font-medium">Independent Curricula</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300 font-medium">Zero Forced Sequence</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-300 font-medium">Isolated Module Progress</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-slate-300 font-medium">Bite-Sized Discovery</span>
        </div>
      </div>

      {/* 4 Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {moduleList.map((modId) => {
          const def = MODULE_DEFINITIONS[modId];
          const progress = modulesProgress[modId];
          const stats = getModuleStats(modId, progress);
          const isModuleActive = modId === 'stocks' || modId === 'mutual-funds';

          return (
            <div
              key={modId}
              onClick={() => onSelectModule(modId)}
              className={`group relative rounded-3xl p-6 sm:p-7 border transition-all duration-200 cursor-pointer flex flex-col justify-between bg-gradient-to-b ${def.accentColor.bg} ${def.accentColor.border} hover:border-slate-600 hover:shadow-2xl hover:shadow-teal-950/20 hover:-translate-y-0.5`}
            >
              {/* Top Row: Icon & Status Badges */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 ${def.accentColor.text} shadow-md`}>
                    {getModuleIcon(def.iconName, 'w-7 h-7')}
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {isModuleActive ? (
                      stats.completedActivities > 0 ? (
                        stats.percent === 100 ? (
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                            <span>In Progress · {stats.percent}%</span>
                          </span>
                        )
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800/90 text-slate-300 border border-slate-700">
                          Active · Ready to Start
                        </span>
                      )
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800/80 text-slate-400 border border-slate-700 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>Curriculum in Development</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 group-hover:text-white transition-colors">
                    {def.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-teal-300/90 mt-1">
                    {def.tagline}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {def.description}
                </p>

                {/* Key Focus Points / Mental Models */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Core Learning Takeaways
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {def.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded-xl border border-slate-800/70 flex items-start gap-2"
                      >
                        <span className="text-teal-400 text-xs mt-0.5">•</span>
                        <span className="line-clamp-2 leading-tight">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Real Progress Bar & Primary Action CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                {isModuleActive ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-400">
                        {stats.completedActivities} of {stats.totalActivities} {modId === 'stocks' ? 'Lessons & Cases' : 'Levels'} Done
                      </span>
                      <span className="font-bold text-amber-400 font-mono-num">
                        {stats.earnedXp} XP Earned
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(stats.percent, 3)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{def.roadmap.length} Comprehensive Levels Planned</span>
                    <span className="italic">First-Principles Model</span>
                  </div>
                )}

                {/* Action CTA Button */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md group-hover:gap-2.5 cursor-pointer ${
                      isModuleActive
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span>
                      {isModuleActive
                        ? stats.completedActivities > 0
                          ? stats.percent === 100
                            ? 'Review Module'
                            : 'Continue Learning'
                          : 'Start Learning'
                        : 'Explore Roadmap'}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <span className="text-[11px] text-slate-500 font-medium">
                    {modId === 'stocks'
                      ? 'Interactive · 4 Units'
                      : modId === 'mutual-funds'
                      ? 'Interactive · 5 Levels'
                      : 'Roadmap Ready'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
