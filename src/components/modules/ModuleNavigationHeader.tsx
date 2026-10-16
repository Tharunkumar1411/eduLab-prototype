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
  Sparkles,
  Layers,
} from 'lucide-react';

interface ModuleNavigationHeaderProps {
  activeModuleId: LearningModuleId | null;
  onSelectModule: (moduleId: LearningModuleId) => void;
  modulesProgress: Record<LearningModuleId, ModuleProgress>;
  currentSubView?: 'overview' | 'path' | 'investigation';
  onNavigateSubView?: (view: 'overview' | 'path') => void;
}

export const ModuleNavigationHeader: React.FC<ModuleNavigationHeaderProps> = ({
  activeModuleId = 'stocks',
  onSelectModule,
  modulesProgress,
}) => {
  const currentModuleId = activeModuleId || 'stocks';
  const currentDef = MODULE_DEFINITIONS[currentModuleId];
  const moduleList: LearningModuleId[] = ['stocks', 'mutual-funds', 'bonds', 'fno'];

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

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-lg backdrop-blur-md mb-4 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Left: Active Course Identifier (Duolingo Style) */}
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-xl bg-slate-950 border border-slate-800 ${currentDef.accentColor.text}`}>
            {getModuleIcon(currentDef.iconName, 'w-4 h-4')}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-100">
                {currentDef.shortTitle}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-teal-500/10 text-teal-300 font-bold border border-teal-500/20">
                Active Path
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block leading-tight">
              {currentModuleId === 'stocks'
                ? 'Duolingo-style 4 Units Serpentine Trail'
                : currentModuleId === 'mutual-funds'
                ? '5 Progressive Interactive Levels'
                : 'Upcoming Curriculum'}
            </span>
          </div>
        </div>

        {/* Right: Quick Module Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
          {moduleList.map((modId) => {
            const def = MODULE_DEFINITIONS[modId];
            const isActive = currentModuleId === modId;
            const progress = modulesProgress[modId];
            const stats = getModuleStats(modId, progress);

            return (
              <button
                key={modId}
                onClick={() => onSelectModule(modId)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/20'
                    : 'bg-slate-950/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                title={def.title}
              >
                <span className={isActive ? 'text-slate-950' : def.accentColor.text}>
                  {getModuleIcon(def.iconName, 'w-3.5 h-3.5')}
                </span>
                <span>{def.shortTitle}</span>

                {modId === 'stocks' || modId === 'mutual-funds' ? (
                  stats.percent > 0 ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono-num ${
                        isActive
                          ? 'bg-teal-700 text-teal-100'
                          : 'bg-slate-800 text-teal-400'
                      }`}
                    >
                      {stats.percent}%
                    </span>
                  ) : null
                ) : (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-slate-800/90 text-slate-500 uppercase tracking-tighter">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
