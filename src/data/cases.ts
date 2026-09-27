/**
 * Financial Detective Cases for Playground.
 * Teaches investigative financial analysis through evidence collection,
 * thesis building, and reasoning evaluation.
 */

export interface Clue {
  id: string;
  category: 'Earnings' | 'Valuation' | 'Debt' | 'Competitors' | 'Industry' | 'Cash Flow' | 'Corporate Governance';
  title: string;
  metricLabel: string;
  metricValue: string;
  summary: string;
  deepDive: string;
  implication: 'concern' | 'support' | 'neutral';
  tags: string[];
}

export interface CaseDecision {
  id: string;
  label: string;
  stance: 'stronger' | 'evidence_needed' | 'concern';
  thesisSummary: string;
  reasoningScore: number; // 0 to 100 based on analytical rigor
  debriefAnalysis: string;
  marketOutcome: string;
  coreLesson: string;
}

export interface PlaygroundCase {
  id: string;
  title: string;
  companyName: string;
  ticker: string;
  industry: string;
  level: number;
  levelTitle: string;
  xpReward: number;
  estimatedMinutes: number;
  hook: string;
  scenarioDescription: string;
  stockChartSummary: {
    period: string;
    gain: string;
    flatPeriod: string;
    currentPrice: string;
  };
  actionPointsMax: number;
  clues: Clue[];
  decisions: CaseDecision[];
}

export const PLAYGROUND_CASES: PlaygroundCase[] = [
  {
    id: 'case_vanishing_momentum',
    title: 'The Vanishing Momentum',
    companyName: 'Zenith Electronics Ltd.',
    ticker: 'ZENITH',
    industry: 'Consumer Electricals & Smart Appliances',
    level: 12,
    levelTitle: 'First Playground Case',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'A company increased 180% over the last year but has moved sideways for the past 8 months. Is it consolidating before the next breakout, or is the engine out of fuel?',
    scenarioDescription: `Zenith Electronics rallied 180% over the last year, praised by market commentators for booming appliance sales. 

However, for the past 8 months, the stock has traded sideways in a choppy ₹580–₹640 band despite management projecting "robust consumer demand".

As an investigative analyst, you have 3 investigation tokens. Choose 3 leads from the evidence room to inspect:
• 🔍 Investigate earnings
• 🔍 Investigate valuation
• 🔍 Investigate debt
• 🔍 Investigate competitors
• 🔍 Investigate industry

Collect your evidence, decide whether your thesis looks stronger (🟢), more evidence is needed (🟡), or has significant concerns (🔴), and identify which evidence drove your conclusion.`,
    stockChartSummary: {
      period: 'Past 1 Year',
      gain: '+180%',
      flatPeriod: 'Last 8 Months (₹610 ± 5% Choppy)',
      currentPrice: '₹612.40',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_earnings',
        category: 'Earnings',
        title: '🔍 Investigate Earnings & Margins',
        metricLabel: 'YoY Revenue Growth vs Operating Margin',
        metricValue: 'Revenue +28% / Margin 5.8% (down from 16.5%)',
        summary: 'Headline revenue grew 28% through deep discounts, but operating profit margins collapsed from 16.5% to 5.8%.',
        deepDive: 'Zenith ran aggressive 30% discounts and extended 180-day vendor credit to capture e-commerce market share during festival sales. Gross revenue looks impressive, but the company earned 45% less net cash profit per unit sold.',
        implication: 'concern',
        tags: ['Margin Compression', 'Discount Price War'],
      },
      {
        id: 'clue_valuation',
        category: 'Valuation',
        title: '🔍 Investigate Valuation & P/E Multiple',
        metricLabel: 'Trailing P/E vs Industry Peers',
        metricValue: '48.2× vs 22.5× Peer Median',
        summary: 'The stock trades at 48.2× earnings—more than double its peer median—pricing in uninterrupted 35%+ compounding.',
        deepDive: 'At 48.2× earnings, perfection is priced in. Valuation is contextual: if profit growth stalls while P/E is 48×, the multiple can sharply compress toward 22× even if sales remain positive.',
        implication: 'concern',
        tags: ['Multiple Expansion', 'High Expectations'],
      },
      {
        id: 'clue_debt',
        category: 'Debt',
        title: '🔍 Investigate Debt & Solvency',
        metricLabel: 'Short-Term Borrowings & Finance Costs',
        metricValue: '₹310 Cr (surged 160% YoY)',
        summary: 'Short-term debt surged 160% to fund working capital and supplier bills as operating cash flow turned negative.',
        deepDive: 'Because cash collections stalled, management took expensive 9.5% commercial paper loans to pay supplier invoices. Annual interest expense rose from ₹12 Cr to ₹38 Cr, eating into bottom-line profits.',
        implication: 'concern',
        tags: ['Leverage Spike', 'Interest Obligation'],
      },
      {
        id: 'clue_competitors',
        category: 'Competitors',
        title: '🔍 Investigate Competitors',
        metricLabel: 'New Brand Inroads in E-Commerce',
        metricValue: '3 New Players captured 14% market share',
        summary: 'Competitors launched localized smart models manufactured under the PLI scheme at 15% lower price points.',
        deepDive: 'Rival brands are matching Zenith’s smart appliance features at 15% lower retail prices, eroding Zenith’s premium pricing power and forcing ongoing promotional subsidies.',
        implication: 'concern',
        tags: ['Price Competition', 'PLI Scheme Rivalry'],
      },
      {
        id: 'clue_industry',
        category: 'Industry',
        title: '🔍 Investigate Industry & Macro Demand',
        metricLabel: 'India AC & Appliance Penetration',
        metricValue: '9% vs 65% in China',
        summary: 'Long-term structural tailwind: Indian household appliance adoption remains under 10%.',
        deepDive: 'Urbanization, rising disposable incomes, and extreme summer temperatures provide a multi-year secular runway. The overall category demand is real and expanding across Tier-2/Tier-3 cities.',
        implication: 'support',
        tags: ['Macro Tailwind', 'Structural Adoption'],
      },
    ],
    decisions: [
      {
        id: 'dec_concern',
        label: '🔴 Thesis has significant concerns',
        stance: 'concern',
        thesisSummary: 'Aggressive discount-driven revenue masked a collapse in operating margins, debt surged 160%, and the stock trades at an inflated 48× P/E vulnerable to multiple contraction.',
        reasoningScore: 95,
        debriefAnalysis: `Outstanding forensic deduction! You recognized the disconnect between headline revenue (+28%) and underlying business health (operating margins down to 5.8%, debt up 160%).
        
The 8-month flatline was Dalal Street realizing that the prior 180% surge was driven purely by valuation multiple expansion (P/E leaping from 20× to 48×), not sustainable cash earnings.`,
        marketOutcome: 'Over the subsequent 6 months, Zenith reported another quarter of margin compression. The P/E multiple de-rated from 48× to 26×, causing the stock to correct 32% to ₹415.',
        coreLesson: 'Stock prices can rise on sentiment, but over the medium term they gravitate toward operating margins, cash flow, and debt sustainability.',
      },
      {
        id: 'dec_evidence_needed',
        label: '🟡 More evidence needed',
        stance: 'evidence_needed',
        thesisSummary: 'The long-term category penetration is a genuine structural tailwind, but refrain from committing capital until operating margins stabilize and debt stops expanding.',
        reasoningScore: 85,
        debriefAnalysis: `Prudent and risk-aware approach! You respected the structural India consumption story without blinding yourself to the immediate margin compression and debt risks.
        
Waiting for proof of operational turnaround prevents catching a falling knife when expensive stocks experience earnings slowdowns.`,
        marketOutcome: 'The stock drifted lower by 32% before stabilizing near ₹415. By waiting for margin confirmation, you preserved capital and avoided severe drawdown.',
        coreLesson: 'Patience is an active investment decision. You do not have to swing at every pitch in the market.',
      },
      {
        id: 'dec_stronger',
        label: '🟢 Thesis looks stronger',
        stance: 'stronger',
        thesisSummary: 'Top-line 28% growth and under-10% Indian AC penetration mean the 8-month pause is just healthy consolidation before the next 50% leg up.',
        reasoningScore: 40,
        debriefAnalysis: `You anchored too heavily on past price performance (the 180% rally) and headline top-line growth, overlooking collapsing margins, competitive discounting, and the 160% surge in debt.
        
In Indian markets, revenue growth achieved through deep discounting and rising debt destroys shareholder equity rather than creating it.`,
        marketOutcome: 'The stock broke down from its ₹580 support level as margin contraction forced brokerage downgrades, sliding 32% to ₹415.',
        coreLesson: 'Revenue is vanity, Profit is sanity, Cash is reality. Never buy an expensive 48× P/E stock whose margins and debt are deteriorating.',
      },
    ],
  },
  {
    id: 'case_high_pe_paradox',
    title: 'The High P/E Paradox',
    companyName: 'Kaveri Consumer Goods Ltd.',
    ticker: 'KAVERI',
    industry: 'FMCG & Branded Staples',
    level: 2,
    levelTitle: 'Advanced Investigation',
    xpReward: 250,
    estimatedMinutes: 5,
    hook: 'A stock is trading at 68× P/E! Conventional screeners scream "bubble!", but institutional funds keep buying. What does the screen miss?',
    scenarioDescription: `Kaveri Consumer Goods manufactures household spices and branded packaged snacks across South India. Every fundamental screener flags its P/E ratio of 68.5× as "dangerously overvalued" compared to the Nifty average of 22×.
    
Yet, over the last 7 years, Kaveri has delivered a 24% CAGR return. Investigate its capital efficiency and cash generation to understand why quality businesses often command premium multiples.`,
    stockChartSummary: {
      period: '7-Year Horizon',
      gain: '+380%',
      flatPeriod: 'Consistent Compounder',
      currentPrice: '₹1,240.00',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_roce',
        category: 'Earnings',
        title: 'Return on Capital Employed (ROCE)',
        metricLabel: 'ROCE / ROE',
        metricValue: '84.5% / 62.0%',
        summary: 'Exceptional capital efficiency: Kaveri generates ₹84.5 of operating profit for every ₹100 of capital employed.',
        deepDive: 'Most industrial companies have ROCE of 12-18%. An 84% ROCE means the company requires virtually zero new debt or equity dilution to expand production.',
        implication: 'support',
        tags: ['Capital Efficiency', 'Moat'],
      },
      {
        id: 'clue_working_capital',
        category: 'Cash Flow',
        title: 'Working Capital Cycle',
        metricLabel: 'Net Working Capital Days',
        metricValue: '-18 Days (Negative Working Capital)',
        summary: 'Customers and retailers pay in advance or on delivery, while raw ingredient vendors give 30-day credit.',
        deepDive: 'The company literally funds its growth using suppliers money, generating surplus free cash flow every single quarter.',
        implication: 'support',
        tags: ['Negative Working Capital', 'Cash Machine'],
      },
      {
        id: 'clue_pricing_power',
        category: 'Industry',
        title: 'Pricing Power & Inflation Pass-Through',
        metricLabel: 'Gross Margin Stability',
        metricValue: '52% consistently for 5 years',
        summary: 'When raw spice prices rose 18%, Kaveri raised packaged retail prices with zero drop in consumer volume.',
        deepDive: 'Strong brand loyalty creates pricing power. Consumers do not switch everyday cooking spices over a ₹5 price difference.',
        implication: 'support',
        tags: ['Brand Moat', 'Pricing Power'],
      },
    ],
    decisions: [
      {
        id: 'dec_quality_premium',
        label: 'Contextual Valuation: Premium is Justified by High ROCE & Free Cash',
        stance: 'stronger',
        thesisSummary: 'P/E cannot be judged in isolation. An 84% ROCE business with negative working capital deserves a higher multiple than a cyclical capital-guzzler.',
        reasoningScore: 92,
        debriefAnalysis: `You mastered the core principle of contextual valuation: P/E is not a standalone magic number. A business generating 80%+ ROCE that requires no debt to grow generates vastly more Free Cash Flow than a heavy industrial company trading at 15× P/E with 8% ROCE.`,
        marketOutcome: 'Kaveri continued to compound at 18% annual return over the next 3 years as earnings grew steadily without any multiple crash.',
        coreLesson: 'Never label a stock "cheap" or "expensive" based on P/E alone. High Return on Capital and reinvestment moat justify a quality premium.',
      },
      {
        id: 'dec_short_bubble',
        label: 'Overpriced Bubble: Short the stock or stay far away',
        stance: 'concern',
        thesisSummary: '68× is absurd when Nifty is 22×. Mean reversion must pull this stock down by 50%.',
        reasoningScore: 40,
        debriefAnalysis: `You fell into the beginner screener trap of assuming all P/E ratios must revert to 15× or 20×. Market history in India demonstrates that companies with indestructible brand moats and 50%+ ROCE can sustain 50-70× P/E for decades because their economic earnings are far higher than accounting figures suggest.`,
        marketOutcome: 'Shorting or avoiding high-quality compounders based on mechanical P/E filters often leads to missing generational wealth creators.',
        coreLesson: 'P/E is price divided by accounting earnings. It ignores balance sheet strength, debt freedom, and capital efficiency.',
      },
    ],
  },
];
