/**
 * Core Learning Modules & Independent Curriculum Architecture for FinCraft.
 * 
 * Supports 4 independent financial learning modules:
 * 1. Stocks ('stocks') - Fully implemented interactive curriculum & cases
 * 2. Mutual Funds ('mutual-funds') - Architecture & roadmap ready
 * 3. Bonds ('bonds') - Architecture & roadmap ready
 * 4. Futures & Options ('fno') - Architecture & roadmap ready
 * 
 * Each module maintains isolated progress, activity completions, and XP tracking.
 */

import { LEARNING_UNITS, PathNode } from './learningPath.ts';
import { PLAYGROUND_CASES } from './cases.ts';

export type LearningModuleId = 'stocks' | 'mutual-funds' | 'bonds' | 'fno' | 'markets-stocks';

export type ModuleStatus = 'active' | 'coming-soon';

export interface LearningRoadmapItem {
  id: string;
  levelNumber: number;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  estimatedMinutes: number;
  isAvailable: boolean;
}

export interface LearningModule {
  id: LearningModuleId;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: 'TrendingUp' | 'PieChart' | 'Landmark' | 'Zap' | 'LineChart';
  status: ModuleStatus;
  accentColor: {
    primary: string;
    border: string;
    bg: string;
    badge: string;
    text: string;
  };
  keyTakeaways: string[];
  roadmap: LearningRoadmapItem[];
  riskNotice?: string;
}

export interface ModuleProgress {
  moduleId: LearningModuleId;
  completedActivityIds: string[];
  currentActivityId?: string;
  earnedXp: number;
  status: 'not-started' | 'in-progress' | 'completed';
  lastAccessedAt?: string;
}

export const MODULE_DEFINITIONS: Record<LearningModuleId, LearningModule> = {
  'markets-stocks': {
    id: 'markets-stocks',
    title: 'Markets & Stocks',
    shortTitle: 'Markets',
    tagline: 'How markets, stocks, orders and ETFs actually work.',
    description:
      'Eight interactive scenarios across four sections — markets, stocks, trading mechanics and ETFs. Explore an NSE/BSE map, run a simulated order book, and compare a basket versus a single stock, all with clearly-labelled fictional data.',
    iconName: 'LineChart',
    status: 'active',
    accentColor: {
      primary: 'sky',
      border: 'border-sky-500/40',
      bg: 'from-sky-950/40 via-slate-900 to-slate-950',
      badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      text: 'text-sky-400',
    },
    keyTakeaways: [
      'A financial market is where buyers and sellers meet to transfer ownership of securities.',
      'A stock exchange like NSE or BSE is the venue; an index like Nifty 50 is a measurement.',
      'Owning a share is partial ownership of a business — not a loan and not a guaranteed dividend.',
      'A market order prioritises execution; a limit order prioritises price. Neither is universally better.',
      'An ETF holds a basket, but holding a basket does not eliminate market risk.',
    ],
    roadmap: [
      {
        id: 'ms_c1_market',
        levelNumber: 1,
        title: 'What Is a Financial Market?',
        subtitle: 'Primary vs secondary markets, Sunny Bakery raises capital',
        description:
          'Follow Sunny Bakery as it chooses between loans and share issuance, then meets its first secondary-market buyer.',
        topics: ['Companies and capital', 'Primary vs secondary', 'Investor role'],
        estimatedMinutes: 3,
        isAvailable: true,
      },
      {
        id: 'ms_c2_nse_bse',
        levelNumber: 2,
        title: 'NSE, BSE & Market Indices',
        subtitle: 'Exchanges and indices on an interactive map',
        description:
          'Tap NSE, BSE, Nifty 50 and Sensex, see what each actually does, then classify them in a short challenge.',
        topics: ['Exchange role', 'Index role', 'Nifty 50 and Sensex'],
        estimatedMinutes: 4,
        isAvailable: true,
      },
      {
        id: 'ms_c3_market_flow',
        levelNumber: 3,
        title: 'How Does the Stock Market Work?',
        subtitle: 'Listing → order → matching → settlement',
        description:
          'Walk the full lifecycle of a trade step by step, from a company becoming listed to settlement and delivery.',
        topics: ['Public listing', 'Order matching', 'Settlement'],
        estimatedMinutes: 4,
        isAvailable: true,
      },
      {
        id: 'ms_c4_stock',
        levelNumber: 4,
        title: 'What Is a Stock?',
        subtitle: 'Partial ownership of Sunny Bakery',
        description:
          'Use a 100-tile ownership grid to pick a share count and see your fractional ownership update live.',
        topics: ['Share = partial ownership', 'Shares vs loans', 'Dividends are not guaranteed'],
        estimatedMinutes: 3,
        isAvailable: true,
      },
      {
        id: 'ms_c5_price_change',
        levelNumber: 5,
        title: 'Why Do Stock Prices Change?',
        subtitle: 'Supply, demand and expectations',
        description:
          'React to a fictional Sunny Bakery news feed, then see why a positive headline can still move prices either way.',
        topics: ['Supply and demand', 'Expectations', 'Multiple possible reactions'],
        estimatedMinutes: 4,
        isAvailable: true,
      },
      {
        id: 'ms_c6_trade_flow',
        levelNumber: 6,
        title: 'How Does a Stock Trade Happen?',
        subtitle: 'From your broker to settlement',
        description:
          'Trace a simulated order from the investor to the demat account via broker, order book and matching.',
        topics: ['Broker vs exchange', 'Trading vs demat', 'Execution vs settlement'],
        estimatedMinutes: 4,
        isAvailable: true,
      },
      {
        id: 'ms_c7_order_types',
        levelNumber: 7,
        title: 'Market Orders vs Limit Orders',
        subtitle: 'Deterministic order-book simulator',
        description:
          'Place simulated market and limit orders against a live-looking order book — see executions, partials and pending orders.',
        topics: ['Bid / ask / spread', 'Market order', 'Limit order'],
        estimatedMinutes: 6,
        isAvailable: true,
      },
      {
        id: 'ms_c8_etf',
        levelNumber: 8,
        title: 'What Is an ETF?',
        subtitle: 'Basket vs single stock',
        description:
          'Build a fictional 3-company basket, run market scenarios, and compare it with holding one stock or an index-tracking ETF.',
        topics: ['ETF basics', 'Index vs ETF', 'Diversification is not risk-free'],
        estimatedMinutes: 5,
        isAvailable: true,
      },
    ],
  },
  stocks: {
    id: 'stocks',
    title: 'Stocks & Equity Investing',
    shortTitle: 'Stocks',
    tagline: 'Understand businesses, shares, valuation, and company analysis.',
    description: 'Learn how companies raise capital, how stock prices reflect business performance, how to read financial statements, and how to spot red flags in real-world market cases.',
    iconName: 'TrendingUp',
    status: 'active',
    accentColor: {
      primary: 'emerald',
      border: 'border-emerald-500/40',
      bg: 'from-emerald-950/40 via-slate-900 to-slate-950',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      text: 'text-emerald-400',
    },
    keyTakeaways: [
      'Shares represent fractional ownership of a living, operating business.',
      'Stock price does not equal company valuation (Market Cap = Shares × Price).',
      'P/E ratios measure how much investors pay per rupee of annual earnings.',
      'Cash flow, return on equity (ROE), and debt burdens determine long-term survival.',
    ],
    roadmap: [
      {
        id: 'stocks_lvl_1',
        levelNumber: 1,
        title: 'Foundations: Stocks & Business',
        subtitle: 'Ownership, Market Cap & Revenue vs Profit',
        description: 'Understand why companies issue shares, how equity differs from debt, and the fundamentals of market capitalization.',
        topics: ['What is a share?', 'Equity ownership', 'Market Cap math', 'Revenue vs Profit'],
        estimatedMinutes: 12,
        isAvailable: true,
      },
      {
        id: 'stocks_lvl_2',
        levelNumber: 2,
        title: 'Valuation: EPS & P/E Multiples',
        subtitle: 'Earnings Per Share and Valuation Ratios',
        description: 'Discover why a ₹2,000 share can be cheaper than a ₹50 share by mastering Earnings Per Share and the P/E ratio.',
        topics: ['Earnings Per Share (EPS)', 'P/E multiple intuition', 'Industry comparisons', 'Growth vs Value'],
        estimatedMinutes: 15,
        isAvailable: true,
      },
      {
        id: 'stocks_lvl_3',
        levelNumber: 3,
        title: 'Financial Health: Solvency & Capital Efficiency',
        subtitle: 'Debt-to-Equity, ROE & Cash Flow',
        description: 'Learn how to detect corporate fragility, assess promoter debt, and calculate Return on Equity (ROE).',
        topics: ['Debt-to-Equity ratio', 'Return on Equity (ROE)', 'Operating cash flow', 'Dividends vs Reinvestment'],
        estimatedMinutes: 18,
        isAvailable: true,
      },
      {
        id: 'stocks_lvl_4',
        levelNumber: 4,
        title: 'Forensic Investigation Cases',
        subtitle: 'Real-world Financial Detective Simulations',
        description: 'Synthesize your financial reasoning through full forensic cases: uncover uncollectible receivables, vanishing momentum, and cash burn.',
        topics: ['The Vanishing Momentum Case', 'Working capital traps', 'Forensic accounting clues', 'Investment thesis formulation'],
        estimatedMinutes: 25,
        isAvailable: true,
      },
    ],
  },
  'mutual-funds': {
    id: 'mutual-funds',
    title: 'Mutual Funds & Wealth Building',
    shortTitle: 'Mutual Funds',
    tagline: 'Understand funds, NAV, SIPs, and investment risk.',
    description: 'Master the mechanics of pooled capital: understand Net Asset Value (NAV), compare Active vs Passive funds, discover the math behind SIP compounding, and navigate expense ratios.',
    iconName: 'PieChart',
    status: 'active',
    accentColor: {
      primary: 'teal',
      border: 'border-teal-500/40',
      bg: 'from-teal-950/40 via-slate-900 to-slate-950',
      badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      text: 'text-teal-400',
    },
    keyTakeaways: [
      'Mutual funds aggregate capital from thousands of investors to hold diversified portfolios.',
      'NAV reflects per-unit net asset value, recalculated at the close of every trading day.',
      'Expense ratios are recurring charges deducted directly from your AUM, compounding over decades.',
      'Systematic Investment Plans (SIPs) use rupee-cost averaging to eliminate market timing anxiety.',
    ],
    roadmap: [
      {
        id: 'mf_lvl_1',
        levelNumber: 1,
        title: 'Mutual Fund Basics & Pooling',
        subtitle: 'Build a Fund & Discover Collective Ownership',
        description: 'Meet small savers, pool money into an institutional trust, and allocate units at base NAV.',
        topics: ['Collective pooling', 'AMC vs Fund Manager vs Investor', 'Unit ownership', 'Instant diversification'],
        estimatedMinutes: 5,
        isAvailable: true,
      },
      {
        id: 'mf_lvl_2',
        levelNumber: 2,
        title: 'NAV, Units & The Monthly SIP',
        subtitle: 'The NAV Machine & Rupee-Cost Averaging',
        description: 'Interactive NAV calculator & 6-month SIP cycle demonstrating how market dips lower average unit cost.',
        topics: ['Amount ÷ NAV math', 'Why NAV is not a cheapness score', 'Rupee-cost averaging', 'Deterministic simulation'],
        estimatedMinutes: 6,
        isAvailable: true,
      },
      {
        id: 'mf_lvl_3',
        levelNumber: 3,
        title: 'Types of Mutual Funds',
        subtitle: 'Match the Fund to the Life Goal',
        description: 'Interactive life-goal matcher across Equity, Debt, Hybrid, and Index funds without one-size-fits-all myths.',
        topics: ['Equity vs Debt vs Hybrid', 'Time horizon matching', 'Active vs Passive indexing', 'SEBI risk spectrum'],
        estimatedMinutes: 6,
        isAvailable: true,
      },
      {
        id: 'mf_lvl_4',
        levelNumber: 4,
        title: 'Risk, Fees & Fund Comparison',
        subtitle: 'The Expense Ratio Trap & Riskometers',
        description: 'The compounding fee drag simulator (Direct vs Regular) and analyzing Two Funds beyond headline returns.',
        topics: ['Total Expense Ratio (TER) drag', 'Direct vs Regular plans', 'SEBI Riskometer', 'Past returns warning'],
        estimatedMinutes: 7,
        isAvailable: true,
      },
      {
        id: 'mf_lvl_5',
        levelNumber: 5,
        title: 'Mutual Fund Investigator',
        subtitle: 'Case Investigation: The Fund Comparison Case',
        description: 'Forensic case study: inspect 5 evidence clues, select analytical factors, and evaluate investment reasoning.',
        topics: ['The Fund Comparison Case', 'Rolling returns analysis', 'Tracking error check', 'Reasoning evaluation'],
        estimatedMinutes: 8,
        isAvailable: true,
      },
    ],
  },
  bonds: {
    id: 'bonds',
    title: 'Bonds & Fixed Income',
    shortTitle: 'Bonds',
    tagline: 'Understand bond prices, interest, yields, maturity, and credit risk.',
    description: 'Learn how debt securities work: master face value, coupon rates, the seesaw relationship between bond prices and interest rates, and evaluate credit rating defaults.',
    iconName: 'Landmark',
    status: 'coming-soon',
    accentColor: {
      primary: 'amber',
      border: 'border-amber-500/40',
      bg: 'from-amber-950/40 via-slate-900 to-slate-950',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      text: 'text-amber-400',
    },
    keyTakeaways: [
      'A bond is an IOU: you act as a creditor rather than a fractional business owner.',
      'Bond prices and market interest rates move in opposite directions (the Seesaw principle).',
      'Yield to Maturity (YTM) accounts for coupon payments, reinvestment rate, and capital gain/loss.',
      'Credit ratings (AAA down to D) assess the probability that an issuer will default on payments.',
    ],
    roadmap: [
      {
        id: 'bonds_lvl_1',
        levelNumber: 1,
        title: 'Debt Securities Fundamentals',
        subtitle: 'Loans, Face Value, Coupons & Maturity',
        description: 'Understand the contract between borrower (issuer) and lender (bondholder), and seniority over equity.',
        topics: ['Creditor status vs Equity owner', 'Face value (Par value)', 'Coupon rate & schedule', 'Maturity date'],
        estimatedMinutes: 10,
        isAvailable: false,
      },
      {
        id: 'bonds_lvl_2',
        levelNumber: 2,
        title: 'The Interest Rate Seesaw',
        subtitle: 'Why Bond Prices Rise When Interest Rates Fall',
        description: 'Interactive visual experiment demonstrating why secondary market bond prices fluctuate inversely with central bank repo rates.',
        topics: ['Current Yield formula', 'The Seesaw principle', 'Discount vs Premium bonds', 'Yield to Maturity (YTM)'],
        estimatedMinutes: 14,
        isAvailable: false,
      },
      {
        id: 'bonds_lvl_3',
        levelNumber: 3,
        title: 'Credit Risk & Default Ratings',
        subtitle: 'Sovereign G-Secs, Corporate Bonds & Rating Agencies',
        description: 'Learn how rating agencies (CRISIL, ICRA) evaluate default risk, and what credit spreads signify.',
        topics: ['Government Securities (G-Secs)', 'AAA to speculative high-yield', 'Credit spread over risk-free rate', 'Default recovery rates'],
        estimatedMinutes: 12,
        isAvailable: false,
      },
      {
        id: 'bonds_lvl_4',
        levelNumber: 4,
        title: 'Duration & Portfolio Strategy',
        subtitle: 'Macaulay Duration, Inflation Risk & Fixed Income Allocation',
        description: 'Understand how long-term bonds are more sensitive to rate shocks, and how to ladder bonds for predictable cash flow.',
        topics: ['Duration as interest sensitivity', 'Inflation risk on fixed coupons', 'Bond laddering strategies', 'Target maturity funds'],
        estimatedMinutes: 16,
        isAvailable: false,
      },
    ],
  },
  fno: {
    id: 'fno',
    title: 'Futures & Options (F&O)',
    shortTitle: 'Futures & Options',
    tagline: 'Learn derivatives, futures, calls, puts, expiry, payoff, leverage, and risk.',
    description: 'Understand derivative contracts from first principles: learn why derivatives exist for risk hedging, explore how leverage magnifies both gains and losses, and master call and put options with risk discipline.',
    iconName: 'Zap',
    status: 'coming-soon',
    accentColor: {
      primary: 'purple',
      border: 'border-purple-500/40',
      bg: 'from-purple-950/40 via-slate-900 to-slate-950',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      text: 'text-purple-400',
    },
    riskNotice: 'SEBI Investor Notice: 9 out of 10 individual traders in equity F&O incur net losses. This module is strictly designed for educational understanding of risk transfer, hedging, and derivative mathematics.',
    keyTakeaways: [
      'Derivatives derive their value from an underlying asset (e.g. NIFTY 50 index or equity stock).',
      'Derivatives are zero-sum contracts created to transfer risk between hedgers and speculators.',
      'Leverage is a double-edged sword: margin trading can lead to losses exceeding initial capital.',
      'Options grant the right, not the obligation, to buy (Call) or sell (Put) at a predetermined price.',
    ],
    roadmap: [
      {
        id: 'fno_lvl_1',
        levelNumber: 1,
        title: 'Derivative Fundamentals & Risk First',
        subtitle: 'Underlying Assets, Forward Commitments & Zero-Sum Math',
        description: 'Why derivatives were invented for farmers and airline fuel hedging, and the strict mathematical reality of zero-sum markets.',
        topics: ['What is an underlying asset?', 'Risk transfer & hedging history', 'Zero-sum mechanics', 'Why retail traders fail'],
        estimatedMinutes: 12,
        isAvailable: false,
      },
      {
        id: 'fno_lvl_2',
        levelNumber: 2,
        title: 'Futures Contracts & Margin Leverage',
        subtitle: 'Lot Sizes, Initial Margin & Mark-to-Market (MTM)',
        description: 'Interactive futures trade simulator showing how daily MTM settlement works and the danger of over-leveraging.',
        topics: ['Futures contract obligations', 'Lot sizes and contract values', 'SPAN & Exposure margin', 'Mark-to-Market settlement'],
        estimatedMinutes: 15,
        isAvailable: false,
      },
      {
        id: 'fno_lvl_3',
        levelNumber: 3,
        title: 'Options: Calls & Puts Demystified',
        subtitle: 'Strike Price, Premium, Expiry & Rights vs Obligations',
        description: 'Understand the asymmetry of option buying (limited loss, uncapped potential) vs option selling (limited gain, uncapped risk).',
        topics: ['Call option buyer vs seller', 'Put option buyer vs seller', 'Strike price & Spot price', 'Intrinsic value vs Time value'],
        estimatedMinutes: 18,
        isAvailable: false,
      },
      {
        id: 'fno_lvl_4',
        levelNumber: 4,
        title: 'Payoff Diagrams & Capital Preservation',
        subtitle: 'Breakeven Math, Greeks Overview & Strict Risk Rules',
        description: 'Visual payoff curves at expiry, understanding time decay (Theta), and why professional risk managers never risk ruin.',
        topics: ['Visual payoff charts', 'Breakeven points', 'Time decay (Theta drag)', 'Capital preservation rules'],
        estimatedMinutes: 20,
        isAvailable: false,
      },
    ],
  },
};

const STORAGE_KEY_MODULES_PROGRESS = 'fincraft_modules_progress_v1';
const STORAGE_KEY_LEGACY_MODULE_01 = 'fincraft_module_01_progress';

/**
 * Creates default progress state for a module.
 */
export function createInitialModuleProgress(moduleId: LearningModuleId): ModuleProgress {
  return {
    moduleId,
    completedActivityIds: [],
    currentActivityId:
      moduleId === 'stocks'
        ? 'node_lvl_1'
        : moduleId === 'markets-stocks'
          ? 'ms_c1_market'
          : undefined,
    earnedXp: 0,
    status: 'not-started',
    lastAccessedAt: new Date().toISOString(),
  };
}

/**
 * Loads all modules progress with idempotent migration from legacy progress.
 */
export function loadAllModulesProgress(initialGlobalNodeIds: string[] = []): Record<LearningModuleId, ModuleProgress> {
  const result: Record<LearningModuleId, ModuleProgress> = {
    stocks: createInitialModuleProgress('stocks'),
    'mutual-funds': createInitialModuleProgress('mutual-funds'),
    bonds: createInitialModuleProgress('bonds'),
    fno: createInitialModuleProgress('fno'),
    'markets-stocks': createInitialModuleProgress('markets-stocks'),
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_MODULES_PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        (['stocks', 'mutual-funds', 'bonds', 'fno', 'markets-stocks'] as LearningModuleId[]).forEach((modId) => {
          if (parsed[modId] && Array.isArray(parsed[modId].completedActivityIds)) {
            result[modId] = {
              ...result[modId],
              ...parsed[modId],
            };
          }
        });
      }
    }
  } catch (err) {
    console.warn('Failed to load modules progress from storage:', err);
  }

  // --- Idempotent Migration from Legacy Stocks Progress ---
  const stocksProgress = result.stocks;
  const existingSet = new Set(stocksProgress.completedActivityIds);

  // 1. Migrate any legacy node IDs passed in
  initialGlobalNodeIds.forEach((nodeId) => {
    existingSet.add(nodeId);
  });

  // 2. Check legacy Module 01 storage ('fincraft_module_01_progress')
  try {
    const legacyM01 = localStorage.getItem(STORAGE_KEY_LEGACY_MODULE_01);
    if (legacyM01) {
      const parsed = JSON.parse(legacyM01);
      if (Array.isArray(parsed.completedStages)) {
        parsed.completedStages.forEach((stageNum: number) => {
          existingSet.add(`m01_stage_${stageNum}`);
        });
      }
    }
  } catch {
    // Ignore legacy read errors
  }

  stocksProgress.completedActivityIds = Array.from(existingSet);

  // Re-calculate Stocks earned XP and status if activities are completed
  if (stocksProgress.completedActivityIds.length > 0) {
    // Determine status
    const allStockNodeIds = LEARNING_UNITS.flatMap((u) => u.nodes.map((n) => n.id));
    const allCompleted = allStockNodeIds.length > 0 && allStockNodeIds.every((id) => existingSet.has(id));
    stocksProgress.status = allCompleted ? 'completed' : 'in-progress';

    // Find next uncompleted node
    const nextUncompletedNode = allStockNodeIds.find((id) => !existingSet.has(id));
    if (nextUncompletedNode) {
      stocksProgress.currentActivityId = nextUncompletedNode;
    }
  }

  return result;
}

/**
 * Saves all module progress to storage safely.
 */
export function saveAllModulesProgress(allProgress: Record<LearningModuleId, ModuleProgress>): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODULES_PROGRESS, JSON.stringify(allProgress));
  } catch (err) {
    console.warn('Failed to save modules progress:', err);
  }
}

/**
 * Records an activity completion for a specific module idempotently.
 * Returns the updated module progress and delta XP awarded (0 if already completed).
 */
export function recordModuleActivityCompletion(
  currentProgress: ModuleProgress,
  activityId: string,
  xpReward: number
): { updatedProgress: ModuleProgress; xpAwarded: number } {
  const isAlreadyCompleted = currentProgress.completedActivityIds.includes(activityId);

  if (isAlreadyCompleted) {
    return {
      updatedProgress: currentProgress,
      xpAwarded: 0,
    };
  }

  const updatedCompleted = [...currentProgress.completedActivityIds, activityId];
  const updatedXp = currentProgress.earnedXp + xpReward;

  // Determine next activity for Stocks
  let nextActivityId = currentProgress.currentActivityId;
  let status: ModuleProgress['status'] = 'in-progress';

  if (currentProgress.moduleId === 'stocks') {
    const allStockNodeIds = LEARNING_UNITS.flatMap((u) => u.nodes.map((n) => n.id));
    const nextNode = allStockNodeIds.find((id) => !updatedCompleted.includes(id));
    nextActivityId = nextNode || allStockNodeIds[allStockNodeIds.length - 1];
    if (allStockNodeIds.length > 0 && allStockNodeIds.every((id) => updatedCompleted.includes(id))) {
      status = 'completed';
    }
  } else if (currentProgress.moduleId === 'mutual-funds') {
    const allMfLevelIds = ['mf_lvl_1', 'mf_lvl_2', 'mf_lvl_3', 'mf_lvl_4', 'mf_lvl_5'];
    const nextMf = allMfLevelIds.find((id) => !updatedCompleted.includes(id));
    nextActivityId = nextMf || allMfLevelIds[allMfLevelIds.length - 1];
    if (allMfLevelIds.every((id) => updatedCompleted.includes(id))) {
      status = 'completed';
    }
  } else if (currentProgress.moduleId === 'markets-stocks') {
    const allMsIds = [
      'ms_c1_market',
      'ms_c2_nse_bse',
      'ms_c3_market_flow',
      'ms_c4_stock',
      'ms_c5_price_change',
      'ms_c6_trade_flow',
      'ms_c7_order_types',
      'ms_c8_etf',
    ];
    const nextMs = allMsIds.find((id) => !updatedCompleted.includes(id));
    nextActivityId = nextMs || allMsIds[allMsIds.length - 1];
    if (allMsIds.every((id) => updatedCompleted.includes(id))) {
      status = 'completed';
    }
  }

  const updatedProgress: ModuleProgress = {
    ...currentProgress,
    completedActivityIds: updatedCompleted,
    earnedXp: updatedXp,
    currentActivityId: nextActivityId,
    status,
    lastAccessedAt: new Date().toISOString(),
  };

  return {
    updatedProgress,
    xpAwarded: xpReward,
  };
}

/**
 * Computes high-level statistics for a module.
 */
export function getModuleStats(moduleId: LearningModuleId, progress: ModuleProgress) {
  const definition = MODULE_DEFINITIONS[moduleId];

  if (moduleId === 'stocks') {
    const totalNodes = LEARNING_UNITS.flatMap((u) => u.nodes).length;
    const completedNodes = progress.completedActivityIds.filter((id) => id.startsWith('node_lvl_')).length;
    const percent = totalNodes > 0 ? Math.min(100, Math.round((completedNodes / totalNodes) * 100)) : 0;

    return {
      totalActivities: totalNodes,
      completedActivities: completedNodes,
      percent,
      earnedXp: progress.earnedXp,
      status: progress.status,
      isAvailable: true,
    };
  }

  if (moduleId === 'markets-stocks') {
    const totalCourses = 8;
    const completedCourses = progress.completedActivityIds.filter((id) =>
      id.startsWith('ms_'),
    ).length;
    const percent = Math.min(100, Math.round((completedCourses / totalCourses) * 100));
    return {
      totalActivities: totalCourses,
      completedActivities: completedCourses,
      percent,
      earnedXp: progress.earnedXp,
      status: (completedCourses === totalCourses
        ? 'completed'
        : completedCourses > 0
          ? 'in-progress'
          : 'not-started') as ModuleProgress['status'],
      isAvailable: true,
    };
  }

  if (moduleId === 'mutual-funds') {
    const totalLevels = 5;
    const completedLevels = progress.completedActivityIds.filter((id) => id.startsWith('mf_lvl_')).length;
    const percent = Math.min(100, Math.round((completedLevels / totalLevels) * 100));

    return {
      totalActivities: totalLevels,
      completedActivities: completedLevels,
      percent,
      earnedXp: progress.earnedXp,
      status: (completedLevels === totalLevels ? 'completed' : completedLevels > 0 ? 'in-progress' : 'not-started') as ModuleProgress['status'],
      isAvailable: true,
    };
  }

  // Planned modules (Bonds, F&O)
  const totalRoadmapItems = definition.roadmap.length;
  const completedRoadmapItems = progress.completedActivityIds.length;
  const percent = totalRoadmapItems > 0 ? Math.min(100, Math.round((completedRoadmapItems / totalRoadmapItems) * 100)) : 0;

  return {
    totalActivities: totalRoadmapItems,
    completedActivities: completedRoadmapItems,
    percent,
    earnedXp: progress.earnedXp,
    status: progress.status,
    isAvailable: false,
  };
}
