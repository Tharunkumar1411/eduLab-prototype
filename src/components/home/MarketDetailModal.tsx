import React from 'react';
import { ArrowRight, HelpCircle, Info, TrendingDown, TrendingUp, X } from 'lucide-react';
import { TODAY_MARKET_INDEXES, MarketIndex } from '../../data/homeData.ts';

interface MarketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketDetailModal: React.FC<MarketDetailModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="market-modal-title"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <span>📈 Educational Breakdown</span>
            </div>
            <h2 id="market-modal-title" className="text-xl sm:text-2xl font-bold text-slate-100">
              Why Did the Market Move Today?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close market breakdown"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. What is an Index? (Zero Jargon) */}
        <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-1.5">
          <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-teal-400" />
            <span>Mental Model: What is an Index?</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            Think of an index like the <strong>average room temperature</strong> of the market. You cannot buy the entire ocean at once, so the exchange bundles the 50 largest companies (NIFTY 50) to show the general direction of economic sentiment.
          </p>
        </div>

        {/* 2. Today's Index Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Today's Movement Drivers
          </h3>
          <div className="space-y-2.5">
            {TODAY_MARKET_INDEXES.map((idx) => (
              <div
                key={idx.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100 text-sm">{idx.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-num text-xs text-slate-300 font-medium">{idx.value}</span>
                    <span
                      className={`text-xs font-mono-num font-bold px-2 py-0.5 rounded-md ${
                        idx.isPositive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {idx.change}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {idx.todayDriver}
                </p>
                <p className="text-[11px] text-slate-400 italic">
                  💡 {idx.educationalTakeaway}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. The Golden Beginner Rule */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-1">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
            ⭐ The Golden Rule for Beginners
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            "In the short run, the market is an emotional voting machine; in the long run, it is a weighing machine." Daily point changes represent temporary trader sentiment, while 5-year wealth comes from real company profits.
          </p>
        </div>

        {/* Transparent Disclaimer */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Educational sample indexes for FinCraft learning. Real-time exchange feed connects in production.</span>
        </div>

        {/* Dismiss Button */}
        <div>
          <button
            onClick={onClose}
            className="w-full min-h-[44px] py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            Got it, back to learning
          </button>
        </div>
      </div>
    </div>
  );
};
