/**
 * Narration data model (Phase 1).
 *
 * `Narration` is the ONLY contract between lesson code and the character /
 * narration layer. Lessons never touch the audio implementation, the character
 * renderer, or playback state — they just hand this object to CharacterNarrator.
 *
 * Future work (3D character, Rive, external TTS, lip-sync) can replace the
 * underlying renderer or audio adapter without any lesson code changing.
 */

import type { CharacterState } from '../CharacterMentor.tsx';

/** Expression intent — described in lesson terms, independent of renderer. */
export type CharacterExpression =
  | 'idle'
  | 'explaining'
  | 'thinking'
  | 'happy'
  | 'encouraging'
  | 'celebrating';

export interface Narration {
  /** Stable id used to dedupe playback and reset state when it changes. */
  id: string;
  /** Human-readable script. Always rendered — even without audio. */
  text: string;
  /** Optional short subtitle rendered below the main text. */
  subText?: string;
  /** Optional pre-generated audio clip URL. Falls back to text-only on failure. */
  audioUrl?: string;
  /** Visual expression intent (mapped to the renderer's own state system). */
  expression?: CharacterExpression;
  /**
   * When true, attempt to autoplay as soon as this narration mounts. The
   * browser may still block this; a visible Play button is always available.
   */
  autoplay?: boolean;
}

/**
 * Map the renderer-agnostic `CharacterExpression` to the current 2D mentor's
 * `CharacterState`. Changing the renderer means re-pointing this one function.
 */
export function expressionToMentorState(expr?: CharacterExpression): CharacterState {
  switch (expr) {
    case 'explaining':
      return 'talking';
    case 'thinking':
      return 'thinking';
    case 'happy':
      return 'happy';
    case 'encouraging':
      return 'happy';
    case 'celebrating':
      return 'celebrating';
    case 'idle':
    default:
      return 'idle';
  }
}
