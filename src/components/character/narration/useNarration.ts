/**
 * useNarration — a single-track audio controller for one Narration at a time.
 *
 * Design goals:
 *   - Exactly one HTMLAudioElement per hook instance. Switching to a new
 *     narration stops the previous clip and resets state. Prevents overlap.
 *   - Default to user-initiated playback. `autoplay` is best-effort; browsers
 *     may still block it, in which case we surface a `blocked-autoplay` status
 *     and leave the Play button available.
 *   - Degrade gracefully with no `audioUrl` or on load/playback error — the
 *     text in the Narration always remains the source of truth for the lesson.
 *   - Cleans up on unmount and on narration change (no leaked timers, no
 *     dangling audio).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Narration } from './types.ts';

export type NarrationStatus =
  | 'idle' // no clip, or ready and not playing
  | 'loading' // audio metadata not ready yet
  | 'playing'
  | 'paused'
  | 'ended' // finished playing to completion
  | 'error' // load / playback error — fall back to text
  | 'no-audio' // narration has no audioUrl at all
  | 'blocked-autoplay'; // autoplay attempted but browser blocked it

export interface UseNarrationResult {
  status: NarrationStatus;
  elapsed: number; // seconds
  duration: number; // seconds; 0 if unknown
  progress: number; // 0..1
  canPlay: boolean; // true when there is an audioUrl and no fatal error
  play: () => void;
  pause: () => void;
  replay: () => void;
  stop: () => void;
  errorMessage?: string;
}

export function useNarration(narration: Narration | null | undefined): UseNarrationResult {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<NarrationStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // Teardown current audio element (used before switching clips and on unmount).
  const teardown = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.pause();
        audio.src = '';
        // Detach listeners by replacing the ref — React effect below creates a fresh one next cycle.
        audio.load();
      } catch {
        // ignore
      }
    }
    audioRef.current = null;
    setElapsed(0);
    setDuration(0);
    setErrorMessage(undefined);
  }, []);

  // Build / rebuild the audio element whenever narration id or audioUrl changes.
  useEffect(() => {
    teardown();

    if (!narration) {
      setStatus('idle');
      return;
    }
    if (!narration.audioUrl) {
      setStatus('no-audio');
      return;
    }

    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = narration.audioUrl;
    audioRef.current = audio;
    setStatus('loading');

    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setStatus((prev) => (prev === 'loading' ? 'idle' : prev));
    };
    const onTimeUpdate = () => setElapsed(audio.currentTime);
    const onPlay = () => setStatus('playing');
    const onPause = () => {
      // 'pause' also fires at natural end — the `ended` handler flips status explicitly.
      if (!audio.ended) setStatus('paused');
    };
    const onEnded = () => {
      setStatus('ended');
      setElapsed(audio.duration || 0);
    };
    const onError = () => {
      setStatus('error');
      setErrorMessage('Audio could not be loaded. The text version is still available.');
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    // Best-effort autoplay. Modern browsers block this unless the user has
    // interacted; we surface that state and let the user press Play.
    if (narration.autoplay) {
      const attempt = audio.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {
          setStatus('blocked-autoplay');
        });
      }
    }

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      try {
        audio.pause();
        audio.src = '';
        audio.load();
      } catch {
        // ignore
      }
      if (audioRef.current === audio) audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narration?.id, narration?.audioUrl]);

  // Teardown on full unmount is already handled by the effect's cleanup; keep an
  // extra safety net in case the hook is used in a long-lived component.
  useEffect(() => () => teardown(), [teardown]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        setStatus('blocked-autoplay');
      });
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const replay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
    } catch {
      // ignore seek errors (can happen before metadata is loaded)
    }
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        setStatus('blocked-autoplay');
      });
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      // ignore
    }
    setElapsed(0);
    setStatus('idle');
  }, []);

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(1, Math.max(0, elapsed / duration));
  }, [elapsed, duration]);

  const canPlay = status !== 'no-audio' && status !== 'error' && !!narration?.audioUrl;

  return { status, elapsed, duration, progress, canPlay, play, pause, replay, stop, errorMessage };
}
