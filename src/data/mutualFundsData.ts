/**
 * Mutual Funds Curriculum Data, Calculations, and Interactive Scenarios.
 * 
 * Comprehensive 5-level curriculum designed for Indian retail beginners (aged 18-25).
 * Strictly educational: emphasizes first-principles financial mechanics,
 * deterministic calculations, risk disclosures, and evidence-based reasoning.
 * All data is fictional and clearly labeled as simulated educational models.
 */

import { UnitSection, PathNode } from './learningPath.ts';

export interface InvestorProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  profession: string;
  monthlySavings: number;
  initialInvestment: number;
  primaryGoal: string;
  timeHorizon: string;
  riskTolerance: 'Low' | 'Moderate' | 'High';
  quote: string;
}

export interface MutualFundHolding {
  ticker: string;
  companyName: string;
  sector: string;
  weightPercent: number;
  sharePrice: number;
}

export interface FictionalMutualFund {
  id: string;
  name: string;
  category: 'Large Cap Equity' | 'Broad Index' | 'Liquid Debt' | 'Balanced Advantage / Hybrid';
  benchmark: string;
  launchYear: number;
  currentNav: number;
  expenseRatioPercent: number;
  exitLoad: string;
  riskometer: 'Low to Moderate' | 'Moderate' | 'Very High';
  portfolioTurnoverPercent: number;
  holdingsCount: number;
  topHoldings: MutualFundHolding[];
  historicalReturns: {
    oneYear: number;
    threeYearAnnualized: number;
    fiveYearAnnualized: number;
  };
  benchmarkReturns: {
    oneYear: number;
    threeYearAnnualized: number;
    fiveYearAnnualized: number;
  };
  trackingErrorPercent?: number;
  narrativeDescription: string;
}

export interface MutualFundsLevelDefinition {
  id: string;
  levelNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  xpReward: number;
  estimatedMinutes: number;
  learningOutcome: string;
  lessons: string[];
}

export interface GlossaryTerm {
  term: string;
  shortDefinition: string;
  fullExplanation: string;
  commonMistake: string;
  example: string;
}

// =========================================================================
// 5 PROGRESSIVE LEVELS DEFINITION
// =========================================================================

export const MUTUAL_FUNDS_LEVELS: MutualFundsLevelDefinition[] = [
  {
    id: 'mf_lvl_1',
    levelNumber: 1,
    title: 'Mutual Fund Basics & Pooling',
    subtitle: 'Build a Fund & Discover Collective Ownership',
    tagline: 'How small savers pool money to own a diversified corporate basket.',
    xpReward: 150,
    estimatedMinutes: 5,
    learningOutcome: 'Understand how pooled money works, what units represent, and the roles of AMC, fund manager, and investor.',
    lessons: [
      'Why do mutual funds exist?',
      'How pooling money works',
      'What an Asset Management Company (AMC) does',
      'What a fund manager does',
      'Units vs direct stock ownership',
    ],
  },
  {
    id: 'mf_lvl_2',
    levelNumber: 2,
    title: 'NAV, Units & The Monthly SIP',
    subtitle: 'The NAV Machine & Rupee-Cost Averaging',
    tagline: 'Understand how unit prices move and how periodic SIPs handle market volatility.',
    xpReward: 200,
    estimatedMinutes: 6,
    learningOutcome: 'Calculate unit allocations, grasp that NAV is not a cheapness score, and understand SIP rupee-cost averaging.',
    lessons: [
      'What is NAV (Net Asset Value)?',
      'How units are allocated (Amount ÷ NAV)',
      'Why a ₹10 NAV is NOT cheaper than a ₹100 NAV',
      'What is a Systematic Investment Plan (SIP)?',
      'SIP vs Lump-sum in fluctuating markets',
      'Transparent gains & losses calculation',
    ],
  },
  {
    id: 'mf_lvl_3',
    levelNumber: 3,
    title: 'Types of Mutual Funds',
    subtitle: 'Match the Fund to the Life Goal',
    tagline: 'Explore Equity, Debt, Hybrid, and Index funds without one-size-fits-all myths.',
    xpReward: 200,
    estimatedMinutes: 6,
    learningOutcome: 'Evaluate risk-return trade-offs across major fund categories based on time horizon and liquidity needs.',
    lessons: [
      'Equity funds & market risk',
      'Debt funds: interest-rate & credit risk',
      'Hybrid funds: multi-asset balancing',
      'Index funds & tracking error',
      'Active management vs Passive indexing',
      'Open-ended vs close-ended liquidity',
    ],
  },
  {
    id: 'mf_lvl_4',
    levelNumber: 4,
    title: 'Risk, Fees & Fund Comparison',
    subtitle: 'The Expense Ratio Trap & Riskometers',
    tagline: 'Look beyond past headline returns: unmask recurring costs and concentration risk.',
    xpReward: 250,
    estimatedMinutes: 7,
    learningOutcome: 'Assess the compounding drag of Total Expense Ratio (TER), read riskometers, and avoid chasing last year’s top performer.',
    lessons: [
      'Why 1-year past returns can be misleading',
      'Diversification vs dangerous concentration',
      'Total Expense Ratio (TER): The silent wealth drag',
      'Direct Plan vs Regular Plan savings',
      'SEBI Riskometer disclosures',
      'Benchmark comparison & rolling returns',
    ],
  },
  {
    id: 'mf_lvl_5',
    levelNumber: 5,
    title: 'Mutual Fund Investigator',
    subtitle: 'Case Investigation: The Fund Comparison Case',
    tagline: 'Examine evidence, identify trade-offs, and defend your analytical investment thesis.',
    xpReward: 350,
    estimatedMinutes: 8,
    learningOutcome: 'Apply multi-dimensional evidence to compare real-world style mutual funds and evaluate analytical rigor.',
    lessons: [
      'The Investor Mandate Brief',
      'Forensic Clue 1: Rolling Returns vs Point-to-Point Returns',
      'Forensic Clue 2: Expense Ratio Drag over 10 Years',
      'Forensic Clue 3: Benchmark Alpha & Tracking Error',
      'Forensic Clue 4: Portfolio Concentration & Turnover',
      'Formulating the Investment Thesis & Reasoning Evaluation',
    ],
  },
];

// =========================================================================
// LEVEL 1: POOLING INVESTORS & ASSET BASKET DATA
// =========================================================================

export const LEVEL_1_INVESTORS: InvestorProfile[] = [
  {
    id: 'inv_ananya',
    name: 'Ananya',
    avatar: '👩‍🎓',
    age: 20,
    profession: 'College Student / Intern',
    monthlySavings: 800,
    initialInvestment: 500,
    primaryGoal: 'Start investing early with small pocket money',
    timeHorizon: '5+ years',
    riskTolerance: 'Moderate',
    quote: 'I only have ₹500. I cannot buy even a single share of TCS or Infosys, let alone 30 companies!',
  },
  {
    id: 'inv_rahul',
    name: 'Rahul',
    avatar: '👨‍💻',
    age: 24,
    profession: 'Junior Software Engineer',
    monthlySavings: 12000,
    initialInvestment: 5000,
    primaryGoal: 'Wealth accumulation with professional management',
    timeHorizon: '7+ years',
    riskTolerance: 'High',
    quote: 'I work 10 hours a day. I don’t have time to analyze 50 balance sheets every weekend.',
  },
  {
    id: 'inv_priya',
    name: 'Priya',
    avatar: '👩‍💼',
    age: 31,
    profession: 'Marketing Lead',
    monthlySavings: 45000,
    initialInvestment: 25000,
    primaryGoal: 'Long-term diversified equity compounding',
    timeHorizon: '10+ years',
    riskTolerance: 'High',
    quote: 'I want systematic diversification across banks, tech, FMCG, and energy without managing 40 demat transactions.',
  },
];

export const LEVEL_1_PORTFOLIO_HOLDINGS: MutualFundHolding[] = [
  { ticker: 'HDFCBANK', companyName: 'HDFC Bank Ltd.', sector: 'Banking & Financials', weightPercent: 12, sharePrice: 1680 },
  { ticker: 'RELIANCE', companyName: 'Reliance Industries Ltd.', sector: 'Energy & Telecom', weightPercent: 11, sharePrice: 2850 },
  { ticker: 'INFY', companyName: 'Infosys Ltd.', sector: 'Information Technology', weightPercent: 9, sharePrice: 1540 },
  { ticker: 'ICICIBANK', companyName: 'ICICI Bank Ltd.', sector: 'Banking & Financials', weightPercent: 8, sharePrice: 1220 },
  { ticker: 'TCS', companyName: 'Tata Consultancy Services', sector: 'Information Technology', weightPercent: 8, sharePrice: 3820 },
  { ticker: 'ITC', companyName: 'ITC Ltd.', sector: 'Consumer Goods (FMCG)', weightPercent: 6, sharePrice: 470 },
  { ticker: 'LT', companyName: 'Larsen & Toubro Ltd.', sector: 'Infrastructure & Capital Goods', weightPercent: 6, sharePrice: 3450 },
  { ticker: 'BHARTIARTL', companyName: 'Bharti Airtel Ltd.', sector: 'Telecom & Digital', weightPercent: 5, sharePrice: 1420 },
  { ticker: 'SBIN', companyName: 'State Bank of India', sector: 'Public Sector Banking', weightPercent: 5, sharePrice: 790 },
  { ticker: 'HINDUNILVR', companyName: 'Hindustan Unilever Ltd.', sector: 'Consumer Goods (FMCG)', weightPercent: 5, sharePrice: 2380 },
  { ticker: 'M&M', companyName: 'Mahindra & Mahindra Ltd.', sector: 'Automobiles & EV', weightPercent: 5, sharePrice: 2890 },
  { ticker: 'SUNPHARMA', companyName: 'Sun Pharmaceutical Ltd.', sector: 'Healthcare & Pharma', weightPercent: 4, sharePrice: 1620 },
  { ticker: 'TITAN', companyName: 'Titan Company Ltd.', sector: 'Consumer Discretionary', weightPercent: 4, sharePrice: 3280 },
  { ticker: 'TREASURY', companyName: 'Short-term G-Sec / Liquid Cash', sector: 'Cash Equivalents', weightPercent: 12, sharePrice: 100 },
];

// =========================================================================
// LEVEL 2: DETERMINISTIC SIP SIMULATION DATA (6-MONTH CYCLE)
// =========================================================================

export interface SipCycleMonth {
  monthNumber: number;
  monthName: string;
  marketCondition: 'Bull Peak' | 'Market Dip' | 'Correction Low' | 'Recovery Begins' | 'Momentum Continues' | 'New Cycle High';
  monthlyContribution: number;
  simulatedNav: number;
  narrativeNote: string;
}

export const SIP_SIMULATION_MONTHS: SipCycleMonth[] = [
  {
    monthNumber: 1,
    monthName: 'January',
    marketCondition: 'Bull Peak',
    monthlyContribution: 1000,
    simulatedNav: 50.0,
    narrativeNote: 'Markets are optimistic. Your ₹1,000 buys 20.0 units at ₹50 NAV.',
  },
  {
    monthNumber: 2,
    monthName: 'February',
    marketCondition: 'Market Dip',
    monthlyContribution: 1000,
    simulatedNav: 40.0,
    narrativeNote: 'Global inflation fears cause a dip. Your same ₹1,000 now automatically buys 25.0 units!',
  },
  {
    monthNumber: 3,
    monthName: 'March',
    marketCondition: 'Correction Low',
    monthlyContribution: 1000,
    simulatedNav: 32.0,
    narrativeNote: 'Market correction bottom! Because NAV is lower, ₹1,000 captures a huge 31.25 units.',
  },
  {
    monthNumber: 4,
    monthName: 'April',
    marketCondition: 'Recovery Begins',
    monthlyContribution: 1000,
    simulatedNav: 40.0,
    narrativeNote: 'Earnings stabilize and buying returns. NAV climbs to ₹40. You collect 25.0 units.',
  },
  {
    monthNumber: 5,
    monthName: 'May',
    marketCondition: 'Momentum Continues',
    monthlyContribution: 1000,
    simulatedNav: 48.0,
    narrativeNote: 'Economic growth accelerates. NAV reaches ₹48. You accumulate 20.83 units.',
  },
  {
    monthNumber: 6,
    monthName: 'June',
    marketCondition: 'New Cycle High',
    monthlyContribution: 1000,
    simulatedNav: 56.0,
    narrativeNote: 'Cycle peak! NAV reaches ₹56. Your cheap units bought at ₹32 and ₹40 are now compounding rapidly.',
  },
];

// =========================================================================
// LEVEL 3: GOAL MATCHING SCENARIOS
// =========================================================================

export interface GoalMatchingScenario {
  id: string;
  personaName: string;
  avatar: string;
  age: number;
  goalTitle: string;
  targetAmount: string;
  timeHorizon: string;
  riskAppetite: string;
  description: string;
  options: {
    id: string;
    categoryTitle: string;
    fundType: string;
    isSuitable: boolean;
    reasoning: string;
    keyRiskDisclosed: string;
  }[];
}

export const LEVEL_3_SCENARIOS: GoalMatchingScenario[] = [
  {
    id: 'scenario_vikram',
    personaName: 'Vikram',
    avatar: '🎓',
    age: 22,
    goalTitle: 'College Tuition Fee',
    targetAmount: '₹60,000',
    timeHorizon: '5 Months (Ultra Short)',
    riskAppetite: 'Zero loss tolerance (Non-negotiable deadline)',
    description: 'Vikram has saved money for his final semester tuition due in 5 months. If he loses even 10% of this money in a stock market correction, he will be unable to pay his tuition fee on time.',
    options: [
      {
        id: 'opt_smallcap',
        categoryTitle: 'Small Cap Equity Fund',
        fundType: 'Equity (High Risk)',
        isSuitable: false,
        reasoning: 'Unsuitable! Small caps can easily drop 20% to 35% in a single quarter. A 5-month horizon has zero time for market recovery.',
        keyRiskDisclosed: 'Severe market volatility risk and potential liquidity lockups.',
      },
      {
        id: 'opt_liquid',
        categoryTitle: 'Liquid / Overnight Debt Fund',
        fundType: 'Fixed Income Debt (Low Risk)',
        isSuitable: true,
        reasoning: 'Most Suitable! Liquid debt funds invest in short-term government treasury bills and commercial paper maturing within 91 days. Price fluctuations are minimal, prioritizing capital preservation and instant liquidity.',
        keyRiskDisclosed: 'Returns are modest (around 6%-7% p.a.) and will not beat long-term equity compounding, but capital safety matches the short horizon.',
      },
      {
        id: 'opt_tech',
        categoryTitle: 'Thematic Technology Sector Fund',
        fundType: 'Thematic Equity',
        isSuitable: false,
        reasoning: 'Unsuitable! Sectoral funds are highly cyclical. When tech spends slow down, tech funds can remain stagnant for years.',
        keyRiskDisclosed: 'Extreme concentration risk in a single sector.',
      },
    ],
  },
  {
    id: 'scenario_sneha',
    personaName: 'Sneha',
    avatar: '🚀',
    age: 26,
    goalTitle: 'Long-Term Financial Independence',
    targetAmount: '₹50,00,000+',
    timeHorizon: '20 Years (Very Long)',
    riskAppetite: 'Comfortable with short-term paper drawdowns',
    description: 'Sneha is a young professional looking to build a major wealth corpus over the next two decades. She knows inflation is 6% per year and that fixed deposits will lose real purchasing power after tax.',
    options: [
      {
        id: 'opt_overnight',
        categoryTitle: 'Overnight Debt Fund',
        fundType: 'Debt (Low Risk)',
        isSuitable: false,
        reasoning: 'Unsuitable for a 20-year goal! Over decades, post-tax debt returns rarely outpace consumer inflation. Sneha risks "inflation drag", where her savings lose purchasing power over time.',
        keyRiskDisclosed: 'Inflation risk: Money stays safe nominally but buys less in the real world.',
      },
      {
        id: 'opt_index',
        categoryTitle: 'Nifty 50 Broad Index / Large-and-Midcap Equity Fund',
        fundType: 'Broad Equity (High Risk Short-Term, High Growth Long-Term)',
        isSuitable: true,
        reasoning: 'Most Suitable! Over 15-20 years, Indian corporate earnings growth historically beats inflation. Short-term corrections are smoothed out across multiple economic cycles, allowing compounding to do the heavy lifting.',
        keyRiskDisclosed: 'Sneha must be prepared to see paper drops of 15%-25% during market crashes without panic selling.',
      },
      {
        id: 'opt_fmp',
        categoryTitle: '1-Year Fixed Maturity Plan (FMP)',
        fundType: 'Close-ended Debt',
        isSuitable: false,
        reasoning: 'Unsuitable! Locks money for just 1 year, requiring constant reinvestment decisions and paying tax on debt returns each year.',
        keyRiskDisclosed: 'Reinvestment risk and tax inefficiency for long compounding.',
      },
    ],
  },
  {
    id: 'scenario_amit',
    personaName: 'Amit & Meera',
    avatar: '🏡',
    age: 38,
    goalTitle: 'Home Down Payment',
    targetAmount: '₹12,00,000',
    timeHorizon: '3 to 4 Years (Medium)',
    riskAppetite: 'Moderate (Needs growth, but cushions against major crashes)',
    description: 'Amit and Meera plan to buy their first home in 3.5 years. They want their capital to grow faster than a savings account, but cannot afford a 30% crash right when they apply for their home loan.',
    options: [
      {
        id: 'opt_hybrid',
        categoryTitle: 'Conservative Hybrid / Balanced Advantage Fund',
        fundType: 'Hybrid (Equity + Debt Allocation)',
        isSuitable: true,
        reasoning: 'Most Suitable! Hybrid funds dynamically allocate 65% in equity for growth and 35% in high-grade bonds/fixed income. During market drops, the debt portion acts as a shock absorber.',
        keyRiskDisclosed: 'Returns are lower than pure bull-market equity, but downside drawdowns are substantially milder.',
      },
      {
        id: 'opt_pure_small',
        categoryTitle: 'Microcap High-Beta Equity Fund',
        fundType: 'High Speculative Equity',
        isSuitable: false,
        reasoning: 'Unsuitable! If a bear market hits in year 3, a microcap fund could take 4 to 6 years to recover its peak, destroying their home-buying timeline.',
        keyRiskDisclosed: 'Severe timing risk (sequence of returns risk).',
      },
      {
        id: 'opt_gold_only',
        categoryTitle: '100% Sovereign Gold Fund',
        fundType: 'Commodity',
        isSuitable: false,
        reasoning: 'Suboptimal! Gold generates no corporate cash flows or dividends. It can stay flat for 4-5 years at a stretch depending on global currency cycles.',
        keyRiskDisclosed: 'No cash flow generation or earnings yield.',
      },
    ],
  },
];

// =========================================================================
// LEVEL 4: EXPENSE RATIO (TER) SIMULATION & COMPARISON DATA
// =========================================================================

export interface ExpenseRatioSimulationRow {
  year: number;
  grossPortfolio: number;
  directPlanValue: number; // 0.3% TER
  regularPlanValue: number; // 1.8% TER (1.5% difference)
  cumulativeCostDifference: number;
}

export function calculateExpenseRatioDrag(
  initialLumpsum: number = 100000,
  years: number = 15,
  grossAnnualReturnPercent: number = 12
): ExpenseRatioSimulationRow[] {
  const rows: ExpenseRatioSimulationRow[] = [];
  const directNetReturn = (grossAnnualReturnPercent - 0.3) / 100;
  const regularNetReturn = (grossAnnualReturnPercent - 1.8) / 100;
  const grossReturn = grossAnnualReturnPercent / 100;

  for (let yr = 1; yr <= years; yr++) {
    const grossPortfolio = Math.round(initialLumpsum * Math.pow(1 + grossReturn, yr));
    const directPlanValue = Math.round(initialLumpsum * Math.pow(1 + directNetReturn, yr));
    const regularPlanValue = Math.round(initialLumpsum * Math.pow(1 + regularNetReturn, yr));
    const cumulativeCostDifference = directPlanValue - regularPlanValue;

    rows.push({
      year: yr,
      grossPortfolio,
      directPlanValue,
      regularPlanValue,
      cumulativeCostDifference,
    });
  }

  return rows;
}

// =========================================================================
// LEVEL 5: MUTUAL FUND INVESTIGATOR CASE DATA
// =========================================================================

export interface ForensicCaseClue {
  id: string;
  clueNumber: number;
  title: string;
  category: 'Returns vs Benchmark' | 'Expense Ratio Drag' | 'Portfolio Concentration' | 'Turnover & Churn' | 'Downside Cushion';
  summary: string;
  metricLabel: string;
  metricComparison: string;
  implication: 'critical_flag' | 'positive_factor' | 'neutral_context';
  detailedAnalysis: string;
}

export const LEVEL_5_FORENSIC_FUNDS: FictionalMutualFund[] = [
  {
    id: 'fund_starlight',
    name: 'Starlight High-Alpha Midcap (Active)',
    category: 'Large Cap Equity', // Mid/Active
    benchmark: 'Nifty Midcap 150 TRI',
    launchYear: 2018,
    currentNav: 48.2,
    expenseRatioPercent: 2.15,
    exitLoad: '1.0% if redeemed within 365 days',
    riskometer: 'Very High',
    portfolioTurnoverPercent: 68,
    holdingsCount: 24,
    historicalReturns: {
      oneYear: 32.4, // Headline marketing return
      threeYearAnnualized: 14.8,
      fiveYearAnnualized: 13.1,
    },
    benchmarkReturns: {
      oneYear: 24.2,
      threeYearAnnualized: 17.2,
      fiveYearAnnualized: 16.5,
    },
    narrativeDescription: 'Aggressively managed active scheme with heavy concentration in high-momentum midcaps. Had a spectacular 12-month run, but underperformed its benchmark over a 5-year rolling cycle with a high 2.15% expense drag.',
    topHoldings: [
      { ticker: 'SOLARIND', companyName: 'Solar Tech Industries', sector: 'Green Energy', weightPercent: 11.2, sharePrice: 940 },
      { ticker: 'FINTECHPRO', companyName: 'Fintech Payments Ltd.', sector: 'Financial Technology', weightPercent: 9.8, sharePrice: 420 },
      { ticker: 'EVCHARGE', companyName: 'EV Power Infra Ltd.', sector: 'Automobile Components', weightPercent: 8.5, sharePrice: 710 },
    ],
  },
  {
    id: 'fund_apex_index',
    name: 'Apex Broad Nifty 50 Index (Passive)',
    category: 'Broad Index',
    benchmark: 'Nifty 50 TRI',
    launchYear: 2015,
    currentNav: 184.6,
    expenseRatioPercent: 0.15,
    exitLoad: 'Nil (0%)',
    riskometer: 'Very High',
    portfolioTurnoverPercent: 4,
    holdingsCount: 50,
    trackingErrorPercent: 0.04,
    historicalReturns: {
      oneYear: 18.2,
      threeYearAnnualized: 15.6,
      fiveYearAnnualized: 14.9,
    },
    benchmarkReturns: {
      oneYear: 18.3,
      threeYearAnnualized: 15.7,
      fiveYearAnnualized: 15.0,
    },
    narrativeDescription: 'Strict low-cost passive index replication scheme. Holds all 50 top Indian companies in identical proportion to the Nifty 50 index with virtually zero tracking error (0.04%) and rock-bottom 0.15% expense ratio.',
    topHoldings: [
      { ticker: 'HDFCBANK', companyName: 'HDFC Bank Ltd.', sector: 'Banking', weightPercent: 11.4, sharePrice: 1680 },
      { ticker: 'RELIANCE', companyName: 'Reliance Industries Ltd.', sector: 'Energy', weightPercent: 10.1, sharePrice: 2850 },
      { ticker: 'ICICIBANK', companyName: 'ICICI Bank Ltd.', sector: 'Banking', weightPercent: 7.9, sharePrice: 1220 },
    ],
  },
  {
    id: 'fund_horizon_hybrid',
    name: 'Horizon Balanced Advantage Fund (Hybrid)',
    category: 'Balanced Advantage / Hybrid',
    benchmark: 'Nifty 50 Hybrid Composite (65:35)',
    launchYear: 2016,
    currentNav: 34.8,
    expenseRatioPercent: 0.82,
    exitLoad: '1.0% if redeemed within 90 days',
    riskometer: 'Moderate',
    portfolioTurnoverPercent: 22,
    holdingsCount: 65,
    historicalReturns: {
      oneYear: 14.5,
      threeYearAnnualized: 13.8,
      fiveYearAnnualized: 12.6,
    },
    benchmarkReturns: {
      oneYear: 14.2,
      threeYearAnnualized: 13.4,
      fiveYearAnnualized: 12.1,
    },
    narrativeDescription: 'Dynamic asset allocation fund adjusting between equity (50%-75%) and sovereign bonds (25%-50%) based on market valuations. Lower peaks during irrational market booms, but protects capital significantly during crashes.',
    topHoldings: [
      { ticker: 'GSEC2034', companyName: '7.18% GS 2034 Sovereign Bond', sector: 'Government Securities', weightPercent: 18.5, sharePrice: 100 },
      { ticker: 'TCS', companyName: 'Tata Consultancy Services', sector: 'IT Services', weightPercent: 6.2, sharePrice: 3820 },
      { ticker: 'INFY', companyName: 'Infosys Ltd.', sector: 'IT Services', weightPercent: 5.8, sharePrice: 1540 },
    ],
  },
];

export const LEVEL_5_CASE_CLUES: ForensicCaseClue[] = [
  {
    id: 'clue_rolling_vs_point',
    clueNumber: 1,
    title: 'The Point-to-Point Marketing Mirage',
    category: 'Returns vs Benchmark',
    summary: 'Starlight displays a dazzling 32.4% 1-year return, but underperforms its benchmark over 3-year and 5-year rolling windows.',
    metricLabel: '5-Yr Benchmark Performance',
    metricComparison: 'Starlight (13.1%) vs Benchmark (16.5%) = -3.4% Underperformance p.a.',
    implication: 'critical_flag',
    detailedAnalysis: 'Fund marketing brochures celebrate whichever recent time window looks highest. However, on a 5-year rolling basis, Starlight failed to beat its index. Chasing recent 1-year winners is the #1 mistake retail investors make.',
  },
  {
    id: 'clue_ter_cost',
    clueNumber: 2,
    title: 'The Compounding Fee Drag (2.15% vs 0.15%)',
    category: 'Expense Ratio Drag',
    summary: 'Starlight charges a 2.15% annual TER, whereas Apex Index charges 0.15%. Over 10 years, this 2.0% gap erodes 22% of total investor profits.',
    metricLabel: '10-Year Cumulative Fee Leakage',
    metricComparison: 'Apex Index: ~₹15,000 in fees vs Starlight: ~₹2,15,000 on ₹10L corpus',
    implication: 'critical_flag',
    detailedAnalysis: 'Mutual fund expense ratios are deducted daily from NAV regardless of whether the fund makes money or loses money. In an active fund underperforming its benchmark, the investor pays premium fees for negative alpha.',
  },
  {
    id: 'clue_portfolio_concentration',
    clueNumber: 3,
    title: 'Concentration Risk & High Churn (68% Turnover)',
    category: 'Portfolio Concentration',
    summary: 'Starlight holds just 24 stocks with 29.5% concentrated in its top 3 speculative bets and a high 68% portfolio churn.',
    metricLabel: 'Top 3 Holdings Weight',
    metricComparison: 'Starlight: 29.5% (24 stocks) vs Apex Index: 29.4% (spread across 50 stable bluechips)',
    implication: 'critical_flag',
    detailedAnalysis: 'High portfolio turnover (68%) means the fund manager trades constantly, generating brokerage and statutory impact costs that bleed into the expense ratio. Apex Index has a low 4% turnover.',
  },
  {
    id: 'clue_tracking_discipline',
    clueNumber: 4,
    title: 'Unemotional Index Replication & Zero Key-Man Risk',
    category: 'Returns vs Benchmark',
    summary: 'Apex Index has a 0.04% tracking error, meaning the investor captures the true expansion of India’s 50 largest corporations with zero manager bias.',
    metricLabel: 'Tracking Error Metric',
    metricComparison: '0.04% (Exceptional Index Fidelity)',
    implication: 'positive_factor',
    detailedAnalysis: 'Active funds risk manager departure, style drift, and emotional trading at market tops. An index fund provides transparent, predictable exposure with zero key-person vulnerability.',
  },
  {
    id: 'clue_hybrid_safety',
    clueNumber: 5,
    title: 'Dynamic Asset Allocation as a Volatility Buffer',
    category: 'Downside Cushion',
    summary: 'Horizon Balanced Advantage beat its hybrid benchmark (+0.5% p.a.) with 35% fixed income sovereign bonds.',
    metricLabel: 'Crash Protection Buffer',
    metricComparison: '35% Sovereign G-Sec Allocation',
    implication: 'positive_factor',
    detailedAnalysis: 'For an investor who cannot stomach severe market drawdowns, Horizon provides systematic downside cushioning. While it will lag during euphoric speculative bull rallies, it preserves capital during severe bear markets.',
  },
];

// =========================================================================
// GLOSSARY & REFERENCE DEFINITIONS
// =========================================================================

export const MUTUAL_FUNDS_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'NAV (Net Asset Value)',
    shortDefinition: 'The per-unit market value of all securities held by the fund, calculated after deducting liabilities and expenses at the end of each trading day.',
    fullExplanation: 'NAV = (Total Market Value of Stocks & Bonds + Cash Equivalents - Accrued Liabilities & Fees) ÷ Total Outstanding Units. NAV is recalculated every day at the close of markets.',
    commonMistake: 'Believing a ₹10 NAV fund is "cheaper" or has more room to grow than a ₹150 NAV fund. NAV is just unit math; performance depends purely on the percentage growth of underlying assets.',
    example: 'If a fund holds ₹10 crore in assets and has 1 crore units issued, the NAV is exactly ₹10. If the assets grow to ₹11 crore, NAV rises to ₹11 (+10% gain).',
  },
  {
    term: 'AMC (Asset Management Company)',
    shortDefinition: 'The registered financial entity that manages the mutual fund schemes under regulatory supervision.',
    fullExplanation: 'The AMC operates the funds, employs professional portfolio managers, research analysts, compliance officers, and customer service teams. Regulated in India by SEBI under the SEBI (Mutual Funds) Regulations, 1996.',
    commonMistake: 'Confusing the AMC with the fund itself. The AMC is the operational company; the fund is a separate trust holding investors’ pooled assets.',
    example: 'HDFC AMC, SBI Mutual Fund, ICICI Prudential AMC, Nippon India Mutual Fund.',
  },
  {
    term: 'SIP (Systematic Investment Plan)',
    shortDefinition: 'A disciplined investment method of investing a fixed rupee amount into a mutual fund scheme at regular calendar intervals (e.g. monthly).',
    fullExplanation: 'SIP is not a separate product; it is an automated mechanism. It enforces rupee-cost averaging: when markets fall, your fixed ₹2,000 buys more units; when markets rise, it buys fewer units.',
    commonMistake: 'Thinking SIP is an asset class or that SIP guarantees profits. SIP does not eliminate market risk; it simply eliminates market timing stress.',
    example: 'Investing ₹1,000 on the 5th of every month automatically via bank mandate.',
  },
  {
    term: 'Total Expense Ratio (TER)',
    shortDefinition: 'The annual percentage fee charged by the AMC to manage the fund, deducted daily from the scheme’s NAV.',
    fullExplanation: 'TER covers fund management fees, registrar (RTA) costs, audit and legal fees, marketing, and distribution commissions (in Regular plans). SEBI mandates strict regulatory caps on maximum TER based on scheme AUM.',
    commonMistake: 'Assuming a 1% difference in expense ratio is trivial. Over 15 to 20 years, a 1% higher expense ratio eats up 15% to 20% of your total compounded wealth.',
    example: 'A Direct plan with 0.20% TER versus a Regular plan with 1.70% TER on the exact same portfolio.',
  },
  {
    term: 'Direct Plan vs Regular Plan',
    shortDefinition: 'Direct plans are purchased directly from the AMC with no distributor commission; Regular plans pay distributor commissions from your investment.',
    fullExplanation: 'Both plans hold the exact same stocks and fund manager. However, Regular plans pay an ongoing trail commission to brokers/distributors, resulting in a higher expense ratio and lower NAV over time.',
    commonMistake: 'Believing Direct and Regular plans are two different funds with different investment strategies.',
    example: 'Over 10 years, a Direct Plan consistently delivers 1.0% to 1.5% higher annualized returns than the Regular plan of the same scheme.',
  },
  {
    term: 'Benchmark Index',
    shortDefinition: 'The standard market index against which the fund’s performance and risk are formally evaluated.',
    fullExplanation: 'Every scheme must designate a benchmark (e.g., Nifty 50 TRI, Nifty Midcap 150 TRI, Crisil Composite Bond Index). The goal of an active fund is to deliver returns higher than the benchmark (Alpha) after deducting all fees.',
    commonMistake: 'Comparing a Small Cap fund against a Large Cap index like Nifty 50, which gives a distorted comparison.',
    example: 'A Large Cap fund must be compared against Nifty 100 TRI or S&P BSE 100 TRI.',
  },
  {
    term: 'Tracking Error',
    shortDefinition: 'A metric measuring how closely a passive index fund or ETF follows the returns of its benchmark index.',
    fullExplanation: 'Tracking error measures the standard deviation of return differences between the index fund and the benchmark. A lower tracking error (e.g., < 0.10%) signifies higher index fidelity.',
    commonMistake: 'Assuming index funds always match the benchmark with 100.0% precision; cash holdings and transaction costs create a minor tracking error.',
    example: 'An index fund with 0.03% tracking error is far superior to one with 0.45% tracking error.',
  },
  {
    term: 'SEBI Riskometer',
    shortDefinition: 'A mandatory visual speedometer disclosure categorizing scheme risk into six standard risk levels.',
    fullExplanation: 'The six categories are: Low, Low to Moderate, Moderate, Moderately High, High, and Very High. Evaluated and updated monthly based on portfolio credit rating, duration, and equity market cap exposure.',
    commonMistake: 'Assuming debt funds are always "Low Risk"; long-duration debt funds or credit risk funds can be Moderately High or High risk.',
    example: 'Pure equity funds are classified as "Very High Risk" on the SEBI Riskometer.',
  },
  {
    term: 'Exit Load',
    shortDefinition: 'A fee charged by the fund if an investor redeems or switches units before a specified holding period.',
    fullExplanation: 'Exit load discourages short-term speculative trading in long-term funds. The fee collected is typically credited back to the fund scheme to protect remaining long-term investors.',
    commonMistake: 'Thinking exit load applies forever; most equity funds have an exit load only if redeemed within 365 days (1 year).',
    example: '1.0% exit load if redeemed within 1 year; 0% exit load if redeemed after 365 days.',
  },
];

// =========================================================================
// DUOLINGO-SYSTEM LEARNING UNITS FOR MUTUAL FUNDS
// =========================================================================

export const MUTUAL_FUNDS_UNITS: UnitSection[] = [
  {
    id: 1,
    sectionNumber: 1,
    unitNumber: 1,
    title: 'Foundations: Pooling, NAV & SIPs',
    themeColor: 'from-teal-600 via-emerald-600 to-teal-500',
    description: 'Learn how small savers pool capital, how NAV unit allocation works, and why monthly SIP compounding beats market timing.',
    guidebook: {
      title: 'Unit 1: Mutual Funds Foundations',
      summary: 'Mutual funds pool savings into a professionally managed trust to purchase diversified portfolios that individual investors cannot easily assemble alone.',
      keyTakeaways: [
        {
          term: 'Collective Pooling',
          explanation: 'Savers pool money together. Instead of holding shares directly, they hold proportionate units of the scheme.',
        },
        {
          term: 'Net Asset Value (NAV)',
          explanation: 'NAV is the per-unit price: (Assets - Liabilities) / Outstanding Units. A ₹10 NAV is not cheaper than a ₹100 NAV.',
        },
        {
          term: 'Rupee-Cost Averaging',
          explanation: 'Fixed monthly SIP investments buy more units when NAV is low and fewer when NAV is high, lowering your average cost.',
        },
      ],
    },
    nodes: [
      {
        id: 'mf_lvl_1',
        unitId: 1,
        nodeIndex: 0,
        title: 'Build a Fund & Collective Pooling',
        subtitle: 'How 3 small savers pool money into a diversified basket',
        levelBadge: 'Level 1',
        type: 'lesson',
        xpReward: 150,
        iconType: 'book',
        align: 'center',
        estimatedMinutes: 5,
      },
      {
        id: 'mf_lvl_2',
        unitId: 1,
        nodeIndex: 1,
        title: 'NAV Mechanics & The Monthly SIP',
        subtitle: 'The NAV Machine and Rupee-Cost Averaging simulator',
        levelBadge: 'Level 2',
        type: 'lesson',
        xpReward: 200,
        iconType: 'chart',
        align: 'left',
        estimatedMinutes: 6,
      },
      {
        id: 'mf_chest_1',
        unitId: 1,
        nodeIndex: 2,
        title: 'Rupee-Cost Averaging Milestone',
        subtitle: 'Bonus milestone reward chest',
        levelBadge: 'Bonus',
        type: 'chest',
        xpReward: 100,
        iconType: 'chest',
        align: 'far-left',
        estimatedMinutes: 1,
        chestReward: {
          xp: 100,
          badgeName: 'SIP Champion',
          badgeIcon: '🌱',
          quote: 'Disciplined periodic investing harnesses market volatility into long-term compounding.',
        },
      },
    ],
  },
  {
    id: 2,
    sectionNumber: 1,
    unitNumber: 2,
    title: 'Strategy: Categories, Fees & Investigation',
    themeColor: 'from-emerald-600 via-teal-600 to-cyan-600',
    description: 'Explore Equity, Debt, Hybrid & Index fund trade-offs, unmask expense ratio drag, and solve the forensic Fund Comparison Case.',
    guidebook: {
      title: 'Unit 2: Fund Categories & Forensic Analysis',
      summary: 'Selecting funds requires matching risk horizons to categories, watching for fee erosion, and evaluating portfolio diversification.',
      keyTakeaways: [
        {
          term: 'Fund Categories',
          explanation: 'Equity funds seek growth with market volatility; Debt funds offer stability with interest rate risk; Hybrids balance both.',
        },
        {
          term: 'Total Expense Ratio (TER)',
          explanation: 'Annual fee deducted daily from NAV. A 1% extra fee can erode over 20% of your total return over a 20-year horizon.',
        },
        {
          term: 'Forensic Evaluation',
          explanation: 'Past 1-year returns are deceptive. Look at 3-5 year rolling returns, benchmark comparison, and riskometer disclosures.',
        },
      ],
    },
    nodes: [
      {
        id: 'mf_lvl_3',
        unitId: 2,
        nodeIndex: 0,
        title: 'Match the Fund to the Life Goal',
        subtitle: 'Equity, Debt, Hybrid & Index fund trade-offs',
        levelBadge: 'Level 3',
        type: 'lesson',
        xpReward: 200,
        iconType: 'shield',
        align: 'center',
        estimatedMinutes: 6,
      },
      {
        id: 'mf_lvl_4',
        unitId: 2,
        nodeIndex: 1,
        title: 'Risk, Fees & The TER Drag Trap',
        subtitle: 'How ongoing expense ratios erode wealth over time',
        levelBadge: 'Level 4',
        type: 'lesson',
        xpReward: 250,
        iconType: 'flame',
        align: 'right',
        estimatedMinutes: 7,
      },
      {
        id: 'mf_lvl_5',
        unitId: 2,
        nodeIndex: 2,
        title: 'The Fund Comparison Mystery',
        subtitle: 'Evaluate Alpha vs Beta vs Gamma with real evidence',
        levelBadge: 'Boss Case',
        type: 'case',
        xpReward: 350,
        iconType: 'crown',
        align: 'far-right',
        estimatedMinutes: 8,
        caseId: 'case_fund_investigation',
      },
      {
        id: 'mf_chest_2',
        unitId: 2,
        nodeIndex: 3,
        title: 'Master Fund Architect Chest',
        subtitle: 'Curriculum completion grand reward',
        levelBadge: 'Mastery',
        type: 'chest',
        xpReward: 150,
        iconType: 'chest',
        align: 'center',
        estimatedMinutes: 1,
        chestReward: {
          xp: 150,
          badgeName: 'Certified Fund Detective',
          badgeIcon: '🎓',
          quote: 'You evaluate mutual funds on evidence, costs, and risk — not headlines or hype!',
        },
      },
    ],
  },
];
