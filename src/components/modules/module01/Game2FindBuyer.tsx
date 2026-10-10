import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';

interface Game2FindBuyerProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type CustomerId = 'customer_a' | 'customer_b' | 'customer_c';

export const Game2FindBuyer: React.FC<Game2FindBuyerProps> = ({
  onComplete,
  onBack,
}) => {
  const [step, setStep] = useState<'match' | 'concept' | 'reflection' | 'completed'>('match');
  const [selectedCustomerId, setSelectedCustomerId] = useState<CustomerId | null>(null);

  // Reflection
  const [reflectionAnswer, setReflectionAnswer] = useState<number | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  const customers = [
    {
      id: 'customer_a' as const,
      name: 'Customer A (Priya)',
      avatar: '👩',
      needs: 'Wants 5 sweet mangoes for dessert.',
      budget: 'Happy to pay the ₹30/mango asking price.',
      isMatch: true,
      feedback:
        "Deal! You found someone who wanted what you had to offer at acceptable terms. Both of you walk away happy!",
    },
    {
      id: 'customer_b' as const,
      name: 'Customer B (Rohan)',
      avatar: '👨',
      needs: 'Looking to buy leather dress shoes.',
      budget: 'Has ₹1,500 cash in his pocket.',
      isMatch: false,
      feedback:
        "Not quite. Rohan has money, but he doesn't want mangoes! A transaction needs a buyer whose needs match your product.",
    },
    {
      id: 'customer_c' as const,
      name: 'Customer C (Aarav)',
      avatar: '🧑',
      needs: 'Loves mangoes and wants 10 of them.',
      budget: 'Only willing to pay ₹10/mango (refuses ₹30 asking price).',
      isMatch: false,
      feedback:
        "You're close! Aarav wants mangoes, but you haven't agreed on the price yet. A trade only happens when both sides agree on terms.",
    },
  ];

  const activeCustomer = customers.find((c) => c.id === selectedCustomerId);

  const getMentorState = () => {
    if (!activeCustomer) return { state: 'talking' as const, msg: "Nice! You've got your mangoes ready. But there's one small problem: you don't know who wants to buy them." };
    if (activeCustomer.isMatch) return { state: 'celebrating' as const, msg: activeCustomer.feedback };
    return { state: 'thinking' as const, msg: activeCustomer.feedback };
  };

  const mentorInfo = getMentorState();

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
          <span className="text-teal-400">Mini-Game 2 of 5</span>
          <span>·</span>
          <span>Find a Buyer</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Mentor Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90">
          <CharacterMentor state={mentorInfo.state} size="md" />
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <span>Inspector Fin</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 normal-case">Matchmaking in the Market</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              "{mentorInfo.msg}"
            </p>
          </div>
        </div>

        {/* STEP 1: Matching Interaction */}
        {step === 'match' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Seller Stall Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏪</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    Your Mango Stall
                  </h3>
                  <p className="text-xs text-slate-400">
                    Offering: Fresh Garden Mangoes · Asking Price: <strong>₹30 each</strong>
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono-num text-teal-300 font-bold bg-teal-950/50 border border-teal-500/30 px-3 py-1 rounded-xl">
                Looking for a compatible buyer
              </span>
            </div>

            {/* Potential Customers */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Three people walk past your stall. Who can you complete a trade with?
              </span>

              <div className="space-y-2.5">
                {customers.map((c) => {
                  const isSelected = selectedCustomerId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCustomerId(c.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? c.isMatch
                            ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/30'
                            : 'bg-amber-950/30 border-amber-500/70'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                          {c.avatar}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-100">
                            {c.name}
                          </h4>
                          <p className="text-xs text-slate-300">
                            {c.needs}
                          </p>
                          <p className="text-[11px] text-slate-400 italic mt-0.5">
                            {c.budget}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold">
                          {c.isMatch ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              Compatible!
                            </span>
                          ) : (
                            <span className="text-amber-400">
                              Try another
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Action */}
            <div className="flex justify-end pt-2">
              <button
                disabled={!activeCustomer?.isMatch}
                onClick={() => setStep('concept')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:hover:bg-teal-500 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Concept Reveal */}
        {step === 'concept' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The Core Discovery</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                A trade becomes possible when both sides agree on terms.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Markets connect buyers and sellers, but they don't force a transaction. A trade requires two critical conditions:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300">1. Mutual Need & Desire</span>
                  <p className="text-slate-400 text-xs">
                    The buyer must actually want what the seller has (Rohan wanted shoes, not mangoes).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300">2. Agreement on Terms</span>
                  <p className="text-slate-400 text-xs">
                    Both sides must agree on the price (Aarav wanted mangoes, but his ₹10 bid was too low).
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                That is why markets don't guarantee that every seller sells everything immediately. It takes compatible terms!
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
                Why couldn't the mango seller automatically sell every single mango immediately?
              </h3>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 1,
                  text: 'Because sellers need buyers who want the mangoes AND are willing to agree on acceptable terms.',
                  isCorrect: true,
                },
                {
                  id: 2,
                  text: 'Because government laws forbid selling more than 5 pieces of fruit per day.',
                  isCorrect: false,
                },
                {
                  id: 3,
                  text: 'Because buyers can only trade if they know the seller personally.',
                  isCorrect: false,
                },
              ].map((opt) => {
                const isSelected = reflectionAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={reflectionSubmitted}
                    onClick={() => setReflectionAnswer(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                      reflectionSubmitted
                        ? opt.isCorrect
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold'
                          : isSelected
                          ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                        : isSelected
                        ? 'bg-teal-950/60 border-teal-500 text-teal-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{opt.text}</span>
                  </button>
                );
              })}
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
                    {reflectionAnswer === 1
                      ? 'Spot on! That is the heart of a market.'
                      : 'Not quite. Here is the insight:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A trade requires a willing buyer, a willing seller, and a mutually acceptable price. Having goods to sell is only half the equation!
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setStep('completed');
                      onComplete(100);
                    }}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Complete Mini-Game 2 (+100 XP)</span>
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
              Mini-Game 2 Completed!
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You’ve learned that <strong>markets connect willing parties on agreeable terms</strong>. Now, let’s see what happens to the price!
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
