import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { SectorData, SectorDriver, SectorMetric } from '../../../data/sectors/types.ts';
import { PlaygroundCase } from '../../../data/cases.ts';

interface SectorLearningHubProps {
  sector: SectorData;
  userXp: number;
  completedCaseIds: string[];
  onBackToExplore: () => void;
  onStartInvestigation: (caseData: PlaygroundCase) => void;
  onAwardXp: (amount: number) => void;
}

export const SectorLearningHub: React.FC<SectorLearningHubProps> = ({
  sector,
  userXp,
  completedCaseIds,
  onBackToExplore,
  onStartInvestigation,
  onAwardXp,
}) => {
  // Local persistent state for interactive features
  const storageKey = `fincraft_sector_${sector.id}_progress`;
  const [selectedDriverId, setSelectedDriverId] = useState<string>(sector.drivers[0]?.id || '');
  const [activeChainStep, setActiveChainStep] = useState<number>(1);
  const [selectedMetricId, setSelectedMetricId] = useState<string>(sector.metrics[0]?.id || '');

  // Challenge state
  const [challengeAnswerId, setChallengeAnswerId] = useState<string | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeXpAwarded, setChallengeXpAwarded] = useState<boolean>(false);

  // Viewed interactive items tracking for progress calculation
  const [viewedDrivers, setViewedDrivers] = useState<string[]>([sector.drivers[0]?.id || '']);

  // Load saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.challengeSubmitted) {
          setChallengeSubmitted(true);
          setChallengeAnswerId(parsed.challengeAnswerId);
          setChallengeXpAwarded(true);
        }
        if (Array.isArray(parsed.viewedDrivers)) {
          setViewedDrivers(parsed.viewedDrivers);
        }
      }
    } catch {
      // Ignore local storage error in private browsing
    }
  }, [storageKey]);

  // Save progress helper
  const saveProgress = (driversList: string[], isChallengeDone: boolean, ansId: string | null) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          viewedDrivers: driversList,
          challengeSubmitted: isChallengeDone,
          challengeAnswerId: ansId,
        })
      );
    } catch {
      // Ignore
    }
  };

  const handleSelectDriver = (driverId: string) => {
    setSelectedDriverId(driverId);
    if (!viewedDrivers.includes(driverId)) {
      const updated = [...viewedDrivers, driverId];
      setViewedDrivers(updated);
      saveProgress(updated, challengeSubmitted, challengeAnswerId);
    }
  };

  const handleSelectChallengeOption = (optId: string) => {
    if (challengeSubmitted) return;
    setChallengeAnswerId(optId);
  };

  const handleSubmitChallenge = () => {
    if (!challengeAnswerId || challengeSubmitted) return;
    setChallengeSubmitted(true);

    const chosen = sector.miniChallenge.options.find((o) => o.id === challengeAnswerId);
    if (chosen?.isCorrect && !challengeXpAwarded) {
      onAwardXp(sector.miniChallenge.xpReward);
      setChallengeXpAwarded(true);
    }
    saveProgress(viewedDrivers, true, challengeAnswerId);
  };

  const handleResetChallenge = () => {
    setChallengeSubmitted(false);
    setChallengeAnswerId(null);
    saveProgress(viewedDrivers, false, null);
  };

  // Progress metrics calculation
  const isInvestigationCompleted = completedCaseIds.includes(sector.investigation.id);
  const challengeDone = challengeSubmitted && sector.miniChallenge.options.find((o) => o.id === challengeAnswerId)?.isCorrect;
  const driversExploredCount = viewedDrivers.length;
  const totalDrivers = sector.drivers.length;

  // Weightings: Drivers (30%), Challenge (30%), Investigation (40%)
  const driverRatio = totalDrivers > 0 ? driversExploredCount / totalDrivers : 1;
  const progressPercent = Math.min(
    100,
    Math.round(
      driverRatio * 30 +
        (challengeDone ? 30 : 0) +
        (isInvestigationCompleted ? 40 : 0)
    )
  );

  const activeDriver =
    sector.drivers.find((d) => d.id === selectedDriverId) || sector.drivers[0];
  const activeChainItem =
    sector.howItWorks.chainSteps.find((s) => s.stepNumber === activeChainStep) ||
    sector.howItWorks.chainSteps[0];
  const activeMetric =
    sector.metrics.find((m) => m.id === selectedMetricId) || sector.metrics[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-7 pb-20 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <button
          onClick={onBackToExplore}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Explore Markets</span>
        </button>

        {/* Global XP & Level indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-teal-300 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono-num">{userXp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* 1. SECTOR HEADER CARD */}
      <section aria-labelledby="sector-hub-title" className="w-full">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/30 p-6 sm:p-7 shadow-xl overflow-hidden space-y-5">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top metadata row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/40 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {sector.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                  <span>Sector Learning Hub</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 normal-case font-medium">{sector.estimatedTime}</span>
                </div>
                <h1 id="sector-hub-title" className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {sector.name}
                </h1>
                <p className="text-xs sm:text-sm text-teal-200/90 font-medium mt-0.5">
                  "{sector.tagline}"
                </p>
              </div>
            </div>

            {/* Progress Badge */}
            <div className="flex flex-col items-start sm:items-end gap-1.5 self-start sm:self-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold">
                <span className="text-slate-400">Hub Progress:</span>
                <span className="font-mono-num text-teal-300 font-bold">[{progressPercent}% Complete]</span>
              </div>
              <div className="w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Summary Text */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl relative z-10">
            {sector.heroSummary}
          </p>

          {/* Jump-to Quick Navigation Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none relative z-10 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Explore:
            </span>
            <a
              href="#section-what-is-it"
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 transition-colors"
            >
              1. What is {sector.name}?
            </a>
            <a
              href="#section-how-it-works"
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 transition-colors"
            >
              2. How It Works
            </a>
            <a
              href="#section-drivers"
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 transition-colors"
            >
              3. Growth Drivers
            </a>
            <a
              href="#section-metrics"
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 transition-colors"
            >
              4. Key Numbers
            </a>
            <a
              href="#section-companies"
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 transition-colors"
            >
              5. Companies
            </a>
            <a
              href="#section-investigation"
              className="shrink-0 px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-xs text-teal-300 font-semibold transition-colors"
            >
              6. 🔎 Investigation
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS THIS SECTOR? */}
      <section id="section-what-is-it" aria-labelledby="heading-what-is-it" className="w-full space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <h2 id="heading-what-is-it" className="text-lg font-bold text-slate-100 tracking-tight">
            First, understand the sector
          </h2>
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-md space-y-5">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {sector.whatIsIt.simpleDefinition}
          </p>

          {/* Visual product/category cards */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {sector.whatIsIt.examplesHeadline}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {sector.whatIsIt.exampleItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-teal-500/30 transition-colors"
                >
                  <span className="text-2xl" role="img" aria-label={item.name}>
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-100 block truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beginner Mental Model Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-amber-500/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">
                Beginner Mental Model
              </span>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {sector.whatIsIt.beginnerMentalModel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW DOES IT WORK? (VISUAL VALUE CHAIN) */}
      <section id="section-how-it-works" aria-labelledby="heading-how-it-works" className="w-full space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <h2 id="heading-how-it-works" className="text-lg font-bold text-slate-100 tracking-tight">
              {sector.howItWorks.headline}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
            Simplified Example
          </span>
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-md space-y-5">
          <p className="text-sm text-slate-300 leading-relaxed">
            {sector.howItWorks.explanation}
          </p>

          {/* Interactive Visual Chain Flow */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Tap any stage to inspect value and margins:
            </span>

            {/* Stepper buttons row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sector.howItWorks.chainSteps.map((step) => {
                const isSelected = step.stepNumber === activeChainStep;
                return (
                  <button
                    key={step.stepNumber}
                    onClick={() => setActiveChainStep(step.stepNumber)}
                    className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-teal-950/40 border-teal-500/80 shadow-md shadow-teal-950/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl">{step.icon}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Step {step.stepNumber}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-100 block truncate w-full">
                      {step.title}
                    </span>
                    <span className="text-[11px] font-mono-num text-teal-400 font-semibold mt-0.5">
                      {step.cutOfValue}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detail Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeChainItem.icon}</span>
                  <span className="text-sm font-bold text-slate-100">
                    Step {activeChainItem.stepNumber}: {activeChainItem.title}
                  </span>
                </div>
                <span className="text-xs font-mono-num font-bold text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2 py-0.5 rounded-lg">
                  {activeChainItem.cutOfValue}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                <span className="text-slate-300 font-bold">Role:</span> {activeChainItem.role}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {activeChainItem.description}
              </p>
            </div>
          </div>

          {/* Key Insight Bottom Box */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-center gap-2.5">
            <span className="text-base shrink-0">🎯</span>
            <span>{sector.howItWorks.keyInsight}</span>
          </div>
        </div>
      </section>

      {/* 4. WHAT DRIVES THIS SECTOR? (INTERACTIVE DRIVERS) */}
      <section id="section-drivers" aria-labelledby="heading-drivers" className="w-full space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <h2 id="heading-drivers" className="text-lg font-bold text-slate-100 tracking-tight">
              {sector.driversHeadline}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {viewedDrivers.length}/{sector.drivers.length} Explored
          </span>
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-md space-y-5">
          {/* Driver Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {sector.drivers.map((driver) => {
              const isSelected = driver.id === selectedDriverId;
              const isExplored = viewedDrivers.includes(driver.id);
              return (
                <button
                  key={driver.id}
                  onClick={() => handleSelectDriver(driver.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20'
                      : isExplored
                      ? 'bg-slate-950/80 text-slate-200 border-slate-700 hover:border-slate-600'
                      : 'bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{driver.icon}</span>
                  <span>{driver.name}</span>
                  {isExplored && !isSelected && (
                    <CheckCircle className="w-3 h-3 text-teal-400 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Driver Content Card */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                  <span className="text-lg">{activeDriver.icon}</span>
                  <span>Growth Driver</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {activeDriver.name}
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-400 italic bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                "{activeDriver.shortQuestion}"
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeDriver.explanation}
            </p>

            {/* Real World Example */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Real-World Example
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeDriver.realWorldExample}
              </p>
            </div>

            {/* Key Metric To Watch */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-900">
              <span>Metric to track in financial reports:</span>
              <span className="font-mono-num font-bold text-teal-300 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                {activeDriver.keyMetricToWatch}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MINI CHALLENGE (INTERACTIVE TEST WITH XP) */}
      <section aria-labelledby="heading-mini-challenge" className="w-full space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h2 id="heading-mini-challenge" className="text-lg font-bold text-slate-100 tracking-tight">
              Mini Challenge: {sector.miniChallenge.title}
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-lg">
            ⭐ +{sector.miniChallenge.xpReward} XP
          </span>
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-md space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            {sector.miniChallenge.scenario}
          </p>

          <h3 className="text-sm font-bold text-slate-100">
            {sector.miniChallenge.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {sector.miniChallenge.options.map((opt) => {
              const isSelected = opt.id === challengeAnswerId;
              let optionStyle = 'bg-slate-950/70 border-slate-800 hover:border-teal-500/40 text-slate-200';

              if (challengeSubmitted) {
                if (opt.isCorrect) {
                  optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                } else {
                  optionStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-teal-950/50 border-teal-500 text-teal-200 font-bold';
              }

              return (
                <button
                  key={opt.id}
                  disabled={challengeSubmitted}
                  onClick={() => handleSelectChallengeOption(opt.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <span>{opt.text}</span>
                  {challengeSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action / Explanation Area */}
          {!challengeSubmitted ? (
            <div className="flex justify-end pt-1">
              <button
                disabled={!challengeAnswerId}
                onClick={handleSubmitChallenge}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:hover:bg-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Check Answer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  Why this happens:
                </span>
                <button
                  onClick={handleResetChallenge}
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Try again</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {
                  sector.miniChallenge.options.find((o) => o.id === challengeAnswerId)?.explanation ||
                  sector.miniChallenge.options.find((o) => o.isCorrect)?.explanation
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. NUMBERS THAT MATTER (SECTOR-SPECIFIC METRICS) */}
      <section id="section-metrics" aria-labelledby="heading-metrics" className="w-full space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <h2 id="heading-metrics" className="text-lg font-bold text-slate-100 tracking-tight">
              {sector.metricsHeadline}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
            Educational Principles
          </span>
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-md space-y-5">
          {/* Metrics Pill Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {sector.metrics.map((metric) => {
              const isSelected = metric.id === selectedMetricId;
              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetricId(metric.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-sm'
                      : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono-num text-[11px]">{metric.shortCode}</span>
                  <span>·</span>
                  <span>{metric.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Metric Card */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div>
                <span className="text-xs font-mono-num font-bold text-teal-400 uppercase tracking-wider">
                  {activeMetric.shortCode}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {activeMetric.name}
                </h3>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                1. What it means:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeMetric.whatItMeans}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                2. Why it matters in {sector.name}:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeMetric.whyItMatters}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                3. Sector Example:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeMetric.sectorExample}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXPLORE COMPANIES */}
      <section id="section-companies" aria-labelledby="heading-companies" className="w-full space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏢</span>
          <h2 id="heading-companies" className="text-lg font-bold text-slate-100 tracking-tight">
            {sector.companiesHeadline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sector.companies.map((company) => (
            <div
              key={company.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-3.5 shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {company.icon}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">
                      {company.name}
                    </h3>
                    <p className="text-xs text-teal-400 font-medium">
                      {company.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {company.businessDescription}
                </p>

                {/* Key Categories */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Categories / Products:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {company.productCategories.map((cat, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Primary Drivers */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Primary Drivers:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {company.primaryDrivers.map((driver, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-teal-300 bg-teal-950/40 border border-teal-500/20 px-2 py-0.5 rounded-md"
                    >
                      {driver}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SECTOR INVESTIGATION (MOST IMPORTANT HERO SECTION) */}
      <section id="section-investigation" aria-labelledby="heading-investigation" className="w-full space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔎</span>
            <h2 id="heading-investigation" className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              Put your knowledge to work
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{sector.investigation.xpReward} XP</span>
          </span>
        </div>

        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border-2 border-emerald-500/40 p-6 sm:p-7 shadow-xl overflow-hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Sector Case Investigation</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 normal-case">{sector.investigation.companyName} ({sector.investigation.ticker})</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                {sector.investigation.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {sector.investigation.hook}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium pt-1">
                <span>🔍 3 Investigation Tokens</span>
                <span className="text-slate-600">·</span>
                <span>⏱️ ~{sector.investigation.estimatedMinutes} min</span>
                <span className="text-slate-600">·</span>
                <span>Evidence Room & Debrief</span>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                onClick={() => onStartInvestigation(sector.investigation)}
                className={`w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl font-extrabold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isInvestigationCompleted
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25 active:scale-98'
                }`}
              >
                {isInvestigationCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Re-open Investigation</span>
                  </>
                ) : (
                  <>
                    <span>Start {sector.name} Investigation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM PROGRESS & SUMMARY */}
      <section aria-labelledby="heading-sector-progress" className="w-full">
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 id="heading-sector-progress" className="text-base font-bold text-slate-100">
                Your {sector.name} Progress
              </h3>
              <p className="text-xs text-slate-400">
                Master industry dynamics and earn forensic badges.
              </p>
            </div>
            <span className="font-mono-num font-bold text-teal-400 text-sm">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Drivers Explored:</span>
              <span className="font-bold text-slate-100">
                {driversExploredCount}/{totalDrivers}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Mini Challenge:</span>
              <span
                className={`font-bold ${
                  challengeDone ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {challengeDone ? 'Completed (+50 XP)' : 'Pending'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Case Solved:</span>
              <span
                className={`font-bold ${
                  isInvestigationCompleted ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {isInvestigationCompleted ? 'Solved (+350 XP)' : 'Not Started'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
