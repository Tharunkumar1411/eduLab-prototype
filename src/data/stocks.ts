/**
 * Deterministic Historical OHLCV & Metadata for Indian Blue-chip Stocks.
 * Provides consistent, reproducible data across 250 daily trading sessions.
 */

import { OHLCV, StockInfo } from '../engine/types.ts';

// Deterministic pseudo-random generator with fixed seed
function createSeededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateStockHistory(
  basePrice: number,
  trendType: 'bullish' | 'cyclical' | 'breakout' | 'consolidation',
  seed: number,
  numBars: number = 250
): OHLCV[] {
  const rand = createSeededRandom(seed);
  const data: OHLCV[] = [];

  const startDate = new Date('2025-04-01');
  let currentPrice = basePrice;

  for (let i = 0; i < numBars; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + Math.floor((i * 7) / 5)); // simulate business days
    const dateStr = currentDate.toISOString().split('T')[0];

    // Determine directional drift based on cycle
    let drift = 0;
    if (trendType === 'bullish') {
      drift = 0.0008 + (Math.sin(i / 18) * 0.002);
    } else if (trendType === 'cyclical') {
      drift = Math.sin(i / 15) * 0.005;
    } else if (trendType === 'breakout') {
      drift = i < 120 ? Math.sin(i / 10) * 0.001 : 0.0025 + Math.sin(i / 20) * 0.002;
    } else {
      drift = Math.sin(i / 12) * 0.003;
    }

    const dailyVolatility = 0.014;
    const shock = (rand() - 0.49) * dailyVolatility;
    const pctChange = drift + shock;

    const open = currentPrice;
    const close = Math.max(10, open * (1 + pctChange));
    const high = Math.max(open, close) * (1 + rand() * 0.009);
    const low = Math.min(open, close) * (1 - rand() * 0.009);
    const volume = Math.floor(800000 + rand() * 3500000);

    data.push({
      date: dateStr,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    currentPrice = close;
  }

  return data;
}

export const INDIAN_STOCKS: StockInfo[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Oil, Gas & Consumer Retail',
    description: "India's highest market-cap conglomerate with leadership in refining, Jio telecom, and organized retail.",
    marketCapCr: 1985000,
    currentPrice: 2980.50,
    changePercent: 1.42,
    peRatio: 26.4,
    industryPe: 23.8,
    eps: 112.8,
    roe: 11.2,
    high52W: 3217.90,
    low52W: 2580.00,
    history: generateStockHistory(2650, 'bullish', 101, 240),
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    sector: 'Information Technology',
    description: "Global flagship IT services provider of Tata Group, delivering industry-leading operating margins and dividend yields.",
    marketCapCr: 1492000,
    currentPrice: 4125.75,
    changePercent: -0.65,
    peRatio: 30.5,
    industryPe: 28.2,
    eps: 135.2,
    roe: 48.6,
    high52W: 4585.00,
    low52W: 3680.00,
    history: generateStockHistory(3850, 'cyclical', 202, 240),
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Financial Services / Banking',
    description: "India's largest private bank by assets, serving over 90 million retail and corporate customers nationwide.",
    marketCapCr: 1245000,
    currentPrice: 1682.30,
    changePercent: 0.88,
    peRatio: 18.2,
    industryPe: 19.5,
    eps: 92.4,
    roe: 16.8,
    high52W: 1794.00,
    low52W: 1425.00,
    history: generateStockHistory(1520, 'breakout', 303, 240),
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    sector: 'Information Technology',
    description: "Premier enterprise digital transformation partner with vast exposure to North American and European cloud services.",
    marketCapCr: 765000,
    currentPrice: 1845.20,
    changePercent: 1.15,
    peRatio: 27.6,
    industryPe: 28.2,
    eps: 66.8,
    roe: 31.4,
    high52W: 1995.00,
    low52W: 1410.00,
    history: generateStockHistory(1580, 'bullish', 404, 240),
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd.',
    sector: 'FMCG & Conglomerate',
    description: "Diversified giant across packaged food, agri-business, paperboards, hotels, and traditional FMCG categories.",
    marketCapCr: 612000,
    currentPrice: 488.60,
    changePercent: 0.32,
    peRatio: 28.1,
    industryPe: 36.5,
    eps: 17.4,
    roe: 28.9,
    high52W: 528.00,
    low52W: 399.00,
    history: generateStockHistory(430, 'consolidation', 505, 240),
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    sector: 'Automotive & Commercial Vehicles',
    description: "Pioneering Indian automaker leading EV passenger cars and commercial utility transport across domestic and global markets.",
    marketCapCr: 345000,
    currentPrice: 945.50,
    changePercent: 1.25,
    peRatio: 16.8,
    industryPe: 22.4,
    eps: 56.2,
    roe: 19.5,
    high52W: 1065.00,
    low52W: 685.00,
    history: generateStockHistory(780, 'cyclical', 606, 240),
  },
];

// Re-sync current price with latest closed bar
INDIAN_STOCKS.forEach(s => {
  if (s.history.length > 0) {
    const last = s.history[s.history.length - 1];
    const prev = s.history[s.history.length - 2];
    s.currentPrice = last.close;
    s.changePercent = Number((((last.close - prev.close) / prev.close) * 100).toFixed(2));
  }
});
