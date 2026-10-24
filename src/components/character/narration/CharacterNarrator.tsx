/**
 * CharacterNarrator — audio-first narration surface.
 *
 * Shows the character prominently with no transcript — the narration is heard,
 * not read. The character enters a "talking" expression + animated sound rings
 * while audio plays, falls back to its scripted expression when idle/paused.
 *
 * The lesson engine is unchanged: it still hands over a `Narration` and reads
 * nothing but playback status.
 */

import React, { useId } from 'react';
import { AlertTriangle, Loader2, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { CharacterMentor } from '../CharacterMentor.tsx';
import { expressionToMentorState, type Narration } from './types.ts';
import { useNarration } from './useNarration.ts';

interface CharacterNarratorProps {
  narration: Narration | null;
  /** `compact` shrinks the avatar for tight headers; default is roomier. */
  variant?: 'default' | 'compact';
  className?: string;
}

export const CharacterNarrator: React.FC<CharacterNarratorProps> = ({
  narration,
  variant = 'default',
  className = '',
}) => {
  const controller = useNarration(narration);
  const liveRegionId = useId();

  if (!narration) return null;

  const isPlaying = controller.status === 'playing';
  // Force the "talking" look while audio plays — otherwise honour the scripted
  // expression (explaining / thinking / encouraging / celebrating).
  const mentorState = isPlaying
    ? expressionToMentorState('explaining')
    : expressionToMentorState(narration.expression);

  const statusLabel = (() => {
    switch (controller.status) {
      case 'loading':
        return 'Loading narration';
      case 'playing':
        return 'Narrator is speaking';
      case 'paused':
        return 'Narration paused';
      case 'ended':
        return 'Narration finished';
      case 'error':
        return 'Audio unavailable';
      case 'no-audio':
        return 'No audio for this moment';
      case 'blocked-autoplay':
        return 'Tap play to hear the narrator';
      default:
        return controller.canPlay ? 'Tap play to hear the narrator' : 'Idle';
    }
  })();

  const isCompact = variant === 'compact';
  const avatarSize: 'md' | 'lg' = isCompact ? 'md' : 'lg';

  return (
    <section
      role="region"
      aria-label="Character narrator"
      className={`rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 ${
        isCompact ? 'p-3' : 'p-4 sm:p-5'
      } ${className}`}
    >
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Avatar + animated sound rings */}
        <div className="relative shrink-0 flex items-center justify-center">
          <AnimatedRings active={isPlaying} />
          <CharacterMentor state={mentorState} size={avatarSize} />
          <SpeakingBadge visible={isPlaying} />
        </div>

        {/* Controls column */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <PlaybackHeader status={controller.status} />
          <div className="flex items-center gap-2">
            <PlaybackButton controller={controller} />
            <ReplayButton controller={controller} />
            <ProgressBar
              progress={controller.progress}
              elapsed={controller.elapsed}
              duration={controller.duration}
              status={controller.status}
            />
          </div>
          {controller.status === 'error' && (
            <p className="text-[11px] text-slate-400 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500" />
              <span>Audio unavailable right now. Continue when you’re ready.</span>
            </p>
          )}
          {controller.status === 'blocked-autoplay' && (
            <p className="text-[11px] text-amber-200/80">
              Autoplay was blocked by the browser. Press play to listen.
            </p>
          )}
        </div>
      </div>

      {/* Screen-reader live region — the only text in the UI by design. */}
      <span id={liveRegionId} className="sr-only" aria-live="polite">
        {statusLabel}
      </span>
    </section>
  );
};

// ===========================================================================
// Visual accents
// ===========================================================================

/** Soft, pulsing concentric rings around the avatar while audio plays. */
const AnimatedRings: React.FC<{ active: boolean }> = ({ active }) => (
  <>
    <style>{`
      @keyframes msnarr-ring {
        0%   { transform: scale(0.9); opacity: 0.6; }
        70%  { opacity: 0.08; }
        100% { transform: scale(1.9); opacity: 0; }
      }
      .msnarr-ring {
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        border: 2px solid rgb(45 212 191 / 0.55);
        pointer-events: none;
      }
      .msnarr-ring-anim { animation: msnarr-ring 2.4s ease-out infinite; }
      .msnarr-ring-anim.msnarr-ring--2 { animation-delay: 0.8s; }
      .msnarr-ring-anim.msnarr-ring--3 { animation-delay: 1.6s; }
      @media (prefers-reduced-motion: reduce) {
        .msnarr-ring-anim { animation: none !important; opacity: 0.25; }
      }
    `}</style>
    {active && (
      <>
        <span className="msnarr-ring msnarr-ring-anim" aria-hidden />
        <span className="msnarr-ring msnarr-ring-anim msnarr-ring--2" aria-hidden />
        <span className="msnarr-ring msnarr-ring-anim msnarr-ring--3" aria-hidden />
      </>
    )}
  </>
);

/** Tiny animated bars shown next to the avatar while audio plays. */
const SpeakingBadge: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div
      aria-hidden
      className="absolute -right-1 -bottom-1 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg border border-teal-200"
    >
      <WaveBars />
      <span>Speaking</span>
    </div>
  );
};

const WaveBars: React.FC = () => (
  <>
    <style>{`
      @keyframes msnarr-bar {
        0%, 100% { transform: scaleY(0.35); }
        50%      { transform: scaleY(1); }
      }
      .msnarr-bar {
        display: inline-block;
        width: 2px;
        height: 10px;
        background: currentColor;
        transform-origin: center;
        border-radius: 2px;
      }
      .msnarr-bar--a { animation: msnarr-bar 0.9s ease-in-out infinite; }
      .msnarr-bar--b { animation: msnarr-bar 0.9s ease-in-out infinite 0.15s; }
      .msnarr-bar--c { animation: msnarr-bar 0.9s ease-in-out infinite 0.3s; }
      @media (prefers-reduced-motion: reduce) {
        .msnarr-bar--a, .msnarr-bar--b, .msnarr-bar--c { animation: none; transform: scaleY(0.6); }
      }
    `}</style>
    <span className="inline-flex items-end gap-[2px]">
      <span className="msnarr-bar msnarr-bar--a" />
      <span className="msnarr-bar msnarr-bar--b" />
      <span className="msnarr-bar msnarr-bar--c" />
    </span>
  </>
);

const PlaybackHeader: React.FC<{ status: ReturnType<typeof useNarration>['status'] }> = ({
  status,
}) => {
  const label = (() => {
    switch (status) {
      case 'playing':
        return 'Narrator is explaining';
      case 'paused':
        return 'Paused';
      case 'loading':
        return 'Loading audio';
      case 'ended':
        return 'Finished — press replay to listen again';
      case 'error':
        return 'Audio unavailable';
      case 'no-audio':
        return 'Transcript only';
      case 'blocked-autoplay':
        return 'Ready to play';
      default:
        return 'Press play to listen';
    }
  })();
  const Icon =
    status === 'playing'
      ? Volume2
      : status === 'error' || status === 'no-audio'
        ? VolumeX
        : Volume2;
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300">
      <Icon
        className={`w-3.5 h-3.5 ${status === 'playing' ? 'text-teal-300' : 'text-slate-500'}`}
        aria-hidden
      />
      <span>{label}</span>
    </div>
  );
};

// ===========================================================================
// Controls
// ===========================================================================

type Controller = ReturnType<typeof useNarration>;

const PlaybackButton: React.FC<{ controller: Controller }> = ({ controller }) => {
  const { status } = controller;
  const isPlaying = status === 'playing';
  const label = isPlaying ? 'Pause narration' : 'Play narration';

  if (status === 'loading') {
    return (
      <button
        type="button"
        disabled
        aria-label="Loading narration"
        className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center cursor-not-allowed"
      >
        <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => (isPlaying ? controller.pause() : controller.play())}
      aria-label={label}
      aria-pressed={isPlaying}
      title={label}
      disabled={status === 'error'}
      className="w-10 h-10 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center cursor-pointer active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-teal-300 focus-visible:outline-offset-2"
    >
      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
    </button>
  );
};

const ReplayButton: React.FC<{ controller: Controller }> = ({ controller }) => {
  const disabled =
    controller.status === 'loading' || controller.status === 'error' || !controller.canPlay;
  return (
    <button
      type="button"
      onClick={() => controller.replay()}
      aria-label="Replay narration"
      title="Replay"
      disabled={disabled}
      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 flex items-center justify-center cursor-pointer active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-teal-300 focus-visible:outline-offset-2"
    >
      <RotateCcw className="w-4 h-4" />
    </button>
  );
};

const ProgressBar: React.FC<{
  progress: number;
  elapsed: number;
  duration: number;
  status: Controller['status'];
}> = ({ progress, elapsed, duration, status }) => {
  const hasDuration = duration > 0;
  const label =
    status === 'loading'
      ? 'Loading…'
      : hasDuration
        ? `${formatTime(elapsed)} / ${formatTime(duration)}`
        : '';
  return (
    <div
      className="flex-1 min-w-0"
      role="progressbar"
      aria-label="Narration progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-[width] duration-150"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      {label && (
        <div className="mt-1 text-[10px] font-mono-num text-slate-400 text-right">{label}</div>
      )}
    </div>
  );
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default CharacterNarrator;
