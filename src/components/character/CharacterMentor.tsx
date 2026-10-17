/**
 * Inspector Fin — The Animated Financial Detective Mentor.
 * Built entirely with SVG + CSS animations for lightweight, crisp rendering.
 * Supports states: idle, talking, thinking, happy, surprised, confused, celebrating.
 */

import React, { useCallback, useEffect, useId, useState } from 'react';
import { FinanceCharacter } from './FinanceCharacter.tsx';

export type CharacterState =
  | 'idle'
  | 'talking'
  | 'thinking'
  | 'happy'
  | 'surprised'
  | 'confused'
  | 'celebrating';

interface CharacterMentorProps {
  state?: CharacterState;
  message?: string;
  subMessage?: string;
  onHintClick?: () => void;
  showHintButton?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showNameTag?: boolean;
  /**
   * When true, the dialogue bubble fades in each time `message` changes.
   * Defaults to false to preserve existing caller behavior.
   */
  revealProgressively?: boolean;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', handler);
      return () => query.removeEventListener('change', handler);
    }
    query.addListener(handler);
    return () => query.removeListener(handler);
  }, []);

  return reduced;
}

export const CharacterMentor: React.FC<CharacterMentorProps> = ({
  state = 'idle',
  message,
  subMessage,
  onHintClick,
  showHintButton = false,
  className = '',
  size = 'md',
  showNameTag = false,
  revealProgressively = false,
}) => {
  const gradientId = useId();
  const prefersReducedMotion = useReducedMotion();

  // Size mapping
  const sizeClasses = {
    xs: 'w-10 h-10',
    sm: 'w-12 h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
  }[size];

  // Dynamic CSS animation classes based on character state.
  // When the user prefers reduced motion, we drop body-level animation entirely
  // but keep the state-specific SVG swaps (eyes, mouth, lightbulb/sparkle) so
  // expressions still communicate the state.
  const getBodyMotionClass = () => {
    if (prefersReducedMotion) return '';
    switch (state) {
      case 'talking':
        return 'animate-bounce-subtle';
      case 'thinking':
        return 'animate-tilt';
      case 'happy':
      case 'celebrating':
        return 'animate-celebrate';
      case 'surprised':
        return 'animate-pulse';
      case 'confused':
        return 'animate-wiggle';
      case 'idle':
      default:
        return 'animate-float-gentle';
    }
  };

  const animationStyles = (
    <style>{`
      @keyframes float-gentle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      @keyframes bounce-subtle {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-3px) scale(1.02); }
      }
      @keyframes celebrate {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-6px) rotate(-3deg); }
        75% { transform: translateY(-6px) rotate(3deg); }
      }
      @keyframes tilt {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(4deg) translateY(-2px); }
      }
      @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
      }
      .animate-float-gentle {
        animation: float-gentle 3.5s ease-in-out infinite;
      }
      .animate-bounce-subtle {
        animation: bounce-subtle 1.8s ease-in-out infinite;
      }
      .animate-celebrate {
        animation: celebrate 1.2s ease-in-out infinite;
      }
      .animate-tilt {
        animation: tilt 2.5s ease-in-out infinite;
      }
      .animate-wiggle {
        animation: wiggle 1s ease-in-out infinite;
      }
    `}</style>
  );

  // SVG fallback body — rendered inside FinanceCharacter when the Rive asset
  // is not available (or still loading), and also when Rive fails. Keeping this
  // inline means callers never see a flash of empty content.
  const renderSvgFallback = useCallback(
    () => (
      <svg
        viewBox="0 0 120 120"
        className={`w-full h-full filter drop-shadow-md transition-all duration-300 ${getBodyMotionClass()}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
            <defs>
              <linearGradient id={`${gradientId}-coat`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id={`${gradientId}-hat`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="100%" stopColor="#115E59" />
              </linearGradient>
              <linearGradient id={`${gradientId}-face`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FDE047" />
              </linearGradient>
              <linearGradient id={`${gradientId}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Detective Coat / Collar */}
            <path
              d="M30 92 C30 80, 42 74, 60 74 C78 74, 90 80, 90 92 L92 112 C92 116, 88 118, 60 118 C32 118, 28 116, 28 112 Z"
              fill={`url(#${gradientId}-coat)`}
              stroke="#334155"
              strokeWidth="2"
            />
            {/* White tie / collar */}
            <path d="M52 74 L60 88 L68 74 Z" fill="#F8FAFC" />
            <path d="M58 84 L62 84 L63 100 L57 100 Z" fill="#0D9488" />

            {/* Character Round Head */}
            <circle
              cx="60"
              cy="52"
              r="28"
              fill={`url(#${gradientId}-face)`}
              stroke="#CA8A04"
              strokeWidth="2.5"
            />

            {/* Detective Hat Rim & Top */}
            <ellipse
              cx="60"
              cy="34"
              rx="34"
              ry="8"
              fill="#042F2E"
            />
            <path
              d="M36 33 C36 20, 44 14, 60 14 C76 14, 84 20, 84 33 Z"
              fill={`url(#${gradientId}-hat)`}
              stroke="#042F2E"
              strokeWidth="2"
            />
            {/* Hat Ribbon */}
            <path
              d="M37 32 C42 30, 78 30, 83 32 L83 29 C78 27, 42 27, 37 29 Z"
              fill={`url(#${gradientId}-accent)`}
            />

            {/* Eyes & Eyebrows by State */}
            {state === 'thinking' ? (
              // Thinking: one raised brow, one squinting eye
              <>
                <path d="M42 42 Q48 40 52 44" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M68 45 Q74 42 80 43" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="48" cy="49" rx="3.5" ry="3.5" fill="#1E293B" />
                <circle cx="49" cy="48" r="1" fill="#FFFFFF" />
                <path d="M70 51 Q74 48 78 51" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : state === 'surprised' ? (
              // Surprised: wide circular eyes
              <>
                <path d="M44 40 Q48 38 52 41" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
                <path d="M68 41 Q72 38 76 40" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
                <circle cx="48" cy="49" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                <circle cx="48" cy="49" r="3" fill="#1E293B" />
                <circle cx="72" cy="49" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                <circle cx="72" cy="49" r="3" fill="#1E293B" />
              </>
            ) : state === 'confused' ? (
              // Confused: asymmetric eyes
              <>
                <path d="M44 43 Q48 46 53 43" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
                <path d="M67 39 Q72 41 76 44" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
                <circle cx="48" cy="50" r="4" fill="#1E293B" />
                <path d="M69 50 L75 50" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : state === 'happy' || state === 'celebrating' ? (
              // Happy: arched joyful eyes
              <>
                <path d="M43 51 Q48 44 53 51" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M67 51 Q72 44 77 51" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Rosy cheeks */}
                <ellipse cx="42" cy="56" rx="4" ry="2" fill="#F87171" opacity="0.6" />
                <ellipse cx="78" cy="56" rx="4" ry="2" fill="#F87171" opacity="0.6" />
              </>
            ) : (
              // Normal / Talking / Idle eyes
              <>
                <path d="M44 43 Q48 41 52 43" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
                <path d="M68 43 Q72 41 76 43" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="48" cy="49" rx="3.5" ry="4" fill="#1E293B" />
                <circle cx="49" cy="47.5" r="1.2" fill="#FFFFFF" />
                <ellipse cx="72" cy="49" rx="3.5" ry="4" fill="#1E293B" />
                <circle cx="73" cy="47.5" r="1.2" fill="#FFFFFF" />
              </>
            )}

            {/* Detective Glasses / Monocle or Rim */}
            <circle cx="48" cy="49" r="8" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.85" />
            <circle cx="72" cy="49" r="8" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.85" />
            <path d="M56 48 L64 48" stroke="#D97706" strokeWidth="1.5" />

            {/* Mouth Shape by State */}
            {state === 'talking' ? (
              // Talking mouth: animated speech oval
              <ellipse cx="60" cy="63" rx="5" ry="4" fill="#991B1B" />
            ) : state === 'happy' || state === 'celebrating' ? (
              // Broad warm smile
              <path d="M52 61 Q60 70 68 61" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="#991B1B" />
            ) : state === 'surprised' ? (
              // Surprised 'O'
              <circle cx="60" cy="64" r="4.5" fill="#991B1B" stroke="#1E293B" strokeWidth="1.5" />
            ) : state === 'confused' ? (
              // Confused wavy smirk
              <path d="M53 64 Q57 61 62 64 Q66 66 69 63" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : state === 'thinking' ? (
              // Pressed lips tilted
              <path d="M54 64 L65 62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            ) : (
              // Subtle friendly smile (idle)
              <path d="M54 62 Q60 66 66 62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            )}

            {/* Magnifying Glass Accessory in hand */}
            <g transform="translate(18, 62) rotate(-20)">
              <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="3" fill="#E0F2FE" fillOpacity="0.4" />
              <line x1="19" y1="19" x2="27" y2="27" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M7 10 Q12 7 16 11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
            </g>

            {/* State indicators: lightbulb for thinking, sparkle for celebrating */}
            {state === 'thinking' && (
              <g transform="translate(86, 12)" className="motion-safe:animate-pulse">
                <circle cx="8" cy="8" r="6" fill="#FDE047" />
                <path d="M6 14 L10 14" stroke="#CA8A04" strokeWidth="1.5" />
                <path d="M8 2 L8 0" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 8 L0 8" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 8 L16 8" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}

            {state === 'celebrating' && (
              <g transform="translate(88, 10)">
                <path d="M6 0 L8 4 L12 6 L8 8 L6 12 L4 8 L0 6 L4 4 Z" fill="#F59E0B" />
                <circle cx="16" cy="16" r="2" fill="#10B981" />
              </g>
            )}
          </svg>
    ),
    // The fallback captures state + animation class via closure. We don't need
    // getBodyMotionClass in deps since it's recomputed every render anyway.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, gradientId, prefersReducedMotion],
  );

  const avatarNode = (
    <div className={`relative shrink-0 flex flex-col items-center ${!message ? className : ''}`}>
      <FinanceCharacter
        state={state}
        size={size}
        className="select-none transition-transform duration-300"
        renderFallback={renderSvgFallback}
      />

      {/* Name tag - only rendered if explicitly requested */}
      {showNameTag && (
        <span className="text-[10px] sm:text-[11px] font-semibold text-teal-400 uppercase tracking-wider mt-1 text-center whitespace-nowrap">
          Inspector Fin
        </span>
      )}
    </div>
  );

    if (!message) {
      return (
        <>
          {avatarNode}
          {animationStyles}
        </>
      );
    }

    const bubbleRevealKey = revealProgressively && !prefersReducedMotion
      ? `${message ?? ''}|${subMessage ?? ''}`
      : undefined;
    const bubbleRevealClass = revealProgressively && !prefersReducedMotion
      ? 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-1 motion-safe:duration-200'
      : '';

    return (
      <div className={`flex items-start gap-4 ${className}`}>
        {avatarNode}

        {/* Dialogue Speech Bubble */}
        <div className="flex-1 relative bg-slate-800/90 border border-slate-700 rounded-xl p-4 shadow-lg backdrop-blur-sm">
          {/* Arrow pointing to Fin */}
          <div className="absolute top-5 -left-2 w-3 h-3 bg-slate-800 border-l border-b border-slate-700 transform rotate-45" />

          <div key={bubbleRevealKey} className={bubbleRevealClass}>
            <p className="text-sm font-medium text-slate-100 leading-relaxed">
              {message}
            </p>

            {subMessage && (
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">
                {subMessage}
              </p>
            )}
          </div>

          {showHintButton && onHintClick && (
            <button
              onClick={onHintClick}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Need a clue?</span>
              <span className="underline">Get Detective Hint →</span>
            </button>
          )}
        </div>
        {animationStyles}
      </div>
    );
};
