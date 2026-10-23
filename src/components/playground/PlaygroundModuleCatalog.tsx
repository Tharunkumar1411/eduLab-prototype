/**
 * Playground Module Catalog.
 *
 * The Playground landing now shows every module as an interactive card so the
 * learner can jump into any of them without a prescribed sequence. Modules
 * marked as hub-based (markets-stocks) call `onOpenHub`; modules backed by
 * the existing Duolingo path (stocks / mutual-funds) call `onOpenPath`;
 * preview-only modules (bonds / fno) show their roadmap in place.
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  Landmark,
  LineChart as LineChartIcon,
  PieChart,
  Play,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  LearningModuleId,
  MODULE_DEFINITIONS,
  ModuleProgress,
  getModuleStats,
} from '../../data/learningModules.ts';

interface PlaygroundModuleCatalogProps {
  modulesProgress: Record<LearningModuleId, ModuleProgress>;
  userXp: number;
  userLevel: number;
  streakDays: number;
  onOpenHub: (moduleId: LearningModuleId) => void; // for hub-based modules (markets-stocks)
  onOpenPath: (moduleId: LearningModuleId) => void; // for path-based modules (stocks / mutual-funds)
}

type ModuleKind = 'hub' | 'path' | 'preview';

const MODULE_ORDER: LearningModuleId[] = [
  'markets-stocks',
  'stocks',
  'mutual-funds',
  'bonds',
  'fno',
];

const KIND_BY_ID: Record<LearningModuleId, ModuleKind> = {
  'markets-stocks': 'hub',
  stocks: 'path',
  'mutual-funds': 'path',
  bonds: 'preview',
  fno: 'preview',
};

const moduleIcon = (name: string, className = 'w-5 h-5') => {
  switch (name) {
    case 'LineChart':
      return <LineChartIcon className={className} />;
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

export const PlaygroundModuleCatalog: React.FC<PlaygroundModuleCatalogProps> = ({
  modulesProgress,
  userXp,
  userLevel,
  streakDays,
  onOpenHub,
  onOpenPath,
}) => {
  const [expandedPreview, setExpandedPreview] = useState<LearningModuleId | null>(null);
  const totalCompleted = (['markets-stocks', 'stocks', 'mutual-funds'] as LearningModuleId[])
    .map((id) => getModuleStats(id, modulesProgress[id]).completedActivities)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 pb-10 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      {/* Stats strip */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Playground
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Learn by doing. Pick anything.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Every module is open. No sequence enforced — jump into whatever looks interesting.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
            <StatMini icon={Star} label="XP" value={userXp.toLocaleString()} tone="teal" />
            <StatMini icon={Flame} label="Streak" value={`${streakDays}d`} tone="amber" />
            <StatMini icon={CheckCircle2} label="Lessons" value={`${totalCompleted}`} tone="emerald" />
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {MODULE_ORDER.map((modId) => {
          const def = MODULE_DEFINITIONS[modId];
          const stats = getModuleStats(modId, modulesProgress[modId]);
          const kind = KIND_BY_ID[modId];
          const isDone = stats.percent === 100 && stats.totalActivities > 0;
          const isStarted = stats.completedActivities > 0 && !isDone;

          const open = () => {
            if (kind === 'hub') onOpenHub(modId);
            else if (kind === 'path') onOpenPath(modId);
            else setExpandedPreview((prev) => (prev === modId ? null : modId));
          };

          return (
            <div
              key={modId}
              className={`rounded-3xl border p-4 sm:p-5 bg-gradient-to-b ${def.accentColor.bg} ${def.accentColor.border} flex flex-col gap-3`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/70 ${def.accentColor.text} flex items-center justify-center`}>
                  {moduleIcon(def.iconName)}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {kind === 'hub' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                      Scenario hub
                    </span>
                  )}
                  {kind === 'path' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                      Duolingo path
                    </span>
                  )}
                  {kind === 'preview' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Preview
                    </span>
                  )}
                  {isDone && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  )}
                  {isStarted && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                      {stats.percent}% done
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight leading-tight">
                  {def.title}
                </h3>
                <p className="text-xs text-slate-300 font-semibold mt-0.5">{def.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-3">
                  {def.description}
                </p>
              </div>

              {/* Course / unit count badges */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {stats.totalActivities > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 font-mono-num font-semibold">
                    {stats.completedActivities}/{stats.totalActivities} courses
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 font-semibold">
                  {def.roadmap.length} units
                </span>
                {kind !== 'preview' && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 font-semibold">
                    All unlocked
                  </span>
                )}
              </div>

              {/* Progress rail */}
              {stats.totalActivities > 0 && (
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${
                      kind === 'hub'
                        ? 'bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400'
                        : 'bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400'
                    } transition-all duration-300`}
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-slate-500">{def.accentColor.primary} track</span>
                <button
                  type="button"
                  onClick={open}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer active:scale-95 shadow-md ${
                    kind === 'preview'
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                      : kind === 'hub'
                        ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/30'
                        : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/30'
                  }`}
                >
                  {kind === 'preview' ? (
                    <>
                      <ArrowRight className="w-3.5 h-3.5" /> Preview units
                    </>
                  ) : isStarted ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Continue
                    </>
                  ) : isDone ? (
                    <>
                      <ArrowRight className="w-3.5 h-3.5" /> Replay
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Start module
                    </>
                  )}
                </button>
              </div>

              {kind === 'preview' && expandedPreview === modId && (
                <ul className="space-y-1.5 pt-2 border-t border-slate-800">
                  {def.roadmap.map((item) => (
                    <li
                      key={item.id}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                        {item.levelNumber}
                      </span>
                      <div>
                        <span className="block font-bold text-slate-200">{item.title}</span>
                        <span className="block text-[11px] text-slate-500">{item.subtitle}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatMini: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: 'teal' | 'amber' | 'emerald';
}> = ({ icon: Icon, label, value, tone }) => {
  const toneClass =
    tone === 'teal'
      ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
      : tone === 'amber'
        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
  return (
    <div className={`rounded-xl border p-2 text-center ${toneClass}`}>
      <Icon className="w-3.5 h-3.5 mx-auto" />
      <div className="text-sm font-black font-mono-num leading-tight">{value}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
    </div>
  );
};

export default PlaygroundModuleCatalog;
