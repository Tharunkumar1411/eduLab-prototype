import React, { useState, useEffect } from 'react';
import { Module01Landing } from './Module01Landing.tsx';
import { Game1Marketplace } from './Game1Marketplace.tsx';
import { Game2FindBuyer } from './Game2FindBuyer.tsx';
import { Game3PriceDiscovery } from './Game3PriceDiscovery.tsx';
import { Game4MarketWithoutShop } from './Game4MarketWithoutShop.tsx';
import { Game5MakeTheTrade } from './Game5MakeTheTrade.tsx';
import { Module01Completion } from './Module01Completion.tsx';

interface Module01HubProps {
  userXp: number;
  onAwardXp: (amount: number) => void;
  onBackToMain: () => void;
  onGoToPlayground: () => void;
}

export const Module01Hub: React.FC<Module01HubProps> = ({
  userXp,
  onAwardXp,
  onBackToMain,
  onGoToPlayground,
}) => {
  const STORAGE_KEY = 'fincraft_module_01_progress';
  const [activeStage, setActiveStage] = useState<'landing' | number | 'completion'>('landing');
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  // Load progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.completedStages)) {
          setCompletedStages(parsed.completedStages);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleStageComplete = (stageId: number, xpReward: number) => {
    // Check if stage was already completed to prevent XP farming
    const isAlreadyCompleted = completedStages.includes(stageId);
    let updated = completedStages;

    if (!isAlreadyCompleted) {
      updated = [...completedStages, stageId];
      setCompletedStages(updated);
      onAwardXp(xpReward);

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            completedStages: updated,
            lastCompletedAt: new Date().toISOString(),
          })
        );
      } catch {
        // Ignore
      }
    }

    // Check if all 5 stages are done
    if (updated.length >= 5) {
      setActiveStage('completion');
    } else {
      setActiveStage('landing');
    }
  };

  switch (activeStage) {
    case 1:
      return (
        <Game1Marketplace
          onComplete={(xp) => handleStageComplete(1, xp)}
          onBack={() => setActiveStage('landing')}
        />
      );
    case 2:
      return (
        <Game2FindBuyer
          onComplete={(xp) => handleStageComplete(2, xp)}
          onBack={() => setActiveStage('landing')}
        />
      );
    case 3:
      return (
        <Game3PriceDiscovery
          onComplete={(xp) => handleStageComplete(3, xp)}
          onBack={() => setActiveStage('landing')}
        />
      );
    case 4:
      return (
        <Game4MarketWithoutShop
          onComplete={(xp) => handleStageComplete(4, xp)}
          onBack={() => setActiveStage('landing')}
        />
      );
    case 5:
      return (
        <Game5MakeTheTrade
          onComplete={(xp) => handleStageComplete(5, xp)}
          onBack={() => setActiveStage('landing')}
        />
      );
    case 'completion':
      return (
        <Module01Completion
          userXp={userXp}
          onReturnToHome={onBackToMain}
          onGoToPlayground={onGoToPlayground}
        />
      );
    case 'landing':
    default:
      return (
        <Module01Landing
          completedStages={completedStages}
          onStartStage={(id) => setActiveStage(id)}
          onBack={onBackToMain}
          userXp={userXp}
        />
      );
  }
};
