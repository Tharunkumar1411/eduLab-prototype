/**
 * useCharacterController — the adapter boundary between lessons and the
 * character renderer.
 *
 * Lessons talk to this hook via semantic APIs (`emit`, `speak`, `react`).
 * The hook maintains the character state and dialogue; a React component
 * (currently <CharacterMentor>, later possibly <RiveCharacter>) reads
 * `state` / `message` and renders accordingly.
 *
 * Future Rive integration contract:
 *   - Implement `useRiveCharacterController()` returning the same shape.
 *   - Replace the CharacterMentor render with a Rive-backed component that
 *     reads the same `state` prop and plays the corresponding Rive state
 *     machine input.
 *   - No lesson code needs to change.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CharacterState } from './CharacterMentor.tsx';
import {
  LessonEvent,
  TRANSIENT_REACTION_MS,
  TRANSIENT_STATES,
  eventToCharacterState,
} from './lessonEvents.ts';

export interface CharacterControllerOptions {
  initialState?: CharacterState;
  initialMessage?: string;
  initialSubMessage?: string;
}

export interface EmitOptions {
  message?: string;
  subMessage?: string;
  durationMs?: number;
}

export interface CharacterController {
  state: CharacterState;
  message: string;
  subMessage?: string;
  emit: (event: LessonEvent, options?: EmitOptions) => void;
  speak: (message: string, subMessage?: string) => void;
  react: (state: CharacterState, options?: { durationMs?: number }) => void;
  setState: (state: CharacterState) => void;
  reset: () => void;
}

export function useCharacterController(options: CharacterControllerOptions = {}): CharacterController {
  const {
    initialState = 'idle',
    initialMessage = '',
    initialSubMessage,
  } = options;

  const [state, setStateInternal] = useState<CharacterState>(initialState);
  const [message, setMessage] = useState<string>(initialMessage);
  const [subMessage, setSubMessage] = useState<string | undefined>(initialSubMessage);

  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const scheduleReturnToIdle = useCallback(
    (durationMs: number) => {
      clearTimer();
      if (durationMs <= 0) return;
      timerRef.current = window.setTimeout(() => {
        setStateInternal('idle');
        timerRef.current = null;
      }, durationMs);
    },
    [clearTimer],
  );

  const setState = useCallback(
    (next: CharacterState) => {
      clearTimer();
      setStateInternal(next);
    },
    [clearTimer],
  );

  const react = useCallback(
    (next: CharacterState, reactOptions?: { durationMs?: number }) => {
      clearTimer();
      setStateInternal(next);
      if (TRANSIENT_STATES.has(next)) {
        scheduleReturnToIdle(reactOptions?.durationMs ?? TRANSIENT_REACTION_MS);
      }
    },
    [clearTimer, scheduleReturnToIdle],
  );

  const speak = useCallback((nextMessage: string, nextSub?: string) => {
    setMessage(nextMessage);
    setSubMessage(nextSub);
  }, []);

  const emit = useCallback(
    (event: LessonEvent, emitOptions?: EmitOptions) => {
      const mappedState = eventToCharacterState[event];
      if (emitOptions?.message !== undefined) {
        setMessage(emitOptions.message);
      }
      if (emitOptions?.subMessage !== undefined) {
        setSubMessage(emitOptions.subMessage);
      }
      react(mappedState, { durationMs: emitOptions?.durationMs });
    },
    [react],
  );

  const reset = useCallback(() => {
    clearTimer();
    setStateInternal('idle');
    setMessage('');
    setSubMessage(undefined);
  }, [clearTimer]);

  return useMemo<CharacterController>(
    () => ({
      state,
      message,
      subMessage,
      emit,
      speak,
      react,
      setState,
      reset,
    }),
    [state, message, subMessage, emit, speak, react, setState, reset],
  );
}
