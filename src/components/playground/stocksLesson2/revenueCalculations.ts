/**
 * Deterministic helpers for the "Revenue, Profit & Business" lesson.
 *
 * Isolated as pure functions so they're easy to reason about and test later.
 * All values are fictional teaching figures. The simplified model does not
 * include taxes, interest, or other expenses — the result is OPERATING profit
 * in this simplified example, not net profit.
 */

export const PRICE_PER_ITEM = 50;
export const DEFAULT_ITEMS_SOLD = 20;
export const MIN_ITEMS_SOLD = 0;
export const MAX_ITEMS_SOLD = 100;

export interface OperatingCostLine {
  id: string;
  label: string;
  amount: number;
}

/**
 * Normal-day cost model. Used for stage 1 (Run the bakery) and the normal-day
 * scenario in stage 3. Kept intentionally small so the math stays obvious.
 */
export const NORMAL_DAY_COSTS: readonly OperatingCostLine[] = [
  { id: 'ingredients', label: 'Ingredients', amount: 300 },
  { id: 'staff', label: 'Staff', amount: 200 },
  { id: 'rent', label: 'Rent & utilities', amount: 150 },
];

/**
 * Promotion-day cost model. Overrides for the stage 3 scenario where the
 * bakery pushes harder and costs rise substantially.
 */
export const PROMOTION_DAY_COSTS: readonly OperatingCostLine[] = [
  { id: 'ingredients', label: 'Ingredients', amount: 800 },
  { id: 'staff', label: 'Staff', amount: 400 },
  { id: 'rent', label: 'Rent & utilities', amount: 150 },
  { id: 'promo', label: 'Promotion spend', amount: 400 },
];

export function clampItemsSold(value: number): number {
  if (!Number.isFinite(value)) return MIN_ITEMS_SOLD;
  const rounded = Math.round(value);
  if (rounded < MIN_ITEMS_SOLD) return MIN_ITEMS_SOLD;
  if (rounded > MAX_ITEMS_SOLD) return MAX_ITEMS_SOLD;
  return rounded;
}

export function calculateRevenue(sellingPricePerItem: number, itemsSold: number): number {
  if (!Number.isFinite(sellingPricePerItem) || !Number.isFinite(itemsSold)) return 0;
  if (sellingPricePerItem <= 0 || itemsSold <= 0) return 0;
  return sellingPricePerItem * itemsSold;
}

export function sumOperatingCosts(costs: readonly OperatingCostLine[]): number {
  return costs.reduce((total, line) => total + (Number.isFinite(line.amount) ? line.amount : 0), 0);
}

/**
 * Operating profit in this simplified example = revenue - modeled operating costs.
 * A genuine loss (negative result) is preserved — never silently clamped to 0.
 */
export function calculateOperatingProfit(revenue: number, operatingCosts: number): number {
  if (!Number.isFinite(revenue) || !Number.isFinite(operatingCosts)) return 0;
  return revenue - operatingCosts;
}

export function formatRupee(value: number): string {
  if (!Number.isFinite(value)) return '₹0';
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(Math.round(value));
  return `${sign}₹${abs.toLocaleString('en-IN')}`;
}

/**
 * Formats a signed money value with explicit + / - prefix. Used for the
 * operating profit figure when we want to make a loss unmistakable.
 */
export function formatSignedRupee(value: number): string {
  if (!Number.isFinite(value) || value === 0) return '₹0';
  const sign = value > 0 ? '+' : '-';
  const abs = Math.abs(Math.round(value));
  return `${sign}₹${abs.toLocaleString('en-IN')}`;
}

/* --------------------------------------------------------------------------
 * Stage 3 — Scenario comparison
 * -------------------------------------------------------------------------- */

export interface DayScenario {
  key: 'normal' | 'promotion';
  label: string;
  itemsSold: number;
  pricePerItem: number;
  revenue: number;
  costs: readonly OperatingCostLine[];
  operatingCosts: number;
  operatingProfit: number;
}

function buildScenario(
  key: DayScenario['key'],
  label: string,
  itemsSold: number,
  costs: readonly OperatingCostLine[],
): DayScenario {
  const revenue = calculateRevenue(PRICE_PER_ITEM, itemsSold);
  const operatingCosts = sumOperatingCosts(costs);
  return {
    key,
    label,
    itemsSold,
    pricePerItem: PRICE_PER_ITEM,
    revenue,
    costs,
    operatingCosts,
    operatingProfit: calculateOperatingProfit(revenue, operatingCosts),
  };
}

export const NORMAL_DAY_SCENARIO: DayScenario = buildScenario(
  'normal',
  'Normal day',
  20,
  NORMAL_DAY_COSTS,
);

export const PROMOTION_DAY_SCENARIO: DayScenario = buildScenario(
  'promotion',
  'Promotion day',
  40,
  PROMOTION_DAY_COSTS,
);

/* --------------------------------------------------------------------------
 * Lesson stage order
 * -------------------------------------------------------------------------- */

export type RevenueLessonStage = 'run' | 'costs' | 'compare' | 'check' | 'complete';

export const REVENUE_LESSON_STAGES: readonly RevenueLessonStage[] = [
  'run',
  'costs',
  'compare',
  'check',
  'complete',
];

export const REVENUE_STAGE_LABEL: Record<RevenueLessonStage, string> = {
  run: 'Run the bakery',
  costs: 'Where the money goes',
  compare: 'Make a decision',
  check: 'Check your understanding',
  complete: 'Lesson complete',
};

/* --------------------------------------------------------------------------
 * Quiz data
 * -------------------------------------------------------------------------- */

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export const COMPARE_OPTIONS: readonly AnswerOption[] = [
  {
    id: 'compare_yes_revenue',
    text: 'Yes, because revenue doubled.',
    isCorrect: false,
    explanation:
      'Revenue did double. But revenue alone does not tell you about profit — costs matter too.',
  },
  {
    id: 'compare_no_costs',
    text: `No, operating profit fell from ${formatRupee(NORMAL_DAY_SCENARIO.operatingProfit)} to ${formatRupee(PROMOTION_DAY_SCENARIO.operatingProfit)}.`,
    isCorrect: true,
    explanation:
      'Right. Selling twice as much also pushed costs up. More sales does not automatically mean more profit.',
  },
  {
    id: 'compare_no_revenue',
    text: 'The bakery made no revenue.',
    isCorrect: false,
    explanation:
      'The bakery earned ₹2,000 in revenue on promotion day. The question is what was left after costs.',
  },
];

export const CHECK_OPTIONS: readonly AnswerOption[] = [
  {
    id: 'check_2000',
    text: '₹2,000',
    isCorrect: true,
    explanation: 'Correct. Revenue (₹5,000) minus operating costs (₹3,000) = ₹2,000 operating profit.',
  },
  {
    id: 'check_3000',
    text: '₹3,000',
    isCorrect: false,
    explanation: '₹3,000 is the cost, not the operating profit. Operating profit = revenue − costs.',
  },
  {
    id: 'check_5000',
    text: '₹5,000',
    isCorrect: false,
    explanation: '₹5,000 is the revenue — the money earned. Operating profit subtracts the costs.',
  },
];

export function findOption<T extends AnswerOption>(options: readonly T[], id: string | null): T | undefined {
  if (!id) return undefined;
  return options.find((o) => o.id === id);
}
