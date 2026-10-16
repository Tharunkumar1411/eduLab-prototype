import React, { useState } from 'react';
import {
  LearningModuleId,
  MODULE_DEFINITIONS,
} from '../../data/learningModules.ts';
import {
  TrendingUp,
  PieChart,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Target,
  Compass,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { AppLogo } from '../common/AppLogo.tsx';
import { ThemeToggle } from '../common/ThemeToggle.tsx';

interface OnboardingScreenProps {
  onComplete: (selectedModuleId: LearningModuleId) => void;
  onSkip?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onSkip,
}) => {
  const [selectedModule, setSelectedModule] = useState<LearningModuleId>('stocks');
  const [selectedPace, setSelectedPace] = useState<'casual' | 'regular' | 'intense'>('regular');
  const [selectedGoal, setSelectedGoal] = useState<'basics' | 'investing' | 'career'>('investing');
  const [step, setStep] = useState<1 | 2>(1);

  const handleFinish = () => {
    try {
      localStorage.setItem('fincraft_onboarded_v1', 'true');
    } catch {
      // ignore storage access errors
    }
    onComplete(selectedModule);
  };

  const handleSkipToPlayground = () => {
    try {
      localStorage.setItem('fincraft_onboarded_v1', 'true');
    } catch {
      // ignore storage access errors
    }
    if (onSkip) {
      onSkip();
    } else {
      onComplete('stocks');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white transition-colors duration-200">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <AppLogo size="md" />
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100 block">
                FinCraft
              </span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold block tracking-wide">
                Build your financial skills.
              </span>
            </div>
          </div>

          {/* Header Controls: Step Badge, Theme Toggle & Skip */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="text-teal-600 dark:text-teal-400">Step {step} of 2</span>
              <span>·</span>
              <span>{step === 1 ? 'Focus Module' : 'Daily Pace'}</span>
            </div>

            <ThemeToggle />

            <button
              onClick={handleSkipToPlayground}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              title="Skip onboarding and enter playground directly"
            >
              Skip
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center max-w-3xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Step Progress Bar Indicator */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-8 border border-slate-300/50 dark:border-slate-700/50">
          <div
            className="bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>

        {step === 1 ? (
          /* ==================================================== */
          /* STEP 1: SELECT STARTING FOCUS MODULE                 */
          /* ==================================================== */
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header intro */}
            <div className="text-center space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Welcome to FinCraft</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Choose Your Starting Path
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Select your focus module to begin. You will jump straight onto our Duolingo-style learning path with bite-sized lessons, simulations, and mystery cases.
              </p>
            </div>

            {/* Module Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option 1: Stocks & Equity Markets */}
              <div
                onClick={() => setSelectedModule('stocks')}
                className={`p-5 sm:p-6 rounded-3xl border-2 cursor-pointer transition-all duration-150 flex flex-col justify-between gap-4 text-left ${
                  selectedModule === 'stocks'
                    ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-600 dark:border-teal-400 ring-2 ring-teal-600/20 dark:ring-teal-500/30 shadow-md shadow-teal-500/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850/50 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        selectedModule === 'stocks'
                          ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-md shadow-emerald-600/20'
                          : 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-slate-700'
                      }`}
                    >
                      <TrendingUp className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedModule === 'stocks'
                            ? 'border-teal-600 bg-teal-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-transparent'
                        }`}
                      >
                        {selectedModule === 'stocks' && (
                          <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                      Stocks & Equity Markets
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Master Indian corporate fundamentals, balance sheet forensics, PE ratios, and solve corporate financial mystery cases.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium">4 Units</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium">13 Lessons</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium">Forensic Cases</span>
                </div>
              </div>

              {/* Option 2: Mutual Funds & Wealth Building */}
              <div
                onClick={() => setSelectedModule('mutual-funds')}
                className={`p-5 sm:p-6 rounded-3xl border-2 cursor-pointer transition-all duration-150 flex flex-col justify-between gap-4 text-left ${
                  selectedModule === 'mutual-funds'
                    ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-600 dark:border-teal-400 ring-2 ring-teal-600/20 dark:ring-teal-500/30 shadow-md shadow-teal-500/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850/50 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        selectedModule === 'mutual-funds'
                          ? 'bg-teal-600 text-white border-teal-500 font-bold shadow-md shadow-teal-600/20'
                          : 'bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-slate-700'
                      }`}
                    >
                      <PieChart className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-teal-100 dark:bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Recommended
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedModule === 'mutual-funds'
                            ? 'border-teal-600 bg-teal-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-transparent'
                        }`}
                      >
                        {selectedModule === 'mutual-funds' && (
                          <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                      Mutual Funds & Wealth Building
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Learn pooled investing, NAV mechanics, SIP compounding, fund comparison, and ongoing expense ratio drag analysis.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium">5 Levels</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium">NAV Machine</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium">Fund Investigator</span>
                </div>
              </div>
            </div>

            {/* Bottom action controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>You can switch or explore other modules anytime from your Profile tab.</span>
              </span>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-600/30 active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* STEP 2: SET LEARNING PACE & GOAL                      */
          /* ==================================================== */
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-bold">
                <Target className="w-3.5 h-3.5" />
                <span>Personalize Your Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Set Your Daily Learning Habit
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Consistency beats intensity. Pick a realistic daily commitment.
              </p>
            </div>

            {/* Daily Pace Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Daily Practice Commitment</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'casual', label: 'Casual', time: '5 mins/day', desc: '1 Bite-sized Lesson' },
                  { id: 'regular', label: 'Regular', time: '10 mins/day', desc: '2 Lessons + 1 Challenge' },
                  { id: 'intense', label: 'Pro', time: '20 mins/day', desc: 'Deep Dive & Simulations' },
                ].map((p) => {
                  const isSelected = selectedPace === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPace(p.id as any)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-600 dark:border-teal-400 ring-2 ring-teal-600/20 dark:ring-teal-500/30 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850/50 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-black ${isSelected ? 'text-teal-700 dark:text-teal-300' : 'text-slate-900 dark:text-slate-200'}`}>
                          {p.label}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-teal-600 bg-teal-600 text-white'
                              : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                        </div>
                      </div>
                      <span className="block text-xs font-bold text-slate-900 dark:text-slate-100">{p.time}</span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-1">{p.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goal Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Primary Learning Goal</span>
              </label>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'basics',
                    title: 'Start From Scratch',
                    desc: 'I want to demystify financial jargon, balance sheets, and investing math without feeling overwhelmed.',
                  },
                  {
                    id: 'investing',
                    title: 'Invest Intelligently for Long-Term Wealth',
                    desc: 'I want to make sensible SIP, fund, and stock decisions based on fundamentals, not hot tips.',
                  },
                  {
                    id: 'career',
                    title: 'Build Forensic Financial & Analytical Skills',
                    desc: 'I want to dissect real corporate filings, spot red flags, and understand market dynamics.',
                  },
                ].map((g) => {
                  const isSelected = selectedGoal === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id as any)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-600 dark:border-teal-400 ring-2 ring-teal-600/20 dark:ring-teal-500/30 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850/50 shadow-xs'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className={`text-sm font-bold ${isSelected ? 'text-teal-700 dark:text-teal-300' : 'text-slate-900 dark:text-slate-100'}`}>
                          {g.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{g.desc}</p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-teal-600 bg-teal-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3.5]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary confirmation banner */}
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Ready to start in Playground:</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  {MODULE_DEFINITIONS[selectedModule].title} · Duolingo Path
                </span>
              </div>
            </div>

            {/* Back & Submit Buttons */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-800 text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-600/30 active:scale-95"
              >
                <span>Enter Playground Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-950 py-4 px-4 text-center text-[11px] text-slate-500 dark:text-slate-400">
        <span>
          FinCraft is an interactive educational simulator. All market simulations are for learning purposes only.
        </span>
      </footer>
    </div>
  );
};
