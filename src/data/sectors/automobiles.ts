import { SectorData } from './types.ts';

export const AUTOMOBILES_SECTOR_DATA: SectorData = {
  id: 'automobiles',
  name: 'Automobiles',
  icon: '🚗',
  tagline: 'Volume Cycles, EVs & Operating Leverage',
  heroSummary:
    'Automakers build passenger cars, commercial transport trucks, tractors, and electric two-wheelers. Learn how high factory fixed costs create explosive profit swings (operating leverage).',
  estimatedTime: '10 min journey',

  whatIsIt: {
    simpleDefinition:
      'The automobile sector designs, engineers, and mass-produces road vehicles. It is capital-intensive, cyclical, and deeply tied to consumer credit and commodity raw material prices.',
    examplesHeadline: 'Major vehicle segments:',
    exampleItems: [
      { name: 'Passenger Cars & SUVs', icon: '🚙', category: 'Personal Mobility' },
      { name: 'Commercial Trucks', icon: '🚛', category: 'Freight & Logistics' },
      { name: 'Two-Wheelers & Scooters', icon: '🛵', category: 'Mass Transit' },
      { name: 'Electric Vehicles (EVs)', icon: '⚡', category: 'Clean Tech' },
      { name: 'Tractors & Farm Equip', icon: '🚜', category: 'Rural Agriculture' },
      { name: 'Auto Components', icon: '⚙️', category: 'Parts & Assemblies' },
    ],
    beginnerMentalModel:
      'Think of an automobile manufacturer as a giant robotic assembly line: when factories run at 90% capacity, profits explode because fixed machine costs are spread across thousands of cars; when factories sit half-empty, losses mount quickly.',
  },

  howItWorks: {
    headline: 'How Value and Money Move in the Automotive Chain',
    explanation:
      'An automobile requires over 20,000 precision parts assembled across tiered suppliers before reaching customer showrooms.',
    chainSteps: [
      {
        stepNumber: 1,
        title: 'Auto Component Suppliers',
        role: 'Tier-1 suppliers producing engines, brakes, tires & batteries',
        cutOfValue: '60% - 70% of Vehicle Cost (Raw materials & parts)',
        description: 'Supplies precision components (Minda, Bosch, MRF, Exide) to vehicle assembly plants.',
        icon: '⚙️',
      },
      {
        stepNumber: 2,
        title: 'Original Equipment Manufacturer (OEM)',
        role: 'Design, safety engineering, robotic stamping & final assembly',
        cutOfValue: '10% - 15% OEM Gross Margin',
        description: 'Automakers (Tata Motors, Maruti, Mahindra) assemble parts and establish nationwide dealership networks.',
        icon: '🏭',
      },
      {
        stepNumber: 3,
        title: 'Authorized Dealership',
        role: 'Showroom display, test drives, customer financing & post-sale servicing',
        cutOfValue: '4% - 6% Dealer Commission + Service Margins',
        description: 'Arranges bank auto loans, delivers registered cars, and earns high recurring margins on repairs.',
        icon: '🏪',
      },
      {
        stepNumber: 4,
        title: 'End Consumer / Fleet Operator',
        role: 'Commuter mobility or commercial goods transport',
        cutOfValue: 'Vehicle On-Road Purchase Price',
        description: 'Over 80% of passenger vehicles in India are purchased using 5-to-7 year bank auto financing.',
        icon: '🚘',
      },
    ],
    keyInsight:
      'Because automakers have massive fixed capital investments in tooling and robotics, every extra 10,000 cars sold produces a disproportionately huge leap in operating profit.',
  },

  driversHeadline: 'What makes an automobile company grow?',
  drivers: [
    {
      id: 'monthly_despatches',
      name: 'Monthly Wholesale Despatches',
      icon: '📊',
      shortQuestion: 'How many vehicles are being shipped to dealerships each month?',
      explanation:
        'Unlike other sectors that report numbers once a quarter, automakers publish exact factory shipment numbers on the 1st day of every month, giving immediate real-time insight into demand.',
      realWorldExample:
        'Maruti reporting 180,000 monthly despatches indicates booming showroom order books across hatchbacks and compact SUVs.',
      keyMetricToWatch: 'Monthly Wholesale Volume Units',
    },
    {
      id: 'operating_leverage',
      name: 'Operating Leverage & Capacity',
      icon: '🏭',
      shortQuestion: 'What percentage of factory plant capacity is actively being utilized?',
      explanation:
        'When factory utilization jumps from 65% to 90%, fixed costs (factory depreciation, engineering salaries) are spread over far more cars, causing operating profit margins to double or triple.',
      realWorldExample:
        'An automaker’s operating margin can surge from 6% to 14% purely because its factory ran at full capacity during a festival season.',
      keyMetricToWatch: 'Capacity Utilization (%)',
    },
    {
      id: 'raw_materials',
      name: 'Commodity Costs (Steel & Aluminum)',
      icon: '🔩',
      shortQuestion: 'Are metal and precious catalyst prices rising or falling?',
      explanation:
        'Steel, aluminum, copper, and rhodium constitute over 65% of an automobile’s production cost. Falling commodity prices create immediate margin windfalls unless price cuts are demanded by consumers.',
      realWorldExample:
        'When global steel prices drop 15%, auto gross profit margins expand by 150 to 250 basis points.',
      keyMetricToWatch: 'Raw Material to Sales Ratio (%)',
    },
    {
      id: 'asp_mix',
      name: 'Average Selling Price (ASP) & SUV Mix',
      icon: '💎',
      shortQuestion: 'Are consumers trading up to expensive SUVs and premium trims?',
      explanation:
        'Selling 100,000 premium SUVs generating ₹18 Lakh each produces vastly higher profits than selling 100,000 budget economy hatchbacks at ₹5 Lakh each.',
      realWorldExample:
        'Mahindra and Tata Motors saw profits explode when Indian consumers pivoted from budget small cars to high-margin SUVs with sunroofs and touchscreens.',
      keyMetricToWatch: 'Average Selling Price (ASP ₹/Unit) & SUV Share',
    },
    {
      id: 'ev_transition',
      name: 'Electric Vehicle (EV) Transition',
      icon: '🔋',
      shortQuestion: 'Is the company building scalable battery platforms and charging infrastructure?',
      explanation:
        'The global automotive shift from internal combustion engines (ICE) to batteries requires billions in R&D. Companies with dedicated EV platforms secure long-term relevance.',
      realWorldExample:
        'Tata Motors capturing over 70% of India’s passenger EV market with the Nexon.ev gave it huge first-mover valuation premiums.',
      keyMetricToWatch: 'EV Penetration (%) & Battery Localization',
    },
  ],

  miniChallenge: {
    id: 'auto_challenge_operating_leverage',
    title: 'The Operating Leverage Multiplier',
    scenario:
      'An auto assembly plant costs ₹1,000 Crore annually in fixed robotics and building costs. Last year it produced 100,000 cars (fixed cost: ₹100,000 per car). This year, booming demand boosted output to 200,000 cars while fixed plant costs stayed ₹1,000 Crore.',
    question: 'What happened to the fixed factory cost per car?',
    options: [
      {
        id: 'opt_auto_halved',
        text: 'Fixed cost per car dropped by 50% to ₹50,000',
        isCorrect: true,
        explanation:
          'Spot on! By doubling production across the same fixed factory equipment, fixed overhead per car was sliced in half. This is the magic of operating leverage, creating huge profit surges during economic booms.',
      },
      {
        id: 'opt_auto_doubled',
        text: 'Fixed cost per car doubled because more robots worked',
        isCorrect: false,
        explanation:
          'Incorrect. Fixed costs remain unchanged in total, so producing more vehicles spreads that fixed burden across more units.',
      },
      {
        id: 'opt_auto_unchanged',
        text: 'Cost per car remained unchanged',
        isCorrect: false,
        explanation:
          'Incorrect. When fixed overhead is divided by twice as many cars (200,000 vs 100,000), cost per unit drops drastically.',
      },
    ],
    xpReward: 50,
  },

  metricsHeadline: 'Learn the numbers that matter in Automobiles',
  metrics: [
    {
      id: 'metric_asp',
      name: 'Average Selling Price (ASP)',
      shortCode: 'ASP',
      whatItMeans: 'Total vehicle sales revenue divided by the total number of vehicles sold.',
      whyItMatters: 'Shows premiumization. Rising ASP means consumers are choosing higher-margin SUVs, automatic transmissions, and sunroof trims.',
      sectorExample: 'An OEM increasing its ASP from ₹8 Lakh to ₹11.5 Lakh signals lucrative market positioning.',
    },
    {
      id: 'metric_ebitda_auto',
      name: 'EBITDA Margin per Vehicle',
      shortCode: 'OPM',
      whatItMeans: 'Operating profit earned on each vehicle sold after component, labor, and plant running costs.',
      whyItMatters: 'Varies between 8% (economy small cars) to 16%+ (luxury SUVs and heavy commercial haulers).',
      sectorExample: 'Maintaining 12% - 14% EBITDA margins through commodity cycles indicates superior manufacturing efficiency.',
    },
    {
      id: 'metric_roce_auto',
      name: 'Return on Capital Employed (ROCE)',
      shortCode: 'ROCE',
      whatItMeans: 'Measures how efficiently the company allocates giant capital expenditures into new vehicle platforms.',
      whyItMatters: 'Since factories require billions of rupees, automakers must achieve 18%+ ROCE during boom years to cushion against downcycles.',
      sectorExample: 'Top automakers deliver 20%+ ROCE by sharing universal chassis platforms across multiple vehicle models.',
    },
    {
      id: 'metric_dealer_inventory',
      name: 'Dealer Inventory Days (Channel Stock)',
      shortCode: 'INV',
      whatItMeans: 'The number of days of unsold vehicle stock sitting parked in dealership showroom yards.',
      whyItMatters: 'Healthy dealer stock is 25-35 days. If inventory spikes to 60+ days, it signals slowing customer demand and discounts ahead.',
      sectorExample: 'Dealers offering steep 10% discounts warning of excessive channel inventory on showroom lots.',
    },
  ],

  companiesHeadline: 'Explore leading Indian Automobile Companies',
  companies: [
    {
      id: 'tatamotors',
      name: 'Tata Motors Ltd.',
      tagline: 'India’s EV pioneer and global luxury SUV maker (JLR)',
      businessDescription: 'A global automobile powerhouse encompassing commercial transport trucks, Indian passenger cars & EVs, and luxury Jaguar Land Rover vehicles.',
      icon: '🚗',
      productCategories: ['Nexon & Punch SUVs', 'Electric Vehicles (EVs)', 'Commercial Heavy Trucks', 'Range Rover & Defender'],
      primaryDrivers: ['EV Market Dominance (>70%)', 'SUV Consumer Shift', 'JLR Luxury Order Book'],
      keyStrengths: 'First-mover advantage in Indian affordable EVs and high-margin turnaround at Jaguar Land Rover.',
    },
    {
      id: 'maruti',
      name: 'Maruti Suzuki India',
      tagline: 'The undisputed volume king of Indian passenger mobility',
      businessDescription: 'Commands roughly 40-42% of the Indian passenger car market through unbeatable fuel economy and 4,000+ service centers.',
      icon: '🚙',
      productCategories: ['Brezza & Grand Vitara', 'Swift & Baleno', 'CNG Powertrains', 'NEXA Premium Retail'],
      primaryDrivers: ['Unrivaled Distribution Network', 'Ultra-Low Production Cost', 'CNG Market Leadership'],
      keyStrengths: 'Highest resale value, lowest maintenance cost, and highest showroom footprint across rural India.',
    },
    {
      id: 'mahindra',
      name: 'Mahindra & Mahindra (M&M)',
      tagline: 'Authentic rugged SUVs and farm tractor dominance',
      businessDescription: 'Dominates the authentic diesel and turbo-petrol SUV market while anchoring the global farm tractor market.',
      icon: '🚜',
      productCategories: ['Scorpio-N & XUV700', 'Thar & Roxx 4x4', 'Farm Tractors', 'Last-Mile Electric 3-Wheelers'],
      primaryDrivers: ['SUV Waiting Periods', 'Rural Farm Mechanization', 'High Operating Margins'],
      keyStrengths: 'Iconic brand loyalty among SUV enthusiasts and formidable pricing power in lifestyle off-road vehicles.',
    },
  ],

  investigation: {
    id: 'case_auto_volume_surge',
    title: 'The Showroom Inventory Mirage',
    companyName: 'Velocity Motors Ltd.',
    ticker: 'VELOCITYAUTO',
    industry: 'Automobile Manufacturing',
    level: 1,
    levelTitle: 'Automobile Sector Investigation',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'Velocity Motors announced record-breaking factory despatches, up +26% YoY. Yet its shares sank -9% after reports surfaced from authorized dealership associations. Are actual consumers buying cars, or are dealers running out of parking space?',
    scenarioDescription: `Velocity Motors reported stunning headline production numbers on the 1st of the month:
• 🚗 Monthly wholesale despatches to dealer showrooms jumped +26% YoY
• 💰 Reported revenue surged +28% with expanding factory EBITDA margins
• 📉 Yet dealership associations warned that showroom inventory touched an alarming 68 days (normal: 30 days)
• 🏷️ Dealers began offering unadvertised ₹60,000 cash discounts to clear crowded parking lots

As a forensic automotive analyst, use your 3 tokens to uncover whether Velocity has genuine consumer pull, or if factory management is artificially dumping cars on dealers to report cosmetic quarterly revenue.`,
    stockChartSummary: {
      period: 'Past 6 Months',
      gain: '+19%',
      flatPeriod: 'Recent -9% Post-Inventory Dip',
      currentPrice: '₹915.00',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_retail_vahan',
        category: 'Earnings',
        title: '🔍 Investigate Government Vehicle Registration Data (Vahan)',
        metricLabel: 'Wholesale Despatches (+26%) vs Retail Registrations (+3%)',
        metricValue: 'Vahan Registrations: Only +3% YoY',
        summary: 'While Velocity shipped 26% more cars out of factory gates, actual buyers registering vehicles grew only 3%.',
        deepDive: 'Wholesale despatches measure cars sold to dealers, not cars sold to end families. Government Vahan registration data proves that showroom footfalls were sluggish and cars are piling up in dealer stockyards.',
        implication: 'concern',
        tags: ['Channel Stuffing Risk', 'Wholesale vs Retail Divergence'],
      },
      {
        id: 'clue_dealer_financing_costs',
        category: 'Debt',
        title: '🔍 Investigate Dealer Floorplan Inventory Debt',
        metricLabel: 'Dealer Inventory Days Climbed to 68 Days',
        metricValue: 'Dealer Financing Cost +48% YoY',
        summary: 'Dealerships borrow money from banks to buy cars from the factory. High inventory is forcing dealers into heavy interest burdens.',
        deepDive: 'Dealers pay 10.5% interest on unsold lot inventory. With 68 days of unsold cars parked on lots, dealer margins have evaporated, forcing them to threaten factory order cancellations.',
        implication: 'concern',
        tags: ['Dealer Stress', 'Inventory Bottleneck'],
      },
      {
        id: 'clue_suv_order_book',
        category: 'Cash Flow',
        title: '🔍 Investigate New Electric SUV Waiting List',
        metricLabel: 'Flagship EV Model Has 45,000 Unfilled Bookings',
        metricValue: 'Waiting Period: 4 Months for Flagship EV SUV',
        summary: 'While budget economy hatchbacks are piling up unsold, Velocity’s new electric SUV has genuine customer queues.',
        deepDive: 'The excess inventory is concentrated entirely in outdated manual transmission budget cars. The new premium EV model is selling out instantly with zero dealer discounts and 18% gross margins.',
        implication: 'support',
        tags: ['Product Mix Shift', 'EV Order Book'],
      },
      {
        id: 'clue_production_cut_plan',
        category: 'Competitors',
        title: '🔍 Investigate Factory Production Re-tooling',
        metricLabel: 'Plant Scheduled for 10-Day Maintenance Re-alignment',
        metricValue: 'Shift Capacity from Hatchbacks to Premium SUVs',
        summary: 'Management is taking a 10-day planned shutdown to re-tool slow hatchback lines toward booming EV SUVs.',
        deepDive: 'Rather than continuing to dump unsellable budget cars on dealers, Velocity is pausing production to re-align assembly robots toward high-demand SUVs, which will normalize channel inventory within 60 days.',
        implication: 'support',
        tags: ['Capacity Realignment', 'Operational Discipline'],
      },
      {
        id: 'clue_raw_material_cushion',
        category: 'Valuation',
        title: '🔍 Investigate Steel & Aluminum Contracts',
        metricLabel: 'Locked-In Raw Material Prices for Next 2 Quarters',
        metricValue: 'Steel Cost Locked in at 8% Below Spot Market',
        summary: 'Favorable metal procurement contracts will protect manufacturing margins even if promotional discounts are offered.',
        deepDive: 'Velocity entered into bulk commodity forward contracts that reduce component costs by 220 bps, allowing it to co-fund dealer discount schemes without cratering its EBITDA margins.',
        implication: 'neutral',
        tags: ['Margin Buffer', 'Commodity Contracts'],
      },
    ],
    decisions: [
      {
        id: 'decision_evidence_needed_auto',
        label: 'More Evidence Needed — Channel Inventory Excess Balanced by Strong EV Order Book',
        stance: 'evidence_needed',
        thesisSummary:
          'Velocity faces near-term channel congestion in slow budget models, but the 45,000 unfilled EV SUV bookings and planned factory re-tooling offer a clear path to normalization.',
        reasoningScore: 95,
        debriefAnalysis:
          'Exceptional automotive forensics! You recognized the classic auto trap: wholesale despatches were artificially outpacing retail Vahan registrations, creating dangerous dealer inventory pileups (68 days). However, instead of a chronic structural breakdown, the problem is a product mix mismatch (too many old hatchbacks, high demand for new EV SUVs). Monitoring dealer inventory normalization over the next 60 days post-shutdown is the decisive investment checkpoint.',
        marketOutcome:
          'Velocity successfully cleared dealer inventory using festival discounts, and the launch of the second-generation EV SUV drove earnings to new highs the following year.',
        coreLesson:
          'In the auto industry, wholesale factory despatches do not equal end-consumer demand. Always cross-verify wholesale shipments against retail registration data (Vahan) and dealer inventory days.',
      },
      {
        id: 'decision_stronger_auto',
        label: 'Stronger Thesis — Wholesale Despatch Surge Signals Massive Automotive Boom',
        stance: 'stronger',
        thesisSummary:
          'A 26% despatch jump is phenomenal. Dealer complaints are routine noise that will be forgotten once revenue is recognized.',
        reasoningScore: 60,
        debriefAnalysis:
          'Flawed analysis. Disregarding a 68-day dealer inventory backlog and ignoring that retail Vahan registrations only grew 3% is dangerous. If dealers run out of credit, factory shipments will abruptly screech to a halt next quarter.',
        marketOutcome:
          'Shipments stalled completely the following quarter when dealers refused new despatches, catching unobservant investors off guard.',
        coreLesson:
          'Dealers cannot borrow money forever to park unsold cars. When channel inventory exceeds 45 days, factory production cuts are inevitable.',
      },
      {
        id: 'decision_concern_auto',
        label: 'Significant Concern — Fatal Channel Stuffing and Collapsing Business Model',
        stance: 'concern',
        thesisSummary:
          'Velocity is committing balance sheet fraud by forcing cars on insolvent dealers. The business is entering a terminal collapse.',
        reasoningScore: 70,
        debriefAnalysis:
          'Overstated severity. While channel inventory was undeniably stretched, Velocity possessed 45,000 advance customer bookings for its EV model, locked-in steel cost savings, and the operational agility to shut down lines and re-tool within 10 days. It was not fraudulent collapse, but cyclical channel management.',
        marketOutcome:
          'The stock quickly recovered from its -9% dip once the 10-day plant realignment cleared the showroom bottleneck.',
        coreLesson:
          'Distinguish between temporary channel inventory indigestion (common in auto cycles) and catastrophic structural failure.',
      },
    ],
  },
};
