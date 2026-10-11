import React, { useState } from 'react';
import { SectorLearningActivity } from '../../../data/sectors/types.ts';
import {
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  KeyRound,
  Shield,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';

interface SectorInvestigationInteractiveProps {
  activity: SectorLearningActivity;
  onComplete: (xp: number) => void;
}

export const SectorInvestigationInteractive: React.FC<SectorInvestigationInteractiveProps> = ({
  activity,
  onComplete,
}) => {
  const cfg = activity.investigationConfig!;

  const [activeClueIndex, setActiveClueIndex] = useState<number>(0);
  const [viewedClueIds, setViewedClueIds] = useState<string[]>([cfg.clues[0]?.id || '']);
  const [selectedVerdictId, setSelectedVerdictId] = useState<string | null>(null);
  const [verdictSubmitted, setVerdictSubmitted] = useState<boolean>(false);

  const activeClue = cfg.clues[activeClueIndex] || cfg.clues[0];

  const handleSelectClue = (idx: number) => {
    setActiveClueIndex(idx);
    const clueId = cfg.clues[idx]?.id;
    if (clueId && !viewedClueIds.includes(clueId)) {
      setViewedClueIds((prev) => [...prev, clueId]);
    }
  };

  const allCluesExplored = viewedClueIds.length >= cfg.clues.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
          <FileSearch className="w-4 h-4" />
          <span>Forensic Case Investigation · Step 4 of 4</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
              {cfg.caseTitle}
            </h2>
            <span className="text-xs font-semibold text-teal-300 block">
              Target: {cfg.companyName} ({cfg.ticker})
            </span>
          </div>
          <span className="text-xs font-bold text-amber-400 font-mono-num bg-amber-950/50 border border-amber-500/30 px-2.5 py-1 rounded-xl self-start sm:self-auto">
            +{activity.xpReward} XP Reward
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
          {cfg.intro}
        </p>
      </div>

      {/* Clues Tabs / Dossier Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Forensic Evidence Dossier ({viewedClueIds.length}/{cfg.clues.length} Inspected)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Tap each clue to examine the facts
          </span>
        </div>

        {/* Clue Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {cfg.clues.map((clue, idx) => {
            const isSelected = idx === activeClueIndex;
            const isViewed = viewedClueIds.includes(clue.id);

            return (
              <button
                key={clue.id}
                onClick={() => handleSelectClue(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[75px] ${
                  isSelected
                    ? 'bg-teal-500/20 border-teal-500 text-teal-200 ring-1 ring-teal-500/40'
                    : isViewed
                    ? 'bg-slate-950/80 border-slate-700 text-slate-200 hover:border-slate-600'
                    : 'bg-slate-950/50 border-slate-850 text-slate-400 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xl">{clue.icon}</span>
                  {isViewed && (
                    <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold block truncate text-slate-100">
                    {clue.title}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {clue.metricBadge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Clue Detail Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850 space-y-3.5 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                Evidence #{activeClueIndex + 1} · {activeClue.metricBadge}
              </span>
              <h3 className="text-base font-bold text-slate-100">
                {activeClue.title}
              </h3>
            </div>
            <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
              {activeClue.icon}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200 font-semibold leading-relaxed">
            📊 <strong>Data Highlight:</strong> {activeClue.dataHighlight}
          </div>

          <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
            <p className="text-slate-300">
              <strong className="text-slate-100">Forensic Observation:</strong> {activeClue.observation}
            </p>
            <p className="text-teal-200">
              <strong className="text-teal-400">Analyst Implication:</strong> {activeClue.implication}
            </p>
          </div>
        </div>

        {/* Analytical Verdict Section */}
        <div className="space-y-4 pt-2 border-t border-slate-800/80">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Final Analyst Decision
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-100">
              {cfg.question}
            </h3>
          </div>

          <div className="space-y-3">
            {cfg.options.map((opt) => {
              const isSelected = selectedVerdictId === opt.id;
              let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';

              if (verdictSubmitted) {
                if (opt.isBest) {
                  style = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40';
                } else if (isSelected && !opt.isBest) {
                  style = 'bg-rose-950/70 border-rose-500 text-rose-100 ring-2 ring-rose-500/40';
                } else {
                  style = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                style = 'bg-slate-800 border-teal-500 text-white';
              }

              return (
                <button
                  key={opt.id}
                  disabled={verdictSubmitted}
                  onClick={() => setSelectedVerdictId(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${style}`}
                >
                  <span className="font-semibold block leading-relaxed">{opt.text}</span>
                  {verdictSubmitted && (opt.isBest || isSelected) && (
                    <span
                      className={`block mt-2.5 text-xs leading-relaxed p-2.5 rounded-xl border ${
                        opt.isBest
                          ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-700/50 text-rose-200'
                      }`}
                    >
                      {opt.verdictFeedback}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {!verdictSubmitted ? (
            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedVerdictId}
                onClick={() => setVerdictSubmitted(true)}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>Submit Detective Verdict</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-5 pt-3 animate-in fade-in duration-300">
              {/* Nuanced Takeaways Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-500/40 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    {cfg.nuancedTakeaway.title}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-100">
                  {cfg.nuancedTakeaway.summary}
                </h4>
                <div className="space-y-2 pt-1">
                  {cfg.nuancedTakeaway.lessons.map((lesson, lIdx) => (
                    <div
                      key={lIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Claim XP Action */}
              <button
                onClick={() => onComplete(activity.xpReward)}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black rounded-2xl text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 cursor-pointer"
              >
                <span>Complete Sector Case & Claim +{activity.xpReward} XP</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
