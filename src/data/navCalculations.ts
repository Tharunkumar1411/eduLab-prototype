/**
 * Deterministic NAV calculation helpers for the Mutual Funds NAV Machine lesson.
 *
 * All functions are pure, side-effect free, and defensive against zero / negative
 * inputs. The UI binds display values from these functions; animation timing never
 * feeds back into these calculations.
 */

export type NavChangeScenario = 'dip20' | 'flat' | 'up25' | 'up50';

export interface NavChangeOption {
  key: NavChangeScenario;
  label: string;
  marketLabel: string;
  multiplier: number;
}

export const NAV_CHANGE_OPTIONS: readonly NavChangeOption[] = [
  { key: 'dip20', label: 'NAV falls 20%', marketLabel: 'Market Dip', multiplier: 0.8 },
  { key: 'flat', label: 'NAV unchanged', marketLabel: 'Flat', multiplier: 1 },
  { key: 'up25', label: 'NAV rises 25%', marketLabel: 'Rally', multiplier: 1.25 },
  { key: 'up50', label: 'NAV rises 50%', marketLabel: 'Surge', multiplier: 1.5 },
];

export const INVESTMENT_AMOUNT_OPTIONS: readonly number[] = [1000, 2000, 5000, 10000];

export const BASE_NAV = 20;

export function calculateUnits(amount: number, nav: number): number {
  if (!Number.isFinite(amount) || !Number.isFinite(nav)) return 0;
  if (amount <= 0 || nav <= 0) return 0;
  return amount / nav;
}

export function applyNavChangeScenario(baseNav: number, scenario: NavChangeScenario): number {
  if (!Number.isFinite(baseNav) || baseNav <= 0) return 0;
  const match = NAV_CHANGE_OPTIONS.find((opt) => opt.key === scenario);
  if (!match) return baseNav;
  return Number((baseNav * match.multiplier).toFixed(4));
}

export function calculatePortfolioValue(units: number, currentNav: number): number {
  if (!Number.isFinite(units) || !Number.isFinite(currentNav)) return 0;
  if (units <= 0 || currentNav <= 0) return 0;
  return units * currentNav;
}

export function calculateProfitLoss(currentValue: number, invested: number): number {
  if (!Number.isFinite(currentValue) || !Number.isFinite(invested)) return 0;
  return currentValue - invested;
}

export function calculateReturnPercent(currentValue: number, invested: number): number {
  if (!Number.isFinite(currentValue) || !Number.isFinite(invested)) return 0;
  if (invested <= 0) return 0;
  return ((currentValue - invested) / invested) * 100;
}

export interface NavHoldingSnapshot {
  invested: number;
  units: number;
  initialNav: number;
  currentNav: number;
  currentValue: number;
  profitLoss: number;
  returnPercent: number;
}

export function buildHoldingSnapshot(invested: number, initialNav: number, currentNav: number): NavHoldingSnapshot {
  const units = calculateUnits(invested, initialNav);
  const currentValue = calculatePortfolioValue(units, currentNav);
  return {
    invested,
    units,
    initialNav,
    currentNav,
    currentValue,
    profitLoss: calculateProfitLoss(currentValue, invested),
    returnPercent: calculateReturnPercent(currentValue, invested),
  };
}

export interface MythbusterFund {
  label: string;
  nav: number;
  invested: number;
  units: number;
  gainedNav: number;
  endValue: number;
  profit: number;
}

export interface MythbusterComparison {
  underlyingGrowthPercent: number;
  fundA: MythbusterFund;
  fundB: MythbusterFund;
  equalOutcome: boolean;
}

export function buildMythbusterComparison(
  invested: number = 1000,
  underlyingGrowthPercent: number = 10,
): MythbusterComparison {
  const growth = 1 + underlyingGrowthPercent / 100;
  const fundA: MythbusterFund = (() => {
    const nav = 10;
    const units = calculateUnits(invested, nav);
    const gainedNav = Number((nav * growth).toFixed(4));
    const endValue = calculatePortfolioValue(units, gainedNav);
    return {
      label: 'Fund A',
      nav,
      invested,
      units,
      gainedNav,
      endValue,
      profit: endValue - invested,
    };
  })();
  const fundB: MythbusterFund = (() => {
    const nav = 100;
    const units = calculateUnits(invested, nav);
    const gainedNav = Number((nav * growth).toFixed(4));
    const endValue = calculatePortfolioValue(units, gainedNav);
    return {
      label: 'Fund B',
      nav,
      invested,
      units,
      gainedNav,
      endValue,
      profit: endValue - invested,
    };
  })();
  return {
    underlyingGrowthPercent,
    fundA,
    fundB,
    equalOutcome: Math.abs(fundA.endValue - fundB.endValue) < 0.01,
  };
}

export function formatRupee(value: number, maximumFractionDigits = 0): string {
  if (!Number.isFinite(value)) return '₹0';
  const rounded = Number(value.toFixed(maximumFractionDigits));
  return `₹${rounded.toLocaleString('en-IN', { maximumFractionDigits })}`;
}

export function formatUnits(units: number, fractionDigits = 2): string {
  if (!Number.isFinite(units) || units < 0) return '0 units';
  return `${units.toFixed(fractionDigits)} units`;
}

export function formatPercent(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value)) return '0%';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(fractionDigits)}%`;
}
