/**
 * Practical Technical Tools Learning & Market Simulation Data.
 * 
 * Provides 3 full workflows:
 * 1. RSI (Relative Strength Index) - Momentum & Mean Reversion
 * 2. Moving Average Crossover (20 EMA & 50 EMA) - Trend Riding
 * 3. Bollinger Bands - Volatility Squeeze & Explosive Breakout
 */

import { OHLCV } from '../engine/types.ts';
import { INDIAN_STOCKS } from './stocks.ts';

export interface BeginnerAnalogy {
  title: string;
  metaphor: string;
  icon: string;
  story: string;
  goldenTakeaway: string;
}

export interface BeginnerGuideStep {
  stepNumber: number;
  title: string;
  instruction: string;
  targetCandleIndex?: number;
  actionRequired?: 'ADVANCE' | 'BUY' | 'MANAGE' | 'EXIT';
}

export interface BeginnerPreset {
  shares: number;
  stopLoss: number;
  takeProfit: number;
  label: string;
  rationale: string;
}

export interface TechToolChallenge {
  id: string;
  title: string;
  scenarioDescription: string;
  chartHint: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  finInsight: string;
}

export interface TechToolSimulationScenario {
  id: string;
  stockSymbol: string;
  stockName: string;
  scenarioTitle: string;
  brief: string;
  recommendedSetup: {
    tool: string;
    entryRule: string;
    stopRule: string;
    targetRule: string;
  };
  initialCandleCount: number;
  candles: OHLCV[];
  expectedBestAction: 'BUY' | 'SELL';
  beginnerPreset: BeginnerPreset;
  beginnerSteps: BeginnerGuideStep[];
  candleCommentary: Record<number, string>;
  finCoachingMoments: {
    candleIndex: number;
    triggerMessage: string;
  }[];
}

export interface TechToolDefinition {
  id: 'rsi' | 'ma_cross' | 'bollinger';
  name: string;
  category: 'Momentum' | 'Trend' | 'Volatility';
  tagline: string;
  shortDesc: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  analogy: BeginnerAnalogy;
  
  // Phase 1: Anatomy & Controls
  anatomy: {
    coreConcept: string;
    howItWorks: string;
    formulaSimple: string;
    defaultParams: {
      name: string;
      label: string;
      defaultValue: number;
      min: number;
      max: number;
      step: number;
      description: string;
    }[];
    proTradingRules: string[];
    commonRetailMistake: string;
  };

  // Phase 2: Signal Spotter Challenge
  challenge: TechToolChallenge;

  // Phase 3: Real Work Simulation Scenario
  simulation: TechToolSimulationScenario;
}

// Generate realistic Indian stock simulation feeds by taking subsets with interesting price action
const tataMotors = INDIAN_STOCKS.find(s => s.symbol === 'TATAMOTORS') || INDIAN_STOCKS[0];
const reliance = INDIAN_STOCKS.find(s => s.symbol === 'RELIANCE') || INDIAN_STOCKS[0];
const infosys = INDIAN_STOCKS.find(s => s.symbol === 'INFY') || INDIAN_STOCKS[0];

export const TECH_TOOLS: TechToolDefinition[] = [
  // ==========================================
  // TOOL 1: RSI (Relative Strength Index)
  // ==========================================
  {
    id: 'rsi',
    name: 'RSI (Relative Strength Index)',
    category: 'Momentum',
    tagline: 'Master Momentum & Avoid Buying at the Exhaustion Peak',
    shortDesc: 'A bounded momentum oscillator (0 to 100) that measures the speed and velocity of price changes.',
    iconName: 'Activity',
    difficulty: 'Beginner',
    analogy: {
      title: 'The Stretched Rubber Band Analogy',
      metaphor: 'Stretched Rubber Band',
      icon: '🪢',
      story:
        'Imagine pulling a rubber band tight downward. The harder you pull, the more it wants to snap back upward! That is RSI below 30 (Oversold). But beware: if someone is still stretching it, don’t grab it yet—you will get hurt! Wait for the rubber band to actually start snapping back up (crossing back above 30). That bounce is the "Bullish Hook".',
      goldenTakeaway: 'Oversold (<30) tells you where to look; the hook back above 30 tells you when to pull the trigger.',
    },
    anatomy: {
      coreConcept:
        'RSI measures the ratio of recent up-days to recent down-days over a given period (standard: 14 periods). It tells you whether buyers or sellers are over-extending themselves.',
      howItWorks:
        'When RSI crosses above 70, the asset is considered Overbought (buyers are exhausted, pullback probable). When RSI crosses below 30, it is Oversold (selling climax, relief bounce probable).',
      formulaSimple: 'RSI = 100 - [100 / (1 + (Average Gain / Average Loss))]',
      defaultParams: [
        {
          name: 'period',
          label: 'RSI Period',
          defaultValue: 14,
          min: 5,
          max: 30,
          step: 1,
          description: 'Lower values (e.g. 7) make RSI very jittery; higher values (21) make it smooth and slow.',
        },
        {
          name: 'overbought',
          label: 'Overbought Threshold',
          defaultValue: 70,
          min: 65,
          max: 85,
          step: 5,
          description: 'Standard is 70. In strong bull markets, traders often adjust this to 80.',
        },
        {
          name: 'oversold',
          label: 'Oversold Threshold',
          defaultValue: 30,
          min: 15,
          max: 35,
          step: 5,
          description: 'Standard is 30. In severe bear trends, RSI can stay below 30 for weeks.',
        },
      ],
      proTradingRules: [
        'Never buy just because RSI drops below 30! Wait for the "Hook": let RSI cross back ABOVE 30 with a bullish green candle.',
        'In strong uptrends, RSI tends to oscillate between 40 and 80 (40 acts as dynamic support).',
        'Bullish Divergence: Price makes a Lower Low, but RSI makes a Higher Low. This is the highest probability reversal signal in technical analysis.',
      ],
      commonRetailMistake:
        'Shorting a stock immediately when RSI hits 70 in a raging bull run. Strong stocks can remain "overbought" above 70 for months while rising another 40%!',
    },
    challenge: {
      id: 'rsi_challenge_1',
      title: 'The Oversold Capitulation Dilemma',
      scenarioDescription:
        'Tata Motors has dropped 5 consecutive days on negative sector news. RSI has plunged to 24. A huge red candle forms with heavy volume.',
      chartHint: 'Notice whether the candle has closed and whether the RSI line is still pointing downward or hooking upward.',
      question: 'What is the most disciplined professional trader action right now?',
      options: [
        {
          id: 'opt_1',
          text: 'Place an immediate Buy Market Order because RSI 24 is "cheap"',
          isCorrect: false,
          explanation: 'Catching a falling knife! RSI can remain under 30 and plunge to 12 in panics. Never enter while the line is pointing down.',
        },
        {
          id: 'opt_2',
          text: 'Wait for the next candle to close green and RSI to cross back above 30 before entering Long',
          isCorrect: true,
          explanation: 'Correct! Waiting for the confirmation hook above 30 proves that buyers have actually stepped in to absorb the selling wave.',
        },
        {
          id: 'opt_3',
          text: 'Short the stock with maximum leverage because momentum is downward',
          isCorrect: false,
          explanation: 'Shorting after 5 days of selling with RSI at 24 is selling at the absolute bottom of the move with terrible risk-reward.',
        },
      ],
      finInsight:
        '“The secret of RSI is patience: oversold tells you where to look; the hook back above 30 tells you when to pull the trigger.”',
    },
    simulation: {
      id: 'sim_rsi_tata',
      stockSymbol: 'TATAMOTORS',
      stockName: 'Tata Motors Ltd.',
      scenarioTitle: 'Tata Motors: The Oversold Springboard Reversal',
      brief:
        'Tata Motors has experienced a steep pullback. Advance candles, monitor RSI approaching oversold (<30), and execute a disciplined Long trade with Stop-Loss and Target when the confirmation hook triggers!',
      recommendedSetup: {
        tool: 'RSI(14)',
        entryRule: 'RSI drops < 30, then hooks back above 30 on a green candle',
        stopRule: 'Just below the recent swing low candle (approx 2% risk)',
        targetRule: 'When RSI reaches 60-70 or 2x Risk (1:2 Risk/Reward)',
      },
      beginnerPreset: {
        shares: 50,
        stopLoss: 715,
        takeProfit: 785,
        label: 'Buy 50 Shares @ Market | SL: ₹715 | Target: ₹785',
        rationale: 'Limits risk to ₹20/share (₹1,000 risk) for a potential gain of ₹50/share (₹2,500 target profit, a healthy 1:2.5 ratio).',
      },
      beginnerSteps: [
        {
          stepNumber: 1,
          title: 'Step 1: Watch the Oversold Dip',
          instruction: 'Click "Next Candle" until Candle 35. Watch RSI drop below the red 30 line into oversold territory.',
          targetCandleIndex: 35,
          actionRequired: 'ADVANCE',
        },
        {
          stepNumber: 2,
          title: 'Step 2: Spot the Bullish Hook',
          instruction: 'Advance to Candle 38. Notice the strong green candle and RSI crossing back above 30 to 33.4!',
          targetCandleIndex: 38,
          actionRequired: 'BUY',
        },
        {
          stepNumber: 3,
          title: 'Step 3: Load Preset & Buy Long',
          instruction: 'Click "✨ Apply Beginner Preset" below the chart, then click "BUY LONG (Market)" to enter.',
          actionRequired: 'BUY',
        },
        {
          stepNumber: 4,
          title: 'Step 4: Watch the Profit Target Hit',
          instruction: 'Click "Play" or step forward candle-by-candle to watch your automated Target exit at ₹785!',
          actionRequired: 'MANAGE',
        },
      ],
      candleCommentary: {
        30: 'Candle 30: Tata Motors is in a steady drift around ₹760. RSI is neutral around 48.',
        33: 'Candle 33: A red down-day pushes price toward ₹742. RSI drops to 36. Sellers are dominating.',
        35: 'Candle 35: ⚠️ OVERSOLD! Price hits ₹724 and RSI drops to 28.2. Do NOT buy yet—wait for the green bounce!',
        37: 'Candle 37: Selling slows down. The candle forms a small lower wick (buyers testing the waters).',
        38: 'Candle 38: 🟢 BUY SIGNAL! A strong green bar closes at ₹736. RSI hooks upward to 33.4 across the 30 line!',
        42: 'Candle 42: Clean follow-through! Price rises to ₹755. RSI climbs to 46. You are in comfortable profit.',
        48: 'Candle 48: Momentum accelerating! Price pushes past ₹772. RSI reaches 61.',
        52: 'Candle 52: 🎯 TARGET HIT! Price hits ₹786. RSI reaches 68 (near overbought). Perfect profit lock-in!',
      },
      initialCandleCount: 30,
      candles: tataMotors.history.slice(10, 85),
      expectedBestAction: 'BUY',
      finCoachingMoments: [
        {
          candleIndex: 35,
          triggerMessage: 'Heads up! RSI has dropped to 28. Do not rush—watch for a green reversal bar and RSI hooking back above 30.',
        },
        {
          candleIndex: 38,
          triggerMessage: 'RSI just crossed back above 30 (now 33.4) with a green candle! This is your high-probability setup.',
        },
        {
          candleIndex: 52,
          triggerMessage: 'RSI is now 68! Buyers are reaching overbought exhaustion. Consider locking in profit or trailing your stop.',
        },
      ],
    },
  },

  // ==========================================
  // TOOL 2: Moving Average Crossover (20 & 50 EMA)
  // ==========================================
  {
    id: 'ma_cross',
    name: 'Moving Average Crossover (20 & 50 EMA)',
    category: 'Trend',
    tagline: 'Ride Multi-Month Bull Runs with Trend Confirmation',
    shortDesc: 'A dual-moving-average trend system that filters market noise and captures sustained price trends.',
    iconName: 'TrendingUp',
    difficulty: 'Intermediate',
    analogy: {
      title: 'Speedboat vs. Cruise Ship Analogy',
      metaphor: 'Speedboat & Cruise Ship',
      icon: '🚤',
      story:
        'The 20 EMA is a nimble speedboat that reacts quickly to short-term waves. The 50 EMA is a massive cruise ship that takes weeks to turn. When the speedboat cuts cleanly above the cruise ship ("Golden Cross"), the entire ocean current has shifted upward! Don’t chase it when it’s far ahead; wait for it to take a breath and touch the 20 EMA line for a safe ticket on board.',
      goldenTakeaway: 'The Golden Cross proves the trend is up; the pullback to the 20 EMA is your low-risk entry ticket.',
    },
    anatomy: {
      coreConcept:
        'Moving averages smooth out daily erratic price fluctuations to reveal the true underlying trend. The 20 EMA tracks short-term momentum; the 50 EMA tracks intermediate institutional direction.',
      howItWorks:
        'Golden Cross: When the Fast (20 EMA) crosses ABOVE the Slow (50 EMA), institutional buyers are taking control. Death Cross: When the 20 EMA crosses BELOW the 50 EMA, sellers dominate.',
      formulaSimple: 'EMA = (Close - Previous EMA) × [2 / (Period + 1)] + Previous EMA',
      defaultParams: [
        {
          name: 'fastPeriod',
          label: 'Fast EMA Period',
          defaultValue: 20,
          min: 9,
          max: 30,
          step: 1,
          description: 'Tracks short-term momentum. 20 is the institutional monthly standard.',
        },
        {
          name: 'slowPeriod',
          label: 'Slow EMA Period',
          defaultValue: 50,
          min: 30,
          max: 100,
          step: 5,
          description: 'Tracks intermediate baseline trend. 50 is the quarterly institutional baseline.',
        },
      ],
      proTradingRules: [
        'Trend Confirmation: Only buy when BOTH the 20 EMA and 50 EMA are sloping upwards at a 45-degree angle.',
        'The Pullback Buy: The safest entry is NOT right at the cross, but on the first orderly pullback that tests the 20 EMA as support.',
        'Whipsaw Warning: Moving averages fail in sideways range-bound markets. If price keeps criss-crossing the MAs, stop trading and wait for a range breakout.',
      ],
      commonRetailMistake:
        'Buying during a flat, horizontal moving average. Without a clear slope, moving averages generate repeated false signals (whipsaws) that bleed capital.',
    },
    challenge: {
      id: 'ma_challenge_1',
      title: 'Spotting the High-Conviction Trend Pullback',
      scenarioDescription:
        'Reliance Industries experienced a 20/50 EMA Golden Cross two weeks ago. Price rallied 6% and has now gently pulled back to touch the rising 20 EMA line on low volume.',
      chartHint: 'Compare entry at the initial cross vs entry at the first test of the 20 EMA support.',
      question: 'Why do institutional traders prefer entering on the 20 EMA pullback rather than chasing the initial crossover spike?',
      options: [
        {
          id: 'opt_1',
          text: 'Entering on the pullback offers a tighter stop-loss and superior Risk:Reward ratio',
          isCorrect: true,
          explanation: 'Spot on! At the 20 EMA pullback, your stop-loss is just under the 20 EMA (small risk, ~1.5%), while the upside target is the prior swing high and beyond (1:3+ Risk/Reward).',
        },
        {
          id: 'opt_2',
          text: 'Because moving averages guarantee 100% win rate when touched',
          isCorrect: false,
          explanation: 'No indicator guarantees 100% wins. MAs provide probabilistic edge and risk-reward structure.',
        },
        {
          id: 'opt_3',
          text: 'Pullbacks mean the trend has failed and you should immediately short',
          isCorrect: false,
          explanation: 'Pullbacks on light volume are the lifeblood of healthy trends, not trend failures.',
        },
      ],
      finInsight:
        '“Amateurs chase the green spike after the crossover; professionals wait for the orderly retest of the moving average.”',
    },
    simulation: {
      id: 'sim_ma_reliance',
      stockSymbol: 'RELIANCE',
      stockName: 'Reliance Industries Ltd.',
      scenarioTitle: 'Reliance: The Institutional Trend Wave',
      brief:
        'Reliance is breaking out of a 2-month consolidation. Watch the 20 EMA cross above the 50 EMA, wait for price confirmation, enter long, and trail your stop along the rising 20 EMA!',
      recommendedSetup: {
        tool: '20 EMA & 50 EMA Crossover',
        entryRule: '20 EMA crosses above 50 EMA with price closing above both MAs',
        stopRule: 'Below the 50 EMA line (trailed upwards as the trend advances)',
        targetRule: 'Ride until price closes clearly below the 20 EMA',
      },
      beginnerPreset: {
        shares: 15,
        stopLoss: 2660,
        takeProfit: 2880,
        label: 'Buy 15 Shares @ Market | SL: ₹2,660 | Target: ₹2,880',
        rationale: 'Stop safely below the 50 EMA anchor. Target aims for the multi-week institutional rally.',
      },
      beginnerSteps: [
        {
          stepNumber: 1,
          title: 'Step 1: Watch the Golden Cross Form',
          instruction: 'Advance to Candle 38. Watch the teal 20 EMA line rise and cut cleanly above the amber 50 EMA line!',
          targetCandleIndex: 38,
          actionRequired: 'ADVANCE',
        },
        {
          stepNumber: 2,
          title: 'Step 2: Enter on Trend Confirmation',
          instruction: 'On Candle 38-40, price confirms above both moving averages. Click "✨ Apply Beginner Preset" and BUY!',
          actionRequired: 'BUY',
        },
        {
          stepNumber: 3,
          title: 'Step 3: The 20 EMA Pullback Test',
          instruction: 'Advance to Candle 45. Notice how price pulls back and bounces off the teal 20 EMA line like a trampoline!',
          actionRequired: 'MANAGE',
        },
        {
          stepNumber: 4,
          title: 'Step 4: Ride the Wave to ₹2,880',
          instruction: 'Step forward to Candle 58-60 to see your automated Take-Profit trigger as Reliance surges!',
          actionRequired: 'EXIT',
        },
      ],
      candleCommentary: {
        35: 'Candle 35: Reliance is coiling at ₹2,670. The 20 EMA is narrowing against the 50 EMA.',
        38: 'Candle 38: 🟢 GOLDEN CROSS! The teal 20 EMA line crosses cleanly above the 50 EMA. Institutional trend is turning up!',
        40: 'Candle 40: Strong green bar confirms above both moving averages at ₹2,725. Excellent entry point.',
        45: 'Candle 45: 🛡️ SUPPORT TEST! Price dips to ₹2,705, touches the rising 20 EMA line, and immediately bounces! Support holds.',
        50: 'Candle 50: Upward momentum resumes. Price pushes to ₹2,790. Both moving averages are sloping up at 45 degrees.',
        58: 'Candle 58: 🎯 TARGET SURGE! Price hits ₹2,885. Your profit target is triggered effortlessly!',
      },
      initialCandleCount: 35,
      candles: reliance.history.slice(20, 95),
      expectedBestAction: 'BUY',
      finCoachingMoments: [
        {
          candleIndex: 38,
          triggerMessage: 'Golden Cross confirmed! 20 EMA has crossed cleanly above the 50 EMA with an expansive green candle.',
        },
        {
          candleIndex: 45,
          triggerMessage: 'Healthy pullback! Price is gently testing the 20 EMA line. If it holds, this is your optimal low-risk add or entry.',
        },
        {
          candleIndex: 60,
          triggerMessage: 'Strong trend extension! Remember to trail your stop-loss upwards to lock in your open profits.',
        },
      ],
    },
  },

  // ==========================================
  // TOOL 3: Bollinger Bands (Volatility Squeeze & Breakout)
  // ==========================================
  {
    id: 'bollinger',
    name: 'Bollinger Bands & The Volatility Squeeze',
    category: 'Volatility',
    tagline: 'Spot Explosive Breakouts Before the Market Moves',
    shortDesc: 'Statistical volatility envelopes placed 2 standard deviations above and below a 20-period moving average.',
    iconName: 'Maximize2',
    difficulty: 'Advanced',
    analogy: {
      title: 'The Coiled Spring Analogy',
      metaphor: 'Coiled Metal Spring',
      icon: '🌀',
      story:
        'Imagine pushing down on a heavy metal spring inside a tight box. The tighter you squeeze it, the more kinetic energy gets trapped inside! Bollinger Bands measure this compression. When the upper and lower bands pinch together into a narrow tunnel (BandWidth < 3%), the market is asleep. When a wide green candle bursts outside the upper band, the spring has released—an explosive multi-week trend has begun!',
      goldenTakeaway: 'The tighter the squeeze, the bigger the breakout. Follow the direction of the candle that bursts outside the band.',
    },
    anatomy: {
      coreConcept:
        'Volatility is cyclical: periods of extreme low volatility (squeeze) are inevitably followed by periods of violent high volatility (expansion). Bollinger Bands quantify this compression.',
      howItWorks:
        'When the Upper and Lower bands contract tightly toward the 20 SMA, BandWidth drops to historical lows (The Squeeze). The market is storing energy like a compressed spring.',
      formulaSimple: 'Upper = 20 SMA + (2 × StdDev) | Lower = 20 SMA - (2 × StdDev)',
      defaultParams: [
        {
          name: 'period',
          label: 'Moving Average Period',
          defaultValue: 20,
          min: 10,
          max: 50,
          step: 1,
          description: 'Standard baseline is 20 periods.',
        },
        {
          name: 'stdDev',
          label: 'Standard Deviation Multiplier',
          defaultValue: 2.0,
          min: 1.5,
          max: 3.0,
          step: 0.1,
          description: '2.0 captures ~95% of all historical price action within the bands.',
        },
      ],
      proTradingRules: [
        'The Squeeze Play: When BandWidth contracts to its narrowest range in 6 months, prepare for a major breakout.',
        'The Walking the Bands phenomenon: In explosive breakouts, price does NOT reverse at the Upper Band—it "walks" along the outside of the band for days.',
        'Stop-Loss Placement: Place stop-loss just inside the Middle 20 SMA line. If price falls back inside the middle band, the breakout has failed.',
      ],
      commonRetailMistake:
        'Shorting every time price touches the upper band. In a true breakout, touching the upper band is a sign of immense strength, not an automatic reversal point!',
    },
    challenge: {
      id: 'bb_challenge_1',
      title: 'Deciphering the Bollinger Squeeze',
      scenarioDescription:
        'Infosys has traded in a razor-thin ₹20 range for 3 weeks. Bollinger BandWidth has compressed to a 12-month low of 2.1%. Today, a wide-range green candle closes outside the upper band on 3x normal volume.',
      chartHint: 'Look at both the candle close relative to the upper band and the surge in trading volume.',
      question: 'What does this statistical expansion signal?',
      options: [
        {
          id: 'opt_1',
          text: 'A high-velocity volatility breakout has initiated; follow the trend direction',
          isCorrect: true,
          explanation: 'Precisely! A squeeze followed by a close outside the upper band with volume indicates a volatility expansion breakout. The compressed spring has released.',
        },
        {
          id: 'opt_2',
          text: 'The stock is overbought and will instantly fall to the lower band tomorrow',
          isCorrect: false,
          explanation: 'Classic retail mistake! During breakouts, stocks "walk the bands" upwards and do not mean-revert to the bottom band.',
        },
        {
          id: 'opt_3',
          text: 'Bollinger Bands are useless in earnings season',
          isCorrect: false,
          explanation: 'Bollinger Bands are specifically designed to measure volatility cycles and expansions.',
        },
      ],
      finInsight:
        '“Volatility cannot stay compressed forever. The tighter the Bollinger squeeze, the more violent the eventual explosion.”',
    },
    simulation: {
      id: 'sim_bb_infosys',
      stockSymbol: 'INFY',
      stockName: 'Infosys Ltd.',
      scenarioTitle: 'Infosys: The Volatility Squeeze Breakout',
      brief:
        'Infosys is coiled tightly inside an extreme Bollinger Band squeeze. Step forward candle-by-candle, spot the breakout bar piercing the upper band, enter long, and set your stop at the 20 SMA!',
      recommendedSetup: {
        tool: 'Bollinger Bands (20, 2)',
        entryRule: 'Candle closes outside Upper Band following a tight squeeze',
        stopRule: 'Just below the Middle 20 SMA line',
        targetRule: 'Exit when a candle closes back inside the Middle Band',
      },
      beginnerPreset: {
        shares: 25,
        stopLoss: 1585,
        takeProfit: 1730,
        label: 'Buy 25 Shares @ Market | SL: ₹1,585 | Target: ₹1,730',
        rationale: 'Stop safely inside the Middle 20 SMA. Target rides the volatility expansion wave.',
      },
      beginnerSteps: [
        {
          stepNumber: 1,
          title: 'Step 1: Identify the Squeeze',
          instruction: 'Advance to Candle 34. Notice how the upper and lower blue bands pinch tightly together like a narrow hallway!',
          targetCandleIndex: 34,
          actionRequired: 'ADVANCE',
        },
        {
          stepNumber: 2,
          title: 'Step 2: The Explosive Breakout Bar',
          instruction: 'Advance to Candle 37. A wide green bar closes ABOVE the upper band! The spring has sprung.',
          targetCandleIndex: 37,
          actionRequired: 'BUY',
        },
        {
          stepNumber: 3,
          title: 'Step 3: Load Preset & Execute Long',
          instruction: 'Click "✨ Apply Beginner Preset" below, then click "BUY LONG (Market)" to enter the expansion wave.',
          actionRequired: 'BUY',
        },
        {
          stepNumber: 4,
          title: 'Step 4: Ride the Expanding Bands',
          instruction: 'Step forward through Candle 48-50 as price walks along the upper band and hits your target at ₹1,730!',
          actionRequired: 'EXIT',
        },
      ],
      candleCommentary: {
        30: 'Candle 30: Infosys is moving sideways in a very narrow range around ₹1,600.',
        34: 'Candle 34: 🌀 SQUEEZE ALERT! The upper and lower bands are within 2.5% of each other. Volatility is deeply compressed.',
        36: 'Candle 36: Green candle forms and starts pressing against the upper band.',
        37: 'Candle 37: ⚡ BREAKOUT TRIGGER! Wide-range green candle closes outside the upper band at ₹1,632. Energy released!',
        42: 'Candle 42: "Walking the Bands"! The stock stays glued to the upper band as both bands flare open.',
        48: 'Candle 48: 🎯 TARGET REACHED! Price expands to ₹1,735. Beautiful volatility expansion trade!',
      },
      initialCandleCount: 30,
      candles: infosys.history.slice(15, 90),
      expectedBestAction: 'BUY',
      finCoachingMoments: [
        {
          candleIndex: 34,
          triggerMessage: 'Notice how narrow the upper and lower bands have become! BandWidth is under 3%. The spring is fully compressed.',
        },
        {
          candleIndex: 37,
          triggerMessage: 'BREAKOUT! A strong green bar just closed above the upper band. This is the volatility expansion trigger.',
        },
        {
          candleIndex: 50,
          triggerMessage: 'Price is riding the upper band. Notice how the bands are expanding outwards in opposite directions—classic trend expansion.',
        },
      ],
    },
  },
];
