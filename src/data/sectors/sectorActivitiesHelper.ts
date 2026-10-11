import { SectorData, SectorLearningActivity, SectorFeaturedInvestigation } from './types.ts';

/**
 * Returns the 4 progressive learning activities for any sector.
 * Banking has full bespoke activities defined directly in banking.ts.
 * FMCG, Technology, Automobiles and others get tailored structured activities
 * matching the shared business investigation framework.
 */
export function getSectorActivities(sector: SectorData): SectorLearningActivity[] {
  if (sector.activities && sector.activities.length > 0) {
    return sector.activities;
  }

  if (sector.id === 'fmcg') {
    return [
      {
        id: 'fmcg_act_1',
        stepNumber: 1,
        title: 'Understand FMCG',
        subtitle: 'Everyday household goods, repeat purchase cycles, and the power of distribution networks.',
        estimatedMinutes: 2,
        xpReward: 50,
        type: 'story',
        storyConfig: {
          hook: 'The Power of Daily Habits',
          scenario:
            'Every morning, millions of Indian households brush their teeth, brew tea, and use soap. How do companies turn small ₹10 packets into multibillion-rupee empires?',
          participants: [
            {
              id: 'consumer',
              title: 'Daily Consumer',
              icon: '🛒',
              role: 'Buys everyday essentials',
              details: 'Purchases small-ticket staples frequently based on brand habit and trust.',
              flowArrowLabel: 'Buys from kirana store →',
            },
            {
              id: 'distribution',
              title: 'Distribution Network',
              icon: '🚛',
              role: 'Reaches 90 Lakh+ Stores',
              details: 'Distributors, wholesalers, and millions of neighborhood kirana shops.',
              flowArrowLabel: 'Orders from brand →',
            },
            {
              id: 'manufacturer',
              title: 'FMCG Manufacturer',
              icon: '🏭',
              role: 'Mass Production & Branding',
              details: 'Invests in product formulation, automated factories, and nationwide advertising.',
            },
          ],
          decisionQuestion: 'What gives a top FMCG brand like Maggi or Parle-G its strongest competitive moat?',
          options: [
            {
              id: 'fmcg_dist_moat',
              text: 'Deep distribution reach so the product is available in every village and corner store.',
              isCorrect: true,
              explanation:
                'Spot on! In FMCG, "if you cannot see it, you cannot buy it." Being on the shelf of 9 million kirana stores is almost impossible for a new competitor to replicate.',
            },
            {
              id: 'fmcg_price_war',
              text: 'Selling products at a loss forever to destroy all competitors.',
              isCorrect: false,
              explanation: 'Incorrect. FMCG businesses thrive on sustainable operating margins and repeat cash flow.',
            },
          ],
          conceptExplanation: {
            title: 'Volume & Repeat Purchases',
            summary: 'Fast-Moving Consumer Goods (FMCG) make low profits per unit, but sell billions of units repeatedly every week.',
            corePoints: [
              'High Volume, Modest Unit Price: Profit comes from volume turnover, not giant luxury markups.',
              'Working Capital Efficiency: Consumers pay upfront in cash, giving top brands negative working capital cycles.',
              'Brand Equity: Trust built over decades means customers rarely switch to save ₹2 on toothpaste.',
            ],
          },
          reflectionQuestion: 'Does an FMCG brand need to build new factories every time it wants to sell more products?',
          reflectionOptions: [
            {
              id: 'ref_scale',
              text: 'Existing factories have operating leverage: producing more units lowers the cost per pack.',
              isCorrect: true,
              explanation: 'Exactly right! Fixed factory and marketing costs spread over larger volumes produce higher margins.',
            },
            {
              id: 'ref_build',
              text: 'Yes, every new bar of soap requires building a brand new manufacturing plant.',
              isCorrect: false,
              explanation: 'Incorrect. Automated plants can scale unit production efficiently.',
            },
          ],
        },
      },
      {
        id: 'fmcg_act_2',
        stepNumber: 2,
        title: 'Follow the Money',
        subtitle: 'Raw material costs (palm oil, wheat), gross margins, advertising expenses, and pricing power.',
        estimatedMinutes: 3,
        xpReward: 50,
        type: 'model',
        modelConfig: {
          headline: 'The FMCG Unit Economics Breakdown',
          intro: 'Explore where the money goes when you buy a ₹10 biscuit or soap pack. See how raw material inflation affects operating profit.',
          defaultLendingRate: 35.0, // Used as Gross Margin %
          defaultDepositRate: 15.0, // Used as Ad & Distribution %
          depositPoolCr: 1000,
          loansDeployedCr: 800,
          reservesCr: 200,
          explanation: {
            spreadConcept: 'Gross Margin = (Selling Price − Raw Material Cost) ÷ Selling Price. Operating Margin subtracts advertising and distribution costs.',
            spreadVsNim: 'When palm oil or wheat costs surge, an FMCG company must decide: hike prices (pricing power) or reduce pack size ("shrinkflation").',
            limitationsNote: 'Simplified unit model. Scale economies and regional tax variations influence real margins.',
          },
          reflectionQuestion: 'What is "shrinkflation" in the FMCG sector?',
          reflectionOptions: [
            {
              id: 'shrink_correct',
              text: 'Keeping the retail price at ₹10 while quietly reducing pack weight from 100g to 85g to protect profit margins.',
              isCorrect: true,
              explanation: 'Exactly! Because Indian consumers resist paying ₹12 instead of ₹10 coins, brands manage input inflation by reducing grammage.',
            },
            {
              id: 'shrink_wrong',
              text: 'Selling products at double the price with larger packaging.',
              isCorrect: false,
              explanation: 'Incorrect. Shrinkflation keeps the headline price unchanged while reducing quantity.',
            },
          ],
        },
      },
      {
        id: 'fmcg_act_3',
        stepNumber: 3,
        title: 'Run an Experiment',
        subtitle: 'Compare a trusted national brand with pricing power against an unbranded regional discount maker.',
        estimatedMinutes: 2,
        xpReward: 50,
        type: 'experiment',
        experimentConfig: {
          headline: 'Brand Power vs Commodity Pricing',
          intro: 'Raw material input costs jump by 20% due to global agricultural inflation. How do two different food makers respond?',
          entityA: {
            name: 'National Brand Co.',
            icon: '🌟',
            tag: 'Strong Brand Equity & Pricing Power',
            lendingRate: 24.0, // Operating Margin
            depositRate: 8.0, // Ad spend
            fundingNote: 'Can raise prices by 8% without losing loyal consumers. Operating margin stays protected.',
          },
          entityB: {
            name: 'Generic Discount Foods',
            icon: '📦',
            tag: 'Price Sensitive Commodity Maker',
            lendingRate: 11.0,
            depositRate: 3.0,
            fundingNote: 'Cannot raise prices without customers immediately fleeing to another cheap alternative.',
          },
          question: 'Which company can better protect its earnings when input costs surge?',
          options: [
            {
              id: 'brand_wins',
              text: 'National Brand Co. because consumer trust allows price adjustments without losing volume.',
              isCorrect: true,
              explanation: 'Correct! Strong brand moat and loyalty allow price hikes to offset input inflation, preserving return on capital.',
            },
            {
              id: 'generic_wins',
              text: 'Generic Discount Foods because lower advertising costs always produce better resilience.',
              isCorrect: false,
              explanation: 'Incorrect. Without pricing power, margin collapses when raw materials rise.',
            },
          ],
          catchExplanation: {
            title: 'Pricing Power vs Volume Elasticity',
            subtitle: 'The ultimate test of an FMCG business',
            keyCatch: 'A true brand moat allows a company to pass on cost increases without losing market share.',
            points: [
              'Gross Margin Buffer: Companies with 45%+ gross margins absorb shocks much better than low-margin commodity traders.',
              'Ad Spend Moat: Continuous marketing keeps the brand top-of-mind during economic downturns.',
            ],
          },
          reflectionQuestion: 'Why do top FMCG companies consistently generate 20%+ Return on Capital Employed (ROCE)?',
          reflectionOptions: [
            {
              id: 'roce_brand',
              text: 'High asset turnover and negative working capital: distributors pay upfront, so little capital is tied up.',
              isCorrect: true,
              explanation: 'Exactly right! FMCG giants collect cash fast and reinvest it with high capital efficiency.',
            },
            {
              id: 'roce_debt',
              text: 'Because they borrow gigantic bank loans to fund daily soap production.',
              isCorrect: false,
              explanation: 'Incorrect. Top FMCG businesses are virtually debt-free.',
            },
          ],
        },
      },
      {
        id: 'fmcg_act_4',
        stepNumber: 4,
        title: 'Investigate an FMCG Brand',
        subtitle: 'Analyze volume growth, distribution expansion, and market share trends to judge company health.',
        estimatedMinutes: 3,
        xpReward: 100,
        type: 'investigation',
        investigationConfig: {
          caseTitle: 'The Rural Demand Mystery',
          companyName: 'Purity Consumer Products Ltd.',
          ticker: 'PURITYFMCG',
          intro: 'Purity reported +14% revenue growth. But when you inspect the volume numbers versus price hikes, a deeper story emerges.',
          clues: [
            {
              id: 'clue_vol',
              title: 'Volume vs Price Growth',
              icon: '📦',
              metricBadge: 'Underlying Demand',
              dataHighlight: 'Revenue grew +14%, but underlying volume grew only +1%',
              observation: 'Almost all the reported growth came from raising product prices, not from selling more shampoo bottles.',
              implication: 'Price hikes have hit a ceiling; without volume growth, future sales expansion will stall.',
            },
            {
              id: 'clue_ad',
              title: 'Ad Spend Reductions',
              icon: '📺',
              metricBadge: 'Brand Investment',
              dataHighlight: 'Advertising budget cut by 30% YoY',
              observation: 'Management boosted short-term quarterly profit by cutting promotional campaigns.',
              implication: 'Competitors are gaining shelf space and customer mindshare.',
            },
          ],
          question: 'What is the true takeaway regarding Purity’s growth quality?',
          options: [
            {
              id: 'opt_unsustainable',
              text: 'The revenue growth is low-quality: driven by price hikes and ad cuts rather than genuine consumer volume adoption.',
              isBest: true,
              verdictFeedback: 'Brilliant deduction! Sustainable FMCG compounding requires healthy underlying unit volume growth.',
            },
            {
              id: 'opt_great',
              text: 'Purity is in peak health because +14% revenue growth is always great regardless of how it happened.',
              isBest: false,
              verdictFeedback: 'Beware! Revenue growth without volume growth is fragile and easily disrupted.',
            },
          ],
          nuancedTakeaway: {
            title: 'FMCG Detective Lesson',
            summary: 'Volume growth is the true barometer of brand health in consumer goods.',
            lessons: [
              'Always decompose revenue growth into Volume Growth + Price Realization.',
              'Beware of brands boosting margins by slashing advertising spend.',
            ],
          },
        },
      },
    ];
  }

  // Technology sector default 4 activities
  if (sector.id === 'technology') {
    return [
      {
        id: 'tech_act_1',
        stepNumber: 1,
        title: 'Understand Technology Services',
        subtitle: 'IT talent, global client contracts, offshore delivery models, and billable hours.',
        estimatedMinutes: 2,
        xpReward: 50,
        type: 'story',
        storyConfig: {
          hook: 'The Digital Engine of Global Enterprise',
          scenario:
            'A global bank in New York needs to rebuild its mobile app and secure its cloud infrastructure. How does an Indian IT services firm solve this?',
          participants: [
            {
              id: 'client',
              title: 'Global Client (US / Europe)',
              icon: '🗽',
              role: 'Spends IT Budget',
              details: 'Needs specialized engineering talent, cloud migration, and AI automation.',
              flowArrowLabel: 'Signs multi-year contract →',
            },
            {
              id: 'it_company',
              title: 'IT Services Company',
              icon: '💻',
              role: 'Offshore Delivery Partner',
              details: 'Employs thousands of engineers in India delivering mission-critical enterprise code.',
              flowArrowLabel: 'Delivers software solutions →',
            },
            {
              id: 'engineer',
              title: 'Software Engineer',
              icon: '👨‍💻',
              role: 'Executes Digital Projects',
              details: 'Develops software, deploys cloud architectures, and maintains business systems.',
            },
          ],
          decisionQuestion: 'What is the biggest cost for an IT services company?',
          options: [
            {
              id: 'emp_cost',
              text: 'Employee salaries and talent retention (typically 55%–65% of total revenue).',
              isCorrect: true,
              explanation: 'Spot on! IT services companies do not buy raw materials; their primary asset and cost is human engineering talent.',
            },
            {
              id: 'factory_cost',
              text: 'Buying steel and raw manufacturing materials for hardware.',
              isCorrect: false,
              explanation: 'Incorrect. Software services produce digital code, not heavy industrial goods.',
            },
          ],
          conceptExplanation: {
            title: 'The People & Utilization Engine',
            summary: 'IT service firms bill clients in US Dollars or Euros while paying majority costs in Indian Rupees.',
            corePoints: [
              'Currency Arbitrage: Earning hard foreign currency while deploying delivery centers in India.',
              'Employee Utilization: The percentage of engineers actively assigned to revenue-generating client projects.',
              'Deal Total Contract Value (TCV): The total revenue locked into multi-year digital transformation deals.',
            ],
          },
          reflectionQuestion: 'Why does employee attrition matter so much in technology services?',
          reflectionOptions: [
            {
              id: 'attrition_cost',
              text: 'High attrition means retraining costs, project delays, and wage inflation to replace departing talent.',
              isCorrect: true,
              explanation: 'Exactly right! High employee churn directly reduces operating margins.',
            },
            {
              id: 'attrition_none',
              text: 'It has no effect because software writes itself automatically without engineers.',
              isCorrect: false,
              explanation: 'Incorrect. Human engineering expertise is the core product.',
            },
          ],
        },
      },
      {
        id: 'tech_act_2',
        stepNumber: 2,
        title: 'Follow the Money',
        subtitle: 'Billed rates per hour, employee costs, operating margins, and currency movements.',
        estimatedMinutes: 3,
        xpReward: 50,
        type: 'model',
        modelConfig: {
          headline: 'Billable Utilization & Margin Model',
          intro: 'Explore how billing rates and engineer utilization rates drive technology profit margins.',
          defaultLendingRate: 24.0, // Operating Margin %
          defaultDepositRate: 58.0, // Employee cost %
          depositPoolCr: 5000,
          loansDeployedCr: 4000,
          reservesCr: 1000,
          explanation: {
            spreadConcept: 'Operating Margin = (Client Billing Revenue − Employee Salaries − SG&A) ÷ Revenue.',
            spreadVsNim: 'A 1% increase in engineer utilization (e.g. from 82% to 83%) flows straight to the bottom-line operating margin.',
            limitationsNote: 'Simplified services model. Offshore vs onsite employee mix also influences gross realization.',
          },
          reflectionQuestion: 'If the Indian Rupee depreciates against the US Dollar (e.g., from ₹83 to ₹85 per $1), what happens to an Indian IT exporter?',
          reflectionOptions: [
            {
              id: 'forex_gain',
              text: 'Profit margins expand because dollar revenues translate into more rupees while domestic costs stay unchanged.',
              isCorrect: true,
              explanation: 'Exactly! Rupee depreciation acts as a natural margin tailwind for Indian technology exporters.',
            },
            {
              id: 'forex_loss',
              text: 'Profit margins shrink because exports become illegal.',
              isCorrect: false,
              explanation: 'Incorrect. Exporters benefit from foreign currency appreciation.',
            },
          ],
        },
      },
      {
        id: 'tech_act_3',
        stepNumber: 3,
        title: 'Run an Experiment',
        subtitle: 'Compare high-margin proprietary IP & digital transformation against low-margin legacy maintenance.',
        estimatedMinutes: 2,
        xpReward: 50,
        type: 'experiment',
        experimentConfig: {
          headline: 'Digital Cloud Consulting vs Legacy Infrastructure Support',
          intro: 'Two tech firms pitch to a Fortune 500 client. One offers high-end Cloud & AI architecture; the other offers traditional server maintenance.',
          entityA: {
            name: 'CloudScale Technologies',
            icon: '☁️',
            tag: 'Specialized Cloud & AI Delivery',
            lendingRate: 26.0,
            depositRate: 52.0,
            fundingNote: 'High billing rates ($85/hr offshore). Clients cannot easily switch to cheaper vendors.',
          },
          entityB: {
            name: 'Legacy IT Staffing',
            icon: '🖥️',
            tag: 'Commodity Body-Shopping Support',
            lendingRate: 14.0,
            depositRate: 70.0,
            fundingNote: 'Low billing rates ($28/hr offshore). Clients constantly squeeze pricing every renewal.',
          },
          question: 'Which company commands higher pricing power and sustainable margins?',
          options: [
            {
              id: 'cloud_wins',
              text: 'CloudScale Technologies because complex architecture cannot be commoditized easily.',
              isCorrect: true,
              explanation: 'Spot on! Specialized high-tech skills command premium billing rates and client loyalty.',
            },
            {
              id: 'staffing_wins',
              text: 'Legacy IT Staffing because lower billing rates attract more clients.',
              isCorrect: false,
              explanation: 'Incorrect. Commodity services face relentless price erosion and thin margins.',
            },
          ],
          catchExplanation: {
            title: 'The Quality of Revenue in Tech',
            subtitle: 'Not all tech revenue is created equal',
            keyCatch: 'Digital consulting and cloud architecture deliver twice the operating margin of commoditized maintenance contracts.',
            points: [
              'Client Sticky Factor: Mission-critical enterprise code is expensive and risky to replace.',
              'High Cash Flow: Software companies have low capital expenditures, generating huge free cash flows.',
            ],
          },
          reflectionQuestion: 'Why do top IT services companies pay out 70%+ of net profits as dividends and share buybacks?',
          reflectionOptions: [
            {
              id: 'fcf_payout',
              text: 'Because software services require very little physical machinery, leaving enormous free cash flow for shareholders.',
              isCorrect: true,
              explanation: 'Exactly right! They are asset-light compounding machines.',
            },
            {
              id: 'no_growth',
              text: 'Because they are legally prohibited from saving cash.',
              isCorrect: false,
              explanation: 'Incorrect. It is due to low capital expenditure needs.',
            },
          ],
        },
      },
      {
        id: 'tech_act_4',
        stepNumber: 4,
        title: 'Investigate a Tech Firm',
        subtitle: 'Analyze Total Contract Value (TCV), client attrition, and operating margin trends.',
        estimatedMinutes: 3,
        xpReward: 100,
        type: 'investigation',
        investigationConfig: {
          caseTitle: 'The Vanishing Deal Pipeline',
          companyName: 'Apex Infotech Solutions Ltd.',
          ticker: 'APEXTECH',
          intro: 'Apex reported strong trailing earnings. But inspection of their forward deal pipeline and client concentration shows hidden vulnerabilities.',
          clues: [
            {
              id: 'clue_tcv',
              title: 'Deal Pipeline Slowdown',
              icon: '📉',
              metricBadge: 'Forward Order Book',
              dataHighlight: 'New deal wins (TCV) fell 35% in European banking clients',
              observation: 'Enterprise customers delayed discretionary digital transformation spending amid macroeconomic caution.',
              implication: 'Future revenue will decline sharply over the next 2 to 3 quarters.',
            },
            {
              id: 'clue_top5',
              title: 'Client Concentration Risk',
              icon: '⚠️',
              metricBadge: 'Client Dependency',
              dataHighlight: 'Top 3 clients account for 48% of total revenue',
              observation: 'One major US retail client is preparing to bring IT development in-house.',
              implication: 'Losing that single contract would wipe out nearly 20% of annual firm profit.',
            },
          ],
          question: 'What is the detective verdict on Apex Infotech?',
          options: [
            {
              id: 'apex_fragile',
              text: 'Apex faces severe near-term headwind: high client concentration and a drying order pipeline indicate revenue risk.',
              isBest: true,
              verdictFeedback: 'Masterful analysis! You spotted that backward-looking revenue looked good while forward-looking deal pipeline was deteriorating.',
            },
            {
              id: 'apex_safe',
              text: 'Apex is completely safe because trailing revenue was positive.',
              isBest: false,
              verdictFeedback: 'Beware! In technology, order book and deal pipeline tell you tomorrow’s earnings.',
            },
          ],
          nuancedTakeaway: {
            title: 'Tech Detective Lesson',
            summary: 'Always evaluate tech companies on forward deal bookings (TCV) and client concentration, not just last quarter’s results.',
            lessons: [
              'Watch Deal Total Contract Value (TCV) for early warnings of demand slowdowns.',
              'Check client concentration: relying on 2-3 mega accounts creates extreme vulnerability.',
            ],
          },
        },
      },
    ];
  }

  // Automobile sector default 4 activities
  if (sector.id === 'automobiles') {
    return [
      {
        id: 'auto_act_1',
        stepNumber: 1,
        title: 'Understand Automobiles',
        subtitle: 'Vehicles manufactured, dealer distribution, consumer financing, and cyclical demand.',
        estimatedMinutes: 2,
        xpReward: 50,
        type: 'story',
        storyConfig: {
          hook: 'The Engine of Consumer Mobility',
          scenario:
            'A family decides to upgrade from a two-wheeler to their first compact SUV. How does an automaker turn raw steel and battery tech into an assembled vehicle?',
          participants: [
            {
              id: 'buyer',
              title: 'Car Buyer',
              icon: '🚗',
              role: 'Buys Vehicle with 80% Loan',
              details: 'Purchases vehicle using a 5-year bank auto loan, highly sensitive to interest rates.',
              flowArrowLabel: 'Visits dealership showroom →',
            },
            {
              id: 'dealer',
              title: 'Dealer Franchise Network',
              icon: '🏬',
              role: 'Showroom & Aftermarket Service',
              details: 'Sells vehicles, arranges auto financing, and earns recurring revenue on maintenance parts.',
              flowArrowLabel: 'Orders inventory from automaker →',
            },
            {
              id: 'oem',
              title: 'Auto Manufacturer (OEM)',
              icon: '🏭',
              role: 'Design & High-Capex Assembly',
              details: 'Designs platforms, sources thousands of components from auto-ancillaries, and runs robotic assembly lines.',
            },
          ],
          decisionQuestion: 'Why is the automobile sector considered highly "cyclical"?',
          options: [
            {
              id: 'auto_cyclical_ans',
              text: 'Car purchases are big discretionary decisions: when interest rates rise or the economy slows, buyers delay upgrades.',
              isCorrect: true,
              explanation: 'Spot on! Unlike food or toothpaste, people can easily delay buying a new car for a year when times get tough.',
            },
            {
              id: 'auto_always_same',
              text: 'Car demand never changes regardless of interest rates or fuel prices.',
              isCorrect: false,
              explanation: 'Incorrect. Vehicle sales expand rapidly in boom cycles and contract sharply in downturns.',
            },
          ],
          conceptExplanation: {
            title: 'High Capital Intensity & Operating Leverage',
            summary: 'Auto manufacturing requires massive upfront capital for robotized factories, dies, and assembly robotics.',
            corePoints: [
              'Volume Sensitivity: Once a plant crosses its break-even production threshold, each additional car sold delivers pure profit.',
              'Average Selling Price (ASP): Premiumization (shifting from budget hatchbacks to SUVs) drives higher revenue per vehicle.',
              'Ancillary Ecosystem: Automakers rely on hundreds of specialized suppliers for engines, brakes, tires, and wiring harnesses.',
            ],
          },
          reflectionQuestion: 'Does an automobile company make all its profits from selling the car alone?',
          reflectionOptions: [
            {
              id: 'auto_aftermarket',
              text: 'No, spare parts, servicing warranties, and auto financing commissions provide high-margin recurring income.',
              isCorrect: true,
              explanation: 'Exactly right! After-sales parts and maintenance carry far higher margins than the initial vehicle sale.',
            },
            {
              id: 'auto_only_car',
              text: 'Yes, dealerships throw away all spare parts for free.',
              isCorrect: false,
              explanation: 'Incorrect. Service and parts are major profit centers.',
            },
          ],
        },
      },
      {
        id: 'auto_act_2',
        stepNumber: 2,
        title: 'Follow the Money',
        subtitle: 'Bill of Materials (BOM), commodity prices (steel, aluminum), operating margins, and break-even scale.',
        estimatedMinutes: 3,
        xpReward: 50,
        type: 'model',
        modelConfig: {
          headline: 'Factory Break-Even & Capacity Utilization Model',
          intro: 'Explore how assembly volume and raw material costs (steel, lithium, electronics) dictate vehicle profitability.',
          defaultLendingRate: 11.5, // Operating Margin %
          defaultDepositRate: 68.0, // Raw Material BOM %
          depositPoolCr: 10000,
          loansDeployedCr: 7500,
          reservesCr: 2500,
          explanation: {
            spreadConcept: 'Vehicle Gross Margin = (Selling Price − Raw Material BOM Cost) ÷ Selling Price.',
            spreadVsNim: 'Operating leverage means that operating at 85% plant capacity can produce triple the profits of operating at 60% capacity.',
            limitationsNote: 'Simplified production model. Electric vehicle battery costs and government incentives introduce dynamic variables.',
          },
          reflectionQuestion: 'What happens when steel and aluminum prices rise by 25%?',
          reflectionOptions: [
            {
              id: 'auto_cost_squeeze',
              text: 'Automaker margins get squeezed unless they can pass on price hikes or gain scale efficiencies.',
              isCorrect: true,
              explanation: 'Correct! Steel and metals represent the largest chunk of an automobile’s bill of materials.',
            },
            {
              id: 'auto_free_steel',
              text: 'Cars magically become cheaper to manufacture.',
              isCorrect: false,
              explanation: 'Incorrect. Higher input commodity costs squeeze gross margins.',
            },
          ],
        },
      },
      {
        id: 'auto_act_3',
        stepNumber: 3,
        title: 'Run an Experiment',
        subtitle: 'Compare a high-margin SUV & EV platform maker against a low-margin entry-level hatchback producer.',
        estimatedMinutes: 2,
        xpReward: 50,
        type: 'experiment',
        experimentConfig: {
          headline: 'The Premiumization Shift: SUVs vs Budget Hatchbacks',
          intro: 'Consumer preferences in India have shifted dramatically towards SUVs with touchscreens and ADAS safety tech. Let’s compare two strategies.',
          entityA: {
            name: 'Pinnacle Motors',
            icon: '🚙',
            tag: 'Premium SUV & Electric Platform',
            lendingRate: 14.5,
            depositRate: 62.0,
            fundingNote: 'Average Selling Price (ASP) of ₹14 Lakh. High consumer willingness to pay for features.',
          },
          entityB: {
            name: 'Economy Mobility',
            icon: '🚗',
            tag: 'Entry-Level Budget Small Cars',
            lendingRate: 5.5,
            depositRate: 78.0,
            fundingNote: 'Average Selling Price (ASP) of ₹4.5 Lakh. Price-sensitive buyers cannot absorb cost hikes.',
          },
          question: 'Which automaker commands higher operating margin per vehicle sold?',
          options: [
            {
              id: 'pinnacle_wins',
              text: 'Pinnacle Motors because premium SUVs carry far richer feature margins than entry hatchbacks.',
              isCorrect: true,
              explanation: 'Spot on! Higher ASP and feature-rich options (sunroofs, screens, ADAS) deliver double the margin percentage.',
            },
            {
              id: 'economy_wins',
              text: 'Economy Mobility because making cheaper cars always yields higher profit percentages.',
              isCorrect: false,
              explanation: 'Incorrect. Small budget cars operate on razor-thin single-digit margins.',
            },
          ],
          catchExplanation: {
            title: 'The EV Transition Transition Risk',
            subtitle: 'Navigating the biggest technology shift in 100 years',
            keyCatch: 'While premium SUVs earn great margins today, legacy automakers must invest billions to develop electric platforms without hurting cash flow.',
            points: [
              'Battery Cost Curve: Battery packs account for 35%–40% of an EV’s bill of materials.',
              'Charging Ecosystem: OEMs building charging networks lock in early EV consumer adoption.',
            ],
          },
          reflectionQuestion: 'Why is Indian auto market growth accelerating in SUVs while budget small cars decline?',
          reflectionOptions: [
            {
              id: 'suv_aspiration',
              text: 'Rising middle-class disposable incomes, rough road conditions, and aspiration for safer, high-seated vehicles.',
              isCorrect: true,
              explanation: 'Exactly right! Indian buyers are trading up into feature-loaded compact SUVs.',
            },
            {
              id: 'suv_accidental',
              text: 'Because small cars are now illegal in India.',
              isCorrect: false,
              explanation: 'Incorrect. It is a genuine consumer taste and purchasing power shift.',
            },
          ],
        },
      },
      {
        id: 'auto_act_4',
        stepNumber: 4,
        title: 'Investigate an Automaker',
        subtitle: 'Analyze dealer inventory days, capacity utilization, and order cancellations.',
        estimatedMinutes: 3,
        xpReward: 100,
        type: 'investigation',
        investigationConfig: {
          caseTitle: 'The Dealership Inventory Pileup',
          companyName: 'Velocity Auto Corp Ltd.',
          ticker: 'VELOCITYAUTO',
          intro: 'Velocity reported record factory wholesale dispatches to dealers. But channel checks reveal thousands of unsold cars accumulating on dealer lots.',
          clues: [
            {
              id: 'clue_channel_stuffing',
              title: 'Dealership Inventory Days',
              icon: '🅿️',
              metricBadge: 'Channel Inventory',
              dataHighlight: 'Dealer stock jumped from 28 days to 72 days of inventory',
              observation: 'The automaker forced dealers to take delivery of cars that retail end-consumers haven’t actually bought.',
              implication: 'Reported wholesale revenues are artificially boosted; deep discounts will be required next quarter to clear unsold stock.',
            },
            {
              id: 'clue_discounts',
              title: 'Heavy Consumer Discounts',
              icon: '🏷️',
              metricBadge: 'Realization Pressure',
              dataHighlight: 'Average discount per car increased from ₹15,000 to ₹75,000',
              observation: 'Competition in mid-size SUVs triggered intense discounting wars.',
              implication: 'Operating margins will drop significantly in upcoming earnings.',
            },
          ],
          question: 'What is the detective verdict on Velocity Auto?',
          options: [
            {
              id: 'velocity_warning',
              text: 'Velocity faces a demand slowdown masked by channel stuffing. High dealer inventory and surging discounts will drag down upcoming profits.',
              isBest: true,
              verdictFeedback: 'Brilliant forensic work! Looking at dealer inventory days reveals when factory dispatches diverge from real retail demand.',
            },
            {
              id: 'velocity_ignore',
              text: 'There is no issue because factory dispatches were high.',
              isBest: false,
              verdictFeedback: 'Beware! An automaker can only force unsold inventory onto dealers for so long before production cuts follow.',
            },
          ],
          nuancedTakeaway: {
            title: 'Auto Detective Lesson',
            summary: 'Always track Retail Registrations (Vahan data in India) and Dealer Inventory Days rather than just factory dispatches.',
            lessons: [
              'Factory wholesale dispatches ≠ real consumer retail sales.',
              'Rising dealer inventory is the #1 early indicator of auto margin compression.',
            ],
          },
        },
      },
    ];
  }

  // Fallback generic 4 activities for any other sector
  return [
    {
      id: `${sector.id}_act_1`,
      stepNumber: 1,
      title: `Understand ${sector.name}`,
      subtitle: `How ${sector.name} companies create value and solve customer needs.`,
      estimatedMinutes: 2,
      xpReward: 50,
      type: 'story',
      storyConfig: {
        hook: `Foundations of the ${sector.name} Industry`,
        scenario: sector.whatIsIt?.simpleDefinition || sector.heroSummary,
        participants: [
          {
            id: 'buyer',
            title: 'Customer / Buyer',
            icon: '🛍️',
            role: 'Purchases products & services',
            details: 'Seeks reliable solutions and value for money.',
            flowArrowLabel: 'Pays for value →',
          },
          {
            id: 'firm',
            title: `${sector.name} Provider`,
            icon: sector.icon,
            role: 'Product / Service Creator',
            details: 'Deploys capital, operational expertise, and market distribution.',
          },
        ],
        decisionQuestion: `What is the primary engine of long-term profitability in ${sector.name}?`,
        options: [
          {
            id: 'opt_sustainable_moat',
            text: 'Building a sustainable competitive moat and disciplined capital allocation.',
            isCorrect: true,
            explanation: 'Correct! Lasting shareholder value comes from durable competitive advantage and high return on capital.',
          },
          {
            id: 'opt_luck',
            text: 'Relying purely on short-term speculative market luck.',
            isCorrect: false,
            explanation: 'Incorrect. Great businesses build structural competitive moats.',
          },
        ],
        conceptExplanation: {
          title: `How ${sector.name} Works`,
          summary: sector.howItWorks?.explanation || sector.heroSummary,
          corePoints: [
            'Value Creation: Meeting critical societal or business demand efficiently.',
            'Unit Economics: Pricing power minus cost of goods sold determines margin durability.',
          ],
        },
        reflectionQuestion: `Can a company in ${sector.name} sustain high profits without competitive advantages?`,
        reflectionOptions: [
          {
            id: 'ref_no_moat',
            text: 'No, in free markets competitors copy high-margin products unless protected by a moat.',
            isCorrect: true,
            explanation: 'Exactly right! High returns attract aggressive competition without structural barriers to entry.',
          },
          {
            id: 'ref_yes_moat',
            text: 'Yes, competition never exists in business.',
            isCorrect: false,
            explanation: 'Incorrect. Competition is constant in capitalism.',
          },
        ],
      },
    },
    {
      id: `${sector.id}_act_2`,
      stepNumber: 2,
      title: 'Follow the Money',
      subtitle: 'Revenue streams, cost structures, and operating margins.',
      estimatedMinutes: 3,
      xpReward: 50,
      type: 'model',
      modelConfig: {
        headline: `${sector.name} Revenue & Margin Dynamics`,
        intro: 'Explore how pricing, volume, and input costs interact to establish operating profitability.',
        defaultLendingRate: 15.0,
        defaultDepositRate: 60.0,
        depositPoolCr: 1000,
        loansDeployedCr: 800,
        reservesCr: 200,
        explanation: {
          spreadConcept: 'Operating Margin = Operating Profit ÷ Total Revenue.',
          spreadVsNim: 'High margins provide a defensive cushion during economic downturns.',
          limitationsNote: 'Simplified educational model.',
        },
        reflectionQuestion: 'Why do operating margins matter more than just raw revenue size?',
        reflectionOptions: [
          {
            id: 'margin_focus',
            text: 'Because a company making ₹10,000 Cr revenue with 1% margin is fragile compared to one with 25% margin.',
            isCorrect: true,
            explanation: 'Spot on! Margin resilience protects equity during inflation and cost shocks.',
          },
          {
            id: 'revenue_only',
            text: 'Revenue is all that matters even if the company loses money on every sale.',
            isCorrect: false,
            explanation: 'Incorrect. Losing money on high sales burns capital.',
          },
        ],
      },
    },
    {
      id: `${sector.id}_act_3`,
      stepNumber: 3,
      title: 'Run an Experiment',
      subtitle: 'Compare high-moat industry leaders against commodity price-takers.',
      estimatedMinutes: 2,
      xpReward: 50,
      type: 'experiment',
      experimentConfig: {
        headline: 'Market Power & Pricing Resilience',
        intro: 'Explore how cost increases impact two different businesses in this industry.',
        entityA: {
          name: 'Sector Leader Corp',
          icon: '👑',
          tag: 'Pricing Power & Moat',
          lendingRate: 22.0,
          depositRate: 50.0,
          fundingNote: 'Strong brand equity and loyal customers.',
        },
        entityB: {
          name: 'Generic Supplier Ltd',
          icon: '📦',
          tag: 'Commodity Price-Taker',
          lendingRate: 8.0,
          depositRate: 70.0,
          fundingNote: 'Competes solely on price with no brand loyalty.',
        },
        question: 'Which company is better positioned to weather input cost inflation?',
        options: [
          {
            id: 'moat_wins',
            text: 'Sector Leader Corp due to pricing power and superior margin buffers.',
            isCorrect: true,
            explanation: 'Correct! Strong competitive positioning allows passing on cost increases.',
          },
          {
            id: 'commodity_wins',
            text: 'Generic Supplier Ltd because lower margins are somehow better.',
            isCorrect: false,
            explanation: 'Incorrect. Thin margins vanish quickly when costs rise.',
          },
        ],
        catchExplanation: {
          title: 'The Competitive Moat Principle',
          subtitle: 'Why moat matters most in long-term investing',
          keyCatch: 'Businesses that can raise prices without losing customers compound wealth over decades.',
          points: [
            'Brand, network effects, high switching costs, or scale advantages protect high returns.',
          ],
        },
        reflectionQuestion: 'What is the true sign of pricing power?',
        reflectionOptions: [
          {
            id: 'buffett_test',
            text: 'The ability to raise prices without holding a prayer meeting or losing market share to rivals.',
            isCorrect: true,
            explanation: 'Exactly right! As Warren Buffett famously noted, pricing power is the single most important metric.',
          },
          {
            id: 'wrong_test',
            text: 'Offering the lowest price in the world.',
            isCorrect: false,
            explanation: 'Incorrect.',
          },
        ],
      },
    },
    {
      id: `${sector.id}_act_4`,
      stepNumber: 4,
      title: `Investigate a ${sector.name} Company`,
      subtitle: 'Apply financial analysis to examine real business health and forensic clues.',
      estimatedMinutes: 3,
      xpReward: 100,
      type: 'investigation',
      investigationConfig: {
        caseTitle: `${sector.name} Forensic Investigation`,
        companyName: `Apex ${sector.name} Ltd.`,
        ticker: `APEX${sector.id.toUpperCase()}`,
        intro: `Examine the operational and financial indicators of Apex ${sector.name} to determine its underlying strength.`,
        clues: [
          {
            id: 'clue_revenue_quality',
            title: 'Revenue Quality & Working Capital',
            icon: '📊',
            metricBadge: 'Cash Flow Conversion',
            dataHighlight: 'Earnings reported +18%, but cash flow from operations turned negative',
            observation: 'The company recorded sales on credit terms, but customers are not paying cash on time.',
            implication: 'Paper accounting profit is not translating into real bank cash flow.',
          },
          {
            id: 'clue_debt_load',
            title: 'Debt & Interest Obligations',
            icon: '⚠️',
            metricBadge: 'Financial Leverage',
            dataHighlight: 'Debt-to-Equity rose to 2.8x with declining interest coverage',
            observation: 'The company borrowed aggressively to finance low-return projects.',
            implication: 'Vulnerable to refinancing shocks if interest rates rise.',
          },
        ],
        question: `What is the forensic verdict on this ${sector.name} business?`,
        options: [
          {
            id: 'verdict_caution',
            text: 'High caution: Paper accounting profits masked by negative operating cash flow and excessive debt burden.',
            isBest: true,
            verdictFeedback: 'Outstanding analytical judgment! You looked past surface net profit to verify real cash flow and solvency.',
          },
          {
            id: 'verdict_bullish',
            text: 'Strong buy because accounting profit grew +18%.',
            isBest: false,
            verdictFeedback: 'Beware! Accounting profit without operating cash flow is a major warning flag.',
          },
        ],
        nuancedTakeaway: {
          title: 'The Golden Forensic Rule',
          summary: 'Revenue is vanity, profit is sanity, but cash flow is reality.',
          lessons: [
            'Always compare Net Profit against Cash Flow from Operations (CFO).',
            'Check debt and interest coverage before being impressed by revenue growth.',
          ],
        },
      },
    },
  ];
}

export function getSectorFeaturedInvestigation(sector: SectorData): SectorFeaturedInvestigation {
  if (sector.featuredInvestigation) {
    return sector.featuredInvestigation;
  }

  return {
    question: `How do ${sector.name} companies make money?`,
    supportingCopy: `Explore the business mechanics, unit economics, and forensic indicators that separate winning ${sector.name} franchises from fragile competitors.`,
    previewPoints: [
      `Understand how value is created and distributed in ${sector.name}`,
      `Follow the money across unit economics, pricing, and operating costs`,
      `Run an experiment comparing industry leaders vs commodity competitors`,
      `Investigate a real-world case using key forensic clues`,
    ],
    activitiesCount: 4,
    totalXp: 250,
  };
}
