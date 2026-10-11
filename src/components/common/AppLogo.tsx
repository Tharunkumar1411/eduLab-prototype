import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withBackground?: boolean;
  withGlow?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  size = 'md',
  withBackground = true,
  withGlow = true,
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  };

  const containerSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${containerSize} ${className}`}
      aria-label="FinCraft Logo"
    >
      {/* Ambient background glow matching the logo's neon aura */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-cyan-500/30 blur-md -z-10 transform scale-110 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        <defs>
          {/* Deep Navy Squircle Tile Background Gradient */}
          <linearGradient id="bgTileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="45%" stopColor="#0D1B2A" />
            <stop offset="100%" stopColor="#040814" />
          </linearGradient>

          {/* Border Highlight Gradient */}
          <linearGradient id="tileBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.6" />
          </linearGradient>

          {/* Main Bull & Trend Arrow Gradient */}
          <linearGradient id="bullHornsGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="35%" stopColor="#10B981" />
            <stop offset="70%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Gold Spark & Accent Gradient */}
          <linearGradient id="goldSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Candlestick / Bar Chart Gradients */}
          <linearGradient id="bar1Grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id="bar2Grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          <linearGradient id="bar3Grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Soft Glow Filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="subtleGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Subtle Radial Aura inside the tile */}
          <radialGradient id="innerTileAura" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. App Icon Squircle Background */}
        {withBackground && (
          <g>
            {/* Outer Rounded Container */}
            <rect
              x="3"
              y="3"
              width="94"
              height="94"
              rx="24"
              fill="url(#bgTileGrad)"
              stroke="url(#tileBorderGrad)"
              strokeWidth="2"
            />
            {/* Inner Atmospheric Ambient Glow */}
            <rect
              x="3"
              y="3"
              width="94"
              height="94"
              rx="24"
              fill="url(#innerTileAura)"
            />
            {/* Top Specular Sheen / Glass Highlight */}
            <path
              d="M 5 27 C 5 14.85 14.85 5 27 5 L 73 5 C 85.15 5 95 14.85 95 27 C 95 35 60 48 5 35 Z"
              fill="white"
              fillOpacity="0.04"
            />
          </g>
        )}

        {/* 2. Candlestick Bars & Rising Market Base */}
        <g id="chart-bars" opacity="0.95">
          {/* Bar 1 (Left - Foundation) */}
          <rect
            x="24"
            y="60"
            width="8"
            height="18"
            rx="3"
            fill="url(#bar1Grad)"
          />
          {/* Wick 1 */}
          <line
            x1="28"
            y1="56"
            x2="28"
            y2="80"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Bar 2 (Middle - Growth) */}
          <rect
            x="37"
            y="50"
            width="8"
            height="28"
            rx="3"
            fill="url(#bar2Grad)"
          />
          {/* Wick 2 */}
          <line
            x1="41"
            y1="45"
            x2="41"
            y2="81"
            stroke="#34D399"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Bar 3 (Right - High Momentum) */}
          <rect
            x="50"
            y="40"
            width="8"
            height="38"
            rx="3"
            fill="url(#bar3Grad)"
          />
          {/* Wick 3 */}
          <line
            x1="54"
            y1="34"
            x2="54"
            y2="81"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* 3. Dynamic Bull & Trend Surge Geometry */}
        <g id="bull-motif" filter="url(#subtleGlow)">
          {/* Central Charging Bull Head & Facet Polygon */}
          <path
            d="M 33 46 L 46 36 L 56 42 L 50 56 L 38 56 Z"
            fill="#0F766E"
            fillOpacity="0.85"
            stroke="#14B8A6"
            strokeWidth="1"
          />

          {/* Golden Pivot Accent (Nose/Snout Core Node) */}
          <polygon
            points="38,56 46,65 54,56 46,52"
            fill="url(#goldSparkGrad)"
          />

          {/* Left Bull Horn (Arched gracefully) */}
          <path
            d="M 34 44 C 28 40 22 34 23 25 C 26 27 30 33 37 38 Z"
            fill="url(#bullHornsGrad)"
          />

          {/* Glowing Upward Trendline & Right Bull Horn (Morphs into powerful Rising Arrow) */}
          <path
            d="M 23 66 C 30 63 36 57 44 49 C 52 41 62 31 74 21"
            stroke="url(#bullHornsGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          {/* Main Arrowhead pointing Up-Right (Growth Vector) */}
          <path
            d="M 64 20 L 76 19 L 75 31 L 70 26 L 64 20 Z"
            fill="#38BDF8"
            filter="url(#neonGlow)"
          />
          <path
            d="M 63 21 L 76 19 L 75 32 Z"
            fill="url(#bullHornsGrad)"
          />
        </g>

        {/* 4. Glowing Interconnected Nodes (Market network / data points) */}
        <g id="nodes" fill="#E0F2FE">
          {/* Data point 1 */}
          <circle cx="23" cy="66" r="3" fill="#10B981" stroke="#ECFDF5" strokeWidth="1.5" />
          {/* Data point 2 */}
          <circle cx="44" cy="49" r="3" fill="#06B6D4" stroke="#F0FDF4" strokeWidth="1.5" />
          {/* Golden Star / Sparkle Node on the crest */}
          <circle cx="61" cy="32" r="3.5" fill="#FBBF24" stroke="#FFFBEB" strokeWidth="1.5" filter="url(#subtleGlow)" />
        </g>

        {/* 5. Luminous Sparkle Star (Financial Breakthrough Accents) */}
        <g id="sparkle" transform="translate(68, 38)">
          <path
            d="M 0 -6 Q 0 0 6 0 Q 0 0 0 6 Q 0 0 -6 0 Q 0 0 0 -6 Z"
            fill="url(#goldSparkGrad)"
            filter="url(#subtleGlow)"
          />
          <circle cx="0" cy="0" r="1.5" fill="#FEF08A" />
        </g>

        {/* Mini Accent Star */}
        <g id="mini-sparkle" transform="translate(20, 22)">
          <path
            d="M 0 -3.5 Q 0 0 3.5 0 Q 0 0 0 3.5 Q 0 0 -3.5 0 Q 0 0 0 -3.5 Z"
            fill="#38BDF8"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
};

export default AppLogo;
