/**
 * Condition evaluation engine.
 * Evaluates whether entry or exit condition is met on bar `i`.
 */

import { Condition, OHLCV } from './types.ts';
import { getIndicatorSeries } from './indicators.ts';

export interface PrecomputedSeriesMap {
  [key: string]: (number | null)[];
}

export function getConditionKey(indicator: { type: string; period?: number }): string {
  return `${indicator.type}_${indicator.period ?? 0}`;
}

/**
 * Precomputes all indicators needed by the strategy across the full historical dataset.
 */
export function precomputeIndicators(data: OHLCV[], conditions: Condition[]): PrecomputedSeriesMap {
  const map: PrecomputedSeriesMap = {};

  for (const c of conditions) {
    const leftKey = getConditionKey(c.leftIndicator);
    if (!map[leftKey]) {
      map[leftKey] = getIndicatorSeries(data, c.leftIndicator.type, c.leftIndicator.period ?? 14);
    }

    if (c.rightType === 'indicator' && c.rightIndicator) {
      const rightKey = getConditionKey(c.rightIndicator);
      if (!map[rightKey]) {
        map[rightKey] = getIndicatorSeries(data, c.rightIndicator.type, c.rightIndicator.period ?? 14);
      }
    }
  }

  return map;
}

/**
 * Evaluates whether a single condition holds true at bar index `i`.
 * Crucial: crossovers compare bar `i` to bar `i - 1`. No lookahead!
 */
export function evaluateCondition(
  condition: Condition,
  index: number,
  seriesMap: PrecomputedSeriesMap
): boolean {
  if (index <= 0) return false;

  const leftKey = getConditionKey(condition.leftIndicator);
  const leftSeries = seriesMap[leftKey];
  if (!leftSeries) return false;

  const currentLeft = leftSeries[index];
  const prevLeft = leftSeries[index - 1];

  if (currentLeft === null || prevLeft === null) return false;

  let currentRight: number | null = null;
  let prevRight: number | null = null;

  if (condition.rightType === 'indicator' && condition.rightIndicator) {
    const rightKey = getConditionKey(condition.rightIndicator);
    const rightSeries = seriesMap[rightKey];
    if (!rightSeries) return false;
    currentRight = rightSeries[index];
    prevRight = rightSeries[index - 1];
    if (currentRight === null || prevRight === null) return false;
  } else if (condition.rightType === 'value' && typeof condition.rightValue === 'number') {
    currentRight = condition.rightValue;
    prevRight = condition.rightValue;
  } else {
    return false;
  }

  switch (condition.operator) {
    case 'crosses_above':
      // Was below or equal at i-1, now strictly above at i
      return prevLeft <= prevRight && currentLeft > currentRight;

    case 'crosses_below':
      // Was above or equal at i-1, now strictly below at i
      return prevLeft >= prevRight && currentLeft < currentRight;

    case 'is_above':
      return currentLeft > currentRight;

    case 'is_below':
      return currentLeft < currentRight;

    default:
      return false;
  }
}

/**
 * Evaluates entry conditions (all must match, i.e., AND logic).
 */
export function evaluateEntryConditions(
  conditions: Condition[],
  index: number,
  seriesMap: PrecomputedSeriesMap
): boolean {
  if (conditions.length === 0) return false;
  return conditions.every(c => evaluateCondition(c, index, seriesMap));
}

/**
 * Evaluates exit conditions (any condition triggers exit, i.e., OR logic).
 */
export function evaluateExitConditions(
  conditions: Condition[],
  index: number,
  seriesMap: PrecomputedSeriesMap
): boolean {
  if (conditions.length === 0) return false;
  return conditions.some(c => evaluateCondition(c, index, seriesMap));
}
