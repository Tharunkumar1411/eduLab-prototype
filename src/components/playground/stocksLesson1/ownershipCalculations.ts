/**
 * Pure ownership-math helpers for the "What is a Stock?" lesson.
 * Isolated here so they stay simple to reason about and unit-test later.
 */

export const SUNNY_BAKERY_TOTAL_SHARES = 100;
export const DEFAULT_SELECTED_SHARES = 10;

export function clampShareCount(value: number, total: number = SUNNY_BAKERY_TOTAL_SHARES): number {
  if (!Number.isFinite(value)) return 1;
  const rounded = Math.round(value);
  if (rounded < 1) return 1;
  if (rounded > total) return total;
  return rounded;
}

export function calculateOwnershipPercentage(
  selected: number,
  total: number = SUNNY_BAKERY_TOTAL_SHARES,
): number {
  if (!Number.isFinite(selected) || !Number.isFinite(total)) return 0;
  if (total <= 0 || selected <= 0) return 0;
  return (selected / total) * 100;
}

export function formatOwnershipPercent(selected: number, total: number = SUNNY_BAKERY_TOTAL_SHARES): string {
  const pct = calculateOwnershipPercentage(selected, total);
  // Keep display tidy: integers when it works out to a whole number.
  return Number.isInteger(pct) ? `${pct}%` : `${pct.toFixed(1)}%`;
}

export type LessonStage = 'meet' | 'own' | 'change' | 'check' | 'complete';

export const LESSON_STAGE_ORDER: readonly LessonStage[] = [
  'meet',
  'own',
  'change',
  'check',
  'complete',
];

/**
 * The 4 learner-facing stages (meet, own, change, check) plus a `complete`
 * terminal screen. Use these labels in the UI progress indicator.
 */
export const LESSON_STAGE_LABEL: Record<LessonStage, string> = {
  meet: 'Meet the business',
  own: 'Own a piece',
  change: 'The business changes',
  check: 'Check your understanding',
  complete: 'Lesson complete',
};

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export const STAGE_3_OPTIONS: readonly AnswerOption[] = [
  {
    id: 's3_rise',
    text: 'It could increase.',
    isCorrect: true,
    explanation:
      'When more people expect a business to do well, its shares may become more attractive and the market price can rise. It is not guaranteed — prices can also fall.',
  },
  {
    id: 's3_flat',
    text: 'It must stay the same.',
    isCorrect: false,
    explanation:
      'Share prices change constantly based on what people are willing to pay. They rarely stay fixed.',
  },
  {
    id: 's3_zero',
    text: 'Its shares automatically become worthless.',
    isCorrect: false,
    explanation:
      'Shares do not become worthless just because a business becomes more popular. Price moves with what people are willing to pay.',
  },
];

export const STAGE_4_OPTIONS: readonly AnswerOption[] = [
  {
    id: 's4_stake',
    text: 'I own a 10% stake in the company in this simplified example.',
    isCorrect: true,
    explanation:
      'Correct. 10 of 100 equal shares means 10% ownership in this simplified example.',
  },
  {
    id: 's4_loan',
    text: 'The company must repay me like a bank loan.',
    isCorrect: false,
    explanation:
      'A share is ownership, not a loan. The company has no obligation to repay you a fixed amount.',
  },
  {
    id: 's4_div',
    text: 'I automatically receive 10% of its cash profits every month.',
    isCorrect: false,
    explanation:
      'Dividends are not guaranteed and do not automatically equal a fixed share of profits. Many companies pay no dividend at all.',
  },
];

export function findOption<T extends AnswerOption>(options: readonly T[], id: string | null): T | undefined {
  if (!id) return undefined;
  return options.find((o) => o.id === id);
}
