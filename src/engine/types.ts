/**
 * Core type definitions for FinCraft Trading Engine
 */

export interface OHLCV {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type IndicatorType = 'SMA' | 'EMA' | 'RSI' | 'PRICE';

export interface IndicatorConfig {
  type: IndicatorType;
  period?: number;
}

export type Operator = 
  | 'crosses_above' 
  | 'crosses_below' 
  | 'is_above' 
  | 'is_below';

export interface Condition {
  id: string;
  leftIndicator: IndicatorConfig;
  operator: Operator;
  rightType: 'indicator' | 'value';
  rightIndicator?: IndicatorConfig;
  rightValue?: number;
}

export interface RiskSettings {
  stopLossPercent?: number | null; // e.g. 5 for 5%
  takeProfitPercent?: number | null; // e.g. 15 for 15%
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  entryConditions: Condition[];
  exitConditions: Condition[];
  risk: RiskSettings;
}

export interface Trade {
  id: string;
  entryDate: string;
  entryPrice: number;
  exitDate: string;
  exitPrice: number;
  shares: number;
  pnl: number;
  pnlPercent: number;
  exitReason: 'condition' | 'stop_loss' | 'take_profit' | 'end_of_data';
  holdBars: number;
}

export interface EquityPoint {
  date: string;
  equity: number;
  benchmarkEquity: number;
  drawdownPercent: number;
  inTrade: boolean;
  price: number;
}

export interface BacktestResult {
  strategy: Strategy;
  stockSymbol: string;
  initialCapital: number;
  finalCapital: number;
  totalReturnPercent: number;
  benchmarkReturnPercent: number;
  cagrPercent: number;
  maxDrawdownPercent: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRatePercent: number;
  profitFactor: number;
  averageTradeReturnPercent: number;
  trades: Trade[];
  equityCurve: EquityPoint[];
}

export interface StockInfo {
  symbol: string;
  name: string;
  sector: string;
  description: string;
  marketCapCr: number; // in ₹ Lakh Crores or Crores
  currentPrice: number;
  changePercent: number;
  peRatio: number;
  industryPe: number;
  eps: number;
  roe: number;
  high52W: number;
  low52W: number;
  history: OHLCV[];
}
