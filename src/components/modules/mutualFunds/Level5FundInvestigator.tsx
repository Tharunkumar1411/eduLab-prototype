import React, { useState } from 'react';
import {
  LEVEL_5_FORENSIC_FUNDS,
  LEVEL_5_CASE_CLUES,
  ForensicCaseClue,
  FictionalMutualFund,
} from '../../../data/mutualFundsData.ts';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Award,
  HelpCircle,
  FileText,
  BarChart3,
  ShieldCheck,
  Percent,
  Sparkles,
} from 'lucide-react';

interface Level5FundInvestigatorProps {
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

type StageType = 'brief' | 'evidence_board' | 'thesis_formulation' | 'debrief' | 'completed';

export const Level5FundInvestigator: React.FC<Level5FundInvestigatorProps> = ({ onComplete, onBack }) => {
  const [stage, setStage] = useState<StageType>('brief');
  const [selectedClueId, setSelectedClueId] = useState<string>('clue_rolling_vs_point');
  const [unlockedClueIds, setUnlockedClueIds] = useState<string[]>([
    'clue_rolling_vs_point',
    'clue_ter_cost',
    'clue_portfolio_concentration',
  ]);
  const [selectedFundStance, setSelectedFundStance] = useState<string | null>(null);
  const [selectedKeyReasons, setSelectedKeyReasons] = useState<string[]>([]);
  const [reasoningScore, setReasoningScore] = useState<number>(0);

  const selectedClue = LEVEL_5_CASE_CLUES.find((c) => c.id === selectedClueId) || LEVEL_5_CASE_CLUES[0];

  const handleClueClick = (clueId: string) => {
    setSelectedClueId(clueId);
    if (!unlockedClueIds.includes(clueId)) {
      setUnlockedClueIds((prev) => [...prev, clueId]);
    }
  };

  const handleToggleKeyReason = (reasonId: string) => {
    setSelectedKeyReasons((prev) =>
      prev.includes(reasonId) ? prev.filter((r) => r !== reasonId) : [...prev, reasonId]
    );
  };

  const handleSubmitThesis = () => {
    // Deterministic evaluation of analytical rigor
    let score = 50;

    // Rejecting Starlight (or citing high fee / underperformance) adds points
    if (selectedFundStance === 'apex_index') {
      score += 35; // Sound low-cost indexing stance
    } else if (selectedFundStance === 'horizon_hybrid') {
      score += 30; // Sound downside protection stance
    } else if (selectedFundStance === 'starlight_active') {
      score -= 20; // Chasing 1-year return without noticing negative alpha
    }

    if (selectedKeyReasons.includes('r_ter_drag')) score += 10;
    if (selectedKeyReasons.includes('r_rolling_underperformance')) score += 10;
    if (selectedKeyReasons.includes('r_one_year_headline')) score -= 25; // Blind headline chasing penalty

    const finalScore = Math.min(100, Math.max(30, score));
    setReasoningScore(finalScore);
    setStage('debrief');
  };

  const handleFinishLevel = () => {
    setStage('completed');
    onComplete(350);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Mutual Funds Hub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-teal-400">Level 5 of 5</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">The Fund Comparison Case</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* ======================================================== */}
        {/* STAGE 1: CASE BRIEF */}
        {/* ======================================================== */}
        {stage === 'brief' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Search className="w-3.5 h-3.5" />
                <span>Forensic Investigation Case #04</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                The Fund Selection Dilemma
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Maya (31, Architect) has saved ₹3,00,000 for her daughter's higher education fund,
                a goal with an explicitly stated <strong>7-year investment horizon</strong>.
                A financial distributor recommended <strong>Starlight High-Alpha Midcap</strong>, citing its dazzling 32.4% 1-year return.
                Maya asks you to investigate before she commits her hard-earned savings.
              </p>
            </div>

            {/* The 3 Shortlisted Funds Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LEVEL_5_FORENSIC_FUNDS.map((f) => (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-200">{f.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-900 text-teal-300 border border-slate-700">
                      {f.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 pt-1 space-y-1">
                    <div className="flex justify-between">
                      <span>1-Yr Return:</span>
                      <span className="font-bold text-emerald-400 font-mono-num">+{f.historicalReturns.oneYear}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5-Yr Return:</span>
                      <span className="font-bold text-slate-200 font-mono-num">+{f.historicalReturns.fiveYearAnnualized}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TER (Fee):</span>
                      <span className={`font-bold font-mono-num ${f.expenseRatioPercent > 1.5 ? 'text-rose-400' : 'text-teal-400'}`}>
                        {f.expenseRatioPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs sm:text-sm text-teal-200 space-y-1">
              <span className="font-bold text-teal-300 block">Your Detective Mission</span>
              <p className="opacity-95 leading-relaxed">
                Step into the evidence room. Inspect the forensic clues regarding rolling returns,
                expense ratios, and concentration risk. Formulate your investment thesis based on sound reasoning!
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStage('evidence_board')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Enter Forensic Clue Board</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 2: EVIDENCE CLUE BOARD */}
        {/* ======================================================== */}
        {stage === 'evidence_board' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Interactive Clue Board
                </span>
                <span className="text-xs text-slate-400">
                  {unlockedClueIds.length} of {LEVEL_5_CASE_CLUES.length} Clues Inspected
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                Inspect the Forensic Evidence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left Column: Clue List */}
              <div className="space-y-2">
                {LEVEL_5_CASE_CLUES.map((clue) => {
                  const isSelected = selectedClueId === clue.id;
                  const isUnlocked = unlockedClueIds.includes(clue.id);

                  return (
                    <button
                      key={clue.id}
                      onClick={() => handleClueClick(clue.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1 block ${
                        isSelected
                          ? 'bg-teal-950/60 border-teal-500 shadow-md ring-1 ring-teal-500/50'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                          Clue #{clue.clueNumber}
                        </span>
                        <span className="text-[10px] text-slate-500">{clue.category}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200 line-clamp-1">
                        {clue.title}
                      </h4>
                    </button>
                  );
                })}
              </div>

              {/* Right 2 Columns: Detailed Clue Analysis */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                      Clue #{selectedClue.clueNumber} · {selectedClue.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                      {selectedClue.title}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${
                      selectedClue.implication === 'critical_flag'
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {selectedClue.implication === 'critical_flag' ? '⚠️ Red Flag' : '✓ Sound Factor'}
                  </span>
                </div>

                {/* Metric Strip */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {selectedClue.metricLabel}
                  </span>
                  <p className="text-sm font-extrabold text-amber-300 font-mono-num">
                    {selectedClue.metricComparison}
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p className="font-medium text-slate-200">{selectedClue.summary}</p>
                  <p className="text-slate-400 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {selectedClue.detailedAnalysis}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStage('thesis_formulation')}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Formulate Maya's Investment Thesis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 3: THESIS FORMULATION */}
        {/* ======================================================== */}
        {stage === 'thesis_formulation' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>Formulate Analytical Stance</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                What Recommendation Best Protects & Grows Maya's 7-Year Goal?
              </h2>
              <p className="text-sm text-slate-300">
                Choose the primary stance and select the key forensic arguments that justify your conclusion.
              </p>
            </div>

            {/* Step A: Primary Stance */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Step 1: Choose Recommended Scheme Direction
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'apex_index',
                    title: 'Apex Broad Nifty 50 Index',
                    subtitle: 'Lowest cost (0.15%), zero manager risk, solid 5-year rolling compounding.',
                  },
                  {
                    id: 'horizon_hybrid',
                    title: 'Horizon Balanced Advantage',
                    subtitle: 'Downside cushioning with sovereign debt, moderate growth for a 7-year timeline.',
                  },
                  {
                    id: 'starlight_active',
                    title: 'Starlight High-Alpha Midcap',
                    subtitle: 'Chasing the 32.4% 1-year return, despite 2.15% fee drag and rolling underperformance.',
                  },
                ].map((s) => {
                  const isSelected = selectedFundStance === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedFundStance(s.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-teal-950/60 border-teal-500 shadow-md ring-1 ring-teal-500/50'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-100 block">{s.title}</span>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.subtitle}</p>
                      </div>
                      <div className="text-[10px] font-bold text-teal-400 pt-2">
                        {isSelected ? '✓ Selected Stance' : 'Click to Select'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step B: Select Supporting Evidence Arguments */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Step 2: Check All Analytical Arguments That Support Your Recommendation
              </label>

              <div className="space-y-2">
                {[
                  {
                    id: 'r_ter_drag',
                    label: 'The 2.0% annual fee difference in Starlight will erode ~20% of Maya’s compounded profits over 7-10 years.',
                  },
                  {
                    id: 'r_rolling_underperformance',
                    label: 'Starlight actually underperformed its benchmark by 3.4% p.a. over 5-year rolling windows (negative alpha).',
                  },
                  {
                    id: 'r_one_year_headline',
                    label: 'We should always pick whichever fund had the highest 1-year return in the newspaper table.',
                  },
                  {
                    id: 'r_diversification',
                    label: 'Holding 50 top bluechips with 0.04% tracking error eliminates key-person risk and speculative stock-picking churn.',
                  },
                ].map((r) => {
                  const isChecked = selectedKeyReasons.includes(r.id);
                  return (
                    <div
                      key={r.id}
                      onClick={() => handleToggleKeyReason(r.id)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${
                        isChecked
                          ? 'bg-teal-950/40 border-teal-500 text-teal-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="accent-teal-400 w-4 h-4 rounded cursor-pointer shrink-0"
                      />
                      <span>{r.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedFundStance && selectedKeyReasons.length > 0 && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSubmitThesis}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  <span>Submit Forensic Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 4: EVALUATIVE DEBRIEF */}
        {/* ======================================================== */}
        {stage === 'debrief' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                    Forensic Reasoning Evaluation
                  </span>
                  <h3 className="text-xl font-black text-slate-100 mt-0.5">
                    {reasoningScore >= 80 ? 'Exceptional Analytical Rigor!' : 'Solid Effort with Learning Takeaways'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Reasoning Score:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono-num">
                    {reasoningScore} / 100
                  </span>
                </div>
              </div>

              {/* Case Findings Summary */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-200 block">Why the Marketing Advice Was a Trap:</span>
                  <p className="text-slate-400">
                    The distributor recommended Starlight based purely on its recent 32.4% 1-year return.
                    However, your evidence revealed that Starlight:
                  </p>
                  <ul className="list-disc pl-5 text-slate-400 space-y-1 text-xs">
                    <li>Suffered a severe <strong>2.15% annual TER fee drag</strong>.</li>
                    <li>Had a high <strong>68% turnover churn</strong>, bleeding trading costs.</li>
                    <li>Underperformed its 5-year rolling benchmark by <strong>-3.4% per year</strong>!</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-2">
                  <span className="font-bold text-teal-300 block">The Winning Analytical Defense:</span>
                  <p className="text-teal-200 text-xs">
                    Either <strong>Apex Broad Nifty 50 Index (0.15% TER)</strong> or <strong>Horizon Balanced Advantage</strong> was a defensible recommendation.
                    Apex guarantees Maya captures pure economic expansion with virtually zero fee drag.
                    Horizon offers downside risk buffers with sovereign debt. Both protect Maya from the volatile single-manager active trap.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleFinishLevel}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:brightness-110 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
              >
                <span>Claim Mutual Funds Master Badge (+350 XP)</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 5: COMPLETED */}
        {/* ======================================================== */}
        {stage === 'completed' && (
          <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 via-teal-500/20 to-emerald-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-3xl shadow-xl">
              🏆
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Phase 2 Curriculum Completed!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-100">
                Mutual Funds Master
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                You have successfully mastered pooled investing, NAV mechanics, SIP compounding, fund category selection, and forensic fee evaluation!
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-base shadow-md">
              <Award className="w-5 h-5" />
              <span>+350 XP Milestone Claimed</span>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                Return to Mutual Funds Overview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
