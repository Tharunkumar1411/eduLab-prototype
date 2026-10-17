/**
 * NAV Machine lesson state machine (useReducer).
 *
 * Stages mirror the lesson spec:
 *   intro → chooseInvestment → calculateUnits → changeNav → observeValue
 *   → mythbuster → reflection → complete
 *
 * The reducer is a pure function over `(state, action)` — no side effects, no
 * character knowledge. The hook returns the state plus a `send(action)` that
 * also surfaces a semantic LessonEvent for the character controller to react
 * to. Keeping character reactions out of the reducer lets us swap renderers
 * later without touching this file.
 */

import { useCallback, useMemo, useReducer } from 'react';
import {
  BASE_NAV,
  INVESTMENT_AMOUNT_OPTIONS,
  NavChangeScenario,
  applyNavChangeScenario,
  calculateUnits,
} from '../../../data/navCalculations.ts';
import { LessonEvent } from '../../character/lessonEvents.ts';

export type LessonStage =
  | 'intro'
  | 'chooseInvestment'
  | 'calculateUnits'
  | 'changeNav'
  | 'observeValue'
  | 'mythbuster'
  | 'reflection'
  | 'complete';

export const STAGE_ORDER: readonly LessonStage[] = [
  'intro',
  'chooseInvestment',
  'calculateUnits',
  'changeNav',
  'observeValue',
  'mythbuster',
  'reflection',
  'complete',
];

export type MythbusterPrediction = 'A' | 'B' | 'equal';

export interface AnswerRecord {
  key: 'unitsQuiz' | 'observation' | 'mythbuster' | 'reflection';
  isCorrect: boolean;
}

export interface NavLessonState {
  stage: LessonStage;
  invested: number;
  initialNav: number;
  navScenario: NavChangeScenario | null;
  currentNav: number;
  mythbusterPrediction: MythbusterPrediction | null;
  mythbusterRevealed: boolean;
  unitsQuizAnswerId: string | null;
  observationAnswerId: string | null;
  reflectionAnswerId: string | null;
  answers: AnswerRecord[];
}

export type NavLessonAction =
  | { type: 'START' }
  | { type: 'SELECT_AMOUNT'; amount: number }
  | { type: 'CONFIRM_AMOUNT' }
  | { type: 'ANSWER_UNITS_QUIZ'; answerId: string; isCorrect: boolean }
  | { type: 'ADVANCE_TO_NAV_CHANGE' }
  | { type: 'SELECT_NAV_SCENARIO'; scenario: NavChangeScenario }
  | { type: 'ADVANCE_TO_OBSERVE' }
  | { type: 'ANSWER_OBSERVATION'; answerId: string; isCorrect: boolean }
  | { type: 'ADVANCE_TO_MYTH' }
  | { type: 'PREDICT_MYTH'; prediction: MythbusterPrediction }
  | { type: 'REVEAL_MYTH' }
  | { type: 'ADVANCE_TO_REFLECTION' }
  | { type: 'ANSWER_REFLECTION'; answerId: string; isCorrect: boolean }
  | { type: 'FINISH' }
  | { type: 'RESET' };

export const initialNavLessonState: NavLessonState = {
  stage: 'intro',
  invested: 2000,
  initialNav: BASE_NAV,
  navScenario: null,
  currentNav: BASE_NAV,
  mythbusterPrediction: null,
  mythbusterRevealed: false,
  unitsQuizAnswerId: null,
  observationAnswerId: null,
  reflectionAnswerId: null,
  answers: [],
};

function upsertAnswer(prev: AnswerRecord[], record: AnswerRecord): AnswerRecord[] {
  const next = prev.filter((a) => a.key !== record.key);
  next.push(record);
  return next;
}

export function navLessonReducer(state: NavLessonState, action: NavLessonAction): NavLessonState {
  switch (action.type) {
    case 'START':
      if (state.stage !== 'intro') return state;
      return { ...state, stage: 'chooseInvestment' };
    case 'SELECT_AMOUNT': {
      if (!INVESTMENT_AMOUNT_OPTIONS.includes(action.amount)) return state;
      return { ...state, invested: action.amount };
    }
    case 'CONFIRM_AMOUNT':
      if (state.stage !== 'chooseInvestment') return state;
      return { ...state, stage: 'calculateUnits' };
    case 'ANSWER_UNITS_QUIZ':
      if (state.stage !== 'calculateUnits') return state;
      return {
        ...state,
        unitsQuizAnswerId: action.answerId,
        answers: upsertAnswer(state.answers, { key: 'unitsQuiz', isCorrect: action.isCorrect }),
      };
    case 'ADVANCE_TO_NAV_CHANGE':
      if (state.stage !== 'calculateUnits') return state;
      if (!state.answers.find((a) => a.key === 'unitsQuiz' && a.isCorrect)) return state;
      return { ...state, stage: 'changeNav' };
    case 'SELECT_NAV_SCENARIO': {
      if (state.stage !== 'changeNav') return state;
      const nextNav = applyNavChangeScenario(state.initialNav, action.scenario);
      return {
        ...state,
        navScenario: action.scenario,
        currentNav: nextNav,
      };
    }
    case 'ADVANCE_TO_OBSERVE':
      if (state.stage !== 'changeNav' || state.navScenario === null) return state;
      return { ...state, stage: 'observeValue' };
    case 'ANSWER_OBSERVATION':
      if (state.stage !== 'observeValue') return state;
      return {
        ...state,
        observationAnswerId: action.answerId,
        answers: upsertAnswer(state.answers, { key: 'observation', isCorrect: action.isCorrect }),
      };
    case 'ADVANCE_TO_MYTH':
      if (state.stage !== 'observeValue') return state;
      if (!state.answers.find((a) => a.key === 'observation' && a.isCorrect)) return state;
      return { ...state, stage: 'mythbuster' };
    case 'PREDICT_MYTH':
      if (state.stage !== 'mythbuster') return state;
      return { ...state, mythbusterPrediction: action.prediction };
    case 'REVEAL_MYTH':
      if (state.stage !== 'mythbuster' || state.mythbusterPrediction === null) return state;
      return {
        ...state,
        mythbusterRevealed: true,
        answers: upsertAnswer(state.answers, {
          key: 'mythbuster',
          isCorrect: state.mythbusterPrediction === 'equal',
        }),
      };
    case 'ADVANCE_TO_REFLECTION':
      if (state.stage !== 'mythbuster' || !state.mythbusterRevealed) return state;
      return { ...state, stage: 'reflection' };
    case 'ANSWER_REFLECTION':
      if (state.stage !== 'reflection') return state;
      return {
        ...state,
        reflectionAnswerId: action.answerId,
        answers: upsertAnswer(state.answers, { key: 'reflection', isCorrect: action.isCorrect }),
      };
    case 'FINISH':
      if (state.stage !== 'reflection') return state;
      if (!state.answers.find((a) => a.key === 'reflection' && a.isCorrect)) return state;
      return { ...state, stage: 'complete' };
    case 'RESET':
      return initialNavLessonState;
    default:
      return state;
  }
}

/**
 * Maps an action onto the semantic event the UI should emit to the character
 * controller. Returns null when the action is purely internal (e.g. selecting
 * an investment amount before confirming).
 */
export function actionToLessonEvent(action: NavLessonAction, nextState: NavLessonState): LessonEvent | null {
  switch (action.type) {
    case 'START':
      return 'LESSON_STARTED';
    case 'CONFIRM_AMOUNT':
      return 'STAGE_ADVANCED';
    case 'ANSWER_UNITS_QUIZ':
      return action.isCorrect ? 'ANSWER_CORRECT' : 'ANSWER_INCORRECT';
    case 'ADVANCE_TO_NAV_CHANGE':
      return 'CALCULATION_REVEALED';
    case 'SELECT_NAV_SCENARIO':
      return 'NAV_CHANGED';
    case 'ADVANCE_TO_OBSERVE':
      return 'STAGE_ADVANCED';
    case 'ANSWER_OBSERVATION':
      return action.isCorrect ? 'ANSWER_CORRECT' : 'ANSWER_INCORRECT';
    case 'ADVANCE_TO_MYTH':
      return 'STAGE_ADVANCED';
    case 'REVEAL_MYTH':
      return nextState.answers.find((a) => a.key === 'mythbuster')?.isCorrect
        ? 'ANSWER_CORRECT'
        : 'MYTH_REVEALED';
    case 'ADVANCE_TO_REFLECTION':
      return 'STAGE_ADVANCED';
    case 'ANSWER_REFLECTION':
      return action.isCorrect ? 'ANSWER_CORRECT' : 'ANSWER_INCORRECT';
    case 'FINISH':
      return 'LESSON_COMPLETED';
    default:
      return null;
  }
}

export interface UseNavLessonMachineResult {
  state: NavLessonState;
  send: (action: NavLessonAction) => { nextState: NavLessonState; event: LessonEvent | null };
  stageIndex: number;
  stageTotal: number;
  units: number;
  correctAnswersCount: number;
}

export function useNavLessonMachine(): UseNavLessonMachineResult {
  const [state, dispatch] = useReducer(navLessonReducer, initialNavLessonState);

  const send = useCallback(
    (action: NavLessonAction) => {
      const nextState = navLessonReducer(state, action);
      dispatch(action);
      const event = actionToLessonEvent(action, nextState);
      return { nextState, event };
    },
    [state],
  );

  const stageIndex = STAGE_ORDER.indexOf(state.stage);
  const units = useMemo(() => calculateUnits(state.invested, state.initialNav), [state.invested, state.initialNav]);
  const correctAnswersCount = state.answers.filter((a) => a.isCorrect).length;

  return {
    state,
    send,
    stageIndex,
    stageTotal: STAGE_ORDER.length,
    units,
    correctAnswersCount,
  };
}
