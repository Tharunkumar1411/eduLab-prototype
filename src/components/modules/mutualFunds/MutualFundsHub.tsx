import React, { useState } from 'react';
import { MUTUAL_FUNDS_LEVELS, MutualFundsLevelDefinition } from '../../../data/mutualFundsData.ts';
import { ModuleProgress } from '../../../data/learningModules.ts';
import { Level1BuildAFund } from './Level1BuildAFund.tsx';
import { Level2NavAndSip } from './Level2NavAndSip.tsx';
import { Level3MatchTheFund } from './Level3MatchTheFund.tsx';
import { Level4RiskAndFees } from './Level4RiskAndFees.tsx';
import { Level5FundInvestigator } from './Level5FundInvestigator.tsx';
import { MutualFundsGlossaryModal } from './MutualFundsGlossaryModal.tsx';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';
import {
  ArrowRight,
  PieChart,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  Play,
  RotateCcw,
  Flame,
  Gem,
  Heart,
  Shield,
  Layers,
} from 'lucide-react';

interface MutualFundsHubProps {
  userXp: number;
  progress: ModuleProgress;
  onCompleteLevel: (levelId: string, xpEarned: number) => void;
  onBackToCatalog: () => void;
  initialActiveLevelId?: string | null;
}

export const MutualFundsHub: React.FC<MutualFundsHubProps> = ({
  userXp,
  progress,
  onCompleteLevel,
  initialActiveLevelId = null,
}) => {
  const [activeLevelId, setActiveLevelId] = useState<string | null>(initialActiveLevelId);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const completedLevelIds = progress.completedActivityIds;
  const completedCount = completedLevelIds.filter((id) => id.startsWith('mf_lvl_')).length;
  const totalLevels = MUTUAL_FUNDS_LEVELS.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLevels) * 100));

  // Determine the next recommended level
  const nextUncompletedLevel =
    MUTUAL_FUNDS_LEVELS.find((lvl) => !completedLevelIds.includes(lvl.id)) ||
    MUTUAL_FUNDS_LEVELS[0];

  const handleLevelCompleted = (levelId: string, xpEarned: number) => {
    onCompleteLevel(levelId, xpEarned);
  };

  // --- Active Level Screens (Full Screen Interactive Experiences) ---
  if (activeLevelId === 'mf_lvl_1') {
    return (
      <Level1BuildAFund
        onComplete={(xp) => handleLevelCompleted('mf_lvl_1', xp)}
        onBack={() => setActiveLevelId(null)}
      />
    );
  }

  if (activeLevelId === 'mf_lvl_2') {
    return (
      <Level2NavAndSip
        onComplete={(xp) => handleLevelCompleted('mf_lvl_2', xp)}
        onBack={() => setActiveLevelId(null)}
      />
    );
  }

  if (activeLevelId === 'mf_lvl_3') {
    return (
      <Level3MatchTheFund
        onComplete={(xp) => handleLevelCompleted('mf_lvl_3', xp)}
        onBack={() => setActiveLevelId(null)}
      />
    );
  }

  if (activeLevelId === 'mf_lvl_4') {
    return (
      <Level4RiskAndFees
        onComplete={(xp) => handleLevelCompleted('mf_lvl_4', xp)}
        onBack={() => setActiveLevelId(null)}
      />
    );
  }

  if (activeLevelId === 'mf_lvl_5') {
    return (
      <Level5FundInvestigator
        onComplete={(xp) => handleLevelCompleted('mf_lvl_5', xp)}
        onBack={() => setActiveLevelId(null)}
      />
    );
  }

  // --- Main Progressive Path for Mutual Funds (Duolingo Style) ---
  return (
    <div className="max-w-2xl mx-auto space-y-5 select-none pb-20 animate-in fade-in duration-200">
      {/* Top Gamification Bar (Duolingo Style: Streak, Gems, Hearts) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
        {/* Streak */}
        <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
          <Flame className="w-5 h-5 fill-amber-400 text-amber-400 animate-pulse" />
          <span className="font-mono-num">3d</span>
        </div>

        {/* Gems / Coins */}
        <div className="flex items-center gap-1.5 text-teal-400 font-extrabold text-xs">
          <Gem className="w-4 h-4 fill-teal-400 text-teal-400" />
          <span className="font-mono-num">{userXp} XP</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 text-rose-500 font-extrabold text-xs">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>5/5</span>
        </div>

        {/* Glossary Trigger */}
        <button
          onClick={() => setIsGlossaryOpen(true)}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white font-bold text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
          <span>Glossary</span>
        </button>
      </div>

      {/* Inspector Fin — Mentor Greeting */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5">
        <CharacterMentor
          size="md"
          state={
            completedCount === totalLevels
              ? 'celebrating'
              : completedCount > 0
              ? 'happy'
              : 'talking'
          }
          message={
            completedCount === 0
              ? "Welcome to Mutual Funds. Five short lessons, and you'll know more than most retail investors."
              : completedCount === totalLevels
              ? 'Mutual Funds unit mastered. Review any level to lock the ideas in.'
              : `${completedCount} of ${totalLevels} down. Next up: Level ${nextUncompletedLevel.levelNumber} — ${nextUncompletedLevel.title}.`
          }
          subMessage={
            completedCount === 0
              ? 'Tap a level below to begin. I\'ll be with you inside each one.'
              : completedCount === totalLevels
              ? undefined
              : 'Pick up where you left off.'
          }
        />
      </div>

      {/* Duolingo Section / Unit Header Banner */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-black tracking-wider text-teal-200">
                Unit · Mutual Funds
              </span>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                5 Progressive Levels
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              Mutual Funds & Wealth Building
            </h2>
            <p className="text-xs text-teal-100 max-w-md">
              Master pooled investing, NAV mechanics, SIP compounding, fund selection, and fee drag.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-teal-200 block uppercase font-bold">Progress</span>
              <span className="text-base font-black font-mono-num">{progressPercent}%</span>
            </div>
            <button
              onClick={() => setActiveLevelId(nextUncompletedLevel.id)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-teal-950 font-black text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-teal-950" />
              <span>
                {completedCount === 0
                  ? 'Start Level 1'
                  : completedCount === totalLevels
                  ? 'Review Level 1'
                  : `Level ${nextUncompletedLevel.levelNumber}`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Progressive Interactive Levels Path */}
      <div className="space-y-3">
        {MUTUAL_FUNDS_LEVELS.map((lvl) => {
          const isCompleted = completedLevelIds.includes(lvl.id);
          const isNext = !isCompleted && lvl.id === nextUncompletedLevel.id;

          return (
            <div
              key={lvl.id}
              onClick={() => setActiveLevelId(lvl.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer ${
                isCompleted
                  ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/60'
                  : isNext
                  ? 'bg-slate-900 border-teal-500/60 shadow-lg shadow-teal-950/20 ring-1 ring-teal-500/40 hover:border-teal-400'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Level Number Badge / Tactile Node */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shrink-0 shadow-md ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                      : isNext
                      ? 'bg-teal-500 text-slate-950 shadow-teal-500/30 ring-2 ring-teal-400/50'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  ) : (
                    lvl.levelNumber
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                      Level {lvl.levelNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">·</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      ~{lvl.estimatedMinutes}m
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold font-mono-num">
                      +{lvl.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-100 truncate">
                    {lvl.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {lvl.subtitle}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <button
                  type="button"
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isCompleted
                      ? 'bg-slate-800 text-slate-300 hover:text-white'
                      : isNext
                      ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                      : 'bg-slate-800/80 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Review</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Glossary Modal */}
      <MutualFundsGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
};
