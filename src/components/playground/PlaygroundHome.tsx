/**
 * Playground Home: Duolingo-style Connective Game Flow & Detective Progression.
 * Fully path-based UI where financial cases and forensic lessons unlock progressively as nodes.
 */

import React from 'react';
import { PlaygroundCase } from '../../data/cases.ts';
import { ConnectiveGamePath } from './ConnectiveGamePath.tsx';

interface PlaygroundHomeProps {
  userXp: number;
  userLevel: number;
  streakDays: number;
  completedCaseIds: string[];
  completedNodeIds: string[];
  onCompleteNode: (nodeId: string, xpEarned: number) => void;
  onSelectCase: (caseItem: PlaygroundCase) => void;
  onGoToTradingLab: () => void;
  initialOpenNode?: any | null;
  onClearInitialNode?: () => void;
  onStartModule01?: () => void;
}

export const PlaygroundHome: React.FC<PlaygroundHomeProps> = ({
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
}) => {
  return (
    <div className="w-full">
      <ConnectiveGamePath
        userXp={userXp}
        userLevel={userLevel}
        streakDays={streakDays}
        completedNodeIds={completedNodeIds}
        onCompleteNode={onCompleteNode}
        onSelectCase={onSelectCase}
        onGoToTradingLab={onGoToTradingLab}
        initialOpenNode={initialOpenNode}
        onClearInitialNode={onClearInitialNode}
        onStartModule01={onStartModule01}
      />
    </div>
  );
};
