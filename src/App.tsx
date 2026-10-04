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
import { HomeView } from './components/home/HomeView.tsx';
import { ThemeToggle } from './components/common/ThemeToggle.tsx';
import { PathNode } from './data/learningPath.ts';
import { Award, BookOpen, Bot, CheckCircle2, Compass, Flame, Home, MessageSquare, Shield, Sparkles, TrendingUp, User, Zap } from 'lucide-react';

type MainPillar = 'home' | 'playground' | 'tools';

export default function App() {
  const [activePillar, setActivePillar] = useState<MainPillar>('home');
  const [activeCase, setActiveCase] = useState<PlaygroundCase | null>(null);
  const [initialPlaygroundNode, setInitialPlaygroundNode] = useState<PathNode | null>(null);
  const [initialLabStockSymbol, setInitialLabStockSymbol] = useState<string | undefined>(undefined);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Live progress tracking across Playground & Trading Lab
  const [caseProgress, setCaseProgress] = useState<CaseProgress | null>(null);
  const [labProgress, setLabProgress] = useState<LabProgress | null>(null);

  // User state (in-memory for instant feedback)
  const [userXp, setUserXp] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [streakDays, setStreakDays] = useState<number>(3);
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

  const handleStartOrContinueLessonFromHome = (node: PathNode) => {
    setInitialPlaygroundNode(node);
    setActivePillar('playground');
    setActiveCase(null);
  };

  const handleInvestigateCaseFromHome = (caseItem: PlaygroundCase) => {
    setActiveCase(caseItem);
    setActivePillar('playground');
  };

  const handleExploreSectorInLabFromHome = (stockSymbol: string) => {
    setInitialLabStockSymbol(stockSymbol);
    setActivePillar('tools');
    setActiveCase(null);
  };

  // AI Chat Drawer State (triggers from Home AI prompt section or floating button)
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatExternalPrompt, setChatExternalPrompt] = useState<string | null>(null);

  const handleAskAiFromHome = (prompt: string) => {
    setChatExternalPrompt(prompt);
    setIsChatOpen(true);
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
          FinCraft is an interactive educational playground. All market cases & backtest simulations are purely for learning. Not SEBI registered investment advice.
        </span>
      </div>

      {/* Primary Header & Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => {
              setActivePillar('home');
              setActiveCase(null);
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-900/40 text-white font-bold text-lg font-mono-num">
              ₹
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-100 block">
                FinCraft
              </span>
              <span className="text-[10px] text-teal-400 font-medium block tracking-wide">
                Build your financial skills.
              </span>
            </div>
          </div>

          {/* Desktop Product Navigation Switcher */}
          <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActivePillar('home');
                setActiveCase(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activePillar === 'home' && !activeCase
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setActivePillar('playground');
                setActiveCase(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activePillar === 'playground'
                  ? 'bg-teal-600 text-white shadow-xs'
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activePillar === 'tools'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trading Lab</span>
            </button>
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProfileModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 transition-colors cursor-pointer"
              title="View Learner Profile"
            >
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium">Profile</span>
            </button>

            <ThemeToggle />

            <button
              onClick={() => setShowFeedbackModal(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-teal-300 transition-colors cursor-pointer"
              title="Share Feedback"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {activePillar === 'home' && !activeCase ? (
          <HomeView
            userXp={userXp}
            userLevel={userLevel}
            streakDays={streakDays}
            completedNodeIds={completedNodeIds}
            completedCaseIds={completedCaseIds}
            onStartOrContinueLesson={handleStartOrContinueLessonFromHome}
            onInvestigateCase={handleInvestigateCaseFromHome}
            onExploreSectorInLab={handleExploreSectorInLabFromHome}
            onGoToPlayground={() => {
              setActivePillar('playground');
              setActiveCase(null);
            }}
            onAskAi={handleAskAiFromHome}
          />
        ) : activePillar === 'playground' || activeCase ? (
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
              initialOpenNode={initialPlaygroundNode}
              onClearInitialNode={() => setInitialPlaygroundNode(null)}
            />
          )
        ) : (
          <TradingLab
            onGoToPlayground={() => {
              setActivePillar('playground');
              setActiveCase(null);
            }}
            onLabStateUpdate={setLabProgress}
            initialStockSymbol={initialLabStockSymbol}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb Friendly, 44px+ hit targets) */}
      <nav
        aria-label="Mobile Navigation"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1 grid grid-cols-4 items-center shadow-2xl"
      >
        <button
          onClick={() => {
            setActivePillar('home');
            setActiveCase(null);
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 transition-colors cursor-pointer ${
            activePillar === 'home' && !activeCase ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </button>

        <button
          onClick={() => {
            setActivePillar('playground');
            setActiveCase(null);
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 transition-colors cursor-pointer ${
            activePillar === 'playground' && !activeCase ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Playground</span>
        </button>

        <button
          onClick={() => {
            setActivePillar('tools');
            setActiveCase(null);
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 transition-colors cursor-pointer ${
            activePillar === 'tools' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Trading Lab</span>
        </button>

        <button
          onClick={() => setShowProfileModal(true)}
          className="flex flex-col items-center justify-center min-h-[46px] py-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Profile</span>
        </button>
      </nav>

      {/* Beginner-friendly Profile / Progress Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
                  🎓
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">Learner Profile</h3>
                  <span className="text-xs text-slate-400">FinCraft Learner</span>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Streak</span>
                <span className="text-lg font-bold text-amber-400 flex items-center gap-1 font-mono-num mt-0.5">
                  <Flame className="w-4 h-4 fill-amber-500/20" />
                  {streakDays} Days
                </span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Total XP</span>
                <span className="text-lg font-bold text-teal-300 font-mono-num mt-0.5 block">
                  {userXp.toLocaleString()} XP
                </span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Level</span>
                <span className="text-lg font-bold text-slate-100 mt-0.5 block">
                  Level {userLevel}
                </span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Lessons</span>
                <span className="text-lg font-bold text-emerald-400 font-mono-num mt-0.5 block">
                  {completedNodeIds.length} Done
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-teal-400 block">Forensic Cases Solved</span>
              <p className="text-slate-400">
                {completedCaseIds.length > 0
                  ? `${completedCaseIds.length} mystery cases investigated and resolved.`
                  : 'No cases solved yet. Try Today’s Investigation on the Home screen!'}
              </p>
            </div>

            {/* Theme Preference Setting */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Appearance</span>
                <span className="text-[11px] text-slate-400">Light or dark theme</span>
              </div>
              <ThemeToggle showLabel={true} />
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}

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
            <span className="font-semibold text-slate-400">FinCraft</span>
            <span>·</span>
            <span>Build your financial skills.</span>
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
      <InspectorFinChatbot
        context={chatContext}
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        externalPrompt={chatExternalPrompt}
        onClearExternalPrompt={() => setChatExternalPrompt(null)}
      />
    </div>
  );
}
