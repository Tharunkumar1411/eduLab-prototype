/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PLAYGROUND_CASES, PlaygroundCase } from './data/cases.ts';
import { PlaygroundHome } from './components/playground/PlaygroundHome.tsx';
import { CaseInvestigation, CaseProgress } from './components/playground/CaseInvestigation.tsx';
import { TradingLab, LabProgress } from './components/tools/TradingLab.tsx';
import { InspectorFinChatbot, ChatContext } from './components/chat/InspectorFinChatbot.tsx';
import { Award, BookOpen, Bot, Flame, MessageSquare, Shield, Sparkles, TrendingUp, Zap } from 'lucide-react';

type MainPillar = 'playground' | 'tools';

export default function App() {
  const [activePillar, setActivePillar] = useState<MainPillar>('playground');
  const [activeCase, setActiveCase] = useState<PlaygroundCase | null>(null);

  // Live progress tracking across Playground & Trading Lab
  const [caseProgress, setCaseProgress] = useState<CaseProgress | null>(null);
  const [labProgress, setLabProgress] = useState<LabProgress | null>(null);

  // User state (in-memory for instant feedback)
  const [userXp, setUserXp] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [streakDays, setStreakDays] = useState<number>(1);
  const [completedCaseIds, setCompletedCaseIds] = useState<string[]>([]);
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]); // Starts fresh at Level 1!
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [feedbackRating, setFeedbackRating] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const handleCompleteNode = (nodeId: string, xpEarned: number) => {
    if (!completedNodeIds.includes(nodeId)) {
      setCompletedNodeIds(prev => [...prev, nodeId]);
      setUserXp(prev => {
        const nextXp = prev + xpEarned;
        const nextLevel = Math.floor(nextXp / 500) + 1;
        if (nextLevel > userLevel) {
          setUserLevel(nextLevel);
        }
        return nextXp;
      });
    }
  };

  const handleCompleteCase = (caseId: string, xpEarned: number) => {
    if (!completedCaseIds.includes(caseId)) {
      setCompletedCaseIds(prev => [...prev, caseId]);
      // Also mark corresponding milestone node as complete
      if (caseId === 'case_vanishing_momentum') {
        setCompletedNodeIds(prev => Array.from(new Set([...prev, 'node_lvl_12'])));
      }
      setUserXp(prev => {
        const nextXp = prev + xpEarned;
        // check level up (500 XP per level)
        const nextLevel = Math.floor(nextXp / 500) + 1;
        if (nextLevel > userLevel) {
          setUserLevel(nextLevel);
        }
        return nextXp;
      });
    }
  };

  // Live, comprehensive context passed to InspectorFinChatbot
  const chatContext: ChatContext = {
    currentPillar: activePillar,
    // Playground state
    activeCaseId: activeCase?.id,
    activeCaseTitle: activeCase?.title,
    activeCaseTicker: activeCase?.ticker,
    caseCompany: activeCase?.companyName,
    caseStep: caseProgress?.step,
    unlockedClueTitles: caseProgress?.unlockedClueTitles,
    unlockedClueCount: caseProgress?.unlockedClueCount,
    totalCluesCount: caseProgress?.totalCluesCount,
    actionPointsRemaining: caseProgress?.actionPointsRemaining,
    concernCount: caseProgress?.concernCount,
    supportCount: caseProgress?.supportCount,
    neutralCount: caseProgress?.neutralCount,
    selectedDecisionTitle: caseProgress?.selectedDecisionTitle,
    reasoningScore: caseProgress?.reasoningScore,
    // Trading Lab state
    selectedStockSymbol: labProgress?.selectedStockSymbol || 'RELIANCE',
    selectedStockName: labProgress?.selectedStockName,
    selectedStockSector: labProgress?.selectedStockSector,
    labTab: labProgress?.labTab || 'explorer',
    strategyName: labProgress?.strategyName,
    entryConditionsCount: labProgress?.entryConditionsCount,
    exitConditionsCount: labProgress?.exitConditionsCount,
    hasStopLoss: labProgress?.hasStopLoss,
    stopLossPercent: labProgress?.stopLossPercent,
    hasTakeProfit: labProgress?.hasTakeProfit,
    takeProfitPercent: labProgress?.takeProfitPercent,
    latestBacktestReturn: labProgress?.latestBacktestReturn,
    latestDrawdown: labProgress?.latestDrawdown,
    benchmarkReturn: labProgress?.benchmarkReturn,
    winRate: labProgress?.winRate,
    totalTrades: labProgress?.totalTrades,
    profitFactor: labProgress?.profitFactor,
    hasExperimentRun: labProgress?.hasExperimentRun,
    experimentReturnDiff: labProgress?.experimentReturnDiff,
    experimentDrawdownDiff: labProgress?.experimentDrawdownDiff,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* SEBI Compliance Educational Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-400 py-1.5 px-4 text-center text-[11px]">
        <span>
          Edulab is an interactive educational playground. All market cases & backtest simulations are purely for learning. Not SEBI registered investment advice.
        </span>
      </div>

      {/* Primary Header & Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-900/40 text-white font-bold text-lg font-mono-num">
              ₹
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-100 block">
                Edulab
              </span>
              <span className="text-[10px] text-teal-400 font-medium block tracking-wide">
                Learn By Doing · Indian Finance
              </span>
            </div>
          </div>

          {/* Core Product Pillars Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActivePillar('playground');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePillar === 'playground'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Playground</span>
            </button>

            <button
              onClick={() => {
                setActivePillar('tools');
                setActiveCase(null);
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePillar === 'tools'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trading Lab</span>
            </button>
          </div>

          {/* User Progress Badge Strip */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
              <div className="flex items-center gap-1 text-amber-400">
                <Flame className="w-3.5 h-3.5" />
                <span className="font-mono-num font-bold">{streakDays}d</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1 text-teal-300 font-mono-num font-bold">
                <Award className="w-3.5 h-3.5 text-teal-400" />
                <span>{userXp} XP</span>
              </div>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-medium">Lvl {userLevel}</span>
            </div>

            <button
              onClick={() => setShowFeedbackModal(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-teal-300 transition-colors"
              title="Share Feedback"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {activePillar === 'playground' ? (
          activeCase ? (
            <CaseInvestigation
              caseData={activeCase}
              onBack={() => {
                setActiveCase(null);
                setCaseProgress(null);
              }}
              onCompleteCase={handleCompleteCase}
              onProgressUpdate={setCaseProgress}
              onGoToTradingLab={() => {
                setActivePillar('tools');
                setActiveCase(null);
              }}
            />
          ) : (
            <PlaygroundHome
              userXp={userXp}
              userLevel={userLevel}
              streakDays={streakDays}
              completedCaseIds={completedCaseIds}
              completedNodeIds={completedNodeIds}
              onCompleteNode={handleCompleteNode}
              onSelectCase={(c) => {
                setActiveCase(c);
                setCaseProgress(null);
              }}
              onGoToTradingLab={() => setActivePillar('tools')}
            />
          )
        ) : (
          <TradingLab
            onGoToPlayground={() => setActivePillar('playground')}
            onLabStateUpdate={setLabProgress}
          />
        )}
      </main>

      {/* Global In-App Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100">
                Product Feedback
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-slate-500 hover:text-slate-300 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <span className="text-2xl">🙏</span>
                <h4 className="text-sm font-bold text-slate-100">Thank you for your feedback!</h4>
                <p className="text-xs text-slate-400">
                  Your inputs directly shape upcoming financial cases and indicator tools.
                </p>
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setFeedbackSubmitted(false);
                  }}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  How does learning investing by investigating cases and visual backtesting compare to reading articles or watching videos?
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'tough', label: '😕 Tough' },
                    { id: 'okay', label: '😐 Okay' },
                    { id: 'good', label: '🙂 Good' },
                    { id: 'loved', label: '🤩 Loved it!' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setFeedbackRating(item.id)}
                      className={`py-2 px-1.5 text-center text-xs font-semibold rounded-lg border transition-all ${
                        feedbackRating === item.id
                          ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    What would make you want to play another case or test another strategy?
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Share any thoughts, ideas, or confusion..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setFeedbackSubmitted(true)}
                    className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm"
                  >
                    Submit Response
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">NiveshLab</span>
            <span>·</span>
            <span>Build. Test. Understand.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Deterministic Indian Blue-chip Data</span>
            <span>·</span>
            <span>Zero Look-Ahead Backtesting</span>
            <span>·</span>
            <span>Educational Simulator</span>
          </div>
        </div>
      </footer>

      {/* Floating Gemini Chatbot Mentor */}
      <InspectorFinChatbot context={chatContext} />
    </div>
  );
}
