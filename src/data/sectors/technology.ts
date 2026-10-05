import { SectorData } from './types.ts';

export const TECHNOLOGY_SECTOR_DATA: SectorData = {
  id: 'technology',
  name: 'Technology',
  icon: '💻',
  tagline: 'Global Enterprise Digital Transformation',
  heroSummary:
    'Indian IT services firms build, maintain, and secure the software architecture for Fortune 500 banks, airlines, and retailers. Learn how deal wins and billable hours drive earnings.',
  estimatedTime: '10 min journey',

  whatIsIt: {
    simpleDefinition:
      'Information Technology (IT) services companies provide outsourced software development, cloud infrastructure migration, cybersecurity, and artificial intelligence solutions to overseas corporate clients.',
    examplesHeadline: 'Typical enterprise technology solutions:',
    exampleItems: [
      { name: 'Cloud Migration', icon: '☁️', category: 'Infrastructure' },
      { name: 'Core Banking Software', icon: '🏦', category: 'FinTech Engineering' },
      { name: 'AI & Data Analytics', icon: '🤖', category: 'Next-Gen Tech' },
      { name: 'Cybersecurity', icon: '🛡️', category: 'Risk Defense' },
      { name: 'ERP Systems', icon: '📊', category: 'Enterprise Tools' },
      { name: 'IT Helpdesk & Ops', icon: '🎧', category: 'Managed Services' },
    ],
    beginnerMentalModel:
      'Think of an Indian IT company as a premier engineering consultancy firm: it recruits thousands of skilled Indian software engineers and bills their project hours to US and European corporations in foreign currency ($ and €).',
  },

  howItWorks: {
    headline: 'How Value and Money Move in IT Services',
    explanation:
      'Revenues originate from multi-million dollar multi-year contracts signed with global banks, healthcare networks, and retailers.',
    chainSteps: [
      {
        stepNumber: 1,
        title: 'Global Enterprise Client',
        role: 'Banks, airlines, or retailers in US/Europe seeking digital systems',
        cutOfValue: 'Allocates $50M - $500M IT Budget',
        description: 'Needs to modernize legacy mainframe software, migrate to cloud platforms, or integrate AI tools.',
        icon: '🏢',
      },
      {
        stepNumber: 2,
        title: 'Indian IT Provider',
        role: 'Solution architecture, project governance & contract bidding',
        cutOfValue: 'Earns Total Contract Value (TCV)',
        description: 'Designs enterprise software blueprints and manages global delivery centers across India and overseas.',
        icon: '💻',
      },
      {
        stepNumber: 3,
        title: 'Engineering Workforce',
        role: 'Software development, automated testing & cloud DevOps',
        cutOfValue: '55% - 60% of revenue in employee costs',
        description: 'Engineers, data scientists, and project managers delivering high-quality code and 24/7 uptime.',
        icon: '👨‍💻',
      },
      {
        stepNumber: 4,
        title: 'Operating Profit (EBIT)',
        role: 'Shareholder dividends, share buybacks & tech R&D',
        cutOfValue: '20% - 25% Operating Margin',
        description: 'Generates free cash flow because software consultancy requires zero expensive factories or debt.',
        icon: '💵',
      },
    ],
    keyInsight:
      'IT companies have virtually zero debt and extraordinary free cash flow conversion because their primary asset is human intellect and code, not heavy physical machinery.',
  },

  driversHeadline: 'What makes an IT company grow?',
  drivers: [
    {
      id: 'deal_wins',
      name: 'Deal Wins (Total Contract Value)',
      icon: '📑',
      shortQuestion: 'How many multi-year enterprise contracts are being signed?',
      explanation:
        'Large multi-year deals provide visible forward revenue. When a tech firm wins a $1B five-year transformation deal, it guarantees predictable revenue for the next 20 quarters.',
      realWorldExample:
        'TCS winning a £1.5 Billion contract from the UK National Employment Savings Trust (Nest) guarantees revenue for a decade.',
      keyMetricToWatch: 'Deal TCV (Total Contract Value) & Pipeline ($B)',
    },
    {
      id: 'attrition_utilization',
      name: 'Utilization & Attrition',
      icon: '👥',
      shortQuestion: 'What percentage of engineers are billing hours to active client projects?',
      explanation:
        'If an engineer sits "on the bench" without a client project, the company pays their salary but earns zero revenue. Higher employee utilization boosts operating profit margins immediately.',
      realWorldExample:
        'Raising bench utilization from 81% to 85% can increase company operating profit margins by 100+ basis points.',
      keyMetricToWatch: 'Utilization Rate (%) & LTM Attrition (%)',
    },
    {
      id: 'currency',
      name: 'Currency Advantage (USD-INR)',
      icon: '💱',
      shortQuestion: 'How does the US Dollar exchange rate affect Indian earnings?',
      explanation:
        'Over 80% of revenues are collected in US Dollars ($) and Euros (€), while over 60% of employee salaries and operational costs are paid in Indian Rupees (₹). When the Dollar strengthens, profits automatically expand.',
      realWorldExample:
        'Every 1% depreciation in the Indian Rupee against the US Dollar historically expands operating margins by approximately 25-30 basis points.',
      keyMetricToWatch: 'USD-INR Exchange Rate & Hedging Book',
    },
    {
      id: 'discretionary_spend',
      name: 'Discretionary Client Spending',
      icon: '💼',
      shortQuestion: 'Are corporate clients investing in new projects or cutting back?',
      explanation:
        'In economic booms, global corporations spend heavily on exciting digital projects. In recessions, they delay upgrades and focus only on essential cost-cutting IT maintenance.',
      realWorldExample:
        'When US interest rates rise, Wall Street banks trim discretionary software consulting budgets, slowing tech firm revenue growth.',
      keyMetricToWatch: 'Constant Currency (CC) Revenue Growth (%)',
    },
    {
      id: 'free_cash_flow',
      name: 'Free Cash Flow & Share Buybacks',
      icon: '💰',
      shortQuestion: 'How much real cash returns to shareholders?',
      explanation:
        'Without the need to build physical steel plants or real estate, top IT firms convert 80-100% of net profits into free cash flow, returning it through generous dividends and buybacks.',
      realWorldExample:
        'Infosys and TCS routinely return over 85% of annual free cash flow to shareholders via dividends and share buybacks.',
      keyMetricToWatch: 'FCF / Net Profit Conversion (%)',
    },
  ],

  miniChallenge: {
    id: 'tech_challenge_currency_tailwinds',
    title: 'The Currency Realization Equation',
    scenario:
      'An Indian software exporter earns $100M in revenue. Last year, the USD-INR exchange rate was ₹80 per Dollar (yielding ₹800 Crore). This year, the Rupee depreciated to ₹84 per Dollar while Dollar billing remained steady at $100M.',
    question: 'How did Rupee revenue change purely due to the exchange rate?',
    options: [
      {
        id: 'opt_tech_rupee_growth',
        text: 'Revenue jumped to ₹840 Crore (+5% purely from currency)',
        isCorrect: true,
        explanation:
          'Correct! Since $100M is now converted at ₹84 instead of ₹80, the company earns an extra ₹40 Crore in Indian Rupees with zero increase in project delivery costs.',
      },
      {
        id: 'opt_tech_rupee_fall',
        text: 'Revenue fell because the Rupee lost purchasing value',
        isCorrect: false,
        explanation:
          'Incorrect. Indian exporters benefit when foreign currencies strengthen, because their foreign revenue converts into more Indian Rupees at home.',
      },
      {
        id: 'opt_tech_no_change',
        text: 'No change because Dollar contracts remained at $100M',
        isCorrect: false,
        explanation:
          'Incorrect. While constant-currency revenue is flat in USD, reported Rupee financial statements show a lucrative 5% currency gain.',
      },
    ],
    xpReward: 50,
  },

  metricsHeadline: 'Learn the numbers that matter in Technology Services',
  metrics: [
    {
      id: 'metric_cc_growth',
      name: 'Constant Currency (CC) Revenue Growth',
      shortCode: 'CC REV',
      whatItMeans: 'The underlying revenue growth rate calculated by stripping out currency exchange rate fluctuations.',
      whyItMatters: 'Shows true business momentum. If reported revenue grew 6% but 4% was just currency movement, actual volume growth was only 2%.',
      sectorExample: 'Leading Indian IT firms target 6% - 12% CC growth during healthy global investment cycles.',
    },
    {
      id: 'metric_ebit_margin',
      name: 'Operating Margin (EBIT Margin)',
      shortCode: 'EBIT',
      whatItMeans: 'The profit remaining after paying software engineers, subcontractors, software licenses, and travel.',
      whyItMatters: 'Consistently 20% - 25% for tier-1 Indian leaders, indicating superior delivery leverage and cost discipline.',
      sectorExample: 'TCS maintaining 24% - 25% EBIT margins represents best-in-class global operational discipline.',
    },
    {
      id: 'metric_attrition',
      name: 'Trailing 12-Month (LTM) Attrition',
      shortCode: 'ATT',
      whatItMeans: 'The percentage of engineers who resigned or moved to other jobs over the past year.',
      whyItMatters: 'High attrition (20%+) forces companies to spend huge sums on recruitment and hiring expensive temporary subcontractors.',
      sectorExample: 'Healthy attrition sits between 11% and 14%, ensuring smooth project continuity for enterprise clients.',
    },
    {
      id: 'metric_utilization',
      name: 'Utilization Rate (Excluding Trainees)',
      shortCode: 'UTIL',
      whatItMeans: 'The percentage of total billable engineers actively assigned to revenue-generating client contracts.',
      whyItMatters: 'Direct driver of profitability. A 1% increase in utilization can add 20 to 30 basis points to company operating margins.',
      sectorExample: 'Target utilization typically ranges between 83% and 86% to maintain a reasonable buffer for new projects.',
    },
    {
      id: 'metric_tcv',
      name: 'Deal Total Contract Value (TCV)',
      shortCode: 'TCV',
      whatItMeans: 'The total cumulative revenue promised across all new contracts signed during the fiscal quarter.',
      whyItMatters: 'Leading indicator of future quarters. High TCV deal wins today translate into guaranteed revenue recognition tomorrow.',
      sectorExample: 'Reporting $10 Billion in quarterly deal wins guarantees a resilient revenue backlog for the upcoming years.',
    },
  ],

  companiesHeadline: 'Explore leading Indian Technology Companies',
  companies: [
    {
      id: 'tcs',
      name: 'Tata Consultancy Services (TCS)',
      tagline: 'The undisputed bellwether of global software services',
      businessDescription: 'Over 6 lakh global professionals powering the mission-critical digital systems of the world’s largest corporations.',
      icon: '🏢',
      productCategories: ['Banking & Financial Tech', 'Cloud & AI Infrastructure', 'Enterprise Solutions', 'Cognitive Business Ops'],
      primaryDrivers: ['Industry-Leading 25% EBIT Margins', 'Lowest Attrition in Sector', 'Massive $35B+ Deal Flow'],
      keyStrengths: 'Deep domain expertise in global banking, ultra-stable executive leadership, and multi-decade client retention.',
    },
    {
      id: 'infosys',
      name: 'Infosys Limited',
      tagline: 'Pioneer of the global delivery model and digital innovation',
      businessDescription: 'Renowned for world-class corporate governance, corporate training campuses, and AI platforms (Infosys Topaz).',
      icon: '⚡',
      productCategories: ['Digital Transformation', 'Cloud Services (Cobalt)', 'Generative AI (Topaz)', 'Finacle Core Banking'],
      primaryDrivers: ['Large Enterprise Deal Momentum', 'High Free Cash Flow', 'Digital Revenue Penetration'],
      keyStrengths: 'High proportion of high-margin digital revenue and cutting-edge corporate re-skilling programs.',
    },
    {
      id: 'hcltech',
      name: 'HCL Technologies',
      tagline: 'Engineering services, digital applications, and enterprise software products',
      businessDescription: 'Combines traditional IT outsourcing with high-tech software IP and complex product engineering.',
      icon: '🛠️',
      productCategories: ['Engineering & R&D Services', 'Hybrid Cloud', 'HCL Software IP', 'Cybersecurity'],
      primaryDrivers: ['Proprietary Software Revenues', 'Engineering Leadership', 'High Dividend Yield'],
      keyStrengths: 'Dominance in engineering R&D services and stable recurring license revenue from acquired enterprise software products.',
    },
  ],

  investigation: {
    id: 'case_tech_margin_puzzle',
    title: 'The Cloud Pivot Dilemma',
    companyName: 'Vertex Digital Solutions Ltd.',
    ticker: 'VERTEXDIGI',
    industry: 'Information Technology (IT) Services',
    level: 1,
    levelTitle: 'Technology Sector Investigation',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'Vertex celebrated a landmark $400M multi-year digital cloud contract win with a European banking consortium. Yet quarterly EBIT margins fell from 23% to 19%. Is Vertex winning hollow contracts or making a savvy long-term investment?',
    scenarioDescription: `Vertex Digital Solutions shares opened lower after management released financial results:
• 📑 Total Contract Value (TCV) set an all-time record at $400M
• 📈 Constant currency revenue grew +14% YoY
• 📉 However, operating profit margin (EBIT) plummeted 400 basis points from 23% to 19%
• 👥 Subcontractor expense surged +65% YoY

Investors were startled by the sudden margin drop. As a forensic technology analyst, you have 3 tokens to inspect the evidence room and determine whether this deal is destroying shareholder value or setting up high-margin recurring annuities for the next decade.`,
    stockChartSummary: {
      period: 'Past 6 Months',
      gain: '+8%',
      flatPeriod: 'Recent Post-Results 7% Dip',
      currentPrice: '₹1,240.00',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_subcontractor_costs',
        category: 'Earnings',
        title: '🔍 Investigate Third-Party Subcontractor Costs',
        metricLabel: 'Subcontractors Hired to Meet Rush Deadlines',
        metricValue: 'Subcontractor Costs: 14% of revenue (up from 7%)',
        summary: 'To deliver the cloud migration contract on time, Vertex hired expensive foreign freelancers at $140/hour.',
        deepDive: 'The European client mandated strict initial milestone deadlines. Because Vertex had not yet trained sufficient internal staff in the required specialized cloud architecture, it had to hire expensive on-site third-party contractors.',
        implication: 'concern',
        tags: ['Subcontractor Drag', 'Short-Term Margin Hit'],
      },
      {
        id: 'clue_annuity_tail',
        category: 'Cash Flow',
        title: '🔍 Investigate Contract Life-Cycle Margins',
        metricLabel: 'Phase 2 Managed Services Yields 27% EBIT',
        metricValue: 'Year 2-5 Contract Margin: Projected 27%',
        summary: 'The initial transition phase is low-margin, but the subsequent 4 years of managed cloud maintenance are highly profitable.',
        deepDive: 'Multi-year IT contracts feature an \'investment phase\' in year 1 where systems are overhauled, followed by a lucrative \'harvest phase\' in years 2 to 5 where automation takes over and margins expand past 27%.',
        implication: 'support',
        tags: ['High-Margin Annuity', 'Contract Life Cycle'],
      },
      {
        id: 'clue_reskilling_program',
        category: 'Competitors',
        title: '🔍 Investigate In-House Reskilling Progress',
        metricLabel: '4,500 In-House Engineers Completing Cloud Certification',
        metricValue: 'Certified Staff to Replace Contractors by Q3',
        summary: 'Vertex is rapidly certifying its own salaried engineers in India to replace expensive third-party freelancers.',
        deepDive: 'Management confirmed that 70% of high-cost on-site contractors will be phased out by the end of Q3 as internal engineering batches in Pune and Hyderabad take over remote maintenance.',
        implication: 'support',
        tags: ['Margin Recovery Catalyst', 'Talent Localization'],
      },
      {
        id: 'clue_client_cancellation_clause',
        category: 'Corporate Governance',
        title: '🔍 Investigate Contract Termination Clauses',
        metricLabel: 'Zero Early Exit Penalties for Client',
        metricValue: 'Client Can Exit with 60-Day Notice',
        summary: 'The European client reserved the right to cancel Phase 2 maintenance if milestone deadlines are breached.',
        deepDive: 'While the theoretical $400M deal size sounds massive, the bank consortium can walk away without major financial penalties if system transition is delayed.',
        implication: 'concern',
        tags: ['Contract Risk', 'Execution Vulnerability'],
      },
      {
        id: 'clue_free_cash_position',
        category: 'Valuation',
        title: '🔍 Investigate Cash Reserves & Debt',
        metricLabel: 'Zero Debt and ₹3,400 Crore Cash Cushion',
        metricValue: 'Net Cash: ₹3,400 Cr / Dividend Yield 2.8%',
        summary: 'Vertex has an impregnable balance sheet with zero financial leverage, easily absorbing transition investments.',
        deepDive: 'Even during the temporary margin squeeze, Vertex generated ₹420 Crore in free cash flow this quarter, fully funding its employee dividend commitments without taking loans.',
        implication: 'neutral',
        tags: ['Fortress Balance Sheet', 'Liquidity Safety'],
      },
    ],
    decisions: [
      {
        id: 'decision_evidence_needed_tech',
        label: 'More Evidence Needed — Margin Compression Temporary but Execution Dependent',
        stance: 'evidence_needed',
        thesisSummary:
          'The margin dip is standard for the initial setup phase of giant cloud contracts. If Vertex successfully replaces high-cost freelancers with in-house engineers by Q3, margins will rebound sharply.',
        reasoningScore: 95,
        debriefAnalysis:
          'Masterful analytical thinking! Large-scale digital IT contracts often exhibit an \'S-curve\' margin profile: expensive contractors compress margins during initial deployment, followed by high-margin automation during multi-year maintenance. Verifying that in-house engineers successfully phase out expensive third-party contractors without triggering the 60-day cancellation clause is the defining forensic milestone.',
        marketOutcome:
          'Vertex stabilized margins at 21.5% by Q3 as internal engineers assumed operational control, and the stock resumed its upward trajectory.',
        coreLesson:
          'In IT services, never judge a massive contract solely by its Year-1 margins. The real profit engine is the multi-year recurring managed maintenance that follows.',
      },
      {
        id: 'decision_stronger_tech',
        label: 'Stronger Thesis — Massive Deal Win Guarantees Record Shareholder Wealth',
        stance: 'stronger',
        thesisSummary:
          'A $400M deal is an undeniable victory. Margin drops are completely irrelevant when revenue is growing 14%.',
        reasoningScore: 65,
        debriefAnalysis:
          'Overlooks contract execution risks. A 400 bps drop in operating margins and high contractor expenses can easily turn into chronic margin leakage if the client terminates before Phase 2.',
        marketOutcome:
          'The market penalized the stock for two quarters until margin recovery was verified in quarterly earnings releases.',
        coreLesson:
          'Unprofitable revenue growth is dangerous. In IT services, revenue volume without margin discipline destroys free cash flow.',
      },
      {
        id: 'decision_concern_tech',
        label: 'Significant Concern — Ruinous Contract with Uncontrolled Cost Overruns',
        stance: 'concern',
        thesisSummary:
          'Vertex bid unrealistically low to win headlines. It is bleeding cash and will face devastating client penalties.',
        reasoningScore: 70,
        debriefAnalysis:
          'Overly catastrophic assessment. Vertex still produced a 19% EBIT margin and ₹420 Crore of net free cash flow with zero debt. It is far from bleeding cash, but navigating a standard contractor transition.',
        marketOutcome:
          'Pessimistic traders who shorted the stock were forced to cover as cash flows remained healthy and internal teams took over.',
        coreLesson:
          'Keep perspective: even a \'depressed\' 19% EBIT margin in Indian IT represents one of the most profitable business models in global industry.',
      },
    ],
  },
};
