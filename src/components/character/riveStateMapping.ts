/**
 * Runtime discovery helpers for Rive state machine inputs.
 *
 * We deliberately do NOT hard-code Rive input names here, because the actual
 * `.riv` asset may not use the exact words `idle`, `talking`, etc. These helpers
 * probe whatever state machine the file ships with, and map our conceptual
 * `CharacterState` onto the closest matching input the file happens to expose.
 *
 * Supported Rive input patterns, in order of preference:
 *
 *   1. **Boolean switches** — one input per state (e.g. `idle`, `isIdle`,
 *      `talking`, `thinking`). We set the current state's bool to true and the
 *      rest to false.
 *   2. **Number selector** — a single numeric input (`state`, `mood`, `mode`)
 *      that we set to a stable index per state.
 *   3. **Trigger** — one trigger per state, fired once on entry (`idleTrigger`,
 *      `fire_idle`, etc.).
 *
 * If none of these patterns exist, the mapping is a no-op and the Rive artboard
 * just plays its default animation. The lesson UI stays functional either way.
 */

import type { CharacterState } from './CharacterMentor.tsx';

export type RiveLike = {
  stateMachineNames?: string[];
  stateMachineInputs?: (name: string) => RiveStateMachineInputLike[] | null;
};

export type RiveStateMachineInputLike = {
  name: string;
  type: number;
  value?: unknown;
  fire?: () => void;
};

/**
 * Rive input type ids, cross-checked against @rive-app/canvas StateMachineInputType.
 * We duplicate them locally to avoid importing from the runtime when it may not
 * be loaded (and to keep the mapping file renderer-independent).
 */
export const RIVE_INPUT_TYPE = {
  Number: 56,
  Trigger: 58,
  Boolean: 59,
} as const;

/**
 * Candidate string variations we look for when matching a CharacterState to an
 * input name. All comparisons are lowercase and strip non-alphanumerics.
 */
const STATE_ALIASES: Record<CharacterState, string[]> = {
  idle: ['idle', 'rest', 'default', 'wait'],
  talking: ['talking', 'talk', 'speak', 'speaking', 'explain'],
  thinking: ['thinking', 'think', 'ponder', 'load', 'loading'],
  happy: ['happy', 'correct', 'right', 'yes', 'success', 'smile'],
  surprised: ['surprised', 'surprise', 'wow', 'reveal'],
  confused: ['confused', 'confuse', 'incorrect', 'wrong', 'no', 'error'],
  celebrating: ['celebrating', 'celebrate', 'celebration', 'win', 'complete', 'done'],
};

const CANONICAL_STATE_ORDER: CharacterState[] = [
  'idle',
  'talking',
  'thinking',
  'happy',
  'surprised',
  'confused',
  'celebrating',
];

const normalize = (raw: string): string => raw.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Pick a state machine to drive. Prefers the first machine the file ships
 * with. Returns null when the Rive instance has no machines yet.
 */
export function pickStateMachineName(rive: RiveLike | null): string | null {
  if (!rive) return null;
  const names = rive.stateMachineNames;
  if (!names || names.length === 0) return null;
  return names[0];
}

/**
 * Try to apply a CharacterState to the Rive state machine. Returns a description
 * of what was done (useful for devtools / telemetry) and never throws.
 */
export function applyStateToRive(
  rive: RiveLike | null,
  machineName: string | null,
  state: CharacterState,
): { strategy: 'boolean' | 'number' | 'trigger' | 'noop'; detail: string } {
  if (!rive || !machineName || typeof rive.stateMachineInputs !== 'function') {
    return { strategy: 'noop', detail: 'no rive / machine / inputs()' };
  }

  const inputs = rive.stateMachineInputs(machineName) ?? [];
  if (inputs.length === 0) {
    return { strategy: 'noop', detail: 'state machine has no inputs' };
  }

  const stateKey = normalize(state);
  const aliasKeys = STATE_ALIASES[state].map(normalize);
  const matchesState = (inputName: string): boolean => {
    const n = normalize(inputName);
    return n === stateKey || aliasKeys.includes(n) || aliasKeys.some((alias) => n.includes(alias));
  };

  // 1. Boolean switches — one bool per state.
  const booleans = inputs.filter((i) => i.type === RIVE_INPUT_TYPE.Boolean);
  if (booleans.length > 0) {
    let matched = false;
    booleans.forEach((input) => {
      const isMatch = matchesState(input.name);
      try {
        (input as unknown as { value: boolean }).value = isMatch;
      } catch {
        /* ignore – input may be read-only in some runtime builds */
      }
      if (isMatch) matched = true;
    });
    return {
      strategy: 'boolean',
      detail: matched
        ? `set bool "${state}" true, others false`
        : `no bool matched "${state}"; cleared all`,
    };
  }

  // 2. Single number selector.
  const numbers = inputs.filter((i) => i.type === RIVE_INPUT_TYPE.Number);
  const selector =
    numbers.find((n) =>
      ['state', 'mood', 'mode', 'reaction', 'phase'].includes(normalize(n.name)),
    ) ?? numbers[0];
  if (selector) {
    const index = CANONICAL_STATE_ORDER.indexOf(state);
    try {
      (selector as unknown as { value: number }).value = index >= 0 ? index : 0;
    } catch {
      /* ignore */
    }
    return {
      strategy: 'number',
      detail: `set "${selector.name}" to ${index}`,
    };
  }

  // 3. Fire a trigger input matching the state.
  const triggers = inputs.filter((i) => i.type === RIVE_INPUT_TYPE.Trigger);
  const trigger = triggers.find((t) => matchesState(t.name));
  if (trigger?.fire) {
    try {
      trigger.fire();
      return { strategy: 'trigger', detail: `fired "${trigger.name}"` };
    } catch {
      /* ignore */
    }
  }

  return { strategy: 'noop', detail: 'no compatible inputs for state' };
}
