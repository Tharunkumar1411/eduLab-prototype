import { GoogleGenAI } from '@google/genai';

// Initialize GoogleGenAI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContextPayload {
  currentPillar?: 'playground' | 'tools';
  activeCaseId?: string;
  activeCaseTitle?: string;
  activeCaseTicker?: string;
  caseCompany?: string;
  caseStep?: 'scenario' | 'investigate' | 'decision' | 'debrief';
  unlockedClueTitles?: string[];
  unlockedClueCount?: number;
  totalCluesCount?: number;
  actionPointsRemaining?: number;
  concernCount?: number;
  supportCount?: number;
  neutralCount?: number;
  selectedDecisionTitle?: string;
  reasoningScore?: number;
  selectedStockSymbol?: string;
  selectedStockName?: string;
  selectedStockSector?: string;
  labTab?: string;
  strategyName?: string;
  entryConditionsCount?: number;
  exitConditionsCount?: number;
  hasStopLoss?: boolean;
  stopLossPercent?: number | null;
  hasTakeProfit?: boolean;
  takeProfitPercent?: number | null;
  latestBacktestReturn?: number;
  latestDrawdown?: number;
  benchmarkReturn?: number;
  winRate?: number;
  totalTrades?: number;
  profitFactor?: number;
  hasExperimentRun?: boolean;
  experimentReturnDiff?: number;
  experimentDrawdownDiff?: number;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  context?: ChatContextPayload;
  model?: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, context, model: requestedModel } = req.body as ChatRequestBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const model = requestedModel === 'gemini-3.1-flash-lite' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';

    let contextSnippet = '';
    if (context) {
      if (context.currentPillar === 'playground') {
        const clueList = context.unlockedClueTitles && context.unlockedClueTitles.length > 0
          ? `Unlocked forensic clues: ${context.unlockedClueTitles.join(', ')}.`
          : 'No clues unlocked yet.';
        const classificationBreakdown = `Classified clues: ${context.concernCount || 0} concerns, ${context.supportCount || 0} supporting, ${context.neutralCount || 0} neutral.`;
        
        contextSnippet = `User is in the PLAYGROUND investigating the financial case "${context.activeCaseTitle || 'Market Case'}" (${context.caseCompany || ''}, Ticker: ${context.activeCaseTicker || 'N/A'}).
Current phase: ${context.caseStep || 'investigation'}.
Progress: ${context.unlockedClueCount || 0}/${context.totalCluesCount || 0} clues examined, ${context.actionPointsRemaining ?? 'N/A'} tokens remaining.
${clueList}
${classificationBreakdown}
${context.selectedDecisionTitle ? `Selected thesis: "${context.selectedDecisionTitle}" (Score: ${context.reasoningScore ?? 'N/A'}/100).` : ''}
Guide their analytical reasoning and forensic connection between revenue, operating margins, cash flow from operations, and valuation multiples. DO NOT simply tell them the answer or spoil the case; guide their critical inquiry with non-prescriptive questions.`;
      } else if (context.currentPillar === 'tools') {
        contextSnippet = `User is in the TRADING LAB testing strategies on ${context.selectedStockSymbol || 'Indian stocks'} (${context.selectedStockName || ''}, Sector: ${context.selectedStockSector || 'N/A'}).
Current lab view: ${context.labTab || 'explorer'}.
${
  context.strategyName
    ? `Strategy: "${context.strategyName}" (${context.entryConditionsCount || 1} entry rule(s), ${context.exitConditionsCount || 1} exit rule(s)).`
    : ''
}
Risk controls: Stop loss: ${context.hasStopLoss ? `${context.stopLossPercent}%` : 'Disabled'}, Take profit: ${context.hasTakeProfit ? `${context.takeProfitPercent}%` : 'Disabled'}.
${
  context.latestBacktestReturn !== undefined
    ? `Latest backtest performance: Total Return: ${context.latestBacktestReturn}% (Benchmark: ${context.benchmarkReturn ?? 0}%), Max Drawdown: ${context.latestDrawdown}%, Win Rate: ${context.winRate}%, Trades: ${context.totalTrades}, Profit Factor: ${context.profitFactor}x.`
    : ''
}
Help them understand quantitative mechanics, moving averages, RSI momentum, and how risk management protects capital without giving financial advice.`;
      }
    }

    const systemInstruction = `You are Inspector Fin, the sharp, friendly, and analytical financial detective and quantitative trading mentor at Edulab (an interactive Indian stock market learning platform).
Your target audience is 18–25-year-old Indian students and early-career retail investors learning investing by actually doing it.

Core Guidelines:
1. Explain financial concepts in clear, direct English with relatable Indian market examples (e.g. ₹ figures, Nifty 50, working capital cycles, FMCG vs IT models).
2. Teach contextual valuation and financial forensics: Emphasize that metrics like P/E, RSI, or Revenue Growth are not magical standalone numbers. Always look at Operating Cash Flow, margins, and capital efficiency (ROCE/ROE).
3. NON-PRESCRIPTIVE & STRICT REGULATORY BOUNDARY (SEBI): You are an educational simulator mentor. NEVER provide personalized stock tips, buy/sell calls, or price predictions (e.g. never say "Buy Reliance" or "Sell this stock"). Provide proactive, non-prescriptive hints that guide curiosity and critical thinking (e.g., "Notice how...", "Have you checked whether...", "Consider the trade-off between...") rather than telling the user what to do.
4. Keep answers concise, clear, and structured (use brief paragraphs, bullet points, or mini-examples).
5. ${contextSnippet || 'Be ready to assist with case forensic clues or strategy backtest mechanics.'}
`;

    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I analyzed the scenario, but could not produce a response. Please try rephrasing your question!';

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to process question. Please try again.',
    });
  }
}
