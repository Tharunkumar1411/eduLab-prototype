import React, { useState } from 'react';
import { SectorData, SectorLearningActivity } from '../../../data/sectors/types.ts';
import { SectorModelInteractive } from './SectorModelInteractive.tsx';
import { SectorExperimentInteractive } from './SectorExperimentInteractive.tsx';
import { SectorInvestigationInteractive } from './SectorInvestigationInteractive.tsx';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface SectorActivityViewProps {
  sector: SectorData;
  activity: SectorLearningActivity;
  allActivities: SectorLearningActivity[];
  completedStepNumbers: number[];
  onSelectStep: (stepNumber: number) => void;
  onBackToOverview: () => void;
  onCompleteActivity: (stepNumber: number, xpReward: number) => void;
}

export const SectorActivityView: React.FC<SectorActivityViewProps> = ({
  sector,
  activity,
  allActivities,
  completedStepNumbers,
  onSelectStep,
  onBackToOverview,
  onCompleteActivity,
}) => {
  // Activity 1 Story state
  const [activeParticipantId, setActiveParticipantId] = useState<string>('depositor');
  const [decisionAnswerId, setDecisionAnswerId] = useState<string | null>(null);
  const [decisionSubmitted, setDecisionSubmitted] = useState<boolean>(false);
  const [reflectionAnswerId, setReflectionAnswerId] = useState<string | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  const stepNumber = activity.stepNumber;
  const progressPercent = (stepNumber / allActivities.length) * 100;

  // Handler when child interactive activity signals completion
  const handleChildComplete = (xp: number) => {
    onCompleteActivity(stepNumber, xp);
  };

  const storyCfg = activity.storyConfig;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300 select-none">
      {/* Top Activity Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToOverview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to {sector.name} Overview</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="text-xs font-bold text-slate-300">
            <span className="text-teal-400">Step 0{activity.stepNumber}</span>
            <span className="text-slate-600 mx-1.5">·</span>
            <span className="text-slate-100">{activity.title}</span>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5">
          {allActivities.map((act) => {
            const isCurrent = act.stepNumber === stepNumber;
            const isDone = completedStepNumbers.includes(act.stepNumber);
            const isAccessible = act.stepNumber === 1 || completedStepNumbers.includes(act.stepNumber - 1) || isDone;

            return (
              <button
                key={act.id}
                onClick={() => isAccessible && onSelectStep(act.stepNumber)}
                disabled={!isAccessible}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-teal-500/20 border border-teal-500/60 text-teal-300 shadow-xs ring-1 ring-teal-500/30'
                    : isDone
                    ? 'bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/50 cursor-pointer'
                    : isAccessible
                    ? 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:border-slate-700 cursor-pointer'
                    : 'text-slate-600 border border-transparent cursor-not-allowed'
                }`}
              >
                <span>0{act.stepNumber}</span>
                <span className="hidden sm:inline">· {act.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* XP Counter */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono-num bg-amber-950/60 border border-amber-800/40 px-3 py-1.5 rounded-xl self-end sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{activity.xpReward} XP</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-800/60 h-2 rounded-full overflow-hidden border border-slate-700/50">
        <div
          className="bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Activity View Body */}
      {activity.type === 'model' && (
        <SectorModelInteractive
          activity={activity}
          onComplete={handleChildComplete}
        />
      )}

      {activity.type === 'experiment' && (
        <SectorExperimentInteractive
          activity={activity}
          onComplete={handleChildComplete}
        />
      )}

      {activity.type === 'investigation' && (
        <SectorInvestigationInteractive
          activity={activity}
          onComplete={handleChildComplete}
        />
      )}

      {/* Activity 1: Understand Banking (Story & Intermediary Flow) */}
      {activity.type === 'story' && storyCfg && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Narrative */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Interactive Story · Step 1 of 4
              </span>
              <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800">
                ~{activity.estimatedMinutes} min
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              {storyCfg.hook}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "{storyCfg.scenario}"
            </p>
          </div>

          {/* Interactive 3-Participant Flow */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Explore the Flow of Money:
              </span>
              <p className="text-xs text-slate-400">
                Tap each participant to see how the bank connects savers and borrowers.
              </p>
            </div>

            {/* Stepper Flow Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {storyCfg.participants.map((p) => {
                const isSelected = p.id === activeParticipantId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveParticipantId(p.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[120px] ${
                      isSelected
                        ? 'bg-teal-500/20 border-teal-500 text-teal-200 ring-1 ring-teal-500/40 shadow-md'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-3xl block mb-2">{p.icon}</span>
                      <h3 className="text-sm font-bold text-slate-100">{p.title}</h3>
                      <span className="text-[11px] font-semibold text-teal-400 block mt-0.5">
                        {p.role}
                      </span>
                    </div>
                    {p.flowArrowLabel && (
                      <span className="text-[10px] text-slate-400 font-mono-num mt-2 pt-2 border-t border-slate-850">
                        {p.flowArrowLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Participant Detail Box */}
            {storyCfg.participants.find((p) => p.id === activeParticipantId) && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {storyCfg.participants.find((p) => p.id === activeParticipantId)?.icon}
                  </span>
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {storyCfg.participants.find((p) => p.id === activeParticipantId)?.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {storyCfg.participants.find((p) => p.id === activeParticipantId)?.details}
                </p>
              </div>
            )}

            {/* Interactive Decision Check */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                The Core Friction Question:
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                {storyCfg.decisionQuestion}
              </h3>

              <div className="space-y-2.5">
                {storyCfg.options.map((opt) => {
                  const isSelected = decisionAnswerId === opt.id;
                  let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (decisionSubmitted) {
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
                      disabled={decisionSubmitted}
                      onClick={() => setDecisionAnswerId(opt.id)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${style}`}
                    >
                      <span className="font-semibold block">{opt.text}</span>
                      {decisionSubmitted && (opt.isCorrect || isSelected) && (
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

              {!decisionSubmitted && (
                <div className="flex justify-end pt-2">
                  <button
                    disabled={!decisionAnswerId}
                    onClick={() => setDecisionSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <span>Check Answer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Concept Explanation Card (Appears after decision) */}
            {decisionSubmitted && (
              <div className="space-y-6 pt-2 animate-in fade-in duration-300">
                <div className="p-5 sm:p-6 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-teal-400" />
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      {storyCfg.conceptExplanation.title}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-100">
                    {storyCfg.conceptExplanation.summary}
                  </h4>
                  <div className="space-y-2 pt-1">
                    {storyCfg.conceptExplanation.corePoints.map((pt, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >
                        <div className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          {idx + 1}
                        </div>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reflection Check */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Reflection Check
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100">
                    {storyCfg.reflectionQuestion}
                  </h4>

                  <div className="space-y-2.5">
                    {storyCfg.reflectionOptions.map((opt) => {
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
                        <span>Check Reflection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleChildComplete(activity.xpReward)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/25"
                      >
                        <span>Complete Step 1 & Claim +{activity.xpReward} XP</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
