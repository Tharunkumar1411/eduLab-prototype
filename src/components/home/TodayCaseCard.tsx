import React from 'react';
import { ArrowRight, Compass, HelpCircle, KeyRound, Search, Sparkles } from 'lucide-react';
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
      {/* Hero Card Container */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/50 border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 overflow-hidden">
        {/* Ambient atmospheric backdrop glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            {/* Kicker badge */}
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              <span className="text-base">🔎</span>
              <span id="todays-investigation-heading">Today's Investigation</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Mystery
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight text-balance">
              {caseData.title}
            </h2>

            {/* Narrative Mystery Hook */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-sm sm:text-base text-slate-200 space-y-1.5 backdrop-blur-xs font-sans">
              <p className="font-semibold text-emerald-300">
                A company increased its net profit by 30%.
              </p>
              <p className="font-semibold text-rose-300">
                Yet its stock fell 12% the very next morning.
              </p>
              <p className="text-slate-300 italic pt-1">
                Why did Dalal Street dump the stock despite record profits? What happened?
              </p>
            </div>

            {/* Unboxed Metadata Tokens */}
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium flex-wrap pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>3 Evidence Clues</span>
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>{caseData.companyName} ({caseData.ticker})</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-teal-300 font-semibold font-mono-num">+{caseData.xpReward} XP</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>~{caseData.estimatedMinutes} min</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
            <button
              onClick={() => onInvestigate(caseData)}
              className="min-h-[48px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-98 text-slate-950 font-extrabold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 cursor-pointer"
            >
              <span>Investigate</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <span className="text-[11px] text-slate-400 text-center sm:text-right">
              Inspect clues in the evidence room
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
