import React, { useState } from 'react';
import { MUTUAL_FUNDS_LEVELS, MutualFundsLevelDefinition } from '../../../data/mutualFundsData.ts';
import { ModuleProgress } from '../../../data/learningModules.ts';
import { Level1BuildAFund } from './Level1BuildAFund.tsx';
import { Level2NavAndSip } from './Level2NavAndSip.tsx';
import { Level3MatchTheFund } from './Level3MatchTheFund.tsx';
import { Level4RiskAndFees } from './Level4RiskAndFees.tsx';
import { Level5FundInvestigator } from './Level5FundInvestigator.tsx';
import { MutualFundsGlossaryModal } from './MutualFundsGlossaryModal.tsx';
import {
  ArrowLeft,
  ArrowRight,
  PieChart,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  Play,
  Layers,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Percent,
  Search,
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
  onBackToCatalog,
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

  // --- Main Mutual Funds Overview Hub ---
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-24 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Quick Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToCatalog}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>All Modules</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-xs font-semibold text-teal-300 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Glossary & Concepts (A-Z)</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border border-teal-500/40 bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-950 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-teal-400">
                <PieChart className="w-6 h-6" />
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold border bg-teal-500/20 text-teal-300 border-teal-500/30">
                Active Module · 5 Interactive Levels
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Mutual Funds & Wealth Building
            </h1>
            <p className="text-sm sm:text-base font-semibold text-teal-300/90">
              Master pooled investing, NAV mechanics, SIP compounding, fund selection, and fee drag.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Designed for young investors in India. Learn the mechanics of collective capital, rupee-cost averaging, and evidence-based fund evaluation through interactive simulations — not static textbook lectures.
            </p>
          </div>

          {/* Module Progress Card */}
          <div className="shrink-0 w-full md:w-72 p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Module Progress</span>
              <span className="font-black text-teal-400 font-mono-num">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-slate-800/80">
              <div className="p-2 rounded-xl bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">XP Earned</span>
                <span className="text-sm font-black text-amber-400 font-mono-num">{progress.earnedXp} XP</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Levels Done</span>
                <span className="text-sm font-black text-slate-200 font-mono-num">
                  {completedCount}/{totalLevels}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveLevelId(nextUncompletedLevel.id)}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>
                {completedCount === 0
                  ? 'Start Level 1'
                  : completedCount === totalLevels
                  ? 'Review Level 1'
                  : `Continue: Level ${nextUncompletedLevel.levelNumber}`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5 PROGRESSIVE LEVELS ROADMAP */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>Curriculum Learning Path</span>
            </h2>
            <p className="text-xs text-slate-400">
              Five progressive interactive levels. Experiment with variables, simulate real market cycles, and investigate fund claims.
            </p>
          </div>
          <span className="text-xs font-semibold text-teal-400/90 self-start sm:self-auto">
            Total +1,150 XP Available
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MUTUAL_FUNDS_LEVELS.map((lvl) => {
            const isCompleted = completedLevelIds.includes(lvl.id);
            const isNext = !isCompleted && lvl.id === nextUncompletedLevel.id;

            return (
              <div
                key={lvl.id}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                  isCompleted
                    ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/50'
                    : isNext
                    ? 'bg-slate-900/90 border-teal-500/50 shadow-lg shadow-teal-950/20 ring-1 ring-teal-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Left Content */}
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-teal-400 bg-teal-950/80 border border-teal-500/30 px-2.5 py-0.5 rounded-lg">
                      Level {lvl.levelNumber}
                    </span>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Completed (+{lvl.xpReward} XP earned)</span>
                      </span>
                    ) : isNext ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-lg">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Recommended Next</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/60 px-2.5 py-0.5 rounded-lg">
                        Unlocked & Ready
                      </span>
                    )}

                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>~{lvl.estimatedMinutes} mins</span>
                    </span>

                    <span className="text-[11px] font-bold text-amber-400 font-mono-num">
                      +{lvl.xpReward} XP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2">
                      <span>{lvl.title}</span>
                      <span className="text-slate-500 font-normal text-xs sm:text-sm">· {lvl.subtitle}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-teal-300/80 font-medium mt-0.5">
                      {lvl.tagline}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {lvl.learningOutcome}
                    </p>
                  </div>

                  {/* Lesson Topics Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lvl.lessons.map((lesson, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-300 bg-slate-950/70 border border-slate-800 px-2 py-0.5 rounded-md"
                      >
                        {lesson}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setActiveLevelId(lvl.id)}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                        : isNext
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Review Level</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start Level {lvl.levelNumber}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* CORE MENTAL MODELS & ANTI-MYTH PRINCIPLES */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Core Mental Models Every Beginner Needs</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <span className="w-5 h-5 rounded-md bg-teal-500/20 flex items-center justify-center text-[10px]">1</span>
              <span>Collective Pooling</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When thousands of savers invest ₹500 each, the fund creates a ₹100+ Crore pool. This grants small investors institutional buying power, fractional ownership of 40+ blue chips, and professional risk diversification.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <span className="w-5 h-5 rounded-md bg-teal-500/20 flex items-center justify-center text-[10px]">2</span>
              <span>NAV is NOT a Cheapness Score</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A ₹10 NAV is not "cheaper" or better value than a ₹100 NAV. NAV is simply total assets divided by units. If both funds hold identical portfolios rising 10%, your return on ₹10,000 invested is exactly identical.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <span className="w-5 h-5 rounded-md bg-teal-500/20 flex items-center justify-center text-[10px]">3</span>
              <span>Rupee-Cost Averaging via SIP</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Investing a fixed monthly rupee sum automatically purchases more units when prices fall and fewer units when prices rally. You do not need to forecast tops or bottoms to build wealth systematically.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <span className="w-5 h-5 rounded-md bg-teal-500/20 flex items-center justify-center text-[10px]">4</span>
              <span>The 1% Expense Ratio Compounding Drag</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Total Expense Ratio (TER) is charged continuously on your total corpus, not just your profits. Over a 20-25 year holding period, an extra 1% fee can swallow 20% to 30% of your accumulated terminal wealth.
            </p>
          </div>
        </div>
      </div>

      {/* SEBI Compliance Educational Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-300 block">SEBI Investor Education Guideline</span>
          <p className="leading-relaxed">
            Mutual fund investments are subject to market risks; read all scheme related documents carefully. Past performance is not indicative of future returns. FinCraft is an interactive educational platform designed to teach financial reasoning. All funds, portfolios, and figures shown are fictional models for learning purposes.
          </p>
        </div>
      </div>

      {/* Glossary Modal */}
      <MutualFundsGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
};
