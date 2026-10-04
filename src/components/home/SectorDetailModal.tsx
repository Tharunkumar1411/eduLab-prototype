import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Lightbulb, TrendingUp, X } from 'lucide-react';
import { SectorDetail } from '../../data/homeData.ts';

interface SectorDetailModalProps {
  sector: SectorDetail | null;
  onClose: () => void;
  onExploreInLab: (stockSymbol: string) => void;
}

export const SectorDetailModal: React.FC<SectorDetailModalProps> = ({
  sector,
  onClose,
  onExploreInLab,
}) => {
  if (!sector) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sector-modal-title"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-2xl shrink-0">
              {sector.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <span>Sector Guide</span>
              </div>
              <h2 id="sector-modal-title" className="text-xl sm:text-2xl font-bold text-slate-100">
                {sector.name}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{sector.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close sector guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: What Does This Sector Do? */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            What Does This Sector Do?
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
            {sector.whatItDoes}
          </p>
        </div>

        {/* Section 2: How Do They Make Money? */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
            How Do Companies Make Money?
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed bg-teal-950/20 border border-teal-500/20 p-3.5 rounded-xl">
            {sector.howTheyMakeMoney}
          </p>
        </div>

        {/* Section 3: Things to Understand */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Key Metrics & Things to Understand
          </h3>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {sector.thingsToUnderstand.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1"
              >
                <span className="font-bold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{item.term}</span>
                </span>
                <p className="text-slate-300 leading-relaxed pl-5">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Beginner Mental Model */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-amber-400">Beginner Mental Model</span>
            <p className="text-slate-300 leading-relaxed">
              {sector.beginnerMentalModel}
            </p>
          </div>
        </div>

        {/* Primary CTA: Explore in Trading Lab */}
        <div className="space-y-2 pt-1 border-t border-slate-800">
          <button
            onClick={() => onExploreInLab(sector.representativeStockSymbol)}
            className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 active:scale-98 text-slate-950 font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            <span>Explore {sector.name} in Trading Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-slate-500 text-center">
            Inspect real financials for {sector.representativeStockName} ({sector.representativeStockSymbol})
          </p>
        </div>
      </div>
    </div>
  );
};
