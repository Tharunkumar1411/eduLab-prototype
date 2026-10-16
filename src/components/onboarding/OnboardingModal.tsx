import React, { useState } from 'react';
import {
  LearningModuleId,
  MODULE_DEFINITIONS,
} from '../../data/learningModules.ts';
import {
  TrendingUp,
  PieChart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Compass,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { AppLogo } from '../common/AppLogo.tsx';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (selectedModuleId: LearningModuleId) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  onClose,
}) => {
  const [selectedModule, setSelectedModule] = useState<LearningModuleId>('stocks');
  const [selectedPace, setSelectedPace] = useState<'casual' | 'regular' | 'intense'>('regular');
  const [selectedGoal, setSelectedGoal] = useState<'basics' | 'investing' | 'career'>('investing');
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handleFinish = () => {
    try {
      localStorage.setItem('fincraft_onboarded_v1', 'true');
    } catch {
      // ignore storage access errors
    }
    onComplete(selectedModule);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-100 my-auto">
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {step === 1 ? (
          /* Step 1: Select Starting Module */
          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-1">
                <AppLogo size="lg" withGlow />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Welcome to FinCraft</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Choose Your Starting Path
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Select your focus module to begin. You will jump straight onto our Duolingo-style learning path with bite-sized lessons and interactive cases.
              </p>
            </div>

            {/* Module Selection Cards */}
            <div className="space-y-3">
              {/* Option 1: Stocks & Equity */}
              <div
                onClick={() => setSelectedModule('stocks')}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-150 flex items-start gap-4 ${
                  selectedModule === 'stocks'
                    ? 'bg-teal-500/15 border-teal-400 ring-2 ring-teal-500/30 shadow-lg shadow-teal-950/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    selectedModule === 'stocks'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                      : 'bg-slate-900 text-emerald-400 border-slate-800'
                  }`}
                >
                  <TrendingUp className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-white">
                        Stocks & Equity Markets
                      </h3>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedModule === 'stocks'
                          ? 'border-teal-400 bg-teal-400 text-slate-950'
                          : 'border-slate-600 bg-transparent'
                      }`}
                    >
                      {selectedModule === 'stocks' && (
                        <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    Master corporate fundamentals, balance sheets, ratios, and solve corporate forensic crime cases.
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-teal-300/90 font-medium">
                    <span>• 4 Progressive Units</span>
                    <span>• 13 Bite-sized Lessons</span>
                    <span>• Interactive Cases</span>
                  </div>
                </div>
              </div>

              {/* Option 2: Mutual Funds */}
              <div
                onClick={() => setSelectedModule('mutual-funds')}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-150 flex items-start gap-4 ${
                  selectedModule === 'mutual-funds'
                    ? 'bg-teal-500/15 border-teal-400 ring-2 ring-teal-500/30 shadow-lg shadow-teal-950/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    selectedModule === 'mutual-funds'
                      ? 'bg-teal-400 text-slate-950 border-teal-300 font-bold'
                      : 'bg-slate-900 text-teal-400 border-slate-800'
                  }`}
                >
                  <PieChart className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-white">
                        Mutual Funds & Wealth Building
                      </h3>
                      <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedModule === 'mutual-funds'
                          ? 'border-teal-400 bg-teal-400 text-slate-950'
                          : 'border-slate-600 bg-transparent'
                      }`}
                    >
                      {selectedModule === 'mutual-funds' && (
                        <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    Learn pooled investing, NAV mechanics, SIP compounding, fund comparison, and fee drag analysis.
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-teal-300/90 font-medium">
                    <span>• 5 Progressive Levels</span>
                    <span>• NAV & SIP Machines</span>
                    <span>• Fund Investigator</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>You can switch anytime in your Profile tab</span>
              </span>

              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Goal & Pace Personalization */
          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold">
                <Target className="w-3.5 h-3.5" />
                <span>Personalize Your Journey</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Set Your Learning Pace
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Small consistent daily actions build strong financial intuition.
              </p>
            </div>

            {/* Daily Pace Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>Daily Practice Commitment</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'casual', label: 'Casual', time: '5 mins/day', xp: '1 Lesson' },
                  { id: 'regular', label: 'Regular', time: '10 mins/day', xp: '2 Lessons' },
                  { id: 'intense', label: 'Pro', time: '20 mins/day', xp: 'Deep dive' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPace(p.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedPace === p.id
                        ? 'bg-teal-500/20 border-teal-400 text-white shadow-xs'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block text-xs font-extrabold">{p.label}</span>
                    <span className="block text-[11px] text-teal-300 font-semibold mt-0.5">{p.time}</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">{p.xp}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-teal-400" />
                <span>Primary Goal</span>
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'basics',
                    title: 'Start From Scratch',
                    desc: 'I want to understand financial jargon without feeling overwhelmed',
                  },
                  {
                    id: 'investing',
                    title: 'Start Investing Intelligently',
                    desc: 'I want to make sensible SIP & stock decisions based on numbers, not tips',
                  },
                  {
                    id: 'career',
                    title: 'Build Forensic Financial Skills',
                    desc: 'I want to analyze financial statements and spot red flags',
                  },
                ].map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id as any)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      selectedGoal === g.id
                        ? 'bg-teal-500/15 border-teal-400'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{g.title}</h4>
                      <p className="text-[11px] text-slate-400">{g.desc}</p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedGoal === g.id
                          ? 'border-teal-400 bg-teal-400 text-slate-950'
                          : 'border-slate-600'
                      }`}
                    >
                      {selectedGoal === g.id && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary confirmation */}
            <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block">Starting Path:</span>
                <span className="font-bold text-teal-300">
                  {MODULE_DEFINITIONS[selectedModule].title} · Playground
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/25"
              >
                <span>Enter Playground Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
