/**
 * Indicator calculation algorithms for Trading Lab.
 * Strictly sequential to prevent any look-ahead bias.
 */

import { OHLCV } from './types.ts';

/**
 * Calculates Simple Moving Average (SMA) series.
 * Returns array of same length as data, with null for indices < period - 1.
 */
export function calculateSMA(data: OHLCV[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(data.length).fill(null);
  if (data.length < period || period <= 0) return result;

  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i].close;
  }
  result[period - 1] = sum / period;

  for (let i = period; i < data.length; i++) {
    sum += data[i].close - data[i - period].close;
    result[i] = sum / period;
  }

  return result;
}

/**
 * Calculates Exponential Moving Average (EMA) series.
 * Returns array of same length as data, with null for indices < period - 1.
 */
export function calculateEMA(data: OHLCV[], period: number): (number | null)[] {
  const result: (number | null)[] = new Array(data.length).fill(null);
  if (data.length < period || period <= 0) return result;

  // First EMA starts with the SMA of the initial period
  let initialSum = 0;
  for (let i = 0; i < period; i++) {
    initialSum += data[i].close;
  }
  let prevEMA = initialSum / period;
  result[period - 1] = prevEMA;

  const multiplier = 2 / (period + 1);

  for (let i = period; i < data.length; i++) {
    const currentClose = data[i].close;
    const currentEMA = (currentClose - prevEMA) * multiplier + prevEMA;
    result[i] = currentEMA;
    prevEMA = currentEMA;
  }

  return result;
}

/**
 * Calculates Relative Strength Index (RSI) using Wilder's smoothed average.
 * Standard 0-100 oscillator.
 */
export function calculateRSI(data: OHLCV[], period: number = 14): (number | null)[] {
  const result: (number | null)[] = new Array(data.length).fill(null);
  if (data.length <= period || period <= 0) return result;

  let gains = 0;
  let losses = 0;

  // First period change calculation
  for (let i = 1; i <= period; i++) {
    const change = data[i].close - data[i - 1].close;
    if (change >= 0) {
      gains += change;
    } else {
      losses += Math.abs(change);
    }
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  result[period] = 100 - (100 / (1 + rs));

  // Subsequent values using Wilder's smoothing
  for (let i = period + 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    const currentGain = change > 0 ? change : 0;
    const currentLoss = change < 0 ? Math.abs(change) : 0;

    avgGain = (avgGain * (period - 1) + currentGain) / period;
    avgLoss = (avgLoss * (period - 1) + currentLoss) / period;

    if (avgLoss === 0) {
      result[i] = 100;
    } else {
      const currentRS = avgGain / avgLoss;
      result[i] = 100 - (100 / (1 + currentRS));
    }
  }

  return result;
}


export interface BollingerBandsResult {
  upper: (number | null)[];
  middle: (number | null)[];
  lower: (number | null)[];
  bandwidth: (number | null)[];
}

/**
 * Calculates Bollinger Bands (Upper, Middle, Lower, Bandwidth).
 */
export function calculateBollingerBands(
  data: OHLCV[],
  period: number = 20,
  stdDevMultiplier: number = 2
): BollingerBandsResult {
  const middle = calculateSMA(data, period);
  const upper: (number | null)[] = new Array(data.length).fill(null);
  const lower: (number | null)[] = new Array(data.length).fill(null);
  const bandwidth: (number | null)[] = new Array(data.length).fill(null);

  for (let i = period - 1; i < data.length; i++) {
    const ma = middle[i];
    if (ma !== null) {
      let varianceSum = 0;
      for (let j = i - period + 1; j <= i; j++) {
        varianceSum += Math.pow(data[j].close - ma, 2);
      }
      const stdDev = Math.sqrt(varianceSum / period);
      upper[i] = Number((ma + stdDev * stdDevMultiplier).toFixed(2));
      lower[i] = Number((ma - stdDev * stdDevMultiplier).toFixed(2));
      bandwidth[i] = Number((((upper[i]! - lower[i]!) / ma) * 100).toFixed(2));
    }
  }

  return { upper, middle, lower, bandwidth };
}

/**
 * Evaluates indicator value at a specific bar index.
 */
export function getIndicatorSeries(data: OHLCV[], type: string, period: number = 14): (number | null)[] {
  switch (type) {
    case 'SMA':
      return calculateSMA(data, period);
    case 'EMA':
      return calculateEMA(data, period);
    case 'RSI':
      return calculateRSI(data, period);
    case 'PRICE':
      return data.map(d => d.close);
    default:
      return new Array(data.length).fill(null);
  }
}

