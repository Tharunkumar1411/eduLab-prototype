import { SectorData } from './types.ts';

export const ENERGY_SECTOR_DATA: SectorData = {
  id: 'energy',
  name: 'Energy',
  icon: '⚡',
  tagline: 'Power Generation, Refining & Renewables',
  heroSummary:
    'Energy conglomerates refine petroleum into fuels and petrochemicals, operate national pipelines, and build utility-scale solar and wind generation parks.',
  estimatedTime: '8 min journey',

  whatIsIt: {
    simpleDefinition:
      'The energy sector supplies the indispensable power and transport fuel required for everyday economic activity, spanning traditional oil refining and emerging renewable clean tech.',
    examplesHeadline: 'Everyday energy supplies and products:',
    exampleItems: [
      { name: 'Petrol & Diesel', icon: '⛽', category: 'Transportation Fuels' },
      { name: 'Solar Parks', icon: '☀️', category: 'Renewable Power' },
      { name: 'Natural Gas', icon: '🔥', category: 'City Gas & Heating' },
      { name: 'Wind Turbines', icon: '💨', category: 'Clean Generation' },
      { name: 'Petrochemicals', icon: '🧪', category: 'Plastics & Polymers' },
      { name: 'Green Hydrogen', icon: '💧', category: 'Future Energy' },
    ],
    beginnerMentalModel:
      'Think of energy as the universal fuel of modern civilization: without power and refined fuel, factories stop running, vehicles cannot commute, and supply chains grind to a halt.',
  },

  howItWorks: {
    headline: 'How Value and Money Move in Energy',
    explanation:
      'Crude oil is converted into transport fuel, or solar radiation is converted into kilowatt-hours delivered to the national grid.',
    chainSteps: [
      {
        stepNumber: 1,
        title: 'Exploration & Upstream',
        role: 'Offshore drilling and natural gas extraction',
        cutOfValue: 'Crude Oil Extraction Cost',
        description: 'Extracts raw hydrocarbons from offshore basins or imports international Brent crude tankers.',
        icon: '🛢️',
      },
      {
        stepNumber: 2,
        title: 'Refining & Petrochemical Cracking',
        role: 'Cracking crude into petrol, diesel, jet fuel & polymers',
        cutOfValue: 'Gross Refining Margin (GRM)',
        description: 'Giant multi-billion dollar refineries transform raw crude into high-value clean transport fuels.',
        icon: '🏭',
      },
      {
        stepNumber: 3,
        title: 'Marketing & Distribution',
        role: 'Pipelines, retail fuel stations & city gas networks',
        cutOfValue: 'Retail Fuel Margin',
        description: 'Transports fuel through underground pipelines to thousands of highway petrol pumps.',
        icon: '⛽',
      },
      {
        stepNumber: 4,
        title: 'Consumers & Industry',
        role: 'Daily mobility, aviation flights, plastics & electrical grid',
        cutOfValue: 'Final Energy Consumption',
        description: 'Powers millions of daily vehicle commutes and supplies electricity to commercial factories.',
        icon: '🏙️',
      },
    ],
    keyInsight:
      'The Gross Refining Margin (GRM) — the dollar spread per barrel between the cost of crude oil and the market value of refined fuel — is the primary driver of refinery profits.',
  },

  driversHeadline: 'What makes an energy company grow?',
  drivers: [
    {
      id: 'grm',
      name: 'Gross Refining Margins (GRM)',
      icon: '🛢️',
      shortQuestion: 'How much profit does the refinery make on each barrel of crude?',
      explanation:
        'GRM measures the difference between the price of raw imported crude oil and the sales value of refined fuels (petrol, diesel, jet fuel). Higher GRMs create massive cash windfalls.',
      realWorldExample:
        'A $12/barrel GRM allows high-complexity refineries to generate thousands of crores in quarterly free cash flow.',
      keyMetricToWatch: 'GRM ($/barrel)',
    },
    {
      id: 'renewables_capacity',
      name: 'Renewable Power Capacity',
      icon: '☀️',
      shortQuestion: 'How many gigawatts (GW) of green solar and wind are being built?',
      explanation:
        'With long-term 25-year Power Purchase Agreements (PPAs) signed with state utilities, renewable parks provide guaranteed, predictable annuity revenues with zero fuel cost.',
      realWorldExample:
        'Building 20 GW of solar installations locks in steady cash flow insulated from fossil fuel price swings.',
      keyMetricToWatch: 'Operational Renewable Capacity (GW)',
    },
    {
      id: 'crude_volatility',
      name: 'Crude Oil Price Swings',
      icon: '📈',
      shortQuestion: 'How do global oil prices impact inventory gains or losses?',
      explanation:
        'When crude prices climb, refineries book inventory gains on oil stored in transit tanks; when oil crashes, inventory markdowns occur.',
      realWorldExample:
        'Sudden geopolitical tensions in the Middle East can trigger sharp fluctuations in refinery inventory earnings.',
      keyMetricToWatch: 'Brent Crude ($/barrel)',
    },
  ],

  miniChallenge: {
    id: 'energy_challenge_grm',
    title: 'The Refining Spread Calculation',
    scenario:
      'A refinery purchases crude oil at $75 per barrel. It processes the crude into petrol, diesel, and aviation fuel that sell for a combined value of $87 per barrel. Operational factory costs are $3 per barrel.',
    question: 'What is the Gross Refining Margin (GRM)?',
    options: [
      {
        id: 'opt_energy_correct',
        text: '$12 per barrel ($87 products - $75 crude)',
        isCorrect: true,
        explanation:
          'Correct! The Gross Refining Margin is the gross difference between finished product value ($87) and raw crude cost ($75), equaling $12/barrel.',
      },
      {
        id: 'opt_energy_incorrect1',
        text: '$9 per barrel',
        isCorrect: false,
        explanation:
          'Incorrect. $9 is the Net margin after factory operating expenses ($12 GRM - $3 operating costs), whereas Gross Refining Margin is $12.',
      },
      {
        id: 'opt_energy_incorrect2',
        text: '$75 per barrel',
        isCorrect: false,
        explanation:
          'Incorrect. $75 was the input cost of the crude oil.',
      },
    ],
    xpReward: 50,
  },

  metricsHeadline: 'Learn the numbers that matter in Energy',
  metrics: [
    {
      id: 'metric_grm',
      name: 'Gross Refining Margin (GRM)',
      shortCode: 'GRM',
      whatItMeans: 'The gross dollar value generated per barrel of crude oil refined into petroleum products.',
      whyItMatters: 'Direct measure of refinery efficiency. High complexity refineries extract premium jet fuel and petrochemicals, earning premium GRMs.',
      sectorExample: 'Reliance’s Jamnagar refinery consistently achieves a $3 to $5/barrel premium over Singapore benchmark margins.',
    },
    {
      id: 'metric_capex',
      name: 'Capital Expenditure (Capex)',
      shortCode: 'CAPEX',
      whatItMeans: 'The multi-billion dollar investment needed to build solar gigafactories, refineries, and pipelines.',
      whyItMatters: 'Energy is capital intensive; companies with high cash flow can fund green transition capex without taking dangerous debt.',
      sectorExample: 'Allocating ₹75,000 Crore toward solar modules and green hydrogen ecosystems.',
    },
  ],

  companiesHeadline: 'Explore leading Indian Energy Companies',
  companies: [
    {
      id: 'reliance',
      name: 'Reliance Industries Ltd.',
      tagline: 'World’s largest refining complex & green energy transition leader',
      businessDescription: 'Operates the ultra-complex Jamnagar refining hub while constructing massive solar gigafactories and green hydrogen infrastructure.',
      icon: '⚡',
      productCategories: ['Transportation Fuels', 'Petrochemical Polymers', 'Solar Gigafactories', 'Natural Gas (KG-D6)'],
      primaryDrivers: ['Global GRM Premium', 'Petrochemical Integration', 'New Energy Scale'],
      keyStrengths: 'Deepest petrochemical integration and unrivaled capital allocation scale in the Indian market.',
    },
    {
      id: 'ntpc',
      name: 'NTPC Limited',
      tagline: 'India’s premier power generator pivoting rapidly to green renewables',
      businessDescription: 'Supplies roughly 25% of India’s daily electricity consumption through ultra-reliable thermal plants and expanding solar parks.',
      icon: '💡',
      productCategories: ['Grid Electricity', 'Utility Solar Parks', 'Hydro Power', 'Pumped Storage'],
      primaryDrivers: ['Guaranteed Return on Equity (CERC)', 'Renewable Capacity Additions', 'Coal Stock Availability'],
      keyStrengths: 'Government regulatory framework guaranteeing 15.5% post-tax return on equity on power stations.',
    },
  ],

  investigation: {
    id: 'case_energy_windfall_tax',
    title: 'The Refining Windfall Puzzle',
    companyName: 'Titan Petrochem & Energy Ltd.',
    ticker: 'TITANENRGY',
    industry: 'Energy & Refining',
    level: 1,
    levelTitle: 'Energy Sector Investigation',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'Titan Petrochem posted record Gross Refining Margins of $18/barrel, but shares dropped 6% after government officials announced a special export levy. Will the tax destroy profits or are cash flows still resilient?',
    scenarioDescription: `Titan Petrochem reported blowout quarterly earnings as international diesel shortages pushed GRMs to historic highs:
• 🛢️ Gross Refining Margin (GRM) hit $18.20/barrel (up from $9.50)
• 💰 Reported EBITDA doubled YoY
• ⚠️ However, the government imposed a ₹10/liter Special Additional Excise Duty (Windfall Tax) on diesel exports
• 📉 Stock traded 6% lower on concerns that the government will capture all excess profits

As an investigative energy analyst, inspect the evidence room to determine if the windfall tax kills earnings, or if domestic demand and petrochemical integration preserve cash flow.`,
    stockChartSummary: {
      period: 'Past 3 Months',
      gain: '+12%',
      flatPeriod: 'Post-Levy 6% Retracement',
      currentPrice: '₹2,380.00',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_tax_calibration',
        category: 'Corporate Governance',
        title: '🔍 Investigate Government Tax Review Cadence',
        metricLabel: 'Bi-Weekly Fortnightly Tax Calibration',
        metricValue: 'Government adjusts levy every 14 days based on global crude',
        summary: 'The windfall tax is not permanent; it recalibrates every 2 weeks and drops automatically when international margins normalize.',
        deepDive: 'Official gazette rules specify that when global diesel spreads fall below threshold limits, the export levy is reduced to zero, ensuring refineries never operate at a net loss.',
        implication: 'support',
        tags: ['Dynamic Taxation', 'Zero Structural Impairment'],
      },
      {
        id: 'clue_petrochem_immunity',
        category: 'Earnings',
        title: '🔍 Investigate Petrochemical Margin Resilience',
        metricLabel: 'Petrochemicals (35% of Revenue) Exempt from Levy',
        metricValue: 'Polymers & Chemical Feedstocks have zero export tax',
        summary: 'Over a third of Titan\'s refinery output is converted into petrochemicals and polymers, which carry zero windfall taxes.',
        deepDive: 'The windfall levy applies exclusively to transport fuels (petrol, diesel, ATF). Titan’s integrated petrochemical crackers convert crude into plastic resins that sell at high international prices untaxed.',
        implication: 'support',
        tags: ['Petrochemical Moat', 'Tax Exemption'],
      },
      {
        id: 'clue_domestic_obligation',
        category: 'Cash Flow',
        title: '🔍 Investigate Domestic Retail Supply Mandates',
        metricLabel: 'Mandate to Supply 30% of Diesel to Domestic Pumps',
        metricValue: 'Domestic retail diesel sold at regulated state prices',
        summary: 'To maintain export licenses, the government required 30% of diesel production to be sold domestically at capped retail prices.',
        deepDive: 'Selling 30% of fuel domestically caps maximum export gains, reducing theoretical peak profits by roughly $3.50 per barrel.',
        implication: 'concern',
        tags: ['Domestic Price Cap', 'Margin Drag'],
      },
    ],
    decisions: [
      {
        id: 'decision_evidence_needed_energy',
        label: 'More Evidence Needed — Windfall Tax Manageable; Petrochemical Moat Preserves Cash',
        stance: 'evidence_needed',
        thesisSummary:
          'The 6% drop is an emotional reaction. Bi-weekly tax calibrations and exempt petrochemical streams ensure Titan still earns well above historical mid-cycle GRMs.',
        reasoningScore: 95,
        debriefAnalysis:
          'Expert energy forensics! Windfall taxes are dynamic political shock absorbers: governments institute them during extreme spikes and repeal them when margins cool. Because Titan has high petrochemical integration and the tax adjusts every 14 days, its underlying cash flows remain exceptionally healthy.',
        marketOutcome:
          'The government reduced the windfall levy 6 weeks later as diesel spreads cooled, and Titan stock rallied 18% to new highs.',
        coreLesson:
          'Do not extrapolate temporary government windfall taxes into permanent structural earnings collapse. Always check the revision cadence and product exemptions.',
      },
      {
        id: 'decision_stronger_energy',
        label: 'Stronger Thesis — Ignore the Government Tax; Profits Will Break All Records',
        stance: 'stronger',
        thesisSummary:
          'An $18 GRM is invincible. Taxes are just minor line items that do not matter.',
        reasoningScore: 60,
        debriefAnalysis:
          'Too dismissive of government policy. The windfall levy and 30% domestic supply mandate did shave ~$3.50/barrel off realized margins.',
        marketOutcome:
          'Quarterly results missed peak bullish estimates by 10% before stabilizing.',
        coreLesson:
          'Sovereign regulatory interventions cannot be ignored; they set clear caps on peak commodity earnings.',
      },
      {
        id: 'decision_concern_energy',
        label: 'Significant Concern — Complete Destruction of Export Profitability',
        stance: 'concern',
        thesisSummary:
          'The government has confiscated all profits. Titan is uninvestable.',
        reasoningScore: 65,
        debriefAnalysis:
          'Overstated the damage. Even with the levy, Titan’s net realized GRM of ~$13/barrel was far higher than the 10-year historical average of $8.50/barrel.',
        marketOutcome:
          'Panic sellers missed a substantial dividend payout as free cash flow remained abundant.',
        coreLesson:
          'Always benchmark against mid-cycle averages: high taxes on record profits still leave higher net cash than normal years.',
      },
    ],
  },
};
