/**
 * Semantic lesson events + default event→character-state mapping.
 *
 * The lesson layer only emits these abstract events — it never names a specific
 * character state. The character controller (and any future renderer, including
 * a Rive one) maps events to states. Swap the controller/renderer, keep lessons
 * untouched.
 */

import { CharacterState } from './CharacterMentor.tsx';

export type LessonEvent =
  | 'LESSON_STARTED'
  | 'STAGE_ADVANCED'
  | 'ANSWER_SUBMITTED'
  | 'ANSWER_CORRECT'
  | 'ANSWER_INCORRECT'
  | 'CALCULATION_REVEALED'
  | 'NAV_CHANGED'
  | 'MYTH_REVEALED'
  | 'LESSON_COMPLETED';

export const eventToCharacterState: Record<LessonEvent, CharacterState> = {
  LESSON_STARTED: 'talking',
  STAGE_ADVANCED: 'talking',
  ANSWER_SUBMITTED: 'thinking',
  ANSWER_CORRECT: 'happy',
  ANSWER_INCORRECT: 'confused',
  CALCULATION_REVEALED: 'surprised',
  NAV_CHANGED: 'thinking',
  MYTH_REVEALED: 'surprised',
  LESSON_COMPLETED: 'celebrating',
};

/**
 * Reactions that are transient — the character returns to `idle` after this
 * many ms unless a new event arrives first.
 */
export const TRANSIENT_REACTION_MS = 1800;

export const TRANSIENT_STATES: ReadonlySet<CharacterState> = new Set<CharacterState>([
  'surprised',
  'happy',
  'confused',
  'celebrating',
]);
