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
  LayoutGrid,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ModuleNavigationHeaderProps {
  activeModuleId: LearningModuleId | null;
  onSelectModule: (moduleId: LearningModuleId | null) => void;
  modulesProgress: Record<LearningModuleId, ModuleProgress>;
  currentSubView?: 'overview' | 'path' | 'investigation';
  onNavigateSubView?: (view: 'overview' | 'path') => void;
}

export const ModuleNavigationHeader: React.FC<ModuleNavigationHeaderProps> = ({
  activeModuleId,
  onSelectModule,
  modulesProgress,
  currentSubView = 'overview',
  onNavigateSubView,
}) => {
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
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-lg backdrop-blur-md mb-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Left: All Modules Back/Home Link */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectModule(null)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeModuleId === null
                ? 'bg-teal-500 text-slate-950 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Modules</span>
          </button>

          {activeModuleId && (
            <div className="hidden sm:flex items-center text-xs text-slate-500 font-medium">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-300 ml-1">
                {MODULE_DEFINITIONS[activeModuleId].shortTitle}
              </span>
            </div>
          )}
        </div>

        {/* Right: Quick Module Switcher Pills (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {moduleList.map((modId) => {
            const def = MODULE_DEFINITIONS[modId];
            const isActive = activeModuleId === modId;
            const progress = modulesProgress[modId];
            const stats = getModuleStats(modId, progress);

            return (
              <button
                key={modId}
                onClick={() => onSelectModule(modId)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-600/90 text-white shadow-sm ring-1 ring-teal-400'
                    : 'bg-slate-950/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                title={def.title}
              >
                <span className={isActive ? 'text-white' : def.accentColor.text}>
                  {getModuleIcon(def.iconName, 'w-3.5 h-3.5')}
                </span>
                <span>{def.shortTitle}</span>

                {modId === 'stocks' || modId === 'mutual-funds' ? (
                  stats.percent > 0 ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono-num ${
                        isActive
                          ? 'bg-teal-900/80 text-teal-200'
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
