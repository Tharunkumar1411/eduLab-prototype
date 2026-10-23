/**
 * FinCraft Module — Markets & Stocks.
 *
 * Shared curriculum metadata, fictional companies and section/course mapping.
 * All numbers here are illustrative teaching examples, not forecasts.
 */

export const MARKETS_STOCKS_MODULE_ID = 'markets-stocks' as const;

export type MarketsStocksSectionId = 'foundations' | 'stocks' | 'mechanics' | 'etfs';
export type MarketsStocksCourseId =
  | 'ms_c1_market'
  | 'ms_c2_nse_bse'
  | 'ms_c3_market_flow'
  | 'ms_c4_stock'
  | 'ms_c5_price_change'
  | 'ms_c6_trade_flow'
  | 'ms_c7_order_types'
  | 'ms_c8_etf';

export interface MarketsStocksSection {
  id: MarketsStocksSectionId;
  letter: 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  courseIds: MarketsStocksCourseId[];
}

export interface MarketsStocksCourseMeta {
  id: MarketsStocksCourseId;
  sectionId: MarketsStocksSectionId;
  number: string; // "1".."8" (course number across module)
  title: string;
  subtitle: string;
  mainConcept: string;
  xpReward: number;
  estimatedMinutes: number;
}

export const MS_COURSES: MarketsStocksCourseMeta[] = [
  {
    id: 'ms_c1_market',
    sectionId: 'foundations',
    number: '1',
    title: 'What Is a Financial Market?',
    subtitle: 'How a company turns an idea into shares other investors can buy.',
    mainConcept: 'A financial market connects businesses that need capital with investors willing to provide it.',
    xpReward: 120,
    estimatedMinutes: 3,
  },
  {
    id: 'ms_c2_nse_bse',
    sectionId: 'foundations',
    number: '2',
    title: 'NSE, BSE & Market Indices',
    subtitle: 'Exchanges host trades. Indices measure a slice of the market.',
    mainConcept: 'An exchange is a venue. An index is a measurement. They do different jobs.',
    xpReward: 140,
    estimatedMinutes: 4,
  },
  {
    id: 'ms_c3_market_flow',
    sectionId: 'foundations',
    number: '3',
    title: 'How Does the Stock Market Work?',
    subtitle: 'From listing to settlement, step by step.',
    mainConcept: 'Matching and settlement are different events — a trade is confirmed first, then the money and shares move.',
    xpReward: 160,
    estimatedMinutes: 4,
  },
  {
    id: 'ms_c4_stock',
    sectionId: 'stocks',
    number: '4',
    title: 'What Is a Stock?',
    subtitle: 'A share is partial ownership of a business.',
    mainConcept: 'Owning shares is fractional ownership of a company — not a loan, not a guaranteed payout.',
    xpReward: 120,
    estimatedMinutes: 3,
  },
  {
    id: 'ms_c5_price_change',
    sectionId: 'stocks',
    number: '5',
    title: 'Why Do Stock Prices Change?',
    subtitle: 'Supply, demand and the role of expectations.',
    mainConcept: 'The same news can move price up, down or barely at all — because expectations are already priced in.',
    xpReward: 160,
    estimatedMinutes: 4,
  },
  {
    id: 'ms_c6_trade_flow',
    sectionId: 'stocks',
    number: '6',
    title: 'How Does a Stock Trade Happen?',
    subtitle: 'Investor → broker → exchange → settlement.',
    mainConcept: 'Brokers route orders. Exchanges match them. Settlement moves cash and shares between accounts.',
    xpReward: 160,
    estimatedMinutes: 4,
  },
  {
    id: 'ms_c7_order_types',
    sectionId: 'mechanics',
    number: '7',
    title: 'Market Orders vs Limit Orders',
    subtitle: 'An interactive order book — try both.',
    mainConcept: 'A market order prioritises execution; a limit order prioritises price. Neither is universally best.',
    xpReward: 220,
    estimatedMinutes: 6,
  },
  {
    id: 'ms_c8_etf',
    sectionId: 'etfs',
    number: '8',
    title: 'What Is an ETF?',
    subtitle: 'A basket you can trade like a stock.',
    mainConcept: 'An ETF holds a basket of assets — diversification helps spread risk, but it does not eliminate it.',
    xpReward: 160,
    estimatedMinutes: 5,
  },
];

export const MS_COURSE_BY_ID: Record<MarketsStocksCourseId, MarketsStocksCourseMeta> =
  Object.fromEntries(MS_COURSES.map((c) => [c.id, c])) as Record<
    MarketsStocksCourseId,
    MarketsStocksCourseMeta
  >;

export const MS_SECTIONS: MarketsStocksSection[] = [
  {
    id: 'foundations',
    letter: 'A',
    title: 'Market Foundations',
    description: 'What a market is, who runs it, and how a trade travels end to end.',
    courseIds: ['ms_c1_market', 'ms_c2_nse_bse', 'ms_c3_market_flow'],
  },
  {
    id: 'stocks',
    letter: 'B',
    title: 'Stocks Explained',
    description: 'What a share actually is, why its price moves, and what happens on each trade.',
    courseIds: ['ms_c4_stock', 'ms_c5_price_change', 'ms_c6_trade_flow'],
  },
  {
    id: 'mechanics',
    letter: 'C',
    title: 'Trading Mechanics',
    description: 'Hands-on with order types inside a working simulated order book.',
    courseIds: ['ms_c7_order_types'],
  },
  {
    id: 'etfs',
    letter: 'D',
    title: 'ETFs & Market Exposure',
    description: 'A basket of fictional companies — explore diversification without pretending it removes risk.',
    courseIds: ['ms_c8_etf'],
  },
];

export const MS_TOTAL_XP: number = MS_COURSES.reduce((acc, c) => acc + c.xpReward, 0);

// --- Fictional companies used across the module -----------------------------

export interface FictionalCompany {
  symbol: string;
  name: string;
  sector: string;
  sharesOutstanding: number;
}

export const SUNNY_BAKERY: FictionalCompany = {
  symbol: 'SUNNY',
  name: 'Sunny Bakery',
  sector: 'Food & Beverages',
  sharesOutstanding: 100,
};

export const GREEN_TRANSPORT: FictionalCompany = {
  symbol: 'GREEN',
  name: 'Green Transport',
  sector: 'Logistics',
  sharesOutstanding: 100,
};

export const BLUE_TECHNOLOGIES: FictionalCompany = {
  symbol: 'BLUE',
  name: 'Blue Technologies',
  sector: 'Software',
  sharesOutstanding: 100,
};

export const ETF_BASKET: FictionalCompany[] = [SUNNY_BAKERY, GREEN_TRANSPORT, BLUE_TECHNOLOGIES];
