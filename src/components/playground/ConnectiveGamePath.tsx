/**
 * Connective UI Game Flow (Duolingo-style Learning Path).
 * Winding serpentine roadmap with 3D tactile nodes, concentric progress halo,
 * Inspector Fin mascot illustrations, guidebook, and interactive micro-lessons.
 */

import React, { useState } from 'react';
import { LEARNING_UNITS, PathNode, UnitSection } from '../../data/learningPath.ts';
import { PLAYGROUND_CASES, PlaygroundCase } from '../../data/cases.ts';
import { CharacterMentor } from '../character/CharacterMentor.tsx';
import { MicroLessonModal } from './MicroLessonModal.tsx';
import { ChestRewardModal } from './ChestRewardModal.tsx';
import { UnitGuidebookModal } from './UnitGuidebookModal.tsx';
import { CasePreviewModal } from './CasePreviewModal.tsx';
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
  userXp: number;
  userLevel: number;
  streakDays: number;
  completedNodeIds: string[];
  onCompleteNode: (nodeId: string, xpEarned: number) => void;
  onSelectCase: (caseItem: PlaygroundCase) => void;
  onGoToTradingLab: () => void;
}

export const ConnectiveGamePath: React.FC<ConnectiveGamePathProps> = ({
  userXp,
  userLevel,
  streakDays,
  completedNodeIds,
  onCompleteNode,
  onSelectCase,
  onGoToTradingLab,
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

  // Flatten all nodes across units to compute global index & active node
  const allNodes = LEARNING_UNITS.flatMap(u => u.nodes);

  // Find the first uncompleted node as the active node
  const activeNodeIndex = allNodes.findIndex(n => !completedNodeIds.includes(n.id));
  const activeNode = activeNodeIndex >= 0 ? allNodes[activeNodeIndex] : allNodes[allNodes.length - 1];

  const defaultUnitId = activeNode ? activeNode.unitId : 1;
  const [activeUnitId, setActiveUnitId] = useState<number>(defaultUnitId);

  // Update active unit if active node changes to another unit and wasn't manually overridden
  React.useEffect(() => {
    if (activeNode) {
      setActiveUnitId(activeNode.unitId);
    }
  }, [completedNodeIds.length]);

  const currentUnit = LEARNING_UNITS.find(u => u.id === activeUnitId) || LEARNING_UNITS[0];

  // Alternating horizontal horizontal offsets for the serpentine path
  // [0 = center, -1 = left, -2 = far-left, 0 = center, 1 = right, 2 = far-right]
  const offsetPattern = [0, -45, -75, -45, 0, 45, 75, 45];
  const getNodeOffset = (index: number) => {
    return offsetPattern[index % offsetPattern.length];
  };

  const handleNodeClick = (node: PathNode, isLocked: boolean, isCompleted: boolean) => {
    if (node.type === 'lesson' || node.type === 'challenge') {
      if (!isLocked) {
        setSelectedLessonNode(node);
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
      </div>

      {/* Duolingo Section / Unit Header Banner (Just like in the screenshot!) */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 text-white shadow-xl relative overflow-hidden">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-teal-100 opacity-90 block">
              SECTION {currentUnit.sectionNumber}, UNIT {currentUnit.unitNumber}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm">
              {currentUnit.title}
            </h2>
            <p className="text-xs text-teal-50/90 line-clamp-1 max-w-sm">
              {currentUnit.description}
            </p>
          </div>

          {/* Guidebook Button */}
          <button
            onClick={() => setActiveGuidebookUnit(currentUnit)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md border border-white/30 transition-all shrink-0 active:scale-95"
            title="Open Unit Guidebook"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">GUIDEBOOK</span>
          </button>
        </div>

        {/* Unit switcher tabs */}
        <div className="relative mt-4 pt-3 border-t border-white/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {LEARNING_UNITS.map(unit => (
            <button
              key={unit.id}
              onClick={() => setActiveUnitId(unit.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                activeUnitId === unit.id
                  ? 'bg-white text-teal-900 shadow-sm'
                  : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              Unit {unit.unitNumber}: {unit.title.split(' ')[0]}
            </button>
          ))}
        </div>
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
            const y1 = i * 110 + 40;
            const y2 = (i + 1) * 110 + 40;
            const x1 = 50 + getNodeOffset(node.nodeIndex) * 0.25;
            const x2 = 50 + getNodeOffset(nextNode.nodeIndex) * 0.25;

            return (
              <path
                key={i}
                d={`M ${x1}% ${y1}px C ${x1}% ${(y1 + y2) / 2}px, ${x2}% ${(y1 + y2) / 2}px, ${x2}% ${y2}px`}
                fill="none"
                stroke="#334155"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
            );
          })}
        </svg>

        {/* Nodes Column */}
        <div className="relative z-10 w-full flex flex-col items-center space-y-16">
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
                {/* Active Halo & START Bubble */}
                {isActive && (
                  <div className="absolute -top-12 z-20 flex flex-col items-center animate-bounce-subtle pointer-events-none">
                    <div className="bg-teal-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-xl shadow-lg border border-teal-300 flex items-center gap-1 uppercase tracking-wider">
                      <Play className="w-3 h-3 fill-slate-950" />
                      <span>START · +{node.xpReward} XP</span>
                    </div>
                    {/* Small triangle arrow */}
                    <div className="w-2.5 h-2.5 bg-teal-500 transform rotate-45 -mt-1.5 shadow-md" />
                  </div>
                )}

                {/* Concentric Halo Ring for Active Node (Just like Duolingo screenshot!) */}
                {isActive && (
                  <div className="absolute -inset-3.5 rounded-full border-4 border-teal-400/80 animate-ping opacity-30 pointer-events-none" />
                )}
                {isActive && (
                  <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-teal-400/90 pointer-events-none animate-spin [animation-duration:14s]" />
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
                <div className="absolute top-[82px] z-10 text-center pointer-events-none w-40 -translate-x-1/2 left-1/2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold truncate max-w-[160px] border shadow-sm ${
                      node.type === 'case'
                        ? 'bg-amber-950/90 border-amber-600/60 text-amber-300'
                        : isCompleted
                        ? 'bg-slate-900/90 border-slate-750 text-slate-300'
                        : isActive
                        ? 'bg-slate-900 border-teal-500/80 text-teal-300'
                        : 'bg-slate-950/80 border-slate-800 text-slate-500'
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
                  <div className="absolute -bottom-7 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 -translate-y-0.5" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                )}

                {/* Side Character Mascot (Inspector Fin) standing on the road next to the active node */}
                {isActive && (
                  <div
                    className={`absolute hidden md:flex items-center gap-2 z-20 ${
                      horizontalOffset < 0 ? 'left-24' : 'right-24'
                    }`}
                  >
                    <div className="w-16 h-16 shrink-0">
                      <CharacterMentor size="sm" state="happy" />
                    </div>
                    <div className="bg-slate-900 border border-teal-500/50 rounded-xl px-3 py-2 text-[11px] text-slate-200 font-semibold shadow-xl max-w-[160px] relative">
                      <div
                        className={`absolute top-4 w-2 h-2 bg-slate-900 border-t border-l border-teal-500/50 transform rotate-45 ${
                          horizontalOffset < 0 ? '-left-1' : '-right-1'
                        }`}
                      />
                      <span>Let's crack: "{node.title}"!</span>
                    </div>
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
              Apply your collected clues to solve real corporate autopsies with Inspector Fin.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const caseNode = currentUnit.nodes.find(n => n.type === 'case');
            if (caseNode) {
              const matched = PLAYGROUND_CASES.find(c => c.id === caseNode.caseId) || PLAYGROUND_CASES[0];
              onSelectCase(matched);
            }
          }}
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5"
        >
          <span>Examine Case</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Micro-Lesson Modal */}
      {selectedLessonNode && (
        <MicroLessonModal
          node={selectedLessonNode}
          onClose={() => setSelectedLessonNode(null)}
          onComplete={(nodeId, xp) => {
            onCompleteNode(nodeId, xp);
            setSelectedLessonNode(null);
          }}
        />
      )}

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
    </div>
  );
};
