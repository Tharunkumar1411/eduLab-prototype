/**
 * Duolingo-style Case Preview Modal.
 * Appears when clicking a Case Node along the connective path before launching the investigation.
 */

import React from 'react';
import { PlaygroundCase } from '../../data/cases.ts';
import { PathNode } from '../../data/learningPath.ts';
import { ArrowRight, Clock, Lock, Shield, Sparkles, Trophy, X } from 'lucide-react';

interface CasePreviewModalProps {
  node: PathNode;
  caseData: PlaygroundCase;
  isLocked: boolean;
  isCompleted: boolean;
  userXp: number;
  onClose: () => void;
  onStartCase: (caseItem: PlaygroundCase) => void;
}

export const CasePreviewModal: React.FC<CasePreviewModalProps> = ({
  node,
  caseData,
  isLocked,
  isCompleted,
  userXp,
  onClose,
  onStartCase,
}) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-md">
                  {caseData.levelTitle} Case
                </span>
                <span className="text-xs text-slate-400 font-mono-num font-bold">
                  NSE: {caseData.ticker}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-100 mt-0.5">
                {caseData.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Target Business:</span>
            <span className="text-sm font-bold text-slate-200 block">
              {caseData.companyName} ({caseData.industry})
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
            "{caseData.hook}"
          </p>

          {/* Quick Snapshot */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
              <span className="text-[11px] text-slate-400 block">Market Anomaly</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block font-mono-num">
                {caseData.stockChartSummary.gain} ({caseData.stockChartSummary.period})
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
              <span className="text-[11px] text-slate-400 block">Investigation Reward</span>
              <span className="text-xs font-bold text-amber-400 mt-0.5 block font-mono-num">
                +{caseData.xpReward} XP
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Est: ~{caseData.estimatedMinutes} mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>{caseData.actionPointsMax} Action Tokens</span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Back to Path
          </button>

          {isLocked ? (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs border border-slate-700">
              <Lock className="w-4 h-4" />
              <span>Complete Previous Nodes First</span>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onStartCase(caseData);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-lg active:translate-y-0.5 border-b-3 border-emerald-800"
            >
              <span>{isCompleted ? 'RE-EXAMINE CASE' : 'START INVESTIGATION'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
