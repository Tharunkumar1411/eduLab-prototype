import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';

interface Game3PriceDiscoveryProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

export const Game3PriceDiscovery: React.FC<Game3PriceDiscoveryProps> = ({
  onComplete,
  onBack,
}) => {
  // Sub-stages: 'exp_a' -> 'exp_b' -> 'slider' -> 'concept' -> 'reflection' -> 'completed'
  const [subStage, setSubStage] = useState<'exp_a' | 'exp_b' | 'slider' | 'concept' | 'reflection' | 'completed'>('exp_a');

  // Experiment A state
  const [ansExpA, setAnsExpA] = useState<number | null>(null);
  const [submittedA, setSubmittedA] = useState<boolean>(false);

  // Experiment B state
  const [ansExpB, setAnsExpB] = useState<number | null>(null);
  const [submittedB, setSubmittedB] = useState<boolean>(false);

  // Price Slider state
  const [testPrice, setTestPrice] = useState<number>(30); // ₹10, ₹20, ₹30, ₹40, ₹50

  // Reflection
  const [reflectionAnswer, setReflectionAnswer] = useState<'yes' | 'no' | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  // Predefined deterministic responses for slider
  const getSliderOutcome = (price: number) => {
    switch (price) {
      case 10:
        return {
          buyersCount: 18,
          salesOutcome: 'High buyer stampede! Sold out quickly, but you might have priced below what buyers were willing to pay.',
          badge: 'High Demand · Low Price',
        };
      case 20:
        return {
          buyersCount: 12,
          salesOutcome: 'Strong demand! Most mangoes sold quickly with solid cash earned.',
          badge: 'Balanced Volume',
        };
      case 30:
        return {
          buyersCount: 7,
          salesOutcome: 'Moderate demand. Matches normal market appetite, selling 7 mangoes at fair profit.',
          badge: 'Market Equilibrium',
        };
      case 40:
        return {
          buyersCount: 3,
          salesOutcome: 'Only 3 wealthy buyers willing to pay. Several ripe mangoes remain unsold on the table.',
          badge: 'Low Demand · High Margin',
        };
      case 50:
      default:
        return {
          buyersCount: 1,
          salesOutcome: 'Almost everyone walked away. Only 1 buyer purchased; 14 mangoes risk spoiling.',
          badge: 'Excess Inventory',
        };
    }
  };

  const sliderOutcome = getSliderOutcome(testPrice);

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
          <span className="text-teal-400">Mini-Game 3 of 5</span>
          <span>·</span>
          <span>Who Decides the Price?</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* SUBSTAGE 1: Experiment A (High Supply, Low Demand) */}
        {subStage === 'exp_a' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Experiment A: Plenty of Mangoes
              </span>

              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="flex items-center gap-2 text-amber-300">
                  <span>🥭 Supply: 20 mangoes on the stall</span>
                </span>
                <span className="flex items-center gap-2 text-slate-300">
                  <span>👥 Demand: Only 3 interested buyers</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-medium pt-1">
                If buyers have plenty of options and there are lots of mangoes available, what might happen to the price?
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 1,
                  text: 'The seller may need to lower the price to attract buyers before mangoes spoil.',
                  isCorrect: true,
                },
                {
                  id: 2,
                  text: 'The price must automatically double every hour.',
                  isCorrect: false,
                },
                {
                  id: 3,
                  text: 'Prices can never change once printed on a card.',
                  isCorrect: false,
                },
              ].map((opt) => {
                const isSelected = ansExpA === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={submittedA}
                    onClick={() => setAnsExpA(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                      submittedA
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

            {!submittedA ? (
              <div className="flex justify-end pt-2">
                <button
                  disabled={!ansExpA}
                  onClick={() => setSubmittedA(true)}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <span>Check Insight</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  When supply is abundant and buyers are scarce, sellers often face downward pressure on price to encourage more purchases.
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setSubStage('exp_b')}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Next: Experiment B</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBSTAGE 2: Experiment B (Low Supply, High Demand) */}
        {subStage === 'exp_b' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Experiment B: Very Few Mangoes
              </span>

              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="flex items-center gap-2 text-rose-300">
                  <span>🥭 Supply: Only 3 mangoes left!</span>
                </span>
                <span className="flex items-center gap-2 text-amber-300">
                  <span>👥 Demand: 20 eager buyers crowded around</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-medium pt-1">
                If many buyers compete for only 3 remaining mangoes, what could happen to the price?
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 1,
                  text: 'Buyers might compete, creating upward pressure on the price.',
                  isCorrect: true,
                },
                {
                  id: 2,
                  text: 'The price is guaranteed to drop to zero automatically.',
                  isCorrect: false,
                },
                {
                  id: 3,
                  text: 'All 20 buyers will definitely share a single mango.',
                  isCorrect: false,
                },
              ].map((opt) => {
                const isSelected = ansExpB === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={submittedB}
                    onClick={() => setAnsExpB(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                      submittedB
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

            {!submittedB ? (
              <div className="flex justify-end pt-2">
                <button
                  disabled={!ansExpB}
                  onClick={() => setSubmittedB(true)}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <span>Check Insight</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  When many buyers compete for a limited quantity, willing buyers may offer higher prices to secure what they want.
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setSubStage('slider')}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Next: Interactive Price Slider</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBSTAGE 3: Interactive Price Slider Experiment */}
        {subStage === 'slider' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                Interactive Experiment: Test Different Prices
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Adjust your mango price and observe customer demand:
              </h3>
            </div>

            {/* Slider Controls */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Your Asking Price:</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono-num text-teal-300">
                  ₹{testPrice}
                </span>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="10"
                  value={testPrice}
                  onChange={(e) => setTestPrice(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono-num text-slate-500">
                  <span>₹10 (Budget)</span>
                  <span>₹20</span>
                  <span>₹30 (Standard)</span>
                  <span>₹40</span>
                  <span>₹50 (Premium)</span>
                </div>
              </div>

              {/* Dynamic Outcome Display */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/90 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">
                    Buyers Interested: {sliderOutcome.buyersCount} people
                  </span>
                  <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
                    {sliderOutcome.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {sliderOutcome.salesOutcome}
                </p>
              </div>

              <p className="text-[11px] text-slate-500 italic text-center">
                *Simplified educational model illustrating how price sensitivity and buyer willingness interact.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSubStage('concept')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Understand Price Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SUBSTAGE 4: Concept Reveal */}
        {subStage === 'concept' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The Core Discovery</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                Supply, Demand, and "Price Discovery"
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Prices are rarely decided by a single person in isolation. Instead, they emerge from the continuous interaction of two forces:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300">📦 Supply</span>
                  <p className="text-slate-400 text-xs">
                    How much sellers are willing and able to offer at various prices.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-teal-300">👥 Demand</span>
                  <p className="text-slate-400 text-xs">
                    How much buyers are willing and able to purchase at various prices.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Key Concept: Price Discovery
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong>Price discovery</strong> is the ongoing process through which buyers and sellers interact in a market to establish the prices at which transactions can actually happen.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSubStage('reflection')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Check Your Understanding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SUBSTAGE 5: Reflection */}
        {subStage === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Quick Reflection
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                If many people want something but very little of it is available, could that put upward pressure on its price?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                disabled={reflectionSubmitted}
                onClick={() => setReflectionAnswer('yes')}
                className={`p-4 rounded-2xl border text-left text-sm font-bold transition-all cursor-pointer ${
                  reflectionSubmitted && reflectionAnswer === 'yes'
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                    : reflectionAnswer === 'yes'
                    ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>Yes, eager buyers competing often bid prices up.</span>
              </button>

              <button
                disabled={reflectionSubmitted}
                onClick={() => setReflectionAnswer('no')}
                className={`p-4 rounded-2xl border text-left text-sm font-bold transition-all cursor-pointer ${
                  reflectionSubmitted && reflectionAnswer === 'no'
                    ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                    : reflectionAnswer === 'no'
                    ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>No, prices are fixed by law and never shift.</span>
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
                    {reflectionAnswer === 'yes'
                      ? 'Spot on! All else being equal, competition creates upward price pressure.'
                      : 'Almost! Let’s clarify:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  When high demand meets limited supply, buyers compete against one another, placing upward pressure on the price. While actual prices depend on many real-world factors, supply and demand are the foundational starting point!
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setSubStage('completed');
                      onComplete(150);
                    }}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Complete Mini-Game 3 (+150 XP)</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBSTAGE 6: Completed */}
        {subStage === 'completed' && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
            <span className="text-4xl">🎉</span>
            <h3 className="text-xl font-bold text-slate-100">
              Mini-Game 3 Completed!
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You’ve mastered <strong>supply, demand, and price discovery</strong>. Next, let’s leave the mango stall and discover a market without a physical shop!
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
