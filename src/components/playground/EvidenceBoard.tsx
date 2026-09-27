/**
 * Evidence Board for Financial Detective Cases.
 * Users inspect clues, classify evidence into Supports vs Raises Concern vs Inconclusive,
 * and pin them to form their analytical thesis.
 */

import React from 'react';
import { Clue } from '../../data/cases.ts';
import { AlertTriangle, CheckCircle2, HelpCircle, Lock, Sparkles } from 'lucide-react';

export type ClueClassification = 'support' | 'concern' | 'neutral';

export interface DiscoveredClueState {
  clue: Clue;
  userClassification?: ClueClassification;
  notes?: string;
}

interface EvidenceBoardProps {
  clues: Clue[];
  unlockedClueIds: string[];
  classifications: Record<string, ClueClassification>;
  selectedClueId: string | null;
  actionPointsRemaining: number;
  onUnlockClue: (clueId: string) => void;
  onSelectClue: (clueId: string) => void;
  onClassifyClue: (clueId: string, classification: ClueClassification) => void;
}

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({
  clues,
  unlockedClueIds,
  classifications,
  selectedClueId,
  actionPointsRemaining,
  onUnlockClue,
  onSelectClue,
  onClassifyClue,
}) => {
  const selectedClue = clues.find(c => c.id === selectedClueId);
  const isSelectedUnlocked = selectedClue ? unlockedClueIds.includes(selectedClue.id) : false;

  const concernCount = Object.values(classifications).filter(c => c === 'concern').length;
  const supportCount = Object.values(classifications).filter(c => c === 'support').length;
  const neutralCount = Object.values(classifications).filter(c => c === 'neutral').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left / Clues Roster */}
      <div className="lg:col-span-7 space-y-4">
        {/* Token Budget Banner */}
        <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Investigation Tokens
            </span>
            <p className="text-sm text-slate-300 mt-0.5">
              Choose your leads carefully. You have limited time before earnings call.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700">
            <span className="text-amber-400 font-mono-num font-bold text-lg">
              {actionPointsRemaining}
            </span>
            <span className="text-xs text-slate-400 font-medium">tokens left</span>
          </div>
        </div>

        {/* Evidence Classification Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-medium text-rose-300">Concerns</span>
            </div>
            <span className="text-base font-bold font-mono-num text-rose-300">{concernCount}</span>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">Support</span>
            </div>
            <span className="text-base font-bold font-mono-num text-emerald-300">{supportCount}</span>
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-300">Neutral</span>
            </div>
            <span className="text-base font-bold font-mono-num text-slate-300">{neutralCount}</span>
          </div>
        </div>

        {/* Clue Cards Grid */}
        <div className="space-y-2.5">
          {clues.map((clue, idx) => {
            const isUnlocked = unlockedClueIds.includes(clue.id);
            const isSelected = selectedClueId === clue.id;
            const classification = classifications[clue.id];

            return (
              <div
                key={clue.id}
                onClick={() => {
                  if (isUnlocked) {
                    onSelectClue(clue.id);
                  }
                }}
                className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-teal-500 shadow-md ring-1 ring-teal-500/50'
                    : isUnlocked
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    : 'bg-slate-950/50 border-slate-850 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-slate-300">0{idx + 1}</span>
                      <span>·</span>
                      <span>{clue.category}</span>
                      {classification && (
                        <>
                          <span>·</span>
                          <span
                            className={`font-semibold ${
                              classification === 'concern'
                                ? 'text-rose-400'
                                : classification === 'support'
                                ? 'text-emerald-400'
                                : 'text-slate-400'
                            }`}
                          >
                            Marked as {classification.toUpperCase()}
                          </span>
                        </>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-slate-100 truncate">
                      {clue.title}
                    </h4>

                    {isUnlocked ? (
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {clue.summary}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-1">
                        Locked investigation file. Requires 1 action token to inspect.
                      </p>
                    )}
                  </div>

                  {/* Right side unlock button or indicator */}
                  <div>
                    {!isUnlocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (actionPointsRemaining > 0) {
                            onUnlockClue(clue.id);
                          }
                        }}
                        disabled={actionPointsRemaining <= 0}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          actionPointsRemaining > 0
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                            : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Inspect (-1)</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono-num text-teal-400 bg-teal-950/40 border border-teal-800/50 px-2 py-0.5 rounded">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right / Clue Deep Dive & Thesis Classification Panel */}
      <div className="lg:col-span-5">
        <div className="sticky top-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          {selectedClue && isSelectedUnlocked ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold uppercase tracking-wider mb-1">
                  <span>{selectedClue.category} Evidence File</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  {selectedClue.title}
                </h3>
              </div>

              {/* Metric Callout */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg">
                <span className="text-xs text-slate-400 block font-medium">
                  {selectedClue.metricLabel}
                </span>
                <span className="text-base font-bold font-mono-num text-amber-300 mt-0.5 block">
                  {selectedClue.metricValue}
                </span>
              </div>

              {/* Deep Dive Forensic Analysis */}
              <div>
                <h5 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1.5">
                  Analyst Findings
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-850/60 p-3.5 rounded-lg border border-slate-800">
                  {selectedClue.deepDive}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedClue.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs text-slate-400 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Classification Action for Detective */}
              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Classify this piece of evidence for your thesis:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onClassifyClue(selectedClue.id, 'concern')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                      classifications[selectedClue.id] === 'concern'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                        : 'bg-slate-800/80 text-rose-300 border-rose-900/40 hover:bg-rose-950/40'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Concern</span>
                  </button>

                  <button
                    onClick={() => onClassifyClue(selectedClue.id, 'support')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                      classifications[selectedClue.id] === 'support'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-800/80 text-emerald-300 border-emerald-900/40 hover:bg-emerald-950/40'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Support</span>
                  </button>

                  <button
                    onClick={() => onClassifyClue(selectedClue.id, 'neutral')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                      classifications[selectedClue.id] === 'neutral'
                        ? 'bg-slate-700 text-white border-slate-500 shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Neutral</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-sm font-medium">Select an unlocked clue on the left to examine forensics</p>
              <p className="text-xs text-slate-500">
                Unlock clues using your tokens to build an airtight thesis before making your decision.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
