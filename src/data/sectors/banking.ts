import { SectorData } from './types.ts';

export const BANKING_SECTOR_DATA: SectorData = {
  id: 'banking',
  name: 'Banking',
  icon: '🏦',
  tagline: 'The Credit Engine of the Economy',
  heroSummary:
    'Banks borrow money cheaply from depositors and lend it to businesses, home buyers, and entrepreneurs at higher rates. Learn how the spread drives bank earnings.',
  estimatedTime: '10 min journey',

  featuredInvestigation: {
    question: 'The Bank’s Profit Puzzle',
    supportingCopy:
      'Two banks charge similar interest rates on loans, but one pays more to attract deposits. Which bank has the stronger business model?',
    previewPoints: [
      'Understand how deposits turn into loans and why banks exist',
      'Follow the money through an interactive loan-and-deposit spread model',
      'Run an experiment comparing cheap CASA vs expensive wholesale funding',
      'Investigate Beacon Bank to uncover hidden credit quality risks behind high profits',
    ],
    activitiesCount: 4,
    totalXp: 250,
  },

  activities: [
    {
      id: 'banking_act_1',
      stepNumber: 1,
      title: 'Understand Banking',
      subtitle: 'What banks do, why customers deposit money, and how banks connect savers and borrowers.',
      estimatedMinutes: 2,
      xpReward: 50,
      type: 'story',
      storyConfig: {
        hook: 'The Foundation of Financial Intermediation',
        scenario:
          'You deposit ₹1,000 into your savings account for safekeeping. Down the street, Rahul needs capital to buy an industrial oven and expand his bakery. How does a bank bridge the gap?',
        participants: [
          {
            id: 'depositor',
            title: 'Depositor (You)',
            icon: '💼',
            role: 'Places ₹1,000 in savings',
            details: 'Wants daily liquidity, absolute safety, and modest interest (e.g. 3.5%).',
            flowArrowLabel: 'Deposits cash →',
          },
          {
            id: 'bank',
            title: 'The Commercial Bank',
            icon: '🏦',
            role: 'Financial Intermediary',
            details:
              'Pools thousands of small deposits, screens borrower creditworthiness, maintains cash reserves (CRR/SLR), and absorbs default risk.',
            flowArrowLabel: 'Underwrites loan →',
          },
          {
            id: 'borrower',
            title: 'Borrower (Rahul’s Bakery)',
            icon: '🥖',
            role: 'Borrows to buy equipment',
            details:
              'Invests in productive assets, creates jobs, and repays the loan over 3 years at 9.0% interest.',
          },
        ],
        decisionQuestion:
          'What would happen if Rahul had to find and negotiate with 1,000 separate individual depositors without a bank?',
        options: [
          {
            id: 'opt_a',
            text: 'It would be nearly impossible due to massive trust, contract, and coordination barriers.',
            isCorrect: true,
            explanation:
              'Spot on! Individual depositors lack the time and expertise to audit Rahul’s credit, and depositors might need their money tomorrow. The bank pools liquidity and bears the underwriting risk.',
          },
          {
            id: 'opt_b',
            text: 'It would be much faster because he could avoid bank regulations and paperwork.',
            isCorrect: false,
            explanation:
              'Incorrect. Gathering ₹1,000 from 1,000 distinct strangers creates huge friction, legal complexity, and mistrust.',
          },
          {
            id: 'opt_c',
            text: 'Depositors would never want any interest from a local bakery business.',
            isCorrect: false,
            explanation:
              'Incorrect. Savers always expect a return for parting with their hard-earned money.',
          },
        ],
        conceptExplanation: {
          title: 'The Core Purpose of a Bank',
          summary:
            'A bank is an arrangement that connects savers who have surplus money with borrowers who have productive investment ideas.',
          corePoints: [
            'Liquidity Transformation: Savers can withdraw cash anytime, yet borrowers can take multi-year loans.',
            'Credit Risk Management: The bank screens borrowers and absorbs losses from its own equity cushion if a loan defaults.',
            'Regulatory Safeguards: Central banks (like the Reserve Bank of India) mandate cash reserve ratios (CRR and SLR) so banks always hold emergency cash.',
          ],
        },
        reflectionQuestion: 'Does a bank lend out 100% of the money it receives from depositors?',
        reflectionOptions: [
          {
            id: 'ref_yes',
            text: 'Yes, every single rupee must be lent out immediately to maximize profits.',
            isCorrect: false,
            explanation:
              'Incorrect. If a bank lent out 100% of deposits, it would immediately fail when depositors came to withdraw cash at ATMs.',
          },
          {
            id: 'ref_no',
            text: 'No, banks must keep mandatory liquid reserves and buffers for daily withdrawals.',
            isCorrect: true,
            explanation:
              'Exactly right! Banks maintain regulatory reserve ratios (CRR & SLR in India) to ensure liquidity for day-to-day customer withdrawals.',
          },
        ],
      },
    },
    {
      id: 'banking_act_2',
      stepNumber: 2,
      title: 'Follow the Money',
      subtitle: 'Deposits, lending, interest income, and funding costs: visual cash flow and the net interest spread.',
      estimatedMinutes: 3,
      xpReward: 50,
      type: 'model',
      modelConfig: {
        headline: 'The Banking Cash Register',
        intro:
          'Where does a bank’s money actually come from, and where does it go? Explore this simplified balance sheet and see how changing interest rates impacts earnings.',
        defaultLendingRate: 9.0,
        defaultDepositRate: 5.0,
        depositPoolCr: 10000,
        loansDeployedCr: 8000,
        reservesCr: 2000,
        explanation: {
          spreadConcept:
            'The intuitive Interest Rate Spread is the gap between the average interest rate charged on loans and the average interest rate paid on deposits (e.g., 9.0% − 5.0% = 4.0 percentage points).',
          spreadVsNim:
            'In real financial reports, analysts track Net Interest Margin (NIM). While the simple spread compares percentage rates, NIM divides Net Interest Income by Total Earning Assets (NII ÷ Average Earning Assets). Both reflect the same fundamental pricing power.',
          limitationsNote:
            'Note: This is an introductory educational model. Real banks also incur operating overheads (branches, tech, employee salaries) and must set aside provisions for overdue loans before arriving at net profit.',
        },
        reflectionQuestion:
          'If a central bank raises policy rates and a bank’s average deposit cost climbs from 5% to 7% while its loan rate stays stuck at 9%, what happens?',
        reflectionOptions: [
          {
            id: 'spread_shrinks',
            text: 'Its interest spread compresses from 4% down to 2%, slashing net interest income.',
            isCorrect: true,
            explanation:
              'Exactly! The bank’s funding became significantly more expensive, squeezing the margin between what it pays out and what it takes in.',
          },
          {
            id: 'spread_grows',
            text: 'Its interest spread automatically increases because deposits are worth more.',
            isCorrect: false,
            explanation:
              'Incorrect. Higher deposit costs mean the bank pays out more money to savers, shrinking its profit margin.',
          },
        ],
      },
    },
    {
      id: 'banking_act_3',
      stepNumber: 3,
      title: 'Run an Experiment',
      subtitle: 'Compare two banks with different deposit costs and discover why a wider spread alone isn’t the whole story.',
      estimatedMinutes: 2,
      xpReward: 50,
      type: 'experiment',
      experimentConfig: {
        headline: 'The Low-Cost Deposit Test',
        intro:
          'Two fictional banks lend to similar creditworthy borrowers at the same 9.0% loan rate. But their deposit structures are very different. Let’s investigate.',
        entityA: {
          name: 'Bank Alpha',
          icon: '🏛️',
          tag: 'High CASA Base (45%)',
          lendingRate: 9.0,
          depositRate: 4.2,
          fundingNote: 'Millions of low-interest savings and salary checking accounts paying only 3% to 4%.',
        },
        entityB: {
          name: 'Bank Beta',
          icon: '🏢',
          tag: 'Low CASA Base (20%)',
          lendingRate: 9.0,
          depositRate: 5.5,
          fundingNote: 'Heavily reliant on expensive corporate term deposits paying 7% to 8%.',
        },
        question: 'Which bank enjoys the wider interest rate spread, and why?',
        options: [
          {
            id: 'ans_alpha',
            text: 'Bank Alpha (Spread: 4.8%) enjoys a significantly wider spread than Bank Beta (Spread: 3.5%).',
            isCorrect: true,
            explanation:
              'Correct! Bank Alpha’s average cost of funds is only 4.2% thanks to cheap CASA deposits. It keeps a 4.8% spread, generating ₹130 Crore more profit per ₹10,000 Cr of loans than Bank Beta!',
          },
          {
            id: 'ans_beta',
            text: 'Bank Beta because higher deposit rates attract wealthier corporate clients.',
            isCorrect: false,
            explanation:
              'Incorrect. Higher deposit interest is an expense paid by the bank. Paying 5.5% eats into Bank Beta’s margin.',
          },
          {
            id: 'ans_equal',
            text: 'Both have the exact same spread because both charge 9.0% on loans.',
            isCorrect: false,
            explanation:
              'Incorrect. A bank’s margin is a two-sided equation: loan earnings MINUS deposit expenses.',
          },
        ],
        catchExplanation: {
          title: 'The Vital Catch: Wider Spread ≠ Automatically Safer Bank',
          subtitle: 'Why astute financial detectives never look at spread in isolation',
          keyCatch:
            'A bank can artificially pump up its spread by charging 16% on risky personal loans. But if those borrowers default, credit losses destroy the bank.',
          points: [
            'Credit Risk Trade-off: High lending rates usually accompany riskier borrowers who may stop paying during an economic downturn.',
            'CASA Advantage: The safest, most durable way to expand spread is to lower funding costs with sticky checking and savings deposits (CASA), not by taking reckless credit bets.',
            'Sustainable Quality: The strongest banks combine disciplined credit underwriting (low default rates) with low-cost deposit franchises.',
          ],
        },
        reflectionQuestion:
          'Why are ordinary retail salary accounts considered the holy grail of bank funding?',
        reflectionOptions: [
          {
            id: 'ref_casa_loyal',
            text: 'They provide stable, low-interest funding that depositors leave in the bank for daily convenience.',
            isCorrect: true,
            explanation:
              'Exactly! People keep money in salary accounts for UPI and ATM ease, accepting 3% to 4% interest. Unlike corporate treasuries, they don’t pull their money out the moment rates twitch.',
          },
          {
            id: 'ref_casa_bonus',
            text: 'Because banks don’t have to keep any reserves against savings accounts.',
            isCorrect: false,
            explanation:
              'Incorrect. Central banks require reserve buffers against all retail deposits.',
          },
        ],
      },
    },
    {
      id: 'banking_act_4',
      stepNumber: 4,
      title: 'Investigate a Bank',
      subtitle: 'Examine Beacon Commercial Bank’s forensic clues and apply your new knowledge to solve the profit puzzle.',
      estimatedMinutes: 3,
      xpReward: 100,
      type: 'investigation',
      investigationConfig: {
        caseTitle: 'The Hidden Slippage Mystery',
        companyName: 'Beacon Commercial Bank Ltd.',
        ticker: 'BEACONBNK (Illustrative Case)',
        intro:
          'Beacon Commercial Bank made headlines with stellar numbers: +22% loan growth and an industry-beating 4.5% Net Interest Margin. Financial headlines praised the management. But as an investigative analyst, you examine four forensic clues before reaching a verdict.',
        clues: [
          {
            id: 'clue_1',
            title: 'Loan Portfolio Mix',
            icon: '💳',
            metricBadge: 'Advances Composition',
            dataHighlight: 'Unsecured Personal Loans surged from 20% to 52% of total book',
            observation:
              'Management aggressively pivoted away from safe, secured home loans into instant digital loans charging 16% interest.',
            implication:
              'This explains the shiny 4.5% NIM: the bank charged sky-high interest rates to vulnerable borrowers.',
          },
          {
            id: 'clue_2',
            title: 'Deposit Funding Quality',
            icon: '📉',
            metricBadge: 'CASA Ratio',
            dataHighlight: 'CASA Ratio collapsed from 44% down to 28%',
            observation:
              'To fund its rapid lending spree, Beacon had to borrow emergency wholesale deposits from institutions at 8.0%.',
            implication:
              'Sticky, low-cost retail funding was diluted. The bank’s funding base has become fragile and expensive.',
          },
          {
            id: 'clue_3',
            title: 'Asset Quality Slippage',
            icon: '⚠️',
            metricBadge: 'Gross NPA Trend',
            dataHighlight: 'Gross NPAs surged from 1.1% to 3.9% in just 12 months',
            observation:
              'Early 30-day and 60-day loan delinquencies in the instant personal loan portfolio are spiking across the country.',
            implication:
              'Borrowers who took high-interest loans are starting to miss monthly EMI payments in large numbers.',
          },
          {
            id: 'clue_4',
            title: 'Provision Coverage Cushion',
            icon: '🛡️',
            metricBadge: 'Provision Coverage Ratio (PCR)',
            dataHighlight: 'PCR was slashed from 75% down to 48%',
            observation:
              'Instead of setting aside cash to write off bad loans, management reduced provisioning buffers to keep reported net profit artificially high.',
            implication:
              'The bank is sweeping bad loans under the rug. When forced write-offs hit next quarter, reported profits will collapse.',
          },
        ],
        question:
          'Based on these four clues, what is the true financial health of Beacon Commercial Bank?',
        options: [
          {
            id: 'verdict_bull',
            text: 'Beacon is a fast-growing, highly profitable bank that will deliver lasting compounding returns.',
            isBest: false,
            verdictFeedback:
              'Beware! You were fooled by the surface numbers. High NIM driven by risky borrowers and falling provisions is a classic warning sign of impending credit trouble.',
          },
          {
            id: 'verdict_analyst',
            text: 'Beacon sacrificed credit quality and deposit stability to artificially boost short-term NIM. A bad debt write-off storm is brewing.',
            isBest: true,
            verdictFeedback:
              'Outstanding detective analysis! You looked beneath the headline 4.5% NIM and discovered that high rates came with toxic credit risk, eroding CASA, and under-provisioned NPAs.',
          },
          {
            id: 'verdict_neutral',
            text: 'The numbers look neutral because lower provisions indicate borrowers have become safer.',
            isBest: false,
            verdictFeedback:
              'Incorrect. Lowering provisions when NPAs are actively tripling is an accounting red flag, not a sign of borrower safety.',
          },
        ],
        nuancedTakeaway: {
          title: 'The Detective’s Golden Banking Lesson',
          summary:
            'In banking, no single metric can tell you if a business is sound. High margins mean nothing if the loans are never repaid.',
          lessons: [
            'Never evaluate Net Interest Margin (NIM) without checking Asset Quality (Gross & Net NPAs).',
            'Look for low-cost, sticky deposits (CASA Ratio) as the true competitive moat of a banking franchise.',
            'Watch Provision Coverage Ratio (PCR): well-run banks maintain 70%+ buffers so bad loans never threaten their survival.',
          ],
        },
      },
    },
  ],

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
