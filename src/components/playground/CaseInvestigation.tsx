/**
 * Interactive Detective Case Investigation Flow.
 * Handles: Scenario -> Investigation (with 3 tokens) -> Formulate Thesis (Q22: 🟢/🟡/🔴) -> Select Influencing Evidence -> Debrief.
 */

import React, { useState } from 'react';
import { CaseDecision, PlaygroundCase } from '../../data/cases.ts';
import { CharacterMentor, CharacterState } from '../character/CharacterMentor.tsx';
import { ClueClassification, EvidenceBoard } from './EvidenceBoard.tsx';
import { ArrowLeft, ArrowRight, Award, CheckCircle, CheckCircle2, RotateCcw, TrendingUp } from 'lucide-react';

export interface CaseProgress {
  caseId: string;
  caseTitle: string;
  caseTicker: string;
  caseCompany: string;
  step: 'scenario' | 'investigate' | 'decision' | 'debrief';
  unlockedClueCount: number;
  unlockedClueTitles: string[];
  totalCluesCount: number;
  actionPointsRemaining: number;
  concernCount: number;
  supportCount: number;
  neutralCount: number;
  selectedDecisionTitle?: string;
  reasoningScore?: number;
}

interface CaseInvestigationProps {
  caseData: PlaygroundCase;
  onBack: () => void;
  onCompleteCase: (caseId: string, xpEarned: number) => void;
  onGoToTradingLab: () => void;
  onProgressUpdate?: (progress: CaseProgress) => void;
}

type InvestigationStep = 'scenario' | 'investigate' | 'decision' | 'debrief';

export const CaseInvestigation: React.FC<CaseInvestigationProps> = ({
  caseData,
  onBack,
  onCompleteCase,
  onGoToTradingLab,
  onProgressUpdate,
}) => {
  const [step, setStep] = useState<InvestigationStep>('scenario');
  const [unlockedClueIds, setUnlockedClueIds] = useState<string[]>([]);
  const [selectedClueId, setSelectedClueId] = useState<string | null>(null);
  const [actionPointsRemaining, setActionPointsRemaining] = useState<number>(caseData.actionPointsMax);
  const [classifications, setClassifications] = useState<Record<string, ClueClassification>>({});
  const [selectedDecision, setSelectedDecision] = useState<CaseDecision | null>(null);
  const [influencingEvidenceIds, setInfluencingEvidenceIds] = useState<string[]>([]);
  const [mentorState, setMentorState] = useState<CharacterState>('idle');
  const [mentorMessage, setMentorMessage] = useState<string>(
    `Welcome to the investigation! ${caseData.companyName} rocketed 180% then went dead flat for 8 months. You have ${caseData.actionPointsMax} tokens. Choose your leads wisely!`
  );
  const [mentorSubMessage, setMentorSubMessage] = useState<string>(
    'Look past headline hype. True clues live in earnings margins, valuation context, and debt.'
  );
  const [userRating, setUserRating] = useState<string | null>(null);

  // Sync progress updates to parent / ChatContext
  React.useEffect(() => {
    if (onProgressUpdate) {
      const unlockedClues = caseData.clues.filter(c => unlockedClueIds.includes(c.id));
      const concernCount = Object.values(classifications).filter(c => c === 'concern').length;
      const supportCount = Object.values(classifications).filter(c => c === 'support').length;
      const neutralCount = Object.values(classifications).filter(c => c === 'neutral').length;

      onProgressUpdate({
        caseId: caseData.id,
        caseTitle: caseData.title,
        caseTicker: caseData.ticker,
        caseCompany: caseData.companyName,
        step,
        unlockedClueCount: unlockedClueIds.length,
        unlockedClueTitles: unlockedClues.map(c => c.title),
        totalCluesCount: caseData.clues.length,
        actionPointsRemaining,
        concernCount,
        supportCount,
        neutralCount,
        selectedDecisionTitle: selectedDecision?.label,
        reasoningScore: selectedDecision?.reasoningScore,
      });
    }
  }, [step, unlockedClueIds, classifications, actionPointsRemaining, selectedDecision, caseData, onProgressUpdate]);

  // Unlocking clue logic
  const handleUnlockClue = (clueId: string) => {
    if (actionPointsRemaining <= 0 || unlockedClueIds.includes(clueId)) return;

    setUnlockedClueIds(prev => [...prev, clueId]);
    setActionPointsRemaining(prev => prev - 1);
    setSelectedClueId(clueId);

    const clue = caseData.clues.find(c => c.id === clueId);
    if (!clue) return;

    // Default influencing evidence includes unlocked clues
    if (!influencingEvidenceIds.includes(clueId)) {
      setInfluencingEvidenceIds(prev => [...prev, clueId]);
    }

    // Mentor context reaction
    if (clue.id.includes('earnings')) {
      setMentorState('surprised');
      setMentorMessage(
        'Warning sign! Look at that: Revenue grew 28% from heavy discounting, but operating margins collapsed from 16.5% to 5.8%!'
      );
      setMentorSubMessage('Never trust top-line sales growth if profit margins are shrinking.');
    } else if (clue.id.includes('valuation') || clue.id.includes('pe')) {
      setMentorState('thinking');
      setMentorMessage(
        'P/E is 48.2× compared to peer median of 22.5×! The stock is priced for perfection. Any stumble in earnings will trigger multiple compression.'
      );
      setMentorSubMessage('High P/E requires hyper-growth. If growth normalizes, multiples contract violently.');
    } else if (clue.id.includes('debt')) {
      setMentorState('confused');
      setMentorMessage(
        'Short-term borrowings surged 160% to ₹310 Cr! Finance costs jumped to ₹38 Cr to fund unpaid dealer credit.'
      );
      setMentorSubMessage('Heavy debt turns operating hiccups into solvency risk.');
    } else if (clue.id.includes('competitors')) {
      setMentorState('thinking');
      setMentorMessage(
        'Competitors entered with 15% cheaper prices under the PLI scheme and snatched 14% market share.'
      );
      setMentorSubMessage('Lack of pricing power forces ongoing promotional subsidies.');
    } else if (clue.id.includes('industry')) {
      setMentorState('happy');
      setMentorMessage(
        'Indian AC penetration is under 10% vs 65% in China. The 10-year macro runway for the category is very real.'
      );
      setMentorSubMessage('Macro demand is supportive, but management execution and pricing power still matter.');
    } else {
      setMentorState('talking');
      setMentorMessage(
        `Examining ${clue.title}. How does this piece fit into the company's broader economic puzzle?`
      );
      setMentorSubMessage('Classify this clue as Support, Concern, or Neutral to sharpen your thesis.');
    }
  };

  const handleClassifyClue = (clueId: string, classification: ClueClassification) => {
    setClassifications(prev => ({ ...prev, [clueId]: classification }));
    setMentorState('happy');
    setMentorMessage(
      `Evidence classified! Building your thesis is about weighing concerns against competitive tailwinds.`
    );
    setMentorSubMessage(`${Object.keys(classifications).length + 1} piece(s) of evidence now organized.`);
  };

  const handleSelectDecision = (decision: CaseDecision) => {
    setSelectedDecision(decision);
  };

  const toggleInfluencingEvidence = (clueId: string) => {
    setInfluencingEvidenceIds(prev =>
      prev.includes(clueId) ? prev.filter(id => id !== clueId) : [...prev, clueId]
    );
  };

  const handleSubmitDecision = () => {
    if (!selectedDecision) return;
    setStep('debrief');

    if (selectedDecision.reasoningScore >= 80) {
      setMentorState('celebrating');
      setMentorMessage(
        `Brilliant forensic deduction! You evaluated operating margins, debt, and valuation context instead of blindly chasing the prior 180% stock momentum.`
      );
      setMentorSubMessage(`Reasoning Score: ${selectedDecision.reasoningScore}/100. You earned +${caseData.xpReward} XP!`);
    } else {
      setMentorState('thinking');
      setMentorMessage(
        `A classic retail trap. You anchored to the 180% past rally and top-line sales, but missed the balance sheet warning signs.`
      );
      setMentorSubMessage(`Reasoning Score: ${selectedDecision.reasoningScore}/100. Learning from mistakes is how top analysts are forged.`);
    }

    onCompleteCase(caseData.id, caseData.xpReward);
  };

  const handleResetCase = () => {
    setStep('scenario');
    setUnlockedClueIds([]);
    setSelectedClueId(null);
    setActionPointsRemaining(caseData.actionPointsMax);
    setClassifications({});
    setSelectedDecision(null);
    setInfluencingEvidenceIds([]);
    setMentorState('idle');
    setMentorMessage(`Ready for another run? Inspect different clues to compare hypotheses.`);
    setMentorSubMessage('A true investigator leaves no stone unturned.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header / Case Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-teal-400 font-semibold">{caseData.levelTitle}</span>
              <span>·</span>
              <span>{caseData.industry}</span>
              <span>·</span>
              <span>{caseData.estimatedMinutes} min investigation</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span>{caseData.title}</span>
              <span className="text-xs font-mono-num font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                NSE: {caseData.ticker}
              </span>
            </h1>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-xs font-medium">
          <span
            className={`px-3 py-1 rounded transition-colors ${
              step === 'scenario' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400'
            }`}
          >
            1. Briefing
          </span>
          <span className="text-slate-600">→</span>
          <span
            className={`px-3 py-1 rounded transition-colors ${
              step === 'investigate' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400'
            }`}
          >
            2. Investigate ({actionPointsRemaining} tokens)
          </span>
          <span className="text-slate-600">→</span>
          <span
            className={`px-3 py-1 rounded transition-colors ${
              step === 'decision' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400'
            }`}
          >
            3. Build Thesis
          </span>
          <span className="text-slate-600">→</span>
          <span
            className={`px-3 py-1 rounded transition-colors ${
              step === 'debrief' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400'
            }`}
          >
            4. Debrief
          </span>
        </div>
      </div>

      {/* Mentor Bubble Component */}
      <CharacterMentor
        state={mentorState}
        message={mentorMessage}
        subMessage={mentorSubMessage}
        showHintButton={step === 'investigate' && actionPointsRemaining > 0}
        onHintClick={() => {
          setMentorState('thinking');
          setMentorMessage(
            `Hint: Look closely at Earnings Margins and Debt. When a company's sales rise through discounting while short-term debt doubles, who is funding the expansion?`
          );
        }}
      />

      {/* Step 1: Scenario Briefing */}
      {step === 'scenario' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold block mb-2">
                Level 12 Dossier
              </span>
              <h2 className="text-2xl font-bold text-slate-100">
                {caseData.hook}
              </h2>
            </div>

            {/* Price Chart Snapshot */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Historical Performance</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-2xl font-bold font-mono-num text-slate-100">
                      {caseData.stockChartSummary.currentPrice}
                    </span>
                    <span className="text-xs font-bold font-mono-num text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                      {caseData.stockChartSummary.gain} in {caseData.stockChartSummary.period}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Recent Behavior</span>
                  <span className="text-sm font-semibold text-amber-300 mt-1 block">
                    {caseData.stockChartSummary.flatPeriod}
                  </span>
                </div>
              </div>

              {/* Visual mini momentum illustration */}
              <div className="h-28 w-full bg-slate-900/60 rounded-lg border border-slate-800/80 p-3 flex items-end relative overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Rocket phase */}
                  <path
                    d="M 10 90 Q 70 85, 120 50 T 220 20 L 260 22 L 300 24 L 340 21 L 390 23"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Fill area */}
                  <path
                    d="M 10 90 Q 70 85, 120 50 T 220 20 L 260 22 L 300 24 L 340 21 L 390 23 L 390 100 L 10 100 Z"
                    fill="url(#chartGrad)"
                  />
                </svg>
                <div className="absolute top-3 left-4 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                  Phase 1: +180% Rally
                </div>
                <div className="absolute top-3 right-4 text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40">
                  Phase 2: 8-Month Sideways Consolidation
                </div>
              </div>
            </div>

            {/* Scenario Narrative */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-950/50 p-5 rounded-xl border border-slate-850">
              {caseData.scenarioDescription}
            </div>

            {/* Action Token Briefing */}
            <div className="p-4 bg-teal-950/30 border border-teal-800/40 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                  Investigation Budget
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  You have <span className="text-amber-400 font-bold font-mono-num">{caseData.actionPointsMax} investigation tokens</span>. Each file costs 1 token. Choose which 3 areas to inspect!
                </p>
              </div>

              <button
                onClick={() => setStep('investigate')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-950/50 transition-all cursor-pointer"
              >
                <span>Open Evidence Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Investigation Room */}
      {step === 'investigate' && (
        <div className="space-y-6">
          <EvidenceBoard
            clues={caseData.clues}
            unlockedClueIds={unlockedClueIds}
            classifications={classifications}
            selectedClueId={selectedClueId}
            actionPointsRemaining={actionPointsRemaining}
            onUnlockClue={handleUnlockClue}
            onSelectClue={(id) => setSelectedClueId(id)}
            onClassifyClue={handleClassifyClue}
          />

          {/* Proceed to Thesis Banner */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span>{unlockedClueIds.length} clue(s) inspected</span>
              <span className="mx-2">·</span>
              <span>{actionPointsRemaining} token(s) remaining</span>
              {actionPointsRemaining === 0 && (
                <span className="text-amber-400 font-medium ml-2">All 3 tokens utilized! Ready to build thesis.</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep('scenario')}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
              >
                ← Review Briefing
              </button>

              <button
                onClick={() => setStep('decision')}
                disabled={unlockedClueIds.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  unlockedClueIds.length > 0
                    ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-md shadow-teal-900/40'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>Proceed to Q22: Build Thesis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Q22 — Build Your Thesis */}
      {step === 'decision' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
                Q22 — Build Your Thesis
              </span>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded font-mono-num font-bold">
                +350 XP
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">
              Based on the evidence you've collected, what is your current view?
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Instead of simple BUY or SELL, select your analytical stance:
            </p>
          </div>

          {/* 3 Stance Options: 🟢 / 🟡 / 🔴 */}
          <div className="space-y-3">
            {caseData.decisions.map((decision) => {
              const isSelected = selectedDecision?.id === decision.id;

              return (
                <div
                  key={decision.id}
                  onClick={() => handleSelectDecision(decision)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? decision.stance === 'concern'
                        ? 'bg-rose-950/30 border-rose-500 shadow-lg ring-1 ring-rose-500/50'
                        : decision.stance === 'evidence_needed'
                        ? 'bg-amber-950/30 border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                        : 'bg-emerald-950/30 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850/70'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-6 h-6 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? decision.stance === 'concern'
                            ? 'border-rose-400 bg-rose-500 text-white'
                            : decision.stance === 'evidence_needed'
                            ? 'border-amber-400 bg-amber-500 text-slate-950'
                            : 'border-emerald-400 bg-emerald-500 text-slate-950'
                          : 'border-slate-600 bg-slate-900'
                      }`}
                    >
                      {isSelected ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : null}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-base font-bold text-slate-100">
                        {decision.label}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {decision.thesisSummary}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Follow-up question: Which evidence influenced your decision? */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                Which evidence influenced your decision?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Select the clues that primarily shaped your thesis:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {caseData.clues.map((clue) => {
                const isInspected = unlockedClueIds.includes(clue.id);
                const isInfluencer = influencingEvidenceIds.includes(clue.id);

                return (
                  <button
                    key={clue.id}
                    type="button"
                    onClick={() => toggleInfluencingEvidence(clue.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isInfluencer
                        ? 'bg-teal-950/40 border-teal-500 text-teal-200'
                        : isInspected
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="truncate">
                      <span className="font-semibold block truncate">{clue.title}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{clue.metricValue}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isInfluencer
                          ? 'bg-teal-500 border-teal-400 text-slate-950'
                          : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isInfluencer && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setStep('investigate')}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              ← Back to Evidence Room
            </button>

            <button
              onClick={handleSubmitDecision}
              disabled={!selectedDecision}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDecision
                  ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-md shadow-teal-900/40'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>Submit Thesis & Reveal Debrief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Debrief & Postmortem */}
      {step === 'debrief' && selectedDecision && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-8">
          {/* Debrief Header with Score */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold block mb-1">
                Case Postmortem & Evaluation
              </span>
              <h2 className="text-2xl font-bold text-slate-100">
                Evaluation of Your Reasoning
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Thesis chosen: <span className="font-bold text-teal-300">{selectedDecision.label}</span>
              </p>
            </div>

            {/* Score Badge */}
            <div className="flex items-center gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 shrink-0">
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Reasoning Quality</span>
                <span className="text-xs text-emerald-400 font-semibold">
                  +{caseData.xpReward} XP Awarded
                </span>
              </div>
              <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-teal-500 flex items-center justify-center font-bold font-mono-num text-xl text-teal-300">
                {selectedDecision.reasoningScore}
              </div>
            </div>
          </div>

          {/* Influencing Evidence Summary */}
          {influencingEvidenceIds.length > 0 && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                Evidence That Influenced Your Thesis ({influencingEvidenceIds.length} leads):
              </span>
              <div className="flex flex-wrap gap-2">
                {caseData.clues
                  .filter(c => influencingEvidenceIds.includes(c.id))
                  .map(clue => (
                    <span
                      key={clue.id}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-teal-950/60 border border-teal-700/60 text-teal-200"
                    >
                      {clue.title}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Analysis & Debrief */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Why This Reasoning Matters
              </h4>
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedDecision.debriefAnalysis}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                What Happened Next in the Market
              </h4>
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-300 leading-relaxed">
                {selectedDecision.marketOutcome}
              </div>
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="p-5 bg-teal-950/20 border border-teal-800/40 rounded-xl flex items-start gap-4">
            <Award className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block mb-1">
                Core Investment Principle
              </span>
              <p className="text-sm font-medium text-slate-100 leading-relaxed">
                "{selectedDecision.coreLesson}"
              </p>
            </div>
          </div>

          {/* In-app Lightweight Feedback Widget */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-300 block">
                How was this case investigation experience?
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Helps us build better interactive cases for your learning journey.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[
                { label: '😕 Tough', id: 'tough' },
                { label: '😐 Okay', id: 'okay' },
                { label: '🙂 Good', id: 'good' },
                { label: '🤩 Loved it!', id: 'loved' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setUserRating(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    userRating === f.id
                      ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                      : 'bg-slate-850 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Action CTAs */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleResetCase}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Investigation</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Back to Learning Path
              </button>

              <button
                onClick={onGoToTradingLab}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-900/40 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Test in Trading Lab →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
