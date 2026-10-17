/**
 * Connective UI Game Flow (Duolingo-style Learning Path).
 * Winding serpentine roadmap with 3D tactile nodes, concentric progress halo,
 * Inspector Fin mascot illustrations, guidebook, and interactive micro-lessons.
 */

import React, { useState } from 'react';
import { LEARNING_UNITS, PathNode, UnitSection } from '../../data/learningPath.ts';
import { MUTUAL_FUNDS_UNITS } from '../../data/mutualFundsData.ts';
import { LearningModuleId } from '../../data/learningModules.ts';
import { PLAYGROUND_CASES, PlaygroundCase } from '../../data/cases.ts';
import { CharacterMentor } from '../character/CharacterMentor.tsx';
import { MicroLessonScreen } from './MicroLessonScreen.tsx';
import { ChestRewardModal } from './ChestRewardModal.tsx';
import { UnitGuidebookModal } from './UnitGuidebookModal.tsx';
import { CasePreviewModal } from './CasePreviewModal.tsx';
import { Level1BuildAFund } from '../modules/mutualFunds/Level1BuildAFund.tsx';
import { Level2NavAndSip } from '../modules/mutualFunds/Level2NavAndSip.tsx';
import { Level3MatchTheFund } from '../modules/mutualFunds/Level3MatchTheFund.tsx';
import { Level4RiskAndFees } from '../modules/mutualFunds/Level4RiskAndFees.tsx';
import { Level5FundInvestigator } from '../modules/mutualFunds/Level5FundInvestigator.tsx';
import { MutualFundsGlossaryModal } from '../modules/mutualFunds/MutualFundsGlossaryModal.tsx';
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  Gem,
  Heart,
  Lock,
  Play,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from 'lucide-react';

interface ConnectiveGamePathProps {
  moduleId?: LearningModuleId;
  userXp: number;
  userLevel: number;
  streakDays: number;
  completedNodeIds: string[];
  onCompleteNode: (nodeId: string, xpEarned: number) => void;
  onSelectCase: (caseItem: PlaygroundCase) => void;
  onGoToTradingLab: () => void;
  initialOpenNode?: PathNode | null;
  onClearInitialNode?: () => void;
  onStartModule01?: () => void;
  onSelectLessonNode?: (node: PathNode) => void;
}

export const ConnectiveGamePath: React.FC<ConnectiveGamePathProps> = ({
  moduleId = 'stocks',
  userXp,
  userLevel,
  streakDays,
  completedNodeIds,
  onCompleteNode,
  onSelectCase,
  onGoToTradingLab,
  initialOpenNode,
  onClearInitialNode,
  onStartModule01,
  onSelectLessonNode,
}) => {
  const [selectedLessonNode, setSelectedLessonNode] = useState<PathNode | null>(null);
  const [selectedChestNode, setSelectedChestNode] = useState<PathNode | null>(null);
  const [selectedCasePreview, setSelectedCasePreview] = useState<{
    node: PathNode;
    caseData: PlaygroundCase;
    isLocked: boolean;
    isCompleted: boolean;
  } | null>(null);
  const [activeGuidebookUnit, setActiveGuidebookUnit] = useState<UnitSection | null>(null);
  const [activeMfLevelId, setActiveMfLevelId] = useState<string | null>(null);
  const [isMfGlossaryOpen, setIsMfGlossaryOpen] = useState<boolean>(false);

  // Dynamic Units based on selected module
  const learningUnits = moduleId === 'mutual-funds' ? MUTUAL_FUNDS_UNITS : LEARNING_UNITS;

  // Automatically trigger lesson if coming from Home screen
  React.useEffect(() => {
    if (initialOpenNode) {
      if (initialOpenNode.type === 'lesson' || initialOpenNode.type === 'challenge') {
        if (onSelectLessonNode) {
          onSelectLessonNode(initialOpenNode);
        } else {
          setSelectedLessonNode(initialOpenNode);
        }
      } else if (initialOpenNode.type === 'case') {
        const matchedCase = PLAYGROUND_CASES.find(c => c.id === initialOpenNode.caseId) || PLAYGROUND_CASES[0];
        setSelectedCasePreview({
          node: initialOpenNode,
          caseData: matchedCase,
          isLocked: false,
          isCompleted: completedNodeIds.includes(initialOpenNode.id),
        });
      }
      onClearInitialNode?.();
    }
  }, [initialOpenNode, onSelectLessonNode]);

  // Flatten all nodes across units to compute global index & active node
  const allNodes = learningUnits.flatMap(u => u.nodes);

  // Find the first uncompleted node as the active node
  const activeNodeIndex = allNodes.findIndex(n => !completedNodeIds.includes(n.id));
  const activeNode = activeNodeIndex >= 0 ? allNodes[activeNodeIndex] : allNodes[allNodes.length - 1];

  const defaultUnitId = activeNode ? activeNode.unitId : (learningUnits[0]?.id || 1);
  const [activeUnitId, setActiveUnitId] = useState<number>(defaultUnitId);

  // Update active unit if active node changes to another unit or module changes
  React.useEffect(() => {
    if (activeNode) {
      setActiveUnitId(activeNode.unitId);
    } else if (learningUnits.length > 0) {
      setActiveUnitId(learningUnits[0].id);
    }
  }, [completedNodeIds.length, moduleId]);

  const currentUnit = learningUnits.find(u => u.id === activeUnitId) || learningUnits[0] || LEARNING_UNITS[0];

  // Alternating horizontal offsets for the serpentine path
  // [0 = center, -1 = left, -2 = far-left, 0 = center, 1 = right, 2 = far-right]
  const offsetPattern = [0, -32, -55, -32, 0, 32, 55, 32];
  const getNodeOffset = (index: number) => {
    return offsetPattern[index % offsetPattern.length];
  };

  const handleNodeClick = (node: PathNode, isLocked: boolean, isCompleted: boolean) => {
    // Mutual funds interactive level launcher
    if (node.id.startsWith('mf_lvl_')) {
      if (!isLocked) {
        setActiveMfLevelId(node.id);
      }
      return;
    }

    if (node.type === 'lesson' || node.type === 'challenge') {
      if (!isLocked) {
        if (onSelectLessonNode) {
          onSelectLessonNode(node);
        } else {
          setSelectedLessonNode(node);
        }
      }
    } else if (node.type === 'chest') {
      if (!isLocked && !isCompleted) {
        setSelectedChestNode(node);
      }
    } else if (node.type === 'case') {
      const matchedCase = PLAYGROUND_CASES.find(c => c.id === node.caseId) || PLAYGROUND_CASES[0];
      setSelectedCasePreview({
        node,
        caseData: matchedCase,
        isLocked,
        isCompleted,
      });
    } else if (node.type === 'lab') {
      if (!isLocked) {
        onGoToTradingLab();
      }
    }
  };

  // Render Mutual Funds Interactive Activity Screen
  if (activeMfLevelId === 'mf_lvl_1') {
    return (
      <Level1BuildAFund
        onComplete={(xp) => {
          onCompleteNode('mf_lvl_1', xp);
          setActiveMfLevelId(null);
        }}
        onBack={() => setActiveMfLevelId(null)}
      />
    );
  }
  if (activeMfLevelId === 'mf_lvl_2') {
    return (
      <Level2NavAndSip
        onComplete={(xp) => {
          onCompleteNode('mf_lvl_2', xp);
          setActiveMfLevelId(null);
        }}
        onBack={() => setActiveMfLevelId(null)}
      />
    );
  }
  if (activeMfLevelId === 'mf_lvl_3') {
    return (
      <Level3MatchTheFund
        onComplete={(xp) => {
          onCompleteNode('mf_lvl_3', xp);
          setActiveMfLevelId(null);
        }}
        onBack={() => setActiveMfLevelId(null)}
      />
    );
  }
  if (activeMfLevelId === 'mf_lvl_4') {
    return (
      <Level4RiskAndFees
        onComplete={(xp) => {
          onCompleteNode('mf_lvl_4', xp);
          setActiveMfLevelId(null);
        }}
        onBack={() => setActiveMfLevelId(null)}
      />
    );
  }
  if (activeMfLevelId === 'mf_lvl_5' || activeMfLevelId === 'case_fund_investigation') {
    return (
      <Level5FundInvestigator
        onComplete={(xp) => {
          onCompleteNode('mf_lvl_5', xp);
          setActiveMfLevelId(null);
        }}
        onBack={() => setActiveMfLevelId(null)}
      />
    );
  }

  if (selectedLessonNode) {
    return (
      <MicroLessonScreen
        node={selectedLessonNode}
        onBack={() => setSelectedLessonNode(null)}
        onComplete={(nodeId, xp) => {
          onCompleteNode(nodeId, xp);
          setSelectedLessonNode(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 select-none pb-20">
      {/* Top Gamification Bar (Duolingo Style: Streak, Gems, Hearts) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
        {/* Streak */}
        <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
          <Flame className="w-5 h-5 fill-amber-400 text-amber-400 animate-pulse" />
          <span className="font-mono-num">{streakDays}</span>
        </div>

        {/* Gems / Coins */}
        <div className="flex items-center gap-1.5 text-teal-400 font-extrabold text-xs">
          <Gem className="w-4 h-4 fill-teal-400 text-teal-400" />
          <span className="font-mono-num">{userXp}</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 text-rose-500 font-extrabold text-xs">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>5/5</span>
        </div>

        {/* User Rank */}
        <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          <Shield className="w-3.5 h-3.5 text-teal-400" />
          <span>Lvl {userLevel}</span>
        </div>

        {/* Mutual Funds Glossary Trigger */}
        {moduleId === 'mutual-funds' && (
          <button
            onClick={() => setIsMfGlossaryOpen(true)}
            className="flex items-center gap-1.5 text-teal-300 hover:text-white font-bold text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Glossary</span>
          </button>
        )}
      </div>

      {/* Inspector Fin — Playground Mentor Greeting */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5">
        <CharacterMentor
          size="md"
          state={completedNodeIds.length === 0 ? 'talking' : 'happy'}
          message={
            moduleId === 'mutual-funds'
              ? "Welcome to the Mutual Funds path. Tap any level and I'll walk you through it."
              : completedNodeIds.length === 0
              ? "Hi, I'm Inspector Fin. Pick any lesson below — I'll help you spot the pattern as we go."
              : `${completedNodeIds.length} lessons behind you already. Pick the next one and let's keep going.`
          }
          subMessage={
            moduleId === 'stocks' && completedNodeIds.length === 0
              ? 'Start with Module 01 below if you\'re brand new to the markets.'
              : undefined
          }
        />
      </div>

      {/* Serpentine Connective Game Path */}
      <div className="relative py-8 px-4 flex flex-col items-center">
        {/* Background Curving Sinuous SVG Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          {currentUnit.nodes.map((node, i) => {
            if (i === currentUnit.nodes.length - 1) return null;
            const nextNode = currentUnit.nodes[i + 1];
            const y1 = i * 155 + 46;
            const y2 = (i + 1) * 155 + 46;
            const x1 = 50 + getNodeOffset(node.nodeIndex) * 0.22;
            const x2 = 50 + getNodeOffset(nextNode.nodeIndex) * 0.22;

            return (
              <path
                key={i}
                d={`M ${x1}% ${y1}px C ${x1}% ${(y1 + y2) / 2}px, ${x2}% ${(y1 + y2) / 2}px, ${x2}% ${y2}px`}
                fill="none"
                stroke="#334155"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
            );
          })}
        </svg>

        {/* Nodes Column */}
        <div className="relative z-10 w-full flex flex-col items-center space-y-22 sm:space-y-24">
          {currentUnit.nodes.map((node, idx) => {
            const isCompleted = completedNodeIds.includes(node.id);
            const isActive = activeNode?.id === node.id;
            const globalIndex = allNodes.findIndex(n => n.id === node.id);
            const isLocked = !isCompleted && !isActive && globalIndex > activeNodeIndex && activeNodeIndex !== -1;

            const horizontalOffset = getNodeOffset(node.nodeIndex);

            return (
              <div
                key={node.id}
                className="relative flex items-center justify-center transition-transform duration-300"
                style={{
                  transform: `translateX(${horizontalOffset}px)`,
                }}
              >
                {/* Active START Speech Bubble */}
                {isActive && (
                  <div className="absolute -top-11 z-20 flex flex-col items-center pointer-events-none animate-bounce-subtle">
                    <div className="bg-teal-400 text-slate-950 font-black text-[11px] px-3.5 py-1 rounded-xl shadow-lg border border-teal-200 flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider">
                      <Play className="w-3 h-3 fill-slate-950 shrink-0" />
                      <span>START</span>
                      <span className="text-[10px] font-bold text-teal-950/80">· +{node.xpReward} XP</span>
                    </div>
                    {/* Small triangle arrow */}
                    <div className="w-2.5 h-2.5 bg-teal-400 transform rotate-45 -mt-1.5 shadow-xs" />
                  </div>
                )}

                {/* Clean, Subtle Glow Ring for Active Node */}
                {isActive && (
                  <div className="absolute -inset-2.5 rounded-full border-2 border-teal-400/60 animate-pulse pointer-events-none" />
                )}

                {/* 3D Round Node Button */}
                <button
                  onClick={() => handleNodeClick(node, isLocked, isCompleted)}
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-amber-500 text-slate-950 shadow-[0_6px_0_#92400e] hover:bg-amber-400 active:translate-y-1.5 active:shadow-[0_0_0_#92400e]'
                      : isActive
                      ? 'bg-gradient-to-b from-teal-400 to-teal-500 text-slate-950 shadow-[0_6px_0_#0f766e] ring-4 ring-teal-400/30 hover:scale-105 active:translate-y-1.5 active:shadow-[0_0_0_#0f766e]'
                      : 'bg-slate-800 text-slate-500 shadow-[0_6px_0_#1e293b] opacity-80 hover:border-slate-700'
                  }`}
                  title={node.title}
                >
                  {/* Node Center Icon */}
                  {node.type === 'chest' ? (
                    <div className="text-3xl select-none">
                      {isCompleted ? '📭' : '🎁'}
                    </div>
                  ) : node.type === 'case' ? (
                    <Trophy className={`w-8 h-8 ${isCompleted ? 'fill-amber-950' : isActive ? 'fill-slate-950 text-slate-950' : 'text-slate-600'}`} />
                  ) : isCompleted ? (
                    <Check className="w-8 h-8 stroke-[3.5] text-slate-950" />
                  ) : isLocked ? (
                    <Lock className="w-6 h-6 text-slate-600" />
                  ) : (
                    <Star className="w-8 h-8 fill-slate-950 text-slate-950" />
                  )}
                </button>

                {/* Node Title Label under button */}
                <div className="absolute top-[88px] sm:top-[94px] z-10 text-center pointer-events-none -translate-x-1/2 left-1/2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border shadow-md backdrop-blur-md whitespace-nowrap ${
                      node.type === 'case'
                        ? 'bg-amber-950/90 border-amber-500/60 text-amber-300'
                        : isCompleted
                        ? 'bg-slate-900/95 border-slate-750 text-slate-300'
                        : isActive
                        ? 'bg-slate-900/95 border-teal-400 text-teal-300 ring-1 ring-teal-400/30'
                        : 'bg-slate-950/85 border-slate-800 text-slate-500'
                    }`}
                  >
                    {node.type === 'case' ? (
                      `👑 ${node.title.replace('Level 12: ', '')}`
                    ) : node.levelBadge ? (
                      `${node.levelBadge}: ${node.title.replace(/^Level \d+: /, '')}`
                    ) : (
                      node.title
                    )}
                  </span>
                </div>

                {/* Completed 3 Mini Stars underneath */}
                {isCompleted && node.type !== 'chest' && (
                  <div className="absolute -bottom-8 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 -translate-y-0.5" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Milestone Card / Case Link */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
              Unit {currentUnit.unitNumber} Milestone Boss Case
            </span>
            <h4 className="text-sm font-bold text-slate-100">
              {currentUnit.nodes.find(n => n.type === 'case')?.title || 'Forensic Case Investigation'}
            </h4>
            <p className="text-xs text-slate-400">
              {moduleId === 'mutual-funds'
                ? 'Put your fund evaluation skills to the test in the forensic Fund Comparison Case.'
                : 'Apply your collected clues to solve real corporate autopsies with Inspector Fin.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const caseNode = currentUnit.nodes.find(n => n.type === 'case');
            if (caseNode) {
              if (caseNode.id.startsWith('mf_lvl_')) {
                setActiveMfLevelId(caseNode.id);
              } else {
                const matched = PLAYGROUND_CASES.find(c => c.id === caseNode.caseId) || PLAYGROUND_CASES[0];
                onSelectCase(matched);
              }
            }
          }}
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Examine Case</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chest Reward Modal */}
      {selectedChestNode && (
        <ChestRewardModal
          node={selectedChestNode}
          onClose={() => setSelectedChestNode(null)}
          onClaim={(nodeId, xp) => {
            onCompleteNode(nodeId, xp);
            setSelectedChestNode(null);
          }}
        />
      )}

      {/* Unit Guidebook Modal */}
      {activeGuidebookUnit && (
        <UnitGuidebookModal
          unit={activeGuidebookUnit}
          onClose={() => setActiveGuidebookUnit(null)}
        />
      )}

      {/* Case Preview Modal */}
      {selectedCasePreview && (
        <CasePreviewModal
          node={selectedCasePreview.node}
          caseData={selectedCasePreview.caseData}
          isLocked={selectedCasePreview.isLocked}
          isCompleted={selectedCasePreview.isCompleted}
          userXp={userXp}
          onClose={() => setSelectedCasePreview(null)}
          onStartCase={(c) => {
            setSelectedCasePreview(null);
            onSelectCase(c);
          }}
        />
      )}

      {/* Mutual Funds Glossary Modal */}
      <MutualFundsGlossaryModal
        isOpen={isMfGlossaryOpen}
        onClose={() => setIsMfGlossaryOpen(false)}
      />
    </div>
  );
};
