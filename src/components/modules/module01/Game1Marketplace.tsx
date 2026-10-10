import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';

interface Game1MarketplaceProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type ChoiceId = 'keep' | 'sell' | 'throw';

export const Game1Marketplace: React.FC<Game1MarketplaceProps> = ({
  onComplete,
  onBack,
}) => {
  // Step state: 'story' -> 'discovery' -> 'reflection' -> 'completed'
  const [step, setStep] = useState<'story' | 'discovery' | 'reflection' | 'completed'>('story');
  const [selectedChoice, setSelectedChoice] = useState<ChoiceId | null>(null);

  // Reflection question state
  const [reflectionAnswer, setReflectionAnswer] = useState<'yes' | 'no' | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  const choices: { id: ChoiceId; label: string; icon: string }[] = [
    { id: 'keep', label: 'Keep all of them', icon: '🧺' },
    { id: 'sell', label: 'Find someone who wants to buy them', icon: '🤝' },
    { id: 'throw', label: 'Throw them away', icon: '🗑️' },
  ];

  const getDialogueForChoice = () => {
    switch (selectedChoice) {
      case 'sell':
        return {
          state: 'happy' as const,
          msg: "Exactly! You have something to sell, and someone else might want it. Now you just need to find each other. That's where a market comes in.",
        };
      case 'keep':
        return {
          state: 'thinking' as const,
          msg: 'You could! But what if you have more mangoes than you need, and someone nearby is looking for some? There might be a way for both of you to benefit.',
        };
      case 'throw':
        return {
          state: 'surprised' as const,
          msg: "That's one option, but wait! Someone nearby might actually want those delicious ripe mangoes. How could you find them?",
        };
      default:
        return {
          state: 'talking' as const,
          msg: "Hey! Quick question. Imagine you've grown some mangoes in your garden. You've got 20 mangoes, but you don't need all of them. What would you do?",
        };
    }
  };

  const dialogue = getDialogueForChoice();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Module Hub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="text-teal-400">Mini-Game 1 of 5</span>
          <span>·</span>
          <span>The Marketplace</span>
        </div>
      </div>

      {/* Main Game Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Mentor Character Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90">
          <CharacterMentor state={dialogue.state} size="md" />
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <span>Inspector Fin</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 normal-case">Your Financial Detective Guide</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              "{dialogue.msg}"
            </p>
          </div>
        </div>

        {/* STEP 1: Story Decision */}
        {step === 'story' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Visual scenario box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/20 via-slate-950 to-teal-950/20 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  🥭
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100">
                    Your Backyard Mango Harvest
                  </h3>
                  <p className="text-xs text-slate-400">
                    You have 20 sweet, ripe mangoes. Your family only needs 5.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-3 py-1 rounded-xl">
                15 Extra Mangoes
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                What will you do with the extra mangoes?
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {choices.map((c) => {
                  const isSelected = selectedChoice === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedChoice(c.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                        isSelected
                          ? 'bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/40 text-teal-200'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <span className="text-xs sm:text-sm font-bold mt-2">
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Action */}
            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedChoice}
                onClick={() => setStep('discovery')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:hover:bg-teal-500 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Discovery */}
        {step === 'discovery' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The Core Discovery</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                A market is an arrangement where buyers and sellers connect.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                You had 15 extra mangoes (you are the <strong>Seller</strong>). Someone in town wanted fresh mangoes (they are the <strong>Buyer</strong>).
                The market is the arrangement that brings you together so an exchange can happen!
              </p>

              {/* Simple visual flow */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2 text-amber-300">
                  <span>🥭 SELLER</span>
                </div>
                <span className="text-slate-500">→</span>
                <div className="px-3 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/50 text-teal-300 shadow-xs">
                  🏪 MARKET
                </div>
                <span className="text-slate-500">→</span>
                <div className="flex items-center gap-2 text-emerald-300">
                  <span>🛍️ BUYER</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Markets can be a bustling neighborhood street market, an app on your phone, or an electronic exchange. They can trade fresh food, personal services, or financial assets like shares.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep('reflection')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Check Your Understanding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Reflection Check */}
        {step === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Quick Reflection
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Does a market always need a physical shop?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                disabled={reflectionSubmitted}
                onClick={() => setReflectionAnswer('yes')}
                className={`p-4 rounded-2xl border text-left text-sm font-bold transition-all cursor-pointer ${
                  reflectionSubmitted && reflectionAnswer === 'yes'
                    ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                    : reflectionAnswer === 'yes'
                    ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>Yes, a market must be a real building or physical stall.</span>
              </button>

              <button
                disabled={reflectionSubmitted}
                onClick={() => setReflectionAnswer('no')}
                className={`p-4 rounded-2xl border text-left text-sm font-bold transition-all cursor-pointer ${
                  reflectionSubmitted && reflectionAnswer === 'no'
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                    : reflectionAnswer === 'no'
                    ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>No, a market can be digital, online, or any meeting system.</span>
              </button>
            </div>

            {!reflectionSubmitted ? (
              <div className="flex justify-end pt-2">
                <button
                  disabled={!reflectionAnswer}
                  onClick={() => setReflectionSubmitted(true)}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <span>Submit Answer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {reflectionAnswer === 'no'
                      ? 'Spot on! You nailed it.'
                      : 'Almost! Let’s clarify:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A market is simply any arrangement where buyers and sellers can interact. It does not require bricks, mortar, or a physical shop. Today, billions of rupees in goods and financial assets are traded on digital networks!
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setStep('completed');
                      onComplete(100);
                    }}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Complete Mini-Game 1 (+100 XP)</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Completed State */}
        {step === 'completed' && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
            <span className="text-4xl">🎉</span>
            <h3 className="text-xl font-bold text-slate-100">
              Mini-Game 1 Completed!
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You’ve unlocked the first mental model: <strong>A market connects buyers and sellers anywhere they can agree on an exchange.</strong>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>+100 XP Earned</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Return to Module 01 Stages</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
