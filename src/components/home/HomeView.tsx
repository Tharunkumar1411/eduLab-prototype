import React, { useState } from 'react';
import { LEARNING_UNITS, PathNode } from '../../data/learningPath.ts';
import { PLAYGROUND_CASES, PlaygroundCase } from '../../data/cases.ts';
import { SectorDetail, MarketStory } from '../../data/homeData.ts';
import { HomeAiChatSection } from './HomeAiChatSection.tsx';
import { ContinueLearningCard } from './ContinueLearningCard.tsx';
import { TodayCaseCard } from './TodayCaseCard.tsx';
import { MarketTickerChips } from './MarketTickerChips.tsx';
import { ExploreMarketsSection } from './ExploreMarketsSection.tsx';
import { MarketStoriesSection } from './MarketStoriesSection.tsx';
import { MarketDetailModal } from './MarketDetailModal.tsx';
import { SectorDetailModal } from './SectorDetailModal.tsx';
import { StoryDetailModal } from './StoryDetailModal.tsx';

interface HomeViewProps {
  userXp: number;
  userLevel: number;
  streakDays: number;
  completedNodeIds: string[];
  completedCaseIds: string[];
  onStartOrContinueLesson: (node: PathNode) => void;
  onInvestigateCase: (caseItem: PlaygroundCase) => void;
  onExploreSectorInLab: (stockSymbol: string) => void;
  onGoToPlayground: () => void;
  onAskAi: (prompt: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userXp,
  userLevel,
  streakDays,
  completedNodeIds,
  completedCaseIds,
  onStartOrContinueLesson,
  onInvestigateCase,
  onExploreSectorInLab,
  onGoToPlayground,
  onAskAi,
}) => {
  // Modal states
  const [isMarketModalOpen, setIsMarketModalOpen] = useState<boolean>(false);
  const [selectedSector, setSelectedSector] = useState<SectorDetail | null>(null);
  const [selectedStory, setSelectedStory] = useState<MarketStory | null>(null);

  // Allow tester to switch persona view (New User vs Returning User) on demand
  const actualIsNewUser = completedNodeIds.length === 0 && userXp === 0;
  const [simulatedPersona, setSimulatedPersona] = useState<'auto' | 'new' | 'returning'>('auto');

  const isNewUser =
    simulatedPersona === 'auto'
      ? actualIsNewUser
      : simulatedPersona === 'new';

  const toggleUserMode = () => {
    setSimulatedPersona((prev) => (prev === 'new' ? 'returning' : 'new'));
  };

  // Flatten all nodes to determine current active node & progress
  const allNodes = LEARNING_UNITS.flatMap((u) => u.nodes);
  const activeNodeIndex = allNodes.findIndex((n) => !completedNodeIds.includes(n.id));
  const currentNode = activeNodeIndex >= 0 ? allNodes[activeNodeIndex] : allNodes[0];

  // Unit 1 progress calculation
  const unit1Nodes = LEARNING_UNITS[0]?.nodes || [];
  const completedInUnit1 = unit1Nodes.filter((n) => completedNodeIds.includes(n.id)).length;
  const progressPercent = Math.min(
    100,
    Math.max(
      isNewUser ? 0 : 50, // Display 50% for returning demo if early
      Math.round((completedInUnit1 / Math.max(1, unit1Nodes.length)) * 100)
    )
  );

  // Today's investigation case (The 30% Growth Mystery)
  const todayCase =
    PLAYGROUND_CASES.find((c) => c.id === 'case_30pct_growth_mystery') ||
    PLAYGROUND_CASES[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-16 sm:pb-8 animate-in fade-in duration-300">
      {/* Top Auto-Running Live Market Chips Section */}
      <MarketTickerChips
        onExploreMarket={() => setIsMarketModalOpen(true)}
      />

      {/* Interactive AI Mentor Chat Option (replaces good morning header) */}
      <HomeAiChatSection
        userXp={userXp}
        userLevel={userLevel}
        streakDays={streakDays}
        isSimulatingNewUser={isNewUser}
        onToggleUserMode={toggleUserMode}
        onAskAi={onAskAi}
      />

      {/* 2. Continue Learning / Start Learning */}
      <ContinueLearningCard
        isNewUser={isNewUser}
        currentNode={currentNode}
        progressPercent={progressPercent}
        onStartOrContinue={onStartOrContinueLesson}
      />

      {/* 3. Today's Case (Hero element) */}
      <TodayCaseCard
        caseData={todayCase}
        onInvestigate={onInvestigateCase}
      />

      {/* 4. Explore Markets */}
      <ExploreMarketsSection
        onSelectSector={(sector) => setSelectedSector(sector)}
      />

      {/* 6. Market Stories */}
      <MarketStoriesSection
        onSelectStory={(story) => setSelectedStory(story)}
      />

      {/* Educational Modals */}
      <MarketDetailModal
        isOpen={isMarketModalOpen}
        onClose={() => setIsMarketModalOpen(false)}
      />

      <SectorDetailModal
        sector={selectedSector}
        onClose={() => setSelectedSector(null)}
        onExploreInLab={(stockSymbol) => {
          setSelectedSector(null);
          onExploreSectorInLab(stockSymbol);
        }}
      />

      <StoryDetailModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onGoToPlayground={onGoToPlayground}
      />
    </div>
  );
};
