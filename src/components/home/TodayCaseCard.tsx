import React from 'react';
import { ArrowRight, KeyRound, Sparkles } from 'lucide-react';
import { PlaygroundCase } from '../../data/cases.ts';

interface TodayCaseCardProps {
  caseData: PlaygroundCase;
  onInvestigate: (caseItem: PlaygroundCase) => void;
}

export const TodayCaseCard: React.FC<TodayCaseCardProps> = ({
  caseData,
  onInvestigate,
}) => {
  return (
    <section aria-labelledby="todays-investigation-heading" className="w-full">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 p-5 sm:p-6 shadow-md transition-all space-y-3.5">
        {/* Kicker Header */}
        <div className="flex items-center justify-between text-xs font-bold text-teal-400 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-base" aria-hidden="true">🔎</span>
            <span id="todays-investigation-heading">Today's Investigation</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1 normal-case">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Featured Mystery
            </span>
          </div>

          <span className="text-teal-300 font-mono-num font-semibold text-xs normal-case">
            +{caseData.xpReward} XP
          </span>
        </div>

        {/* Content & Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2 flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight truncate">
              {caseData.title}
            </h2>

            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
              Net profit surged +30%, but shares fell -12% the next morning. Uncover the gap between one-off asset sales and real operating cash flow.
            </p>

            {/* Clue Tokens Strip */}
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium flex-wrap pt-0.5">
              <span className="flex items-center gap-1 text-slate-300">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>3 Evidence Clues</span>
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>{caseData.companyName} ({caseData.ticker})</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>~{caseData.estimatedMinutes} min solve</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <button
              onClick={() => onInvestigate(caseData)}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-98 text-slate-950 font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <span>Investigate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
