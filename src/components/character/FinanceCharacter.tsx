/**
 * FinanceCharacter — reusable Rive-based animated mentor.
 *
 * This is the production renderer for the finance-learning playground's mentor
 * character. It consumes the same `CharacterState` taxonomy used throughout the
 * app (via `useCharacterController` and `CharacterMentor`), so lessons never
 * need to know whether the character is Rive-backed or SVG-backed.
 *
 * API (intentionally small):
 *   - `state`: current conceptual character state
 *   - `className`: optional styling hook (forwarded to the host div)
 *   - `size`: xs/sm/md/lg — matches CharacterMentor's size system
 *   - `assetPath`: override the default `.riv` URL
 *   - `onReady`: fires once when the Rive runtime finishes loading the asset
 *   - `onError`: fires if asset load fails. Pass a renderer-provided fallback
 *     via `renderFallback` to keep the UI functional.
 *   - `renderFallback`: optional (state) => ReactNode shown while loading and
 *     when the asset fails to load. Lets us plug in the existing SVG mentor
 *     without this file taking a dependency on it.
 *
 * The asset is Vite-imported as a URL so bundling works out-of-the-box. Callers
 * can pass a different `assetPath` (e.g. a CDN URL) without touching this file.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import defaultRiveAsset from '../../assets/riv/testRiv.riv?url';
import type { CharacterState } from './CharacterMentor.tsx';
import {
  applyStateToRive,
  pickStateMachineName,
  type RiveLike,
} from './riveStateMapping.ts';

/**
 * Fire-and-forget preload at module import. Browsers de-dupe this request with
 * the one `useRive` makes later and serve from cache, so the first lesson that
 * mounts the mentor doesn't wait on the network for the .riv asset.
 */
if (typeof window !== 'undefined' && typeof fetch === 'function') {
  void fetch(defaultRiveAsset, { cache: 'force-cache' }).catch(() => {
    /* swallow — the component itself will surface a load error if needed */
  });
}

export interface FinanceCharacterProps {
  state: CharacterState;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  assetPath?: string;
  onReady?: () => void;
  onError?: (error: unknown) => void;
  renderFallback?: (state: CharacterState) => React.ReactNode;
}

const SIZE_CLASSES: Record<NonNullable<FinanceCharacterProps['size']>, string> = {
  xs: 'w-10 h-10',
  sm: 'w-12 h-12',
  md: 'w-20 h-20 sm:w-24 sm:h-24',
  lg: 'w-28 h-28 sm:w-32 sm:h-32',
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    if (typeof q.addEventListener === 'function') {
      q.addEventListener('change', handler);
      return () => q.removeEventListener('change', handler);
    }
    q.addListener(handler);
    return () => q.removeListener(handler);
  }, []);

  return reduced;
}

export const FinanceCharacter: React.FC<FinanceCharacterProps> = ({
  state,
  className = '',
  size = 'md',
  assetPath,
  onReady,
  onError,
  renderFallback,
}) => {
  const [loadError, setLoadError] = useState<unknown>(null);
  const [isReady, setIsReady] = useState(false);
  const notifiedReadyRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  // `useRive` is stable across renders when its arg object identity is stable.
  const riveOptions = useMemo(
    () => ({
      src: assetPath ?? defaultRiveAsset,
      autoplay: true,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      onLoad: () => setIsReady(true),
      onLoadError: (err: unknown) => {
        setLoadError(err);
      },
    }),
    [assetPath],
  );

  const { rive, RiveComponent } = useRive(riveOptions);

  // Discover the state machine once Rive is loaded. We don't force a specific
  // name — we pick whatever the artboard ships with. If nothing is found, the
  // mapping becomes a no-op and the artboard plays its default animation.
  const machineName = useMemo(() => pickStateMachineName(rive as RiveLike | null), [rive]);

  // Push the current state into the Rive state machine whenever it changes OR
  // the machine becomes available. Debug logging is gated to dev.
  useEffect(() => {
    if (!rive || !machineName) return;
    const result = applyStateToRive(rive as RiveLike, machineName, state);
    if (typeof window !== 'undefined' && (import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[FinanceCharacter]', state, '→', result);
    }
  }, [rive, machineName, state]);

  // Pause the animation when the user prefers reduced motion.
  useEffect(() => {
    if (!rive) return;
    try {
      if (reducedMotion) {
        rive.pause();
      } else if (machineName) {
        rive.play(machineName);
      } else {
        rive.play();
      }
    } catch {
      /* ignore — the runtime may not expose play/pause for every build */
    }
  }, [rive, reducedMotion, machineName]);

  // Fire onReady/onError callbacks once per load.
  useEffect(() => {
    if (isReady && !notifiedReadyRef.current) {
      notifiedReadyRef.current = true;
      onReady?.();
    }
  }, [isReady, onReady]);

  useEffect(() => {
    if (loadError) onError?.(loadError);
  }, [loadError, onError]);

  const dimensions = SIZE_CLASSES[size];

  // Fallback path: asset failed to load → render the caller-supplied fallback
  // (if any). We keep the same bounding box so there's no layout shift.
  if (loadError) {
    return (
      <div
        className={`${dimensions} ${className}`}
        role="img"
        aria-label="Finance mentor character"
      >
        {renderFallback?.(state)}
      </div>
    );
  }

  return (
    <div
      className={`${dimensions} ${className} relative select-none`}
      role="img"
      aria-label="Finance mentor character"
    >
      {/* The box is sized above so no layout shift occurs while Rive loads.
          We deliberately do NOT show the SVG fallback here — it causes a
          "detective flash" before the Rive artboard mounts. The fallback is
          reserved for the hard-error branch (above). */}
      <RiveComponent
        className="w-full h-full"
        aria-hidden={!isReady}
        style={{ opacity: isReady ? 1 : 0, transition: 'opacity 180ms ease-out' }}
      />
    </div>
  );
};
