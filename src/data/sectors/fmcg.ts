import { SectorData } from './types.ts';

export const FMCG_SECTOR_DATA: SectorData = {
  id: 'fmcg',
  name: 'FMCG',
  icon: '🛒',
  tagline: 'Everyday products. Huge businesses.',
  heroSummary:
    'FMCG companies sell products people buy frequently — from food and personal care to household essentials. Learn what drives their recurring cash flows and high returns.',
  estimatedTime: '12 min journey',

  whatIsIt: {
    simpleDefinition:
      'FMCG stands for Fast-Moving Consumer Goods. These are everyday items sold quickly and at relatively low price points, requiring non-stop repeat purchasing by millions of households.',
    examplesHeadline: 'Everyday products in every home:',
    exampleItems: [
      { name: 'Soaps & Shampoos', icon: '🧼', category: 'Personal Care' },
      { name: 'Biscuits & Snacks', icon: '🍪', category: 'Packaged Foods' },
      { name: 'Toothpaste & Brushes', icon: '🪥', category: 'Oral Hygiene' },
      { name: 'Tea & Coffee', icon: '☕', category: 'Beverages' },
      { name: 'Detergents & Cleaners', icon: '🧴', category: 'Home Care' },
      { name: 'Spices & Cooking Oil', icon: '🧂', category: 'Kitchen Staples' },
    ],
    beginnerMentalModel:
      'Think of an FMCG business as a perpetual tollgate on daily human habits. People might delay buying a car or a smartphone during hard times, but they brush their teeth and wash their clothes every single morning.',
  },

  howItWorks: {
    headline: 'How Value and Money Move in FMCG',
    explanation:
      'A bottle of shampoo or packet of biscuits does not travel directly from the factory to your bathroom shelf. An extensive distribution ecosystem connects giant factories to over 10 million neighborhood kirana stores across India.',
    chainSteps: [
      {
        stepNumber: 1,
        title: 'Manufacturer',
        role: 'Formulation, branding, mass production & packaging',
        cutOfValue: '₹50 (Cost + Factory Margin)',
        description:
          'Procures raw commodities (palm oil, wheat, milk, fragrance) and uses automated factories to manufacture millions of units daily.',
        icon: '🏭',
      },
      {
        stepNumber: 2,
        title: 'Distributor / Wholesaler',
        role: 'Regional warehousing, fleet logistics & inventory finance',
        cutOfValue: '₹20 (Logistics & Handling Margin)',
        description:
          'Buys truckloads in bulk, absorbs credit risk, and breaks shipments down into carton boxes for thousands of local retail routes.',
        icon: '🚚',
      },
      {
        stepNumber: 3,
        title: 'Retailer (Kirana / Supermarket)',
        role: 'Shelf display, neighborhood proximity & refrigeration',
        cutOfValue: '₹15 (Retail Shelf Margin)',
        description:
          'Provides convenient immediate access on neighborhood street corners, front-row counter placement, and last-mile consumer trust.',
        icon: '🏪',
      },
      {
        stepNumber: 4,
        title: 'Consumer',
        role: 'Daily consumption, repeat purchase & brand habit',
        cutOfValue: '₹100 (Final Retail Price - MRP)',
        description:
          'Buys small packs frequently for immediate family use, funding the entire economic chain through cash or UPI payment.',
        icon: '🛍️',
      },
    ],
    keyInsight:
      'FMCG is an intricate balance: huge volume keeps manufacturing costs tiny per unit, while widespread kirana distribution ensures the product is always within arm\'s reach of the consumer.',
  },

  driversHeadline: 'What makes an FMCG company grow?',
  drivers: [
    {
      id: 'volume',
      name: 'Volume Growth',
      icon: '📦',
      shortQuestion: 'How many actual products are being sold?',
      explanation:
        'Volume growth measures the physical number of units, kilograms, or liters sold — regardless of price tags. If a company raises revenue purely by hiking prices while selling fewer packets, its true consumer base might actually be shrinking.',
      realWorldExample:
        'If Britannia sells 105 crore biscuit packets this year compared to 100 crore last year, it delivered +5% pure volume growth.',
      keyMetricToWatch: 'Underlying Volume Growth (UVG)',
    },
    {
      id: 'pricing',
      name: 'Pricing Power',
      icon: '🏷️',
      shortQuestion: 'Can the company increase prices without losing customers?',
      explanation:
        'Pricing power is the ability to pass on inflation (like rising palm oil, sugar, or plastic packaging costs) to consumers without suffering a steep drop in customer purchases.',
      realWorldExample:
        'When Nestlé slightly raised Maggi noodles prices by ₹2, demand barely dropped because consumers trusted and loved the brand.',
      keyMetricToWatch: 'Price Realization (%)',
    },
    {
      id: 'margins',
      name: 'Operating Margins',
      icon: '💰',
      shortQuestion: 'How much profit remains after commodity & factory costs?',
      explanation:
        'Operating margin tells you what fraction of every ₹100 in sales turns into earnings before interest and tax. FMCG companies optimize margins through recipe formulation, bulk purchasing, and supply chain efficiencies.',
      realWorldExample:
        'An FMCG firm with a 24% operating margin keeps ₹24 profit from every ₹100 bottle sold, giving it huge cash flow to reinvest in advertising.',
      keyMetricToWatch: 'EBITDA Margin (%)',
    },
    {
      id: 'distribution',
      name: 'Distribution Reach',
      icon: '🏪',
      shortQuestion: 'How easily can customers find the product anywhere?',
      explanation:
        'In India, availability beats advertising. If a consumer wants a cold beverage or a sachet of shampoo and your brand is out of stock at the corner kirana, they will simply buy a competitor’s product.',
      realWorldExample:
        'Hindustan Unilever reaches over 90 lakh retail outlets across rural and urban India, making its products accessible in virtually every village.',
      keyMetricToWatch: 'Direct Store Reach & Outlet Penetration',
    },
    {
      id: 'brand',
      name: 'Brand Strength & Moat',
      icon: '⭐',
      shortQuestion: 'Does the brand create unbreakable habit and loyalty?',
      explanation:
        'A strong brand commands customer trust. When parents buy baby food or skincare, they prefer a trusted household name over an unknown unbranded alternative, even if it costs 20% more.',
      realWorldExample:
        'Consumers specifically ask shopkeepers for "Dettol" or "Colgate" rather than asking for generic antiseptic liquid or oral paste.',
      keyMetricToWatch: 'Advertising-to-Sales Ratio & Market Share',
    },
  ],

  miniChallenge: {
    id: 'fmcg_challenge_price_vs_volume',
    title: 'The Price Hike vs Volume Equation',
    scenario:
      'A leading packaged tea brand increases its prices across all packs by 8% to cover raw tea leaf inflation. Because tea is an essential morning habit, consumers only trim unit purchases by 2%.',
    question: 'What happens to the company\'s overall sales revenue?',
    options: [
      {
        id: 'opt_revenue_increases',
        text: 'Revenue increases (~+6%)',
        isCorrect: true,
        explanation:
          'Spot on! Since the 8% price increase was noticeably higher than the 2% drop in unit volume, total revenue expanded by approximately 6%. This is the textbook hallmark of strong pricing power.',
      },
      {
        id: 'opt_revenue_decreases',
        text: 'Revenue decreases because buyers fled',
        isCorrect: false,
        explanation:
          'Not quite. Even though unit volume fell by 2%, the higher price collected on the remaining 98% of units more than compensated for the slight volume loss.',
      },
      {
        id: 'opt_revenue_neutral',
        text: 'Revenue stays exactly identical',
        isCorrect: false,
        explanation:
          'Incorrect. Revenue only stays flat if price gains exactly offset volume declines (e.g. +8% price and -8% volume). Here, the price increase significantly surpassed the volume drop.',
      },
    ],
    xpReward: 50,
  },

  metricsHeadline: 'Learn the numbers that matter in FMCG',
  metrics: [
    {
      id: 'metric_revenue',
      name: 'Revenue (Topline Sales)',
      shortCode: 'REV',
      whatItMeans:
        'The total gross money received from selling products before paying for raw materials, staff salaries, marketing, or taxes.',
      whyItMatters:
        'In FMCG, revenue growth should ideally be driven by a healthy mix of both volume (selling more packets) and value (disciplined price increases).',
      sectorExample:
        'A beverage company reporting ₹12,000 Crore in annual revenue signifies deep household consumption across millions of bottles.',
    },
    {
      id: 'metric_volume_growth',
      name: 'Volume Growth',
      shortCode: 'VOL',
      whatItMeans:
        'The percentage change in the actual quantity of physical goods sold (packets, tons, or liters) compared to the previous period.',
      whyItMatters:
        'Crucial indicator of consumer health. If revenue grows 10% but volume is -2%, the company is relying solely on price hikes and risks losing market share to cheaper local competitors.',
      sectorExample:
        'An FMCG firm posting +7% underlying volume growth proves that new households are adopting its brand or existing users are consuming more.',
    },
    {
      id: 'metric_operating_margin',
      name: 'Operating Margin (EBITDA Margin)',
      shortCode: 'OPM',
      whatItMeans:
        'The percentage of revenue that remains after deducting the cost of goods sold, factory operations, shipping, and advertising.',
      whyItMatters:
        'Shows operational efficiency. High operating margins (20%+) allow FMCG companies to outspend competitors on TV/digital ads and withstand sudden commodity spikes.',
      sectorExample:
        'If crude oil prices double (spiking plastic bottle packaging costs), a company with a 25% margin can absorb it much better than one scraping by on 8%.',
    },
    {
      id: 'metric_roe',
      name: 'Return on Equity (ROE)',
      shortCode: 'ROE',
      whatItMeans:
        'How much net profit a company generates for every ₹100 of shareholders’ equity invested in the enterprise.',
      whyItMatters:
        'Elite FMCG companies boast astonishing ROEs (often 30% to 70%+) because they don\'t need heavy debt or giant capital-intensive plants; brand equity and negative working capital drive massive asset turnover.',
      sectorExample:
        'HUL and Nestlé historically generate extraordinary ROE because distributors pay them upfront while suppliers wait for payment, creating free cash flow.',
    },
    {
      id: 'metric_pe_ratio',
      name: 'Price-to-Earnings Ratio',
      shortCode: 'P/E',
      whatItMeans:
        'The valuation multiple showing how much investors are willing to pay today for each ₹1 of annual earnings generated by the company.',
      whyItMatters:
        'Because FMCG earnings are highly predictable and resilient even during severe recessions, the stock market often assigns premium P/E multiples (50x-70x) to established blue chips.',
      sectorExample:
        'A high P/E doesn\'t mean "bad" and a low P/E doesn\'t mean "good" — it reflects how much reliability, brand moat, and reinvestment potential the market expects.',
    },
  ],

  companiesHeadline: 'Explore leading FMCG companies in India',
  companies: [
    {
      id: 'hul',
      name: 'Hindustan Unilever (HUL)',
      tagline: 'The undisputed giant of Indian daily personal & home care',
      businessDescription:
        'Reaches 9 out of 10 Indian households every day through legacy household power brands built over 90 years.',
      icon: '🧼',
      productCategories: ['Lifebuoy', 'Surf Excel', 'Dove', 'Horlicks', 'Bru Coffee', 'Kissan'],
      primaryDrivers: ['Mass Distribution (90L+ outlets)', 'Brand Moat', 'Pricing Power'],
      keyStrengths:
        'Unrivaled distributor reach, deep rural penetration, and multi-category leadership from budget sachets to premium skincare.',
    },
    {
      id: 'itc',
      name: 'ITC Limited',
      tagline: 'Conglomerate powerhouse scaling packaged foods & personal care',
      businessDescription:
        'Leverages massive distribution networks to build market-leading packaged food, stationery, and personal care brands alongside its cash-generative core.',
      icon: '🌾',
      productCategories: ['Aashirvaad Atta', 'Sunfeast Biscuits', 'Yippee! Noodles', 'Bingo! Snacks', 'Fiama'],
      primaryDrivers: ['Agricultural Supply Chain', 'Scale Efficiency', 'Brand Expansion'],
      keyStrengths:
        'Direct farm procurement network (e-Choupal) providing high-quality wheat and commodities at lower costs than competitors.',
    },
    {
      id: 'nestle',
      name: 'Nestlé India',
      tagline: 'Global nutritional science meeting Indian breakfast & snack rituals',
      businessDescription:
        'Dominates urban breakfast tables, baby nutrition, and quick-snack culture through deeply rooted emotional brand connections.',
      icon: '🍜',
      productCategories: ['Maggi 2-Minute Noodles', 'Nescafé', 'KitKat', 'Cerelac', 'Everyday Dairy'],
      primaryDrivers: ['Brand Loyalty', 'Urban Premiumization', 'Pricing Power'],
      keyStrengths:
        'Category-defining brands with near-monopoly positions in infant cereals and instant noodles, allowing consistent high gross margins.',
    },
    {
      id: 'britannia',
      name: 'Britannia Industries',
      tagline: 'India’s bakery specialist: biscuits, breads, and dairy',
      businessDescription:
        'Over a century of trust satisfying mid-day chai moments, lunchbox treats, and daily nutritional snacking.',
      icon: '🍪',
      productCategories: ['Good Day', 'Marie Gold', 'NutriChoice', 'Bourbon', 'Britannia Cheese'],
      primaryDrivers: ['Volume Growth', 'Direct Kirana Reach', 'Product Innovation'],
      keyStrengths:
        'Shifted from wholesale reliance to over 25 lakh direct-reach stores, ensuring fresher biscuits on shelves and better trade terms.',
    },
    {
      id: 'dabur',
      name: 'Dabur India',
      tagline: 'Ayurvedic heritage meeting contemporary wellness',
      businessDescription:
        'The pioneer of natural and herbal healthcare, foods, and personal care with strong rural resonance.',
      icon: '🌿',
      productCategories: ['Dabur Chyawanprash', 'Dabur Honey', 'Real Fruit Juices', 'Vatika Hair Oil'],
      primaryDrivers: ['Natural/Herbal Shift', 'Rural Consumption', 'Brand Trust'],
      keyStrengths:
        'Deep goodwill in traditional Indian medicine and immunity wellness, insulating it from foreign multinational competition.',
    },
  ],

  investigation: {
    id: 'case_fmcg_price_hike',
    title: 'The Price Hike Puzzle',
    companyName: 'Apex Consumer Goods Ltd.',
    ticker: 'APEXFMCG',
    industry: 'Fast-Moving Consumer Goods (FMCG)',
    level: 1,
    levelTitle: 'FMCG Sector Investigation',
    xpReward: 350,
    estimatedMinutes: 6,
    hook: 'Apex hiked prices by 10% across its soap and biscuit range. Revenue rose +8%, operating profit jumped +2%, and the P/E multiple expanded. But physical volume dropped -4%. Did management pull off a masterstroke, or are trouble clouds gathering?',
    scenarioDescription: `Apex Consumer Goods is a popular mid-tier FMCG company known for household laundry soaps, tea packets, and biscuits sold across 15 lakh retail kiranas.

Facing rising palm oil and freight costs early in the financial year, the board implemented a bold 10% across-the-board price hike. 

At the end of Q3, the financial scoreboard looks conflicted:
• 📈 Reported Revenue grew +8%
• 📉 Underlying Volume fell -4%
• 💰 Operating Margin expanded from 18% to 20% (+200 bps)
• 🏷️ Market P/E multiple expanded from 42x to 48x

As an investigative forensic analyst, you have 3 investigation tokens. Inspect the evidence room to answer the central question:
Is Apex displaying genuine brand pricing power that will create lasting shareholder wealth, or are local regional rivals quietly eating its rural market share while headline profits look pretty?`,
    stockChartSummary: {
      period: 'Past 9 Months Post-Price Hike',
      gain: '+14%',
      flatPeriod: 'Last 3 Months Choppy Consolidation',
      currentPrice: '₹428.50',
    },
    actionPointsMax: 3,
    clues: [
      {
        id: 'clue_volume_split',
        category: 'Earnings',
        title: '🔍 Investigate Volume by Geography',
        metricLabel: 'Urban (+1%) vs Rural (-9%) Volume Divergence',
        metricValue: 'Urban Volume +1% / Rural Volume -9%',
        summary:
          'Urban supermarkets and quick-commerce customers absorbed the price hikes easily, but rural kirana stores saw a severe -9% volume contraction.',
        deepDive:
          'In tier-1 and tier-2 cities, affluent consumers didn\'t hesitate to pay ₹5 extra per family pack. However, in rural UP, Bihar, and Madhya Pradesh — where agricultural wages were flat — rural consumers pushed back and bought smaller sachets or switched away.',
        implication: 'concern',
        tags: ['Rural Elasticity', 'Volume Contraction'],
      },
      {
        id: 'clue_input_costs',
        category: 'Cash Flow',
        title: '🔍 Investigate Raw Material Deflation',
        metricLabel: 'Palm Oil & Crude Packaging Costs Drop',
        metricValue: 'Raw Material Basket fell -14% YoY',
        summary:
          'While Apex kept consumer price tags high, the global cost of palm oil and packaging plastic plunged 14% after the hikes were enacted.',
        deepDive:
          'Management never rolled back the price hikes when commodity prices cooled down. The expanded 20% operating margin was largely a windfall "free ride" from falling input costs, rather than organic cost efficiencies.',
        implication: 'support',
        tags: ['Windfall Margin', 'Input Cost Deflation'],
      },
      {
        id: 'clue_regional_competitors',
        category: 'Competitors',
        title: '🔍 Investigate Local Regional Rivals',
        metricLabel: 'Local Unbranded Brands Gain 320 bps Market Share',
        metricValue: 'Regional Brands Share: 18.2% (up from 15.0%)',
        summary:
          'Small regional manufacturers in Gujarat and Maharashtra kept biscuit and detergent prices unchanged and captured cash-strapped budget buyers.',
        deepDive:
          'Local brands with zero national TV ad budgets took advantage of Apex’s price hike. Kirana store owners reported that price-sensitive shoppers asked for the cheaper local biscuit packs when Apex raised prices from ₹20 to ₹22.',
        implication: 'concern',
        tags: ['Market Share Leakage', 'Regional Threat'],
      },
      {
        id: 'clue_brand_ad_spend',
        category: 'Valuation',
        title: '🔍 Investigate Advertising & Brand Reinvestment',
        metricLabel: 'Ad Spend Reinvested at 11.5% of Sales',
        metricValue: 'Marketing Spend +22% YoY',
        summary:
          'Apex used its fat 20% operating profit margins to fund aggressive television and digital advertising to defend premium brand equity.',
        deepDive:
          'Rather than hoarding the input-cost windfall, Apex boosted promotional campaigns for its premium tea and organic personal care brands. The premium tier grew at +16% volume, proving brand loyalty among middle-class consumers.',
        implication: 'support',
        tags: ['Reinvestment Moat', 'Premiumization'],
      },
      {
        id: 'clue_channel_inventory',
        category: 'Corporate Governance',
        title: '🔍 Investigate Distributor Working Capital & Credit',
        metricLabel: 'Distributor Receivable Days Steady at 14 Days',
        metricValue: 'Debtor Days: 14 Days (Industry standard: 12-16 days)',
        summary:
          'Apex did not artificially pump revenue by dumping unsold inventory or extending desperate 90-day credit to wholesale distributors.',
        deepDive:
          'Audit analysis shows distributor payments are collecting cleanly on time. The reported 8% revenue growth represents actual cash collections, not fraudulent channel-stuffing or artificial warehouse stuffing.',
        implication: 'neutral',
        tags: ['Clean Cash Flow', 'Healthy Balance Sheet'],
      },
    ],
    decisions: [
      {
        id: 'decision_evidence_needed',
        label: 'More Evidence Needed — Margin Windfall Masks Rural Vulnerability',
        stance: 'evidence_needed',
        thesisSummary:
          'Apex enjoys healthy cash flows and margin expansion thanks to falling commodity costs, but the -9% rural volume drop and local competitor gains demand vigilant observation over the next 2 quarters.',
        reasoningScore: 95,
        debriefAnalysis:
          'Top-tier analytical reasoning! You identified that while the immediate financial scoreboard (+8% revenue, +2% margin) looks glowing, FMCG companies live and die by repeat volume. Deflation in palm oil created a temporary margin umbrella, but losing -4% volume overall and -9% in rural India to unbranded regional competitors is a warning sign. Monitoring whether rural volume rebounds as inflation cools is the key investment catalyst.',
        marketOutcome:
          'Over the next two quarters, Apex held its margins but was forced to introduce ₹5 bridge-sachets in rural markets to stop customer defection to regional rivals. The stock traded range-bound as institutional investors waited for volume growth to turn positive.',
        coreLesson:
          'In FMCG, price hikes boost revenue in the short term, but long-term enterprise value depends on volume growth. A company that loses physical unit volume risks losing the kirana store shelf forever.',
      },
      {
        id: 'decision_stronger',
        label: 'Stronger Thesis — High Pricing Power & Premiumization Success',
        stance: 'stronger',
        thesisSummary:
          'Apex successfully demonstrated pricing power. Premium sales and high ad spend will easily offset minor rural volume softness.',
        reasoningScore: 70,
        debriefAnalysis:
          'Partially sound, but overly optimistic about volume loss. While Apex showed strong pricing power in cities and protected its brand through ad spending, ignoring a -9% rural volume drop is risky. FMCG distribution networks depend on turnover; if local kirana stores sell fewer units, they allocate shelf space to local competitors.',
        marketOutcome:
          'Apex remained profitable, but valuation multiples paused as market analysts questioned if rural consumers would ever return to higher price points.',
        coreLesson:
          'Never confuse input-cost deflation with permanent pricing power. When commodity costs drop, unbranded competitors will lower prices and mount aggressive price wars.',
      },
      {
        id: 'decision_concern',
        label: 'Significant Concern — Broken Rural Engine & Lost Market Share',
        stance: 'concern',
        thesisSummary:
          'The price hike was an operational blunder. Apex alienated its rural base, lost 320 bps market share, and faces severe volume stagnation.',
        reasoningScore: 75,
        debriefAnalysis:
          'You correctly highlighted the rural weakness and regional competition threat, but labeled it as an immediate emergency. In reality, Apex generated clean cash collections (14 days receivable), expanded operating profit margins to 20%, and saw strong +16% volume growth in its premium urban line. It is not in crisis, but at a strategic crossroads.',
        marketOutcome:
          'Apex did not crash; instead, it used its strong cash flows to launch targeted promotional discounts in rural India, stabilizing unit sales within 6 months.',
        coreLesson:
          'Analyze both threats and buffers: an FMCG giant with healthy balance sheets and strong advertising reinvestment can afford to make tactical adjustments to defend market share.',
      },
    ],
  },
};
