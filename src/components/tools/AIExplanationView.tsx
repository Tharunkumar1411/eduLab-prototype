/**
 * Deterministic AI Educational Postmortem View.
 * Breaks down why the backtest produced its result in plain language.
 * Adheres strictly to educational/SEBI guidelines: explains mechanics, never advises buy/sell.
 */

import React from 'react';
import { EducationalAnalysis } from '../../engine/explanation.ts';
import { CharacterMentor } from '../character/CharacterMentor.tsx';
import { AlertCircle, CheckCircle2, ChevronRight, HelpCircle, Lightbulb, Shield, TrendingDown, TrendingUp } from 'lucide-react';

interface AIExplanationViewProps {
  analysis: EducationalAnalysis;
  onSelectSuggestion?: (suggestion: string) => void;
}

export const AIExplanationView: React.FC<AIExplanationViewProps> = ({
  analysis,
}) => {
  const isOutperformed = analysis.verdict === 'outperformed';
  const isUnderperformed = analysis.verdict === 'underperformed';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
      {/* Mentor Header */}
      <CharacterMentor
        state={isOutperformed ? 'happy' : isUnderperformed ? 'thinking' : 'talking'}
        message={`Analyst Postmortem: ${analysis.summaryTitle}`}
        subMessage="Understanding why a rule worked or failed is the true mark of a disciplined quantitative investor."
      />

      {/* Overview Card */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-3.5">
        {isOutperformed ? (
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
        ) : isUnderperformed ? (
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </div>
        )}

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-100">
            {analysis.summaryTitle}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {analysis.drawdownDiagnosis}
          </p>
        </div>
      </div>

      {/* 2-Column Forensic Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Key Observations */}
        <div className="space-y-2.5">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block">
            Execution Observations
          </span>
          <div className="space-y-2">
            {analysis.keyObservations.map((obs, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 bg-slate-950/50 border border-slate-800/80 rounded-lg text-xs text-slate-300 leading-relaxed"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{obs}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mechanics & Risk Breakdown */}
        <div className="space-y-2.5">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block">
            Rules & Risk Mechanics
          </span>
          <div className="space-y-2">
            {analysis.mechanicsBreakdown.map((mech, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 bg-slate-950/50 border border-slate-800/80 rounded-lg text-xs text-slate-300 leading-relaxed"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{mech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Experiment Suggestions */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h5 className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
            Hypothesis Testing: What to Try Next
          </h5>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {analysis.nextExperimentSuggestions.map((suggestion, i) => (
            <div
              key={i}
              className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 flex flex-col justify-between"
            >
              <p className="text-xs text-slate-300 leading-relaxed">
                {suggestion}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-teal-400">
                <span>Experiment {i + 1}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Boundary Note */}
      <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-lg flex items-center gap-2.5 text-[11px] text-slate-500">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          Educational simulation only. Past historical simulation is not indicative of future market returns. Not registered SEBI investment advice.
        </span>
      </div>
    </div>
  );
};
