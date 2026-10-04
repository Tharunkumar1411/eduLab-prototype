/**
 * Home Screen Mock Data Layer for FinCraft.
 * Structured cleanly with TypeScript interfaces so it can be swapped
 * with real market feeds & live CMS endpoints later.
 * 
 * Note: Data is deterministic and intended for educational learning.
 */

export interface MarketIndex {
  id: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  whatItIs: string;
  todayDriver: string;
  educationalTakeaway: string;
}

export interface SectorDetail {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  whatItDoes: string;
  howTheyMakeMoney: string;
  thingsToUnderstand: {
    term: string;
    explanation: string;
  }[];
  beginnerMentalModel: string;
  representativeStockSymbol: string;
  representativeStockName: string;
}

export interface MarketStory {
  id: string;
  title: string;
  kicker: string;
  readTime: string;
  summary: string;
  whatHappened: string;
  whyItMatters: string;
  whatCanILearn: string;
  coreTerm: string;
  coreTermExplanation: string;
  sectorTag: string;
}

export const TODAY_MARKET_INDEXES: MarketIndex[] = [
  {
    id: 'nifty_50',
    name: 'NIFTY 50',
    value: '25,380.45',
    change: '+0.8%',
    isPositive: true,
    whatItIs: 'The flagship index of the National Stock Exchange (NSE), tracking the 50 largest and most actively traded Indian companies across 13 sectors.',
    todayDriver: 'Lifted by heavy buying in IT leaders and private banks after foreign institutional investors (FIIs) resumed net purchases.',
    educationalTakeaway: 'An index is like the average temperature of the whole market. Even when Nifty rises +0.8%, many individual stocks still decline.',
  },
  {
    id: 'sensex',
    name: 'SENSEX',
    value: '82,450.10',
    change: '+0.6%',
    isPositive: true,
    whatItIs: 'The oldest stock index in India (BSE Sensex), tracking 30 financially sound blue-chip companies listed on the Bombay Stock Exchange.',
    todayDriver: 'Large-cap engineering and consumer conglomerates pushed the 30-stock barometer toward fresh all-time weekly highs.',
    educationalTakeaway: 'Because Sensex has only 30 companies versus Nifty’s 50, giant companies like Reliance and HDFC Bank carry even greater weighting.',
  },
  {
    id: 'bank_nifty',
    name: 'BANK NIFTY',
    value: '57,120.30',
    change: '-0.2%',
    isPositive: false,
    whatItIs: 'A specialized sectoral index tracking the 12 most liquid Indian banking stocks, including top private and public-sector lenders.',
    todayDriver: 'Consolidated quietly after reaching record highs earlier this week, as short-term traders booked profits ahead of RBI monetary policy minutes.',
    educationalTakeaway: 'Sectoral indexes are more volatile than broad indexes because all constituent companies face the same industry cycles and interest rate shifts.',
  },
];

export const EXPLORE_SECTORS: SectorDetail[] = [
  {
    id: 'banking',
    name: 'Banking',
    icon: '🏦',
    tagline: 'The Credit Engine of the Economy',
    whatItDoes: 'Banks take deposits from savers who have excess cash and lend that money at higher interest rates to businesses, homebuyers, and entrepreneurs.',
    howTheyMakeMoney: 'The difference between the interest charged on loans (e.g. 9.5%) and the interest paid on customer deposits (e.g. 5.5%) is called the Net Interest Margin (NIM). They also earn processing fees on cards and wealth management.',
    thingsToUnderstand: [
      {
        term: 'Net Interest Margin (NIM)',
        explanation: 'The profit spread a bank keeps between interest earned on loans and interest paid to depositors.',
      },
      {
        term: 'CASA Ratio',
        explanation: 'Current & Savings Account deposits. High CASA means the bank gets very cheap funds from ordinary checking accounts.',
      },
      {
        term: 'Non-Performing Assets (NPAs)',
        explanation: 'Loans that borrowers have stopped repaying. High NPAs eat away at the bank’s capital cushion.',
      },
      {
        term: 'Credit Growth',
        explanation: 'The annual percentage increase in total loans disbursed to businesses and consumers.',
      },
      {
        term: 'Capital Adequacy (CAR)',
        explanation: 'The financial safety buffer required by the RBI to protect depositors against surprise loan losses.',
      },
    ],
    beginnerMentalModel: 'Think of a bank as a wholesale money merchant: buy cash cheap from depositors, sell cash at a markup to reliable borrowers.',
    representativeStockSymbol: 'HDFCBANK',
    representativeStockName: 'HDFC Bank Ltd.',
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    tagline: 'High Margins & Global Software Services',
    whatItDoes: 'Indian IT firms build enterprise software, cloud infrastructure, AI integrations, and digital platforms for Fortune 500 banks and multinational corporations.',
    howTheyMakeMoney: 'Clients pay hourly billing rates or multi-year digital transformation contracts, mostly denominated in US Dollars ($) and Euros (€). Because raw material costs are zero (the main asset is skilled engineers), technology companies generate substantial free cash flow.',
    thingsToUnderstand: [
      {
        term: 'Operating Margin',
        explanation: 'Percentage of revenue left after paying software engineers, cloud servers, and office overheads.',
      },
      {
        term: 'Contract Deal Value (TCV)',
        explanation: 'The total value of new enterprise software contracts signed with global clients this quarter.',
      },
      {
        term: 'Attrition Rate',
        explanation: 'The percentage of engineers leaving for other companies, which impacts project delivery and wage costs.',
      },
      {
        term: 'Dollar / Rupee Currency Impact',
        explanation: 'When the US Dollar strengthens against the Indian Rupee, Indian IT firms earn more rupees on every dollar billed.',
      },
      {
        term: 'Free Cash Flow Conversion',
        explanation: 'Because software needs no heavy factories, nearly 80%+ of accounting net profit turns directly into hard bank cash.',
      },
    ],
    beginnerMentalModel: 'Indian IT companies export brainpower: collect revenue in strong currencies ($) while incurring engineering expenses in local rupees (₹).',
    representativeStockSymbol: 'TCS',
    representativeStockName: 'Tata Consultancy Services Ltd.',
  },
  {
    id: 'automobiles',
    name: 'Automobiles',
    icon: '🚗',
    tagline: 'Volume Cycles, EVs & Operating Leverage',
    whatItDoes: 'Automakers design, manufacture, and assemble passenger cars, commercial transport trucks, tractors, and electric two-wheelers.',
    howTheyMakeMoney: 'By mass-producing vehicles on robotics assembly lines. Fixed costs for factories are high, so every extra 10,000 cars sold produces a disproportionately large jump in net profit (operating leverage).',
    thingsToUnderstand: [
      {
        term: 'Monthly Volume Despatches',
        explanation: 'Auto companies disclose wholesale unit shipments to dealer showrooms on the 1st day of every single month.',
      },
      {
        term: 'Operating Leverage',
        explanation: 'Once factory fixed costs are covered, every additional car sold carries a high percentage of pure profit.',
      },
      {
        term: 'Raw Material Costs (Steel & Rubber)',
        explanation: 'High commodity prices squeeze margins unless automakers can pass on price hikes to end consumers.',
      },
      {
        term: 'Electric Vehicle (EV) Transition',
        explanation: 'Investment in battery technologies and charging ecosystems to capture the multi-decade clean mobility shift.',
      },
      {
        term: 'Financing Availability',
        explanation: 'Over 80% of personal cars in India are bought via bank auto loans. Low interest rates boost car sales.',
      },
    ],
    beginnerMentalModel: 'Automakers have giant factory overheads. In booming economic years, profits explode; in recessionary years, idle factories drag earnings down.',
    representativeStockSymbol: 'TATAMOTORS',
    representativeStockName: 'Tata Motors Ltd.',
  },
  {
    id: 'fmcg',
    name: 'FMCG',
    icon: '🛒',
    tagline: 'Daily Essentials & Unshakable Habits',
    whatItDoes: 'Fast-Moving Consumer Goods companies sell soaps, cooking oils, biscuits, toothpastes, shampoos, and packaged staples through millions of neighborhood kirana stores.',
    howTheyMakeMoney: 'Low-ticket, repeat everyday purchases. Because people brush their teeth and eat packaged food in good times and bad, FMCG businesses enjoy recession-resistant cash flows and extraordinary return on capital (ROCE).',
    thingsToUnderstand: [
      {
        term: 'Volume Growth vs Price Growth',
        explanation: 'Did the company sell more packets of biscuits, or did it merely raise the sticker price due to inflation?',
      },
      {
        term: 'Rural Consumption Demand',
        explanation: 'Over 40% of FMCG sales come from villages and small towns, heavily influenced by monsoon agricultural yields.',
      },
      {
        term: 'Negative Working Capital',
        explanation: 'Retailers pay the FMCG brand in cash immediately, while ingredient suppliers give 30 to 60-day credit lines.',
      },
      {
        term: 'Pricing Power & Brand Moat',
        explanation: 'Customers rarely switch their favorite morning tea or toothpaste brand over a small ₹2 price difference.',
      },
      {
        term: 'Return on Capital (ROCE)',
        explanation: 'Top FMCG brands generate ₹60 to ₹80 of operating profit for every ₹100 of capital employed.',
      },
    ],
    beginnerMentalModel: 'Small repeat transactions multiplied by 1.4 billion people creates an indestructible defensive cash fountain.',
    representativeStockSymbol: 'ITC',
    representativeStockName: 'ITC Ltd.',
  },
  {
    id: 'pharma',
    name: 'Pharma',
    icon: '💊',
    tagline: 'Lifesaving Medicines & Global Generics',
    whatItDoes: 'Pharmaceutical firms synthesize active pharmaceutical ingredients (APIs) and formulate prescription medicines, generic therapies, and specialized biosimilars.',
    howTheyMakeMoney: 'India is the pharmacy of the world, providing over 20% of global generic drug supply by volume. Companies profit from patent-expired generic copycats in the US and branded chronic prescriptions (diabetes, cardiac) in India.',
    thingsToUnderstand: [
      {
        term: 'US FDA Regulatory Compliance',
        explanation: 'Factory inspection clearances from the US Food and Drug Administration dictate whether drugs can be sold in America.',
      },
      {
        term: 'Domestic Chronic Therapies',
        explanation: 'Medicines taken daily for life (cardiology, hypertension, diabetes) provide reliable recurring revenue.',
      },
      {
        term: 'Generic Price Erosion',
        explanation: 'As multiple copycat drug manufacturers enter the same medicine market, retail prices can plunge 30-50%.',
      },
      {
        term: 'R&D Spending',
        explanation: 'Investing 5% to 8% of annual sales into research laboratories to develop complex injectable and biosimilar drugs.',
      },
      {
        term: 'Patent Expiry Cliff',
        explanation: 'When blockbuster global medications lose patent protection, generic manufacturers rush in to capture market share.',
      },
    ],
    beginnerMentalModel: 'High regulatory barriers protect compliant factories. Once a manufacturing process is approved, the gross margins on producing pills are exceptional.',
    representativeStockSymbol: 'INFY',
    representativeStockName: 'Sun Pharma / Healthcare Leaders',
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: '⚡',
    tagline: 'Power Generation, Refining & Renewables',
    whatItDoes: 'Energy conglomerates drill for crude oil, refine petroleum products, operate natural gas pipelines, and build vast solar and wind generation parks.',
    howTheyMakeMoney: 'Selling thermal and green kilowatt-hours to the electrical grid, and refining crude oil into diesel, jet fuel, and petrochemical plastics used in packaging.',
    thingsToUnderstand: [
      {
        term: 'Gross Refining Margin (GRM)',
        explanation: 'The profit earned per barrel of crude oil after converting it into finished fuels like petrol and diesel.',
      },
      {
        term: 'Capital Expenditure (Capex)',
        explanation: 'Billions of rupees required upfront to erect solar farms, wind turbines, and petrochemical crackers.',
      },
      {
        term: 'Power Purchase Agreements (PPAs)',
        explanation: 'Long-term 25-year contracts guaranteeing fixed tariff rates per unit of electricity delivered to state utilities.',
      },
      {
        term: 'Crude Oil Volatility',
        explanation: 'Swings in Brent crude prices directly alter raw material costs, inventory gains, and government windfall taxes.',
      },
      {
        term: 'Energy Transition Runway',
        explanation: 'The generational pivot from fossil fuels to green hydrogen, battery storage, and solar installations.',
      },
    ],
    beginnerMentalModel: 'Energy is the indispensable input for every factory, vehicle, and smartphone. Without power, zero economic activity occurs.',
    representativeStockSymbol: 'RELIANCE',
    representativeStockName: 'Reliance Industries Ltd.',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: '🏗️',
    tagline: 'Highways, Metros, Ports & Order Books',
    whatItDoes: 'Engineering, Procurement, and Construction (EPC) firms construct dedicated freight rail corridors, expressways, airports, water supply grids, and high-tech ports.',
    howTheyMakeMoney: 'Bidding on large multi-year government infrastructure contracts and executing engineering milestones on schedule within budgeted margins.',
    thingsToUnderstand: [
      {
        term: 'Order Book-to-Bill Ratio',
        explanation: 'The multi-year backlog of signed construction contracts waiting to be executed, providing multi-year revenue visibility.',
      },
      {
        term: 'Working Capital & Bank Guarantees',
        explanation: 'Substantial upfront cash needed to buy heavy steel, concrete, and pay labor before government disbursements arrive.',
      },
      {
        term: 'Cost Overrun Risks',
        explanation: 'Delays in environmental clearances or land acquisition can inflate construction costs and hurt profit margins.',
      },
      {
        term: 'National Infrastructure Pipeline',
        explanation: 'Multi-trillion rupee government capital expenditure programs funding roads, smart cities, and power grids.',
      },
      {
        term: 'Debt-to-Equity Ratio',
        explanation: 'Heavy construction requires borrowing. Low-debt EPC contractors survive economic downturns far better than leveraged peers.',
      },
    ],
    beginnerMentalModel: 'The order book represents the pipeline of future work. The disciplined builder finishes on time and collects hard cash without taking on excessive debt.',
    representativeStockSymbol: 'RELIANCE',
    representativeStockName: 'L&T / Infrastructure Titans',
  },
];

export const MARKET_STORIES: MarketStory[] = [
  {
    id: 'story_it_guidance_fall',
    title: 'Why did IT stocks fall today?',
    kicker: 'Company Guidance',
    readTime: '3 min read',
    summary: 'IT stocks moved lower after investors reacted to weaker-than-expected forward guidance from technology leaders.',
    whatHappened: 'Two major IT companies released quarterly results showing 12% revenue growth and healthy margins. However, in the investor conference call, executives guided for next quarter revenue growth of only 3% to 5%, citing delayed enterprise decision-making in US retail banking.',
    whyItMatters: 'Stock markets are forward-looking discounting mechanisms. They do not price where a company was 90 days ago; they price what earnings will look like 6 to 12 months in the future. A downgrade in future growth expectations triggers immediate multiple de-rating.',
    whatCanILearn: 'Guidance is management’s official forecast of future performance. When the market expects 10% and management says 4%, stock prices adjust downward even if the past quarter set a profit record.',
    coreTerm: 'What is company guidance?',
    coreTermExplanation: 'Guidance is public commentary provided by corporate executives indicating expected future revenue, profit margins, and capital expenditures for upcoming quarters.',
    sectorTag: 'Technology',
  },
  {
    id: 'story_record_sales_margin_drop',
    title: 'Why did a company with record sales drop 8%?',
    kicker: 'Margin Compression',
    readTime: '3 min read',
    summary: 'A fast-growing consumer appliance maker announced 30% higher sales, but its stock crashed 8% in opening minutes.',
    whatHappened: 'To hit aggressive festival sales targets, the company offered 45% online discounts and extended 180-day vendor credit. While total sales reached an all-time high, operating profit margin shrank from 14% to 4%, and net cash from operations turned deeply negative.',
    whyItMatters: 'In financial markets: Revenue is vanity, Profit is sanity, Cash is reality. Selling 100,000 blenders at an economic loss destroys shareholder value rather than creating it.',
    whatCanILearn: 'Never evaluate a company by top-line sales growth alone. Always check operating margins and whether cash collections actually arrived in the bank account.',
    coreTerm: 'Gross Margin vs Net Operating Margin',
    coreTermExplanation: 'Gross margin is sales minus the direct cost of goods sold. Operating margin also subtracts promotional discounts, marketing, salaries, and logistics overheads.',
    sectorTag: 'Automobiles & Retail',
  },
  {
    id: 'story_rbi_rate_pause',
    title: 'What happened when RBI kept interest rates unchanged?',
    kicker: 'Interest Rates & Markets',
    readTime: '3 min read',
    summary: 'The central bank maintained benchmark repo rates at 6.5%, triggering an immediate rally across housing finance and auto stocks.',
    whatHappened: 'The Reserve Bank of India’s Monetary Policy Committee voted unanimously to keep the policy repo rate steady at 6.5%. Stock markets had feared a surprise rate hike to tame vegetable inflation.',
    whyItMatters: 'Interest rates represent the cost of borrowing for the entire economy. When interest rates remain stable, consumers continue taking home loans and car loans, while companies can borrow predictable funds to build factories.',
    whatCanILearn: 'Interest rates act like gravity on stock valuations. When interest rates rise, borrowing becomes expensive and stock P/E multiples compress; when rates stabilize or fall, stock valuations expand.',
    coreTerm: 'What is the Repo Rate?',
    coreTermExplanation: 'The Repo Rate is the benchmark rate at which the Reserve Bank of India lends short-term money to commercial banks. It influences every loan rate in the country.',
    sectorTag: 'Banking & Macro',
  },
];
