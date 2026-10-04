/**
 * Proactive Hint Engine for Inspector Fin.
 * Automatically analyzes current state of Playground case or Trading Lab
 * and generates non-prescriptive, curiosity-driven hints.
 */

import { ChatContext } from '../components/chat/InspectorFinChatbot.tsx';

export interface ProactiveHint {
  id: string;
  badge: string;
  category: 'forensics' | 'valuation' | 'risk_control' | 'mechanics' | 'tradeoff';
  title: string;
  hintText: string;
  suggestedPrompts: string[];
}

export function generateProactiveHint(context: ChatContext): ProactiveHint {
  // 0. HOME PILLAR HINTS
  if (context.currentPillar === 'home') {
    return {
      id: 'home_daily_curiosity',
      badge: 'Daily Sleuth',
      category: 'forensics',
      title: 'The 30% Growth Mystery',
      hintText: 'Welcome to FinDo! Start today by exploring "The 30% Growth Mystery": uncover why a 30% profit jump caused a 12% stock dump. Clue: look at one-off real estate asset sales versus real operating cash flow.',
      suggestedPrompts: [
        'Why would a company’s stock fall when its profit went up 30%?',
        'What is an Index like NIFTY 50 and why did it move today?',
        'How do technology companies make money compared to banks?',
      ],
    };
  }

  // 1. PLAYGROUND PILLAR HINTS
  if (context.currentPillar === 'playground') {
    const {
      caseStep,
      activeCaseTitle,
      activeCaseTicker,
      unlockedClueTitles = [],
      actionPointsRemaining = 4,
      concernCount = 0,
      reasoningScore,
    } = context;

    // If user is on the Connective Learning Path (no active case dossier open)
    if (!activeCaseTitle) {
      return {
        id: 'pg_roadmap',
        badge: 'Learning Roadmap',
        category: 'forensics',
        title: 'Your Stock Journey Awaits',
        hintText: 'Welcome to the connective game path! Advance along the stepping stones to learn equity fundamentals, P/E ratios, and cash flow forensics step-by-step. Each cleared node unlocks bonus XP and leads to milestone boss cases.',
        suggestedPrompts: [
          'What is the difference between investing in Large Cap vs Small Cap stocks in India?',
          'Why is Price-to-Earnings (P/E) the most widely used valuation multiple?',
          'What is the difference between revenue growth and real cash profit?',
        ],
      };
    }

    if (caseStep === 'scenario') {
      return {
        id: 'pg_scenario',
        badge: 'Case Dossier Clue',
        category: 'forensics',
        title: 'The Flatline Paradox',
        hintText: `Notice the tension in ${activeCaseTitle || 'this case'}: a massive 180% surge followed by an 8-month pause. When entering the investigation room, start by examining whether profit margins expanded with sales or if promotional discounting diluted real profitability.`,
        suggestedPrompts: [
          'Why do stocks often pause for months after massive momentum rallies?',
          'Which financial metric best exposes if revenue growth is high quality?',
        ],
      };
    }

    if (caseStep === 'decision') {
      return {
        id: 'pg_decision',
        badge: 'Thesis Synthesis',
        category: 'valuation',
        title: 'Avoid Price-Anchoring',
        hintText: `As you choose your thesis, avoid anchoring solely to the past 180% price gain. Professional analysts focus on whether the market has already factored in margin compression and the cash conversion gap, or if multiple contraction risk remains high.`,
        suggestedPrompts: [
          'What is multiple contraction risk and how does it impact stock prices?',
          'How should I balance long-term category growth against immediate cash flow deficits?',
        ],
      };
    }

    if (caseStep === 'debrief') {
      const isHighScore = (reasoningScore ?? 0) >= 80;
      return {
        id: 'pg_debrief',
        badge: isHighScore ? 'Mastery Insight' : 'Analyst Takeaway',
        category: 'forensics',
        title: isHighScore ? 'Forensic Deduction Validated' : 'Sanity vs. Vanity in Stocks',
        hintText: isHighScore
          ? 'Brilliant work! You identified that multiple expansion without operating cash flow creates fragile valuations. Ready to test how momentum indicators like SMA and RSI behave during similar market consolidations in the Trading Lab?'
          : 'Reflect on this core principle: Revenue is vanity, Profit is sanity, but Cash is reality. Head over to the Trading Lab to see how disciplined risk stops protect capital when momentum breaks.',
        suggestedPrompts: [
          'How can quantitative trend strategies help prevent holding through large corrections?',
          'What other forensic balance sheet red flags should I watch for in Indian stocks?',
        ],
      };
    }

    // Default step is 'investigate'
    // Check specific unlocked clues
    const hasCfoClue = unlockedClueTitles.some(t => t.toLowerCase().includes('cash flow') || t.toLowerCase().includes('cfo'));
    const hasMarginClue = unlockedClueTitles.some(t => t.toLowerCase().includes('margin') || t.toLowerCase().includes('revenue'));
    const hasPeClue = unlockedClueTitles.some(t => t.toLowerCase().includes('p/e') || t.toLowerCase().includes('valuation'));
    const hasPromoterClue = unlockedClueTitles.some(t => t.toLowerCase().includes('promoter') || t.toLowerCase().includes('insider'));

    if (hasCfoClue) {
      return {
        id: 'pg_cfo',
        badge: 'Cash Forensic Clue',
        category: 'forensics',
        title: 'Accrual Gap: Profit vs. Cash',
        hintText: 'Notice that Net Profit (PAT) is +₹115 Cr while Operating Cash Flow is negative at -₹94 Cr. When accounting profits do not translate into cash, companies often borrow short-term debt to fund working capital. Look at borrowings and receivables to see the full loop.',
        suggestedPrompts: [
          'How can a company report ₹115 Cr profit but have negative cash flow?',
          'What happens to a high P/E stock when receivables fail to convert to cash?',
        ],
      };
    }

    if (hasMarginClue) {
      return {
        id: 'pg_margins',
        badge: 'Margin Compression Alert',
        category: 'forensics',
        title: 'Discount-Driven Volume Growth',
        hintText: 'Headline sales grew +28%, but operating margin collapsed from 16.5% to 5.8%. Notice how discounts can boost gross volume figures while cutting cash profits. Check whether valuation multiples still assume peak profit margins.',
        suggestedPrompts: [
          'Why do retail investors often overlook falling operating margins?',
          'How does margin compression affect Return on Capital Employed (ROCE)?',
        ],
      };
    }

    if (hasPeClue) {
      return {
        id: 'pg_pe',
        badge: 'Valuation Context',
        category: 'valuation',
        title: 'Contextual Multiples',
        hintText: `At 48.2x P/E versus the peer median of 22.5x, the market is pricing in uninterrupted 35%+ compounding. Remember: valuation is contextual. High multiples require accelerating cash earnings; any growth stumble triggers multiple contraction.`,
        suggestedPrompts: [
          'What is P/E multiple contraction and why does it cause sharp corrections?',
          'Can a company with falling margins sustain a 48x P/E multiple?',
        ],
      };
    }

    if (hasPromoterClue) {
      return {
        id: 'pg_promoter',
        badge: 'Insider Activity Signal',
        category: 'forensics',
        title: 'Actions vs. Public Statements',
        hintText: 'The founding promoter offloaded 4.2% stake near the all-time high. In forensic investing, verify whether promoter actions align with optimistic commentary in quarterly conference calls.',
        suggestedPrompts: [
          'What does insider promoter selling near all-time highs signal to analysts?',
          'How does promoter pledging and stake reduction affect retail investors?',
        ],
      };
    }

    if (concernCount >= 2) {
      return {
        id: 'pg_multiple_concerns',
        badge: 'Risk Pattern Detected',
        category: 'forensics',
        title: 'Compounding Structural Concerns',
        hintText: `You have classified ${concernCount} clues as concerns. Connect the dots: if margins compressed, cash flow turned negative, and debt surged, what margin of safety exists at the current valuation?`,
        suggestedPrompts: [
          'What is Margin of Safety and how does it protect an investor?',
          'How do financial forensic analysts synthesize multiple balance sheet red flags?',
        ],
      };
    }

    return {
      id: 'pg_general',
      badge: 'Investigation Tactics',
      category: 'forensics',
      title: 'Prioritize Sanity Over Vanity',
      hintText: `You have ${actionPointsRemaining} action tokens remaining. High-conviction analysts inspect Operating Cash Flow, Operating Margins, and Debt before looking at macro market hype.`,
      suggestedPrompts: [
        'Which clues are most critical for spotting forensic red flags?',
        'What is the difference between ROCE and ROE?',
      ],
    };
  }

  // 2. TRADING LAB PILLAR HINTS
  const {
    labTab = 'explorer',
    selectedStockSymbol = 'RELIANCE',
    selectedStockSector,
    strategyName = 'Custom Strategy',
    hasStopLoss,
    stopLossPercent,
    latestBacktestReturn,
    latestDrawdown,
    benchmarkReturn,
    winRate,
    profitFactor,
    experimentReturnDiff,
    experimentDrawdownDiff,
  } = context;

  if (labTab === 'explorer') {
    return {
      id: 'lab_explorer',
      badge: 'Market Structure Insight',
      category: 'mechanics',
      title: `${selectedStockSymbol} Trend Check`,
      hintText: `Observing ${selectedStockSymbol} (${selectedStockSector || 'NSE Blue-chip'}). Look at the price chart: notice whether the 20-day SMA is comfortably sloping above the 50-day SMA, or if they are repeatedly crisscrossing in a choppy consolidation band.`,
      suggestedPrompts: [
        `How do I tell if ${selectedStockSymbol} is currently in a trending or range-bound phase?`,
        'Why do moving average crossover strategies suffer in sideways markets?',
      ],
    };
  }

  if (labTab === 'tech_tools') {
    return {
      id: 'lab_tech_tools',
      badge: 'Practical Simulator Coach',
      category: 'mechanics',
      title: 'Technical Tools in Action',
      hintText: 'You are in the Tech Tools Simulator. Remember the core rule: never enter on a single indicator in isolation. For RSI, wait for the confirmation hook back above 30. For Moving Averages, enter on pullbacks with a trailing stop. For Bollinger Bands, look for the squeeze compression before the breakout!',
      suggestedPrompts: [
        'How does RSI bullish divergence work in real trading?',
        'What is the difference between standard SMA and Exponential Moving Average (EMA)?',
        'How do I trade a Bollinger Band volatility squeeze without getting head-faked?',
      ],
    };
  }

  if (labTab === 'builder') {
    if (!hasStopLoss) {
      return {
        id: 'lab_builder_no_stop',
        badge: 'Risk Management Alert',
        category: 'risk_control',
        title: 'Uncapped Downside Exposure',
        hintText: `Your strategy "${strategyName}" on ${selectedStockSymbol} has entry rules but no Stop Loss enabled. Because moving averages naturally lag price action, entering without a stop-loss exposes the portfolio to deep drawdowns during sharp selloffs.`,
        suggestedPrompts: [
          'Why do moving average strategies lag, and how does a stop loss protect capital?',
          'How should I pick between a 3% and 6% Stop Loss for swing trading?',
        ],
      };
    }

    return {
      id: 'lab_builder_with_stop',
      badge: 'Risk Parameter Design',
      category: 'risk_control',
      title: `Risk-Capped Trend Rules (${stopLossPercent}% Stop)`,
      hintText: `You have set a ${stopLossPercent}% Stop Loss. Notice the trade-off: a mechanical stop limits your loss per trade, but setting it too tight risks getting prematurely shaken out by normal daily volatility noise.`,
      suggestedPrompts: [
        'How do I balance stop-loss tightness versus avoiding false noise triggers?',
        'When should I add an RSI momentum filter to a moving average strategy?',
      ],
    };
  }

  if (labTab === 'results') {
    if (latestDrawdown && latestDrawdown > 12) {
      return {
        id: 'lab_results_drawdown',
        badge: 'Drawdown Diagnosis',
        category: 'tradeoff',
        title: `Drawdown Concentration (${latestDrawdown}%)`,
        hintText: `Your backtest produced a ${latestDrawdown}% peak-to-trough drawdown. Inspect the trade log: did losses cluster in consecutive attempts during a sideways consolidation? Try clicking "Modify & Compare" to test adding an RSI filter or a 4%–5% stop loss.`,
        suggestedPrompts: [
          `Why did this strategy experience a ${latestDrawdown}% drawdown?`,
          'How do I fix moving average whipsaws during sideways market regimes?',
        ],
      };
    }

    if (winRate && winRate < 45 && latestBacktestReturn && latestBacktestReturn > 0) {
      return {
        id: 'lab_results_winrate',
        badge: 'Asymmetric Expectancy',
        category: 'mechanics',
        title: `Positive Return on ${winRate}% Win Rate`,
        hintText: `You achieved a +${latestBacktestReturn}% return despite only winning ${winRate}% of trades (Profit Factor: ${profitFactor}x). In trend following, small frequent cuts are completely fine if your winners run 3x to 4x larger than your average loss.`,
        suggestedPrompts: [
          'How can a trading strategy be profitable with a win rate under 40%?',
          'What does Profit Factor tell me about trading expectancy?',
        ],
      };
    }

    return {
      id: 'lab_results_general',
      badge: 'Performance Breakdown',
      category: 'mechanics',
      title: 'Strategy vs. Buy & Hold Benchmark',
      hintText: `The strategy delivered ${latestBacktestReturn ?? 0}% return versus ${benchmarkReturn ?? 0}% for Buy & Hold. Notice the average holding duration in your trade history: trend-following aims to stay in cash during prolonged bear phases.`,
      suggestedPrompts: [
        'How do transaction costs and slippage affect active trend trading?',
        'What is the next parameter tweak I should test in my experiment?',
      ],
    };
  }

  if (labTab === 'comparison') {
    const returnDiffStr = experimentReturnDiff !== undefined
      ? (experimentReturnDiff > 0 ? `+${experimentReturnDiff}%` : `${experimentReturnDiff}%`)
      : '0%';
    const ddDiffStr = experimentDrawdownDiff !== undefined
      ? (experimentDrawdownDiff > 0 ? `improved by ${experimentDrawdownDiff}%` : `worsened by ${Math.abs(experimentDrawdownDiff)}%`)
      : '0%';

    return {
      id: 'lab_comparison',
      badge: 'Experiment Synthesis',
      category: 'tradeoff',
      title: 'Evaluating Strategy Trade-Offs',
      hintText: `Comparing your baseline and experiment: Return changed by ${returnDiffStr} and Drawdown ${ddDiffStr}. Notice that tightening risk controls often slightly reduces trade frequency while protecting portfolio equity from steep declines.`,
      suggestedPrompts: [
        'How should I choose between higher total return and lower maximum drawdown?',
        'How do I know if my strategy improvement is genuine or just curve-fitting?',
      ],
    };
  }

  // Calculators tab
  return {
    id: 'lab_calculators',
    badge: 'Capital Defense Principle',
    category: 'risk_control',
    title: 'The 1% Risk Rule',
    hintText: 'In disciplined quantitative trading, professional managers risk no more than 1% to 2% of total capital on any single setup. This ensures that even a rare string of 8 consecutive losses leaves 90%+ of capital intact.',
    suggestedPrompts: [
      'How does the 1% risk rule determine exact share quantity?',
      'Why is risk-to-reward ratio critical for long-term trading survival?',
    ],
  };
}
