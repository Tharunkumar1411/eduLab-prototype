import { SectorData } from './types.ts';

export const BANKING_SECTOR_DATA: SectorData = {
  id: 'banking',
  name: 'Banking',
  icon: '🏦',
  tagline: 'The Credit Engine of the Economy',
  heroSummary:
    'Banks borrow money cheaply from depositors and lend it to businesses, home buyers, and entrepreneurs at higher rates. Learn how the spread drives bank earnings.',
  estimatedTime: '10 min journey',

  whatIsIt: {
    simpleDefinition:
      'Banking companies act as financial intermediaries. They collect savings deposits from individuals and deploy those funds as loans to creditworthy borrowers.',
    examplesHeadline: 'Everyday banking services and products:',
    exampleItems: [
      { name: 'Savings & Checking', icon: '💳', category: 'Retail Deposits' },
      { name: 'Home & Auto Loans', icon: '🏡', category: 'Consumer Credit' },
      { name: 'Business Loans', icon: '🏭', category: 'Commercial Banking' },
      { name: 'Credit Cards', icon: '🛍️', category: 'Unsecured Lending' },
      { name: 'Fixed Deposits', icon: '📈', category: 'Term Deposits' },
      { name: 'Payment Processing', icon: '📱', category: 'UPI & Merchant Fees' },
    ],
    beginnerMentalModel:
      'Think of a bank as a wholesale merchant of cash: buy funds at a low wholesale cost from depositors (e.g. 5%), and sell funds at a marked-up retail price to borrowers (e.g. 9.5%).',
  },

  howItWorks: {
    headline: 'How Value and Money Move in Banking',
    explanation:
      'Banks don\'t manufacture goods; they manage the flow and risk of capital across society.',
    chainSteps: [
      {
        stepNumber: 1,
        title: 'Depositor',
        role: 'Places surplus cash in savings or fixed deposits',
        cutOfValue: 'Earns 4% - 6% interest',
        description: 'Seeks safety, liquidity, and modest interest returns for personal savings.',
        icon: '💼',
      },
      {
        stepNumber: 2,
        title: 'Commercial Bank',
        role: 'Credit underwriting, regulatory reserves (CRR/SLR) & risk management',
        cutOfValue: 'Keeps ~3.5% Net Interest Margin (NIM)',
        description: 'Screens loan applicants, pools diverse risks, and maintains RBI reserve buffers.',
        icon: '🏦',
      },
      {
        stepNumber: 3,
        title: 'Borrower',
        role: 'Finances home purchases, factory equipment, or vehicle loans',
        cutOfValue: 'Pays 9% - 12% loan interest',
        description: 'Deploys borrowed capital into productive economic activities or consumer purchases.',
        icon: '🏗️',
      },
      {
        stepNumber: 4,
        title: 'Economy & Shareholders',
        role: 'Capital formation, business expansion & dividend payouts',
        cutOfValue: 'Generates ROE and economic growth',
        description: 'A well-capitalized banking system fuels infrastructure, entrepreneurship, and consumption.',
        icon: '🌐',
      },
    ],
    keyInsight:
      'The Net Interest Margin (NIM) — the gap between lending rates and deposit rates — is the primary lifeblood of any commercial bank.',
  },

  driversHeadline: 'What makes a bank grow?',
  drivers: [
    {
      id: 'nim',
      name: 'Net Interest Margin (NIM)',
      icon: '💰',
      shortQuestion: 'What is the spread between loan earnings and deposit costs?',
      explanation:
        'The profit margin a bank earns by subtracting the interest paid to savers from the interest charged to borrowers, divided by total assets.',
      realWorldExample:
        'If HDFC Bank earns 9% on loans and pays 5% on deposits, its gross spread is 4%.',
      keyMetricToWatch: 'Net Interest Margin (NIM %)',
    },
    {
      id: 'casa',
      name: 'CASA Ratio (Cheap Deposits)',
      icon: '📥',
      shortQuestion: 'How much cheap money does the bank get from savings accounts?',
      explanation:
        'Current and Savings Accounts (CASA) pay very low interest (often 3% - 4%). A high CASA ratio gives the bank a massive cost advantage over peers.',
      realWorldExample:
        'A bank with a 45% CASA ratio pays far less to depositors than a bank relying on expensive 8% wholesale corporate fixed deposits.',
      keyMetricToWatch: 'CASA Ratio (%)',
    },
    {
      id: 'credit_growth',
      name: 'Loan Book Expansion',
      icon: '📈',
      shortQuestion: 'How fast are loan disbursements growing year-over-year?',
      explanation:
        'A growing economy demands new loans for infrastructure, real estate, and consumer vehicles. Fast loan growth expands total earnings.',
      realWorldExample:
        'When retail home loans grow 18% YoY in a booming real estate cycle, interest income surges.',
      keyMetricToWatch: 'Gross Advances Growth (%)',
    },
    {
      id: 'asset_quality',
      name: 'Asset Quality (NPA Control)',
      icon: '🛡️',
      shortQuestion: 'Are borrowers repaying their loans on schedule?',
      explanation:
        'Bad loans (Non-Performing Assets) force banks to set aside hard-earned profits as provisions to write off defaulted debts.',
      realWorldExample:
        'A bank with Gross NPA under 1.5% preserves its equity cushion, while a bank with 8% NPA burns capital covering unpaid corporate debts.',
      keyMetricToWatch: 'Net NPA (%) & Provision Coverage Ratio (PCR)',
    },
    {
      id: 'roe_leverage',
      name: 'Return on Equity (ROE)',
      icon: '⚡',
      shortQuestion: 'How effectively does the bank generate returns on shareholder capital?',
      explanation:
        'Because banks operate with high financial leverage (roughly ₹9 in debt/deposits for every ₹1 of equity), even modest margins produce 15-18% ROE for well-run lenders.',
      realWorldExample:
        'Top private banks in India consistently achieve 16-18% ROE by combining tight credit discipline with low-cost CASA deposits.',
      keyMetricToWatch: 'Return on Equity (ROE %)',
    },
  ],

  miniChallenge: {
    id: 'banking_challenge_casa_advantage',
    title: 'The Low-Cost Deposit Test',
    scenario:
      'Bank Alpha has a 45% CASA ratio, paying an average of 4.2% on deposits. Bank Beta has only 20% CASA, relying on expensive term deposits at 7.5%. Both banks lend to the same credit-rated corporate clients at 9.5%.',
    question: 'Which bank enjoys the superior profit spread (NIM)?',
    options: [
      {
        id: 'opt_alpha',
        text: 'Bank Alpha enjoys a much wider spread',
        isCorrect: true,
        explanation:
          'Correct! Bank Alpha pays only 4.2% for its funds versus Beta\'s 7.5%. By lending at the same 9.5% rate, Alpha keeps a 5.3% spread while Beta is squeezed with only a 2.0% spread.',
      },
      {
        id: 'opt_beta',
        text: 'Bank Beta because term deposits are locked in longer',
        isCorrect: false,
        explanation:
          'Incorrect. While term deposits provide duration stability, paying 7.5% severely compresses net interest margin compared to Alpha\'s low-cost 4.2% CASA base.',
      },
      {
        id: 'opt_identical',
        text: 'Both spreads are identical because lending rates match',
        isCorrect: false,
        explanation:
          'Incorrect. Bank margins depend on the difference between lending income and funding costs. Alpha’s funding costs are drastically lower.',
      },
    ],
    xpReward: 50,
  },

  metricsHeadline: 'Learn the numbers that matter in Banking',
  metrics: [
    {
      id: 'metric_nim',
      name: 'Net Interest Margin (NIM)',
      shortCode: 'NIM',
      whatItMeans: 'The percentage difference between interest earned on loans and interest paid out on deposits.',
      whyItMatters: 'Direct measure of lending profitability. High NIM indicates cheap funding or pricing power in specialized retail loans.',
      sectorExample: 'Leading Indian private banks typically sustain NIMs between 3.8% and 4.3%.',
    },
    {
      id: 'metric_npa',
      name: 'Net Non-Performing Assets (Net NPA)',
      shortCode: 'NNPA',
      whatItMeans: 'The percentage of total loans where borrower interest or principal payments are overdue by 90+ days, net of provisions.',
      whyItMatters: 'Healthy banks keep Net NPAs under 1.0%. A rising NPA warns that loans were made recklessly and profits will be eaten by write-offs.',
      sectorExample: 'A bank with Net NPA of 0.45% demonstrates pristine credit underwriting and low default risk.',
    },
    {
      id: 'metric_casa',
      name: 'CASA Ratio',
      shortCode: 'CASA',
      whatItMeans: 'The proportion of total deposits that sit in Current Accounts and Savings Accounts.',
      whyItMatters: 'CASA represents sticky, dirt-cheap funding from millions of checking account holders.',
      sectorExample: 'A 40%+ CASA ratio provides an impenetrable cost moat during periods of rising interest rates.',
    },
    {
      id: 'metric_car',
      name: 'Capital Adequacy Ratio (CAR)',
      shortCode: 'CAR',
      whatItMeans: 'The safety cushion of shareholder equity held as a percentage of risk-weighted loans.',
      whyItMatters: 'The RBI requires banks to hold at least 11.5% CAR. Higher capital buffers allow banks to grow rapidly without unexpected insolvency fears.',
      sectorExample: 'Top banks maintain CAR between 16% and 19%, giving them ample firepower to expand lending.',
    },
    {
      id: 'metric_roe_bank',
      name: 'Return on Assets / Equity (ROA & ROE)',
      shortCode: 'ROA/E',
      whatItMeans: 'ROA measures profit per ₹100 of total bank assets (target 1.8%+); ROE measures returns on equity (target 15%+).',
      whyItMatters: 'Determines whether the bank creates lasting compounding value for investors while weathering economic downcycles.',
      sectorExample: 'A bank generating 2.0% ROA and 17% ROE is considered best-in-class in global banking.',
    },
  ],

  companiesHeadline: 'Explore leading Indian Banks',
  companies: [
    {
      id: 'hdfc_bank',
      name: 'HDFC Bank Ltd.',
      tagline: 'The benchmark of private retail credit and risk discipline',
      businessDescription: 'India\'s largest private sector bank with a multi-decade track record of consistent credit quality and branch expansion.',
      icon: '🏛️',
      productCategories: ['Salaried Checking', 'Home Loans', 'Credit Cards', 'SME Working Capital'],
      primaryDrivers: ['Low-cost CASA', 'Consistently Low NPAs', 'Operational Efficiency'],
      keyStrengths: 'Exceptional credit underwriting through economic downturns and unmatched branch network.',
    },
    {
      id: 'icici_bank',
      name: 'ICICI Bank Ltd.',
      tagline: 'Technology-first retail banking and digital lending powerhouse',
      businessDescription: 'Transformed into a resilient retail lending powerhouse powered by the iMobile app and high-yielding secured loans.',
      icon: '⚡',
      productCategories: ['Digital Loans', 'Wealth Management', 'Corporate Banking', 'Mortgages'],
      primaryDrivers: ['Digital Platform Scale', 'Expanding NIM', 'Risk-calibrated Growth'],
      keyStrengths: 'Superior digital adoption and sharp turnaround in asset quality over the last 5 years.',
    },
    {
      id: 'sbi',
      name: 'State Bank of India (SBI)',
      tagline: 'The financial backbone of the Indian republic',
      businessDescription: 'The nation’s largest public-sector lender servicing over 48 crore accounts across every town and border outpost in India.',
      icon: '🇮🇳',
      productCategories: ['National Infrastructure', 'Agri Loans', 'YONO Digital', 'Salary Accounts'],
      primaryDrivers: ['Gigantic Low-Cost Deposit Base', 'Sovereign Trust', 'Government Schemes'],
      keyStrengths: 'Deepest geographic footprint in India and lowest borrowing cost in the domestic market.',
    },
  ],

  investigation: {
    id: 'case_banking_credit_growth',
    title: 'The Hidden Slippage Mystery',
    companyName: 'Beacon Commercial Bank Ltd.',
    ticker: 'BEACONBNK',
    industry: 'Commercial Banking',
    level: 1,
    levelTitle: 'Banking Sector Investigation',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'Beacon reported +22% loan growth and a solid 4.1% Net Interest Margin. But corporate defaults suddenly surfaced in the retail unsecured portfolio. Is the bank scaling profitably or heading toward a credit crisis?',
    scenarioDescription: `Beacon Commercial Bank made headlines after reporting a stellar +22% jump in net interest income, driven by rapid expansion into instant personal loans and credit cards.

While headline profitability looks robust:
• 📈 Gross advances grew +22% YoY
• 💰 Reported Net Interest Margin (NIM) touched 4.1%
• 📉 Net NPA was reported at a calm 0.8%
• ⚠️ However, special mention accounts (SMA-2 loans overdue 61-90 days) doubled from last quarter!

As an investigative banking analyst, you have 3 tokens to uncover whether Beacon’s high NIM is compensating for rising loan defaults, or if write-offs will erase future capital.`,
    stockChartSummary: {
      period: 'Past 1 Year',
      gain: '+24%',
      flatPeriod: 'Last 2 Months Nervous Trading',
      currentPrice: '₹842.10',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_unsecured_mix',
        category: 'Earnings',
        title: '🔍 Investigate Loan Book Composition',
        metricLabel: 'Unsecured Loans Jump to 28% of Book',
        metricValue: 'Personal loans & cards grew +44% YoY',
        summary: 'The bank juiced up its NIM by lending aggressively to high-risk borrowers at 16% interest rates.',
        deepDive: 'Secured corporate loans yield only 8.5%, while unsecured personal loans yield 15.5%. Beacon deliberately shifted its portfolio mix toward personal loans to report higher NIMs, but this dramatically raised default exposure.',
        implication: 'concern',
        tags: ['High-Yield Strategy', 'Credit Risk Expansion'],
      },
      {
        id: 'clue_pcr_buffer',
        category: 'Debt',
        title: '🔍 Investigate Provision Coverage Ratio (PCR)',
        metricLabel: 'PCR Buffer Dropped to 62%',
        metricValue: 'PCR fell from 78% to 62% in 4 quarters',
        summary: 'To report higher net profit, the bank reduced the cushion of money set aside for potential bad loans.',
        deepDive: 'Conservative banks keep PCR above 75%. Beacon let its provision coverage slide to 62%, artificially boosting quarterly return on equity (ROE) by reporting lower credit provisions.',
        implication: 'concern',
        tags: ['Provision Slippage', 'Aggressive Accounting'],
      },
      {
        id: 'clue_casa_stickiness',
        category: 'Cash Flow',
        title: '🔍 Investigate Retail Deposit Franchise',
        metricLabel: 'CASA Ratio Steady at 43%',
        metricValue: 'Savings accounts grew +14% YoY',
        summary: 'The bank possesses a loyal, sticky retail branch network with stable low-cost checking accounts.',
        deepDive: 'Unlike wholesale lenders that face runs on deposits during rumors, Beacon’s depositors are ordinary retail savers who have banked with it for over 15 years. Funding liquidity remains rock-solid.',
        implication: 'support',
        tags: ['Deposit Moat', 'Stable Liquidity'],
      },
      {
        id: 'clue_car_cushion',
        category: 'Valuation',
        title: '🔍 Investigate Capital Adequacy (CAR)',
        metricLabel: 'Tier-1 Capital Buffer at 16.8%',
        metricValue: 'CAR: 16.8% (RBI minimum: 11.5%)',
        summary: 'The bank completed an equity rights issue recently, leaving it with substantial capital buffer to absorb credit shocks.',
        deepDive: 'Even if the unsecured defaults rise by 300 bps, Beacon’s 16.8% capital adequacy ensures it will not need government bailouts or emergency dilutive capital raises.',
        implication: 'support',
        tags: ['Strong Capital Buffer', 'Solvency Cushion'],
      },
      {
        id: 'clue_collection_tech',
        category: 'Competitors',
        title: '🔍 Investigate Collection Automation',
        metricLabel: 'Early-Bucket Recovery Rate at 89%',
        metricValue: 'Overdue recovery improved 340 bps',
        summary: 'Automated AI collection nudges and UPI auto-debit recovered 89% of first-time delayed payments.',
        deepDive: 'Delinquencies spiked due to festival spending, but the bank’s digital collection algorithms managed to retrieve payments before accounts entered 90-day default status.',
        implication: 'neutral',
        tags: ['Digital Collections', 'Operational Monitoring'],
      },
    ],
    decisions: [
      {
        id: 'decision_evidence_needed_bank',
        label: 'More Evidence Needed — High NIM Vulnerable to Credit Cost Surge',
        stance: 'evidence_needed',
        thesisSummary:
          'Beacon has strong capital buffers and solid CASA funding, but the drop in PCR and surge in unsecured loans requires monitoring slippages over the next 2 quarters.',
        reasoningScore: 95,
        debriefAnalysis:
          'Excellent financial detective work! In banking, high NIMs are never free; they usually come from underwriting riskier borrowers. Beacon’s strong CASA (43%) and high CAR (16.8%) protect it from sudden insolvency, but slipping PCR means credit costs will likely suppress future earnings. Waiting for NPA slippages to peak is the prudent institutional approach.',
        marketOutcome:
          'The stock corrected 8% as management increased credit provisions next quarter, but capital adequacy remained sound and the bank weathered the cycle.',
        coreLesson:
          'Never evaluate a bank’s Net Interest Margin in isolation. Always examine loan mix and provisioning buffers to understand what credit risks generated that yield.',
      },
      {
        id: 'decision_stronger_bank',
        label: 'Stronger Thesis — High Profitability and Unbeatable Retail Franchise',
        stance: 'stronger',
        thesisSummary:
          'Beacon’s 4.1% NIM and 16.8% CAR prove it is an invincible compounding machine that can easily outrun bad loans.',
        reasoningScore: 65,
        debriefAnalysis:
          'Too complacent regarding asset quality. When credit provisions slide from 78% to 62% in an unsecured boom, future write-offs will eat into reported profit.',
        marketOutcome:
          'Profits were downgraded 14% two quarters later when bad loan provisions were forced back up to regulatory thresholds.',
        coreLesson:
          'A bank’s net profit is only as real as its loan loss reserves. Low provisions inflate earnings today but guarantee write-downs tomorrow.',
      },
      {
        id: 'decision_concern_bank',
        label: 'Significant Concern — Looming Insolvency and Catastrophic Default Wave',
        stance: 'concern',
        thesisSummary:
          'Beacon is experiencing a dangerous subprime crisis and its capital will be wiped out by runaway unsecured defaults.',
        reasoningScore: 70,
        debriefAnalysis:
          'Overstated the danger. While unsecured risk has heightened, a 16.8% CAR and 43% retail CASA ratio insulate the bank from any solvency crisis. It is experiencing cyclical margin normalization, not bankruptcy.',
        marketOutcome:
          'The bank stabilized without external emergency capital, proving that strong retail deposit franchises provide immense survival cushions.',
        coreLesson:
          'Differentiate between an earnings squeeze (manageable) and a capital solvency crisis (fatal). Banks with 16%+ Tier-1 capital rarely fail from modest consumer delinquencies.',
      },
    ],
  },
};
