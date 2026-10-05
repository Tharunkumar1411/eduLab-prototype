import { SectorData } from './types.ts';

export const PHARMA_SECTOR_DATA: SectorData = {
  id: 'pharma',
  name: 'Pharmaceuticals',
  icon: '💊',
  tagline: 'Global Generic Medicine & US FDA Pipelines',
  heroSummary:
    'Indian pharmaceutical companies manufacture over 40% of all generic prescription medicines consumed in the United States and vaccines worldwide. Learn what drives healthcare compounding.',
  estimatedTime: '8 min journey',

  whatIsIt: {
    simpleDefinition:
      'Pharmaceutical companies research, formulate, synthesize, and export chemical active pharmaceutical ingredients (APIs) and finished generic dosage forms (tablets, injectables, capsules).',
    examplesHeadline: 'Everyday pharmaceutical categories:',
    exampleItems: [
      { name: 'Generic Tablets', icon: '💊', category: 'Prescription Drugs' },
      { name: 'Active Ingredients', icon: '🧪', category: 'Chemical APIs' },
      { name: 'Biosimilars', icon: '🧬', category: 'Complex Biologics' },
      { name: 'Vaccines', icon: '💉', category: 'Preventative Health' },
      { name: 'OTC Wellness', icon: '🌿', category: 'Over-The-Counter' },
      { name: 'Sterile Injectables', icon: '🏥', category: 'Hospital Care' },
    ],
    beginnerMentalModel:
      'Think of an Indian generic pharma company as a high-precision chemical factory: when multi-billion dollar American blockbuster drugs go off-patent, Indian firms reverse-engineer them and sell the identical molecular medicine at a 90% discount.',
  },

  howItWorks: {
    headline: 'How Value and Money Move in Pharmaceuticals',
    explanation:
      'The journey from chemical synthesis to hospital prescription requires strict US FDA regulatory audits.',
    chainSteps: [
      {
        stepNumber: 1,
        title: 'Chemical Synthesis (API)',
        role: 'Synthesizing the active molecular medicine powder',
        cutOfValue: '15% - 25% of Manufacturing Cost',
        description: 'Produces high-purity chemical APIs under strict environmental and quality controls.',
        icon: '🧪',
      },
      {
        stepNumber: 2,
        title: 'Formulation & Sterile Fill',
        role: 'Compressing into tablets, packaging blisters, or bottling injectables',
        cutOfValue: '40% Formulation Value Add',
        description: 'Blends active drugs with inactive stabilizers in sterile cleanrooms.',
        icon: '🏭',
      },
      {
        stepNumber: 3,
        title: 'US FDA Regulatory Clearance',
        role: 'Passing Form 483 audit inspections and ANDA approvals',
        cutOfValue: 'Regulatory License to Export',
        description: 'Factory must pass surprise US FDA audits to maintain export rights to Western markets.',
        icon: '📋',
      },
      {
        stepNumber: 4,
        title: 'Global Wholesalers & Pharmacies',
        role: 'Distribution to CVS, Walgreens, and NHS hospitals',
        cutOfValue: 'Final Prescription Sales',
        description: 'Supplies affordable generic prescriptions to millions of patients worldwide.',
        icon: '🏥',
      },
    ],
    keyInsight:
      'A single US FDA warning letter (Form 483 or Import Alert) can ban a factory from exporting, making regulatory compliance the ultimate risk factor.',
  },

  driversHeadline: 'What makes a pharma company grow?',
  drivers: [
    {
      id: 'us_fda_approvals',
      name: 'US FDA Approvals & ANDA Pipeline',
      icon: '📋',
      shortQuestion: 'How many new generic drugs are cleared for sale in the US?',
      explanation:
        'Filing Abbreviated New Drug Applications (ANDAs) gives Indian firms the right to sell newly off-patent generic drugs in the lucrative US healthcare system.',
      realWorldExample:
        'Winning 180-day generic exclusivity on a $2 Billion blockbuster drug generates massive windfall profits.',
      keyMetricToWatch: 'ANDA Approvals & 180-Day Exclusivity Filings',
    },
    {
      id: 'price_erosion',
      name: 'US Generic Price Erosion',
      icon: '📉',
      shortQuestion: 'Are wholesale US drug prices falling due to intense competition?',
      explanation:
        'When 10 Indian and Israeli companies sell the exact same generic blood pressure pill, prices can collapse by 10% - 15% annually, squeezing profit margins.',
      realWorldExample:
        'Sun Pharma and Cipla pivoted from simple tablets to complex inhalers and injectables to escape generic price wars.',
      keyMetricToWatch: 'US Revenue Realization & Price Erosion (%)',
    },
    {
      id: 'domestic_branded',
      name: 'Domestic Branded Formulations (India)',
      icon: '🇮🇳',
      shortQuestion: 'How strong is the company\'s doctor prescription brand in India?',
      explanation:
        'In India, medicines are sold under doctor-prescribed brand names (e.g. Crocin, Augmentin). This creates sticky, recession-proof 25%+ operating margins with zero FDA volatility.',
      realWorldExample:
        'Torrent Pharma and Mankind Pharma earn over 70% of revenues from stable, high-margin Indian doctor prescriptions.',
      keyMetricToWatch: 'Indian Branded Formulation Growth (IPM %)',
    },
    {
      id: 'rd_spend',
      name: 'R&D Spend & Specialty Pipeline',
      icon: '🔬',
      shortQuestion: 'How much profit is reinvested into complex biologics and oncology?',
      explanation:
        'Pharma leaders reinvest 6% - 8% of revenue into clinical trials for complex biosimilars, dermatology, and injectables that competitors cannot easily copy.',
      realWorldExample:
        'Sun Pharma’s specialty dermatology drugs (Ilumya, Cequa) generate over $1 Billion in high-margin global sales.',
      keyMetricToWatch: 'R&D Spend (% of Sales)',
    },
  ],

  miniChallenge: {
    id: 'pharma_challenge_fda_clearance',
    title: 'The Regulatory Inspection Shock',
    scenario:
      'Pharma Corp earns 40% of its profits from its Halol injectable factory exporting to the US. Following an inspection, the US FDA issues an Official Action Indicated (OAI) and Import Alert banning all shipments from the plant until remediation is certified.',
    question: 'Why does the stock typically decline sharply on an Import Alert?',
    options: [
      {
        id: 'opt_pharma_revenue_halt',
        text: 'The factory cannot export to its most profitable market, cutting earnings immediately',
        isCorrect: true,
        explanation:
          'Spot on! An Import Alert legally blocks shipments to the US. Fixed factory overheads continue while revenues drop to zero, and remedying FDA observations often takes 18-24 months.',
      },
      {
        id: 'opt_pharma_positive',
        text: 'It is positive because the company saves on shipping and packaging costs',
        isCorrect: false,
        explanation:
          'Incorrect. Losing export clearance to the world’s most lucrative healthcare market severely impairs profits.',
      },
      {
        id: 'opt_pharma_irrelevant',
        text: 'It does not matter because other countries will easily buy the excess medicine',
        isCorrect: false,
        explanation:
          'Incorrect. The US market provides the highest gross margins; other countries cannot quickly absorb specialized drug formulations at identical prices.',
      },
    ],
    xpReward: 50,
  },

  metricsHeadline: 'Learn the numbers that matter in Pharmaceuticals',
  metrics: [
    {
      id: 'metric_rd_ratio',
      name: 'R&D as % of Sales',
      shortCode: 'R&D',
      whatItMeans: 'The proportion of revenue reinvested in clinical trials, synthetic chemistry, and patent filings.',
      whyItMatters: 'Healthy pharma innovators spend 6% - 8% on R&D to replace generic drugs that face price erosion.',
      sectorExample: 'Dr. Reddy’s spending ₹2,000 Crore annually on R&D ensures a continuous pipeline of complex hospital injectables.',
    },
    {
      id: 'metric_ebitda_pharma',
      name: 'EBITDA Margin',
      shortCode: 'OPM',
      whatItMeans: 'Operating profit percentage after active ingredient procurement, packaging, and regulatory audit costs.',
      whyItMatters: 'Firms with strong domestic branded prescriptions command 24% - 28% EBITDA margins.',
      sectorExample: 'Sun Pharma consistently sustaining 26% EBITDA margins highlights its shift to proprietary specialty dermatology.',
    },
    {
      id: 'metric_domestic_mix',
      name: 'Domestic vs US Export Mix',
      shortCode: 'GEO',
      whatItMeans: 'The revenue breakdown between stable Indian doctor prescriptions and competitive US wholesale exports.',
      whyItMatters: 'High domestic branded share provides predictable cash flow, while high US generic share increases regulatory volatility.',
      sectorExample: 'Companies with 50%+ domestic revenue trade at higher, more resilient valuation multiples.',
    },
  ],

  companiesHeadline: 'Explore leading Indian Pharmaceutical Companies',
  companies: [
    {
      id: 'sunpharma',
      name: 'Sun Pharmaceutical Industries',
      tagline: 'India’s largest pharma company & global specialty champion',
      businessDescription: 'Dominates domestic doctor prescriptions while expanding a proprietary global specialty dermatology and ophthalmology business.',
      icon: '💊',
      productCategories: ['Specialty Dermatology', 'Cardiology & Diabetology', 'Generic Formulations', 'Active APIs'],
      primaryDrivers: ['Global Specialty Sales', 'Domestic Chronic Leadership', 'High Cash Flow Generation'],
      keyStrengths: 'Deepest doctor relationship network in India and proven ability to acquire and turnaround distressed US drug assets.',
    },
    {
      id: 'drreddys',
      name: 'Dr. Reddy\'s Laboratories',
      tagline: 'Global generics, biosimilars, and active pharmaceutical ingredients',
      businessDescription: 'Renowned for complex generic filings, oncology treatments, and direct commercial presence across the US, Europe, and Russia.',
      icon: '🧪',
      productCategories: ['Oncology Generics', 'Biosimilar Injections', 'API Chemistry', 'Over-The-Counter'],
      primaryDrivers: ['US ANDA Approvals', 'Emerging Market Leadership', 'Biosimilar Pipeline'],
      keyStrengths: 'Superior chemical reverse-engineering and strong commercial infrastructure in emerging markets.',
    },
    {
      id: 'cipla',
      name: 'Cipla Limited',
      tagline: 'The pioneer of affordable respiratory inhalers & global access',
      businessDescription: 'A household name across India servicing respiratory asthma patients and providing affordable anti-retroviral treatments to developing nations.',
      icon: '🫁',
      productCategories: ['Asthma Inhalers', 'Anti-Infectives', 'Trade Generics', 'Consumer Health (Nicotex, Cipladine)'],
      primaryDrivers: ['Global Inhalation Leadership', 'Domestic Chronic Prescriptions', 'South Africa Commercial Scale'],
      keyStrengths: 'Near-monopoly in Indian respiratory medicine with unmatched patient trust and inhaler engineering.',
    },
  ],

  investigation: {
    id: 'case_pharma_fda_audit',
    title: 'The Form 483 Inspection Dilemma',
    companyName: 'Astraea Therapeutics Ltd.',
    ticker: 'ASTRAEAPHR',
    industry: 'Pharmaceutical Manufacturing',
    level: 1,
    levelTitle: 'Pharma Sector Investigation',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'Astraea Therapeutics fell 14% after US FDA inspectors issued Form 483 with 6 procedural observations at its flagship oral solid plant. Are these routine documentation lapses or serious sterility risks that threaten US exports?',
    scenarioDescription: `Astraea Therapeutics shares experienced heavy selling after the US FDA completed a 7-day inspection of its Baddi oral formulations facility:
• 📋 US FDA issued Form 483 with 6 procedural observations
• 📉 Stock plunged -14% in heavy Dalal Street turnover
• 💊 The facility contributes 24% of company revenue and 30% of US export profits
• ⚠️ Market commentators speculated on whether an Import Alert is imminent

As a forensic pharma analyst, use your 3 tokens to inspect the evidence room and determine whether management can resolve these observations within 60 days, or if an escalation to Warning Letter is likely.`,
    stockChartSummary: {
      period: 'Past 3 Months',
      gain: '-14%',
      flatPeriod: 'Post-Audit Nervous Trading',
      currentPrice: '₹680.00',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_data_integrity',
        category: 'Corporate Governance',
        title: '🔍 Investigate Audit Observation Severity (Data Integrity)',
        metricLabel: 'Zero Data Integrity Observations',
        metricValue: 'No Data Falsification or Sterility Failures',
        summary: 'Inspection notes confirm all 6 observations were procedural equipment cleaning logs, with zero data tampering or contaminated batches.',
        deepDive: 'The most dangerous FDA observations involve data integrity (deleting failed test results) or microbial contamination. Astraea’s observations related to computer maintenance timestamps and warehouse cleaning schedules — easily remediated without halting production.',
        implication: 'support',
        tags: ['Procedural Lapses', 'Zero Data Integrity Risk'],
      },
      {
        id: 'clue_site_transfer',
        category: 'Cash Flow',
        title: '🔍 Investigate Alternate Manufacturing Site Approvals',
        metricLabel: 'Dual-Site Approval for Top 3 US Blockbuster Drugs',
        metricValue: '65% of US Volume Can Be Produced at Indore Plant',
        summary: 'Astraea had already secured US FDA clearance to manufacture its top 3 US revenue-generating drugs at an alternate site in Indore.',
        deepDive: 'Even if the Baddi plant experiences temporary export delays, the company can shift 65% of US shipments to its newly audited, pristine Indore plant within 45 days.',
        implication: 'support',
        tags: ['Site Redundancy', 'Supply Chain De-risking'],
      },
      {
        id: 'clue_remediation_consultant',
        category: 'Earnings',
        title: '🔍 Investigate Remediation Expenses & Timeline',
        metricLabel: 'Hired Top US Regulatory Consultancy',
        metricValue: 'Remediation Budget: $4M / 90-Day Target',
        summary: 'Management immediately retained former FDA inspectors to overhaul quality assurance processes and file response within 15 business days.',
        deepDive: 'A comprehensive corrective and preventive action (CAPA) plan was submitted within the required 15-day window, satisfying the FDA district office review.',
        implication: 'neutral',
        tags: ['Swift Remediation', 'Regulatory Compliance'],
      },
      {
        id: 'clue_us_buyer_contracts',
        category: 'Competitors',
        title: '🔍 Investigate US Wholesaler Supply Penalties',
        metricLabel: 'Failure-to-Supply Penalty Clauses',
        metricValue: 'Wholesalers Can Assess Penalties if Stockouts Exceed 60 Days',
        summary: 'If remediation takes longer than 60 days, US supermarket pharmacy chains can buy from competitors and bill the price difference to Astraea.',
        deepDive: 'While procedural observations rarely cause immediate import alerts, any prolonged shipment pause could trigger contractual supply penalties from McKesson and AmerisourceBergen.',
        implication: 'concern',
        tags: ['Commercial Supply Penalty', 'Customer Risk'],
      },
      {
        id: 'clue_domestic_cash_cushion',
        category: 'Valuation',
        title: '🔍 Investigate Domestic Formulation Cash Flow',
        metricLabel: 'Indian Branded Business Growing +16% YoY',
        metricValue: 'Domestic EBITDA: ₹450 Cr with Zero Debt',
        summary: 'Astraea’s Indian doctor prescription franchise is booming, generating steady cash flow that covers all US remediation costs.',
        deepDive: 'The company is not dependent on US exports to stay solvent. Its Indian branded business generates robust 27% EBITDA margins with zero debt, ensuring healthy dividends.',
        implication: 'support',
        tags: ['Domestic Anchor', 'Balance Sheet Safety'],
      },
    ],
    decisions: [
      {
        id: 'decision_evidence_needed_pharma',
        label: 'More Evidence Needed — Manageable Procedural Audit Overblown by Panic',
        stance: 'evidence_needed',
        thesisSummary:
          'The 6 observations are procedural rather than data integrity failures, and dual-site approval in Indore protects 65% of volume. Verifying FDA acceptance of the CAPA plan is the key milestone.',
        reasoningScore: 95,
        debriefAnalysis:
          'Brilliant pharmaceutical forensics! Market participants frequently panic whenever the phrase "Form 483" appears. However, experienced analysts separate procedural documentation observations from catastrophic data integrity or sterility violations. With zero data integrity issues, alternate site approvals at Indore, and a strong domestic cash-generative core, Astraea’s 14% drop was an overreaction.',
        marketOutcome:
          'The FDA cleared the Baddi facility with a Voluntary Action Indicated (VAI) classification 4 months later, and the stock rebounded 22% from its panic lows.',
        coreLesson:
          'Never panic on a Form 483 headline alone. Always read the inspection observations: procedural cleaning issues are solvable; data deletion or microbial contamination is fatal.',
      },
      {
        id: 'decision_stronger_pharma',
        label: 'Stronger Thesis — Ignore the FDA; the 14% Dip is a Guaranteed Quick Profit',
        stance: 'stronger',
        thesisSummary:
          'FDA inspections are routine formalities. The stock will immediately jump back tomorrow.',
        reasoningScore: 60,
        debriefAnalysis:
          'Too reckless. Even procedural observations require thorough remediation budgets and can trigger commercial supply penalties if shipments stall.',
        marketOutcome:
          'The stock traded sideways for 3 months until the FDA formally accepted the corrective action response.',
        coreLesson:
          'Regulatory risk requires verification, not blind optimism. Always confirm that supply chain redundancies and corrective action plans are in place.',
      },
      {
        id: 'decision_concern_pharma',
        label: 'Significant Concern — Baddi is Finished and an Import Alert Will Bankrupt Astraea',
        stance: 'concern',
        thesisSummary:
          'Form 483 means the factory is unsafe. Astraea will lose all US revenue and collapse.',
        reasoningScore: 65,
        debriefAnalysis:
          'Completely missed the context of the observations. Form 483 is an initial observation report, not an Import Alert. Zero data integrity issues and strong alternate site manufacturing at Indore make bankruptcy impossible.',
        marketOutcome:
          'Short sellers were squeezed as the company shifted production to Indore and continued fulfilling US contracts without interruption.',
        coreLesson:
          'Form 483 does not mean Import Alert. Distinguish between an initial observation sheet and an escalating enforcement sanction.',
      },
    ],
  },
};
