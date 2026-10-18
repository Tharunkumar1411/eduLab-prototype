import React from 'react';
import { ArrowRight, KeyRound, Sparkles, Search } from 'lucide-react';
import { PlaygroundCase } from '../../data/cases.ts';

interface TodayCaseCardProps {
  caseData: PlaygroundCase;
  onInvestigate: (caseItem: PlaygroundCase) => void;
}

/**
 * Full-bleed hero banner for today's investigation. Deliberately styled
 * differently from the other Lounge sections — richer gradient, decorative
 * magnifier glow, bolder typography — so the Lounge doesn't read as a stack
 * of identical cards.
 */
export const TodayCaseCard: React.FC<TodayCaseCardProps> = ({
  caseData,
  onInvestigate,
}) => {
  return (
    <section
      aria-labelledby="todays-investigation-heading"
      className="relative overflow-hidden rounded-3xl isolate"
    >
      {/* Layered gradient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-950/70 to-amber-950/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.18),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.14),transparent_55%)]"
      />

      {/* Decorative magnifier glow — hidden on small screens to keep hero clean */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -right-6 -bottom-6 w-40 h-40 rounded-full border-[14px] border-teal-400/15 motion-safe:animate-pulse"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute right-10 bottom-10 w-14 h-14 rounded-full bg-amber-400/5 border border-amber-400/20"
      />

      {/* Content */}
      <div className="relative p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 border border-amber-500/15 rounded-3xl">
        {/* Kicker */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0" aria-hidden="true">
              <Search className="w-3.5 h-3.5" />
            </div>
            <span
              id="todays-investigation-heading"
              className="text-[11px] font-black text-amber-300 uppercase tracking-widest"
            >
              Today&rsquo;s Investigation
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-300 normal-case tracking-normal">
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </span>
          </div>

          <span className="text-amber-300 font-mono-num font-black text-xs bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md">
            +{caseData.xpReward} XP
          </span>
        </div>

        {/* Title + hook */}
        <div className="space-y-1.5 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            {caseData.title}
          </h2>
          <p className="text-sm text-slate-200/90 leading-snug">
            Net profit surged +30%, but shares fell −12% the next morning. Follow the clues from one-off gains to real operating cash flow.
          </p>
        </div>

        {/* Meta chips row */}
        <div className="flex items-center gap-3 text-[11px] text-slate-200/80 font-medium flex-wrap">
          <span className="flex items-center gap-1 bg-black/20 border border-white/10 px-2 py-1 rounded-full">
            <KeyRound className="w-3 h-3 text-amber-300" />
            <span>3 clues</span>
          </span>
          <span className="bg-black/20 border border-white/10 px-2 py-1 rounded-full">
            {caseData.companyName} ({caseData.ticker})
          </span>
          <span className="bg-black/20 border border-white/10 px-2 py-1 rounded-full">
            ~{caseData.estimatedMinutes} min
          </span>
        </div>

        {/* CTA */}
        <div>
          <button
            onClick={() => onInvestigate(caseData)}
            className="w-full sm:w-auto min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-900/40 cursor-pointer"
          >
            <span>Start investigation</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
