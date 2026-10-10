/**
 * Module 01: What Is a Market?
 * Deterministic learning content, authored dialogue, choices, and reflection checks.
 */

export interface StageInfo {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  estimatedMinutes: number;
  xpReward: number;
}

export const MODULE_01_STAGES: StageInfo[] = [
  {
    id: 1,
    slug: 'the-marketplace',
    title: 'The Marketplace',
    tagline: 'Why buyers and sellers need to meet',
    icon: '🥭',
    estimatedMinutes: 3,
    xpReward: 100,
  },
  {
    id: 2,
    slug: 'find-a-buyer',
    title: 'Find a Buyer',
    tagline: 'Matching willingness and agreement on terms',
    icon: '🤝',
    estimatedMinutes: 3,
    xpReward: 100,
  },
  {
    id: 3,
    slug: 'who-decides-the-price',
    title: 'Who Decides the Price?',
    tagline: 'Supply, demand, and price discovery',
    icon: '⚖️',
    estimatedMinutes: 4,
    xpReward: 150,
  },
  {
    id: 4,
    slug: 'market-without-a-shop',
    title: 'A Market Without a Shop',
    tagline: 'From mangoes to shares of Sunny Foods',
    icon: '🏢',
    estimatedMinutes: 3,
    xpReward: 100,
  },
  {
    id: 5,
    slug: 'make-the-trade',
    title: 'Make the Trade',
    tagline: 'Orders, bid matching, and executing a trade',
    icon: '📈',
    estimatedMinutes: 4,
    xpReward: 150,
  },
];

export const MODULE_01_OVERVIEW = {
  id: 'module_01',
  number: 'Module 01',
  title: 'What Is a Market?',
  hook: 'Ever wondered how people buy and sell things—and who decides the price?',
  description:
    'Join Inspector Fin on a small journey from a backyard mango tree to an electronic stock exchange. Discover how buyers and sellers connect, how prices get discovered, and how a real share trade takes place.',
  totalXp: 600,
  totalMinutes: 17,
};
