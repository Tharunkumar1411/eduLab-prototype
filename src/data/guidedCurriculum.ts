/**
 * Guided Learning Curriculum for Stock Market Foundations.
 * 
 * Implements the 5-stage pedagogical game loop:
 * LEARN -> SEE -> TRY -> DECIDE -> REFLECT & APPLY
 * 
 * Designed to build an investor's mental model from ground zero:
 * Teaching users what to look at, what matters, and how an investor thinks.
 */

export interface GuidedLessonStage {
  nodeId: string;
  levelNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  xpReward: number;

  // Stage 1: LEARN (Character introduces the problem/concept)
  learn: {
    finSpeech: string;
    conceptTitle: string;
    conceptHighlight: string;
    mentalModel: string[];
    investorQuestion: string;
  };

  // Stage 2: SEE (Visual example with simple real-world numbers)
  see: {
    title: string;
    finCommentary: string;
    visualType: 'cards-comparison' | 'waterfall' | 'formula-calc';
    companyA?: {
      name: string;
      tag?: string;
      metrics: { label: string; value: string; highlight?: boolean }[];
      summary: string;
    };
    companyB?: {
      name: string;
      tag?: string;
      metrics: { label: string; value: string; highlight?: boolean }[];
      summary: string;
    };
    waterfallSteps?: {
      label: string;
      amount: string;
      type: 'revenue' | 'expense' | 'profit';
      note: string;
    }[];
    formulaBox?: {
      formula: string;
      inputs: { label: string; value: string }[];
      result: { label: string; value: string };
    };
    keyObservation: string;
  };

  // Stage 3: TRY (Interactive mini-game/exercise)
  try: {
    title: string;
    prompt: string;
    finHint: string;
    cards: {
      id: string;
      name: string;
      badge?: string;
      details: { label: string; value: string }[];
      isCorrect: boolean;
      feedback: string;
    }[];
    finReaction: {
      correct: string;
      incorrect: string;
    };
  };

  // Stage 4: DECIDE (Investigative nuance / what to look at next)
  decide: {
    title: string;
    finPrompt: string;
    scenarioCard?: {
      company: string;
      stats: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
      contextNote: string;
    };
    question: string;
    options: {
      id: string;
      text: string;
      isBest: boolean;
      investorInsight: string;
    }[];
    goldenTakeaway: string;
  };

  // Stage 5: REFLECT & APPLY (Explain why + Golden Rule + XP)
  reflect: {
    goldenRuleNumber: number;
    ruleTitle: string;
    ruleQuote: string;
    investorMindsetTakeaway: string;
    checklistItems: string[];
    unlockedBadge: {
      name: string;
      icon: string;
      description: string;
    };
  };
}

export const GUIDED_LESSONS: Record<string, GuidedLessonStage> = {
  // Level 1: What is a stock?
  node_lvl_1: {
    nodeId: 'node_lvl_1',
    levelNumber: 1,
    title: 'What is a Stock?',
    subtitle: 'Ownership, raising capital, and stock price vs company value',
    estimatedMinutes: 3,
    xpReward: 150,
    learn: {
      finSpeech:
        'Welcome, detective! Before looking at charts or tickers, let’s get one thing clear: when you buy a share, you are not buying a casino ticket or lending money. You are purchasing a legal, fractional ownership stake in a living business.',
      conceptTitle: 'Fractional Business Ownership',
      conceptHighlight: '1 Share = 1 Fractional Slice of the Business & its Future Cash Flows',
      mentalModel: [
        'A stock is NOT a piece of fluctuating digital paper; it represents real factories, inventory, and employees.',
        'Companies issue shares to raise equity capital for long-term expansion without taking on bank debt.',
        'As a co-owner, your fortune rises and falls with how well that underlying business performs.',
      ],
      investorQuestion: 'If you wouldn’t buy the whole store down the street, why buy 10 shares of it?',
    },
    see: {
      title: 'Stock Price ≠ Company Value',
      finCommentary:
        'A ₹500 stock is NOT automatically "bigger" or more expensive than a ₹100 stock! Look at the total share count to find the actual market value.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'Alpha Retail Ltd.',
        tag: '₹100 Stock Price',
        metrics: [
          { label: 'Share Price', value: '₹100' },
          { label: 'Total Shares', value: '10 Crore' },
          { label: 'Market Cap (Total Value)', value: '₹1,000 Crore', highlight: true },
        ],
        summary: '10 Cr shares × ₹100 = ₹1,000 Cr total company valuation.',
      },
      companyB: {
        name: 'Beta Motors Ltd.',
        tag: '₹500 Stock Price',
        metrics: [
          { label: 'Share Price', value: '₹500' },
          { label: 'Total Shares', value: '1 Crore' },
          { label: 'Market Cap (Total Value)', value: '₹500 Crore', highlight: true },
        ],
        summary: '1 Cr shares × ₹500 = ₹500 Cr total company valuation.',
      },
      keyObservation:
        'Even though Beta Motors has a 5× higher stock price (₹500 vs ₹100), Alpha Retail is actually twice as large in total enterprise worth!',
    },
    try: {
      title: 'Interactive Valuation Check',
      prompt: 'Based on total Market Capitalization, which company is actually more valuable?',
      finHint: 'Remember: Market Cap = Total Number of Shares × Current Share Price.',
      cards: [
        {
          id: 'card_a',
          name: 'Alpha Retail Ltd.',
          badge: '₹100 / share',
          details: [
            { label: 'Total Shares', value: '10 Crore' },
            { label: 'Total Value', value: '₹1,000 Cr' },
          ],
          isCorrect: true,
          feedback:
            'Spot on! Alpha Retail is valued at ₹1,000 Crore, exactly double Beta Motors (₹500 Crore), despite its lower nominal share price.',
        },
        {
          id: 'card_b',
          name: 'Beta Motors Ltd.',
          badge: '₹500 / share',
          details: [
            { label: 'Total Shares', value: '1 Crore' },
            { label: 'Total Value', value: '₹500 Cr' },
          ],
          isCorrect: false,
          feedback:
            'Watch the math! A higher individual share price (₹500) multiplied by fewer shares (1 Cr) gives ₹500 Cr, which is half of Alpha Retail.',
        },
      ],
      finReaction: {
        correct: 'Brilliant! You just avoided the rookie trap that confuses 90% of beginners.',
        incorrect: 'Careful! Always multiply shares by price. Never judge a company by its share price alone.',
      },
    },
    decide: {
      title: 'Founder Dilemma: Why Issue Shares?',
      finPrompt:
        'A founder wants ₹100 crore to build 3 new factories. Why sell shares to public investors instead of taking a bank loan?',
      scenarioCard: {
        company: 'Apex CleanTech Ltd.',
        stats: [
          { label: 'Required Capital', value: '₹100 Cr', trend: 'neutral' },
          { label: 'Factory Construction', value: '3 Years', trend: 'neutral' },
          { label: 'Expected First Profit', value: 'Year 4', trend: 'up' },
        ],
        contextNote: 'Building factories takes years before generating cash. A bank loan requires fixed monthly interest immediately.',
      },
      question: 'What is the primary strategic benefit of raising equity capital from shareholders?',
      options: [
        {
          id: 'opt_1',
          text: 'To raise permanent capital without mandatory debt payments while building',
          isBest: true,
          investorInsight:
            'Exactly! Equity capital gives the company room to breathe and innovate without the existential risk of monthly bank interest defaults.',
        },
        {
          id: 'opt_2',
          text: 'To guarantee that the company stock price goes up immediately',
          isBest: false,
          investorInsight: 'Selling new shares actually dilutes share count and guarantees nothing about stock prices.',
        },
        {
          id: 'opt_3',
          text: 'To avoid having to pay suppliers and workers',
          isBest: false,
          investorInsight: 'Operating expenses are legal obligations that must always be paid regardless of financing.',
        },
      ],
      goldenTakeaway: 'Equity provides growth fuel without debt shackles, in exchange for sharing future profits with you.',
    },
    reflect: {
      goldenRuleNumber: 1,
      ruleTitle: 'Stock Price ≠ Company Value',
      ruleQuote: 'A ₹100 stock is not cheap, and a ₹1,000 stock is not expensive. Always calculate Market Cap.',
      investorMindsetTakeaway:
        'Before you ever look at a chart, calculate what the whole business is worth. You are an owner of a slice of an enterprise.',
      checklistItems: [
        'Always multiply Total Shares × Share Price to get Market Cap.',
        'Never say a stock is "cheap" just because it costs ₹20 or ₹50.',
        'Remember that buying a share means buying real business assets and cash flows.',
      ],
      unlockedBadge: {
        name: 'Equity Co-Owner',
        icon: '🌱',
        description: 'Understands legal fractional ownership and market capitalization.',
      },
    },
  },

  // Level 2: Revenue, Profit & Business
  node_lvl_2: {
    nodeId: 'node_lvl_2',
    levelNumber: 2,
    title: 'Revenue, Profit & Business',
    subtitle: 'Revenue vs profit, growing revenue, and cost investigation',
    estimatedMinutes: 4,
    xpReward: 150,
    learn: {
      finSpeech:
        'A company can sell ₹100 crore worth of products and still go bankrupt! Why? Because Revenue is just money coming in through the front door. Profit is what is left after paying workers, raw materials, electricity, and taxes.',
      conceptTitle: 'The Business Engine: Revenue vs Profit',
      conceptHighlight: 'Revenue (Top Line) − Operating Costs = Net Profit (Bottom Line)',
      mentalModel: [
        'Revenue is the total value of goods or services sold.',
        'Costs are the non-negotiable expenses needed to produce those sales.',
        'Profit is the only money that actually creates shareholder wealth.',
      ],
      investorQuestion: 'Are higher sales creating more cash, or is the company bleeding money to buy market share?',
    },
    see: {
      title: 'The Profit Waterfall: Where Does the Money Go?',
      finCommentary:
        'Follow the journey of ₹100 crore in sales. Notice how quickly costs eat away the top line before anything reaches the owner.',
      visualType: 'waterfall',
      waterfallSteps: [
        { label: 'Gross Revenue (Total Sales)', amount: '+₹100 Cr', type: 'revenue', note: 'All product sales collected' },
        { label: 'Raw Materials & Supplies', amount: '-₹45 Cr', type: 'expense', note: 'Direct cost of goods' },
        { label: 'Employee Salaries & Rent', amount: '-₹25 Cr', type: 'expense', note: 'Operating overhead' },
        { label: 'Taxes & Loan Interest', amount: '-₹10 Cr', type: 'expense', note: 'Statutory & financial cost' },
        { label: 'Net Profit (Bottom Line)', amount: '₹20 Cr', type: 'profit', note: 'What remains for shareholders' },
      ],
      keyObservation: 'Out of ₹100 Cr in customer purchases, exactly ₹20 Cr remained as profit. That is a 20% Net Profit Margin.',
    },
    try: {
      title: 'The Revenue Trap Challenge',
      prompt: 'Company B increased its Revenue by 50% from Year 1 to Year 2. What happened to its profitability?',
      finHint: 'Look at both the top line (Revenue) and bottom line (Profit) in the report.',
      cards: [
        {
          id: 'card_y1',
          name: 'Year 1 Performance',
          badge: '10% Margin',
          details: [
            { label: 'Revenue', value: '₹100 Cr' },
            { label: 'Profit', value: '₹10 Cr' },
          ],
          isCorrect: false,
          feedback: 'This was the baseline year when the company generated ₹10 Cr profit on ₹100 Cr sales.',
        },
        {
          id: 'card_y2',
          name: 'Year 2 Performance',
          badge: '4% Margin',
          details: [
            { label: 'Revenue', value: '₹150 Cr (+50%)' },
            { label: 'Profit', value: '₹6 Cr (-40%)' },
          ],
          isCorrect: true,
          feedback:
            'Critical insight! Sales jumped +50%, but profit collapsed -40%! The company took on massive new costs (discounts, marketing, waste) that destroyed its bottom line.',
        },
      ],
      finReaction: {
        correct: 'Sensational detection! You spotted the "profitless growth" trap right away.',
        incorrect: 'Look at profit: it went from ₹10 Cr down to ₹6 Cr even though sales rose to ₹150 Cr.',
      },
    },
    decide: {
      title: 'Investigative Decision: Revenue Up, Profit Down',
      finPrompt:
        'You are reviewing Company B. The headlines boast "Sales Up 50%!" but you see Net Profit dropped from ₹10 Cr to ₹6 Cr. What do you investigate first?',
      scenarioCard: {
        company: 'QuickCart Logistics Ltd.',
        stats: [
          { label: 'Revenue Growth', value: '+50%', trend: 'up' },
          { label: 'Net Profit', value: '-40%', trend: 'down' },
          { label: 'Headcount', value: '+85%', trend: 'up' },
        ],
        contextNote: 'The CEO claims market expansion, but operational expenses rose from ₹90 Cr to ₹144 Cr.',
      },
      question: 'What is the first question an astute investor investigates?',
      options: [
        {
          id: 'opt_costs',
          text: 'Why did operating costs surge from ₹90 Cr to ₹144 Cr?',
          isBest: true,
          investorInsight:
            'Spot on! Revenue growth ≠ automatically good business. If costs expand faster than revenue, the business model is leaking value.',
        },
        {
          id: 'opt_logo',
          text: 'The company’s recent brand redesign and social media logo',
          isBest: false,
          investorInsight: 'Branding does not explain where ₹54 crore of additional operating cash evaporated.',
        },
        {
          id: 'opt_ignore',
          text: 'Nothing — sales grew +50%, so the company must be thriving',
          isBest: false,
          investorInsight: 'This is the most common beginner mistake. Growing sales while burning cash leads to dilution or insolvency.',
        },
      ],
      goldenTakeaway: 'Top line is vanity, bottom line is sanity. Always investigate cost behavior.',
    },
    reflect: {
      goldenRuleNumber: 2,
      ruleTitle: 'Revenue Growth ≠ Business Health',
      ruleQuote: 'Sales without profit is an expensive hobby, not an investment.',
      investorMindsetTakeaway:
        'Whenever a company reports surging revenue, immediately check if profits kept pace. If margins shrank, find out why costs exploded.',
      checklistItems: [
        'Calculate Net Profit Margin: Net Profit ÷ Revenue.',
        'Compare Revenue Growth Rate vs Profit Growth Rate.',
        'Never celebrate a 50% revenue gain if profit collapsed.',
      ],
      unlockedBadge: {
        name: 'Margin Forensic',
        icon: '🔍',
        description: 'Detects cost blowouts and verifies operating profitability.',
      },
    },
  },

  // Level 3: Earnings Per Share (EPS)
  node_lvl_3: {
    nodeId: 'node_lvl_3',
    levelNumber: 3,
    title: 'Earnings Per Share (EPS)',
    subtitle: 'Calculate EPS and understand share dilution conceptually',
    estimatedMinutes: 3,
    xpReward: 100,
    learn: {
      finSpeech:
        'A company made ₹100 crore in profit. Sounds impressive! But does that tell you how much YOU earned as a shareholder? Not yet. You need to know how many slices that profit pie was divided into. That is EPS: Earnings Per Share.',
      conceptTitle: 'EPS: Your Share of the Profit Pie',
      conceptHighlight: 'EPS = Net Profit ÷ Total Number of Shares',
      mentalModel: [
        'Total profit belongs to the whole company; EPS belongs to your individual share.',
        'If a company doubles its profit but triples its share count, each shareholder actually gets LESS profit.',
        'This silent shrinkage of your ownership percentage is called "share dilution".',
      ],
      investorQuestion: 'Is management growing the profit per share, or just printing new shares to look bigger?',
    },
    see: {
      title: 'Same Profit, Different Number of Slices',
      finCommentary:
        'Both Company A and Company B generated identical ₹100 crore profits. Watch what happens when we divide that profit among the shares.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'Apex Infotech Ltd.',
        tag: '10 Crore Shares',
        metrics: [
          { label: 'Net Profit', value: '₹100 Cr' },
          { label: 'Total Shares', value: '10 Crore' },
          { label: 'EPS (Profit/Share)', value: '₹10.00 / share', highlight: true },
        ],
        summary: '₹100 Cr profit ÷ 10 Cr shares = ₹10 profit per share.',
      },
      companyB: {
        name: 'Diluted Dynamics Ltd.',
        tag: '20 Crore Shares',
        metrics: [
          { label: 'Net Profit', value: '₹100 Cr' },
          { label: 'Total Shares', value: '20 Crore' },
          { label: 'EPS (Profit/Share)', value: '₹5.00 / share', highlight: true },
        ],
        summary: '₹100 Cr profit ÷ 20 Cr shares = ₹5 profit per share.',
      },
      keyObservation:
        'Because Company B issued twice as many shares, each shareholder only receives half the profit of Company A!',
    },
    try: {
      title: 'Dilution Detection Mini-Game',
      prompt: 'Both companies made ₹100 Cr profit. Which company generated higher profit per individual share?',
      finHint: 'Divide total net profit by the total number of shares.',
      cards: [
        {
          id: 'card_a',
          name: 'Apex Infotech (10 Cr Shares)',
          badge: '₹10 / share',
          details: [
            { label: 'Profit', value: '₹100 Cr' },
            { label: 'EPS', value: '₹10.00' },
          ],
          isCorrect: true,
          feedback:
            'Exactly right! Apex Infotech has ₹10 of earnings backing every single share, double that of Diluted Dynamics.',
        },
        {
          id: 'card_b',
          name: 'Diluted Dynamics (20 Cr Shares)',
          badge: '₹5 / share',
          details: [
            { label: 'Profit', value: '₹100 Cr' },
            { label: 'EPS', value: '₹5.00' },
          ],
          isCorrect: false,
          feedback:
            'Company B has 20 crore shares, so each share only gets ₹5 of earnings. That is the cost of share dilution.',
        },
      ],
      finReaction: {
        correct: 'You nailed it! When profits are divided among fewer shares, each share is worth more.',
        incorrect: 'Think about cutting a cake: dividing the same cake into 20 slices makes each slice smaller than 10.',
      },
    },
    decide: {
      title: 'The Dilution Dilemma',
      finPrompt:
        'Company C made ₹50 Cr profit last year with 5 Cr shares (EPS = ₹10). This year, profit grew +20% to ₹60 Cr, but the board issued 5 Cr new shares (now 10 Cr total). Did existing shareholders benefit?',
      scenarioCard: {
        company: 'Metro Infra Ltd.',
        stats: [
          { label: 'Profit Growth', value: '+20% (₹50 Cr → ₹60 Cr)', trend: 'up' },
          { label: 'Total Shares', value: '+100% (5 Cr → 10 Cr)', trend: 'up' },
          { label: 'New EPS', value: '₹6.00 (down from ₹10.00)', trend: 'down' },
        ],
        contextNote: 'The company issued massive new shares to acquire a competitor.',
      },
      question: 'How did this expansion impact the earning power of each share?',
      options: [
        {
          id: 'opt_diluted',
          text: 'Earnings per share collapsed by 40% (from ₹10 to ₹6) despite profit growth',
          isBest: true,
          investorInsight:
            'Spot on! Profit grew 20%, but share count grew 100%. Total profit was diluted across so many new shares that each existing owner ended up poorer.',
        },
        {
          id: 'opt_great',
          text: 'Existing shareholders became 20% richer because total profit increased',
          isBest: false,
          investorInsight: 'Total profit grew, but your fractional share of that profit shrank from ₹10 to ₹6.',
        },
        {
          id: 'opt_neutral',
          text: 'Share count does not affect investment returns',
          isBest: false,
          investorInsight: 'Share count is the denominator of value. More shares directly dilutes ownership.',
        },
      ],
      goldenTakeaway: 'Always track EPS growth, not just total profit growth. Beware of serial share issuers.',
    },
    reflect: {
      goldenRuleNumber: 3,
      ruleTitle: 'EPS is the True Profit of an Owner',
      ruleQuote: 'If the cake grows by 20% but you invite 100% more people to eat it, your slice gets smaller.',
      investorMindsetTakeaway:
        'Always check the share count trend. Outstanding management protects and reduces share count through buybacks; careless management dilutes shareholders.',
      checklistItems: [
        'Calculate EPS = Net Profit ÷ Total Shares.',
        'Check if share count has increased over the last 3-5 years.',
        'Ensure EPS is growing as fast or faster than total net income.',
      ],
      unlockedBadge: {
        name: 'Dilution Watchdog',
        icon: '🍰',
        description: 'Guards per-share profit and monitors equity dilution.',
      },
    },
  },

  // Level 4: The P/E Multiple
  node_lvl_4: {
    nodeId: 'node_lvl_4',
    levelNumber: 4,
    title: 'The P/E Multiple',
    subtitle: 'What P/E tells you, and why lower P/E isn’t automatically better',
    estimatedMinutes: 4,
    xpReward: 100,
    learn: {
      finSpeech:
        'Imagine two companies. Both make ₹10 profit per share. But investors are willing to pay ₹100 for Company A, and ₹300 for Company B! Why would rational people pay 3× more for the exact same current profit? That is what the P/E ratio reveals.',
      conceptTitle: 'The Valuation Yardstick: P/E Ratio',
      conceptHighlight: 'P/E = Share Price ÷ EPS (What investors pay for ₹1 of earnings)',
      mentalModel: [
        'P/E tells you how many rupees investors pay today for ₹1 of annual earnings.',
        'At 10× P/E, you pay ₹10 for ₹1 of profit. At 30× P/E, you pay ₹30 for ₹1 of profit.',
        'A higher P/E is not automatically bad—it means investors expect the company to grow much faster in the future.',
      ],
      investorQuestion: 'Is this stock expensive because it is great, or cheap because it has broken prospects?',
    },
    see: {
      title: 'Comparing Valuations: Company A vs Company B',
      finCommentary:
        'Both companies earn ₹10 per share. But investors are paying very different prices for their earnings.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'Value Steel Ltd.',
        tag: 'P/E = 10×',
        metrics: [
          { label: 'Share Price', value: '₹100' },
          { label: 'EPS', value: '₹10' },
          { label: 'P/E Multiple', value: '10×', highlight: true },
        ],
        summary: 'Investors pay ₹10 for every ₹1 of profit.',
      },
      companyB: {
        name: 'CloudScale SaaS Ltd.',
        tag: 'P/E = 30×',
        metrics: [
          { label: 'Share Price', value: '₹300' },
          { label: 'EPS', value: '₹10' },
          { label: 'P/E Multiple', value: '30×', highlight: true },
        ],
        summary: 'Investors pay ₹30 for every ₹1 of profit (3× higher multiple).',
      },
      keyObservation:
        'Company B commands a 30× multiple because investors expect its earnings to double or triple soon, whereas Company A is in a slow-growth industry.',
    },
    try: {
      title: 'P/E Valuation Calculation',
      prompt: 'A company’s stock trades at ₹200 and its EPS is ₹10. What is its P/E multiple?',
      finHint: 'P/E = Share Price ÷ EPS. Divide ₹200 by ₹10.',
      cards: [
        {
          id: 'pe_10',
          name: '10× Multiple',
          details: [{ label: 'Price/EPS', value: '₹200 ÷ ₹10' }],
          isCorrect: false,
          feedback: 'Too low! ₹200 divided by ₹10 is 20, not 10.',
        },
        {
          id: 'pe_20',
          name: '20× Multiple',
          badge: 'Correct Formula',
          details: [{ label: 'Price/EPS', value: '₹200 ÷ ₹10 = 20×' }],
          isCorrect: true,
          feedback:
            'Bingo! At ₹200 with ₹10 EPS, the P/E multiple is 20×. Investors pay ₹20 for every ₹1 of annual earnings.',
        },
        {
          id: 'pe_200',
          name: '200× Multiple',
          details: [{ label: 'Price/EPS', value: '₹200 ÷ ₹10' }],
          isCorrect: false,
          feedback: '₹200 is the share price itself, not the ratio to earnings.',
        },
      ],
      finReaction: {
        correct: 'Spot on! You calculated the P/E multiple in seconds.',
        incorrect: 'Remember the formula: Share Price divided by EPS gives the P/E ratio.',
      },
    },
    decide: {
      title: 'Nuance Check: Is Lower P/E Always Better?',
      finPrompt:
        'Now for the big test: Company A has P/E = 10×. Company B has P/E = 30×. Should you automatically buy Company A because it is "cheaper"?',
      scenarioCard: {
        company: 'The Growth Context',
        stats: [
          { label: 'Company A (P/E 10×)', value: 'Profit Growth: 3%', trend: 'neutral' },
          { label: 'Company B (P/E 30×)', value: 'Profit Growth: 30%', trend: 'up' },
          { label: 'Debt Level', value: 'A: High | B: Zero Debt', trend: 'neutral' },
        ],
        contextNote: 'A low P/E often reflects a business with shrinking margins, heavy debt, or technological obsolescence.',
      },
      question: 'Should an investor automatically choose the company with the lower P/E?',
      options: [
        {
          id: 'opt_no',
          text: 'No — a low P/E can be a "Value Trap"; high growth justifies a higher multiple',
          isBest: true,
          investorInsight:
            'Exactly! Investors willingly pay 30× for Company B because its profits are surging 30% per year with zero debt. A low P/E without growth is often cheap for a bad reason.',
        },
        {
          id: 'opt_yes',
          text: 'Yes — always buy the lowest P/E because it is mathematically cheaper',
          isBest: false,
          investorInsight: 'Dangerous trap! Stocks with 8× P/E that lose 20% of their profits every year end up losing you money.',
        },
      ],
      goldenTakeaway: 'P/E measures market expectations. Never judge valuation in a vacuum without growth and balance sheet context.',
    },
    reflect: {
      goldenRuleNumber: 4,
      ruleTitle: 'P/E Measures Expectations, Not Quality',
      ruleQuote: 'A cheap stock can get cheaper if its business is dying. Context is king.',
      investorMindsetTakeaway:
        'Use P/E to understand what the market expects from a company. High P/E demands flawless execution; low P/E requires you to check for hidden traps.',
      checklistItems: [
        'Calculate P/E = Share Price ÷ EPS.',
        'Compare P/E against the company’s expected earnings growth rate (PEG ratio).',
        'Ask why the market assigned this multiple before making an investment thesis.',
      ],
      unlockedBadge: {
        name: 'Valuation Decoder',
        icon: '📐',
        description: 'Understands pricing multiples and avoids classic value traps.',
      },
    },
  },

  // Level 5: Compare Companies
  node_lvl_5: {
    nodeId: 'node_lvl_5',
    levelNumber: 5,
    title: 'Compare Companies',
    subtitle: 'Good company ≠ automatically good price',
    estimatedMinutes: 3,
    xpReward: 100,
    learn: {
      finSpeech:
        'Here is the hardest mental shift for new investors: a wonderful company can be a terrible investment if you overpay! And an average company at a bargain price can make you a fortune. We must learn to weigh business quality against price paid.',
      conceptTitle: 'The Great Investor Dichotomy',
      conceptHighlight: 'Great Business + Overpriced Valuation = Poor Long-Term Return',
      mentalModel: [
        'Business performance is how the company does in the real economy.',
        'Investment return is how the stock does relative to the valuation you paid.',
        'When market expectations are too high, even great results cause stock price crashes.',
      ],
      investorQuestion: 'How much future perfection is already baked into this stock price?',
    },
    see: {
      title: 'The Face-Off: Sluggish Value vs Priced for Perfection',
      finCommentary:
        'Look at Company A and Company B. One is growing steadily at an affordable valuation; the other is growing fast but priced at a premium.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'Legacy Cement Ltd.',
        tag: 'Modest & Cheap',
        metrics: [
          { label: 'Revenue Growth', value: '5%' },
          { label: 'Profit Growth', value: '4%' },
          { label: 'P/E Valuation', value: '15×', highlight: true },
        ],
        summary: 'Stable cash flows, but limited growth prospects.',
      },
      companyB: {
        name: 'HyperEV Tech Ltd.',
        tag: 'Rapid & Expensive',
        metrics: [
          { label: 'Revenue Growth', value: '25%' },
          { label: 'Profit Growth', value: '30%' },
          { label: 'P/E Valuation', value: '35×', highlight: true },
        ],
        summary: 'Explosive growth, but priced at more than double the multiple.',
      },
      keyObservation:
        'Company B is growing 6× faster than Company A, but you have to pay 35× earnings for it. If growth slows to 15%, the stock price could crater.',
    },
    try: {
      title: 'Compare the Profiles',
      prompt: 'Which statement is the most analytically sound comparison between the two companies?',
      finHint: 'Consider both operating performance and the valuation multiple demanded.',
      cards: [
        {
          id: 'comp_c',
          name: 'Balanced Synthesis',
          badge: 'Analyst View',
          details: [
            { label: 'Strength', value: 'Company B has 6× faster growth' },
            { label: 'Risk', value: 'Valued at 35× P/E (more than 2× multiple)' },
          ],
          isCorrect: true,
          feedback:
            'Exactly! An analyst acknowledges Company B’s superior operational engine while recognizing the valuation risk. Good company ≠ automatically good price.',
        },
        {
          id: 'comp_b',
          name: 'Company B is Definitely Better',
          badge: 'Rookie Trap',
          details: [
            { label: 'View', value: 'Only look at 30% profit growth' },
            { label: 'Flaw', value: 'Completely ignores 35× P/E multiple' },
          ],
          isCorrect: false,
          feedback:
            'Overpaying for growth is how bull market investors lose 50% when growth normalizes.',
        },
      ],
      finReaction: {
        correct: 'Superb! You are thinking like an investigative fund manager now.',
        incorrect: 'Never look at growth in isolation. The price you pay determines your margin of safety.',
      },
    },
    decide: {
      title: 'Investigative Next Step',
      finPrompt:
        'You are looking at Company X with 25% revenue growth, 30% profit growth, low debt, but a 45× P/E. What would you investigate next?',
      scenarioCard: {
        company: 'AeroGlide Avionics',
        stats: [
          { label: 'Revenue Growth', value: '25%', trend: 'up' },
          { label: 'Profit Growth', value: '30%', trend: 'up' },
          { label: 'P/E Multiple', value: '45×', trend: 'up' },
          { label: 'Debt', value: 'Low', trend: 'neutral' },
        ],
        contextNote: 'At 45× P/E, any unexpected deceleration in industry orders will compress the multiple.',
      },
      question: 'What is the most critical question to investigate next?',
      options: [
        {
          id: 'opt_runway',
          text: 'Can the industry and company sustain 25-30% growth for the next 3-5 years to justify 45× P/E?',
          isBest: true,
          investorInsight:
            'Spot on! A 45× P/E requires multi-year hyper-growth. If the total addressable market saturates in 1 year, the stock is vulnerable to severe multiple compression.',
        },
        {
          id: 'opt_buy',
          text: 'Nothing — high growth means you should buy immediately at any price',
          isBest: false,
          investorInsight: 'Buying at any price without checking the runway is speculative gambling.',
        },
      ],
      goldenTakeaway: 'High valuation requires an exceptionally long growth runway. Always verify sustainability.',
    },
    reflect: {
      goldenRuleNumber: 5,
      ruleTitle: 'Good Company ≠ Good Price',
      ruleQuote: 'Investment success is not buying good things, but buying things well. — Howard Marks',
      investorMindsetTakeaway:
        'Separate business appraisal from stock appraisal. A great business purchased at an absurd multiple will generate mediocre returns.',
      checklistItems: [
        'Check if current growth rate can be sustained for 3-5 years.',
        'Calculate what happens if P/E compresses from 45× to 25×.',
        'Ensure the business has pricing power to defend high returns.',
      ],
      unlockedBadge: {
        name: 'Growth vs Price Synthesizer',
        icon: '⚖️',
        description: 'Balances operational quality against valuation multiple.',
      },
    },
  },

  // Level 6: Why Debt Matters
  node_lvl_6: {
    nodeId: 'node_lvl_6',
    levelNumber: 6,
    title: 'Why Debt Matters',
    subtitle: 'Interest obligations and investigating high debt with falling profit',
    estimatedMinutes: 3,
    xpReward: 100,
    learn: {
      finSpeech:
        'Profits are what you hope to earn. Debt is what you MUST pay. Banks don’t care if you had poor sales or a supply chain problem—interest payments are legally mandatory every month. High debt turns minor business hiccups into corporate bankruptcies.',
      conceptTitle: 'The Solvency Anchor: Debt & Interest',
      conceptHighlight: 'Operating Profit − Mandatory Debt Interest = Solvency Buffer',
      mentalModel: [
        'Debt is fixed overhead. In good years, it boosts returns; in bad years, it suffocates cash.',
        'Interest coverage measures how many times operating profit covers loan interest.',
        'When revenue falls and debt rises, a dangerous solvency spiral begins.',
      ],
      investorQuestion: 'If sales drop 20% in an economic recession, can this company still service its debt?',
    },
    see: {
      title: 'Stress Test: Who Survives a Downturn?',
      finCommentary:
        'Both companies earn ₹100 crore in operating profit today. But look what happens when a recession cuts profit by 40%!',
      visualType: 'cards-comparison',
      companyA: {
        name: 'Prudent Metals Ltd.',
        tag: '₹10 Cr Debt (Safe)',
        metrics: [
          { label: 'Normal Operating Profit', value: '₹100 Cr' },
          { label: 'Interest Due (10%)', value: '₹1 Cr' },
          { label: 'Recession Profit (Drop 40%)', value: '₹60 Cr' },
          { label: 'Cash Remaining After Interest', value: '₹59 Cr (Healthy)', highlight: true },
        ],
        summary: 'Debt is tiny. Company cruises through the downturn effortlessly.',
      },
      companyB: {
        name: 'Overleveraged Forge Ltd.',
        tag: '₹500 Cr Debt (Vulnerable)',
        metrics: [
          { label: 'Normal Operating Profit', value: '₹100 Cr' },
          { label: 'Interest Due (10%)', value: '₹50 Cr' },
          { label: 'Recession Profit (Drop 40%)', value: '₹60 Cr' },
          { label: 'Cash Remaining After Interest', value: '₹10 Cr (Danger)', highlight: true },
        ],
        summary: 'Interest consumes almost all cash! Any further drop triggers loan default.',
      },
      keyObservation:
        'Company B pays ₹50 Cr every year just to service debt. In a downturn, its shareholder profits are wiped out by 90%!',
    },
    try: {
      title: 'Debt Burden Detection',
      prompt: 'Why should an investor investigate Company B’s ₹500 crore debt much more closely?',
      finHint: 'Consider what mandatory payments must be made regardless of sales performance.',
      cards: [
        {
          id: 'card_obligations',
          name: 'Mandatory Interest & Repayment Obligations',
          badge: 'Financial Risk',
          details: [
            { label: 'Interest Cost', value: '₹50 Cr / year' },
            { label: 'Risk', value: 'Cannot be delayed or negotiated down' },
          ],
          isCorrect: true,
          feedback:
            'Exactly! Debt creates fixed interest outflows that eat operating profits and amplify bankruptcy risk in cyclical downswings.',
        },
        {
          id: 'card_guarantee',
          name: 'Debt Automatically Guarantees Bankruptcy',
          badge: 'Imprecise',
          details: [
            { label: 'Claim', value: 'Any debt means imminent failure' },
            { label: 'Flaw', value: 'Companies can manage debt if cash flow is steady' },
          ],
          isCorrect: false,
          feedback:
            'Debt doesn’t guarantee bankruptcy—utilities carry debt safely. But it creates fragile interest obligations that demand scrutiny.',
        },
      ],
      finReaction: {
        correct: 'Spot on! You understand the balance sheet vulnerability created by debt obligations.',
        incorrect: 'Think about bank loans: you must pay interest every month regardless of profit.',
      },
    },
    decide: {
      title: 'The Danger Signal: Revenue ↑, Profit ↓, Debt ↑',
      finPrompt:
        'You review a quarterly filing and spot this pattern: Revenue is rising, Profit is falling, and Debt is climbing rapidly. What is the correct investor response?',
      scenarioCard: {
        company: 'Vortex Consumer Goods',
        stats: [
          { label: 'Revenue Trend', value: 'Rising (+15%)', trend: 'up' },
          { label: 'Profit Trend', value: 'Falling (-30%)', trend: 'down' },
          { label: 'Total Debt', value: 'Surging (+65%)', trend: 'up' },
        ],
        contextNote: 'The company is borrowing money to fund discounting and subsidize unprofitable sales volume.',
      },
      question: 'What should an analytical investor do?',
      options: [
        {
          id: 'opt_investigate',
          text: 'Investigate why costs are rising and why borrowing is accelerating to fund operations',
          isBest: true,
          investorInsight:
            'Bullseye! We do not jump to emotional BUY or SELL calls. We investigate the forensic mechanics: is the company burning borrowed money to prop up revenue?',
        },
        {
          id: 'opt_buy_dip',
          text: 'Immediately buy the stock because revenue is growing and sales are high',
          isBest: false,
          investorInsight: 'Disastrous trap! Buying into a debt-fueled margin collapse is how capital is permanently lost.',
        },
      ],
      goldenTakeaway: 'When revenue rises but profits fall and debt climbs, the business is leaking cash and borrowing to survive.',
    },
    reflect: {
      goldenRuleNumber: 6,
      ruleTitle: 'Debt is the Accelerant of Ruin',
      ruleQuote: 'More companies fail from excessive debt in tough times than from competition. Check interest coverage.',
      investorMindsetTakeaway:
        'Always check the Balance Sheet before falling in love with the Income Statement. Look for low debt or high cash reserves to survive any storm.',
      checklistItems: [
        'Check Debt-to-Equity ratio (ideally < 1.0 for non-financials).',
        'Calculate Interest Coverage: Operating Profit ÷ Interest Expense (> 4× preferred).',
        'Watch for rising debt accompanied by declining operating margins.',
      ],
      unlockedBadge: {
        name: 'Solvency Inspector',
        icon: '🛡️',
        description: 'Analyzes debt serviceability and protects capital against leverage traps.',
      },
    },
  },

  // Level 7: Return on Equity (ROE)
  node_lvl_7: {
    nodeId: 'node_lvl_7',
    levelNumber: 7,
    title: 'Return on Equity (ROE)',
    subtitle: 'Capital efficiency, metric interpretation, and business context',
    estimatedMinutes: 3,
    xpReward: 100,
    learn: {
      finSpeech:
        'Anyone can make ₹10 crore if given ₹1,000 crore of capital! But what if someone makes ₹10 crore with just ₹40 crore of shareholder capital? That is the difference between a sluggish dinosaur and a capital-efficient compounding machine. That is ROE: Return on Equity.',
      conceptTitle: 'Capital Efficiency: ROE',
      conceptHighlight: 'ROE = Net Profit ÷ Shareholders’ Equity (Profit earned per ₹1 of equity)',
      mentalModel: [
        'ROE measures how efficiently management converts shareholder capital into new profits.',
        'An ROE of 20% means every ₹100 of retained equity generates ₹20 in annual profit.',
        'High ROE allows a company to self-fund expansion without taking on risky loans or issuing new shares.',
      ],
      investorQuestion: 'Is management generating high returns from operational excellence or through dangerous financial leverage?',
    },
    see: {
      title: 'Capital Efficiency Comparison',
      finCommentary:
        'Both companies have ₹100 crore in shareholder equity on their balance sheet. Watch how much profit each extracts from that capital base.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'Heavy Asset Industrial Ltd.',
        tag: 'ROE = 8%',
        metrics: [
          { label: 'Shareholders’ Equity', value: '₹100 Cr' },
          { label: 'Net Annual Profit', value: '₹8 Cr' },
          { label: 'ROE Efficiency', value: '8%', highlight: true },
        ],
        summary: 'Generates ₹8 for every ₹100 of invested equity. Struggles to beat bank inflation.',
      },
      companyB: {
        name: 'Asset-Light Pharma Ltd.',
        tag: 'ROE = 22%',
        metrics: [
          { label: 'Shareholders’ Equity', value: '₹100 Cr' },
          { label: 'Net Annual Profit', value: '₹22 Cr' },
          { label: 'ROE Efficiency', value: '22%', highlight: true },
        ],
        summary: 'Generates ₹22 for every ₹100 of invested equity. Compounds wealth almost 3× faster!',
      },
      keyObservation:
        'Company B generates nearly 3× more profit from the same rupee of equity. Over 10 years, this difference leads to massive compounding divergence.',
    },
    try: {
      title: 'Interpreting ROE',
      prompt: 'Company A has ROE = 8%, while Company B has ROE = 22%. What is the most appropriate analytical conclusion?',
      finHint: 'Remember our golden principle: Metric → Interpretation → Context.',
      cards: [
        {
          id: 'card_context',
          name: 'Higher Return on Equity, but Context is Needed',
          badge: 'Disciplined Analyst',
          details: [
            { label: 'Observation', value: 'Company B generates superior returns on capital' },
            { label: 'Next Step', value: 'Verify whether high ROE is from pricing power or high debt' },
          ],
          isCorrect: true,
          feedback:
            'Masterful! While 22% is much stronger than 8%, a great analyst checks whether Company B used high debt to artificially inflate its ROE (DuPont analysis).',
        },
        {
          id: 'card_auto',
          name: 'Company B is Automatically a Guaranteed Buy',
          badge: 'Superficial View',
          details: [
            { label: 'Claim', value: 'Higher ROE guarantees stock gains' },
            { label: 'Flaw', value: 'Ignores valuation, debt, and sustainability' },
          ],
          isCorrect: false,
          feedback: 'Never buy on a single ratio! A 22% ROE driven by 90% debt is dangerous.',
        },
      ],
      finReaction: {
        correct: 'Metric → Interpretation → Context! You have internalized the forensic framework.',
        incorrect: 'Remember: A high ratio points the way, but context confirms the safety of the business.',
      },
    },
    decide: {
      title: 'The Leverage Trap in ROE',
      finPrompt:
        'You inspect two companies with 25% ROE. Company X has zero debt. Company Y has ₹800 Cr of debt. How do you evaluate them?',
      scenarioCard: {
        company: 'DuPont Breakdown',
        stats: [
          { label: 'Company X ROE', value: '25% (Zero Debt, High Margins)', trend: 'up' },
          { label: 'Company Y ROE', value: '25% (Huge Debt, Razor Margins)', trend: 'neutral' },
          { label: 'Fragility Risk', value: 'Y is highly vulnerable to interest spikes', trend: 'down' },
        ],
        contextNote: 'Debt artificially shrinks equity in the denominator, boosting ROE without real operational excellence.',
      },
      question: 'Which company has higher quality capital efficiency?',
      options: [
        {
          id: 'opt_x',
          text: 'Company X — its ROE comes from genuine operating margins and pricing power, not debt',
          isBest: true,
          investorInsight:
            'Exactly! High ROE with zero debt is the holy grail of investing. High ROE funded by massive borrowing is a house of cards.',
        },
        {
          id: 'opt_same',
          text: 'Both are identical because both have a 25% ROE number',
          isBest: false,
          investorInsight: 'Surface numbers can mislead. Always inspect how the ROE was manufactured.',
        },
      ],
      goldenTakeaway: 'High ROE + Low Debt = Compounding Moat. High ROE + High Debt = Leveraged Risk.',
    },
    reflect: {
      goldenRuleNumber: 7,
      ruleTitle: 'ROE Measures Quality of Capital Allocation',
      ruleQuote: 'Time is the friend of the wonderful business, the enemy of the mediocre. — Warren Buffett',
      investorMindsetTakeaway:
        'Compounders require high returns on equity with low financial debt. This allows management to reinvest profits year after year at stellar rates.',
      checklistItems: [
        'Seek companies with sustained ROE > 15-20% across 5+ years.',
        'Verify that ROE is driven by operating profit margins, not high debt.',
        'Compare ROE against the company’s cost of capital.',
      ],
      unlockedBadge: {
        name: 'Capital Allocator',
        icon: '💎',
        description: 'Evaluates corporate return on equity and uncovers leverage-boosted returns.',
      },
    },
  },

  // Level 8: Dividends & Reinvestment
  node_lvl_8: {
    nodeId: 'node_lvl_8',
    levelNumber: 8,
    title: 'Dividends & Reinvestment',
    subtitle: 'Cash payouts vs compounding through expansion',
    estimatedMinutes: 3,
    xpReward: 100,
    learn: {
      finSpeech:
        'A company earned ₹50 crore in cash profit. Now the board faces a fundamental fork in the road: should they send that money directly to your bank account as a dividend, or reinvest it to build new factories? The answer determines your wealth.',
      conceptTitle: 'Dividends vs Reinvestment',
      conceptHighlight: 'Distribute Cash (Dividend) OR Reinvest for Future Growth (Compounding)',
      mentalModel: [
        'A dividend is cash distributed from net profits directly to shareholders.',
        'Reinvestment means keeping profits inside the business to open more stores or build technology.',
        'If a company can earn 25% on reinvested capital, you want them to keep every rupee!',
      ],
      investorQuestion: 'Is this company paying high dividends because it cares for owners, or because it has run out of ideas to grow?',
    },
    see: {
      title: 'The Compounding Fork in the Road',
      finCommentary:
        'Watch what happens to ₹100 crore in profits over 5 years under two different capital allocation strategies.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'Mature Utility Co.',
        tag: 'High Dividend (8% Yield)',
        metrics: [
          { label: 'Dividend Payout', value: '90% of Profit' },
          { label: 'Annual Cash to You', value: 'Immediate Cash Flow' },
          { label: '5-Year Growth', value: '1% per year' },
        ],
        summary: 'Great for retired investors needing monthly cash, but creates little capital appreciation.',
      },
      companyB: {
        name: 'Growth Compounding Ltd.',
        tag: 'Zero Dividend (25% ROIC)',
        metrics: [
          { label: 'Dividend Payout', value: '0% (All Reinvested)' },
          { label: 'Return on Reinvestment', value: '25% per year' },
          { label: '5-Year Business Value', value: 'Compounded > 3×', highlight: true },
        ],
        summary: 'Reinvests all profit into opening new profitable locations, creating massive wealth over time.',
      },
      keyObservation:
        'A high dividend isn’t automatically superior! If a business has a 25% return runway, reinvesting beats cash payouts every single time.',
    },
    try: {
      title: 'Dividend Wisdom Check',
      prompt: 'Company A pays a 7% dividend yield. Company B pays 0% dividend and reinvests everything. Which is automatically the better investment?',
      finHint: 'Think about capital allocation and what return the company earns on reinvested profits.',
      cards: [
        {
          id: 'div_context',
          name: 'Neither is Automatically Better; It Depends on Returns & Runway',
          badge: 'Nuanced Insight',
          details: [
            { label: 'Company A', value: 'Good if business has zero high-return projects' },
            { label: 'Company B', value: 'Great if business earns high ROIC on reinvestment' },
          ],
          isCorrect: true,
          feedback:
            'Superb! Mature utilities should pay dividends. But high-return compounders (like Titan or Asian Paints in their prime) create 100× more wealth by reinvesting cash into growth.',
        },
        {
          id: 'div_a',
          name: 'Company A is Definitely Better Because Cash is Instant',
          badge: 'Income Bias',
          details: [
            { label: 'Flaw', value: 'High dividends often mask dying businesses' },
          ],
          isCorrect: false,
          feedback:
            'A high dividend from a shrinking business is just returning your own capital before bankruptcy.',
        },
      ],
      finReaction: {
        correct: 'You see through the retail dividend trap! Capital allocation quality is what matters.',
        incorrect: 'Never judge a company by its dividend yield alone. Check where cash creates the most value.',
      },
    },
    decide: {
      title: 'The Dividend Trap Case',
      finPrompt:
        'Company Z pays an attractive 9% dividend yield. But you look at the financials and discover revenue has dropped for 4 consecutive years and debt has doubled. What is happening?',
      scenarioCard: {
        company: 'Stagnant Power & Coal',
        stats: [
          { label: 'Dividend Yield', value: '9.2%', trend: 'up' },
          { label: '4-Year Sales Growth', value: '-18%', trend: 'down' },
          { label: 'Debt Load', value: '+75%', trend: 'up' },
        ],
        contextNote: 'The company is borrowing money to sustain its dividend and appease retail shareholders.',
      },
      question: 'What is the true health of this high dividend?',
      options: [
        {
          id: 'opt_untenable',
          text: 'The dividend is unsustainable and funded by borrowing; a steep dividend cut is imminent',
          isBest: true,
          investorInsight:
            'Bullseye! This is a textbook "Dividend Trap". The high yield attracted retail investors while the underlying business deteriorated. When the dividend is cut, the stock plunges.',
        },
        {
          id: 'opt_safe',
          text: 'It is a high-yield defensive powerhouse that protects your savings',
          isBest: false,
          investorInsight: 'Borrowing to pay dividends is unsustainable financial engineering.',
        },
      ],
      goldenTakeaway: 'Always check if dividends are covered by real operating cash flows, not debt.',
    },
    reflect: {
      goldenRuleNumber: 8,
      ruleTitle: 'Dividends are Cash, Compounding is Wealth',
      ruleQuote: 'The best dividend is a dollar kept by management and compounded at 20% for 20 years.',
      investorMindsetTakeaway:
        'Understand where a company is in its lifecycle. High growth requires reinvestment; mature cash cows should return capital.',
      checklistItems: [
        'Check Dividend Payout Ratio: Dividends ÷ Net Profit (< 50% is healthier for growth).',
        'Verify Dividend Coverage from Free Cash Flow.',
        'Never buy a stock solely for its high dividend yield.',
      ],
      unlockedBadge: {
        name: 'Capital Compounder',
        icon: '📈',
        description: 'Discriminates between dividend traps and high-return reinvestment engines.',
      },
    },
  },

  // Level 9: Stock Price vs Business
  node_lvl_9: {
    nodeId: 'node_lvl_9',
    levelNumber: 9,
    title: 'Stock Price vs Business',
    subtitle: 'Why good earnings can still cause a stock to drop 10%',
    estimatedMinutes: 3,
    xpReward: 100,
    learn: {
      finSpeech:
        'Here is an experience that bewilders every beginner: Company X announces record profits (+25%), and the next morning the stock collapses -10%! Did the market go crazy? No. The stock market does not trade on what happened; it trades on what was EXPECTED.',
      conceptTitle: 'The Expectations Gap',
      conceptHighlight: 'Stock Price Reaction = Actual Results − Market Expectations',
      mentalModel: [
        'The stock price already reflects what everyone expects to happen.',
        'If the market priced in +40% hyper-growth at a 60× P/E multiple, a +25% result is an earnings disappointment!',
        'In the short term, markets are voting machines driven by sentiment; in the long term, they are weighing machines driven by cash flows.',
      ],
      investorQuestion: 'What expectations were already priced into this stock before the results were announced?',
    },
    see: {
      title: 'The Expectations Gap in Action',
      finCommentary:
        'See why Company X crashed despite reporting 25% profit growth.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'The Market’s High Hopes',
        tag: 'Priced for Perfection (60× P/E)',
        metrics: [
          { label: 'P/E Valuation Multiple', value: '60×' },
          { label: 'Priced-In Growth Expectation', value: '+40% YoY' },
          { label: 'Analyst Consensus', value: 'Stellar Beat Required' },
        ],
        summary: 'At 60× P/E, investors were paying an extreme premium assuming exponential growth.',
      },
      companyB: {
        name: 'The Actual Reported Reality',
        tag: 'Healthy but Below Hopes',
        metrics: [
          { label: 'Reported Profit Growth', value: '+25%' },
          { label: 'Expectations Miss', value: '-15% Gap', highlight: true },
          { label: 'Stock Price Outcome', value: 'Plunged -10%', highlight: true },
        ],
        summary: '25% growth is great for a normal business, but failed to justify a 60× multiple.',
      },
      keyObservation:
        'The stock fell not because the business was bad, but because it was priced for 40% growth and delivered 25%. Expectations determine short-term price moves.',
    },
    try: {
      title: 'The Earnings Day Reaction Test',
      prompt: 'Company X reports Revenue +20% and Profit +25%, but its stock falls 10% on earnings day. What should an investor conclude?',
      finHint: 'Think about valuation multiples and market expectations.',
      cards: [
        {
          id: 'card_expectations',
          name: 'Investigate Expectations, Valuation Multiple & Guidance',
          badge: 'Mature Analyst',
          details: [
            { label: 'Hypothesis', value: 'Results trailed high market expectations' },
            { label: 'Next Step', value: 'Check management commentary and valuation multiples' },
          ],
          isCorrect: true,
          feedback:
            'Spot on! Good business results don’t guarantee immediate price jumps if the market priced in perfection. Always evaluate results against expectations.',
        },
        {
          id: 'card_bad',
          name: 'The Company is Broken & Should be Dumped',
          badge: 'Emotional Reaction',
          details: [
            { label: 'Flaw', value: 'A company growing profits 25% is not broken' },
          ],
          isCorrect: false,
          feedback: '25% profit growth is objectively strong operating performance.',
        },
      ],
      finReaction: {
        correct: 'Bullseye! You now understand why stocks rise on "bad" news and fall on "good" news.',
        incorrect: 'Look at the expectations gap: what did investors assume when bidding the stock up?',
      },
    },
    decide: {
      title: 'The Short-Term Sentiment Dilemma',
      finPrompt:
        'A high-quality company with 20% ROE and low debt drops 15% because a temporary supply delay caused quarterly revenue to grow 12% instead of the expected 18%. The CEO explains normal delivery resumes next quarter. What does an investor do?',
      scenarioCard: {
        company: 'Nova Precision Components',
        stats: [
          { label: 'Quarterly Growth', value: '+12% (Expected +18%)', trend: 'down' },
          { label: 'Stock Price Drop', value: '-15% in 2 days', trend: 'down' },
          { label: 'Long-Term Moat', value: 'Intact, high client retention', trend: 'up' },
        ],
        contextNote: 'Short-term momentum traders flee when quarterly guidance misses, creating opportunities for fundamental investors.',
      },
      question: 'How does an investor evaluate this temporary divergence?',
      options: [
        {
          id: 'opt_opportunity',
          text: 'Evaluate if the long-term compounding moat is intact; short-term overreaction can offer a margin of safety',
          isBest: true,
          investorInsight:
            'Exactly! Benjamin Graham taught: in the short run the market is a voting machine, in the long run it is a weighing machine. Temporary misses often create the best buying prices.',
        },
        {
          id: 'opt_panic',
          text: 'Panic and sell because momentum traders are exiting',
          isBest: false,
          investorInsight: 'Trading on short-term fear is the opposite of fundamental investing.',
        },
      ],
      goldenTakeaway: 'Differentiate between temporary operational delays and permanent impairment of the business moat.',
    },
    reflect: {
      goldenRuleNumber: 9,
      ruleTitle: 'Expectations Rule the Short Term, Cash Rules the Long Term',
      ruleQuote: 'In the short run the market is a voting machine, but in the long run it is a weighing machine. — Benjamin Graham',
      investorMindsetTakeaway:
        'Never buy right before earnings expecting an automatic bump. Understand what the market is pricing in, and use emotional market dips to your advantage.',
      checklistItems: [
        'Check consensus expectations before judging an earnings release.',
        'Ask: "Is this quarterly slowdown temporary or structural?"',
        'Remember that valuation multiple compression causes the sharpest earnings drops.',
      ],
      unlockedBadge: {
        name: 'Expectations Sleuth',
        icon: '🎯',
        description: 'Decodes market expectations and exploits short-term sentiment overreactions.',
      },
    },
  },

  // Level 10: Cash Flow vs Accounting Profit
  node_lvl_10: {
    nodeId: 'node_lvl_10',
    levelNumber: 10,
    title: 'Cash Flow vs Accounting Profit',
    subtitle: 'Cash is reality: Spotting the receivables trap',
    estimatedMinutes: 4,
    xpReward: 100,
    learn: {
      finSpeech:
        'Profit is an accounting opinion. Cash in the bank is a hard, cold fact! A company can record ₹100 crore in "sales" on credit, but if customers never pay their invoices, the company can’t pay its suppliers or electricity bill. This is where corporate frauds and collapses hide.',
      conceptTitle: 'Cash Flow: The Lifeblood of Business',
      conceptHighlight: 'Operating Cash Flow (OCF) vs Reported Net Profit',
      mentalModel: [
        'Accrual accounting books revenue when goods are shipped, NOT when cash is collected.',
        'If Net Profit is rising but Cash from Operations is falling or negative, danger is brewing.',
        'Uncollected sales pile up as "Trade Receivables"—a prime sign of aggressive channel stuffing.',
      ],
      investorQuestion: 'Did the profits turn into real bank balances, or are they trapped in unpaid customer bills?',
    },
    see: {
      title: 'The Cash Divergence Red Flag',
      finCommentary:
        'Watch this real-world accounting divergence. Notice how paper profits keep climbing while actual bank cash goes negative!',
      visualType: 'cards-comparison',
      companyA: {
        name: 'The Reported Income Statement',
        tag: 'Looks Fantastic on Paper',
        metrics: [
          { label: 'Year 1 Net Profit', value: '₹20 Cr' },
          { label: 'Year 2 Net Profit', value: '₹35 Cr' },
          { label: 'Year 3 Net Profit', value: '₹55 Cr (+175%)', highlight: true },
        ],
        summary: 'Reported profit grew almost 3×! Retail headlines are singing praises.',
      },
      companyB: {
        name: 'The Cash Flow Reality',
        tag: 'Draining the Bank Account',
        metrics: [
          { label: 'Operating Cash Flow', value: '-₹15 Cr (Negative!)', highlight: true },
          { label: 'Trade Receivables (Unpaid)', value: 'Surged to ₹180 Cr', highlight: true },
          { label: 'Short-Term Bank Debt', value: 'Rose from ₹10 Cr → ₹95 Cr', highlight: true },
        ],
        summary: 'Customers aren’t paying! The company is taking bank loans just to pay staff.',
      },
      keyObservation:
        'While reported profit reached ₹55 Cr, operating cash flow was -₹15 Cr. The company had to borrow ₹95 Cr to survive. This is an impending crisis.',
    },
    try: {
      title: 'Spot the Accounting Divergence',
      prompt: 'You discover Apex HyperGrowth has 35% profit growth, low debt, but its P/E is 55× and Operating Cash Flow is lagging. Which metric demands your immediate forensic investigation?',
      finHint: 'Look for the metric that carries the highest risk of disappointment or fragility.',
      cards: [
        {
          id: 'card_pe',
          name: 'P/E Valuation Multiple (55×) & Cash Conversion',
          badge: 'Critical Vulnerability',
          details: [
            { label: 'P/E Multiple', value: '55× (Extremely High)' },
            { label: 'Risk', value: 'Priced for perfection; any cash stall crashes the price' },
          ],
          isCorrect: true,
          feedback:
            'Bullseye! At 55× P/E, perfection is priced in. If operating cash flow does not match reported profits, the market will harshly de-rate the multiple from 55× down to 25×.',
        },
        {
          id: 'card_rev',
          name: 'Revenue Growth (30%)',
          badge: 'Safe Surface',
          details: [
            { label: 'Revenue Growth', value: '30%' },
            { label: 'Note', value: 'Already healthy on surface' },
          ],
          isCorrect: false,
          feedback: '30% revenue growth is unambiguous. The vulnerability lies in the high multiple and cash realization.',
        },
      ],
      finReaction: {
        correct: 'Forensic mastery! You zeroed in on the valuation vulnerability holding the whole story together.',
        incorrect: 'Look at the valuation: when a stock trades at 55× P/E, it has zero room for accounting discrepancies.',
      },
    },
    decide: {
      title: 'The Receivables Trap',
      finPrompt:
        'A manufacturing company reports 30% profit growth for 3 consecutive years. But Trade Receivables (unpaid bills) rose 250%, and Cash Flow from Operations has been negative for 2 years. What is the most likely reality?',
      scenarioCard: {
        company: 'SolarGlow Systems Ltd.',
        stats: [
          { label: '3-Year Profit Growth', value: '+30% / year', trend: 'up' },
          { label: 'Trade Receivables', value: '+250% (₹220 Cr unpaid)', trend: 'up' },
          { label: 'Operating Cash Flow', value: '-₹28 Cr (Negative)', trend: 'down' },
        ],
        contextNote: 'The company is stuffing distributor channels with unsold solar panels to book paper revenue.',
      },
      question: 'What is happening inside this business?',
      options: [
        {
          id: 'opt_stuffing',
          text: 'Channel stuffing or non-paying clients; reported profits are phantom and bad debt write-offs are coming',
          isBest: true,
          investorInsight:
            'Exactly! When receivables outpace revenue and cash flow is negative, the company is booking sales that will likely never be collected. A massive write-off and crash usually follows.',
        },
        {
          id: 'opt_normal',
          text: 'Completely normal growth; cash flow does not matter as long as profit is positive',
          isBest: false,
          investorInsight: 'Cash flow is the only thing that pays bills. Ignoring negative cash flow is fatal.',
        },
      ],
      goldenTakeaway: 'If profit is positive but operating cash flow is persistently negative, run away.',
    },
    reflect: {
      goldenRuleNumber: 10,
      ruleTitle: 'Cash Flow is the Ultimate Truth',
      ruleQuote: 'Revenue is vanity, profit is sanity, but cash is reality.',
      investorMindsetTakeaway:
        'Always check the Cash Flow Statement. Operating Cash Flow should ideally equal or exceed Net Profit over a 3-year rolling period.',
      checklistItems: [
        'Compare Operating Cash Flow (OCF) vs Net Profit.',
        'Track Days Sales Outstanding (DSO) or Trade Receivables growth vs Sales growth.',
        'Beware of companies borrowing money while reporting "record profits".',
      ],
      unlockedBadge: {
        name: 'Cash Flow Detective',
        icon: '💵',
        description: 'Verifies cash realization and spots dangerous receivables inflation.',
      },
    },
  },

  // Level 11: What to Investigate Next
  node_lvl_11: {
    nodeId: 'node_lvl_11',
    levelNumber: 11,
    title: 'Build an Investment Thesis',
    subtitle: 'Nova Motors: Stop direct quiz questions and synthesize evidence',
    estimatedMinutes: 4,
    xpReward: 150,
    learn: {
      finSpeech:
        'You have graduated from single quiz definitions! Now you face the true calling of an investor: synthesizing multiple clues into an overarching Investment Thesis. We don’t ask "Is this a buy or sell?" We ask: "What does the evidence say, and what is the primary risk?"',
      conceptTitle: 'The 3-Point Investment Thesis',
      conceptHighlight: 'Operational Moat + Financial Health − Key Vulnerability = Analytical Thesis',
      mentalModel: [
        'An investment thesis is a structured argument explaining why a company will compound value.',
        'Every thesis must identify its single biggest failure point (the "kill switch").',
        'Instead of binary BUY/SELL impulses, great investors maintain probabilistic stances: 🟢 Stronger, 🟡 More Evidence, 🔴 Significant Concerns.',
      ],
      investorQuestion: 'What single piece of disconfirming evidence would prove my investment thesis wrong?',
    },
    see: {
      title: 'The Nova Motors Dossier',
      finCommentary:
        'Review the complete evidence docket for Nova Motors. Observe how the positive operational indicators interact with valuation and industry trends.',
      visualType: 'cards-comparison',
      companyA: {
        name: 'The Strengths (The Engine)',
        tag: 'Operational Power',
        metrics: [
          { label: 'Revenue Growth', value: '22% (Outpacing Industry 15%)' },
          { label: 'Profit Growth', value: '28% (Expanding Margins)' },
          { label: 'Return on Equity (ROE)', value: '19% (High Efficiency)' },
          { label: 'Balance Sheet Debt', value: 'Moderate & Well Covered' },
        ],
        summary: 'Healthy operational compounder gaining market share in electric commercial vehicles.',
      },
      companyB: {
        name: 'The Vulnerabilities (The Price & Horizon)',
        tag: 'Valuation & Headwinds',
        metrics: [
          { label: 'P/E Valuation Multiple', value: '42× (Premium Multiple)' },
          { label: 'Industry EV Capex', value: 'Rivals spending ₹2,000 Cr' },
          { label: 'Valuation Cushion', value: 'Slim margin of safety', highlight: true },
        ],
        summary: 'At 42× P/E, any slowdown in commercial adoption will cause multiple de-rating.',
      },
      keyObservation:
        'Nova Motors is a genuine winner, but trades at 42× earnings while 2 major competitors are entering its category. Your stance must reflect both sides.',
    },
    try: {
      title: 'Synthesizing the Thesis',
      prompt: 'Which statement best reflects a disciplined, institutional investment stance for Nova Motors?',
      finHint: 'Balance the verified business strengths against the valuation multiple risk.',
      cards: [
        {
          id: 'thesis_balanced',
          name: 'Strong Business, but Valuation Demands Rigorous Investigation',
          badge: 'Institutional Stance',
          details: [
            { label: 'Operational View', value: '22% growth outpaces industry with 19% ROE' },
            { label: 'Risk Factor', value: '42× P/E requires verifying competitive defense' },
          ],
          isCorrect: true,
          feedback:
            'Magnificent synthesis! You acknowledged operational superiority while refusing to blindly overlook the 42× P/E multiple. That is the hallmark of a master investor.',
        },
        {
          id: 'thesis_blind_buy',
          name: 'The Company is Definitely an Immediate Buy Without Checking Price',
          badge: 'Retail Impulse',
          details: [
            { label: 'Flaw', value: 'Ignores 42× P/E multiple and competitive capex' },
          ],
          isCorrect: false,
          feedback:
            'Disciplined analysts never declare an automatic buy without checking whether valuation leaves a margin of safety.',
        },
      ],
      finReaction: {
        correct: 'You are now thinking like an investigative equity research analyst!',
        incorrect: 'Remember: Never fall in love with a business. Always weigh growth against valuation risk.',
      },
    },
    decide: {
      title: 'Formulating Your Analytical Stance',
      finPrompt:
        'You are about to enter Level 12: The Vanishing Momentum case investigation. Which evidence items will form the backbone of your thesis?',
      scenarioCard: {
        company: 'Nova Motors Investigation Brief',
        stats: [
          { label: 'Investigation Tokens', value: '3 Action Tokens Available', trend: 'neutral' },
          { label: 'Target Clues', value: '5 Clues on Evidence Board', trend: 'neutral' },
          { label: 'Final Output', value: 'Structured Thesis Submission', trend: 'up' },
        ],
        contextNote: 'In the flagship case, you will spend investigation tokens to unlock primary documents and inspect evidence.',
      },
      question: 'What is the goal of a forensic case investigation?',
      options: [
        {
          id: 'opt_forensic',
          text: 'To uncover hidden discrepancies between headline narrative and underlying cash flows, then build an evidence-backed thesis',
          isBest: true,
          investorInsight:
            'Spot on! That is the core philosophy of our Playground: moving from rote formulas to forensic real-world market intelligence.',
        },
        {
          id: 'opt_guess',
          text: 'To guess tomorrow’s stock price movement based on news sentiment',
          isBest: false,
          investorInsight: 'We don’t gamble on news sentiment; we investigate underlying business realities.',
        },
      ],
      goldenTakeaway: 'The best investors are forensic detectives who let the evidence build the verdict.',
    },
    reflect: {
      goldenRuleNumber: 11,
      ruleTitle: 'Synthesis is the Ultimate Edge',
      ruleQuote: 'You need an edge, and that edge comes from connecting clues that others treat as isolated numbers.',
      investorMindsetTakeaway:
        'You have mastered the foundational mental models: Ownership, Revenue, Margins, EPS, P/E, Debt, ROE, Cash Flow, and Synthesis. You are now prepared to take on full investigation cases.',
      checklistItems: [
        'Formulate a 3-part thesis: Growth Engine, Valuation Multiple, and Key Risk.',
        'Identify the single metric that would invalidate your stance.',
        'Enter Level 12 and deploy your 3 investigation action tokens!',
      ],
      unlockedBadge: {
        name: 'Lead Financial Sleuth',
        icon: '🕵️‍♂️',
        description: 'Synthesizes multi-dimensional financial evidence into actionable investment theses.',
      },
    },
  },
};
