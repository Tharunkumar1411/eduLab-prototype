import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  Send,
  SkipForward,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';

interface Module01CompletionProps {
  onReturnToHome: () => void;
  onGoToPlayground: () => void;
  userXp: number;
}

export const Module01Completion: React.FC<Module01CompletionProps> = ({
  onReturnToHome,
  onGoToPlayground,
  userXp,
}) => {
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const keyIdeas = [
    {
      num: 1,
      title: 'Markets connect buyers and sellers',
      desc: 'An arrangement where willing parties meet to exchange goods, services, or financial assets.',
    },
    {
      num: 2,
      title: 'Markets can be physical or digital',
      desc: 'No bricks or physical stalls required; digital exchanges match billions in assets globally.',
    },
    {
      num: 3,
      title: 'Supply and demand influence prices',
      desc: 'Price discovery emerges from the interaction of buyers’ willingness to pay and sellers’ asking prices.',
    },
    {
      num: 4,
      title: 'The stock market trades company ownership',
      desc: 'Shares represent fractional ownership of real businesses, distinct from the physical products they make.',
    },
    {
      num: 5,
      title: 'Trades happen when orders match',
      desc: 'Exchanges never force trades; compatible buy and sell prices must cross for execution to occur.',
    },
  ];

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (reflectionText.trim()) {
      try {
        localStorage.setItem('fincraft_module_01_user_reflection', reflectionText.trim());
      } catch {
        // Ignore
      }
      setReflectionSaved(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Celebration Hero Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950/50 border-2 border-teal-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <CharacterMentor state="celebrating" size="lg" />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-xs font-bold text-teal-300 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Module 01 Complete · 100%</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
              You've discovered the market!
            </h1>

            <p className="text-sm sm:text-base text-teal-200/90 font-medium italic">
              "From mangoes to company shares, you've learned how buyers and sellers come together."
            </p>
          </div>
        </div>

        {/* XP Badge Ribbon */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm font-semibold">
          <span className="text-slate-400">Total Reward Earned:</span>
          <span className="font-mono-num text-amber-400 font-bold flex items-center gap-1.5 text-base">
            <Sparkles className="w-4 h-4" />
            +600 XP Awarded
          </span>
        </div>
      </div>

      {/* 5 Summarized Ideas */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <h2 className="text-lg font-bold text-slate-100 tracking-tight">
            5 Foundational Mental Models You Mastered:
          </h2>
        </div>

        <div className="space-y-3">
          {keyIdeas.map((idea) => (
            <div
              key={idea.num}
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80"
            >
              <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idea.num}
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-100">
                  {idea.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {idea.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open-Ended Reflection */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Final Personal Reflection</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-100">
          In your own words, what makes a market a market?
        </h3>

        {!reflectionSaved ? (
          <form onSubmit={handleSaveReflection} className="space-y-3">
            <textarea
              rows={3}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="e.g., A system where people who have something connect with people who want it, agreeing on price..."
              className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/80 transition-all"
            />
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setReflectionSaved(true)}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Skip reflection
              </button>

              <button
                type="submit"
                disabled={!reflectionText.trim()}
                className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Save Note</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {reflectionText ? 'Reflection saved to your learning journey!' : 'Reflection skipped.'}
            </span>
          </div>
        )}
      </section>

      {/* Next Module Preview */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
            Upcoming Next Quest
          </span>
          <h3 className="text-lg font-bold text-slate-100">
            Module 02: How Do Companies Make Money?
          </h3>
          <p className="text-xs text-slate-400">
            Explore revenues, expenses, operating profits, and why cash flow matters more than headline hype.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onReturnToHome}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all cursor-pointer text-center"
          >
            Home Dashboard
          </button>
          <button
            onClick={onGoToPlayground}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20"
          >
            <span>Playground Road</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
