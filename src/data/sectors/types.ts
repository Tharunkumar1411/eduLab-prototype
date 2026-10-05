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

export interface SectorData {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  heroSummary: string;
  estimatedTime: string;
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
  metricsHeadline: string;
  metrics: SectorMetric[];
  companiesHeadline: string;
  companies: SectorCompany[];
  investigation: PlaygroundCase;
}
