import React from 'react';
import { ArrowUpRight, ArrowDownRight, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { TODAY_MARKET_INDEXES, MarketIndex } from '../../data/homeData.ts';

interface MarketTickerChipsProps {
  onExploreMarket: () => void;
}

export const MarketTickerChips: React.FC<MarketTickerChipsProps> = ({ onExploreMarket }) => {
  // Duplicate list twice for seamless infinite marquee loop
  const tickerItems = [...TODAY_MARKET_INDEXES, ...TODAY_MARKET_INDEXES];

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-slate-900/60 hover:bg-slate-900/80 border border-slate-800 transition-colors shadow-xs group">
      <div className="flex items-center">
        {/* Left Fixed Badge: Market Pulse */}
        <div className="shrink-0 z-10 flex items-center gap-2 pl-3.5 pr-3 py-2 bg-slate-900/90 border-r border-slate-800/80 text-[11px] font-bold text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-tight whitespace-nowrap">Market Today</span>
        </div>

        {/* Marquee Track Container with gradient fade edges */}
        <div className="relative flex-1 overflow-hidden py-1.5">
          {/* Subtle edge fade overlays */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-900/80 to-transparent z-[5]" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900/80 to-transparent z-[5]" />

          {/* Running Chips Track */}
          <div className="animate-ticker-marquee flex items-center gap-2.5 px-3">
            {tickerItems.map((index, idx) => (
              <button
                key={`${index.id}-${idx}`}
                onClick={onExploreMarket}
                className="shrink-0 flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800/90 hover:border-teal-500/40 text-xs transition-all cursor-pointer shadow-xs group/chip"
                title={`${index.name}: ${index.value} (${index.change}) — Click to explore why it moved`}
              >
                {/* Index Name */}
                <span className="font-bold text-slate-100 group-hover/chip:text-teal-300 transition-colors">
                  {index.name}
                </span>

                {/* Index Value */}
                <span className="font-mono-num text-slate-300 text-[11px] font-medium">
                  {index.value}
                </span>

                {/* Percentage Change Tag */}
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-bold font-mono-num px-1.5 py-0.5 rounded-md ${
                    index.isPositive
                      ? 'text-emerald-400 bg-emerald-950/50'
                      : 'text-rose-400 bg-rose-950/50'
                  }`}
                >
                  {index.isPositive ? (
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-rose-400" />
                  )}
                  <span>{index.change}</span>
                </span>
              </button>
            ))}

            {/* Educational Insight Trigger Chip */}
            <button
              onClick={onExploreMarket}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-teal-500/15 to-emerald-500/15 border border-teal-500/30 hover:border-teal-400/60 text-xs text-teal-300 hover:text-teal-200 font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Why did the market move? Explore</span>
              <ChevronRight className="w-3 h-3 text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
