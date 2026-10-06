import { SectorData } from './types.ts';

export const INFRASTRUCTURE_SECTOR_DATA: SectorData = {
  id: 'infrastructure',
  name: 'Infrastructure',
  icon: '🏗️',
  tagline: 'Highways, Metros, Ports & Order Books',
  heroSummary:
    'Engineering, Procurement, and Construction (EPC) firms construct dedicated freight rail corridors, expressways, airports, water supply grids, and high-tech ports.',
  estimatedTime: '8 min journey',

  whatIsIt: {
    simpleDefinition:
      'Infrastructure companies engineer and execute large-scale physical assets — national highways, bridges, metro transit lines, renewable transmission towers, and industrial ports.',
    examplesHeadline: 'Major infrastructure projects and categories:',
    exampleItems: [
      { name: 'Expressways & Roads', icon: '🛣️', category: 'Highway Corridors' },
      { name: 'Metro & Bullet Rail', icon: '🚆', category: 'Urban Mobility' },
      { name: 'Seaports & Docks', icon: '⚓', category: 'Maritime Trade' },
      { name: 'Water Pipelines', icon: '🚰', category: 'Irrigation & City Water' },
      { name: 'Transmission Grids', icon: '⚡', category: 'Power Transmission' },
      { name: 'Airport Terminals', icon: '✈️', category: 'Aviation Gateways' },
    ],
    beginnerMentalModel:
      'Think of an infrastructure giant as a nationwide general contractor: it bids on multi-thousand crore government tenders, mobilizes heavy earthmovers and civil engineers, and earns cash as milestone construction stages are certified.',
  },

  howItWorks: {
    headline: 'How Value and Money Move in Infrastructure',
    explanation:
      'Government tenders are awarded through competitive bidding, followed by multi-year execution and milestone billing.',
    chainSteps: [
      {
        stepNumber: 1,
        title: 'Government Tender Award',
        role: 'NHAI, Railways, or municipal bodies publish project contracts',
        cutOfValue: 'Order Book Contract Value',
        description: 'Awards multi-year EPC or HAM (Hybrid Annuity Model) contract to qualified engineering firms.',
        icon: '📜',
      },
      {
        stepNumber: 2,
        title: 'Procurement & Mobilization',
        role: 'Buying steel, cement, heavy earthmovers & hiring labor',
        cutOfValue: '70% - 80% Project Cost (Materials & Subcontracts)',
        description: 'Purchases thousands of tons of rebars, structural concrete, and arranges bank performance guarantees.',
        icon: '🏗️',
      },
      {
        stepNumber: 3,
        title: 'Milestone Engineering & Audit',
        role: 'Independent engineers certify completed kilometers or bridges',
        cutOfValue: 'Milestone Progress Bill',
        description: 'Third-party civil auditors verify quality before government disbursement vouchers are signed.',
        icon: '📏',
      },
      {
        stepNumber: 4,
        title: 'Cash Disbursement & Toll Revenue',
        role: 'Disbursement of funds and recurring highway toll collection',
        cutOfValue: 'Operating Margin (8% - 12%)',
        description: 'Generates free cash flow or recurring toll annuity payments over 15 to 30 years.',
        icon: '💵',
      },
    ],
    keyInsight:
      'The Order Book-to-Bill ratio (how many years of signed construction work are already secured) provides essential visibility into future revenue.',
  },

  driversHeadline: 'What makes an infrastructure company grow?',
  drivers: [
    {
      id: 'order_book',
      name: 'Order Book-to-Bill Ratio',
      icon: '📑',
      shortQuestion: 'How many years of guaranteed construction work are in the pipeline?',
      explanation:
        'An order book that is 3x to 4x annual revenue guarantees busy operations and revenue visibility for the next 3 to 4 years.',
      realWorldExample:
        'L&T’s massive ₹4.5 Lakh Crore order backlog ensures steady project execution regardless of single-quarter economic dips.',
      keyMetricToWatch: 'Order Inflow ($/₹ Cr) & Book-to-Bill Ratio',
    },
    {
      id: 'execution_speed',
      name: 'Project Execution & Working Capital',
      icon: '⚡',
      shortQuestion: 'Are projects being finished on schedule without cost overruns?',
      explanation:
        'Delays in land acquisition or environmental clearances tie up expensive bank guarantees and inflate labor costs, compressing profit margins.',
      realWorldExample:
        'Finishing a highway bypass 3 months ahead of schedule earns bonus incentives from government road authorities.',
      keyMetricToWatch: 'Working Capital Days & Mobilization Advances',
    },
    {
      id: 'ham_annuity',
      name: 'Hybrid Annuity Model (HAM)',
      icon: '🛣️',
      shortQuestion: 'Does the company receive guaranteed government annuity payments?',
      explanation:
        'Under HAM contracts, the government pays 40% during construction and the remaining 60% as guaranteed semi-annual annuities with interest, eliminating commercial traffic risk.',
      realWorldExample:
        'Road developers receive steady inflation-adjusted annuity checks from NHAI twice a year.',
      keyMetricToWatch: 'Annuity Cash Receipts & Debt-to-Equity',
    },
  ],

  miniChallenge: {
    id: 'infra_challenge_order_book',
    title: 'The Order Book Visibility Test',
    scenario:
      'An infrastructure firm earns ₹10,000 Crore in annual revenue. It enters the new fiscal year with an unexecuted Order Book of ₹32,000 Crore of signed government expressway contracts.',
    question: 'What is its Order Book-to-Bill ratio, and what does it mean?',
    options: [
      {
        id: 'opt_infra_correct',
        text: '3.2x — It has roughly 3.2 years of guaranteed revenue in the pipeline',
        isCorrect: true,
        explanation:
          'Spot on! ₹32,000 Cr order book divided by ₹10,000 Cr annual revenue gives an Order Book-to-Bill ratio of 3.2x, giving investors strong multi-year revenue visibility.',
      },
      {
        id: 'opt_infra_incorrect1',
        text: '0.31x — It has run out of future construction work',
        isCorrect: false,
        explanation:
          'Incorrect. The order book is more than three times annual revenue, indicating deep backlog, not a shortage.',
      },
      {
        id: 'opt_infra_incorrect2',
        text: '10x — It will complete all work in 10 months',
        isCorrect: false,
        explanation:
          'Incorrect. Order book to bill is calculated as Order Book divided by Annual Revenue.',
      },
    ],
    xpReward: 50,
  },

  metricsHeadline: 'Learn the numbers that matter in Infrastructure',
  metrics: [
    {
      id: 'metric_book_to_bill',
      name: 'Order Book-to-Bill Ratio',
      shortCode: 'OB/B',
      whatItMeans: 'Total pending contract value divided by annual revenue.',
      whyItMatters: 'Healthy contractors maintain 2.5x to 3.5x to ensure continuous equipment utilization without overextending management capacity.',
      sectorExample: 'An order book of ₹50,000 Crore on ₹15,000 Crore revenue equals a robust 3.3x ratio.',
    },
    {
      id: 'metric_working_capital_infra',
      name: 'Net Working Capital Days',
      shortCode: 'NWC',
      whatItMeans: 'The number of days cash remains tied up in pending government payment vouchers and material inventories.',
      whyItMatters: 'High working capital (120+ days) forces contractors to take high-interest bank overdrafts that erode profit margins.',
      sectorExample: 'Elite contractors keep net working capital under 75 days through strict milestone billing discipline.',
    },
  ],

  companiesHeadline: 'Explore leading Indian Infrastructure Companies',
  companies: [
    {
      id: 'lt',
      name: 'Larsen & Toubro (L&T)',
      tagline: 'The undisputed colossus of Indian engineering & nation building',
      businessDescription: 'Executes the most complex megaprojects in the world: expressways, dedicated rail corridors, airports, nuclear plants, and defense systems.',
      icon: '🏗️',
      productCategories: ['Transportation Infrastructure', 'Heavy Civil Megaprojects', 'Hydrocarbon Engineering', 'Defense & Aerospace'],
      primaryDrivers: ['Massive ₹4.5L Cr Order Backlog', 'Middle East Energy Tenders', 'International Scale'],
      keyStrengths: 'Unrivaled engineering execution capability, AAA credit rating, and multi-decade project delivery trust.',
    },
  ],

  investigation: {
    id: 'case_infra_cost_overrun',
    title: 'The Delayed Highway Conundrum',
    companyName: 'Apex Infra & Highways Ltd.',
    ticker: 'APEXINFRA',
    industry: 'Civil Infrastructure & Construction',
    level: 1,
    levelTitle: 'Infrastructure Sector Investigation',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'Apex Infra won a landmark ₹4,000 Crore coastal expressway contract, but shares dipped 8% after local reports highlighted land acquisition delays. Are profit margins threatened by inflation or protected by escalation clauses?',
    scenarioDescription: `Apex Infra shares encountered selling pressure after local news reports surfaced regarding its flagship highway project:
• 🏗️ ₹4,000 Crore highway contract awarded 8 months ago
• 📉 Stock fell -8% amid reports that only 65% of required land has been handed over by authorities
• 🔩 Steel and cement prices surged +12% during the delay period
• ⚠️ Investors fear massive margin erosion and heavy contractual delay penalties

As a forensic infrastructure analyst, use your 3 tokens to determine if Apex is headed for catastrophic cost overruns, or if contractual escalation protections defend profitability.`,
    stockChartSummary: {
      period: 'Past 4 Months',
      gain: '+5%',
      flatPeriod: 'Recent -8% Delay Pullback',
      currentPrice: '₹345.00',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_inflation_clause',
        category: 'Earnings',
        title: '🔍 Investigate Price Escalation Clauses (WPI/CPI Linked)',
        metricLabel: '100% Raw Material Cost Escalation Protection',
        metricValue: 'Government contract reimburses all steel/cement price increases',
        summary: 'The NHAI EPC contract features a mandatory Wholesale Price Index (WPI) escalation formula that automatically covers rising steel and cement costs.',
        deepDive: 'Standard modern government highway contracts legally insulate contractors from commodity spikes. If steel jumps 15%, the government’s monthly milestone disbursement increases proportionally.',
        implication: 'support',
        tags: ['Commodity Protection', 'Escalation Formula'],
      },
      {
        id: 'clue_penalty_grace_period',
        category: 'Corporate Governance',
        title: '🔍 Investigate Contractual Liquidated Damages & Milestones',
        metricLabel: 'Zero Contractor Fault for Land Right-of-Way Delays',
        metricValue: 'Time extension granted without delay penalty',
        summary: 'Under standard contract terms, delays caused by government land acquisition failure automatically extend project completion deadlines.',
        deepDive: 'Government rules dictate that authorities must provide 80% contiguous land before the clock on delay penalties begins. Because the government caused the delay, Apex cannot be fined.',
        implication: 'support',
        tags: ['Zero Legal Penalties', 'Extended Timeline'],
      },
      {
        id: 'clue_bank_guarantee_interest',
        category: 'Debt',
        title: '🔍 Investigate Bank Guarantee & Idled Equipment Costs',
        metricLabel: 'Idled Earthmoving Machinery Costs ₹8 Cr/Month',
        metricValue: 'Operating drag from idle heavy equipment',
        summary: 'While materials are reimbursed, idled cranes and bulldozers parked on site generate minor interest and overhead drag.',
        deepDive: 'Apex had to keep equipment on standby. Management successfully negotiated with authorities to redeploy 50% of heavy cranes to an adjacent operational expressway project.',
        implication: 'neutral',
        tags: ['Standby Overhead', 'Equipment Redeployment'],
      },
    ],
    decisions: [
      {
        id: 'decision_evidence_needed_infra',
        label: 'More Evidence Needed — Escalation Clauses Protect Margins; 8% Dip is Overblown',
        stance: 'evidence_needed',
        thesisSummary:
          'Mandatory price escalation clauses cover material inflation, and the lack of 80% right-of-way legally shields Apex from delay penalties. The 8% dip is an attractive entry.',
        reasoningScore: 95,
        debriefAnalysis:
          'Top-tier infrastructure forensics! Inexperienced investors often panic when land delays or steel inflation make headlines. However, modern highway contracts explicitly include Wholesale Price Index (WPI) escalation clauses and timeline extensions for government right-of-way lapses. Apex’s margins remain structurally intact.',
        marketOutcome:
          'The highway authority handed over the remaining land 60 days later with a formal timeline extension, and Apex stock rallied 16% as construction resumed at full pace.',
        coreLesson:
          'Always check the contract terms: modern EPC and HAM contracts pass commodity price inflation and right-of-way delays back to the government authority.',
      },
      {
        id: 'decision_stronger_infra',
        label: 'Stronger Thesis — Completely Disregard the News; Highway Delays Have Zero Impact',
        stance: 'stronger',
        thesisSummary:
          'Highway delays never matter at all. The company will instantly double in value.',
        reasoningScore: 60,
        debriefAnalysis:
          'Too dismissive. Idled machinery and tied-up bank guarantees do cause cash flow friction that requires active management redeployment.',
        marketOutcome:
          'The stock remained volatile until machinery redeployment was confirmed in quarterly filings.',
        coreLesson:
          'Verify that management has the operational agility to redeploy idled equipment and protect working capital.',
      },
      {
        id: 'decision_concern_infra',
        label: 'Significant Concern — Apex Will Suffer Crippling Liquidated Damages and Default',
        stance: 'concern',
        thesisSummary:
          'Apex missed milestone dates and will be bankrupted by government fines and steel price spikes.',
        reasoningScore: 65,
        debriefAnalysis:
          'Ignored standard contract protections. Contractual liquidated damages cannot be enforced when the government failed to provide contiguous right-of-way.',
        marketOutcome:
          'Pessimistic traders were forced to cover shorts when NHAI formally approved the project schedule extension.',
        coreLesson:
          'Differentiate between contractor negligence and client-side right-of-way bottlenecks.',
      },
    ],
  },
};
