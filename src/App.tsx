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
import { SectorLearningHub } from './components/home/sector/SectorLearningHub.tsx';
import { Module01Hub } from './components/modules/module01/Module01Hub.tsx';
import { MicroLessonScreen } from './components/playground/MicroLessonScreen.tsx';
import { GlobalLeaderboard } from './components/leaderboard/GlobalLeaderboard.tsx';
import { getSectorById } from './data/sectors/index.ts';
import { ThemeToggle } from './components/common/ThemeToggle.tsx';
import { AppLogo } from './components/common/AppLogo.tsx';
import { PathNode } from './data/learningPath.ts';
import {
  LearningModuleId,
  ModuleProgress,
  loadAllModulesProgress,
  saveAllModulesProgress,
  recordModuleActivityCompletion,
} from './data/learningModules.ts';
import { ModuleCatalogScreen } from './components/modules/ModuleCatalogScreen.tsx';
import { ModuleNavigationHeader } from './components/modules/ModuleNavigationHeader.tsx';
import { ModuleLandingPage } from './components/modules/ModuleLandingPage.tsx';
import { MutualFundsHub } from './components/modules/mutualFunds/MutualFundsHub.tsx';
import { ArrowLeft, Award, BookOpen, Bot, CheckCircle2, Compass, Flame, Home, LayoutGrid, MessageSquare, Shield, Sparkles, TrendingUp, Trophy, User, Zap } from 'lucide-react';

type MainPillar = 'home' | 'learn' | 'playground' | 'tools';

export default function App() {
  const [activePillar, setActivePillar] = useState<MainPillar>('home');
  const [activeCase, setActiveCase] = useState<PlaygroundCase | null>(null);
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [selectedLearningModuleId, setSelectedLearningModuleId] = useState<LearningModuleId | null>(null);
  const [stocksViewMode, setStocksViewMode] = useState<'overview' | 'path'>('overview');
  const [modulesProgress, setModulesProgress] = useState<Record<LearningModuleId, ModuleProgress>>(() =>
    loadAllModulesProgress()
  );
  const [activePlaygroundLessonNode, setActivePlaygroundLessonNode] = useState<PathNode | null>(null);
  const [initialPlaygroundNode, setInitialPlaygroundNode] = useState<PathNode | null>(null);
  const [initialLabStockSymbol, setInitialLabStockSymbol] = useState<string | undefined>(undefined);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);

  // Live progress tracking across Playground & Trading Lab
  const [caseProgress, setCaseProgress] = useState<CaseProgress | null>(null);
  const [labProgress, setLabProgress] = useState<LabProgress | null>(null);

  // User state (in-memory for instant feedback)
  const [userXp, setUserXp] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [streakDays, setStreakDays] = useState<number>(3);
  const [completedCaseIds, setCompletedCaseIds] = useState<string[]>([]);
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]); // Starts fresh at Level 1!

  const handleAwardXp = (amount: number) => {
    setUserXp(prev => {
      const nextXp = prev + amount;
      const nextLevel = Math.floor(nextXp / 500) + 1;
      if (nextLevel > userLevel) {
        setUserLevel(nextLevel);
      }
      return nextXp;
    });

    // Also attribute XP to the currently active module if applicable
    const activeMod = selectedLearningModuleId || 'stocks';
    setModulesProgress(prev => {
      const modProg = prev[activeMod];
      const nextAll = {
        ...prev,
        [activeMod]: {
          ...modProg,
          earnedXp: modProg.earnedXp + amount,
        },
      };
      saveAllModulesProgress(nextAll);
      return nextAll;
    });
  };
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [feedbackRating, setFeedbackRating] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const handleCompleteNode = (nodeId: string, xpEarned: number) => {
    // 1. Update Stocks module progress idempotently
    setModulesProgress(prev => {
      const stocksProg = prev.stocks;
      const { updatedProgress, xpAwarded } = recordModuleActivityCompletion(stocksProg, nodeId, xpEarned);
      const nextAll = {
        ...prev,
        stocks: updatedProgress,
      };
      saveAllModulesProgress(nextAll);

      // Only award global XP if activity was newly completed (idempotent!)
      if (xpAwarded > 0) {
        setUserXp(curXp => {
          const nextXp = curXp + xpAwarded;
          const nextLevel = Math.floor(nextXp / 500) + 1;
          if (nextLevel > userLevel) {
            setUserLevel(nextLevel);
          }
          return nextXp;
        });
      }
      return nextAll;
    });

    if (!completedNodeIds.includes(nodeId)) {
      setCompletedNodeIds(prev => [...prev, nodeId]);
    }
  };

  const handleCompleteCase = (caseId: string, xpEarned: number) => {
    if (!completedCaseIds.includes(caseId)) {
      setCompletedCaseIds(prev => [...prev, caseId]);
      // Also mark corresponding milestone node as complete
      if (caseId === 'case_vanishing_momentum') {
        handleCompleteNode('node_lvl_12', xpEarned);
      } else {
        setModulesProgress(prev => {
          const stocksProg = prev.stocks;
          const { updatedProgress, xpAwarded } = recordModuleActivityCompletion(stocksProg, caseId, xpEarned);
          const nextAll = { ...prev, stocks: updatedProgress };
          saveAllModulesProgress(nextAll);
          return nextAll;
        });
        setUserXp(prev => {
          const nextXp = prev + xpEarned;
          const nextLevel = Math.floor(nextXp / 500) + 1;
          if (nextLevel > userLevel) {
            setUserLevel(nextLevel);
          }
          return nextXp;
        });
      }
    }
  };

  const handleCompleteMutualFundsLevel = (levelId: string, xpEarned: number) => {
    setModulesProgress(prev => {
      const mfProg = prev['mutual-funds'];
      const { updatedProgress, xpAwarded } = recordModuleActivityCompletion(mfProg, levelId, xpEarned);
      const nextAll = { ...prev, 'mutual-funds': updatedProgress };
      saveAllModulesProgress(nextAll);

      // Only award global XP if activity was newly completed (idempotent!)
      if (xpAwarded > 0) {
        setUserXp(curXp => {
          const nextXp = curXp + xpAwarded;
          const nextLevel = Math.floor(nextXp / 500) + 1;
          if (nextLevel > userLevel) {
            setUserLevel(nextLevel);
          }
          return nextXp;
        });
      }
      return nextAll;
    });
  };

  const handleStartOrContinueLessonFromHome = (node: PathNode) => {
    setActivePlaygroundLessonNode(node);
    setActivePillar('learn');
    setSelectedLearningModuleId('stocks');
    setActiveCase(null);
    setActiveSectorId(null);
    setActiveModuleId(null);
  };

  const handleInvestigateCaseFromHome = (caseItem: PlaygroundCase) => {
    setActiveCase(caseItem);
    setActivePillar('learn');
    setSelectedLearningModuleId('stocks');
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
            <AppLogo size="md" />
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
                setActiveSectorId(null);
                setActiveModuleId(null);
                setActivePlaygroundLessonNode(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activePillar === 'home' && !activeCase && !activeSectorId && !activeModuleId && !activePlaygroundLessonNode
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setActivePillar('learn');
                setActiveCase(null);
                setActiveSectorId(null);
                setActiveModuleId(null);
                setActivePlaygroundLessonNode(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                (activePillar === 'learn' || activePillar === 'playground' || activePlaygroundLessonNode) && !activeCase && !activeSectorId
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn</span>
            </button>

            <button
              onClick={() => {
                setActivePillar('tools');
                setActiveCase(null);
                setActiveSectorId(null);
                setActiveModuleId(null);
                setActivePlaygroundLessonNode(null);
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
              onClick={() => setShowLeaderboardModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              title="Global Learner Leaderboard"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">Leaderboard</span>
            </button>

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
        {activeModuleId === 'module_01' ? (
          <Module01Hub
            userXp={userXp}
            onAwardXp={handleAwardXp}
            onBackToMain={() => {
              setActiveModuleId(null);
              setActivePillar('learn');
              setSelectedLearningModuleId('stocks');
            }}
            onGoToPlayground={() => {
              setActiveModuleId(null);
              setActivePillar('learn');
              setSelectedLearningModuleId('stocks');
              setStocksViewMode('path');
            }}
          />
        ) : activePlaygroundLessonNode ? (
          <MicroLessonScreen
            node={activePlaygroundLessonNode}
            onBack={() => {
              setActivePlaygroundLessonNode(null);
              setActivePillar('learn');
            }}
            onComplete={(nodeId, xpEarned) => {
              handleCompleteNode(nodeId, xpEarned);
              setActivePlaygroundLessonNode(null);
              setActivePillar('learn');
            }}
          />
        ) : activeCase ? (
          <CaseInvestigation
            caseData={activeCase}
            onBack={() => {
              setActiveCase(null);
              setCaseProgress(null);
              setActivePillar('learn');
            }}
            onCompleteCase={handleCompleteCase}
            onProgressUpdate={setCaseProgress}
            onGoToTradingLab={() => {
              setActivePillar('tools');
              setActiveCase(null);
            }}
          />
        ) : activePillar === 'home' ? (
          activeSectorId && getSectorById(activeSectorId) ? (
            <SectorLearningHub
              sector={getSectorById(activeSectorId)!}
              userXp={userXp}
              completedCaseIds={completedCaseIds}
              onBackToExplore={() => setActiveSectorId(null)}
              onStartInvestigation={(caseItem) => {
                setActiveCase(caseItem);
              }}
              onAwardXp={handleAwardXp}
            />
          ) : (
            <HomeView
              userXp={userXp}
              userLevel={userLevel}
              streakDays={streakDays}
              completedNodeIds={completedNodeIds}
              completedCaseIds={completedCaseIds}
              onStartOrContinueLesson={handleStartOrContinueLessonFromHome}
              onInvestigateCase={handleInvestigateCaseFromHome}
              onExploreSectorInLab={handleExploreSectorInLabFromHome}
              onSelectSector={(sectorId) => setActiveSectorId(sectorId)}
              onGoToPlayground={() => {
                setActivePillar('learn');
                setSelectedLearningModuleId(null);
                setActiveCase(null);
                setActiveSectorId(null);
                setActivePlaygroundLessonNode(null);
              }}
              onAskAi={handleAskAiFromHome}
              onStartModule01={() => setActiveModuleId('module_01')}
              onOpenLeaderboard={() => setShowLeaderboardModal(true)}
            />
          )
        ) : activePillar === 'learn' || activePillar === 'playground' ? (
          <div className="space-y-6">
            {/* Global Module Navigation Header */}
            <ModuleNavigationHeader
              activeModuleId={selectedLearningModuleId}
              onSelectModule={(modId) => {
                setSelectedLearningModuleId(modId);
                setStocksViewMode('overview');
              }}
              modulesProgress={modulesProgress}
              currentSubView={stocksViewMode}
              onNavigateSubView={(v) => setStocksViewMode(v)}
            />

            {/* If no module is selected, render the Global Module Catalog Screen */}
            {selectedLearningModuleId === null ? (
              <ModuleCatalogScreen
                modulesProgress={modulesProgress}
                onSelectModule={(modId) => {
                  setSelectedLearningModuleId(modId);
                  setStocksViewMode('overview');
                }}
                userTotalXp={userXp}
              />
            ) : selectedLearningModuleId === 'stocks' && stocksViewMode === 'path' ? (
              /* The Serpentine Winding Game Path for Stocks */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStocksViewMode('overview')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Stocks Overview</span>
                  </button>
                  <span className="text-xs font-bold text-teal-400">
                    Interactive 3D Game Path
                  </span>
                </div>

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
                  onStartModule01={() => setActiveModuleId('module_01')}
                  onSelectLessonNode={(node) => setActivePlaygroundLessonNode(node)}
                />
              </div>
            ) : selectedLearningModuleId === 'mutual-funds' ? (
              /* Dedicated Mutual Funds Module Hub & Level Runner */
              <MutualFundsHub
                userXp={userXp}
                progress={modulesProgress['mutual-funds']}
                onCompleteLevel={handleCompleteMutualFundsLevel}
                onBackToCatalog={() => setSelectedLearningModuleId(null)}
              />
            ) : (
              /* Reusable Module Landing Page for Stocks, Bonds, or F&O */
              <ModuleLandingPage
                moduleId={selectedLearningModuleId}
                progress={modulesProgress[selectedLearningModuleId]}
                onBackToCatalog={() => setSelectedLearningModuleId(null)}
                onStartOrResumeLesson={(node) => {
                  setActivePlaygroundLessonNode(node);
                }}
                onOpenGamePath={() => setStocksViewMode('path')}
                onStartModule01={() => setActiveModuleId('module_01')}
                onInvestigateCase={(c) => {
                  setActiveCase(c);
                }}
                onSwitchModule={(newModId) => {
                  setSelectedLearningModuleId(newModId);
                  setStocksViewMode('overview');
                }}
                onCompleteMutualFundsLevel={handleCompleteMutualFundsLevel}
                userXp={userXp}
              />
            )}
          </div>
        ) : (
          <TradingLab
            onGoToPlayground={() => {
              setActivePillar('learn');
              setSelectedLearningModuleId('stocks');
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
        className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1 grid grid-cols-5 items-center shadow-2xl"
      >
        <button
          onClick={() => {
            setActivePillar('home');
            setActiveCase(null);
            setActiveSectorId(null);
            setActiveModuleId(null);
            setActivePlaygroundLessonNode(null);
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 transition-colors cursor-pointer ${
            activePillar === 'home' && !activeCase && !activeSectorId && !activeModuleId && !activePlaygroundLessonNode ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </button>

        <button
          onClick={() => {
            setActivePillar('learn');
            setActiveCase(null);
            setActiveSectorId(null);
            setActiveModuleId(null);
            setActivePlaygroundLessonNode(null);
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 transition-colors cursor-pointer ${
            (activePillar === 'learn' || activePillar === 'playground' || activePlaygroundLessonNode) && !activeCase && !activeModuleId ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Learn</span>
        </button>

        <button
          onClick={() => {
            setActivePillar('tools');
            setActiveCase(null);
            setActiveSectorId(null);
            setActiveModuleId(null);
            setActivePlaygroundLessonNode(null);
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 transition-colors cursor-pointer ${
            activePillar === 'tools' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Lab</span>
        </button>

        <button
          onClick={() => setShowLeaderboardModal(true)}
          className="flex flex-col items-center justify-center min-h-[46px] py-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Ranks</span>
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
                <AppLogo size="sm" withGlow={false} />
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

            {/* Module Breakdown */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-semibold text-teal-400 block">Modules Progress</span>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">📈 Stocks & Equity</span>
                  <span className="text-emerald-400 font-bold font-mono-num">
                    {modulesProgress.stocks.earnedXp} XP ({modulesProgress.stocks.completedActivityIds.length} done)
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>🥧 Mutual Funds</span>
                  <span className="text-[10px]">Planned</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>🏛️ Bonds</span>
                  <span className="text-[10px]">Planned</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>⚡ Futures & Options</span>
                  <span className="text-[10px]">Planned</span>
                </div>
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

            {/* Global Learner Leaderboard Link */}
            <button
              onClick={() => {
                setShowProfileModal(false);
                setShowLeaderboardModal(true);
              }}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 hover:border-amber-400 flex items-center justify-between text-left transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-300 group-hover:text-amber-200 block">
                    Global Leaderboard
                  </span>
                  <span className="text-[11px] text-slate-400">
                    See where you rank among learners worldwide
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>

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

      {/* Global Learner Leaderboard Modal */}
      {showLeaderboardModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-4 sm:p-6">
            <GlobalLeaderboard
              userXp={userXp}
              userLevel={userLevel}
              streakDays={streakDays}
              completedNodeIdsCount={completedNodeIds.length}
              completedCaseIdsCount={completedCaseIds.length}
              onClose={() => setShowLeaderboardModal(false)}
              onGoToLearning={() => {
                setShowLeaderboardModal(false);
                setActiveModuleId('module_01');
              }}
            />
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
          <div className="flex items-center gap-2.5">
            <AppLogo size="xs" withGlow={false} />
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
