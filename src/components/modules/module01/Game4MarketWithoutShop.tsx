import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';

interface Game4MarketWithoutShopProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type ItemId = 'mangoes' | 'bicycle' | 'shares';

export const Game4MarketWithoutShop: React.FC<Game4MarketWithoutShopProps> = ({
  onComplete,
  onBack,
}) => {
  const [step, setStep] = useState<'intro' | 'choice' | 'visual' | 'reflection' | 'completed'>('intro');
  const [selectedItemId, setSelectedItemId] = useState<ItemId | null>(null);

  // Reflection
  const [reflectionAnswer, setReflectionAnswer] = useState<'yes' | 'no' | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  const items = [
    {
      id: 'mangoes' as const,
      icon: '🥭',
      name: 'Fresh Mangoes',
      description: 'Physical agricultural fruit grown in a garden or farm.',
      isStockMarket: false,
      feedback:
        "Mangoes are traded in fruit and commodity markets, not on a stock exchange!",
    },
    {
      id: 'bicycle' as const,
      icon: '🚲',
      name: 'A Bicycle',
      description: 'A physical manufactured transport vehicle.',
      isStockMarket: false,
      feedback:
        "A bicycle is sold in retail bicycle shops, not on a stock exchange!",
    },
    {
      id: 'shares' as const,
      icon: '📜',
      name: 'Shares in Sunny Foods Ltd.',
      description: 'Units of fractional legal ownership in a food company.',
      isStockMarket: true,
      feedback:
        "Spot on! Shares represent fractional ownership in a business and are traded on organized stock exchanges.",
    },
  ];

  const selectedItem = items.find((i) => i.id === selectedItemId);

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
          <span className="text-teal-400">Mini-Game 4 of 5</span>
          <span>·</span>
          <span>A Market Without a Shop</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* STEP 1: Introduction to Sunny Foods */}
        {step === 'intro' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Transition animation visual */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-teal-950/20 to-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏪 ➔ 💻</span>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  The Digital Transformation
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Meet "Sunny Foods"
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine a flourishing company called <strong>Sunny Foods</strong>. It makes fruit juices, jams, and snacks.
                Instead of being owned by just one person, Sunny Foods is divided into thousands of small pieces of ownership called <strong>shares</strong>.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <span className="text-lg">💡</span>
                <span>
                  <strong>A share represents a unit of ownership in that company.</strong> When you own shares, you own a piece of the business!
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep('choice')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Which item trades on a stock market?</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Interactive Choice */}
        {step === 'choice' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Select the eligible item:
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Which of these could people trade through an organized stock market?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {items.map((it) => {
                const isSelected = selectedItemId === it.id;
                return (
                  <button
                    key={it.id}
                    onClick={() => setSelectedItemId(it.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[130px] ${
                      isSelected
                        ? it.isStockMarket
                          ? 'bg-emerald-950/50 border-emerald-500 shadow-md shadow-emerald-950/30'
                          : 'bg-amber-950/40 border-amber-500/70'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-3xl">{it.icon}</span>
                      <h4 className="text-sm font-bold text-slate-100 mt-2">
                        {it.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {it.description}
                      </p>
                    </div>

                    {isSelected && (
                      <span
                        className={`text-xs font-bold mt-2 pt-2 border-t border-slate-800/80 ${
                          it.isStockMarket ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {it.feedback}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedItem?.isStockMarket}
                onClick={() => setStep('visual')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:hover:bg-teal-500 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Visual Comparison */}
        {step === 'visual' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The Core Discovery</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                Ordinary Marketplace vs. Stock Market
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Stock exchanges are organized marketplaces where eligible financial securities are traded under strict rules. Notice how the fundamental structure is identical:
              </p>

              {/* Side by Side Comparison Diagrams */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Ordinary Marketplace (e.g. Mangoes, Groceries)
                  </span>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold pt-1">
                    <span className="text-amber-300">SELLER (Farmer)</span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200">PHYSICAL GOODS</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-300">BUYER (Consumer)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-teal-500/40 space-y-1.5">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                    Stock Market (e.g. NSE / BSE)
                  </span>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold pt-1">
                    <span className="text-amber-300">SELLER (Shareholder)</span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300">COMPANY SHARES</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-300">BUYER (Investor)</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <strong>Crucial distinction:</strong> A stock market is NOT where companies sell boxes of snacks or soap to shoppers. It is a market where people buy and sell ownership units (shares) of the companies themselves!
              </div>
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

        {/* STEP 4: Reflection */}
        {step === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Quick Reflection
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Does buying a share in Sunny Foods mean you are buying a box of the company's snacks?
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
                <span>Yes, you receive a box of products in the mail.</span>
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
                <span>No, you own a piece of the company itself, not its products.</span>
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
                      ? 'Spot on! That is an essential mental model.'
                      : 'Almost! Let’s clarify:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Buying a share makes you a part-owner of the enterprise. If you want snacks, you buy them at the grocery store; if you want to participate in the business’s financial future, you buy shares on the stock exchange!
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setStep('completed');
                      onComplete(100);
                    }}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Complete Mini-Game 4 (+100 XP)</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Completed */}
        {step === 'completed' && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
            <span className="text-4xl">🎉</span>
            <h3 className="text-xl font-bold text-slate-100">
              Mini-Game 4 Completed!
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Now that you understand that the <strong>stock market trades shares of ownership</strong>, let’s see how a real order gets matched and executed!
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
