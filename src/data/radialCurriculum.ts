/**
 * Radial Learning Map — Curriculum data model.
 *
 * The onboarding map renders three concentric rings around a central
 * brand node. Each ring is a thematic layer:
 *   1. Foundations          — financial literacy before investing
 *   2. Investing Basics     — mechanics of stocks, funds, bonds, ETFs
 *   3. Advanced Topics      — fundamental & technical analysis, F&O, taxes
 *
 * The data here is intentionally decoupled from presentation so the map,
 * detail panel, legend, and category list can all consume one source of truth.
 *
 * A topic links to an existing lesson (`lessonIds`) when the app already
 * ships one — otherwise it stays on the map as "preview" without inventing
 * durations or lesson counts.
 */

import { LearningModuleId } from './learningModules.ts';

export type RingId = 'foundations' | 'investing' | 'advanced';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type TopicStatus = 'available' | 'preview' | 'locked';

export interface RadialTopic {
  id: string;
  title: string;
  /** Short label shown on the node — keep <= ~14 chars for layout. */
  shortLabel: string;
  category: string;
  ring: RingId;
  description: string;
  learningOutcomes: string[];
  difficulty: Difficulty;
  prerequisites: string[];
  /** Node IDs or module IDs this topic links to inside the existing app. */
  lessonIds?: string[];
  moduleId?: LearningModuleId;
  /** IDs of related topics for drawing visible map connectors. */
  connections: string[];
  /** 'available' = tappable + has entry, 'preview' = on the map but no lesson wired yet. */
  status: TopicStatus;
}

export interface RadialRing {
  id: RingId;
  label: string;
  description: string;
  /** Index for radius calculations (0 = innermost). */
  index: 0 | 1 | 2;
  /** Tailwind-compatible accent tokens. */
  accent: {
    stroke: string;
    fill: string;
    text: string;
    glow: string;
    hex: string;
    badge: string;
  };
}

export const RINGS: Record<RingId, RadialRing> = {
  foundations: {
    id: 'foundations',
    label: 'Foundations',
    description: 'Money, goals, markets and the basics of risk.',
    index: 0,
    accent: {
      stroke: 'stroke-teal-400/60',
      fill: 'fill-teal-500/10',
      text: 'text-teal-300',
      glow: 'shadow-teal-500/30',
      hex: '#2dd4bf',
      badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    },
  },
  investing: {
    id: 'investing',
    label: 'Investing Basics',
    description: 'How stocks, funds, bonds and ETFs actually work.',
    index: 1,
    accent: {
      stroke: 'stroke-sky-400/60',
      fill: 'fill-sky-500/10',
      text: 'text-sky-300',
      glow: 'shadow-sky-500/30',
      hex: '#38bdf8',
      badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    },
  },
  advanced: {
    id: 'advanced',
    label: 'Advanced Topics',
    description: 'Analysis, derivatives, portfolio and investor protection.',
    index: 2,
    accent: {
      stroke: 'stroke-rose-400/60',
      fill: 'fill-rose-500/10',
      text: 'text-rose-300',
      glow: 'shadow-rose-500/30',
      hex: '#fb7185',
      badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    },
  },
};

export const RING_ORDER: RingId[] = ['foundations', 'investing', 'advanced'];

export const RADIAL_TOPICS: RadialTopic[] = [
  // ---------------- Ring 1 — Foundations ----------------
  {
    id: 'f_money_goals',
    title: 'Money & Financial Goals',
    shortLabel: 'Money & Goals',
    category: 'Money and financial goals',
    ring: 'foundations',
    description: 'Understand how money works, build simple budgets and set goals that keep inflation in mind.',
    learningOutcomes: [
      'Explain how saving and budgeting support financial goals.',
      'Describe how inflation changes purchasing power over time.',
      'Set a goal with a time horizon and an amount.',
    ],
    difficulty: 'Beginner',
    prerequisites: [],
    connections: ['f_saving_vs_investing', 'f_markets'],
    status: 'preview',
  },
  {
    id: 'f_saving_vs_investing',
    title: 'Saving vs Investing',
    shortLabel: 'Save vs Invest',
    category: 'Saving vs investing',
    ring: 'foundations',
    description: 'See why investing involves risk, and how compounding and time horizon shape outcomes.',
    learningOutcomes: [
      'Distinguish saving from investing.',
      'Describe how compounding depends on time.',
      'Recognise that investment returns are not guaranteed.',
    ],
    difficulty: 'Beginner',
    prerequisites: [],
    connections: ['f_money_goals', 'f_risk_return', 'f_products'],
    status: 'preview',
  },
  {
    id: 'f_markets',
    title: 'Understanding Markets',
    shortLabel: 'Markets',
    category: 'Understanding markets',
    ring: 'foundations',
    description: 'Learn what a financial market is, why it exists and how buyers and sellers find prices.',
    learningOutcomes: [
      'Explain the purpose of a financial market.',
      'Describe price discovery between buyers and sellers.',
    ],
    difficulty: 'Beginner',
    prerequisites: [],
    connections: ['i_market_india', 'f_products'],
    status: 'preview',
  },
  {
    id: 'f_risk_return',
    title: 'Risk & Return',
    shortLabel: 'Risk & Return',
    category: 'Risk and return',
    ring: 'foundations',
    description: 'Explore what risk really means and why higher potential returns usually mean more uncertainty.',
    learningOutcomes: [
      'Define risk in a financial context.',
      'Explain why returns are not guaranteed.',
      'Compare risk across common products.',
    ],
    difficulty: 'Beginner',
    prerequisites: [],
    connections: ['f_saving_vs_investing', 'i_risk_mgmt', 'i_bonds'],
    status: 'preview',
  },
  {
    id: 'f_products',
    title: 'Financial Products',
    shortLabel: 'Products',
    category: 'Financial products overview',
    ring: 'foundations',
    description: 'A quick tour of stocks, bonds, mutual funds and ETFs — what each is at a glance.',
    learningOutcomes: [
      'Identify stocks, bonds, mutual funds and ETFs.',
      'Describe one defining feature of each product.',
    ],
    difficulty: 'Beginner',
    prerequisites: [],
    connections: ['i_stocks', 'i_bonds', 'i_mutual_funds', 'i_etfs'],
    status: 'preview',
  },

  // ---------------- Ring 2 — Investing Basics ----------------
  {
    id: 'i_stocks',
    title: 'Stocks',
    shortLabel: 'Stocks',
    category: 'Stocks',
    ring: 'investing',
    description: 'Discover how owning a share gives you a small ownership stake in a company and why prices move.',
    learningOutcomes: [
      'Explain what a share represents.',
      'Understand why companies issue shares.',
      'Recognise that share prices can rise or fall.',
    ],
    difficulty: 'Beginner',
    prerequisites: ['f_products'],
    lessonIds: ['node_lvl_1'],
    moduleId: 'stocks',
    connections: ['f_products', 'i_market_india', 'i_orders', 'a_fundamental'],
    status: 'available',
  },
  {
    id: 'i_market_india',
    title: 'Indian Stock Market',
    shortLabel: 'NSE & BSE',
    category: 'How the Indian stock market works',
    ring: 'investing',
    description: 'Learn how NSE, BSE, brokers, demat accounts and settlement fit together.',
    learningOutcomes: [
      'Describe the role of exchanges and indices.',
      'Explain what a demat account does.',
      'Outline how orders are matched and settled.',
    ],
    difficulty: 'Beginner',
    prerequisites: ['f_markets'],
    connections: ['i_stocks', 'i_orders'],
    status: 'preview',
  },
  {
    id: 'i_orders',
    title: 'Orders & Trading',
    shortLabel: 'Orders',
    category: 'Orders and trading mechanics',
    ring: 'investing',
    description: 'Understand market, limit and stop-loss orders — plus delivery, intraday and brokerage charges.',
    learningOutcomes: [
      'Distinguish market, limit and stop-loss orders.',
      'Explain delivery vs intraday trading.',
      'Recognise how fees affect returns.',
    ],
    difficulty: 'Intermediate',
    prerequisites: ['i_stocks'],
    connections: ['i_stocks', 'a_trading_strat'],
    status: 'preview',
  },
  {
    id: 'i_mutual_funds',
    title: 'Mutual Funds',
    shortLabel: 'Mutual Funds',
    category: 'Mutual funds',
    ring: 'investing',
    description: 'Explore pooled investing, NAV, SIPs, lump sum, and the differences between equity, debt and hybrid funds.',
    learningOutcomes: [
      'Explain NAV and units.',
      'Compare SIP and lump-sum investing.',
      'Describe equity, debt and hybrid funds.',
    ],
    difficulty: 'Beginner',
    prerequisites: ['f_products'],
    lessonIds: ['mf_lvl_1'],
    moduleId: 'mutual-funds',
    connections: ['f_products', 'i_etfs', 'a_portfolio'],
    status: 'available',
  },
  {
    id: 'i_bonds',
    title: 'Bonds',
    shortLabel: 'Bonds',
    category: 'Bonds',
    ring: 'investing',
    description: 'See how lending differs from ownership, and how interest, maturity and credit risk shape bond returns.',
    learningOutcomes: [
      'Distinguish lending from ownership.',
      'Explain coupons and maturity.',
      'Describe how prices move with interest rates.',
    ],
    difficulty: 'Intermediate',
    prerequisites: ['f_risk_return'],
    moduleId: 'bonds',
    connections: ['f_products', 'f_risk_return'],
    status: 'preview',
  },
  {
    id: 'i_etfs',
    title: 'ETFs',
    shortLabel: 'ETFs',
    category: 'ETFs',
    ring: 'investing',
    description: 'Learn how ETFs bundle a basket of assets, trade on exchanges, and compare to mutual funds.',
    learningOutcomes: [
      'Describe how an ETF is structured.',
      'Compare ETF prices and NAV.',
      'Spot tracking differences and costs.',
    ],
    difficulty: 'Intermediate',
    prerequisites: ['i_mutual_funds'],
    connections: ['i_mutual_funds', 'f_products'],
    status: 'preview',
  },
  {
    id: 'i_risk_mgmt',
    title: 'Risk Management',
    shortLabel: 'Risk Mgmt',
    category: 'Risk management',
    ring: 'investing',
    description: 'Build intuition for diversification, asset allocation, volatility and time horizon.',
    learningOutcomes: [
      'Explain diversification across assets.',
      'Describe why volatility is not the same as loss.',
      'Match time horizon to investment choices.',
    ],
    difficulty: 'Intermediate',
    prerequisites: ['f_risk_return'],
    connections: ['f_risk_return', 'a_portfolio'],
    status: 'preview',
  },

  // ---------------- Ring 3 — Advanced Topics ----------------
  {
    id: 'a_fundamental',
    title: 'Fundamental Analysis',
    shortLabel: 'Fundamentals',
    category: 'Fundamental analysis',
    ring: 'advanced',
    description: 'Read financial statements, understand EPS and P/E, and compare businesses in the same sector.',
    learningOutcomes: [
      'Read key lines on a financial statement.',
      'Interpret EPS and P/E in context.',
      'Compare two companies in the same sector.',
    ],
    difficulty: 'Advanced',
    prerequisites: ['i_stocks'],
    connections: ['i_stocks', 'a_portfolio'],
    status: 'preview',
  },
  {
    id: 'a_technical',
    title: 'Technical Analysis',
    shortLabel: 'Technicals',
    category: 'Technical analysis',
    ring: 'advanced',
    description: 'Explore candlesticks, trends, moving averages and the limits of chart-based signals.',
    learningOutcomes: [
      'Read candlestick and line charts.',
      'Identify trends and support/resistance.',
      'Recognise limitations of technical indicators.',
    ],
    difficulty: 'Advanced',
    prerequisites: ['i_orders'],
    connections: ['i_orders', 'a_trading_strat'],
    status: 'preview',
  },
  {
    id: 'a_trading_strat',
    title: 'Trading Strategies',
    shortLabel: 'Strategies',
    category: 'Trading strategies and risk',
    ring: 'advanced',
    description: 'Learn delivery, intraday and swing trading with risk-first position sizing and discipline.',
    learningOutcomes: [
      'Distinguish delivery, intraday and swing trading.',
      'Explain position sizing and stop-loss limits.',
      'Describe discipline as part of risk control.',
    ],
    difficulty: 'Advanced',
    prerequisites: ['i_orders', 'i_risk_mgmt'],
    connections: ['i_orders', 'a_fno', 'a_technical'],
    status: 'preview',
  },
  {
    id: 'a_fno',
    title: 'Futures & Options',
    shortLabel: 'F & O',
    category: 'Futures and options',
    ring: 'advanced',
    description: 'Understand derivatives, calls, puts, strike price, premium and the risks of leverage.',
    learningOutcomes: [
      'Define a derivative.',
      'Explain a call and a put at a basic level.',
      'Recognise that leverage can magnify losses.',
    ],
    difficulty: 'Advanced',
    prerequisites: ['i_orders', 'i_risk_mgmt'],
    moduleId: 'fno',
    connections: ['i_orders', 'a_margin'],
    status: 'preview',
  },
  {
    id: 'a_margin',
    title: 'Margin & Pledging',
    shortLabel: 'Margin',
    category: 'Margin and pledging',
    ring: 'advanced',
    description: 'See what margin, collateral and pledged holdings mean, and why forced liquidation is a real risk.',
    learningOutcomes: [
      'Define margin in simple terms.',
      'Explain pledging and collateral.',
      'Describe margin calls and forced liquidation.',
    ],
    difficulty: 'Advanced',
    prerequisites: ['a_fno'],
    connections: ['a_fno'],
    status: 'preview',
  },
  {
    id: 'a_portfolio',
    title: 'Portfolio Management',
    shortLabel: 'Portfolio',
    category: 'Portfolio management',
    ring: 'advanced',
    description: 'Build intuition for allocation, rebalancing and spotting concentration risk across asset classes.',
    learningOutcomes: [
      'Describe asset allocation across classes.',
      'Explain rebalancing at a high level.',
      'Spot concentration risk.',
    ],
    difficulty: 'Advanced',
    prerequisites: ['i_risk_mgmt'],
    connections: ['i_risk_mgmt', 'a_fundamental', 'i_mutual_funds'],
    status: 'preview',
  },
  {
    id: 'a_taxes',
    title: 'Taxes & Protection',
    shortLabel: 'Tax & Safety',
    category: 'Taxes and investor protection',
    ring: 'advanced',
    description: 'Cover basic tax concepts, transaction costs, fraud prevention and investor grievance channels.',
    learningOutcomes: [
      'Describe basic tax concepts for investors.',
      'Identify common investment scams.',
      'Know where to seek investor protection.',
    ],
    difficulty: 'Advanced',
    prerequisites: [],
    connections: ['a_portfolio'],
    status: 'preview',
  },
];

/** Convenience: topics grouped by ring, preserving curriculum order. */
export const TOPICS_BY_RING: Record<RingId, RadialTopic[]> = {
  foundations: RADIAL_TOPICS.filter((t) => t.ring === 'foundations'),
  investing: RADIAL_TOPICS.filter((t) => t.ring === 'investing'),
  advanced: RADIAL_TOPICS.filter((t) => t.ring === 'advanced'),
};

export const TOPIC_BY_ID: Record<string, RadialTopic> = Object.fromEntries(
  RADIAL_TOPICS.map((t) => [t.id, t]),
);

export type LearningGoalId =
  | 'understand_investing'
  | 'learn_stocks'
  | 'explore_mutual_funds'
  | 'understand_trading'
  | 'explore_everything';

export interface LearningGoal {
  id: LearningGoalId;
  title: string;
  description: string;
  /** Recommended topic ID to open after onboarding. */
  recommendedTopicId: string;
}

export const LEARNING_GOALS: LearningGoal[] = [
  {
    id: 'understand_investing',
    title: 'Understand investing',
    description: 'Build confidence with money, markets, risk and long-term investing.',
    recommendedTopicId: 'f_saving_vs_investing',
  },
  {
    id: 'learn_stocks',
    title: 'Learn about stocks',
    description: 'Understand shares, businesses, company performance and stock markets.',
    recommendedTopicId: 'i_stocks',
  },
  {
    id: 'explore_mutual_funds',
    title: 'Explore mutual funds',
    description: 'Learn about funds, NAV, SIPs, fees and risk.',
    recommendedTopicId: 'i_mutual_funds',
  },
  {
    id: 'understand_trading',
    title: 'Understand trading',
    description: 'Explore orders, charts, trading mechanics and risk management.',
    recommendedTopicId: 'i_orders',
  },
  {
    id: 'explore_everything',
    title: 'Explore everything',
    description: 'Browse the full learning map at your own pace.',
    recommendedTopicId: 'f_money_goals',
  },
];

export const GOAL_BY_ID: Record<LearningGoalId, LearningGoal> = Object.fromEntries(
  LEARNING_GOALS.map((g) => [g.id, g]),
) as Record<LearningGoalId, LearningGoal>;

/**
 * Nearest available lesson for a topic: either the topic itself if it has a
 * wired lesson, or the first available topic reachable via connections.
 */
export function findNearestAvailableTopic(topicId: string): RadialTopic | null {
  const visited = new Set<string>();
  const queue: string[] = [topicId];
  while (queue.length) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const t = TOPIC_BY_ID[id];
    if (!t) continue;
    if (t.status === 'available') return t;
    for (const c of t.connections) queue.push(c);
  }
  // Fallback to the canonical first lesson topic
  return TOPIC_BY_ID['i_stocks'] ?? null;
}
