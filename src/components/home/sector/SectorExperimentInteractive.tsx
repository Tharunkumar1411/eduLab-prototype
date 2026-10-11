import React, { useState } from 'react';
import { SectorLearningActivity } from '../../../data/sectors/types.ts';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  HelpCircle,
  Scale,
  Shield,
  Sparkles,
  XCircle,
} from 'lucide-react';

interface SectorExperimentInteractiveProps {
  activity: SectorLearningActivity;
  onComplete: (xp: number) => void;
}

export const SectorExperimentInteractive: React.FC<SectorExperimentInteractiveProps> = ({
  activity,
  onComplete,
}) => {
  const cfg = activity.experimentConfig!;

  // Experiment prediction state
  const [selectedPredictionId, setSelectedPredictionId] = useState<string | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);

  // Reflection state
  const [reflectionAnswerId, setReflectionAnswerId] = useState<string | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  const spreadA = Number((cfg.entityA.lendingRate - cfg.entityA.depositRate).toFixed(2));
  const spreadB = Number((cfg.entityB.lendingRate - cfg.entityB.depositRate).toFixed(2));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>Interactive Experiment · Step 3 of 4</span>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
          {cfg.headline}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {cfg.intro}
        </p>
      </div>

      {/* Two Entities Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Entity A Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{cfg.entityA.icon}</span>
              <div>
                <h3 className="text-base font-bold text-slate-100">{cfg.entityA.name}</h3>
                <span className="text-[11px] font-semibold text-teal-400">{cfg.entityA.tag}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono-num font-bold px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-800">
              Low-Cost CASA
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs">
              <span className="text-slate-400">Average Lending Rate</span>
              <span className="font-mono-num font-bold text-slate-100">{cfg.entityA.lendingRate}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs">
              <span className="text-slate-400">Average Deposit Cost</span>
              <span className="font-mono-num font-bold text-teal-300">{cfg.entityA.depositRate}%</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-850">
            {cfg.entityA.fundingNote}
          </p>

          {predictionSubmitted && (
            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between animate-in fade-in duration-200">
              <span className="text-xs font-bold text-teal-300">Net Interest Spread:</span>
              <span className="font-mono-num font-extrabold text-base text-teal-200">
                +{spreadA}%
              </span>
            </div>
          )}
        </div>

        {/* Entity B Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{cfg.entityB.icon}</span>
              <div>
                <h3 className="text-base font-bold text-slate-100">{cfg.entityB.name}</h3>
                <span className="text-[11px] font-semibold text-amber-400">{cfg.entityB.tag}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono-num font-bold px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-800">
              Higher-Cost Funding
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs">
              <span className="text-slate-400">Average Lending Rate</span>
              <span className="font-mono-num font-bold text-slate-100">{cfg.entityB.lendingRate}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs">
              <span className="text-slate-400">Average Deposit Cost</span>
              <span className="font-mono-num font-bold text-amber-300">{cfg.entityB.depositRate}%</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-850">
            {cfg.entityB.fundingNote}
          </p>

          {predictionSubmitted && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between animate-in fade-in duration-200">
              <span className="text-xs font-bold text-amber-300">Net Interest Spread:</span>
              <span className="font-mono-num font-extrabold text-base text-amber-200">
                +{spreadB}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Prediction Experiment Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
            Experiment Prediction
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            {cfg.question}
          </h3>
        </div>

        <div className="space-y-3">
          {cfg.options.map((opt) => {
            const isSelected = selectedPredictionId === opt.id;
            let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';

            if (predictionSubmitted) {
              if (opt.isCorrect) {
                style = 'bg-emerald-950/70 border-emerald-500 text-emerald-100';
              } else if (isSelected && !opt.isCorrect) {
                style = 'bg-rose-950/70 border-rose-500 text-rose-100';
              } else {
                style = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              style = 'bg-slate-800 border-teal-500 text-white';
            }

            return (
              <button
                key={opt.id}
                disabled={predictionSubmitted}
                onClick={() => setSelectedPredictionId(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${style}`}
              >
                <span className="font-semibold block">{opt.text}</span>
                {predictionSubmitted && (opt.isCorrect || isSelected) && (
                  <span
                    className={`block mt-2 text-xs leading-relaxed ${
                      opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {opt.explanation}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!predictionSubmitted && (
          <div className="flex justify-end pt-1">
            <button
              disabled={!selectedPredictionId}
              onClick={() => setPredictionSubmitted(true)}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20"
            >
              <span>Reveal Outcome & Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Second Consideration: The Risk Catch */}
        {predictionSubmitted && (
          <div className="space-y-6 pt-3 animate-in fade-in duration-300">
            {/* The Vital Catch Alert Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {cfg.catchExplanation.title}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                {cfg.catchExplanation.keyCatch}
              </h4>
              <div className="space-y-2 pt-1">
                {cfg.catchExplanation.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      {pIdx + 1}
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reflection Check */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Reflection Check
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-100">
                {cfg.reflectionQuestion}
              </h4>

              <div className="space-y-2.5">
                {cfg.reflectionOptions.map((opt) => {
                  const isSelected = reflectionAnswerId === opt.id;
                  let style = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (reflectionSubmitted) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-950/70 border-emerald-500 text-emerald-100';
                    } else if (isSelected && !opt.isCorrect) {
                      style = 'bg-rose-950/70 border-rose-500 text-rose-100';
                    } else {
                      style = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    style = 'bg-slate-800 border-teal-500 text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={reflectionSubmitted}
                      onClick={() => setReflectionAnswerId(opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${style}`}
                    >
                      <span className="font-semibold block">{opt.text}</span>
                      {reflectionSubmitted && (opt.isCorrect || isSelected) && (
                        <span
                          className={`block mt-2 text-xs leading-relaxed ${
                            opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                          }`}
                        >
                          {opt.explanation}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                {!reflectionSubmitted ? (
                  <button
                    disabled={!reflectionAnswerId}
                    onClick={() => setReflectionSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Check Understanding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onComplete(activity.xpReward)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/25"
                  >
                    <span>Complete & Claim +{activity.xpReward} XP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
