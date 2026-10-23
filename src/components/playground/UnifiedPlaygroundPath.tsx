/**
 * Unified Playground Duolingo Path.
 *
 * A single serpentine path showing every module's courses as circular nodes,
 * grouped by module (Markets & Stocks → Stocks → Mutual Funds → Bonds → F&O).
 * No gating — every course is tappable.
 *
 * Each course entry carries just enough metadata for this view to render the
 * node; the actual lesson engine is dispatched by the parent via onSelect().
 */

import React, { useMemo, useRef, useState } from 'react';
import {
  Award,
  Check,
  Clock,
  Flame,
  LineChart,
  Landmark,
  PieChart,
  Play,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  LearningModuleId,
  MODULE_DEFINITIONS,
  ModuleProgress,
  getModuleStats,
} from '../../data/learningModules.ts';
import { LEARNING_UNITS, PathNode } from '../../data/learningPath.ts';
import { MUTUAL_FUNDS_UNITS } from '../../data/mutualFundsData.ts';
import { MS_COURSES, MarketsStocksCourseId } from '../../data/marketsStocks.ts';

export type UnifiedCourseKind =
  | 'markets-stocks-course'
  | 'stocks-node'
  | 'mf-node'
  | 'preview-course';

export interface UnifiedCourse {
  key: string;
  moduleId: LearningModuleId;
  kind: UnifiedCourseKind;
  title: string;
  shortLabel: string;
  xpReward: number;
  // Payloads for the parent to dispatch on tap:
  marketsStocksCourseId?: MarketsStocksCourseId;
  pathNode?: PathNode;
  previewLevelNumber?: number;
}

interface UnifiedPlaygroundPathProps {
  modulesProgress: Record<LearningModuleId, ModuleProgress>;
  completedStocksNodeIds: string[];
  userXp: number;
  userLevel: number;
  streakDays: number;
  /** Fired when a non-preview course node is tapped. */
  onSelectCourse: (course: UnifiedCourse) => void;
  /** Fired when a preview module is tapped (shows preview below the hero). */
  onSelectPreview?: (moduleId: LearningModuleId) => void;
}

interface SectionEntry {
  moduleId: LearningModuleId;
  index: number; // display number (1..5)
  courses: UnifiedCourse[];
}

const MODULE_ORDER: LearningModuleId[] = [
  'markets-stocks',
  'stocks',
  'mutual-funds',
  'bonds',
  'fno',
];

export const UnifiedPlaygroundPath: React.FC<UnifiedPlaygroundPathProps> = ({
  modulesProgress,
  completedStocksNodeIds,
  userXp,
  userLevel,
  streakDays,
  onSelectCourse,
  onSelectPreview,
}) => {
  const sections: SectionEntry[] = useMemo(
    () =>
      MODULE_ORDER.map((id, i) => ({
        moduleId: id,
        index: i + 1,
        courses: buildCoursesFor(id),
      })),
    [],
  );

  const completedByCourseKey = useMemo(() => {
    const set = new Set<string>();
    sections.forEach(({ courses }) => {
      courses.forEach((c) => {
        if (isCompleted(c, modulesProgress, completedStocksNodeIds)) {
          set.add(c.key);
        }
      });
    });
    return set;
  }, [sections, modulesProgress, completedStocksNodeIds]);

  // First not-yet-complete non-preview course across the whole path is the "active" one.
  const activeKey = useMemo(() => {
    for (const section of sections) {
      for (const c of section.courses) {
        if (c.kind === 'preview-course') continue;
        if (!completedByCourseKey.has(c.key)) return c.key;
      }
    }
    return null;
  }, [sections, completedByCourseKey]);

  const activeRef = useRef<HTMLDivElement | null>(null);

  const totalCourses = sections.reduce(
    (acc, s) => acc + s.courses.filter((c) => c.kind !== 'preview-course').length,
    0,
  );
  const doneCount = completedByCourseKey.size;

  return (
    <div className="w-full max-w-3xl mx-auto pb-16 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      {/* Hero strip */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Playground · One path, all modules
            </div>
            <h1 className="mt-1 text-base sm:text-lg font-black text-slate-100 tracking-tight">
              {doneCount}/{totalCourses} courses done
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <StatMini icon={Star} label="XP" value={userXp.toLocaleString()} tone="teal" />
            <StatMini icon={Flame} label="Streak" value={`${streakDays}d`} tone="amber" />
            <StatMini icon={Trophy} label="Lv" value={`${userLevel}`} tone="emerald" />
          </div>
        </div>
        <div className="mt-2 w-full h-1 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-sky-400 to-rose-400 transition-all"
            style={{ width: `${totalCourses === 0 ? 0 : Math.round((doneCount / totalCourses) * 100)}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <SectionBlock
            key={section.moduleId}
            section={section}
            completed={completedByCourseKey}
            activeKey={activeKey}
            onSelectCourse={onSelectCourse}
            onSelectPreview={onSelectPreview}
            activeRef={activeRef}
            modulesProgress={modulesProgress}
          />
        ))}
      </div>
    </div>
  );
};

// ===========================================================================
// Section (module) rendering
// ===========================================================================

const SectionBlock: React.FC<{
  section: SectionEntry;
  completed: Set<string>;
  activeKey: string | null;
  onSelectCourse: (c: UnifiedCourse) => void;
  onSelectPreview?: (moduleId: LearningModuleId) => void;
  activeRef: React.MutableRefObject<HTMLDivElement | null>;
  modulesProgress: Record<LearningModuleId, ModuleProgress>;
}> = ({ section, completed, activeKey, onSelectCourse, onSelectPreview, activeRef, modulesProgress }) => {
  const def = MODULE_DEFINITIONS[section.moduleId];
  const stats = getModuleStats(section.moduleId, modulesProgress[section.moduleId]);
  const kindIsPreview = section.courses.every((c) => c.kind === 'preview-course');

  return (
    <section>
      {/* Module header */}
      <div className="rounded-3xl bg-gradient-to-br border p-4 sm:p-5 mb-6 flex items-center gap-3 shadow-md"
        style={{
          borderColor: 'rgba(100,116,139,0.25)',
        }}
      >
        <div className={`w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center shrink-0 ${def.accentColor.text}`}>
          {moduleIcon(def.iconName)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-teal-400">
              Module {section.index}
            </span>
            {kindIsPreview && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300">
                <Clock className="w-3 h-3" /> Preview
              </span>
            )}
            {stats.percent === 100 && stats.totalActivities > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                <Check className="w-3 h-3" /> Done
              </span>
            )}
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 leading-tight">
            {def.title}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2">{def.tagline}</p>
        </div>
      </div>

      {/* Serpentine column of circular course nodes */}
      <div className="relative py-4 px-4 flex flex-col items-center">
        {/* Dotted connector svg */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          {section.courses.map((c, i) => {
            if (i === section.courses.length - 1) return null;
            const y1 = i * 155 + 46;
            const y2 = (i + 1) * 155 + 46;
            const x1 = 50 + nodeOffset(i) * 0.22;
            const x2 = 50 + nodeOffset(i + 1) * 0.22;
            return (
              <path
                key={i}
                d={`M ${x1}% ${y1}px C ${x1}% ${(y1 + y2) / 2}px, ${x2}% ${(y1 + y2) / 2}px, ${x2}% ${y2}px`}
                fill="none"
                stroke="#334155"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
            );
          })}
        </svg>

        <div className="relative z-10 w-full flex flex-col items-center space-y-24">
          {section.courses.map((c, i) => {
            const isDone = completed.has(c.key);
            const isActive = c.key === activeKey;
            const isPreview = c.kind === 'preview-course';
            const horizontalOffset = nodeOffset(i);

            return (
              <div
                key={c.key}
                ref={isActive ? activeRef : null}
                className="relative flex items-center justify-center"
                style={{ transform: `translateX(${horizontalOffset}px)` }}
              >
                {/* START speech bubble on active node */}
                {isActive && (
                  <div className="absolute -top-11 z-20 flex flex-col items-center pointer-events-none motion-safe:animate-bounce-subtle">
                    <div className="bg-teal-400 text-slate-950 font-black text-[11px] px-3.5 py-1 rounded-xl shadow-lg border border-teal-200 flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider">
                      <Play className="w-3 h-3 fill-slate-950 shrink-0" />
                      <span>Start</span>
                      <span className="text-[10px] font-bold text-teal-950/80">
                        · +{c.xpReward} XP
                      </span>
                    </div>
                    <div className="w-2.5 h-2.5 bg-teal-400 transform rotate-45 -mt-1.5 shadow-xs" />
                  </div>
                )}

                {/* Active glow ring */}
                {isActive && (
                  <div className="absolute -inset-2.5 rounded-full border-2 border-teal-400/60 animate-pulse pointer-events-none" />
                )}

                {/* 3D node */}
                <button
                  type="button"
                  onClick={() =>
                    isPreview ? onSelectPreview?.(c.moduleId) : onSelectCourse(c)
                  }
                  title={c.title}
                  aria-label={c.title}
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isDone
                      ? 'bg-amber-500 text-slate-950 shadow-[0_6px_0_#92400e] hover:bg-amber-400 active:translate-y-1.5 active:shadow-[0_0_0_#92400e]'
                      : isActive
                        ? 'bg-gradient-to-b from-teal-400 to-teal-500 text-slate-950 shadow-[0_6px_0_#0f766e] ring-4 ring-teal-400/30 hover:scale-105 active:translate-y-1.5 active:shadow-[0_0_0_#0f766e]'
                        : isPreview
                          ? 'bg-slate-800 text-slate-400 shadow-[0_6px_0_#1e293b] opacity-90 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-200 shadow-[0_6px_0_#1e293b] opacity-95 hover:brightness-110'
                  }`}
                >
                  <NodeIcon course={c} isDone={isDone} isActive={isActive} isPreview={isPreview} />
                </button>

                {/* Label below node */}
                <div className="absolute top-[88px] sm:top-[94px] z-10 text-center pointer-events-none -translate-x-1/2 left-1/2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border shadow-md backdrop-blur-md whitespace-nowrap max-w-[180px] truncate ${
                      isDone
                        ? 'bg-slate-900/95 border-slate-700 text-slate-300'
                        : isActive
                          ? 'bg-slate-900/95 border-teal-400 text-teal-300 ring-1 ring-teal-400/30'
                          : isPreview
                            ? 'bg-slate-950/85 border-amber-500/30 text-amber-200/80'
                            : 'bg-slate-950/85 border-slate-800 text-slate-400'
                    }`}
                  >
                    {c.shortLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ===========================================================================
// Icons + helpers
// ===========================================================================

const NodeIcon: React.FC<{
  course: UnifiedCourse;
  isDone: boolean;
  isActive: boolean;
  isPreview: boolean;
}> = ({ course, isDone, isActive, isPreview }) => {
  if (isDone) return <Check className="w-8 h-8 stroke-[3.5] text-slate-950" />;
  if (isPreview) return <Clock className="w-7 h-7" />;

  // Course type → icon
  const typeIcon = (() => {
    if (course.pathNode) {
      if (course.pathNode.type === 'chest') return <span className="text-3xl select-none">🎁</span>;
      if (course.pathNode.type === 'case') return <Trophy className="w-8 h-8" />;
      switch (course.pathNode.iconType) {
        case 'star':
          return <Star className="w-8 h-8 fill-current" />;
        case 'book':
          return <Award className="w-8 h-8" />;
        case 'chart':
          return <TrendingUp className="w-8 h-8" />;
        case 'shield':
          return <Shield className="w-8 h-8" />;
        case 'target':
          return <Search className="w-8 h-8" />;
        case 'crown':
          return <Trophy className="w-8 h-8" />;
        case 'flame':
          return <Flame className="w-8 h-8" />;
        default:
          return <Star className="w-8 h-8 fill-current" />;
      }
    }
    if (course.kind === 'markets-stocks-course') {
      // Course 7 is the simulator / wrench; course 8 is ETF basket.
      if (course.marketsStocksCourseId === 'ms_c7_order_types')
        return <Wrench className="w-8 h-8" />;
      if (course.marketsStocksCourseId === 'ms_c8_etf')
        return <PieChart className="w-8 h-8" />;
      return <Star className="w-8 h-8 fill-current" />;
    }
    return <Star className="w-8 h-8 fill-current" />;
  })();

  return typeIcon;
};

const moduleIcon = (name: string, className = 'w-6 h-6') => {
  switch (name) {
    case 'LineChart':
      return <LineChart className={className} />;
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

/** Serpentine horizontal offset by node index (0 straight, 1 right, 2 further right, 3 right, 4 straight, repeat). */
function nodeOffset(index: number): number {
  const pattern = [0, 60, 90, 60, 0, -60, -90, -60];
  return pattern[index % pattern.length];
}

function isCompleted(
  c: UnifiedCourse,
  modulesProgress: Record<LearningModuleId, ModuleProgress>,
  completedStocksNodeIds: string[],
): boolean {
  if (c.kind === 'markets-stocks-course') {
    return modulesProgress['markets-stocks'].completedActivityIds.includes(c.key);
  }
  if (c.kind === 'stocks-node') {
    return (
      completedStocksNodeIds.includes(c.key) ||
      modulesProgress.stocks.completedActivityIds.includes(c.key)
    );
  }
  if (c.kind === 'mf-node') {
    return modulesProgress['mutual-funds'].completedActivityIds.includes(c.key);
  }
  return false;
}

// ===========================================================================
// Course list builders — one per module.
// ===========================================================================

function buildCoursesFor(moduleId: LearningModuleId): UnifiedCourse[] {
  switch (moduleId) {
    case 'markets-stocks':
      return MS_COURSES.map((c) => ({
        key: c.id,
        moduleId: 'markets-stocks',
        kind: 'markets-stocks-course',
        title: c.title,
        shortLabel: `${c.number}. ${c.title}`,
        xpReward: c.xpReward,
        marketsStocksCourseId: c.id,
      }));

    case 'stocks':
      return LEARNING_UNITS.flatMap((u) => u.nodes).map((n) => ({
        key: n.id,
        moduleId: 'stocks',
        kind: 'stocks-node',
        title: n.title,
        shortLabel: n.levelBadge ? `${n.levelBadge}` : n.title,
        xpReward: n.xpReward,
        pathNode: n,
      }));

    case 'mutual-funds':
      return MUTUAL_FUNDS_UNITS.flatMap((u) => u.nodes).map((n) => ({
        key: n.id,
        moduleId: 'mutual-funds',
        kind: 'mf-node',
        title: n.title,
        shortLabel: n.levelBadge ? `${n.levelBadge}` : n.title,
        xpReward: n.xpReward,
        pathNode: n,
      }));

    case 'bonds':
    case 'fno': {
      const def = MODULE_DEFINITIONS[moduleId];
      return def.roadmap.map((item) => ({
        key: `${moduleId}:${item.id}`,
        moduleId,
        kind: 'preview-course',
        title: item.title,
        shortLabel: `Lv ${item.levelNumber}. ${item.title}`,
        xpReward: 0,
        previewLevelNumber: item.levelNumber,
      }));
    }
  }
}

// ===========================================================================
// Small stat chip
// ===========================================================================

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
    <div className={`rounded-lg border px-2 py-1 flex items-center gap-1 ${toneClass}`}>
      <Icon className="w-3 h-3" />
      <span className="text-[11px] font-black font-mono-num">{value}</span>
      <span className="text-[9px] uppercase tracking-wider opacity-70">{label}</span>
    </div>
  );
};

export default UnifiedPlaygroundPath;
