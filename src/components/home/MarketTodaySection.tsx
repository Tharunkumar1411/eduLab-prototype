import React from 'react';
import { ArrowRight, HelpCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { TODAY_MARKET_INDEXES, MarketIndex } from '../../data/homeData.ts';

interface MarketTodaySectionProps {
  onExploreMarket: () => void;
}

export const MarketTodaySection: React.FC<MarketTodaySectionProps> = ({
  onExploreMarket,
}) => {
  return (
    <section aria-labelledby="market-today-heading" className="w-full space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">📈</span>
          <h2 id="market-today-heading" className="text-lg font-bold text-slate-100 tracking-tight">
            Market Today
          </h2>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-400 font-medium">Major Indexes</span>
        </div>

        <button
          onClick={onExploreMarket}
          className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer py-1"
        >
          <span>Why did the market move?</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Index Card Container - Clean, uncrowded, beginner-friendly */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {TODAY_MARKET_INDEXES.map((idx, i) => (
            <div
              key={idx.id}
              className={`flex items-center justify-between sm:flex-col sm:items-start gap-1 ${
                i > 0 ? 'pt-2.5 sm:pt-0 sm:pl-4' : ''
              }`}
            >
              <div>
                <span className="text-xs font-bold text-slate-300 tracking-wide block">
                  {idx.name}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-slate-100 font-mono-num">
                  {idx.value}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:mt-1">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-mono-num font-bold px-2 py-0.5 rounded-md ${
                    idx.isPositive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {idx.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-rose-400" />
                  )}
                  <span>{idx.change}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet footer with explore CTA */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p className="line-clamp-1">
            IT and private banks led gains; indexes measure overall market direction.
          </p>
          <button
            onClick={onExploreMarket}
            className="self-start sm:self-auto min-h-[36px] px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-teal-300 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Explore movement</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
