import React from 'react';
import { ChevronRight } from 'lucide-react';
import { EXPLORE_SECTORS } from '../../data/homeData.ts';

interface ExploreMarketsSectionProps {
  onSelectSector: (sectorId: string) => void;
}

export const ExploreMarketsSection: React.FC<ExploreMarketsSectionProps> = ({
  onSelectSector,
}) => {
  return (
    <section aria-labelledby="explore-markets-heading" className="w-full space-y-3">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 id="explore-markets-heading" className="text-lg font-bold text-slate-100 tracking-tight">
            Explore Markets
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Learn how different industries make money.
        </p>
      </div>

      {/* Categories Grid - 7 sectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {EXPLORE_SECTORS.map((sector) => (
          <button
            key={sector.id}
            onClick={() => onSelectSector(sector.id)}
            className="flex flex-col items-start p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/40 text-left transition-all duration-150 group cursor-pointer shadow-xs min-h-[96px] justify-between relative overflow-hidden"
          >
            {/* Top row: Icon + arrow affordance */}
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl" role="img" aria-label={sector.name}>
                {sector.icon}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Bottom: Name & tagline */}
            <div className="pt-2 w-full">
              <span className="text-sm font-bold text-slate-100 group-hover:text-teal-300 transition-colors block truncate">
                {sector.name}
              </span>
              <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                {sector.tagline}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
