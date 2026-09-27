/**
 * Duolingo-style Learning Path & Gamified Curriculum for Indian Stock Market.
 * Connective game flow with serpentine nodes, micro-lessons, chests, and milestone cases.
 * 
 * Beginner Quest: "Stock Market Foundations" (Levels 1 to 12)
 * Structured to build mental models from zero:
 * Learn -> Interact -> Mini Cases -> Culminating in full investigation case.
 */

export type NodeType = 'lesson' | 'challenge' | 'chest' | 'case' | 'lab';

export interface DataTableRow {
  label: string;
  year1?: string;
  year2?: string;
  companyA?: string;
  companyB?: string;
}

export interface MicroQuestion {
  id: string;
  type: 'choice' | 'connect' | 'boolean';
  questionNumber: number;
  levelNumber: number;
  question: string;
  scenarioText?: string;
  dataTable?: {
    headers: string[];
    rows: (string | number)[][];
  };
  metricsBox?: {
    companyName?: string;
    metrics: { label: string; value: string }[];
  };
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  finReaction: {
    correct: string;
    incorrect: string;
  };
  xp: number;
}

export interface PathNode {
  id: string;
  unitId: number;
  nodeIndex: number;
  title: string;
  subtitle: string;
  levelBadge?: string;
  type: NodeType;
  xpReward: number;
  iconType: 'star' | 'book' | 'chart' | 'shield' | 'chest' | 'crown' | 'target' | 'flame';
  align: 'center' | 'left' | 'far-left' | 'right' | 'far-right';
  estimatedMinutes: number;
  caseId?: string;
  questions?: MicroQuestion[];
  chestReward?: {
    xp: number;
    badgeName: string;
    badgeIcon: string;
    quote: string;
  };
}

export interface UnitSection {
  id: number;
  sectionNumber: number;
  unitNumber: number;
  title: string;
  themeColor: string;
  description: string;
  guidebook: {
    title: string;
    summary: string;
    keyTakeaways: { term: string; explanation: string }[];
  };
  nodes: PathNode[];
}

export const LEARNING_UNITS: UnitSection[] = [
  {
    id: 1,
    sectionNumber: 1,
    unitNumber: 1,
    title: 'Foundations: Stocks & Business',
    themeColor: 'teal',
    description: 'Build your mental model from zero: What is a stock, market cap, and revenue vs profit.',
    guidebook: {
      title: 'Unit 1 Guidebook: Stock Market Foundations',
      summary: 'Before putting hard-earned rupees into the market, you must understand what you are actually buying: a slice of a living, breathing business.',
      keyTakeaways: [
        {
          term: 'Equity Ownership',
          explanation: 'When you buy a share, you own a fractional percentage of the real company, its assets, and its future profits.',
        },
        {
          term: 'Market Capitalization',
          explanation: 'Total Market Cap = Total Shares × Current Share Price. A ₹500 stock price does not mean the company is larger or more valuable than a ₹100 stock.',
        },
        {
          term: 'Revenue vs. Profit',
          explanation: 'Revenue is total sales collected. Profit is what remains after paying suppliers, employees, taxes, and interest. Revenue growth does not automatically equal business health.',
        },
      ],
    },
    nodes: [
      {
        id: 'node_lvl_1',
        unitId: 1,
        nodeIndex: 0,
        title: 'Level 1: What is a Stock?',
        subtitle: 'Ownership, raising capital, and stock price vs company value',
        levelBadge: 'Level 1',
        type: 'lesson',
        xpReward: 150,
        iconType: 'star',
        align: 'center',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q1',
            type: 'choice',
            questionNumber: 1,
            levelNumber: 1,
            question: 'When you buy a share of a company, what do you actually own?',
            options: [
              {
                id: 'q1_a',
                text: 'A. A loan given to the company',
                isCorrect: false,
                explanation: 'A loan is a debt instrument or debenture/bond, not an equity share.',
              },
              {
                id: 'q1_b',
                text: 'B. A small ownership stake in the company',
                isCorrect: true,
                explanation: 'Correct! A share represents legal fractional ownership in the operating business.',
              },
              {
                id: 'q1_c',
                text: "C. A guaranteed share of the company's profit",
                isCorrect: false,
                explanation: 'Profits are not guaranteed; they depend on business performance and board decisions.',
              },
              {
                id: 'q1_d',
                text: 'D. A government security',
                isCorrect: false,
                explanation: 'Government securities are sovereign bonds issued by the RBI/government.',
              },
            ],
            finReaction: {
              correct: 'Exactly! A share represents a small ownership stake in the company.',
              incorrect: 'Careful! When you buy a share, you become a co-owner, not a lender or bondholder.',
            },
            xp: 50,
          },
          {
            id: 'q2',
            type: 'choice',
            questionNumber: 2,
            levelNumber: 1,
            question: 'A company wants ₹100 crore to expand its business. Why might it sell shares?',
            options: [
              {
                id: 'q2_a',
                text: 'A. To raise capital from investors',
                isCorrect: true,
                explanation: 'Spot on! Selling shares allows a business to raise long-term expansion funds from investors.',
              },
              {
                id: 'q2_b',
                text: 'B. To avoid paying employees',
                isCorrect: false,
                explanation: 'Employee wages are a legal operating requirement regardless of share sales.',
              },
              {
                id: 'q2_c',
                text: 'C. To guarantee its stock price increases',
                isCorrect: false,
                explanation: 'Selling new shares dilutes share count and cannot guarantee stock price increases.',
              },
              {
                id: 'q2_d',
                text: 'D. To eliminate all business risk',
                isCorrect: false,
                explanation: 'Equity capital absorbs business risk; it never eliminates it.',
              },
            ],
            finReaction: {
              correct: 'Spot on! Equity gives the company capital to build factories and hire without interest debt.',
              incorrect: 'Think about why founders take public money: to fund expansion and product development.',
            },
            xp: 50,
          },
          {
            id: 'q3',
            type: 'choice',
            questionNumber: 3,
            levelNumber: 1,
            question: 'Stock price ≠ company value: Which company has the larger market capitalization?',
            scenarioText: `Company A has 10 crore shares priced at ₹100 each.\nCompany B has 1 crore shares priced at ₹500 each.`,
            dataTable: {
              headers: ['Company', 'Total Shares', 'Share Price', 'Market Capitalization'],
              rows: [
                ['Company A', '10 Crore', '₹100', '10 Cr × ₹100 = ₹1,000 Crore'],
                ['Company B', '1 Crore', '₹500', '1 Cr × ₹500 = ₹500 Crore'],
              ],
            },
            options: [
              {
                id: 'q3_a',
                text: 'A. Company A (₹1,000 Crore vs ₹500 Crore)',
                isCorrect: true,
                explanation: 'Because Company A = 10 crore × ₹100 = ₹1,000 crore, while Company B = 1 crore × ₹500 = ₹500 crore. Company A is twice as large despite having a lower nominal stock price!',
              },
              {
                id: 'q3_b',
                text: 'B. Company B',
                isCorrect: false,
                explanation: 'Company B has a higher share price (₹500), but with only 1 Cr shares its total market value is only ₹500 Cr.',
              },
              {
                id: 'q3_c',
                text: 'C. Both are equal',
                isCorrect: false,
                explanation: 'Calculate the total: 10 Cr × ₹100 = ₹1,000 Cr, which is double 1 Cr × ₹500 = ₹500 Cr.',
              },
              {
                id: 'q3_d',
                text: 'D. Cannot calculate',
                isCorrect: false,
                explanation: 'Market Cap = Shares × Price, which gives ₹1,000 Cr and ₹500 Cr respectively.',
              },
            ],
            finReaction: {
              correct: 'Brilliant! You learned that stock price does not equal company value. A ₹100 stock can be a much bigger company than a ₹500 stock.',
              incorrect: 'Watch the math: Multiply total shares by price. Company A = ₹1,000 Cr, Company B = ₹500 Cr. Company A is larger!',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_lvl_2',
        unitId: 1,
        nodeIndex: 1,
        title: 'Level 2: Revenue, Profit & Business',
        subtitle: 'Revenue vs profit, growing revenue, and cost investigation',
        levelBadge: 'Level 2',
        type: 'lesson',
        xpReward: 150,
        iconType: 'chart',
        align: 'left',
        estimatedMinutes: 4,
        questions: [
          {
            id: 'q4',
            type: 'choice',
            questionNumber: 4,
            levelNumber: 2,
            question: 'A company sells ₹100 crore worth of products. It spends ₹80 crore running the business. What is approximately its profit?',
            options: [
              {
                id: 'q4_a',
                text: 'A. ₹20 crore',
                isCorrect: true,
                explanation: 'Correct! Profit = Revenue (₹100 Cr) − Operating Expenses (₹80 Cr) = ₹20 Cr.',
              },
              {
                id: 'q4_b',
                text: 'B. ₹80 crore',
                isCorrect: false,
                explanation: '₹80 Cr is the cost spent to run the business, not the net profit.',
              },
              {
                id: 'q4_c',
                text: 'C. ₹100 crore',
                isCorrect: false,
                explanation: '₹100 Cr is gross revenue (total sales), not net profit.',
              },
              {
                id: 'q4_d',
                text: 'D. ₹180 crore',
                isCorrect: false,
                explanation: 'That is the sum of revenue and costs, not profit.',
              },
            ],
            finReaction: {
              correct: 'Exactly right! Profit = Revenue minus expenses. Simple, but foundational.',
              incorrect: 'Remember: Profit is what remains in the company pocket after paying all business costs.',
            },
            xp: 50,
          },
          {
            id: 'q5',
            type: 'choice',
            questionNumber: 5,
            levelNumber: 2,
            question: 'Growing revenue: What happened to Company A between Year 1 and Year 2?',
            dataTable: {
              headers: ['Metric', 'Year 1', 'Year 2'],
              rows: [
                ['Revenue', '₹100 Cr', '₹150 Cr'],
                ['Profit', '₹10 Cr', '₹15 Cr'],
              ],
            },
            options: [
              {
                id: 'q5_a',
                text: 'A. Revenue increased but profit decreased',
                isCorrect: false,
                explanation: 'Profit rose from ₹10 Cr to ₹15 Cr, so profit increased as well.',
              },
              {
                id: 'q5_b',
                text: 'B. Both increased',
                isCorrect: true,
                explanation: 'Revenue grew by 50% (₹100 Cr → ₹150 Cr) and profit grew by 50% (₹10 Cr → ₹15 Cr).',
              },
              {
                id: 'q5_c',
                text: 'C. Revenue decreased',
                isCorrect: false,
                explanation: 'Revenue grew from ₹100 Cr to ₹150 Cr.',
              },
              {
                id: 'q5_d',
                text: 'D. Profit stayed the same',
                isCorrect: false,
                explanation: 'Profit expanded by ₹5 Cr.',
              },
            ],
            finReaction: {
              correct: "Good. But don't stop there. Next question: why did they increase?",
              incorrect: 'Look closely at both lines in the table: Revenue rose +₹50 Cr and Profit rose +₹5 Cr.',
            },
            xp: 50,
          },
          {
            id: 'q6',
            type: 'choice',
            questionNumber: 6,
            levelNumber: 2,
            question: 'Revenue up, profit down: Company B’s revenue grew 50%, but profit fell 40%. What would you investigate first?',
            dataTable: {
              headers: ['Metric', 'Year 1', 'Year 2'],
              rows: [
                ['Revenue', '₹100 Cr', '₹150 Cr'],
                ['Profit', '₹10 Cr', '₹6 Cr'],
              ],
            },
            options: [
              {
                id: 'q6_a',
                text: 'A. Why costs increased',
                isCorrect: true,
                explanation: 'Spot on! This teaches: Revenue growth ≠ automatically good business performance. If costs surged faster than sales, profitability collapsed.',
              },
              {
                id: 'q6_b',
                text: "B. The company's logo",
                isCorrect: false,
                explanation: 'Branding visuals do not explain why operating costs destroyed profit margins.',
              },
              {
                id: 'q6_c',
                text: "C. The stock's previous day's price",
                isCorrect: false,
                explanation: 'Daily stock fluctuations are market noise, not the operational cause of declining profits.',
              },
              {
                id: 'q6_d',
                text: 'D. Nothing — revenue increased, so the company is doing well',
                isCorrect: false,
                explanation: 'Dangerous retail trap! Growing sales while losing profits is a warning sign of heavy discounting or cost inflation.',
              },
            ],
            finReaction: {
              correct: 'Vital beginner lesson: Revenue growth ≠ automatically good business performance! Always investigate costs.',
              incorrect: 'Never ignore falling profit! If sales jump from ₹100 Cr to ₹150 Cr but profit drops to ₹6 Cr, costs exploded.',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_chest_1',
        unitId: 1,
        nodeIndex: 2,
        title: 'Foundations Novice Chest',
        subtitle: 'Claim your Unit 1 reward and bonus XP',
        type: 'chest',
        xpReward: 50,
        iconType: 'chest',
        align: 'center',
        estimatedMinutes: 1,
        chestReward: {
          xp: 50,
          badgeName: 'Foundations Scout',
          badgeIcon: '🌱',
          quote: 'If you don’t understand the business, you don’t own a stock—you own a piece of paper that moves around.',
        },
      },
    ],
  },
  {
    id: 2,
    sectionNumber: 1,
    unitNumber: 2,
    title: 'Valuation: EPS & P/E Multiples',
    themeColor: 'emerald',
    description: 'Learn how to measure earnings per share and evaluate what price you pay per rupee of profit.',
    guidebook: {
      title: 'Unit 2 Guidebook: Decoding Valuation',
      summary: 'Never judge a stock solely by its absolute share price. Measure price relative to what the business earns.',
      keyTakeaways: [
        {
          term: 'Earnings Per Share (EPS)',
          explanation: 'EPS = Net Profit ÷ Total Shares. It tells you how many rupees of net profit belong to each individual share.',
        },
        {
          term: 'P/E Ratio (Price-to-Earnings)',
          explanation: 'P/E = Share Price ÷ EPS. It shows how many rupees investors pay for ₹1 of annual profit. High P/E implies high expectations.',
        },
        {
          term: 'Good Company ≠ Good Price',
          explanation: 'A fast-growing company trading at an extreme valuation multiple can be a poor investment if growth falters.',
        },
      ],
    },
    nodes: [
      {
        id: 'node_lvl_3',
        unitId: 2,
        nodeIndex: 3,
        title: 'Level 3: Earnings Per Share (EPS)',
        subtitle: 'Calculate EPS and understand share dilution conceptually',
        levelBadge: 'Level 3',
        type: 'lesson',
        xpReward: 100,
        iconType: 'book',
        align: 'right',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q7',
            type: 'choice',
            questionNumber: 7,
            levelNumber: 3,
            question: 'What is EPS? A company makes ₹100 crore profit and has 10 crore shares. What is its EPS?',
            options: [
              {
                id: 'q7_a',
                text: 'A. ₹1',
                isCorrect: false,
                explanation: 'Check the division: ₹100 Cr ÷ 10 Cr shares = ₹10.',
              },
              {
                id: 'q7_b',
                text: 'B. ₹10',
                isCorrect: true,
                explanation: 'Correct! EPS = Profit available to shareholders (₹100 Cr) ÷ Number of shares (10 Cr) = ₹10 per share.',
              },
              {
                id: 'q7_c',
                text: 'C. ₹100',
                isCorrect: false,
                explanation: '₹100 Cr is the total company profit, not the per-share amount.',
              },
              {
                id: 'q7_d',
                text: 'D. ₹1,000',
                isCorrect: false,
                explanation: 'Too high! 100 ÷ 10 = 10.',
              },
            ],
            finReaction: {
              correct: 'Math on point! EPS = Profit available to shareholders ÷ Number of shares = ₹10.',
              incorrect: 'Formula: Divide total profit (₹100 Cr) by total shares (10 Cr) to get ₹10 per share.',
            },
            xp: 50,
          },
          {
            id: 'q8',
            type: 'choice',
            questionNumber: 8,
            levelNumber: 3,
            question: 'Same profit, different shares: Company A and B both make ₹100 crore profit. Which has the higher EPS?',
            scenarioText: `• Company A has 10 crore shares\n• Company B has 20 crore shares`,
            dataTable: {
              headers: ['Company', 'Total Profit', 'Share Count', 'EPS Calculation'],
              rows: [
                ['Company A', '₹100 Cr', '10 Crore', '₹100 Cr ÷ 10 Cr = ₹10/share'],
                ['Company B', '₹100 Cr', '20 Crore', '₹100 Cr ÷ 20 Cr = ₹5/share'],
              ],
            },
            options: [
              {
                id: 'q8_a',
                text: 'A. Company A',
                isCorrect: true,
                explanation: 'A has an EPS of ₹10, while B has an EPS of only ₹5 because its profits are divided among twice as many shares (share dilution).',
              },
              {
                id: 'q8_b',
                text: 'B. Company B',
                isCorrect: false,
                explanation: 'Company B has 20 crore shares, so each share only gets ₹5 of profit.',
              },
              {
                id: 'q8_c',
                text: 'C. Same',
                isCorrect: false,
                explanation: 'While total profit is identical, the profit per share is cut in half for Company B.',
              },
              {
                id: 'q8_d',
                text: 'D. Cannot determine',
                isCorrect: false,
                explanation: 'We have both profit and share count, so EPS is directly calculable.',
              },
            ],
            finReaction: {
              correct: 'You mastered share dilution! When a company issues more shares, each slice of the profit pie gets smaller.',
              incorrect: 'Think about slicing a cake: dividing the same cake into 20 slices makes each slice smaller than dividing into 10.',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_lvl_4',
        unitId: 2,
        nodeIndex: 4,
        title: 'Level 4: The P/E Multiple',
        subtitle: 'What P/E tells you, and why lower P/E isn’t automatically better',
        levelBadge: 'Level 4',
        type: 'lesson',
        xpReward: 100,
        iconType: 'chart',
        align: 'far-right',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q9',
            type: 'choice',
            questionNumber: 9,
            levelNumber: 4,
            question: 'What does P/E tell you? A company’s stock trades at ₹200 and its EPS is ₹10. What is the P/E?',
            options: [
              {
                id: 'q9_a',
                text: 'A. 2×',
                isCorrect: false,
                explanation: 'Check the math: ₹200 ÷ ₹10 = 20×.',
              },
              {
                id: 'q9_b',
                text: 'B. 10×',
                isCorrect: false,
                explanation: '₹10 is the EPS, not the price-to-earnings multiple.',
              },
              {
                id: 'q9_c',
                text: 'C. 20×',
                isCorrect: true,
                explanation: 'Correct! P/E = Share Price (₹200) ÷ EPS (₹10) = 20×. Investors are paying ₹20 for every ₹1 of annual earnings.',
              },
              {
                id: 'q9_d',
                text: 'D. 200×',
                isCorrect: false,
                explanation: '₹200 is the share price.',
              },
            ],
            finReaction: {
              correct: 'Spot on! P/E = Price ÷ EPS. At 20×, you pay ₹20 for every ₹1 of profit.',
              incorrect: 'Formula: Divide stock price (₹200) by EPS (₹10) to get 20×.',
            },
            xp: 50,
          },
          {
            id: 'q10',
            type: 'choice',
            questionNumber: 10,
            levelNumber: 4,
            question: 'Is lower P/E always better? Company A has P/E = 10×, Company B has P/E = 30×. Which is automatically the better investment?',
            scenarioText: `• Company A: P/E = 10×\n• Company B: P/E = 30×`,
            options: [
              {
                id: 'q10_a',
                text: 'A. Company A',
                isCorrect: false,
                explanation: 'A low P/E can be a value trap—a declining business with shrinking profits or heavy debt.',
              },
              {
                id: 'q10_b',
                text: 'B. Company B',
                isCorrect: false,
                explanation: 'A 30× P/E means high expectations, but high P/E alone does not guarantee superior returns.',
              },
              {
                id: 'q10_c',
                text: "C. You can't decide from P/E alone",
                isCorrect: true,
                explanation: 'Spot on! A lower P/E doesn’t automatically mean a better company or investment. Company A could be shrinking, while Company B might be doubling its profits every two years.',
              },
              {
                id: 'q10_d',
                text: 'D. Both are identical',
                isCorrect: false,
                explanation: 'Their valuations and market expectations are very different.',
              },
            ],
            finReaction: {
              correct: '“Exactly. A lower P/E doesn’t automatically mean a better company or a better investment.”',
              incorrect: 'Crucial principle: Low P/E can be cheap for a reason (declining sales, high debt). Never buy on P/E alone.',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_lvl_5',
        unitId: 2,
        nodeIndex: 5,
        title: 'Level 5: Compare Companies',
        subtitle: 'Good company ≠ automatically good price',
        levelBadge: 'Level 5',
        type: 'challenge',
        xpReward: 50,
        iconType: 'target',
        align: 'right',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q11',
            type: 'choice',
            questionNumber: 11,
            levelNumber: 5,
            question: 'Which deserves investigation? Review the performance and valuation of Company A and Company B.',
            dataTable: {
              headers: ['Metric', 'Company A', 'Company B'],
              rows: [
                ['Revenue growth', '5%', '25%'],
                ['Profit growth', '4%', '30%'],
                ['P/E', '15×', '35×'],
              ],
            },
            options: [
              {
                id: 'q11_a',
                text: 'A. Company A is definitely better',
                isCorrect: false,
                explanation: 'Company A has lower valuation (15×), but its growth is sluggish (5% revenue, 4% profit).',
              },
              {
                id: 'q11_b',
                text: 'B. Company B is definitely better',
                isCorrect: false,
                explanation: 'Company B has strong growth (30% profit), but at 35× P/E the market is pricing in perfection.',
              },
              {
                id: 'q11_c',
                text: 'C. B has stronger growth but is also valued more highly',
                isCorrect: true,
                explanation: 'The correct learning: Good company ≠ automatically good price. You must weigh superior growth against the premium price demanded.',
              },
              {
                id: 'q11_d',
                text: 'D. P/E doesn’t matter',
                isCorrect: false,
                explanation: 'Valuation always matters over the long run.',
              },
            ],
            finReaction: {
              correct: 'Fundamental philosophy unlocked: Good company ≠ automatically good price! High growth comes at a premium.',
              incorrect: 'Compare both columns: B is growing 6× faster than A, but trades at more than double the multiple (35× vs 15×).',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_chest_2',
        unitId: 2,
        nodeIndex: 6,
        title: 'Valuation Explorer Chest',
        subtitle: 'Claim your Unit 2 credentials and bonus XP',
        type: 'chest',
        xpReward: 60,
        iconType: 'chest',
        align: 'center',
        estimatedMinutes: 1,
        chestReward: {
          xp: 60,
          badgeName: 'Valuation Scout',
          badgeIcon: '🔍',
          quote: 'Price is what you pay. Value is what you get. — Warren Buffett',
        },
      },
    ],
  },
  {
    id: 3,
    sectionNumber: 1,
    unitNumber: 3,
    title: 'Financial Health: Debt, ROE & Dividends',
    themeColor: 'amber',
    description: 'Learn to investigate solvency, capital efficiency, and how companies distribute or reinvest cash.',
    guidebook: {
      title: 'Unit 3 Guidebook: Balance Sheet & Capital Efficiency',
      summary: 'Sales and P/E get the headlines, but debt and return on capital determine corporate survival and long-term compounding.',
      keyTakeaways: [
        {
          term: 'Debt & Interest Obligations',
          explanation: 'Debt creates non-negotiable interest payments. In bad quarters, high debt can turn mild business slowdowns into solvency crises.',
        },
        {
          term: 'ROE (Return on Equity)',
          explanation: 'Measures how efficiently management generates profit from each rupee of shareholder equity. Always examine whether high ROE is from efficiency or debt.',
        },
        {
          term: 'Dividends vs Reinvestment',
          explanation: 'High dividends aren’t automatically better. A great business reinvesting profits into 25% returns compounds faster than one paying out all cash.',
        },
      ],
    },
    nodes: [
      {
        id: 'node_lvl_6',
        unitId: 3,
        nodeIndex: 7,
        title: 'Level 6: Why Debt Matters',
        subtitle: 'Interest obligations and investigating high debt with falling profit',
        levelBadge: 'Level 6',
        type: 'lesson',
        xpReward: 100,
        iconType: 'shield',
        align: 'left',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q12',
            type: 'choice',
            questionNumber: 12,
            levelNumber: 6,
            question: 'Why does debt matter? Company A has ₹10 Cr debt, Company B has ₹500 Cr debt. Both earn ₹100 Cr annual operating profit. Why investigate Company B’s debt more closely?',
            scenarioText: `• Company A: Debt = ₹10 crore\n• Company B: Debt = ₹500 crore\nBoth have ₹100 crore annual operating profit.`,
            options: [
              {
                id: 'q12_a',
                text: 'A. Debt can create interest and repayment obligations',
                isCorrect: true,
                explanation: 'Spot on! At 10% interest, ₹500 Cr debt requires ₹50 Cr in interest alone—eating 50% of Company B’s profit!',
              },
              {
                id: 'q12_b',
                text: 'B. Debt guarantees bankruptcy',
                isCorrect: false,
                explanation: 'Debt does not guarantee bankruptcy if cash flows are steady, but it amplifies risk.',
              },
              {
                id: 'q12_c',
                text: 'C. Debt always increases stock price',
                isCorrect: false,
                explanation: 'High debt increases financial fragility, often depressing valuations.',
              },
              {
                id: 'q12_d',
                text: 'D. Debt doesn’t affect businesses',
                isCorrect: false,
                explanation: 'Debt is one of the most critical factors in business solvency.',
              },
            ],
            finReaction: {
              correct: 'Exactly right! Debt creates mandatory interest and repayment obligations that cannot be delayed.',
              incorrect: 'Think about bank loans: they must be serviced with interest regardless of whether sales are good or bad.',
            },
            xp: 50,
          },
          {
            id: 'q13',
            type: 'choice',
            questionNumber: 13,
            levelNumber: 6,
            question: 'High debt + falling profit: A company shows Revenue ↑, Profit ↓, Debt ↑. What should you do?',
            scenarioText: `Company Trend:\nRevenue ↑\nProfit ↓\nDebt ↑`,
            options: [
              {
                id: 'q13_a',
                text: 'A. Immediately buy',
                isCorrect: false,
                explanation: 'Buying blindly into falling profitability and rising leverage is extremely risky.',
              },
              {
                id: 'q13_b',
                text: 'B. Immediately sell',
                isCorrect: false,
                explanation: 'Notice that we are not teaching buy/sell recommendations—we are teaching forensic investigation!',
              },
              {
                id: 'q13_c',
                text: 'C. Investigate why costs/profitability and debt are changing',
                isCorrect: true,
                explanation: 'Notice that we’re not teaching the game to output buy/sell recommendations. We’re teaching investigation. Why are costs rising and why is borrowing expanding?',
              },
              {
                id: 'q13_d',
                text: 'D. Ignore the debt',
                isCorrect: false,
                explanation: 'Ignoring leverage when profits are falling is how investors walk into major bankruptcies.',
              },
            ],
            finReaction: {
              correct: 'Analyst mindset in action! We don’t guess buy/sell—we investigate the business reality.',
              incorrect: 'Remember the core philosophy: Don’t jump to buy/sell calls. Investigate the underlying causes first.',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_lvl_7',
        unitId: 3,
        nodeIndex: 8,
        title: 'Level 7: Return on Equity (ROE)',
        subtitle: 'Capital efficiency, metric interpretation, and business context',
        levelBadge: 'Level 7',
        type: 'lesson',
        xpReward: 100,
        iconType: 'star',
        align: 'far-left',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q14',
            type: 'choice',
            questionNumber: 14,
            levelNumber: 7,
            question: 'What is ROE trying to tell you? ROE is broadly used to understand:',
            options: [
              {
                id: 'q14_a',
                text: 'A. How efficiently a company generates profit relative to shareholders’ equity',
                isCorrect: true,
                explanation: 'Correct! ROE = Net Profit ÷ Shareholders’ Equity. It shows how much profit is squeezed out of every rupee of equity capital invested.',
              },
              {
                id: 'q14_b',
                text: 'B. How fast its stock price moves',
                isCorrect: false,
                explanation: 'Stock price velocity is volatility or momentum, not a balance sheet return metric.',
              },
              {
                id: 'q14_c',
                text: 'C. How much debt it has',
                isCorrect: false,
                explanation: 'Debt is measured by Debt-to-Equity or Debt-to-EBITDA, not ROE.',
              },
              {
                id: 'q14_d',
                text: 'D. How many employees it has',
                isCorrect: false,
                explanation: 'ROE has nothing to do with employee headcount.',
              },
            ],
            finReaction: {
              correct: 'Spot on! ROE measures how hard management makes your shareholder equity work.',
              incorrect: 'ROE stands for Return on Equity—profit generated relative to the capital contributed by shareholders.',
            },
            xp: 50,
          },
          {
            id: 'q15',
            type: 'choice',
            questionNumber: 15,
            levelNumber: 7,
            question: 'Compare ROE: Company A has ROE = 8%, Company B has ROE = 22%. What is the most appropriate conclusion?',
            scenarioText: `• Company A: ROE = 8%\n• Company B: ROE = 22%`,
            options: [
              {
                id: 'q15_a',
                text: 'A. Company B is automatically the better investment',
                isCorrect: false,
                explanation: 'A 22% ROE can sometimes be artificially boosted by dangerous high leverage debt.',
              },
              {
                id: 'q15_b',
                text: 'B. Company A is automatically bad',
                isCorrect: false,
                explanation: 'A might be in a temporary cyclical trough or heavily reinvesting in new assets.',
              },
              {
                id: 'q15_c',
                text: 'C. B generates higher returns on equity, but more context is needed',
                isCorrect: true,
                explanation: 'Again: Metric → interpretation → context. You must check whether Company B’s ROE comes from pricing power or high borrowing.',
              },
              {
                id: 'q15_d',
                text: 'D. ROE tells you the future stock price',
                isCorrect: false,
                explanation: 'No financial ratio predicts future stock prices directly.',
              },
            ],
            finReaction: {
              correct: 'Golden principle: Metric → interpretation → context! Never rely on a single ratio without investigating how it was achieved.',
              incorrect: 'Careful! While 22% looks higher than 8%, context (debt levels, reinvestment runway) is essential.',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_lvl_8',
        unitId: 3,
        nodeIndex: 9,
        title: 'Level 8: Dividends & Reinvestment',
        subtitle: 'Cash payouts vs compounding through expansion',
        levelBadge: 'Level 8',
        type: 'lesson',
        xpReward: 100,
        iconType: 'chart',
        align: 'left',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q16',
            type: 'choice',
            questionNumber: 16,
            levelNumber: 8,
            question: 'What is a dividend? A company distributes part of its profits to shareholders. What is this generally called?',
            options: [
              {
                id: 'q16_a',
                text: 'A. Dividend',
                isCorrect: true,
                explanation: 'Correct! A dividend is the cash distribution of corporate earnings to equity holders.',
              },
              {
                id: 'q16_b',
                text: 'B. EPS',
                isCorrect: false,
                explanation: 'EPS is the total profit generated per share, regardless of whether it is distributed.',
              },
              {
                id: 'q16_c',
                text: 'C. Market cap',
                isCorrect: false,
                explanation: 'Market cap is total company valuation.',
              },
              {
                id: 'q16_d',
                text: 'D. Capital gain',
                isCorrect: false,
                explanation: 'Capital gain is the increase in share price between buy and sell.',
              },
            ],
            finReaction: {
              correct: 'Right on! A dividend is profit paid directly to shareholders into their bank accounts.',
              incorrect: 'Think about cash distributions from company profit to shareholders—that is a dividend.',
            },
            xp: 50,
          },
          {
            id: 'q17',
            type: 'choice',
            questionNumber: 17,
            levelNumber: 8,
            question: 'Dividend doesn’t mean better: Company A pays a high dividend. Company B reinvests most profits into expansion. Which is automatically better?',
            scenarioText: `• Company A: High dividend payout\n• Company B: Reinvests most profits into expansion`,
            options: [
              {
                id: 'q17_a',
                text: 'A. Company A',
                isCorrect: false,
                explanation: 'High dividends often mean the company has run out of attractive avenues to reinvest for growth.',
              },
              {
                id: 'q17_b',
                text: 'B. Company B',
                isCorrect: false,
                explanation: 'Reinvesting is great only if the company earns high returns on that reinvested capital.',
              },
              {
                id: 'q17_c',
                text: 'C. Neither is automatically better; it depends on the business and situation',
                isCorrect: true,
                explanation: 'Spot on! Mature utilities pay dividends, while fast-growing compounders with 25% ROIC can create far more wealth by reinvesting.',
              },
              {
                id: 'q17_d',
                text: 'D. Both must have the same return',
                isCorrect: false,
                explanation: 'Returns vary enormously based on capital allocation quality.',
              },
            ],
            finReaction: {
              correct: 'Sophisticated insight! Reinvesting at high returns beats dividends, but bad reinvestment destroys wealth.',
              incorrect: 'Remember: A high dividend isn’t always better. If a company can compound capital at 25%, you want them to reinvest!',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_chest_3',
        unitId: 3,
        nodeIndex: 10,
        title: 'Forensic Guardian Chest',
        subtitle: 'Claim your Unit 3 reward and bonus XP',
        type: 'chest',
        xpReward: 75,
        iconType: 'chest',
        align: 'center',
        estimatedMinutes: 1,
        chestReward: {
          xp: 75,
          badgeName: 'Balance Sheet Sleuth',
          badgeIcon: '🏛️',
          quote: 'It’s not just about what a company earns, but how much risk and debt it took to earn it.',
        },
      },
    ],
  },
  {
    id: 4,
    sectionNumber: 1,
    unitNumber: 4,
    title: 'Investigative Reasoning & The First Case',
    themeColor: 'teal',
    description: 'Transition from single quiz questions to mini investigations and your flagship case: The Vanishing Momentum.',
    guidebook: {
      title: 'Unit 4 Guidebook: Building an Investment Thesis',
      summary: 'The end goal isn’t to create a finance quiz app; it’s to train financial reasoning. Move from facts to syntheses.',
      keyTakeaways: [
        {
          term: 'Expectations vs Price',
          explanation: 'Good financial results do not guarantee short-term stock price increases if the market expected even higher growth.',
        },
        {
          term: 'Mini Investigation',
          explanation: 'Look for the single metric that changes the narrative (e.g. 55× P/E pricing in extraordinary future performance).',
        },
        {
          term: 'Thesis Formulation',
          explanation: 'Replace BUY/SELL impulses with structured analytical views: 🟢 Thesis looks stronger, 🟡 More evidence needed, 🔴 Significant concerns.',
        },
      ],
    },
    nodes: [
      {
        id: 'node_lvl_9',
        unitId: 4,
        nodeIndex: 11,
        title: 'Level 9: Stock Price vs Business',
        subtitle: 'Why good earnings can still cause a stock to drop 10%',
        levelBadge: 'Level 9',
        type: 'lesson',
        xpReward: 50,
        iconType: 'chart',
        align: 'right',
        estimatedMinutes: 3,
        questions: [
          {
            id: 'q18',
            type: 'choice',
            questionNumber: 18,
            levelNumber: 9,
            question: 'The stock falls: Company X reports Revenue +20% and Profit +25%, but the stock falls 10%. What should you think?',
            scenarioText: `Company X quarterly report:\n• Revenue: +20%\n• Profit: +25%\nOutcome: Stock plunges 10% on earnings day.`,
            options: [
              {
                id: 'q18_a',
                text: 'A. The company must be bad',
                isCorrect: false,
                explanation: 'A 25% profit growth is objectively strong operating performance.',
              },
              {
                id: 'q18_b',
                text: 'B. The market must be wrong',
                isCorrect: false,
                explanation: 'Arguing with the tape without understanding expectations is dangerous.',
              },
              {
                id: 'q18_c',
                text: 'C. Investigate expectations, valuation and other information',
                isCorrect: true,
                explanation: 'Crucial learning: Good business results don’t guarantee short-term stock-price increases. If the market priced in +40% growth at 60× P/E, +25% is an earnings disappointment!',
              },
              {
                id: 'q18_d',
                text: 'D. The financial results don’t matter',
                isCorrect: false,
                explanation: 'Financial results drive long-term business intrinsic value.',
              },
            ],
            finReaction: {
              correct: 'Key market truth: Good business results don’t guarantee short-term stock price increases. Expectations dictate reactions.',
              incorrect: 'Look deeper: What did the market expect? If investors priced in 40% growth, 25% feels like a miss.',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_lvl_10',
        unitId: 4,
        nodeIndex: 12,
        title: 'Level 10: Mini Investigation',
        subtitle: 'The Expensive Growth Company: Spotting the critical number',
        levelBadge: 'Level 10',
        type: 'challenge',
        xpReward: 100,
        iconType: 'target',
        align: 'far-right',
        estimatedMinutes: 4,
        questions: [
          {
            id: 'q19',
            type: 'choice',
            questionNumber: 19,
            levelNumber: 10,
            question: 'The expensive growth company: You discover these metrics. Inspector Fin says: "Looks interesting. But there’s one number I want you to investigate." Which one?',
            metricsBox: {
              companyName: 'Apex HyperGrowth Ltd.',
              metrics: [
                { label: 'Revenue Growth', value: '30%' },
                { label: 'Profit Growth', value: '35%' },
                { label: 'ROE', value: '22%' },
                { label: 'Debt', value: 'Low' },
                { label: 'P/E Ratio', value: '55×' },
              ],
            },
            options: [
              {
                id: 'q19_a',
                text: 'A. Revenue',
                isCorrect: false,
                explanation: '30% revenue growth is solid and unambiguous.',
              },
              {
                id: 'q19_b',
                text: 'B. Profit',
                isCorrect: false,
                explanation: '35% profit growth is healthy.',
              },
              {
                id: 'q19_c',
                text: 'C. P/E',
                isCorrect: true,
                explanation: 'At 55× P/E, the stock is priced for perfection. Any tiny slowdown will cause multiple compression.',
              },
              {
                id: 'q19_d',
                text: 'D. ROE',
                isCorrect: false,
                explanation: '22% ROE with low debt is already verified as strong.',
              },
            ],
            finReaction: {
              correct: 'Bullseye! P/E is 55×. That is the critical number holding the entire valuation together.',
              incorrect: 'Look at the valuation: Revenue, profit, ROE, and debt are all great. What about the price you have to pay?',
            },
            xp: 50,
          },
          {
            id: 'q20',
            type: 'choice',
            questionNumber: 20,
            levelNumber: 10,
            question: 'Why investigate the 55× P/E ratio?',
            options: [
              {
                id: 'q20_a',
                text: 'A. Because a high valuation can mean the market already expects strong future growth',
                isCorrect: true,
                explanation: 'Exactly! At 55× P/E, the market already expects hyper-growth to continue indefinitely. If growth slows from 35% to 20%, the multiple can drop to 30×.',
              },
              {
                id: 'q20_b',
                text: 'B. Because high P/E means the company is losing money',
                isCorrect: false,
                explanation: 'High P/E means the company is profitable; companies losing money have negative or no P/E.',
              },
              {
                id: 'q20_c',
                text: 'C. Because P/E measures debt',
                isCorrect: false,
                explanation: 'P/E measures price relative to earnings, not debt.',
              },
              {
                id: 'q20_d',
                text: 'D. Because P/E predicts the stock price',
                isCorrect: false,
                explanation: 'P/E does not forecast the future price.',
              },
            ],
            finReaction: {
              correct: 'High valuation implies high expectations. That vulnerability is what an analyst inspects!',
              incorrect: 'High P/E means perfection is priced in. If reality falls even slightly short, the stock takes a hit.',
            },
            xp: 50,
          },
        ],
      },
      {
        id: 'node_lvl_11',
        unitId: 4,
        nodeIndex: 13,
        title: 'Level 11: Build a Thesis',
        subtitle: 'Nova Motors: Stop direct quiz questions and synthesize evidence',
        levelBadge: 'Level 11',
        type: 'challenge',
        xpReward: 75,
        iconType: 'shield',
        align: 'center',
        estimatedMinutes: 4,
        questions: [
          {
            id: 'q21',
            type: 'choice',
            questionNumber: 21,
            levelNumber: 11,
            question: 'Nova Motors: Which statement best describes what you’ve found?',
            scenarioText: `Company: Nova Motors\n• Revenue growth: 22%\n• Profit growth: 28%\n• ROE: 19%\n• Debt: Moderate\n• P/E: 42×\n• Industry growth: 15%`,
            metricsBox: {
              companyName: 'Nova Motors Ltd.',
              metrics: [
                { label: 'Revenue Growth', value: '22%' },
                { label: 'Profit Growth', value: '28%' },
                { label: 'ROE', value: '19%' },
                { label: 'Debt', value: 'Moderate' },
                { label: 'P/E Ratio', value: '42×' },
                { label: 'Industry Growth', value: '15%' },
              ],
            },
            options: [
              {
                id: 'q21_a',
                text: 'A. "The company is definitely a buy."',
                isCorrect: false,
                explanation: 'Disciplined analysts never declare an automatic buy without checking whether valuation provides a margin of safety.',
              },
              {
                id: 'q21_b',
                text: 'B. "The company has strong growth, but its valuation needs further investigation."',
                isCorrect: true,
                explanation: 'Spot on! This is where your investigation mechanic starts: acknowledging operational strength while evaluating valuation risk.',
              },
              {
                id: 'q21_c',
                text: 'C. "The stock will rise."',
                isCorrect: false,
                explanation: 'We don’t predict short-term price direction.',
              },
              {
                id: 'q21_d',
                text: 'D. "P/E doesn’t matter."',
                isCorrect: false,
                explanation: 'Valuation always matters.',
              },
            ],
            finReaction: {
              correct: 'Outstanding thesis building! You recognized strong business performance while refusing to ignore valuation risk.',
              incorrect: 'Look at the nuance: 22% growth outpaces industry (15%), but at 42× P/E further valuation checks are necessary.',
            },
            xp: 75,
          },
        ],
      },
      {
        id: 'node_lvl_12',
        unitId: 4,
        nodeIndex: 14,
        title: 'Level 12: The Vanishing Momentum',
        subtitle: 'Flagship Investigation Case: 3 Action Tokens, 5 Clues, Formulate your Thesis',
        levelBadge: 'Level 12 Case',
        type: 'case',
        caseId: 'case_vanishing_momentum',
        xpReward: 350,
        iconType: 'crown',
        align: 'left',
        estimatedMinutes: 6,
      },
      {
        id: 'node_lvl_lab',
        unitId: 4,
        nodeIndex: 15,
        title: 'Bridge to Trading Lab',
        subtitle: 'Apply indicators, moving averages, and backtest systematic rules',
        levelBadge: 'Trading Lab',
        type: 'lab',
        xpReward: 100,
        iconType: 'flame',
        align: 'center',
        estimatedMinutes: 5,
      },
    ],
  },
];
