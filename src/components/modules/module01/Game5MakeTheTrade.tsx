import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';

interface Game5MakeTheTradeProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

export const Game5MakeTheTrade: React.FC<Game5MakeTheTradeProps> = ({
  onComplete,
  onBack,
}) => {
  const [step, setStep] = useState<'trade' | 'matched' | 'concept' | 'reflection' | 'completed'>('trade');

  // Trade matching state
  const sellerAskingPrice = 105;
  const [buyerOffer, setBuyerOffer] = useState<number>(100);
  const isMatch = buyerOffer >= sellerAskingPrice;

  // Reflection
  const [reflectionAnswer, setReflectionAnswer] = useState<number | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  const getMentorDialogue = () => {
    if (isMatch) {
      return {
        state: 'celebrating' as const,
        msg: "Deal! The buyer's offer (₹105) now matches the seller's asking price. The exchange matches them and executes the trade!",
      };
    }
    return {
      state: 'thinking' as const,
      msg: `The buyer is offering ₹${buyerOffer}, but the seller insists on ₹${sellerAskingPrice}. No trade yet—they haven't agreed on a compatible price!`,
    };
  };

  const mentorDialogue = getMentorDialogue();

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
          <span className="text-teal-400">Mini-Game 5 of 5</span>
          <span>·</span>
          <span>Make the Trade</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* STEP 1: Trade Matching Interaction */}
        {step === 'trade' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header of instrument */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  🏢
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    Sunny Foods Ltd. (1 Share)
                  </h3>
                  <span className="text-xs text-slate-400">
                    Simplified Electronic Order Book
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono-num font-bold text-teal-300 bg-teal-950/60 border border-teal-500/30 px-2.5 py-1 rounded-lg">
                Pending Match
              </span>
            </div>

            {/* Seller and Buyer Display Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Buyer Side */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isMatch
                    ? 'bg-emerald-950/30 border-emerald-500/80 shadow-md shadow-emerald-950/30'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-teal-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                  <span>Buyer (You)</span>
                  <span>Buy Order</span>
                </div>
                <div className="pt-3 space-y-2">
                  <span className="text-xs text-slate-400">Your Bid (Offer):</span>
                  <div className="text-3xl font-extrabold font-mono-num text-slate-100">
                    ₹{buyerOffer}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    "I am willing to pay at most ₹{buyerOffer} for 1 share."
                  </p>
                </div>
              </div>

              {/* Seller Side */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isMatch
                    ? 'bg-emerald-950/30 border-emerald-500/80 shadow-md shadow-emerald-950/30'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                  <span>Seller (Shareholder)</span>
                  <span>Sell Order</span>
                </div>
                <div className="pt-3 space-y-2">
                  <span className="text-xs text-slate-400">Asking Price:</span>
                  <div className="text-3xl font-extrabold font-mono-num text-amber-300">
                    ₹{sellerAskingPrice}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    "I will not sell for a single paisa less than ₹105."
                  </p>
                </div>
              </div>
            </div>

            {/* Price Gap / Match Alert */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                isMatch
                  ? 'bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{isMatch ? '🎉' : '⏳'}</span>
                <span className="text-xs sm:text-sm font-bold">
                  {isMatch
                    ? 'Orders Match! Trade can now execute at ₹105.'
                    : `Gap between Buyer and Seller: ₹${sellerAskingPrice - buyerOffer}`}
                </span>
              </div>
              {isMatch && (
                <span className="text-xs font-bold font-mono-num text-emerald-300 bg-emerald-900/60 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                  TRADE EXECUTED
                </span>
              )}
            </div>

            {/* Interactive Bid Adjustment Controls */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Adjust Buyer's Offer (Bid):
                </span>
                <span className="text-xs font-bold font-mono-num text-teal-400">
                  Target: ₹105
                </span>
              </div>

              {/* Slider & Quick Buttons */}
              <div className="space-y-3">
                <input
                  type="range"
                  min="100"
                  max="105"
                  step="1"
                  value={buyerOffer}
                  onChange={(e) => setBuyerOffer(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="grid grid-cols-6 gap-1.5">
                  {[100, 101, 102, 103, 104, 105].map((price) => (
                    <button
                      key={price}
                      onClick={() => setBuyerOffer(price)}
                      className={`py-2 rounded-xl text-xs font-bold font-mono-num border transition-all cursor-pointer ${
                        buyerOffer === price
                          ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      ₹{price}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action to proceed when matched */}
            <div className="flex justify-end pt-2">
              <button
                disabled={!isMatch}
                onClick={() => setStep('concept')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:hover:bg-teal-500 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Understand Order Matching</span>
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
                How Electronic Stock Trades Happen
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                When you click "Buy" or "Sell" in a stock app, you aren't buying from the app itself. The exchange software matches compatible buyers and sellers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-teal-300">🛒 Buy Order (Bid)</span>
                  <p className="text-slate-400 text-xs">
                    Expresses an intention to buy shares up to a maximum price.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300">🏷️ Sell Order (Ask)</span>
                  <p className="text-slate-400 text-xs">
                    Expresses an intention to sell shares down to a minimum price.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                <p>
                  • <strong>Matching:</strong> Compatible orders match according to exchange priority rules.
                </p>
                <p>
                  • <strong>No Match:</strong> If prices don't cross (e.g. buyer offers ₹100, seller wants ₹105), the orders simply wait in the system until compatible offers arrive.
                </p>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                *Simplified educational demonstration. Real exchanges feature deep multi-level order books, matching algorithms, transaction fees, and regulatory clearing rules.
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
                Final Reflection
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Two people want to trade a share. The buyer offers ₹100, but the seller wants ₹105. What happens?
              </h3>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 1,
                  text: 'The trade must happen immediately at the average price.',
                  isCorrect: false,
                },
                {
                  id: 2,
                  text: 'The trade may not happen until compatible orders become available on agreeable terms.',
                  isCorrect: true,
                },
                {
                  id: 3,
                  text: 'The stock exchange automatically forces the seller to surrender the share for ₹100.',
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
                    {reflectionAnswer === 2
                      ? 'Spot on! Trades only execute when orders agree.'
                      : 'Almost! Let’s clarify:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The exchange never forces anyone to trade against their stated prices. Orders wait until a buyer increases their bid, a seller lowers their ask, or another trader enters the market with a matching price!
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setStep('completed');
                      onComplete(150);
                    }}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Finish Module 01 (+150 XP)</span>
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
            <span className="text-4xl">🏆</span>
            <h3 className="text-xl font-bold text-slate-100">
              Mini-Game 5 Completed!
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You've now mastered the complete journey: from mango exchanges to modern electronic share orders!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>+150 XP Earned</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>View Module Completion Celebration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
