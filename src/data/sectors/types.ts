/**
 * Sector Data Model and Types for Explore Markets Learning Hubs.
 */

import { PlaygroundCase } from '../cases.ts';

export interface SectorVisualChainStep {
  stepNumber: number;
  title: string;
  role: string;
  cutOfValue: string; // e.g., "₹50", "₹20 margin"
  description: string;
  icon: string;
}

export interface SectorDriver {
  id: string;
  name: string;
  icon: string;
  shortQuestion: string;
  explanation: string;
  realWorldExample: string;
  keyMetricToWatch: string;
}

export interface SectorMetric {
  id: string;
  name: string;
  shortCode: string;
  whatItMeans: string;
  whyItMatters: string;
  sectorExample: string;
}

export interface SectorCompany {
  id: string;
  name: string;
  tagline: string;
  businessDescription: string;
  icon: string;
  productCategories: string[];
  primaryDrivers: string[];
  keyStrengths: string;
}

export interface SectorMiniChallenge {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  xpReward: number;
}

export type SectorActivityType = 'story' | 'model' | 'experiment' | 'investigation';

export interface SectorLearningActivity {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  xpReward: number;
  type: SectorActivityType;

  // Activity 1: Understand Banking (Story & Intermediary Flow)
  storyConfig?: {
    hook: string;
    scenario: string;
    participants: {
      id: string;
      title: string;
      icon: string;
      role: string;
      details: string;
      flowArrowLabel?: string;
    }[];
    decisionQuestion: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
    conceptExplanation: {
      title: string;
      summary: string;
      corePoints: string[];
    };
    reflectionQuestion: string;
    reflectionOptions: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };

  // Activity 2: Follow the Money (Interactive Spread & Earnings Model)
  modelConfig?: {
    headline: string;
    intro: string;
    defaultLendingRate: number;
    defaultDepositRate: number;
    depositPoolCr: number;
    loansDeployedCr: number;
    reservesCr: number;
    explanation: {
      spreadConcept: string;
      spreadVsNim: string;
      limitationsNote: string;
    };
    reflectionQuestion: string;
    reflectionOptions: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };

  // Activity 3: Run an Experiment (Compare Bank Alpha vs Bank Beta)
  experimentConfig?: {
    headline: string;
    intro: string;
    entityA: {
      name: string;
      icon: string;
      tag: string;
      lendingRate: number;
      depositRate: number;
      fundingNote: string;
    };
    entityB: {
      name: string;
      icon: string;
      tag: string;
      lendingRate: number;
      depositRate: number;
      fundingNote: string;
    };
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
    catchExplanation: {
      title: string;
      subtitle: string;
      keyCatch: string;
      points: string[];
    };
    reflectionQuestion: string;
    reflectionOptions: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };

  // Activity 4: Investigate a Bank (Clue Dossier & Nuanced Verdict)
  investigationConfig?: {
    caseTitle: string;
    companyName: string;
    ticker: string;
    intro: string;
    clues: {
      id: string;
      title: string;
      icon: string;
      metricBadge: string;
      dataHighlight: string;
      observation: string;
      implication: string;
    }[];
    question: string;
    options: {
      id: string;
      text: string;
      isBest: boolean;
      verdictFeedback: string;
    }[];
    nuancedTakeaway: {
      title: string;
      lessons: string[];
      summary: string;
    };
  };
}

export interface SectorFeaturedInvestigation {
  question: string;
  supportingCopy: string;
  previewPoints: string[];
  activitiesCount: number;
  totalXp: number;
}

export interface SectorData {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  heroSummary: string;
  estimatedTime: string;

  // Redesigned 4-step progressive learning experience
  featuredInvestigation?: SectorFeaturedInvestigation;
  activities?: SectorLearningActivity[];

  // Optional contextual reference
  metricsHeadline: string;
  metrics: SectorMetric[];
  companiesHeadline: string;
  companies: SectorCompany[];

  // Backward-compatible properties for existing components
  whatIsIt: {
    simpleDefinition: string;
    examplesHeadline: string;
    exampleItems: {
      name: string;
      icon: string;
      category: string;
    }[];
    beginnerMentalModel: string;
  };
  howItWorks: {
    headline: string;
    explanation: string;
    chainSteps: SectorVisualChainStep[];
    keyInsight: string;
  };
  driversHeadline: string;
  drivers: SectorDriver[];
  miniChallenge: SectorMiniChallenge;
  investigation: PlaygroundCase;
}
