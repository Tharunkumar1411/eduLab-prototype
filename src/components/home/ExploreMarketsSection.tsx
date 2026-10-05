import React from 'react';
import { ArrowRight, ChevronRight, Sparkles, BookOpen, KeyRound } from 'lucide-react';
import { ALL_SECTORS, SectorData } from '../../data/sectors/index.ts';

interface ExploreMarketsSectionProps {
  onSelectSector: (sectorId: string) => void;
}

export const ExploreMarketsSection: React.FC<ExploreMarketsSectionProps> = ({
  onSelectSector,
}) => {
  return (
    <section aria-labelledby="explore-markets-heading" className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="explore-markets-heading" className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              Explore Markets
            </h2>
            <span className="hidden sm:inline-flex text-[10px] font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full">
              Industry Learning Hubs
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Learn how each industry works, understand its key numbers, and solve sector investigations.
          </p>
        </div>
      </div>

      {/* Featured Flagship Sector Card: FMCG */}
      {ALL_SECTORS.find((s) => s.id === 'fmcg') && (
        <div
          onClick={() => onSelectSector('fmcg')}
          className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/40 hover:border-teal-400 p-5 sm:p-6 shadow-xl transition-all duration-200 group cursor-pointer overflow-hidden space-y-4"
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Featured Sector Hub</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 normal-case font-medium">12 min journey</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl p-2.5 rounded-2xl bg-teal-500/15 border border-teal-500/30">
                  🛒
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 group-hover:text-teal-300 transition-colors">
                    FMCG Learning Hub
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-200/90 font-medium">
                    "Everyday products. Huge businesses."
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl pt-1">
                From soaps and biscuits to distribution networks and negative working capital — learn what makes consumer staples the ultimate cash-flow compounding machines.
              </p>

              {/* Key Features included */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium flex-wrap pt-1">
                <span className="flex items-center gap-1 text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  <span>5 Growth Drivers</span>
                </span>
                <span className="text-slate-600">·</span>
                <span>FMCG Metrics & Valuation</span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Case: The Price Hike Puzzle (+350 XP)</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <span className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 group-hover:translate-x-1">
                <span>Enter FMCG Hub</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Sector Hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ALL_SECTORS.filter((s) => s.id !== 'fmcg').map((sector) => (
          <button
            key={sector.id}
            onClick={() => onSelectSector(sector.id)}
            className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/40 text-left transition-all duration-150 group cursor-pointer shadow-xs min-h-[140px] relative overflow-hidden"
          >
            <div className="space-y-2 w-full">
              {/* Top row: Icon + Hub tag */}
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {sector.icon}
                </span>
                <span className="text-[10px] font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span>Hub</span>
                  <ChevronRight className="w-3 h-3 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <span className="text-sm font-bold text-slate-100 group-hover:text-teal-300 transition-colors block">
                  {sector.name}
                </span>
                <span className="text-xs text-slate-400 block line-clamp-1 mt-0.5">
                  {sector.tagline}
                </span>
              </div>
            </div>

            {/* Bottom: Case feature badge */}
            <div className="pt-2 border-t border-slate-800/80 w-full flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-slate-300 font-medium truncate max-w-[180px]">
                🔎 {sector.investigation.title}
              </span>
              <span className="font-mono-num text-teal-400 font-bold shrink-0">
                +{sector.investigation.xpReward} XP
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
