/**
 * Sunny Bakery — original SVG illustration for the "What is a Stock?" lesson.
 *
 * Two visual variants:
 *   - `calm` (default): bakery with the owner smiling out front.
 *   - `popular`: subtle "customers queueing" accent used in stage 3.
 *
 * Lightweight SVG + CSS. No external assets. Respects reduced motion by
 * not auto-animating anything load-bearing to the lesson's meaning.
 */

import React, { useId } from 'react';

interface SunnyBakeryIllustrationProps {
  variant?: 'calm' | 'popular';
  className?: string;
}

export const SunnyBakeryIllustration: React.FC<SunnyBakeryIllustrationProps> = ({
  variant = 'calm',
  className = '',
}) => {
  const gid = useId();
  const popular = variant === 'popular';

  return (
    <svg
      viewBox="0 0 320 180"
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Sunny Bakery storefront${popular ? ', bustling with customers' : ''}`}
    >
      <defs>
        <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={`${gid}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id={`${gid}-awning`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="50%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id={`${gid}-door`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>

      {/* Sky / backdrop */}
      <rect x="0" y="0" width="320" height="150" fill={`url(#${gid}-sky)`} />

      {/* Ground */}
      <rect x="0" y="150" width="320" height="30" fill="#1E293B" />

      {/* Sun / warm glow */}
      <circle cx="268" cy="40" r="18" fill="#FDE047" opacity="0.3" />
      <circle cx="268" cy="40" r="10" fill="#FDE047" opacity="0.6" />

      {/* Side building hint */}
      <rect x="4" y="80" width="36" height="70" fill="#0F172A" opacity="0.7" />
      <rect x="12" y="92" width="8" height="10" fill="#FDE68A" opacity="0.4" />
      <rect x="26" y="92" width="8" height="10" fill="#FDE68A" opacity="0.4" />
      <rect x="12" y="110" width="8" height="10" fill="#FDE68A" opacity="0.4" />
      <rect x="26" y="110" width="8" height="10" fill="#FDE68A" opacity="0.4" />

      <rect x="280" y="80" width="36" height="70" fill="#0F172A" opacity="0.7" />
      <rect x="286" y="92" width="8" height="10" fill="#FDE68A" opacity="0.4" />
      <rect x="300" y="92" width="8" height="10" fill="#FDE68A" opacity="0.4" />

      {/* Bakery main wall */}
      <rect x="60" y="60" width="200" height="90" fill={`url(#${gid}-wall)`} stroke="#CA8A04" strokeWidth="1.5" />

      {/* Roof shadow line */}
      <rect x="56" y="58" width="208" height="6" fill="#92400E" />

      {/* Awning */}
      <path
        d="M 60 72 L 260 72 L 250 92 L 70 92 Z"
        fill={`url(#${gid}-awning)`}
        stroke="#115E59"
        strokeWidth="1.5"
      />
      {/* Awning stripes */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M ${72 + i * 24} 72 L ${62 + i * 24} 92`}
          stroke="#FEF3C7"
          strokeWidth="0.6"
          opacity="0.4"
        />
      ))}

      {/* Shop sign */}
      <rect x="112" y="64" width="96" height="12" rx="2" fill="#0F172A" />
      <text
        x="160"
        y="73"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="8"
        fill="#FDE047"
        letterSpacing="0.5"
      >
        SUNNY BAKERY
      </text>

      {/* Window left */}
      <rect x="76" y="100" width="50" height="40" rx="2" fill="#38BDF8" opacity="0.2" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="76" y="100" width="50" height="40" rx="2" fill="none" stroke="#92400E" strokeWidth="1" />
      <line x1="101" y1="100" x2="101" y2="140" stroke="#92400E" strokeWidth="1" />
      <line x1="76" y1="120" x2="126" y2="120" stroke="#92400E" strokeWidth="1" />

      {/* Bread loaf in window */}
      <ellipse cx="88" cy="112" rx="8" ry="4" fill="#CA8A04" />
      <ellipse cx="88" cy="110" rx="7" ry="3" fill="#FDE68A" opacity="0.7" />
      <ellipse cx="114" cy="112" rx="7" ry="4" fill="#D97706" />

      {/* Cupcakes in bottom pane */}
      <circle cx="86" cy="130" r="4" fill="#F472B6" />
      <rect x="83" y="130" width="6" height="6" fill="#78350F" />
      <circle cx="100" cy="130" r="4" fill="#FDE047" />
      <rect x="97" y="130" width="6" height="6" fill="#78350F" />
      <circle cx="114" cy="130" r="4" fill="#F87171" />
      <rect x="111" y="130" width="6" height="6" fill="#78350F" />

      {/* Door */}
      <rect x="138" y="98" width="44" height="52" rx="2" fill={`url(#${gid}-door)`} stroke="#451A03" strokeWidth="1.5" />
      <rect x="144" y="104" width="32" height="20" rx="1" fill="#38BDF8" opacity="0.2" stroke="#451A03" strokeWidth="0.8" />
      <circle cx="174" cy="128" r="1.5" fill="#FDE047" />
      {/* Open sign */}
      <rect x="150" y="106" width="20" height="6" rx="1" fill="#059669" />
      <text x="160" y="110.5" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="4" fill="#FFFFFF">
        OPEN
      </text>

      {/* Window right */}
      <rect x="194" y="100" width="50" height="40" rx="2" fill="#38BDF8" opacity="0.2" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="194" y="100" width="50" height="40" rx="2" fill="none" stroke="#92400E" strokeWidth="1" />
      <line x1="219" y1="100" x2="219" y2="140" stroke="#92400E" strokeWidth="1" />
      <line x1="194" y1="120" x2="244" y2="120" stroke="#92400E" strokeWidth="1" />

      {/* Pastries */}
      <ellipse cx="206" cy="112" rx="6" ry="3" fill="#D97706" />
      <ellipse cx="206" cy="111" rx="5" ry="2" fill="#FDE68A" opacity="0.6" />
      <circle cx="226" cy="112" r="5" fill="#FDE68A" />
      <circle cx="226" cy="112" r="3" fill="#D97706" />

      {/* Donuts */}
      <circle cx="204" cy="130" r="4" fill="#F472B6" />
      <circle cx="204" cy="130" r="1.5" fill="#1E293B" />
      <circle cx="220" cy="130" r="4" fill="#FDE047" />
      <circle cx="220" cy="130" r="1.5" fill="#1E293B" />
      <circle cx="236" cy="130" r="4" fill="#FB923C" />
      <circle cx="236" cy="130" r="1.5" fill="#1E293B" />

      {/* Owner silhouette in door */}
      <ellipse cx="160" cy="135" rx="7" ry="3" fill="#78350F" opacity="0.4" />

      {/* Popular variant: customers + hearts */}
      {popular && (
        <g className="motion-safe:animate-pulse">
          {/* Little customer figures */}
          <g transform="translate(42, 134)">
            <circle cx="4" cy="6" r="3" fill="#FDE68A" />
            <rect x="2" y="9" width="4" height="7" rx="1" fill="#0D9488" />
          </g>
          <g transform="translate(252, 134)">
            <circle cx="4" cy="6" r="3" fill="#FEF3C7" />
            <rect x="2" y="9" width="4" height="7" rx="1" fill="#D97706" />
          </g>
          <g transform="translate(266, 134)">
            <circle cx="4" cy="6" r="3" fill="#FDE68A" />
            <rect x="2" y="9" width="4" height="7" rx="1" fill="#F472B6" />
          </g>

          {/* Heart sparkles over shop */}
          <text x="100" y="52" fontSize="10" fill="#F472B6">
            ♥
          </text>
          <text x="210" y="48" fontSize="12" fill="#FDE047">
            ★
          </text>
          <text x="156" y="40" fontSize="10" fill="#F472B6">
            ♥
          </text>
        </g>
      )}
    </svg>
  );
};
